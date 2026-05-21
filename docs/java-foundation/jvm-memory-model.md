---
title: JVM 内存模型与排查入口
description: 从堆、栈、方法区和 GC 日志角度建立 JVM 问题分析入口。
date: 2026-05-21
tags: [Java, JVM, GC]
keywords: [JVM 内存模型, GC 日志, Java 内存排查]
---

# JVM 内存模型与排查入口

## 结论

JVM 问题不要先背参数，先确认现象属于内存泄漏、瞬时流量冲击、对象创建过快，还是线程/本地内存问题。

## 关注区域

- **堆内存**：业务对象、缓存对象、集合膨胀，通常对应 OOM 和 Full GC。
- **虚拟机栈**：线程调用栈，递归或线程数过多可能导致栈溢出或内存耗尽。
- **元空间**：类元数据，动态代理、热部署、类加载异常时重点关注。
- **直接内存**：NIO、Netty、堆外缓存相关场景容易被忽略。

## 排查入口

```bash
jcmd <pid> VM.native_memory summary
jcmd <pid> GC.heap_info
jmap -histo:live <pid> | head
jstack <pid> > thread-dump.txt
```

## 项目落点

面试或复盘时，可以按“先止血、再定位、后复盘”说明：先扩容或限流保障可用性，再通过 dump、GC 日志和监控定位对象来源，最后补充容量评估、报警和压测。
