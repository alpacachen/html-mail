import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography, Space, Tag } from "antd";
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
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          邮件工具箱
        </Title>

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

          <Card type="inner" title="功能介绍">
            <Space direction="vertical">
              <Text>• 支持发送 HTML 格式的邮件</Text>
              <Text>• 使用 GitHub 账号快速登录</Text>
              <Text>• 简单易用的界面设计</Text>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
