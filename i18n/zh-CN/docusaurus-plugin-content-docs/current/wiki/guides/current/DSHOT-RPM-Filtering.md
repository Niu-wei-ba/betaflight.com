# DShot RPM 滤波

### 最新公告

- [Bluejay](https://github.com/mathiasvr/bluejay) 是一款免费、维护完善且支持 DShot 遥测的 BlHeli-S 固件，提供多种配置选项。最便捷的烧录方式是使用在线 ESC 配置工具 [https://esc-configurator.com](https://esc-configurator.com)：它可向 BLHeli-S ESC 烧录 BlHeli-S 或 Bluejay，也可向 BlHeli-32 ESC 烧录 AM32。
- [JESC](https://jflight.net) 是首个为 BLHeli_S ESC 提供 RPM 滤波支持的 ESC 固件。其作者 JoeLucid 编写了 DShot 遥测代码，这套代码是动态怠速和 RPM 滤波等所有双向 DShot 功能的基础。JESC 在 L 系列 ESC 上免费，H 系列 ESC 则需付费；提供 48 kHz 和 96 kHz PWM 版本。
- [BlHeli-32](https://github.com/bitdump/BLHeli/tree/master/BLHeli_32%20ARM) 32.7.0 及以上版本完整支持双向 DShot。
- [AM32](https://github.com/AlkaMotors/AM32-MultiRotor-ESC-firmware) 也可以烧录到 BlHeli-32 类型的 ESC（但不易恢复原固件），并完整支持双向 DShot。

## 简介

双向 DShot 遥测使 ESC 能通过同一根 ESC 控制信号线，将 RPM 数据回传给飞行控制器（FC）。

FC 获知每个电机的 RPM 后，即可在精确频率处设置陷波滤波器以消除该噪声。RPM 数据还可用于动态控制怠速转速，避免转速降得过低。这正是动态怠速功能；与常规怠速相比，它能更有效地防止 ESC 不同步。

基于 RPM 的滤波比以往更能抑制与电机转速相关的噪声。电机温度更低，对弯桨的容忍度更高；全油门时声音更干净，通常也会更快。

启用 RPM 滤波后，动态陷波滤波器可以设得更窄，从而降低延迟；它不再需要跟踪电机 RPM 相关噪声，也就更擅长消除机架共振。启用或禁用 RPM 滤波时，Configurator 会自动调整这些设置。

对于机械状态良好的四轴飞行器，启用 RPM 滤波后，通常可通过提高截止频率或关闭部分陀螺仪滤波来降低低通滤波延迟。请先阅读[调校](#调校)部分，再谨慎进行此类调整。

## 基础技术

[**双向 DShot**](https://github.com/betaflight/betaflight/pull/7264) 是 Betaflight 4.x 引入的功能，可让 FC 通过各电机的 ESC 信号线接收精确的 RPM 遥测数据，无需额外接线或额外的遥测回传通道。FC 每发送一个 DShot 帧，ESC 就会返回一个包含当前 eRPM 的确认帧。FC 根据电机极数将 eRPM 换算为 RPM。

[**RPM 滤波**](https://github.com/betaflight/betaflight/pull/7271) 是一组作用于陀螺仪和（可选的）D-term 的 36 个陷波滤波器，利用 RPM 遥测数据精确移除电机噪声。默认情况下，俯仰、横滚和偏航轴各使用 12 个陷波，覆盖每个电机噪声特征的前 3 个谐波。

[**扩展 DShot 遥测**](https://github.com/bird-sanctuary/extended-DShot-telemetry) 将 RPM 遥测格式标准化为可扩展的遥测协议；在没有专用 ESC UART 连接时，也可传输 ESC 电压、温度和其他传感器数据。RPM 遥测通常发送得最频繁，其他字段以较低频率发送。EDT v1.0 在基础 RPM 数据上新增电压、电流和温度遥测；EDT v2.0 新增解磁、不同步和失速事件的状态数据，以及最大解磁指标。

RPM 滤波要正常工作，ESC 必须支持双向 DShot 协议，且必须在 CLI 中启用双向 DShot。

Betaflight 4.1 及以上版本可在所有飞控及大多数现代 BLHeli_32、BLHeli-S ESC 上使用这两项功能。Betaflight 4.0 已不再受支持。

以下为飞行演示。该四轴飞行器除 RPM 滤波外几乎未使用其他滤波，操控表现良好，桨流扰动极少：
https://youtu.be/jwFYaGHp91c, https://youtu.be/SoG245vmaLo

### 解锁阻止检查

如果已启用 RPM 滤波器，但一个或多个 ESC 未提供有效遥测数据，系统将阻止解锁，并在 OSD 显示 `RPMFILTER` 提示（参见[解锁流程与安全](Arming-Sequence-And-Safety)）。这样可避免因配置不完整或失效而解锁，进而引发飞走或电机过热。请按下文确认 ESC 已正确配置并支持此功能。

## ESC 配置

ESC 必须支持 DShot，并运行[适用的固件](/docs/wiki/getting-started/hardware/esc-firmware)，才能使用 RPM 滤波。最低要求是 RPM 遥测，因此 ESC 必须支持双向 DShot。EDT 是双向 DShot 的扩展，因此支持 EDT 的 ESC 也支持 RPM 遥测。

## Betaflight 配置

### 电机极数

使用 8k8k 时请选择 DShot600。ESC 回传的是 eRPM，必须依据电机磁铁数量换算为 RPM。应计数电机钟罩上的磁铁，而非绕组所在的定子。典型 5 英寸电机有 14 颗磁铁，因此默认值为 14；较小电机的磁铁通常较少，常见为 12 颗。请实际计数或查阅电机规格。若不是 14 颗磁铁，请在 Betaflight App 的“配置”选项卡中修改磁铁数量。

### DShot150、DShot300 还是 DShot600？

对于 4k PID 环路，例如 8k4k 或 4k4k，或 3.2k PID 环路，为获得最高可靠性，请使用 DShot300。DShot600 也可使用，但没有额外优势，且更容易受外部噪声影响。

对于 8k8k 配置，应使用 DShot600。8k PID 环路配合 DShot300 时，电机仅会在每两个 PID 环路更新一次。

对于旧款 L 系列 ESC（efm8bb1），由于 MCU 速度不足以可靠接收更高速率的数据，强烈建议使用 DShot150 和 2k PID 环路时间（8k2k）。

### 配置片段

从 4.1 开始，无需再安装配置片段。请直接在 Betaflight App 的“配置”选项卡中启用双向 DShot。

### 配置验证

FC 现在已配置为双向 DShot，接下来验证其是否正常工作。请给 FC 和 ESC 重新上电：先将 LiPo 接至 ESC，再连接 USB 线。随后打开 Betaflight App 的“电机”选项卡。任何电机均不应出现表示严重错误的红线。转动电机时，应能看到上报的 RPM；错误百分比不应超过 1%。除非手动转动，所有电机均应报告 RPM 为 0。

**重要：**
若仅用 USB 线连接 FC 而未连接 LiPo 电池，在 Betaflight App 的“电机”选项卡中会看到无效的“Error 100%”（E: 100%）指示。连接 LiPo 并等待 ESC 初始化后，该指示会降至 0%（E: 0%）。之后即使断开电池，仍会显示 0% 错误。

## 调校

RPM 滤波器会承担移除绝大多数电机噪声的主要工作，且不会增加很多延迟。

通常无需专门“调校”。

尽管 RPM 滤波可移除几乎所有电机噪声，轴承、气流和湍流带来的通用“杂波”并不能由 RPM 滤波器移除。仍需低通滤波器来抑制这些噪声。

表现为固定频率高幅值噪声线的机架或螺旋桨共振，同样不会被 RPM 滤波器移除；保持动态陷波启用是处理它们的最佳方式。

启用 RPM 滤波后，动态陷波不再需要消除电机噪声，因此应重新配置。4.1 中，将 Dynamic Notch Filter Range 设为 Medium、Dynamic Notch Width Percent 设为 0、Dynamic Notch Q 设为 250。4.2 及以上版本中，将 Dynamic Notch Count 设为 1，Q 设为 500。4.3 中，Configurator 会自动完成这些更改。

对于原本飞行良好的机体，刚启用 RPM 滤波后的首次飞行不要修改任何滤波器设置。

若电机温度较低且声音正常，或许可以通过降低或移除其他滤波器来减少滤波延迟。可尝试：

- 提高陀螺仪低通滤波的截止频率。
- 完全禁用 gyro lowpass 1（将其截止值设为 0，或将其关闭）。
- 提高 RPM 滤波器的 Q 值，使 RPM 陷波更窄并降低延迟；不建议超过 750。
- 减少动态陷波滤波器数量（4.1 中设 width = 0；4.2 及以上版本中设 count = 1）。
- 提高动态陷波滤波器的 Q 值（避免接近 750）。
- 将已有的双二阶滤波器（如有）转换为 PT1。

上述每项调整都会让更多噪声穿过滤波器组，进入 PID，最终传递到电机。

一次只应修改一个滤波器。每次修改后都要进行悬停测试和短距离试飞，仔细听电机声音，并尽快降落以确认电机未过热。随后进行一次强度更高的飞行，并在着陆后再次检查电机温度。

在修改前后记录 Blackbox，并使用 PID Toolbox 查看频谱图，非常有帮助。日志可用于判断哪些滤波器可以上移或不再需要，也可确认某项修改后是否突然引入过多额外噪声。

修改任何内容前，最好保存当前滤波设置的 `diff all` 输出，以便恢复。

## 添加 RPM 滤波后修改 4.1 的滤波设置（不适用于 4.2 或 4.3）

将全部滤波器值以相同幅度上移，可能是降低滤波延迟最安全、最可靠的方式。

以下片段将全部 4.1 低通滤波器的频率上移约 50%，将总延迟降至怠速时 2.3 ms、全油门时 0.9 ms：

```
# 4.1 lowpass filter set shifted up 1.5x

set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 300
set dyn_lpf_gyro_min_hz = 300
set dyn_lpf_gyro_max_hz = 900
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 350

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 150
set dyn_lpf_dterm_min_hz = 100
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200
```

若使用 4.1 默认滤波器作为起点，这是一项幅度适中但效果明显的调整，应可改善桨流扰动处理。若首次解锁时，四轴飞行器发出摩擦声或异常声，或在解锁、悬停时突然上窜，通常意味着滤波频率上调过高，或 D 值过高。不要在这种状态下飞行。

下一步是使用默认值的 2 倍。只有机械噪声极低的四轴飞行器才能在滤波频率为正常两倍时正常工作；但滤波延迟也会降为正常的一半，可能显著改善桨流扰动。以下为 4.1 的 2 倍滤波设置：总延迟在怠速时为 1.7 ms，在全油门时为 0.65 ms：

```
# 4.1 lowpass filter set shifted up 2x

set gyro_lowpass_hz = 400
set dyn_lpf_gyro_max_hz = 1000
set dyn_lpf_gyro_min_hz = 400
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 500

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 200
set dyn_lpf_dterm_max_hz = 340
set dyn_lpf_dterm_min_hz = 140
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 300
```

## 完全禁用低通滤波器

若要完全禁用低通滤波器且不烧毁电机，机体必须具有良好的机械状态：机臂不能分层、螺丝不能松动、陀螺仪芯片不能故障，电机轴承也不能有明显噪声。

关闭滤波器会产生相当大的影响，只应由熟悉滤波原理的用户操作。通常，按上文所述将整组滤波器一起上移或下移更安全。

以下设置将完全禁用第一道陀螺仪低通：

```
set gyro_lowpass_hz = 0
set dyn_lpf_gyro_max_hz = 0
```

除非你确信机体确实足够干净，否则不建议同时禁用 gyro lowpass 1 和 gyro lowpass 2。

以下设置将完全禁用第二道陀螺仪低通：

```
set gyro_lowpass2_hz = 0
```

不建议完全禁用 D-term 滤波器。所有四轴飞行器至少需要两个 PT1 滤波器（默认配置），或一个二阶低通滤波器（biquad 或 PT2）。降低 D-term 滤波风险很高，很容易烧毁电机。若确实要尝试减少 D-term 滤波，请极其谨慎地进行。

## 在 RPM 滤波下配置动态陷波

在 4.1 和 4.2 中，需要手动将动态陷波重新配置为较窄的单陷波，以节省滤波延迟。4.3 中，启用或禁用 RPM 滤波时会自动应用相应调整，显著简化 RPM 滤波器设置。

以下说明仅适用于 4.1：

在 4.1 中，动态陷波范围默认使用 AUTO 模式，并通过 `dyn_lpf_gyro_max_hz` 的值选择动态陷波工作的频率范围。

机架共振通常位于 LOW 或 MEDIUM 动态陷波范围内。因此使用 RPM 滤波时，最好手动将动态陷波配置在其中一个范围。若确定 150 Hz 以下没有机架共振，选择 MEDIUM 可降低延迟并使动态陷波保持在更高频率。

如果确定某一频率以下不存在共振，且希望动态陷波始终高于该最小值，请相应设置动态陷波最小频率（略低于要处理的共振频率）。

例如，以下片段让动态陷波以较窄的单陷波在 90 至约 330 Hz 之间工作：

```
set dyn_notch_range = LOW
set dyn_notch_width_percent = 0
set dyn_notch_q = 200
set dyn_notch_min_hz = 90
```

以下片段让动态陷波以较窄的单陷波在 180 至约 550 Hz 之间工作：

```
set dyn_notch_range = MEDIUM
set dyn_notch_width_percent = 0
set dyn_notch_q = 200
set dyn_notch_min_hz = 180
```

若共振线很窄，动态陷波 Q 值通常可设为 250。较宽或较分散的共振带可能需要 120 至 150 的 Q 值。

始终应比较启用和关闭动态滤波器时的频谱，以准确了解它的实际作用。

在刚性足够高且无共振的机体上，可以完全关闭动态陷波滤波器，但必须谨慎。最好通过关闭前后的日志确认它对最终结果没有实质贡献后再进行。

## 高级主题

### 基于定时器的双向 DShot

若 FC 支持，可使用基于定时器的双向 DShot 实现，略微降低双向 DShot 的 CPU 负载。4.1 RC1 之前这是唯一可用的实现；其缺点是在部分板卡上需要重新映射定时器和 DMA 通道，且并非所有目标都能工作。

目标不在列表中也无需气馁，许多目标仍可工作。请使用此[默认配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT.cf)测试，并反馈结果。

从 4.1 RC1 开始，需要使用命令 `set dshot_bitbang=off` 禁用默认的 DShot bitbang 实现。若要切回 DShot bitbang，请记得将其恢复为 `auto`。

### 已支持目标的配置片段

| 目标            | 安装配置片段                                                                              | 备注                                               | 支持的电机                        |
| --------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------- |
| AG3XF4          | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1 - M4（测试：Mister_M）         |
| AIKONF4         | [配置片段](https://github.com/betaflight/bidircfg/blob/master/AIKONF4-upgrade.cf)         |                                                    | M1 - M4（测试：fujin）            |
| AIRBOTF7        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：Asizon）             |
| ALIENFLIGHTNGF7 | [配置片段](https://github.com/betaflight/bidircfg/blob/master/ALIENFLIGHTNGF7-upgrade.cf) | M3 无法工作，请改用 M5 至 M9 之一；LED 无法使用 M1 | M1-M2、M4-M9                      |
| ALIENWHOOP      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4                             |
| ANYFCF7         | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1 M2 M3 M4 M5 M6 M9              |
| ANYFCM7         | [配置片段](https://github.com/betaflight/bidircfg/blob/master/ANYFCM7-upgrade.cf)         |                                                    | M1 M2 M3 M4 M5 M7 M9 M10          |
| BETAFLIGHTF4    | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1 - M4 可用（测试：Balint）      |
| CLRACINGF4      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/CLRACINGF4-upgrade.cf)      |                                                    | M1-M4 可用                        |
| CLRACINGF7      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/CLRACINGF7-upgrade.cf)      | M4 无法工作，请改用 LED 焊盘                       | M1 M2 M3 M5                       |
| CRAZYBEEF4DX    | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4 可用（测试：Noctaro）       |
| CRAZYBEEF4FR    | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4 可用（测试：joelucid）      |
| DALRCF4         | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DALRCF4-upgrade.cf)         |                                                    | M1-M6（测试：QuadMcFly）          |
| DALRCF722DUAL   | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DALRCF722DUAL-upgrade.cf)   |                                                    | M1-M6，但只能使用 M5 或 M6 之一   |
| DYSF4PRO        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：BRadFPV）            |
| ELINF405        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：elin-neo）           |
| ELINF722        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：elin-neo）           |
| EXF722DUAL      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/EXF722DUAL-upgrade.cf)      |                                                    | M1-M8                             |
| FLYWOOF7DUAL    | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M6                             |
| FORTINIF4       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：QuadMcFly）          |
| FOXEERF722DUAL  | [配置片段](https://github.com/betaflight/bidircfg/blob/master/FOXEERF722DUAL-upgrade.cf)  |                                                    | M1-M6                             |
| FURYF4          | [配置片段](https://github.com/betaflight/bidircfg/blob/master/FURYF4SD-upgrade.cf)        |                                                    | M1-M4，不支持 LED（测试：RawFPV） |
| FURYF7          | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4                             |
| HAKRCF722       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/HAKRCF722-upgrade.cf)       |                                                    | M1-M6                             |
| KAKUTEF4V2      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（已测试）                   |
| KISSFCV2F7      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/KISSFCV2F7-upgrade.cf)      |                                                    | M1-M6                             |
| LUXF4OSD        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：Mister_M）           |
| MAMBAF411       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | DMA 和定时器已由 joelucid 审核    |
| MAMBAF722       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/MAMBAF722-upgrade.cf)       |                                                    | M1-M4（测试：kc10kevin）          |
| MATEKF405       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：Wudz_17）            |
| MATEKF411       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | DMA 和定时器已由 joelucid 审核    |
| MATEKF411RX     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | DMA 和定时器已由 joelucid 审核    |
| MATEKF722       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M8                             |
| MATEKF722SE     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/MATEKF722SE-upgrade.cf)     | M5 无法工作                                        | M1-M4、M6-M8                      |
| MLTEMPF4        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：RC2 monko760）       |
| NERO            | [配置片段](https://github.com/betaflight/bidircfg/blob/master/NERO-upgrade.cf)            |                                                    | M1-M8                             |
| NOX             | [配置片段](https://github.com/betaflight/bidircfg/blob/master/NOX-upgrade.cf)             |                                                    | M1-M4                             |
| NUCLEOF7        | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         | M4 无法工作，但可改用 M6                           | M1-M3、M6                         |
| NUCLEOF722      | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         | M4 无法工作，但可改用 M6                           | M1-M3、M6                         |
| OMNIBUSF4       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：omerco）             |
| OMNIBUSF4SD     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：joe lucid）          |
| OMNIBUSF4FW     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4（测试：skonk）              |
| OMNIBUSF7       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/OMNIBUSF7-upgrade.cf)       |                                                    | M1-M4（在 RC2 中由 IgguT 测试）   |
| OMNINXTF7       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M4                             |
| PYRODRONEF4     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/PYRODRONEF4-upgrade.cf)     |                                                    | M1-M4（测试：fujin）              |
| REVOLTOSD       | [配置片段](https://github.com/betaflight/bidircfg/blob/master/REVOLT-upgrade.cf)          |                                                    | M1-M4（测试：JayBird）            |
| SPEEDYBEEF4     | [配置片段](https://github.com/betaflight/bidircfg/blob/master/SPEEDYBEEF4-upgrade.cf)     |                                                    | Flavoredcrayon                    |
| SPRACINGF7DUAL  | [配置片段](https://github.com/betaflight/bidircfg/blob/master/SPRACINGF7DUAL-upgrade.cf)  |                                                    | M1-M10                            |
| TMOTORF4        |                                                                                           | M4-M5 无法工作，但可改用 M6                        | M1-M3、M6                         |
| YUPIF7          | [配置片段](https://github.com/betaflight/bidircfg/blob/master/DEFAULT-upgrade.cf)         |                                                    | M1-M6                             |

请在此处补充其他已验证的配置。

### 不支持的目标

| 目标 | 备注 |
| ---- | ---- |

下文说明配置片段中使用的设置。

### 环路时间与 DShot 协议

双向 DShot 可与 DShot 300、600、1200 以及 Proshot 1000 配合使用。就实用性而言，DShot600 在所有 PID 环路频率下都能良好工作。

请记住，每发送一个帧现在都会有一个返回帧；输入和输出帧之间需要 30 us 来切换信号线、DMA 和定时器。选择的环路时间必须足够短，以保证在给定 DShot 协议速率下，两个帧加 50 us 能够容纳在一次陀螺仪环路迭代中。

双向 DShot 和 RPM 滤波器都会占用相当多的 CPU 资源。为让滤波器调至正确频率，环路频率必须精确无误。建议首次试飞使用 DShot600 和 4k/4k；所有 DShot 速率都应能在该环路频率下工作。

在 F4 上，RPM 遥测每次信号线方向切换、每个电机约消耗 3 至 4 us。双向切换信号线方向共需约 24 至 32 us。RPM 滤波器有 36 个陷波滤波器，以 1000 Hz 更新频率动态调谐。

大多数 F405 可良好运行 8k4k；8k8k 也可行，但通常需要超频。F411 需要超频才能运行 8k4k。F7 可无问题运行 8k8k。

可能需要关闭任何扩展启动旋律，因为它们可能干扰双向 DShot。标准启动提示音没有问题。

### DMA

当前实现要求使用普通 DMA，而不是 burst DMA。仅关闭 burst DMA 本身未必能在某个 FC 上正常工作。可先尝试：

`set dshot_burst = OFF`

然后测试四轴飞行器是否仍能正常飞行；若可以，再继续下一步：

### 启用新的调度器策略

RPM 滤波器使用极窄的陷波滤波器，因此陀螺仪环路时间必须稳定且准确符合设定值。以前这需要降低环路频率并超频。现在已加入调度器改动，即使在更高的环路频率下也能保持一致的陀螺仪频率。双向 DShot 需要启用该功能：

`set scheduler_optimize_rate = ON`

### 启用双向 DShot

`set dshot_bidir = ON`

确认电机仍能启动。若可以，请拔下 USB 线，连接电池后重新连接 USB。进入 CLI 并输入 `status`，应能看到 DShot 遥测报告。每个电机上报的 RPM 应为零，且错误应很少。

### 电机极数

ESC 上报 eRPM，需要根据电机极数（磁铁数）换算为 RPM。磁铁位于电机钟罩上，而不是有绕组的定子磁铁上。典型 5 英寸电机有 14 极，因此默认设置为 14；较小电机的极数通常较少，常见为 12。请实际计数或查阅电机规格，然后使用以下设置：

`set motor_poles = 14`

### 验证环路时间的一致性

**重要：**

启用上述全部功能后，请再次确认环路频率稳定一致。若不一致，请选择更低的环路频率。请记住，与有效滤波不同，环路时间对[飞行性能](https://github.com/betaflight/betaflight/issues/7327)的影响极小。

在 CLI 中输入 `tasks`，检查陀螺仪频率是否与设定值一致（注意：应给 FC 连接电池，才能得到准确的环路频率结果）。例如：

```
# tasks
Task list             rate/hz  max/us  avg/us maxload avgload     total/ms
00 - (         SYSTEM)     10       1       0    0.5%    0.0%         0
01 - (         SYSTEM)   1000       3       1    0.8%    0.6%       522
02 - (       GYRO/PID)   7999      43      34   34.8%   27.6%      2845
03 - (            ACC)   1000      12      10    1.7%    1.5%       107
04 - (       ATTITUDE)    100      17      10    0.6%    0.6%        11
05 - (             RX)     32      34      32    0.6%    0.6%        12
06 - (         SERIAL)    100     851       3    9.0%    0.5%         8
08 - (BATTERY_VOLTAGE)     50       4       2    0.5%    0.5%         1
09 - (BATTERY_CURRENT)     50       1       1    0.5%    0.5%         0
10 - ( BATTERY_ALERTS)      5       3       2    0.5%    0.5%         0
11 - (         BEEPER)    100       2       1    0.5%    0.5%         1
14 - (           BARO)     43      98      66    0.9%    0.7%        34
15 - (       ALTITUDE)     40       7       3    0.5%    0.5%         1
17 - (      TELEMETRY)    250       1       0    0.5%    0.0%        27
19 - (            OSD)     60      21      13    0.6%    0.5%         9
21 - (            CMS)     60       1       1    0.5%    0.5%         0
22 - (        VTXCTRL)      5       1       1    0.5%    0.5%         0
23 - (        CAMCTRL)      5       1       1    0.5%    0.5%         0
25 - (    ADCINTERNAL)      2       3       1    0.5%    0.5%         0
26 - (       PINIOBOX)     19       1       1    0.5%    0.5%         0
RX Check Function                   2       1                         0
Total (excluding SERIAL)                        46.0%   37.1%
```

需要检查 _GYRO/PID_ 行：

```
02 - (       GYRO/PID)   7999      43      34   34.8%   27.6%      2845
```

本例中 Gyro/PID 配置为 8k/8k，该行表明实际执行频率为 7999 Hz。它必须非常接近 8k（8000 Hz）；建议将误差维持在 1% 以下。

### 调试模式

可通过两种 Blackbox 调试模式验证 RPM 滤波器：`RPM_FILTER` 记录 ESC 上报的各电机频率；`DSHOT_RPM_TELEMETRY` 记录未经换算的 eRPM。

## TPA

以下片段会将 4.0.x 构建设置为 4.1 默认值：从 1250 开始的 65% 仅 D-term TPA。

```
set tpa_rate = 65
set tpa_breakpoint = 1250
```

### 参考资料

[双向 DShot PR](https://github.com/betaflight/betaflight/pull/7264)

[RPM 滤波 PR](https://github.com/betaflight/betaflight/pull/7271)
