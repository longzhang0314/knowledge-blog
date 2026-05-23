---
title: "Trie树"
description: "Trie树 的历史学习笔记。"
date: 2026-05-21
tags: ["算法", "数据结构"]
keywords: ["算法", "数据结构", "Trie树"]
legacy_source: "基础/数据结构与算法/刷题总结/Trie树.md"
---
#### Trie树

**208. 实现 Trie (前缀树)**

实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

题意：只需要考虑小写字母即可，search是全部匹配，startsWith只匹配到前缀即可。

```java
class Trie &#123;

    private class TrieNode &#123;
        private char data;
        //这个数组存储它的子节点字符对应的地址
        private TrieNode[] children = new TrieNode[26];
        private boolean isEnd = false;
        TrieNode(char data) &#123;
            this.data = data;
        &#125;
    &#125;

    private TrieNode root = new TrieNode('/');
    
    /** Initialize your data structure here. */
    public Trie() &#123;

    &#125;
    
    /** Inserts a word into the trie. */
    public void insert(String word) &#123;
        TrieNode p = root;
        for (int i = 0; i &lt; word.length(); i++) &#123;
            int index = word.charAt(i) - 'a';
            if (p.children[index] == null) &#123;
                TrieNode newNode = new TrieNode(word.charAt(i));
                p.children[index] = newNode;
            &#125;
            p = p.children[index];
        &#125;
        p.isEnd = true;
    &#125;
    
    /** Returns if the word is in the trie. */
    public boolean search(String word) &#123;
        TrieNode p = root;
        for (int i = 0; i &lt; word.length(); i++) &#123;
            int index = word.charAt(i) - 'a';
            if (p.children[index] == null) return false;
            p = p.children[index];
        &#125;
        return p.isEnd;
    &#125;
    
    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) &#123;
        TrieNode p = root;
        for (int i = 0; i &lt; prefix.length(); i++) &#123;
            int index = prefix.charAt(i) - 'a';
            if (p.children[index] == null) return false;
            p = p.children[index];
        &#125;
        return true;
    &#125;
&#125;
```

**820. 单词的压缩编码**

["time", "me", "bell"]是待编码列表，"time#bell#"是编码结果，indexes = [0, 2, 5]对应的是三个单词在编码结果中的起始位置。返回编码结果的长度。

如果一个字符串是另一个字符串的后缀子串，那么这个较短的字符串我们可以不考虑。

方法1：我们把字符串数组中的每个字符串反转，然后对数组排序，这样就会得到一个公共前缀子串在一块，并且逐渐增大的字符串数组，我们只对最长的计算长度即可。

```java
//方法1：每个字符串反转后存入新的字符串数组，然后按照字典排序，丢弃掉字符串本身是其他字符串前缀的，其他的字符串长度叠加
public int minimumLengthEncoding(String[] words) &#123;
    int n = words.length;
    String[] reverseWords = new String[n];
    for (int i = 0; i &lt; n; i++) &#123;
        reverseWords[i] = new StringBuilder(words[i]).reverse().toString();
    &#125;
    //字典序排序
    Arrays.sort(reverseWords);
    int res = 0;
    for (int i = 0; i &lt; n; i++) &#123;
        //当前元素和下一个元素比较
        if (i &lt; n - 1 && reverseWords[i + 1].startsWith(reverseWords[i])) &#123;
            continue;
        &#125; else &#123;
            res += reverseWords[i].length() + 1;
        &#125;
    &#125;
    return res;
&#125;
```

方法2：沿用方法1的思想，但是考虑到是否可以省掉额外的反转数组的空间；我们对原数组中的字符串从最后一个元素开始比较排序，最后统计时统计endsWith即可。

```java
//方法2：方法1基础上不依赖临时数组存储反转字符串，直接逆字典序排序，保持字符串正序
public int minimumLengthEncoding(String[] words) &#123;
    Arrays.sort(words, (i1, i2) -> &#123;
        int n1 = i1.length();
        int n2 = i2.length();
        int n = Math.min(n1, n2);
        for (int i = 0; i &lt; n; i++) &#123;
            int c = Character.compare(i1.charAt(n1 - i - 1), i2.charAt(n2- i - 1));
            if (c != 0) return c;
        &#125;
        //如果大串包含小串，返回长度排序，小串在前
    return Integer.compare(n1, n2);
    &#125;);

    int res = 0;
    for (int i = 0; i &lt; words.length; i++) &#123;
        if (i &lt; words.length - 1 && words[i + 1].endsWith(words[i])) &#123;
            continue;
        &#125; else &#123;
            res += words[i].length() + 1;
        &#125;
    &#125;
    return res;
&#125;
```

上面两种方法一个用反转后前缀匹配，一个用后缀匹配，但都先做了排序，时间复杂度是O(NlogN)的，想办法再继续优化。

方法3：对于字符串前缀和后缀匹配的题目，应该想到Trie树这种数据结构，我们把字符串按从长到短的顺序插入Trie树中，如果插入的字符串是已有字符串的子串，就返回false，对返回true的长度进行叠加即可。

```java
class Solution &#123;
    //方法3：使用Trie树实现
    public int minimumLengthEncoding(String[] words) &#123;
        //先对单词根据长度排序
        Arrays.sort(words, (i1, i2) -> i2.length() - i1.length());
        Trie trie = new Trie();
        int res = 0;
        for (String word : words) &#123;
            char[] text = word.toCharArray();
            res += trie.insert(text) + 1;
        &#125;
        return res;
    &#125;
&#125;

class Trie &#123;
    private class TrieNode &#123;
        private char data;
        private TrieNode[] children = new TrieNode[26];
        // private boolead isEnd = false;
        TrieNode(char data) &#123;
            this.data = data;
        &#125;
    &#125;
    private TrieNode root;
    public Trie()&#123;
        root = new TrieNode('/');
    &#125;
    

    //插入方法返回int类型，如果插入了新词就返回新词长度，如果插入的是旧词的前缀就返回-1
    public int insert(char[] text) &#123;
        TrieNode p = root;
        boolean isNew = false;
        //倒着进行插入，方便对相同前后缀的进行去重处理
        for (int i = text.length - 1; i >= 0; i--) &#123;
            int index = text[i] - 'a';
            if (p.children[index] == null) &#123;
                isNew = true;
                TrieNode newNode = new TrieNode(text[i]);
                p.children[index] = newNode;
            &#125;
            p = p.children[index];
        &#125;
        return isNew ? text.length : -1;
    &#125;
&#125;
```
