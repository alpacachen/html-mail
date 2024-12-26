import React, { useState, useEffect } from "react";
import { Button, Space, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { User } from "../types";

const AuthStatus: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [expiresIn, setExpiresIn] = useState<string>("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

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

        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        setExpiresIn(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    };

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

  const handleGiteeLogin = () => {
    const clientId = import.meta.env.VITE_GITEE_OAUTH_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/gitee/callback`
    );
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  if (user) {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <img
            src={user.avatarUrl}
            alt="avatar"
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <Typography.Text type="success">
            {t('auth.authenticated', {
              platform: user.source === 'github' ? 'GitHub' : 'Gitee',
              name: user.name || user.login
            })}
          </Typography.Text>
        </Space>
        {expiresIn && (
          <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
            {t('auth.expiresIn', { time: expiresIn })}
          </Typography.Text>
        )}
      </Space>
    );
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography.Text type="warning">
        {t('auth.needAuth')}
      </Typography.Text>
      <Space.Compact block>
        <Button
          type="primary"
          icon={<GithubOutlined />}
          onClick={handleGithubLogin}
          style={{ width: "50%" }}
        >
          {t('auth.github')}
        </Button>
        <Button
          type="default"
          icon={
            <img
              src="https://gitee.com/static/images/logo-black.svg"
              alt="gitee"
              style={{
                height: 14,
                marginRight: 8,
                position: "relative",
                top: -1,
              }}
            />
          }
          onClick={handleGiteeLogin}
          style={{ width: "50%" }}
        >
          {t('auth.gitee')}
        </Button>
      </Space.Compact>
    </Space>
  );
};

export default AuthStatus; 