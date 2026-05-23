const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const repository = process.env.GITHUB_REPOSITORY || 'longzhang0314/knowledge-blog';
const [owner, repoName] = repository.split('/');
const isUserPage = repoName && repoName.endsWith('.github.io');
const siteUrl = process.env.SITE_URL || `https://${owner || 'longzhang0314'}.github.io`;
const baseUrl = process.env.BASE_URL || (isUserPage ? '/' : `/${repoName || 'knowledge-blog'}/`);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '张龙的 Java 后端知识库',
  tagline: '把工程经验、底层原理和线上排查沉淀成可持续迭代的技术资产',
  favicon: 'img/favicon.svg',

  url: siteUrl,
  baseUrl,
  organizationName: owner || 'longzhang0314',
  projectName: repoName || 'knowledge-blog',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          editUrl: ({docPath}) =>
            `https://github.com/${repository}/edit/main/docs/${docPath}`,
          showLastUpdateAuthor: process.env.CI === 'true',
          showLastUpdateTime: process.env.CI === 'true',
          sidebarItemsGenerator: async ({defaultSidebarItemsGenerator, ...args}) => {
            const items = await defaultSidebarItemsGenerator(args);
            const removeNestedIndex = (sidebarItems) =>
              sidebarItems
                .filter((item) => !(item.type === 'doc' && item.id.endsWith('/index')))
                .map((item) =>
                  item.type === 'category'
                    ? {...item, items: removeNestedIndex(item.items || [])}
                    : item,
                );

            return removeNestedIndex(items);
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          ignorePatterns: ['/tags/**'],
        },
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/backend-knowledge-map.png',
    navbar: {
      title: 'Java 后端知识库',
      logo: {
        alt: 'Java Backend Knowledge Logo',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: '核心专题',
          position: 'left',
          items: [
            {label: 'Java 基础', to: '/docs/java-foundation'},
            {label: 'Spring 与微服务', to: '/docs/spring-cloud'},
            {label: 'MySQL', to: '/docs/mysql'},
            {label: 'Redis', to: '/docs/redis'},
            {label: 'RocketMQ', to: '/docs/rocketmq'},
            {label: '分布式', to: '/docs/distributed'},
          ],
        },
        {
          type: 'dropdown',
          label: '工程实践',
          position: 'left',
          items: [
            {label: '后端框架与中间件', to: '/docs/backend-frameworks'},
            {label: '业务系统设计', to: '/docs/business-systems'},
            {label: '线上排查', to: '/docs/troubleshooting'},
            {label: '架构设计', to: '/docs/architecture'},
            {label: '开发工具与环境', to: '/docs/dev-tools'},
          ],
        },
        {
          type: 'dropdown',
          label: '成长输出',
          position: 'left',
          items: [
            {label: '知识库总览', to: '/docs'},
            {label: '技术输出', to: '/docs/output'},
            {label: '面试复盘', to: '/docs/interview'},
            {label: '计算机基础', to: '/docs/computer-foundation'},
            {label: '数据结构与算法', to: '/docs/algorithm'},
            {label: 'AI 学习', to: '/docs/ai-learning'},
            {label: '扩展与历史归档', to: '/docs/archive'},
          ],
        },
        {
          href: `https://github.com/${repository}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '核心专题',
          items: [
            {label: 'Java 基础', to: '/docs/java-foundation'},
            {label: 'Spring 与微服务', to: '/docs/spring-cloud'},
            {label: 'MySQL', to: '/docs/mysql'},
            {label: 'Redis', to: '/docs/redis'},
            {label: 'RocketMQ', to: '/docs/rocketmq'},
            {label: '分布式', to: '/docs/distributed'},
          ],
        },
        {
          title: '工程与项目',
          items: [
            {label: '后端框架与中间件', to: '/docs/backend-frameworks'},
            {label: '业务系统设计', to: '/docs/business-systems'},
            {label: '线上排查', to: '/docs/troubleshooting/oom-cpu100'},
            {label: '架构设计', to: '/docs/architecture'},
            {label: '开发工具与环境', to: '/docs/dev-tools'},
          ],
        },
        {
          title: '输出与归档',
          items: [
            {label: '知识库总览', to: '/docs'},
            {label: '技术输出', to: '/docs/output'},
            {label: '面试复盘', to: '/docs/interview'},
            {label: '计算机基础', to: '/docs/computer-foundation'},
            {label: '数据结构与算法', to: '/docs/algorithm'},
            {label: 'AI 学习', to: '/docs/ai-learning'},
            {label: '扩展与历史归档', to: '/docs/archive'},
          ],
        },
        {
          title: '联系',
          items: [
            {label: 'GitHub', href: `https://github.com/${repository}`},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 张龙. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java', 'sql', 'bash', 'yaml'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  },
};

module.exports = config;
