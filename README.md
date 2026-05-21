# Java 后端个人知识博客

这是一个面向 Java 后端学习、面试复盘、线上问题排查和架构设计沉淀的 Docusaurus 静态站点。

## 本地启动

```bash
npm install
npm run start
```

## 新增知识库文章

```bash
npm run write:doc -- mysql "MySQL 索引失效排查" mysql-index-debug
```

文章会生成到 `docs/mysql/`，然后把生成的 Markdown 加入 `sidebars.js` 中对应分类即可。

## 新增博客文章

```bash
npm run write:post -- "阶段复盘：Redis 缓存一致性" redis-cache-consistency
```

文章会生成到 `blog/`，Docusaurus 会自动识别。

## 发布到 GitHub Pages

```bash
git add .
git commit -m "init java backend knowledge blog"
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。

如果仓库名不是 `java-backend-knowledge-blog`，构建脚本会根据 `GITHUB_REPOSITORY` 自动计算 `baseUrl`。
