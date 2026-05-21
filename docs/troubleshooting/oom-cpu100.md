---
title: OOM 与 CPU100% 排查模板
description: Java 服务出现 OOM 或 CPU100% 时的止血、定位和复盘路径。
date: 2026-05-21
tags: [Java, OOM, CPU100, 线上排查]
keywords: [Java OOM 排查, CPU100 排查, jstack, jmap]
---

# OOM 与 CPU100% 排查模板

## 先止血

- 确认影响范围、错误率、响应时间和核心链路是否受影响。
- 必要时扩容、限流、降级或回滚，先保障核心功能。
- 保存现场：GC 日志、堆 dump、线程 dump、监控截图和发布记录。

## 再定位

CPU100% 常用路径：

```bash
top -Hp <pid>
printf "%x\n" <tid>
jstack <pid> | grep -A 30 <nid>
```

OOM 常用路径：

```bash
jcmd <pid> GC.heap_dump /tmp/app.hprof
jmap -histo:live <pid> | head -50
```

## 后复盘

复盘不要只写“加内存”或“优化代码”，要补齐触发条件、监控缺口、容量评估、压测结果和长期治理动作。
