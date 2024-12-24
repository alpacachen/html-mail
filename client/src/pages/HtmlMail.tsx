import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, message, Card, Checkbox, InputNumber, Tooltip, Space } from "antd";
import { SendOutlined, HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { fetchWithAuth } from "../utils/api";
import { defaultHtmlTemplate } from "../templates/emailTemplate";

const { TextArea } = Input;

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

const HtmlMail: React.FC = () => {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [useCustomConfig, setUseCustomConfig] = useState(false);

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
    config?: EmailConfig;
  }) => {
    try {
      setSending(true);

      const endpoint = useCustomConfig ? '/api/send-email-custom' : '/api/send-email';
      const response = await fetchWithAuth(endpoint, {
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
            <Space>
              <Checkbox
                checked={useCustomConfig}
                onChange={(e) => setUseCustomConfig(e.target.checked)}
              >
                使用自定义邮箱配置
              </Checkbox>
              <Tooltip title="点击查看如何获取QQ邮箱的SMTP配置">
                <a
                  href="https://service.mail.qq.com/detail/123/141"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px' }}
                >
                  <InfoCircleOutlined style={{ marginRight: 4 }} />
                  举例：QQ邮箱的SMTP配置
                </a>
              </Tooltip>
            </Space>
          </Form.Item>

          {useCustomConfig && (
            <Card title="邮箱配置" size="small" style={{ marginBottom: 16 }}>
              <Form.Item
                label="SMTP服务器"
                name={['config', 'host']}
                rules={[{ required: true, message: '请输入SMTP服务器地址' }]}
              >
                <Input placeholder="例如: smtp.qq.com" />
              </Form.Item>

              <Form.Item
                label="SMTP端口"
                name={['config', 'port']}
                rules={[{ required: true, message: '请输入SMTP端口' }]}
              >
                <InputNumber
                  placeholder="例如: 465"
                  min={1}
                  max={65535}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="邮箱账号"
                name={['config', 'user']}
                rules={[{ required: true, message: '请输入邮箱账号' }]}
              >
                <Input placeholder="请输入邮箱账号" />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    邮箱密码/授权码&nbsp;
                    <Tooltip title="我们不会记录或存储您的邮箱密码，仅用于当前发送邮件">
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  </span>
                }
                name={['config', 'pass']}
                rules={[{ required: true, message: '请输入邮箱密码或授权码' }]}
              >
                <Input.Password placeholder="请输入邮箱密码或授权码" />
              </Form.Item>
            </Card>
          )}

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
