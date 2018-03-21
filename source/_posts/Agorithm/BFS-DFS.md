---
title: 广度搜索和深度搜索
date: 2018-3-9
category: 学习
---

# 前言

搜索界两大基础搜索算法分别是广度优先搜索和深度优先搜索。

搜索算法可以用于寻找图的连通性。

## 广度优先搜索

一个普通的二维地图，从 A 点到 B 点，有两个问题。

1. 能否到达？
2. 怎样以最短的路径走到B点？

这是搜索算法能够解决的事情。

要使用广度优先搜索算法来搜索从 A 点到 B 点的最短路径

依据广度优先的原则，每走一步，都将下一步所有可能的选择入队之后，才进行下一步。

结束标记：
- 队列为空时，搜索结束
- 搜索到指定结果时，搜索结束

例子：

```java 
/*
 *        A
 *      B   C
 *    D   G   E
 *  F
 * 搜索从A到F的最少步数，广度优先搜索：
 * 第一步：
 *        A入队，步数是0
 *        A为队头
 * 第二步：
 *        查看A下一步的所有选择
 *        有B和C，所以第二步可以到达B和C，步数是1
 *        B、C入队，同时标记B和C，表示已经走过了。
 *        A已经没用了，因为A所有可能到达的点已经在队列里了，所以A出队。
 *        判断是否达到目标地点：
 *            是，结束循环。当前步数是最短步数
 *            否，继续
 *        此时队头为B
 * 第三步：
 *        B、C是同时入队的，所以两个都要在第三步里扩展所有可能。
 *
 *        1. 查看B下一步的所有选择
 *           有D、G
 *           D、G入队，标记D、G
 *           B也没用了，B出队
 *           判断是否达到目标地点：
 *              是，结束循环。当前步数是最短步数
 *              否，继续
 *           此时队头为C
 *        2. 查看C下一步的所有选择
 *           有G、E，但是G已经标记走过了
 *           所以只有E可选
 *           E入队，同时标记E
 *           C已无效，C出队
 *           此时队头为D
 *        合并B、C扩展出来的所有选择，有D、G、E
 *        所以第三步可以达到的是D、G、E，步数是2
 *        判断是否达到目标地点：
 *            是，结束循环。当前步数是最短步数
 *            否，继续
 * 第四步：
 *        搜索D、G、E所有的的扩展可能
 *
 *        1.  查看D下一步的所有选择
 *            有F，F入队，此时步数是3
 *            D出队
 *            判断是否达到目标地点：
 *               发现F是目标，结束遍历。
 *
 * A到达F的最小步数是3
 */
class Main {
	static int maxLine = 6, maxRow = 5;
	static int[][] map = new int[maxLine][maxRow];
	static int[][] mark = new int[maxLine][maxRow];
	static int targetLine = 4, targetRow = 3;
	static int totalStep = -1;
	static int[][] nextDirection = { { 0, -1 }, { 1, 0 }, { 0, 1 }, { -1, 0 } };

	public static void main(String[] args) {
		map[1][3] = 1;
		map[3][3] = 1;
		map[4][2] = 1;
		map[5][4] = 1;
		bfs(1, 1);
		System.out.print(totalStep == -1 ? "\n没有到达" : "\n到达");
		System.out.println("目标位置: " + targetLine + "行" + targetRow + "列，总步数：" + totalStep);
	}

	public static void bfs(int startLine, int startRow) {
		mark[startLine][startRow] = 1;
		Node[] queue = new Node[maxLine * maxRow];
		int head = 0, tail = 0;
		queue[tail] = new Node(startLine, startRow, 0, head);
		tail++;
		int nextLine, nextRow;
		// 队列不为空，即队头下标还没与队尾下标相遇
		while (head < tail) {
			// 4个方向
			for (int i = 0; i < 4; i++) {
				nextLine = queue[head].getLine() + nextDirection[i][0];
				nextRow = queue[head].getRow() + nextDirection[i][1];
				// 如果下一个位置不符合迷宫位置
				if (nextLine >= maxLine || nextRow >= maxRow || nextLine < 1 || nextRow < 1) {
					continue;
				}
				// 没有走过并且不是障碍物
				if (mark[nextLine][nextRow] != 1 && map[nextLine][nextRow] != 1) {
					queue[tail] = new Node(nextRow, nextLine, queue[head].getStep() + 1, head);
					tail++;
					mark[nextLine][nextRow] = 1;
				}
				// 是否到达目标位置
				if (nextLine == targetLine && nextRow == targetRow) {
					int index = tail - 1;
					// 到达目标位置的总步数
					totalStep = queue[index].getStep();
					// 经过的路径
					for (int j = 0; j <= totalStep; j++) {
						System.out.println("(" + queue[index].getLine() + "," + queue[index].getRow() + ")");
						index = queue[index].getNodeIndex();
					}
					return;
				}
			}
			// 队头出队
			head++;
		}
		// 如果没走出
		totalStep = -1;
	}

	private static class Node {
		// 节点下标
		int nodeIndex;
		// 走到某节点时的行、列以及走过的步数
		int row, line, step;

		Node(int line, int row) {
			this.line = line;
			this.row = row;
		}

		Node(int row, int line, int step, int nodeIndex) {
			this.row = row;
			this.line = line;
			this.step = step;
			this.nodeIndex = nodeIndex;
		}

		public int getNodeIndex() {
			return nodeIndex;
		}

		public int getRow() {
			return row;
		}

		public int getLine() {
			return line;
		}

		public int getStep() {
			return step;
		}
	}
}
```

## 深度优先搜索