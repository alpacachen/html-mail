import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Popover, Tag, Typography } from "antd";
import classNames from "classnames";
import { FC, useState } from "react";
import { useEvent, useTimeoutFn } from "react-use";

interface StepBarProps {
  next: () => void;
  prev: () => void;
}

const CommonInput: FC<{
  onSubmit: () => void;
  className?: string;
  validator: (value?: string) => boolean;
  placeholder?: string;
}> = ({ onSubmit, className, validator, placeholder }) => {
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState("");
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
        "ring-0px! b-b-3 b-solid b-t-0 b-r-0 b-l-0 p-0 m-0 text-9 font-600 bg-transparent!",
        className,
        shaking && "animate-shake-x"
      )}
      autoFocus
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={(input) => input && input.focus()}
      onPressEnter={() => {
        if (!isComposing) {
          if (validator(value.trim())) {
            onSubmit();
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

const Step0: FC<{ next: () => void }> = ({ next }) => {
  useEvent("keydown", (e) => {
    if (e.key === "Enter") {
      next();
    }
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography.Title className="text-9">
        欢迎使用 markdown 简历生成器
      </Typography.Title>
      <Typography.Paragraph className="text-7">
        接下来我会通过提问沟通的方式一步步引导你完善简历。
      </Typography.Paragraph>
      <Button type="primary" onClick={next}>
        开始 <EnterOutlined />
      </Button>
    </div>
  );
};

const Setp1: FC<StepBarProps> = ({ next }) => {
  return (
    <div className="animate-fade-in">
      <Typography.Title className="text-9">你的名字是？</Typography.Title>
      <CommonInput className="w-50" onSubmit={next} validator={Boolean} />
    </div>
  );
};

const Setp2: FC<StepBarProps> = ({ next }) => {
  // 询问工作年限
  return (
    <div className="animate-fade-in">
      <Typography.Title className="text-9">
        今年
        <CommonInput
          validator={(value) => Number.isInteger(Number(value))}
          className="w-10 text-center"
          onSubmit={next}
        />
        岁
      </Typography.Title>
    </div>
  );
};

const LevelList = [
  { label: "初级", value: "初级", color: "blue" },
  { label: "中级", value: "中级", color: "green" },
  { label: "高级", value: "高级", color: "red" },
  { label: "资深", value: "资深", color: "purple" },
];

const LevelPopover: FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      {LevelList.map((item, index) => (
        <Tag
          key={item.value}
          className="text-7 lh-normal"
          color={item.color}
          onClick={() => onChange(index)}
        >
          {item.label}
        </Tag>
      ))}
    </div>
  );
};

const JobList = [
  { label: "前端", value: "前端", color: "blue" },
  { label: "后端", value: "后端", color: "green" },
  { label: "全栈", value: "全栈", color: "red" },
];
const JobPopover: FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      {JobList.map((item, index) => (
        <Tag
          key={item.value}
          className="text-7 lh-normal"
          color={item.color}
          onClick={() => onChange(index)}
        >
          {item.label}
        </Tag>
      ))}
    </div>
  );
};

const NextButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      className="absolute right-10 top-10"
      shape="circle"
      onClick={onClick}
    >
      <ArrowRightOutlined />
    </Button>
  );
};

const Step3: FC<StepBarProps> = ({ next }) => {
  const [level, setLevel] = useState(0);
  const [job, setJob] = useState(0);
  // 支持 enter 下一步
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      next();
    }
  };
  useEvent("keydown", handleEnter);
  return (
    <div className="animate-fade-in">
      <NextButton onClick={next} />
      <Typography.Title className="text-9">
        期望寻求一份
        <Popover content={<LevelPopover onChange={setLevel} />}>
          <Tag color={LevelList[level].color} className="text-9 lh-normal">
            {LevelList[level].label}
          </Tag>
        </Popover>
        <Popover content={<JobPopover onChange={setJob} />}>
          <Tag color={JobList[job].color} className="text-9 lh-normal">
            {JobList[job].label}
          </Tag>
        </Popover>
        工程师的工作
      </Typography.Title>
    </div>
  );
};

const Step4: FC<StepBarProps> = ({ next }) => {
  return (
    <div className="animate-fade-in">
      <Typography.Title className="text-9">怎么联系你？</Typography.Title>
      <CommonInput
        className="w-60 text-6!"
        placeholder="email or phone"
        onSubmit={next}
        validator={Boolean}
      />
    </div>
  );
};

export default function ChatModal() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const next = () => setStep(step + 1);
  const prev = () => setStep(Math.max(0, step - 1));
  return (
    <Modal
      open={open}
      maskClosable={false}
      centered
      width={800}
      closable={false}
      onCancel={() => setOpen(false)}
      title={null}
      footer={null}
    >
      <div className="h-100 flex items-center justify-center">
        {step > 0 && (
          <Button
            shape="circle"
            onClick={prev}
            className="absolute left-10 top-10"
          >
            <ArrowLeftOutlined />
          </Button>
        )}
        {step === 0 && <Step0 next={next} />}
        {step === 1 && <Setp1 next={next} prev={prev} />}
        {step === 2 && <Setp2 next={next} prev={prev} />}
        {step === 3 && <Step3 next={next} prev={prev} />}
        {step === 4 && <Step4 next={next} prev={prev} />}
      </div>
    </Modal>
  );
}
