import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

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
          // Token 已过期，清除登录状态
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

    // 初始更新
    updateExpiryTime();
    // 每秒更新一次
    const timer = setInterval(updateExpiryTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGithubLogin = () => {
    const clientId = 'Ov23liTznPyWE9sBhb0W'
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/github/callback`
    );
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <div>
      <h1>工具箱</h1>
      <nav className={styles.nav}>
        <Link to="/html-mail" className={styles.link}>
          HTML邮件工具
        </Link>
        {user ? (
          <div className={styles.userInfo}>
            <p>欢迎回来, {user.name || user.login}</p>
            <p className={styles.expiry}>
              登录状态将在{expiresIn}后过期
              {expiresIn.includes("秒") && (
                <span className={styles.warning}>!</span>
              )}
            </p>
          </div>
        ) : (
          <button onClick={handleGithubLogin} className={styles.githubButton}>
            使用 GitHub 登录
          </button>
        )}
      </nav>
    </div>
  );
};

export default Home;
