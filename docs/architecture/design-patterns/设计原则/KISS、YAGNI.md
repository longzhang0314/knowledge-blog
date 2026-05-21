---
title: "KISS、YAGNI"
description: "KISS、YAGNI 的历史学习笔记。"
date: 2026-05-21
tags: ["设计模式", "架构设计"]
keywords: ["设计模式", "架构设计", "KISS、YAGNI"]
legacy_source: "基础/设计模式/设计原则/KISS、YAGNI.md"
---
### KISS、YAGNI、DRY

**KISS**: 保持简单。

**YAGNI**：不要去设计当前用不到的功能；不要去编写当前用不到的代码，不要过度设计。

**DRY**：Don't repeat yourself.不要写重复的代码。

实现逻辑重复、功能语义重复、代码执行重复。

实现逻辑重复，但功能语义不重复的代码，并不违反 DRY 原则。

实现逻辑不重复，但功能语义重复的代码，也算是违反 DRY 原则。

除此之外，代码执行重复也算是违反 DRY 原则。
