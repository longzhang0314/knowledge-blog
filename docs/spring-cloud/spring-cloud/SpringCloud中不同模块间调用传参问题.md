---
title: "SpringCloud中不同模块间调用传参问题"
description: "SpringCloud中不同模块间调用传参问题 的历史学习笔记。"
date: 2026-05-21
tags: ["Spring Cloud", "微服务"]
keywords: ["Spring Cloud", "微服务", "SpringCloud中不同模块间调用传参问题"]
legacy_source: "框架/Spring/SpringCloud/SpringCloud中不同模块间调用传参问题.md"
---
### 不同模块间调用传参问题
不同模块间调用时，通过Feign客户端组件调用其他服务，出现参数传过去后变成null的问题。注意如下：

**1. 尽量使用@PostMapping注解，而不是@RequestMapping(value = "url",method = RequestMethod.POST)**

**2. 使用@RequestParam注解时必须要在后面加上参数名**

**3. Controller层互相调用不要忘记@RequestBody注解**

**4. 接口和实现类都需要加@RequestBody**

**5. 如果使用@RequestParam注解，只需要在接口处添加，不要在实现类上添加该注解**
