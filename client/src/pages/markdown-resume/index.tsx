import React, { useState, useRef, useLayoutEffect } from "react";
import Split from "react-split";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Input, Button, message } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./style.css";

const { TextArea } = Input;

const defaultMarkdown = `# 我的简历

## 个人信息
- 姓名：张三
- 年龄：25
- 邮箱：example@email.com

## 教育背景
- 2018-2022 某某大学 计算机科学与技术

## 工作经验
### ABC公司（2022-至今）
- 负责XXX项目的开发
- 实现了XXX功能

## 技能特长
- 编程语言：JavaScript, TypeScript, Python
- 前端框架：React, Vue
- 其他技能：Git, Docker
`;

const MarkdownResume: React.FC = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);

  const handleSavePDF = async () => {
    if (!previewRef.current) return;

    try {
      setSaving(true);
      messageApi.loading("正在生成 PDF...");

      // 临时移除缩放以确保正确的 PDF 质量
      const originalZoom = previewRef.current.style.zoom;
      previewRef.current.style.zoom = "1";

      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // 提高清晰度
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // 恢复缩放
      if (previewRef.current) {
        previewRef.current.style.zoom = originalZoom;
      }

      const imgWidth = 210; // A4 宽度 (mm)
      const pageHeight = 297; // A4 高度 (mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");

      // 如果内容超过一页，需要分页处理
      let heightLeft = imgHeight;
      let position = 0;
      const pageData = canvas.toDataURL("image/jpeg", 1.0);

      pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
      messageApi.success("PDF 已保存");
    } catch (error) {
      console.error("PDF generation error:", error);
      messageApi.error("PDF 生成失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  useLayoutEffect(() => {
    // a4纸区域宽度
    const markdownContentWidth =
      document.getElementById("markdown-content")?.clientWidth;
    if (!markdownContentWidth) {
      return;
    }
    // 监听父容器宽度变化 new MutationObserver
    const observer = new MutationObserver(() => {
      // 父容器宽度
      const parentWidth = document.getElementById("preview-pane")?.clientWidth;
      if (parentWidth) {
        const targetWidth = parentWidth - 20 * 2;
        const scale = targetWidth / markdownContentWidth;
        setZoom(Math.min(scale, 1));
      }
    });
    observer.observe(document.getElementById("preview-pane")!, {
      attributes: true,
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {contextHolder}
      <div
        style={{
          padding: "8px 16px",
          background: "#fff",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={handleSavePDF}
          loading={saving}
        >
          保存为 PDF
        </Button>
      </div>
      <Split
        sizes={[50, 50]}
        minSize={300}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        style={{ flex: 1 }}
        className="split-container"
      >
        <div className="editor-pane">
          <TextArea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            style={{
              height: "100%",
              resize: "none",
              border: "none",
              outline: "none",
              padding: "20px",
              fontSize: "14px",
              lineHeight: "1.6",
              fontFamily: "monospace",
            }}
            placeholder="输入 Markdown 内容..."
          />
        </div>
        <div id="preview-pane" className="preview-pane">
          <div
            id="markdown-content"
            style={{
              zoom: zoom ?? undefined,
            }}
            className="markdown-content"
            ref={previewRef}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 style={{ borderBottom: "1px solid #eee" }} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 style={{ borderBottom: "1px solid #eee" }} {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </Split>
    </div>
  );
};

export default MarkdownResume;
