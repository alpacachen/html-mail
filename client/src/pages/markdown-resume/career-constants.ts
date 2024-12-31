import { Career } from "./helpers";

export const suggestions = [
    "迁移 webpack 到 vite，冷启动时间降低了 5s",
    "牵头将老旧项目转为 typescript",
    "负责团队工作分配，项目管理",
    "在公司内主讲多次分享",
    "代码测试覆盖率达到 85%",
    "uniapp",
    "讨论、设计并开发了xx 平台，使得xx 效率提升了 50%",
    "在团队内推动了代码规范，提升了代码质量",
    "帮助新人快速成长",
    "以PMO 身份主导需求落地",
    "设计并实现了微前端架构，提升了团队开发效率",
    "优化首屏加载时间，性能提升 40%",
    "设计实现组件库，提升开发效率 30%",
    "推动前端监控系统建设，错误率降低 60%",
    "负责核心业务模块重构，代码量减少 40%",
    "主导 CI/CD 流程优化，发布时间缩短 70%",
    "开发脚手架工具，新项目初始化时间降低 80%",
    "推动 Code Review 制度建设，Bug率降低 50%",
    "主导前端技术栈升级，开发体验显著提升",
    "设计数据大屏可视化方案，支持千万级数据展示",
    "优化构建流程，打包时间减少 60%",
    "推动 BFF 层建设，提升接口开发效率",
    "设计前端日志系统，问题定位时间缩短 70%",
    "主导低代码平台建设，提升业务开发效率",
];


export const careerTemplates: Career[] = [
    {
        company: "少林有限公司 - 编辑器开发",
        time: "2020.10 - 至今",
        description: `工作职责: 负责少林寺编辑器日常需求迭代，性能优化，组件库搭建，官网，移动端开发，带领组员进行需求评审
  语言工具: C++, React, Typescript, Next.js, tailwindcss, Jest 等
  工作亮点: 
  - 实现了design-to-code 功能，除了基础的颜色大小之外还支持了 autolayout to flex 的转换, 并且实现自动化检测脚本，做到对 figma 一比一还原
  - 参与项目组件库的设计与开发，组内设计规范和 html 组件设计规范有深入理解，多次开会向 UI 部门传输正确的组件设计思路，并且基于 storybook 和 jest跑通了组件库的开发验收流程，大大降低了开发时间成本
  - 参与前端集成测试框架，支持 http，ws，说服团队摒弃单测全面拥抱集成测试，项目测试覆盖率达到 85% 以上
  - 发现了前端页面还原度不够的痛点，说服团队放弃使用 margin 布局，并且基于此理念开发组内设计稿转 html + tailwind 插件，整体提升了部门设计走查还原度
  - 负责开发公司官网，lighthouse 评分 95+，以及完全基于css 的响应式布局
  `,
    },
    {
        company: "武当少儿有限公司 - 课件系统开发",
        time: "2017.9-2020.1",
        description: `工作职责: 参与了线上 1v1 课程的课件系统开发，包括插件系统，时间线的设计，回放功能等，很多细节因为时间久远已经忘了
  语言工具: Vue2, Typescript
  工作亮点: 
  - 参与了线上 1v1 课程的课件系统开发，包括插件系统，时间线的设计，回放功能等
  - 参与了插件系统的设计与开发，包括插件的安装，卸载，更新，以及插件的权限管理
  - 参与了时间线的设计与开发，包括时间线的拖拽，缩放，以及时间线的编辑
  - 参与了回放功能的设计与开发，包括回放的录制，回放的播放，以及回放的编辑
  `,
    },
];