---
title: 事务注解
date: 2018-3-19
category: 学习
tags:
  - Java
  - Spring
---

# 什么是事务

在使用应用软件过程中，用户的一个操作实际是对数据读写的多步操作的结合。

由于数据操作在顺序执行的过程中，任何一步操作都有可能发生异常，异常会导致后续操作无法完成，此时由于业务逻辑并未正确的完成，之前成功操作数据的并不可靠，需要在这种情况下进行回退。

事务的作用就是为了保证用户的每一个操作都是可靠的，事务中的每一步操作都必须成功执行，只要有发生异常就回退到事务开始未进行操作的状态。

# Spring 事务

事务有两种实现方式：编程式事务管理、声明式事务管理。

编程式事务管理：使用 `TransactionTemplate` 或直接使用底层的 `PlatformTransactionManager`。

声明式事务管理：建立在 `AOP` 上。其本质是对方法前后进行拦截，然后在目标方法开始前创建或者加入一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务。

对于编程式事务管理，`Spring` 推荐使用 `TransactionTemplate`。

声明式事务管理不需要入侵代码，通过注解 `@Transactional` 就可以进行事务操作，更快捷而且简单。

声明式事务有两种使用方式：
1. 基于 XML 的声明式事务
2. 基于注解的声明式事务

# 使用方式

在 `Spring Boot` 中，当我们使用了 `spring-boot-starter-jdbc` 或 `spring-boot-starter-data-jpa` 依赖的时候，框架会自动注入 `DataSourceTransactionManager` 或 `JpaTransactionManager`，使用时只需要在函数上增加 `@Transactional` 注解。

`@Transactional` 可以注解在接口 `interface`、接口方法 `interface method`、类 `class`、类方法 `class method`。

当注解在类 `class` 时，该类所有 `public` 方法将都具有该类型的事务属性，也可以在方法上注解来覆盖类级别的事务注解。

通常在 `Service` 层和 `Controller` 层使用。

举个栗子，在 `Controller` 层增加事务：

```java
@Autowired
private UserService userService;

@ApiOperation(value = "根据Id删除用户")
@ApiImplicitParam(name = "id", value = "用户Id", required = true, dataType = "Integer")
@DeleteMapping("/{id}")
@ResponseBody
@Transactional
public JsonBean<User> deleteUser(@PathVariable final Integer id) {
    try {
        this.userService.deleteById(id);
        return new JsonBean(SUCCESS, null);
    } catch (ErrorCodeException e) {
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        return new JsonBean(e.getErrorCode());
    }
}
```

声明式事务管理，默认回滚 `unchecked` 异常，即默认对 `RuntimeException` 异常或是其子类进行事务回滚。
`checked` 异常，即可以通过 `catch` 捕获的异常不会回滚。

如果希望捕获异常后，进行回滚：

```java
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```

也可以通过设置回滚点，回滚到某一状态：

```java
Object savePoint = TransactionAspectSupport.currentTransactionStatus().createSavepoint();
...
TransactionAspectSupport.currentTransactionStatus().rollbackToSavepoint(savePoint);
```

# 常用属性

**readOnly**
设置当前事务是否为只读事务：`true` 只读，`false` 可读写，默认 `false`。

`@Transactional(readOnly = true)`

**rollbackFor**
设置需要进行回滚的异常类数组，当方法中抛出指定异常数组中的异常时，则进行事务回滚。

指定单一异常类：`@Transactional(rollbackFor = RuntimeException.class)`
指定多个异常类：`@Transactional(rollbackFor = {RuntimeException.class, Exception.class})`

**rollbackForClassName**
设置需要进行回滚的异常类名称数组，当方法中抛出指定异常名称数组中的异常时，则进行事务回滚。

指定单一异常类名称：`@Transactional(rollbackForClassName = "RuntimeException")`
指定多个异常类名称：`@Transactional(rollbackForClassName = {"RuntimeException", "Exception"})`

**noRollbackFor**
设置不需要进行回滚的异常类数组，当方法中抛出指定异常数组中的异常时，不进行事务回滚。

指定单一异常类：`@Transactional(noRollbackFor = RuntimeException.class)`
指定多个异常类：`@Transactional(noRollbackFor = {RuntimeException.class, Exception.class})`

**noRollbackForClassName**
设置不需要进行回滚的异常类名称数组，当方法中抛出指定异常名称数组中的异常时，不进行事务回滚。

指定单一异常类名称：`@Transactional(noRollbackForClassName = "RuntimeException")`
指定多个异常类名称：`@Transactional(noRollbackForClassName = {"RuntimeException", "Exception"})`

**propagation**
设置事务的传播行为。（如果在开始当前事务之前，一个事务上下文已经存在，此时有若干选项可以指定一个事务性方法的执行行为）

`REQUIRED`：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
`SUPPORTS`：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
`MANDATORY`：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
`REQUIRES_NEW`：创建一个新的事务，如果当前存在事务，则把当前事务挂起。
`NOT_SUPPORTED`：以非事务方式运行，如果当前存在事务，则把当前事务挂起。
`NEVER`：以非事务方式运行，如果当前存在事务，则抛出异常。
`NESTED`：如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于 `REQUIRED`。

`@Transactional(propagation = Propagation.REQUIRED)`

**isolation**
设置底层数据库的事务隔离级别，事务隔离级别用于处理多事务并发的情况。

`DEFAULT`：默认值，表示使用底层数据库的默认隔离级别。对大部分数据库而言，通常这值就是：`READ_COMMITTED`。
`READ_UNCOMMITTED`：表示一个事务可以读取另一个事务修改但还没有提交的数据。（不能防止脏读和不可重复读）
`READ_COMMITTED`：表示一个事务只能读取另一个事务已经提交的数据。（可以防止脏读）
`REPEATABLE_READ`：表示一个事务在整个过程中可以多次重复执行某个查询，并且每次返回的记录都相同。即使在多次查询之间有新增的数据满足该查询，这些新增的记录也会被忽略。（可以防止脏读和不可重复读）
`SERIALIZABLE`：所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰。通常情况下不会使用，因为这将严重影响程序的性能。（可以防止脏读、不可重复读以及幻读）

`@Transactional(isolation = Isolation.DEFAULT)`

**timeout**
设置事务的超时秒数，默认为 -1 表示永不超时。

一个事务所允许执行的最长时间，如果超过该时间限制但事务还没有完成，则自动回滚事务。
默认设置为底层事务系统的超时值，如果底层数据库事务系统没有设置超时值，那么就是 `none`，没有超时限制。
