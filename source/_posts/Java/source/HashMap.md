---
title: HashMap
date: 2018-5-12
category: 学习
tags:
  - Java
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
    private transient HashMap.Node<?, ?>[] table;
    // HashMap 中保存的键值对的实际数量
    private transient int count;  
    // 阈值，用于判断是否需要调整 HashMap 的容量（threshold = 容量*加载因子）
    private int threshold;
    // 加载因子
    private float loadFactor;
    // HashMap 被改变的次数，实现fail-fast机制
    private transient int modCount;

    // ...

    public V put(K key, V value) {
        return this.putVal(hash(key), key, value, false, true);
    }

    final V putVal(int hash, K key, V value, boolean var4, boolean var5) {
        HashMap.Node[] var6 = this.table;
        int var8;
        if (this.table == null || (var8 = var6.length) == 0) {
            var8 = (var6 = this.resize()).length;
        }

        Object var7;
        int var9;
        if ((var7 = var6[var9 = var8 - 1 & hash]) == null) {
            var6[var9] = this.newNode(hash, key, value, (HashMap.Node)null);
        } else {
            Object var10;
            label79: {
                Object var11;
                if (((HashMap.Node)var7).hash == hash) {
                    var11 = ((HashMap.Node)var7).key;
                    if (((HashMap.Node)var7).key == key || key != null && key.equals(var11)) {
                        var10 = var7;
                        break label79;
                    }
                }

                if (var7 instanceof HashMap.TreeNode) {
                    var10 = ((HashMap.TreeNode)var7).putTreeVal(this, var6, hash, key, value);
                } else {
                    int var12 = 0;

                    while(true) {
                        var10 = ((HashMap.Node)var7).next;
                        if (((HashMap.Node)var7).next == null) {
                            ((HashMap.Node)var7).next = this.newNode(hash, key, value, (HashMap.Node)null);
                            if (var12 >= 7) {
                                this.treeifyBin(var6, hash);
                            }
                            break;
                        }

                        if (((HashMap.Node)var10).hash == hash) {
                            var11 = ((HashMap.Node)var10).key;
                            if (((HashMap.Node)var10).key == key || key != null && key.equals(var11)) {
                                break;
                            }
                        }

                        var7 = var10;
                        ++var12;
                    }
                }
            }

            if (var10 != null) {
                Object var13 = ((HashMap.Node)var10).value;
                if (!var4 || var13 == null) {
                    ((HashMap.Node)var10).value = value;
                }

                this.afterNodeAccess((HashMap.Node)var10);
                return var13;
            }
        }

        ++this.modCount;
        if (++this.size > this.threshold) {
            this.resize();
        }

        this.afterNodeInsertion(var5);
        return null;
    }

    public V get(Object key) {
        HashMap.Node node = this.getNode(hash(key), key);
        return node == null ? null : node.value;
    }

    final HashMap.Node<K, V> getNode(int hash, Object key) {
        HashMap.Node[] table = this.table;
        HashMap.Node node = table[length - 1 & hash];
        int length = table.length;

        if (this.table != null && length > 0 && node != null) {            
            // 在“该hash值对应的链表”上查找“键值等于key”的元素
            for (;node != null;node = node.next) {
                if (node instanceof HashMap.TreeNode) {
                    return ((HashMap.TreeNode) node).getTreeNode(hash, key);
                }
                if (node.hash == hash
                    && (node.key == key || key != null && key.equals(node.key))) {
                    return node;
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

1. HashMap 是一个散列表，它存储的内容是键值对（key-value）映射。
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
    this.modCount = 0;
    // 验证初始容量
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + var1);
    // HashMap 的最大容量只能是 MAXIMUM_CAPACITY
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;

    // 验证加载因子
    if (loadFactor <= 0.0F || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);

    if (initialCapacity == 0)
        initialCapacity = 1;

    this.loadFactor = loadFactor;
    
    // 计算阀值
    this.threshold = tableSizeFor(initialCapacity);
}

// 找出“大于 initialCapacity ”的最小的2的幂
private static final int tableSizeFor(int initialCapacity) {
    int capacity = initialCapacity - 1;
    capacity |= capacity >>> 1;
    capacity |= capacity >>> 2;
    capacity |= capacity >>> 4;
    capacity |= capacity >>> 8;
    capacity |= capacity >>> 16;
    return capacity < 0 ? 1 : (capacity >= 0x40000000 ? 0x40000000 : capacity + 1);
}
```