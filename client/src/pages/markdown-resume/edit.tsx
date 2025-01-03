import { useSearchParams } from "react-router-dom";
import { templates } from "./templates";
import { Button, Divider, Input, Space } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import "./style.css";
import { useState, useEffect, useRef } from "react";
import { A4Paper } from "./a4-paper";
import { useReactToPrint } from "react-to-print";

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

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleSavePDF = async () => {
    console.log(contentRef.current);
    reactToPrintFn();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-500">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-white flex items-center justify-between px-6 shadow-sm">
        <div className="text-lg font-medium">简历编辑器</div>
        <Space size="middle">
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={handleSavePDF}
            className="shadow-sm"
          >
            导出 PDF
          </Button>
        </Space>
      </div>
      <Divider className="!my-0" />

      {/* 主编辑区域 */}
      <div className="flex-1 h-0 flex gap-4">
        {/* 左侧编辑器 */}
        <div className="flex-1 py-6 pl-6">
          <div className="h-full bg-white rounded-lg shadow-sm">
            <Input.TextArea
              value={content}
              className="h-full! text-4 font-mono leading-relaxed resize-none"
              placeholder="在此输入 Markdown 内容..."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* 右侧预览 */}
        <div className="py-6 overflow-auto flex flex-col gap-6 pr-6 overflow-y-auto">
          <A4Paper ref={contentRef} content={content} />
        </div>
      </div>
    </div>
  );
};
