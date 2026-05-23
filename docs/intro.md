---
title: 知识库总览
description: Java 后端知识库的分类、写作原则和持续更新方式。
date: 2026-05-21
tags: [Java, 知识库, 学习路线]
keywords: [Java 后端知识库, Java 学习路线, 技术笔记]
sidebar_position: 1
slug: /
---

# 知识库总览

这个知识库用于持续沉淀 Java 后端学习过程中的笔记、项目复盘、线上问题排查和架构设计方法。

## 目录地图

### 核心专题

- [Java 基础](/docs/java-foundation)：Java 语言、JVM、并发、多线程等基础体系。
- [Spring 与微服务](/docs/spring-cloud)：Spring、Spring Boot、Spring Cloud 和服务治理。
- [MySQL](/docs/mysql)：索引、事务、MVCC、慢 SQL 和高性能 MySQL 笔记。
- [Redis](/docs/redis)：缓存一致性、数据结构、淘汰策略、分布式锁和 Redis 原理。
- [RocketMQ](/docs/rocketmq)：事务消息、消费幂等和消息队列相关内容。
- [分布式](/docs/distributed)：一致性、事务模式、限流熔断和高可用设计。

### 工程与项目

- [后端框架与中间件](/docs/backend-frameworks)：MyBatis、Sentinel、Netty 等历史笔记。
- [业务系统设计](/docs/business-systems)：支付、支付网关、异步通知、认证鉴权。
- [线上排查](/docs/troubleshooting)：Full GC、OOM、CPU100% 等故障处理路径。
- [架构设计](/docs/architecture)：设计方法论、系统设计、设计原则和设计模式。
- [开发工具与环境](/docs/dev-tools)：Git、IDEA、Maven、Linux、本地系统故障等。

### 输出与归档

- [技术输出](/docs/output)：阶段性学习复盘、技术观点和长期写作沉淀。
- [面试复盘](/docs/interview)：面经、场景题和技术栈复盘。
- [计算机基础](/docs/computer-foundation)：网络、操作系统、汇编等基础内容。
- [数据结构与算法](/docs/algorithm)：刷题总结、算法模板和学习笔记。
- [AI 学习](/docs/ai-learning)：大模型和 AI 应用学习资料。
- [扩展与历史归档](/docs/archive)：Python、博客搭建、随笔资料等非主线内容。

## 内容原则

- **先体系后细节**：每篇文章放到明确专题下，避免笔记散落。
- **先结论再展开**：面向复习和表达，优先给出判断，再讲原理和项目落点。
- **保留工程语境**：不只写概念，也写风险、取舍、监控、兜底和排查路径。

## 更新方式

新增文章时，优先使用脚本生成 frontmatter：

```bash
npm run write:doc -- mysql "MySQL 索引失效排查" mysql-index-debug
npm run write:post -- "阶段复盘：Redis 缓存一致性" redis-cache-consistency
```

写完后执行：

```bash
npm run build
git add .
git commit -m "add java backend note"
git push origin main
```

GitHub Actions 会自动发布最新内容。
