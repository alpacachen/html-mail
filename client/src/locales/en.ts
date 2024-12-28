export default {
  common: {
    back: 'Back to Home',
    loading: 'Loading...',
    sending: 'Sending...',
    send: 'Send Email',
  },
  auth: {
    github: 'GitHub Auth',
    gitee: 'Auth',
    needAuth: 'Quick configuration requires third-party authentication',
    authenticated: 'Authenticated via {{platform}} - {{name}}',
    expiresIn: 'Authentication expires in: {{time}}',
  },
  home: {
    title: 'Email Toolbox',
    startUse: 'Start Using HTML Mail Tool',
    purpose: {
      title: 'Purpose',
      intro: 'When developing HTML emails, we often face these challenges:',
      challenges: {
        render: 'Inconsistent HTML rendering across email clients',
        debug: 'Tedious debugging process requiring constant test emails',
        tools: 'Lack of user-friendly HTML email editing tools',
        service: 'Existing services are mostly overseas paid products',
      },
      conclusion: 'For these reasons, we developed this simple tool to help developers test and debug HTML emails more conveniently.',
    },
  },
  mail: {
    title: 'HTML Mail Tool',
    config: {
      quick: {
        title: 'Use Quick Config',
        tip: 'Quick config uses admin email and requires OAuth authentication to prevent abuse. We do not store any private information.',
      },
      custom: {
        title: 'Use Custom Email Config',
        tip: 'Click to see how to get QQ Mail SMTP config',
        example: 'Example: QQ Mail SMTP Config',
      },
    },
    form: {
      smtp: {
        title: 'Email Configuration',
        host: 'SMTP Server',
        hostPlaceholder: 'e.g., smtp.qq.com',
        port: 'SMTP Port',
        portPlaceholder: 'e.g., 465',
        user: 'Email Account',
        userPlaceholder: 'Enter email account',
        pass: 'Email Password/Token',
        passPlaceholder: 'Enter email password or token',
        passTip: 'We do not store your password, it is only used for current sending',
      },
      email: {
        label: 'Recipient Email',
        placeholder: 'Enter recipient email',
        invalid: 'Please enter a valid email address',
      },
      subject: {
        label: 'Subject',
        placeholder: 'Enter email subject',
      },
      content: {
        label: 'HTML Content',
        placeholder: 'Write HTML email content here...',
      },
    },
  },
}; 