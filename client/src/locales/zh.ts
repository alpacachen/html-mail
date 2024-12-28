export default {
  common: {
    back: '返回首页',
    loading: '加载中...',
    sending: '发送中...',
    send: '发送邮件',
  },
  auth: {
    github: 'GitHub 认证',
    gitee: '认证',
    needAuth: '使用快捷配置需要先进行第三方认证',
    authenticated: '已通过 {{platform}} 认证 - {{name}}',
    expiresIn: '认证有效期还剩：{{time}}',
  },
  home: {
    title: '邮件工具箱',
    startUse: '开始使用 HTML 邮件工具',
    purpose: {
      title: '设计初衷',
      intro: '在开发 HTML 邮件时，我们经常遇到以下挑战：',
      challenges: {
        render: '各邮件客户端对 HTML 内容的渲染支持度参差不齐',
        debug: '调试过程繁琐，需要不断发送测试邮件来验证效果',
        tools: '市面上缺乏好用的 HTML 邮件编辑工具',
        service: '现有的在线服务多为海外付费产品，使用不便',
      },
      conclusion: '基于以上原因，我们开发了这个简单的工具，希望能帮助开发者更方便地测试和调试 HTML 邮件。',
    },
  },
  mail: {
    title: 'HTML 邮件工具',
    config: {
      quick: {
        title: '使用快捷配置',
        tip: '快捷配置使用站长邮箱发送，需要第三方 OAuth 认证以防止滥用，本站不会记录或存储您的任何隐私信息，请放心使用',
      },
      custom: {
        title: '使用自定义邮箱配置',
        tip: '点击查看如何获取QQ邮箱的SMTP配置',
        example: '举例：QQ邮箱的SMTP配置',
      },
    },
    form: {
      smtp: {
        title: '邮箱配置',
        host: 'SMTP服务器',
        hostPlaceholder: '例如: smtp.qq.com',
        port: 'SMTP端口',
        portPlaceholder: '例如: 465',
        user: '邮箱账号',
        userPlaceholder: '请输入邮箱账号',
        pass: '邮箱密码/授权码',
        passPlaceholder: '请输入邮箱密码或授权码',
        passTip: '我们不会记录或存储您的邮箱密码，仅用于当前发送邮件',
      },
      email: {
        label: '收件人邮箱',
        placeholder: '请输入收件人邮箱',
        invalid: '请输入有效的邮箱地址',
      },
      subject: {
        label: '邮件主题',
        placeholder: '请输入邮件主题',
      },
      content: {
        label: 'HTML 邮件内容',
        placeholder: '在这里编写 HTML 邮件内容...',
      },
    },
  },
}; 