# Wiki 欢迎页（旧版）

:::warning

**本文档已弃用，且不再更新。**

仅为保留历史资料，请勿依据本文信息操作。

:::

![Betaflight](/img/bf_logo.png)

**首次使用 Betaflight？请从[固件安装](/docs/wiki/getting-started/Firmware-Installation)开始。**

此旧版 Wiki 曾提供其他语言版本：[简体中文](https://pitronic.gitbook.io/betaflight/)。

## 事件

| 日期               | 事件                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| 2021 年 11 月 9 日 | Betaflight 4.2 的最新[发布版本](https://github.com/betaflight/betaflight/releases/latest) |

## 新闻

获取最新动态请访问：https://betaflight.com/。

## 周边商品

**限时提供：** [Betaflight T 恤和连帽衫](Betaflight-Merchandise)。

## Wiki 使用提示

- 搜索 Wiki：在浏览器地址栏输入

  ```text
  site:github-wiki-see.page/m/betaflight/betaflight/wiki PT1
  ```

  可通过第三方服务搜索 Wiki 中的 `PT1`，因为 [GitHub 不允许原生索引 Wiki 页面](https://github.com/github/feedback/discussions/4992)。也可使用：

  ```text
  site:github.com/betaflight/betaflight PT1
  ```

  该查询范围更广。

- 默认设置和 CLI 命令可能随版本变化。发布说明会尽量列出变更，但不一定完整。建议每次刷写后、开始配置前执行一次 CLI `dump`，复制到以版本号命名的文本文件；下次升级后重复操作，再用文本编辑器的差异比较功能核对。Notepad++ 即提供较好的比较功能。

- 若本 Wiki 未包含所需信息，可查看 [docs](https://github.com/betaflight/betaflight/tree/master/docs) 目录。请注意，该目录包含部分 Cleanflight 文档。

- NAZE32 手册包含基础配置与刷写的替代方法：http://www.abusemark.com/downloads/naze32_rev2.pdf

## 简介

Betaflight 是开源软件，免费提供给所有用户，不附带任何担保。

Betaflight 由 BorisB 从 Cleanflight 分叉而来。它最初作为 Cleanflight 的 beta 测试平台，持续推动性能边界，随后发展为由多位开发者维护的成熟、稳定固件。约在 2017 年 1 月，根据 Google Trends 分析，它似乎是最受欢迎的开源多旋翼飞控固件。

“Beta”一名源自其最初目标：持续尝试新方案并快速发布测试版本。项目从 beta 演变为稳定版本时，因品牌已有广泛认知且积累了大量文档，仍沿用这一名称。

Boris B（[首席开发者](http://www.youtube.com/user/bozic1982/featured)）表示：“该项目也通过参与 iNav 等其他开源项目作出贡献。”

Betaflight 使用情况的交互式统计：

[![Betaflight 统计数据](/img/betaflight_statistics.jpg)](https://datastudio.google.com/s/kfHdPaVFYUU)

## 工具

Betaflight 持续适配当时主流的 Cleanflight 工具，例如 Configurator、EzGui 设备和其他 MSP 工具。无需专用工具才能使用 Betaflight。

## 固件发布

发布版本见：https://github.com/betaflight/betaflight/releases，也可通过 Configurator 下载。有关各版本的发布说明和详细信息，请查看升级列表。

_Beta 测试（警告）_

_如希望参与开发，可从以下位置下载并测试最新夜间构建：_ https://ci.betaflight.tech/job/Betaflight/lastBuild/artifact/obj/

## 拉取请求

无论提交缺陷修复还是改进，都可在 GitHub 创建[拉取请求](https://github.com/betaflight/betaflight/pulls)，即 PR。PR 会在合并前经过仔细审查和测试。测试 PR 并提交反馈，是参与开发的重要方式。

每个拉取请求均提供预构建 HEX 文件用于测试。Betaflight 下载包含四个主要统一 target 的 HEX 文件；Configurator 和 Blackbox 下载提供 Windows、macOS 与 Linux 应用。

- 滚动至 PR 页面底部。
- 在 `All checks have passed` 一行右侧点击 `Show all checks`。
- 在 `Release Release` 行右侧点击 `Details`。
- 在 `Release Release succeeded` 下点击 `0 errors / 0 warnings`。
- 在 **Stages / Build** 部分底部点击 `artifact`。Betaflight PR 点击 `1 artefact`，Configurator PR 点击 `4 artefacts`。
- 新窗口打开后，将鼠标悬停在下载行，右侧会显示三点菜单；选择 `Download artefacts`。

这将下载一个包含该 PR HEX 文件的 ZIP 包。

发布计划见：

https://github.com/betaflight/betaflight/milestones

## 配置工具

配置 Betaflight 时，应使用最新稳定版 Betaflight Configurator（Windows/macOS/Linux）：

https://github.com/betaflight/betaflight-configurator/releases

_Beta 测试_

_如希望参与开发，可从以下位置下载最新 beta 构建：_
https://github.com/betaflight/betaflight-configurator-nightlies/releases

我们欢迎测试 beta 代码和拉取请求。创建 GitHub 账号后即可提交反馈。

## Blackbox 查看器

查看器发布版本：

https://github.com/betaflight/blackbox-log-viewer/releases

最新查看器源码：

https://github.com/betaflight/blackbox-log-viewer

有关使用 Blackbox 记录器的信息，参见 [Blackbox 日志记录与使用](/docs/wiki/guides/current/Black-Box-logging-and-usage)。

## Betaflight 徽标

徽标链接。注意：早期徽标中的蜜蜂/黄蜂与最终采用的图案不同：

https://www.rcgroups.com/forums/showpost.php?p=34909081&postcount=29679

skaman82 设计的原始版本：

https://www.dropbox.com/s/viczizbjz0fwod4/Betaflight.Logos.zip?dl=0

本页顶部也有 Betaflight 使用的徽标；可右键另存图像，并按需要裁掉文字。

## 可在相同硬件上运行、且源码相关的其他固件

Cleanflight 官方文档：http://github.com/cleanflight/cleanflight/wiki

INAV 项目专注于 GPS、定高与自主飞行：

http://inavflight.com

## 提交反馈并参与项目

在 RC Groups 论坛参与讨论：

http://www.rcgroups.com/forums/showthread.php?t=2464844

可通过 PayPal 向 Betaflight 团队提供资金支持：

[![捐赠](https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif)](https://paypal.me/betaflight)
