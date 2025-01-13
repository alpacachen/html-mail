"use client";

import { Button, Form, Input, Card, message } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface EmailForm {
  to: string;
  subject: string;
  content: string;
}

const DEFAULT_HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>欢迎订阅我们的周刊</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 感谢订阅我们的周刊</h1>
    </div>
    
    <div style="background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
        亲爱的订阅者：
      </p>
      
      <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
        欢迎加入我们的周刊订阅行列！每周我们都会为您精选最新、最有价值的内容，包括：
      </p>
      
      <ul style="color: #4B5563; margin-bottom: 25px; padding-left: 20px;">
        <li style="margin-bottom: 10px;">🚀 前沿技术动态</li>
        <li style="margin-bottom: 10px;">📚 精选学习资源</li>
        <li style="margin-bottom: 10px;">💡 实用开发技巧</li>
        <li style="margin-bottom: 10px;">🔧 效率工具推荐</li>
      </ul>
      
      <div style="background: #F3F4F6; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
        <p style="color: #4B5563; margin: 0;">
          <strong>小贴士：</strong> 将我们的邮箱地址添加到联系人，以确保不会错过任何一期精彩内容！
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="#" style="display: inline-block; background: #667eea; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">浏览历史周刊</a>
      </div>
    </div>
    
    <div style="text-align: center; padding-top: 20px; color: #6B7280; font-size: 14px;">
      <p style="margin-bottom: 10px;">
        您收到这封邮件是因为订阅了我们的周刊。
      </p>
      <p style="margin: 0;">
        © 2024 技术周刊 | <a href="#" style="color: #667eea; text-decoration: none;">取消订阅</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export default function EmailCreator() {
  const [form] = Form.useForm<EmailForm>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: EmailForm) => {
    try {
      const res = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to send email');
      }

      const data = await res.json();
      console.log("发送邮件:", data);
      messageApi.success("邮件发送成功！");
      form.resetFields();
    } catch (error) {
      console.error(error);
      messageApi.error("邮件发送失败，请重试");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {contextHolder}
      <div className="max-w-3xl mx-auto px-4">
        <Card title="创建邮件" className="shadow-sm">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              to: "",
              subject: "欢迎订阅技术周刊！",
              content: DEFAULT_HTML_CONTENT,
            }}
            requiredMark={false}
          >
            <Form.Item
              label="收件人"
              name="to"
              rules={[
                { required: true, message: "请输入收件人邮箱" },
                { type: "email", message: "请输入有效的邮箱地址" },
              ]}
            >
              <Input placeholder="请输入收件人邮箱" />
            </Form.Item>

            <Form.Item
              label="主题"
              name="subject"
              rules={[{ required: true, message: "请输入邮件主题" }]}
            >
              <Input placeholder="请输入邮件主题" />
            </Form.Item>

            <Form.Item
              label="正文"
              name="content"
              rules={[{ required: true, message: "请输入邮件内容" }]}
            >
              <TextArea
                placeholder="请输入邮件内容"
                rows={12}
                className="font-mono"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  size="large"
                >
                  发送邮件
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
