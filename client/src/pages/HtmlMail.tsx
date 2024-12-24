import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/api";
import styles from "./HtmlMail.module.css";

const HtmlMail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    setError(null);
    
    if (!email || !content) {
      setError("请填写收件人邮箱和邮件内容");
      return;
    }

    if (!validateEmail(email)) {
      setError("请输入有效的邮箱地址");
      return;
    }

    try {
      setSending(true);
      setMessage("");

      const response = await fetchWithAuth("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          content,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "发送失败");
      }

      await response.json();
      setMessage("邮件发送成功！");
      setEmail("");
      setContent("");
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Unauthorized") {
        navigate("/");
        return;
      }
      setError(error instanceof Error ? error.message : "邮件发送失败，请重试");
      console.error("发送邮件出错:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1>HTML 邮件工具</h1>
      <div className={styles["mail-container"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="email">收件人邮箱：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className={`${styles["email-input"]} ${error && !validateEmail(email) ? styles["input-error"] : ""}`}
            placeholder="请输入收件人邮箱"
            required
          />
          {error && !validateEmail(email) && (
            <div className={styles["error-message"]}>{error}</div>
          )}
        </div>

        <textarea
          placeholder="在这里编写 HTML 邮件内容..."
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(null);
          }}
          className={`${styles["mail-editor"]} ${error && !content ? styles["input-error"] : ""}`}
        />

        {message && (
          <div className={styles.success}>{message}</div>
        )}
        
        {error && (
          <div className={styles.error}>{error}</div>
        )}

        <button
          className={styles["send-button"]}
          onClick={handleSendEmail}
          disabled={sending}
        >
          {sending ? "发送中..." : "发送邮件"}
        </button>
      </div>
      <nav>
        <Link to="/">返回首页</Link>
      </nav>
    </div>
  );
};

export default HtmlMail;
