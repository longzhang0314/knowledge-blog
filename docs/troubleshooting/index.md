---
title: 线上排查专题
description: Full GC、OOM、CPU100%、慢 SQL、消息堆积和接口超时等线上问题排查笔记。
date: 2026-05-21
tags: [线上排查, 故障处理, Java]
keywords: [Java 线上排查, Full GC, OOM, CPU100, 慢 SQL]
---

# 线上排查专题

线上问题统一按“先止血、再定位、后复盘”组织，避免只讲工具命令而缺少处理顺序。

## 当前章节

- [Full GC 频繁排查总结](/docs/troubleshooting/full-gc-troubleshooting)：从现象、止血、GC 日志、堆对象、代码入口到复盘治理。
- [OOM 与 CPU100% 排查模板](/docs/troubleshooting/oom-cpu100)：Java 服务出现 OOM 或 CPU100% 时的通用排查路径。
