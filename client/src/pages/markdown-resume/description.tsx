import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  RocketOutlined,
  EditOutlined,
  FileOutlined,
  LockOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export const MarkdownResumeDescription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-300 mx-auto py-20 px-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in animate-duration-1000">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 inline-block">
            <Typography.Title level={1} className="!text-inherit text-12!">
              Markdown 简历生成器
            </Typography.Title>
          </div>
          <Typography.Paragraph className="text-6 text-gray-600 mt-4 animate-fade-in animate-delay-300">
            使用 Markdown 编写简历，支持实时预览和一键导出 PDF
          </Typography.Paragraph>
          <Link
            to="/markdown-resume/template-list"
            className="inline-block mt-8"
          >
            <Button type="primary" size="large" className="shadow-lg">
              浏览简历模板
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-32 animate-fade-in animate-delay-500">
          <Typography.Title level={2} className="text-center">
            为什么选择我们？
          </Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-32">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 text-blue-500 group-hover:animate-bounce">
                <EditOutlined />
              </div>
              <div className="text-6 font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                简单易用
              </div>
              <div className="text-gray-600">
                熟悉 Markdown 语法的用户可以快速上手，实时预览让编辑更直观
              </div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 text-purple-500 group-hover:animate-bounce">
                <RocketOutlined />
              </div>
              <div className="text-6 font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text">
                专业模板
              </div>
              <div className="text-gray-600">
                提供多种精心设计的简历模板，适合不同行业和场景
              </div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 text-pink-500 group-hover:animate-bounce">
                <FileOutlined />
              </div>
              <div className="text-6 font-bold mb-4 bg-gradient-to-r from-pink-500 to-red-600 text-transparent bg-clip-text">
                导出 PDF
              </div>
              <div className="text-gray-600">
                一键导出高质量 PDF 文件，支持自定义纸张大小
              </div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 text-green-500 group-hover:animate-bounce">
                <LockOutlined />
              </div>
              <div className="text-6 font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
                数据安全
              </div>
              <div className="text-gray-600">
                完全客户端存储，支持离线使用，确保您的简历数据安全可控
              </div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-6 text-orange-500 group-hover:animate-bounce">
                <AppstoreOutlined />
              </div>
              <div className="text-6 font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-600 text-transparent bg-clip-text">
                海量模板
              </div>
              <div className="text-gray-600">
                提供丰富的简历模板库，持续更新，总有一款适合你
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
