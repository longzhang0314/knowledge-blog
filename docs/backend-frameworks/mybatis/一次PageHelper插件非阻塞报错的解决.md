---
title: "一次PageHelper插件非阻塞报错的解决"
description: "一次PageHelper插件非阻塞报错的解决 的历史学习笔记。"
date: 2026-05-21
tags: ["MyBatis", "框架"]
keywords: ["MyBatis", "框架", "一次PageHelper插件非阻塞报错的解决"]
legacy_source: "框架/Mybatis/一次PageHelper插件非阻塞报错的解决.md"
---
#### 问题



#### 定位

真线发现大厅团购单读打印了堆栈异常，但是不会阻塞流程，定位到如下代码：





#### 分析

并没有看出什么错误，然后google发现这个错误和PageHelper插件的order by入参有关，网上建议order by写死在xml里面。。。于是继续搜索：pagehelper order by报错，发现一些端倪：

https://blog.csdn.net/github_39325328/article/details/84836270

https://blog.csdn.net/songshuguowang/article/details/98742955

有两篇文章博主的报错最后原因虽然不一致，但都可以抽象成sql语句不规范和PageHelper发生了化学反应，导致发生报错导致的。于是回头看我们自己的代码，猜测是这个where 1导致的（where 1直接在mysql客户端可以正常运行，但就是看着不规范。。）



staging环境debug验证，首先定位到了出错的sql:



```sql
select
     *
    from group_buying where 1
     AND state IN
       (  
        ?
       , 
        ?
       ) 
     
     
      AND instance_code IN
       (  
        ?
       ) 
     
     
     
      AND (group_id = ? OR creator_org_name like
      CONCAT('%',?,'%') OR goods_name like CONCAT('%',?,'%'))
     
     
      AND (end_bidding_time >= ? OR end_bidding_time is null)
     
     
    AND is_del = 0
```

然后看报错信息，看到报错定位到第3行，有关键字1，基本上确定已经在射程范围之内了。



```sql
net.sf.jsqlparser.parser.ParseException: Encountered " &lt;S_LONG> "1 "" at line 3, column 29.
Was expecting one of:
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    "(" ...
    
```

#### 解决

有两种方式解决，可以改成where 1=1，也可以改成&lt;where>标签的格式，这两种方式经测试都不会报错。



- 结论

  要写规范的mybatis xml语句，尽量使用&lt;where>这种标签，它可以把标签内部第一个and自动省去，方便还好用。

  对于为什么报错的底层原因，大家有空可以研究下。。。
