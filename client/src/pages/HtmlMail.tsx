import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/api";
import styles from "./HtmlMail.module.css";

const HtmlMail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (!email || !content) {
      setMessage("请填写收件人邮箱和邮件内容");
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
        throw new Error("发送失败");
      }

      await response.json();
      setMessage("邮件发送成功！");
      setEmail("");
      setContent("");
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof Error && error.message === "Unauthorized") {
        navigate("/");
        return;
      }
      setMessage("邮件发送失败，请重试");
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
            onChange={(e) => setEmail(e.target.value)}
            className={styles["email-input"]}
            placeholder="请输入收件人邮箱"
            required
          />
        </div>

        <textarea
          placeholder="在这里编写 HTML 邮件内容..."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles["mail-editor"]}
        />

        {message && (
          <div
            className={styles[message.includes("成功") ? "success" : "error"]}
          >
            {message}
          </div>
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
