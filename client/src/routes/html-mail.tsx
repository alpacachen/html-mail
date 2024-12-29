import { Routes, Route } from "react-router-dom";
import Home from "../pages/html-mail";
import HtmlMail from "../pages/html-mail/send";
import GithubCallback from "../pages/github-oauth-callback";
import GiteeCallback from "../pages/gitee-oauth-callback";
import { Flex } from "antd";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      boxSizing: "border-box",
      padding: "24px",
      position: "relative",
    }}
  >
    <Flex
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Flex>
  </div>
);

const HtmlMailRoutes = () => {
  return (
    <AppLayout>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="send" element={<HtmlMail />} />
          <Route path="auth/github/callback" element={<GithubCallback />} />
          <Route path="auth/gitee/callback" element={<GiteeCallback />} />
        </Routes>
      </div>
    </AppLayout>
  );
};

export default HtmlMailRoutes;
