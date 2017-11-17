---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/offer_index.png'
category: 学习
date: 2017-11-17
title: 和为S的两个数字
tags:
  - 剑指offer
  - java
---

#### 介绍

题目描述

	输入一个递增排序的数组和一个数字S，在数组中查找两个数，使它们的和正好是S

	如果有多对数字的和等于S，输出两个数的乘积最小的

输出描述

	对应每个测试案例，输出两个数，小的先输出

#### 方法 1：双指针

数组头和尾分别设置指针

第一次匹配到的两个数即是乘积最小的两个数

设头尾指针对应值的和为 K

若 K 小于 S，头指针后移

若 K 大于 S，尾指针前移

```java

```