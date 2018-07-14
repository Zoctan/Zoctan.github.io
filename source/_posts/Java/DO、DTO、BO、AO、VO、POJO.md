---
title: DO、DTO、BO、AO、VO、POJO
date: 2018-07-14
category: Java
---

# 前记

最近写项目，凡是不属于数据表对应对象的字段的，但又是连表查询出来的，我都加在了 DO 里（贪方便），然后字段越来越多，实在不妥，然后就去了解标题的那些模型。网上大部分都是只讲概念，虽然也能看懂，但是没有例子实在不好，所以这里会写概念 + 栗子。

# DO、DTO、BO、AO、VO、POJO

分层领域模型规约：

DO（Data Object）：与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。
DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。
BO（Business Object）：业务对象。由 Service 层输出的封装业务逻辑的对象。
AO（Application Object）：应用对象。在 Web 层与 Service 层之间抽象的复用对象模型，极为贴近展示层，复用度不高。
VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。
Query：数据查询对象，各层接收上层的查询请求。（注意超过2个参数的查询封装，禁止使用 Map 类来传输）。
POJO（Plain Ordinary Java Object）：POJO 专指只有 setter/getter/toString 的简单类，包括 DO/DTO/BO/VO 等。

领域模型命名规约：

数据对象：xxxDO，xxx 即为数据表名。
数据传输对象：xxxDTO，xxx 为业务领域相关的名称。
展示对象：xxxVO，xxx 一般为网页名称。
POJO 是 DO/DTO/BO/VO 的统称，禁止命名成 xxxPOJO。

# 为什么不能只用 DO

假如我们的项目中有一个 UserDO 实体，对应数据表 user：

```java
public class UserDO {
    private Integer id;              // 唯一主键
    private Date createdTime;        // 创建时间
    private Date updatedTime;        // 最后更新时间
    private String name;             // 姓名
    private Integer age;             // 年龄
    private String gender;           // 性别
    private String address;          // 住址
    private String password;         // 密码
    private String nickName;         // 昵称
    private Date birthday;           // 生日
    private String politicalStatus;  // 政治面貌,1表示群众,2表示团员,3表示党员,4表示其他,100表示未知
    private Integer companyId;       // 公司的ID
    private Integer status;          // 数据状态,1表示可用,0表示不可用
 
    // setter and getter
}
```

然后从 DAO 一直到前端展示，我们都通过这个 UserDO 类的对象来进行数据传输。这样做会有什么问题？

**不需要的字段也会传递到前端页面**
如 password、createdTime、updatedTime 和status 这几个字段我们可能在前端根本不需要展示，但是这些字段有可能也会被传递到前端（除非我们在 SQL 查询的时候没有查询出对应的字段）。这不仅使数据的传输量增大，还可能有安全性问题。

**某些字段需要转换，但是无法支持**
对于上面例子中的政治面貌字段，我们在数据库中存储的是数字，但是在前端页面我要展示的是中文描述。这种情况只能让前端通过 if/else 的方式来分情况展示。

**某些字段要展示，但是并不希望出现在数据库中**
在 user 表中我们只保存了用户的 companyId，如果我们想让前端展示公司名等不属于 user 表的字段，怎么办？如果只用 UserDo 的话，我们只能在 UserDO 中加多一个 Company 类型的 company 属性，通过这个属性来传递。很明显这样的 DO 已经被污染了。

还有很多问题，这这里就不详细介绍了。

可见，从头用到尾只使用 DO 是不好的。

