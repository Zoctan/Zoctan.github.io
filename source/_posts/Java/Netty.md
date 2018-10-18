---
title: Netty's Hello World
date: 2018-10-11
category: Java
---

[Netty 官网](https://netty.io/index.html)

刚接触 Netty，不太懂这个 NIO 非阻塞，所以跟着文档入门。

可以到[官网](https://netty.io/downloads.html)下载，也可以直接使用 maven 依赖：

```xml
<dependencies>
    <dependency>
        <groupId>io.netty</groupId>
        <artifactId>netty-all</artifactId>
        <version>4.1.30.Final</version>
        <scope>compile</scope>
    </dependency>
</dependencies>
```

# DISCARD 协议

官网的入门示例使用的协议是：[DISCARD](https://tools.ietf.org/html/rfc863)，最简单的协议，因为它只接收数据（然后扔掉……）而不作响应，类似 Linux 下的无底洞 /dev/null。

因为使用的是 DISCARD 协议，所以唯一要做的就是无视所有接收到的数据：

```java
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.CharsetUtil;
import io.netty.util.ReferenceCountUtil;

/**
 * 服务端处理通道
 */
// ChannelInboundHandlerAdapter 是 ChannelInboundHandler 接口的实现，ChannelInboundHandler 提供了各种事件处理的方法供你重写使用
// 当然现在直接继承 ChannelInboundHandlerAdapter 比让你去实现一个接口来得快
public class DiscardServerHandler extends ChannelInboundHandlerAdapter {

    // 无论何时从客户端接收到数据，该方法都会被调用
    // 在这里接收到的数据是 ByteBuf 类型
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        // 默默地扔掉接收到的数据
        // ByteBuf 是一个引用计数对象，在释放时需要明确调用 release 方法
        // 要记住：处理器方法要释放所有传递给它的引用计数对象，比如这里的 ByteBuf
        ((ByteBuf) msg).release();

        // 通常该 channelRead 方法是这样的实现形式：
        /*
        try {
            // Do something with msg
        } finally {
            ReferenceCountUtil.release(msg);
        }
        */
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 出现异常时关闭连接
        // 当然你也可以在关闭连接前发送带有错误码的响应
        cause.printStackTrace();
        ctx.close();
    }
}
```

到目前为止一切正常，我们已经实现了一半的 DISCARD 协议服务端。剩下的工作就是写 main 方法，去启动带有 DiscardServerHandler 处理器的服务端：

```java
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

/**
 * 丢弃所有接收的数据
 */
public class DiscardServer {

    private int port;

    public DiscardServer(int port) {
        this.port = port;
    }

    public void run() throws Exception {
        // NioEventLoopGroup 是一个处理I/O操作的多线程事件轮询
        // Netty 为各种传输需求提供了各种 EventLoopGroup 实现
        // 我们在该例中实现了服务端应用，因此需要用到两个 NioEventLoopGroup
        // 第一个通常叫 boss，接受到来的连接
        // 第二个通常叫 worker，一旦 boss 接受连接并且向 worker 注册该连接，worker 就可以处理已接受的连接通信
        // 有多少线程会被使用和它们会被怎样映射到被创建的 Channels，取决于 EventLoopGroup 的实现和构造器的配置
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workGroup = new NioEventLoopGroup();

        try {
            // ServerBootstrap 是一个建立服务端的帮助类
            // 当然你可以直接使用 Channel 来建立服务端，但请注意这是一个繁琐的过程，大多时候你不需要这么做
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workGroup)
                    // 指定使用 NioServerSocketChannel 类，它被用于实例化一个新的通道去接受到来的连接
                    .channel(NioServerSocketChannel.class)
                    // 这里的处理器会被新接受的通道所评估
                    // ChannelInitializer 是一个特别的处理器，用于帮助用户配置新通道
                    // 可能当你想为新的通道配置 ChannelPipeline，通过添加一些处理器比如上面的 DiscardServerHandler 去实现你的网络应用
                    // 当应用变得复杂起来，你可能要为 pipeline 去添加更多的处理器，最终就是要将这个匿名类提取到顶层类中了
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) {
                            socketChannel.pipeline().addLast(new DiscardServerHandler());
                        }
                    })
                    // 你也可以为通道设置参数
                    // 我们正在写的是 TCP/IP 服务端，所以我们可以设置一些比如 tcpNoDelay 和 keepAlive 的套接字选项
                    // 请参考 api 文档中的 ChannelOption 和 ChannelConfig 实现，里面有关于支持 ChannelOptions 的说明
                    .option(ChannelOption.SO_BACKLOG, 128)
                    // 上面的 option 方法是为 NioServerSocketChannel 所接受的连接服务
                    // 而下面的 childOption 是为 ServerChannel 所接受的 Channels 服务，在这里就是 NioServerSocketChannel
                    .childOption(ChannelOption.SO_KEEPALIVE, true);

            // 绑定端口并开始接受到来的连接
            ChannelFuture channelFuture = serverBootstrap.bind(port).sync();

            // 等待直到服务器套接字关闭
            // 在该例中，这不会发生，但你可以优雅的关闭你的服务器
            channelFuture.channel().closeFuture().sync();
        } finally {
            workGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }

    public static void main(String[] args) throws Exception {
        int port;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        } else {
            port = 9000;
        }
        new DiscardServer(port).run();
    }
}
```

为了能看到效果，改造一下 channelRead 方法，让服务端在接收到消息时能显示出来：

```java
@Override
public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    //((ByteBuf) msg).release();

    ByteBuf buf = (ByteBuf) msg;
    try {
        // 可以直接读
        System.out.print(buf.toString(CharsetUtil.US_ASCII));
        // 也可以循环读
        /*
        while (buf.isReadable()) {
            System.out.print((char) buf.readByte());
            System.out.flush();
        }
        */
    } finally {
        buf.release();
        // 工具类释放也可以
        //ReferenceCountUtil.release(msg);
    }
}
```

为了方便，客户端直接用 telnet 进行测试：

![telnet](telnet.png)

# ECHO 协议

到目前为止，服务端还没有发回过响应（因为是 DISCARD 协议）。

让我们实现 [ECHO](https://tools.ietf.org/html/rfc862) 协议，写一个可以“回音”的服务端。

只要改造一下 channelRead 方法就好了：

```java
@Override
public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
    ctx.write(msg);
    ctx.flush();
}
```

ChannelHandlerContext 的对象提供了各种操作可以让你触发各种 I/O 事件和操作。这里我们调用了 write 方法将收到的消息逐字写回。

注意，这里我们并没有像 DISCARD 例子那样释放收到的消息，因为 Netty 已经在你写回消息时为你自动释放了（和流的概念差不多）。

调用 write 并没有立刻将消息写回，而是在内部缓存起来了，还需要调用 flush 才能写回。你也可以使用更简洁的 writeAndFlush(msg) 方法。
