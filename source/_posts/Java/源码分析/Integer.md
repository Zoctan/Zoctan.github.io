---
title: Integer
date: 2018-07-01
category: 学习
tags:
  - Java
  - 源码
---

## 问题

为什么 127 == 127 会返回为 True，而 128 == 128 返回为 False？

代码如下：

```java
public class Main {

    public static void main(String[] args) {
        Integer a = 127, b = 127;
        System.out.println(a == b);
        Integer c = 128, d = 128;
        System.out.println(c == d);
    }
}
```

结果：

```java
true
false
```

> 两个引用如果指向的是同一个对象，那么 == 成立；
> 反之，如果指向的不是同一个对象，那么 == 不成立，即使引用的内容是一样的。


