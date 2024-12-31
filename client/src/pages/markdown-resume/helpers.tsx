import { Input } from "antd";
import classNames from "classnames";
import constate from "constate";
import { FC, useState } from "react";
import { useTimeoutFn } from "react-use";

export interface Education {
  start: string;
  end: string;
  school: string;
  degree: string;
}
export interface Resume {
  name: string;
  age: string;
  expect: {
    level: string;
    job: string;
  };
  contact: string;
  education: Education[];
  links: {
    github?: string;
    juejin?: string;
    home?: string;
  };
  careers: Career[];
}

export const resumeDataToMarkdown = (data: Resume) => {
  return `# ${data.name} - ${data.expect.level}${data.expect.job}工程师 - ${
    data.contact
  }

## 教育经历

${data.education
  .map(
    (item) =>
      `- <span style="display: flex; justify-content: space-between;">${item.start} - ${item.end} ${item.school}  ${item.degree} </span>`
  )
  .join("\n")}

## 工作经历

${data.careers
  .map((item) => `${item.company} - ${item.time} - ${item.description}`)
  .join("\n")}
`;
};

const useHook = () => {
  const [resume, _setResume] = useState<Resume>({
    name: "",
    age: "",
    expect: {
      level: "",
      job: "",
    },
    contact: "",
    education: [],
    links: {},
    careers: [],
  });
  console.log(resume, "resume");
  const setResume = (data: Partial<Resume>) => {
    _setResume((prev) => {
      const _data = {
        ...prev,
        ...data,
      };
      localStorage.setItem("resume", JSON.stringify(_data));
      return _data;
    });
  };

  return {
    resume,
    setResume,
  };
};

export const [ChatModalProvider, useChatModal] = constate(useHook);

export interface Career {
  company: string;
  time: string;
  description: string;
}

export interface StepBarProps {
  next: () => void;
  prev: () => void;
}

export const CommonInput: FC<{
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  className?: string;
  validator: (value?: string) => boolean;
  placeholder?: string;
  defaultValue: string;
}> = ({
  onSubmit,
  onChange,
  className,
  validator,
  placeholder,
  defaultValue,
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [shaking, setShaking] = useState(false);
  useTimeoutFn(
    () => {
      setShaking(false);
    },
    shaking ? 1000 : 0
  );
  return (
    <Input
      className={classNames(
        "ring-0px! b-b-3 b-solid b-t-0 b-r-0 b-l-0 p-0 m-0 text-9 font-600 bg-transparent! text-center",
        className,
        shaking && "animate-shake-x"
      )}
      autoFocus
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e.target.value);
      }}
      onPressEnter={() => {
        if (!isComposing) {
          if (validator(value.trim())) {
            onSubmit?.(value.trim());
          } else {
            setShaking(true);
          }
        }
      }}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    />
  );
};
