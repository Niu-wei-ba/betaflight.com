# ESC 固件

ESC 是电子调速器，负责为飞行器电机供电。

- ESC 可驱动有刷或无刷电机；有刷电机如今通常只见于较早期、非常轻的穿越机。
- ESC 接收飞控发出的电机指令，并输出功率脉冲来加速或减速各个电机。
- DShot 是飞控与 ESC 之间首选的单线、双向全数字通信协议，无需校准。只有 DShot 能将 RPM 和其他扩展遥测数据从 ESC 返回 FC。
- 较旧的 ESC 支持 PWM、OneShot、MultiShot 等模拟协议，以及 ProShot 等混合协议。模拟协议需要两点校准、易受噪声影响，并且只能通过额外串口提供遥测，因此不适合 RPM 滤波。
- 现代 ESC 能够通过 DShot 向飞控回传带内遥测数据，这一能力显著增强了 Betaflight。
- 除 FC 至 ESC 的常规电机指令外，还使用 ESC 至 FC 遥测的功能称为双向 DShot（Bidirectional DShot）。
- 双向 DShot 不等于双向电机控制。后者允许 ESC 主动正反转电机，在 3D 飞行模式中，摇杆中位对应关闭。双向 DShot 遥测并不需要双向电机控制。

## 双向 DShot 固件

可在[地面站电机页](/docs/wiki/app/motors-tab#escmotor-features)启用双向 DShot。Betaflight 4.5 的现代双向 DShot 与 4.0 相比更稳健。需要使用正确的 ESC 固件，才能支持 DShot 遥测并获得最佳 Betaflight 性能。强烈建议将 DShot 与 RPM 滤波配合使用，以改善操控性和飞行顺滑度。

### 双向 DShot 版本

双向 DShot 从通过 ESC 信号线回传简单 RPM 数据发展而来，不需要专用于 `ESC_SENSOR` 的 UART。EDT 扩展了双向 DShot 的能力，使没有专用遥测线的 MCU 也能报告电压与温度。

| 版本     | 功能                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| RPM 遥测 | 通过 ESC 信号线将 RPM 数据从 ESC 发送至 FC。                                                                  |
| EDTv1    | 在通过 ESC 信号线回传的 RPM 数据中增加电压、电流和温度。                                                      |
| EDTv2    | 增加 ESC 状态事件，例如压力等级、堵转和失步。ESC 会检测解磁/no-cross/cross 序列，并在序列未按预期发生时上报。 |

注意：4 合 1 ESC 通常无法通过 EDT 提供电流遥测，因为通常只有一个总电流传感器，而非每个 ESC 各有一个传感器。

## 32 位 ESC 固件

**32 位 ESC** 可选择以下固件：

| 方案      | 类型      | 链接                                                                            |
| --------- | --------- | ------------------------------------------------------------------------------- |
| AM32      | 免费/开源 | https://github.com/AlkaMotors/AM32_MULTI_MCU，兼容 https://esc-configurator.com |
| BLHeli_32 | 付费/闭源 | https://github.com/bitdump/BLHeli/blob/master/BLHeli_32%20ARM/README.md         |

### AM32

AM32 完整支持 RPM 滤波和 EDT 遥测，是 32 位 ESC 的推荐固件。它是持续活跃开发的完全开源 32 位 ESC 固件，兼容 STM32F051、STM32G071、STM32L432、GD32E230、AT32F421、AT32F415 和 AT32F4A 等主流 MCU。过去几年中，AM32 率先实现了一些后来被引入 BLHeli_32 的功能。因此 Betaflight 推荐在 32 位 ESC 上使用 AM32。

开发者说明：2.00 之前，AM32 为每类 MCU 分别维护仓库；2.00 将这些仓库统一至 https://github.com/AlkaMotors/AM32_MULTI_MCU。

| 版本 | 推荐 | 说明                                                                                             |
| ---- | ---- | ------------------------------------------------------------------------------------------------ |
| 2.00 | `N`  | 清理 target 结构并统一项目。                                                                     |
| 2.01 | `N`  | 将 10 kHz 定时器提高至 20 kHz，并提高最大占空比变化量。                                          |
| 2.02 | `N`  | 提高反相输出 target 的启动功率。                                                                 |
| 2.03 | `N`  | 将提示音从 DShot 转向变更命令移至保存命令。                                                      |
| 2.04 | `Y`  | 修复电流保护和最大占空比无法提高的问题；修复双重启动提示音；改进电流平均方法和启动斜坡速度调节。 |
| 2.05 | `Y`  | 修复与输入频率关联的斜坡问题。                                                                   |

### BLHeli_32

:::warning
在 32.7 之后的 BLHeli_32 版本中，已观察到电机堵转、过热和异常行为。Betaflight 建议避免使用更新版本，直至有经过充分验证的 BLHeli_32 版本可用。
:::

BLHeli_32 仅以 ESC 预装固件的形式提供，其许可证费用已计入每个 ESC 的硬件成本。它延续自最初引入 32 位 ESC 支持的 BLHeli 项目。32.7.0 已完整支持双向 DShot，只需使用 BLHeli32 Configurator 升级即可。

| 版本  | 推荐 | 说明                                                                                        |
| ----- | ---- | ------------------------------------------------------------------------------------------- |
| 32.7  | `Y`  | 支持 RPM 滤波；推荐用于固定 PWM 输出的稳定版本。                                            |
| 32.8  | `N`  | 有 DShot 通信错误、电机堵转和过热报告；引入可变 PWM，32.8.3 增加了类似 AM32 的 ByRPM 支持。 |
| 32.9  | `N`  | 有 DShot 通信错误、电机堵转和过热报告；增加 EDT 遥测。                                      |
| 32.10 | `N`  | 可能修复电机堵转问题，但初步报告显示 32.10 仍有错误。                                       |

## 8 位 ESC 固件

**8 位 BLHeli-S ESC** 使用 BusyBee 系列 MCU：BB1 (L)、BB21 (H) 和 BB51 (X)。可选择：

| 方案         | 类型 | 链接                                                                               |
| ------------ | ---- | ---------------------------------------------------------------------------------- |
| BlueJay      | 免费 | https://github.com/bird-sanctuary/bluejay，使用 https://esc-configurator.com       |
| JFlight      | 付费 | https://jflight.net/                                                               |
| JazzMaverick | 免费 | https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs |

### BlueJay

BlueJay 完整支持 RPM 滤波和 EDT 遥测，是 8 位 ESC 的推荐固件。它最初由 Betaflight 开发者 Mathias 开发，后移交 BirdSanctuary 团队，并由 Damosvil 与 Stylesuxx 和 esc-configurator 项目紧密协作维护。

可使用在线刷写工具 [ESC Configurator](https://esc-configurator.com/) 轻松刷写 BlueJay。较旧的离线配置器（https://github.com/mathiasvr/bluejay-configurator/releases）仍可使用，但不建议用于当前版本。该固件支持 L、H 及较新的 Z 型 ESC，提供多项选项，且已在多种 ESC 型号上验证。

[扩展 DShot 遥测（EDT）](https://github.com/bird-sanctuary/extended-DShot-telemetry) 由 BlueJay 团队创建，可让没有独立遥测 UART 的 ESC 在 RPM 数据外发送额外遥测。EDT 可使 BlueJay ESC 上报电压、电流、温度和错误事件。

| 版本       | 推荐  | 说明                                                                      |
| ---------- | ----- | ------------------------------------------------------------------------- |
| 0.17       | `N`   | EDTv1，3D 模式损坏。                                                      |
| 0.18       | `N`   | EDTv1，3D 模式损坏。                                                      |
| 0.19.2     | `Y`   | 当前稳定版，支持 RPM 滤波和 EDTv2。除非使用 3D 模式，否则应升级至此版本。 |
| 0.20       | `N`   | 旧测试版，因问题撤回发布。                                                |
| 0.20.1-RC2 | `N`\* | 最新测试代码，包含 EDTv2 支持，3D 模式可用。                              |

_\*使用 3D 飞行时推荐该版本，因为它修复了 3D 模式切换。启用前请阅读[地面站指南中的 3D 模式说明](/docs/wiki/app/motors-tab#3d-escmotor-features)。_

### JFlight

JFlight 是最初的 BLHeli-S RPM 固件，来自底层 RPM 滤波与 DShot 遥测代码的开发者。要为某个 ESC 启用 RPM 遥测，需为该 ESC 购买许可证。前往 [jflight.net](https://jflight.net)，确认 ESC 与 FC 均受支持，购买足够的许可证并按安装说明操作：下载定制的 JESC BLHeli-S Configurator，选择 ESC 和正确的 hex 文件，点击蓝色的 `flash all`，再点击 `flash all telemetry` 刷入遥测代码。请选择列表顶部的刷写版本。JESC 需要 Betaflight 4.1 或更高版本。

JFlight 仅支持 L 和 H MCU，不建议用于新的安装。

### JazzMaverick

JazzMaverick 是原始 BLHeli-S 代码库的分支，通过补丁支持 RPM 遥测等功能。

:::warning
应避免使用 JazzMaverick 固件。为获得可靠的飞行表现，应将其替换为 BlueJay。

JazzMaverick 文档不足，且已多年未维护。
:::

JazzMaverick 的 BLHeli 分支当前构建为 16.9，通常称为 [BLHeli-M](https://www.rcgroups.com/forums/showthread.php?3621257-BLHeli_M-Maverick-version)。刷写 16.9 最简单的方法是使用 Asizon's Configurator。

更早版本可在 GitHub 上获取 [JazzMaverick](https://github.com/JazzMaverick/BLHeli/tree/JazzMaverick-patch-1/BLHeli_S%20SiLabs) 源码。可使用传统 [BLHeli-S Configurator](https://github.com/blheli-configurator/blheli-configurator/releases) 正常刷写，或使用浏览器版 [ESC Configurator](https://esc-configurator.com/)。请先确认所需刷写版本，使用 16.73 或 16.9。

由于缺乏维护以及作者的实验性做法，Betaflight 强烈建议用户避免使用 JazzMaverick。该 ESC 固件曾包含非线性油门响应等容易令用户意外或困惑的功能。

### BLHeli-S

[BLHeli-S](https://www.rcgroups.com/forums/showthread.php?2640796-BLHeli_S-Smooth-as-Silk) 为 ESC 引入 BusyBee 系列 8 位 MCU 支持。与早期 [BLHeli](https://www.rcgroups.com/forums/showthread.php?2136895-BLHeli-for-Atmel-and-Silabs-united-by-BLHeliSuite) 硬件不同，这些 MCU 具备硬件 PWM 生成能力，可使电机 PWM 与 MCU 时钟同步，并支持更高 eRPM 输出。Damped Light 模式也是标准功能，允许所有 ESC 主动减速和加速电机。

这些功能如今已是标准能力，本页其他 ESC 固件也都提供。DShot 到 16.5 才加入，Turtle 模式和 DShot 蜂鸣器则直到最后一个官方 16.7 才提供。若 ESC 预装 BLHeli-S，建议连接 [ESC Configurator](https://esc-configurator.com/) 并刷写 BlueJay；可勾选选项将 BLHeli-S 的正反转设置复制到 BlueJay。

:::info
以下版本仅供参考。应始终将 BLHeli-S 设备升级至 BlueJay。
:::

| 版本 | 推荐 | 说明                                                                                                                                                                  |
| ---- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 16.0 | `N`  | 基于基础代码 rev 14.5。使用硬件 PWM 提供平滑油门响应、静音运行和极高转速支持；实现反向双向模式、双向模式的独立正反向油门增益，以及 OneShot42 和 MultiShot 支持。      |
| 16.1 | `N`  | 通过启动功率参数使低 RPM 功率限制可配置。                                                                                                                             |
| 16.2 | `N`  | 修复温度保护无法生效的问题；提高对极高输入信号速率的鲁棒性；可将蜂鸣强度设为 1 关闭提示音；保存前检查油门校准差是否达到最小值，最小油门校准成功前不保存最大油门校准。 |
| 16.3 | `N`  | 实现可配置温度保护；加强 Bootloader 保护并总体降低 Flash 损坏风险；小幅改进同步保持。                                                                                 |
| 16.4 | `N`  | 修复有缺陷的 `eeprom` 签名可能阻止 Bootloader 操作的问题。                                                                                                            |
| 16.5 | `N`  | 增加 DShot150、DShot300 和 DShot600 支持。                                                                                                                            |
| 16.6 | `N`  | 修复 32 kHz 下的 MultiShot 信号检测问题；改进高输入信号速率下的双向模式。                                                                                             |
| 16.7 | `N`  | 增加用于蜂鸣和临时反转方向的 DShot 命令，主要由 bycedjohnson 编写。                                                                                                   |
