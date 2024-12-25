import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography, Space, Image } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Card style={{ width: "100%", maxWidth: "800px" }}>
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Image
            src="/logo.png"
            alt="HTML Mail"
            preview={false}
            width={132}
            height={132}
          />
          <Title level={2} style={{ margin: 0, marginBottom: "24px" }}>
            邮件工具箱
          </Title>
        </Space>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Link to="/html-mail">
            <Button type="primary" icon={<MailOutlined />} block>
              开始使用 HTML 邮件工具
            </Button>
          </Link>

          <Card type="inner" title="设计初衷">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>在开发 HTML 邮件时，我们经常遇到以下挑战：</Text>
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                <li>
                  <Text>各邮件客户端对 HTML 内容的渲染支持度参差不齐</Text>
                </li>
                <li>
                  <Text>调试过程繁琐，需要不断发送测试邮件来验证效果</Text>
                </li>
                <li>
                  <Text>市面上缺乏好用的 HTML 邮件编辑工具</Text>
                </li>
                <li>
                  <Text>现有的在线服务多为海外付费产品，使用不便</Text>
                </li>
              </ul>
              <Text>
                基于以上原因，我们开发了这个简单的工具，希望能帮助开发者更方便地测试和调试
                HTML 邮件。
              </Text>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
