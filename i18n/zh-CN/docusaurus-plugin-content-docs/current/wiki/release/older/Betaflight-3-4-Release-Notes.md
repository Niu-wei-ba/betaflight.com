---
sidebar_position: 10
sidebar_label: 3.4 发布说明
---
# 3.4 发布说明

**版本 3.4.0：有史以来最好的 Betaflight！**

我们认识到，大多数用户只想要新固件的两件事：安装它，然后开始飞行。这就是为什么我们花了很多时间来制定在大多数穿越机上运行良好的默认设置。只需安装并亲自尝试即可！为了让你的飞行器飞得更好，我们添加了一种全新的实验模式，通过过滤而不是插值来改善对摇杆输入的响应。有关设置 3.4 以优化飞行性能的更多信息，请阅读[这些说明](/docs/wiki/tuning/older/3-4-tuning-notes)。

我们还投入大量精力优化固件性能，特别是搭载 F7 MCU 的板卡。现在可以购买新的 F7 板卡，而朋友可能仍在为 F3 与 F4 板卡性能而烦恼。 :wink:

对于长距离飞行爱好者，我们加入全新的 [GPS Rescue 模式](/docs/wiki/guides/archive/GPS-Rescue-Mode)。它是其他偏导航固件中“返航”模式的简化版本，只需 GPS 即可工作，无需额外配置磁力计。

最后但并非最不重要的一点是，我们还添加了一系列新功能来提高使用 Betaflight 的便利性：您现在可以通过[将飞控安装为存储设备](/docs/wiki/guides/current/Mass-Storage-Device-Support)从 SD 卡或板载闪存芯片复制/粘贴日志，并且您可以使用飞控/TX 来[模拟操纵杆](/docs/wiki/guides/current/HID-Joystick-Support)，无需额外的硬件即可飞行在模拟器上。

如果您要从 Betaflight 的早期版本升级，请阅读以下部分，其中包含您可能需要在配置中更改的内容的列表。

我们已尽力消除缺陷。若仍发现 **bug**，请在[此处](https://github.com/betaflight/betaflight/issues)提交 **issue**。

祝飞行愉快！


## 升级时的重要信息

- 此版本中的许多更改和改进需要对 Betaflight 应用程序进行更改。这些更改已添加到 Betaflight 地面站 10.3.1（安装说明[此处](https://github.com/betaflight/betaflight-configurator#installation)）。请将您的 Betaflight 地面站更新至版本 10.3.1。如果您使用的是 Blackbox 日志查看器，则有一个更新版本 3.1.0 可与 Betaflight 3.4 配合使用（安装说明[此处](https://github.com/betaflight/blackbox-log-viewer#installation)）；
- 作为滤波级重构和 PID 环路改进的一部分，默认设置已重新评估并更新。新默认值旨在充分利用新滤波和改进的 PID 环路，几乎适用于任何硬件。即使当前设置正常，也建议仅恢复非滤波 / PID 环路设置，并尝试新的默认值；请妥善保存旧 `diff`，以防不喜欢新数值（[#6036](https://github.com/betaflight/betaflight/pull/6036)）。
- 同样作为过滤检修的一部分，可用于记录过滤/调整数据的调试模式的名称已得到改进 `NOTCH`（缩放后、过滤前的陀螺仪数据）现在为 `GYRO_SCALED`、`GYRO`（应用所有过滤后的陀螺仪数据）现在为 `GYRO_FILTERED` ([#6059](https://github.com/betaflight/betaflight/pull/6059));
- `dterm_setpoint_weight` 上限增至 `2000`（对应 Configurator 中“D Setpoint Weight”值 `20`）。想获得更“锁定”的摇杆感觉，可超过旧上限 `254`。同时，未文档化的标度改动已恢复，标度重新与 Betaflight App 的说明一致。若使用自定义 `dterm_setpoint_weight`，将原数值除以 `1.27`，即可获得与 3.1.6 至 3.4.0 间相同的手感（[#5945](https://github.com/betaflight/betaflight/pull/5945)、[#6052](https://github.com/betaflight/betaflight/pull/6052)）。
- DShot beacon 配置已变更。现在 `beacon` CLI 命令的使用方式与 `beeper` 相似，可分别按它支持的条件（目前为 `RX_SET` 和 `RX_LOST`）关闭 DShot beacon。旧版通过将 `beeper_dshot_beacon_tone` 设为 `0` 来关闭的方式不再支持。DShot beacon 默认对所有条件关闭；要启用，请在 CLI 中使用 `beacon <condition name|ALL>`（[#5891](https://github.com/betaflight/betaflight/pull/5891)、[#6070](https://github.com/betaflight/betaflight/pull/6070)）。
- 在以前版本的固件中，存在一个竞争条件，当 DShot 信标处于活动状态时，可能会导致 ESC 忽略 DShot 命令（例如激活反乌龟）。为了防止这种情况，DShot 信标中添加了超时功能，可在 DShot 信标激活后 1.2 秒内防止解锁 ([#6079](https://github.com/betaflight/betaflight/pull/6079))；
- 添加了 RSSI 配置验证。与以前的版本不同，不再可能同时配置多个 RSSI 源，因为任一时间只能有一个处于活动状态。如果您配置了多个受支持的 RSSI 源（帧错误计数/ADC/RX 通道），则此列表中除第一个之外的所有源都将被禁用 ([#5644](https://github.com/betaflight/betaflight/pull/5644))；
- 所有 RSSI 源均已添加缩放功能。如果您使用的 RSSI 机制无法提供您想要的 RSSI 输出范围，您现在可以使用 `rssi_scale` / `rssi_offset` CLI 变量来设置 RSSI 的比例和偏移量 ([#6001](https://github.com/betaflight/betaflight/pull/6001)， [#6032](https://github.com/betaflight/betaflight/pull/6032));
- 反乌龟模式功能得到改进：除了现有的前/后/左/右旋转2个螺旋桨外，现在支持仅旋转1个螺旋桨（通过对角移动横滚/俯仰杆），以及旋转对角相对的2个螺旋桨（通过移动偏航），以使翻转的飞行器偏航。这些方向中任何一个方向的最大摇杆偏转决定了旋转哪些螺旋桨（[#5163]（https://github.com/betaflight/betaflight/pull/5163））；
- 陀螺仪校准期间可接受的噪声限制的设置 `moron_threshold` 已重命名为 `gyro_calib_noise_limit`。此外，还添加了一个新设置 `gyro_calib_duration`。这允许用户配置更长的最小陀螺仪校准持续时间（以 1/10 秒为单位，默认值：125）。此处使用较大的设置将减少陀螺仪漂移，这在视线飞行时很有帮助（[#5932]（https://github.com/betaflight/betaflight/pull/5932））；
- 不幸的是，错误修复和飞控核心功能的改进导致固件大小增加，导致其溢出许多基于 F3 的飞控上的可用空间。因此，必须从一些基于 F3 的飞控中删除一些功能，以使固件适合闪存。以下目标受到影响：BETAFLIGHTF3、COLIBRI\_RACE、FRSKYF3、FURYF3OSD、LUX\_RACE、MIDELICF3、OMNIBUS、RCEXPLORERF3、RG\_SSD\_F3、SPRACINGF3EVO、SPRACINGF3NEO；
- OSD 元素 `osd_crosshairs`（十字线）和 `osd_ah_sbar`（人工地平线侧边栏）已在 CLI 中重命名为 `osd_crosshairs_pos` 和 `osd_ah_sbar_pos`，以使它们与 OSD 元素的命名保持一致。如果您正在使用这些元素，请在恢复之前手动更改备份中的名称 ([#5534](https://github.com/betaflight/betaflight/pull/5534))；
- CLI 中 `vtx_band` 参数的范围扩展为从 0 开始，而不是 1。设置 `vtx_band = 0` 允许使用 SmartPort 或 Tramp 协议的 VTX 用户直接通过 `vtx_freq` 参数设置所需的频率。由于 RTC6705（板载）VTX 驱动程序不支持直接频率设置，`vtx_band = 0` 不适用于这些 VTX，因此不应使用（[#5465](https://github.com/betaflight/betaflight/pull/5465)）。


##主要特点：

- 彻底检查和改进过滤（[#5391](https://github.com/betaflight/betaflight/pull/5391)、[#5458](https://github.com/betaflight/betaflight/pull/5458))；
- 优化并大幅提升了 F7 的性能（[#5674](https://github.com/betaflight/betaflight/pull/5674)）；
- 添加了 GPS 救机模式 ([#5753](https://github.com/betaflight/betaflight/pull/5753)、[#5764](https://github.com/betaflight/betaflight/pull/5764))；- 添加了对将 SD 卡/板载闪存作为 USB 大容量存储设备 (MSC) 进行访问的支持 ([#5443](https://github.com/betaflight/betaflight/pull/5443)、[#5629](https://github.com/betaflight/betaflight/pull/5629)、[#5650](https://github.com/betaflight/betaflight/pull/5650))；
- 添加了对将 RC 输入读取为 USB 操纵杆 (HID) 的支持 ([#5478](https://github.com/betaflight/betaflight/pull/5478)、[#5596](https://github.com/betaflight/betaflight/pull/5596))；
- 添加了对 CRSF 上 CMS 配置的支持 ([#5743](https://github.com/betaflight/betaflight/pull/5743))；
- 添加了对基于实验滤波器的 RC 通道平滑的支持 ([#6017](https://github.com/betaflight/betaflight/pull/6017))。


##次要特征：

- 添加了特技教练模式（[#5970]（https://github.com/betaflight/betaflight/pull/5970））；
- 添加了油门增压模式（[#5508]（https://github.com/betaflight/betaflight/pull/5508））；
- 添加了对油门限制的支持（[#5608](https://github.com/betaflight/betaflight/pull/5608)）；
- 添加了 PID 循环改进 ([#5968](https://github.com/betaflight/betaflight/pull/5968)、[#5963](https://github.com/betaflight/betaflight/pull/5963)、[#5962](https://github.com/betaflight/betaflight/pull/5962))；
- 添加了对加速[偏航旋转恢复]（/docs/wiki/guides/current/Yaw-Spin-Recovery-and-Gyro-Overflow-Detect）（[#5706]（https://github.com/betaflight/betaflight/pull/5706））的支持；
- 添加了对通过 RC 通道直接调整 PID 值的支持 ([#5584](https://github.com/betaflight/betaflight/pull/5584))；
- 添加了对多种超频速度的支持（[#5193](https://github.com/betaflight/betaflight/pull/5193)）；
- 添加了 MCU 温度监控 ([#5322](https://github.com/betaflight/betaflight/pull/5322))；
- 添加了麻痹模式（[#5851](https://github.com/betaflight/betaflight/pull/5851)）；
- 添加了对 QMC5883L 指南针的支持 ([#5309](https://github.com/betaflight/betaflight/pull/5309))；
- 添加了对 W25M 闪存芯片的支持 ([#5722](https://github.com/betaflight/betaflight/pull/5722))。


## 新目标：

- 添加了具有双陀螺仪支持的 SPRACINGF7DUAL ([#5264](https://github.com/betaflight/betaflight/pull/5264))。
