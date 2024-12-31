import { Input } from "antd";
import classNames from "classnames";
import { FC, useState } from "react";
import { useTimeoutFn } from "react-use";

export interface Career {
  title: string;
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
