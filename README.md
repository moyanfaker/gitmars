<div style="text-align: center;" align="center">

## ![logo.png](https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/logo.png)

</div>

<div style="text-align: center;" align="center">

这是一个 git 工作流工具

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Gitmars 使用文档](http://www.saqqdy.com/gitmars/api/)**&nbsp; &nbsp; &nbsp; &nbsp;[更新日志](http://www.saqqdy.com/gitmars/changelog.html)

</div>

## 特性

-   简单易懂的 api 设计
-   封装了大量更易使用的 git 方法
-   封装了大量 shell 相关方法

## 使用

> 开始： [快速上手](http://www.saqqdy.com/gitmars/guide/getting-start.html)</br>
> gitmars 配置参数：[参数说明](http://www.saqqdy.com/gitmars/guide/basic-config.html)

```shell
# 初始化
gitm init

# 查看配置
gitm config list [option]

# 版本升级[-m --mirror]使用淘宝镜像升级
Mac用户：sudo gitm upgrade -m -c npm
Windows用户使用PowerShell或CMD：gitm upgrade latest -m -c npm.cmd

# 查看版本
gitm -v

# 查看帮助信息
gitm --help
gitm copy --help
```

## 安装

```shell
# 通过npm安装
npm install -g gitmars

# 或者通过yarn安装
yarn global add gitmars
```

## 工作流展示

### 1. 双主干分支发版模式

![gitmars-branch.png](https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/gitmars-branch.png)

### 2. 单主干分支发版模式

![gitmars-branch.png](https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/gitmars-branch2.png)

## 有哪些功能

-   初始化 gitmars 配置 [gitm init](http://www.saqqdy.com/gitmars/api/#gitm-init)
-   查看/设置 gitmars 的配置项 [gitm config](http://www.saqqdy.com/gitmars/api/#gitm-config)
-   分支阶段提测 [gitm combine](http://www.saqqdy.com/gitmars/api/#gitm-combine)
-   创建 bugfix 分支、创建/合并 release 分支 [gitm start](http://www.saqqdy.com/gitmars/api/#gitm-start)
-   完成开发某项功能 [gitm end](http://www.saqqdy.com/gitmars/api/#gitm-end)
-   更新 bug 任务分支、更新 feature 功能开发分支 [gitm update](http://www.saqqdy.com/gitmars/api/#gitm-update)
-   分支操作 [gitm branch](http://www.saqqdy.com/gitmars/api/#gitm-branch)
-   暂存当前分支文件 [gitm save](http://www.saqqdy.com/gitmars/api/#gitm-save)
-   恢复暂存区最近一次暂存的文件 [gitm get](http://www.saqqdy.com/gitmars/api/#gitm-get)
-   git 操作建议 [gitm suggest](http://www.saqqdy.com/gitmars/api/#gitm-suggest)
-   处理远程合并请求 [gitm approve](http://www.saqqdy.com/gitmars/api/#gitm-approve)
-   远程 review 代码 [gitm review](http://www.saqqdy.com/gitmars/api/#gitm-review)
-   清理合并过的功能分支 [gitm cleanbranch](http://www.saqqdy.com/gitmars/api/#gitm-cleanbranch)
-   简化 git 的 cherry-pick 操作 [gitm copy](http://www.saqqdy.com/gitmars/api/#gitm-copy)
-   合并代码 [gitm merge](http://www.saqqdy.com/gitmars/api/#gitm-merge)
-   继续未完成的操作 [gitm continue](http://www.saqqdy.com/gitmars/api/#gitm-continue)
-   撤销提交 [gitm revert](http://www.saqqdy.com/gitmars/api/#gitm-revert)
-   撤回某次提交记录或者撤回谋条分支的合并记录 [gitm undo](http://www.saqqdy.com/gitmars/api/#gitm-undo)
-   重做某次提交记录或者重做谋条分支的合并记录 [gitm redo](http://www.saqqdy.com/gitmars/api/#gitm-redo)
-   查看当前分支状态 [gitm status](http://www.saqqdy.com/gitmars/api/#gitm-status)
-   升级 gitmars [gitm upgrade](http://www.saqqdy.com/gitmars/api/#gitm-upgrade)
-   构建 Jenkins [gitm build](http://www.saqqdy.com/gitmars/api/#gitm-build)
-   解除软链接 [gitm unlink](http://www.saqqdy.com/gitmars/api/#gitm-unlink)
-   软链接 [gitm link](http://www.saqqdy.com/gitmars/api/#gitm-link)
-   清除缓存 [gitm clean](http://www.saqqdy.com/gitmars/api/#gitm-clean)
-   推送消息 [gitm postmsg](http://www.saqqdy.com/gitmars/api/#gitm-postmsg)
-   提交权限 [gitm permission](http://www.saqqdy.com/gitmars/api/#gitm-permission)
-   git 钩子指令 [gitm hook](http://www.saqqdy.com/gitmars/api/#gitm-hook)
-   git 钩子运行指令 [gitm run](http://www.saqqdy.com/gitmars/api/#gitm-run)
-   查询日志 [gitm log](http://www.saqqdy.com/gitmars/api/#gitm-log)
-   智能猜测你要执行的动作 [gitm go](http://www.saqqdy.com/gitmars/api/#gitm-go)
-   安装和移除快捷方式 [gitm alias](http://www.saqqdy.com/gitmars/api/#gitm-alias)
-   UI 可视化操作 [gitm ui](http://www.saqqdy.com/gitmars/api/#gitm-ui)
-   管理员创建主干分支 [gitm admin create](http://www.saqqdy.com/gitmars/api/#gitm-admin-create)
-   发布分支 [gitm admin publish](http://www.saqqdy.com/gitmars/api/#gitm-admin-publish)
-   更新主干分支代码 [gitm admin update](http://www.saqqdy.com/gitmars/api/#gitm-admin-update)
-   清理分支 [gitm admin clean](http://www.saqqdy.com/gitmars/api/#gitm-admin-clean)
-   查看版本号 [gitm version](http://www.saqqdy.com/gitmars/api/#gitm-version)

## 智能导航

### gitm go

智能导航指令，只记一条指令就能完成所有功能使用

-   使用：`gitm go`
-   参数：

| 参数    | 说明     | 类型   | 可选值                                                                                                                                                                                                                      | 必填 | 默认 |
| ------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| command | 指令名称 | String | combine、end、update、build、start、undo、redo、suggest、approve、review、admin.publish、admin.update、admin.create、admin.clean、admin.approve、branch、copy、get、save、cleanbranch、clean、revert、link、unlink、postmsg | 否   | -    |

-   示例：

```shell
gitm go build
```

-   演示：

![gitmars-go.gif](https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/gitmars-go.gif)

## UI 界面

> 3.0.0 版本开始，UI 界面从原 gitmars 项目中抽离成了独立项目`@gitmars/ui`

### gitm ui

如果你厌倦了敲指令，gitmars 提供了懒人 UI 界面

-   安装：`gitm install @gitmars/ui`
-   使用：`gitm ui [-p --port [port]]`
-   传值：

| 名称   | 简写 | 说明       | 类型   | 可选值 | 传值必填 | 默认 |
| ------ | ---- | ---------- | ------ | ------ | -------- | ---- |
| --port | -p   | 启动端口号 | Number | -      | 否       | 3000 |

-   示例：

```shell
gitm ui --port 3000
```

-   演示：

![gitmars-ui.gif](https://raw.githubusercontent.com/saqqdy/gitmars/master/static/img/gitmars-ui.gif)

[npm-image]: https://img.shields.io/npm/v/gitmars.svg?style=flat-square
[npm-url]: https://npmjs.com/package/gitmars
[travis-image]: https://travis-ci.com/saqqdy/gitmars.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/gitmars
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/gitmars.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/gitmars?branch=master
[download-image]: https://img.shields.io/npm/dm/gitmars.svg?style=flat-square
[download-url]: https://npmjs.com/package/gitmars
[license-image]: https://img.shields.io/badge/License-GPL-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_gitmars
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_gitmars
