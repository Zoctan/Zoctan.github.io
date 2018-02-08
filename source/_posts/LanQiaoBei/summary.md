---
title: 蓝桥杯2015-2017省赛题目总结
date: 2018-1-28
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 前记

刷了这几年的题，总体还是比较简单的，就是有些填空题比较坑，总结一下题型和技巧。

不要注意scanner.close();等代码规范，以免出现意想不到的事。毕竟不是项目，代码丑也没人看。

# 题型

结果填空、代码填空、程序设计

## 结果填空

先看懂题目，确定暴力能出结果的直接暴力跑。

有些就是小学初中的题目，套公式跑，减少出错几率。

### Excel

有些题目用编程很麻烦的，比如2017年的购物单，这种数据并列起来可以用Excel算：

1. 复制数据到word里

{% asset_img Excel-1.png 1 %}

2. 全部替换没用的数据和多余空格

{% asset_img Excel-2.png 2 %}

{% asset_img Excel-3.png 3 %}

数据之间最好只有1个空格，不然文字转表格时无法分列

3. 全选->插入->表格->文字转换成表格

{% asset_img Excel-4.png 4 %}

默认选项就可以了

{% asset_img Excel-5.png 5 %}

之后再将中文那些替换掉，不够2位的补个0什么的。

4. 打开Excel，复制整个表格过去

{% asset_img Excel-6.png 6 %}

在【等号】后面接上公式，最后向下拉，获得所有数据

{% asset_img Excel-7.png 7 %}

5. 求和

{% asset_img Excel-8.png 8 %}

这样就做完了，熟练office的话，1-2分钟就做完第1题了，而编程起码得5分钟，还不包括处理异常的时间。

### 日期类

日期类问题最好用Java的Calendar类，比如2017年的第1个大题。

涉及到闰年判断，月份判断，很容易做错，直接使用Calendar类判断日期对不对就很快做完了。

```java 日期检查
try {
	Calendar calendar = Calendar.getInstance();
	// 取消宽松，不然日期出错会跳到下一天
	calendar.setLenient(false);
	// 中间的month从0开始，而1表示2月
	calendar.set(2017, 1, 29);
	// get里可以是其他，只要日期错了就无法get
	System.out.println(calendar.get(Calendar.YEAR));
} catch (Exception e) {
	System.out.println(false);
}
```

比如：
高斯出生于：1777年4月30日。
高斯获得博士学位的那天日记上标着：8113，
表示那一天是高斯出生后的第8113天，问年月日？ 1799-7-16

```java
Calendar calendar = Calendar.getInstance();
calendar.set(1777, 4, 30);
calendar.add(calendar.DATE, 8113);
System.out.println(calendar.get(Calendar.YEAR) + "-" + calendar.get(Calendar.MONTH) + "-"+ calendar.get(Calendar.DAY_OF_MONTH));
```

### 其他

有些题目有去重的要求的，比如镜像和旋转，一定要注意排除掉，最好动手画画，确定是题目说的情况。

遇到除法的最好转成乘法，避免转换为浮点数。

## 代码填空

这些题基本就是回溯和动态规划，一般是填1句代码的。

没什么诀窍，复制到IDE里，然后确定基本框架是回溯、动态规划还是普通的递归。

在半懵逼下，多放几个断点，跟着程序走一下，看看能不能找到缺的是什么。

## 程序设计

回溯，动态规划，数据结构，涉及到数学常用定理。

# 总结

好好刷一个月题，重点理解上面说到的内容，拿个省奖是没问题的，去不去得了北京旅游就得看造化了。