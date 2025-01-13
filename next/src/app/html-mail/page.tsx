"use client";

import { Button, Card, Typography } from "antd";
import { MailOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";

import "@ant-design/v5-patch-for-react-19";
const { Title, Paragraph } = Typography;

export default function HtmlMailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex-1 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Title level={1} style={{ marginBottom: 24 }}>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                HTML 邮件模板发送器
              </span>
            </Title>
            <Paragraph className="text-xl text-gray-600 mb-8">
              简单、快速地创建和发送专业的 HTML 邮件，支持模板管理和实时预览
            </Paragraph>
            <Link href="/html-mail/creator">
              <Button type="primary" size="large" icon={<RightOutlined />}>
                开始使用
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="mb-6">
            准备开始？
          </Title>
          <Paragraph className="text-xl text-gray-600 mb-8">
            立即体验专业的 HTML 邮件模板发送服务
          </Paragraph>
          <Link href="/html-mail/creator">
            <Button type="primary" size="large" icon={<MailOutlined />}>
              开始创建邮件
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <Paragraph>© 2024 HTML Mail Template. All rights reserved.</Paragraph>
        </div>
      </footer>
    </div>
  );
}
