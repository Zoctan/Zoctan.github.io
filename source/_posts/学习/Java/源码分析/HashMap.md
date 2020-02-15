---
title: HashMap
date: 2018-05-12
category: Java
tags:
  - 源码
---

**源码**

https://www.cnblogs.com/skywang12345/p/3310835.html

```java
public class HashMap<K, V>
            extends AbstractMap<K, V>
            implements Map<K, V>, Cloneable, Serializable {

    // 实际上 Node 是一个单向链表
    private static class Node<K, V> implements java.util.Map.Entry<K, V> {
        //...
    }

    // 哈希表的"key-value键值对"都是存储在 Node 数组中的
    private transient HashMap.Node<K, V>[] table;
    // HashMap 中保存的键值对的实际数量
    private transient int size;
    // 阈值，用于判断是否需要调整 HashMap 的容量（threshold = 容量*加载因子）
    private int threshold;
    // 加载因子
    private final float loadFactor;
    // HashMap 被改变的次数，实现 fail-fast 机制
    private transient int modCount;

    // ...

    public V put(K key, V value) {
        return this.putVal(hash(key), key, value, false, true);
    }

    final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
        HashMap.Node<K, V>[] tab = this.table;
        Node<K, V> p;
        int n, i;
        if (this.table == null || (n = tab.length) == 0)
            n = (tab = this.resize()).length;

        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);

        else {
            Node<K, V> e;
            K k;
            if (p.hash == hash &&
                    ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K, V>) p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                            ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }

    public V get(Object key) {
        HashMap.Node<K, V> node = this.getNode(hash(key), key);
        return node == null ? null : node.value;
    }

    final HashMap.Node<K, V> getNode(int hash, Object key) {
        HashMap.Node<K, V>[] table = this.table;
        int n = table.length;
        HashMap.Node<K, V> first = table[n - 1 & hash], e;
        K k;

        if (this.table != null && n > 0 && first != null) {
            for (; first != null; first = first.next) {
                // 在该 hash 值对应的链表上查找键值等于 key 的元素
                // 如果 hash 值相同并且键值地址或键值一样
                if (first.hash == hash &&
                        ((k = first.key) == key || (key != null && key.equals(k))))
                    return first;
                if ((e = first.next) != null) {
                    if (first instanceof TreeNode)
                        return ((TreeNode<K, V>) first).getTreeNode(hash, key);
                    do {
                        if (e.hash == hash &&
                                ((k = e.key) == key || (key != null && key.equals(k))))
                            return e;
                    } while ((e = e.next) != null);
                }
            }
        }
        return null;
    }
}
```

**继承关系**

```
java.lang.Object  
  ↳ java.util.AbstractMap<K, V>  
      ↳ java.util.HashMap<K, V>  
```

**特点**

1. HashMap 实际上是一个"链表散列"的数据结构，即数组和链表的结合体。底层结构是一个数组，数组中的每一项是一条链表。存储的是 Entry 键值对（key-value）映射。
2. 允许存在一个 key 为 null 和任意个 value 为 null 的键值对。
3. HashMap 继承于 AbstractMap，实现了 Map、Cloneable、java.io.Serializable 接口。
4. HashMap 的方法没有锁，即其不是线程安全的。

**构造函数**

HashMap 提供了4个构造函数：

```java
// 默认构造函数
public HashMap()

// 指定“容量大小”的构造函数
public HashMap(int initialCapacity)

// 指定“容量大小”和“加载因子”的构造函数
public HashMap(int initialCapacity, float loadFactor)

// 包含“子Map”的构造函数
public HashMap(Map<? extends K, ? extends V> map)
```

上面的四个构造方法中，第三个最重要，指定初始化容量和构造因子：

```java
public HashMap(int initialCapacity, float loadFactor) {
    // 验证初始容量
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);

    // HashMap 的最大容量只能是 MAXIMUM_CAPACITY
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;

    // 验证加载因子
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);

    this.loadFactor = loadFactor;
    
    // 计算阀值
    this.threshold = tableSizeFor(initialCapacity);
}

// 返回 initialCapacity 的最小2次幂
private static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```