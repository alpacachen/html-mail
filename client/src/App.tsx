import { Routes, Route } from "react-router-dom";
import { Flex } from "antd";
import HtmlMailRoutes from "./routes/html-mail";
import NotFound from "./pages/not-found";
import GithubCallback from "./pages/github-oauth-callback";
import GiteeCallback from "./pages/gitee-oauth-callback";

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
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {children}
      </div>
    </Flex>
  </div>
);

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<div>1112</div>} />
        <Route path="/html-mail/*" element={<HtmlMailRoutes />} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />
        <Route path="/auth/gitee/callback" element={<GiteeCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
