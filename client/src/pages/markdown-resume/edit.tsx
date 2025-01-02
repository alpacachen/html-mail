import { useSearchParams } from "react-router-dom";
import { templates } from "./templates";
import { Button, Divider, Input, Space, message } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import "./style.css";
import { useLayoutEffect, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
// import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export const MarkdownResumeEdit = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const template = templates.find((t) => t.id === id);
  const localContent = localStorage.getItem("markdown-resume-content");
  const defaultContent = localContent ?? template?.content ?? "";

  const [content, setContent] = useState(defaultContent);
  useEffect(() => {
    localStorage.setItem("markdown-resume-content", content);
  }, [content]);

  useLayoutEffect(() => {
    const a4 = document.getElementById("a4");
    if (!a4) return;
    const a4Parent = a4.parentElement;
    if (!a4Parent) return;
    const a4ParentWidth = a4Parent.clientWidth;
    const a4Width = a4.clientWidth;
    const targetWidth = a4ParentWidth - 48;
    const scale = targetWidth / a4Width;
    a4.style.zoom = scale.toString();
  }, []);

  const [saving, setSaving] = useState(false);

  const handleSavePDF = async () => {
    const a4 = document.getElementById("a4");
    if (!a4) return;

    try {
      setSaving(true);
      message.loading("正在生成 PDF...");

      const dataUrl = await htmlToImage.toBlob(a4, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      if (!dataUrl) return;

      // 预览图片
      window.open(window.URL.createObjectURL(dataUrl));
      return;
    } catch (error) {
      console.error("PDF generation error:", error);
      message.error("PDF 生成失败，请重试");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-white flex items-center justify-between px-6 shadow-sm">
        <div className="text-lg font-medium">简历编辑器</div>
        <Space size="middle">
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={handleSavePDF}
            loading={saving}
            className="shadow-sm"
          >
            导出 PDF
          </Button>
        </Space>
      </div>
      <Divider className="!my-0" />

      {/* 主编辑区域 */}
      <div className="flex-1 h-0 flex">
        {/* 左侧编辑器 */}
        <div className="flex-1 p-6">
          <div className="h-full bg-white rounded-lg shadow-sm">
            <Input.TextArea
              value={content}
              className="h-full! rounded-lg border-0 text-4 font-mono leading-relaxed resize-none"
              placeholder="在此输入 Markdown 内容..."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* 右侧预览 */}
        <div className="p-6 overflow-auto flex flex-col gap-6">
          <div id="a4" className="a4">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
          <div id="a4" className="a4">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
