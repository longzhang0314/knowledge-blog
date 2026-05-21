---
title: "SpringBoot启动时SLF4J警告的一次解决"
description: "SpringBoot启动时SLF4J警告的一次解决 的历史学习笔记。"
date: 2026-05-21
tags: ["Spring Boot", "框架"]
keywords: ["Spring Boot", "框架", "SpringBoot启动时SLF4J警告的一次解决"]
legacy_source: "框架/Spring/SpringBoot/SpringBoot启动时SLF4J警告的一次解决.md"
---
# SpringBoot启动时SLF4J警告的一次解决

- 问题：SpringBoot中启动时发生**SLF4J: Class path contains multiple SLF4J bindings**警告

```java
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/D:/MavenRepository/ch/qos/logback/logback-classic/1.1.11/logback-classic-1.1.11.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/D:/MavenRepository/org/slf4j/slf4j-log4j12/1.7.25/slf4j-log4j12-1.7.25.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [ch.qos.logback.classic.util.ContextSelectorStaticBinder]
```

- 影响：这个警告不仅会在本地启动项目时发生，部署在服务器上也会出现这种情况，目前并没有发现有什么影响，但是作为一个有洁癖的程序猿，肯定不能容忍每次启动项目都是一大堆警告，所以需要对这个问题进行研究并把警告去除掉。
- 解析：上面的意思是说在类路径下包含多个SLF4J绑定，并且`logback-classic-1.1.11.jar`这个包和`slf4j-log4j12-1.7.25.jar`这个包，在`/org/slf4j/impl/StaticLoggerBinder.class`这个类身上发生了冲突。

- 原因：通过网上查阅资料，了解到发生这个错误的原因，首先logback 日志的开发者和log4j 的开发者据说是一波人，而springboot 默认日志是较新的logback 日志。但是在以前流行的日志却是log4j ，而且很多的第三方工具都默认含有log4j 的引入。而我们在项目开发中，难免会引入各种各样的工具包，所以，基本上springboot 项目，如果不注意，肯定会出现这种冲突的，这样势必会导致SLF4J发生多个绑定的警告。(参考 https://blog.csdn.net/wohaqiyi/article/details/81009689 )

- 验证：通过使用`mvn dependency:tree `命令来进行排查。发现springboot默认引入了logback日志，而前不久加进项目中的zookeeper依赖默认引入了log4j日志，从而导致SLF4J绑定冲突。

```java
[INFO] +- org.springframework.boot:spring-boot-starter-mail:jar:1.5.16.RELEASE:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:1.5.16.RELEASE:compile
[INFO] |  |  +- org.springframework.boot:spring-boot:jar:1.5.16.RELEASE:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:1.5.16.RELEASE:compile
[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.1.11:compile
[INFO] |  |  |  |  \- ch.qos.logback:logback-core:jar:1.1.11:compile

[INFO] +- org.apache.zookeeper:zookeeper:jar:3.5.4-beta:compile
[INFO] |  +- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO] |  +- org.slf4j:slf4j-log4j12:jar:1.7.25:compile
[INFO] |  +- commons-cli:commons-cli:jar:1.2:compile
[INFO] |  +- log4j:log4j:jar:1.2.17:compile
[INFO] |  +- org.apache.yetus:audience-annotations:jar:0.5.0:compile
[INFO] |  \- io.netty:netty:jar:3.10.6.Final:compile
```

- 解决：把上面冲突的其中一个jar包排除掉即可，很显然我选择排除zookeeper。

```
&lt;dependency>
	&lt;groupId>org.apache.zookeeper&lt;/groupId>
	&lt;artifactId>zookeeper&lt;/artifactId>
	&lt;version>3.5.4-beta&lt;/version>
	&lt;exclusions>
		&lt;exclusion>
			&lt;groupId>org.slf4j&lt;/groupId>
			&lt;artifactId>slf4j-log4j12&lt;/artifactId>
		&lt;/exclusion>
	&lt;/exclusions>
&lt;/dependency>
```

再次启动项目，发现再也没有烦人的SLF4J警告啦，完美解决问题。
