---
title: 蓝桥杯2015年第6届省赛
date: 2018-1-25
category: 学习
tags:
  - 算法
  - Java
---

# 结果填空

## 三角形面积

如图所示，图中的所有小方格面积都是1。

{% asset_img 1.jpg 三角形面积 %}

那么，图中的三角形面积应该是多少呢？

请填写三角形的面积。不要填写任何多余内容或说明性文字。

手算：

正方形面积：64
左边直角三角形：$\frac{ 8 \times 4 }{ 2 } = 16$
右上角直角三角形：$\frac{ 8 \times 2 }{ 2 } = 8$
右下角直角三角形：$\frac{ 6 \times 4 }{ 2 } = 12$
三角形面积即：64 - 16 - 8 - 12 = 28

## 立方变自身

观察下面的现象,某个数字的立方，按位累加仍然等于自身。
1^3 = 1，1 = 1
8^3  = 512，5 + 1 + 2 = 8
17^3 = 4913，4 + 9 +1 + 3 = 17
...

请你计算包括1，8，17在内，符合这个性质的正整数一共有多少个？ 6

请填写该数字，不要填写任何多余的内容或说明性的文字。

```java 暴力
public class Main {
	public static void main(String args[]) {
		int num = 0;
		for (int i = 1; i < 999999; i++) {
			if (sumEach(i)) {
				num++;
			}
		}
		System.out.println(num);
	}

	private static boolean sumEach(int n) {
		int sum = 0;
		int cube = n * n * n;
		while (cube > 0) {
			sum += cube % 10;
			cube /= 10;
		}
		return sum == n;
	}
}
```

## 三羊献瑞

观察下面的加法算式：

{% asset_img 3.jpg 三羊献瑞 %}

其中，相同的汉字代表相同的数字，不同的汉字代表不同的数字。

请你填写“三羊献瑞”所代表的4位数字（答案唯一），不要填写任何多余内容。1 0 8 5

```java 回溯
public class Main {
	static int[] number = new int[10];
	static int[] anwser = new int[8];

	public static void main(String args[]) {
		backTrack(0);
	}

	static void backTrack(int current) {
		// current 从 0 开始，到 8 时共 9 个数字
		// 而题目只有 9 个数字，故到数组第 8 位时停下
		if (current == 8) {
			// 是否满足题设
			if (isOK()) {
				System.out.println(anwser[4] + " " + anwser[5] + " " + anwser[6] + " " + anwser[1]);
			}
		} else {
			// 尝试填入 0~9 这 10 个数字
			for (int i = 0; i <= 9; i++) {
				// 如果数字已经用过就跳过
				if (number[i] == 1) {
					continue;
				}
				anwser[current] = i;
				number[i] = 1;
				// 尝试填入下一位
				backTrack(current + 1);
				number[i] = 0;
			}
		}
	}

	static boolean isOK() {
		int A = anwser[0] * 1000 + anwser[1] * 100 + anwser[2] * 10 + anwser[3];
		int B = anwser[4] * 1000 + anwser[5] * 100 + anwser[6] * 10 + anwser[1];
		int S = anwser[4] * 10000 + anwser[5] * 1000 + anwser[2] * 100 + anwser[1] * 10 + anwser[7];
		// “三”出现了 2 次，而且在最高位，故不可能为 0
		return anwser[4] != 0 && A + B == S;
	}
}
```

## 加法变乘法

我们都知道：1+2+3+ ... + 49 = 1225
现在要求你把其中两个不相邻的加号变成乘号，使得结果为2015

比如：1+2+3+...+10*11+12+...+27*28+29+...+49 = 2015
就是符合要求的答案。

请你寻找另外一个可能的答案，并把位置靠前的那个乘号左边的数字提交（对于示例，就是提交10）。16

```java
public class Main {
	public static void main(String[] args) {
		for (int i = 1; i < 47; i++) {
			for (int j = i + 2; j < 49; j++) {
				int sum = 1225;
				// 1+2+3+4+5 = 15
				// 1*2+3*4+5 = 19 => 15-(1+2+3+4)+(1*2+3*4)
				sum -= i + (i + 1) + j + (j + 1);
				sum += i * (i + 1) + j * (j + 1);
				if (sum == 2015) {
					System.out.println(i);
				}
			}
		}
	}
}
```

## 牌型种数

小明被劫持到X赌城，被迫与其他3人玩牌。
一副扑克牌（去掉大小王牌，共52张），均匀发给4个人，每个人13张。

这时，小明脑子里突然冒出一个问题：
如果不考虑花色，只考虑点数，也不考虑自己得到的牌的先后顺序，自己手里能拿到的初始牌型组合一共有多少种呢？3598180

分析：
13种不同的牌，每种4张花色，排除花色，就是每种牌可以出现0-4次。

```java 回溯
public class Main {
	private static int have = 0;
	private static int total = 0;

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(total);
	}

	private static void backTrack(int times) {
		// 如果手上拿的牌数 > 13，退出这种状态
		if (have > 13) {
			return;
		}
		// 第 13 次，并且手上也是 13 张牌
		// 应该是牌型的不同数量不会出现同种点数
		if (times == 13) {
			if (have == 13) {
				total++;
			}
		} else {
			for (int i = 0; i <= 4; i++) {
				// 这种牌拿多少张
				// 比如第一次：A 拿 4 张
				have += i;
				// 下一种牌型：2~K
				backTrack(times + 1);
				have -= i;
			}
		}
	}
}
```

## 熊怪吃核桃

森林里有一只熊怪，很爱吃核桃。
不过它有个习惯，每次都把找到的核桃分成相等的两份，吃掉一份，留一份。
如果不能等分，熊怪就会扔掉一个核桃再分。
第二天再继续这个过程，直到最后剩一个核桃了，直接丢掉。

有一天，熊怪发现了1543个核桃，请问，它在吃这些核桃的过程中，一共要丢掉多少个核桃。5

```java
public class Main {
	public static void main(String[] args) {
		int count = 0;
		int n = 1543;
		while (n > 0) {
			if ((n & 1) == 1) {
				n--;
				count++;
			}
			n /= 2;
		}
		System.out.println(count);
	}
}
```

## 星系炸弹

在X星系的广袤空间中漂浮着许多X星人造“炸弹”，用来作为宇宙中的路标。
每个炸弹都可以设定多少天之后爆炸。
比如：阿尔法炸弹2015年1月1日放置，定时为15天，则它在2015年1月16日爆炸。
有一个贝塔炸弹，2014年11月9日放置，定时为1000天，请你计算它爆炸的准确日期。

请填写该日期，格式为 yyyy-mm-dd  即4位年份2位月份2位日期。比如：2015-02-19

2017-8-4

```java
import java.util.Calendar;

public class Main {
	public static void main(String[] args) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(2014, 11, 9);
		calendar.add(Calendar.DATE, 1000);
		System.out.println(calendar.get(Calendar.YEAR) + "-" + calendar.get(Calendar.MONTH) + "-" + calendar.get(Calendar.DATE));
	}
}
```

## 九数分三组

1~9的数字可以组成3个3位数，设为：A,B,C,  现在要求满足如下关系：
B = 2 * A
C = 3 * A

请你写出A的所有可能答案，数字间用空格分开，数字按升序排列。

192 219 273 327

```java
import java.util.LinkedList;
import java.util.List;

public class Main {
	static int[] num = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	static int A, B, C;
	static List<Integer> list = new LinkedList<>();

	public static void main(String[] args) {
		backTrack(0);
		list.stream().forEach(x -> System.out.print(x + " "));
	}

	static void backTrack(int n) {
		if (n == 9) {
			if (isOK()) {
				list.add(A);
			}
		} else {
			for (int i = n; i < 9; i++) {
				swap(i, n);
				backTrack(n + 1);
				swap(i, n);
			}
		}
	}

	static boolean isOK() {
		A = num[0] * 100 + num[1] * 10 + num[2];
		B = num[3] * 100 + num[4] * 10 + num[5];
		C = num[6] * 100 + num[7] * 10 + num[8];
		return B == 2 * A && C == 3 * A;
	}

	static void swap(int i, int j) {
		int tmp = num[i];
		num[i] = num[j];
		num[j] = tmp;
	}
}
```

## 方程整数解

方程: $a^2 + b^2 + c^2 = 1000$

这个方程有整数解吗？有：a,b,c=6,8,30 就是一组解。
你能算出另一组合适的解吗？

请填写该解中最小的数字。10

24 18 10

```java
public class Main {
	public static void main(String[] args) {
		int sqrt = (int) Math.sqrt(1000);
		for (int a = 1; a < sqrt; a++) {
			for (int b = 1; b < a; b++) {
				for (int c = 1; c < b; c++) {
					if (a * a + b * b + c * c == 1000) {
						System.out.println(a + " " + b + " " + c);
					}
				}
			}
		}
	}
}
```

## 奇妙的数字

小明发现了一个奇妙的数字：它的平方和立方正好把0~9的10个数字每个用且只用了一次。

你能猜出这个数字是多少吗？69

```java
public class Main {
	static int[] num = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

	public static void main(String[] args) {
		backTrack(0);
	}

	static void backTrack(int n) {
		if (n == 10) {
			judge();
		} else {
			for (int i = n; i < 10; i++) {
				swap(i, n);
				backTrack(n + 1);
				swap(i, n);
			}
		}
	}

	static void judge() {
		if (num[0] == 0 || num[4] == 0) {
			return;
		}
		// 100：平方位数5、立方位数7，位数和超过10
		// 50：平方位数4、立方位数6，位数和是10
		// 所以 a < 100
		int square = num[0] * 1000 + num[1] * 100 + num[2] * 10 + num[3];
		int cube = num[4] * 100000 + num[5] * 10000 + num[6] * 1000 + num[7] * 100 + num[8] * 10 + num[9];
		int n = (int) Math.sqrt(square);
		int m = (int) Math.cbrt(cube);
		if (n == m && n * n == square && n * n * n == cube) {
			System.out.println(n + " " + square + " " + cube);
			System.exit(0);
		}
	}

	static void swap(int i, int j) {
		int tmp = num[i];
		num[i] = num[j];
		num[j] = tmp;
	}
}
```

## 手链样式

小明有3颗红珊瑚，4颗白珊瑚，5颗黄玛瑙。他想用它们串成一圈作为手链，送给女朋友。

现在小明想知道：如果考虑手链可以随意转动或翻转，一共可以有多少不同的组合样式呢？1170

组合：
不考虑翻转：$[12! / (3! x 4! x 5!)] / 12 = 2310$种
考虑翻转：求出左右对称的情况，将1个A，1个C两边都隔5个，剩下2个A，4个B，4个C，两边对称，即将ABBCC排列，共5!/(2 x 2) = 30种。
结果：30 + (2310 - 30)/2 = 1170

## 立方尾不变

有些数字的立方的末尾正好是该数字本身。
比如：1,4,5,6,9,24,25,....

请你计算一下，在10000以内的数字中（指该数字，并非它立方后的数值），符合这个特征的正整数一共有多少个。36

```java
public class Main {
	public static void main(String[] args) {
		int count = 0;
		for (long i = 1; i <= 10000; i++) {
			int bits = (i + "").length();
			long cube = i * i * i;
			int mod = 1;
			while (bits > 0) {
				mod *= 10;
				bits--;
			}
			if (cube % mod == i) {
				count++;
			}
		}
		System.out.println(count);
	}
}
```

# 代码填空

## 循环节长度

两个整数做除法，有时会产生循环小数，其循环部分称为：循环节。
比如，11/13=6=>0.846153846153.....  其循环节为[846153] 共有6位。

下面的方法，可以求出循环节的长度。

请仔细阅读代码，并填写划线部分缺少的代码。

```java
public static int f(int n, int m) {
	n = n % m;
	Vector v = new Vector();

	for (;;) {
		v.add(n);
		n *= 10;
		n = n % m;
		if (n == 0)
			return 0;
		// if(v.indexOf(n)>=0) _________________________________ ; //填空
		if (v.indexOf(n) >= 0) return v.size();
	}
}
```

## 九数组分数

1,2,3...9 这九个数字组成一个分数，其值恰好为1/3，如何组法？

下面的程序实现了该功能，请填写划线部分缺失的代码。

```java
public class Main {
	public static void test(int[] x) {
		int a = x[0] * 1000 + x[1] * 100 + x[2] * 10 + x[3];
		int b = x[4] * 10000 + x[5] * 1000 + x[6] * 100 + x[7] * 10 + x[8];
		if (a * 3 == b)
			System.out.println(a + " " + b);
	}

	public static void f(int[] x, int k) {
		if (k >= x.length) {
			test(x);
			return;
		}

		for (int i = k; i < x.length; i++) {
			{
				int t = x[k];
				x[k] = x[i];
				x[i] = t;
			}
			f(x, k + 1);
			// _______________________________________ // 填空
			{ int t = x[k]; x[k] = x[i]; x[i] = t; } // 交换
		}
	}

	public static void main(String[] args) {
		int[] x = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		f(x, 0);
	}
}
```

## 打印菱形

给出菱形的边长，在控制台上打印出一个菱形来。
为了便于比对空格，我们把空格用句点代替。
当边长为8时，菱形为：
.......*
......*.*
.....*...*
....*.....*
...*.......*
..*.........*
.*...........*
*.............*
.*...........*
..*.........*
...*.......*
....*.....*
.....*...*
......*.*
.......*

下面的程序实现了这个功能，但想法有点奇怪。
请仔细分析代码，并填写划线部分缺失的代码。

```java
public class Main {
	public static void f(int n) {
		String s = "*";
		for (int i = 0; i < 2 * n - 3; i++)
			s += ".";
		s += "*";

		String s1 = s + "\n";
		String s2 = "";

		for (int i = 0; i < n - 1; i++) {
			// System.out.println("=>" + s);
			// s = "." + _____________________________________ + "*"; //填空
			s = "." + s.substring(0, 2 * (n - 2) - i) + "*";
			s1 = s + "\n" + s1;
			s2 += s + "\n";
		}
		System.out.println(s1 + s2);
	}

	public static void main(String[] args) {
		f(8);
	}
}
```

# 程序设计

## 饮料换购

乐羊羊饮料厂正在举办一次促销优惠活动。乐羊羊C型饮料，凭3个瓶盖可以再换一瓶C型饮料，并且可以一直循环下去，但不允许赊账。

请你计算一下，如果小明不浪费瓶盖，尽量地参加活动，那么，对于他初始买入的n瓶饮料，最后他一共能得到多少瓶饮料。

输入：一个整数n，表示开始购买的饮料数量（0<n<10000）
输出：一个整数，表示实际得到的饮料数

样例输入1：
100
样例输出1：
149

样例输入2：
101
样例输出2：
151

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

```java
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		scanner.close();
		int sum = n;
		// n瓶饮料，n个瓶盖，可以换n/3瓶饮料
		int nTrade = n / 3;
		// 换了后，剩余的饮料
		int rest = n - nTrade * 3;
		// 换来的饮料和剩余饮料的瓶盖，又可以换n/3瓶饮料
		int againTrade = (nTrade + rest) / 3;
		// 换了后，剩余的饮料
		int againRest = (nTrade + rest) % 3;
		// 最后一次换来的饮料看看能不能最后一次换
		int lastTrade = (againTrade + againRest) / 3;
		sum += nTrade + rest + againTrade + lastTrade;
		System.out.println(sum);
	}
}
```

## 垒骰子

赌圣atm晚年迷恋上了垒骰子，就是把骰子一个垒在另一个上边，不能歪歪扭扭，要垒成方柱体。
经过长期观察，atm 发现了稳定骰子的奥秘：有些数字的面贴着会互相排斥！
我们先来规范一下骰子：1 的对面是 4，2 的对面是 5，3 的对面是 6。
假设有 m 组互斥现象，每组中的那两个数字的面紧贴在一起，骰子就不能稳定的垒起来。 atm想计算一下有多少种不同的可能的垒骰子方式。

两种垒骰子方式相同，当且仅当这两种方式中对应高度的骰子的对应数字的朝向都相同。
由于方案数可能过多，请输出模 10^9 + 7 的结果。

不要小看了 atm 的骰子数量哦～

输入格式：
第一行两个整数 n m
n表示骰子数目
接下来 m 行，每行两个整数 a b ，表示 a 和 b 不能紧贴在一起。

输出格式：
一行一个数，表示答案模 10^9 + 7 的结果。

样例输入：
2 1
1 2
样例输出：
544

数据范围：
对于 30% 的数据：n <= 5
对于 60% 的数据：n <= 100
对于 100% 的数据：0 < n <= 10^9, m <= 36


资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 2000ms

分析：
矩阵快速幂

```java
import java.io.BufferedInputStream;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	static BigInteger MOD = new BigInteger("1000000007");
	static int[] init = { -1, 4, 5, 6, 1, 2, 3 }; // 骰子对面
	static boolean[][] conflict = new boolean[7][7]; // 冲突

	public static void main(String[] args) {
		BigInteger n = new BigInteger(scanner.next());
		int m = scanner.nextInt();
		for (int i = 0; i < m; i++) {
			int a = scanner.nextInt();
			int b = scanner.nextInt();
			conflict[a][b] = conflict[b][a] = true;
		}

		// dp[i][j]：i个骰子且最顶面是j的情况种数
		// 使用了滚动dp，否则会超空间
		BigInteger[][] dp = new BigInteger[2][7];
		int e = 0;
		for (int i = 1; i < 7; i++)
			dp[e][i] = BigInteger.ONE;

		for (BigInteger i = new BigInteger("2"); n.compareTo(i) >= 0; i = i.add(BigInteger.ONE)) {
			e = 1 - e;
			for (int j = 1; j < 7; j++) {
				dp[e][j] = BigInteger.ZERO;
				for (int k = 1; k < 7; k++) {
					if (!conflict[init[j]][k])
						dp[e][j] = dp[e][j].add(dp[1 - e][k]).mod(MOD);
					System.out.println("dp[" + e + "][" + j + "]=" + dp[e][j]);
				}
			}
		}
		System.out.println("e=" + e);
		BigInteger sum = BigInteger.ZERO;
		for (int i = 1; i < 7; i++) {
			sum = sum.add(dp[e][i]).mod(MOD);
		}
		System.out.println("sum = " + sum);
		BigInteger four = new BigInteger("4");
		System.out.println(sum.multiply(four.modPow(n, MOD)).mod(MOD));
	}
}
```

## 生命之树

在X森林里，上帝创建了生命之树。

他给每棵树的每个节点（叶子也称为一个节点）上，都标了一个整数，代表这个点的和谐值。
上帝要在这棵树内选出一个非空节点集S，使得对于S中的任意两个点a,b，都存在一个点列 {a, v1, v2, ..., vk, b} 使得这个点列中的每个点都是S里面的元素，且序列中相邻两个点间有一条边相连。

在这个前提下，上帝要使得S中的点所对应的整数的和尽量大。
这个最大的和就是上帝给生命之树的评分。

经过 atm 的努力，他已经知道了上帝给每棵树上每个节点上的整数。但是由于 atm 不擅长计算，他不知道怎样有效的求评分。他需要你为他写一个程序来计算一棵树的分数。

输入格式：
第一行一个整数 n 表示这棵树有 n 个节点。
第二行 n 个整数，依次表示每个节点的评分。
接下来 n-1 行，每行 2 个整数 u, v，表示存在一条 u 到 v 的边。由于这是一棵树，所以是不存在环的。

输出格式：
输出一行一个数，表示上帝给这棵树的分数。

样例输入：
5
1 -2 -3 4 5
4 2
3 1
1 2
2 5

样例输出：
8

数据范围：
对于 30% 的数据，n <= 10
对于 100% 的数据，0 < n <= 10^5, 每个节点的评分的绝对值不超过 10^6 。

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 3000ms

分析：
树型动态规划

这是一道纯粹的树型动态规划题, 图的结构采用邻接表实现, 整个问题最后化简为"从一棵树中选取一棵结点权值和最大的子树(后面称其为最优子树)". 最优子树的存在形态只有两种: 

1. 包含原树的根结点 ( 直接最优子树 ). 

这种情况下, 原树的直接最优子树必然等于根结点加上它的下属子树中总权非负的直接最优子树.

2. 不包含原树的根结点 ( 间接最优子树 ). 

这种情况下, 原树的间接最优子树必然是它的下属子树中的某一个具有最大权值的直接最优子树或间接最优子树( 谁大取谁 ).

如此一来, 状态转移方程就清晰了, 下面直接代码表示:

每个顶点均有[选/不选]两种情况：
- node[i].dp[0]:不选
- node[i].dp[1]:选

状态转移方程：node[n].dp[1] += Math.max(node[t].dp[1], node[t].dp[0]);

```java
import java.io.BufferedInputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	static int n = scanner.nextInt();
	static Node[] node = new Node[n + 1];

	public static void main(String[] args) {
		for (int i = 1; i <= n; i++) {
			// 存储节点的评分
			node[i] = new Node();
			node[i].score = scanner.nextInt();
		}
		for (int i = 0; i < n - 1; i++) {
			// 存储邻接点
			int a = scanner.nextInt();
			int b = scanner.nextInt();
			node[a].adjacent.add(b);
			node[b].adjacent.add(a);
		}
		dfs(1);
		getScore();
	}

	static void dfs(int n) {
		node[n].dp[1] = node[n].score;
		node[n].dp[0] = 0;
		node[n].isVisit = true;
		for (int i = 0; i < node[n].adjacent.size(); i++) {
			int adjIndex = node[n].adjacent.get(i);
			if (!node[adjIndex].isVisit) {
				dfs(adjIndex);
				node[n].dp[1] += Math.max(node[adjIndex].dp[1], node[adjIndex].dp[0]);
			} else {
				node[n].dp[1] = Math.max(node[n].dp[1], node[n].score);
				node[n].dp[0] = Math.max(node[n].dp[0], 0);
			}
		}
	}

	static void getScore() {
		int score = -1;
		for (int i = 1; i < node.length; i++) {
			score = Math.max(score, node[i].dp[1]);
			score = Math.max(score, node[i].dp[0]);
		}
		System.out.println(score);
	}

	static class Node {
		// 节点的评分
		int score;
		// 是否被访问过
		boolean isVisit;
		// 邻接点
		List<Integer> adjacent = new LinkedList<>();
		// 背包
		int[] dp = new int[2];
	}
}
```

## 移动距离

X星球居民小区的楼房全是一样的，并且按矩阵样式排列。其楼房的编号为1,2,3...
当排满一行时，从下一行相邻的楼往反方向排号。
比如：当小区排号宽度为6时，开始情形如下：

1  2  3  4  5  6
12 11 10 9  8  7
13 14 15 .....

我们的问题是：已知了两个楼号m和n，需要求出它们之间的最短移动距离（不能斜线方向移动）

输入为3个整数w m n，空格分开，都在1到10000范围内
w为排号宽度，m,n为待计算的楼号。
要求输出一个整数，表示m n 两楼间最短移动距离。

用户输入：
6 8 2
输出：
4

用户输入：
4 7 20
输出：
5

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

## 灾后重建

Pear市一共有N（<=50000）个居民点，居民点之间有M（<=200000）条双向道路相连。这些居民点两两之间都可以通过双向道路到达。这种情况一直持续到最近，一次严重的地震毁坏了全部M条道路。
震后，Pear打算修复其中一些道路，修理第i条道路需要Pi的时间。不过，Pear并不打算让全部的点连通，而是选择一些标号特殊的点让他们连通。
Pear有Q（<=50000）次询问，每次询问，他会选择所有编号在[l,r]之间，并且 编号 mod K  = C 的点，修理一些路使得它们连通。由于所有道路的修理可以同时开工，所以完成修理的时间取决于花费时间最长的一条路，即涉及到的道路中Pi的最大值。

你能帮助Pear计算出每次询问时需要花费的最少时间么？这里询问是独立的，也就是上一个询问里的修理计划并没有付诸行动。

【输入格式】
第一行三个正整数N、M、Q，含义如题面所述。
接下来M行，每行三个正整数Xi、Yi、Pi，表示一条连接Xi和Yi的双向道路，修复需要Pi的时间。可能有自环，可能有重边。1<=Pi<=1000000。

接下来Q行，每行四个正整数Li、Ri、Ki、Ci，表示这次询问的点是[Li,Ri]区间中所有编号Mod Ki=Ci的点。保证参与询问的点至少有两个。

【输出格式】
输出Q行，每行一个正整数表示对应询问的答案。

【样例输入】
7 10 4
1 3 10
2 6 9
4 1 5
3 7 4
3 6 9
1 5 8
2 7 4
3 2 10
1 7 6
7 6 9
1 7 1 0
1 7 3 1
2 5 1 0
3 7 2 1

【样例输出】
9
6
8
8

【数据范围】
对于20%的数据，N,M,Q<=30
对于40%的数据，N,M,Q<=2000
对于100%的数据，N<=50000,M<=2*10^5,Q<=50000. Pi<=10^6. Li,Ri,Ki均在[1,N]范围内，Ci在[0,对应询问的Ki)范围内。

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 5000ms
