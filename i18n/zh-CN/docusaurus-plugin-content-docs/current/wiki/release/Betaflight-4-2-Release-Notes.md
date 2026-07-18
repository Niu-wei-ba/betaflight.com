---
sidebar_position: 5
sidebar_label: 4.2 发布说明
---

# 4.2 发布说明

**正好赶上夏天……**

对我们大多数人而言，恰逢许多地区与 COVID-19 相关的封控结束，我们很自豪地宣布发布 Betaflight 4.2.0！

这是 Betaflight 改用新 Target 支持方式后的第三个版本。我们努力让 Unified Targets 的支持比过去更简单、更无缝，并已将大多数现有 Target 迁移到该方式。这使开发者无需额外工作即可增加新 Target 支持；因此 Betaflight 现支持的硬件比以往更多，目前支持 185 种不同飞控型号，数量仍在增加。

一如既往，飞行性能开发者也没有停下脚步，为 Betaflight 的飞行表现带来多项改进。同时，默认设置得到优化，固件比以往更易调校。

对于仍不得不留在室内的飞行员，新的电池压降补偿值得关注：它能在整块电池的放电过程中带来更一致的摇杆手感。多名测试飞行员反馈，此功能尤其适合 whoop 等小型室内机。请阅读 [4.2 调校说明](/docs/wiki/tuning/4-2-Tuning-Notes)了解设置方式。

最后，我们还重构了陀螺仪循环：它现在以固定速率运行，且该速率与所用陀螺仪型号的原生更新速率相同。这简化了循环速率设置，并支持更多陀螺仪型号；希望制造商会采用它们，推出搭载新陀螺仪的飞控。

下方列出了更完整的新功能清单。

为确保安装的是最新 Target 版本，请前往[此页面](https://github.com/betaflight/betaflight-configurator/releases)，并在**升级固件前**确认已安装最新版 Betaflight Configurator。

若要充分利用飞行性能改进，请阅读[调校说明](/docs/wiki/tuning/4-2-Tuning-Notes)。

若从较早的 Betaflight 版本升级，请阅读下一节，其中列出了可能需要修改的配置项。

我们尽力让本版本尽可能少出错。若仍发现 **Bug**，请在[此处](https://github.com/betaflight/betaflight/issues)创建 **Issue** 告知我们。

_祝飞行愉快，享受夏天！_

## 升级时的重要信息

- Betaflight 4.2 改变了 Target 的下载与安装方式。[最新版](https://github.com/betaflight/betaflight-configurator/releases) Betaflight Configurator 10.7.0 包含支持这些变化所需的内容。因此，**必须升级到 Betaflight Configurator 10.7.0 或更高版本（[安装说明](https://github.com/betaflight/betaflight-configurator#installation)），才能安装最新版本的 Target**；
- 若使用 [Blackbox Explorer](https://github.com/betaflight/blackbox-log-viewer/releases)，请使用配合 Betaflight 4.2 的更新版 3.5.0（[安装说明](https://github.com/betaflight/blackbox-log-viewer#installation)）；
- [Betaflight TX Lua 脚本](https://github.com/betaflight/betaflight-tx-lua-scripts/releases)已发布 1.5.0 版，包含配合 Betaflight 4.2 所需的改动（[安装说明](https://github.com/betaflight/betaflight-tx-lua-scripts#installing)）；
- Betaflight 4.2 具有详细的[调校说明](/docs/wiki/tuning/4-2-Tuning-Notes)。请使用这些说明，或使用 Betaflight Configurator 10.7.0 中改进的调校滑块来调校飞行器。**请勿粘贴旧版固件的调校配置。**部分默认值已经改变，部分参数的使用方式也不同，因此先前调校设置在 Betaflight 4.1 中不会有良好表现（[#8623](https://github.com/betaflight/betaflight/pull/8623)、[#8736](https://github.com/betaflight/betaflight/pull/8736)）；
- 安装新固件或重置配置后，默认选定的电机输出协议现为“disabled”。因此，飞行器能够解锁前必须选择正确的电机协议。这样也消除了早期版本预选旧协议 OneShot125 对最大 PID 循环速率的限制，使每种 MCU 类型默认选定其可支持的最大 PID 循环速率。未选择电机输出协议前，解锁会被禁用，Configurator 会显示警告（[#9619](https://github.com/betaflight/betaflight/pull/9619)）；
- 启用双向 DShot 时，为给 ESC 向飞控发送 RPM 数据包预留时间，DShot 协议可用的最大 PID 循环速率会减半。这不影响 DShot600；若 DShot300 使用双向 DShot，最大 PID 循环速率为 4 kHz，DShot150 则为 2 kHz（[#9642](https://github.com/betaflight/betaflight/pull/9642)）；
- 偏航自旋恢复功能的触发阈值新增自动模式：它以当前配置的最大偏航速率为基础并加上余量，自动设定阈值。该模式因适合大多数用户而成为默认偏航自旋阈值设置，仍可手动配置阈值（[#9455](https://github.com/betaflight/betaflight/pull/9455)）；
- 启用任何依赖加速度计的功能时，现须先校准加速度计才允许解锁。这可避免飞行器使用未校准加速度计进行自稳而产生意外或危险结果。完成校准前，解锁会被禁用，Configurator 会显示警告（[#9031](https://github.com/betaflight/betaflight/pull/9031)）；
- 虚拟电流计的计算改为基于混控器所使用的油门值，而非油门通道 RC 输入。因此该值会包含油门限制、油门增压等效果，可更准确地预测电流和耗电量。若使用虚拟电流计，升级固件后请重新校准，确认校准值仍正确（[#9153](https://github.com/betaflight/betaflight/pull/9153)）；
- 固件跟踪“RSSI dBm”值的方式已改为使用 -130 至 0 范围内的真实 dBm 值，而非旧版的 130 至 0 范围。因此，若自定义了 `osd_rssi_dbm_alarm`，须改为其旧值的相反数，例如 `60` 改为 `-60`（[#9550](https://github.com/betaflight/betaflight/pull/9550)）；
- 由于多旋翼使用摇杆解锁可能导致意外上锁，默认已禁用摇杆解锁。若仍希望使用（风险自负），必须将 `enable_stick_arming` 设为 `on`（[#9183](https://github.com/betaflight/betaflight/pull/9183)）；
- `name` CLI 命令已移除，请改用 `set name = <name>`（[#8837](https://github.com/betaflight/betaflight/pull/8837)）。

## 主要功能

- 完全重构陀螺仪循环，提升性能，并使其始终以陀螺仪原生速率运行（[#9444](https://github.com/betaflight/betaflight/pull/9444)）；
- 新增可选的 ACTUAL 和 QUICK rates 模型（[#9495](https://github.com/betaflight/betaflight/pull/9495)、[#9506](https://github.com/betaflight/betaflight/pull/9506)）；
- 新增电池压降补偿，使整段飞行中的油门 / PID 行为更一致（[#9561](https://github.com/betaflight/betaflight/pull/9561)）；
- 新增自稳竞速模式（Silverware 中的“NFE race mode”）（[#9481](https://github.com/betaflight/betaflight/pull/9481)）。

## 次要功能

- 可选择在解锁时显示 OSD 徽标（[#9244](https://github.com/betaflight/betaflight/pull/9244)）；
- 支持增强型 OSD / CMS 设备，可高亮显示文本或符号（[#9212](https://github.com/betaflight/betaflight/pull/9212)）；
- 支持 FrSkyOSD OSD 设备（[#9127](https://github.com/betaflight/betaflight/pull/9127)）；
- 支持带 SPI 连接 CC2500 芯片（FrSky SPI）的设备上的 Redpine RC 协议（[#7601](https://github.com/betaflight/betaflight/pull/7601)）。
