---
title: "DP"
description: "DP 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "DP"]
legacy_source: "基础/数据结构与算法/刷题总结/DP.md"
---
#### DP

**面试题 17.16. 按摩师**

一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。

题目意思是一个给定一个数组，不能取连续值，求取出的最大值。

可以使用动态规划来解决：

**1**.定义状态为：考察到第i个元素时接或者不接的最大值；

状态转移方程：dp[i][0] = max(dp[i - 1][0], dp[i - 1][1]); dp[i][1] = dp[i - 1][0] + nums[i];

```java
//二维数组空间O(2N)
public int massage(int[] nums) &#123;
    if (nums == null || nums.length == 0) return 0;
    int n = nums.length;
    if (n == 1) return nums[0];
    
    int[][] dp = new int[n][2];
    dp[0][0] = 0;
    dp[0][1] = nums[0];
    
    for (int i = 1; i &lt; n; i++) &#123;
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
        dp[i][1] = dp[i - 1][0] + nums[i];
    &#125;
    return Math.max(dp[n - 1][0], dp[n - 1][1]);
&#125;
```

**2**.状态压缩：

定义状态为：考察到第i个元素时可选的最大值；

状态转移方程：dp[i] = max(dp[i-1], dp[i-2]+nums[i]);

```java
//状态压缩解法，时间O(N),空间O(N)
public int massage(int[] nums) &#123;
    if (nums == null || nums.length == 0) return 0;
    int n = nums.length;
    if (n == 1) return nums[0];
    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.max(dp[0], nums[1]);
    for (int i = 2; i &lt; n; i++) &#123;
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    &#125;
    return dp[n - 1];
&#125;

//因为只需要存储前两个值即可，优化成空间O(1)
public int massage(int[] nums) &#123;
    if (nums == null || nums.length == 0) return 0;
    int n = nums.length;
    if (n == 1) return nums[0];
    int f0 = nums[0];
    int f1 = Math.max(f0, nums[1]);
    for (int i = 2; i &lt; n; i++) &#123;
        int f2 = Math.max(f1, f0 + nums[i]);
        f0 = f1;
        f1 = f2;
    &#125;
    return f1;
&#125;
```
**322. 零钱兑换**

一个面额数组，一个目标金额，求最小需要多少枚钱币；

方法1：备忘录递归；当前金额需要的数量是（当前金额-数组中每个金额）所对应的金额数量+1；

```java
private int[] memo;
public int coinChange(int[] coins, int amount) &#123;
    memo = new int[amount + 1];
    return process(coins, amount);
&#125;

private int process(int[] coins, int amount) &#123;
    if (amount &lt; 0) return -1;
    if (amount == 0) return 0;
    if (memo[amount] != 0) return memo[amount];

    //定义一个不可能的数
    int min = amount + 1;
    for (int coin: coins) &#123;
        int res = -1;
        // 如果面值小于金额就进入下一层
        if (coin &lt;= amount) res = process(coins, amount - coin);
        // 更新同一层最小值
        if (res >= 0 && res &lt; min) min = res + 1;
    &#125;
    memo[amount] = min == amount + 1 ? -1 : min;
    return memo[amount];
&#125;
```

方法2：状态转移方程

```java
// dp[i] = min&#123;dp[i - coins[j]] + 1&#125;，当前i由i-每个coin的最小值而来
public int coinChange(int[] coins, int amount) &#123;
    if (coins == null || coins.length == 0 || amount &lt;= 0) return 0;
    int[] states = new int[amount + 1];
    // 初始化为不可能的数
    for (int state : states) &#123;
        state = amount + 1;
    &#125;
    states[0] = 0;
    for (int i = 1; i &lt;= amount; i++) &#123;
        for (int j = 0; j &lt; coins.length; j++) &#123;
            states[i] = Math.min(states[i], states[i - coins[j]] + 1);
        &#125;
    &#125;
    return states[amount] == amount + 1 ? -1 : states[amount];
&#125;
```

**70. 爬楼梯**

一次可以爬一级，也可以爬两级，问有多少种方法爬n级

```java
public int climbStairs(int n) &#123;
    if (n &lt;= 0) return 0;
    int f1 = 1;
    int f2 = 2;
    for (int i = 3; i &lt;= n; i++ &#123;
        int f3 = f1 + f2;
        f1 = f2;
        f2 = f3;
    &#125;
    return f2;
&#125;
```

**72. 最小编辑距离**

方法1：回溯

```java
int m;
int n;
int minDist;
public int minDistance(String word1, String word2) &#123;
    if (word1 == null || word2 == null) return 0;
    m = word1.length();
    n = word2.length();
    process(word1, word2, 0, 0, 0);
    return minDist;
&#125;

private void process(String word1, String word2, int i, int j, int edist) &#123;
    if (i == m || j == n) &#123;
        if (i &lt; m) edist += (m - i);
        else if(j &lt; n) edist += (n - j);
        if (edist &lt; minDist) minDist = edist;
        return;
    &#125;
    
    if (word1.charAt(i) == word2.charAt(j)) process(word1, word2, i + 1, j + 1, edist);
    else &#123;
        process(word1, word2, i + 1, j, edist + 1); // b[j]前添加一个a[i]或删除a[i]
        process(word1, word2, i, j + 1, edist + 1);
        process(word1, word2, i + 1, j + 1, edist + 1);
    &#125;
&#125;
```
方法2：DP

```java
public int minDistance(String word1, String word2) &#123;
    if (word1 == null || word2 == null) return 0;
    int m = word1.length();
    int n = word2.length();
    if (m == 0) return n;
    if (n == 0) return m;

    int[][] minDist = new int[m][n];
    for (int j = 0; j &lt; n; j++) &#123;
        if (word1.charAt(0) == word2.charAt(j)) minDist[0][j] = j;
        else if (j != 0) minDist[0][j] = minDist[0][j - 1] + 1;
        else minDist[0][j] = 1;
    &#125;

    for (int i = 0; i &lt; m; i++) &#123;
        if (word1.charAt(i) == word2.charAt(0)) minDist[i][0] = i;
        else if (i != 0) minDist[i][0] = minDist[i - 1][0] + 1;
        else minDist[i][0] = 1;
    &#125;

    for (int i = 1; i &lt; m; i++) &#123;
        for (int j = 1; j &lt; n; j++) &#123;
            if (word1.charAt(i) == word2.charAt(j)) &#123;
                minDist[i][j] = min(minDist[i - 1][j] + 1, minDist[i][j - 1] + 1, minDist[i - 1][j - 1]);
            &#125; else &#123;
                minDist[i][j] = min(minDist[i - 1][j] + 1, minDist[i][j - 1] + 1, minDist[i - 1][j - 1] + 1);
            &#125;
        &#125;
    &#125;
    return minDist[m - 1][n - 1];
&#125;



private int min(int a, int b, int c) &#123;
    int min = a;
    if (b &lt; min) min = b;
    if (c &lt; min) min = c;
    return min;
&#125;
```

**1143. 最长公共子序列**

可以不连续。

方法1：回溯

```java
int res;
public int longestCommonSubsequence(String text1, String text2) &#123;
    if (text1 == null || text2 == null) return 0;
    int m = text1.length();
    int n = text2.length();
    if (m == 0 || n == 0) return 0;
    process(text1, text2, m, n, 0, 0, 0);
    return res;
&#125;

private void process(String text1, String text2, int m, int n, int i, int j, int curMax) &#123;
    if (i == text1.length() || j == text2.length()) &#123;
        res = Math.max(res, curMax);
        return;
    &#125;

    if (text1.charAt(i) == text2.charAt(j)) process(text1, text2, m, n, i + 1, j + 1, curMax + 1);
    else &#123;
        process(text1, text2, m, n, i + 1, j, curMax);
        process(text1, text2, m, n, i, j + 1, curMax);
    &#125;
&#125;
```

方法2：DP

```java
public int longestCommonSubsequence(String text1, String text2) &#123;
    if (text1 == null || text2 == null) return 0;
    int m = text1.length();
    int n = text2.length();
    if (m == 0 || n == 0) return 0;
    int[][] opt = new int[m][n];
    // 初始化第一列
    for (int i = 0; i &lt; m; i++) &#123;
        opt[i][0] = text1.charAt(i) == text2.charAt(0) ? 1 : i != 0 ? opt[i - 1][0] : 0;
    &#125;
    // 初始化第一行
    for (int j = 0; j &lt; n; j++) &#123;
        opt[0][j] = text1.charAt(0) == text2.charAt(j) ? 1 : j != 0 ? opt[0][j - 1] : 0;
    &#125;
    // 动态规划
    for (int i = 1; i &lt; m; i++) &#123;
        for (int j = 1; j &lt; n; j++) &#123;
            if (text1.charAt(i) == text2.charAt(j)) &#123;
                opt[i][j] = max(opt[i - 1][j - 1] + 1, opt[i - 1][j], opt[i][j - 1]);
            &#125; else &#123;
                opt[i][j] = max(opt[i - 1][j], opt[i][j - 1], opt[i - 1][j - 1]);
            &#125;
        &#125;
    &#125;
    return opt[m - 1][n - 1];
&#125;

private int max(int a, int b, int c) &#123;
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    return max;
&#125;
```


**120. 三角形最小路径和**

递推公式： 最小路径=顶点的值+min&#123;顶点左下方最小路径和，顶点右下方最小路径和&#125;；

终止条件： 最后一层的最小路径和就是它本身。

方法1：递归+备忘录

```java
Integer[][] memo;
public int minimumTotal(List&lt;List&lt;Integer>> triangle) &#123;
    memo = new Integer[triangle.size()][triangle.size()];
    return process(triangle, 0, 0);
&#125;

private int process(List&lt;List&lt;Integer>> triangle, int level, int c) &#123;
    if (memo[level][c] != null) return memo[level][c];
    if (level == triangle.size() - 1) &#123;
        return memo[level][c] = triangle.get(level).get(c);
    &#125;
    
    int left = process(triangle, level + 1, c);
    int right = process(triangle, level + 1, c + 1);
    return memo[level][c] = Math.min(left, right) + triangle.get(level).get(c);
&#125;
```

方法2：Dp

状态转移方程：DP[i][j] = min&#123;DP[i + 1][j], DP[i + 1][j + 1]&#125; + triangle[i][j];

初始状态：DP[triangle.size() - 1][j] = triangle[triangle.size() - 1][j];

```java
// 方法2：DP
public int minimumTotal(List&lt;List&lt;Integer>> triangle) &#123;
    int m = triangle.size();
    int[][] dp = new int[m][m];
    for (int i = 0; i &lt; triangle.get(m - 1).size(); i++) &#123;
        dp[m - 1][i] = triangle.get(m - 1).get(i); 
    &#125;
    
    for (int i = m - 2; i >= 0; i--) &#123;
        for (int j = 0; j &lt; triangle.get(i).size(); j++) &#123;
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle.get(i).get(j);
        &#125;
    &#125;
    return dp[0][0];
&#125;
```

方法3：DP降维

只需要一个一维数组存储每层的最优状态即可。

```java
public int minimumTotal(List&lt;List&lt;Integer>> triangle) &#123;
    if (triangle == null || triangle.size() == 0)
        return 0;
    int m = triangle.size();
    int[] dp = new int[m];
    for (int i = 0; i &lt; m; i++) &#123;
        dp[i] = triangle.get(m - 1).get(i);
    &#125;

    for (int i = m - 2; i >= 0; i--) &#123;
        for (int j = 0; j &lt; triangle.get(i).size(); j++) &#123;
            // 每一列的最短路径=（下面一层当前列和后一列的较小值）+当前层的值
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle.get(i).get(j);
        &#125;
    &#125;
    return dp[0];
&#125;

//----------------简化写法---------------------

public int minimumTotal(List&lt;List&lt;Integer>> triangle) &#123;
    if (triangle == null || triangle.size() == 0)
        return 0;
    int m = triangle.size();
    int[] dp = new int[m + 1];
    for (int i = m - 1; i >= 0; i--) &#123;
        // 顺序遍历，这样每次dp[j]运算时用到dp[j + 1]都是下面一行的
        for (int j = 0; j &lt; triangle.get(i).size(); j++) &#123;
            // 每一列的最短路径=（下面一层当前列和后一列的较小值）+当前层的值
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle.get(i).get(j);
        &#125;
    &#125;
    return dp[0];
&#125;
```

**64. 最小路径和**

求一个m * n的，所有值都是正数的二维数组中，从（0,0）到(m-1, n-1)的路径和。

方法1：自顶向下递归+备忘录

f(m-1,n-1)=min&#123;f(m-1-1,n-1),f(m-1,n-1-1)&#125;+nums[m-1][n-1];

```java
//方法1：自顶向下备忘录递归
int[][] directions = &#123;&#123;0, -1&#125;, &#123;-1, 0&#125;&#125;;
int m;
int n;
int[][] memo;
public int minPathSum(int[][] grid) &#123;
    if (grid == null || grid.length == 0) return 0;
    m = grid.length;
    n = grid[0].length;
    memo = new int[m][n];
    return process(grid,  m - 1,n -1);
&#125;

private int process(int[][] grid, int i, int j) &#123;
    if (memo[i][j] != 0) return memo[i][j];
    if (i == 0 && j == 0) return memo[i][j] = grid[0][0];
    int min = Integer.MAX_VALUE;
    for (int[] directin : directions) &#123;
        int x = i + directin[0];
        int y = j + directin[1];
        if (inArea(x, y)) &#123;
            int val = process(grid, x, y);
            min = Math.min(min, val);
        &#125;
    &#125;
    return memo[i][j] = min + grid[i][j];
&#125;

private boolean inArea(int x, int y) &#123;
    return x >=0 && y >= 0;
&#125;
```

方法2：自底向上DFS（超时）


```java
//方法2：自底向上DFS
int[][] directions = &#123;&#123;0, 1&#125;, &#123;1, 0&#125;&#125;;
int m;
int n;
int min = Integer.MAX_VALUE;
public int minPathSum(int[][] grid) &#123;
    if (grid == null || grid.length == 0) return 0;
    m = grid.length;
    n = grid[0].length;
    process(grid,  0,0,0);
    return min;
&#125;

private void process(int[][] grid, int i, int j, int curMin) &#123;
    if (i == m - 1 && j == n - 1) &#123;
        curMin += grid[i][j];
        min = Math.min(curMin, min);
        return;
    &#125;
    curMin += grid[i][j];
    for (int[] direction : directions) &#123;
        int x = direction[0] + i;
        int y = direction[1] + j;
        if (inArea(x, y)) process(grid, x, y, curMin);
    &#125;
&#125;

private boolean inArea(int x, int y) &#123;
    return x &lt; m && y &lt; n;
&#125;
```
方法3：自底向上DP

```java
// 方法3：自底向上DP
public int minPathSum(int[][] grid) &#123;
    if (grid == null || grid.length == 0) return 0;
    int m = grid.length;
    int n = grid[0].length;
    int[][] dp = new int[m][n];
    dp[0][0] = grid[0][0];
    //初始化第0列
    for (int i = 1; i &lt; m; i++) &#123;
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    &#125;
    //初始化第0行
    for (int j = 1; j &lt; n; j++) &#123;
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    &#125;

    for (int i = 1; i &lt; m; i++) &#123;
        for (int j = 1; j &lt; n; j++) &#123;
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        &#125;
    &#125;
    return dp[m - 1][n - 1];
&#125;
```

**152. 乘积最大子数组**

给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字）。

**方法1**：二维DP，第二维存储正和负的标记;DP[i][j]的意义是考察到第第i个元素时，选中i的情况下的最大乘积和最小乘积。

因为需要考虑到负负得正的情况，所以每个元素选中后的正负最大值都需要保存，又因为必须是连续的子数组，所以，如果i-1时的最大或最小值和当前值相乘都小于当前值，那最大值就取当前值即可，最小值同理。

所以写出递推公式：

DP[i][0] = max(DP[i - 1][0] * a[i], DP[i - 1][1] * a[i], a[i]);

DP[i][1] = min(DP[i - 1][0] * a[i], DP[i - 1][1] * a[i], a[i]);

最后求解的值是max(DP[0][0],...,DP[n - 1][0])

```java
//dp[i][j] j代表0,1 正的最大值和负的最小值;i表示当前值选中的情况下
//DP[i][0] = max(DP[i - 1][0] * a[i], DP[i - 1][1] * a[i], a[i]);
//DP[i][1] = min(DP[i - 1][0] * a[i], DP[i - 1][1] * a[i], a[i]); * nums[i], nums[i]&#125;
public int maxProduct(int[] nums) &#123;
    if (nums == null || nums.length == 0) return 0;
    int n = nums.length;
    if (n == 1) return nums[0];
    int[][] dp = new int[n][2];
    if (nums[0] > 0) dp[0][0] = nums[0];
    else if (nums[0] &lt; 0) dp[0][1] = nums[0];

    for (int i = 1; i &lt; n; i++) &#123;
        dp[i][0] = max(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]);
        dp[i][1] = min(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]);
    &#125;

    int max = dp[0][0];
    for (int i = 1; i &lt; n; i++) &#123;
        max = Math.max(dp[i][0], max);
    &#125;
    return max;
&#125;

private int min(int a, int b, int c) &#123;
    int min = a;
    if (b &lt; min) min = b;
    if (c &lt; min) min = c;
    return min;
&#125;

private int max(int a, int b, int c) &#123;
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    return max;
&#125;
```
**方法2**：常数级二维DP。

从方法1可以看出, 当前dp[i]的状态只和dp[i - 1]有关，并且我们最终需要的结果是在遍历dp[0][0]->dp[n - 1][0]中得到的，所以我们可以不用在第一维中开辟n个空间，只要开辟2个空间即可，只存储上一个i - 1和当前i,并且根据奇偶性不断滚动替换即可。


```java
public int maxProduct(int[] nums) &#123;
    if (nums == null || nums.length == 0) return 0;
    int n = nums.length;
    if (n == 1) return nums[0];
    // 状态压缩 只需要前一个值和当前值，至于最大值，我们在递推过程中不断覆盖即可。
    int[][] dp = new int[2][2];
    if (nums[0] > 0) dp[0][0] = nums[0];
    else if (nums[0] &lt; 0) dp[0][1] = nums[0];

    int res = dp[0][0];
    for (int i = 1; i &lt; n; i++) &#123;
        dp[i & 1][0] = max(dp[(i - 1) & 1][0] * nums[i], dp[(i - 1) & 1][1] * nums[i], nums[i]);
        dp[i & 1][1] = min(dp[(i - 1) & 1][0] * nums[i], dp[(i - 1) & 1][1] * nums[i], nums[i]);
        res = Math.max(res, dp[i & 1][0]);
    &#125;
    return res;
&#125;

private int min(int a, int b, int c) &#123;
    int min = a;
    if (b &lt; min) min = b;
    if (c &lt; min) min = c;
    return min;
&#125;

private int max(int a, int b, int c) &#123;
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    return max;
&#125;
```

**42. 接雨水**

按列遍历，每一列能存储的雨水量为它左边墙的最大值和右边墙的最大值的较小值减去当前列的高度。

方法1： 暴力法

```java
public int trap(int[] height) &#123;
    int n = height.length;
    if (n == 0) return 0;
    int res = 0;
    for (int i = 1; i &lt; n - 1; i++) &#123;
        int leftMax = 0, rightMax = 0;
        for (int j = 0; j &lt; i; j++) &#123;
            leftMax = Math.max(leftMax, height[j]);
        &#125;
        for (int j = i + 1; j &lt; n; j++) &#123;
            rightMax = Math.max(rightMax, height[j]);
        &#125;
        int min = Math.min(leftMax, rightMax);
        if (min > height[i]) res += (min - height[i]);
    &#125;
    return res;
&#125;
```

方法2：DP。可以看出，求每一列的左右两边最大值时进行了很多次重复计算，所以我们把到达每一列时左边最大值和右边最大值采用DP数组记忆化存储起来。

DP方程：

左边最大值dp[i][0] = max(dp[i - 1][0], height[i - 1]);

右边最大值dp[i][1] = max(dp[i + 1][1], height[i +１])

```java
public int trap(int[] height) &#123;
    int n = height.length;
    if (n == 0) return 0;
    int res = 0;
    // 代表当前列左边墙的最大值和右边墙的最大值
    int[][] dp = new int[n][2];
    // 不求左右两端点的值，因为考察到端点时肯定不积水
    for (int i = 1; i &lt; n - 1; i++) &#123;
        dp[i][0] = Math.max(dp[i - 1][0], height[i - 1]);
    &#125;
    for (int i = n - 2; i >= 1; i--) &#123;
        dp[i][1] = Math.max(dp[i + 1][1], height[i + 1]);
    &#125;

    for (int i = 1; i &lt; n; i++) &#123;
        int min = Math.min(dp[i][0], dp[i][1]);
        if (height[i] &lt; min) res += (min - height[i]);
    &#125;
    return res;
&#125;
```

方法3：双指针法，DP状态压缩。因为当前状态只和前一个状态有关，并且当前状态只使用一次就不再使用。所以我们使用两个指针，从左往右移动left,从右往左移动right;两个临时变量，存储当前指针左右两边的墙的最大值，哪个小就考察哪个指针的值。

```java
public int trap(int[] height) &#123;
    if (height == null || height.length == 0) return 0;
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int res = 0;
    while (left &lt;= right) &#123;
        if (leftMax &lt; rightMax) &#123;
            res += leftMax > height[left] ? leftMax - height[left] : 0;
            leftMax = Math.max(leftMax, height[left]);
            left++;
        &#125; else &#123;
            res += rightMax > height[right] ? rightMax - height[right] : 0;
            rightMax = Math.max(rightMax, height[right]);
            right--;
        &#125;
    &#125;
    return res;
&#125;
```

**887. 鸡蛋掉落**

N层楼，有K个鸡蛋，要找到存在这么一个数X，低于它的楼层扔鸡蛋不碎，找到这个数需要的最少的扔鸡蛋次数是多少？

方法1：暴力递归。

我们首先尝试在1到N层楼中间选择一个数i，然后从i层扔下鸡蛋，此时将整栋楼划分为两块，[1,i-1]和[i,N],得到在这两块楼中扔鸡蛋次数较大的一块，然后加上当前这次扔的情况；

然后我们统计i取[1,N]的最小值即可。

```java
public int superEggDrop(int K, int N) &#123;
    // 如果只有一个鸡蛋或只有1层或0层楼，返回N
    if (N &lt;= 1 || K == 1) return N;
    int min = N;
    for (int i = 1; i &lt;= N; i++) &#123;
        // 从第i层扔下，那么这次决策导致的最终最坏的情况是在0，i-1层的1号楼和i+1到N的2号楼的次数较大值+1
        int curMin = Math.max(superEggDrop(K - 1, i - 1), superEggDrop(K, N - i)) + 1;
        // 统计所有决策的最小值
        min = Math.min(min, curMin);
    &#125;
    return min;
&#125;
```

方法2：带备忘录的递归。

```java
public int superEggDrop(int K, int N) &#123;
    Integer[][] memo = new Integer[K + 1][N + 1];
    return recursion(K, N, memo);
&#125;

private int recursion(int K, int N, Integer[][] memo) &#123;
    if (memo[K][N] != null) return memo[K][N];
    if (N &lt;= 1 || K == 1) return memo[K][N] = N;

    memo[K][N] = N;
    for (int i = 1; i &lt;= N; i++) &#123;
        int curMin = Math.max(recursion(K, i - 1, memo), recursion(K - 1, N - i, memo)) + 1;
        memo[K][N] = Math.min(memo[K][N], curMin);
    &#125;
    return memo[K][N];
&#125;
```
方法3：使用DP数组（依然超时）

```java
public int superEggDrop(int K, int N) &#123;
    int[][] dp = new int[K+1][N+1];
    for (int i = 1; i &lt;= N; i++) &#123;
        dp[0][i] = 0;
        dp[1][i] = i;
    &#125;
    for (int i = 1; i &lt;= K; i++) &#123;
        dp[i][0] = 0;
    &#125;
    for (int k = 2; k &lt;= K; k++) &#123;
        for (int n = 1; n &lt;= N; n++) &#123;
            int min = N;
            for (int i = 1; i &lt;= n; i++) &#123;
                min = Math.min(min, Math.max(dp[k - 1][i - 1], dp[k][n - i]) + 1);
            &#125;
            dp[k][n] = min;
        &#125;
    &#125;
    return dp[K][N];
&#125;
```

**62. 不同路径**

一个机器人从[0,0]到[m-1,n-1]，总共有多少种走法。

方法1：暴力递归。

```java
public int uniquePaths(int m, int n) &#123;
    return rec(0, 0, m, n);
&#125;

private int rec(int i, int j, int m, int n) &#123;
    if (i == m - 1 && j == n - 1) return 1;
    if (!valid(i, j, m, n)) return 0;
    return rec(i + 1, j, m, n) + rec(i, j + 1, m, n);
&#125;

private boolean valid(int i, int j, int m, int n) &#123;
    return i &lt; m && j &lt; n;
&#125;
```


方法2：备忘录递归

```java
int[][] memo;
int m;
int n;
public int uniquePaths(int m, int n) &#123;
    this.m = m;
    this.n = n;
    memo = new int[m][n];
    return rec(0, 0);
&#125;

private int rec(int i, int j) &#123;
    if (!valid(i, j)) return 0;
    if (memo[i][j] != 0) return memo[i][j];
    if (i == m - 1 && j == n - 1) return memo[i][j] = 1;
    return memo[i][j] = rec(i + 1, j) + rec(i, j + 1);
&#125;

private boolean valid(int i, int j, int m, int n) &#123;
    return i &lt; m && j &lt; n;
&#125;
```

方法3：动态规划

```java
public int uniquePaths(int m, int n) &#123;
    int[][] opt = new int[m][n];
    for (int i = 0; i &lt; m; i++) &#123;
        opt[i][n - 1] = 1;
    &#125;
    for (int j = 0; j &lt; n; j++) &#123;
        opt[m - 1][j] = 1;
    &#125;
    for (int i = m - 2; i >= 0; i--) &#123;
        for (int j = n - 2; j >= 0; j--) &#123;
            opt[i][j] = opt[i + 1][j] + opt[i][j + 1];
        &#125;
    &#125;
    return opt[0][0];
&#125;
```

方法4：DP状态压缩。

由方法3可知，dp[i][j] = dp[i+1][j]+dp[i][j+1]，(i,j)这个点的状态等于前一行(下面)当前列的状态+当前行前一列(右边)的状态之和。

当前行的状态只和下面的一行以及同一行右边的状态有关，所以可以进行路径压缩，只用一维数组记录当前行每一列的状态。

opt[j] = opt[j]+opt[j+1]; 当前行的第j列的状态=前一行（下面）第j列的状态+当前行第j+1列的状态；

所以遍历时需要从下往上逐行，从右往左逐列遍历。

```java
public int uniquePaths(int m, int n) &#123;
    // 每一列对应的路径和
    int[] opt = new int[n];
    // 最后一列对应的路径和
    opt[n - 1] = 1;
    for (int i = m - 1; i >= 0; i--) &#123;
        for (int j = n - 2; j >= 0; j--) &#123;
            // 每一列对应的路径和等于前一行当前列的路径和+当前行前一列的路径和
            opt[j] = opt[j] + opt[j + 1];
        &#125;
    &#125;
    return opt[0];
&#125;
```

**63. 不同路径2**

和上面一题差不多，不过增加了障碍物，数组如果值是1就是障碍物，0就是正常。

方法1：带备忘录递归（超时）

```java
int[][] memo;
int m;
int n;
public int uniquePathsWithObstacles(int[][] obstacleGrid) &#123;
    int m = obstacleGrid.length;
    int n = obstacleGrid[0].length;
    this.m = m;
    this.n = n;
    memo = new int[m][n];
    return rec(0, 0, obstacleGrid);
&#125;

private int rec(int i, int j, int[][] obstacleGrid) &#123;
    if (!valid(i, j, obstacleGrid)) return 0;
    if (memo[i][j] != 0) return memo[i][j];
    if (i == m - 1 && j == n - 1) return memo[i][j] = 1;
    return memo[i][j] = rec(i + 1, j,obstacleGrid) + rec(i, j + 1,obstacleGrid);
&#125;

private boolean valid(int i, int j, int[][] obstacleGrid) &#123;
    return i &lt; m && j &lt; n && obstacleGrid[i][j] == 0;
&#125;
```

方法2：DP

```java
int m;
int n;
int[][] obstacleGrid;
public int uniquePathsWithObstacles(int[][] obstacleGrid) &#123;
    m = obstacleGrid.length;
    n = obstacleGrid[0].length;
    this.obstacleGrid = obstacleGrid;
    int[][] opt = new int[m][n];
    for (int i = m - 1; i >= 0; i--) &#123;
        if (obstacleGrid[i][n - 1] == 0) &#123;
            opt[i][n - 1] = i == m - 1 ? 1 : opt[i + 1][n - 1];
        &#125; else &#123;
            opt[i][n - 1] = 0;
        &#125;
    &#125;
    for (int j = n - 1; j >= 0; j--) &#123;
        if (obstacleGrid[m - 1][j] == 0) &#123;
            opt[m - 1][j] = j == n - 1 ? 1 : opt[m - 1][j + 1];
        &#125; else &#123;
            opt[m - 1][j] = 0;
        &#125;
    &#125;
    for (int i = m - 2; i >= 0; i--) &#123;
        for (int j = n - 2; j >= 0; j--) &#123;
            opt[i][j] = valid(i, j) ? opt[i + 1][j] + opt[i][j + 1] : 0;
        &#125;
    &#125;
    return opt[0][0];
&#125;
private boolean valid(int i, int j) &#123;
    return obstacleGrid[i][j] == 0;
&#125;

```
方法3：DP状态压缩

与上题相同，opt[j] = opt[j] + opt[j + 1]，但需要判断是否为障碍物的条件。

```java
public int uniquePathsWithObstacles(int[][] obstacleGrid) &#123;
    int m = obstacleGrid.length;
    int n = obstacleGrid[0].length;
    // 保存每一列的状态，逐行更新值
    int[] opt = new int[n];
    for (int i = m - 1; i >= 0; i--) &#123;
        for (int j = n - 1; j >= 0; j--) &#123;
            if (i == m - 1 && j == n - 2) &#123;
                // 初始化最后一行最右边列的值
                opt[j] = obstacleGrid[i][j] == 1 ? 0 : 1;
            &#125; else &#123;
                // 如果是最后一列，就等于前一行最后一列的值
                opt[j] = obstacleGrid[i][j] == 1 ? 0 : j == n - 1 ? opt[j] : opt[j] + opt[j + 1];
            &#125;
        &#125;
    &#125;
&#125;
```
