---
title: Java 并发学习路线
description: 从线程安全、锁、线程池和并发容器搭建 Java 并发知识框架。
date: 2026-05-21
tags: [Java, 并发, 线程池]
keywords: [Java 并发, 线程池, synchronized, AQS]
---

# Java 并发学习路线

## 主线

Java 并发可以按四层理解：可见性和有序性、锁与同步器、线程池、并发容器。

## 高频问题

- `volatile` 解决什么，不解决什么？
- `synchronized` 和 `ReentrantLock` 的边界在哪里？
- 线程池核心参数如何结合业务流量设置？
- `ConcurrentHashMap` 为什么能在并发下保持较好吞吐？

## 输出建议

每次整理并发笔记时，不只写 API，还要补一段“线上风险”：线程池打满、任务堆积、拒绝策略误用、锁粒度过大、异步链路丢上下文。
