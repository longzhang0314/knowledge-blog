---
title: "Sentinel入门"
description: "Sentinel入门 的历史学习笔记。"
date: 2026-05-21
tags: ["Sentinel", "限流"]
keywords: ["Sentinel", "限流", "Sentinel入门"]
legacy_source: "框架/Sentinel/Sentinel入门.md"
---
### Sentinel入门

#### 本地Demo

Sentinel的环境分为核心库和控制台，其中核心库不依赖任何框架，运行在jdk1.7以上的的java环境。

- 引入核心库

  ```
  &lt;!-- 添加Sentinel -->
  &lt;dependency>
  	&lt;groupId>com.alibaba.csp&lt;/groupId>
  	&lt;artifactId>sentinel-core&lt;/artifactId>
  	&lt;version>1.8.0&lt;/version>
  &lt;/dependency>
  ```

- 定义需要进行限流保护的资源

  ```java
  public class Demo &#123;
  
      public static void main(String[] args) &#123;
          // 配置规则
          initFlowRules();
  
          while (true) &#123;
            	// 也可以使用try...catch...finally，在finally中调用entry.exit();
              try (Entry entry = SphU.entry("HelloWorld")) &#123;
                  // 被保护的逻辑
                  System.out.println("hello world");
              &#125; catch (BlockException ex) &#123;
                  // 处理被流控的逻辑
                  System.out.println("blocked!");
              &#125;
          &#125;
      &#125;
  
    	// 限流规则
      private static void initFlowRules() &#123;
          List&lt;FlowRule> rules = new ArrayList&lt;>();
          FlowRule rule = new FlowRule();
          rule.setResource("HelloWorld");
          // Set limit QPS to 20.
          rule.setCount(20);
          rules.add(rule);
          FlowRuleManager.loadRules(rules);
      &#125;
  &#125;
  ```

- 效果检验

  ```java
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  blocked!
  Process finished with exit code 130 (interrupted by signal 2: SIGINT)
  ```

  可以看到大量打印"blocked!"，执行搜索时也能搜到"hello world"，可以看到正好是20个一组；因为while死循环执行速度非常快，一次成功执行20个以后，大量的时间进入循环内都被限流了。

  &lt;img src="https://tva1.sinaimg.cn/large/0081Kckwly1gjy2ihypc2j30uc0sy7at.jpg" alt="image-20201022135503254" style="zoom:50%;" />

  我们还可以继续在日志~/logs/csp/$&#123;appName&#125;-metrics.log.xxx里看到如下输出：

  ```java
  |--timestamp-|------date time----|-resource-|p |block|s |e|rt
  1603345874000|2020-10-22 13:51:14|HelloWorld|20|90338|20|0|0|0|0|0
  1603345875000|2020-10-22 13:51:15|HelloWorld|20|210325|20|0|0|0|0|0
  1603345876000|2020-10-22 13:51:16|HelloWorld|20|201347|20|0|0|0|0|0
  1603345877000|2020-10-22 13:51:17|HelloWorld|20|216051|20|0|0|0|0|0
  1603345878000|2020-10-22 13:51:18|HelloWorld|20|209560|20|0|0|0|0|0
  ```

  其中 `p` 代表通过的请求, `block` 代表被阻止的请求, `s` 代表成功执行完成的请求个数, `e` 代表用户自定义的异常, `rt` 代表平均响应时长。

  可以看到，这个程序每秒稳定输出 "HelloWorld" 20 次，和规则中预先设定的阈值是一样的。

- 控制台

  - Java客户端需要引入Transport 模块来与 Sentinel 控制台进行通信。我们先引入jar包。

    ```java
    &lt;!-- Sentinel 控制台 -->
    &lt;dependency>
      &lt;groupId>com.alibaba.csp&lt;/groupId>
      &lt;artifactId>sentinel-transport-simple-http&lt;/artifactId>
      &lt;version>1.7.2&lt;/version>
    &lt;/dependency>
    ```

  - 启动控制台

    - 从 [release 页面](https://github.com/alibaba/Sentinel/releases) 下载最新版本的控制台 jar 包；

    - 启动：启动 Sentinel 控制台需要 JDK 版本为 1.8 及以上版本。

      ```bash
      java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar
      ```

    - 访问：访问localhost:8080进入控制台，用户名密码默认都是sentinel；

  - 启动客户端项目，启动参数需要指定加入

    ```bash
    -Dcsp.sentinel.dashboard.server=consoleIp:port
    ```

  - 运行效果

    成功启动后控制台就会显示如下列

    &lt;img src="https://tva1.sinaimg.cn/large/0081Kckwly1gjy4n79fraj309a0kajsv.jpg" alt="image-20201022150850248" style="zoom:50%;" />

    可以看到实时监控数据。

    
