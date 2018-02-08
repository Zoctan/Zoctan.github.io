---
title: 剑指offer
date: 2018-01-01
category: 学习
tags:
  - 剑指offer
  - Java
---

# 斐波那契数列

从第3项开始，每一项都等于前两项之和的数列。
如：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144……

递推公式：$f(n) = f(n-2) + f(n-1)$
通项公式：$f = \frac{ 1 }{ \sqrt{ 5 } } \times [(\frac{ 1 + \sqrt{ 5 } }{ 2 })^n - (\frac{ 1 - \sqrt{ 5 } }{ 2 })^n]$


## 跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级
求该青蛙跳上一个n级的台阶总共有多少种跳法

** 分析 **

假设有n=4个台阶
第1次若跳2级，则剩下2级台阶；若跳1级台阶，则剩下3级台阶
若剩下2级，则有2种情况：11，2
若剩下3级，则有3种情况，111，21，12

以上加起来即4级台阶有5种跳法，是斐波那契数列

```java 递推公式
public int JumpFloor(int target) {
    if (target <= 0) {
        return 0;
    } else if (target == 1) {
        return 1;
    } else if (target == 2) {
        return 2;
    } else {
        int f1 = 1, f2 = 2, fn = 0;
        for (int i = 3; i <= target; i++) {
            fn = f1 + f2;
            f1 = f2;
            f2 = fn;
        }
        return fn;
    }
}
```

## 矩形覆盖

用 2\*1 的小矩形横着或者竖着去覆盖更大的矩形。

请问用 n 个 2\*1 的小矩形无重叠地覆盖一个 2\*n 的大矩形，总共有多少种方法

** 分析 **

手动画下矩形，从 2*1 开始

 2*n 大矩阵 | k 种方法
 :--:|:--:
   2*1     |    1   
   2*2     |    2
   2*3     |    3
   2*4     |    5
   2*5     |    8

每一个大矩形都包含小于它的大矩形的覆盖方法，是斐波那契数列

## 01串

知道某一01串的长度，求不含有"11"子串的这种长度的01串共有多少个

** 分析 **

当01串长度为1时，有2种：0，1
当01串长度为2时，有3种：00，01，10
当01串长度为3时，有5种：000，001，010，100，101
当01串长度为4时，有8种：0000，0001，0010，0100，0101，1000，1001，1010

每个串都包含小于它的串的排列，是斐波那契数列

# 和为S的连续正数序列

有多少种连续的正数序列的和为100(至少包括两个数)
如：18 19 20 21 22

输出所有和为S的连续正数序列，序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序

```java 双指针
/**
 * 1. 前后各一个指针：front、reer
 * 2. 若序列和小于 S，reer 后移；否则 front 后移
 * front -> | …… | reer -> | ……
 *     x1   | …… |   xn    | ……
 * 终止条件：reer、front 相遇
 */
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int sum = scanner.nextInt();
		Main tmp = new Main();
		ArrayList<ArrayList<Integer>> lists = tmp.FindContinuousSequence(sum);
		Iterator<ArrayList<Integer>> iterator = lists.iterator();
		for (; iterator.hasNext();) {
			System.out.println(iterator.next());
		}
		scanner.close();
	}

	public ArrayList<ArrayList<Integer>> FindContinuousSequence(int sum) {
		ArrayList<ArrayList<Integer>> lists = new ArrayList<ArrayList<Integer>>();
		Integer front = 1;
		Integer reer = 2;
		while (reer != front) {
			int s = (front + reer) * (reer - front + 1) / 2;
			if (s > sum) {
				front += 1;
			} else if (s < sum) {
				reer += 1;
			} else {
				ArrayList<Integer> iArrayList = new ArrayList<>();
				for (Integer i = front; i <= reer; i++) {
					iArrayList.add(i);
				}
				lists.add(iArrayList);
				front += 1;
			}
		}
		return lists;
	}
}
```

# 和为S的两个数字

输入一个递增排序的数组和一个数字S，在数组中查找两个数，使它们的和正好是S
如果有多对数字的和等于S，输出两个数的乘积最小的，对应每个测试案例，输出两个数，小的先输出

```java 双指针
/**
 * 数组头和尾分别设置指针，第一次匹配到的两个数即是乘积最小的两个数
 * 设头尾指针对应值的和为 K
 * 步骤：
 * 1.若 K 小于 S，头指针后移
 * 2.若 K 大于 S，尾指针前移
 */

```

# 数组中只出现一次的数字

一个整型数组里除了两个数字之外，其他的数字都出现了两次。
找出这两个只出现一次的数字

** 简版 **

一个整型数组里除了一个数字之外，其他的数字都出现了两次。
找出这个只出现一次的数字

** 分析 **

将所有数字异或，最后结果就是这个只出现一次的数字。
因为出现两次的数字异或后为0。

```java 分两个子数组
/**
 * 根据简版，可以将该问题分成两个分别包含一个数字的子数组。
 * 如：
 * 原数组  | 1 2 1 2 3 5
 * 子数组1 | 2 2 3
 * 子数组2 | 1 1 5
 * <p>
 * 以上面例子为例的步骤：
 * 1. 将所有数字异或，得出包含这两个只出现一次的数字的异或二进制值0110
 * 2. 以二进制第一个1所在的位为标准（这里是二），分出子数组
 * 3. 原数组中2和3的第二位都是1，所以分到了一组；而1和5分到另一组
 * 4. 最后得到上述表格的子数组，按简版的方法异或即可
 */
```

# 数字在排序数组中出现的次数

统计一个数字在排序数组中出现的次数

```java 二分查找
/**
 * 找到数字的头和尾，差值就是次数
 */
```

# 孩子们的游戏(圆圈中最后剩下的数)

1. 让小朋友们围成一个大圈。
2. 随机指定一个数m，让编号为0的小朋友开始报数。
每次喊到 m-1 的那个小朋友要出列唱首歌，然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,从下一个小朋友开始,继续0...m-1报数....

这样下去....直到剩下最后一个小朋友,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)

** 分析 **

*约瑟夫环问题*
N个人围城一桌（首位相连），约定从1报数，报到数为k的人出局，然后下一位又从1开始报，以此类推。最后留下的人获胜。

（有很多类似问题，如猴子选代王等等，解法都一样）

*递推公式*
$f[1] = 0$
$f[i] = (f[i-1] + m) % i (i > 1)$


```java 递归公式
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int m = scanner.nextInt();
		System.out.println(LastRemaining_Solution(n, m));
		scanner.close();
	}

	public static int LastRemaining_Solution(int n, int m) {
		if (n == 0) {
			return -1;
		}
		int last = 0;
		for (int i = 2; i <= n; i++) {
			last = (last + m) % i;
		}
		return last;
	}
}
```

# 左旋转字符串

用字符串模拟循环左移
如：字符序列"abcXYZdef"，要求输出循环左移3位后的结果，即"XYZdefabc"

```java 直接使用内置函数
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		String string = scanner.next();
		System.out.println(LeftRotateString(string, n));
		scanner.close();
	}

	public static String LeftRotateString(String str, int n) {
		if (str == null) {
			return "";
		}
		n = n % str.length();
		if (n == 0) {
			return str;
		}
		return str.substring(n) + str.substring(0, n);
	}
}
```

# 限制使用某些关键字

有些题目会要求不能使用某些运算符，或者其他，这时候就需要一些骚操作
先把不能用的去掉，从能用的操作中找到能解决问题的

## 求1+2+3+...+n

求1+2+3+...+n
不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A ? B : C）

** 分析 **

排除不能用的运算，现在可以使用（按优先级高低）
单目运算符：++，--
双目运算符：+，-
移位运算符：<<，>>
关系运算符：>，<等
逻辑运算符：&&，||，&，|，^
赋值：=

单目和双目的作用一样，移位显然没有规律性，因为一个二进制位并不能区分某个数和其他数，这也就排除了&,|,^,因为不需要做位运算了

关系运算符要和if匹配，但不能用if，这时剩下的运算符只能选&&，||，它们有短路特性。

（类似shell里的&&）

```java 短路特性
public int Sum_Solution(int n) {
  int sum = n;
  // 当n大于0，顺序执行后面的操作
  boolean flag = (n > 0) && ((sum += Sum_Solution(n - 1)) > 0);
  return sum;
}
```

## 不用加减乘除做加法

求两个整数之和
不得使用+、-、\*、/四则运算符号

** 分析 **

位运算解决
第1步：先忽略进位，异或两个数
第2步：相与再左移：求两个数的进位
第3步：重复上述两步，直到第2步的进位为0

** 例子 **

5+7=12
第1步：相加各位的值，即异或操作：101^111，不算进位，得010
第2步：相与再左移(101&111)<<1，计算进位值，得1010
第3步：重复上述两步，相加：010^1010 = 1000，进位：(010&1010) <<1 = 100
继续重复上述两步：1000^100 = 1100，进位：(1000&100) <<1 = 0

跳出循环，1100为最终结果

```java
public int Add(int num1, int num2) {
  int tmp = 0;
  while (num2 != 0) {
    tmp = num1 ^ num2;
    num2 = (num1 & num2) << 1;
    num1 = tmp;
  }
  return num1;
}
```

# 二进制中1的个数

输入一个整数，输出该数二进制表示中1的个数。
其中负数用补码表示

```java 循环去掉最右边的1
/**
 * 有多少个1，就去掉多少个1
 * 利用减1后的数和原数相与，循环去掉最右边的1
 * <p>
 * 如：十进制的12，二进制为1100，12-1后变为1011，原来的1100和1011相与：1000，即去掉了最右边的1，循环直到数为0。
 */
public int NumberOf1(int n) {
    int nums = 0;
    while (n != 0) {
        n &= n - 1;
        nums++;
    }
    return nums;
}
```

```java 循环左移
/**
 * 循环左移，&2的次方判断（从2的0次方开始，即8 4 2 1）
 * 如：十进制11，二进制为1011，&1判断第1位后，将1左移<<变为10，判断第2位，循环直到2的次方等于0。
 * （int i左移溢出变回0，可以判断32次）
 */
public int NumberOf1(int n) {
    int nums = 0;
    int i = 1;
    while (i != 0) {
        if ((n & i) == i)
            nums++;
        i <<= 1;
    }
    return nums;
}
```

```java 逻辑右移
/**
 * Java的逻辑右移，可以忽略负数补1的情况
 */
public int NumberOf1(int n) {
    int nums = 0;
    while (n != 0) {
        if ((n & 1) == 1)
            nums++;
        n >>>= 1;
    }
    return nums;
}
```

# 翻转单词顺序

翻转单词顺序
如："student. a am I"
正确的句子应该是"I am a student."

```java 使用split
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		String string = scanner.nextLine();
		System.out.println(ReverseSentence(string));
		scanner.close();
	}

	public static String ReverseSentence(String str) {
		if (str == null || str.trim().equals("")) {
			return str;
		}
		String[] strings = str.split(" ");
		StringBuilder stringBuilder = new StringBuilder();
		for (int i = strings.length - 1; i >= 0; i--) {
			stringBuilder.append(strings[i]);
			if (i != 0) {
				stringBuilder.append(" ");
			}
		}
		return stringBuilder.toString();
	}
}
```

```java 不使用split

```

# 丑数

丑数：只含因子 2、3、5 的数。
4、6、8 是丑数；而 14 不是，因为其包含因子 7。
习惯上把 1 当作第一个丑数。

** 分析 **

根据定义，一个丑数应该是另一个丑数乘以 2、3或5 的结果。
4 是丑数 2 乘以 2 的结果；6 是丑数 2 乘以 3 的结果（或 3 乘以 2 ）

```java 3个队列解决
/**
 * 1. 初始化 3 个队列 Q2、Q3、Q5，分别保存 2、3、5 的倍数
 * 2. 初始化 x 为 1
 * 3. 分别将 x * 2、 x * 3、x * 5 插入 3 个队列
 * 4. 令 x 为 Q2 Q3 Q5 中队头最小值
 * 5. 若 x 在：
 * Q2：出队，将 x * 2、x * 3、x * 5 分别放入 Q2、Q3、Q5
 * Q3：出队，将 x * 3、x * 5 分别放入 Q3、Q5
 * Q5：出队，将 x * 5 放入 Q5
 * （不将倍数全部插入队列是为了避免重复，
 * 队列先进先出，总会保持从小到大的顺序）
 * 6. 重复 4 ~ 5，直到找到第 k 个元素
 */
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.lang.Math;

public class UglyNumber {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int index = scanner.nextInt();
		UglyNumber uglyNumber = new UglyNumber();
		System.out.println(uglyNumber.GetUglyNumber_Solution(index));
		scanner.close();
	}

	public int GetUglyNumber_Solution(int index) {
	    if (index < 1) return 0;
	    int minVal = 0;
	    Queue<Integer> q2 = new LinkedList<Integer>();
	    Queue<Integer> q3 = new LinkedList<Integer>();
	    Queue<Integer> q5 = new LinkedList<Integer>();
	    q2.offer(1);

	    for (int i = 0; i < index; i++) {
	    	int val2 = q2.isEmpty() ? Integer.MAX_VALUE : q2.element();
	    	int val3 = q3.isEmpty() ? Integer.MAX_VALUE : q3.element();
	    	int val5 = q5.isEmpty() ? Integer.MAX_VALUE : q5.element();

	        minVal = Math.min(val2, Math.min(val3, val5));

	        if (minVal == val2) {
	            q2.poll();
	            q2.offer(2 * minVal);
	            q3.offer(3 * minVal);
	        }
	        else if (minVal == val3) {
	            q3.poll();
	            q3.offer(3 * minVal);
	        }
	        else {
	            q5.poll();
	        }

	        q5.offer(5 * minVal);
	    }

	    return minVal;
	}
}
```
