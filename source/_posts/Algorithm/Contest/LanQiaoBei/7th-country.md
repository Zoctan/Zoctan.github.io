---
title: 蓝桥杯2016年第7届Java-B组国赛
date: 2018-1-22
category: 学习
tags:
  - 蓝桥杯
  - Java
---

# 愤怒小鸟

X星球愤怒的小鸟喜欢撞火车！

一根平直的铁轨上两火车间相距 1000 米
两火车 （不妨称A和B） 以时速 10米/秒 相对行驶。

愤怒的小鸟从A车出发，时速50米/秒，撞向B车，
然后返回去撞A车，再返回去撞B车，如此往复....
两火车在相距1米处停车。

问：这期间愤怒的小鸟撞 B 车多少次？ 9

注意：需要提交的是一个整数（表示撞B车的次数），不要填写任何其它内容。

```java
public class Main {
	public static void main(String[] args) {
		int times = 0;
		int aSpeed = 10;
		int bSpeed = 10;
		int birdSpeed = 50;
		double currentLength = 1000;
		double spare = 0;
		for (int i = 0; currentLength > 1; i++) {
			if ((i & 1) == 0) {
				spare = currentLength / (birdSpeed + bSpeed);
				times++;
			} else {
				spare = currentLength / (birdSpeed + aSpeed);
			}
			currentLength -= bSpeed * spare + aSpeed * spare;
			//System.out.printf("%f %f\n", spare, currentLength);
		}
		System.out.println(times);
	}
}
```

# 反幻方

我国古籍很早就记载着

2 9 4
7 5 3
6 1 8

这是一个三阶幻方。每行每列以及对角线上的数字相加都相等。

下面考虑一个相反的问题。
可不可以用 1~9 的数字填入九宫格。
使得：每行每列每个对角线上的数字和都互不相等呢？

比如：
9 1 2
8 4 3
7 5 6

你的任务是搜索所有的三阶反幻方。并统计出一共有多少种。
旋转或镜像算同一种。

比如：
9 1 2
8 4 3
7 5 6

7 8 9
5 4 1
6 3 2

2 1 9
3 4 8
6 5 7

等都算作同一种情况。

请提交三阶反幻方一共多少种。 3120

这是一个整数，不要填写任何多余内容。

```java 回溯
public class Main {
	static int[] fang = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
	static int times = 0;

	public static void main(String[] args) {
		backTrack(0);
		System.out.println(times / 8);
	}

	private static void backTrack(int current) {
		if (current == fang.length - 1) {
			if (isOK()) {
				times++;
				//outPut();
			}
		} else {
			for (int i = current; i < fang.length; i++) {
				swap(current, i);
				backTrack(current + 1);
				swap(current, i);
			}
		}
	}

	private static boolean isOK() {
		int line1 = fang[0] + fang[1] + fang[2];
		int line2 = fang[3] + fang[4] + fang[5];
		int line3 = fang[6] + fang[7] + fang[8];
		int column1 = fang[0] + fang[3] + fang[6];
		int column2 = fang[1] + fang[4] + fang[7];
		int column3 = fang[2] + fang[5] + fang[8];
		int a = fang[0] + fang[4] + fang[8];
		int b = fang[2] + fang[4] + fang[6];
		if (line1 == line2 || line1 == line3 || line2 == line3 || line1 == column1 || line1 == column2
				|| line1 == column3 || line2 == column1 || line2 == column2 || line2 == column3 || line3 == column1
				|| line3 == column2 || line3 == column3 || line1 == a || line1 == b || line2 == a || line2 == b
				|| line3 == a || line3 == b || a == b || column1 == column2 || column2 == column3 || column1 == column3
				|| column1 == a || column2 == a || column3 == a || column1 == b || column2 == b || column3 == b) {
			return false;
		}
		return true;
	}

	private static void swap(int i, int j) {
		int tmp = fang[i];
		fang[i] = fang[j];
		fang[j] = tmp;
	}

	private static void outPut() {
		for (int i = 0; i < fang.length; i++) {
			out.printf("%d ", fang[i]);
			if (i == 2 || i == 5 || i == 8) {
				System.out.println();
			}
			if (i == 8) {
				System.out.println();
			}
		}
	}
}
```

# 打靶

小明参加X星球的打靶比赛。
比赛使用电子感应计分系统。其中有一局，小明得了96分。

这局小明共打了6发子弹，没有脱靶。
但望远镜看过去，只有3个弹孔。
显然，有些子弹准确地穿过了前边的弹孔。

不同环数得分是这样设置的：
1,2,3,5,10,20,25,50

那么小明的6发子弹得分都是多少呢？有哪些可能情况呢？

下面的程序解决了这个问题。
仔细阅读分析代码，填写划线部分缺失的内容。

```java
public class Main {
	static void f(int[] ta, int[] da, int k, int ho, int bu, int sc) {
		if (ho < 0 || bu < 0 || sc < 0)
			return;
		if (k == ta.length) {
			if (ho > 0 || bu > 0 || sc > 0)
				return;
			for (int i = 0; i < da.length; i++) {
				for (int j = 0; j < da[i]; j++)
					System.out.print(ta[i] + " ");
			}
			System.out.println();
			return;
		}

		for (int i = 0; i <= bu; i++) {
			da[k] = i;
			// 填空位置4
			// ho初始值为3，所以应该是对应题目的只有3个洞
			// 那么打中的话就要减少相应的洞数
			// da[k]应该是累计打中哪些环，但洞数只能是1个个减少
			// 所以ho - da[k] / da[k]
			// 但如果da[k] = 0，分母可能会出错，所以与1比较
			f(ta, da, k + 1, ho - da[k] / Math.max(da[k], 1), bu - i, sc - ta[k] * i);
		}

		da[k] = 0;
	}

	public static void main(String[] args) {
		int[] ta = { 1, 2, 3, 5, 10, 20, 25, 50 };
		int[] da = new int[8];
		f(ta, da, 0, 3, 6, 96);
	}
}
```

# 路径之谜

小明冒充X星球的骑士，进入了一个奇怪的城堡。
城堡里边什么都没有，只有方形石头铺成的地面。

假设城堡地面是 n x n 个方格。

{% asset_img 4.png 城堡地面 %}

按习俗，骑士要从西北角走到东南角。
可以横向或纵向移动，但不能斜着走，也不能跳跃。
每走到一个新方格，就要向正北方和正西方各射一箭。
（城堡的西墙和北墙内各有 n 个靶子）

同一个方格只允许经过一次。但不必做完所有的方格。

如果只给出靶子上箭的数目，你能推断出骑士的行走路线吗？

有时是可以的，比如图中的例子。

本题的要求就是已知箭靶数字，求骑士的行走路径（测试数据保证路径唯一）

输入：
第一行一个整数n(0<n<20)，表示地面有 n x n 个方格
第二行n个整数，空格分开，表示北边的箭靶上的数字（自西向东）
第三行n个整数，空格分开，表示西边的箭靶上的数字（自北向南）

输出：
一行若干个整数，表示骑士路径。

为了方便表示，我们约定每个小格子用一个数字代表，从西北角开始编号: 0,1,2,3....
比如，图中的方块编号为：

0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15

样例输入：
4
2 4 3 4
4 3 3 3

样例输出：
0 4 5 1 2 3 7 11 10 9 13 14 15

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 1000ms

```java
import java.util.Scanner;
public class Main {
	private static int N;
	// x为0时，y可以为1或-1，即上下；同理得左右方向
	private static int[][] direction = { { 0, 1 },
										 { 1, 0 },
										 { 0, -1 },
										 { -1, 0 } };
	// 二维数组时的一维数组下标
	private static int[][] oneArray;
	private static int totalNorth = 0;// 北边靶子的总数目
	private static int totalWest = 0;// 西边靶子的总数目
	private static int[] restNorth;// 保存北边靶子上的数目
	private static int[] restWest; // 保存西边靶子的数目
	private static int[][] visit; // 标记数组，标记迷宫的方格是否走过
	private static int[] way = null; // 满足要求的行走路径
	private static int wayLength = 1; // 可行路径的长度

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		N = scanner.nextInt();
		way = new int[N * N + 1];
		visit = new int[N][N];
		oneArray = new int[N][N];
		for (int i = 0, index = 0; i < N; i++)
			for (int j = 0; j < N; j++)
				oneArray[i][j] = index++;

		restNorth = new int[N];
		for (int i = 0; i < N; i++) {
			restNorth[i] = scanner.nextInt();
			totalNorth += restNorth[i];
		}
		restWest = new int[N];
		for (int i = 0; i < N; i++) {
			restWest[i] = scanner.nextInt();
			totalWest += restWest[i];
		}
		scanner.close();
		firstStep();
		backTrack(0, 0);
	}

	private static void firstStep() {
		restNorth[0]--;
		totalNorth--;
		restWest[0]--;
		totalWest--;
		visit[0][0] = 1;
		way[0] = 0;
	}

	private static void getResult() {
		for (int i = 0; i < wayLength; i++)
			System.out.print(way[i] + " ");
	}

	public static void backTrack(int x, int y) {
		if (x == N - 1 && y == N - 1) {
			if (totalNorth == 0 && totalWest == 0) {
				getResult();
			}
		} else {
			for (int i = 0; i < 4; i++) {
				int dx = x + direction[i][0];
				int dy = y + direction[i][1];
				// 1.没出界，2.行列上的靶子数目至少为1
				if (dx >= 0 && dx < N
						&& dy >= 0 && dy < N
						&& visit[dx][dy] == 0
						&& restNorth[dy] > 0 && restWest[dx] > 0) {
					visit[dx][dy] = 1;
					// 每走一步，北边和西边的靶子就被射一箭
					restNorth[dy]--;
					totalNorth--;
					restWest[dx]--;
					totalWest--;
					way[wayLength++] = oneArray[dx][dy];
					backTrack(dx, dy);
					wayLength--; // 走不通，路径长度-1
					visit[dx][dy] = 0;
					restNorth[dy]++;
					totalNorth++;
					restWest[dx]++;
					totalWest++;
				}
			}
		}
	}
}
```

# 碱基

生物学家正在对n个物种进行研究。
其中第i个物种的DNA序列为s[i]，其中的第j个碱基为s[i][j]，碱基一定是A、T、G、C之一。
生物学家想找到这些生物中一部分生物的一些共性，他们现在关注那些至少在m个生物中出现的长度为k的连续碱基序列。
准确的说，科学家关心的序列用2m元组(i1,p1,i2,p2....im,pm)表示，
满足：1 <= i1 < i2 < .... < im <= n;
且对于所有q(0 <= q < k), s[i1][p1+q] = s[i2][p2+q] = .... = s[im][pm+q]。

现在给定所有生物的DNA序列，请告诉科学家有多少的2m元组是需要关注的。如果两个2m元组有任何一个位置不同，则认为是不同的元组。

输入格式：
输入的第一行包含三个整数n、m、k，两个整数之间用一个空格分隔，意义如题目所述。
接下来n行，每行一个字符串表示一种生物的DNA序列。
DNA序列从1至n编号，每个序列中的碱基从1开始依次编号，不同的生物的DNA序列长度可能不同。

输出格式：
输出一个整数，表示关注的元组个数。
答案可能很大，你需要输出答案除以1000000007的余数。

样例输入1：
3 2 2
ATC
TCG
ACG

样例输出1：
2

样例输入2：
4 3 3
AAA
AAAA
AAA
AAA

样例输出2：
7

数据规模与约定：
对于20%的数据，k<=5,所有字符串总长L满足L <=100
对于30%的数据，L<=10000
对于60%的数据，L<=30000
对于100%的数据，n<=5,m<=5,1<=k<=L<=100000
保证所有DNA序列不为空且只会包含’A’ ’G’ ’C’ ’T’四种字母

资源约定：
峰值内存消耗 < 256M
CPU消耗  < 1000ms

```java

```