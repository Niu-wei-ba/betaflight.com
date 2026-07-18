---
sidebar_position: 11
---

# Betaflight 4.2 调参说明

[Betaflight 4.2](https://github.com/betaflight/betaflight/releases) 带来了以下改进：

- [更精确的环路时间](#more-accurate-loop-times)：改善 RPM 滤波性能
- [改进的前馈](#improved-feed-forward)：飞行更顺滑；提供适用于[竞速到电影感飞行](#quick-settings)的平均与平滑设置示例
- [动态 D 滤波 Expo 曲线](#dynamic-d-filtering-expo)：随油门上升更快地提高 D 滤波截止频率，改善桨流扰动控制
- [动态电池电压暂降补偿](#dynamic-battery-sag-compensation)：在整块电池的可用电压范围内，保持一致的油门响应和 PID 手感
- [新的 Rates 模式](#new-rates-modes)：更直观地调节关键参数，并支持适合竞速和电影感飞行的超低 Expo
- [改进的动态陷波滤波器](#improved-dynamic-notch-filter)：更好的噪声抑制，以及更简单的最小/最大频率配置
- [自动偏航自旋恢复配置](#automatic-anti-yaw-spin-configuration)：更快停止偏航自旋
- [与 I 值解耦的 Antigravity 增益](#antigravity-gain-independent-of-i-values)：调整 I 值不会改变 Antigravity 效果强度
- [更简单、更好的 RC 平滑](#rc-smoothing-improvements)：经过优化的默认自动平滑通常无需手动干预
- [设定点模式下的 Iterm Relax 正常工作](#iterm-relax-works-properly-in-setpoint-mode)：修复 4.0 和 4.1 中的缺陷。此前在设定点模式下调低截止值几乎无效；现在设定点模式已正常工作，之前改用陀螺仪模式的用户应切回设定点模式。默认 `iterm_relax_cutoff` 降至 15，可更好抑制控制余量较低的四轴飞行器的回弹
- [NFE Race Mode](#nfe-race-mode)：俯仰轴 Acro、横滚轴自稳的特殊飞行模式
- [Configurator 10.7](#configurator-improvements)：多项改进，尤其是正确显示各种 Rates 类型的曲线图
- [OSD 改进](#osd-improvements)：每次解锁时可短暂显示徽标；CRSF 同时显示模式与链路质量；新增相机画幅、返航点距离和效率显示

**对于大多数四轴飞行器，4.2 使用默认设置即可获得很好的飞行表现，无需修改。**如果你的机型确实需要特殊或非典型 PID，请重新调参；4.2 的新功能可能让不同的 PID 取得更好的结果。例如，过去因噪声限制而无法继续提高 D 的机型，现在或许可以做到。

**部分控制余量较低的四轴飞行器（动力不足的 Whoop、带导风圈的 HD Whoop、7 英寸及以上机型、长航时机型等）可能需要[专门设置以尽量降低回弹](#settings-to-minimise-bounceback)。**

如果你刚升级到 4.2，请同时阅读 4.0 和 4.1 调参说明。

**必须使用 Configurator 10.7 或更高版本。请从 [Configurator Releases](https://github.com/betaflight/betaflight-configurator/releases) 获取；更早版本无法正常工作。**

**注意 1：**不要将任何旧版本的 diff 或 dump 粘贴到 4.2 CLI。请尽量使用滑块近似复现旧 PID 和滤波器设置，这也有利于今后继续使用滑块调参。

**注意 2：**若之前将 `dyn_notch_range` 设为 `LOW`，请把 `dyn_notch_max_hz` 改为 350；若设为 `HIGH`，改为 700。除此之外，大多数四轴飞行器使用默认值 500 即可。有关范围设置的更多信息见[此处](#improved-dynamic-notch-filter)。

**注意 3：**若之前的 PID `I` 值偏离默认值，4.2 的 Antigravity 增益可能需要略作调整，才能获得相同效果。建议先使用默认 Antigravity 值飞行，再重新调至最佳值。详见[此处](#antigravity-gain-independent-of-i-values)。

**注意 4：**使用加速度计时，必须先校准，否则无法解锁。

**注意 5：**建议使用基于 eRPM 的滤波。请参阅[启用和配置 RPM 滤波](/docs/wiki/guides/current/DSHOT-RPM-Filtering)。

## 快速设置

以下片段展示了可针对特定飞行类型调整的一些非常用参数。默认值应适合快速自由式和常规竞速。这些示例不包含 PID 或滤波器调参，不能保证完全适合你的四轴飞行器，但可作为参数取值范围的参考。

**ProRace**（激进前馈；要求 RC 信号*非常干净*，否则 RC 阶跃可能导致抖动和电机发热）

```
set iterm_relax_cutoff = 30
set rc_smoothing_auto_smoothness = 5
set ff_interpolate_sp = ON
set ff_smooth_factor = 0
set ff_spike_limit = 60
set ff_boost = 20
set feedforward_transition = 0
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 600
```

（同时启用电压暂降补偿，将补偿量调至适合自己的程度，并提高 D Expo。）

**Race/Fast Freestyle**（较强前馈，可容忍典型 RC 信号，响应非常直接）

```
set iterm_relax_cutoff = 20
set rc_smoothing_auto_smoothness = 7
set ff_interpolate_sp = AVERAGED_2
set ff_smooth_factor = 20
set ff_spike_limit = 70
set ff_boost = 15
set feedforward_transition = 0
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 700
```

**HD**（为 HD 相机提供平滑 FF；低转向速率处强平滑；较低 Iterm Relax 以尽量减少回弹）

```
set iterm_relax_cutoff = 10
set rc_smoothing_auto_smoothness = 20
set ff_interpolate_sp = AVERAGED_3
set ff_smooth_factor = 40
set ff_spike_limit = 55
set ff_boost = 0
set feedforward_transition = 40
set yaw_lowpass_hz = 70
set throttle_boost = 5
set throttle_boost_cutoff = 10
set dyn_lpf_dterm_curve_expo = 7
set gyro_rpm_notch_q = 800
```

**Cinematic**（仅适合低 Rates 转向；其他情况下可能略显迟钝）

```
set iterm_relax_cutoff = 5
set rc_smoothing_auto_smoothness = 40
set ff_interpolate_sp = AVERAGED_4
set ff_smooth_factor = 50
set ff_spike_limit = 50
set ff_boost = 0
set feedforward_transition = 70
set yaw_lowpass_hz = 50
set throttle_boost = 2
set throttle_boost_cutoff = 10
set dyn_lpf_dterm_curve_expo = 8
set gyro_rpm_notch_q = 900
set iterm_windup = 75
```

以下调参建议有助于减少 HD 画面中的轻微随机抖动：

- 关闭 D_min；
- 通过 P:D 比例滑块，将 D 设为约比 P 高 20%；
- 将 TPA 设为仅作用于 D，从巡航油门位置开始，并略微提高削减百分比；
- 将 D 低通 Expo 尽可能调高（上限受中油门 D 噪声限制）；
  使用额外 D 后可能需要更强的 D 滤波，例如将 D 滤波器滑块向左移 2 格；
- P 比平常的自由式调参低约 20%，但仍应刚好足以保证基本的 P 稳定性；
- 俯仰和横滚 I 约为默认值的一半；
- 较高的 FF Transition，例如 0.7；
- 确认 OpenTx 硬件设置中没有勾选 ADC；
- 使用 Actual Rates：Center 设为 10 至 50、Expo 设为 0，最大 Rates 使用惯用值。零 Expo 的 Actual Rates 在中心附近手感柔和，离开中心后可更快恢复正常响应；Center 灵敏度很低时，可能无需 Transition 和/或 Deadband。

针对零油门不稳定：

- 若已将 ESC 设为 48 kHz PWM，切回 24 kHz PWM；
- 逐步提高 DShot 怠速，直至机体有飘浮感，并适当调节动态怠速；
- 尝试将推力线性化设为 25；
- 尝试关闭 Dmin，并略微提高整体 PID。

**恢复默认值**（零值表示“关闭”）

```
set iterm_relax_cutoff = 15
set rc_smoothing_auto_smoothness = 10
set ff_interpolate_sp = AVERAGED_2
set ff_smooth_factor = 37
set ff_spike_limit = 60
set ff_boost = 15
set feedforward_transition = 0
set yaw_lowpass_hz = 0
set throttle_boost = 5
set throttle_boost_cutoff = 15
set dyn_lpf_dterm_curve_expo = 5
set gyro_rpm_notch_q = 500
set iterm_windup = 100
```

**一次性启用其余建议的新功能：**

```
set dyn_lpf_dterm_curve_expo = 6
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
set rc_smoothing_type = FILTER
set rc_smoothing_input_hz = 0
set rc_smoothing_derivative_hz = 0
set rc_smoothing_input_type = BIQUAD
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 10
```

启用动态电池电压暂降补偿：

```
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
```

## 尽量减少回弹的设置

Betaflight 的当前默认值旨在让中高性能四轴飞行器飞得很好，主要适用于轻量、灵敏的 5 英寸及以下机型。

控制余量较低的四轴飞行器，例如低功率 Whoop、带导风圈的 HD 机型、重型 4S 自由式机型、许多 7 英寸及以上机型和长航时机型，普遍比“常规”四轴飞行器更难跟上快速摇杆输入。它们在快速翻滚、横滚或快速偏航后容易出现回弹。

本节说明此类机型为何会回弹，以及如何解决。

在 Betaflight 中，PID 的 `I` 项为急弯精度、快速前飞时的俯仰精度、大风环境稳定性、下落和翻滚中的稳定性提供支撑，也能处理不对称空气阻力，并消除 P 无法彻底处理的大量持续性小残差。它会随时间积累对小残余误差的修正，让四轴飞行器持续沿正确轨迹飞行。更高的 `I` 可更快、更充分地完成这一工作，尤其是在急弯和大风环境中；此时 P、D 或 FF 无法控制持续的小残余误差。相对较高的 I 也是 Betaflight 4.x 能在急弯和长直线中保持精准轨迹的原因之一。

若飞手要求的转向速率变化快于机体所能实现的程度，陀螺仪信号会落后于设定点，形成较大的误差信号，`I` 将开始累积以协助修正。`iterm_relax` 会尝试限制这种累积。若相对误差而言 Iterm Relax 不足，I 可能累积到很大；飞手停止翻滚后，累积的 I 会驱动机体反向运动，随后缓慢消退至零。这就是结束翻滚时看到的单次、相对缓慢的“回弹”。

这一现象称为“iTerm 积分累积（iTerm windup）”。我们用 `iterm_relax` 和 `iterm_windup` 控制与 iTerm 有关的回弹。对于“常规控制余量”机型，4.2 的默认值效果很好：默认值 15 的 `iterm_relax` 会在普通翻滚和横滚输入期间强力抑制 I 累积；`iterm_windup` 用于偏航问题，通常并不需要，因此默认关闭。

控制余量较低的四轴飞行器相对于摇杆输入存在更大的延迟和误差，所以在快速翻滚、横滚和偏航后更易回弹。这类机型需要调整 Betaflight 的 `iterm_relax` 与 `iterm_windup` 值。

若在 600 度/秒翻滚或横滚后出现令人困扰的回弹，和/或快速偏航输入后出现回弹，说明你的四轴飞行器属于控制余量较低的类型。其他迹象包括：悬停油门高于正常值（即超过 25%），或者下落和低油门时出现缓慢摆动。

在偏航方面，所有机臂较长的机型，尤其是大于 6 英寸的机型，都会损失偏航控制余量，通常会出现偏航回弹和偏航跳动。

iTerm 积分累积导致的回弹可通过三种方式处理：

1. **最佳方案是修改调参或硬件，使四轴飞行器响应更快。**理想情况下，机体的响应足够快，默认值即可正常工作；这也会改善整体操控。以下是可行方法。

   控制余量较低的机型通常需要更高的 P 和 FF，某些情况下 P 可达到默认值的两倍、FF 可达到默认值的三倍。虽然存在上限，但需要大胆提高。D 通常也要随 P 提高，否则会出现 P 振荡；D 噪声可能成为上调上限。应积极提高 FF，并逐步将“P and D gain”滑块向右移动。这些更改会让机体更快开始转向，缩短并减小误差，从而降低摆动和回弹。请注意，过高的 D 会延迟响应，使回弹更严重；因此为此类机型找到合适的 P 和 D 非常重要。

   如果在调节 P 和 FF 后仍有摆动和回弹，请尝试降低 I，例如降至常规值的一半或三分之一。I 过低会降低整体稳定性，因此不要降得过多。

   从硬件看，螺旋桨负载过重的机型难以快速改变推力。应尝试更小或更轻、让电机更容易加速的桨。优化桨与电机的匹配，对回弹等控制余量问题会有很大改善。

   对于非常大的 Beast 或 X-class 四轴飞行器，将电机改为向内旋转可提高偏航控制余量。

   任何能改善回弹的改动，都代表机体响应得更快、更精确；这是判断调参是否成功的良好指标。

2. **次优方案是降低最大俯仰、横滚或偏航 Rates，或者采用更平顺的飞法**，在开始或结束翻滚、偏航时动作稍慢一些。只要不要求硬件做不到的动作，就能在无需极端调参的情况下得到良好的综合性能范围。

3. **调节现有的 `iterm_relax` 和 `iterm_windup` 功能。**

`iterm_relax` 用于防止非常快速的俯仰和横滚输入产生不必要的 I 积累。

关联的 `iterm_relax_cutoff` 决定抑制效果的强度和持续时间。值越低，对 `I` 累积的抑制越强、持续越久；这正是控制 iTerm 相关回弹所需的效果。

可将 `iterm_relax_cutoff` 从默认值 15 逐步调至 10、7、5，每次观察回弹改善情况。最终采用仍能“有效”的最高值。值越低，急弯精度越差，因此存在取舍；目标是找到能控制回弹的最高数值。

强烈建议保持默认的设定点模式。4.2 无需切换至陀螺仪模式，且在 4.2 中，设定点模式的 Iterm Relax 很可能优于陀螺仪模式。

对于偏航回弹，应先尝试优化偏航 PID。偏航时，FF 在摇杆开始移动时提供初始推动，P 随后提供一定增益，而 I 承担大部分工作。要获得良好的偏航性能，三者缺一不可。

理想做法是记录日志并调整偏航 P、FF 与 I，使小到中等偏航输入的响应延迟与俯仰、横滚的延迟相匹配。

对于幅度很大、速度很快的偏航输入，你会看到电机很快被推至极高的差分输出：一对电机达到 100%，另一对为零。这表示四轴飞行器无法完成所要求的动作，此时 iTerm 积分累积和回弹不可避免。

`iterm_windup` 专门解决这一偏航问题。4.2 中的 `iterm_windup` 仅作用于偏航轴；此前它作用于所有轴。当电机差分超过设定百分比时，它会抑制 `I` 积累。默认值 100 表示“关闭”；对于控制余量较低机型，70 是防止偏航回弹的良好起点。

在 70% 电机差分时停止偏航 I 积累，可避免在命令机体无法完成的偏航动作时发生 iTerm 积分累积，I 驱动的偏航回弹也就不再是问题。`iterm_windup` 的优点在于不会削弱小幅输入的反应，小幅输入完全不受影响。

`acc_limit` 和 `acc_limit_yaw` 会在飞手请求的设定点变化速率（即加速度）高到机体无法实现时，选择性抑制 I 积累。二者默认关闭，只会在设定点快速变化时短暂抑制 `I`。由于严重的 iTerm 积分累积可能持续很久，甚至发生在摇杆停止后，因此不建议使用这两个功能。

## 这就是实际需要了解的全部内容，去飞吧！

**以下内容面向深度调参用户，介绍技术细节：**

## 更精确的环路时间

陀螺仪和 PID 环路调度已完全重写，可降低 PID 环路抖动和 CPU 占用。无需特殊配置，功能会自动生效。你将获得更准确的滤波、更低的电机温度和更长的飞行时间；RPM Q 因子通常也可以设得更高而不出问题。

RC 输入处理代码同样得到改进，精度显著提高，FF 曲线会比以前更平滑。

**陀螺仪环路频率现锁定为陀螺仪的“原生”采样率，用户无法调整。**通常为 8k。

PID 环路频率可以也应该根据处理器能力调整。Configurator 底部会显示 PID 环路时间。对 RPM 滤波配置来说，最重要的是该环路时间的稳定性：环路时间误差 1%，RPM 陷波滤波器的位置也会偏离正确位置 1%。

未使用 RPM 滤波时，大多数 F4 和 F7 飞控在 8k PID 环路下都能正常运行。

使用 RPM 滤波时，F405 和 F7xx 飞控也通常可使用 8k PID 环路，但 F405 在 4k 下更精确。建议先用 4k，再尝试 8k；只有在 8k 至少与 4k 一样稳定时才保留 8k。

F411 应设为 4k，通常需要超频才能获得最佳效果。

为尽量降低抖动，请关闭 Blackbox 记录。需要记录时，除非更高频率不可或缺，否则使用 1k；除非确实需要，否则关闭调试。

运行 4k 或 2k PID 环路时，下采样过程可能产生混叠伪影。陀螺仪低通 2 滤波器在陀螺仪环路中运行，通常可阻止这些伪影；它是唯一以陀螺仪环路速度运行的低通滤波器。禁用它后，选择 4k 或更低 PID 环路频率时，系统会自动启用简单的两点平均滤波器作为替代。两点平均能较好减少 4k PID 环路的混叠伪影，但不如 1000 Hz 的低通 2，且无法完全阻止 2k 下的混叠。因此，**使用 2k PID 环路时不应关闭陀螺仪低通 2。**

8k PID 环路没有混叠问题，因此可自由配置陀螺仪低通 2 来降噪；若不需要，也可关闭，无需担心混叠。

使用 4k PID 环路时，若不需要陀螺仪低通 2 降噪，可将其设到允许的最高频率（当前为 1000 Hz），或关闭。

使用 2k PID 环路时，不要关闭陀螺仪低通 2。

## DShot 设置

启用 RPM 时，4k PID 环路使用 DShot300，8k PID 环路使用 DShot600。

启用双向 DShot / RPM 滤波时：

- dshot150 -> 最大 2k pidloop
- dshot300 -> 最大 4k pidloop（在 8k 时，DShot 300 数据仅每两个 PID 环路发送一次）
- dshot600 -> 最大 8k pidloop

未启用双向 DShot 时：

- dshot150 -> 最大 4k pidloop
- dshot300 -> 最大 8k pidloop
- dshot600 -> 最大 16k pidloop（4.2 中可配置的最高 PID 环路频率为 8k）

## 改进的前馈

4.2 对前馈进行了优化，适用于从硬核竞速到电影感 HD 飞行的各种需求。

采用激进设置时，前馈会立刻响应任何摇杆输入。基础前馈分量与摇杆移动速度成正比，Boost 分量与摇杆瞬时加速度成正比。激进前馈可将大多数输入的设定点到陀螺仪延迟降至零，提供顶级竞速所需的高控制力和即时性。较柔和的前馈，例如将 Feed Forward Transition 设为 30，则可带来非常平顺的中心手感，同时快速响应轻拨输入，适合现代自由式或电影感飞行。

激进前馈的主要缺点是在试图平顺飞线时可能产生抖动。大多数遥控链路存在一定抖动，许多会丢包或发送重复包，飞手的手指或拇指也会有轻微抖动。若四轴飞行器立即响应最微小的输入，它在本应平稳前飞或进行大半径柔和转弯时可能会“颤动”或显得神经质。

竞速飞手与追求极平滑 HD 画面的飞手需求差异很大，因此 4.2 对如何满足这些不同需求进行了大量优化。

前馈高度依赖 RC 链路稳定性和输入数据包阶跃之间的平滑程度。强烈建议 Crossfire 用户升级至最新的 CRSF_Shot 软件，包括可为 CRSF 提供外置模块同步的 OpenTx 更新。FrSky 发射机用户应升级至 OpenTx 2.3 并关闭 ADC。

### 模式：ff_interpolate_sp

最重要的前馈参数是前馈运行“模式”。可在 CLI 中使用 `set ff_interpolate_sp` 按以下方式设置：

- `OFF`：旧式线性插值；没有 Boost 或毛刺抑制
- `ON`：较新的基于设定点的插值模式；立即响应每次 RC 变化，具有 Boost 与毛刺抑制，面向竞速
- `AVERAGED_2`：与上项相同，但增加两点移动平均以减少毛刺、消除交替上下的 FF 抖动，并降低直线或平滑弧线飞行时的抖动。适合包括竞速与现代自由式在内的通用用途（默认）
- `AVERAGED_3`：三点移动平均毛刺抑制；在平滑弧线或直线飞行时能强力降低抖动。适用于搭载 HD 相机的自由式机型；可有效降低未升级 CRSF Shot 的固定 150 Hz Crossfire 配置中三阶跃（20 ms）抖动
- `AVERAGED_4`：四点移动平均，平滑和抖动抑制最强，最适合平顺的电影感 HD 录制；对抖动的 R9 曲线也可能有效

### 平滑度：ff_smooth_factor

其次最重要的是“平滑度”参数，它限制单个输入遥控阶跃可产生的变化量，作用类似指数或低通式平滑函数。CLI 参数为 `ff_smooth_factor`，默认值 37，最大值 75。

使用 `set ff_smooth_factor = 0` 时，输出 FF 阶跃完全不平滑。每个输入 RC 阶跃对应的完整 FF 和 Boost 会立即施加；这通常是使用干净遥控链路的竞速飞手所偏好的方式。

默认值 37 时，输入前馈阶跃的 63% 会立即施加。响应类似时间常数为一个 RC 间隔的一阶低通滤波器，即截止频率为 `(1000 / 2 _ pi _ RCinterval) Hz`；对于 6.66 ms RC 阶跃约为 24 Hz。该参数会平滑 FF 信号中的尖锐阶跃，减少许多遥控链路常见的部分抖动成分。

高于默认值会使 FF 信号更平滑，但可能产生过多延迟，以至于前馈几乎失去作用。除较慢的电影感 HD 机型外，不建议使用。

### Boost：ff_boost

该项自 4.1 起未变；请参阅 [4.1 调参说明](4-1-Tuning-Notes#feed-forward-boost)。

简而言之，Boost 响应摇杆加速度，可帮助快速摇杆输入克服电机延迟；它也是最容易放大 RC 抖动和毛刺伪影的项目。4.2 默认设置力求在两者之间取得良好平衡。

默认 Boost 为 15，几乎适用于所有四轴飞行器。竞速飞手可偏好 20。更高的值很可能使普通四轴飞行器产生微小过冲、抖动和过度灵敏，但控制余量较低的机型可尝试最高 30。

### 尖峰限制：ff_spike_limit

`ff_spike_limit` 提供简单的软削顶方法，用于削去较大 FF 尖峰的顶端。默认值应适合大多数遥控链路，大部分用户应保持默认。

提高数值会允许更大的尖峰通过。希望获得完整激进前馈的竞速飞手或使用干净遥控链路的用户可提高该值，但应仔细观察前馈曲线的变化。

飞手产生的最大单次正常 FF 阶跃，通常发生在从满摇杆突然回中时，即结束快速翻滚的瞬间。若该时刻的延迟必须尽可能低，可尝试提高尖峰限制。

### 过冲限制：ff_max_rate_limit

`ff_max_rate_limit` 自 4.1 起同样未变；请参阅 [4.1 调参说明](4-1-Tuning-Notes#feed-forward-limiting)。

请保持为 100。

## RC 平滑改进

经过大量测试，默认 RC 平滑值已简化并优化，通常无需修改。

默认自动平滑方法会根据识别出的 RC 数据包间隔，动态计算 RC 平滑时间常数。它适用于大多数遥控系统和插值式前馈。默认输入滤波器类型为 `BIQUAD`，用于平滑设定点和 P；导数滤波器类型为 `PT1`，用于平滑插值前馈曲线的尖角。

大多数飞手应保持默认设置。

`rc_smoothing_auto_smoothness` 决定 RC 曲线的“平滑程度”。值越高越平滑，但 RC 延迟越大。10 是大多数通用飞行的最佳值。竞速飞手可能偏好 8，甚至 5，但会得到更跳动的电机曲线，性能通常没有明显提升；对于老旧、抖动的遥控链路，20 甚至 40 可能略有改善。

新的默认设置如下：

```
set rc_smoothing_type = FILTER
set rc_smoothing_input_hz = 0
set rc_smoothing_derivative_hz = 0
set rc_smoothing_input_type = BIQUAD
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 10
```

## 动态 D 滤波 Expo

`dyn_lpf_dterm_curve_expo` 现在会让 D 低通滤波器截止频率随油门提高得比过去更快。油门一开始提高，D 低通就开始上升。值为 5 或更高可能改善桨流扰动控制。

端点 `dyn_lpf_dterm_min_hz` 与 `dyn_lpf_dterm_max_hz` 保持不变；区别在于截止频率会更快接近最大值。

- 默认值提供有效的上升曲线（6）。
- 值为 1 时曲线非常平缓，在全油门范围内从最小 Hz 到最大 Hz 几乎线性上升。
- 值为 6 时曲线随油门上升，中油门前由最小值开始上升得更快。
- 最大值 10 会产生非常快速的上升。

曲线图请参阅 [PR9486](https://github.com/betaflight/betaflight/pull/9486)。

## 动态电池电压暂降补偿

该 PR 会在电池满电时先降低电机输出，并在飞行中随着电压暂降逐步提高输出，以快速补偿发生中的电池电压暂降。

这会在可用电池电压范围内，为油门和 PID 提供更一致的摇杆手感，补偿电池暂降通常带来的性能衰退。四轴飞行器在起飞时不会过于激进，接近飞行末段时也不会显得迟钝。

建议使用以下设置启用：

```
set vbat_sag_compensation = 100
set vbat_pid_gain = OFF
```

这表示“对电压暂降进行 100% 补偿”。

**注意 1：**四轴飞行器必须具备板载电池电压传感器。不能配合基于 ESC 的串行电压遥测使用，因为其电压数值更新太慢。

**注意 2：**不要同时使用旧的 `vbat_pid_gain` 电压暂降补偿方法。

**注意 3：**仅在通过遥测或 OSD 主动监控电池时使用此功能！在电池电压开始低于 3.5 V 前，你不会感觉到摇杆手感变差。

**注意 4：**3D 模式下无法工作。

代码会补偿从 4.2 V 下降至用户设定警告电压 3.5 V 的电压变化。

从 4.2 V 降至 3.5 V 约等于电压下降 16%。使用 100% 补偿时，满电电池会先使电机输出降低约 16%。随电池电压下降，电机输出会动态回升至正常值，从而抵消暂降的影响。电池降至 3.5 V 或更低后，电机输出恢复正常，即回到 100%，此后无法继续补偿。

启用暂降补偿后，可能需要调整油门和电机限制。若已有低于 100 的静态 `motor_output_limit`，代码会在该限制之下进一步降低电机输出。为获得相近的总性能，可将 `motor_output_limit` 提高约 10。若有油门限制，通常无需修改。

若希望飞行开始阶段保留更多激进感，并接受飞行中稍多的“暂降”手感，可使用低于全补偿的数值；例如 50% 补偿为 `set vbat_sag_compensation = 50`。

高于 100% 的补偿可帮助暂降非常严重的 Whoop，但通常没有必要。

电池电压暂降分为两类：

- 随电池整体电压和容量下降、在数分钟内发生的缓慢下降；
- 油门突变期间，瞬时大电流负载造成的快速暂降。

若只需补偿缓慢下降，将 `vbat_sag_lpf_period` 设为 200（周期 20 秒，时间常数约 3.3 秒）。这**不会**补偿快速瞬态下降。较高值适合慢速或电影感飞行。

若需快速响应，保持默认 `vbat_sag_lpf_period` 为 2，即 200 ms。其时间常数约 33 ms，足以快速响应油门猛推和快速 Split-S 转弯一类的暂降。

Whoop 的飞行电压通常低于迷你四轴飞行器，因此警告电压常设得更低，例如 3.3 V。这样衰减范围和初始最大电机输出抑制量会更大。此时略微降低补偿量，例如设为 80%，可避免起飞时感觉过于迟钝。不过部分 Whoop 暂降很大，设为高于 100 的值可能有助于在整块电池范围内保持一致手感。

使用 HV 电芯时无需调整。

启用 `BATTERY` 调试后，OSD 或日志会显示实时发生的补偿量。

Battery debug 2 为 `compensationStrength`，取值 0 到 100。0 表示处于电池电压范围低端，已无更多补偿可用；100 表示电池刚充满，配置的最大补偿量正在生效。也可将其用作简单的 0 至 100 电池状态指示器。

Battery debug 3 表示实际施加到电机输出的降低百分比。满电时的正常值约为 160（16%）。若只使用 50% 补偿，满电时只能看到约 8% 衰减。

## 新的 Rates 模式

新增两种 Rates 配置模式，并更新了 Configurator 以图形化显示所有 Rates 配置的结果。必须使用最新 Configurator。对于电影感或自由式飞行，强烈建议使用零 Expo、低中心灵敏度的 Actual Rates。

两种新 Rates 模式名为 `ACTUAL` 和 `QUICK`。

它们允许直接且完全独立地配置摇杆中心手感、Expo 与最大横滚速率。

摇杆中心“手感”或“灵敏度”由 Rates 曲线在摇杆中心附近的斜率决定。两种新方法均可直接设置此项，不受其他 Rates 参数影响。

`QUICK` Rates 保留旧版 Betaflight 用于设定中心灵敏度的传统 rcRate 值，因此可继续使用原有数值。

`ACTUAL` Rates 可直接以度/秒设置目标中心速率。要将旧 rcRate 转换为度/秒，只需乘以 200。例如 rcRate 1.0 在 `ACTUAL` Rates 中应输入为 Center 灵敏度 200。`ACTUAL` Rates 的中心和最大数值单位相同，因此可直接比较中心附近与摇杆外侧的手感。

在两种新模式中，Expo 会将曲线特性向摇杆外侧移动，但不会改变中心灵敏度（RC Rates 曲线在中心的斜率）或最大速率。更高 Expo 会让中心速率延伸得更远，摇杆推得较远前机体都不会快速旋转；这常受自由式或 LOS Acro 飞手欢迎。较低 Expo 会把低灵敏度区域留在更靠近中心的位置，使离开中心后在整个摇杆行程内的反应更可预测；这适合中心灵敏度相对较高的竞速飞手，以及希望中心极柔和、又不想在推杆后失去太多控制力的电影感 HD 飞手。

在 `ACTUAL` Rates 中，Expo 可以降到过去无法达到的更低程度。这非常适合电影感自由式：中心足够柔和，同时较早过渡到较强控制力。

对于 LOS Acro，Actual 模式下较高 Expo 可在更大范围内带来更线性的摇杆手感，只有在摇杆推得很远时才突然进入高速翻滚。

`QUICK` Rates 的 Expo 曲线更接近传统形式。可在 Configurator 中直观查看不同曲线。

最后，用户增加 Deadband 后，最大速率现在保持不变。

这个在线计算器可[可视化 Betaflight Rates 与 Actual Rates](https://www.desmos.com/calculator/r5pkxlxhtb)，便于转换旧 Rates。
这个在线计算器可帮助设置 [Quick Rates](https://illusionfpv.github.io/)。

## 自动偏航自旋恢复配置

Betaflight 4.2 默认会自动将 `yaw_spin_threshold` 配置为略高于当前设置最大偏航速率的值。对大多数用户，这会让机体撞门发生自旋后更快激活偏航自旋修正。用户还可从竞速配置（低 Rates）切换到自由式配置（较高 Rates），再切换至 LOS 配置（极高偏航 Rates），而 `yaw_spin_threshold` 始终保持合适。

在 CLI 中通过 `yaw_spin_recovery` 设置模式。其值可为 `OFF`、`ON` 或 `AUTO`，默认是 `AUTO`。若要手动设置阈值，选择 `ON`，然后在 `yaw_spin_threshold` 中设定所需数值。

我们预期 `AUTO` 对所有用户都是最佳选择。更多信息见[此处](https://github.com/betaflight/betaflight/pull/9455)。

## 与 I 值解耦的 Antigravity 增益

过去，Antigravity 增益值作为 PID `I` 值的乘数。这意味着 PID `I` 增大时 Antigravity 效果也会增强，反之亦然。若用户将 PID `I` 提得很高，快速改变油门时可能出现 I 驱动的摆动；若降低 PID `I`，则可能导致 Antigravity 效果不足。

4.2 中，Antigravity 效果不再依赖用户的 PID `I` 值，只由 Antigravity 增益本身调整。

若之前使用高于默认值的 PID `I`，要获得与过去相同的 Antigravity 效果，就需要相应提高 Antigravity 增益；反之亦然。调整幅度应与旧 I 值相对 4.1 和 4.2 默认 I 值的比例相对应。

## 改进的动态陷波滤波器

动态陷波滤波器经过大幅改进。它现在可在更宽频率范围内更准确地识别和跟踪峰值，大多数四轴飞行器的表现都会更好；对于非标准陀螺仪频率也更精确。

现在不再使用 `AUTO`、`LOW`、`MEDIUM` 或 `HIGH` 选择范围，而是通过 `dyn_notch_max_hz` 设置希望动态陷波覆盖的实际最高频率。动态陷波随后会在其最小和最高频率之间帮助控制噪声。

默认 `dyn_notch_max_hz` 为 600 Hz，最适合大多数四轴飞行器，但可微调。最佳值取决于是否使用 RPM 滤波及机体的 RPM 范围。

若原来使用 `LOW`，`dyn_notch_max_hz` 约 350 Hz 大致等效；若原来使用 `HIGH`，约 700 Hz 可能足够。很少有四轴飞行器的 RPM 实际会高于此范围很多。

未使用 RPM 滤波时，动态陷波必须覆盖电机产生的全部可能频率范围。可通过使用 debug `GYRO*SCALED` 记录日志，并查看频谱分析报告的最高频率，精确确定所需值；也可估算为理论峰值空载 RPM 的 70%。例如，2000 KV 电机搭配 6S 的空载 RPM 为 `2000 * 6 _ 4 = 48000 rpm`。其 70% 为 33,600 rpm，除以 60 得到 560 Hz。

慢速飞行器和 X-class 四轴飞行器应将 `dyn_notch_max_hz` 设为约 350 至 400 Hz，并将 `dyn_notch_min_hz` 调低于默认值。较低的最大值会带来高于默认设置的频率分辨率。

使用 RPM 滤波时，电机噪声谱线通常会被完全消除，动态陷波几乎无事可做；在许多情况下可关闭。但它仍可用于衰减残余噪声或机架共振。若没有特定机架共振，它会大致停留在频率范围中部；默认值会让它避开关键区域，造成相对较小的延迟。

如果存在特定频率的共振，可将最小和最大值分别设在共振线两侧。例如 150 Hz 共振，可尝试最小值 100、最大值 200。

无论最大值设得多低，内部实际使用的值都不会低于最小值的两倍，这是保证代码正常工作的必要条件。

4.1 调参说明中关于陷波宽度和 Q 因子的建议仍然适用。简而言之，使用 RPM 滤波时：

```
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
```

以下设置恢复未使用 RPM 滤波时的默认值：

```
set dyn_notch_width_percent = 8
set dyn_notch_q = 120
```

## 设定点模式下的 Iterm Relax 正常工作

4.0 和 4.1 存在影响 Iterm Relax 设定点模式的缺陷。设定点模式使用默认值时没有问题，但改变 `iterm_relax_cutoff` 几乎没有效果；Iterm Relax 的陀螺仪模式不受影响。

这就是为何此前只有在陀螺仪模式下降低 `iterm_relax_cutoff` 才似乎能更好控制回弹。现在，设定点模式在所有 `iterm_relax_cutoff` 值下都能正确工作。

建议大多数用户在 4.2 切回设定点模式。

调节 `iterm_relax_cutoff` 以减少翻滚或横滚后的 I 驱动回弹时，应以“能充分控制回弹的最高值”为目标。

为确认自由式四轴飞行器的回弹是否与 I 有关、而非其他原因，可临时将 `iterm_relax_cutoff` 设为较高值，例如 40，然后试飞。若回弹明显加重，再逐步降低 `iterm_relax_cutoff`，直至获得足够控制。

对于大多数搭载 GoPro 的现代自由式四轴飞行器，将 `iterm_relax_cutoff` 降至约 10 应足够。7 英寸机型可能需 5 至 7；X Class 可能需要 5 或更低。

## NFE Race Mode

此功能仅在自稳模式下有效。

启用后，自稳仅作用于横滚轴；俯仰轴的行为与 Acro 模式相同。

使用以下 CLI 命令启用：`set level_race_mode = ON`。

## OSD 改进

现在每次解锁时都可以显示自定义徽标。
在比赛日展示它 :-) 使用 `set osd_logo_on_arming = ON`。
可选值为 `OFF`、`ON`、`FIRST_ARMING`。

CRSF 链路质量现显示为 A:BB，其中 A 为 RF 模式（2 = 150 Hz，1 = 50 Hz），BB 为链路质量。
这一改动让链路质量告警可正常工作。

OSD 新增以下元素：

- 相机画幅（#9261）
- 距离返航点告警，以闪烁方式显示距离。注意：距离单位为米。（#8862）
- 以 mAh/km 或 mAh/mi 表示的效率（#9601）

## Configurator 改进

RC Rates 配置标签页现在完全支持以图形方式显示全部受支持 Rates 方法的曲线形状，并配有图标。

P:D 平衡滑块现在调节 D 而不是 P，因此更容易测试 D 的细小变化。

可在 PIDs 标签页启用和调节动态怠速。

启用 Dmin 后，D 列会改名为 Dmax，以更准确说明其作用。

偏航 P 的调整方式与俯仰和横滚相同，默认值略高。

---

---

鸣谢：

- 环路时间、调度器、RC 时序：eTracer
- RC 平滑：eTracer 和 ctzsnooze
- 插值设定点、前馈改进：JoeLucid 和 ctzsnooze
- 动态陷波改进：ctzsnooze
- DLPF Expo、独立 Antigravity 增益：IllusionFPV
- Quick Rates 方法：IllusionFPV
- Actual Rates 方法：ctzsnooze
- Rates 模型可配置化：fgiudice98
- 电池电压暂降补偿：ctzsnooze
- 自动偏航自旋阈值：eTracer 和 ctzsnooze
- NFE Race Mode 移植：Phobos、NotFastEnuf
- 解锁时的 OSD 徽标、返航点距离：eTracer
- OSD 电池效率：DavidBoone
- H7 和 G4 MCU 实现：jflyper
- 出色的 Configurator：mikeller、McGiverGim、Asizon
- LUA 脚本：klutvott123

Bug 修复：eTracer、jFlyper、mikeller，以及许多其他贡献者。

让所有人和所有内容保持在正轨上：mikeller。

鼓励与测试：bizmar、iCr4sh、SugarK、BigRuss、BMSThomas，以及许多其他人，感谢！
