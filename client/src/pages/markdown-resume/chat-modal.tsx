import {
  ArrowLeftOutlined,
  CloseOutlined,
  GithubOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Popover, Tag, Typography } from "antd";
import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { useTimeoutFn } from "react-use";
import { CareerStepGuide, EditCareer } from "./career-step";
import { CommonInput } from "./helpers";
import { StepBarProps } from "./helpers";

const Step0: FC<{ next: () => void }> = ({ next }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography.Title className="text-9">
        欢迎使用 markdown 简历生成器
      </Typography.Title>
      <Typography.Paragraph className="text-7">
        接下来我会通过提问沟通的方式一步步引导你完善简历。
      </Typography.Paragraph>
      <Button type="primary" onClick={next} size="large">
        开始
      </Button>
    </div>
  );
};

const Setp1: FC<StepBarProps> = ({ next }) => {
  return (
    <div className="animate-fade-in">
      <Typography.Title className="text-9">你的名字是？</Typography.Title>
      <CommonInput
        className="w-50"
        onSubmit={next}
        validator={Boolean}
        placeholder="你的名字"
        defaultValue="虚竹"
      />
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
          defaultValue="28"
          validator={(value) => Number.isInteger(Number(value))}
          className="w-14 text-center"
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

const Step3: FC<StepBarProps> = ({ next }) => {
  const [level, setLevel] = useState(0);
  const [job, setJob] = useState(0);

  return (
    <div className="animate-fade-in outline-none flex flex-col items-center justify-center gap-4">
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
      <Button type="primary" onClick={next} size="large">
        下一步
      </Button>
    </div>
  );
};

const Step4: FC<StepBarProps> = ({ next }) => {
  return (
    <div className="animate-fade-in flex flex-col gap-2 justify-center items-center">
      <Typography.Title className="text-9">怎么联系你？</Typography.Title>
      <CommonInput
        defaultValue="虚竹@少林寺.cn"
        className="w-60 text-6!"
        placeholder="email or phone"
        onSubmit={next}
        validator={Boolean}
      />
    </div>
  );
};

const Step5: FC<StepBarProps> = ({ next }) => {
  interface Education {
    start: string;
    end: string;
    school: string;
    degree: string;
  }
  const defaultPrimaryEducation = {
    start: "2018",
    end: "2021",
    school: "灵鹫宫",
    degree: "硕士",
  };

  const [educations, _setEducations] = useState<Education[]>([
    {
      start: "2013",
      end: "2017",
      school: "少林寺",
      degree: "学士",
    },
    defaultPrimaryEducation,
  ]);

  const [shaking, setShaking] = useState(false);
  useTimeoutFn(
    () => {
      setShaking(false);
    },
    shaking ? 1000 : 0
  );

  const setEducations = (index: number, education: Education) => {
    const newEducations = [...educations];
    newEducations[index] = education;
    _setEducations(newEducations);
  };
  const ref = useRef<HTMLDivElement>(null);

  const handerNext = () => {
    if (educations.some((edu) => Object.values(edu).some((value) => !value))) {
      setShaking(true);
      return;
    }
    next();
  };
  return (
    <div ref={ref} tabIndex={1} className="animate-fade-in h-full outline-none">
      <div
        className={classNames(
          "flex flex-col gap-8 items-center h-full pt-10 box-border",
          shaking && "animate-shake-x"
        )}
      >
        <Typography.Title className="text-9">教育经历</Typography.Title>
        {educations.map((edu, index) => {
          return (
            <div key={index} className="flex text-5 relative group">
              {index == 0 && educations.length == 1 && (
                <Button
                  shape="circle"
                  className="absolute -right-8 top-0 bottom-0 m-auto hidden group-hover:block animate-fade-in animate-duration-200"
                  onClick={() =>
                    _setEducations([...educations, defaultPrimaryEducation])
                  }
                >
                  <PlusOutlined />
                </Button>
              )}
              {index == 1 && (
                <Button
                  shape="circle"
                  className="absolute -right-8 top-0 bottom-0 m-auto hidden group-hover:block animate-fade-in animate-duration-200"
                  onClick={() => _setEducations(educations.slice(0, -1))}
                >
                  <CloseOutlined />
                </Button>
              )}
              <CommonInput
                defaultValue={edu.start}
                validator={Boolean}
                className="w-25 text-center text-5!"
                onChange={(value) =>
                  setEducations(index, { ...edu, start: value })
                }
              />
              —
              <CommonInput
                defaultValue={edu.end}
                validator={Boolean}
                className="w-25 text-center text-5!"
                onChange={(value) =>
                  setEducations(index, { ...edu, end: value })
                }
              />
              在
              <CommonInput
                defaultValue={edu.school}
                validator={Boolean}
                className="w-38 text-center text-5!"
                onChange={(value) =>
                  setEducations(index, { ...edu, school: value })
                }
              />
              ， 获得
              <CommonInput
                defaultValue={edu.degree}
                validator={Boolean}
                className="w-12 text-center text-5!"
                onChange={(value) =>
                  setEducations(index, { ...edu, degree: value })
                }
              />
              学位
            </div>
          );
        })}
        <Button type="primary" onClick={handerNext} size="large">
          下一步
        </Button>
      </div>
    </div>
  );
};

const JuejinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 36 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z"
      fill="#1E80FF"
    />
  </svg>
);

const Step6: FC<StepBarProps> = ({ next }) => {
  const links = [
    {
      icon: <GithubOutlined className="text-6!" />,
      key: "github",
      placeholder: "github",
      value: "https://github.com/xuzhu",
    },
    {
      icon: <JuejinIcon />,
      key: "juejin",
      placeholder: "https://juejin.cn/user/xxxx",
      value: "https://juejin.cn/user/782508011819847",
    },
    {
      icon: <HomeOutlined className="text-6!" />,
      key: "home",
      placeholder: "个人主页",
      value: "",
    },
  ];
  const defaultValues = links
    .map((link) => ({
      [link.key]: link.value,
    }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  const [showForm, setShowForm] = useState(false);
  useTimeoutFn(() => {
    setShowForm(true);
  }, 100);
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <div className="pt-10">
        <Typography.Title className="text-9!">有作品展示吗？</Typography.Title>
        <Typography.Text type="secondary">
          比如 github主页，掘金专栏，个人网站
        </Typography.Text>
      </div>
      {showForm ? (
        <Form
          className="flex-1"
          autoFocus
          initialValues={defaultValues}
          onFinish={next}
        >
          {links.map((link, index) => (
            <Form.Item
              style={{
                opacity: 0,
                animation: "fade-in 0.5s ease-in-out forwards",
                animationDelay: `${index * 0.2}s`,
              }}
              name={link.key}
              label={link.icon}
            >
              <Input
                autoFocus
                className="w-60 text-4! ring-0px! b-b-3 b-solid b-t-0 b-r-0 b-l-0 p-0 m-0  font-600 bg-transparent!"
                placeholder={link.placeholder}
              />
            </Form.Item>
          ))}
          <input type="submit" hidden />
        </Form>
      ) : (
        <div className="flex-1"></div>
      )}
    </div>
  );
};

export default function ChatModal() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const next = () => setStep(step + 1);
  const prev = () => setStep(Math.max(0, step - 1));
  useEffect(() => {
    if (step === 9) {
      setOpen(false);
    }
  }, [open, step]);
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
        {step === 5 && <Step5 next={next} prev={prev} />}
        {step === 6 && <Step6 next={next} prev={prev} />}
        {step === 7 && <CareerStepGuide next={next} prev={prev} />}
        {step === 8 && <EditCareer next={next} prev={prev} />}
      </div>
    </Modal>
  );
}
