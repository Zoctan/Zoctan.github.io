---
title: Spring、SpringBoot
date: 2018-3-19
category: 学习
tags:
  - Spring
---

# Spring

[Spring 框架简介](https://www.ibm.com/developerworks/cn/java/wa-spring1/)

## 简介

Spring 是一个为了解决企业应用程序开发复杂性而创建的开源框架。它的主要优势之一就是分层架构，允许你选择使用哪一个组件，同时为 J2EE 应用程序开发提供集成的框架。

Spring 框架是一个分层架构，由 7 个定义良好的模块组成。
Spring 模块构建在核心容器之上，核心容器定义了创建、配置和管理 bean 的方式：

{% asset_img spring_framework.png Spring %}

## 模块

组成 Spring 框架的每个模块（或组件）都可以单独存在，或者与其他一个或多个模块联合实现。

**核心容器**
核心容器提供 Spring 框架的基本功能。
核心容器的主要组件是 BeanFactory，它是工厂模式的实现。
BeanFactory 使用控制反转 （IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。

**Spring 上下文**
Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。
Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

**Spring AOP**
通过配置管理特性，Spring AOP 模块直接将面向方面的编程功能集成到了 Spring 框架中。
所以，可以很容易地使 Spring 框架管理的任何对象支持 AOP。
Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。
通过使用 Spring AOP，不用依赖 EJB 组件，就可以将声明性事务管理集成到应用程序中。

**Spring DAO**
JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。
异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。
Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。

**Spring ORM**
Spring 框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map，所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。

**Spring Web 模块**
Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文，所以 Spring 框架支持与 Jakarta Struts 的集成。
Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。

**Spring MVC 框架**
MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，MVC 容纳了大量视图技术，其中包括 JSP、Velocity、Tiles、iText 和 POI。

Spring 框架的功能可以用在任何 J2EE 服务器中，大多数功能也适用于不受管理的环境。
Spring 的核心要点：支持不绑定到特定 J2EE 服务的可重用业务和数据访问对象，所以这样的对象可以在不同 J2EE 环境 （Web 或 EJB）、独立应用程序、测试环境之间重用。

## IOC

IOC：Inversion of Control（控制反转）

基本概念：不创建对象，但是描述创建它们的方式。在代码中不直接与对象和服务连接，但在配置文件中描述哪一个组件需要哪一项服务。容器 （在 Spring 框架中是 IOC 容器） 负责将这些联系在一起。

## AOP

AOP：Aspect Oriented Programming（面向切面编程）

AOP 是 OOP 的有力补充：OOP 将程序分成各个层次的对象，AOP 将运行过程分解成各个切面。AOP 是从运行程序的角度去考虑程序的结构，提取业务处理过程的切面，OOP 是静态的抽象，AOP 是动态的抽象，是对应用执行过程的步骤进行抽象，从而获得步骤之间的逻辑划分。

AOP 和 IOC 是补充性的技术，它们都运用模块化方式解决企业应用程序开发中的复杂问题。
在典型的 OOP 开发方式中，可能要将日志记录语句放在所有方法和 Java 类中才能实现日志功能。
在 AOP 方式中，可以反过来将日志服务模块化，并以声明的方式将它们应用到需要日志的组件上。当然，优势就是 Java 类不需要知道日志服务的存在，也不需要考虑相关的代码。所以，用 Spring AOP 编写的应用程序代码是松散耦合的。

AOP 的功能完全集成到了 Spring 事务管理、日志和其他各种特性的上下文中。

## 优点

1. 使用 Spring 的 IOC 容器，将对象之间的依赖关系交给 Spring，降低组件之间的耦合性，让我们更专注于应用逻辑。

2. 可以提供众多服务，事务管理，WS 等。

3. AOP 的很好支持，方便面向切面编程。

4. 对主流的框架提供了很好的集成支持，如 Hibernate,Struts2,JPA 等

5. Spring 低侵入，代码污染极低。

6. Spring 的高度可开放性，并不强制依赖于 Spring，开发者可以自由选择 Spring 部分或全部

# Spring Boot

Spring Boot 实现了自动配置，降低了项目搭建的复杂度。

Spring 框架需要进行大量的配置，Spring Boot 引入自动配置的概念，让项目设置变得很容易。
Spring Boot 本身并不提供 Spring 框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于 Spring 框架的应用程序。也就是说，它并不是用来替代 Spring 的解决方案，而是和 Spring 框架紧密结合用于提升 Spring 开发者体验的工具。

同时它集成了大量常用的第三方库配置(例如Jackson, JDBC, Mongo, Redis, Mail等等)，Spring Boot 应用中这些第三方库几乎可以零配置的开箱即用(out-of-the-box)，大部分的 Spring Boot 应用都只需要非常少量的配置代码，开发者能够更加专注于业务逻辑。

Spring Boot 只是承载者，辅助你简化项目搭建过程的。如果承载的是 WEB 项目，使用 Spring MVC 作为 MVC 框架，那么工作流程和你上面描述的是完全一样的，因为这部分工作是 Spring MVC 做的而不是 Spring Boot。

对使用者来说，换用 Spring Boot 以后，项目初始化方法变了，配置文件变了，另外就是不需要单独安装 Tomcat 这类容器服务器了，maven 打出 jar 包直接跑起来就是个网站，但你最核心的业务逻辑实现与业务流程实现没有任何变化。

所以，用最简练的语言概括就是：

Spring 是一个“引擎”；

Spring MVC 是基于 Spring 的一个 MVC 框架 ；

Spring Boot 是基于 Spring4 的条件注册的一套快速开发整合包。
