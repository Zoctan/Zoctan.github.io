---
title: MySQL 各种连接
date: 2018-10-31
category: 数据库
---

# 准备工作

MySQL 版本：10.1.29-MariaDB-6+b1

建表 SQL：

```sql
CREATE TABLE `a_table` (
  `a_id` int(11) DEFAULT NULL,
  `a_name` varchar(10) DEFAULT NULL,
  `a_part` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `b_table` (
  `b_id` int(11) DEFAULT NULL,
  `b_name` varchar(10) DEFAULT NULL,
  `b_part` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

测试数据 SQL：

```sql
INSERT INTO `a_table` VALUES (1, 'A', '总裁部'), (2, 'B', '秘书部'), (3, 'C', '设计部'), (4, 'D', '运营部');

INSERT INTO `b_table` VALUES (2, 'B', '秘书部'), (3, 'C', '设计部'), (5, 'E', '人事部'), (6, 'F', '生产部');
```

表数据：

```sql
MariaDB [test]> SELECT * FROM a_table;
+------+--------+--------+
| a_id | a_name | a_part |
+------+--------+--------+
|    1 | A      | 总裁部  |
|    2 | B      | 秘书部  |
|    3 | C      | 设计部  |
|    4 | D      | 运营部  |
+------+--------+--------+
MariaDB [test]> SELECT * FROM b_table;
+------+--------+--------+
| b_id | b_name | b_part |
+------+--------+--------+
|    2 | B      | 秘书部  |
|    3 | C      | 设计部  |
|    5 | E      | 人事部  |
|    6 | F      | 生产部  |
+------+--------+--------+
```

# 内连接

关键字：inner join on

语句：

```sql
SELECT * FROM a_table a
INNER JOIN b_table b ON a.a_id = b.b_id;
```

```sql
+------+--------+--------+------+-------+---------+
| a_id | a_name | a_part | b_id | b_name | b_part |
+------+--------+--------+------+-------+---------+
|  2   |    B   | 秘书部  |  2   |   B   | 秘书部   |
|  3   |    C   | 设计部  |  3   |   C   | 设计部   |
+------+--------+--------+------+-------+---------+
```

![内连接](内连接.png)

说明：组合两个表中的记录，返回关联字段相符的记录，也就是返回两个表的交集（阴影）部分。

# 左（外）连接

关键字：LEFT JOIN ON / LEFT OUTER JOIN ON

语句：

```sql
SELECT * FROM a_table a
LEFT JOIN b_table b ON a.a_id = b.b_id;
```

```sql
+------+--------+--------+------+--------+--------+
| a_id | a_name | a_part | b_id | b_name | b_part |
+------+--------+--------+------+--------+--------+
|  2   |    B   | 秘书部  |  2   |   B    | 秘书部  |
|  3   |    C   | 设计部  |  3   |   C    | 设计部  |
|  1   |    A   | 总裁部  | NULL | NULL   | NULL   |
|  4   |    D   | 运营部  | NULL | NULL   | NULL   |
+------+--------+--------+------+--------+--------+
```

![左连接](左连接.png)

说明：左（外）连接，左表（a_table）的记录将会全部表示出来，而右表（b_table）只会显示符合搜索条件的记录。右表记录不足的地方均为 NULL。

# 右（外）连接

关键字：RIGHT JOIN ON / RIGHT OUTER JOIN ON

语句：

```sql
SELECT * FROM a_table a
RIGHT JOIN b_table b ON a.a_id = b.b_id;
```

```sql
+------+--------+--------+------+--------+--------+
| a_id | a_name | a_part | b_id | b_name | b_part |
+------+--------+--------+------+--------+--------+
|  2   |   B    | 秘书部  |  2   |   B    | 秘书部  |
|  3   |   C    | 设计部  |  3   |   C    | 设计部  |
| NULL |  NULL  |  NULL  |  5   |   E    | 人事部  |
| NULL |  NULL  |  NULL  |  6   |   F    | 生产部  |
+------+--------+--------+------+--------+--------+
```

![右连接](右连接.png)

说明：与左（外）连接相反，右（外）连接，左表（a_table）只会显示符合搜索条件的记录，而右表（b_table）的记录将会全部表示出来。左表记录不足的地方均为 NULL。

# 全（外）连接

MySQL 目前不支持此种方式，可以用其他方式替代解决。

# 如何执行关联查询

MySQL 认为任何一个查询都是一次“关联”，并不仅仅是一个查询需要到两个表匹配才叫关联，所以在 MySQL 中，每一个查询，每一个片段（包括子查询，甚至基于单表查询）都可以是一次关联。

当前 MySQL 关联执行的策略很简单：
MySQL 对任何关联都执行嵌套循环关联操作，即 MySQL 先在一个表中循环取出单条数据，然后在嵌套循环到下一个表中寻找匹配的行，依次下去，直到找到所有表中匹配的行为止。然后根据各个表匹配的行，返回查询中需要的各个列。

例子：

查询语句：

```sql
SELECT tbl1.col1, tbl2.col2 FROM tbl1 INNER JOIN tbl2 USING(col3) WHERE tbl1.col1 IN (5, 6);
```

假设 MySQL 按照查询中的表顺序进行关联操作，我们则可以用下面的伪代码表示 MySQL 将如何完成这个查询：

```
outer_iter = iterator over tbl1 where col1 in (5, 6)
outer_row = outer_iter.next
while outer_row
    inner_iter = iterator over tbl2 where col3 = outer_row.col3
    inner_row = inner_iter.next
    while inner_row
        output [ outer_row.col1, inner_row.col2]
        inner_row = inner_iter.next
    end
    outer_row = outer_iter.next
end
```

上面的执行计划对于单表查询和多表关联查询都适用，如果是一个单表查询，那么只需要上面外层的基本操作。对于外连接，上面的执行过程仍然适用。例如，我们将上面的查询语句修改如下：

```sql
SELECT tbl1.col1, tbl2.col2 FROM tbl1 LEFT OUTER JOIN tbl2 USING(col3) WHERE tbl1.col1 IN (5, 6);
```

那么，对应的伪代码如下：

```
outer_iter = iterator over tbl1 where col1 in (5, 6)
outer_row = outer_iter.next
while outer_row
    inner_iter = iterator over tbl2 where col3 = outer_row.col3
    inner_row = inner_iter.next
    if inner_row
        while inner_row
            output [ outer_row.col1, inner_row.col2]
            inner_row = inner_iter.next
        end
    else
        output [ outer_row.col1, null]
    end
        outer_row = outer_iter.next
end
```
