// 邮箱配置接口
export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

// 用户信息接口
export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  source: 'github' | 'gitee';
}

// 发送邮件的表单值类型
export interface EmailFormValues {
  email: string;
  content: string;
  subject: string;
  config?: EmailConfig;
}

// 配置类型
export type ConfigType = "quick" | "custom";
 