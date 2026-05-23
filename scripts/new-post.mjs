import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const [title, slug] = process.argv.slice(2);

if (!title || !slug) {
  console.error('Usage: npm run write:post -- "<title>" <slug>');
  console.error('Example: npm run write:post -- "阶段复盘：Redis 缓存一致性" redis-cache-consistency');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const outputDir = path.join('docs', 'output');
const filePath = path.join(outputDir, `${today}-${slug}.md`);
const content = `---
slug: ${slug}
title: ${title}
description: ${title}。
date: ${today}
authors: [zhanglong]
tags: [Java, 学习复盘]
keywords: [${title}, Java 后端]
---

## 背景

写清楚这篇复盘来自哪段学习、项目或问题。

## 核心收获

提炼 2-3 个最值得留下来的结论。

## 后续行动

记录下一步要补齐的知识或实践。
`;

await mkdir(outputDir, {recursive: true});
await writeFile(filePath, content, 'utf8');
console.log(`Created ${filePath}`);
