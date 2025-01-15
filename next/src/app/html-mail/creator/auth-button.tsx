"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  name: string;
  avatarUrl: string;
}

export const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [expiresIn, setExpiresIn] = useState<{
    minutes: number;
    seconds: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    if (userStr && token) {
      setUser(JSON.parse(userStr));
      // 解析 JWT 获取过期时间
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // 转换为毫秒

      const updateExpiresIn = () => {
        const now = Date.now();
        const remainingMs = Math.max(0, exp - now);
        const minutes = Math.floor(remainingMs / 1000 / 60);
        const seconds = Math.floor((remainingMs / 1000) % 60);

        setExpiresIn({ minutes, seconds });

        if (remainingMs <= 0) {
          setUser(null);
          setExpiresIn(null);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
        }
      };

      updateExpiresIn();
      const timer = setInterval(updateExpiresIn, 1000); // 每秒更新一次
      return () => clearInterval(timer);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const isDev = location.hostname === "localhost";
  const githubClientId = isDev
    ? "Ov23li8vZhsKAHi2ZJT3"
    : "Ov23liTznPyWE9sBhb0W";
  const giteeClientId = isDev
    ? "909e42ce3b5ecbce18c09494e71d4aa406e0ca804f711a676ff4dec028ece99a"
    : "Iv1.6111111111111111";

  const handleGithubLogin = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/html-mail/github-callback`
    );
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}`;
  };

  const handleGiteeLogin = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/gitee/callback`
    );
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${giteeClientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={24}
          height={24}
          className="rounded-full"
        />
        <div className="flex gap-2 items-center justify-center">
          <span className="text-sm text-green-700">{user.name}</span>
          <span className="text-xs text-green-600 font-mono">
            {expiresIn?.minutes.toString().padStart(2, "0")}:
            {expiresIn?.seconds.toString().padStart(2, "0")} 后过期
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleGithubLogin}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </button>
      <button
        disabled
        onClick={handleGiteeLogin}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.016zm6.09 5.333c.328 0 .593.266.593.593v1.482a.594.594 0 0 1-.593.593H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.593.593.593h8.889a.594.594 0 0 1 .593.593v1.481a.594.594 0 0 1-.593.593h-8.89c-.326 0-.592.266-.592.593v1.482c0 .327.266.593.593.593h8.889a.594.594 0 0 1 .593.593v1.481a.594.594 0 0 1-.593.593H9.777c-.982 0-1.778-.796-1.778-1.778v-1.482c0-.327-.266-.593-.593-.593H5.333a.594.594 0 0 1-.593-.593v-1.481c0-.327.266-.593.593-.593h2.074c.327 0 .593-.266.593-.593V9.779c0-1.982 1.604-3.586 3.586-3.586h6.09v-.86z" />
        </svg>
        Gitee
      </button>
    </div>
  );
};
