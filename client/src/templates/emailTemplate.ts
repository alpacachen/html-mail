import i18n from '../i18n';

const templates = {
  zh: `<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #1890ff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>欢迎使用 HTML Mail</h1>
    </div>
    <div class="content">
      <h2>这是一个示例邮件模板</h2>
      <p>这个模板展示了一些常用的 HTML 和 CSS 特性：</p>
      <ul>
        <li>渐变背景色的标题栏</li>
        <li>圆角边框设计</li>
        <li>响应式布局</li>
        <li>精心设计的按钮样式</li>
      </ul>
      <a href="#" class="button">点击按钮</a>
      <div class="footer">
        <p>这是一个页脚文本 - HTML Mail © 2024</p>
      </div>
    </div>
  </div>
</body>
</html>`,

  en: `<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #1890ff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to HTML Mail</h1>
    </div>
    <div class="content">
      <h2>This is a Sample Email Template</h2>
      <p>This template demonstrates several common HTML and CSS features:</p>
      <ul>
        <li>Gradient background header</li>
        <li>Rounded corner design</li>
        <li>Responsive layout</li>
        <li>Carefully styled button</li>
      </ul>
      <a href="#" class="button">Click Button</a>
      <div class="footer">
        <p>This is a footer text - HTML Mail © 2024</p>
      </div>
    </div>
  </div>
</body>
</html>`,
};

export const defaultHtmlTemplate = () => {
  const currentLanguage = i18n.language;
  return templates[currentLanguage as keyof typeof templates] || templates.en;
}; 