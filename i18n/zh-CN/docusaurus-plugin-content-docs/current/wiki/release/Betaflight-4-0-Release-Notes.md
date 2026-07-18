---
sidebar_position: 7
sidebar_label: 4.0 发布说明
---

# 4.0 发布说明

**历时很久，但它终于来了，而且带来了大量新内容！**

去年 8 月发布 3.5 时，Betaflight 支持的不同 Target 已达 150 个，维护工作占用了大量时间。显然必须有所改变。我们已着手调整 Betaflight 架构，使同一份固件能用于不同飞控；因此决定在发布下一个版本前完成这项改动，并将这个发生根本架构变化的版本定为 4.0。

临近原定的 Betaflight 4.0 发布日期时，我们意识到工作尚未完成，于是决定再投入三个月完成已启动的工作。

现在，我们称为“Unified Targets”的“一个固件支持多块飞控”技术已经在 Betaflight 4.0 中成为现实。Betaflight App 对 Unified Target 及其配置的刷写支持仍有待完成；完成后，制造商将能够直接在地面站中为任意数量的板卡或 RTF 产品提供固件。

一如既往，Betaflight 在飞行性能方面带来了多项令人振奋的改进，例如基于 ESC RPM 的滤波、采用 D\_min 的 D 项管理，以及基于油门的动态陀螺仪和 D 项滤波。

同时还增加了更多非飞行类功能，例如起跑控制、OSD 配置文件，以及板载 SPI 接收机支持。

下方列出了更完整的新功能清单。

若要充分利用飞行性能改进，请阅读[调校说明](/docs/wiki/tuning/4-0-Tuning-Notes)。

若从较早的 Betaflight 版本升级，请阅读下一节，其中列出了可能需要修改的配置项。

我们尽力让本版本尽可能少出错。若仍发现 **Bug**，请在[此处](https://github.com/betaflight/betaflight/issues)创建 **Issue** 告知我们。

_Kia kaha_（保持坚强）

## 升级时的重要信息

- 本版本的若干变更和改进要求升级 Betaflight App。相关支持已加入 [Betaflight Configurator 10.5.1](https://github.com/betaflight/betaflight-configurator/releases/tag/10.5.1)（[安装说明](https://github.com/betaflight/betaflight-configurator#installation)），请至少升级到该版本；
- 若使用 Blackbox Log Viewer，请升级至配合 Betaflight 4.0 的 [3.3.1 版](https://github.com/betaflight/blackbox-log-viewer/releases/tag/3.3.1)（[安装说明](https://github.com/betaflight/blackbox-log-viewer#installation)）；
- 若使用 OpenTX 和 Betaflight TX Lua 脚本，请至少升级到 [1.2.0 版](https://github.com/betaflight/betaflight-tx-lua-scripts/releases/tag/1.2.0)，以支持 Betaflight 4.0 引入的新功能；
- Betaflight 4.0 对飞行性能进行了多项改进。因此，**将旧版 Betaflight 的调校设置备份粘贴回 Betaflight 4.0 极可能导致较差的飞行表现**。Betaflight 4.0 的默认设置应适用于大多数硬件配置；需要调校飞行器性能的用户，请阅读 [4.0 调校说明](/docs/wiki/tuning/4-0-Tuning-Notes)（[#6432](https://github.com/betaflight/betaflight/pull/6432)、[#6943](https://github.com/betaflight/betaflight/pull/6943)、[#7078](https://github.com/betaflight/betaflight/pull/7078)、[#7264](https://github.com/betaflight/betaflight/pull/7264)、[#7271](https://github.com/betaflight/betaflight/pull/7271)、[#7304](https://github.com/betaflight/betaflight/pull/7304)、[#7373](https://github.com/betaflight/betaflight/pull/7373)、[#7538](https://github.com/betaflight/betaflight/pull/7538)）；
- 修正了 `min_check`“零油门”死区的应用方式。修正前，`min_check` 范围上方还存在一个大小相同、未记录的额外死区。该修正不会改变解锁行为，油门仍必须低于 `min_check` 才能解锁；但会消除 `min_check` 上方非预期的油门死区，使最低油门附近的响应更灵敏、油门分辨率略有提升。若希望保留原有“零油门”死区范围，须将 `min_check` 中配置的死区量（相对 1000 的偏移量）加倍。请注意，这也会使允许解锁的油门范围加倍（[#7463](https://github.com/betaflight/betaflight/pull/7463)）；
- 新增“Stick Overlay”OSD 元素，用于叠加显示当前摇杆位置。要使用它，必须将 OSD 字体升级到最新版（Configurator 10.5.0 或更高版本提供）（[#7476](https://github.com/betaflight/betaflight/pull/7476)）；
- “crash flip arrow”OSD 元素现可在飞行器未处于反乌龟模式、但设置了 `small_angle`，且飞行器未解锁并倾斜超过 `small_angle` 时启用。它会提示飞行员当前姿态无法解锁，并允许其启用反乌龟模式以扶正飞行器（[#7250](https://github.com/betaflight/betaflight/pull/7250)）；
- 引入 Unified Targets 时，现有 `resource` 命令新增了两个资源管理命令：`timer` 和 `dma`。与 `resource` 可将引脚分配给功能类似，`timer` 可将定时器分配给引脚，`dma` 可将 DMA 流分配给子系统和已分配定时器的引脚。**重要：**DMA 流通过定时器与引脚关联，因此必须先对引脚进行 `timer` 分配，再对这些引脚进行 `dma` 分配（[#5824](https://github.com/betaflight/betaflight/pull/5824)、[#6837](https://github.com/betaflight/betaflight/pull/6837)、[#7620](https://github.com/betaflight/betaflight/pull/7620)）；
- 统一了 `resource`、`timer` 和 `dma` 命令的语法；其中 `resource list` 子命令改名为 `resource show`，与新的 `dma show` 和 `timer show` 子命令保持一致（[#7712](https://github.com/betaflight/betaflight/pull/7712)）；
- 以下参数已重命名，使其名称更贴合功能：`p_level` => `angle_level_strength`、`i_level` => `horizon_level_strength`、`d_level` => `horizon_transition`（[#6673](https://github.com/betaflight/betaflight/pull/6673)）；
- 陀螺仪配置由按硬件型号设置改为适用于所有陀螺仪型号的通用配置。这意味着，某些 Target 会用于具有不同陀螺仪型号且安装方向不同的多块板卡；从 Betaflight 4.0 起，必须手动设置 `gyro_1_sensor_align`（双陀螺仪板卡还可能需要设置 `gyro_2_sensor_align`），使其与实际板卡上的陀螺仪方向一致。具体说明和各板卡操作方法见 [#6761](https://github.com/betaflight/betaflight/pull/6761)。这是临时方案，后续将通过带正确陀螺仪对齐设置的 Unified Target 配置解决（[#5868](https://github.com/betaflight/betaflight/pull/5868)）；
- 飞控核心功能的 Bug 修复使固件体积增大，几乎所有基于 F3 的飞控均超出可用 Flash 空间。因此，除少数仍受支持的 F3 飞控外，必须移除部分功能。受影响 Target 包括：AIORACERF3、BETAFLIGHTF3、CHEBUZZF3、CRAZYBEEF3FR、FURYF3、FURYF3OSD、IMPULSERCF3、LUX\_RACE、LUXV2\_RACE、MIDELICF3、OMNIBUS、RACEBASE、RMDO、SIRINFPV、SPRACINGF3、SPRACINGF3MINI、SPRACINGF3NEO、STM32F3DISCOVERY（[#6900](https://github.com/betaflight/betaflight/pull/6900)、[#6955](https://github.com/betaflight/betaflight/pull/6955)、[#7037](https://github.com/betaflight/betaflight/pull/7037)、[#7038](https://github.com/betaflight/betaflight/pull/7038)、[#7045](https://github.com/betaflight/betaflight/pull/7045)、[#7306](https://github.com/betaflight/betaflight/pull/7306)、[#7381](https://github.com/betaflight/betaflight/pull/7381)、[#7392](https://github.com/betaflight/betaflight/pull/7392)、[#7402](https://github.com/betaflight/betaflight/pull/7402)、[#7421](https://github.com/betaflight/betaflight/pull/7421)、[#7501](https://github.com/betaflight/betaflight/pull/7501)、[#7508](https://github.com/betaflight/betaflight/pull/7508)、[#7518](https://github.com/betaflight/betaflight/pull/7518)、[#7829](https://github.com/betaflight/betaflight/pull/7829)、[#7842](https://github.com/betaflight/betaflight/pull/7842)）；
- 除上述措施外，为使固件装入 Flash，所有 F3 飞控均移除了 Smart Feedforward，以及 SimonK ESC 刷写/配置支持（[#7272](https://github.com/betaflight/betaflight/pull/7272)、[#7274](https://github.com/betaflight/betaflight/pull/7274)、[#7391](https://github.com/betaflight/betaflight/pull/7391)）；
- 为回收 Flash 空间，F3 飞控移除了通过 LED 灯带显示状态的支持。可改用 [LED 灯带配置文件](/docs/wiki/guides/current/LED-Strip-Functionality#led-strip-profiles) 将灯带设置为固定颜色，但不支持“Status”配置文件。LED 灯带配置文件也适用于 F4 / F7，可在 OSD 中简单配置 LED 灯带（[#7485](https://github.com/betaflight/betaflight/pull/7485)）；
- 上述三项措施仍不足以避免 F3 飞控 Flash 溢出，因此引入了按“功能裁减”级别对 F3 飞控分类、并依等级移除功能的机制，以进一步减少大多数 F3 飞控内置的功能数量（[#7429](https://github.com/betaflight/betaflight/pull/7429)）。

## 主要功能

- 实时 ESC RPM 反馈，以及基于电机 RPM 的陷波滤波（[#7264](https://github.com/betaflight/betaflight/pull/7264)、[#7271](https://github.com/betaflight/betaflight/pull/7271)）；
- 使用 D\_min 的 D 项管理（[#7373](https://github.com/betaflight/betaflight/pull/7373)、[#7538](https://github.com/betaflight/betaflight/pull/7538)）；
- 基于油门的动态陀螺仪和 D 项滤波（[#6943](https://github.com/betaflight/betaflight/pull/6943)）；
- 起跑控制（[#6992](https://github.com/betaflight/betaflight/pull/6992)）；
- 可切换 OSD 配置文件（[#6714](https://github.com/betaflight/betaflight/pull/6714)）；
- SPI 连接的 Spektrum 接收机（[#7210](https://github.com/betaflight/betaflight/pull/7210)）；
- Unified Targets（[#5824](https://github.com/betaflight/betaflight/pull/5824)、[#6837](https://github.com/betaflight/betaflight/pull/6837)、[#7620](https://github.com/betaflight/betaflight/pull/7620)）。

## 次要功能

- 级联动态陷波滤波器（[#7078](https://github.com/betaflight/betaflight/pull/7078)）；
- 推力线性化（[#7304](https://github.com/betaflight/betaflight/pull/7304)）；
- 积分偏航控制（[#6432](https://github.com/betaflight/betaflight/pull/6432)）；
- 可切换的 LED\_STRIP 配置文件（[#7303](https://github.com/betaflight/betaflight/pull/7303)）；
- OSD 摇杆叠加显示（[#7167](https://github.com/betaflight/betaflight/pull/7167)）；
- 按电池节数切换配置文件（[#7516](https://github.com/betaflight/betaflight/pull/7516)）；
- 每个配置文件可限制最大电机输出（[#7482](https://github.com/betaflight/betaflight/pull/7482)）；
- 支持 CC2500（FrSky SPI）硬件上的 Futaba SFHSS 协议（[#6865](https://github.com/betaflight/betaflight/pull/6865)）；
- FrSky SPI 接收机的 EU LBT 模式（[#7339](https://github.com/betaflight/betaflight/pull/7339)）；
- 支持基于 STM32F765xx 的飞控（[#6669](https://github.com/betaflight/betaflight/pull/6669)）；
- 通过 HoTT 遥测进行配置（[#6224](https://github.com/betaflight/betaflight/pull/6224)）。
