import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const categories = new Set([
  'java-foundation',
  'spring-cloud',
  'mysql',
  'redis',
  'rocketmq',
  'distributed',
  'troubleshooting',
  'architecture',
]);

const [category, title, slug] = process.argv.slice(2);

if (!category || !title || !slug) {
  console.error('Usage: npm run write:doc -- <category> "<title>" <slug>');
  console.error('Example: npm run write:doc -- mysql "MySQL 索引失效排查" mysql-index-debug');
  process.exit(1);
}

if (!categories.has(category)) {
  console.error(`Unknown category "${category}". Available: ${Array.from(categories).join(', ')}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const filePath = path.join('docs', category, `${today}-${slug}.md`);
const content = `---
title: ${title}
description: ${title} 的学习笔记和项目复盘。
date: ${today}
tags: [Java, ${category}]
keywords: [${title}, Java 后端]
---

# ${title}

## 结论

先写这篇笔记最重要的判断。

## 原理

解释关键机制、流程和边界。

## 项目落点

说明在真实项目中怎么使用、怎么取舍。

## 风险和兜底

补充异常场景、监控、降级、补偿或回滚方案。
`;

await mkdir(path.dirname(filePath), {recursive: true});
await writeFile(filePath, content, 'utf8');
console.log(`Created ${filePath}`);
console.log(`Next: add "${category}/${today}-${slug}" to sidebars.js if it should appear in the sidebar.`);
