import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GiteeCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const processedCode = useRef<string | null>(null);

  const handleGiteeCallback = useCallback(
    async (code: string) => {
      if (processedCode.current === code) {
        return;
      }
      processedCode.current = code;

      try {
        const response = await fetch("/api/auth/gitee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...data.user,
            source: 'gitee'
          })
        );
        
        // 修改这里：跳转到 html-mail 页面
        navigate("/html-mail");
      } catch (error) {
        console.error("Gitee auth error:", error);
        setError("登录失败，请重试");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleGiteeCallback(code);
    }
  }, [searchParams, handleGiteeCallback]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return <div>正在处理 Gitee 登录...</div>;
};

export default GiteeCallback; 