---
title: MyBatis 注意点
date: 2018-07-01
category: Java
tags:
  - MyBatis
---

# #{ } 和 ${ } 的区别

**#{ }**

表示一个占位符号，通过 `#{ }` 可以在 preparedStatement 实现向占位符中设置值，自动进行 Java 类型和 Jdbc 类型转换，可以有效防止 SQL 注入。

可以让 `#{ }` 接收简单类型值或 POJO 属性值（通过 OGNL 读取对象中的值，属性.属性.属性..方式获取对象属性值）。如果在 parameterType 传输单个简单类型值，`#{ }` 括号中可以是 value 或其它名称。

比如：

```sql
INSERT INTO user(name, years)
VALUES(#{user.name, jdbcType=STRING}, #{user.sex, jdbcType=INTEGER})
```

在解析时会加上" ",当成字符串来解析：

```sql
INSERT INTO user(name, years)
VALUES("myname", 20)
```

**${ }**

表示拼接 SQL 语句，通过 `${ }` 可以将 parameterType 传入的内容拼接在 SQL 中。如果 parameterType 传输单个简单类型值，`${ }` 括号中只能是 value。

比如：

```sql
INSERT INTO user(name, years)
VALUES(${user.name, jdbcType=STRING}, ${user.sex, jdbcType=INTEGER})
```

会解析成：

```sql
INSERT INTO user(name, years)
VALUES(user.name, user.sex)
```

# parameterType 和 resultType 区别

parameterType：指定输入参数类型，mybatis 通过 ognl 从输入对象中获取参数值拼接在 SQL 中。

resultType：指定输出结果类型，mybatis 将 SQL 查询结果的一行记录数据映射为 resultType 指定类型的对象。

# selectOne 和 selectList 区别

selectOne 对查询出的一条记录进行映射，如果查询出多条记录则抛出异常： `org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to bereturned by selectOne(), but found: 3`

selectList 可以查询一条或多条记录来进行映射。

