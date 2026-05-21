---
title: "SpringBoot项目启动时@Mapper注解相关警告"
description: "SpringBoot项目启动时@Mapper注解相关警告 的历史学习笔记。"
date: 2026-05-21
tags: ["Spring Boot", "框架"]
keywords: ["Spring Boot", "框架", "SpringBoot项目启动时@Mapper注解相关警告"]
legacy_source: "框架/Spring/SpringBoot/SpringBoot项目启动时@Mapper注解相关警告.md"
---
### SpringBoot项目启动时@Mapper注解相关警告
```
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'compensateTacticsMapper' and 'com.basestonedata.finance.mapper.CompensateTacticsMapper' mapperInterface. Bean already defined with the same name!
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'ratesMapper' and 'com.basestonedata.finance.mapper.RatesMapper' mapperInterface. Bean already defined with the same name!
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'ratesMouldMapper' and 'com.basestonedata.finance.mapper.RatesMouldMapper' mapperInterface. Bean already defined with the same name!
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'TAlipayRefundBillMapper' and 'com.basestonedata.finance.mapper.TAlipayRefundBillMapper' mapperInterface. Bean already defined with the same name!
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'TAmAssetsBindcardMapper' and 'com.basestonedata.finance.mapper.TAmAssetsBindcardMapper' mapperInterface. Bean already defined with the same name!
2019-08-27 15:27:27 | WARN  | main | org.mybatis.spring.mapper.ClassPathMapperScanner | Skipping MapperFactoryBean with name 'TAmBatchPay2bankMapper' and 'com.basestonedata.finance.mapper.TAmBatchPay2bankMapper' mapperInterface. Bean already defined with the same name!
```
项目启动时，控制台打印上述日志，原因是在Dao层使用了@Mapper注解，同时在启动类上添加了@MapperScane注解。
#### 解决方案
1. 只使用@Mapper注解，无需在启动类上开启扫描；
2. Dao层使用@Repository注解，并在启动类上使用@MapperScane("mapper目录")进行扫描
