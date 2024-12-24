import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HtmlMail from "./pages/HtmlMail";
import GithubCallback from "./pages/GithubCallback";
import NotFound from "./pages/NotFound";
import { Flex } from "antd";
function App() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html-mail" element={<HtmlMail />} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Flex>
  );
}

export default App;
