---
title: HashTable
date: 2018-5-12
category: 学习
tags:
  - Java
  - 源码
---

**源码**

```java
public class Hashtable<K, V>
            extends Dictionary<K, V>
            implements Map<K, V>, Cloneable, Serializable {

    // 实际上 Entry 是一个单向链表
    private static class Entry<K, V> implements java.util.Map.Entry<K, V> {
        //...
    }
    
    // 哈希表的"key-value键值对"都是存储在 Entry 数组中的
    private transient Hashtable.Entry<?, ?>[] table;
    // Hashtable 中保存的键值对的实际数量
    private transient int count;  
    // 阈值，用于判断是否需要调整 Hashtable 的容量（threshold = 容量*加载因子）
    private int threshold;
    // 加载因子
    private float loadFactor;
    // Hashtable 被改变的次数，实现fail-fast机制
    private transient int modCount;

    // ...

    private void addEntry(int hash, K key, V value, int entry) {
        this.modCount++;
        Hashtable.Entry[] table = this.table;

        // 如果容器中的元素数量已经达到阀值，则进行扩容操作
        if (this.count >= this.threshold) {
            this.rehash();
            table = this.table;
            hash = key.hashCode();
            entry = (hash & 0x7FFFFFFF) % table.length;
        }

        // 在索引位置处插入一个新的节点
        Hashtable.Entry e = table[entry];
        table[entry] = new Hashtable.Entry(hash, key, value, e);
        // 容器中元素+1
        this.count++;
    }

    public synchronized V put(K key, V value) {
        // 确保 value 不为 null
        if (value == null) {
            throw new NullPointerException();
        } else {
            /*  
            * 确保 key 在 table[] 是不重复的  
            * 处理过程：  
            * 1、计算 key 的 hash 值，确认在 table[] 中的索引位置  
            * 2、迭代 index 索引位置，如果该位置处的链表中存在一个一样的 key，则替换其 value，返回旧值  
            */
            Hashtable.Entry[] table = this.table;
            // key 的 hash 值，而 null 没有 hashCode，所以 key 不能为 null
            int hash = key.hashCode();
            // 确认该 key 的索引位置
            int index = (hash & 0x7FFFFFFF) % table.length;
            // 迭代，寻找该 key，替换
            for(Hashtable.Entry e = table[index]; e != null; e = e.next) {
                if (e.hash == hash && e.key.equals(key)) {
                    Object old = e.value;
                    e.value = value;
                    return old;
                }
            }

            this.addEntry(hash, key, value, e);
            return null;
        }
    }

    public synchronized V get(Object key) {
        Hashtable.Entry[] table = this.table;
        // 先获得索引值
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % table.length;
        // 然后遍历
        for (Hashtable.Entry e = table[index]; e != null; e = e.next) {
            if (e.hash == hash && e.key.equals(key)) {
                // 最后返回
                return e.value;
            }
        }
        return null;
    }
}
```

**继承关系**

```
java.lang.Object  
  ↳ java.util.Dictionary<K, V>  
      ↳ java.util.Hashtable<K, V>  
```

**特点**

1. Hashtable 是一个散列表，它存储的内容是键值对（key-value）映射。
2. key、value 都不可以为 null。
3. Hashtable 继承于 Dictionary，实现了 Map、Cloneable、java.io.Serializable 接口。
4. Hashtable 的方法都是同步（synchronized）的，即其是线程安全的。

**构造函数**

Hashtable 提供了4个构造函数：

```java
// 默认构造函数
public Hashtable()

// 指定“容量大小”的构造函数
public Hashtable(int initialCapacity)

// 指定“容量大小”和“加载因子”的构造函数
public Hashtable(int initialCapacity, float loadFactor)

// 包含“子Map”的构造函数
public Hashtable(Map<? extends K, ? extends V> map)
```

上面的四个构造方法中，第三个最重要，指定初始化容量和构造因子：

```java
public Hashtable(int initialCapacity, float loadFactor) {
    this.modCount = 0;
    // 验证初始容量
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);
    
    // 验证加载因子
    if (loadFactor <= 0.0F || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal Load: "+ loadFactor);

    if (initialCapacity == 0)
        initialCapacity = 1;

    this.loadFactor = loadFactor;

    // 初始化 table，获得大小为 initialCapacity 的 table 数组    
    this.table = new Hashtable.Entry[initialCapacity];

    // 计算阀值
    this.threshold = (int) Math.min((float) initialCapacity * loadFactor, this.MAX_ARRAY_SIZE + 1);
}
```

**Hashtable 和 HashMap 区别**

> Dictionary 是什么？
> 它可以将任何键映射到相应值的类的抽象类。
> 
> AbstractMap 是什么？
> 它是基于 Map 接口的骨干实现，以最大限度地减少实现此接口所需的工作。

1. 基类不同：HashTable 基于 Dictionary 类，而 HashMap 基于 AbstractMap。

2. null：HashTable 中的 key 和 value 都不允许为 null，但 HashMap 允许存在一个 key 为 null 和任意个 value 为 null 的键值对。

3. 线程安全：Hashtable 线程安全，HashMap 线程不安全。

4. 遍历不同：HashMap 仅支持 Iterator 的遍历方式，Hashtable 支持 Iterator 和 Enumeration 两种遍历方式。