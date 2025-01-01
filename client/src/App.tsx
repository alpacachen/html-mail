import { Routes, Route } from "react-router-dom";
import HtmlMailRoutes from "./routes/html-mail";
import NotFound from "./pages/not-found";
import GithubCallback from "./pages/github-oauth-callback";
import GiteeCallback from "./pages/gitee-oauth-callback";
import { MarkdownResumeRoutes } from "./pages/markdown-resume/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>1112</div>} />
      <Route path="/html-mail/*" element={<HtmlMailRoutes />} />
      <Route path="/markdown-resume/*" element={<MarkdownResumeRoutes />} />
      <Route path="/auth/github/callback" element={<GithubCallback />} />
      <Route path="/auth/gitee/callback" element={<GiteeCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
