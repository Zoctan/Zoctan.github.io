---
title: 三个常见博弈游戏
date: 2018-3-21
category: 学习
tags:
  - 算法
---

# 前言

通过数论或者自然数性质完美解决的三个常见博弈游戏：

博弈         | 解决方法
:-----------:|:--------:
Bash Game    | 同余理论
Nim Game     | 异或理论
Wythoff Game | 黄金分割

# Bash Game

描述：
一堆 n 个物品，两人轮流取，每次取 1 至 m 个，最后取完者胜。

以先手为例，分析：
1. 面对 [1...m] 个局面，必胜。
2. 面对 m + 1 个局面，必败。
3. 如果可以使对手面临必败局面，那么必胜。
4. 如果不能使对手面临必败局面，那么必败。

进一步：
基础：1，        2，……， m 是必胜局面，     m + 1是必败局面。
递推：m + 2，m + 3，……，2m + 1 是必胜局面，2m + 2是必败局面。

k(m + 1) 是必败局面，应该允许 k = 0，因为 0 显然也是必败局面。
在必败局和必胜局中，胜方的策略是：拿掉部分物品，使对方面临 k(m + 1) 的局面。 

即：n % (m + 1) == 0 时，先手必败。

比如，有 10 个物品，每次只能取 1 到 5 个，则先手方必胜：先手方拿 4 个，对手无论拿多少个，先手方下次总能拿完。

从另一个角度思考该问题：如果物品数量随机，那么先手方胜利的概率是 m/(m + 1)，后手方胜利的概率是 1/(m + 1)。

# Nim Game

描述：
m 堆 n 个物品，两人轮流取，每次取某堆中不少于 1 个，最后取完者胜。

分析：
1. 所有物品数目二进制异或不为 0，则先手必胜。
2. 所有物品数目二进制异或为 0，则后手必胜。

从另一个角度思考该问题：如果物品数量随机，那么每个数目的每一位上 1 或 0 概率相同：
- 如果有奇数个堆，那么 1 的个数为偶数或者奇数的概率相同，
- 如果有偶数个堆，那么 1 的个数为偶数的概率略大 1/(m + 1)，
也就是说异或结果的每一位为 0 或 1 的概率几乎差不多，而先手必败要求异或结果每一位都为 0，其实败的概率很小。

# Wythoff Game

描述：
2 堆（ak, bk）(ak <= bk)物品，两人轮流取，每次从 1 堆中取 k 个或者从 2 堆中同时取 k 个，最后面对 (0, 0) 局面的败（设ak <= bk是为了忽略顺序的影响）。

以先手为例，分析：
1. 面对 (0,0) 局面必败。
2. 面对 (1,1)(2,2)...(n,n)、(0,1)(0,2)...(0,n) 局面必胜。
3. 如果可以使对手面临必败局面，那么必胜。
4. 如果不能使对手面临必败局面，那么必败。

进一步：
基础：(0,0) 是必败局面；(0,1)(0,2)...(0,n) 是必胜局面。
递推：
```
(1,2) 是必败局面；	(1,1)
					(1,3)(1,4)...(1,n)
					(2,2)(2,3)...(2,n) 是必胜局面，
(3,5) 是必败局面；	(3,3)(3,4)
					(3,6)(3,7)...(3,n)
					(5,5)(5,6)...(5,n) 是必胜局面，
(4,7) 是必败局面；	(4,4)(4,5)(4,6)
					(4,8)(4,8)(4,9)...(4,n)
					(7,7)(7,8)(7,9)...(7,n) 是必胜局面，
(6,10) 是必败局面；	(6,6)(6,7)(6,8)(6,9)
					(6,11)(6,12)(6,13)...(6,n)
					(10,10)(10,11)(10,12)...(10,n) 是必胜局面。
```

规律：（必败局面的规律比较容易找到）
ak 是前面必败局未出现的数中最小者，
bk = ak + k (k = 0,1,2,3,...n)

必败局（奇异局）的重要性质：1,2,...,n 中每一个自然数，出现且只出现在一个奇异局中。

推导：
1. 由于 ak 总是选择未出现的数，所以每个数总能出现在奇异局中且 ak 不会选择到重复的数。
2. bk = ak + k，所以 bk 总是比前面所有奇异局出现的数都大，所以 bk 不会选择到重复的数。

必胜方的策略是：始终让对手面对必败局（奇异局）。

给定任意局势 (a,b)，判定 (a,b) 是否为必败局的方法：k = 0,1...n，黄金比例 φ = 1.618033，ak = [φ * k]，bk = ak + k = [φ^2 * k]。
比如：
k = 0，ak = 0，bk = 0
k = 1，ak = 1，bk = 2
k = 2，ak = 3，bk = 5
k = 3，ak = 4，bk = 7

更好的一种判断策略：k = bk - ak，当 ak == [φ * k] 时，为奇异局。

从胜负概率角度，如果堆中数量随机，先手一方优势很大。

# 组合游戏 - SG 函数和 SG 定理

## 必胜点与必败点

必胜点和必败点的概念：
P 点（Previous player）：必败点，换而言之，就是谁处于此位置，则在双方操作正确的情况下必败。
N 点（Next player）：必胜点，处于此情况下，双方操作均正确的情况下必胜。

必胜点和必败点的性质：
1. 所有终结点是必败点 P。
2. 从任何必胜点 N 操作，至少有一种方式可以进入必败点 P。
3. 无论如何操作，必败点 P 都只能进入必胜点 N。

通常我们分析必胜点和必败点都是以终结点进行逆序分析。

## 例子

[HDU 1847 Good Luck in CET-4 Everybody!](http://acm.hdu.edu.cn/showproblem.php?pid=1847)

打牌的规则：
1. 总共 n 张牌;
2. 双方轮流抓牌；
3. 每人每次抓牌的个数只能是2的幂次（即：1，2，4，8，16…）；
4. 抓完牌，胜负结果也出来了：最后抓完牌的人为胜者。

假设 Kiki 和 Cici 都足够聪明，并且每次都是Kiki先抓牌，请问谁能赢呢？

分析：
当 n = 0 时，显然为必败点，因为此时你已经无法进行操作了。
当 n = 1 时，因为你一次就可以拿完所有牌，故此时为必胜点。
当 n = 2 时，也是一次就可以拿完，故此时为必胜点。
当 n = 3 时，要么剩 1 张要么剩 2 张，无论怎么取对方都将面对必胜点，故这一点为必败点。

以此类推：
```
0 1 2 3 4 5 6 ...
P N N P N N P ...
```

你发现了什么没有，对，他们就是成有规律，使用了 P/N 来分析，有没有觉得问题变简单了。

## SG 函数和 SG 定理

组合游戏的和通常是很复杂的，但是有一种新工具，可以使组合问题变得简单 ———— SG 函数和 SG 定理。

Sprague-Grundy 定理：

游戏和的 SG 函数等于各个游戏 SG 函数的 Nim 和。这样就可以将每一个子游戏分而治之，从而简化了问题。而 Bouton 定理就是 Sprague-Grundy 定理在 Nim 游戏中的直接应用，因为单堆的 Nim 游戏 SG 函数满足 SG(x) = x。

Sprague-Grundy 函数：

首先定义 mex(minimal excludant) 运算，这是施加于一个集合的运算，表示最小的不属于这个集合的非负整数。比如，mex{0, 1, 2, 4} = 3、mex{2, 3, 5} = 0、mex{} = 0。

对于任意状态 i，定义 SG(x) = mex(S)，其中 S 是 i 后继状态的 SG 函数值的集合。如 i 有三个后继状态分别为 SG(a)、SG(b)、SG(c)，那么 SG(i) = mex{SG(a), SG(b), SG(c)}。这样集合 S 的终态必然是空集，所以 SG 函数的终态为 SG(i) = 0，当且仅当 i 为必败点 P 时。

## 取石子问题

有 1 堆 n 个的石子，每次只能取{1, 3, 4}个石子，先取完石子者胜利，那么各个数的 SG 值为多少？

SG[0] = 0，f[] = {1, 3, 4}

i = 1，可以取走 1 - f{1} 个石子，剩余 {0} 个，SG[1] = mex{SG[0]} = mex{0} = 1;
i = 2，可以取走 2 - f{1} 个石子，剩余 {1} 个，SG[2] = mex{SG[1]} = mex{1} = 0;
i = 3，可以取走 3 - f{1, 3} 个石子，剩余 {2, 0} 个，SG[3] = mex{SG[2], SG[0]} = mex{0, 0} =1;
i = 4，可以取走 4 - f{1, 3, 4} 个石子，剩余 {3, 1, 0} 个，SG[4] = mex{SG[3], SG[1], SG[0]} = mex{1, 1, 0} = 2;
i = 5，可以取走 5 - f{1, 3, 4} 个石子，剩余 {4, 2, 1} 个，SG[5] = mex{SG[4], SG[2], SG[1]} = mex{2, 0, 1} = 3;

以此类推.....

```
i     0 1 2 3 4 5 6 7 8....
SG[i] 0 1 0 1 2 3 2 0 1....
```

由上例我们就可以得到 SG 函数值求解步骤：
1. 使用数组 f 将可改变当前状态的方式记录下来。
2. 使用另一个数组将当前状态 i 的后继状态标记。
3. 最后模拟 mex 运算，在标记值中搜索未被标记值的最小值，将其赋值给 SG(i)。
4. 不断重复 2~3 步，知道计算完 1~n 的函数值。

## 模版

```java
// 可改变当前状态的方式，N为方式的种类
int[] f = new int[N];

// 当前状态 i 的后继状态的集合
boolean[] isVisit = new boolean[MAXN];

// 0~n的SG函数值
int[] SG = new int[MAXN];

void getSG(int n) {

	// 因为SG[0]始终等于0，所以i从1开始
	for (int i = 1; i < n; i++) {

		// 每一次都要将上一状态的后继集合重置
		Arrays.fill(isVisit, false);

		for (int j = 0; j < N && f[j] <= i; j++) {
			// 将后继状态的SG函数值进行标记
			isVisit[SG[i - f[j]]] = true;
		}

		for (int j = 0;; j++) {
			// 查询当前后继状态SG值中最小的非零值
			if (!isVisit[j]) {
				SG[i] = j;
				break;
			}
		}
	}
}
```

## 实战

[HDU 1848 Fibonacci again and again](http://acm.hdu.edu.cn/showproblem.php?pid=1848)

任何一个大学生对菲波那契数列(Fibonacci numbers)应该都不会陌生，它是这样定义的：
F(1)=1;
F(2)=2;
F(n)=F(n-1)+F(n-2)(n>=3);
所以，1,2,3,5,8,13……就是菲波那契数列。

在HDOJ上有不少相关的题目，比如1005 Fibonacci again就是曾经的浙江省赛题。

今天，又一个关于Fibonacci的题目出现了，它是一个小游戏，定义如下：
1、这是一个二人游戏;
2、一共有3堆石子，数量分别是m, n, p个；
3、两人轮流走;
4、可以选择任意一堆石子，然后取走f个；
5、f只能是菲波那契数列中的元素（即每次只能取1，2，3，5，8…等数量）；
6、最先取光所有石子的人为胜者；

假设双方都使用最优策略，请判断先手的人会赢还是后手的人会赢。
 
Input
输入数据包含多个测试用例，每个测试用例占一行，包含3个整数m,n,p（1<=m,n,p<=1000）。
m=n=p=0则表示输入结束。

Output
如果先手的人能赢，请输出“Fibo”，否则请输出“Nacci”，每个实例的输出占一行。

Sample Input
1 1 1
1 4 1
0 0 0

Sample Output
Fibo
Nacci

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.util.Arrays;

public class Main {
	static int MAXN = 1001;
	static int N = 16;
	static int[] f = new int[N];
	static boolean[] isVisit = new boolean[MAXN];
	static int[] SG = new int[MAXN];

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		getFibonacci();
		getSG(MAXN);

		int m, n, p;
		while (true) {
			in.nextToken();
			m = (int) in.nval;
			in.nextToken();
			n = (int) in.nval;
			in.nextToken();
			p = (int) in.nval;
			if (m == 0 && n == 0 && p == 0) {
				break;
			}
			out.println((SG[n] ^ SG[m] ^ SG[p]) != 0 ? "Fibo" : "Nacci");
		}
		out.flush();
	}

	static void getFibonacci() {
		f[0] = f[1] = 1;
		for (int i = 2; i < N; i++) {
			f[i] = f[i - 1] + f[i - 2];
		}
	}

	static void getSG(int n) {
		for (int i = 1; i < n; i++) {
			Arrays.fill(isVisit, false);
			for (int j = 0; j < N && f[j] <= i; j++) {
				isVisit[SG[i - f[j]]] = true;
			}
			for (int j = 0;; j++) {
				if (!isVisit[j]) {
					SG[i] = j;
					break;
				}
			}
		}
	}
}
```