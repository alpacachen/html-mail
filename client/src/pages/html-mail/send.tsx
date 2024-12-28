import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Form,
  message,
  Card,
  Radio,
  InputNumber,
  Tooltip,
  Space,
} from "antd";
import {
  SendOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from "../../utils/api";
import { defaultHtmlTemplate } from "../../templates/email-template";
import { ConfigType, EmailFormValues } from "../../types";
import AuthStatus from "./auth-status";

const { TextArea } = Input;

// 自定义邮箱配置表单
const CustomEmailConfig: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Card title={t('mail.form.smtp.title')} size="small" style={{ marginBottom: 16 }}>
      <Form.Item
        label={t('mail.form.smtp.host')}
        name={["config", "host"]}
        rules={[{ required: true, message: t('mail.form.smtp.hostPlaceholder') }]}
      >
        <Input placeholder={t('mail.form.smtp.hostPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('mail.form.smtp.port')}
        name={["config", "port"]}
        rules={[{ required: true, message: t('mail.form.smtp.portPlaceholder') }]}
      >
        <InputNumber
          placeholder={t('mail.form.smtp.portPlaceholder')}
          min={1}
          max={65535}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label={t('mail.form.smtp.user')}
        name={["config", "user"]}
        rules={[{ required: true, message: t('mail.form.smtp.userPlaceholder') }]}
      >
        <Input placeholder={t('mail.form.smtp.userPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={
          <span>
            {t('mail.form.smtp.pass')}&nbsp;
            <Tooltip title={t('mail.form.smtp.passTip')}>
              <InfoCircleOutlined style={{ color: "#1890ff" }} />
            </Tooltip>
          </span>
        }
        name={["config", "pass"]}
        rules={[{ required: true, message: t('mail.form.smtp.passPlaceholder') }]}
      >
        <Input.Password placeholder={t('mail.form.smtp.passPlaceholder')} />
      </Form.Item>
    </Card>
  );
};

const HtmlMail: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [configType, setConfigType] = useState<ConfigType>("quick");

  useEffect(() => {
    form.setFieldsValue({
      content: defaultHtmlTemplate(),
      subject: t('mail.form.subject.placeholder'),
    });
  }, [form, t]);

  const handleSendEmail = async (values: EmailFormValues) => {
    try {
      setSending(true);
      const endpoint =
        configType === "custom" ? "/api/send-email-custom" : "/api/send-email";
      const response = await fetchWithAuth(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      if (error instanceof Error && error.message !== "Unauthorized") {
        messageApi.error(
          error instanceof Error ? error.message : "邮件发送失败，请重试"
        );
        console.error("发送邮件出错:", error);
      }
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
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}>
              <span>{t('mail.title')}</span>
              <Link to="/html-mail">
                <Button icon={<HomeOutlined />}>{t('common.back')}</Button>
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
          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Radio.Group
                value={configType}
                onChange={(e) => setConfigType(e.target.value)}
                style={{ marginBottom: 8 }}
              >
                <Space direction="vertical">
                  <Radio value="quick">
                    {t('mail.config.quick.title')}
                    <Tooltip title={t('mail.config.quick.tip')}>
                      <InfoCircleOutlined style={{ color: "#1890ff", marginLeft: 4 }} />
                    </Tooltip>
                  </Radio>
                  <Radio value="custom">
                    {t('mail.config.custom.title')}
                    <Tooltip title={t('mail.config.custom.tip')}>
                      <a
                        href="https://service.mail.qq.com/detail/123/141"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "14px", marginLeft: 8 }}
                      >
                        <InfoCircleOutlined style={{ marginRight: 4 }} />
                        {t('mail.config.custom.example')}
                      </a>
                    </Tooltip>
                  </Radio>
                </Space>
              </Radio.Group>

              {configType === "quick" && (
                <Card size="small" style={{ marginTop: 8 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <AuthStatus />
                  </Space>
                </Card>
              )}
            </Space>
          </Form.Item>

          {configType === "custom" && <CustomEmailConfig />}

          <Form.Item
            label={t('mail.form.email.label')}
            name="email"
            rules={[
              { required: true, message: t('mail.form.email.placeholder') },
              { type: "email", message: t('mail.form.email.invalid') },
            ]}
          >
            <Input placeholder={t('mail.form.email.placeholder')} />
          </Form.Item>

          <Form.Item
            label={t('mail.form.subject.label')}
            name="subject"
            rules={[{ required: true, message: t('mail.form.subject.placeholder') }]}
          >
            <Input placeholder={t('mail.form.subject.placeholder')} />
          </Form.Item>

          <Form.Item
            label={t('mail.form.content.label')}
            name="content"
            rules={[{ required: true, message: t('mail.form.content.placeholder') }]}
          >
            <TextArea
              rows={10}
              placeholder={t('mail.form.content.placeholder')}
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
              {sending ? t('common.sending') : t('common.send')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HtmlMail;
