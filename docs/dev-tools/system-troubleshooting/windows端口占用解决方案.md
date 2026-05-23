---
title: "windows端口占用解决方案"
description: "windows端口占用解决方案 的历史学习笔记。"
date: 2026-05-21
tags: ["系统故障", "工具"]
keywords: ["系统故障", "工具", "windows端口占用解决方案"]
legacy_source: "系统故障/windows端口占用解决方案.md"
---
### 端口占用解决方案
1. 打开cmd命令窗口  输入如下指令查看所有端口和PID

```
netstat -ano
```

2. 找到对应的端口对应的PID  输入指令找到对应的进程

```
 tasklist | findstr "7676"
```


3. 杀掉该进程 再次启动就OK啦

```
 taskkill /f /t /im java.exe 
```

