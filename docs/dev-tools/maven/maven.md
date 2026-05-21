---
title: "maven"
description: "maven 的历史学习笔记。"
date: 2026-05-21
tags: ["Maven", "工程工具"]
keywords: ["Maven", "工程工具", "maven"]
legacy_source: "框架/Maven/maven.md"
---
# maven

mvn  install  -Dmaven.test.skip=true

```java
&lt;build> 
	&lt;plugins>  		
	   &lt;plugin>      
		&lt;groupId>org.apache.maven.plugins&lt;/groupId>      	
		&lt;artifactId>maven-surefire-plugin&lt;/artifactId>      	
		&lt;version>2.6&lt;/version>		
		&lt;configuration>			
		&lt;skipTests>true&lt;/skipTests>		
		&lt;/configuration>      
	    &lt;/plugin>  
	 &lt;/plugins> 
&lt;/build>
```
