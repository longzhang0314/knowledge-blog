---
title: "hugo搭建"
description: "hugo搭建 的历史学习笔记。"
date: 2026-05-21
tags: ["博客搭建", "Hugo"]
keywords: ["博客搭建", "Hugo", "hugo搭建"]
legacy_source: "博客/hugo/hugo搭建.md"
---
## hugo搭建

#### 1.安装&lt;br>
- 需要提前安装git，并拥有一个github账号。
- widows需要在[https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases)处下载hugo运行需要的二级制码**hugo_0.57.2_Windows-64bit.zip**，并解压配置系统变量。&lt;br>
在命令行使用如下命令确认是否安装正确：

```
hugo version
```
- 打印如下内容表示安装成功：
```
Hugo Static Site Generator v0.57.2-A849CB2D windows/amd64 BuildDate: 2019-08-17T17:54:13Z
```

#### 2. 生成站点
切换至想要创建的目录，运行：
```
hugo new site myblog
```
打印如下内容表示生成站点成功：

```
Congratulations! Your new Hugo site is created
```
#### 3. 下载主题

```
cd myblog
git clone https://github.com/vaga/hugo-theme-m10c.git themes/m10c
```
打印如下内容表示主题下载成功：

```
Cloning into 'themes/m10c'...
remote: Enumerating objects: 18, done.
remote: Counting objects: 100% (18/18), done.
remote: Compressing objects: 100% (17/17), done.
remote: Total 265 (delta 4), reused 11 (delta 1), pack-reused 247
Receiving objects:  65% (173/265), 420.01 KiB | 136.00 KiB/s
Receiving objects: 100% (265/265), 447.54 KiB | 140.00 KiB/s, done.
Resolving deltas: 100% (82/82), done.
```
#### 4. 创建文章
在命令行输入：
```
hugo new post/blog.md
```
会显示：
```
myblog\content\post\myblog.md created
```
创建的文章会自动生成到content目录下，你可以去对应的目录找到刚刚创建的文章，使用markdown编辑器编辑你的博客。
#### 5. 本地启动

```
hugo server -t m10c --buildDrafts
```
打印如下内容表示本地启动成功：

```
Building sites …
                   | EN
+------------------+----+
  Pages            |  7
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  1
  Processed images |  0
  Aliases          |  3
  Sitemaps         |  1
  Cleaned          |  0

Total in 77 ms
Watching for changes in D:\qwwww\mmmqqq\&#123;archetypes,content,data,layouts,static,themes&#125;
Watching for config changes in D:\qwwww\mmmqqq\config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

启动后安装提示访问[http://localhost:1313/](http://localhost:1313/)，就可以成功看到你的博客网站啦~
#### 6. 部署到github 
首先在你的github上创建一个新的仓库，这里命名很重要，否则会导致后续无法访问等问题，Repositor的名称要用**你的github名.github.io**，比如我的是**longzhang0314.github.io**否则会导致后续无法正常访问。&lt;br>&lt;br>
回到本地命令行，返回站点目录，输入如下命令，目的是生成最终页面：
```
hugo --theme=m10c --baseUrl="https://longzhang0314.github.io" --buildDrafts
```
显示如下：
```
Building sites …
                   | EN
+------------------+----+
  Pages            | 10
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  1
  Processed images |  0
  Aliases          |  4
  Sitemaps         |  1
  Cleaned          |  0

Total in 63 ms
```
此时，在站点目录下会生成一个public文件夹，这个文件夹中的内容就是我们的博客展示的静态资源了，我们只需要把这个文件夹中的内容push到master分支即可，命令如下：

```
cd public
git init
git remote add origin https://github.com/longzhang0314/longzhang0314.github.io.git
git add .
git commit -m "我的 hugo 博客第一次提交"
git push -u origin master
```
命令行中最终显示：

```
Enumerating objects: 32, done.
Counting objects: 100% (32/32), done.
Delta compression using up to 8 threads
Compressing objects: 100% (23/23), done.
Writing objects: 100% (32/32), 7.49 KiB | 1.07 MiB/s, done.
Total 32 (delta 11), reused 0 (delta 0)
remote: Resolving deltas: 100% (11/11), done.
To https://github.com/longzhang0314/longzhang0314.github.io.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```
这就表示一切顺利了~&lt;br>
浏览器中访问[https://longzhang0314.github.io](https://longzhang0314.github.io)就可以看到你的博客啦~
#### 注：
之后更换主题等操作以后可能会需要的指令：

```
//把两段不相干的分支进行强行合并
git pull origin master --allow-unrelated-histories
```
