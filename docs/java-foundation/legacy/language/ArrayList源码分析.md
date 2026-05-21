---
title: "ArrayList源码分析"
description: "ArrayList源码分析 的历史学习笔记。"
date: 2026-05-21
tags: ["Java", "语言基础"]
keywords: ["Java", "语言基础", "ArrayList源码分析"]
legacy_source: "java/语言/ArrayList源码分析.md"
---
#### ArrayList源码分析

- **构造方法**
```java
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = &#123;&#125;;

private static final Object[] EMPTY_ELEMENTDATA = &#123;&#125;;

// 无参构造，默认初始化一个空数组
public ArrayList() &#123;
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
&#125;

// 指定初始容量的构造方法
public ArrayList(int initialCapacity) &#123;
    if (initialCapacity > 0) &#123;
        this.elementData = new Object[initialCapacity];
    &#125; else if (initialCapacity == 0) &#123;
        this.elementData = EMPTY_ELEMENTDATA;
    &#125; else &#123;
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    &#125;
&#125;

// 传入一个集合子类的构造方法
public ArrayList(Collection&lt;? extends E> c) &#123;
    elementData = c.toArray();
    if ((size = elementData.length) != 0) &#123;
        // c.toArray might (incorrectly) not return Object[] (see 6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    &#125; else &#123;
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    &#125;
&#125;
```
第二个传入指定容量的构造方法，会对数组的容量进行初始化；

第三个传入集合的构造方法，主要应用在对集合的深拷贝。

---

- **add(E)方法及扩容**
```java
private static final int DEFAULT_CAPACITY = 10;
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

public boolean add(E e) &#123;
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
&#125;

// 根据需要的最小容量扩容
private void ensureCapacityInternal(int minCapacity) &#123;
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
&#125;

// 根据需要的最终最小容量扩容
private void ensureExplicitCapacity(int minCapacity) &#123;
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
&#125;

// 计算得到需要的最终最小容量
private static int calculateCapacity(Object[] elementData, int minCapacity) &#123;
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) &#123;
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    &#125;
    return minCapacity;
&#125;

// 具体的扩容方法
private void grow(int minCapacity) &#123;
    // overflow-conscious code
    int oldCapacity = elementData.length;
    // 计算得到新容量
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 如果新容量小于需要的最小容量，就扩容到需要的最小容量
    // （一般只有无参构造add第一个元素会走到这里）
    if (newCapacity - minCapacity &lt; 0)
        newCapacity = minCapacity;
    // 如果新容量大于int最大值-8，通过需要的最小容量重新定义新容量
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
&#125;

// 通过需要的最小容量重新定义新容量
private static int hugeCapacity(int minCapacity) &#123;
    if (minCapacity &lt; 0) // overflow
        throw new OutOfMemoryError();
    // 如果需要的最小容量大于int最大值-8，去int最大值；否则取int最大值-8   
    return (minCapacity > MAX_ARRAY_SIZE) ?
        Integer.MAX_VALUE :
        MAX_ARRAY_SIZE;
&#125;


```
添加一个元素时，首先对原数组进行一次扩容，其中size代表当前已有的元素个数，所以需要的最小容量minCapacity是size+1；

对minCapacity进行重新计算，如果是无参构造方法，由于初始化时默认是DEFAULTCAPACITY_EMPTY_ELEMENTDATA这样的空数组，所以minCapacity重新定义为size+1和默认值10的较大值。

之后根据计算得到的minCapacity进行扩容：只有当minCapacity大于当前数组的长度时才需要扩容，否则不需要扩容。例如：当前数组长度10，已有3个元素，计算得到的minCapacity是4，那么不需要扩容，只有数组中元素装满时，size+1大于数组长度就需要扩容了。

具体的扩容grow方法：新容量先定义成原来容量的1.5倍，然后和需要的最小容量做比较，如果依然小于需要的最小容量就用最小容量；之后判断新容量是否超过了int最大值-8，如果超过了就用需要的最小容量重新计算新容量。

如果需要的最小容量大于int最大值-8，就定义为int最大值，否则定义为int最大值-8。

最后通过Arrays.copyOf(elementData, newCapacity)方法扩容，具体放在后面。

--- 

- **add(int, E)方法**
```java
// 插入元素E到指定的索引位置
public void add(int index, E element) &#123;
    // 检查是否索引越界
    rangeCheckForAdd(index);
    
    // 扩容，与前面的add(E)方法相同
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    // 数组拷贝
    System.arraycopy(elementData, index, elementData, index + 1,
                     size - index);
    elementData[index] = element;
    size++;
&#125;

private void rangeCheckForAdd(int index) &#123;
    if (index > size || index &lt; 0)
        throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
&#125;
```
与add(E)方法相比，先检查索引是否越界，因为add(E)方法默认放在最后，先扩容再插入不会存在索引越界问题，后续操作基本与add(E)相同，进行数组拷贝，然后在待插入位置赋值，size++。

---

- **Arrays.copyof()和System.arraycopy()**

```java
// 原数组src从某个索引位置srcPos开始，
// 拷贝到新数组dest从某个索引位置destPos开始，拷贝长度length
public static native void arraycopy(Object src,  int  srcPos,
                                    Object dest, int destPos,
                                    int length);

// 对原数组original拷贝newLength的长度，返回拷贝形成的新数组
// newLength可以大于原数组的长度，这样相当于复制原数组的所有元素并扩容
public static &lt;T> T[] copyOf(T[] original, int newLength) &#123;
    return (T[]) copyOf(original, newLength, original.getClass());
&#125;

public static &lt;T,U> T[] copyOf(U[] original, int newLength, Class&lt;? extends T[]> newType) &#123;
    @SuppressWarnings("unchecked")
    T[] copy = ((Object)newType == (Object)Object[].class)
        ? (T[]) new Object[newLength]
        : (T[]) Array.newInstance(newType.getComponentType(), newLength);
    System.arraycopy(original, 0, copy, 0,
                     Math.min(original.length, newLength));
    return copy;
&#125;
```
其实Arrays.copyOf()方法底层仍然调用了System.arraycopy()方法；

只是我们不需要自己创建新数组，方法内部已经创建好了；Arrayas.copyOf()方法主要是为了给原数组扩容。

--- 

- **手动扩容方法**

ArrayList源码中有一个扩容方法是对外提供的。

```java
public void ensureCapacity(int minCapacity) &#123;
    int minExpand = (elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
        // any size if not default element table
        ? 0
        // larger than default for default empty table. It's already
        // supposed to be at default size.
        : DEFAULT_CAPACITY;
    // 需要的最小容量大于当前这个数组的最小范围
    if (minCapacity > minExpand) &#123;
        ensureExplicitCapacity(minCapacity);
    &#125;
&#125;
```
最好在添加大量元素时先手动调用该方法进行扩容，减少后续自动扩容的次数。
