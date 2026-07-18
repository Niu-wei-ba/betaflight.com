---
sidebar_position: 8
sidebar_label: 3.5 发行说明
---

# 3.5 发行说明

**还有一件事能让飞行表现更进一步。**

在准备发布 Betaflight 3.4.0 时，团队意识到这一点，并由此开发出“前馈 PID 控制器”。当时已来不及加入 3.4.0，且算法仍需继续打磨，因此决定发布专注于飞行性能改进的 Betaflight 3.5.0。该版本引入前馈 PID，显著改进动态陷波滤波器，并优化 Anti-gravity；飞行时可直接感受到这些改进。

要充分利用飞行性能改进，请阅读[调参提示](/docs/wiki/tuning/3-5-tuning-notes)。

从早期 Betaflight 版本升级时，请阅读下方配置变更清单。

我们已尽力消除缺陷。若仍发现 **bug**，请在[此处](https://github.com/betaflight/betaflight/issues)提交 **issue**。

也可加入 [Facebook Group](https://www.facebook.com/groups/betaflightgroup/) 讨论 Betaflight、配置问题或与其他飞手交流。

祝飞行愉快！

## 升级的重要信息

- 本版本的若干变化需要配合 Betaflight App。相关支持已加入 [Betaflight Configurator 10.4.0](https://github.com/betaflight/betaflight-configurator/releases/tag/10.4.0)，请至少升级至该版本；[安装说明](https://github.com/betaflight/betaflight-configurator#installation)。
- 使用 Blackbox Log Viewer 时，请同时升级至 [3.2.0](https://github.com/betaflight/blackbox-log-viewer/releases/tag/3.2.0) 或更新版本；[安装说明](https://github.com/betaflight/blackbox-log-viewer#installation)。
- 新的 Feed Forward PID 算法取代 setpoint weight（[#6355](https://github.com/betaflight/betaflight/pull/6355)）。动态陷波滤波器（[#6411](https://github.com/betaflight/betaflight/pull/6411)）和 Anti-gravity（[#6220](https://github.com/betaflight/betaflight/pull/6220)）也经过优化。默认值应适合多数配置；建议先从默认值开始测试，必要时再逐项引入旧版本的调参结果。更深入的调参说明见[此处](/docs/wiki/tuning/3-5-tuning-notes)。
- 飞控核心缺陷修复导致固件体积增加，部分 F3 飞控的 Flash 空间不足。因此，一些功能必须从部分 F3 飞控中移除。受影响 target 包括：`CRAZYBEEF3FR`、`CRAZYBEEF3FS`、`FRSKYF3`、`FURYF3`、`FURYF3OSD`、`OMNIBUS`、`SPRACINGF3`、`SPRACINGF3EVO`、`SPRACINGF3MINI`、`SPRACINGF3NEO`（[#6497](https://github.com/betaflight/betaflight/pull/6497)、[#6501](https://github.com/betaflight/betaflight/pull/6501)）。

## 主要功能

- 为 PID 控制器添加前馈支持（[#6355](https://github.com/betaflight/betaflight/pull/6355)）。
- 改进动态陷波滤波器性能（[#6411](https://github.com/betaflight/betaflight/pull/6411)）。

## 次要功能

- 改进 Anti-gravity 性能（[#6220](https://github.com/betaflight/betaflight/pull/6220)）。
- 支持模式联动（[#6335](https://github.com/betaflight/betaflight/pull/6335)）。
- 支持双陀螺仪模式下的动态滤波器（[#6428](https://github.com/betaflight/betaflight/pull/6428)）。
