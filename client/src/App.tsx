import { Routes, Route } from "react-router-dom";
import { Flex, Select } from "antd";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import HtmlMail from "./pages/HtmlMail";
import GithubCallback from "./pages/GithubCallback";
import GiteeCallback from "./pages/GiteeCallback";
import NotFound from "./pages/NotFound";

function App() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      padding: "24px",
      position: "relative",
    }}>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          options={[
            { value: "zh", label: "中文" },
            { value: "en", label: "English" },
          ]}
        />
      </div>
      <Flex 
        style={{
          minHeight: "calc(100vh - 48px)", // 减去 padding
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{
          width: "100%",
          maxWidth: "800px",
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/html-mail" element={<HtmlMail />} />
            <Route path="/auth/github/callback" element={<GithubCallback />} />
            <Route path="/auth/gitee/callback" element={<GiteeCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Flex>
    </div>
  );
}

export default App;
