---
sidebar_position: 3
sidebar_label: 4.5 发行说明
---

# 4.5 发行说明

Betaflight 4.5 是一次增量发布。4.4 升级至 4.5 后，基础飞行参数没有变化，只是对 iTerm 的抑制略有改善。通常无需更改原有的滤波器、PID 设置或其他调校值。

:::note
重要提示：请使用 Configurator 10.10。最新正式版可从[此处](https://github.com/betaflight/betaflight-configurator/tags)获取，也可使用[在线应用](https://app.betaflight.com)。
:::

与往常一样，刷写时必须执行 Full Chip Erase（完整芯片擦除）。从头重新配置比导入 CLI dump 或已保存的 Preset 更安全。GPS Rescue、Angle 和 Horizon 模式用户**不得**沿用旧参数。除此以外，大部分飞行、Rx、模式、OSD 与 GPS 参数自 4.4 起未改变。新增或更名参数会采用默认值，因此大多数情况下可导入 4.4 保存文件（Presets > Save）。

若构建中包含 `OSD_HD` 选项，完整擦除后，所有相关 OSD 设置值均适用于高清图传。模拟图传用户应在 Configurator 的 OSD 选项卡中将 Video Format 设为 Auto、NTSC 或 PAL，然后保存。若构建仅包含 `OSD_SD`，完整擦除后将默认使用模拟 OSD 设置。

:::note
若使用带 HD OSD 的数字 VTX，且 OSD 元素或整个 OSD 未显示，请在 CLI 中输入 `set displayport_msp_fonts = 0,0,0,0`，再输入 `save`。这会禁用多页字体，直至所用 VTX 获得支持。
:::

:::warning
Angle、Horizon 和 GPS Rescue 用户在 4.5 中**不得**使用旧参数，请从 4.5 的新默认值开始。

不要将 4.3 或更早版本的 dump 或 Preset 用于 4.5。

务必在受控环境中仔细测试新固件。
:::

## 内容

- [云构建](#1-cloud-build)更简单、更可靠，也更完善。
- [GPS 硬件连接](#2-gps)大幅改进，并为 M10 提供可靠支持。
- [GPS 返航](#3-gps-return-to-home-improvements)更可靠、更平顺，可更早触发，对用户错误的容忍度更高，并能更有效地利用磁力计数据。
- [磁力计](#4-magnetometer-update)的工作效果明显提升；Wiki 说明、校准方式、磁偏角支持及 Configurator 显示均已改进。它现在可在 GPS Rescue 的爬升、转向和下降阶段有效参与控制。
- [Blackbox 中的 GPS 航迹绘制](#5-mapping-of-gps-flights-within-blackbox-explorer-and-with-export-gpx)可直接在 Blackbox 应用中查看 GPS 航迹，或将飞行数据导出为 GPX 文件以供在线地图软件使用。
- [受支持 HD VTX 的彩色字体](#6-colour-fonts-in-supported-hd-vx)目前仅适用于 Walksnail HD VTX。
- [LED 灯条改进](#7-led-strip-improvements)，包括按 VTX 频道自动选择颜色、更多彩虹效果选项，以及更高效的复杂 LED 效果 CPU 占用。
- [Angle 和 Horizon 更新](#8-angle-and-horizon-mode-update)改动很大。Angle 模式响应更快；新的“地球参考”选项会在偏航时自动加入恰当的协调滚转，以保持画面稳定。Horizon 模式的飞行体验更好，也是进入 Acro 的优秀过渡。
- [失控保护变更](#9-failsafe-changes)改动较小，主要提高边缘场景的安全性；`RX_LOSS` 消息略有调整，且当解锁开关仍开启而无线链路恢复时，`NOT_DISARMED` 会替代 `BADRX`。
- [可调强度的 RPM 谐波](#10-dimmable-rpm-harmonics)可在三个 RPM 滤波器中单独降低某一谐波的权重。当其中一个滤波器不如另外两个重要时，可略微减少整体滤波延迟，尤其适用于三叶桨配置。
- [可调的动态怠速初始值](#11-customisable-initial-dynamic-idle-percentage)可在已启用动态怠速但尚未起飞时调整初始电机驱动百分比，以应对默认 5% 过低或过高的情况。
- [EzLanding](#12-ezlanding)会在低油门且摇杆回中时限制 PID 响应，减轻降落时的激烈反应。
- [低油门 TPA](#13-low-throttle-tpa)可在油门行程极低端应用 TPA 衰减，适用于在地面等待时反应过于活跃的四轴飞行器；也可选择在整个飞行过程中生效。
- [通过 CLI 绑定 TBS Rx](#14-crsf-binding-via-cli-for-tbs-receivers)，在难以按到 Bind 按钮时尤其有用。
- [改进固定翼着陆](#19-other-changes-and-fixes)：固定翼零油门滑翔着陆时，iTerm 现在仍保持启用。
- [变更 Soft Serial 引脚分配 CLI 命令](#15-changed-soft-serial-pin-assignment-cli-command)：请使用 `RESOURCE SOFTSERIALTX 1 <pin>`，而非 `RESOURCE SERIALTX11 <pin>`。
- [自定义构建选项](#16-custom-build-options)：
  - [RACE_PRO](#161-race-pro-build-option)：包含 RPM Limiter、Quick OSD、RC Stats、Pre-arm 页面，并修改少量默认设置。
  - [RPM Limiter](#162-rpm-limiter-build-option)：限制最大平均 RPM，适用于规格赛。
  - [Quick OSD](#163-quick-osd-menu-build-option)：增加一个 OSD 页面，可在一处完成大部分比赛相关调整。
  - [RC Stats](#164-rc-stats-osd-build-option)：修改统计页面，加入油门汇总数据。
  - [Pre-Arm 页面](#165-pre-arm-spec-race-settings-osd-build-option)：解锁前页面，用于显示规格赛相关数值。
  - [GPS 圈速计时器](#166-gps-lap-timer)：想在公园绕圈并计时，又不想增加复杂硬件？增加 GPS 模块即可实现。
- [Blackbox 更新](#17-blackbox-and-logging-updates)：默认记录 RPM 与滤波前陀螺仪数据，支持 8 通道调试数据，并提供出色的 GPS 航迹绘制选项。
- [其他改动](#19-other-changes-and-fixes)：分集接收时 RSSI 现显示为 `dBm:channel`；Launch Control 始终包含；DShot Telemetry 独立于 RPM Filtering；增加 Extended DShot Telemetry、kaaak 及许多其他小改进和修复。

## 1. 云构建

[4.4 引入](/docs/wiki/release/Betaflight-4-4-Release-Notes#1-cloud-build)的云构建系统保留相同用户界面，但新增许多改进。更新后的目标板配置应使刷写后的功能更加可靠。

大部分基础构建选项均位于 `Other Options box` 的默认分组中，包括 AcroTrainer 以及 HD、SD 两种 OSD 配置。

默认 Radio Protocol 为 CRSF，它会自动包含 RF telemetry（即使 Telemetry 下拉框显示为“none”）。

通常，只使用 HD 的用户应取消选择 SD OSD，反之亦然。

大多数用户不需要 Acro Trainer 或 Pin IO，因此可取消选择它们。

若要添加其他构建选项，例如其他无线协议、LED Strip、Magnetometers 等，请单击 `Other Options` 框内任意位置，然后从下拉菜单选择。

感谢：@blckmn、unit、haslinghuis，以及其他许多贡献者

## 2. GPS

Betaflight 与 GPS 模块的连接代码已全面重构。对于绝大多数用户，模块数据会更可靠，因为我们会重新配置模块，使其仅在需要时发送所需数据，而不发送其他内容。这可降低 MPU 负载并提高可靠性。

:::note
某些在 4.4 中“可用”的 GPS 模块在 4.5 中可能完全无法工作，通常是因为模块不响应标准 UBlox 自动配置请求。关闭自动配置后，这类模块也许能在 4.5 中“工作”，但可靠性通常不及可配置模块。建议改用更新、更好的 M10 GPS 模块，或通过 uCenter 或 pyGpsClient 将模块恢复默认设置，使其可接受外部配置请求。
:::

FC 启动时，自动配置代码会依次尝试允许的 GPS 串口波特率，直至成功连接。随后，固件会要求模块将波特率改为用户设定值，默认值为 57600，并以该波特率重新连接。之后会识别 GPS 模块“类别”（M10、M8 等），以确定其可响应的配置请求；再将模块配置为仅发送所需值（nav_pvt 消息），不发送其他数据。这样可将串口流量降至满足需求的最低程度。

若 FC 已连接 Configurator，固件还会请求完整卫星信息列表，以填充 Configurator GPS 选项卡左侧的详细卫星列表。否则不会请求这些飞行时不需要的信息，以避免增加大量串口流量。

GPS 数据的 CPU 成本与任务时序已经过广泛审查和优化。即使如此，GPS Rescue 仍会给 CPU 带来很大负载。为提高可靠性，大多数处理器最好使用 4k PID loop，尤其是 57600 波特率时。有关 CPU 负载与波特率的更多信息，请参阅 [GPS Rescue 文档](/docs/wiki/guides/current/GPS-Rescue)。在评估波特率对 PID loop 频率的影响时，可使用 CLI `tasks` 命令检查 CPU 使用率和任务超时。

可通过 CLI `status` 命令检查 UBlox 模块“类别”及其实际连接波特率。

新增 `GPS_CONNECTION` debug，其中包含多个字段，可用于排查连接过程中的 GPS 任务波特率、CPU 成本以及持续运行时间和间隔。

请注意，GPS 模块必须与 FC 同时上电，才能被正确配置。

NMEA 支持现在非常有限，不建议使用 NMEA。强烈建议使用带备用电池的现代 M10 GPS 模块。

使用 M8 或更新 UBlox 模块的用户通常无需以任何方式（例如通过 uCenter）定制模块，除非模块异常锁定且不响应常规 UBlox 配置命令。它们原则上都应“开箱即用”。

Configurator 的 GPS 页面已大幅改进，地图更清晰，卫星信息显示也更简洁、更相关。

感谢：unit(freasy)、ctzsnooze、ledvinap、SteveCEvans、rabbitAmbulance、haslinghuis

## 3. GPS 返航改进

4.5 明确致力于让 GPS Rescue 比 4.4 更可靠、更精确，并实施了许多重要变更与改进。

任务时序经过仔细优化。

注意：大多数标准 F4xx GPS Rescue 构建的 looptime 不应超过 4k，以保证有足够时钟周期正确分析和处理全部所需传感器数据。

在 4.4 中，若触发 GPS Rescue 时因风导致明显漂移，且经历较长爬升阶段，四轴飞行器可能误以为自己正沿漂移方向机头朝前飞行。这会使初始偏航修正错误，飞行器可能高速飞往错误方向。数秒后它会修正，但会以很大的弧线回到正确航向。4.5 通过专门代码避免基于漂移的误差，显著改善了这一问题。

4.4 中固定翼难以确定正确箭头位置；4.5 已大幅改进。

磁力计代码已进行了大量检查与优化（详见后文），现在与 GPS Rescue 的集成效果很好。

在 4.5 中，只要磁力计方向正确、已配置并校准，且已确认能返回可靠航向信息，四轴飞行器在触发救机时应能正确转向，并且无论漂移如何都直接指向返航点。这会显著提高有风天气下救机的安全性。

4.4 中，若有风天气经历较长下降阶段，四轴飞行器可能飞越返航点，然后需逆风转 180 度返回，导致快速螺旋下降和硬着陆。4.5 中该问题应明显减少，因为飞越返航点后，偏航航向尚未大致修正前，飞行器不会开始前倾。正确安装、配置并验证的磁力计会改善有风天气下降阶段的航向控制。

只要飞行器高于最小允许触发高度，4.5 中可在返航点正上方直接触发 GPS Rescue，例如目视飞行的紧急情况。此时四轴飞行器会爬升、飞至最小距离、掉头返回返航点，并从该处进入正常救机流程。该功能仅应用于紧急情况，因为初始航向较难预测，主要取决于之前的漂移方向和速度。

Sanity Check 现在侵入性略低，除绝对必要时外不太可能触发。尤其是触发位置过近时，飞行器会以“无操作”模式缓慢下降，直至落地或用户重新接管控制。

Configurator 的 GPS 页面已更新，提供更有用的卫星列表，并显示磁力计航向信息。

已修复一个边缘问题：当 Rx 链路在易受影响的时机初始化且 GPS Rescue 设为忽略返航点时，电机可能升转。

更多信息请仔细阅读 [GPS Rescue 4.5 文档](/docs/wiki/guides/current/GPS-Rescue)。

感谢：ctzsnooze、ledvinap、SteveCEvans、Zzyzx、haslinghuis

## 4. 磁力计更新

磁力计现在工作得非常好，但绝对**不是**即插即用。用户需要仔细阅读文档，必须正确安装和校准磁力计，并且无论四轴飞行器处于何种方向，都必须验证其返回的航向正确（例如与手机指南针比较）。这项工作颇具挑战，但完成后很有价值。

相关代码已大幅修订，指南针任务调度和驱动支持均有明显改进。

此前，指南针任务以 10 Hz 运行，但其状态机使新的磁力计数据只能以一半或三分之一的频率到达。

在 4.5 中，指南针数据以芯片支持的最高速率接收。以 QMC5883L 为例，其速率为 200 Hz；较旧的 HMC5883L 为 80 Hz。这大幅提升了校准过程的精度，并减少数据延迟问题。

最大的改进在于校准过程。此前代码的结果几乎像随机数发生器；现在校准效果更好，可得到一致结果。

现在可在 CLI 中使用 `set mag_declination` 输入当地磁偏角值，更好地将磁北修正为真北。

Configurator 现会在 GPS Rescue 选项卡中显示 Mag Heading，并旋转地图图标以反映 Mag Heading（地图仅会在获得 3D fix 后出现）。

新的[详细说明](https://betaflight.com/docs/wiki/guides/current/Magnetometer)介绍了磁力计的工作方式、安装方向与方向校验、校准和校验方法，以及如何在 CLI 中设置正确磁偏角等。

用户现在可以配置磁力计，并确认其正常工作。

请注意，磁力计必须尽可能远离电机和大电流导线安装，否则数据噪声会极大，几乎无法使用。在 5 英寸四轴飞行器上获得干净磁力计数据相当困难。

重要提示：启动校准后，必须用力“轻敲”四轴机架，才会开始 30 秒数据采集期。此设计是为了让用户有时间准备采集数据。必须在启动校准后 15 秒内完成轻敲；若未检测到轻敲，则旧值不会更新。

新增 `MAG_CALIB` 和 `MAG_TASK_RATE` debug，用于调查校准和调度问题。

在 GPS Rescue 中使用磁力计前，请仔细阅读[说明](/docs/wiki/guides/current/Magnetometer)并充分测试。请注意，GPS Rescue 当前默认使用磁力计。若不能 100% 确认磁力计正常工作，请不要使用它。

感谢：pichim、ctzsnooze、SteveCEvans、ledvinap

## 5. 在 Blackbox Explorer 中绘制 GPS 航迹及导出 GPX

为已生成含 GPS 数据日志文件的 GPS 用户提供两项出色的地图功能。

打开含 GPS 数据的日志文件时，`Export GPX` 会在 BBE 窗口顶部启用 `Export GPX` 按钮。导出的 `.gpx` 文件可导入 [gpxStudio](https://gpx.studio) 等在线地图软件，在地图上绘制飞行航迹。

详细说明视频见[此处](https://www.youtube.com/watch?v=dhgQ8aPUq_U)。
更多信息请参阅 [PR 614](https://github.com/betaflight/blackbox-log-viewer/pull/614)。

`Within BBE GPS Mapping` 会在 Blackbox Explorer 中显示一个较小的简易地图。要打开地图，只需单击常规 Blackbox 页面顶部菜单图标 `Overlay` 分组中的显示/隐藏地图图标。

当光标沿日志文件移动时，四轴飞行器位置会在地图上同步移动。彩色轨迹可显示高度（请通过 BBE 设置中的“齿轮”图标配置）。

更多信息请参阅 [PR 613](https://github.com/betaflight/blackbox-log-viewer/pull/613)。

两项功能均感谢：bonchan

## 6. 受支持 HD VTX 的彩色字体

兼容 HD VTX 模块（如 Walksnail）现支持白、绿、橙、红四种文字和符号颜色。

参见：[PR 13005](https://github.com/betaflight/betaflight/pull/13005)

感谢：SteveCEvans

## 7. LED 灯条改进

### 7.1 根据 VTX 频道自动设置 RACE 模式 LED 灯条颜色

RACE LED Strip 模式是一种将所有 LED 设置为固定颜色的简易方式。

在 4.5 中，LED Strip 颜色可按用户 VTX 频道自动设置。输入 `set ledstrip_profile = RACE` 和 `set ledstrip_race_color = BLACK`（禁用固定颜色）即可启用。VTX 应使用 RaceBand 频率。R1 至 R8 对应的颜色应分别为白、红、橙、黄、绿、蓝、紫、粉。

RACE `ledstrip_profile` 启用时，会忽略 LED 控制页面设置。使用 `set ledstrip_profile = STATUS` 可恢复常规功能。

更多信息请参阅 [PR 13096](https://github.com/betaflight/betaflight/pull/13096)。

感谢：cruwaller

### 7.2 LED 灯条彩虹颜色效果更新

Configurator 已增加对 Rainbow LED Strip 效果的支持。它现在可与 Larson/Blink 效果同时使用。
现在可通过滑块调整灯条亮度、颜色增量和 Rainbow 效果频率。

参见：[PR 12323](https://github.com/betaflight/betaflight/pull/12323)、[PR 12995](https://github.com/betaflight/betaflight/pull/12995)

感谢：ASDosjani

### 7.3 使用复杂 LED 灯条效果时降低 CPU 影响

Rainbow 和 Larson scanner 等复杂效果可能消耗大量 CPU 时间，尤其是在 LED 数量很多时。Steve C Evans 再次协助将每个 CPU 周期的任务时间限制为约 20uS。此前 Rainbow 效果可能消耗超过 100uS，在 8k8k 及部分 8k4k 构建中引发问题。

启用复杂 LED 模式前后，请始终通过 CLI `Tasks` 命令检查，确认它们不会占用过多 CPU 或导致任务超时。

RACE 或 BEACON 等简单 LED Strip 功能仅需 5-6uS。

参见：[PR 13218](https://github.com/betaflight/betaflight/pull/13218)

感谢：Mr. Steve

## 8. Angle 和 Horizon 模式更新

Angle 和 Horizon 模式与 4.4 完全不同。

由于 `angle_feedforward`，Angle 模式响应快得多。过去会导致振荡的高 Angle P 值不再需要。在不会振荡的 P 值下，对摇杆输入的响应会明显更快，因此无需再使用很高的 Angle P。

Angle 模式现在使用用户的 RC Rate 设置决定摇杆手感，便于过渡到 Acro 或 Horizon。Angle 不再通过旧的 angle expo 命令使用专属摇杆配置。Angle 模式用户可使用 Rates Profiles 保存最多四套不同的 Rate 配置，在飞行中切换。Angle 模式的中心灵敏度值显示在 Configurator Rates Graph 的右下角。有关 Rate 设置的更多信息，请参阅 [PR 12231](https://github.com/betaflight/betaflight/pull/12231)。

Angle 模式的手感会与以前明显不同，一方面是摇杆响应更快，另一方面是 Rate 曲线方法完全不同。重新配置后，新方法可使过渡到 Horizon 和 Acro 更平顺。

Angle 模式现在默认采用“地球参考”。这意味着在前倾时进行纯偏航摇杆输入，会产生完全协调的转弯。Chris Rosser 编写的此代码会混入恰当的滚转量，使相机中的地平线保持“水平”。它还会在 Angle 模式快速偏航输入时帮助稳定四轴飞行器，并改善 GPS Rescue。

在 Angle 模式中，滚转输入始终会增加额外滚转；若飞手希望如此，相机内的“地平线”也会相应倾斜。

可使用 `set angle_earth_ref = 0` 禁用地球参考行为，或使用 `set angle_earth_ref = 50` 将其强度减半。Whoop 赛车手可能更偏好禁用它；但大多数新手，以及使用 Angle 模式进行电影感拍摄的用户，应会觉得它非常有用。

由于滤波重构与优化，Angle 和 Horizon 模式的电机控制现更平顺，可降低电机温度和相机果冻效应。

Horizon 模式已大幅调整：当摇杆回中且四轴飞行器接近水平时，它提供自稳；当摇杆角度较大或飞行器姿态倾斜明显时，则像 Acro 一样飞行。在摇杆处于中心区域且飞行器近乎水平时，“自稳”强度可按飞手喜好设得很强或很柔和；也可调整停止自稳时的机架角度。默认设置下可完成翻滚和横滚，甚至可倒挂，因为默认在完全倒置时存在“空值”或“无自稳”区域（与 Acro 相同）。请谨慎操作，并享受飞行。

更多信息和配置片段示例请参阅 [PR 12231](https://github.com/betaflight/betaflight/pull/12231)。

感谢：ChrisRosser、ctzsnooze、ledvinap、haslinghuis

## 9. 失控保护变更

Rx 丢失时的 failsafe 指示略有不同，并修复了一些安全相关问题。

若 100ms 无有效数据触发 `RXLOSS`，该消息会在 OSD 中至少显示 1.0s，而非立即清除。这与 Rx 丢失后的解锁阻止机制一致：即使只是短暂失联，默认也会持续 1.0s。

该改动可防止一种潜在危险的解锁条件：GPS Rescue 已启用且解锁时 Rx 信号不可靠，或用户解锁后快速上锁。

此外，信号恢复后，`failsafe_recovery_delay` 时间现在为 500ms，因此信号恢复后的恢复速度比以前快一倍。

最后，`BADRX` OSD 消息现改为 `NOT_DISARMED`。当 Rx 信号已恢复或刚被检测到，但解锁开关仍保持在 Armed 位置时，会出现该消息。新消息可更清楚地提示用户：信号丢失后尝试再次解锁前，必须先上锁。

更多信息请参阅 [PR 13033](https://github.com/betaflight/betaflight/pull/13033)。

感谢：ctzsnooze

## 10. 可调强度的 RPM 谐波

此功能允许用户分别调整三个 RPM 滤波器的“强度”或“权重”。权重为 100 时，滤波器以完整强度工作；0 表示“完全关闭”。RPM 滤波器的 Q factor 仍用于设置每个滤波器的“宽度”。

使用三叶桨时，通常会出现三个由电机频率产生、且随 RPM 变化的噪声谐波：

- 第一谐波的频率与电机频率（Hz）相同，通常最强；
- 第二谐波的频率是电机频率的两倍；
- 第三谐波的频率是电机频率的三倍。

在许多三叶桨情况下，通常可看到三个谐波。第一谐波一般最强，第二谐波几乎不可见，第三谐波略弱于第一谐波。

记录 Blackbox 日志后，可将每个谐波的相对强度可视化。可比较来自未滤波陀螺仪的油门-频率或 RPM-频率频谱图与“已滤波”陀螺仪。通常，采用默认滤波时，三个谐波都会被强烈衰减。

使用三叶桨时，第二谐波通常只需很少的滤波，即可将其噪声贡献降到可接受水平。第三谐波所需滤波可能少于第一谐波。

例如，可使用 `set rpm_filter_weights = 100, 0, 80`。这会实际禁用第二谐波，并将第三谐波的滤波强度设为常规强度的 80%。此前无法选择性移除第二谐波滤波器，现在则可以。通过在日志中检查最终结果，可只使用实际需要的 RPM 滤波量。

相较于以完整强度运行全部三个滤波器，主要好处是可减少滤波延迟，并可能改善桨流抖动。

使用双叶桨时，通常只会出现第一谐波和较弱的第二谐波。`set rpm_filter_weights = 100, 80, 0` 可能得到可接受结果。

请注意，Q factor 设置 RPM 滤波器的“宽度”，同一数值适用于每个滤波器。

这是高级调校选项，因为来自未滤波陀螺仪频谱的电机噪声有时看似可接受，但滤波后陀螺仪中少量残留电机噪声可能在下游 Dterm 中产生很大影响。因此建议使用 PID Toolbox 的频率 PSD 频谱图，或在 Blackbox Log Viewer 中从 D 值或电机轨迹生成频谱。理想状态是 RPM 滤波刚好足够，使电机谐波线在 D 或电机轨迹频谱中刚好不可见。

如有疑问，在为三叶桨精调 RPM 滤波器时，建议启用全部 3 个 RPM 滤波器，先逐步将 Q 从默认 500 提高到最多 1000，使三个 RPM 滤波器均变窄，并在每一步检查噪声。之后可用此功能分别降低第二、第三谐波权重，再评估其对总体噪声的影响。

更多信息请参阅 [PR 12838](https://github.com/betaflight/betaflight/pull/12838)。

感谢：karatebrot、mikeNomatter、SupaflyFPV、bw1129

## 11. 可自定义的动态怠速初始百分比

解锁后、Airmode 激活前，动态怠速处于工作状态，但允许的最大油门增加量受限。此前该限制为 5%。4.5 仍默认使用原来的 5%，但现在可在 CLI 中通过 `dyn_idle_start_increase` 参数将限制设为更高或更低的值。数值 50 表示 5%。

若启用动态怠速后，电机在解锁时需要较高怠速才能正常转动，可使用较高值；反之，若大电机在较低怠速百分比下已能正常转动，则可降低该值。

更多信息请参阅 [PR 12432](https://github.com/betaflight/betaflight/pull/12432)。

感谢：tbolin

## 12. EzLanding

这是一个新开发的仅 CLI 功能，即使已启用 Airmode，也可降低着陆反弹。其方法是在低油门且摇杆回中时限制 Airmode 可增加的油门量，并衰减 iTerm。

EzLanding 默认禁用。

- 启用：在 CLI 中输入 `set mixer_type = EZLANDING`。
- 恢复常规行为：在 CLI 中输入 `set mixer_type = LEGACY`。

有两个调校参数：

- `ez_landing_limit`：默认值 5，范围 0-75。在摇杆回中、油门为零时，Airmode 允许增加的最大油门百分比。更高数值可在停落物体或平落时提供更多稳定性；较低数值可降低落地反弹。
- `ez_landing_threshold`：默认值 25，范围 0-200。摇杆偏转达到此百分比时，Airmode 可完全调整油门；向中心区域则线性衰减。

当摇杆回中且油门为零时，EzLanding 效果最强。在这些条件下，PID 稳定能力会略有下降。若要保留更多稳定性，例如尝试停落在物体上，或进行平落、倒置零油门下落，请在动作中保留极少量油门。

更多信息请参阅 [PR 12094](https://github.com/betaflight/betaflight/pull/12094)。
Debug：`set debug_mode = EZLANDING`

感谢：tbolin

## 13. 低油门 TPA

允许用户在油门范围低端应用 TPA 衰减。对于调校激进的四轴飞行器，这有助于避免低油门时过度的 D 抖动。

阈值或断点由 `tpa_low_breakpoint` 设置，零油门时的衰减量由 `tpa_low_rate` 设置。`tpa_low_rate` 默认值为 20，表示零油门时 D 减少 20%，即 PID 中 D 的作用为正常值的 80%。

默认行为是仅在解锁后短暂应用该衰减。油门一旦高于 `tpa_low_breakpoint`，TPA lower 会在本次解锁期间剩余时间内失效。

因此，默认情况下它对解锁只有极小影响，对飞行无影响。

若要在飞行中低油门时启用 TPA 衰减，请使用 `set tpa_low_always = ON`。此后油门低时 TPA 都会进行衰减。

更多信息请参阅 [PR 13006](https://github.com/betaflight/betaflight/pull/13006)。

TPA low CLI 变量的更名说明见 [PR 13206](https://github.com/betaflight/betaflight/pull/13206)。

感谢：pichim

## 14. 通过 CLI 绑定 TBS 接收机的 CRSF

用户可在 CLI 中输入 `bind_rx` 来启动 TBS 接收机的绑定，无需拆开四轴飞行器去按绑定按钮。若成功，CLI 会输出 `binding...`，Rx 会开始闪烁绿色 LED，表示已进入绑定模式。

更多信息请参阅 [PR 13119](https://github.com/betaflight/betaflight/pull/13119)。

感谢：@Auster

## 15. 变更 Soft Serial 引脚分配 CLI 命令

在 Betaflight 4.5 及更高版本中，Soft Serial 引脚分配必须使用形如 `RESOURCE SOFTSERIALTX 1 <pin>` 的 CLI 命令。

| 新命令 | 旧命令 |
| --- | --- |
| `RESOURCE SOFTSERIALRX 1 <pin>` | `RESOURCE SERIALRX11 <pin>` |
| `RESOURCE SOFTSERIALTX 1 <pin>` | `RESOURCE SERIALTX11 <pin>` |
| `RESOURCE SOFTSERIALRX 2 <pin>` | `RESOURCE SERIALRX12 <pin>` |
| `RESOURCE SOFTSERIALTX 2 <pin>` | `RESOURCE SERIALTX12 <pin>` |

最多可启用两个 Soft Serial 端口。更多信息请参阅 [SoftSerial 指南](/docs/wiki/guides/current/SoftSerial)。

:::note
若将定义了 Soft Serial 引脚的 4.4 或更早版本 diff 文件复制到 4.5 中，会出现错误。需要在 CLI 中使用新命令重新定义这些引脚。
:::

感谢：DieHertz

## 16. 自定义构建选项

这些附加代码块仅会在刷写到 FC 的固件构建中包含它们时可用。它们是可选项，原因是仍在开发中，或仅满足小部分用户需求。若未来足够流行，可能会并入主代码；当前仍属于自定义构建选项。

制作在线构建时，请在 Custom Defines 字段中添加构建选项名称。可包含多个选项，并以空格分隔，例如 `OSD_QUICK_MENU RC_STATS`。

:::note
在本机终端构建时，构建选项必须加 `DUSE_` 前缀。云构建不需要该前缀。
:::

以下构建选项在 4.5 中新增：

### 16.1 RACE PRO 构建选项

可在 Firmware Flasher 选项卡的 “Other Options” 下拉菜单选择 `RACE_PRO`，也可在 “Custom Defines” 字段中输入它。该选项包含以下功能（后文会详细说明）：

- RPM Limiter
- Quick OSD Menu
- RC Stats
- Pre-Arm Spec Screen
- 部分固件默认设置变更

![RACE_PRO option](/img/race_pro.png)

`RACE_PRO` 会调整部分默认设置，省去手动调整步骤，使其更适合赛车手：

- 将 `small_angle` 设为 180（默认值为 25），允许无人机以任何角度或朝向解锁。
- 当配置到开关时启用 DShot 电机蜂鸣器。
- 将 `failsafe_recovery_delay` 从默认值 5 降至 1，失控保护后可更快恢复（100ms），尤其适用于团队竞赛场景。
- 修改飞行后统计页面的默认设置。

:::warning
不建议新手使用 `RACE_PRO`，因为某些 `RACE_PRO` 默认设置通常安全性较低。在将其加入固件构建前，建议完全理解 `RACE_PRO` 的所有变更。
:::

### 16.2 RPM Limiter 构建选项

该功能将最大平均 RPM 限制为用户指定值，主要用于标准化规格赛中的四轴飞行器性能。

RPM Limiter 会主动限制所有活动电机的平均 RPM。例如，`set rpm_limit_value = 13000` 会将平均 RPM 限制为 13000。

使用相同螺旋桨和重量比赛时，RPM limiter 可用于平衡竞技条件。

它还可用于比较螺旋桨和电流消耗，例如检查全油门 GPS 速度或圈速（适用于专业赛车手）。

:::note
RPM_LIMIT *不是* motor limit 的替代品，因为它不单独限制每个电机。但 RPM limit 可与 motor limit 结合，用于高 KV、高电压配置。
:::

使用方法：

- 构建时在 Custom Defines 中包含 `RPM_LIMIT`；
- 正确设置 `motor_kv`；
- 确保电机磁铁数量正确；
- 确保 DShot telemetry 已启用；
- 在 CLI 中设置合适的 RPM limit 值；
- 通过 CLI 中的 `set RPM_LIMIT` 设为 on 或 off，或使用 Quick menu 启用或禁用。

可通过调校 RPM_LIMIT PID 来调整 RPM limit 控制功能的精度（仅限高级用户）。

更多信息请参阅 [PR 12977](https://github.com/betaflight/betaflight/pull/12054)。

该功能包含在 `RACE_PRO` 选项中。

感谢：Tdogb、Limonspb、karatebrot

### 16.3 Quick OSD Menu 构建选项

此自定义构建选项会向 OSD 添加“快捷菜单”。对于需要方便配置和显示油门、RPM 限制的规格赛赛车手尤其有用。

使用方法：构建时在 Custom Defines 中包含 `OSD_QUICK_MENU`，然后在 CLI 中输入 `set osd_use_quick_menu = ON`。

更多信息请参阅 [PR 12977](https://github.com/betaflight/betaflight/pull/12977)。

该功能包含在 `RACE_PRO` 选项中。

感谢：limonspb

### 16.4 RC Stats OSD 构建选项

此自定义构建选项会将飞行油门统计信息（如 100% 油门时间和平均油门）添加到飞行后统计页面。

使用方法：构建时在 Custom Defines 中包含 `RC_STATS`。

更多信息请参阅 [PR 12978](https://github.com/betaflight/betaflight/pull/12978)。

该功能包含在 `RACE_PRO` 选项中。

感谢：limonspb

### 16.5 解锁前规格赛设置 OSD 构建选项

此自定义构建选项为赛车手，特别是规格组赛车手，增加专用“prearm”OSD 页面，以便飞手和比赛组织者共同核对设置。

OSD 会显示：

- RPM limit 设置；
- 油门限制；
- 电机限制；
- 电流与电压；
- Betaflight 版本。

解锁后该页面会消失。它尤其有助于规格赛赛车手与赛事组织者核对设置。

使用方法：构建时在 Custom Defines 中包含 `SPEC_PREARM_SCREEN`，再使用 `set osd_show_spec_prearm = ON` 启用。

更多信息请参阅 [PR 13210](https://github.com/betaflight/betaflight/pull/13210)。

该功能包含在 `RACE_PRO` 选项中。

感谢：limonspb

### 16.6 GPS 圈速计时器

此自定义构建选项允许用户定义起始门，飞行一条“赛道”并穿过“门”返回；OSD 会显示当前圈速、上一圈和最快三圈。飞行结束时，OSD 会显示最佳圈速以及最佳三圈的时间。请观看此[视频](https://www.youtube.com/watch?v=TA5cWwFafY4)。

固件构建需包含 GPS，并且 GPS 模块的信号接收必须足够好，即使四轴飞行器有较大倾角时也能追踪位置。基础配置包括：将相关字段加入 OSD 显示，并在 Modes 中为开关启用 “Lap Timer Reset”。到达场地后，将四轴飞行器放在起终点门位置，激活 `MISC/GPS LAP TIMER/SET POSITION`，直至确定门位置。可调整门的“tolerance”或“size”；当其他门靠近主起终点门时，也可通过最小圈速避免误触发。选择 `Save Exit` 保存设置，然后开始绕圈。

最小圈速和门尺寸会在更换电池时保留（？），但每块电池可能都需要重新设置起终点门（？）。使用带电池备份的 M10 GPS 时，新位置应很快被检测到；但为获得最佳结果，请等待 GPS 位置稳定后再锁定门位置。

使用方法：构建时在 Custom Defines 中包含 `GPS_LAP_TIMER`，并观看[视频](https://www.youtube.com/watch?v=TA5cWwFafY4)了解详细设置、使用说明和技巧。

更多信息请参阅 [PR 11856](https://github.com/betaflight/betaflight/pull/11856)。

感谢：SpencerGraffunder

## 17. Blackbox 和日志更新

现在默认记录未滤波陀螺仪和 RPM 数据。在 Blackbox Log Explorer 中对滤波前、后噪声进行基础频谱分析时，不再需要启用 `gyro_scaled` debug。最新版 PID Toolbox 可直接读取此未滤波陀螺仪数据；但如果所用软件需要 `gyro_scaled`，仍请照常设置。

Blackbox 现在支持每个 debug 记录 8 个数据通道。虽然并非所有 debug 都已更新以利用此功能，但它对开发非常有帮助。

Configurator 的 Sensors Tab 也可将全部八个 Debug 值以图形显示，并正确命名。

新增多项 debug，其在 Blackbox 中的显示应正确。

Blackbox GPS Map 显示和 GPX 导出可支持外部 GPS 地图，提供出色的地图功能。

感谢：Zoggbarr (tbolin)、bw1129、ctzsnooze、karatebrot、McGiverGim、bonchan

## 18. 硬件支持

随着与制造商合作的改善，我们能够响应用户反馈，并改进许多板卡的 target config。我们积极推动良好的设计原则，并努力确保新配置可靠工作。

已添加以下硬件支持：

- AT32 CPU：请注意，目前只能定义一个 ADC 引脚，可能仍有其他小问题；
- ICM-42688-P IMU；
- LSM6DSV16X IMU；
- LPS22DF Baro；
- H725 CPU（请谨慎测试）。

ICM-42688-P 和 ICM-42605 已加入支持溢出检测的陀螺仪列表。

还实施了多项 H7 改进与修复。

感谢：SteveCEvans、unit(freasy)、blckmn、karatebrot、sugark、haslinghuis、tbolin、belrik、bkleiner

## 19. 其他变更与修复

- Configurator：haslinghuis（我们的 Configurator 专家）、nerdCopter、HThuren、VitroidFPV、McGiverGim、chmelevskij、ASDosjani、stoneman、flaviopinzarrone、lipskij、blckmn、limonspb、asizon、atomgomba、andygfpv、Benky、shanggl、benlumley、rumpelst1lzk1n
- 与制造商联络：sugark、unit
- Discord：unit、rabbitAmbulance、vitroid、limonspb
- 用户支持：Vitroid、nerdCopter、BrandonBakedBeans、V-22、HRoll、hypOdermic、TechNinja、Darkmann、ctzsnooze、Sek101、Zoggbarr (tbolin)、Steve Fisher、PIDToolBoxGuy、ASDojani、haslinghuis
- 文档：ctzsnooze、Vitroid、SupaflyFPV、haslinghuis、belrik
- 额外测试：rabbitAmbulance、xxXyz、sek101
- 最棘手的工作：SteveCEvans、ledvinap、karatebrot

- 分集接收配置中的 RSSI 现显示为 `<dBm>:<channel>`。例如，-33:2 表示分集通道 2 的信号强度为 -33dBm。
- 用户现在可通过 Configurator 可靠配置 HD OSD。
- 若构建中定义 `OSD_HD`，OSD 配置将默认使用 HD。
- Launch Control 现为标准选项。
- 修复未在上电时启用的传感器被错误保存为并非由用户启用的问题。
- DShot Telemetry 现独立于 RPM Filtering，修复了包括动态怠速在内的相关小问题：ctzsnooze。
- Extended DShot telemetry：danielMosquera、belrik、haslinghuis。
- ICM42605 已加入支持溢出保护的陀螺仪列表：tbolin。
- DShot 代码稳定性改进与修复：许多贡献者。
- kaaak：Limonspb。
- 改进对更高 ESC telemetry 电压读数的支持。
- 降低已连接 radio Tx 干扰 DFU 的可能性。
- 防止 softSerial 对 F411 上的 USB 产生不利影响。
- 已为许多板卡更新 target defines。
- 修复 GPS 圈速计时器中最佳 3 圈的问题。
- 使用直接频率时，修复 OSD VTX 频段/频道信息。
- 修复 MSP 中加速度计缩放有时不正确的问题。
- 改进启动时 F7 UART 行为，并修复 LED Strip。
- 改进 F4xx UART 启用/禁用。
- 修复 HAL target 的 ESC Serial。
- 改进 USART 下拉行为。
- 修复 RPM limiting 激活时的电压下垂补偿。
- 改进 AT32 支持：UART、I2C 代码、SITL 端口号、SRAM 配置、相机控制、求值顺序及额外定时器。
- 修复部分主机上的 USB comp port 故障。
- 代码优化：karatebrot、SteveCEvans、ctzsnooze、tbolin、haslinghuis。
- RPM limiter bugfix。
- 改进向电机发送命令。
- 改进对无效 baro 读数的处理。
- 修复 F4xx 上的 Ghost Rx 代码。
- 修复许多板卡配置文件。
- 提高滤波代码效率。
- 重构 feedforward 和 RC smoothing 以提高效率。
- 修复 DShot beacon，确保 beacon 命令之间为 DShot 0。
- 启用 DShot Telemetry 时，F411 默认使用 DShot300 和 4k。
- 多项云构建修复。
- 改进 1000Hz Rx rate 的 FF smoothing。
- 更彻底地重置 MPU6000。
- 关闭 RPM filtering 时，动态怠速不再失效。
- RPM Limiter 修复。
- 固定翼零油门时保持 i-term：Limonspb。
- 许多其他 bugfix、target 更新、driver 更新和修复：valeriyvan。

这是 4.5 开发过程中纳入考量的每个固件 PR 的[完整列表](https://github.com/betaflight/betaflight/pulls?q=is%3Apr+milestone%3A4.5)。

哇！衷心感谢所有开发者、测试者和支持人员！
