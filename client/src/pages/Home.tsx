import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography, Space, Image } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation();

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
            {t('home.title')}
          </Title>
        </Space>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Link to="/html-mail">
            <Button type="primary" icon={<MailOutlined />} block>
              {t('home.startUse')}
            </Button>
          </Link>

          <Card type="inner" title={t('home.purpose.title')}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>{t('home.purpose.intro')}</Text>
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                <li>
                  <Text>{t('home.purpose.challenges.render')}</Text>
                </li>
                <li>
                  <Text>{t('home.purpose.challenges.debug')}</Text>
                </li>
                <li>
                  <Text>{t('home.purpose.challenges.tools')}</Text>
                </li>
                <li>
                  <Text>{t('home.purpose.challenges.service')}</Text>
                </li>
              </ul>
              <Text>
                {t('home.purpose.conclusion')}
              </Text>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
