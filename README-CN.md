# 用于 Hexo NexT 的 Artalk 插件

> [English](https://github.com/AlliotTech/hexo-next-artalk/blob/main/README.md)

[![NPM version](https://img.shields.io/npm/v/hexo-next-artalk?color=red&logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-next-artalk)
[![NPM downloads](https://img.shields.io/npm/dm/hexo-next-artalk?color=red&logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-next-artalk)
[![Theme Version](https://img.shields.io/badge/NexT-v7.3.0+-blue?style=flat-square)](https://github.com/next-theme/hexo-theme-next)
[![Artalk Version](https://img.shields.io/badge/Artalk-v2.3.1+-558fb5?style=flat-square)](https://github.com/ArtalkJS/Artalk)

这是一款适用于 Hexo NexT 的 [Artalk](https://artalk.js.org) 评论插件。

## 安装

```bash
npm install hexo-next-artalk
```

## 配置

将下列配置添加到 Hexo 的根配置文件 `_config.yml` 之中，把 `enable` 设为 `true`，然后将 `artalk` 下的其他配置项修改为您自己的值。

```yaml
# Artalk 配置文件
# 更多信息: https://artalk.js.org

artalk:
  enable: false

  # 后端程序 API 地址，请修改为您自己的 API 地址
  server: https://artalk.example.com

  # 网站名称，请指定后段程序中的一个网站，留空即默认站点
  site:

  # 前端资源 CDN 地址，您可以修改为偏好的其他 CDN 镜像
  ## 参考：https://artalk.js.org/guide/frontend/install.html
  jsUrl: https://artalk.example.com/dist/Artalk.js
  cssUrl: https://artalk.example.com/dist/Artalk.css

  # 文章阅读数统计
  pvCount: true

  # 评论数统计
  commentCount: true

  # 评论区上方的页面投票按钮
  ## 需要 Artalk v2.10.0 及以上版本，旧版前端会静默忽略此项
  pageVote: false

  # 黑暗模式
  ## true | false | auto（跟随 prefers-color-scheme）
  darkMode: auto

  # 后端配置的优先级，需要 Artalk v2.10.0 及以上版本
  ## false：下方的本地配置覆盖后端管理面板的配置
  ## true：后端管理面板的配置优先
  ## 参考：https://artalk.js.org/guide/backend/fe-control.html
  preferRemoteConf: false

  # 可选的 Artalk 前端配置项，默认全部注释：
  # 除 preferRemoteConf 为 true 时，此处填写的每一项都会覆盖
  # 后端管理面板中的同名配置。只取消注释您确实要固定的项。
  ## 参考：https://artalk.js.org/guide/frontend/config.html
  # placeholder: Type something...
  # sendBtn: Post Comment
  # noComment: "「Silence is golden」"
  # locale: auto
  # preview: true
  # vote: true
  # voteDown: false
  # listSort: true
  # imgUpload: true
  # imgLazyLoad: false  # 可选 false | native | data-src，`true` 非法
  # flatMode: auto
  # nestMax: 2  # 小于等于 1 时会强制 flatMode 为 true
  # nestSort: DATE_ASC
  # pagination:
  #   pageSize: 20
  #   readMore: true
  #   autoLoad: true
```

## 贴士

在文章信息栏中，评论数的默认显示文字是“Artalk”。如果您希望修改此处，例如，改为简体中文的“评论数”：

1. 在 Hexo 博客文件夹下创建文件 `/source/_data/languages.yml`；
2. 编辑该文件如下并保存。

```yaml
zh-CN:
  post:
    comments:
      artalk: 评论数
```

页面投票按钮的文字取自 `post.vote.up` / `post.vote.down`，缺省回退为 “Like” / “Dislike”。同样可以这样覆盖：

```yaml
zh-CN:
  post:
    vote:
      up: 赞
      down: 踩
```
