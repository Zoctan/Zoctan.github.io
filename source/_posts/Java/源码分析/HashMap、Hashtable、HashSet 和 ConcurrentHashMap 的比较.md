---
title: HashMap、Hashtable、HashSet 和 ConcurrentHashMap 的比较
date: 2018-07-01
category: 学习
tags:
  - Java
  - 源码
---

# Hashtable 和 HashMap 区别

- 基类不同：HashTable 基于 Dictionary 类；HashMap 基于 AbstractMap。

- null：HashTable 中的 key 和 value 都不允许为 null；HashMap 允许存在一个 key 为 null 和任意个 value 为 null 的键值对。

- 线程安全：Hashtable 线程安全；HashMap 线程不安全。同样，线程的安全与否会影响性能。

- 遍历不同：Hashtable 支持 Iterator 和 Enumeration 两种遍历方式；HashMap 仅支持 Iterator 的遍历方式。

- HashMap 不能保证随着时间的推移 Map 中的元素次序是不变的（重新哈希时可能移动元素）。

可以通过下面的语句使得 HashMap 同步：

```java
Map map = Collections.synchronizeMap(hashMap);
```

> 关于 HashMap 线程不安全，《Java并发编程的艺术》中写道：
> HashMap 在并发执行 put 操作时会引起死循环，导致 CPU 利用率接近 100%。
> 因为多线程会导致 HashMap 的 Node 链表形成环形数据结构，一旦形成环形数据结构，Node 的 next 节点永远不为空，就会在获取 Node 时产生死循环。

# 相关问题

可以使用自定义的对象作为 key 吗？

可以使用任何对象作为键，只要它遵守了 equals() 和 hashCode() 方法的定义规则，并且当对象插入到 Map 中之后将不会再改变了。

