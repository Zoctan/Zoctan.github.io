---
title: 蓝桥杯2015年第5届Java-B组省赛
date: 2018-1-25
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 正则表达式

有的时候，恰当地使用正则，可以让我们的工作事半功倍！

如下代码用来检验一个四则运算式中数据项的数目，请填写划线部分缺少的代码。

注意：只填写缺少代码，不要写任何多余内容，例如，已有的双引号。

```java
public class A
{
	public static int f(String s)
	{
		//return s.split("________________").length; //填空
		return s.split("\\p{Punct}").length;
	}
	
	public static void main(String[] args)
	{
		System.out.println(f("12+35*5-2*18/9-3")); //7
		System.out.println(f("354*12+3-14/7*6")); //6
	}
}
```

# 调和级数

1/1 + 1/2 + 1/3 + 1/4 + ... 在数学上称为调和级数。

它是发散的，也就是说，只要加上足够多的项，就可以得到任意大的数字。

但是，它发散的很慢：
前1项和达到 1.0
前4项和才超过 2.0
前83项的和才超过 5.0

那么，请你计算一下，要加多少项，才能使得和达到或超过 15.0 呢？

请填写这个整数。 1835421

```java 暴力
public class Main {
	public static void main(String[] args) {
		double sum = 0;
		for (int i = 1; i < Integer.MAX_VALUE; i++) {
			sum += 1.0 / i;
			if (sum >= 15.0) {
				System.out.println(i);
				break;
			}
		}
	}
}
```

# 近似值

如果x的x次幂结果为10，你能计算出x的近似值吗？

显然，这个值是介于2和3之间的一个数字。

请把x的值计算到小数后6位（四舍五入），并填写这个小数值。 2.506184

注意：只填写一个小数，不要写任何多余的符号或说明。

```java 二分
public class Main {
	public static void main(String[] args) {
		double start = 2.0, end = 3.0;
		while (true) {
			double middle = (start + end) / 2;
			double result = Math.pow(middle, middle);
			if (result == 10.0) {
				System.out.println(middle);
				break;
			} else if (result > 10.0) {
				end = middle;
			} else {
				start = middle;
			}
		}
	}
}
```

# 勾股定理

勾股定理，西方称为毕达哥拉斯定理，它所对应的三角形现在称为：直角三角形。

已知直角三角形的斜边是某个整数，并且要求另外两条边也必须是整数。

求满足这个条件的不同直角三角形的个数。

数据格式：
输入一个整数 n (0<n<10000000) 表示直角三角形斜边的长度。
要求输出一个整数，表示满足条件的直角三角形个数。

样例输入1：
5
输出：
1

样例输入2：
100
输出：
2

样例输入3：
3
输出：
0

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

```java 暴力
import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();

		int solution = 0;
		for (int i = 1; i < n; i++) {
			// 利用开方和取整减少一层循环去猜测第3条边
			int b = (int) Math.sqrt(n * n - i * i);
			if (b != 0 && i * i + b * b == n * n) {
				solution++;
			}
		}
		System.out.println(solution / 2);
	}
}
```

# 数独

如图，玩家需要根据9×9盘面上的已知数字，推理出所有剩余空格的数字，并满足每一行、每一列、每一个同色九宫内的数字均含1-9，不重复。

{% asset_img 6.png 标出坐标 %}

数独的答案都是唯一的，所以，多个解也称为无解。

本图的数字据说是芬兰数学家花了3个月的时间设计出来的较难的题目。但对会使用计算机编程的你来说，恐怕易如反掌了。

本题的要求就是输入数独题目，程序输出数独的唯一解。我们保证所有已知数据的格式都是合法的，并且题目有唯一的解。

格式要求，输入9行，每行9个字符，0代表未知，其它数字为已知。
输出9行，每行9个数字表示数独的解。

样例输入1（即图中题目）：
005300000
800000020
070010500
400005300
010070006
003200080
060500009
004000030
000009700

输出：
145327698
839654127
672918543
496185372
218473956
753296481
367542819
984761235
521839764

样例输入2：
800000000
003600000
070090200
050007000
000045700
000100030
001000068
008500010
090000400

输出：
812753649
943682175
675491283
154237896
369845721
287169534
521974368
438526917
796318452

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 2000ms

```java
import java.util.Scanner;

public class Main {
	static Scanner scanner = new Scanner(System.in);
	static int[][] map = new int[9][9];

	public static void main(String[] args) {
		for (int i = 0; i < 9; i++) {
			String buf = scanner.next();
			char[] num = buf.toCharArray();
			for (int j = 0; j < 9; j++) {
				map[i][j] = num[j] - 48;
			}
		}
		backTrack(0, 0);
	}

	static void backTrack(int x, int y) {
		if (x == 9 && y == 0) {
			for (int i = 0; i < 9; i++) {
				for (int j = 0; j < 9; j++) {
					System.out.print(map[i][j] + " ");
				}
				System.out.println();
			}
			System.exit(0);
		} else {
			// 还没填数
			if (map[x][y] == 0) {
				for (int i = 1; i <= 9; i++) {
					map[x][y] = i;
					if (!isRowCollision(x, y) && !isColumnCollision(x, y) && !is3x3Collision(x, y)) {
						// 从左到右，从上到下填
						backTrack(x + (y + 1) / 9, (y + 1) % 9);
					}
					map[x][y] = 0;
				}
			} else {
				// 填了的就继续下一个
				backTrack(x + (y + 1) / 9, (y + 1) % 9);
			}
		}
	}

	static boolean isRowCollision(int x, int y) {
		for (int i = 0; i < 9; i++) {
			if (map[x][y] == map[x][i] && y != i) {
				return true;
			}
		}
		return false;
	}

	static boolean isColumnCollision(int x, int y) {
		for (int i = 0; i < 9; i++) {
			if (map[x][y] == map[i][y] && x != i) {
				return true;
			}
		}
		return false;
	}

	static boolean is3x3Collision(int x, int y) {
		int start, end;
		if (x < 3) {
			start = 0;
		} else if (x < 6) {
			start = 3;
		} else {
			start = 6;
		}

		if (y < 3) {
			end = 0;
		} else if (y < 6) {
			end = 3;
		} else {
			end = 6;
		}

		for (int i = start; i < start + 3; i++) {
			for (int j = end; j < end + 3; j++) {
				if (map[i][j] == map[x][y] && i != x && j != y) {
					return true;
				}
			}
		}
		return false;
	}
}
```

# 敢死队

G将军有一支训练有素的军队，这个军队除开G将军外，每名士兵都有一个直接上级（可能是其他士兵，也可能是G将军）。
现在G将军将接受一个特别的任务，需要派遣一部分士兵（至少一个）组成一个敢死队，为了增加敢死队队员的独立性，要求如果一名士兵在敢死队中，他的直接上级不能在敢死队中。

请问，G将军有多少种派出敢死队的方法。注意，G将军也可以作为一个士兵进入敢死队。

输入格式：
输入的第一行包含一个整数n，表示包括G将军在内的军队的人数。军队的士兵从1至n编号，G将军编号为1。
接下来n-1个数，分别表示编号为2, 3, ..., n的士兵的直接上级编号，编号i的士兵的直接上级的编号小于i。

输出格式：
输出一个整数，表示派出敢死队的方案数。由于数目可能很大，你只需要输出这个数除10007的余数即可。

样例输入1：
3
1 1
输出：
4

样例说明：
这四种方式分别是：
1. 选1；
2. 选2；
3. 选3；
4. 选2, 3。

样例输入2：
7
1 1 2 2 3 3
输出：
40

数据规模与约定：
对于20%的数据，n ≤ 20；
对于40%的数据，n ≤ 100；
对于100%的数据，1 ≤ n ≤ 100000。

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 2000ms

分析：
树形动态规划

```java
import java.io.BufferedInputStream;
import java.util.Scanner;
import java.util.LinkedList;
import java.util.List;

public class Main {

	static class Node {
		// 士兵的下级
		List<Integer> subordinate = new LinkedList<>();
		int[] dp = { 1, 1 };
	}

	static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	static int n = scanner.nextInt();
	static Node[] node = new Node[n + 1];

	public static void main(String[] args) {
		for (int i = 1; i <= n; i++) {
			node[i] = new Node();
		}

		for (int i = 2; i <= n; i++) {
			int m = scanner.nextInt();
			// 储存下级
			node[m].subordinate.add(i);
		}

		for (int i = n; i > 0; i--) {
			for (int j = 0; j < node[i].subordinate.size(); j++) {
				int sub = node[i].subordinate.get(j);
				node[i].dp[1] *= (node[sub].dp[0]) % 10007;
				node[i].dp[0] *= (node[sub].dp[0] + node[sub].dp[1]) % 10007;
			}
		}

		// 减去所有都没有去的情况
		int count = (node[1].dp[0] + node[1].dp[1] - 1) % 10007;
		System.out.println(count);
	}
}
```