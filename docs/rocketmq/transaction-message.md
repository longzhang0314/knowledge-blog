---
title: RocketMQ 事务消息理解框架
description: 用半消息、本地事务、事务回查解释 RocketMQ 事务消息的可靠性边界。
date: 2026-05-21
tags: [RocketMQ, 事务消息, 最终一致性]
keywords: [RocketMQ 事务消息, 半消息, 事务回查]
---

# RocketMQ 事务消息理解框架

## 结论

RocketMQ 事务消息解决的是“本地事务提交”和“消息发送”之间的一致性问题，本质上服务于最终一致性。

## 流程

1. Producer 发送半消息。
2. Broker 暂存半消息，消费者暂不可见。
3. Producer 执行本地事务。
4. Producer 根据本地事务结果提交或回滚消息。
5. 如果 Broker 长时间拿不到结果，会发起事务回查。

## 面试表达

可以强调它不是分布式强事务，而是通过半消息和回查机制，让消息状态最终和本地事务状态对齐。
