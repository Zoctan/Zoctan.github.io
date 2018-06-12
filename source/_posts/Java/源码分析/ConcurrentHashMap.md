---
title: ConcurrentHashMap
date: 2018-5-13
category: 学习
tags:
  - Java
  - 源码
---

https://blog.csdn.net/mine_song/article/details/70140596

**源码**

```java
public class ConcurrentHashMap<K, V>
            extends AbstractMap<K, V>
            implements ConcurrentMap<K, V>, Serializable {

    // ...

}
```

**继承关系**

```
java.lang.Object  
  ↳ java.util.AbstractMap<K, V>  
      ↳ java.util.concurrent.ConcurrentHashMap<K, V>  
```

**特点**


**构造函数**