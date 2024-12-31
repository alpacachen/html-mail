import { Button, Form, Input, Popover, Tag, Typography } from "antd";
import { Career, StepBarProps, useChatModal } from "./helpers";
import { FC, useState } from "react";
import { EditOutlined, QuestionOutlined } from "@ant-design/icons";
import { suggestions, careerTemplates } from "./career-constants";

export function CareerStepGuide({ next }: StepBarProps) {
  return (
    <div className="animate-fade-in h-full w-full flex flex-col items-center justify-center">
      <Typography.Title className="text-7!">
        接下来是简历中最重要的部分，介绍你的职业生涯
      </Typography.Title>
      <Typography.Paragraph className="text-6!">
        仔细回想你过往的经历中重要的闪光点，比如
      </Typography.Paragraph>
      <div className="flex flex-wrap gap-2 justify-center max-w-200 relative">
        <Button
          type="primary"
          onClick={next}
          size="large"
          className="absolute bottom-10 z-1"
        >
          下一步
        </Button>
        {suggestions.map((suggestion) => (
          <Tag color="blue">{suggestion}</Tag>
        ))}
      </div>
    </div>
  );
}

const CareerForm: FC<{
  defaultValues: Career;
  onFinish: (values: Career) => void;
}> = ({ defaultValues, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form<Career>
      onFinish={onFinish}
      form={form}
      className="w-full h-full pt-10 flex flex-col items-center justify-center"
      layout="vertical"
    >
      <div className="flex justify-between w-full">
        <Form.Item name="company" rules={[{ required: true }]}>
          <Input
            placeholder="少林有限公司 - 编辑器开发"
            className="w-60 text-4! ring-0px! b-b-3 b-solid b-t-0 b-r-0 b-l-0 p-0 m-0  font-600 bg-transparent!"
          />
        </Form.Item>
        <Form.Item name="time" rules={[{ required: true }]}>
          <Input
            placeholder="2017.9-2020.1"
            className="w-40 text-4! ring-0px! b-b-3 b-solid b-t-0 b-r-0 b-l-0 p-0 m-0  font-600 bg-transparent! text-right"
          />
        </Form.Item>
      </div>
      <div className="flex-1 w-full flex gap-8 items-center justify-center">
        <Form.Item
          className="flex-1 w-full"
          rules={[{ required: true }]}
          name="description"
        >
          <Input.TextArea
            placeholder="使用markdown列表形式，言简意赅描述你的工作职责，工作亮点，以及你为公司带来的价值，最好标准是可以量化的"
            rows={10}
            className="lh-7! text-4! "
          />
        </Form.Item>
        <div className="flex flex-col gap-4 items-center">
          <Popover title="预填模板" content="把站长的经历写进去做参考">
            <Button
              htmlType="button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                form.setFieldsValue(defaultValues);
              }}
            />
          </Popover>

          <Popover
            title="获取灵感"
            content={
              <div className="w-100 h-100 overflow-y-auto flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Tag color="blue">{suggestion}</Tag>
                ))}
              </div>
            }
          >
            <Button
              htmlType="button"
              shape="circle"
              icon={<QuestionOutlined />}
            />
          </Popover>

          <Button type="primary" htmlType="submit">
            完成
          </Button>
        </div>
      </div>
    </Form>
  );
};

export function EditCareer({ next }: StepBarProps) {
  const [careers, setCareers] = useState<Career[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const { setResume } = useChatModal();

  return (
    <div className="animate-fade-in h-full w-full flex gap-4 pl-15 pr-5 flex-col items-center justify-center">
      {!showQuestion ? (
        <CareerForm
          defaultValues={careerTemplates[careers.length % 2]}
          onFinish={(values) => {
            setCareers([...careers, values]);
            setShowQuestion(true);
          }}
        />
      ) : (
        <div className="flex  gap-4 items-center justify-center">
          <Button onClick={() => setShowQuestion(false)} size="large">
            再添加一段经历
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setResume({ careers: careers });
              next();
            }}
            size="large"
          >
            生成简历
          </Button>
        </div>
      )}
    </div>
  );
}
