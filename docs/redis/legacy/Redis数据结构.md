---
title: "Redis数据结构"
description: "Redis数据结构 的历史学习笔记。"
date: 2026-05-21
tags: ["Redis", "数据库"]
keywords: ["Redis", "数据库", "Redis数据结构"]
legacy_source: "基础/数据库/Redis/Redis数据结构.md"
---
# Redis数据结构

Redis数据结构

1. 字典（dict）

Redis的字典dict使用散列表实现，通过拉链法解决hash冲突。

dict由两个哈希表dictht组成，这样方便在扩容时进行rehash操作。扩容时将其中一个dictht的键值rehash到另一个dictht上，扩容完成后释放空间并交换两个dictht的角色。

rehash: rehash是递进式实现的，当达到需要扩容的阈值时，每次调用查询，更新，删除，新增方法都会rehash当前rehash_index++指向的值；这样可以使rehash所用的时间均摊到每一次操作中，降低了时间复杂度。

rehash也会导致dict的数据分散到两个dictht中，这样查找时就需要到不同的dictht中去查询。

2. 跳表

跳表是有序集合ZSet的实现之一。

跳表是基于有序链表的多级指针实现的，也可以看成是多个有序链表。

跳表的查询可以先从最上面一层查询，每次缩小范围，找到对应的区间后再去下面一层查找；类似于二分查找的思想；

相比红黑树，有以下优点：

(1) 插入速度更快，因为不需要旋转维持平衡；

(2)易于实现；

(3)支持无锁操作。
