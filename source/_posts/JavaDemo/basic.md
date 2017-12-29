---
title: 基础概念
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

方法重载：同一个类中的多个方法有相同的名字，但它们的参数列表不同。

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
short      | Short
int      | Integer
long      | Long
char      | Character
float      | Float
double      | Double
boolean      | Boolean

基本类型和对应的包装类相互装换：
- 装箱：由基本类型向对应的包装类转换，如把 int 包装成 Integer 类的对象；
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

```java // Java 1.5(5.0) 之后系统自动拆箱装箱
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

## super关键字（用来表示父类）

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
- 被覆盖的方法不能是final类型，因为final修饰的方法是无法覆盖的。
- 被覆盖的方法不能为private，否则在其子类中只是新定义了一个方法，并没有对其进行覆盖。
- 被覆盖的方法不能为static。如果父类中的方法为静态的，而子类中的方法不是静态的，但是两个方法除了这一点外其他都满足覆盖条件，那么会发生编译错误；反之亦然。即使父类和子类中的方法都是静态的，并且满足覆盖条件，但是仍然不会发生覆盖，因为静态方法是在编译的时候把静态方法和类的引用类型进行匹配。

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


静态方法不能操作对象，所以不能在静态方法中访问实例变量，只能访问自身类的静态变量。

以下情形可以使用静态方法：
- 方法不需要访问对象状态，其所需参数都是通过显式参数提供（例如 Math.pow()）。
- 方法只需要访问类的静态变量。

总结：
- 静态方法只能访问静态变量；
- 静态方法不能够直接调用非静态方法；
- 如访问控制权限允许，静态变量和静态方法也可以通过对象来访问，但不被推荐；
- 静态方法中不存在当前对象，因而不能使用 this，当然也不能使用 super；
- 静态方法不能被非静态方法覆盖；
- 构造方法不允许声明为 static 的；
- 局部变量不能使用static修饰。

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

## 抽象类的概念和使用（abstract）

在自上而下的继承层次结构中，位于上层的类更具有通用性，甚至可能更加抽象。

从某种角度看，祖先类更加通用，它只包含一些最基本的成员，人们只将它作为派生其他类的基类，而不会用来创建对象。甚至，你可以只给出方法的定义而不实现，由子类根据具体需求来具体实现。

这种只给出定义而不具体实现的方法被称为抽象方法，抽象方法是没有方法体的，在代码的表达上就是没有“{}”。包含一个或多个抽象方法的类也必须被声明为抽象类。


# 常用类

# 集合

# 异常

# IO

# 多线程

# 网络编程

# 反射
