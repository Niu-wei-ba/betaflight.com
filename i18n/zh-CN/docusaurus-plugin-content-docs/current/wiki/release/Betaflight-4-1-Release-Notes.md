---
sidebar_position: 6
sidebar_label: 4.1 发布说明
---

# 4.1 发布说明

**发布时间已经较晚，长话短说。**

本版本包含大量飞行性能改进、新功能，以及对多个新 Target 的支持。完整新增功能列表见下文。

更新固件**前**，请前往 [GitHub Betaflight Configurator Releases 页面](https://github.com/betaflight/betaflight-configurator/releases)，安装至少 10.6 版，以确保可安装 Target 的最新版。更高版本 Configurator 通常可用，但可能有小问题。

要充分利用飞行性能改进，请阅读[调校说明](/docs/wiki/tuning/4-1-Tuning-Notes)。

若从早期 Betaflight 版本升级，请阅读下方可能需要修改配置的清单。

我们已尽力消除缺陷；若仍发现 **bug**，请在[此处](https://github.com/betaflight/betaflight/issues)提交 **issue**。

_飞行愉快。_

## 升级的重要信息

- Betaflight 4.1 从根本上改变了 Target 的下载与安装方式。[Betaflight Configurator 10.6.0](https://github.com/betaflight/betaflight-configurator/releases)包含支持这些变化所需的功能。因此，为安装最新版 Target，**必须升级到 Betaflight Configurator 10.6.0 或更新版本**；[安装说明](https://github.com/betaflight/betaflight-configurator#installation)。
- 使用 [Blackbox Explorer](https://github.com/betaflight/blackbox-log-viewer/releases) 时，请配合使用 3.4.0 更新版；[安装说明](https://github.com/betaflight/blackbox-log-viewer#installation)。
- [Betaflight TX Lua 脚本](https://github.com/betaflight/betaflight-tx-lua-scripts/releases)已发布 1.4.0，包含配合 Betaflight 4.1 的变化；[安装说明](https://github.com/betaflight/betaflight-tx-lua-scripts#installing)。
- 作为 RPM 滤波基础的双向 DShot 已得到改进，现可用于 BLHeli_32（从 32.7 版起）及使用 JESC 固件的 BLHeli_S 硬件。请按照[说明](/docs/wiki/guides/current/DSHOT-RPM-Filtering)设置（[#8554](https://github.com/betaflight/betaflight/pull/8554)、[#8779](https://github.com/betaflight/betaflight/pull/8779)）。
- Betaflight 4.1 提供详细的[调校说明](/docs/wiki/tuning/4-1-Tuning-Notes)。请使用该说明或 Configurator 10.6.0 的新调校滑块。**不要粘贴旧版固件的调校配置。**部分默认值已变更，且若干参数的使用方式不同，旧调校在 Betaflight 4.1 中不会正常工作（[#8623](https://github.com/betaflight/betaflight/pull/8623)、[#8736](https://github.com/betaflight/betaflight/pull/8736)）。
- 引入完全可配置的 VTX 控制（VTX Tables）后，刷写固件后必须先加载适合所用 VTX 和飞行国家 / 地区的 VTX 表，才能通过 Betaflight 控制 VTX。Configurator 10.6.0 起支持从文件加载 VTX 表；请参阅“Video Transmitter”新选项卡，了解查找和安装合适 VTX 表的方法（[#7251](https://github.com/betaflight/betaflight/pull/7251)）。
- OSD 字体已优化，部分字符也得到改进。要使 Betaflight 4.1 的 OSD 正常工作，必须将 OSD 字体更新到最新版（Configurator 10.6.0 或更新版本提供）（[#8390](https://github.com/betaflight/betaflight/pull/8390)）。
- 如 Betaflight 4.0 发布前所公告，Betaflight 4.1 已移除对 F3 飞行控制器的支持。

## 主要功能

- 新版与改进的 Feed Forward 2.0（[#8623](https://github.com/betaflight/betaflight/pull/8623)、[#8736](https://github.com/betaflight/betaflight/pull/8736)）；
- 重构的双向 DShot（[#8554](https://github.com/betaflight/betaflight/pull/8554)、[#8779](https://github.com/betaflight/betaflight/pull/8779)）；
- 使用 RPM 遥测的动态怠速管理（[#8604](https://github.com/betaflight/betaflight/pull/8604)）；
- 使用 VTX 表的完全可配置 VTX 控制（[#7251](https://github.com/betaflight/betaflight/pull/7251)）。

## 次要功能

- 支持 Spektrum SRXL2 串行协议（[#8606](https://github.com/betaflight/betaflight/pull/8606)）；
- 支持板卡专属自定义默认值（[#8707](https://github.com/betaflight/betaflight/pull/8707)）；
- 支持任意陀螺仪和磁力计对齐（[#8474](https://github.com/betaflight/betaflight/pull/8474)）。
