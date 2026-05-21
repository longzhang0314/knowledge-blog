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
![image](https://img-blog.csdn.net/20180626214506161?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3EzNDM1MDk3NDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
2. 找到对应的端口对应的PID  输入指令找到对应的进程

```
 tasklist | findstr "7676"
```
![image](https://img-blog.csdn.net/20180626214556832?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3EzNDM1MDk3NDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
![image](https://img-blog.csdn.net/20180626214632670?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3EzNDM1MDk3NDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
3. 杀掉该进程 再次启动就OK啦

```
 taskkill /f /t /im java.exe 
```
![image](https://img-blog.csdn.net/20180626214746740?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3EzNDM1MDk3NDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
