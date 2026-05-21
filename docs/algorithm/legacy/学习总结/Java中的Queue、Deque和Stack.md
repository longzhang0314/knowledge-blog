---
title: "Java中的Queue、Deque和Stack"
description: "Java中的Queue、Deque和Stack 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "Java中的Queue、Deque和Stack"]
legacy_source: "基础/数据结构与算法/学习总结/Java中的Queue、Deque和Stack.md"
---
## Java中的Queue、Deque、Stack

### Queue

Queue是java中对于队列这种FIFO数据结构的具体实现。队列尾部入队，头部出队。

```java
public interface Queue&lt;E> extends Collection&lt;E> &#123;

    boolean add(E e);
    
    boolean offer(E e);
    
    E remove();
    
    E poll();
    
    E element();
    
    E peek();
&#125;
```

#### add和offer方法

- LinkedList实现

```java
public boolean add(E e) &#123;
    linkLast(e);
    return true;
&#125;


public boolean offer(E e) &#123;
    return add(e);
&#125;

void linkLast(E e) &#123;
    final Node&lt;E> l = last;
    final Node&lt;E> newNode = new Node&lt;>(l, e, null);
    last = newNode;
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
&#125;
```
offer底层还是调用了add方法，添加null值进去不会报错，但实际上这个null值并没有被添加。

- ArrayDeque

```java
public boolean add(E e) &#123;
    addLast(e);
    return true;
&#125;

public void addLast(E e) &#123;
    if (e == null)
        throw new NullPointerException();
    elements[tail] = e;
    if ( (tail = (tail + 1) & (elements.length - 1)) == head)
        doubleCapacity();
&#125;

public boolean offer(E e) &#123;
    return offerLast(e);
&#125;

public boolean offerLast(E e) &#123;
    addLast(e);
    return true;
&#125;
```
offer和add方法底层都调用了addLast方法，添加null值会报错。

总结：对于Queue的add和offer方法，最终底层调用的都是同一个方法，所以使用哪个并没有什么区别；一般我们会把add和remove作为一组使用，offer和poll作为一组使用，所以具体使用哪个取决于出队的时候我们选择哪一个。

#### remove和poll方法

- LinkedList实现

```java
public E remove() &#123;
    return removeFirst();
&#125;

public E removeFirst() &#123;
    final Node&lt;E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return unlinkFirst(f);
&#125;

public E poll() &#123;
    final Node&lt;E> f = first;
    return (f == null) ? null : unlinkFirst(f);
&#125;
```

对于null值，remove方法会抛出异常；poll方法不会抛出异常，只是返回null。

- ArrayDeque实现

```java
public E remove() &#123;
    return removeFirst();
&#125;

public E removeFirst() &#123;
E x = pollFirst();
if (x == null)
    throw new NoSuchElementException();
return x;
&#125;

public E poll() &#123;
    return pollFirst();
&#125;

public E pollFirst() &#123;
    int h = head;
    @SuppressWarnings("unchecked")
    E result = (E) elements[h];
    // Element is null if deque empty
    if (result == null)
        return null;
    elements[h] = null;     // Must null out slot
    head = (h + 1) & (elements.length - 1);
    return result;
&#125;
```

和LinkedList一样，遇到null值remove方法会抛出异常，而poll方法会返回null。

总结：

- 对于Queue这种FIFO的数据结构，在插入时元素会被放到队列的尾部，弹出时从头部一个一个弹出。在使用时对于LinkedList和ArrayDeque的使用，我们只需要从数组和链表两种数据结构的特点去考虑即可。
- 对于add和offer的选择，只需要保证和remove和poll对应成组即可；
- 对于remove和poll的选择，如果想要在遇到null值时抛出异常选remove，如果想返回null值就选poll。

#### element和peek方法

- LinkedList实现
```java
public E element() &#123;
    return getFirst();
&#125;

public E getFirst() &#123;
    final Node&lt;E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return f.item;
&#125;

public E peek() &#123;
    final Node&lt;E> f = first;
    return (f == null) ? null : f.item;
&#125;
```
对于element方法，如果当前队列头部元素是null就抛出异常；对于peek方法，如果没有头部元素就返回null。
- ArrayDeque实现
```java
public E element() &#123;
    return getFirst();
&#125;

public E getFirst() &#123;
    @SuppressWarnings("unchecked")
    E result = (E) elements[head];
    if (result == null)
        throw new NoSuchElementException();
    return result;
&#125;

public E peek() &#123;
    return peekFirst();
&#125;

public E peekFirst() &#123;
    // elements[head] is null if deque empty
    return (E) elements[head];
&#125;
```
和LinkedList实现思路一致：对于element方法，如果当前队列头部元素是null就抛出异常；对于peek方法，如果没有头部元素就返回null。

总结：

- element和peek方法都是获取队列头部的元素，element在没有元素时抛出异常，peek方法在没有元素时返回null。
- 对于Queue的使用，如果没有元素时进行弹出或查看操作需要抛出异常就使用add、remove、element这一组；如果不要抛出异常，而是返回null值就使用offer、poll、peek这一组。

### Deque

Deque是java中对于双端队列的实现，入队可以选择头部或尾部，出队同样可以选择头部或尾部。

此外，Deque也是目前java推荐的栈的使用方式。

```java
public interface Deque&lt;E> extends Queue&lt;E> &#123;
   
    void addFirst(E e);

    void addLast(E e);

    boolean offerFirst(E e);

    boolean offerLast(E e);

    E removeFirst();

    E removeLast();

    E pollFirst();

    E pollLast();

    E getFirst();

    E getLast();

    E peekFirst();

    E peekLast();
    
    boolean removeFirstOccurrence(Object o);

    boolean removeLastOccurrence(Object o);

    // *** Queue methods ***

    boolean add(E e);

    boolean offer(E e);

    E remove();

    E poll();

    E element();

    E peek();

    // *** Stack methods ***

    void push(E e);

    E pop();


    // *** Collection methods ***

    boolean remove(Object o);

    boolean contains(Object o);

    public int size();

    Iterator&lt;E> iterator();

    Iterator&lt;E> descendingIterator();
&#125;
```
Deque继承自Queue，所以Queue本身的能力，对于Queue的方法和Collection的方法这里不做介绍；对于Stack的方法下面会专门进行介绍。

对于addFirst、addLast、offerFirst、offerLast、removeFirst、removeFirst、pollFirst、pollLast、getFirst、getLast、peekFirst、peekLast这些方法的分析和使用和前面的Queue是大致相同的，只是变成了两边都能插入、弹出和查看；Queue的element方法对应Deque的getFirst方法，其他的基本都可以从方法名进行分辨。

#### removeFirstOccurrence和removeLastOccurrence方法

- LinkedList实现
```java
public boolean removeFirstOccurrence(Object o) &#123;
    return remove(o);
&#125;

public boolean remove(Object o) &#123;
    if (o == null) &#123;
        for (Node&lt;E> x = first; x != null; x = x.next) &#123;
            if (x.item == null) &#123;
                unlink(x);
                return true;
            &#125;
        &#125;
    &#125; else &#123;
        for (Node&lt;E> x = first; x != null; x = x.next) &#123;
            if (o.equals(x.item)) &#123;
                unlink(x);
                return true;
            &#125;
        &#125;
    &#125;
    return false;
&#125;


public boolean removeLastOccurrence(Object o) &#123;
    if (o == null) &#123;
        for (Node&lt;E> x = last; x != null; x = x.prev) &#123;
            if (x.item == null) &#123;
                unlink(x);
                return true;
            &#125;
        &#125;
    &#125; else &#123;
        for (Node&lt;E> x = last; x != null; x = x.prev) &#123;
            if (o.equals(x.item)) &#123;
                unlink(x);
                return true;
            &#125;
        &#125;
    &#125;
    return false;
&#125;

E unlink(Node&lt;E> x) &#123;
    // assert x != null;
    final E element = x.item;
    final Node&lt;E> next = x.next;
    final Node&lt;E> prev = x.prev;

    if (prev == null) &#123;
        first = next;
    &#125; else &#123;
        prev.next = next;
        x.prev = null;
    &#125;

    if (next == null) &#123;
        last = prev;
    &#125; else &#123;
        next.prev = prev;
        x.next = null;
    &#125;

    x.item = null;
    size--;
    modCount++;
    return element;
&#125;
```
LinkedList是一个双向链表，所以删除其中第一个等于o的元素和最后一个等于o的元素实现方式差异不大，一个从头指针开始找，一个从尾指针开始找，找到并删除了就返回true，找不到返回false，不会抛出异常。

查找到元素的时间复杂度是O(N)的，因为需要从头指针或尾指针一个一个找，找到后删除是O(1)的，总的时间复杂度是O(N)。
- ArrayDeque实现
```java
public boolean removeFirstOccurrence(Object o) &#123;
    if (o == null)
        return false;
    int mask = elements.length - 1;
    int i = head;
    Object x;
    while ( (x = elements[i]) != null) &#123;
        if (o.equals(x)) &#123;
            delete(i);
            return true;
        &#125;
        i = (i + 1) & mask;
    &#125;
    return false;
&#125;

public boolean removeLastOccurrence(Object o) &#123;
    if (o == null)
        return false;
    int mask = elements.length - 1;
    int i = (tail - 1) & mask;
    Object x;
    while ( (x = elements[i]) != null) &#123;
        if (o.equals(x)) &#123;
            delete(i);
            return true;
        &#125;
        i = (i - 1) & mask;
    &#125;
    return false;
&#125;

private boolean delete(int i) &#123;
    checkInvariants();
    final Object[] elements = this.elements;
    final int mask = elements.length - 1;
    final int h = head;
    final int t = tail;
    final int front = (i - h) & mask;
    final int back  = (t - i) & mask;

    // Invariant: head &lt;= i &lt; tail mod circularity
    if (front >= ((t - h) & mask))
        throw new ConcurrentModificationException();

    // Optimize for least element motion
    if (front &lt; back) &#123;
        if (h &lt;= i) &#123;
            System.arraycopy(elements, h, elements, h + 1, front);
        &#125; else &#123; // Wrap around
            System.arraycopy(elements, 0, elements, 1, i);
            elements[0] = elements[mask];
            System.arraycopy(elements, h, elements, h + 1, mask - h);
        &#125;
        elements[h] = null;
        head = (h + 1) & mask;
        return false;
    &#125; else &#123;
        if (i &lt; t) &#123; // Copy the null tail as well
            System.arraycopy(elements, i + 1, elements, i, back);
            tail = t - 1;
        &#125; else &#123; // Wrap around
            System.arraycopy(elements, i + 1, elements, i, mask - i);
            elements[mask] = elements[0];
            System.arraycopy(elements, 1, elements, 0, t);
            tail = (t - 1) & mask;
        &#125;
        return true;
    &#125;
&#125;
```
ArrayDeque底层是由头尾两个指针组成的环形数组实现，所以这两个方法实现大致一致，我们来看第一个方法。

首先需要找到待删除的元素，从head指针开始往后移动，i = (i + 1) & mask其实相当于对索引取数组长度的模这个操作，因为ArrayDeque是环形数组，找到元素的时间复杂度是O(N)的，删除的时间复杂度也是O(N)的，因为需要进行元素搬移，所以总的时间复杂度是O(N^2)。

总结：

- 对于需要频繁用到删除指定元素的情况，使用LinkedList实现比较好；
- 如果只是实现栈、队列、双端队列的入队出队，以及获取头部尾部元素这样的情况，两种数据结构都可以使用，需要考虑到其他情况再决定。

### Stack

栈在在java中有原生的实现Stack，但是现在官方也已经不推荐使用了，官方在注释中推荐使用的栈的方式是:
```java
Deque&lt;Integer> stack = new ArrayDeque&lt;Integer>();
```
我们先来看看为什么Stack是一种不被推荐的使用方式。

#### Stack的实现

```java
public
class Stack&lt;E> extends Vector&lt;E> &#123;
    
    public Stack() &#123;
    &#125;

    public E push(E item) &#123;
        addElement(item);

        return item;
    &#125;

    public synchronized E pop() &#123;
        E       obj;
        int     len = size();

        obj = peek();
        removeElementAt(len - 1);

        return obj;
    &#125;

    public synchronized E peek() &#123;
        int     len = size();

        if (len == 0)
            throw new EmptyStackException();
        return elementAt(len - 1);
    &#125;

    public boolean empty() &#123;
        return size() == 0;
    &#125;

    public synchronized int search(Object o) &#123;
        int i = lastIndexOf(o);

        if (i >= 0) &#123;
            return size() - i;
        &#125;
        return -1;
    &#125;
&#125;
```
因为Stack的实现是继承了Vector来实现的，所以Stack具备了一些栈所不需要的能力，比如
```java
Stack&lt;Integer> stack = new Stack&lt;>();
stack.push(1);
stack.push(2);

// 在stack的1，2元素中间插入666
stack.add(1, 666);
```
具体的可以参考这篇文章：
[Java 程序员，别用 Stack？！](https://mp.weixin.qq.com/s/Ba8jrULf8NJbENK6WGrVWg)

对于栈来说，这种能力破坏了栈本身的数据结构的封装。

#### Deque实现栈

```java
public interface Deque&lt;E> extends Queue&lt;E> &#123;

    // *** Stack methods ***

    void push(E e);

    E pop();
&#125;
```

我们来看看Deque对于栈的实现，当然前面列出的Deque的通用方法也可以直接拿来使用。

- LinkedList的实现

```java
public void push(E e) &#123;
    addFirst(e);
&#125;

public E pop() &#123;
    return removeFirst();
&#125;
```

- ArrayDeque实现
```java
public void push(E e) &#123;
    addFirst(e);
&#125;

public E pop() &#123;
    return removeFirst();
&#125;
```

可以看出这两个方法都是用了原有的add和remove方法来实现的，所以在使用时对应的数据结构配合对应方法方便理解即可。
