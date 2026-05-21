---
title: "dubbo调用报错"
description: "dubbo调用报错 的历史学习笔记。"
date: 2026-05-21
tags: ["Maven", "工程工具"]
keywords: ["Maven", "工程工具", "dubbo调用报错"]
legacy_source: "框架/Maven/dubbo调用报错.md"
---
# dubbo调用报错

dubbo报错：java.lang.NoSuchMethodError

1. 调用dubbo接口com.demo.Test1.method2报错，java.lang.NoSuchMethodError，查看com.demo.Test1源码，发现里面是有method2方法的。

2. 然后尝试调用com.demo.Test1.method1方法，可以调通。

3. 查看dubbo-monitor，发现当前应用的consumer中，method里面不包含method2，所以调不通。

4. 查看dubbo-consumer.xml文件，发现当前用到的com.demo.Test1版本和方法调用处用到的com.demo.Test1版本不一致，定外到是引入另一个包也提供了com.demo.Test1方法，与单独的demo包提供的com.demo.Test1方法冲突，默认取了另一个包的com.demo.Test1方法。

5. 解决方案：把想用的包依赖放在上面，pom文件会按照顺序进行解析。
