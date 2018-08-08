---
title: 和为S的连续正数序列
date: 2018-01-01
category: 算法
---

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
