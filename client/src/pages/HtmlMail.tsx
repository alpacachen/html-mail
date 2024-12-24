import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, message, Card } from "antd";
import { SendOutlined, HomeOutlined } from "@ant-design/icons";
import { fetchWithAuth } from "../utils/api";
import { defaultHtmlTemplate } from "../templates/emailTemplate";

const { TextArea } = Input;

const HtmlMail: React.FC = () => {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // 设置默认值
  React.useEffect(() => {
    form.setFieldsValue({
      content: defaultHtmlTemplate,
      subject: "测试邮件",
    });
  }, [form]);

  const handleSendEmail = async (values: {
    email: string;
    content: string;
    subject: string;
  }) => {
    try {
      setSending(true);

      const response = await fetchWithAuth("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "发送失败");
      }

      await response.json();
      messageApi.success("邮件发送成功！");
      form.resetFields();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Unauthorized") {
        navigate("/");
        return;
      }
      messageApi.error(
        error instanceof Error ? error.message : "邮件发送失败，请重试"
      );
      console.error("发送邮件出错:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      {contextHolder}
      <Card style={{ width: "100%", maxWidth: "800px" }}>
        <Card.Meta
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <span>HTML 邮件工具</span>
              <Link to="/">
                <Button icon={<HomeOutlined />}>返回首页</Button>
              </Link>
            </div>
          }
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSendEmail}
          validateTrigger="onBlur"
        >
          <Form.Item
            label="收件人邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入收件人邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input placeholder="请输入收件人邮箱" />
          </Form.Item>

          <Form.Item
            label="邮件主题"
            name="subject"
            rules={[{ required: true, message: "请输入邮件主题" }]}
          >
            <Input placeholder="请输入邮件主题" />
          </Form.Item>

          <Form.Item
            label="HTML 邮件内容"
            name="content"
            rules={[{ required: true, message: "请输入邮件内容" }]}
          >
            <TextArea
              rows={10}
              placeholder="在这里编写 HTML 邮件内容..."
              style={{ fontFamily: "monospace" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={sending}
              icon={<SendOutlined />}
              block
            >
              {sending ? "发送中..." : "发送邮件"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HtmlMail;
