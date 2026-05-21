---
title: "Bean生命周期"
description: "Bean生命周期 的历史学习笔记。"
date: 2026-05-21
tags: ["Spring", "框架"]
keywords: ["Spring", "框架", "Bean生命周期"]
legacy_source: "框架/Spring/Bean生命周期.md"
---
# Bean生命周期

Bean的生命周期

1. 什么是Bean

Bean: Spring管理的对象

class -> 对象 -> 填充属性 -> 放到单例池 -> bean对象

2. Bean的实例化初始化过程

实例化

实例化前 ----  判断是否能直接得到bean，如果能直接得到，不需要后面的步骤

调用InstantiationAwareBeanPostProcessor接口的	postProcessBeforeInstantiation()方法;

可以手动实现用来扩展；如果返回null，会走Spring的默认逻辑

实例化  ---- 推断构造，new对象（通过构造方法反射得到的对象）

实例化后

调用InstantiationAwareBeanPostProcessor接口的postProcessAfterInstantiation()方法；

去填充属性

初始化

初始化前

初始化 ---- InitializingBean等 : 实现该接口的afterPropertiesSet()可以对Bean的属性进行初始化

初始化后 ---- AOP代理对象: 如果配置了切面，基于初始化的Bean对象创建代理对象。

放入单例池

![Bean生命周期 image 1](./Bean生命周期.assets/image-01.png)

单例Bean在上面第一段代码生成，放入单例池中；原型Bean在第二行代码生成。

3. 第一段代码生成单例Bean实例化前

![Bean生命周期 image 2](./Bean生命周期.assets/image-02.png)

![Bean生命周期 image 3](./Bean生命周期.assets/image-03.png)

![Bean生命周期 image 4](./Bean生命周期.assets/image-04.png)

![Bean生命周期 image 5](./Bean生命周期.assets/image-05.png)

无需进入，仅关注

![Bean生命周期 image 6](./Bean生命周期.assets/image-06.png)

无需进入，仅关注

![Bean生命周期 image 7](./Bean生命周期.assets/image-07.png)

![Bean生命周期 image 8](./Bean生命周期.assets/image-08.png)

实例化前

![Bean生命周期 image 9](./Bean生命周期.assets/image-09.png)

![Bean生命周期 image 10](./Bean生命周期.assets/image-10.png)

![Bean生命周期 image 11](./Bean生命周期.assets/image-11.png)

可以自己实现该接口，实现实例化前的功能，自己定制需要的Bean

![Bean生命周期 image 12](./Bean生命周期.assets/image-12.png)

4. 实例化与实例化后流程

![Bean生命周期 image 13](./Bean生命周期.assets/image-13.png)

![Bean生命周期 image 14](./Bean生命周期.assets/image-14.png)

![Bean生命周期 image 15](./Bean生命周期.assets/image-15.png)

![Bean生命周期 image 16](./Bean生命周期.assets/image-16.png)

![Bean生命周期 image 17](./Bean生命周期.assets/image-17.png)

通过构造方法反射得到一个对象

![Bean生命周期 image 18](./Bean生命周期.assets/image-18.png)

得到实例化对象

![Bean生命周期 image 19](./Bean生命周期.assets/image-19.png)

填充属性

![Bean生命周期 image 20](./Bean生命周期.assets/image-20.png)

实例化后

![Bean生命周期 image 21](./Bean生命周期.assets/image-21.png)

5. 初始化

![Bean生命周期 image 22](./Bean生命周期.assets/image-22.png)

![Bean生命周期 image 23](./Bean生命周期.assets/image-23.png)

执行完这段代码以后，beanName, beanClassLoader, beanFactory就都有值了。

![Bean生命周期 image 24](./Bean生命周期.assets/image-24.png)

可以手动实现BeanNameAware接口，就可以拿到当前bean的beanName;

![Bean生命周期 image 25](./Bean生命周期.assets/image-25.png)
