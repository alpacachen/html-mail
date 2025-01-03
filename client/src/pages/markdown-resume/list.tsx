import { Button, Card, Modal, Typography } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { templates } from "./templates";

export const MarkdownResumeTemplateList = () => {
  const [previewTemplate, setPreviewTemplate] = useState<
    (typeof templates)[0] | null
  >(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-280 mx-auto px-10">
        <div className="text-center mb-16 animate-fade-in">
          <Typography.Title level={1} className="!mb-4">
            选择简历模板
          </Typography.Title>
          <Typography.Text className="text-gray-500 text-4">
            挑选一个适合你的模板开始创建简历
          </Typography.Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              hoverable
              className="group transform transition-all duration-300 hover:-translate-y-2"
              cover={
                <div className="relative h-80 overflow-hidden bg-white">
                  <div className="absolute bg-gray-100 inset-0 p-4 markdown-preview overflow-hidden origin-top">
                    <ReactMarkdown>{template.content}</ReactMarkdown>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => setPreviewTemplate(template)}
                      className="bg-white/80 border-0"
                    >
                      预览
                    </Button>
                    <Link to={`/markdown-resume/resume-edit?id=${template.id}`}>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        className="bg-white/80 border-0"
                      >
                        使用
                      </Button>
                    </Link>
                  </div>
                </div>
              }
            >
              <Card.Meta
                title={<div className="text-4 font-bold">{template.name}</div>}
                description={
                  <div className="text-gray-500 text-3">
                    {template.description}
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={!!previewTemplate}
        onCancel={() => setPreviewTemplate(null)}
        footer={null}
        width={800}
        centered
        className="preview-modal"
      >
        {previewTemplate && (
          <div className="bg-white p-8 rounded-lg markdown-preview">
            <ReactMarkdown>{previewTemplate.content}</ReactMarkdown>
          </div>
        )}
      </Modal>
    </div>
  );
};
