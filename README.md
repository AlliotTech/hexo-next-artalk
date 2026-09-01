# Artalk for Hexo NexT

> [中文](https://github.com/AlliotTech/hexo-next-artalk/blob/main/README-CN.md)

[![NPM version](https://img.shields.io/npm/v/hexo-next-artalk?color=red&logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-next-artalk)
[![NPM downloads](https://img.shields.io/npm/dm/hexo-next-artalk?color=red&logo=npm&style=flat-square)](https://www.npmjs.com/package/hexo-next-artalk)
[![Theme Version](https://img.shields.io/badge/NexT-v7.3.0+-blue?style=flat-square)](https://github.com/next-theme/hexo-theme-next)
[![Artalk Version](https://img.shields.io/badge/Artalk-v2.3.1+-558fb5?style=flat-square)](https://github.com/ArtalkJS/Artalk)

This is an [Artalk](https://artalk.js.org) comment plugin for Hexo NexT.

## Install

```bash
npm install hexo-next-artalk
```

## Configure

Add the following configurations in Hexo's root config file `_config.yml`, set `enable` to `true`, and edit other configurations in `artalk` section as your own values.

```yaml
# Artalk Config File
## For more information: https://artalk.js.org

artalk:
  enable: false

  # Backend server API, you should set this to your own server API
  server: https://artalk.example.com

  # Site name, you can set this to specify site for server
  # or leave blank to use default site
  site:

  # Frontend resources CDN, you can set this to your preferred CDN
  ## Reference: https://artalk.js.org/guide/frontend/install.html
  jsUrl: https://artalk.example.com/dist/Artalk.js
  cssUrl: https://artalk.example.com/dist/Artalk.css

  # Page views count
  pvCount: true

  # Comments count
  commentCount: true

  # Page voting buttons above the comment area
  ## Requires Artalk v2.10.0 or later, older frontends silently ignore it
  pageVote: false

  # Dark mode
  ## true | false | auto (follows prefers-color-scheme)
  darkMode: auto

  # Remote (backend) configuration priority, Artalk v2.10.0+
  ## false: local config below overrides the backend dashboard config
  ## true: backend dashboard config wins
  ## Reference: https://artalk.js.org/guide/backend/fe-control.html
  preferRemoteConf: false

  # Optional Artalk frontend options, all commented out on purpose:
  # every option set here overrides the backend dashboard config
  # unless preferRemoteConf is true. Uncomment only what you want to pin.
  ## Reference: https://artalk.js.org/guide/frontend/config.html
  # placeholder: Type something...
  # sendBtn: Post Comment
  # noComment: "「Silence is golden」"
  # locale: auto
  # preview: true
  # vote: true
  # voteDown: false
  # listSort: true
  # imgUpload: true
  # imgLazyLoad: false  # false | native | data-src, `true` is invalid
  # flatMode: auto
  # nestMax: 2  # <= 1 forces flatMode to true
  # nestSort: DATE_ASC
  # pagination:
  #   pageSize: 20
  #   readMore: true
  #   autoLoad: true
```

## Tips

The default text of comments count in post meta is "Artalk". If you would like to change it, for example, to simplified Chinese "评论数":

1. Create a file `/source/_data/languages.yml` in your Hexo blog folder;
2. Edit this file as follows and then save it.

```yaml
zh-CN:
  post:
    comments:
      artalk: 评论数
```

The page vote buttons use the labels `post.vote.up` / `post.vote.down`, falling back to "Like" / "Dislike". Override them the same way:

```yaml
zh-CN:
  post:
    vote:
      up: 赞
      down: 踩
```
