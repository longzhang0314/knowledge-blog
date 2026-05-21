---
title: "Executors中的线程池"
description: "Executors中的线程池 的历史学习笔记。"
date: 2026-05-21
tags: ["Java", "并发"]
keywords: ["Java", "并发", "Executors中的线程池"]
legacy_source: "java/多线程/Executors中的线程池.md"
---
#### Executors中的线程池

- newFixedThreadPool:创建固定大小的线程池, 多于这个数量的放在无界队列中。

```java
public static ExecutorService newFixedThreadPool(int nThreads) &#123;
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue&lt;Runnable>());
&#125;
```

- newSingleThreadExecutor：大小为1的newFixedThreadPool

```java
public static ExecutorService newSingleThreadExecutor() &#123;
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue&lt;Runnable>()));
&#125;
```
- newCachedThreadPool：没有核心线程，一个任务进来以后创建一个线程。

```java
public static ExecutorService newCachedThreadPool() &#123;
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue&lt;Runnable>());
&#125;
```

- newScheduledThreadPool：具有延时执行和可以周期性执行的队列的线程池。

```java
public ScheduledThreadPoolExecutor(int corePoolSize) &#123;
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue());
&#125;
```

- newWorkStealingPool: 可用于并行操作的线程池。

```java
public static ExecutorService newWorkStealingPool(int parallelism) &#123;
    return new ForkJoinPool
        (parallelism,
         ForkJoinPool.defaultForkJoinWorkerThreadFactory,
         null, true);
&#125;
```
