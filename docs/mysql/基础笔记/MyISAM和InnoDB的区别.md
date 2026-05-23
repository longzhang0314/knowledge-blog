---
title: "MyISAM和InnoDB的区别"
description: "MyISAM和InnoDB的区别 的历史学习笔记。"
date: 2026-05-21
tags: ["MySQL", "数据库"]
keywords: ["MySQL", "数据库", "MyISAM和InnoDB的区别"]
legacy_source: "基础/数据库/Mysql/MyISAM和InnoDB的区别.md"
---
### MyISAM和InnoDB的区别
    从Mysql5.5以后，Mysql的默认存储引擎由MyISAM变为InnoDB.
1. InnoDB支持外键。
2. InnoDB支持事务，MyISAM操作是原子性的。这可能会导致有些言论认为MyISAM的操作更快，但是InnoDB的聚簇索引会导致查询效率更高，它会将需要访问的数据放入内存中。
3. MyISAM没有针对故障发生的应对机制，可能会导致崩溃后数据丢失。
4. InnoDB支持MVCC。
5. MyISAM仅支持表锁，InnoDB支持行锁。
