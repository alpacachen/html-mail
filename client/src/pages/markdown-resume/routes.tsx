import { Route, Routes } from "react-router-dom";
import { MarkdownResumeTemplateList } from "./list";
import { MarkdownResumeDescription } from "./description";
import { MarkdownResumeEdit } from "./edit";
export const MarkdownResumeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MarkdownResumeDescription />} />
      <Route path="/template-list" element={<MarkdownResumeTemplateList />} />
      <Route path="/resume-edit" element={<MarkdownResumeEdit />} />
    </Routes>
  );
};
