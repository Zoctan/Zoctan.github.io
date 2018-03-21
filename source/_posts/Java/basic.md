---
title: Java基础概念
date: 2017-12-26
category: 学习
tags:
  - Java
---

# Java虚拟机（JVM）

Java 源码，经过编译器编译后生成 .class 字节码文件

{% asset_img java_compile.png 编译 %}

JVM 将字节码文件翻译成特定平台下的机器码然后运行

{% asset_img class_translate.png 字节码翻译 %}

注：编译的结果是生成字节码，字节码不能直接运行，必须通过 JVM 翻译成机器码才能运行。不同平台下编译生成的字节码是一样的，但是由 JVM 翻译成的机器码却不一样。

注：跨平台的是 Java 程序，不是 JVM 。JVM是用C/C++开发的，不能跨平台，不同平台下需要安装不同版本的 JVM。

相关书籍：《深入理解 Java 虚拟机》

# J2SE、J2EE和J2ME

J2SE(Java 2 Platform Standard Edition) 标准版
J2SE 是 Java 的标准版，主要用于开发客户端（桌面应用软件），如：常用的文本编辑器、下载软件、即时通讯工具等。

J2SE 包含了 Java 的核心类库，如数据库连接、接口定义、输入/输出、网络编程等。

J2EE(Java 2 Platform Enterprise Edition) 企业版
J2EE 是功能最丰富的一个版本，主要用于开发高访问量、大数据量、高并发量的网站，如：美团、去哪儿网的后台。通常所说的 JSP 开发就是 J2EE 的一部分。

J2EE 包含 J2SE 中的类，还包含用于开发企业级应用的类，如EJB、servlet、JSP、XML、事务控制等。

J2EE 也可以用来开发技术比较庞杂的管理软件，例如ERP系统（Enterprise Resource Planning，企业资源计划系统）。

J2ME(Java 2 Platform Micro Edition) 微型版
J2ME 只包含 J2SE 中的一部分类，受平台影响比较大，主要用于嵌入式系统和移动平台的开发，如呼机、智能卡、手机（功能机）、机顶盒等。

在智能手机还没有进入公众视野的时候，你是否还记得你的摩托罗拉、诺基亚手机上有很多Java小游戏吗？这就是用J2ME开发的。

Java 的初衷就是做这一块的开发。

注意：Android手机有自己的开发组件，不使用 J2ME 进行开发。

Java5.0版本后，J2SE、J2EE、J2ME分别更名为Java SE、Java EE、Java ME，由于习惯的原因，我们依然称之为J2SE、J2EE、J2ME。

# JRE和JDK

JRE（Java Runtime Environment）：Java 运行时环境，包含了 Java 虚拟机，Java 基础类库。是使用 Java 语言编写的程序运行所需要的软件环境，是提供给想运行Java程序的用户使用的。如果需要运行 Java 程序，只需安装JRE就可以了。

JRE 根据不同操作系统（如：Windows，Linux等）和不同 JRE 提供商（IBM,ORACLE等）有很多版本，最常用的是 Oracle 公司收购 SUN 公司的 JRE 版本。

JDK（Java Development Kit）：Java 开发工具包，是程序员使用 Java 语言编写 Java 程序所需的开发工具包，是提供给程序员使用的。JDK 包含了 JRE，同时还包含了编译 Java 源码的编译器 Javac，还包含了很多 Java 程序调试和分析的工具：Jconsole，Jvisualvm 等工具软件，还包含了Java程序编写所需的文档和 Demo 例子程序。如果需要编写 Java 程序，即需要安装 JDK。

# 语法基础

Java 是一种强类型的语言，声明变量时必须指明数据类型。变量(variable)的值占据一定的内存空间。不同类型的变量占据不同的大小。

语法比较简单，重点说下：StringBuffer 与 StringBuider。

String 的值是不可变的，每次对 String 的操作都会生成新的 String 对象，不仅效率低，而且耗费大量内存空间。

## StringBuffer

StringBuffer 类和 String 类一样，也用来表示字符串，但是 StringBuffer 的内部实现方式和 String 不同，在进行字符串处理时，不生成新的对象，在内存使用上要优于 String。

StringBuffer 默认分配 16 字节长度的缓冲区，当字符串超过该大小时，会自动增加缓冲区长度，而不是生成新的对象。

StringBuffer 不像 String，只能通过 new 来创建对象。

```java
// 分配16个字节长度的缓冲区
StringBuffer str1 = new StringBuffer();

// 分配512个字节长度的缓冲区
StringBuffer str2 = new StringBuffer(512);

// 在缓冲区中存放了字符串，并在后面预留了16个字节长度的空缓冲区
StringBuffer str3 = new StringBuffer("www.xx.com");
```

### 主要方法

StringBuffer类中的方法主要偏重于对于字符串的操作，例如追加、插入和删除等，这个也是StringBuffer类和String类的主要区别。实际开发中，如果需要对一个字符串进行频繁的修改，建议使用 StringBuffer。

append()：向当前字符串的末尾追加内容，类似于字符串的连接。调用该方法以后，StringBuffer 对象的内容也发生改变。

```java
StringBuffer str = new StringBuffer(“biancheng100”);
str.append(true);
/*
对象 str 的值将变成 “biancheng100true”
注意是 str 指向的内容变了，不是 str 的指向变了

字符串的 ”+“ 操作实际上也是先创建一个 StringBuffer 对象，
然后调用 append() 方法将字符串片段拼接起来，最后调用 toString() 方法转换为字符串

这样看来，String 的连接操作就比 StringBuffer 多出了一些附加操作，效率上必然会打折扣

但是，对于长度较小的字符串，“+” 操作更加直观，更具可读性，有些时候可以稍微牺牲一下效率
*/
```

deleteCharAt()：删除指定位置的字符，并将剩余的字符形成新的字符串。

```java
StringBuffer str = new StringBuffer("abcdef");
str. deleteCharAt(3);
// 删除索引值为3的字符，即”d“字符
```

delete()：方法一次性删除多个字符。

```java
StringBuffer str = new StringBuffer("abcdef");
str.delete(1, 4);
// 删除索引值为 1~4 之间的字符，包括索引值 1，但不包括 4
```

insert()：在指定位置插入字符串，可以认为是 append() 的升级版。

```java
StringBuffer str = new StringBuffer("abcdef");
str.insert(3, "xyz");
// 最后 str 所指向的字符串为 abcdxyzef
```

setCharAt()：修改指定位置的字符。

```java
StringBuffer str = new StringBuffer("abcdef");
str.setCharAt(3, 'z');
// 把索引值为3的字符修改为 z，最后 str 所指向的字符串为 abczef
```

## StringBuilder

StringBuilder 和 StringBuffer 主要区别在于 StringBuffer 类的方法是多线程安全的，而 StringBuilder 不是线程安全的，相比而言，StringBuilder 类会略微快一点。

StringBuffer、StringBuilder、String 中都实现了 CharSequence 接口。

CharSequence 是一个定义字符串操作的接口，它只包括 length()、charAt(int index)、subSequence(int start, int end) 这几个API。

StringBuffer、StringBuilder、String 对 CharSequence 接口的实现过程不一样，如下图所示：

{% asset_img charsequence.png 对CharSequence接口的实现 %}

String 直接实现了 CharSequence 接口；
StringBuilder 和 StringBuffer 都是可变的字符序列，它们都继承于AbstractStringBuilder，实现了 CharSequence 接口。

# 面向对象编程(Object Oriented Programming, OOP)

Java 中的类可以看做 C 语言中结构体的升级版。
结构体是一种构造数据类型，可以包含不同的成员（变量），每个成员的数据类型可以不一样；可以通过结构体来定义结构体变量，每个变量拥有相同的性质。

```c 结构体
#include <stdio.h>
int main() {
    struct Student {
        // 结构体包含的变量
        char *name;
        int age;
        float score;
    };
    // 通过结构体来定义变量
    struct Student stu1;
    // 操作结构体的成员
    stu1.name = "小明";
    stu1.age = 15;
    stu1.score = 92.5;

    printf("%s的年龄是 %d，成绩是 %f\n", stu1.name, stu1.age, stu1.score);
    return 0;
}

运行：
小明的年龄是 15，成绩是 92.500000
```

Java 中的类也是一种构造数据类型，但是进行了一些扩展，类的成员不但可以是变量，还可以是函数；通过类定义出来的变量也有特定的称呼，叫做“对象”。

```java 类
public class Demo {
    public static void main(String[] args) {
        class Student {  // 通过class关键字类定义类
            // 类包含的变量
            String name;
            int age;
            float score;
            // 类包含的函数
            void say() {
                System.out.println( name + "的年龄是 " + age + "，成绩是 " + score );
            }
        }
        // 通过类来定义变量，即创建对象
        Student stu1 = new Student();  // 必须使用new关键字
        // 操作类的成员
        stu1.name = "小明";
        stu1.age = 15;
        stu1.score = 92.5f;
        stu1.say();
    }
}

运行：
小明的年龄是 15，成绩是 92.5
```

在 C 语言中，通过结构体名称就可以完成结构体变量的定义，并分配内存空间；
但在 Java 中，仅仅通过类来定义变量不会分配内存空间，必须使用 new 关键字来完成内存空间的分配。

类的变量：属性（通常也称成员变量），函数：方法。它们统称为类的成员。

类可以比喻成图纸，对象比喻成产品，图纸说明了产品的参数及其承担的任务；一张图纸可以生产出具有相同性质的产品，不同图纸可以生产不同类型的产品。

{% asset_img design.png 图纸 -> 产品 %}

使用 new 关键字，就可以通过类来创建对象，即将图纸生产成产品，这个过程叫做类的实例化，因此也称对象是类的一个实例。

注：类只是一张图纸，起到说明的作用，不占用内存空间；对象才是具体的产品，要有地方来存放，才会占用内存空间。

在 C 语言中，可以将完成某个功能的重复使用的代码块定义为函数，将具有一类功能的函数声明在一个头文件中，不同类型的函数声明在不同的头文件，以便对函数进行更好的管理，方便编写和调用。

{% asset_img c_include.png include %}

在 Java 中，可以将完成某个功能的代码块定义为方法，将具有相似功能的方法定义在一个类中，也就是定义在一个源文件中（因为一个源文件只能包含一个公共的类），多个源文件可以位于一个文件夹，这个文件夹有特定的称呼，叫做包。

{% asset_img java_packet.png packet %}

面向对象编程在软件执行效率上绝对没有任何优势，它的主要目的是方便程序员组织和管理代码，快速梳理编程思路，带来编程思想上的革新。

## 访问修饰符（访问控制符）

修饰符 | 说明
------|------
public | 共有的，对所有类可见。
protected | 受保护的，对同一包内的类和所有子类可见。
private   | 私有的，在同一类内可见。
默认      | 在同一包内可见。默认不使用任何修饰符。

public：类、方法、构造方法和接口能够被任何其他类访问。类的继承性，类所有的公有方法和变量都能被其子类继承。

protected：不能修饰类和接口，方法和成员变量能够声明为protected，但是接口的成员变量和成员方法不能声明为protected。
子类能访问protected修饰符声明的方法和变量，这样就能保护不相关的类使用这些方法和变量。

private：方法、变量和构造方法只能被所属类访问，并且类和接口不能声明为private。
声明为私有访问类型的变量只能通过类中公共的Getter/Setter方法被外部类访问。
主要用来隐藏类的实现细节和保护类的数据。

默认：接口里的变量都隐式声明为public static final，而接口里的方法默认情况下访问权限为public。

方法继承规则：

    父类中声明为public的方法在子类中也必须为public。

    父类中声明为protected的方法在子类中要么声明为protected，要么声明为public。不能声明为private。

    父类中默认修饰符声明的方法，能够在子类中声明为private。

    父类中声明为private的方法，不能够被继承。

## 变量的作用域：类级、对象实例级、方法级、块级。

类级变量/全局级变量/静态变量：需要使用static关键字修饰。类级变量在类定义后就已经存在，占用内存空间，可以通过类名来访问，不需要实例化。

对象实例级变量：成员变量，实例化后才会分配内存空间，才能访问。

方法级变量：在方法内部定义的变量，就是局部变量。

块级变量：定义在一个块内部的变量（指由大括号包围的代码），变量的生存周期就是这个块，出了这个块就消失了，比如 if、for 语句的块。

```java 作用域
public class Demo {
    public static String name = "demo";  // 类级变量
    public int i;  // 对象实例级变量
    // 属性块，在类初始化属性时候运行
    {
        int j = 2;  // 块级变量
    }
    public void test1() {
        int j = 3;  // 方法级变量
        if(j == 3) {
            int k = 5;  // 块级变量
        }
        // 这里不能访问块级变量，块级变量只能在块内部访问
        System.out.println("name=" + name + ", i=" + i + ", j=" + j);
    }
    public static void main(String[] args) {
        // 不创建对象，直接通过类名访问类级变量
        System.out.println(Demo.name);

        // 创建对象并访问它的方法
        Demo t = new Demo();
        t.test1();
    }
}

运行：
demo
name=demo, i=0, j=3
```

## 方法重载(method overloading)

方法重载：同一个类中的多个方法有相同的名称，但它们的参数列表不同。

不同包括：个数、类型和顺序。
- 仅仅参数变量名称不同是不可以的。
- 跟成员方法一样，构造方法也可以重载。
- 声明为 final 的方法不能被重载。
- 声明为 static 的方法不能被重载，但是能够被再次声明。

重载的规则：
- 方法名称必须相同。
- 参数列表必须不同。
- 方法的返回类型可以相同也可以不相同。
- 仅仅返回类型不同不足以成为方法的重载。

重载是面向对象的一个基本特性。

方法签名：方法名称 + 参数列表（顺序和类型）。

注意：方法签名不包括方法的返回类型，返回值和访问修饰符。

常见应用：重载和重写。

```java 方法重载
public class Demo {
    // 一个普通的方法，不带参数
    void test() {
        System.out.println("No parameters");
    }
    // 重载上面的方法，并且带了一个整型参数，且有整型返回值
    int test(int a) {
        System.out.println("a: " + a);
		return a;
    }
    public static void main(String args[]) {
        Demo obj= new Demo();
        obj.test();
        obj.test(2);
    }
}

运行：
No parameters
a: 2
```

重载的实现：方法名称相同时，编译器会根据调用方法的参数个数、参数类型等去逐个匹配，以选择对应的方法；如果匹配失败，编译器会报错，这叫做重载分辨。

## 程序的基本运行顺序

```java 运行顺序
1. public class Demo {
2.    private String name;
3.    private int age;
4.    public Demo() {
5.        name = "demo";
6.        age = 3;
7.    }
8.    public static void main(String[] args) {
9.        Demo obj = new Demo();
10.        System.out.println(obj.name + "的年龄是" + obj.age);
11.    }
12. }
```
顺序：
  1. 先运行到第 8 行，这是程序的入口。
  2. 然后运行到第 9 行，这里要 new 一个Demo，就要调用 Demo 的构造方法。
  3. 就运行到第 4 行，注意：初始化一个类，必须先初始化它的属性。
  4. 因此运行到第 2 行，然后是第 3 行。
  5. 属性初始化完过后，才回到构造方法，执行里面的代码，也就是第 5 行、第 6 行。
  6. 然后是第 9 行，表示 new 一个Demo实例完成。
  7. 然后回到 main 方法中执行第 10 行。
  8. 然后是第 11 行，main方法执行完毕。

总结：程序入口->类属性->构造方法

## 包装类、拆箱和装箱详解

基本数据类型 | 对应的包装类
------------|-----------
byte        | Byte
short       | Short
int         | Integer
long        | Long
char        | Character
float       | Float
double      | Double
boolean     | Boolean

基本类型和对应的包装类相互装换：
- 装箱：由基本类型向对应的包装类转换，如把 int 包装成 Integer 类的对象。
- 拆箱：包装类向对应的基本类型转换，如把 Integer 类的对象重新简化为 int。

```java Java 1.5(5.0) 之前必须手动拆箱装箱
public class Demo {
    public static void main(String[] args) {
        int m = 500;
        Integer obj = new Integer(m);  // 手动装箱
        int n = obj.intValue();  // 手动拆箱
        System.out.println("n = " + n);

        Integer obj1 = new Integer(500);
        System.out.println("obj 等价于 obj1？" + obj.equals(obj1));
    }
}

运行：
n = 500
obj 等价于 obj1？true
```

```java Java 1.5(5.0) 之后系统自动拆箱装箱
public class Demo {
    public static void main(String[] args) {
        int m = 500;
        Integer obj = m;  // 自动装箱
        int n = obj;  // 自动拆箱
        System.out.println("n = " + n);

        Integer obj1 = 500;
        System.out.println("obj 等价于 obj1？" + obj.equals(obj1));
    }
}

运行：
n = 500
obj 等价于 obj1？true
```

## 继承的概念与实现 extends

继承是类与类之间的关系，是一个很简单很直观的概念，与现实世界中的继承（例如儿子继承父亲财产）类似。

继承可以理解为一个类从另一个类获取方法和属性的过程。如果类 B 继承于类 A，那么 B 就拥有 A 的方法和属性。

```java 继承
class People {
    String name;
    int age;
    int height;

    void say() {
        System.out.println("我的名字是 " + name + "，年龄是 " + age + "，身高是 " + height);
    }
}

// 教师属于人类，可以继承最基本的属性
class Teacher extends People {
    String school;  // 所在学校
    String subject;  // 学科
    int seniority;  // 教龄

    // 覆盖 People 类中的 say() 方法
    void say() {
        System.out.println("我叫" + name + "，在" + school + "教" + subject + "，有" + seniority + "年教龄");
    }

    void lecturing() {
        System.out.println("我已经" + age + "岁了，依然站在讲台上讲课");
    }
}
```

注：构造方法不能被继承。 一个类能得到构造方法，只有两个办法：编写构造方法，或者根本没有构造方法，类有一个默认的构造方法。

## super 关键字（用来表示父类）

功能：
- 调用父类中声明为 private 的变量。
- 点取已经覆盖了的方法。
- 作为方法名表示父类构造方法。

```java super
public class Demo {
    public static void main(String[] args) {
        new Dog().move();
    }
}
class Animal {
    private String desc = "动物是人类的好朋友";
    // 必须要声明一个 getter 方法
    public String getDesc() { return desc; }
    public void move() {
        System.out.println("动物可以动");
    }
}
class Dog extends Animal {
    public void move() {
        super.move();  // 调用父类的方法
        System.out.println("狗狗可以走可以跑");
        // 通过 getter 方法调用父类隐藏变量
        System.out.println("请记住：" + super.getDesc());
    }
}

运行：
动物可以动
狗狗可以走可以跑
请记住：动物是人类的好朋友
```

move() 方法也可以定义在某些祖先类中，比如父类的父类，Java 具有追溯性，会一直向上找，直到找到该方法为止。

通过 super 调用父类的隐藏变量，必须要在父类中声明 getter 方法，因为声明为 private 的数据成员对子类是不可见的。

```java 不可见
public class Demo {
    public static void main(String[] args) {
        new Dog("花花", 3).say();
    }
}
class Animal {
    String name;
    public Animal(String name) {
        this.name = name;
    }
}
class Dog extends Animal {
    int age;
    public Dog(String name, int age) {
        super(name);
        this.age = age;
    }
    public void say() {
        System.out.println("我是一只可爱的小狗，我的名字叫" + name + "，我" + age + "岁了");
    }
}

运行：
我是一只可爱的小狗，我的名字叫花花，我3岁了
```

注：
- 在构造方法中调用另一个构造方法，调用动作必须置于最起始的位置。
- 不能在构造方法以外的任何方法内调用构造方法。
- 在一个构造方法内只能调用一个构造方法。

如果编写一个构造方法，既没有调用 super() 也没有调用 this()，编译器会自动插入一个调用到父类构造方法中，而且不带参数。

## 继承中方法的覆盖和重载

```java 覆盖和重载
public class Demo {
    public static void main(String[] args) {
        Dog myDog = new Dog("花花");
        myDog.say();  // 子类的实例调用子类中的方法

        Animal myAnmial = new Animal("贝贝");
        myAnmial.say();  // 父类的实例调用父类中的方法
    }
}
class Animal {
    String name;
    public Animal(String name) {
        this.name = name;
    }
    public void say() {
        System.out.println("我是一只小动物，我的名字叫" + name + "，我会发出叫声");
    }
}
class Dog extends Animal {
    // 构造方法不能被继承，只能通过super()调用
    public Dog(String name) {
        super(name);
    }
    // 覆盖say() 方法
    public void say() {
        System.out.println("我是一只小狗，我的名字叫" + name + "，我会发出汪汪的叫声");
    }
}

运行：
我是一只小狗，我的名字叫花花，我会发出汪汪的叫声
我是一只小动物，我的名字叫贝贝，我会发出叫声
```

覆盖原则：
- 覆盖方法的返回类型、方法名称、参数列表必须与原方法的相同。
- 覆盖方法不能比原方法访问性差（即访问权限不允许缩小）。
- 覆盖方法不能比原方法抛出更多的异常。
- 被覆盖的方法不能是 final 类型，因为 final 修饰的方法是无法覆盖的。
- 被覆盖的方法不能为 private，否则在其子类中只是新定义了一个方法，并没有对其进行覆盖。
- 被覆盖的方法不能为 static。（覆盖是基于运行时动态绑定的，而 static 方法是编译时静态绑定的。static 方法跟类的任何实例都不相关，所以概念上不适用）

覆盖和重载的不同：
- 方法覆盖要求参数列表必须一致，而方法重载要求参数列表必须不一致。
- 方法覆盖要求返回类型必须一致，方法重载对此没有要求。
- 方法覆盖只能用于子类覆盖父类的方法，方法重载用于同一个类中的所有方法（包括从父类中继承而来的方法）。
- 方法覆盖对方法的访问权限和抛出的异常有特殊的要求，而方法重载在这方面没有任何限制。
- 父类的一个方法只能被子类覆盖一次，而一个方法可以在所有的类中可以被重载多次。

## 多态

父类的变量可以引用父类的实例，也可以引用子类的实例。

```java 多态
public class Demo {
    public static void main(String[] args) {
        Animal obj = new Animal();
        obj.cry();
        obj = new Cat();
        obj.cry();
        obj = new Dog();
        obj.cry();
    }
}
class Animal {
    // 动物的叫声
    public void cry(){
        System.out.println("不知道怎么叫");
    }

}
class Cat extends Animal {
    // 猫的叫声
    public void cry() {
        System.out.println("喵喵~");
    }
}
class Dog extends Animal{
    // 狗的叫声
    public void cry() {
        System.out.println("汪汪~");
    }
}

运行：
不知道怎么叫
喵喵~
汪汪~
```

obj 变量的类型为 Animal，它既可以指向 Animal 类的实例，也可以指向 Cat 和 Dog 类的实例。
也就是说，父类的变量可以引用父类的实例，也可以引用子类的实例。注意反过来是错误的，因为所有的猫都是动物，但不是所有的动物都是猫。

obj 既可以是人类，也可以是猫、狗，它有不同的表现形式，这就被称为多态。多态是指一个事物有不同的表现形式或形态。

多态存在的三个必要条件：要有继承、要有重写、父类变量引用子类对象。

当使用多态方式调用方法时：
- 首先检查父类中是否有该方法，如果没有，则编译错误；如果有，则检查子类是否覆盖了该方法。
- 如果子类覆盖了该方法，就调用子类的方法，否则调用父类方法。

```java 多态
public class Demo {
    public static void main(String[] args) {
        // 借助多态，主人可以给很多动物喂食
        Master master = new Master();
        master.feed(new Animal(), new Food());
        master.feed(new Cat(), new Fish());
        master.feed(new Dog(), new Bone());
    }
}
// Animal 类及其子类
class Animal {
    public void eat(Food food) {
        System.out.println("我是一个小动物，正在吃" + f.getFood());
    }
}
class Cat extends Animal {
    public void eat(Food food) {
        System.out.println("我是一只小猫咪，正在吃" + f.getFood());
    }
}
class Dog extends Animal {
    public void eat(Food food) {
        System.out.println("我是一只狗狗，正在吃" + f.getFood());
    }
}
// Food 及其子类
class Food {
    public String getFood() {
        return "事物";
    }
}
class Fish extends Food {
    public String getFood() {
        return "鱼";
    }
}
class Bone extends Food {
    public String getFood() {
        return "骨头";
    }
}
// Master类
class Master {
    public void feed(Animal animal, Food food) {
        animal.eat(food);
    }
}

运行：
我是一个小动物，正在吃事物
我是一只小猫咪，正在吃鱼
我是一只狗狗，正在吃骨头
```

Master 类的 feed 方法有两个参数，分别是 Animal 类型和 Food 类型，因为是父类，所以可以将子类的实例传递给它，这样 Master 类就不需要多个方法来给不同的动物喂食。

## instanceof 运算符（判断一个变量实际引用的对象的类型）

```java 判断对象类型
public final class Demo {
    public static void main(String[] args) {
        // 引用 People 类的实例
        People obj = new People();
        if(obj instanceof Object) {
            System.out.println("我是一个对象");
        }
        if(obj instanceof People) {
            System.out.println("我是人类");
        }
        if(obj instanceof Teacher) {
            System.out.println("我是一名教师");
        }
        if(obj instanceof President) {
            System.out.println("我是校长");
        }
        System.out.println("-----------");  // 分界线

        // 引用 Teacher 类的实例
        obj = new Teacher();
        if(obj instanceof Object) {
            System.out.println("我是一个对象");
        }
        if(obj instanceof People) {
            System.out.println("我是人类");
        }
        if(obj instanceof Teacher) {
            System.out.println("我是一名教师");
        }
        if(obj instanceof President) {
            System.out.println("我是校长");
        }
    }
}
class People { }
class Teacher extends People { }
class President extends Teacher { }

运行：
我是一个对象
我是人类
-----------
我是一个对象
我是人类
我是一名教师
```

## static 关键字及静态变量和静态方法

static 修饰符能够与变量、方法一起使用，表示静态。

静态变量和静态方法能够通过类名来访问，不需要创建一个类的对象来访问该类的静态成员，所以 static 修饰的成员又称作类变量和类方法。

静态变量与实例变量不同，实例变量总是通过对象来访问，因为它们的值在对象和对象之间有所不同。

static 的内存分配
- 静态变量属于类，不属于任何独立的对象，所以无需创建类的实例就可以访问静态变量。
- 编译器只为整个类创建了一个静态变量的副本，也就是只分配一个内存空间，虽然有多个实例，但这些实例共享该内存（类变量）。
- 实例变量则不同，每创建一个对象，都会分配一次内存空间，不同变量的内存相互独立，互不影响。

```java 共享和相互独立
public class Demo {
    static int i;
    int j;
    public static void main(String[] args) {
        Demo a = new Demo();
        a.i = 10;
        a.j = 20;

        Demo b = new Demo();

        System.out.println("a.i=" + a.i + ", a.j=" + a.j);
        System.out.println("b.i=" + b.i + ", b.j=" + b.j);
    }
}

运行：
a.i=10, a.j=20
b.i=10, b.j=0
```

注：
- 静态变量也可以通过对象来访问，但不提倡，编译器也会产生警告。
- 静态变量在类装载的时候就会被初始化。也就是说，只要类被装载，不管你是否使用了这个 static 变量，它都会被初始化，并占用内存。

以下情形可以使用静态方法：
- 方法不需要访问对象状态，其所需参数都是通过显式参数提供（例如 Math.pow()）。
- 方法只需要访问类的静态变量。

总结：
- 静态方法只能访问静态变量；
- 静态方法不能够直接调用非静态方法；
- 如访问控制权限允许，静态变量和静态方法也可以通过对象来访问，但不被推荐；
- 静态方法中不存在当前对象，因而不能使用 this，当然也不能使用 super；
- 静态方法不能被非静态方法覆盖；
- 构造方法不允许声明为 static；
- 局部变量不能使用 static 修饰。

静态初始器（静态块）(Static Initializer)
静态初始器是一个存在于类中、方法外面的静态块。静态初始器仅仅在类装载的时候（第一次使用类的时候）执行一次，往往用来初始化静态变量。

```java 静态块
public class Demo {
    public static int i;
    static{
        i = 10;
        System.out.println("运行到了静态块");
    }
    public void test() {
        System.out.println("i=" + i);
    }
    public static void main(String[] args) {
        System.out.println("Demo.i=" + Demo.i);
        new Demo().test();
    }
}

运行：
运行到了静态块
Demo.i=10
i=10
```

```java 静态导入
import static packageName.className.methonName;  // 导入某个特定的静态方法
import static packageName.className.*;  // 导入类中的所有静态成员
```

对于使用频繁的静态变量和静态方法，可以将其静态导入，简化一些操作，例如输出语句 System.out.println(); 中的 out 就是 System 类的静态变量。

```java System静态导入
import static java.lang.System.*;
import static java.lang.Math.random;
public class Demo {
    public static void main(String[] args) {
        out.println("产生的一个随机数：" + random());
    }
}

运行：
产生的一个随机数：0.05800891549018705
```

问：是否可以在 static 环境中访问非 static 变量？
答：static 变量在 Java 中是属于类的，它在所有的实例中的值是一样的。当类被 Java 虚拟机载入的时候，会对 static 变量进行初始化。如果你的代码尝试不用实例来访问非 static 的变量，编译器会报错，因为这些变量还没有被创建出来，还没有跟任何实例关联上。

## final 关键字：阻止继承和多态

final 所修饰的数据具有“终态”的特征，表示“最终”。规定如下：
- 修饰的类不能被继承。
- 修饰的方法不能被子类重写。
- 修饰的变量（成员变量或局部变量）即成为常量，只能赋值一次。
- 修饰的成员变量必须在声明的同时赋值，如果在声明的时候没有赋值，那么只有 一次赋值的机会，而且只能在构造方法中显式赋值，然后才能使用。
- 修饰的局部变量可以只声明不赋值，然后再进行一次性的赋值。

```java final
public final class Demo {
    public static final int TOTAL_NUMBER = 5;
    public int id;
    public Demo() {
        // 非法，对 final 变量 TOTAL_NUMBER 进行二次赋值了
        // 因为 ++TOTAL_NUMBER 相当于 TOTAL_NUMBER = TOTAL_NUMBER + 1
        id = ++TOTAL_NUMBER;
    }
    public static void main(String[] args) {
        final Demo t = new Demo();
        final int i = 10;
        final int j;
        j = 20;  // 一次性的赋值
        j = 30;  // 非法，对 final 变量 j 进行二次赋值
    }
}
```

一旦将一个类声明为 final，那么该类包含的方法也将被隐式地声明为 final，但是变量不是。

被 final 修饰的方法为静态绑定，不会产生多态（动态绑定），程序在运行时不需要再检索方法表，能够提高代码的执行效率。

被 static 或 private 修饰的方法会被隐式的声明为 final。

## 内部类及其实例化

内部类(Inner Class)/嵌套类(Nested Class)：在一个类（或方法、语句块）的内部定义另一个类。

内部类和外层封装它的类之间存在逻辑上的所属关系，一般只用在定义它的类或语句块之内，实现一些没有通用意义的功能逻辑，在外部引用它时必须给出完整的名称。

使用内部类的主要原因有：
- 内部类可以访问外部类中的数据，包括私有的数据。
- 内部类可以对同一个包中的其他类隐藏起来。
- 当想要定义一个回调函数且不想编写大量代码时，使用匿名(anonymous)内部类比较便捷。
- 减少类的命名冲突。

```java 内部类
public class Outer {
    private int size;
    public class Inner {
        private int counter = 10;
        public void doStuff() {
            size++;
        }
    }
    public static void main(String args[]) {
        Outer outer = new Outer();
        Inner inner = outer.new Inner();
        inner.doStuff();
        System.out.println(outer.size);
        System.out.println(inner.counter);
        // 编译错误，外部类不能访问内部类的变量
        System.out.println(counter);
    }
}
```

注：必须先有外部类的对象才能生成内部类的对象，因为内部类需要访问外部类中的成员变量，成员变量必须实例化才有意义。

## 静态内部类、匿名内部类、成员式内部类和局部内部类

http://www.weixueyuan.net/view/6007.html

## abstract 抽象类的概念和使用

在自上而下的继承层次结构中，位于上层的类更具有通用性，甚至可能更加抽象。

从某种角度看，祖先类更加通用，它只包含一些最基本的成员，人们只将它作为派生其他类的基类，而不会用来创建对象。甚至，你可以只给出方法的定义而不实现，由子类根据具体需求来具体实现。

这种只给出定义而不具体实现的方法被称为抽象方法，抽象方法是没有方法体的，在代码的表达上就是没有“{}”。包含一个或多个抽象方法的类也必须被声明为抽象类。

使用 abstract 修饰符来表示抽象方法和抽象类。

抽象类除了包含抽象方法外，还可以包含具体的变量和具体的方法。类即使不包含抽象方法，也可以被声明为抽象类，防止被实例化。

抽象类不能被实例化，抽象方法必须在子类中被实现。

```java
public class Demo {
	public static void main(String[] args) {
		Teacher teacher = new Teacher();
		teacher.setName("王明");
		teacher.work();

		Driver driver = new Driver();
		driver.setName("小陈");
		driver.work();
	}
}

// 定义一个抽象类
abstract class People {
	private String name; // 实例变量

	// 共有的 setter 和 getter 方法
	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	// 抽象方法
	public abstract void work();
}

class Teacher extends People {
	// 必须实现该方法
	public void work() {
		System.out.println("我的名字叫" + this.getName() + "，我正在讲课，请大家不要东张西望...");
	}
}

class Driver extends People {
	// 必须实现该方法
	public void work() {
		System.out.println("我的名字叫" + this.getName() + "，我正在开车，不能接听电话...");
	}
}

运行：
我的名字叫王明，我正在讲课，请大家不要东张西望...
我的名字叫小陈，我正在开车，不能接听电话...
```

关于抽象类的几点说明：
- 抽象类不能直接使用，必须用子类去实现抽象类，然后使用其子类的实例。然而可以创建一个变量，其类型是一个抽象类，并让它指向具体子类的一个实例，也就是可以使用抽象类来充当形参，实际实现类作为实参，也就是多态的应用。
- 不能有抽象构造方法或抽象静态方法。

在下列情况下，一个类将成为抽象类：
- 当一个类的一个或多个方法是抽象方法时；
- 当类是一个抽象类的子类，并且不能为任何抽象方法提供任何实现细节或方法主体时；
- 当一个类实现一个接口，并且不能为任何抽象方法提供实现细节或方法主体时。

注意：这里说的是这些情况下一个类将成为抽象类，没有说抽象类一定会有这些情况。

一个典型的错误：抽象类一定包含抽象方法。 但是反过来说“包含抽象方法的类一定是抽象类”就是正确的。

事实上，抽象类可以是一个完全正常实现的类。

## interface 接口的概念及使用

在抽象类中，可以包含一个或多个抽象方法；但在接口（interface）中，所有的方法必须都是抽象的，不能有方法体，它比抽象类更加“抽象”。

接口使用 interface 关键字来声明，可以看做是一种特殊的抽象类，可以指定一个类必须做什么，而不是规定它如何去做。

现实中也有很多接口的实例，比如说串口电脑硬盘，Serial ATA委员会指定了Serial ATA 2.0规范，这种规范就是接口。Serial ATA委员会不负责生产硬盘，只是指定通用的规范。

希捷、日立、三星等生产厂家会按照规范生产符合接口的硬盘，这些硬盘就可以实现通用化，如果正在用一块160G日立的串口硬盘，现在要升级了，可以购买一块320G的希捷串口硬盘，安装上去就可以继续使用了。

```java 模拟Serial ATA委员会定义以下串口硬盘接口
// 串行硬盘接口
public interface SataHdd {
    // 连接线的数量
    int CONNECT_LINE=4;
    // 写数据
    void writeData(String data);
    // 读数据
    String readData();
}
```

注意：接口中声明的成员变量默认都是 public static final 的，必须显示的初始化。因而在常量声明时可以省略这些修饰符。

接口是若干常量和抽象方法的集合，目前看来和抽象类差不多。确实如此，接口本就是从抽象类中演化而来的，因而除特别规定，接口享有和类同样的“待遇”。比如，源程序中可以定义多个类或接口，但最多只能有一个 public 的类或接口，如果有则源文件必须取和 public 的类和接口相同的名字。和类的继承格式一样，接口之间也可以继承，子接口可以继承父接口中的常量和抽象方法并添加新的抽象方法等。

但接口有其自身的一些特性，归纳如下：

1. 接口中只能定义抽象方法，这些方法默认为 public abstract 的，因而在声明方法时可以省略这些修饰符。试图在接口中定义实例变量、非抽象的实例方法及静态方法，都是非法的。例如：

```java
public interface SataHdd {
	// 连接线的数量
	public int connectLine;
	// 编译出错，connectLine被看做静态常量，必须显式初始化即 connectLine = 4

	// 写数据
	protected void writeData(String data);
	// 编译出错，必须是public类型

	// 读数据
	public static String readData() {
	// 编译出错，接口中不能包含静态方法
		return "数据";
	}
	// 编译出错，接口中只能包含抽象方法，即没有“{具体实现代码}”
}
```

3. 接口中没有构造方法，不能被实例化。

4. 一个接口不实现另一个接口，但可以继承多个其他接口。

接口的多继承特点弥补了类的单继承。例如：
```java
// 串行硬盘接口
public interface SataHdd extends A, B {
    // 连接线的数量
    public static final int CONNECT_LINE = 4;
    // 写数据
    public void writeData(String data);
    // 读数据
    public String readData();
}

interface A {
    public void a();
}

interface B {
    public void b();
}
```

### 为什么使用接口

大型项目开发中，可能需要从继承链的中间插入一个类，让它的子类具备某些功能而不影响它们的父类。

例如：A -> B -> C -> D -> E，A 是祖先类，如果需要为C、D、E类添加某些通用的功能，最简单的方法是让 C 类再继承另外一个类。

但问题来了，Java 是一种单继承的语言，不能再让 C 继承另外一个父类了，只到移动到继承链的最顶端，让 A 再继承一个父类。这样一来，对C、D、E类的修改，影响到了整个继承链，不具备可插入性的设计。

接口是可插入性的保证。在一个继承链中的任何一个类都可以实现一个接口，这个接口会影响到此类的所有子类，但不会影响到此类的任何父类。此类将不得不实现这个接口所规定的方法，而子类可以从此类自动继承这些方法，这时候，这些子类具有了可插入性。

我们关心的不是哪一个具体的类，而是这个类是否实现了我们需要的接口。

接口提供了关联以及方法调用上的可插入性，软件系统的规模越大，生命周期越长，接口使得软件系统的灵活性和可扩展性，可插入性方面得到保证。

接口在面向对象的 Java 程序设计中占有举足轻重的地位。事实上在设计阶段最重要的任务之一就是设计出各部分的接口，然后通过接口的组合，形成程序的基本框架结构。

### 接口的使用

接口的使用与类的使用有些不同。在需要使用类的地方，会直接使用 new 关键字来构建一个类的实例，但接口不可以这样使用，因为接口不能直接使用 new 关键字来构建实例。

接口必须通过类来实现(implements)它的抽象方法，然后再实例化类。

如果一个类不能实现该接口的所有抽象方法，那么这个类必须被定义为抽象方法。

不允许创建接口的实例，但允许定义接口类型的引用变量，该变量指向了实现接口的类的实例。

一个类只能继承一个父类，但却可以实现多个接口。

实现接口的格式如下：
```
修饰符 class 类名 extends 父类 implements 多个接口（A, B...） {
	实现方法
}
```

例子：

```java
public class Demo {
	public static void main(String[] args) {
		SataHdd sh1 = new SeagateHdd(); // 初始化希捷硬盘
		SataHdd sh2 = new SamsungHdd(); // 初始化三星硬盘
	}
}

// 串行硬盘接口
interface SataHdd {
	// 连接线的数量
	public static final int CONNECT_LINE = 4;
	// 写数据
	public void writeData(String data);
	// 读数据
	public String readData();
}

// 维修硬盘接口
interface fixHdd {
	// 维修地址
	String address = "北京市海淀区";
	// 开始维修
	boolean doFix();
}

// 希捷硬盘
class SeagateHdd implements SataHdd, fixHdd {
	// 希捷硬盘读取数据
	public String readData() {
		return "数据";
	}

	// 希捷硬盘写入数据
	public void writeData(String data) {
		System.out.println("写入成功");
	}

	// 维修希捷硬盘
	public boolean doFix() {
		return true;
	}
}

// 三星硬盘
class SamsungHdd implements SataHdd {
	// 三星硬盘读取数据
	public String readData() {
		return "数据";
	}

	// 三星硬盘写入数据
	public void writeData(String data) {
		System.out.println("写入成功");
	}
}

// 某劣质硬盘，不能写数据
abstract class XXHdd implements SataHdd {
	// 硬盘读取数据
	public String readData() {
		return "数据";
	}
}
```

### 接口作为类型使用

接口作为引用类型来使用，任何实现该接口的类的实例都可以存储在该接口类型的变量中，通过这些变量可以访问类中所实现的接口中的方法，Java 运行时系统会动态地确定应该使用哪个类中的方法，实际上是调用相应的实现类的方法。

接口可以作为一个类型来使用，如作为方法的参数和返回类型。例子：
```java
public class Demo {
	// 变量a使用A接口类型
	public static void test1(A a) {
		// 调用相应的实现类B的方法
		a.doSth();
	}

	public static void main(String[] args) {
		A a = new B();
		test1(a);
	}
}

interface A {
	int doSth();
}

class B implements A {
	public int doSth() {
		System.out.println("now in B");
		return 123;
	}
}

运行：
now in B
```

## 接口和抽象类的区别

类是对象的模板，抽象类和接口可以看做是具体的类的模板。

由于从某种角度讲，接口是一种特殊的抽象类，它们的渊源颇深，有很大的相似之处，所以在选择使用谁的问题上很容易迷糊。

它们具有的相同点：
1. 都代表类树形结构的抽象层。在使用引用变量时，尽量使用类结构的抽象层，使方法的定义和实现分离，这样做对于代码有松散耦合的好处。
2. 都不能被实例化。
3. 都能包含抽象方法。抽象方法用来描述系统提供哪些功能，而不必关心具体的实现。

主要区别：
1. 抽象类可以为部分方法提供实现，避免了在子类中重复实现这些方法，提高了代码的可重用性，这是抽象类的优势；
而接口中只能包含抽象方法，不能包含任何实现。

```java
public abstract class A {
	// A 没有定义 method1 的实现
	// 也就是说 B、C 可以根据自己的特点实现该方法，体现了松散耦合的特性
	public abstract void method1();

	public void method2() {
		// A 实现 method2 方法，避免B、C子类重复实现
		// A 为子类提供了公共的功能，或说 A 约束了子类的行为
	}
}

public class B extends A {
	public void method1() {
		// B method1
	}
}

public class C extends A {
	public void method1() {
		// C method1
	}
}
```

再换成接口看看：

```java
public interface A {
	// 接口 A 无法为实现类B、C提供公共的功能
	// 也就是说 A 无法约束B、C的行为
	// B、C可以自由地发挥自己的特点现实 method1 和 method2方法
	// 而接口 A 毫无掌控能力
    public void method1();
    public void method2();
}

public class B implements A {
    public void method1() {
        // B method1
    }
    public void method2() {
        // B method2
    }
}

public class C implements A {
    public void method1() {
        // C method1
    }
    public void method2() {
        // C method2
    }
}
```

2. 一个类只能继承一个直接的父类（可能是抽象类），但一个类可以实现多个接口，这个就是接口的优势。

```java
// 接口类
interface A {
	public void method1();
}

interface B {
	public void method2();
}

class C implements A, B {
	public void method1() {
		// C method1
	}
	public void method2() {
		// C method2
	}
}
// 可以灵活的使用 C
// 并且 C 还有机会进行扩展，实现其他接口
A a = new C();
B b = new C();

// 抽象类
abstract class A {
    public abstract void method1();
}

abstract class B extends A {
    public abstract void method2();
}
// 对于 C 类，将没有机会继承其他父类了
class C extends B {
    public void method1() {
        // C method1
    }
    public void method2() {
        // C method2
    }
}
```

综上所述，接口和抽象类各有优缺点，在接口和抽象类的选择上，必须遵守这样一个原则：

行为模型应该总是通过接口而不是抽象类定义，所以通常是优先选用接口，尽量少用抽象类。

选择抽象类的时候通常是如下情况：需要定义子类的行为，又要为子类提供通用的功能。

## 泛型

使用变量之前要定义，定义一个变量时必须要指明它的数据类型，什么样的数据类型赋给什么样的值。

假如我们现在要定义一个类来表示坐标，要求坐标的数据类型可以是整数、小数和字符串，例如：

```java
x = 10、y = 10
x = 12.88、y = 129.65
x = "东京180度"、y = "北纬210度"
```

针对不同的数据类型，除了借助方法重载，还可以借助自动装箱和向上转型。我们知道，基本数据类型可以自动装箱，被转换成对应的包装类；Object 是所有类的祖先类，任何一个类的实例都可以向上转型为 Object 类型，例如：

```
int --> Integer --> Object
double -->Double --> Object
String --> Object
```

这样，只需要定义一个方法，就可以接收所有类型的数据。

```java
public class Demo {
	public static void main(String[] args) {
		Point p = new Point();
		p.setX(10); // int -> Integer -> Object
		p.setY(20);
		int x = (Integer) p.getX(); // 必须向下转型
		int y = (Integer) p.getY();
		System.out.println("This point is：" + x + ", " + y);

		p.setX(25.4); // double -> Integer -> Object
		p.setY("东京180度");
		double m = (Double) p.getX(); // 必须向下转型
		double n = (Double) p.getY(); // 运行期间抛出异常
		System.out.println("This point is：" + m + ", " + n);
	}
}

class Point {
	Object x = 0;
	Object y = 0;

	public Object getX() {
		return x;
	}

	public void setX(Object x) {
		this.x = x;
	}

	public Object getY() {
		return y;
	}

	public void setY(Object y) {
		this.y = y;
	}
}
```

上面的代码中，生成坐标时不会有任何问题，但是取出坐标时，要向下转型，在 Java多态对象的类型转换 一文中我们讲到，向下转型存在着风险，而且编译期间不容易发现，只有在运行期间才会抛出异常，所以要尽量避免使用向下转型。运行上面的代码，第12行会抛出 java.lang.ClassCastException 异常。

那么，有没有更好的办法，既可以不使用重载（有重复代码），又能把风险降到最低呢？

有，可以使用泛型类(Java Class)，它可以接受任意类型的数据。所谓“泛型”，就是“宽泛的数据类型”，任意的数据类型。

更改上面的代码，使用泛型类：
```java
public class Demo {
	public static void main(String[] args) {
		// 实例化泛型类
		Point<Integer, Integer> p1 = new Point<Integer, Integer>();
		p1.setX(10);
		p1.setY(20);
		int x = p1.getX();
		int y = p1.getY();
		System.out.println("This point is：" + x + ", " + y);

		Point<Double, String> p2 = new Point<Double, String>();
		p2.setX(25.4);
		p2.setY("东京180度");
		double m = p2.getX();
		String n = p2.getY();
		System.out.println("This point is：" + m + ", " + n);
	}
}

// 定义泛型类
class Point<T1, T2> {
	T1 x;
	T2 y;

	public T1 getX() {
		return x;
	}

	public void setX(T1 x) {
		this.x = x;
	}

	public T2 getY() {
		return y;
	}

	public void setY(T2 y) {
		this.y = y;
	}
}

运行：
This point is：10, 20
This point is：25.4, 东京180度
```

与普通类的定义相比，上面的代码在类名后面多出了 <T1, T2>，T1, T2 是自定义的标识符，也是参数，用来传递数据的类型，而不是数据的值，我们称之为类型参数。在泛型中，不但数据的值可以通过参数传递，数据的类型也可以通过参数传递。T1, T2 只是数据类型的占位符，运行时会被替换为真正的数据类型。

传值参数（我们通常所说的参数）由小括号包围，如 (int x, double y)，类型参数（泛型参数）由尖括号包围，多个参数由逗号分隔，如 <T> 或 <T, E>。

类型参数需要在类名后面给出。一旦给出了类型参数，就可以在类中使用了。类型参数必须是一个合法的标识符，习惯上使用单个大写字母，通常情况下，K 表示键，V 表示值，E 表示异常或错误，T 表示一般意义上的数据类型。

泛型类在实例化时必须指出具体的类型，也就是向类型参数传值，格式为：
```java
className variable<dataType1, dataType2> = new className<dataType1, dataType2>();
```

也可以省略等号右边的数据类型，但是会产生警告：
```java
className variable<dataType1, dataType2> = new className();
```

因为在使用泛型类时指明了数据类型，赋给其他类型的值会抛出异常，既不需要向下转型，也没有潜在的风险，比本文一开始介绍的自动装箱和向上转型要更加实用。

注意：
- 泛型是 Java 1.5 的新增特性，它以C++模板为参照，本质是参数化类型(Parameterized Type)的应用。
- 类型参数只能用来表示引用类型，不能用来表示基本类型，如  int、double、char 等。但是传递基本类型不会报错，因为它们会自动装箱成对应的包装类。

### 泛型方法

除了定义泛型类，还可以定义泛型方法，例如，定义一个打印坐标的泛型方法：
```java
public class Demo {
	public static void main(String[] args) {
		// 实例化泛型类
		Point<Integer, Integer> p1 = new Point<Integer, Integer>();
		p1.setX(10);
		p1.setY(20);
		p1.printPoint(p1.getX(), p1.getY());

		Point<Double, String> p2 = new Point<Double, String>();
		p2.setX(25.4);
		p2.setY("东京180度");
		p2.printPoint(p2.getX(), p2.getY());
	}
}

// 定义泛型类
class Point<T1, T2> {
	T1 x;
	T2 y;

	public T1 getX() {
		return x;
	}

	public void setX(T1 x) {
		this.x = x;
	}

	public T2 getY() {
		return y;
	}

	public void setY(T2 y) {
		this.y = y;
	}

	// 定义泛型方法
	public <T1, T2> void printPoint(T1 x, T2 y) {
		T1 m = x;
		T2 n = y;
		System.out.println("This point is：" + m + ", " + n);
	}
}

运行：
This point is：10, 20
This point is：25.4, 东京180度
```

上面的代码中定义了一个泛型方法 printPoint()，既有普通参数，也有类型参数，类型参数需要放在修饰符后面、返回值类型前面。一旦定义了类型参数，就可以在参数列表、方法体和返回值类型中使用了。

与使用泛型类不同，使用泛型方法时不必指明参数类型，编译器会根据传递的参数自动查找出具体的类型。泛型方法除了定义不同，调用就像普通方法一样。

注意：
泛型方法与泛型类没有必然的联系，泛型方法有自己的类型参数，在普通类中也可以定义泛型方法。泛型方法 printPoint() 中的类型参数 T1, T2 与泛型类 Point 中的 T1, T2 没有必然的联系，也可以使用其他的标识符代替：

```java
public static <V1, V2> void printPoint(V1 x, V2 y) {
    V1 m = x;
    V2 n = y;
    System.out.println("This point is：" + m + ", " + n);
}
```

### 泛型接口

在Java中也可以定义泛型接口，这里不再赘述，仅仅给出示例代码：
```java
public class Demo {
	public static void main(String arsg[]) {
		Info<String> obj = new InfoImp<String>("www.xx.com");
		System.out.println("Length Of String: " + obj.getVar().length());
	}
}

// 定义泛型接口
interface Info<T> {
	public T getVar();
}

// 实现接口
class InfoImp<T> implements Info<T> {
	private T var;

	// 定义泛型构造方法
	public InfoImp(T var) {
		this.setVar(var);
	}

	public void setVar(T var) {
		this.var = var;
	}

	public T getVar() {
		return this.var;
	}
}

运行：
Length Of String: 18
```

### 类型擦除

如果在使用泛型时没有指明数据类型，那么就会擦除泛型类型。例子：
```java
public class Demo {
	public static void main(String[] args) {
		Point p = new Point(); // 类型擦除
		p.setX(10);
		p.setY(20.8);
		int x = (Integer) p.getX(); // 向下转型
		double y = (Double) p.getY();
		System.out.println("This point is：" + x + ", " + y);
	}
}

class Point<T1, T2> {
	T1 x;
	T2 y;

	public T1 getX() {
		return x;
	}

	public void setX(T1 x) {
		this.x = x;
	}

	public T2 getY() {
		return y;
	}

	public void setY(T2 y) {
		this.y = y;
	}
}

运行：
This point is：10, 20.8
```

因为在使用泛型时没有指明数据类型，为了不出现错误，编译器会将所有数据向上转型为 Object，所以在取出坐标使用时要向下转型，这与本文一开始不使用泛型没什么两样。

### 限制泛型的可用类型

在上面的代码中，类型参数可以接受任意的数据类型，只要它是被定义过的。但是，很多时候我们只需要一部分数据类型就够了，用户传递其他数据类型可能会引起错误。

例如，编写一个泛型函数用于返回不同类型数组（Integer 数组、Double 数组、Character 数组等）中的最大值：

```java
public <T> T getMax(T array[]) {
    T max = null;
    for(T element : array) {
        max = element.doubleValue() > max.doubleValue() ? element : max;
    }
    return max;
}
```

上面的代码会报错，doubleValue() 是 Number 类的方法，不是所有的类都有该方法，所以我们要限制类型参数 T，让它只能接受 Number 及其子类（Integer、Double、Character 等）。

通过 extends 关键字可以限制泛型的类型，改进上面的代码：

```java
public <T extends Number> T getMax(T array[]) {
    T max = null;
    for(T element : array) {
        max = element.doubleValue() > max.doubleValue() ? element : max;
    }
    return max;
}
```

<T extends Number> 表示 T 只接受 Number 及其子类，传入其他类型的数据会报错。

注意：
这里的限定使用关键字 extends，后面可以是类也可以是接口。如果是类，只能有一个；但是接口可以有多个，并以“&”分隔，如 <T extends Interface1 & Interface2>。
这里的 extends 已经不是继承的含义了，应该理解为 T 是继承自 Number 类的类型，或者 T 是实现了 XX 接口的类型。

### ? 泛型通配符

在类型擦除中我们定义一个了泛型类来表示坐标，坐标可以是整数、小数或字符串：

```java
class Point<T1, T2> {
    T1 x;
    T2 y;
    public T1 getX() {
        return x;
    }
    public void setX(T1 x) {
        this.x = x;
    }
    public T2 getY() {
        return y;
    }
    public void setY(T2 y) {
        this.y = y;
    }
}
```

现在要求在类的外部定义一个 printPoint() 方法用于输出坐标，怎么办呢？

可以这样来定义方法：

```java
public void printPoint(Point p) {
    System.out.println("This point is: " + p.getX() + ", " + p.getY());
}
```

我们知道，如果在使用泛型时没有指名具体的数据类型，就会擦除泛型类型，并向上转型为 Object，这与不使用泛型没什么两样。上面的代码没有指明数据类型，相当于：

```java
public void printPoint(Point<Object, Object> p) {
    System.out.println("This point is: " + p.getX() + ", " + p.getY());
}
```

为了避免类型擦除，可以使用通配符(?)：

```java
public void printPoint(Point<?, ?> p) {
    System.out.println("This point is: " + p.getX() + ", " + p.getY());
}
```

通配符(?)可以表示任意的数据类型。完整代码：

```java
public class Demo {
	public static void main(String[] args) {
		Point<Integer, Integer> p1 = new Point<Integer, Integer>();
		p1.setX(10);
		p1.setY(20);
		printPoint(p1);

		Point<String, String> p2 = new Point<String, String>();
		p2.setX("东京180度");
		p2.setY("北纬210度");
		printPoint(p2);
	}

	public static void printPoint(Point<?, ?> p) { // 使用通配符
		System.out.println("This point is: " + p.getX() + ", " + p.getY());
	}
}

class Point<T1, T2> {
	T1 x;
	T2 y;

	public T1 getX() {
		return x;
	}

	public void setX(T1 x) {
		this.x = x;
	}

	public T2 getY() {
		return y;
	}

	public void setY(T2 y) {
		this.y = y;
	}
}

运行：
This point is: 10, 20
This point is: 东京180度, 北纬210度
```

但是，数字坐标与字符串坐标又有区别：数字可以表示x轴或y轴的坐标，字符串可以表示地球经纬度。
现在又要求定义两个方法分别处理不同的坐标，一个方法只能接受数字类型的坐标，另一个方法只能接受字符串类型的坐标，怎么办呢？

这个问题的关键是要限制类型参数的范围：
```java
public class Demo {
	public static void main(String[] args) {
		Point<Integer, Integer> p1 = new Point<Integer, Integer>();
		p1.setX(10);
		p1.setY(20);
		printNumPoint(p1);

		Point<String, String> p2 = new Point<String, String>();
		p2.setX("东京180度");
		p2.setY("北纬210度");
		printStrPoint(p2);
	}

	// 借助通配符限制泛型的范围
	public static void printNumPoint(Point<? extends Number, ? extends Number> p) {
		System.out.println("x: " + p.getX() + ", y: " + p.getY());
	}

	public static void printStrPoint(Point<? extends String, ? extends String> p) {
		System.out.println("GPS: " + p.getX() + "，" + p.getY());
	}
}

class Point<T1, T2> {
	T1 x;
	T2 y;

	public T1 getX() {
		return x;
	}

	public void setX(T1 x) {
		this.x = x;
	}

	public T2 getY() {
		return y;
	}

	public void setY(T2 y) {
		this.y = y;
	}
}

运行：
x: 10, y: 20
GPS: 东京180度，北纬210度
```

<? extends Number> 表示泛型的类型参数只能是 Number 及其子类，<? extends String> 也一样，这与定义泛型类或泛型方法时限制类型参数的范围类似。

不过，使用通配符(?)不但可以限制类型的上限，还可以限制下限。限制下限使用 super 关键字，例如 <? super Number> 表示只能接受 Number 及其父类。

# 异常处理

## 处理基础

Java 异常是一个描述在代码段中发生的异常（也就是出错）情况的对象。当异常情况发生，一个代表该异常的对象被创建并且在导致该错误的方法中被抛出（throw）。该方法可以选择自己处理异常或传递该异常。两种情况下，该异常被捕获（caught）并处理。异常可能是由 Java 运行时系统产生，或者是由你的手工代码产生。被 Java 抛出的异常与违反语言规范或超出 Java 执行环境限制的基本错误有关。手工编码产生的异常基本上用于报告方法调用程序的出错状况。

Java 异常处理通过5个关键字控制：try、catch、throw、throws和 finally。下面讲述它们如何工作的。程序声明了你想要的异常监控包含在一个 try 块中。如果在 try 块中发生异常，它被抛出。你的代码可以捕捉这个异常（用 catch）并且用某种合理的方法处理该异常。系统产生的异常被Java 运行时系统自动抛出。手动抛出一个异常，用关键字 throw。任何被抛出方法的异常都必须通过 throws 子句定义。任何在方法返回前绝对被执行的代码被放置在 finally 块中。

下面是一个异常处理块的通常形式：
```java
try {
    // 监控可能发生异常的代码
} catch (ExceptionType1 e) {
    // 处理 ExceptionType1 类型异常
} catch (ExceptionType2 e) {
    // 处理 ExceptionType2 类型异常
} catch (... e) {
    // 处理 ... 类型异常
} finally {
    // 在 try 块结束前被执行
}
```

## 异常类型

所有异常类型都是内置类 Throwable 的子类。因此，Throwable 在异常类层次结构的顶层。紧接着 Throwable 下面的是两个把异常分成两个不同分支的子类。一个分支是 Exception。

该类用于用户程序可能捕捉的异常情况。它也是你可以用来创建你自己用户异常类型子类的类。在 Exception 分支中有一个重要子类RuntimeException。该类型的异常自动为你所编写的程序定义并且包括被零除和非法数组索引这样的错误。

另一类分支由 Error 作为顶层，Error 定义了在通常环境下不希望被程序捕获的异常。Error 类型的异常用于 Java 运行时系统来显示与运行时系统本身有关的错误。堆栈溢出是这种错误的一例。这里不讨论关于 Error 类型的异常处理，因为它们通常是灾难性的致命错误，不是你的程序可以控制的。

异常处理这块不是特别难：http://www.weixueyuan.net/java/rumen_7/

# 多线程

操作系统课有讲大致原理，这里主要讲在 Java 原理和应用，最好看懂课本理解好多线程内容。

## 线程模型

### 线程优先级

Java 给每个线程安排优先级以决定与其他线程比较时该如何对待该线程。线程优先级是详细说明线程间优先关系的整数。作为绝对值，优先级是毫无意义的；当只有一个线程时，优先级高的线程并不比优先权低的线程运行的快。相反，线程的优先级是用来决定何时从一个运行的线程切换到另一个。这叫“上下文转换”(context switch)。决定上下文转换发生的规则很简单：（即最高优先级优先算法）

- 线程可以自动放弃控制。在I/O未决定的情况下，睡眠或阻塞由明确的让步来完成。在这种假定下，所有其他的线程被检测，准备运行的最高优先级线程被授予CPU。
- 线程可以被高优先级的线程抢占。在这种情况下，低优先级线程不主动放弃，处理器只是被先占——无论它正在干什么——处理器被高优先级的线程占据。基本上，一旦高优先级线程要运行，它就执行。这叫做有优先权的多任务处理。

警告：不同的操作系统下等优先级线程的上下文转换可能会产生错误。

### 同步性

因为多线程在你的程序中引入了一个异步行为，所以在你需要的时候必须有加强同步性的方法。

举例来说，如果你希望两个线程相互通信并共享一个复杂的数据结构，例如链表序列，你需要某些方法来确保它们没有相互冲突。也就是说，你必须防止一个线程写入数据而另一个线程正在读取链表中的数据。为此目的，Java 在进程间同步性的老模式基础上实行了另一种方法：管程（monitor）。管程是一种由 C.A.R.Hoare 首先定义的控制机制。

你可以把管程想象成一个仅控制一个线程的小盒子。一旦线程进入管程，所有线程必须等待直到该线程退出了管程。用这种方法，管程可以用来防止共享的资源被多个线程操纵。

很多多线程系统把管程作为程序必须明确的引用和操作的对象。Java 提供一个清晰的解决方案。没有“Monitor”类；相反，每个对象都拥有自己的隐式管程，当对象的同步方法被调用时管程自动载入。一旦一个线程包含在一个同步方法中，没有其他线程可以调用相同对象的同步方法。这就使你可以编写非常清晰和简洁的多线程代码，因为同步支持是语言内置的。

### 消息传递

在你把程序分成若干线程后，你就要定义各线程之间的联系。用大多数其他语言规划时，你必须依赖于操作系统来确立线程间通信。这样当然增加花费。然而，Java 提供了多线程间谈话清洁的、低成本的途径——通过调用所有对象都有的预先确定的方法。Java 的消息传递系统允许一个线程进入一个对象的一个同步方法，然后在那里等待，直到其他线程明确通知它出来。

### Thread 类和 Runnable 接口

Java 的多线程系统建立于 Thread 类，它的方法，它的共伴接口 Runnable 基础上。Thread 类封装了线程的执行。既然你不能直接引用运行着的线程的状态，你要通过它的代理处理它，于是 Thread 实例产生了。为创建一个新的线程，你的程序必须扩展 Thread 或实现 Runnable 接口。

Thread类定义了好几种方法来帮助管理线程：

方法 	     | 意义
:-----------:|:-----------:
getName 	 | 获得线程名称
getPriority  | 获得线程优先级
jsAlive      | 判定线程是否仍在运行
join         | 等待一个线程终止
run          | 线程的入口点
sleep        | 在一段时间内挂起线程
start        | 通过调用运行方法来启动线程

## 主线程

当Java程序启动时，一个线程立刻运行，该线程通常叫做程序的主线程（main thread），因为它是程序开始时就执行的。

主线程的重要性体现在两方面：
1. 它是产生其他子线程的线程；
2. 通常它必须最后完成执行，因为它执行各种关闭动作。

尽管主线程在程序启动时自动创建，但它可以由一个 Thread 对象控制。
为此，你必须调用方法 currentThread() 获得它的一个引用，currentThread() 是 Thread 类的公有的静态成员。
通常形式如下：
```java
static Thread currentThread( )
```

该方法返回一个调用它的线程的引用。一旦你获得主线程的引用，你就可以像控制其他线程那样控制主线程。

例子：
```java
// Controlling the main Thread.
class CurrentThreadDemo {
	public static void main(String args[]) {
		Thread t = Thread.currentThread();
		System.out.println("Current thread: " + t);
		// change the name of the thread
		t.setName("My Thread");
		System.out.println("After name change: " + t);
		try {
			for (int n = 5; n > 0; n--) {
				System.out.println(n);
				Thread.sleep(1000);
			}
		} catch (InterruptedException e) {
			System.out.println("Main thread interrupted");
		}
	}
}

运行：
Current thread: Thread[main,5,main]
After name change: Thread[My Thread,5,main]
5
4
3
2
1
```

在本程序中，当前线程（自然是主线程）的引用通过调用 currentThread() 获得，该引用保存在局部变量t中。然后，程序显示了线程的信息。接着程序调用 setName() 改变线程的内部名称。线程信息又被显示。然后，一个循环数从5开始递减，每数一次暂停一秒。暂停是由 sleep() 方法来完成的。Sleep() 语句明确规定延迟时间是1毫秒。注意循环外的 try/catch 块。

Thread 类的 sleep() 方法可能引发一个 InterruptedException 异常。这种情形会在其他线程想要打搅沉睡线程时发生。本例只是打印了它是否被打断的消息。在实际的程序中，你必须灵活处理此类问题。

注意：t 作为语句 println() 中参数运用时输出的产生。该显示顺序：线程名称，优先级以及组的名称。默认情况下，主线程的名称是 main。它的优先级是5，这也是默认值，main 也是所属线程组的名称。一个线程组（thread group）是一种将线程作为一个整体集合的状态控制的数据结构。这个过程由专有的运行时环境来处理，在此就不赘述了。线程名改变后，t 又被输出。这次，显示了新的线程名。

让我们更仔细的研究程序中 Thread 类定义的方法。sleep() 方法按照毫秒级的时间指示使线程从被调用到挂起。它的通常形式如下：
```java
static void sleep(long milliseconds) throws InterruptedException
```

挂起的时间被明确定义为毫秒。该方法可能引发InterruptedException异常。

sleep()方法还有第二种形式，显示如下，该方法允许你指定时间是以毫秒还是以纳秒为周期。
```java
static void sleep(long milliseconds, int nanoseconds) throws InterruptedException
```

第二种形式仅当允许以纳秒为时间周期时可用。如上述程序所示，你可以用 setName() 设置线程名称，用 getName() 来获得线程名称（该过程在程序中没有体现）。这些方法都是 Thread 类的成员，声明如下：
```java
final void setName(String threadName)
final String getName( )
```

## 创建线程(Runnable接口和Thread类)

大多数情况，通过实例化一个Thread对象来创建一个线程。

Java 定义了两种方式：
1. 实现 Runnable 接口；
2. 可以继承 Thread 类。

选择哪种？
到这里，你一定会奇怪为什么 Java 有两种创建子线程的方法，哪一种更好呢。所有的问题都归于一点。Thread 类定义了多种方法可以被派生类重载。对于所有的方法，惟一的必须被重载的是 run() 方法。这当然是实现 Runnable 接口所需的同样的方法。很多 Java 程序员认为类仅在它们被加强或修改时应该被扩展。因此，如果你不重载 Thread的其他方法时，最好只实现 Runnable 接口。

### 实现 Runnable 接口

创建线程的最简单的方法就是创建一个实现 Runnable 接口的类。Runnable 抽象了一个执行代码单元。你可以通过实现 Runnable 接口的方法创建每一个对象的线程。为实现 Runnable 接口，一个类仅需实现一个 run() 的简单方法，该方法声明如下：
```java
public void run()
```

在 run() 中可以定义代码来构建新的线程。理解下面内容是至关重要的：run() 方法能够像主线程那样调用其他方法，引用其他类，声明变量。仅有的不同是 run() 在程序中确立另一个并发的线程执行入口。当 run() 返回时，该线程结束。

在你已经创建了实现 Runnable 接口的类以后，你要在类内部实例化一个 Thread 类的对象。Thread 类定义了好几种构造函数。这里用的是：
```java
Thread(Runnable threadOb, String threadName)
```

该构造函数中，threadOb 是一个实现 Runnable 接口类的实例。这定义了线程执行的起点。新线程的名称由 threadName 定义。

建立新的线程后，它并不运行直到调用了它的 start() 方法，该方法在 Thread 类中定义。本质上，start() 执行的是一个对 run() 的调用。 start()方法声明如下：
```java
void start( )
```

下面的例子是创建一个新的线程并启动它运行：
```java
// Create a second thread.
class NewThread implements Runnable {
	Thread t;

	NewThread() {
		// 新的 Thread 对象由下面的语句创建
		t = new Thread(this, "Demo Thread");
		System.out.println("Child thread: " + t);
		t.start(); // Start the thread
	}

	// This is the entry point for the second thread.
	public void run() {
		try {
			for (int i = 5; i > 0; i--) {
				System.out.println("Child Thread say: " + i);
				Thread.sleep(500);
			}
		} catch (InterruptedException e) {
			System.out.println("Child interrupted.");
		}
		System.out.println("Exiting child thread.");
	}
}

class ThreadDemo {
	public static void main(String args[]) {
		new NewThread(); // create a new thread
		try {
			for (int i = 5; i > 0; i--) {
				System.out.println("Main Thread say: " + i);
				Thread.sleep(1000);
			}
		} catch (InterruptedException e) {
			System.out.println("Main thread interrupted.");
		}
		System.out.println("Main thread exiting.");
	}
}

运行：
Child thread: Thread[Demo Thread,5,main]
Main Thread say:  5
Child Thread say: 5
Child Thread say: 4
Main Thread say:  4
Child Thread say: 3
Child Thread say: 2
Main Thread say:  3
Child Thread say: 1
Exiting child thread.
Main Thread say:  2
Main Thread say:  1
Main thread exiting.
```

通过前面的语句 this 表明在 this 对象中你想要新的线程调用 run() 方法。然后，start() 被调用，以 run() 方法为开始启动了线程的执行。这使子线程 for 循环开始执行。调用 start() 之后，NewThread 的构造函数返回到 main()。当主线程被恢复，它到达 for 循环。两个线程继续运行，共享 CPU，直到它们的循环结束。

如前面提到的，在多线程程序中，通常主线程必须是结束运行的最后一个线程。实际上，一些老的 JVM，如果主线程先于子线程结束，Java 的运行时间系统就可能“挂起”。前述程序保证了主线程最后结束，因为主线程沉睡周期 1000 毫秒，而子线程仅为 500 毫秒。这就使子线程在主线程结束之前先结束。简而言之，你将看到等待线程结束的更好途径。

### 继承 Thread

创建线程的另一个途径是创建一个新类来扩展 Thread 类，然后创建该类的实例。当一个类继承 Thread 时，它必须重载 run() 方法，这个 run() 方法是新线程的入口。它也必须调用 start() 方法去启动新线程执行。下面用扩展 thread 类重写前面的程序：

```java
// Create a second thread by extending Thread
class NewThread extends Thread {
    NewThread() {
        // Create a new, second thread
        super("Demo Thread");
        System.out.println("Child thread: " + this);
        start(); // Start the thread
    }

    // This is the entry point for the second thread.
    public void run() {
        try {
            for(int i = 5; i > 0; i--) {
                System.out.println("Child Thread: " + i);
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.out.println("Child interrupted.");
        }
        System.out.println("Exiting child thread.");
    }
}

class ExtendThread {
    public static void main(String args[]) {
        new NewThread(); // create a new thread
        try {
            for(int i = 5; i > 0; i--) {
                System.out.println("Main Thread: " + i);
                Thread.sleep(1000);
           }
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted.");
        }
        System.out.println("Main thread exiting.");
    }
}
```

## 创建多线程

到目前为止，我们仅用到两个线程：主线程和一个子线程。然而，你的程序可以创建所需的更多线程。

例如，下面的程序创建了三个子线程：
```java
// Create multiple threads.
class NewThread implements Runnable {
    String name; // name of thread
    Thread t;
    NewThread(String threadname) {
        name = threadname;
        t = new Thread(this, name);
        System.out.println("New thread: " + t);
        t.start(); // Start the thread
    }

    // This is the entry point for thread.
    public void run() {
        try {
            for(int i = 5; i > 0; i--) {
               System.out.println(name + ": " + i);
               Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            System.out.println(name + "Interrupted");
        }
        System.out.println(name + " exiting.");
    }
}

class MultiThreadDemo {
    public static void main(String args[]) {
        new NewThread("One"); // start threads
        new NewThread("Two");
        new NewThread("Three");
        try {
            // wait for other threads to end
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            System.out.println("Main thread Interrupted");
        }
        System.out.println("Main thread exiting.");
    }
}

运行：
New thread: Thread[One,5,main]
New thread: Thread[Two,5,main]
New thread: Thread[Three,5,main]
One: 5
Two: 5
Three: 5
One: 4
Two: 4
Three: 4
One: 3
Three: 3
Two: 3
One: 2
Three: 2
Two: 2
One: 1
Three: 1
Two: 1
One exiting.
Two exiting.
Three exiting.
Main thread exiting.
```

如你所见，一旦启动，所有三个子线程共享 CPU。注意 main() 中对 sleep(10000) 的调用。这使主线程沉睡十秒确保它最后结束。

## 线程优先级

线程优先级被线程调度用来判定何时每个线程允许运行。理论上，优先级高的线程比优先级低的线程获得更多的 CPU 时间。实际上，线程获得的CPU时间通常由包括优先级在内的多个因素决定（例如，一个实行多任务处理的操作系统如何更有效的利用 CPU 时间）。

一个优先级高的线程自然比优先级低的线程优先。举例来说，当低优先级线程正在运行，而一个高优先级的线程被恢复（例如从沉睡中或等待 I/O 中），它将抢占低优先级线程所使用的 CPU。

理论上，等优先级线程有同等的权利使用 CPU。但你必须小心了。记住，Java 是被设计成能在很多环境下工作的。一些环境下实现多任务处理从本质上与其他环境不同。为安全起见，等优先级线程偶尔也受控制。这保证了所有线程在无优先级的操作系统下都有机会运行。实际上，在无优先级的环境下，多数线程仍然有机会运行，因为很多线程不可避免的会遭遇阻塞，例如等待输入输出。遇到这种情形，阻塞的线程挂起，其他线程运行。

但是如果你希望多线程执行的顺利的话，最好不要采用这种方法。同样，有些类型的任务是占 CPU 的。对于这些支配 CPU 类型的线程，有时你希望能够支配它们，以便使其他线程可以运行。

设置线程的优先级，用 setPriority() 方法，该方法也是 Tread 的成员。它的通常形式为：
```java
final void setPriority(int level)
```

这里，level 指定了对所调用的线程的新的优先权的设置。
level的值必须在 MIN_PRIORITY 到 MAX_PRIORITY 范围内。通常，它们的值分别是 1 和 10。
要返回一个线程为默认的优先级，指定 NORM_PRIORITY，通常值为 5。这些优先级在 Thread 中都被定义为 final 型变量。

你可以通过调用 Thread 的 getPriority() 方法来获得当前的优先级设置。该方法如下：
```java
final int getPriority( )
```

当涉及调度时，Java 的执行可以有本质上不同的行为。最安全的办法是获得可预先性的优先权，Java 获得跨平台的线程行为的方法是自动放弃对 CPU 的控制。

下面的例子阐述了两个不同优先级的线程，运行于具有优先权的平台，这与运行于无优先级的平台不同。一个线程通过 Thread.NORM_PRIORITY 设置了高于普通优先级两级的级数，另一线程设置的优先级则低于普通级两级。两线程被启动并允许运行10秒。每个线程执行一个循环，记录反复的次数。10秒后，主线程终止了两线程。每个线程经过循环的次数被显示。

```java
// Demonstrate thread priorities.
class clicker implements Runnable {
     int click = 0;
    Thread t;
    private volatile boolean running = true;
    public clicker(int p) {
        t = new Thread(this);
        t.setPriority(p);
    }

    public void run() {
        while (running) {
            click++;
        }
    }

    public void stop() {
        running = false;
    }

    public void start() {
        t.start();
    }
}

class HiLoPri {
    public static void main(String args[]) {
        Thread.currentThread().setPriority(Thread.MAX_PRIORITY);
        clicker hi = new clicker(Thread.NORM_PRIORITY + 2);
        clicker lo = new clicker(Thread.NORM_PRIORITY - 2);
        lo.start();
        hi.start();
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted.");
        }
        lo.stop();
        hi.stop();
        // Wait for child threads to terminate.
        try {
            hi.t.join();
            lo.t.join();
        } catch (InterruptedException e) {
            System.out.println("InterruptedException caught");
        }

        System.out.println("Low-priority thread: " + lo.click);
        System.out.println("High-priority thread: " + hi.click);
    }
}
```

该程序在 Windows 98 下运行的输出：
Low-priority thread: 4408112
High-priority thread: 589626904
表明线程确实上下转换，甚至既不屈从于 CPU，也不被输入输出阻塞。优先级高的线程获得大约90%的CPU时间。

当然，该程序的精确的输出结果依赖于你的 CPU 的速度和运行的其他任务的数量。当同样的程序运行于无优先级的系统，将会有不同的结果。

上述程序还有个值得注意的地方。注意 running 前的关键字 volatile。尽管 volatile 在下章会被很仔细的讨论，用在此处以确保 running 的值在下面的循环中每次都得到验证。
```java
while (running) {
	click++;
}
```

如果不用 volatile，Java 可以自由的优化循环：running 的值被存在 CPU 的一个寄存器中，
每次重复不一定需要复检。volatile 的运用阻止了该优化，告知 Java running 可以改变，改变方式并不以直接代码形式显示。

## 线程同步

当两个或两个以上的线程需要共享资源，它们需要某种方法来确定资源在某一刻仅被一个线程占用。达到此目的的过程叫做同步（synchronization）。像你所看到的，Java 为此提供了独特的，语言水平上的支持。

同步的关键是管程（也叫信号量semaphore）的概念。管程是一个互斥独占锁定的对象，或称互斥体（mutex）。在给定的时间，仅有一个线程可以获得管程。当一个线程需要锁定，它必须进入管程。所有其他的试图进入已经锁定的管程的线程必须挂起直到第一个线程退出管程。这些其他的线程被称为等待管程。一个拥有管程的线程如果愿意的话可以再次进入相同的管程。

如果你用其他语言例如 C或 C++ 时用到过同步，你会知道它用起来有一点诡异。这是因为很多语言它们自己不支持同步。相反，对同步线程，程序必须利用操作系统源语。幸运的是 Java 通过语言元素实现同步，大多数的与同步相关的复杂性都被消除。

你可以用两种方法同步化代码。两者都包括 synchronized 关键字的运用，下面分别说明这两种方法。

### 使用同步方法

Java 中同步是简单的，因为所有对象都有它们与之对应的隐式管程。进入某一对象的管程，就是调用被 synchronized 关键字修饰的方法。当一个线程在一个同步方法内部，所有试图调用该方法（或其他同步方法）的同实例的其他线程必须等待。为了退出管程，并放弃对对象的控制权给其他等待的线程，拥有管程的线程仅需从同步方法中返回。

为理解同步的必要性，让我们从一个应该使用同步却没有用的简单例子开始。下面的程序有三个简单类。首先是 Callme，它有一个简单的方法 call()。call() 方法有一个名为 msg 的 String 参数。该方法试图在方括号内打印 msg 字符串。有趣的事是在调用 call() 打印左括号和 msg 字符串后，调用 Thread.sleep(1000)，该方法使当前线程暂停1秒。

下一个类的构造函数 Caller，引用了 Callme 的一个实例以及一个 String，它们被分别存在 target 和 msg 中。构造函数也创建了一个调用该对象的run( )方法的新线程。该线程立即启动。Caller 类的 run() 方法通过参数 msg 字符串调用 Callme 实例 target 的 call() 方法。最后，Synch 类由创建 Callme 的一个简单实例和 Caller 的三个具有不同消息字符串的实例开始。

Callme的同一实例传给每个Caller实例。
```java 没有同步
class Callme {
    void call(String msg) {
        System.out.print("[" + msg);
        try {
            Thread.sleep(1000);
        } catch(InterruptedException e) {
            System.out.println("Interrupted");
       }
       System.out.println("]");
    }
}

class Caller implements Runnable {
    String msg;
    Callme target;
    Thread t;
    public Caller(Callme targ, String s) {
        target = targ;
        msg = s;
        t = new Thread(this);
        t.start();
    }
    public void run() {
        target.call(msg);
    }
}

class Synch {
    public static void main(String args[]) {
        Callme target = new Callme();
        Caller ob1 = new Caller(target, "Hello");
        Caller ob2 = new Caller(target, "Synchronized");
        Caller ob3 = new Caller(target, "World");
        // wait for threads to end
        try {
          ob1.t.join();
          ob2.t.join();
          ob3.t.join();
       } catch(InterruptedException e) {
          System.out.println("Interrupted");
       }
    }
}

运行：
Hello[Synchronized[World]
]
]
```

在本例中，通过调用 sleep()，call() 方法允许执行转换到另一个线程。该结果是三个消息字符串的混合输出。该程序中，没有阻止三个线程同时调用同一对象的同一方法的方法存在。这是一种竞争，因为三个线程争着完成方法。例题用 sleep() 使该影响重复和明显。在大多数情况，竞争是更为复杂和不可预知的，因为你不能确定何时上下文转换会发生。这使程序时而运行正常时而出错。

为达到上例所想达到的目的，必须有权连续的使用 call()。也就是说，在某一时刻，必须限制只有一个线程可以支配它。为此，你只需在 call() 定义前加上关键字 synchronized，如下：
```java
class Callme {
    synchronized void call(String msg) {
        ...
```

这防止了在一个线程使用 call() 时其他线程进入 call()。在 synchronized 加到 call() 前面以后，程序输出如下：
[Hello]
[Synchronized]
[World]

任何时候在多线程情况下，你有一个方法或多个方法操纵对象的内部状态，都必须用 synchronized 关键字来防止状态出现竞争。记住，一旦线程进入实例的同步方法，没有其他线程可以进入相同实例的同步方法。然而，该实例的其他不同步方法却仍然可以被调用。

### 同步语句

尽管在创建的类的内部创建同步方法是获得同步的简单和有效的方法，但它并非在任何时候都有效。这其中的原因，请跟着思考。假设你想获得不为多线程访问设计的类对象的同步访问，也就是，该类没有用到 synchronized 方法。而且，该类不是你自己，而是第三方创建的，你不能获得它的源代码。这样，你不能在相关方法前加 synchronized 修饰符。怎样才能使该类的一个对象同步化呢？很幸运，解决方法很简单：你只需将对这个类定义的方法的调用放入一个 synchronized 块内就可以了。

下面是 synchronized 语句的普通形式：
```java
synchronized(object) {
    // statements to be synchronized
}
```

其中，object 是被同步对象的引用。如果你想要同步的只是一个语句，那么不需要花括号。一个同步块确保对 object 成员方法的调用仅在当前线程成功进入 object 管程后发生。

下面是前面程序的修改版本，在 run() 方法内用了同步块：
```java
// This program uses a synchronized block.
class Callme {
    void call(String msg) {
        System.out.print("[" + msg);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            System.out.println("Interrupted");
        }
        System.out.println("]");
    }
}

class Caller implements Runnable {
    String msg;
    Callme target;
    Thread t;
    public Caller(Callme targ, String s) {
        target = targ;
        msg = s;
        t = new Thread(this);
        t.start();
    }

    // synchronize calls to call()
    public void run() {
        synchronized(target) { // synchronized block
            target.call(msg);
        }
    }
}

class Synch1 {
    public static void main(String args[]) {
        Callme target = new Callme();
        Caller ob1 = new Caller(target, "Hello");
        Caller ob2 = new Caller(target, "Synchronized");
        Caller ob3 = new Caller(target, "World");

        // wait for threads to end
        try {
            ob1.t.join();
            ob2.t.join();
            ob3.t.join();
        } catch(InterruptedException e) {
            System.out.println("Interrupted");
        }
    }
}
```

这里，call() 方法没有被 synchronized 修饰，而 synchronized 是在 Caller 类的 run() 方法中声明的。这可以得到上例中同样正确的结果，因为每个线程运行前都等待先前的一个线程结束。

## 线程间通信

上述例题无条件的阻塞了其他线程异步访问某个方法。Java 对象中隐式管程的应用是很强大的，但是你可以通过进程间通信达到更微妙的境界。这在 Java 中是尤为简单的。

像前面所讨论过的，多线程通过把任务分成离散的和合乎逻辑的单元代替了事件循环程序。线程还有第二优点：它远离了轮询。轮询通常由重复监测条件的循环实现。一旦条件成立，就要采取适当的行动。这浪费了CPU时间。举例来说，考虑经典的序列问题，当一个线程正在产生数据而另一个程序正在消费它。为使问题变得更有趣，假设数据产生器必须等待消费者完成工作才能产生新的数据。在轮询系统，消费者在等待生产者产生数据时会浪费很多 CPU 周期。一旦生产者完成工作，它将启动轮询，浪费更多的CPU时间等待消费者的工作结束，如此下去。很明显，这种情形不受欢迎。

为避免轮询，Java 包含了通过 wait()，notify() 和 notifyAll() 方法实现的一个进程间通信机制。这些方法在对象中是用 final 方法实现的，所以所有的类都含有它们。这三个方法仅在 synchronized 方法中才能被调用。尽管这些方法从计算机科学远景方向上来说具有概念的高度先进性，

实际中用起来是很简单的：

wait()：告知被调用的线程放弃管程进入睡眠直到其他线程进入相同管程并且调用 notify()。
notify()：恢复相同对象中第一个调用 wait() 的线程。
notifyAll()：恢复相同对象中所有调用 wait() 的线程。具有最高优先级的线程最先运行。

这些方法在 Object 中被声明，如下所示：
```java
final void wait() throws InterruptedException
final void notify()
final void notifyAll()
```

wait() 存在的另外的形式允许你定义等待时间。

下面的例子程序错误的实行了一个简单生产者/消费者的问题。它由四个类组成：Q，设法获得同步的序列；Producer，产生排队的线程对象；Consumer，消费序列的线程对象；以及 PC，创建单个 Q，Producer 和 Consumer 的小类。
```java
// An incorrect implementation of a producer and consumer.
class Q {
    int n;
    synchronized int get() {
        System.out.println("Got: " + n);
        return n;
    }
    synchronized void put(int n) {
        this.n = n;
        System.out.println("Put: " + n);
    }
}
class Producer implements Runnable {
    Q q;
    Producer(Q q) {
        this.q = q;
        new Thread(this, "Producer").start();
    }
    public void run() {
        int i = 0;
        while(true) {
            q.put(i++);
        }
    }
}
class Consumer implements Runnable {
    Q q;
    Consumer(Q q) {
        this.q = q;
        new Thread(this, "Consumer").start();
    }
    public void run() {
        while(true) {
           q.get();
        }
    }
}
class PC {
    public static void main(String args[]) {
        Q q = new Q();
        new Producer(q);
        new Consumer(q);
        System.out.println("Press Control-C to stop.");
    }
}
```

尽管 Q 类中的 put() 和 get() 方法是同步的，没有东西阻止生产者超越消费者，也没有东西阻止消费者消费同样的序列两次。这样，你就得到下面的错误输出（输出将随处理器速度和装载的任务而改变）：
Put: 1
Got: 1
Got: 1
Got: 1
Got: 1
Got: 1
Put: 2
Put: 3
Put: 4
Put: 5
Put: 6
Put: 7
Got: 7
生产者生成1后，消费者依次获得同样的1五次。生产者在继续生成2到7，消费者没有机会获得它们。

用 Java 正确的编写该程序是用 wait() 和 notify() 来对两个方向进行标志，如下所示：
```java
// A correct implementation of a producer and consumer.
class Q {
    int n;
    boolean valueSet = false;
    synchronized int get() {
        if(!valueSet)
            try {
                wait();
            } catch(InterruptedException e) {
                System.out.println("InterruptedException caught");
            }
            System.out.println("Got: " + n);
            valueSet = false;
            notify();
            return n;
        }
        synchronized void put(int n) {
            if(valueSet)
            try {
                wait();
            } catch(InterruptedException e) {
                System.out.println("InterruptedException caught");
            }
            this.n = n;
            valueSet = true;
            System.out.println("Put: " + n);
            notify();
        }
    }
    class Producer implements Runnable {
        Q q;
        Producer(Q q) {
        this.q = q;
        new Thread(this, "Producer").start();
    }
    public void run() {
        int i = 0;
        while(true) {
            q.put(i++);
        }
    }
}
class Consumer implements Runnable {
    Q q;
    Consumer(Q q) {
        this.q = q;
        new Thread(this, "Consumer").start();
    }
    public void run() {
        while(true) {
            q.get();
        }
    }
}
class PCFixed {
    public static void main(String args[]) {
        Q q = new Q();
        new Producer(q);
        new Consumer(q);
        System.out.println("Press Control-C to stop.");
    }
}
```

内部 get(), wait() 被调用。这使执行挂起直到 Producer 告知数据已经预备好。这时，内部 get() 被恢复执行。获取数据后，get() 调用 notify() 。这告诉 Producer 可以向序列中输入更多数据。在 put() 内，wait() 挂起执行直到 Consumer 取走了序列中的项目。当执行再继续，下一个数据项目被放入序列，notify() 被调用，这通知 Consumer 它应该移走该数据。

下面是该程序的输出，它清楚的显示了同步行为：
Put: 1
Got: 1
Put: 2
Got: 2
Put: 3
Got: 3
Put: 4
Got: 4
Put: 5
Got: 5

## 线程死锁

需要避免的与多任务处理有关的特殊错误类型是死锁（deadlock）。死锁发生在当两个线程对一对同步对象有循环依赖关系时。例如，假定一个线程进入了对象 X 的管程而另一个线程进入了对象 Y 的管程。如果 X 的线程试图调用 Y 的同步方法，它将像预料的一样被锁定。而 Y 的线程同样希望调用 X 的一些同步方法，线程永远等待，因为为到达 X，必须释放自己的 Y 的锁定以使第一个线程可以完成。死锁是很难调试的错误，因为：

- 通常，它极少发生，只有到两线程的时间段刚好符合时才能发生。
- 它可能包含多于两个的线程和同步对象（也就是说，死锁在比刚讲述的例子有更多复杂的事件序列的时候可以发生）。

为充分理解死锁，观察它的行为是很有用的。下面的例子生成了两个类，A 和 B，分别有 foo() 和 bar() 方法。这两种方法在调用其他类的方法前有一个短暂的停顿。主类，名为 Deadlock，创建了 A 和 B 的实例，然后启动第二个线程去设置死锁环境。foo() 和 bar() 方法使用 sleep() 强迫死锁现象发生。
```java
// An example of deadlock.
class A {
    synchronized void foo(B b) {
        String name = Thread.currentThread().getName();
        System.out.println(name + " entered A.foo");
        try {
            Thread.sleep(1000);
        } catch(Exception e) {
            System.out.println("A Interrupted");
        }
        System.out.println(name + " trying to call B.last()");
        b.last();
    }
    synchronized void last() {
        System.out.println("Inside A.last");
    }
}
class B {
    synchronized void bar(A a) {
        String name = Thread.currentThread().getName();
        System.out.println(name + " entered B.bar");
        try {
            Thread.sleep(1000);
        } catch(Exception e) {
            System.out.println("B Interrupted");
        }
        System.out.println(name + " trying to call A.last()");
        a.last();
    }
    synchronized void last() {
        System.out.println("Inside A.last");
    }
}
class Deadlock implements Runnable {
    A a = new A();
    B b = new B();
    Deadlock() {
        Thread.currentThread().setName("MainThread");
        Thread t = new Thread(this, "RacingThread");
        t.start();
        a.foo(b); // get lock on a in this thread.
        System.out.println("Back in main thread");
    }
    public void run() {
        b.bar(a); // get lock on b in other thread.
        System.out.println("Back in other thread");
    }
    public static void main(String args[]) {
        new Deadlock();
    }
}

运行：
MainThread entered A.foo
RacingThread entered B.bar
MainThread trying to call B.last()
RacingThread trying to call A.last()
```

因为程序死锁，你需要按 CTRL + C 来结束程序。你会看到 RacingThread 在等待管程 A 时占用管程 B，同时，MainThread 占用 A 等待 B。该程序永远都不会结束。

## 线程的挂起、恢复和终止

暂略

# IO 操作

暂略

# 网络编程

暂略

# 反射

暂时先用简单例子帮助理解。

现在有两个业务类：

```java
package reflection;

class Service1 {
    public void doService1(int a, int b) {
        System.out.println("业务方法1，加法");
        System.out.printf("a x b = %d", a x b);
    }
}
```

```java
package reflection;

class Service2 {
    public void doService2(int a, int b) {
        System.out.println("业务方法2，乘法");
        System.out.printf("a x b = %d", a x b);
    }
}
```

如何从第1个业务方法切换到第2个业务方法呢？

不使用反射：

修改代码，重新编译运行：

```java
package reflection;

public class Test {
    public static void main(String[] args) {
        int a = 1, b = 2;
        // 不用业务1了，注释掉1，然后重新编译运行
        //new Service1().doService1(a, b);
        new Service2().doService2(a, b);
    }
}
```

使用反射：

首先准备一个配置文件 A.properties，放在src目录下。
里面存放：类的名称和要调用的方法名。

```txt A.properties
class=reflection.Service1
method=doService1
```

在测试类 Test 中，首先取出类名称和方法名，然后通过反射去调用这个方法：

```java
package reflection;

import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Properties;

public class Test {
    public static void main(String[] args) throws Exception {
        // 从 A.properties 中获取类名称和方法名称
        File springConfigFile = new File("src/A.properties");
        Properties springConfig= new Properties();
        springConfig.load(new FileInputStream(springConfigFile));
        String className = (String) springConfig.get("class");
        String methodName = (String) springConfig.get("method");

        // 根据类名称获取类对象
        Class clazz = Class.forName(className);
        // 根据方法名称，获取方法对象
        Method method = clazz.getMethod(methodName, int.class, int.class);
        // 获取构造器
        Constructor constructor = clazz.getConstructor();
        // 根据构造器，实例化出对象
        Object service = constructor.newInstance();
        int a = 1, b = 2;
        // 调用对象的指定方法
        method.invoke(service, a, b);
    }
}
```

当需要从调用第1个业务方法，切换到调用第2个业务方法的时候，不需要修改一行代码，也不需要重新编译，只需要修改配置文件 A.properties，重新运行即可。
