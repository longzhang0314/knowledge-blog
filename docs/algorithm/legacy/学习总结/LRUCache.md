---
title: "LRUCache"
description: "LRUCache 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "LRUCache"]
legacy_source: "基础/数据结构与算法/学习总结/LRUCache.md"
---
#### LRUCache

使用双向链表+HashMap实现LRUCacha, map中存储key和对应的节点。

```java
class LRUCache &#123;
    //使用双向链表加散列表，双向链表存储key,val;散列表存储key和对应的节点，这样查找效率也是O(1)
    private HashMap&lt;Integer, Node> map;
    private DoubleList cache;
    private int capacity;

    public LRUCache(int capacity) &#123;
        this.map = new HashMap&lt;>();
        this.cache = new DoubleList();
        this.capacity = capacity;
    &#125;
    //通过key获取元素的val：通过key在散列表中查找到Node，在cache中把该元素移动到头部
    public int get(int key) &#123;
        if (!map.containsKey(key)) return -1;
        int val = map.get(key).val;
        //移动元素到头部
        put(key, val);
        return val;
    &#125;
    //放入元素，如果存在就移动到头部；如果空间已满就删除尾部元素
    public void put(int key, int value) &#123;
        Node node = new Node(key, value);
        if (map.containsKey(key)) &#123; //缓存中存在
            cache.remove(map.get(key));
        &#125; else &#123; //缓存中不存在，如果满了就先删除
            if (cache.size() == capacity) &#123;
                Node last = cache.removeLast();
                map.remove(last.key);
            &#125;
        &#125;
        //统一插入头部
        cache.addFirst(node);
        map.put(key, node);
    &#125;
&#125;

class DoubleList&#123;
    private Node head;
    private Node tail;
    private int size;

    DoubleList() &#123;
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
        size = 0;
    &#125;

    //添加到链表头部
    void addFirst(Node node) &#123;
        node.prev = head;
        node.next = head.next;
        head.next = node;
        node.next.prev = node;
        size++;
    &#125;

    //删除某个节点
    void remove(Node node) &#123;
        node.prev.next = node.next;
        node.next.prev = node.prev;
        size--;
    &#125;

    //删除尾部元素，并返回
    Node removeLast() &#123;
        if (tail.next == head) return null;
        Node last = tail.prev;
        remove(last);
        return last;
    &#125;

    int size() &#123;
        return size;
    &#125;
&#125;

class Node &#123;
    int key;
    int val;
    Node prev;
    Node next;
    Node(int key, int val) &#123;
        this.key = key;
        this.val = val;
    &#125;
&#125;
```

也可以直接继承LinkedHashMap来实现

```java

```
