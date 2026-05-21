---
title: "违反Java排序规约导致的报错"
description: "违反Java排序规约导致的报错 的历史学习笔记。"
date: 2026-05-21
tags: ["Java", "语言基础"]
keywords: ["Java", "语言基础", "违反Java排序规约导致的报错"]
legacy_source: "java/语言/违反Java排序规约导致的报错.md"
---
### 违反Java排序规约导致的报错

#### 问题

在一个分页列表查询接口中，出来这样一个报错：
```text
java.lang.IllegalArgumentException: Comparison method violates its general contract!
	at java.util.TimSort.mergeHi(TimSort.java:899)
	at java.util.TimSort.mergeAt(TimSort.java:516)
	at java.util.TimSort.mergeForceCollapse(TimSort.java:457)
	at java.util.TimSort.sort(TimSort.java:254)
	at java.util.Arrays.sort(Arrays.java:1512)
	at java.util.ArrayList.sort(ArrayList.java:1462)
	at java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:387)
	at java.util.stream.Sink$ChainedReference.end(Sink.java:258)
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:483)
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472)
	at java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:708)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:499)
```

#### 定位

根据报错定位到代码如下：

```java
private int sort(SortDTO a, SortDTO b, String provinceCode) &#123;
    if (a.getProvinceName().equals(b.getProvinceName())) &#123;
        return Collator.getInstance(Locale.CHINESE).compare(a.getCityName(), b.getCityName());
    &#125;
    if (a.getProvinceCode().equals(provinceCode)) &#123;
        return -1;
    &#125;
    if (b.getProvinceCode().equals(provinceCode)) &#123;
        return 1;
    &#125;
    return Collator.getInstance(Locale.CHINESE).compare(a.getProvinceName(), b.getProvinceName());
&#125;
```

可以看出上面这段代码逻辑是：

如果省的名称相同，那么按照市的名称进行排序；

否则如果哪个省的code和给定的省code一致就放在前面；

如果两个省code都和给定的省code不一致，那么再按照省名称进行排序。

#### 原因

通过日志错误信息==Comparison method violates its general contract!== 搜索网上的说法，大致可以看出来是TimSort排序导致的，违反了排序规约，因为从Java7开始对排序进行更严格的限制。

**限制如下：**

```java
1、sgn(compare(x, y)) == -sgn(compare(y, x))
2、((compare(x, y)>0) && (compare(y, z)>0)) implies compare(x, z)>0
3、compare(x, y)==0 implies that sgn(compare(x, z))==sgn(compare(y, z))
```

简单解释一下就是：

```java
1、自反性：x与y的比较结果和y与x的比较结果相反；
2、传递性：如果x>y并且y>z, 那么 x>z；
3、对称性：如果x=y, 那么x与z的比较结果和y与z的比较结果相同；
```

#### 排查

网上的解决方案也比较简单：

1. 增加系统属性： java.util.Arrays.useLegacyMergeSort；这样可以恢复JDK7之前的排序规则，就算违反上述特性也不会报错；
2. 比较时，严格按照规则，尽量返回0，-1，1这三个标准结果来进行比较。

我们考虑使用方案2，排查代码的不合理之处。

这段代码已经有两年没有动过，是分页查询一个静态表的数据，查出来之后内存中用上面的排序方法进行排序。

**举反例**

因为近期给这个静态表中导入了一批新数据，怀疑是有些数据违反了排序规约：

发现有些数据省code相同，但是省的名称不同，比如同一个省code例如**1000**，一条数据名称是**浙江**，另一条是**浙江省**，给定的省code也是**1000**；这样就会出现先比较省名称发现不相等，然后任意一个在前比另一个都会返回-1，违反了自反性。

为什么两年了之前没出现问题？

因为之前导的数据比较规范，不会出现同一个省有的叫浙江，有的叫浙江省这样的情况；网上还有一种解释是说**只有在排序元素大于32才会有机率出现此错误**。

#### 解决

修改排序代码：

```java
private int sort(SortDTO a, SortDTO b, String provinceCode) &#123;
    if (a.getProvinceCode().equals(b.getProvinceCode())) &#123;
        return Collator.getInstance(Locale.CHINESE).compare(a.getCityName(), b.getCityName());
    &#125;
    if (a.getProvinceCode().equals(provinceCode)) &#123;
        return -1;
    &#125;
    if (b.getProvinceCode().equals(provinceCode)) &#123;
        return 1;
    &#125;
    return Collator.getInstance(Locale.CHINESE).compare(a.getProvinceName(), b.getProvinceName());
&#125;
```

最开始先用省code进行比较判断是不是同一个省，其余代码不变。
