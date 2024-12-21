import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GithubCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const processedCode = useRef<string | null>(null);

  const handleGithubCallback = useCallback(
    async (code: string) => {
      if (processedCode.current === code) {
        return;
      }
      processedCode.current = code;

      try {
        const response = await fetch("/api/auth/github", {
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
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/");
      } catch (error) {
        console.error("GitHub auth error:", error);
        setError("登录失败，请重试");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleGithubCallback(code);
    }
  }, [searchParams, handleGithubCallback]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return <div>正在处理 GitHub 登录...</div>;
};

export default GithubCallback;
