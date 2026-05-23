---
title: "HappensBefore原则"
description: "HappensBefore原则 的历史学习笔记。"
date: 2026-05-21
tags: ["Java", "并发"]
keywords: ["Java", "并发", "HappensBefore原则"]
legacy_source: "java/多线程/HappensBefore原则.md"
---
#### HappensBefore原则

- 单一线程原则：同一个线程内上面的语句happens before下面的语句。
- volatile：写happens before读；
- sychnorized：unlock happens before lock
- 线程的start方法调用happens before线程中run方法的执行
- 线程执行完任务happens before其他线程对该线程执行join方法获得结果；
- 线程中断原则: 对线程进行interrupt()方法的调用happens before被中断线程检测到中断事件的发生。 
- 对象终结：对象的初始化完成happens before对该对象执行finalize方法进行销毁；
- 传递：A happens before B, B happens before C, 那么A happens before C。
