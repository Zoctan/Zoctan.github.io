---
title: 获取 request 及其线程安全性分析
date: 2018-07-25
category: Spring
---

原文[Spring中获取request的几种方法，及其线程安全性分析](https://www.cnblogs.com/kismetv/p/8757260.html)

# 前言

本文将介绍在使用 Spring MVC 开发中，获取 request 对象的几种方法，并讨论其线程安全性。

# 概述

在使用 Spring MVC 开发 Web 系统时，经常需要在处理请求时使用 request 对象。比如：获取客户端 IP 地址、请求的 URL、header 中的属性（Cookie、授权信息）、body 中的数据等。

由于在 Spring MVC 中，处理请求的 Controller、Service 等对象都是单例的，因此获取 request 对象时最需要注意的问题，便是 request 对象是否线程安全：当有大量并发请求时，能否保证不同请求/线程中使用不同的 request 对象。

# 注意事项

前面所说的“在处理请求时”使用 request 对象，大体是在两类地方使用：

1. 在 Spring 的 Bean 中使用 request 对象：既包括 Controller、Service、Repository 等 MVC 的 Bean，也包括了 Component 等普通的 Spring Bean。为了方便说明，本文中 Spring 中的 Bean 一律简称为Bean。

2. 在非 Bean 中使用 request 对象：如普通的 Java 对象的方法中使用，或在类的静态方法中使用。

本文讨论是围绕代表请求的 request 对象展开的，但所用方法同样适用于 response 对象、InputStream/Reader、OutputStream/ Writer 等；其中 InputStream/Reader 可以读取请求中的数据，OutputStream/Writer 可以向响应写入数据。

最后，获取 request 对象的方法与 Spring 及 MVC 的版本也有关系；本文基于 Spring4 进行讨论，且所做的实验都是使用4.1.1版本。

# 如何测试线程安全性

测试的基本思路：模拟客户端大量并发请求，然后在服务器判断这些请求是否使用了相同的 request 对象，最直观的方式是打印出 request 对象的地址，如果相同则说明使用了相同的对象。

存在的问题：
在几乎所有 Web 服务器的实现中，都使用了线程池，这样就导致先后到达的两个请求，可能由同一个线程处理。在前一个请求处理完成后，线程池收回该线程，并将该线程重新分配给了后面的请求。而在同一线程中，使用的 request 对象很可能是同一个（地址相同，属性不同）。因此即便是对于线程安全的方法，不同的请求使用的 request 对象地址也可能相同。

为了避免上面的问题，有两种办法：
1. 在请求处理过程中使线程休眠几秒，这样可以让每个线程工作的时间足够长，从而避免同一个线程分配给不同的请求。
2. 使用 request 的其他属性（如参数、header、body等）作为 request 是否线程安全的依据，因为即便不同的请求先后使用了同一个线程（request 对象地址也相同），只要使用不同的属性分别构造了两次 request 对象，那么 request 对象的使用就是线程安全的。

本文使用第二种方法进行测试。

客户端测试代码（创建1000个线程分别发送请求）：

```java
public class Test {
    public static void main(String[] args) throws Exception {
        // 前缀
        String prefix = UUID.randomUUID().toString().replaceAll("-", "") + "::";
        // 启动1000个线程发送请求
        for (int i = 0; i < 1000; i++) {
            final String value = prefix + i;
            new Thread() {
                @Override
                public void run() {
                    try {
                        CloseableHttpClient httpClient = HttpClients.createDefault();
                        HttpGet httpGet = new HttpGet("http://localhost:8080/test?key=" + value);
                        httpClient.execute(httpGet);
                        httpClient.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }.start();
        }
    }
}
```

服务器中 Controller 代码（暂时省略了获取request对象的代码）：

```java
@Controller
public class TestController {
 
    // 存储已有参数，用于判断参数是否重复，从而判断线程是否安全
    public static Set<String> set = new ConcurrentSkipListSet<>();
 
    @RequestMapping("/test")
    public void test() throws InterruptedException {
         
        // …………………………通过某种方式获得了request对象………………………………
 
        String value = request.getParameter("key");
        // 判断线程安全
        if (set.contains(value)) {
            System.out.println(value + "\t重复出现，request 并发不安全！");
        } else {
            System.out.println(value);
            set.add(value);
        }
        
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```

# Controller 参数

```java
@Controller
public class TestController {
    @RequestMapping("/test")
    public void test(HttpServletRequest request) throws InterruptedException {
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```	

该方法实现的原理：Controller 方法开始处理请求时，Spring 会将 request 对象赋值到方法参数中。

> 除了 request 对象，可以通过这种方法获取的参数还有很多：https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-methods

**线程安全性**

测试结果：线程安全

分析：此时 request 对象是方法参数，相当于局部变量，毫无疑问是线程安全的。

**缺点**

1. request 对象冗余，如果多个 Controller 方法中都需要 request 对象，那么在每个方法中都需要添加一遍 request 参数。

2. request 对象的获取只能从 Controller 开始，如果使用 request 对象的地方在函数调用层级比较深的地方，那么整个调用链上的所有方法都需要添加 request 参数。

实际上，在整个请求处理的过程中，request 对象是贯穿始终的；也就是说，除了定时器等特殊情况，request 对象相当于线程内部的一个全局变量。而该方法，相当于将这个全局变量，传来传去。

# 自动注入

```java
@Controller
public class TestController{
    // 自动注入request
    @Autowired
    private HttpServletRequest request;
     
    @RequestMapping("/test")
    public void test() throws InterruptedException{
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```

**线程安全性**

测试结果：线程安全

分析：在 Spring 中，Controller 的 scope 是 singleton（单例），也就是说在整个 Web 中，只有一个 TestController；但是其中注入的 request 却是线程安全的，原因：使用这种方式，当 Bean（TestController）初始化时，Spring 并没有注入一个 request 对象，而是注入了一个 proxy（代理）；当 Bean 中需要使用 request 对象时，通过该代理获取 request 对象。

通过具体的代码对这一实现进行说明，在上述代码中加入断点，查看 request 对象的属性：

![proxy](proxy.png)

可以看出 request 实际上是一个代理：代理的实现参见 AutowireUtils 的内部类 ObjectFactoryDelegatingInvocationHandler：

```java
/**
 * Reflective InvocationHandler for lazy access to the current target object.
 */
private static class ObjectFactoryDelegatingInvocationHandler implements InvocationHandler, Serializable {
    private final ObjectFactory<?> objectFactory;
    public ObjectFactoryDelegatingInvocationHandler(ObjectFactory<?> objectFactory) {
        this.objectFactory = objectFactory;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // ……
        try {
            // 代理实现核心代码
            return method.invoke(this.objectFactory.getObject(), args);
        }
        catch (InvocationTargetException ex) {
            throw ex.getTargetException();
        }
    }
}
```

可以看出实际上是调用 objectFactory.getObject() 生成的 request 对象。

继续观察上图发现 objectFactory 的类型为 WebApplicationContextUtils 的内部类 RequestObjectFactory：

```java
/**
 * Factory that exposes the current request object on demand.
 */
private static class RequestObjectFactory implements ObjectFactory<ServletRequest>, Serializable {
    @Override
    public ServletRequest getObject() {
        return currentRequestAttributes().getRequest();
    }
    @Override
    public String toString() {
        return "Current HttpServletRequest";
    }
}
```

其中，要获得 request 对象需要先调用 currentRequestAttributes() 方法获得 RequestAttributes 对象：

```java
/**
 * Return the current RequestAttributes instance as ServletRequestAttributes.
 */
private static ServletRequestAttributes currentRequestAttributes() {
    RequestAttributes requestAttr = RequestContextHolder.currentRequestAttributes();
    if (!(requestAttr instanceof ServletRequestAttributes)) {
        throw new IllegalStateException("Current request is not a servlet request");
    }
    return (ServletRequestAttributes) requestAttr;
}
```

生成 RequestAttributes 对象的核心代码在类 RequestContextHolder 类：

```java
public abstract class RequestContextHolder {
    public static RequestAttributes currentRequestAttributes() throws IllegalStateException {
        RequestAttributes attributes = getRequestAttributes();
        // …………
        return attributes;
    }
    public static RequestAttributes getRequestAttributes() {
        RequestAttributes attributes = requestAttributesHolder.get();
        if (attributes == null) {
            attributes = inheritableRequestAttributesHolder.get();
        }
        return attributes;
    }
    private static final ThreadLocal<RequestAttributes> requestAttributesHolder =
            new NamedThreadLocal<RequestAttributes>("Request attributes");
    private static final ThreadLocal<RequestAttributes> inheritableRequestAttributesHolder =
            new NamedInheritableThreadLocal<RequestAttributes>("Request context");
}
```

可以看出，生成的 RequestAttributes 对象是线程局部变量（ThreadLocal），因此 request 对象也是线程局部变量，这就保证了 request 对象的线程安全性。

**优点**

1. 减少代码冗余。（当然如果每个 Controller 都需要的话还是很冗余）

2. 注入不限于 Controller，还可以在任何 Bean 中注入，包括 Service、Repository 及普通的 Bean。

3. 注入的对象不限于 request，还可以注入其他 scope 为 request 或 session 的对象，如 response 对象、session 对象等。

# 基类中自动注入

与自动注入相比，将注入部分代码放入到了基类：

```java
public class BaseController {
    @Autowired
    protected HttpServletRequest request;     
}
```

BaseController 的两个派生类（同时测试代码需要修改为向2个 URL 发送大量并发请求）：

```java
@Controller
public class TestController extends BaseController {
 
    // 存储已有参数，用于判断参数value是否重复，从而判断线程是否安全
    public static Set<String> set = new ConcurrentSkipListSet<>();
 
    @RequestMapping("/test")
    public void test() throws InterruptedException {
        String value = request.getParameter("key");
        // 判断线程安全
        if (set.contains(value)) {
            System.out.println(value + "\t重复出现，request并发不安全！");
        } else {
            System.out.println(value);
            set.add(value);
        }
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
 
@Controller
public class Test2Controller extends BaseController {
    @RequestMapping("/test2")
    public void test2() throws InterruptedException {
        String value = request.getParameter("key");
        // 判断线程安全（与TestController使用一个set进行判断）
        if (TestController.set.contains(value)) {
            System.out.println(value + "\t重复出现，request并发不安全！");
        } else {
            System.out.println(value);
            TestController.set.add(value);
        }
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```

**线程安全性**

测试结果：线程安全

分析：当创建不同的派生类对象时，基类中的域（这里是注入的 request）在不同的派生类对象中会占据不同的内存空间，也就是说将注入 request 的代码放在基类中对线程安全性没有任何影响。

**优点**

和自动注入一样，但避免了在不同的 Controller 中重复注入 request。

**缺点**

单继承的缺点。

# 手动调用

```java
@Controller
public class TestController {
    @RequestMapping("/test")
    public void test() throws InterruptedException {
        HttpServletRequest request = ((ServletRequestAttributes) (RequestContextHolder.currentRequestAttributes())).getRequest();
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```

**线程安全性**

测试结果：线程安全

分析：与自动注入类似，只不过本方法通过手动方法调用实现。

**优点**

可以在非 Bean 中直接获取。

**缺点**

如果使用的地方较多，代码非常繁琐；因此可以与其他方法配合使用。

# @ModelAttribute

下面这种方法及其变种（变种：将 request 和 bindRequest 放在子类中）在网上经常见到：

```java
@Controller
public class TestController {
    private HttpServletRequest request;
    @ModelAttribute
    public void bindRequest(HttpServletRequest request) {
        this.request = request;
    }
    @RequestMapping("/test")
    public void test() throws InterruptedException {
        // 模拟程序执行了一段时间
        Thread.sleep(1000);
    }
}
```

> @ModelAttribute 注解在 Controller 方法中作用：Controller 中的每个 @RequestMapping 方法执行前，该方法都会执行。

**线程安全性**

测试结果：线程不安全

分析：虽然 bindRequest() 中的参数 request 本身是线程安全的，但由于 TestController 是单例的，request 作为 TestController 的一个域，无法保证线程安全。
