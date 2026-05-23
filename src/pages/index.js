import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const pillars = [
  {
    title: '底层原理',
    text: 'JVM、并发、MySQL、Redis、RocketMQ，从原理判断到项目落点。',
    to: '/docs/java-foundation',
  },
  {
    title: '线上排查',
    text: 'Full GC、OOM、CPU100%、慢 SQL，把故障定位沉淀成路径。',
    to: '/docs/troubleshooting/oom-cpu100',
  },
  {
    title: '架构设计',
    text: '围绕一致性、稳定性和扩展性，复盘系统设计中的取舍。',
    to: '/docs/architecture/design-methodology',
  },
];

const stack = ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis', 'RocketMQ', 'JVM', 'Linux'];

const signals = [
  {label: '主线', value: 'Java 后端'},
  {label: '内容', value: '笔记 / 排查 / 复盘'},
  {label: '更新', value: 'Markdown + Git'},
];

function PillarCard({title, text, to}) {
  return (
    <Link className="pillarCard" to={to}>
      <span className="pillarCard__kicker">专题</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </Link>
  );
}

export default function Home() {
  const imageUrl = useBaseUrl('/img/backend-knowledge-map.png');

  return (
    <Layout
      title="Java 后端知识库"
      description="张龙的 Java 后端知识库，沉淀学习笔记、线上排查、架构设计和面试复盘。">
      <main>
        <section className="heroPanel">
          <div className="heroPanel__content">
            <p className="eyebrow">Java Backend Notes</p>
            <h1>张龙的 Java 后端知识库</h1>
            <p className="heroPanel__lead">
              持续整理 Java 后端学习笔记、工程复盘和线上问题定位，把经验写成可以检索、复用和继续迭代的公开资产。
            </p>
            <div className="heroPanel__actions">
              <Link className="button button--primary button--lg" to="/docs">
                进入知识库
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                阅读博客
              </Link>
            </div>
            <dl className="signalRail" aria-label="知识库概览">
              {signals.map((signal) => (
                <div key={signal.label}>
                  <dt>{signal.label}</dt>
                  <dd>{signal.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="heroPanel__visual" aria-label="Java 后端知识地图">
            <img src={imageUrl} alt="Java 后端知识地图" />
          </div>
        </section>

        <section className="sectionBand sectionBand--tight">
          <div className="sectionHeader">
            <p className="eyebrow">Knowledge System</p>
            <h2>把知识放进体系里，再持续写下去</h2>
          </div>
          <div className="pillarGrid">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </section>

        <section className="sectionBand profileStrip">
          <div>
            <p className="eyebrow">Positioning</p>
            <h2>后端工程师的长期输出主页</h2>
            <p>
              这里会持续沉淀 Java 后端核心技术、真实项目中的取舍、线上问题定位方法，以及面试中能讲清楚的项目表达。
            </p>
          </div>
          <div className="stackWall" aria-label="核心技术栈">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="sectionBand writingFlow">
          <div className="sectionHeader">
            <p className="eyebrow">Workflow</p>
            <h2>更新路径保持简单</h2>
          </div>
          <ol className="flowList">
            <li>写一篇 Markdown 笔记，放进对应专题目录。</li>
            <li>本地执行构建检查，确认链接、侧边栏和搜索索引正常。</li>
            <li>提交并推送到 GitHub，Actions 自动发布到 GitHub Pages。</li>
          </ol>
        </section>
      </main>
    </Layout>
  );
}
