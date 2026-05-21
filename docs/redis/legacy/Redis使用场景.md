---
title: "Redis使用场景"
description: "Redis使用场景 的历史学习笔记。"
date: 2026-05-21
tags: ["Redis", "数据库"]
keywords: ["Redis", "数据库", "Redis使用场景"]
legacy_source: "基础/数据库/Redis/Redis使用场景.md"
---
# Redis使用场景

Redis使用场景

1. 计数器：String类型的自增自减操作；

2. 缓存；

3. 查找表：相比于缓存，永不过期。

3. 消息队列：利用List双向链表的性质，可以做消息队列使用；最好使用消息中间件。

4. 会话缓存：实现无状态的session存储，更容易实现高可用性以及伸缩性。

5. 分布式锁：分布式环境无法使用单机的锁保证进程同步，可以使用Redis自带的SETNX命令或者官方的RedisLock实现。

6. Set:可以实现交集、并集等操作，可以实现共同好友等功能。

7. ZSet:可以实现有序性操作，实现排行榜功能。
