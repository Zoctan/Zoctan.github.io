---
title: 蓝桥杯2017年第8届省赛
date: 2018-1-26
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 结果填空

## 购物单

小明刚刚找到工作，老板人很好，只是老板夫人很爱购物。老板忙的时候经常让小明帮忙到商场代为购物。小明很厌烦，但又不好推辞。

这不，XX大促销又来了！老板夫人开出了长长的购物单，都是有打折优惠的。
小明也有个怪癖，不到万不得已，从不刷卡，直接现金搞定。
现在小明很心烦，请你帮他计算一下，需要从取款机上取多少现金，才能搞定这次购物。

取款机只能提供100元面额的纸币。小明想尽可能少取些现金，够用就行了。
你的任务是计算出，小明最少需要取多少现金。

以下是让人头疼的购物单，为了保护隐私，物品名称被隐藏了。

```
****     180.90       88折
****      10.25       65折
****      56.14        9折
****     104.65        9折
****     100.30       88折
****     297.15        半价
****      26.75       65折
****     130.62        半价
****     240.28       58折
****     270.62        8折
****     115.87       88折
****     247.34       95折
****      73.21        9折
****     101.00        半价
****      79.54        半价
****     278.44        7折
****     199.26        半价
****      12.97        9折
****     166.30       78折
****     125.50       58折
****      84.98        9折
****     113.35       68折
****     166.57        半价
****      42.56        9折
****      81.90       95折
****     131.78        8折
****     255.89       78折
****     109.17        9折
****     146.69       68折
****     139.33       65折
****     141.16       78折
****     154.74        8折
****      59.42        8折
****      85.44       68折
****     293.70       88折
****     261.79       65折
****      11.30       88折
****     268.27       58折
****     128.29       88折
****     251.03        8折
****     208.39       75折
****     128.88       75折
****      62.06        9折
****     225.87       75折
****      12.89       75折
****      34.28       75折
****      62.16       58折
****     129.12        半价
****     218.37        半价
****     289.69        8折
```

需要说明的是，88折指的是按标价的88%计算，而8折是按80%计算，余者类推。
特别地，半价是按50%计算。

请提交小明要从取款机上提取的金额，单位是元。 5200
答案是一个整数，类似4300的样子，结尾必然是00，不要填写任何多余的内容。

```java
import java.util.ArrayList;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		ArrayList<String> list = new ArrayList<>();
		while (scanner.hasNext()) {
			list.add(scanner.next());
		}
		scanner.close();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (i % 3 == 1) {
				double percent = 0.0;
				if (list.get(i + 1).equals("半价")) {
					percent = 0.5;
				} else {
					percent = Integer.parseInt(list.get(i + 1).split("折")[0]) / 10.0;
					if (percent > 0) {
						percent /= 10.0;
					}
				}
				sum += Double.parseDouble(list.get(i)) * percent;
			}
		}
		System.out.println(sum);
	}
}
```

## 纸牌三角形

A,2,3,4,5,6,7,8,9 共9张纸牌排成一个正三角形（A按1计算）。要求每个边的和相等。
下图就是一种排法。

{% asset_img 2.png 纸牌三角形 %}

这样的排法可能会有很多。

如果考虑旋转、镜像后相同的算同一种，一共有多少种不同的排法呢？ 144

请你计算并提交该数字。

注意：需要提交的是一个整数，不要提交任何多余内容。

```java 回溯
public class Main {
	private static int[] array = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	private static int solution = 0;

	public static void main(String[] args) {
		backTrack(0);
		// 旋转3种情况，镜像2种情况
		System.out.println(solution / 6);
	}

	private static void backTrack(int num) {
		if (num == 9) {
			if (isOK()) {
				solution++;
			}
		} else {
			for (int i = num; i < 9; i++) {
				swap(num, i);
				backTrack(num + 1);
				swap(num, i);
			}
		}
	}

	private static void swap(int i, int j) {
		int tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}

	private static boolean isOK() {
		int a = array[0] + array[1] + array[2] + array[3];
		int b = array[3] + array[4] + array[5] + array[6];
		int c = array[6] + array[7] + array[8] + array[0];
		return a == b && a == c;
	}
}
```

## 等差素数列

2,3,5,7,11,13,....是素数序列。
类似：7,37,67,97,127,157 这样完全由素数组成的等差数列，叫等差素数数列。
上边的数列公差为30，长度为6。

2004年，格林与华人陶哲轩合作证明了：存在任意长度的素数等差数列。
这是数论领域一项惊人的成果！

有这一理论为基础，请你借助手中的计算机，满怀信心地搜索：

长度为10的等差素数列，其公差最小值是多少？ 210

分别是：
199 409 619 829 1039 1249 1459 1669 1879 2089

注意：需要提交的是一个整数，不要填写任何多余的内容和说明文字。

```java 暴力
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {
	private static ArrayList<Integer> prime;

	public static void main(String[] args) {
		prime = getPrime(10000);
		find(10);
		System.out.println();
	}

	private static void find(int length) {
		int tolerance = 1;
		int i = 0;
		// 从公差为1找起
		// 凑齐10个数即公差存在，且最小
		ArrayList<Integer> container = new ArrayList<>();
		int nums = 1;
		while (true) {
			container.add(prime.get(i));
			for (int k = i + 1, j = 1; k < prime.size(); k++) {
				if (prime.get(k) - prime.get(i) == j * tolerance) {
					container.add(prime.get(k));
					nums++;
					j++;
				}
			}
			if (nums == 10) {
				for (Integer k : container) {
					System.out.print(k + " ");
				}
				System.out.println();
				System.out.println(tolerance);
				break;
			} else {
				container.clear();
				nums = 1;
				i++;
				if (i == prime.size()) {
					tolerance++;
					i = 0;
				}
			}
		}
	}

	private static ArrayList<Integer> getPrime(int n) {
		boolean[] notPrime = new boolean[n + 1];
		int sqrtN = (int) Math.sqrt(n);
		for (int i = 2; i <= sqrtN; i++) {
			if (notPrime[i])
				continue;
			for (int j = i * i; j <= n; j += i) {
				// j是i的倍数，即不是素数
				notPrime[j] = true;
			}
		}
		ArrayList<Integer> prime = new ArrayList<>();
		if (n > 1) {
			prime.add(2);
		}
		for (int i = 3; i <= n; i += 2) {
			if (!notPrime[i]) {
				prime.add(i);
			}
		}
		System.out.println(prime.size());
		return prime;
	}
}
```

## 方格分割

6x6的方格，沿着格子的边线剪开成两部分。
要求这两部分的形状完全相同。

如图是可行的分割法：

{% asset_img 4-1.png 方格分割 %}

{% asset_img 4-2.png 方格分割 %}

{% asset_img 4-3.png 方格分割 %}

试计算：
包括这3种分法在内，一共有多少种不同的分割方法。 509
注意：旋转对称的属于同一种分割法。

请提交该整数，不要填写任何多余的内容或说明文字。

分析：
从中间走，能走到边界的话即是一种分割方法。

```java 抄的
public class Main {
	private static int n = 6;
	private static int[][] map = new int[n + 1][n + 1];
	private static int solution = 0;
	private static int[][] direction = new int[][] { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };

	public static void main(String[] args) {
		map[3][3] = 1;
		backTrack(3, 3);
		System.out.println(solution / 4);
	}

	private static void backTrack(int x, int y) {
		if (x == 0 || y == 0 || x == n || y == n) {
			solution++;
			return;
		}
		for (int i = 0; i < 4; i++) {
			int dx = x + direction[i][0];
			int dy = y + direction[i][1];
			if (map[dx][dy] == 0) {
				map[dx][dy] = 1;
				map[n - dx][n - dy] = 1;
				backTrack(dx, dy);
				map[dx][dy] = 0;
				map[n - dx][n - dy] = 0;
			}
		}
	}
}
```

## 承压计算

X星球的高科技实验室中整齐地堆放着某批珍贵金属原料。

每块金属原料的外形、尺寸完全一致，但重量不同。
金属材料被严格地堆放成金字塔形。

```
                             7 
                            5 8 
                           7 8 8 
                          9 2 7 2 
                         8 1 4 9 1 
                        8 1 8 8 4 1 
                       7 9 6 1 4 5 4 
                      5 6 5 5 6 9 5 6 
                     5 5 4 7 9 3 5 5 1 
                    7 5 7 9 7 4 7 3 3 1 
                   4 6 4 5 5 8 8 3 2 4 3 
                  1 1 3 3 1 6 6 5 5 4 4 2 
                 9 9 9 2 1 9 1 9 2 9 5 7 9 
                4 3 3 7 7 9 3 6 1 3 8 8 3 7 
               3 6 8 1 5 3 9 5 8 3 8 1 8 3 3 
              8 3 2 3 3 5 5 8 5 4 2 8 6 7 6 9 
             8 1 8 1 8 4 6 2 2 1 7 9 4 2 3 3 4 
            2 8 4 2 2 9 9 2 8 3 4 9 6 3 9 4 6 9 
           7 9 7 4 9 7 6 6 2 8 9 4 1 8 1 7 2 1 6 
          9 2 8 6 4 2 7 9 5 4 1 2 5 1 7 3 9 8 3 3 
         5 2 1 6 7 9 3 2 8 9 5 5 6 6 6 2 1 8 7 9 9 
        6 7 1 8 8 7 5 3 6 5 4 7 3 4 6 7 8 1 3 2 7 4 
       2 2 6 3 5 3 4 9 2 4 5 7 6 6 3 2 7 2 4 8 5 5 4 
      7 4 4 5 8 3 3 8 1 8 6 3 2 1 6 2 6 4 6 3 8 2 9 6 
     1 2 4 1 3 3 5 3 4 9 6 3 8 6 5 9 1 5 3 2 6 8 8 5 3 
    2 2 7 9 3 3 2 8 6 9 8 4 4 9 5 8 2 6 3 4 8 4 9 3 8 8 
   7 7 7 9 7 5 2 7 9 2 5 1 9 2 6 5 3 9 3 5 7 3 5 4 2 8 9 
  7 7 6 6 8 7 5 5 8 2 4 7 7 4 7 2 6 9 2 1 8 2 9 8 5 7 3 6 
 5 9 4 5 5 7 5 5 6 3 5 3 9 5 8 9 5 4 1 2 6 1 4 3 5 3 2 4 1 
X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X 
```

其中的数字代表金属块的重量（计量单位较大）。
最下一层的X代表30台极高精度的电子秤。

假设每块原料的重量都十分精确地平均落在下方的两个金属块上，
最后，所有的金属块的重量都严格精确地平分落在最底层的电子秤上。
电子秤的计量单位很小，所以显示的数字很大。

工作人员发现，其中读数最小的电子秤的示数为：2086458231

请你推算出：读数最大的电子秤的示数为多少？ 72665192664

注意：需要提交的是一个整数，不要填写任何多余的内容。

```java
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		double[][] weight = new double[30][30];
		for (int i = 0; i < 29; i++) {
			for (int j = 0; j <= i; j++) {
				weight[i][j] = scanner.nextDouble();
			}
		}
		scanner.close();
		for (int i = 1; i < 30; i++) {
			for (int j = 0; j < i; j++) {
				double front = weight[i - 1][j] / 2.0;
				weight[i][j] += front;
				weight[i][j + 1] += front;
			}
		}
		double max = Double.MIN_VALUE;
		double min = Double.MAX_VALUE;
		for (int i = 0; i < 30; i++) {
			max = Math.max(weight[29][i], max);
			min = Math.max(weight[29][i], min);
		}
		// 按比例缩放
		System.out.println(2086458231 / min * max);
	}
}
```

## 魔方状态

二阶魔方就是只有2层的魔方，只由8个小块组成。

{% asset_img 6.png 魔方状态 %}

小明很淘气，他只喜欢3种颜色，所有把家里的二阶魔方重新涂了颜色，如下：

前面：橙色
右面：绿色
上面：黄色
左面：绿色
下面：橙色
后面：黄色

请你计算一下，这样的魔方被打乱后，一共有多少种不同的状态。

如果两个状态经过魔方的整体旋转后，各个面的颜色都一致，则认为是同一状态。

请提交表示状态数的整数，不要填写任何多余内容或说明文字。

```java

```

## 迷宫

X星球的一处迷宫游乐场建在某个小山坡上。
它是由10x10相互连通的小房间组成的。

房间的地板上写着一个很大的字母。
我们假设玩家是面朝上坡的方向站立，则：
L表示走到左边的房间，
R表示走到右边的房间，
U表示走到上坡方向的房间，
D表示走到下坡方向的房间。

X星球的居民有点懒，不愿意费力思考。
他们更喜欢玩运气类的游戏。这个游戏也是如此！

开始的时候，直升机把100名玩家放入一个个小房间内。
玩家一定要按照地上的字母移动。

迷宫地图如下：
------------
UDDLUULRUL
UURLLLRRRU
RRUURLDLRD
RUDDDDUUUU
URUDLLRRUU
DURLRLDLRL
ULLURLLRDU
RDLULLRDDD
UUDDUDUDLL
ULRDLUURRR
------------

请你计算一下，最后，有多少玩家会走出迷宫? 31
而不是在里边兜圈子。

请提交该整数，表示走出迷宫的玩家数目，不要填写任何多余的内容。

如果你还没明白游戏规则，可以参看一个简化的4x4迷宫的解说图：

{% asset_img 7.png 迷宫 %}

```java
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	private static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	private static int n = 10;
	private static char[][] map = new char[n][n];
	private static int people = 0;

	public static void main(String[] args) {
		for (int i = 0; i < n; i++) {
			String buf = scanner.next();
			char[] c = buf.toCharArray();
			for (int j = 0; j < n; j++) {
				map[i][j] = c[j];
			}
		}
		goMap();
		System.out.println(people);
	}

	private static void goMap() {
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				go(i, j);
			}
		}
	}

	private static void go(int x, int y) {
		// 走100次还没走出边界即走不出去
		for (int i = 1; i <= n * n; i++) {
			switch (map[x][y]) {
			case 'U':
				x--;
				break;
			case 'D':
				x++;
				break;
			case 'L':
				y--;
				break;
			case 'R':
				y++;
				break;
			}
			if (x == -1 || x == 10 || y == -1 || y == 10) {
				people++;
				break;
			}
		}
	}
}
```

## 9数算式

观察如下的算式：

9213 x 85674 = 789314562

左边的乘数和被乘数正好用到了1~9的所有数字，每个1次。
而乘积恰好也是用到了1~9的所有数字，并且每个1次。

请你借助计算机的强大计算能力，找出满足如上要求的9数算式一共有多少个？ 346

注意：
1. 总数目包含题目给出的那个示例。
2. 乘数和被乘数交换后作为同一方案来看待。

```java 回溯
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	private static int[] number = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	private static int count = 0;

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(count);
	}

	private static void backTrack(int n) {
		if (n == 9) {
			if (isOK()) {
				count++;
			}
		} else {
			for (int i = n; i < 9; i++) {
				swap(n, i);
				backTrack(n + 1);
				swap(n, i);
			}
		}
	}

	private static void swap(int i, int j) {
		int tmp = number[i];
		number[i] = number[j];
		number[j] = tmp;
	}

	private static boolean isOK() {
		long a = number[0] * 1000 + number[1] * 100 + number[2] * 10 + number[3];
		long b = number[4] * 10000 + number[5] * 1000 + number[6] * 100 + number[7] * 10 + number[8];
		long c = a * b;
		int[] isVisit = new int[10];
		while (c != 0) {
			int k = (int) c % 10;
			c /= 10;
			if (isVisit[k] == 1) {
				return false;
			} else {
				isVisit[k] = 1;
			}
		}
		if (isVisit[0] == 1) {
			return false;
		}
		for (int i = 1; i <= 9; i++) {
			if (isVisit[i] == 0) {
				return false;
			}
		}
		return true;
	}
}
```

## 跳蚱蜢

{% asset_img 9.png 跳蚱蜢 %}

有9只盘子，排成1个圆圈。
其中8只盘子内装着8只蚱蜢，有一个是空盘。
我们把这些蚱蜢顺时针编号为 1~8

每只蚱蜢都可以跳到相邻的空盘中，
也可以再用点力，越过一个相邻的蚱蜢跳到空盘中。

请你计算一下，如果要使得蚱蜢们的队形改为按照逆时针排列，
并且保持空盘的位置不变（也就是1-8换位，2-7换位,...），至少要经过多少次跳跃？

注意：要求提交的是一个整数，请不要填写任何多余内容或说明文字。

```java

```

## 算式900

小明的作业本上有道思考题：

看下面的算式：

(□□□□-□□□□)*□□=900

其中的小方块代表0~9的数字，这10个方块刚好包含了0~9中的所有数字。
注意：0不能作为某个数字的首位。

小明经过几天的努力，终于做出了答案！如下：
(5012-4987)*36=900

用计算机搜索后，发现还有另外一个解，本题的任务就是：请你算出这另外的一个解。

6048 5973 12

```java
public class Main {
	static int[] number = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	public static void main(String[] args) {
		backTrack(0);
	}

	private static void backTrack(int n) {
		if (n == 10) {
			int a = number[0] * 1000 + number[1] * 100 + number[2] * 10 + number[3];
			int b = number[4] * 1000 + number[5] * 100 + number[6] * 10 + number[7];
			int c = number[8] * 10 + number[9];
			if ((a - b) * c == 900) {
				System.out.println(a + " " + b + " " + c);
			}
		} else {
			for (int i = n; i < 10; i++) {
				swap(n, i);
				if (number[0] != 0 && number[4] != 0 && number[8] != 0) {
					backTrack(n + 1);
				}
				swap(n, i);
			}
		}
	}

	private static void swap(int i, int j) {
		int tmp = number[i];
		number[i] = number[j];
		number[j] = tmp;
	}
}
```

## 外星日历

某星系深处发现了文明遗迹。

他们的计数也是用十进制。
他们的文明也有日历。日历只有天数，没有年、月的概念。
有趣的是，他们也使用了类似“星期”的概念，
只不过他们的一个星期包含了9天，
为了方便，这里分别记为: A,B,C....H,I

从一些资料上看到，
他们的23日是星期E
他们的190日是星期A
他们的343251日是星期I

令人兴奋的是，他们居然也预见了“世界末日”的那天，
当然是一个很大很大的数字
651764141421415346185

请你计算一下，这遥远的一天是该文明的星期几？ G

方法1：windows的计算器直接 651764141421415346185 mod 9 = 7

方法2：

```java
BigInteger a = new BigInteger("651764141421415346185");
BigInteger b = new BigInteger("9");
System.out.println(a.mod(b));
```

# 代码填空

## 取数位

求1个整数的第k位数字有很多种方法。
以下的方法就是一种。

```java
public class Main {
	static int len(int x) {
		if (x < 10)
			return 1;
		return len(x / 10) + 1;
	}

	// 取x的第k位数字
	static int f(int x, int k) {
		if (len(x) - k == 0)
			return x % 10;
		// return ______________________; // 填空
		// 应该是从左向右数
		return f(x / 10, k);
	}

	public static void main(String[] args) {
		int x = 23513;
		// System.out.println(len(x));
		System.out.println(f(x, 3));
	}
}
```

对于题目中的测试数据，应该打印5。

## 最大公共子串

最大公共子串长度问题就是：
求两个串的所有子串中能够匹配上的最大长度是多少。

比如："abcdkkk" 和 "baabcdadabc"，
可以找到的最长的公共子串是"abcd",所以最大公共子串长度为4。

下面的程序是采用矩阵法进行求解的，这对串的规模不大的情况还是比较有效的解法。

请分析该解法的思路，并补全划线部分缺失的代码。

```java
public class Main {
	static int f(String s1, String s2) {
		char[] c1 = s1.toCharArray();
		char[] c2 = s2.toCharArray();

		// 7 + 1，11 + 1
		int[][] a = new int[c1.length + 1][c2.length + 1];

		int max = 0;
		// a.length：行长度8
		for (int i = 1; i < a.length; i++) {
			// a[i].length：列长度12
			for (int j = 1; j < a[i].length; j++) {
				if (c1[i - 1] == c2[j - 1]) {
					// a[i][j] = __________________; // 填空
					a[i][j] = a[i - 1][j - 1] + 1;
					if (a[i][j] > max)
						max = a[i][j];
				}
			}
		}

		return max;
	}

	public static void main(String[] args) {
		int n = f("abcdkkk", "baabcdadabc");
		System.out.println(n);
	}
}
```

动态规划：

```
通过前一过程的结果得到当前状态的结果
a[i][j] = a[i - 1][j - 1] + 1

      b, a, a, b, c, d, a, d, a, b, c
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
a [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0]
b [0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0]
c [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3]
d [0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 0]
k [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
k [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
k [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

## 字母组串

由 A,B,C 这3个字母就可以组成许多串。
比如："A","AB","ABC","ABA","AACBB" ....

现在，小明正在思考一个问题：
如果每个字母的个数有限定，能组成多少个已知长度的串呢？

他请好朋友来帮忙，很快得到了代码，
解决方案超级简单，然而最重要的部分却语焉不详。

请仔细分析源码，填写划线部分缺少的内容。

```java
public class A
{
	// a个A，b个B，c个C 字母，能组成多少个不同的长度为n的串。
	static int f(int a, int b, int c, int n)
	{
		if(a<0 || b<0 || c<0) return 0;
		if(n==0) return 1; 
		
		return ________________________________;  //填空
		return f(a - 1, b, c, n - 1) + f(a, b - 1, c, n - 1) + f(a, b, c - 1, n - 1);
	}
	
	public static void main(String[] args)
	{
		System.out.println(f(1,1,1,2));
		System.out.println(f(1,2,3,3));
	}
}
```

对于上面的测试数据，小明口算的结果应该是：
6
19

## 杨辉三角

杨辉三角也叫帕斯卡三角，在很多数量关系中可以看到，十分重要。

第0行：           1
第1行：          1 1
第2行：         1 2 1
第3行：        1 3 3 1
第4行：       1 4 6 4 1
....

两边的元素都是1， 中间的元素是左上角的元素与右上角的元素和。

我们约定，行号，列号都从0计数。
所以： 第6行的第2个元素是15，第3个元素是20

直观地看，需要开辟一个二维数组，其实一维数组也可以胜任。
如下程序就是用一维数组“腾挪”的解法。

```java
public class Main {
	public static void main(String[] args) {
		System.out.println(f(6, 2));
		System.out.println(f(6, 3));
		System.out.println(f(40, 20));
	}

	// 杨辉三角的第row行，第col列
	static long f(int row, int col) {
		if (row < 2) return 1;
		if (col == 0) return 1;
		if (col == row) return 1;

		long[] a = new long[1024];
		a[0] = 1;
		a[1] = 1;
		int p = 2;
		int q;

		while (p <= row) {
			a[p] = 1;
			// for( _________________ ) a[q] = a[q] + a[q-1]; //填空
			for (q = p - 1; q > 0; q--) a[q] = a[q] + a[q - 1];
			p++;
		}
		return a[col];
	}
}
```

# 程序设计

## 日期问题

小明正在整理一批历史文献。这些历史文献中出现了很多日期。
小明知道这些日期都在1960年1月1日至2059年12月31日。
令小明头疼的是，这些日期采用的格式非常不统一，有采用年/月/日的，有采用月/日/年的，还有采用日/月/年的。
更加麻烦的是，年份也都省略了前两位，使得文献上的一个日期，存在很多可能的日期与其对应。  

比如02/03/04，可能是2002年03月04日、2004年02月03日或2004年03月02日。  

给出一个文献上的日期，你能帮助小明判断有哪些可能的日期对其对应吗？

输入：
一个日期，格式是"AA/BB/CC"。  (0 <= A, B, C <= 9)  

输入：
输出若干个不相同的日期，每个日期一行，格式是"yyyy-MM-dd"。多个日期按从早到晚排列。  

样例输入：
02/03/04  

样例输出：
2002-03-04  
2004-02-03  
2004-03-02  

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

```java 常规做法
import java.io.BufferedInputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
public class Main {
	private static int[] array;
	private static ArrayList<String> list = new ArrayList<>();

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		String date = scanner.next();
		scanner.close();
		String[] dateArray = date.split("/");
		array = new int[] { Integer.parseInt(dateArray[0]), Integer.parseInt(dateArray[1]),
				Integer.parseInt(dateArray[2]) };
		// 为了避免排序，先对数字排序
		Arrays.sort(array);
		// 出现两个大于60的无法组成日期
		if (array[1] >= 60 && array[2] >= 60) {
			return;
		} else if (array[2] >= 60) {
			// 只有2种情况
			deal(2, 0, 1);
			deal(2, 1, 0);
			for (int i = 0; i < 2; i++) {
				System.out.println(list.get(i));
			}
		}else {
			// 可能有6种情况
			deal(0, 1, 2);
			deal(0, 2, 1);
			deal(1, 0, 2);
			deal(1, 2, 0);
			deal(2, 0, 1);
			deal(2, 1, 0);
			for (int i = 0; i < list.size(); i++) {
				System.out.println(list.get(i));
			}
		}
	}

	private static void deal(int i, int j, int k) {
		String year, monthAndDay;
		// 年份
		if (0 < array[i] && array[i] <= 59) {
			year = "20" + zero(array[i]);
			monthAndDay = dealMonthAndDay(Integer.parseInt(year), j, k);
			if (monthAndDay != null) {
				list.add(year + "-" + monthAndDay);
			}
		} else if (60 <= array[i] && array[i] <= 99) {
			year = "19" + zero(array[i]);
			monthAndDay = dealMonthAndDay(Integer.parseInt(year), j, k);
			if (monthAndDay != null) {
				list.add(year + "-" + monthAndDay);
			}
		}
	}

	private static String dealMonthAndDay(int year, int j, int k) {
		String v = zero(array[j]) + "-" + zero(array[k]);
		if (0 < array[j] && array[j] <= 12 && 0 < array[k] && array[k] <= 31) {
			if (array[j] == 2) {
				// 闰年2月
				if (((year % 4 == 0 && year % 100 != 0))) {
					if (0 < array[k] && array[k] <= 29) {
						return v;
					}
				} else if (year % 400 == 0) {
					if (0 < array[k] && array[k] <= 29) {
						return v;
					}
				} else {
					if (0 < array[k] && array[k] <= 28) {
						return v;
					}
				}
			} else {
				switch (array[j]) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 9:
				case 11:
					// 大月
					if (0 < array[k] && array[k] <= 31) {
						return v;
					}
					break;
				case 2:
				case 4:
				case 6:
				case 8:
				case 10:
				case 12:
					// 小月
					if (0 < array[k] && array[k] <= 30) {
						return v;
					}
					break;
				}
			}
		}
		return null;
	}

	private static String zero(int n) {
		if (n < 10) {
			return "0" + n;
		}
		return n + "";
	}
}
```

```java 回溯+Calendar取巧
import java.io.BufferedInputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Scanner;
public class Main {
	private static String[] array;
	private static ArrayList<String> list = new ArrayList<>();
	private static Calendar calendar = Calendar.getInstance();

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		String date = scanner.next();
		scanner.close();
		array = date.split("/");
		backTrack(0);
		outPut();
	}

	private static void outPut() {
		int length = list.size();
		String[] strings = new String[length];
		list.toArray(strings);
		// 输出前要排序
		// 多个日期按从早到晚排列
		// 偷懒，只排年份
		// 其实还可以像常规那样，因为只有6种情况，按从小到大都组合起来，判断输出更快
		int[] year = new int[length];
		for (int i = 0; i < length; i++) {
			String[] s = strings[i].split("-");
			year[i] = Integer.parseInt(s[0]);
		}
		quickSort(strings, year, 0, length - 1);
		for (int i = 0; i < length - 1; i += 2) {
			// 输出的时候比较同年份的，按月份从小到大
			if (year[i] == year[i + 1]) {
				String[] s1 = strings[i].split("-");
				String[] s2 = strings[i + 1].split("-");
				if (Integer.parseInt(s1[1]) > Integer.parseInt(s2[1])) {
					System.out.println(strings[i + 1]);
					System.out.println(strings[i]);
				} else if (Integer.parseInt(s1[1]) < Integer.parseInt(s2[1])){
					System.out.println(strings[i]);
					System.out.println(strings[i + 1]);
				}else {
					System.out.println(strings[i]);
				}
			} else {
				System.out.println(strings[i]);
				System.out.println(strings[i + 1]);
			}
		}
	}

	private static void quickSort(String[] strings, int[] k, int left, int right) {
		int start = left, end = right;
		String sRecord = strings[start];
		int kRecord = k[start];
		while (start < end) {
			while (start < end && k[end] >= kRecord) {
				end--;
			}
			k[start] = k[end];
			strings[start] = strings[end];
			while (start < end && k[start] <= kRecord) {
				start++;
			}
			k[end] = k[start];
			strings[end] = strings[start];
		}
		k[start] = kRecord;
		strings[start] = sRecord;
		if (start > left) {
			quickSort(strings, k, left, start - 1);
		}
		if (end < right) {
			quickSort(strings, k, end + 1, right);
		}
	}

	private static void backTrack(int num) {
		if (num == 3) {
			int year = dealYear(array[0]);
			int month = Integer.parseInt(array[1]);
			int day = Integer.parseInt(array[2]);
			if (isOK(year, month, day)) {
				list.add(year + "-" + array[1] + "-" + array[2]);
			}
		} else {
			for (int i = num; i < 3; i++) {
				swap(array, num, i);
				backTrack(num + 1);
				swap(array, num, i);
			}
		}
	}

	private static int dealYear(String n) {
		int year = Integer.parseInt(n);
		if (60 <= year && year <= 99) {
			return 1900 + year;
		}
		return 2000 + year;
	}

	private static void swap(String[] array, int i, int j) {
		String tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}

	private static boolean isOK(int year, int month, int day) {
		try {
			calendar.setLenient(false);
			calendar.set(year, month - 1, day);
			calendar.get(Calendar.YEAR);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
```

## 包子凑数

小明几乎每天早晨都会在一家包子铺吃早餐。他发现这家包子铺有N种蒸笼，其中第i种蒸笼恰好能放Ai个包子。每种蒸笼都有非常多笼，可以认为是无限笼。

每当有顾客想买X个包子，卖包子的大叔就会迅速选出若干笼包子来，使得这若干笼中恰好一共有X个包子。
比如一共有3种蒸笼，分别能放3、4和5个包子。当顾客想买11个包子时，大叔就会选2笼3个的再加1笼5个的（也可能选出1笼3个的再加2笼4个的）。

当然有时包子大叔无论如何也凑不出顾客想买的数量。比如一共有3种蒸笼，分别能放4、5和6个包子。而顾客想买7个包子时，大叔就凑不出来了。

小明想知道一共有多少种数目是包子大叔凑不出来的。

输入：
第一行包含一个整数N。(1 <= N <= 100)
以下N行每行包含一个整数Ai。(1 <= Ai <= 100)  

输出：
一个整数代表答案。如果凑不出的数目有无限多个，输出INF。

样例输入1：
2  
4  
5   
样例输出1：
6  

样例输入2：
2  
4  
6    
样例输出2：
INF

样例说明：
对于样例1，凑不出的数目包括：1, 2, 3, 6, 7, 11。  
对于样例2，所有奇数都凑不出来，所以有无限多个。  

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

分析：
完全背包
扩展欧几里德，方程 ax+by=gcd(a,b)
欧几里德判断所有数的公约数是否为1，是就有限，不是即无限。

```java 抄的
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	private static int steamer[];
	private static boolean dp[] = new boolean[10100];
	private static int cannot = 0;

	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		steamer = new int[n];
		for (int i = 0; i < n; i++) {
			steamer[i] = scanner.nextInt();
		}
		int m = steamer[0];
		for (int i = 0; i < n; i++) {
			m = gcd(m, steamer[i]);
		}
		if (m != 1) {
			System.out.println("INF");
		} else {
			dp[0] = true;
			for (int i = 0; i < n; i++) {
				for (int j = 0; j < 10000; j++) {
					if (dp[j]) {
						dp[j + steamer[i]] = true;
					}
				}
			}
			for (int i = 0; i < 10000; i++) {
				if (dp[i] != true) {
					System.out.print(i + " ");
					cannot++;
				}
			}
			System.out.println();
			System.out.println(cannot);
		}
	}

	private static int gcd(int a, int b) {
		if (b == 0) {
			return a;
		}
		return gcd(b, a % b);
	}
}
```

## 分巧克力

儿童节那天有K位小朋友到小明家做客。小明拿出了珍藏的巧克力招待小朋友们。
小明一共有N块巧克力，其中第i块是Hi x Wi的方格组成的长方形。

为了公平起见，小明需要从这 N 块巧克力中切出K块巧克力分给小朋友们。
切出的巧克力需要满足：
1. 形状是正方形，边长是整数  
2. 大小相同

例如：一块6x5的巧克力可以切出6块2x2的巧克力或者2块3x3的巧克力。

当然小朋友们都希望得到的巧克力尽可能大，你能帮小明计算出最大的边长是多少么？

输入：
第一行包含两个整数N和K。(1 <= N, K <= 100000)  
以下N行每行包含两个整数Hi和Wi。(1 <= Hi, Wi <= 100000) 
输入保证每位小朋友至少能获得一块1x1的巧克力。   

输出：
输出切出的正方形巧克力最大可能的边长。

样例输入：
2 10
6 5
5 6
样例输出：
2

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

分析：
二分查找

```java 抄的
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	private static Scanner scanner = new Scanner(new BufferedInputStream(System.in));
	private static int n = scanner.nextInt();;
	private static int k = scanner.nextInt();
	private static int[] h = new int[n];
	private static int[] w = new int[n];

	public static void main(String[] args) {
		for (int i = 0; i < n; i++) {
			h[i] = scanner.nextInt();
			w[i] = scanner.nextInt();
		}

		int front = 1;
		int reer = 100000;
		while (front < reer) {
			// 每次切的正方形边长
			int midddle = (front + reer) / 2;
			// 切出来的面积大于等于人数即可
			if (cut(midddle) >= k) {
				front = midddle + 1;
			} else {
				reer = midddle - 1;
			}
		}

		System.out.println(front);
	}

	private static int cut(int length) {
		int sum = 0;
		for (int i = 0; i < n; i++) {
			sum += (h[i] / length) * (w[i] / length);
		}
		return sum;
	}
}
```

## k倍区间

给定一个长度为N的数列，A1, A2, ... AN，如果其中一段连续的子序列Ai, Ai+1, ... Aj(i <= j)之和是K的倍数，我们就称这个区间[i, j]是K倍区间。  

你能求出数列中总共有多少个K倍区间吗？  

输入
第一行包含两个整数N和K。(1 <= N, K <= 100000)  
以下N行每行包含一个整数Ai。(1 <= Ai <= 100000)  

输出
输出一个整数，代表K倍区间的数目。  

输入：
5 2
1  
2  
3  
4  
5  

输出：
6

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 2000ms

分析：
前缀和

```java 抄的
import java.io.BufferedInputStream;
import java.util.Scanner;
public class Main {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(new BufferedInputStream(System.in));
		int n = scanner.nextInt();
		int k = scanner.nextInt();
		int[] array = new int[n];
		for (int i = 0; i < n; i++) {
			array[i] = scanner.nextInt();
		}

		array[0] %= k;
		int sum = 0;

		for (int i = 1; i < n; i++) {
			array[i] = (array[i] + array[i - 1]) % k;
		}

		int[] b = new int[n];
		for (int i = 0; i < n; i++) {
			sum += b[array[i]];
			b[array[i]]++;
		}

		System.out.println(sum + b[0]);
	}
}
```

## 正则问题

考虑一种简单的正则表达式：
只由 x ( ) | 组成的正则表达式。
小明想求出这个正则表达式能接受的最长字符串的长度。  

例如 ((xx|xxx)x|(x|xx))xx 能接受的最长字符串是： xxxxxx，长度是6。

输入
----
一个由x()|组成的正则表达式。输入长度不超过100，保证合法。  

输出
----
这个正则表达式能接受的最长字符串的长度。  

例如，
输入：
((xx|xxx)x|(x|xx))xx  

程序应该输出：
6  

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

```java

```

## 油漆面积

X星球的一批考古机器人正在一片废墟上考古。
该区域的地面坚硬如石、平整如镜。
管理人员为方便，建立了标准的直角坐标系。

每个机器人都各有特长、身怀绝技。它们感兴趣的内容也不相同。
经过各种测量，每个机器人都会报告一个或多个矩形区域，作为优先考古的区域。

矩形的表示格式为(x1,y1,x2,y2)，代表矩形的两个对角点坐标。

为了醒目，总部要求对所有机器人选中的矩形区域涂黄色油漆。
小明并不需要当油漆工，只是他需要计算一下，一共要耗费多少油漆。

其实这也不难，只要算出所有矩形覆盖的区域一共有多大面积就可以了。
注意，各个矩形间可能重叠。

本题的输入为若干矩形，要求输出其覆盖的总面积。

输入格式：
第一行，一个整数n，表示有多少个矩形(1<=n<10000)
接下来的n行，每行有4个整数x1 y1 x2 y2，空格分开，表示矩形的两个对角顶点坐标。
(0<= x1,y1,x2,y2 <=10000)

输出格式：
一行一个整数，表示矩形覆盖的总面积。

例如，
输入：
3
1 5 10 10
3 1 20 20
2 7 15 17

程序应该输出：
340

再例如，
输入：
3
5 2 10 6
2 7 12 10
8 1 15 15

程序应该输出：
128

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 2000ms

```java

```

## 青蛙跳杯子

X星球的流行宠物是青蛙，一般有两种颜色：白色和黑色。
X星球的居民喜欢把它们放在一排茶杯里，这样可以观察它们跳来跳去。
如下图，有一排杯子，左边的一个是空着的，右边的杯子，每个里边有一只青蛙。

*WWWBBB

其中，W字母表示白色青蛙，B表示黑色青蛙，*表示空杯子。

X星的青蛙很有些癖好，它们只做3个动作之一：
1. 跳到相邻的空杯子里。
2. 隔着1只其它的青蛙（随便什么颜色）跳到空杯子里。
3. 隔着2只其它的青蛙（随便什么颜色）跳到空杯子里。

对于上图的局面，只要1步，就可跳成下图局面：

WWW*BBB

本题的任务就是已知初始局面，询问至少需要几步，才能跳成另一个目标局面。

输入为2行，2个串，表示初始局面和目标局面。
输出要求为一个整数，表示至少需要多少步的青蛙跳。

例如：
输入：
*WWBB
WWBB*

则程序应该输出：
2

再例如，
输入：
WWW*BBB
BBB*WWW

则程序应该输出：
10

我们约定，输入的串的长度不超过15

资源约定：
峰值内存消耗（含虚拟机） < 256M
CPU消耗  < 1000ms

```java

```