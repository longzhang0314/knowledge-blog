---
title: "Linux查找日志操作命令"
description: "Linux查找日志操作命令 的历史学习笔记。"
date: 2026-05-21
tags: ["Linux", "工具"]
keywords: ["Linux", "工具", "Linux查找日志操作命令"]
legacy_source: "基础/linux/Linux查找日志操作命令.md"
---
### Linux查找日志操作命令

##### 常用的grep 查找方式
1. **单个文件搜索**：
   grep 字符串 a.log

2. **多个文件搜索**：
   grep 字符串 *.log

3. **上下文多少行**:
-C n 前后 多少行，  -A n  之后n行， -B n 之前n行
grep Exce base.log  -C 20
grep Exce base.log  -A 20
grep Exce base.log  -B 20

4. **管道，在上个结果的基础上继续搜索  =  and 条件**:
   grep 字符串 *.log  | grep 第二个条件

5. **或条件**:
   grep -E '广点通|今日头条' base.log
