---
title: "BFS"
description: "BFS 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "BFS"]
legacy_source: "基础/数据结构与算法/刷题总结/BFS.md"
---
#### BFS

**广度优先遍历：一般适用于在树或者图中找最短距离和最长距离的问题，一次while循环距离+1。**


**1162. 地图分析**

在n*n的地图上，有陆地（1）和海洋（0），我们需要找到距离陆地最远的海洋的距离；

所以可以采用BFS，以所有现有的陆地作为起点对4个方向进行搜索，每次搜索经过的部分进行特殊标记，防止重复搜索，最终的步数就是最远距离。

针对BFS多起点和单起点的问题：一般BFS都是单起点，本题是多起点，仍然可以理解为单起点，只是我们拿到的多起点是单起点的第二层而已。

```java
public int maxDistance(int[][] grid) &#123;
    int n = grid.length;
    int[][] directions = &#123;&#123;-1, 0&#125;, &#123;1, 0&#125;, &#123;0, -1&#125;, &#123;0, 1&#125;&#125;;
    //队列中存储陆地的坐标
    Queue&lt;int[]> queue = new LinkedList&lt;>();
    for (int i = 0; i &lt; n; i++) &#123;
        for (int j = 0; j &lt; n; j++) &#123;
            //数组坐标按照整数存储
            if (grid[i][j] == 1) queue.offer(new int[]&#123;i, j&#125;);
        &#125;
    &#125;
    if (queue.isEmpty() || queue.size() == n * n) return -1;
    int step = -1;
    while (!queue.isEmpty()) &#123;
        step++;
        int size = queue.size();
        for (int i = 0; i &lt; size; i++) &#123;
            int[] z = queue.poll();
            int x = z[0], y = z[1];
            //按照4个方向继续扩散
            for (int[] direction : directions) &#123;
                int newX = x + direction[0];
                int newY = y + direction[1];
                //如果它是陆地并且边界合法，放入队列中继续
                if (inArea(newX, newY, n) && grid[newX][newY] == 0) &#123;
                    //特殊标记，防止重复访问
                    grid[newX][newY] = 1;
                    queue.offer(new int[]&#123;newX, newY&#125;);
                &#125;
            &#125;
           
        &#125;
    &#125;
    return step;
&#125;

private boolean inArea(int x, int y, int n) &#123;
    return x >= 0 && x &lt; n && y >= 0 && y &lt; n;
&#125;
```

**542. 01矩阵**

一个只由0和1组成的矩阵，找到每个点距离最近的0的距离，返回一个矩阵。

方法1：搜索每个值到最近的0的距离，所以0的位置上值为0；以所有0为顶点进行第一层BFS，遇到是1（初始化为-1）的就在0的基础上+1代表这个值的距离，然后以这个被扫到的1为顶点进行下一轮BFS，下一轮被扫到的应该的距离是当前1+1，逐渐累加。

```java
// 搜索每个1到最近的0的距离 -> 问题转换为搜索0到每个1的距离
// 所有的0入队，然后BFS，如果遇到1，那么距离为0+1；当前节点再入队，继续BFS，下面遇到是1的节点距离就是1+1
// 所以问题转化为：从所有的0开始BFS，遇到1，距离就为当前顶点值+1.
public int[][] updateMatrix(int[][] matrix) &#123;
    Queue&lt;int[]> queue = new LinkedList&lt;>();
    int[][] directions = &#123;&#123;-1, 0&#125;, &#123;1, 0&#125;, &#123;0, -1&#125;, &#123;0, 1&#125;&#125;;
    for (int i = 0; i &lt; matrix.length; i++) &#123;
        for (int j = 0; j &lt; matrix[0].length; j++) &#123;
            if (matrix[i][j] == 0) queue.offer(new int[]&#123;i, j&#125;);
            else matrix[i][j] = -1;
        &#125;
    &#125;

    while (!queue.isEmpty()) &#123;
        int[] q = queue.poll();
        int x = q[0];
        int y = q[1];
        for (int[] direction : directions) &#123;
            int newX = x + direction[0];
            int newY = y + direction[1];
            // 如果newX,newY这个点没有被扫到
            if (newX >= 0 && newX &lt;= matrix.length && newY >= 0 && newY &lt;= matrix[0].length && matrix[newX][newY] == -1) &#123;
                // 当前这个点距离最近的0的距离
                matrix[newX][newY] = matrix[x][y] + 1;
                queue.offer(new int[]&#123;newX, newY&#125;);
            &#125;
        &#125;
    &#125;
    return matrix;
&#125;
```


方法2：DP。

opt[i][j] = Math.min(opt[i-1][j], opt[i][j-1], opt[i+1][j], opt[i][j+1]) + 1

初始化时0为0，1初始化为最大值; 方便做最小值的替换

简化为从左上和右下两个角DP。

```java
// opt[i][j] = Math.min(opt[i-1][j], opt[i][j-1], opt[i+1][j], opt[i][j+1]) + 1
// 初始化时0为0，1初始化为最大值; 方便做最小值的替换
// 简化为从左上和右下两个角DP
public int[][] updateMatrix(int[][] matrix) &#123;
    int m = matrix.length;
    int n = matrix[0].length;
    int[][] opt = new int[m][n];
    for (int i = 0 ; i &lt; m; i++) &#123;
        for (int j = 0; j &lt; n; j++) &#123;
            opt[i][j] = matrix[i][j] == 0 ? 0 : 10000;
        &#125;
    &#125;
    // 左上角开始DP
    for (int i = 0; i &lt; m; i++) &#123;
        for (int j = 0; j &lt; n; j++) &#123;
            if (i > 0) opt[i][j] = Math.min(opt[i][j], opt[i - 1][j] + 1);
            if (j > 0) opt[i][j] = Math.min(opt[i][j], opt[i][j - 1] + 1);
        &#125;
    &#125;

    // 右下角开始DP
    for (int i = m - 1; i >= 0; i--) &#123;
        for (int j = n - 1; j >= 0; j--) &#123;
            if (i &lt; m - 1) opt[i][j] = Math.min(opt[i][j], opt[i + 1][j] + 1);
            if (j &lt; n - 1) opt[i][j] = Math.min(opt[i][j], opt[i][j + 1] + 1);
        &#125;
    &#125;
    return opt;
&#125;
```


**面试题13. 机器人的运动范围**

机器人从（0，0）运动到(m-1, n-1)，有限制条件，坐标数字之和不能大于k，求机器人最终移动到了多少个格子。

方法1：子顶向下递归，要求(0,0)开始的值，需要求(0,1)个(1,0)的值向下走的和+1，去除重复元素。
```java
public int movingCount(int m, int n, int k) &#123;
    boolean[][] visted = new boolean[m][n];
    return move(m, n, k, visted, 0, 0);
&#125;

private int move(int m, int n, int k, boolean[][] visted, int i, int j) &#123;
    if (i == m || j == n || visted[i][j] || getNum(i) + getNum(j) > k) return 0;
    visted[i][j] = true;
    return 1 + move(m, n, k, visted, i + 1, j) + move(m, n, k, visted, i, j + 1)；
&#125;
```
方法2：DFS，不断探索并更新全局变量的值
```java
int res;
    public int movingCount(int m, int n, int k) &#123;
        boolean[][] visted = new boolean[m][n];
        dfs(m, n, k, visted, 0, 0);
        return res;
    &#125;

    private void dfs(int m, int n, int k, boolean[][] visted, int i, int j) &#123;
        if (i == m || j == n || visted[i][j] || getNum(i) + getNum(j) > k) return;
        visted[i][j] = true;
        res++;
        dfs(m, n, k, visted, i + 1, j);
        dfs(m, n, k, visted, i, j + 1);
    &#125;

    private int getNum(int num) &#123;
        int res = 0;
        while (num > 0) &#123;
            res += num % 10;
            num /= 10;
        &#125;
        return res;
    &#125;
```


方法3：BFS
```java
public int movingCount(int m, int n, int k) &#123;
    boolean[][] visted = new boolean[m][n];
    Queue&lt;int[]> queue = new LinkedList&lt;>();
    queue.offer(new int[]&#123;0, 0&#125;);

    int res = 0;
    while (!queue.isEmpty()) &#123;
        int[] num = queue.poll();
        if (num[0] >= m || num[1] >= n || visted[num[0]][num[1]] || getNum(num[0]) + getNum(num[1]) > k) continue;
        visted[num[0]][num[1]] = true;
        res++;
        queue.add(new int[]&#123;num[0] + 1, num[1]&#125;);
        queue.add(new int[]&#123;num[0], num[1] + 1&#125;);
    &#125;
    return res;
&#125;

private int getNum(int num) &#123;
    int res = 0;
    while (num > 0) &#123;
        res += num % 10;
        num /= 10;
    &#125;
    return res;
&#125;
```
