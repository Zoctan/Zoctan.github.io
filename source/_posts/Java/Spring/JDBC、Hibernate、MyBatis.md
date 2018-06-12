---
title: JDBC、Hibernate、MyBatis
date: 2018-3-19
category: 学习
tags:
  - MyBatis
---

# JDBC 简介

JDBC：Java Data Base Connectivity（Java数据库连接）

它是用于 Java 和数据库之间的数据库无关连接的标准 Java API。
即：JDBC 是用于在 Java 中与数据库连接的 API。

JDBC 库包括通常与数据库使用相关，如：

- 连接到数据库
- 创建 SQL 语句
- 在数据库中执行 SQL 查询
- 查看和修改结果记录

从根本上说，JDBC 是一个规范，它提供了一整套接口，允许以一种可移植的访问底层数据库 API。 

Java 可以用它来编写不同类型的可执行文件，如：

- Java 应用程序
- Java Applet
- Java Servlets
- Java ServerPages(JSP)
- 企业级 JavaBeans(EJB)

所有这些不同的可执行文件都能够使用 JDBC 驱动程序来访问数据库，并用于存储数据到数据库中。

JDBC 提供与 ODBC 相同的功能，允许 Java 程序包含与数据库无关的代码（同样的代码，只需要指定使用的数据库类型，不需要重修改数据库查询或操作代码）。

[参考资料](https://www.cnblogs.com/erbing/p/5805727.html)

# Hibernate 简介

Hibernate 是一个开源的对象关系映射框架，它对 JDBC 进行非常轻量级的对象封装，所以可以应用在任何使用 JDBC 的场合，使得程序员可以在此基础上使得由原来直接操纵数据库变成直接操作映射数据表后生成的 Java 类，从而用对象编程思维来操纵数据库。

Hibernate 对数据库结构提供了较为完整的封装，Hibernate 的 O/R Mapping 实现了 POJO 和数据库表之间的映射和 SQL 的自动生成、执行。

所以程序员不需要对 SQL 的熟练掌握，只需定义好 POJOs（Plain Old Java Objects，普通 Java 对象） 到数据库表的映射关系，即可通过 Hibernate 提供的方法完成持久层操作，Hibernate/OJB 会根据制定的存储逻辑，自动生成对应的 SQL 并调用 JDBC 接口加以执行。

[参考资料](http://hibernate.org/orm/documentation/5.2/)

# MyBatis 简介

MyBatis 同样是一个开源的对象关系映射框架，它支持定制化 SQL、存储过程以及高级映射。避免了 JDBC 代码和手动设置参数以及获取结果集。可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs 映射成数据库中的记录。

[参考资料](http://www.mybatis.org/mybatis-3/zh/index.html)

# 各自优缺点

## JDBC

大致编程步骤：
1. 连接数据库，注册驱动和数据库信息。
2. 操作 Connection，打开 Statement 对象。
3. 通过 Statement 对象执行 SQL，返回结果到 ResultSet 对象。
4. 使用 ResultSet 读取数据，然后通过代码转化为具体的 POJO 对象。
5. 关闭数据库相关的资源。

缺点：
1. 工作量大，需要连接，然后处理 JDBC 底层事务，处理数据类型。
2. 需要操作 Connection、Statement、ResultSet 对象去拿数据并关闭它们。
3. 要对 JDBC 可能产生的异常进行捕捉处理并正确关闭资源。

由于 JDBC 存在的缺陷，实际工作中很少直接使用 JDBC，用的更多的是 ORM 对象关系模型来操作数据库，比如 Hibernate 和 Mybatis。

## Hibernate

Hibernate 是建立在若干 POJO 通过 xml 映射文件（或注解）提供的规则映射到数据库表上的。

我们可以通过 POJO 直接操作数据库的数据，它提供的是一种全表映射的模型。Hibernate 对 JDBC 的封装程度还是比较高的，我们已经不需要写 SQL，只要使用 HQL 语言就可以了。

优点：
1. 消除了代码的映射规则，把这些规则都分离到了 xml 或注解。
2. 不用再管理数据库连接，它也配置到 xml 里面了。
3. 一个会话中不需要操作多个对象，只需要操作 Session 对象。
4. 关闭资源只需要关闭一个 Session 即可。
5. 大大提高了编程的简易性和可读性。

Hibernate 还提供了级联，缓存，映射，一对多等功能。
Hibernate 是全表映射，通过 HQL 去操作 POJO 进而操作数据库的数据。

缺点：
1. 全表映射带来的不便。比如，更新时需要发送所有的字段。
2. 无法根据不同的条件组装不同的 SQL。
3. 对多表关联和复杂的 SQL 查询支持较差，需要自己写 SQL，返回后，需要自己将数据封装为 POJO。
4. 不能有效的支持存储过程。
5. 虽然有 HQL，但是性能较差，大型互联网系统往往需要优化 SQL，而 Hibernate 做不到。

## Mybatis

为了解决 Hibernate 的不足，Mybatis 出现了，Mybatis 是半自动的框架。之所以称它为半自动，是因为它需要手工匹配提供 POJO，SQL 和映射关系，而全表映射的 Hibernate 只需要提供 POJO 和映射关系即可。

Mybatis 需要提供的映射文件包含了三个部分：SQL，映射规则，POJO。

在 Mybatis 里需要自己编写 SQL，虽然比 Hibernate 配置多，但是 Mybatis 可以配置动态 SQL，解决了 Hibernate 表名根据时间变化，不同条件下列不一样的问题，同时也可以对 SQL 进行优化，通过配置决定你的 SQL 映射规则，也能支持存储过程，所以对于一些复杂和需要优化性能的 SQL 查询它就更加方便。

# 什么时候使用 Hibernate/Mybatis

Hibernate 作为 Java ORM 框架，编程简易，同时无需编写sql确实开发效率优于Mybatis。
此外 Hibernate 还提供了缓存，日志，级联等强大的功能。

但是 Hibernate 的缺陷也是十分明显，多表关联复杂 SQL，数据系统权限限制，根据条件变化的 SQL，存储过程等场景使用 Hibernate 十分不方便，而性能又难以通过 SQL 优化，所以注定了 Hibernate 只适用于在场景不太复杂，要求性能不太苛刻的时候使用。

如果你需要一个灵活的，可以动态生成映射关系的框架，那么 Mybatis 确实是一个最好的选择。它几乎可以替代 JDBC，拥有动态列，动态表名，存储过程支持，同时提供了简易的缓存，日志，级联。但是它的缺陷是需要你提供映射规则和 SQL，所以开发工作量比 Hibernate 要大些。

# 区别

**层次**
JDBC 是较底层的持久层操作方式，而 Hibernate 和 MyBatis 都是在 JDBC 的基础上进行了封装使其更加方便程序员对持久层的操作。

**功能**
JDBC 就是简单的建立数据库连接，然后创建 Statement，将 SQL 语句传给 Statement 去执行，如果是有返回结果的查询语句，会将查询结果放到 ResultSet 对象中，通过对 ResultSet 对象的遍历操作来获取数据。

Hibernate 是将数据库中的数据表映射为持久层的 Java 对象，对 SQL 语句进行修改和优化比较困难。

MyBatis 是将 SQL 语句中的输入参数和输出参数映射为 Java 对象，SQL 修改和优化比较方便。

**使用**
如果进行底层编程，而且对性能要求极高的话，应该采用 JDBC 的方式。

如果要对数据库进行完整性控制的话建议使用 Hibernate。

如果要灵活使用 SQL 语句的话建议采用 MyBatis 框架。