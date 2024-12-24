import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography, Space, Tag, Image } from "antd";
import {
  GithubOutlined,
  MailOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface User {
  name: string;
  login: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [expiresIn, setExpiresIn] = useState<string>("");

  useEffect(() => {
    const updateExpiryTime = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      if (payload.exp) {
        const expirationTime = new Date(payload.exp * 1000);
        const now = new Date();
        const diffInSeconds = Math.floor(
          (expirationTime.getTime() - now.getTime()) / 1000
        );

        if (diffInSeconds <= 0) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setExpiresIn("");
          return;
        }

        if (diffInSeconds < 60) {
          setExpiresIn(`${diffInSeconds}秒`);
        } else {
          const minutes = Math.floor(diffInSeconds / 60);
          const seconds = diffInSeconds % 60;
          setExpiresIn(`${minutes}分${seconds}秒`);
        }
      }
    };

    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    updateExpiryTime();
    const timer = setInterval(updateExpiryTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/github/callback`
    );
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <div>
      <Card style={{ width: "100%", maxWidth: "800px" }}>
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Image
            src="/logo.png"
            alt="HTML Mail"
            preview={false}
            width={132}
            height={132}
          />
          <Title level={2} style={{ margin: 0, marginBottom: "24px" }}>
            邮件工具箱
          </Title>
        </Space>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {user ? (
            <Card
              type="inner"
              title="登录状态"
              extra={
                <Tag
                  color={expiresIn.includes("秒") ? "error" : "processing"}
                  icon={
                    expiresIn.includes("秒") ? (
                      <WarningOutlined />
                    ) : (
                      <ClockCircleOutlined />
                    )
                  }
                >
                  {expiresIn}后过期
                </Tag>
              }
            >
              <Space direction="vertical">
                <Text>欢迎回来, {user.name || user.login}</Text>
                <Link to="/html-mail">
                  <Button type="primary" icon={<MailOutlined />} block>
                    使用 HTML 邮件工具
                  </Button>
                </Link>
              </Space>
            </Card>
          ) : (
            <Card type="inner" title="未登录">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text type="secondary">
                  请使用 GitHub 账号登录以使用邮件工具
                </Text>
                <Button
                  type="primary"
                  icon={<GithubOutlined />}
                  onClick={handleGithubLogin}
                  block
                >
                  GitHub 登录
                </Button>
              </Space>
            </Card>
          )}

          <Card type="inner" title="设计初衷">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>在开发 HTML 邮件时，我们经常遇到以下挑战：</Text>
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                <li>
                  <Text>各邮件客户端对 HTML 内容的渲染支持度参差不齐</Text>
                </li>
                <li>
                  <Text>调试过程繁琐，需要不断发送测试邮件来验证效果</Text>
                </li>
                <li>
                  <Text>市面上缺乏好用的 HTML 邮件编辑工具</Text>
                </li>
                <li>
                  <Text>现有的在线服务多为海外付费产品，使用不便</Text>
                </li>
              </ul>
              <Text>
                基于以上原因，我们开发了这个简单的工具，希望能帮助开发者更方便地测试和调试
                HTML 邮件。
              </Text>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
