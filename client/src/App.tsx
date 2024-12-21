import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HtmlMail from "./pages/HtmlMail";
import GithubCallback from "./pages/GithubCallback";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html-mail" element={<HtmlMail />} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
