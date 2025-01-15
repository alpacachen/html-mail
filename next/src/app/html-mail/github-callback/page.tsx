"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";

function CallbackHandler() {
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const processedCode = useRef<string | null>(null);

  const handleGithubCallback = useCallback(async (code: string) => {
    if (processedCode.current === code) return;
    processedCode.current = code;
    
    try {
      const response = await fetch("/api/auth/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) throw new Error("Authentication failed");
      
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.token);
      router.push("/html-mail/creator");
    } catch (error) {
      console.error("GitHub auth error:", error);
      setError("登录失败，请重试");
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams[1];
    if (code) {
      handleGithubCallback(code);
    }
  }, [searchParams, handleGithubCallback]);

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-pulse">正在处理 GitHub 登录...</div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-8">加载中...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
