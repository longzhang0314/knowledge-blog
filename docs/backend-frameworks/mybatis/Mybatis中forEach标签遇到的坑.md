---
title: "Mybatis中forEach标签遇到的坑"
description: "Mybatis中forEach标签遇到的坑 的历史学习笔记。"
date: 2026-05-21
tags: ["MyBatis", "框架"]
keywords: ["MyBatis", "框架", "Mybatis中forEach标签遇到的坑"]
legacy_source: "框架/Mybatis/Mybatis中forEach标签遇到的坑.md"
---
#### Mybatis中forEach标签遇到的坑

forEach标签一般用来将程序中的数组逐个去出，放入mysql语句的IN()内部；

```sql
例如：DELETE FROM t WHERE id IN (1, 3, 4, ...);
```


我们在java程序中可以这样的mapper接口可以这样写：

```java
int deleteByIds(int[] ids);
```

在映射的xml文件中是支持传入数组的这种写法的：

```java
&lt;delete id="deleteByIds" parameterType="int">
    DELETE FROM
    t
    WHERE
    id IN
    &lt;!--foreach标签请勿换行，否则会失败-->
    &lt;foreach collection="array" index="index" item="item" open="(" separator="," close=")">
        #&#123;item&#125;
    &lt;/foreach>
    AND user_id IS NULL
&lt;/delete>
```

一般我们认为按照上述的写法是不会有问题的，但是实际上会报错, 因为mysql会认为你在#&#123;item&#125;后面还拼接了空格，导致实际的mysql语句为:

```sql
DELETE FROM t WHERE id IN ( 1 , 3 , 4 , ...);
```

这是mybatis导致的bug，错误的拼接了sql语句，我们需要写成这样：

```java
&lt;delete id="deleteByIds" parameterType="int">
    DELETE FROM
    t
    WHERE
    id IN
    &lt;!--foreach标签请勿换行，否则会失败-->
    &lt;foreach collection="array" index="index" item="item" open="(" separator="," close=")">#&#123;item&#125;&lt;/foreach>
    AND user_id IS NULL
&lt;/delete>
```

**结论**：只要#&#123;item&#125;和&lt;foreach>&lt;/foreach>标签在同一行，可以正常运行；但是如果#&#123;item&#125;换行就会报错。
