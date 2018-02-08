---
title: 蓝桥杯2015年第6届Java-B组省赛
date: 2018-1-25
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 三角形面积

如图所示，图中的所有小方格面积都是1。

{% asset_img 1-1.jpg 三角形面积 %}

那么，图中的三角形面积应该是多少呢？

请填写三角形的面积。不要填写任何多余内容或说明性文字。

手算：

正方形面积：64
左边直角三角形：$\frac{ 8 \times 4 }{ 2 } = 16$
右上角直角三角形：$\frac{ 8 \times 2 }{ 2 } = 8$
右下角直角三角形：$\frac{ 6 \times 4 }{ 2 } = 12$
三角形面积即：64 - 16 - 8 - 12 = 28

# 立方变自身

观察下面的现象,某个数字的立方，按位累加仍然等于自身。
1^3 = 1 
8^3  = 512    5+1+2=8
17^3 = 4913   4+9+1+3=17
...

请你计算包括1,8,17在内，符合这个性质的正整数一共有多少个？ 6

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

# 三羊献瑞

观察下面的加法算式：

```
        祥 瑞 生 辉
  +   三 羊 献 瑞
-------------------
   三 羊 生 瑞 气
```

{% asset_img 3.jpg 三羊献瑞 %}

其中，相同的汉字代表相同的数字，不同的汉字代表不同的数字。

请你填写“三羊献瑞”所代表的4位数字（答案唯一），不要填写任何多余内容。

1 0 8 5

```java 暴力
public class Main {
	public static void main(String args[]) {
		int[] number = new int[10];
		for (int a = 0; a <= 9; a++) {
			number[a] = 1;
			for (int b = 0; b <= 9; b++) {
				if (number[b] == 1) {
					continue;
				}
				number[b] = 1;
				for (int c = 0; c <= 9; c++) {
					if (number[c] == 1) {
						continue;
					}
					number[c] = 1;
					for (int d = 0; d <= 9; d++) {
						if (number[d] == 1) {
							continue;
						}
						number[d] = 1;
						for (int e = 0; e <= 9; e++) {
							if (number[e] == 1) {
								continue;
							}
							number[e] = 1;
							for (int f = 0; f <= 9; f++) {
								if (number[f] == 1) {
									continue;
								}
								number[f] = 1;
								for (int g = 0; g <= 9; g++) {
									if (number[g] == 1) {
										continue;
									}
									number[g] = 1;
									for (int h = 0; h <= 9; h++) {
										if (number[h] == 1) {
											continue;
										}
										int A = a * 1000 + b * 100 + c * 10 + d;
										int B = e * 1000 + f * 100 + g * 10 + b;
										int S = e * 10000 + f * 1000 + c * 100 + b * 10 + h;
										if (e != 0 && A + B == S) {
											System.out.println(e + " " + f + " " + g + " " + b);
											return;
										}
									}
									number[g] = 0;
								}
								number[f] = 0;
							}
							number[e] = 0;
						}
						number[d] = 0;
					}
					number[c] = 0;
				}
				number[b] = 0;
			}
			number[a] = 0;
		}
	}
}
```

```java 回溯
public class Main {
	private static int[] number = new int[10];
	private static int[] anwser = new int[8];

	public static void main(String args[]) {
		backTrack(0);
	}

	private static void backTrack(int current) {
		if (current == 8) {
			if (isOK()) {
				System.out.println(anwser[4] + " " + anwser[5] + " " + anwser[6] + " " + anwser[1]);
			}
		} else {
			for (int i = 0; i <= 9; i++) {
				if (number[i] == 1) {
					continue;
				}
				anwser[current] = i;
				number[i] = 1;
				backTrack(current + 1);
				number[i] = 0;
			}
		}
	}

	private static boolean isOK() {
		int A = anwser[0] * 1000 + anwser[1] * 100 + anwser[2] * 10 + anwser[3];
		int B = anwser[4] * 1000 + anwser[5] * 100 + anwser[6] * 10 + anwser[1];
		int S = anwser[4] * 10000 + anwser[5] * 1000 + anwser[2] * 100 + anwser[1] * 10 + anwser[7];
		return anwser[4] != 0 && A + B == S;
	}
}
```

# 循环节长度

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

# 九数组分数

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

# 加法变乘法

我们都知道：1+2+3+ ... + 49 = 1225
现在要求你把其中两个不相邻的加号变成乘号，使得结果为2015

比如：1+2+3+...+10*11+12+...+27*28+29+...+49 = 2015
就是符合要求的答案。

请你寻找另外一个可能的答案，并把位置靠前的那个乘号左边的数字提交（对于示例，就是提交10）。

16

注意：需要你提交的是一个整数，不要填写任何多余的内容。

```java 双指针
public class Main {
	private static String[] position = new String[97];
	private static int frontSymbol = 1;
	private static int reerSymbol = 95;

	public static void main(String[] args) {
		for (int i = 0, j = 1; i < 97; i++) {
			if ((i & 1) == 0) {
				position[i] = j + "";
				j++;
			} else {
				position[i] = "+";
			}
		}
		position[frontSymbol] = "*";
		position[reerSymbol] = "*";

		while (reerSymbol > frontSymbol) {
			int s = sum();
			if (s == 2015) {
				outPut();
				go();
				back();
			} else if (s < 2015) {
				go();
			} else {
				back();
			}
		}
	}

	private static void go() {
		position[frontSymbol] = "+";
		frontSymbol += 2;
		position[frontSymbol] = "*";
	}

	private static void back() {
		position[reerSymbol] = "+";
		reerSymbol -= 2;
		position[reerSymbol] = "*";
	}

	private static void outPut() {
		for (int i = 0; i < 97; i++) {
			out.print(position[i]);
		}
		System.out.println();
	}

	private static int sum() {
		int sum = 0;
		for (int i = 0; i < 97; i++) {
			if (position[i].equals("+")) {
				if (i == 1) {
					sum += Integer.parseInt(position[i - 1]) + Integer.parseInt(position[i + 1]);
				} else {
					sum += Integer.parseInt(position[i + 1]);
				}
			} else if (position[i].equals("*")) {
				if (i == 1) {
					sum += Integer.parseInt(position[i - 1]) * Integer.parseInt(position[i + 1]);
				} else {
					sum += Integer.parseInt(position[i - 1]) * (Integer.parseInt(position[i + 1]) - 1);
				}
			}
		}
		return sum;
	}
}
```

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

# 牌型种数

小明被劫持到X赌城，被迫与其他3人玩牌。
一副扑克牌（去掉大小王牌，共52张），均匀发给4个人，每个人13张。

这时，小明脑子里突然冒出一个问题：
如果不考虑花色，只考虑点数，也不考虑自己得到的牌的先后顺序，自己手里能拿到的初始牌型组合一共有多少种呢？

3598180

请填写该整数，不要填写任何多余的内容或说明文字。

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
		if (have > 13) {
			return;
		}
		if (times == 13) {
			if (have == 13) {
				total++;
			}
		} else {
			for (int i = 0; i <= 4; i++) {
				have += i;
				backTrack(times + 1);
				have -= i;
			}
		}
	}
}
```

# 饮料换购

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

# 垒骰子

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

```java 抄的
import java.io.BufferedInputStream;
import java.math.BigInteger;
import java.util.Scanner;
public class Main {
	public static final int MOD = 1000000007;
	public static int init[] = { -1, 4, 5, 6, 1, 2, 3 }; // 骰子对面
	public static boolean conflict[][] = new boolean[7][7]; // 冲突

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		int m = scanner.nextInt();
		for (int i = 0; i < m; i++) {
			int a = scanner.nextInt();
			int b = scanner.nextInt();
			conflict[a][b] = conflict[b][a] = true;
		}

		// dp[i][j] 代表，i个骰子且最顶面是j的情况种数 并且使用了滚动dp，否则会超空间
		BigInteger dp[][] = new BigInteger[2][7];
		int e = 0;
		for (int i = 1; i < 7; i++)
			dp[e][i] = BigInteger.ONE;

		for (int i = 2; i <= n; i++) {
			e = 1 - e;
			for (int j = 1; j < 7; j++) {
				dp[e][j] = BigInteger.ZERO;
				for (int k = 1; k < 7; k++) {
					if (!conflict[init[j]][k])
						dp[e][j] = dp[e][j].add(dp[1 - e][k]).mod(new BigInteger(MOD + ""));
					System.out.println("dp[" + e + "][" + j + "]=" + dp[e][j]);
				}
			}
		}
		System.out.println("e=" + e);
		BigInteger sum = BigInteger.ZERO;
		for (int i = 1; i < 7; i++) {
			sum = sum.add(dp[e][i]).mod(new BigInteger(MOD + ""));
		}
		System.out.println("sum = " + sum);
		System.out.println(sum.multiply(quickpow(4, n)).mod(new BigInteger(MOD + "")));
	}

	// 快速幂
	static BigInteger quickpow(int n, int m) {
		BigInteger n1 = new BigInteger(n + "");

		BigInteger t = BigInteger.ONE;
		while (m > 0) {
			if ((m & 1) == 1)
				t = t.multiply(n1).mod(new BigInteger(MOD + ""));
			n1 = n1.multiply(n1).mod(new BigInteger(MOD + ""));
			m >>= 1;
		}
		return t;
	}
}
```

# 生命之树

在X森林里，上帝创建了生命之树。

他给每棵树的每个节点（叶子也称为一个节点）上，都标了一个整数，代表这个点的和谐值。
上帝要在这棵树内选出一个非空节点集S，使得对于S中的任意两个点a,b，都存在一个点列 {a, v1, v2, ..., vk, b} 使得这个点列中的每个点都是S里面的元素，且序列中相邻两个点间有一条边相连。

在这个前提下，上帝要使得S中的点所对应的整数的和尽量大。
这个最大的和就是上帝给生命之树的评分。

经过atm的努力，他已经知道了上帝给每棵树上每个节点上的整数。但是由于 atm 不擅长计算，他不知道怎样有效的求评分。他需要你为他写一个程序来计算一棵树的分数。

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

每个顶点均有 选与不选 两种情况 node[i].dp[0]:不选 node[i].dp[1]:选
状态转移方程:node[n].dp[1]+=Math.max(node[t].dp[1], node[t].dp[0]);

```java
import java.io.BufferedInputStream;
import java.util.Scanner;
import java.util.Vector;
public class Main {
	static Node[] node;

	// 定义结点
	static class Node {
		int val;// 顶点值
		boolean vis;// 是否被访问过,默认为false
		Vector<Integer> other = new Vector<Integer>();// 邻接点
		int[] dp = new int[2];// 顶点 选与不选
	}

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		node = new Node[n + 1];
		for (int i = 1; i < node.length; i++) {// 存储顶点值
			node[i] = new Node();
			node[i].val = scanner.nextInt();
		}
		for (int i = 0; i < n - 1; i++) {// 存储邻接点
			int a = scanner.nextInt();
			int b = scanner.nextInt();
			node[a].other.add(b);
			node[b].other.add(a);
		}
		dfs(1);
		System.out.println(print());
	}

	public static void dfs(int n) {
		node[n].dp[1] = node[n].val;
		node[n].dp[0] = 0;
		node[n].vis = true;
		for (int i = 0; i < node[n].other.size(); i++) {
			int t = node[n].other.get(i);
			if (!node[t].vis) {
				dfs(t);
				node[n].dp[1] += Math.max(node[t].dp[1], node[t].dp[0]);
			} else {
				node[n].dp[1] = Math.max(node[n].dp[1], node[n].val);
				node[n].dp[0] = Math.max(node[n].dp[0], 0);
			}
		}

	}

	public static int print() {
		int ans = -1;
		for (int i = 1; i < node.length; i++) {
			ans = Math.max(ans, node[i].dp[1]);
			ans = Math.max(ans, node[i].dp[0]);
		}
		return ans;
	}
}
```