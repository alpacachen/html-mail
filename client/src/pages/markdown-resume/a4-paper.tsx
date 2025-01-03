import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
const _A4Paper = (
  { content }: { content: string },
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      id="ghost-page"
      className={"w-210mm minh-297mm px-15mm py-10mm bg-white box-border"}
    >
      <div id="ghost">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export const A4Paper = forwardRef(_A4Paper);
