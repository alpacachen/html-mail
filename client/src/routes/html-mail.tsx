import { Routes, Route } from "react-router-dom";
import Home from "../pages/html-mail";
import HtmlMail from "../pages/html-mail/send";
import GithubCallback from "../pages/github-oauth-callback";
import GiteeCallback from "../pages/gitee-oauth-callback";

const HtmlMailRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="send" element={<HtmlMail />} />
      <Route path="auth/github/callback" element={<GithubCallback />} />
      <Route path="auth/gitee/callback" element={<GiteeCallback />} />
    </Routes>
  );
};

export default HtmlMailRoutes;
