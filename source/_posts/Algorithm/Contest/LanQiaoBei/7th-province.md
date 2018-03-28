---
title: 蓝桥杯2016年第7届省赛
date: 2018-1-23
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 结果填空

## 煤球数目

有一堆煤球，堆成三角棱锥形。具体：
第一层放1个，
第二层3个（排列成三角形），
第三层6个（排列成三角形），
第四层10个（排列成三角形），
....
如果一共有100层，共有多少个煤球？ 171700

```java
public class Main {
	public static void main(String[] args) {
		int a = 1;
		int sum = a;
		for (int i = 2; i <= 100; i++) {
			a += i;
			sum += a;
		}
		System.out.println(sum);
	}
}
```

## 生日蜡烛

某君从某年开始每年都举办一次生日party，并且每次都要吹熄与年龄相同根数的蜡烛。

现在算起来，他一共吹熄了236根蜡烛。

请问，他从多少岁开始过生日party的？ 26

```java
public class Main {
	public static void main(String[] args) {
		int start = 1;
		int end = 2;
		while (true) {
			int sum = (start + end) * (end - start + 1) / 2;
			if (sum < 236) {
				end++;
			} else if (sum > 236) {
				start++;
			} else {
				System.out.println(start);
				break;
			}
		}
	}
}
```

## 凑算式

{% asset_img 3.jpg 凑算式 %}
	 
这个算式中A~I代表1~9的数字，不同的字母代表不同的数字。

比如：
6+8/3+952/714 就是一种解法，
5+3/1+972/486 是另一种解法。

这个算式一共有多少种解法？ 29

```java 回溯
public class Main {
	static int solution = 0;
	static int[] number = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(solution);
	}

	static void backTrack(int depth) {
		if (depth == 9) {
			if (isOK()) {
				solution++;
			}
		} else {
			for (int i = depth; i < 9; i++) {
				swap(number, depth, i);
				backTrack(depth + 1);
				swap(number, depth, i);
			}
		}
	}

	static boolean isOK() {
		int A = number[0];
		int B = number[1];
		int C = number[2];
		int DEF = number[3] * 100 + number[4] * 10 + number[5];
		int GHI = number[6] * 100 + number[7] * 10 + number[8];
		return GHI * B + DEF * C == (10 - A) * C * GHI;
	}

	static void swap(int[] array, int i, int j) {
		int tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
}
```

## 网友年龄

某君新认识一网友。
当问及年龄时，他的网友说：
“我的年龄是个2位数，我比儿子大27岁,
如果把我的年龄的两位数字交换位置，刚好就是我儿子的年龄”

请你计算：网友的年龄一共有多少种可能情况？ 7

提示：30岁就是其中一种可能哦.

```java 暴力
public class Main {
	public static void main(String[] args) {
		int maybe = 0;
		for (int mom = 28; mom <= 99; mom++) {
			for (int son = 1; son <= mom - 27; son++) {
				int a = mom / 10;
				int b = mom % 10;
				int c = b * 10 + a;
				if (c == son && mom - 27 == son) {
					maybe++;
				}
			}
		}
		System.out.println(maybe);
	}
}
```

## 平方怪圈

如果把一个正整数的每一位都平方后再求和，得到一个新的正整数。
对新产生的正整数再做同样的处理。

如此一来，你会发现，不管开始取的是什么数字，
最终如果不是落入1，就是落入同一个循环圈。

请写出这个循环圈中最大的那个数字。 145

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
	public static void main(String[] args) {
		Map<Integer, Boolean> isPut = new HashMap<>();
		int a = 2;
		int sum = 0;
		while (true) {
			while (a != 0) {
				sum += Math.pow(a % 10, 2);
				a /= 10;
			}
			a = sum;
			sum = 0;
			// 落入循环即以前已经添加过
			if (isPut.get(a) != null) {
				for (Integer i : isPut.keySet()) {
					System.out.print(i + " ");
				}
				break;
			} else {
				isPut.put(a, true);
			}
		}
	}
}
```

## 搭积木

小明最近喜欢搭数字积木，
一共有10块积木，每个积木上有一个数字，0~9。

搭积木规则：
每个积木放到其它两个积木的上面，并且一定比下面的两个积木数字小。
最后搭成4层的金字塔形，必须用完所有的积木。

下面是两种合格的搭法：

```
   0
  1 2
 3 4 5
6 7 8 9

   0
  3 1
 7 5 2
9 8 6 4    
```

请你计算这样的搭法一共有多少种？ 768

```java
public class Main {
	static int[] number = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	static int count = 0;

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(count);
	}

	static void backTrack(int n) {
		if (n == 10) {
			count++;
		} else {
			for (int i = n; i < 10; i++) {
				swap(n, i);
				if (isOK(n)) {
					backTrack(n + 1);
				}
				swap(n, i);
			}
		}
	}

	static void swap(int i, int j) {
		int tmp = number[i];
		number[i] = number[j];
		number[j] = tmp;
	}

	static boolean isOK(int n) {
		switch (n) {
		case 1:
			return number[0] < number[1];
		case 2:
			return number[0] < number[2];
		case 3:
			return number[1] < number[3];
		case 4:
			return number[1] < number[4] && number[2] < number[4];
		case 5:
			return number[2] < number[5];
		case 6:
			return number[3] < number[6];
		case 7:
			return number[3] < number[7] && number[4] < number[7];
		case 8:
			return number[4] < number[8] && number[5] < number[8];
		case 9:
			return number[5] < number[9];
		default:
			return true;
		}
	}
}
```

## 方格填数

如下的10个格子

{% asset_img 6.jpg 方格填数 %}

填入0~9的数字。要求：连续的两个数字不能相邻。
（左右、上下、对角都算相邻）

一共有多少种可能的填数方案？ 1580

```java
public class Main {
	static int solution = 0;
	static int number[] = new int[10];
	static int map[][] = new int[3][4];

	public static void main(String args[]) {
		for (int x = 0; x < 3; x++) {
			for (int y = 0; y < 4; y++) {
				// 初始化数据，（除了-1到10之间）的数都可行，这里初始化为-2
				map[x][y] = -2;
			}
		}
		backTrack(0, 1);
		System.out.println(solution);
	}

	static void backTrack(int x, int y) {
		if (x == 2 && y == 3) {
			solution++;
		} else {
			// 将0到9都填入该方格
			for (int num = 0; num <= 9; num++) {
				if (number[num] == 1 || isContinuous(num, x, y)) {
					continue;
				}
				map[x][y] = num;
				number[num] = 1;
				backTrack(x + (y + 1) / 4, (y + 1) % 4);
				map[x][y] = -2;
				number[num] = 0;
			}
		}
	}

	// 判断相邻格子的数字是否连续
	static boolean isContinuous(int num, int x, int y) {
		// 上方
		if (x >= 1 && Math.abs(map[x - 1][y] - num) == 1) {
			return true;
		}
		// 左方
		if (y >= 1 && Math.abs(map[x][y - 1] - num) == 1) {
			return true;
		}
		// 左上方
		if (x >= 1 && y >= 1 && Math.abs(map[x - 1][y - 1] - num) == 1) {
			return true;
		}
		// 右上方
		if (x >= 1 && y < 3 && Math.abs(map[x - 1][y + 1] - num) == 1) {
			return true;
		}
		// 右方
		if (y < 3 && Math.abs(map[x][y + 1] - num) == 1) {
			return true;
		}
		// 下方
		if (x < 2 && Math.abs(map[x + 1][y] - num) == 1) {
			return true;
		}
		// 左下方
		if (x < 2 && y >= 1 && Math.abs(map[x + 1][y - 1] - num) == 1) {
			return true;
		}
		// 右下方
		if (x < 1 && y < 3 && Math.abs(map[x + 1][y + 1] - num) == 1) {
			return true;
		}
		return false;
	}
}
```

## 剪邮票

如图，有12张连在一起的12生肖的邮票。

{% asset_img 7-1.jpg 剪邮票 %}

现在你要从中剪下5张来，要求必须是连着的。（仅仅连接一个角不算相连）

如图2，图3中，粉红色所示部分就是合格的剪取。

{% asset_img 7-2.jpg 剪邮票 %}

{% asset_img 7-3.jpg 剪邮票 %}

请你计算，一共有多少种不同的剪取方法？ 116

```java
public class Main {
	static int solution = 0;
	static int[] number = new int[5];
	static int[] isChosen = new int[12];

	public static void main(String args[]) {
		// 从12个数字里选5个数字
		backTrack(0);
		System.out.println(solution);
	}

	static void backTrack(int n) {
		// 去重
		if (n > 1 && number[n - 1] < number[n - 2]) {
			return;
		}
		if (n == 5) {
			if (isOK()) {
				// printNumber();
				solution++;
			}
		} else {
			for (int i = 0; i < 12; i++) {
				if (isChosen[i] == 0) {
					isChosen[i] = 1;
					number[n] = i;
					backTrack(n + 1);
					isChosen[i] = 0;
				}
			}
		}
	}

	static boolean isOK() {
		boolean[] isVisit = new boolean[5];
		dfs(isVisit, 0);
		return isVisit[0] && isVisit[1] && isVisit[2] && isVisit[3] && isVisit[4];
	}

	static void dfs(boolean isVisit[], int i) {
		isVisit[i] = true;
		for (int j = 0; j < isVisit.length; j++) {
			if (!isVisit[j]) {
				if (number[i] / 4 == number[j] / 4 && Math.abs(number[i] - number[j]) == 1) {
					dfs(isVisit, j);
				}
				if (Math.abs(number[i] - number[j]) == 4) {
					dfs(isVisit, j);
				}
			}
		}
	}

	static void printNumber() {
		for (int i : number) {
			System.out.print(i + " ");
		}
		System.out.println();
	}
}
```

## 寒假作业

现在小学的数学题目也不是那么好玩的。
看看这个寒假作业：

□ + □ = □
□ - □ = □
□ × □ = □
□ ÷ □ = □
   
每个方块代表1~13中的某一个数字，但不能重复。
比如：
6  + 7 = 13
9  - 8 = 1
3  * 4 = 12
10 / 2 = 5

以及： 
7  + 6 = 13
9  - 8 = 1
3  * 4 = 12
10 / 2 = 5

就算两种解法。（加法，乘法交换律后算不同的方案）
 
你一共找到了多少种方案？ 64

```java
public class Main {
	static int[] number = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 };
	static int count = 0;

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(count);
	}

	static void backTrack(int n) {
		if (n == 13) {
			System.out.println(number[0] + "+" + number[1] + "=" + number[2]);
			System.out.println(number[3] + "-" + number[4] + "=" + number[5]);
			System.out.println(number[6] + "*" + number[7] + "=" + number[8]);
			System.out.println(number[9] + "/" + number[10] + "=" + number[11]);
			System.out.println(number[9] + "/" + number[10] + "=" + number[12]);
			System.out.println();
			count++;
		} else {
			for (int i = n; i < 13; i++) {
				swap(n, i);
				if (isOK(n)) {
					backTrack(n + 1);
				}
				swap(n, i);
			}
		}
	}

	static void swap(int i, int j) {
		int tmp = number[i];
		number[i] = number[j];
		number[j] = tmp;
	}

	static boolean isOK(int n) {
		switch (n) {
		case 2:
			return number[0] + number[1] == number[2];
		case 5:
			return number[3] - number[4] == number[5];
		case 8:
			return number[6] * number[7] == number[8];
		case 11:
			return number[11] * number[12] == number[10];
		default:
			return true;
		}
	}
}
```

# 代码填空

## 分小组

9名运动员参加比赛，需要分3组进行预赛。
有哪些分组的方案呢？

我们标记运动员为 A,B,C,... I
下面的程序列出了所有的分组方法。

该程序的正常输出为：
ABC DEF GHI
ABC DEG FHI
ABC DEH FGI
ABC DEI FGH
ABC DFG EHI
ABC DFH EGI
ABC DFI EGH
ABC DGH EFI
ABC DGI EFH
ABC DHI EFG
ABC EFG DHI
ABC EFH DGI
ABC EFI DGH
ABC EGH DFI
ABC EGI DFH
ABC EHI DFG
ABC FGH DEI
ABC FGI DEH
ABC FHI DEG
ABC GHI DEF
ABD CEF GHI
ABD CEG FHI
ABD CEH FGI
ABD CEI FGH
ABD CFG EHI
ABD CFH EGI
ABD CFI EGH
ABD CGH EFI
ABD CGI EFH
ABD CHI EFG
ABD EFG CHI
..... (以下省略，总共560行)。

```java
public class Main {
	public static String remain(int[] a) {
		String s = "";
		for (int i = 0; i < a.length; i++) {
			if (a[i] == 0)
				s += (char) (i + 'A');
		}
		return s;
	}

	public static void f(String s, int[] a) {
		for (int i = 0; i < a.length; i++) {
			if (a[i] == 1)
				continue;
			a[i] = 1;
			for (int j = i + 1; j < a.length; j++) {
				if (a[j] == 1)
					continue;
				a[j] = 1;
				for (int k = j + 1; k < a.length; k++) {
					if (a[k] == 1)
						continue;
					a[k] = 1;
					// System.out.println(_____________); //填空
					System.out.println(s + " " + (char) (i + 'A') + (char) (j + 'A') + (char) (k + 'A') + " " + remain(a));
					a[k] = 0;
				}
				a[j] = 0;
			}
			a[i] = 0;
		}
	}

	public static void main(String[] args) {
		int[] a = new int[9];
		a[0] = 1;

		for (int b = 1; b < a.length; b++) {
			a[b] = 1;
			for (int c = b + 1; c < a.length; c++) {
				a[c] = 1;
				String s = "A" + (char) (b + 'A') + (char) (c + 'A');
				f(s, a);
				a[c] = 0;
			}
			a[b] = 0;
		}
	}
}
```

## 抽签

X星球要派出一个5人组成的观察团前往W星。
其中：
A国最多可以派出4人。
B国最多可以派出2人。
C国最多可以派出2人。
....

那么最终派往W星的观察团会有多少种国别的不同组合呢？

下面的程序解决了这个问题。
数组a[]中是每个国家可以派出的最多的名额。
程序执行结果为：
DEFFF
CEFFF
CDFFF
CDEFF
CCFFF
CCEFF
CCDFF
CCDEF
BEFFF
BDFFF
BDEFF
BCFFF
BCEFF
BCDFF
BCDEF
....
(以下省略，总共101行)

```java
public class Main {
	public static void f(int[] a, int k, int n, String s) {
		if (k == a.length) {
			if (n == 0)
				System.out.println(s);
			return;
		}

		String s2 = s;
		for (int i = 0; i <= a[k]; i++) {
			// _____________________________; //填空位置
			// a：各个国家能派的人数
			// k：第几个国家
			// n：还需要派几个人
			// s2：当前派遣队伍
			f(a, k + 1, n - i, s2);
			s2 += (char) (k + 'A');
		}
	}

	public static void main(String[] args) {
		int[] a = { 4, 2, 2, 1, 1, 3 };
		f(a, 0, 5, "");
	}
}
```

## 消除尾一

下面的代码把一个整数的二进制表示的最右边的连续的1全部变成0
如果最后一位是0，则原数字保持不变。

如果采用代码中的测试数据，应该输出：
00000000000000000000000001100111   00000000000000000000000001100000
00000000000000000000000000001100   00000000000000000000000000001100

请仔细阅读程序，填写划线部分缺少的代码。

```java
public class Main {
	public static void main(String[] args) {
		f(103);
		f(12);
	}

	private static void f(int x) {
		int i;
		for (i = 0; i < 32; i++)
			System.out.print(x >> (31 - i) & 1);
		System.out.print("   ");

		// x = _______________________; // 填空
		x = x & (x + 1);

		for (i = 0; i < 32; i++)
			System.out.print(x >> (31 - i) & 1);
		System.out.println();
	}
}
```

## 快速排序

排序在各种场合经常被用到。
快速排序是十分常用的高效率的算法。

其思想是：先选一个“标尺”，用它把整个队列过一遍筛子，以保证：其左边的元素都不大于它，其右边的元素都不小于它。

这样，排序问题就被分割为两个子区间。
再分别对子区间排序就可以了。

下面的代码是一种实现，请分析并填写划线部分缺少的代码。

```java
public class Main {
	public static void main(String[] args) {
		int i;
		int a[] = { 5, 13, 6, 24, 2, 8, 19, 27, 6, 12, 1, 17 };
		int N = 12;

		quicksort(a, 0, N - 1);

		for (i = 0; i < N; i++)
			System.out.print(a[i] + " ");
		System.out.println();
	}

	private static int partition(int[] a, int p, int r) {
		int i = p;
		int j = r + 1;
		int x = a[p];
		while (true) {
			while (i < r && a[++i] < x)
				;
			while (a[--j] > x)
				;
			if (i >= j)
				break;
			swap(a, i, j);
		}
		// ______________________; // 填空
		swap(a, p, j);
		return j;
	}

	private static void quicksort(int[] a, int p, int r) {
		if (p < r) {
			int q = partition(a, p, r);
			quicksort(a, p, q - 1);
			quicksort(a, q + 1, r);
		}
	}

	private static void swap(int[] a, int i, int j) {
		int tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
}
```

## 骰子游戏

我们来玩一个游戏。
同时掷出3个普通骰子（6个面上的数字分别是1~6）。
如果其中一个骰子上的数字等于另外两个的和，你就赢了。

下面的程序计算出你能获胜的精确概率（以既约分数表示）

```java
public class Main {
	public static void main(String[] args) {
		int n = 0;
		for (int i = 0; i < 6; i++)
			for (int j = 0; j < 6; j++)
				for (int k = 0; k < 6; k++) {
					// if(________________________________) n++; //填空位置
					if ((i + 1) + (j + 1) == (k + 1)
						|| (i + 1) + (k + 1) == (j + 1)
						|| (j + 1) + (k + 1) == (i + 1))
						n++;
				}

		int m = gcd(n, 6 * 6 * 6);
		System.out.println(n / m + "/" + 6 * 6 * 6 / m);
	}

	public static int gcd(int a, int b) {
		if (b == 0)
			return a;
		return gcd(b, a % b);
	}
}
```

# 程序设计

## 四平方和

四平方和定理，又称为拉格朗日定理：
每个正整数都可以表示为至多4个正整数的平方和。
如果把0包括进去，就正好可以表示为4个数的平方和。

比如：
5 = 0^2 + 0^2 + 1^2 + 2^2
7 = 1^2 + 1^2 + 1^2 + 2^2
（^符号表示乘方的意思）

对于一个给定的正整数，可能存在多种平方和的表示法。
要求你对4个数排序：
0 <= a <= b <= c <= d
并对所有的可能表示法按 a,b,c,d 为联合主键升序排列，最后输出第一个表示法

程序输入为一个正整数N (N<5000000)
要求输出4个非负整数，按从小到大排序，中间用空格分开

样例输入1：
5
样例输出1：
0 0 1 2

样例输入2：
12
样例输出2：
0 2 2 2

样例输入3：
773535
样例输出4：
1 1 267 838

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 3000ms

```java 暴力
import java.io.BufferedInputStream;
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));

	public static void main(String args[]) {
		int n = scanner.nextInt();
		for (int a = 0; a < Math.sqrt(n); a++) {
			for (int b = a; b < Math.sqrt(n); b++) {
				for (int c = b; c < Math.sqrt(n); c++) {
					for (int d = c; d < Math.sqrt(n); d++) {
						if (a * a + b * b + c * c + d * d == n) {
							System.out.printf("%d %d %d %d", a, b, c, d);
							return;
						}
					}
				}
			}
		}
	}
}
```

## 取球博弈

两个人玩取球的游戏，一共有N个球，每人轮流取球，每次可取集合{n1,n2,n3}中的任何一个数目，如果无法继续取球，则游戏结束。此时，持有奇数个球的一方获胜。如果两人都是奇数，则为平局。

假设双方都采用最聪明的取法，第一个取球的人一定能赢吗？

输入格式：
第一行3个正整数n1 n2 n3，空格分开，表示每次可取的数目 (0<n1,n2,n3<100)
第二行5个正整数x1 x2 ... x5，空格分开，表示5局的初始球数(0<xi<1000)

输出格式：
一行5个字符，空格分开。分别表示每局先取球的人能否获胜。
能获胜则输出+
次之，如有办法逼平对手，输出0
无论如何都会输，则输出-

样例输入1：
1 2 3
1 2 3 4 5

输出：
+ 0 + 0 -

样例输入2：
1 4 5
10 11 12 13 15

输出：
0 - 0 + +

样例输入3：
2 3 5
7 8 9 10 11

输出：
+ 0 0 0 0

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 3000ms

分析：

最聪明做法：在保证持有奇数的球情况下，尽量取最大的偶数球。

```java
import java.io.BufferedInputStream;
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	static int[] ball = new int[3];
	static int[] init = new int[5];
	static String result = "";

	public static void main(String args[]) {
		for (int i = 0; i < 3; i++) {
			ball[i] = scanner.nextInt();
		}
		for (int i = 0; i < 5; i++) {
			init[i] = scanner.nextInt();
		}
		play();
		System.out.println(result.toString());
	}

	// 还可以取的球数
	static int rest = 0;
	static int first = 0, second = 0;

	static void play() {
		for (int i = 0; i < 5; i++, first = 0, second = 0) {
			rest = init[i];
			while (rest > 0) {
				first += afterPick(first);
				second += afterPick(second);
			}
			judge();
		}
	}

	static int afterPick(int self) {
		int pick = -1;
		// 奇 + 奇 = 偶
		// 偶 + 偶 = 偶
		// 持有奇数个球
		if ((self & 1) == 1) {
			// 找到最大偶数，保证取到后仍是最大奇数
			for (int i = 2; i >= 0; i--) {
				if ((ball[i] & 1) == 0) {
					if (rest >= ball[i]) {
						rest -= ball[i];
						pick = ball[i];
						break;
					}
				}
			}
		} else {
			// 找到最大奇数
			for (int i = 2; i >= 0; i--) {
				if ((ball[i] & 1) == 1) {
					if (rest >= ball[i]) {
						rest -= ball[i];
						pick = ball[i];
						break;
					}
				}
			}
		}
		// 找不到
		if (pick == -1) {
			for (int i = 2; i >= 0; i--) {
				if (rest >= ball[i]) {
					rest -= ball[i];
					pick = ball[i];
					break;
				}
				// 如果到最小球还没找到，即剩余的比最小球还小
				// 一般来说到了最后一个，默认两者都不取球
				if (i == 0 && pick == -1) {
					rest = 0;
					pick = 0;
				}
			}
		}
		return pick;
	}

	static void judge() {
		if ((first & 1) == 1) {
			if ((second & 1) == 1) {
				result += "0";
			} else {
				result += "+";
			}
		} else {
			if ((second & 1) == 0) {
				result += "0";
			} else {
				result += "-";
			}
		}
		result += " ";
	}
}
```

## 压缩变换

小明最近在研究压缩算法。
他知道，压缩的时候如果能够使得数值很小，就能通过熵编码得到较高的压缩比。
然而，要使数值很小是一个挑战。

最近，小明需要压缩一些正整数的序列，这些序列的特点是，后面出现的数字很大可能是刚出现过不久的数字。对于这种特殊的序列，小明准备对序列做一个变换来减小数字的值。

变换的过程如下：
从左到右枚举序列，每枚举到一个数字，如果这个数字没有出现过，刚将数字变换成它的相反数，如果数字出现过，则看它在原序列中最后的一次出现后面（且在当前数前面）出现了几种数字，用这个种类数替换原来的数字。

比如，序列(a1, a2, a3, a4, a5)=(1, 2, 2, 1, 2)在变换过程为：
a1: 1未出现过，所以a1变为-1；
a2: 2未出现过，所以a2变为-2；
a3: 2出现过，最后一次为原序列的a2，在a2后、a3前有0种数字，所以a3变为0；
a4: 1出现过，最后一次为原序列的a1，在a1后、a4前有1种数字，所以a4变为1；
a5: 2出现过，最后一次为原序列的a3，在a3后、a5前有1种数字，所以a5变为1。
现在，给出原序列，请问，按这种变换规则变换后的序列是什么。

输入格式：
输入第一行包含一个整数n，表示序列的长度。
第二行包含n个正整数，表示输入序列。

输出格式：
输出一行，包含n个数，表示变换后的序列。

样例输入1：
5
1 2 2 1 2

样例输出1：
-1 -2 0 1 1

样例输入2：
12
1 1 2 3 2 3 1 2 2 2 3 1

样例输出2：
-1 0 -2 -3 1 1 2 2 0 0 2 2

数据规模与约定：
对于30%的数据，n<=1000；
对于50%的数据，n<=30000；
对于100%的数据，1 <=n<=100000，1<=ai<=10^9

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 3000ms

```java
import java.util.HashMap;
import java.io.BufferedInputStream;
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	static int n = scanner.nextInt();
	static int[] sequence = new int[n];
	static int[] newSequence = new int[n];

	public static void main(String args[]) {
		for (int i = 0; i < n; i++) {
			sequence[i] = scanner.nextInt();
		}
		// 字典
		// key：序列数字
		// value：从前一次出现到当前出现间，不同的数字
		HashMap<Integer, HashMap<Integer, Integer>> type = new HashMap<>();
		for (int i = 0, k = 0; i < n; i++) {
			// 不同的数字，hash函数最后的size-1就是不同的数字个数
			// 之所以是size-1是因为这里还保存了序列数字本身前一次出现的位置
			HashMap<Integer, Integer> iType = type.get(sequence[i]);
			if (iType == null) {
				newSequence[i] = -sequence[i];
				iType = new HashMap<>();
				// 保存本身的位置i
				iType.put(sequence[i], i);
				type.put(sequence[i], iType);
			} else {
				newSequence[i] = iType.size() - 1;
				// 前面出现数字的更新位置后退1，这个走的速度慢
				k = iType.get(sequence[i]) + 1;
				// 清除不同数字
				iType.clear();
				// 更新当前的位置i
				iType.put(sequence[i], i);
			}
			// 从第2个开始，前面出现的都要进行统计
			if (i != 0) {
				for (int j = k; j < i; j++) {
					HashMap<Integer, Integer> frontType = type.get(sequence[j]);
					frontType.put(sequence[i], i);
				}
			}
		}
		for (int i = 0; i < n; i++) {
			System.out.print(newSequence[i] + " ");
		}
	}
}
```

## 密码脱落

X星球的考古学家发现了一批古代留下来的密码。
这些密码是由A、B、C、D 四种植物的种子串成的序列。
仔细分析发现，这些密码串当初应该是前后对称的（也就是我们说的镜像串）。
由于年代久远，其中许多种子脱落了，因而可能会失去镜像的特征。

你的任务是：给定一个现在看到的密码串，计算一下从当初的状态，它要至少脱落多少个种子，才可能会变成现在的样子。

输入一行，表示现在看到的密码串（长度不大于1000）
要求输出一个正整数，表示至少脱落了多少个种子。

样例1输入：
ABCBA

输出：
0

样例2输入：
ABDCDCBABC

输出：
3

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 1000ms

分析：
贪心，[](http://blog.csdn.net/f_zyj/article/details/51082257)

```java

```

## 最大比例

X星球的某个大奖赛设了M级奖励。
每个级别的奖金是一个正整数，并且相邻的两个级别间的比例是个固定值。
也就是说：所有级别的奖金数构成了一个等比数列。比如：
16, 24, 36, 54
其等比值为：3/2

现在，我们随机调查了一些获奖者的奖金数。
请你据此推算可能的最大的等比值。

输入格式：
第一行为数字 N (0<N<100)，表示接下的一行包含N个正整数
第二行N个正整数Xi(Xi<1 000 000 000 000)，用空格分开。每个整数表示调查到的某人的奖金数额

要求输出：
一个形如A/B的分数，要求A、B互质。表示可能的最大比例系数

测试数据保证了输入格式正确，并且最大比例是存在的。

例如，输入：
3
1250 200 32

程序应该输出：
25/4

再例如，输入：
4
3125 32 32 200

程序应该输出：
5/2

再例如，输入：
3
549755813888 524288 2

程序应该输出：
4/1

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 3000ms

```java

```

## 交换瓶子

有N个瓶子，编号 1 ~ N，放在架子上。

比如有5个瓶子：
2 1 3 5 4

要求每次拿起2个瓶子，交换它们的位置。
经过若干次后，使得瓶子的序号为：
1 2 3 4 5

对于这么简单的情况，显然，至少需要交换2次就可以复位。

如果瓶子更多呢？你可以通过编程来解决。

输入格式为两行：
第一行: 一个正整数N（N<10000）, 表示瓶子的数目
第二行：N个正整数，用空格分开，表示瓶子目前的排列情况。

输出数据为一行一个正整数，表示至少交换多少次，才能完成排序。

样例1输入：
5
3 1 2 5 4

输出：
3

样例2输入：
5
5 4 3 2 1

输出：
2

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

分析：
从1下标开始遍历，如果下标和值不一致就交换，直到一致，然后继续遍历。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;

public class Main {
	static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		in.nextToken();
		int n = (int) in.nval;
		int[] array = new int[n + 1];
		for (int i = 1; i <= n; i++) {
			in.nextToken();
			array[i] = (int) in.nval;
		}

		int count = 0;
		for (int i = 1; i <= n; i++) {
			while (array[i] != i) {
				swap(array, i, array[i]);
				count++;
			}
		}

		out.println(count);
		out.flush();
	}

	static void swap(int[] array, int i, int j) {
		int tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
}
```

## 冰雹数

任意给定一个正整数N，
如果是偶数，执行： N / 2
如果是奇数，执行： N * 3 + 1

生成的新的数字再执行同样的动作，循环往复。

通过观察发现，这个数字会一会儿上升到很高，一会儿又降落下来。
就这样起起落落的，但最终必会落到“1”
这有点像小冰雹粒子在冰雹云中翻滚增长的样子。

比如N=9
9,28,14,7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1
可以看到，N=9的时候，这个“小冰雹”最高冲到了52这个高度。

输入格式：
一个正整数N（N<1000000）
输出格式：
**一个正整数，表示不大于N的数字，经过冰雹数变换过程中，最高冲到了多少。**

样例1输入：
10

输出：
52

样例2输入：
100

输出：
9232

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 1000ms

分析：
最简单做法就是每次都计算，但是n比较大时，可能会超时。
既然知道了范围，可以通过本地打表，将所有最大值和对应的n保存起来，这样查询的时间复杂度为1。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.util.HashMap;
import java.util.Map;

public class Main {
	static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		in.nextToken();
		long n = (long) in.nval;
		// 打表
		getAll();
		/*
		long min = Long.MAX_VALUE;
		for (long key : map.keySet()) {
			if (key > n) {
				min = Math.min(map.get(key), min);
			}
		}
		out.println(min);
		out.flush();
		*/
	}

	static void getAll() {
		long n = 1000000;
		long max = 1;
		// key最大值
		// value下标
		Map<Long, Long> map = new HashMap<>();
		for (long i = 0; i < n; i++) {
			long k = i;
			while (k > 1) {
				max = Math.max(k, max);
				if ((k & 1) == 1) {
					k = k * 3 + 1;
				} else {
					k /= 2;
				}
			}
			map.put(max, i);
		}
		out.println("static Map<Long, Long> map;");
		out.println("static {");
		out.println("map = new HashMap<>();");
		for (long key : map.keySet()) {
			out.printf("map.put(%dL, %dL);\n", map.get(key), key);
		}
		out.println("}");
		out.flush();
	}
}
```

## 卡片换位

你玩过华容道的游戏吗？
这是个类似的，但更简单的游戏。
看下面 3 x 2 的格子

+---+---+---+
| A | * | * |
+---+---+---+
| B |   | * |
+---+---+---+

在其中放5张牌，其中A代表关羽，B代表张飞，* 代表士兵。
还有一个格子是空着的。

你可以把一张牌移动到相邻的空格中去(对角不算相邻)。
游戏的目标是：关羽和张飞交换位置，其它的牌随便在哪里都可以。

输入格式：
输入两行6个字符表示当前的局面

输出格式：
一个整数，表示最少多少步，才能把AB换位（其它牌位置随意）

样例1输入：
* A
**B

输出：
17

样例2输入：
A B
***

输出：
12

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 1000ms

```java 广度搜索
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Main {
	static Map<String, Boolean> isVisit = new HashMap<>();
	static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

	public static void main(String[] args) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		String start = in.readLine() + in.readLine();
		String end = swap(start, start.indexOf("A"), start.indexOf("B"));
		out.println("start -> " + start + " end -> " + end);
		out.flush();
		bfs(start, end);
	}

	static boolean isEnd(String maybe, String end) {
		// 其它的牌随便在哪里都可以，只要AB位置互换
		int A = end.indexOf("A");
		int B = end.indexOf("B");

		int a = maybe.indexOf("A");
		int b = maybe.indexOf("B");

		return A == a && B == b;
	}

	static void bfs(String start, String end) {
		isVisit.put(start, true);
		Queue<Node> queue = new ArrayDeque<>();
		queue.offer(new Node(start, 0));
		while (!queue.isEmpty()) {
			Node headNode = queue.poll();
			headNode.buildChildNode();
			for (Node node : headNode.childNode) {
				out.println(node.value + " " + node.step);
				out.flush();
				if (isEnd(node.value, end)) {
					out.println(node.step);
					out.flush();
					return;
				} else {
					queue.offer(node);
				}
			}
		}
	}

	static String swap(String string, int i, int j) {
		char[] cs = string.toCharArray();
		char tmp = cs[i];
		cs[i] = cs[j];
		cs[j] = tmp;
		return new String(cs);
	}

	static class Node {
		String value;
		int step;
		List<Node> childNode;

		Node(String value, int step) {
			this.value = value;
			this.step = step;
		}

		void buildChildNode() {
			this.childNode = new LinkedList<>();

			// 每个节点最多3种情况
			List<String> node = new LinkedList<>();
			int index = this.value.indexOf(" ");
			// 在上边
			if (index < 3) {
				// 在左边，则右边、下边可以走过来
				if (index == 0) {
					node.add(swap(this.value, index, index + 1));
					node.add(swap(this.value, index, 3));
				}
				// 在中间，则左边、右边、下边可以走过来
				else if (index == 1) {
					node.add(swap(this.value, index, index - 1));
					node.add(swap(this.value, index, index + 1));
					node.add(swap(this.value, index, 4));
				}
				// 在右边，则左边、下边可以走过来
				else if (index == 2) {
					node.add(swap(this.value, index, index - 1));
					node.add(swap(this.value, index, 5));
				}
			} else {
				// 在下边
				// 在左边，则右边、上边可以走过来
				if (index == 3) {
					node.add(swap(this.value, index, index + 1));
					node.add(swap(this.value, index, 0));
				}
				// 在中间，则左边、右边、上边可以走过来
				else if (index == 4) {
					node.add(swap(this.value, index, index - 1));
					node.add(swap(this.value, index, index + 1));
					node.add(swap(this.value, index, 1));
				}
				// 在右边，则左边、上边可以走过来
				else if (index == 5) {
					node.add(swap(this.value, index, index - 1));
					node.add(swap(this.value, index, 2));
				}
			}

			for (int i = 0; i < node.size(); i++) {
				if (isVisit.get(node.get(i)) == null) {
					this.childNode.add(new Node(node.get(i), this.step + 1));
					isVisit.put(node.get(i), true);
				}
			}
		}
	}
}
```