import { useSearchParams } from "react-router-dom";
import { templates } from "./templates";
import { Button, Divider, Input, Space } from "antd";
// import ReactMarkdown from "react-markdown";
import { SaveOutlined, FilePdfOutlined } from "@ant-design/icons";
import "./style.css";
import { useLayoutEffect } from "react";
export const MarkdownResumeEdit = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const template = templates.find((t) => t.id === id);

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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-white flex items-center justify-between px-6 shadow-sm">
        <div className="text-lg font-medium">简历编辑器</div>
        <Space size="middle">
          <Button
            icon={<SaveOutlined />}
            className="border-gray-300 hover:border-gray-400"
          >
            临时保存
          </Button>
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
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
              defaultValue={template?.content}
              className="h-full! rounded-lg border-0 text-4 font-mono leading-relaxed resize-none"
              placeholder="在此输入 Markdown 内容..."
            />
          </div>
        </div>

        {/* 右侧预览 */}
        <div className="p-6 overflow-auto">
          <div id="a4" className="a4">
            <p className="text-4 font-mono leading-relaxed">asdsd</p>
          </div>
        </div>
      </div>
    </div>
  );
};
