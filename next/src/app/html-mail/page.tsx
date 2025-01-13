'use client';

import { Button, Card, Typography } from "antd";
import { MailOutlined, RightOutlined, AppstoreOutlined, ThunderboltOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import Link from "next/link";

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
            <Link href="/html-mail/editor">
              <Button type="primary" size="large" icon={<RightOutlined />}>
                开始使用
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            主要功能
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              hoverable
              className="text-center"
              cover={
                <div className="pt-6 flex justify-center">
                  <AppstoreOutlined className="text-4xl text-blue-500" />
                </div>
              }
            >
              <Card.Meta
                title="模板管理"
                description="提供多种专业邮件模板，支持自定义模板并保存供后续使用"
              />
            </Card>

            <Card
              hoverable
              className="text-center"
              cover={
                <div className="pt-6 flex justify-center">
                  <ThunderboltOutlined className="text-4xl text-purple-500" />
                </div>
              }
            >
              <Card.Meta
                title="实时预览"
                description="所见即所得的编辑器，实时预览邮件效果，确保完美呈现"
              />
            </Card>

            <Card
              hoverable
              className="text-center"
              cover={
                <div className="pt-6 flex justify-center">
                  <SafetyCertificateOutlined className="text-4xl text-green-500" />
                </div>
              }
            >
              <Card.Meta
                title="安全可靠"
                description="支持多种邮件服务配置，确保邮件送达率，保护您的数据安全"
              />
            </Card>
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
          <Link href="/html-mail/editor">
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
