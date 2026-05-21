---
title: 慢 SQL 排查路径
description: 从慢查询日志、执行计划、索引选择和业务改写角度排查 MySQL 慢 SQL。
date: 2026-05-21
tags: [MySQL, 慢 SQL, 索引]
keywords: [MySQL 慢 SQL, EXPLAIN, 索引优化]
---

# 慢 SQL 排查路径

## 结论

慢 SQL 优化先确认慢在哪里，再决定是补索引、改 SQL、改分页方式，还是调整业务查询模型。

## 排查顺序

1. 从慢查询日志或监控确认 SQL、耗时、扫描行数和调用入口。
2. 使用 `EXPLAIN` 查看访问类型、索引命中、扫描行数和额外操作。
3. 检查 where、order by、group by 是否能利用联合索引。
4. 判断是否存在深分页、大范围回表、隐式类型转换或函数包裹索引列。
5. 结合业务频率和数据量决定优化方案。

## 常用命令

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 1001 ORDER BY created_at DESC LIMIT 20;
SHOW INDEX FROM orders;
```

## 风险和兜底

新增索引前要评估写入成本、磁盘空间和索引选择性。高峰期避免直接在大表上执行高风险 DDL，优先选择在线 DDL、灰度发布和回滚方案。
