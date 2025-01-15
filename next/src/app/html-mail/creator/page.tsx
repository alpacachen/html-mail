"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/toast-context";
import { AuthButton } from "./auth-button";

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

interface EmailForm {
  to: string;
  subject: string;
  content: string;
  useCustomConfig: boolean;
  config?: EmailConfig;
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
  const { showToast } = useToast();
  const [formData, setFormData] = useState<EmailForm>({
    to: "",
    subject: "欢迎订阅技术周刊！",
    content: DEFAULT_HTML_CONTENT,
    useCustomConfig: false,
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      let res;
      if (formData.useCustomConfig) {
        res = await fetch("/api/send-email-custom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(formData),
        });
      }
      if (!res.ok) throw new Error(res.statusText);

      showToast("邮件发送成功！", "success");
      setFormData({ ...formData, to: "" });
    } catch (e) {
      console.info(e);
      showToast("邮件发送失败，请重试", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">创建邮件</h1>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="mb-4 font-medium">选择发送配置</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={!formData.useCustomConfig}
                    onChange={() =>
                      setFormData({ ...formData, useCustomConfig: false })
                    }
                    className="form-radio"
                  />
                  <span>使用默认配置（需要认证，防止滥用）</span>
                </label>
                <AuthButton />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={formData.useCustomConfig}
                  onChange={() =>
                    setFormData({ ...formData, useCustomConfig: true })
                  }
                  className="form-radio"
                />
                <span>使用自定义配置</span>
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.useCustomConfig && (
              <div className="p-4 border rounded-lg space-y-4">
                <div className="font-medium mb-2">SMTP 配置</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP 服务器
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例如：smtp.gmail.com"
                      value={formData.config?.host || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: {
                            ...formData.config,
                            host: e.target.value,
                          } as EmailConfig,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      端口
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="例如：465"
                      value={formData.config?.port || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: {
                            ...formData.config,
                            port: Number(e.target.value),
                          } as EmailConfig,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      用户名
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="邮箱地址"
                      value={formData.config?.user || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: {
                            ...formData.config,
                            user: e.target.value,
                          } as EmailConfig,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      密码
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="授权码"
                      value={formData.config?.pass || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: {
                            ...formData.config,
                            pass: e.target.value,
                          } as EmailConfig,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                收件人
              </label>
              <input
                type="email"
                required
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="请输入收件人邮箱"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                主题
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="请输入邮件主题"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                正文
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md font-mono"
                rows={12}
                placeholder="请输入邮件内容"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {sending ? "发送中..." : "发送邮件"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
