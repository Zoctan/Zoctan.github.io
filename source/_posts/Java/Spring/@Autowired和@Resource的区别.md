---
title: @Autowired和@Resource的区别
date: 2018-06-18
category: 学习
tags:
  - Spring
---

共同点：装配 Bean，写在字段或 setter 方法上。

**@Autowired**

Spring 的注解，来自 org.springframework.beans.factory.annotation.Autowired

默认按类型装配，也可以使用名称装配，但要配合 @Qualifier 注解。

依赖对象必须存在，如果要允许 null 值，可以设置 @Autowired(required=false)
　　　　　　　
```java
public class TestServiceImpl {
    @Autowired(required=false)
    @Qualifier("userDao")
    private UserDao userDao; 
}
```

**@Resource**

JDK1.6 的注解，来自 javax.annotation.Resource

默认按名称进行装配，通过 name 属性进行指定，不指定时默认使用首字母小写驼峰格式。

```java
public class TestServiceImpl {
    // 下面两种 @Resource 只要使用一种即可

    // 用于字段上
    @Resource(name="userDao")
    private UserDao userDao;
    
    // 用于 setter 方法上
    @Resource(name="userDao")
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```