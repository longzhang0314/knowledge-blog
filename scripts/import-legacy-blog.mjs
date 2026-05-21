import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = '/Users/zhanglong/Downloads/博客';
const docsRoot = path.resolve('docs');
const today = new Date().toISOString().slice(0, 10);

const mappings = [
  {prefix: 'java/语言', dest: 'java-foundation/legacy/language', tags: ['Java', '语言基础']},
  {prefix: 'java/jvm', dest: 'java-foundation/legacy/jvm', tags: ['Java', 'JVM']},
  {prefix: 'java/多线程', dest: 'java-foundation/legacy/concurrency', tags: ['Java', '并发']},
  {prefix: 'java/netty', dest: 'backend-frameworks/netty', tags: ['Java', 'Netty']},
  {prefix: '框架/Mybatis', dest: 'backend-frameworks/mybatis', tags: ['MyBatis', '框架']},
  {prefix: '框架/Maven', dest: 'dev-tools/maven', tags: ['Maven', '工程工具']},
  {prefix: '框架/Sentinel', dest: 'backend-frameworks/sentinel', tags: ['Sentinel', '限流']},
  {prefix: '框架/Spring/SpringBoot', dest: 'spring-cloud/legacy/spring-boot', tags: ['Spring Boot', '框架']},
  {prefix: '框架/Spring/SpringCloud', dest: 'spring-cloud/legacy/spring-cloud', tags: ['Spring Cloud', '微服务']},
  {prefix: '框架/Spring', dest: 'spring-cloud/legacy/spring', tags: ['Spring', '框架']},
  {prefix: '基础/数据库/Mysql', dest: 'mysql/legacy', tags: ['MySQL', '数据库']},
  {prefix: '基础/数据库/Redis', dest: 'redis/legacy', tags: ['Redis', '数据库']},
  {prefix: '系统故障', dest: 'dev-tools/system-troubleshooting', tags: ['系统故障', '工具']},
  {prefix: '基础/linux', dest: 'dev-tools/linux', tags: ['Linux', '工具']},
  {prefix: '工具/git', dest: 'dev-tools/git', tags: ['Git', '工具']},
  {prefix: '工具', dest: 'dev-tools/general', tags: ['工具', '效率']},
  {prefix: '基础/网络', dest: 'computer-foundation/network', tags: ['计算机网络', '基础']},
  {prefix: '基础/操作系统', dest: 'computer-foundation/os', tags: ['操作系统', '基础']},
  {prefix: '基础/汇编', dest: 'computer-foundation/assembly', tags: ['汇编', '基础']},
  {prefix: '基础/数据结构与算法', dest: 'algorithm/legacy', tags: ['算法', '数据结构']},
  {prefix: '基础/设计模式', dest: 'architecture/design-patterns', tags: ['设计模式', '架构设计']},
  {prefix: '基础/系统设计', dest: 'architecture/system-design', tags: ['系统设计', '架构设计']},
  {prefix: '业务/彻底理解cookie，session，token - 墨颜丶 - 博客园.md', dest: 'business-systems/auth/彻底理解cookie，session，token - 墨颜丶 - 博客园.md', tags: ['业务系统', '认证鉴权']},
  {prefix: '业务/深入理解token - 后知、后觉 - 博客园.md', dest: 'business-systems/auth/深入理解token - 后知、后觉 - 博客园.md', tags: ['业务系统', '认证鉴权']},
  {prefix: '业务', dest: 'business-systems/payment', tags: ['业务系统', '支付']},
  {prefix: '面试', dest: 'interview/legacy', tags: ['面试', '复盘']},
  {prefix: '大模型', dest: 'ai-learning/legacy', tags: ['AI', '大模型']},
  {prefix: 'python', dest: 'archive/python', tags: ['Python', '历史归档']},
  {prefix: '博客/hugo', dest: 'archive/blog-building/hugo', tags: ['博客搭建', 'Hugo']},
  {prefix: '博客/hexo', dest: 'archive/blog-building/hexo', tags: ['博客搭建', 'Hexo']},
  {prefix: '随笔', dest: 'archive/misc', tags: ['随笔', '历史归档']},
];

const categoryIndexes = [
  ['backend-frameworks/index.md', '后端框架与中间件', 'MyBatis、Sentinel、Netty 等后端框架和中间件历史笔记。', ['框架', '中间件']],
  ['computer-foundation/index.md', '计算机基础', '网络、操作系统、汇编等计算机基础历史笔记。', ['计算机基础']],
  ['algorithm/index.md', '数据结构与算法', '刷题总结、算法模板和数据结构学习笔记。', ['算法', '数据结构']],
  ['interview/index.md', '面试复盘', '面试题、面经和技术栈复盘。', ['面试', '复盘']],
  ['business-systems/index.md', '业务系统设计', '支付、网关、认证鉴权等业务系统设计笔记。', ['业务系统', '支付', '认证鉴权']],
  ['ai-learning/index.md', 'AI 学习', '大模型和 AI 应用学习笔记。', ['AI', '大模型']],
  ['dev-tools/index.md', '开发工具与环境', 'Git、IDEA、Maven、Linux、Markdown、本地系统故障等工具和环境笔记。', ['工具', 'Linux', 'Maven']],
  ['archive/index.md', '扩展与历史归档', '与 Java 后端主线关系较弱但仍值得保留的 Python、博客搭建、随笔资料等历史笔记。', ['历史归档']],
];

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function withoutExt(filePath) {
  return filePath.replace(/\.md$/i, '');
}

function yamlList(values) {
  return `[${values.map((value) => JSON.stringify(value)).join(', ')}]`;
}

function titleFromPath(filePath) {
  return path.basename(filePath, '.md').replace(/\.pdf$/i, '').trim();
}

function hasFrontmatter(content) {
  return content.startsWith('---\n') || content.startsWith('---\r\n');
}

function isPlaceholder(content) {
  return content.includes('有道云公开接口没有返回可转换内容') || content.includes('暂时生成占位文件');
}

function findMapping(relativePath) {
  const normalized = toPosix(relativePath);
  return mappings.find((mapping) => normalized === mapping.prefix || normalized.startsWith(`${mapping.prefix}/`));
}

function sanitizePublicContent(content) {
  return content
    .replace(/(APPID\s*=\s*)[A-Za-z0-9_-]+/gi, '$1[REDACTED]')
    .replace(/((?:appid|appkey|appsecret|mch_id|nonce_str|sign)\s*[：:=]\s*)[A-Za-z0-9%+/_=-]+/gi, '$1[REDACTED]')
    .replace(/((?:appid|appkey|appsecret|mch_id|nonce_str|sign)=)[A-Za-z0-9%+/_=-]+/gi, '$1[REDACTED]')
    .replace(/(MYSQL_ROOT_PASSWORD=)[^\s]+/g, '$1[REDACTED]')
    .replace(/(password:\s*)[^\s]+/gi, '$1[REDACTED]');
}

function rewriteUnsupportedImageRefs(content) {
  return content.replace(/!\[([^\]]*)\]\(([^)]*\.bin)\)/g, '[$1]($2)');
}

function escapeLegacyMdx(content) {
  return content
    .split(/\r?\n/)
    .map((line) => {
      return line
        .replace(/</g, '&lt;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;');
    })
    .join('\n');
}

function addFrontmatter(content, {title, tags, sourcePath}) {
  if (hasFrontmatter(content)) {
    return content;
  }

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(`${title} 的历史学习笔记。`)}`,
    `date: ${today}`,
    `tags: ${yamlList(tags)}`,
    `keywords: ${yamlList([...tags, title])}`,
    `legacy_source: ${JSON.stringify(sourcePath)}`,
    '---',
    '',
  ].join('\n');

  return `${frontmatter}${content.trimStart()}`;
}

function destinationFor(relativePath) {
  const mapping = findMapping(relativePath);
  if (!mapping) {
    return null;
  }

  const normalized = toPosix(relativePath);
  const rest = normalized.slice(mapping.prefix.length).replace(/^\/+/, '');
  const destRelative = path.join(mapping.dest, rest);
  return {mapping, destRelative};
}

async function walk(dir) {
  const entries = await import('node:fs/promises').then((fs) => fs.readdir(dir, {withFileTypes: true}));
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.DS_Store') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function copyAssetsFor(sourceMd, destMd) {
  const sourceBase = withoutExt(sourceMd);
  const assetDir = `${sourceBase}.assets`;
  const destAssetDir = `${withoutExt(destMd)}.assets`;
  try {
    await cp(assetDir, destAssetDir, {recursive: true});
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function writeIndex(filePath, title, description, tags) {
  const fullPath = path.join(docsRoot, filePath);
  await mkdir(path.dirname(fullPath), {recursive: true});
  const content = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
date: ${today}
tags: ${yamlList(tags)}
keywords: ${yamlList([...tags, title])}
---

# ${title}

${description}
`;
  await writeFile(fullPath, content, 'utf8');
}

async function main() {
  const rootsToRefresh = [
    'backend-frameworks',
    'computer-foundation',
    'algorithm',
    'interview',
    'business-systems',
    'ai-learning',
    'python',
    'blog-building',
    'notes',
    'dev-tools',
    'archive',
    'java-foundation/legacy',
    'spring-cloud/legacy',
    'mysql/legacy',
    'redis/legacy',
    'troubleshooting/legacy',
    'architecture/design-patterns',
    'architecture/system-design',
  ];

  for (const root of rootsToRefresh) {
    await rm(path.join(docsRoot, root), {recursive: true, force: true});
  }

  for (const [filePath, title, description, tags] of categoryIndexes) {
    await writeIndex(filePath, title, description, tags);
  }

  const files = await walk(sourceRoot);
  let imported = 0;
  let skipped = 0;

  for (const sourceFile of files.filter((file) => file.toLowerCase().endsWith('.md'))) {
    const relativePath = path.relative(sourceRoot, sourceFile);
    const destination = destinationFor(relativePath);
    if (!destination) {
      skipped += 1;
      continue;
    }

    const raw = await readFile(sourceFile, 'utf8');
    if (isPlaceholder(raw)) {
      skipped += 1;
      continue;
    }

    const title = titleFromPath(sourceFile);
    const destMd = path.join(docsRoot, destination.destRelative);
    await mkdir(path.dirname(destMd), {recursive: true});
    const content = addFrontmatter(
      escapeLegacyMdx(rewriteUnsupportedImageRefs(sanitizePublicContent(raw))),
      {
        title,
        tags: destination.mapping.tags,
        sourcePath: relativePath,
      },
    );
    await writeFile(destMd, content, 'utf8');
    await copyAssetsFor(sourceFile, destMd);
    imported += 1;
  }

  console.log(`Imported ${imported} markdown files. Skipped ${skipped} files.`);
}

await main();
