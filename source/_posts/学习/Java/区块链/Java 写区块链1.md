---
title: Java 写区块链1
date: 2018-12-2
category: Java
tags: 区块链
---

本文参考：
[用Java创建你的第一个区块链-part1](http://niocoder.com/2018/03/10/%E7%94%A8Java%E5%88%9B%E5%BB%BA%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8C%BA%E5%9D%97%E9%93%BE-part1/)
[基于Java语言构建区块链（一）—— 基本原型](https://wangwei.one/posts/build-blockchain-in-java-base-prototype.html)
[工作量证明](https://www.jianshu.com/p/d8c8fe7ec2cb)

区块数据结构：

![区块链数据结构](区块链数据结构.png)

区块链类似链表，主要包括三个部分：自己的数字签名，前一区块的数字签名，还有需要加密的数据（交易信息）。

自身的 Hash 值（即数字签名），其通过前一区块的 Hash 值和数据 Data 等计算出来的。
比如：hash = sha256(preHash + data + ...)



如果前一区块的数据被篡改，那么前一区块的 Hash 值也会同样发生变化，这样也就导致了所有后续区块的 Hash 值被篡改，从而使整条区块链遭到破坏。所以需要计算和比对 Hash 值来检查当前的区块链是否有效，避免数据被恶意篡改。
