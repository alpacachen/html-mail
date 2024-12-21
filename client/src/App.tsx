import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HtmlMail from "./pages/HtmlMail.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html-mail" element={<HtmlMail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
