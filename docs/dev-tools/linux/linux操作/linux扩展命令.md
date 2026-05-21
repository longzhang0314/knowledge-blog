---
title: "linux扩展命令"
description: "linux扩展命令 的历史学习笔记。"
date: 2026-05-21
tags: ["Linux", "工具"]
keywords: ["Linux", "工具", "linux扩展命令"]
legacy_source: "基础/linux/linux操作/linux扩展命令.md"
---
# linux扩展命令

linux扩展命令

strace软件: 抓取进程运行时对底层系统调用的日志。

strace  -ff  -o  输出地址  追踪进程：追踪这个进程有多少个进程，每个进程单独生成一个文件

![linux扩展命令 image 1](./linux扩展命令.assets/image-01.png)

去 /proc目录下找到对应进程ID文件夹，task目录下找到该进程的线程

![linux扩展命令 image 2](./linux扩展命令.assets/image-02.png)
