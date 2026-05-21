---
title: "LFUCache"
description: "LFUCache 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "LFUCache"]
legacy_source: "基础/数据结构与算法/学习总结/LFUCache.md"
---
#### LRUCache

对比LRUCache，节点增加一个存储访问次数的属性，随机访问仍然采用HashMap,另外一个HashMap存储不同访问次数对应的双向链表。维护一个全局变量min,存储当前全局访问次数最少是多少，方便在缓存满时O(1)定位到要删除的链表元素。

```java
class LFUCache &#123;
    private HashMap&lt;Integer, Node> map;
    private HashMap&lt;Integer, DoubleList> caches;
    private int capacity;
    private int min;
    private int size;

    LFUCache(int capacity) &#123;
        this.map = new HashMap&lt;>();
        this.caches = new HashMap&lt;>();
        this.capacity = capacity;
        this.min = 1;
    &#125;

    public int get(int key) &#123;
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        put(key, node.val);
        return node.val;
    &#125;

    public void put(int key, int value) &#123;
        Node node;
        if (map.containsKey(key)) &#123;
            node = map.get(key);
            // 先从原来的链表删除
            removeFromPreList(node);
            // 判断移除的是否是最小的list，并且当前list为空
            if (node.freq == min && caches.get(min).size() == 0) min++;
            node.val = value;
            node.freq += 1;
        &#125; else &#123;
            // 判断是否空间已满
            if (size == capacity) &#123;
                // 移除访问次数最小的尾部元素
                Node last = caches.get(min).removeLast();
                map.remove(last.key);
            &#125; else size++;
            // 创建新元素，访问次数为1
            node = new Node(key, value);
            min = 1;
        &#125;
        // 添加到新的链表
        put(node);
    &#125;

    // 添加到新的链表，通过访问次数定位
    private void put(Node node) &#123;
        if (capacity &lt;= 0) return;
        int freq = node.freq;
        DoubleList doubleList = caches.get(freq);
        if (doubleList == null) &#123;
            doubleList = new DoubleList();
            caches.put(freq, doubleList);
        &#125;
        doubleList.addFirst(node);
        map.put(node.key, node);
    &#125;

    // 从原来的链表删除
    private void removeFromPreList(Node node) &#123;
        caches.get(node.freq).remove(node);
        map.remove(node.key);
    &#125;
&#125;

class Node &#123;
    int key;
    int val;
    Node prev;
    Node next;
    int freq;

    Node(int key, int val) &#123;
        this.key = key;
        this.val = val;
        this.freq = 1;
    &#125;
&#125;

class DoubleList &#123;
    private Node head;
    private Node tail;
    private int size;

    DoubleList() &#123;
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    &#125;

    public void addFirst(Node node) &#123;
        node.next = head.next;
        node.prev = head;
        head.next = node;
        node.next.prev = node;
        size++;
    &#125;

    public void remove(Node node) &#123;
        node.next.prev = node.prev;
        node.prev.next = node.next;
        size--;
    &#125;

    public Node removeLast() &#123;
        if (tail.prev == head) return null;
        Node last = tail.prev;
        remove(last);
        return last;
    &#125;

    public int size() &#123;
        return size;
    &#125;
&#125;
```
