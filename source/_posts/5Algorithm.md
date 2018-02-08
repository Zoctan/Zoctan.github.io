---
title: 5个基本算法
date: 2018-01-27
category: 学习
tags:
  - Java
---

# 动态规划

## 基本概念

过程：每次决策依赖于当前状态，又随即引起状态的转移。
一个决策序列就是在变化的状态中产生出来的，所以，这种多阶段最优化决策解决问题的过程就称为动态规划。

## 基本思想与策略

基本思想与分治法类似，也是将待求解的问题分解为若干个子问题（阶段），按顺序求解子阶段，前一子问题的解，为后一子问题的求解提供了有用的信息。在求解任一子问题时，列出各种可能的局部解，通过决策保留那些有可能达到最优的局部解，丢弃其他局部解。依次解决各子问题，最后一个子问题就是初始问题的解。

由于动态规划解决的问题多数有重叠子问题这个特点，为减少重复计算，对每一个子问题只解一次，将其不同阶段的不同状态保存在一个二维数组中。

与分治法最大的差别是：适合于用动态规划法求解的问题，经分解后得到的子问题往往不是互相独立的（即下一个子阶段的求解是建立在上一个子阶段的解的基础上，进行进一步的求解）。

## 适用的情况

能采用动态规划求解的问题的一般要具有3个性质：

1. 最优化原理：如果问题的最优解所包含的子问题的解也是最优的，就称该问题具有最优子结构，即满足最优化原理。
2. 无后效性：即某阶段状态一旦确定，就不受这个状态以后决策的影响。也就是说，某状态以后的过程不会影响当前状态。
3. 有重叠子问题：即子问题之间是不独立的，一个子问题在下一阶段决策中可能被多次使用到。（该性质并不是动态规划适用的必要条件，但是如果没有这条性质，动态规划算法同其他算法相比就不具备优势）

## 求解的基本步骤

动态规划所处理的问题是一个多阶段决策问题，一般由初始状态开始，通过对中间阶段决策的选择，达到结束状态。这些决策形成了一个决策序列，同时确定了完成整个过程的一条活动路线(通常是求最优的活动路线)。

动态规划的设计都有着一定的模式，一般要经历以下几个步骤：

初始状态 → │决策１│ → │决策２│ → … → │决策ｎ│ → 结束状态

1. 划分阶段：按照问题的时间或空间特征，把问题分为若干个阶段。在划分阶段时，注意划分后的阶段一定要是有序的或者是可排序的，否则问题就无法求解。
2. 确定状态和状态变量：将问题发展到各个阶段时所处于的各种客观情况用不同的状态表示出来。当然，状态的选择要满足无后效性。
3. 确定决策并写出状态转移方程：因为决策和状态转移有着天然的联系，状态转移就是根据上一阶段的状态和决策来导出本阶段的状态。所以如果确定了决策，状态转移方程也就可写出。但事实上常常是反过来做，根据相邻两个阶段的状态之间的关系来确定决策方法和状态转移方程。
4. 寻找边界条件：给出的状态转移方程是一个递推式，需要一个递推的终止条件或边界条件。

一般，只要解决问题的阶段、状态和状态转移决策确定了，就可以写出状态转移方程（包括边界条件）。
实际应用中可以按以下几个简化的步骤进行设计：
1. 分析最优解的性质，并刻画其结构特征。
2. 递归的定义最优解。
3. 以自底向上或自顶向下的记忆化方式（备忘录法）计算出最优值
4. 根据计算最优值时得到的信息，构造问题的最优解

## 算法实现的说明

动态规划的主要难点在于理论上的设计，也就是上面4个步骤的确定，一旦设计完成，实现部分就会非常简单。

使用动态规划求解问题，最重要的就是确定动态规划三要素：
1. 问题的阶段
2. 每个阶段的状态
3. 从前一个阶段转化到后一个阶段之间的递推关系

递推关系必须是从次小的问题开始到较大的问题之间的转化，从这个角度来说，动态规划往往可以用递归程序来实现，不过递推可以充分利用前面保存的子问题的解来减少重复计算，所以对于大规模问题来说，有递归不可比拟的优势，这也是动态规划算法的核心之处。

确定了动态规划的这三要素，整个求解过程就可以用一个最优决策表来描述，最优决策表是一个二维表，其中行表示决策的阶段，列表示问题状态，表格需要填写的数据一般对应此问题的在某个阶段某个状态下的最优值（如最短路径，最长公共子序列，最大价值等），填表的过程就是根据递推关系，从1行1列开始，以行或者列优先的顺序，依次填写表格，最后根据整个表格的数据通过简单的取舍或者运算求得问题的最优解。
dp(n, m) = max{ dp(n-1, m), dp(n-1, m-w[n]) + P(n, m) }

## 经典题型

### 背包问题

0-1背包：每种物品只有一个，只有两种状态：拿或不拿，即0或1。
完全背包：每种物品无限个。
多重背包：每种物品有限个num[i]。

#### 0-1背包

问题描述：
有n个物品，它们有各自的重量和价值，给定一个容量固定的背包，如何装才能让背包里装的物品价值总和最大？

分析：

二维表dp[i][capacity]：面对第i个物品，且背包容量为capacity时，在做决策后所能获得的最大价值。

决策：为使背包中物品价值总和最大化，第i个物品应该装进去吗？
1. 当capacity < weight[i]时，背包容量不足以放下第i个物品，不能装。
dp[i][capacity] = dp[i-1][capacity]，表示和上一次状态一样。

2. 当capacity >= weight[i]时，背包能放下第i个物品，这时候要考虑装下该物品时能否获得更大价值。
若不装：dp[i][capacity] = dp[i-1][capacity]
若装：dp[i][capacity] = dp[i-1][capacity-weight[i]] + value[i]，其中dp[i-1][capacity-weight[i]]表示：在上一次面对第i-1个物品，背包容量为capacity-weight[i]时做出决策后的最大价值。

装不装，就取决于这两个情况下，哪种获得的价值最大。

由上即得状态转移方程：
dp[i][capacity] = max{ dp[i-1][capacity], dp[i-1][capacity-weight[i]] + value[i] };

例题：
山洞里共有a, b, c, d, e这5个宝物，重量分别是2, 2, 6, 5, 4，价值分别是6, 3, 5, 4, 6，你有容量为10的背包，怎样装才能带走最多的财富？

 物品 | a | b | c | d | e
:----:|:-:|:-:|:-:|:-:|:-:
 重量 | 2 | 2 | 6 | 5 | 4
 价值 | 6 | 3 | 5 | 4 | 6

二维表dp[6][11]，根据状态转移方程，依次填好表格。
行：5个物品
列：背包容量

 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:
 a | 0 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6
 b | 0 | 6 | 6 | 9 | 9 | 9 | 9 | 9 | 9 | 9
 c | 0 | 6 | 6 | 9 | 9 | 9 | 9 | 11| 11| 14
 d | 0 | 6 | 6 | 9 | 9 | 9 | 10| 11| 13| 14
 e | 0 | 6 | 6 | 9 | 9 | 12| 12| 15| 15| 15

填写过程：

容量 | 决策过程
:---------:|:-------
  1 |都放不下，故都为0。
 …… |……
  4 |面对a时，因为容量4>重量2，且是第1个物品，所以装入a。面对b时，4>2，找到面对a时容量4-2=2时的背包最大价值6，若装：6+3=9；若不装：6。而9>6，所以装入b。面对……。
 …… |……
  8 |面对……。面对e时，8>4，找到面对d时容量8-4=4时的背包最大价值9，若装：9+6=15；若不装：11。而15>11，所以装入e。

```java 二维数组
public class Main {
	// 背包容量
	private static int capacity = 10;
	private static String[] items = new String[] { "a", "b", "c", "d", "e" };
	private static int[] weight = new int[] { 2, 2, 6, 5, 4 };
	private static int[] value = new int[] { 6, 3, 5, 4, 6 };
	// 决策表
	private static int[][] dp = new int[items.length][capacity + 1];

	public static void main(String[] args) {
		decide();
		outPutMaxValue();
		outPutChosenItems();
	}

	private static void decide() {
		for (int j = 1; j <= capacity; j++) {
			for (int i = 0; i < items.length; i++) {
				if (j >= weight[i]) {
					if (i == 0) {
						dp[i][j] = value[i];
						continue;
					}
					dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
				} else {
					if (i == 0) {
						dp[i][j] = 0;
						continue;
					}
					dp[i][j] = dp[i - 1][j];
				}
			}
		}
	}

	private static void outPutChosenItems() {
		int[] isChosen = new int[items.length];
		for (int i = items.length - 1, c = capacity; i > 0; i--) {
			if (dp[i][c] == dp[i - 1][c]) {
				isChosen[i] = 0;
			} else {
				isChosen[i] = 1;
				c -= weight[i];
			}
			if (i - 1 == 0) {
				isChosen[0] = dp[0][c] > 0 ? 1 : 0;
			}
		}
		for (int i = 0; i < items.length; i++) {
			if (isChosen[i] == 1) {
				System.out.print(items[i] + " ");
			}
		}
		System.out.println();
	}

	private static void outPutMaxValue() {
		System.out.println(dp[items.length - 1][capacity]);
	}
}
```

```java 一维数组
public class Main {
	private static int capacity = 10;
	private static String[] items = new String[] { "a", "b", "c", "d", "e" };
	private static int[] weight = new int[] { 2, 2, 6, 5, 4 };
	private static int[] value = new int[] { 6, 3, 5, 4, 6 };
	private static int[] dp = new int[capacity + 1];
	private static int[][] path = new int[items.length][capacity];

	public static void main(String[] args) {
		decide();
		outPutMaxValue();
		outPutChosenItems();
	}

	private static void decide() {
		for (int i = 0; i < items.length; i++) {
			for (int j = capacity; j >= weight[i]; j--) {
				if (dp[j] < dp[j - weight[i]] + value[i]) {
					dp[j] = dp[j - weight[i]] + value[i];
					path[i][j] = 1;
				}
			}
		}
	}

	private static void outPutChosenItems() {
		for (int i = items.length - 1, c = capacity; i >= 0 && c >= 0; i--) {
			if (path[i][c] == 1) {
				System.out.print(items[i] + " ");
				c -= weight[i];
			}
		}
		System.out.println();
	}

	private static void outPutMaxValue() {
		System.out.println(dp[capacity]);
	}
}
```

[HDU2456：饭卡](http://acm.hdu.edu.cn/showproblem.php?pid=2546)
如果购买一个商品前，卡上剩余金额>=5元，就一定可以购买成功（即使购买后卡上余额为负）；否则无法购买（即使金额足够）。
某天，饭堂有n种菜出售，每种菜可购买一次。已知菜的价格和卡上余额，问最少可使卡上余额为多少？

输入：
第一行为整数n，表示菜的数量（n<=1000）
第二行包括n个正整数，表示每种菜的价格（不超过50）
第三行为正整数m，表示卡上的余额（m<=1000）

输出：
卡上最小余额

样例输入1：
1
50
5

样例输出1：
-45

样例输入2：
10
1 2 3 2 1 1 2 3 2 1
50

样例输出2：
32

分析：
每种菜只有买和不买2种情况，并且前面买了菜后剩余的钱影响后面的决策，所以是动态规划，而且是0-1背包。
什么时候余额最少呢？应该是余额最接近5时，选最贵的菜，余额最少。
比如只有5块钱，类似样例输入1那样买最贵的50块，这样就变最少了。

因为只有余额>=5块钱才能用，所以5块钱要保留下来。
更进一步地转化为0-1背包：保留余额中的5块钱，而另一部分钱（背包容量）就尽可能花到剩下最少（最贵的菜还不能买），最后再去买最贵的菜。

比如：有3种菜，价格分别是2, 3, 1，卡上余额为7。
保留5块钱，为了尽可能花完剩下的7-5=2块钱，就买了第1个菜，2块钱就花完了，最后用5块钱买最贵的那个3块钱的菜，这样最少余额为2。

```java 二维数组
import java.util.Arrays;
import java.util.Scanner;
public class Main {
	// 背包容量
	private static int rest;
	private static int[] need;
	private static int[][] dp;

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		need = new int[n];
		for (int i = 0; i < n; i++) {
			need[i] = scanner.nextInt();
		}
		int card = scanner.nextInt();
		scanner.close();
		// 如果卡余额不足5块钱，买不了菜
		if (card < 5) {
			System.out.println(card);
			return;
		}
		// 方便后面选最贵菜
		Arrays.sort(need);
		// 分成5块钱和另外剩下的一部分钱
		rest = card - 5;
		dp = new int[n][rest + 1];
		// 剩下的钱买菜
		buy();
		// 最后剩下的钱去买最贵的菜
		System.out.println(card - dp[need.length - 2][rest] - need[need.length - 1]);
	}

	private static void buy() {
		for (int j = 1; j <= rest; j++) {
			// 最贵的菜要留到最后买，所以这里不买最贵的菜
			for (int i = 0; i < need.length - 1; i++) {
				if (j >= need[i]) {
					if (i == 0) {
						dp[i][j] = need[i];
						continue;
					}
					dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - need[i]] + need[i]);
				} else {
					if (i == 0) {
						dp[i][j] = 0;
						continue;
					}
					dp[i][j] = dp[i - 1][j];
				}
			}
		}
		/*
		for (int j = 0; j < need.length; j++) {
			for (int i = 0; i <= rest; i++) {
				System.out.print(dp[j][i] + " ");
			}
			System.out.println();
		}
		 */
	}
}
```

```java 一维数组 AC
import java.io.BufferedInputStream;
import java.util.Arrays;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		while (true) {
			int n = scanner.nextInt();
			if (n == 0) {
				break;
			}
			int[] need = new int[n];
			for (int i = 0; i < n; i++) {
				need[i] = scanner.nextInt();
			}
			int card = scanner.nextInt();
			if (card < 5) {
				System.out.println(card);
				continue;
			}
			Arrays.sort(need);
			if (card == 5 || n == 1) {
				System.out.println(card - need[n - 1]);
			} else {
				int rest = card - 5;
				int[] dp = new int[rest + 1];
				for (int i = 0; i < n - 1; i++) {
					for (int j = rest; j >= need[i]; j--) {
						dp[j] = Math.max(dp[j], dp[j - need[i]] + need[i]);
					}
				}
				System.out.println(card - dp[rest] - need[n - 1]);
			}
		}
	}
}
```

[HDU1171：Big Event in HDU](http://acm.hdu.edu.cn/showproblem.php?pid=1171)
Nowadays, we all know that Computer College is the biggest department in HDU. But, maybe you don't know that Computer College had ever been split into Computer College and Software College in 2002.
The splitting is absolutely a big event in HDU! At the same time, it is a trouble thing too. All facilities must go halves. First, all facilities are assessed, and two facilities are thought to be same if they have the same value. It is assumed that there is N (0<N<1000) kinds of facilities (different value, different kinds).

输出：
Input contains multiple test cases. Each test case starts with a number N (0 < N <= 50 -- the total number of different facilities). The next N lines contain an integer V (0<V<=50 --value of facility) and an integer M (0<M<=100 --corresponding number of the facilities) each. You can assume that all V are different.
A test case starting with a negative integer terminates input and this test case is not to be processed.

输出：
For each case, print one line containing two integers A and B which denote the value of Computer College and Software College will get respectively. A and B should be as equal as possible. At the same time, you should guarantee that A is not less than B.

样例输入：
2
10 1
20 1
3
10 1 
20 2
30 1
-1

样例输出：
20 10
40 40

大意：A，B学院平分所有的设施装置，假设有N种装置（0<N<1000），不同装置不同价值（如果有2个价值一样的装置，那就把它们看成一样的），要求平分后的价值差不多，如果不相等，A得到的价值应该大于B的。

分析：
看上去是完全背包，但可以将多个相同装置展开，变回0-1背包。
比如：
10 1 
20 2
30 1
变为10 20 20 30

将所有装置价值总和/2后当成背包大小，这个背包就相当于学院B，然后去拿装置，拿剩的就是另一个学院A的。
比如样例1：
10 1
20 1
背包大小就是15，学院B只能拿10，而学院A就拿剩下的20。

注意：n<0才退出输入。

```java AC
import java.io.BufferedInputStream;
import java.util.ArrayList;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		while (n > 0) {
			int sum = 0;
			ArrayList<Integer> value = new ArrayList<>();
			for (int i = 0, nums = 0, v = 0; i < n; i++) {
				v = scanner.nextInt();
				value.add(v);
				nums = scanner.nextInt();
				sum += v * nums;
				while (nums != 1) {
					value.add(v);
					nums--;
				}
			}
			int total = value.size();
			Integer[] f = new Integer[total];
			value.toArray(f);
			int bag = sum >> 1;
			int[] dp = new int[bag + 1];
			for (int i = 0; i < total; i++) {
				for (int j = bag; j >= f[i]; j--) {
					dp[j] = Math.max(dp[j], dp[j - f[i]] + f[i]);
				}
			}
			System.out.println((sum - dp[bag]) + " " + dp[bag]);
			n = scanner.nextInt();
		}
	}
}
```

[HDU2602：Bone Collector](http://acm.hdu.edu.cn/showproblem.php?pid=2602)
裸0-1背包

输入：
第一行为整数T，表示测试样例个数，每个样例三行
第二行包括两个整数N，V，分别表示骨头数量和背包体积(N<=1000，V<=1000)
第三行包括N个整数，表示每根骨头的价值
第四行包括N个整数，表示每根骨头的体积

输出：
最大价值

样例输入：
1
5 10
1 2 3 4 5
5 4 3 2 1

样例输出：
14

```java AC
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		if (n == 0) {
			return;
		}
		for (; n > 0; n--) {
			int nums = scanner.nextInt();
			int bag = scanner.nextInt();
			int[] value = new int[nums];
			int[] volume = new int[nums];
			for (int i = 0; i < nums; i++) {
				value[i] = scanner.nextInt();
			}
			for (int i = 0; i < nums; i++) {
				volume[i] = scanner.nextInt();
			}
			int[] dp = new int[bag + 1];
			for (int i = 0; i < nums; i++) {
				for (int j = bag; j >= volume[i]; j--) {
					dp[j] = Math.max(dp[j], dp[j - volume[i]] + value[i]);
				}
			}
			System.out.println(dp[bag]);
		}
	}
}
```

[HDU2639：Bone Collector II](http://acm.hdu.edu.cn/showproblem.php?pid=2639)
Today we are not desiring the maximum value of bones,but the K-th maximum value of the bones.NOTICE that,we considerate two ways that get the same value of bones are the same.That means,it will be a strictly decreasing sequence from the 1st maximum , 2nd maximum .. to the K-th maximum.

If the total number of different values is less than K,just ouput 0.

输入：
The first line contain a integer T , the number of cases.
Followed by T cases , each case three lines , the first line contain two integer N , V, K(N <= 100 , V <= 1000 , K <= 30)representing the number of bones and the volume of his bag and the K we need. And the second line contain N integers representing the value of each bone. The third line contain N integers representing the volume of each bone.

输出：
One integer per line representing the K-th maximum of the total value (this number will be less than 231).

样例输入：
3
5 10 2
1 2 3 4 5
5 4 3 2 1
5 10 12
1 2 3 4 5
5 4 3 2 1
5 10 16
1 2 3 4 5
5 4 3 2 1

样例输出：
12
2
0

分析：
这次是找第K个最优解，比如上一题是第1个即最优。

第K个最优解：
在0-1背包中，状态数组是f[c]，表示在容量为c时的最优决策，而不是最优的并没有保存下来。
比如：f[c] = max{1, 2}中，最优f[c] = 2，而1被舍弃了。

而现在，我不仅想知道最优决策，我还想知道稍微差一点的决策，即第2决策、第3决策……排个名。
f[c]我们可以看做是f[c][1]这样的二维数组，它的第二维只有一个元素，也就是最优决策。
现在我们增大第二维，比如：f[c][3]，表示不仅保留了最优解1，次解2，3也保留下来了。

即在决策过程中，不把前一个状态的最优解扔掉，而是保存下来。

```java
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		if (n == 0) {
			return;
		}
		for (; n > 0; n--) {
			int nums = scanner.nextInt();
			int bag = scanner.nextInt();
			int k = scanner.nextInt();
			int[] value = new int[nums];
			int[] volume = new int[nums];
			for (int i = 0; i < nums; i++) {
				value[i] = scanner.nextInt();
			}
			for (int i = 0; i < nums; i++) {
				volume[i] = scanner.nextInt();
			}
			int[][] dp = new int[bag + 1][31];
			int[] a = new int[31], b = new int[31];
			for (int i = 0; i < nums; i++) {
				for (int j = bag; j >= volume[i]; j--) {
					for (int t = 1; t <= k; t++) {
						// 把解都保存起来
						a[t] = dp[j][t];
						b[t] = dp[j - volume[i]][t] + value[i];
					}
					a[k + 1] = b[k + 1] = -1;
					int t = 1, ai = 1, bi = 1;
					// 下面的循环相当于求a和b并集，也就是所有的可能解
					while (t <= k && (a[ai] <=k || b[bi] <=k)) {
						if (a[ai] > b[bi]) {
							dp[j][t] = a[ai];
							ai++;
						} else {
							dp[j][t] = b[bi];
							bi++;
						}
						if (dp[j][t] != dp[j][t - 1]) {
							t++;
						}
					}
			}
			System.out.println(dp[bag][k]);
		}
	}
}
```

#### 完全背包

```java 一维数组
import static java.lang.System.out;
public class Main {
	private static int capacity = 10;
	private static String[] items = new String[] { "a", "b", "c", "d", "e" };
	private static int[] weight = new int[] { 2, 2, 6, 5, 4 };
	private static int[] value = new int[] { 6, 3, 5, 4, 6 };
	private static int[] dp = new int[capacity + 1];

	public static void main(String[] args) {
		decide();
		outPutMaxValue();
	}

	private static void decide() {
		for (int i = 0; i < items.length; i++) {
			for (int j = weight[i]; j <= capacity; j++) {
				dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
			}
		}
	}

	private static void outPutMaxValue() {
		out.println(dp[capacity]);
	}
}
```

# 多重背包

[HDU2159：FATE](http://acm.hdu.edu.cn/showproblem.php?pid=2159)
最近xhd正在玩一款叫做FATE的游戏，为了得到极品装备，xhd在不停的杀怪做任务。
久而久之xhd开始对杀怪产生的厌恶感，但又不得不通过杀怪来升完这最后一级。
现在的问题是，xhd升掉最后一级还需n的经验值，xhd还留有m的忍耐度，每杀一个怪xhd会得到相应的经验，并减掉相应的忍耐度。
当忍耐度降到0或者0以下时，xhd就不会玩这游戏。xhd还说了他最多只杀s只怪。请问他能升掉这最后一级吗？

输入：
输入数据有多组，对于每组数据第一行输入n，m，k，s(0 < n,m,k,s < 100)四个正整数。分别表示还需的经验值，保留的忍耐度，怪的种数和最多的杀怪数。接下来输入k行数据。每行数据输入两个正整数a，b(0 < a,b < 20)；分别表示杀掉一只这种怪xhd会得到的经验值和会减掉的忍耐度。(每种怪都有无数个)

输出：
输出升完这级还能保留的最大忍耐度，如果无法升完这级输出-1。

样例输入：
10 10 1 10
1 1
10 10 1 9
1 1
9 10 2 10
1 1
2 2

样例输出：
0
-1
1