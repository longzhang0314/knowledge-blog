---
title: "memcache和redis的区别"
description: "memcache和redis的区别 的历史学习笔记。"
date: 2026-05-21
tags: ["Redis", "数据库"]
keywords: ["Redis", "数据库", "memcache和redis的区别"]
legacy_source: "基础/数据库/Redis/memcache和redis的区别.md"
---
# memcache和redis的区别

memcache和redis的区别

memcache:

存储的json格式的数据，客户端获取的是全量数据，数据向计算移动。

redis:

可以存储list类型的数据，如果需要list中某个元素，可以在本地计算好以后返回客户端，计算向数据移动。减少了IO量。

1. 数据类型：

Memcached 仅支持字符串类型，而 Redis 支持五种不同的数据类型，可以更灵活地解决问题。

2. 数据持久化：

Redis 支持两种持久化策略：RDB 快照和 AOF 日志，而 Memcached 不支持持久化。

3. 分布式支持：

Memcached 不支持分布式，只能通过在客户端使用一致性哈希来实现分布式存储，这种方式在存储和查询时都需要先在客户端计算一次数据所在的节点。

Redis Cluster 实现了分布式的支持。

4. 内存管理机制：

Redis可以将一些很久没用的数据交换到磁盘，而Memcached只能放在内存。

Memcached 将内存分割成特定长度的块来存储数据，以完全解决内存碎片的问题。但是这种方式会使得内存的利用率不高，例如块的大小为 128 bytes，只存储 100 bytes 的数据，那么剩下的 28 bytes 就浪费掉了。
