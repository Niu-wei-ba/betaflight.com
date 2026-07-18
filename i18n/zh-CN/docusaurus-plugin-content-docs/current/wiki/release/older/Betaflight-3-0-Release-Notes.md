---
sidebar_position: 13
sidebar_label: 3.0 发布说明
---
# 3.0 发布说明

这确实是一个重大版本。完整详细的更改列表可以在提交历史记录中找到。
[https://github.com/betaflight/betaflight/commits/master]

以下是 joshuabardwell 制作的 3.0.0 版本概述视频：
[https://www.youtube.com/watch?v=Fz1IcxWpZfg]

Betaflight 是一个真正的开源项目，全世界的人们都为代码做出了贡献。不只是我一个人这样！
约有 15 至 25 名才华横溢的开发者在过去两个月中夜以继日地参与了 3.0 的开发。
我衷心感谢每一位参与者；他们帮助我和其他人学习更多知识，并共同促成了这次发布。
上周也诞生了许多优秀想法，足以支撑我们在未来数月持续开发。
鲍里斯

此版本对底层代码作了大量调整，因此单独设立本节。

本文只计划列出并说明相对于此前 2.x 版本的差异。

以下是 Boris 给初次尝试 3.0 用户的建议：
只使用配置器中提供的选项，其余设置保留默认值。

Betaflight 有 2 个不同的目标。

1. 提供极其稳定的固件和可靠的默认设置，让用户随时都能直接飞行。

2. 从研究与实验的角度，持续改进并引入新功能同样重要，让愿意尝试的用户能够提供宝贵反馈。这些选项大多位于 CLI 中。

### Betaflight 3.0.1（3.0 补丁 1）

- 完成 OSD 代码（提供更多 OSD 配置选项）。
- 将 Relaxation 参数改为过渡参数。在高设定点权重和高角速度下，它能更有效地抑制回弹。配置器中的两个滑块现为 `Dterm Setpoint` 和 `Dterm Transition`；请参阅 2DOF PIDC 说明的补充内容。
- 修复部分飞控板气压计无法工作的故障。
- 为陀螺仪增加第二个陷波滤波器（`set gyro_notch1_hz` 与 `set gyro_notch2_hz`；新版 1.8.3 配置器同样提供此设置）。
- 增加可配置的 `pidSum` 限制。
- 新的滤波器默认值（默认启用陷波滤波器）。
- 增加 `BEEBRAIN` 目标。

## Betaflight 3.0.0-RC14（支持 F4）

#### 最终版本

这确实是一个重大版本。完整详细的更改列表可以在提交历史记录中找到。
[https://github.com/betaflight/betaflight/commits/master]

变更简短摘要：

- 支持 STM32 F4（BLHeli passthrough 可用）。
- 全面重构 IO。
- 大幅拆分 target，便于实现新的 target。
- 重构 PWM 代码。
- 添加了 OSD 集成
- 大规模清理和重写代码。
- 增加与配置器的集成。
- 新的 Betaflight PID 控制器以 deg/sec 为基础。今后的开发都会在此 PID 控制器中进行。原有的 Legacy PID 控制器仍会保留；它本身也近似于一次演进式重写，但不再继续变更。
- 新 Betaflight 2DOF PID 控制器提供额外配置参数。请在配置器中查看对应选项；相比之下，它能以更少的微分作用获得相同效果，并降低超调比例。
- 恢复 RC 插值，并提供多种选项（选择 `AUTO` 可自动配置接收机速率）。
- 新增 `diff` CLI 命令，便于备份配置。
- 移除 Super Expo 独立功能，因为它已并入 Super Rates 并默认启用。
- 扩大线性速率范围。`rc_rate` 高于 2.0 时增幅更大，2.55 可提供完整线性的 2000 deg/sec。请用配置器的 Rate 工具查看速率曲线。
- RC EXPO 曲线更加平滑（请使用配置器 Rate 工具优化速率调校）。

RC2 - 更改默认值/清理 ONESHOT125 功能
RC3 - 基于反馈的默认值 // yaw_axis 添加到插值 // 添加其他配置参数 // 修复 KISS 上的 PPM
RC4 - 根据新的公开测试调整默认值 // 修复 SPI target 的若干错误分母默认值
RC5 - 根据新的公开测试调整默认值 // 修复滤波器重新初始化导致 CPU 占用升高的问题 // 增加 Sparky2 // 修复多个 target
RC6 - 默认值调整 // 将 `zero_throttle_stabilisation` 改名为 `pid_at_min_throttle` // 清理 CLI
RC7 - 修复 F4 `diff`/`dump` 崩溃 // 修复 Sparky2 // 修复较高 PID 分母下 D 滤波器系数错误 // 增加新的 Blackbox 标头
RC8 - 默认值（260 Hz 陷波滤波器） // 增加 `diff showdefaults` 命令 // 更改部分 CLI 名称 // 增加 MSP 参数 // 提高 I2C 陀螺仪 target 的 GPIO 速度 // 增加 Blackbox 电机测试 // 改进 FPV 角度混合功能 // 减少 PID 循环忙等 // 增加新 target `ISHAPEDF3` // 修复 Revo 的 PPM
RC9 - 支持所有目标（忽略 pid 循环上的 int pin）
RC10 - 默认值调整 // 清理 // 从 OPBL CC3D target 中移除 Betaflight PIDC（完整支持请使用 hex）
RC11 - 修复 D-term 设定点范围 // 修复 Sparky I2C
RC12 - 移除 Naze32 的声纳以释放闪存空间 // 移除 Super Expo feature；设置 `srate` 时 Super Expo 会启用 // 扩大线性速率范围：`rc_rate` 高于 2.0 时增幅更大，2.55 可提供完整线性的 2000 deg/sec // 按 2.8.0 RC4 的方式重新定义 EXPO，`rc_expo` 现为 power expo // 提高速率代码效率 // 清理速率代码 // 修复 F4 的 BLHeli passthrough // 增加 `RCEXPLORER` target
RC13 - 大幅修复中心附近的 RC EXPO 曲线 // 修复配置器中的 angle mix 模式 // 可通过 CLI 命令 `dfu` 强制 F1 和 F3 进入 DFU 模式 // 修复错误的气压计检测 // 修复 LEDSTRIP 西向指示器
RC14 - 默认禁用偏航滤波器 // 将 P-term 设定点权重改作仅作用于 Super Rates // 改进陀螺仪调试 // 修复 Sparky2 蜂鸣器

新的 1.8.0 地面站 (RC14) 支持一些额外的调整参数。不要忘记查看工具提示以获取解释！
新版 Blackbox 2.5.6 支持所有新参数。

1.7.8 地面站（RC12）
1.7.7 地面站（RC11）
1.7.6 地面站（RC10）支持一些额外的调整参数。不要忘记检查工具提示以获取解释！
RC 8 及更高版本的 1.7.5 地面站支持一些额外的调整参数。不要忘记检查工具提示以获取解释！
若在 RC7 之前的版本中尝试陷波滤波器，并使用独立的陀螺仪及 PID rate/denom，则必须升级至 RC7，因为此前系数计算存在缺陷。

对于 RC 7 及以下版本，请使用 1.7.2 地面站。

1.7.1 地面站支持一些额外的调整参数。不要忘记检查工具提示以获取解释！

2.x 的 PID 数值可迁移到 3.0，因为缩放比例相同；但得益于新 PID 控制器的功能，即使缩放比例未变，预期仍可使用更高的 PID 值。

### 新的 CLI 命令

请注意，绝大多数设置更适合通过新版 Betaflight Configurator 图形界面完成。
如果此处未列出 CLI 命令，则它很可能未更改，因此请查看“CLI 命令”页面。
如果有错误、缺失等，请在鲍里斯的帖子中发布有关错误的注释。
务必在 CLI 中输入 `help` 查看全部命令。

#### diff

用于查看与默认值不同的设置，便于了解配置器修改了哪些 CLI 值。
分享 CLI 配置时，它也比 `dump` 更合适，因为它只输出偏离默认值的设置，而不是输出全部内容。

#### diff all

显示所有配置文件和费率配置文件的差异

#### diff all commented

查看默认值

#### feature SUPEREXPO_RATES or feature -SUPEREXPO_RATES

启用或禁用 Super Expo。即使以 feature 形式禁用，仍可通过 AUX（Modes 选项卡）开关启用。

RC12 移除了 Super Expo feature。设置 `srate` 时，Super Expo 会自动启用。
这意味着此前使用 `rc_expo` 的用户可能需要重新调整它，通常只需降低数值。
虽然 CLI 仍需进一步清理，但 Super Expo feature 已实际不存在。使用 `srate`（旧 rate）时 Super Expo 自动启用；设为 0 即禁用。
希望获得无 Super Expo 的线性速率，可提高 `rc_rate`。所有高于 2.0 的 `rc_rate` 增幅显著提高；2.18 约为 1000 deg/sec，2.55 为 2000 deg/sec。随后可再加入适量 `rc_expo`。
这一方案提供了更灵活的速率行为。
不使用 `rc_expo` 时，无需进行相应计算，CPU 占用会更低；`srate` 同理，未使用时也不会执行 Super Expo 计算。

当时的配置器尚不能正确显示这些速率；待配置器更新后即可支持，预计很快发布。

#### set rc_interpolation = AUTO

*[OFF, PRESET, AUTO, MANUAL]*

此功能会增加 CPU 负荷，但可支持更高的 D-term 设定点权重并获得更干净的电机输出。若 CPU 负载过高，请设为 `OFF`。
注意：`AUTO` RC 插值根据接收机自身上报的速率判断接收机速度。但部分接收机（如 X4RS）在通道数超过 8 时可能上报 9 ms 间隔，而横滚与俯仰实际间隔为 18 ms。

#### set rc_interpolation_interval = 19

*[1..50]*

#### set motor_pwm_protocol = OFF

*[OFF, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED]*

#### set zero_throttle_stabilisation = OFF

*[ON, OFF]*

注意：这仅适用于 RC5 之前的版本。在 RC6 及更高版本中，它更改为：

#### pid_at_min_throttle = OFF

*[ON, OFF]*

设为 `OFF` 时，油门值低于 `min_check` 的情况下，PIDC 不响应摇杆，行为与原始 MultiWii、BaseFlight 或 CleanFlight 相同。

#### set airmode_activate_throttle = 1350

*[1000..2000]*

这是 AirMode 首次开启的油门阈值（激活点）。油门首次达到该值时，AirMode 开启，并持续至解除解锁。其目的是在仍处于地面时保持 AirMode 关闭；油门一旦超过该设置，AirMode 会在整个油门范围内保持启用。

#### set yaw_rate_acceleration_limit = 50?

*[0..200?]*
RC12 中改名为 `rate_accel_limit`。

偏航角速度加速度限制是 Betaflight（2DOF）PIDC 对偏航跳变抑制的替代方案。它采用不同且更有效的工作方式，限制偏航轴的快速加速与减速，因为这类变化正是跳变的来源。Legacy PIDC 请使用 `d_yaw`。

摇杆可能要求四轴飞行器达到超出其能力的状态，但 PID 控制器仍会尝试纠正并提高电机输出，从而产生突兀动作。加速度限制为 PID 控制器提供保护：限制加速度使其更平滑，也有助于抑制偏航轴上较严重的 I-term windup。
横滚和俯仰轴也可采用相同机制，但默认关闭；启用后可获得更平顺的飞行特性。

#### set gyro_lowpass_level = HIGH

*[NORMAL, HIGH]*

设置截止滚降的强度/陡峭程度。更陡的滚降相比平缓滚降会引入更多延迟。
Boris 表示：“以我对下降设置的看法，陀螺仪不需要特别陡的截止；D-term 才是需要更多滤波的一侧。”

### 以下 CLI 命令针对每个配置文件，因此每个配置文件中的命令可能有所不同。

#### set pid_tolerance_band = 0

*[0..200]*

#### set tolerance_band_min_reduction = 40

*[0..100]*

降低 PID 控制器不断搜寻误差的效应。
PID 控制器始终在搜寻误差，其中 P 与 D 的反应最快。当误差很小，例如前飞或悬停时，并不需要大量修正；PID 控制器会适度“放松”，避免持续追求绝对误差为零。其放松程度由 `tolerance_band_min_reduction` 的百分比确定。
例如，可借此在一定程度上消除偏航噪声，但可能需要重新调校。

#### set pid_controller = BETAFLIGHT

*[LEGACY, BETAFLIGHT]*

#### set dterm_lowpass_level = HIGH

*[NORMAL, HIGH]*

设置截止滚降的强度/陡峭程度。更陡的滚降相比平缓滚降会引入更多延迟。

#### set dterm_lowpass = 100

*[0..500]*

#### set dterm_notch_hz = 0

设为零即禁用该滤波器。

*[0..500]*

#### set dterm_notch_cutoff = 150

*[1..500]*

#### set dterm_setpoint_weight = 120

*[1..200]*

### RC8 CLI 的变更

新增设置：

#### set blackbox_on_motor_test = OFF

*[OFF,ON]*

#### diff showdefaults

新增默认值：

#### set dterm_notch_hz = 260

#### set dterm_not
off = 160

#### set pid_at_min_throttle = ON

#### set failsafe_procedure = DROP

*[AUTO-LAND,DROP]*

### RC12 CLI 中的更改

新配置器会以 deg/sec 表示 RC rate，即摇杆最大角速度。
Expo 及其他设置最终也会以正确名称显示。

#### set rate_accel_limit = 0

*[0..1000]*
提高该值可帮助降低低动力四轴飞行器的回弹。

#### set yaw_rate_accel_limit = 220

*[0..1000]*
名称已更改。说明请参阅上文 `yaw_rate_acceleration_limit`。

#### set accum_threshold = 130

*[15..1000]*
#### set yaw_accum_threshold = 32

*[15..1000]*

#### set iterm_throttle_gain = 0

*[0..200]*
Joshua Bardwell 的说明：
`iterm_throttle_gain` 源于我提出的一项建议：大致按油门位置的导数提高 I 增益。我注意到，为在油门急加速和急收油时保持俯仰一致性，必须显著提高 I 增益，可能约 20 点。因此我建议在油门快速变化时人为提高 I 项。`iterm_throttle_gain` 用于控制这种提高的强度。

#### set zero_cross_allowance = 2

*[0..50]*

#### rc_rate, rc_rate_yaw

不带曲线的线性速率，可配置至 2000 deg/sec。

#### roll_srate, pitch_srate, yaw_srate

与此前相同的 Super Expo rate，但不再需要通过 feature 激活。设为 0 即禁用 Super Expo；例如现在可只在一个轴上启用，而不在另一个轴上启用。

#### rc expo

新版 Expo 使用更低数值，曲线更平滑，并提供更多中点手感调节空间，特别适合线性速率。

注意：`srate` 取代旧的 Roll、Pitch 与 Yaw rate，因此仍可通过使用 MSP 的应用（例如 MWOSD）调节。

调整超级博览会费率的技巧。

将 `rc_rate` 调至符合预期的中段摇杆手感，再增减 `srate` 以改变过渡和最大摇杆角速度。
`srate` 的优点是，即使两端变化，它也会尽量保持中段手感不变，类似反向 Expo 的概念。

ctzsnooze 的帖子解释了这些设置：
[http://www.rcgroups.com/forums/showpost.php?p=35602942&postcount=37292]

Boris 的帖子展示旧速率与新速率，以及使用和不使用 SRATE 设置时的差异：
[http://www.rcgroups.com/forums/showpost.php?p=35704903&postcount=38205]

注意：关于 Rates 与 Expos 的历史，请参阅 FAQ 中的 “What is the story on the different Rates and Expos?”。

### RC13 CLI 中的更改和新功能

命令 `dfu`：

强制 F1 和 F3 进入 DFU 模式。

### RC14 CLI 中的更改和新功能

将 P-term 设定点权重改作仅作用于 Super Rates。

## 关于使用新功能的讨论：

### Legacy PID 控制器

这是重写的 MWREWRITE PID 控制器，使用整数运算而非浮点运算。
部分用户可能更喜欢它；也建议在 F1 处理器上用它运行更高的 PID loop rate。

### Betaflight 2DOF PID 控制器

这是全新的 PIDC。
P、I、D 三个分量彼此完全独立地工作，因此属于并联 PID 控制器。
此外，它将 2DOF 架构的设定点权重用于微分分量。因此从技术角度说，它对应[此处](https://www.mathworks.com/help/control/ug/two-degree-of-freedom-2-dof-pid-controllers.html?s_tid=gn_loc_drop) `pid2` 中的 Kp、Ki、Kd、c。

Boris 关于 Legacy 和 2DOF PIDC 差异的帖子：
[http://www.rcgroups.com/forums/showpost.php?p=35460572&postcount=35822]

Joshua 的帖子解释了 2DOF PIDC 和设定点权重：

Betaflight 3.0 的新型二自由度 PID 控制器是最令人兴奋的功能之一。以下说明新的“设定点权重”滑块的作用，也会介绍新的 RC 插值功能。

PID 控制器中的误差可分为外部扰动产生的误差，以及移动设定点产生的误差。2DOF PID 控制器可以区分这两类误差；换言之，它允许控制 PID 对摇杆动作的响应激进程度。

P 项设定点权重主要控制超调。提高 P 项设定点权重会带来更锐利的摇杆响应、更低的 P 增益，以及更多超调和振荡；降低它则会带来更柔和的响应、更高的 P 增益，以及更少的超调和振荡。

D 项设定点权重较难描述。提高它会使整体飞行手感更锐利、更精确，但也会因精确响应摇杆的每个细微变化而降低平顺性。降低它则会带来更平滑、更“自然”的飞行体验，但响应会更柔和、精确度也更低。

关键在于：这些特性仅在 PID 控制器响应摇杆动作时显现。摇杆不动或缓慢移动时，影响不明显或不存在，PID 控制器的工作方式与此前完全相同。因此，P、I、D 用于调校四轴飞行器对全部输入的整体响应，包括风等外部扰动；设定点权重滑块则专门调校其对摇杆动作的响应。

Joshua 的有关此内容的视频（注：适用于 3.0）：
[https://www.youtube.com/watch?v=4zncyYdAZPU]

### V3.0.1

D-term setpoint：0 = Measurement，1 = Error。高于 1 表示更多 Error/更多摇杆导数；2 = 两倍 Error。
第二个滑块原本是 P setpoint，与 2DOF PID 控制器及各 RC 版本中的最初描述一致；但其效果不如预期，因此被改作第一个滑块的 Transition。
进入横滚动作时使用 Error；从横滚回到中点摇杆时，则更多地过渡至 Measurement，使动作更平滑。
此处 D setpoint transition 为 1 表示完全不发生过渡，即完全采用设定点权重中的 Error。低于 1 时，摇杆回中会逐渐、更平滑地过渡至 Measurement。

例如，若你喜欢 Measurement 在快速摇杆输入下的平滑性，同时也喜欢 Error 带来的灵敏、偏机械式响应，现在可以在两者之间取折中：保持很高的摇杆响应，又不牺牲回中时的平滑性。
我个人使用 2.0 的 setpoint 和 0.3 的 transition。0.3 类似于摇杆回中时的指数曲线，可让旋转角速度更早减慢，而非到最后一刻才减速，从而防止突兀感。

#### 关于“设定点权重”滑块使用及最新 Betaflight PIDC（2DOF）调校的新资料暂列于此。以下帖子来自成功通过这些设置“调掉”不良飞行行为的用户。

这些内容也许应加入新的 FAQ；欢迎在 Boris 的讨论帖中提出建议。

##### ctzsnooze 的一般解释：

在湍流中飞行时，四轴飞行器会受到大量外部输入。若气流拍击使设定横滚角速度与陀螺仪报告值之间产生误差，PID 系统必须进行修正。大多数 PID 系统会对外部影响“欠校正”，因为“过度校正”会引发振荡。调校的目标是尽可能减小欠校正幅度。调校得很高的四轴飞行器会始终接近自振荡临界点；通常不会调得这么高，因为它难以容忍状态不佳的螺旋桨，电机还可能过热。不过有了新的滤波选项，有时可提高调校强度而不产生这些问题。

I 项的建立和释放都需要时间。因此，以中速穿过略有颠簸的空气且出现“航线漂移”时，提高 I 项通常有帮助。但 I 项过高可能导致：离开一股气流并进入下一股时，累积的 I-term 修正恰好朝相反方向作用，需要约半秒才会“释放”。所以增加 I-term 并非总能解决问题；它当然无法修复快速抖振，因为响应太慢，过高的 I 对缓慢漂移也未必有益。

另一方面，D 对突变立即响应；抖振越快，其响应也越快。它对缓慢漂移几乎不起作用（这正是 I 项的任务）。

P 可应对任何速度的抖振，但主要在角度偏差较大时发挥作用；对于微小而快速的偏差，D 更有效。四轴飞行器若已调校良好且横滚停止干脆，通常也应有良好的抗风表现。

若滤波较重、螺旋桨相对电机偏重，且四轴飞行器本就有桨流扰动或摆振问题，它大概也难以有效应对风致抖振。

若要在强湍流中高速飞行，需要非常灵敏的 P、D 以及响应快的轻质螺旋桨。四轴飞行器的空气动力学表现越好越有利。可尝试将 P、D 提高到高于“常规”值，并观察能否在略高滤波下运行，即采用更激进的调校。这样的调校可能增加电机过热或其他振荡风险，也要求螺旋桨状态良好，因此未必适合作为日常调校；但通常会比调校较低的机体更能应对风。

##### 来自 QuadMcFly 的帖子：

我曾尝试在主力特技四轴飞行器上调校这些顽固的 5x4.5x3HBN 螺旋桨，主要只是想看看能否调好。关键做法最终有些反直觉。

基本上，我必须调整 3.0.1 的设定点滑块以补偿螺旋桨较慢的过渡速度，且做法与直觉完全相反。D 设定点滑块必须几乎推到最左，Transition 设定点滑块则推到最右，因此本质上近似旧版的“Measurement”D 计算方式。随后可重新提高 P 增益，弥补 Measurement 方法带来的平滑性并恢复一些干脆感。还必须大幅提高 D 才能抑制桨流扰动；虽然尚未完全消失，但效果已相当好。横滚和俯仰 I 增益也很高。结果令人满意：高油门时仍有少量桨流扰动，但应可用少量 TPA 消除，又不会牺牲太多摇杆手感；当前 TPA 为 0。

#### 来自 Woody_99 的“BB 日志视频回复”主题的帖子：

- 问题：需要一点帮助来微调我的几台 X 型四轴飞行器。
（130 和 250 尺寸。BF 3.01）
在激烈的高油门 180 度转弯中，两台机都有些抖动。
我持续提高 D，这似乎有帮助，但方向对吗？电机并不热。
根据我的理解，这似乎是正确的，但我想再次检查我是否走在正确的轨道上。
- 建议：是的，只要电机不发热，提高 D 应是抑制桨流扰动的正确方向。
务必运行 Blackbox 日志，检查振荡及其他异常。

BF 3.0.x 仍很新，但 Boris 的讨论帖已讨论 PID 选项卡中的两个滑块。调整它们似乎确实可帮助消除桨流扰动并优化飞行表现。不过公开经验很少，因此对具体调法所知有限。

- 结果：两台机的 D 都只提高了几个点。桨流扰动有所改善，但仍然存在。
我没有继续提高 D，而是尝试顶部滑块（Setpoint Weight）。130 尺寸机第一次调整后，Setpoint Weight 为 2.36 时桨流扰动完全消失。
250 尺寸机作相同的首次调整后更好，但仍有少量问题；第二次调整后，第二台机的抖动也消失了，Setpoint Weight 为 2.46。
两台机的 Setpoint Transition 都为 0.3。

这可能只是安慰剂效应，因为我并不清楚滑块的具体作用；但两台四轴飞行器的表现都前所未有地好。
电机温度只略高于环境温度，因此我认为已经调好。
但电池就未必如此了，今天飞得太好，我确实把它们压得很狠。

##### Boris 对 Dterm 滑块的评论：


这两个滑块很简单，只要用极端值体验差异即可。
上方滑块决定摇杆响应的锐利程度（摇杆输入的加速度）。
下方滑块决定摇杆回中时响应的平滑程度。

上方滑块高：响应最锐利。
下方滑块高：摇杆回中时响应最锐利，但也最可能产生突兀感。因此可使用更高的 Transition 减速度将其平滑化。

##### Tesseract1984 的滑块调校建议：

我的自由式设置是将上方滑块降至 1.7，再调整下方滑块直至消除回弹；最终数值为 0.8（修正）。

注意：使用该方法前，四轴飞行器必须已完成良好调校：没有噪声问题，桨流扰动极少（我改用 DShot 后几乎没有桨流扰动）。若未先完成基础调校，只会不断追逐这些滑块，难以判断它们对调校的实际影响。

先调 PID，最后再调滑块。这只是个人经验，或许有更好的方法，但它对我有效。另外，调校时不要畏惧使用 D；在监测电机温度的同时持续提高，直至桨流扰动受控。我的 3.1 数值比其他任何版本都高得多。

Boris 的回复：

这说法有效。不同螺旋桨所需的滑块值甚至可能不同。对于通常弹性更强的 bullnose 螺旋桨，我倾向于使用较低的 Setpoint Transition，这样无需牺牲调校的锐利度。

Joshua Bardwell 关于 [Betaflight 3.0 设定点权重（2DOF PID 控制器）](https://www.youtube.com/watch?v=4zncyYdAZPU) 的视频

##### 来自 Tesseract1984 的更多调整提示：

是的……我几乎认为 3.0.1 之后应该有一段说明，提醒大家重新审视可接受数值范围的固有看法。

我记得在 2.9.1 中，D 一旦超过 26 就意味着调坏了，通常必须从头开始。现在 3.1 的横滚与俯仰 D 分别为 46、50，电机仍然很冷。相同动力系统的 P 也比其他版本高很多。由于桨流扰动已经控制良好，我基本不再继续提高 D。

是的，若动作结束时发生回弹，降低 Transition 滑块同样有帮助。

场景 1：桨流扰动

- 提高 D，同时留意电机温度。
- 电机温度高但仍有桨流扰动？降低 P，再次尝试提高 D。

场景 2：摇杆回中时的行为

- 调整滑块。
- Transition 滑块专门在摇杆回中时引入部分减速，使停止不那么突兀。

### 零油门时的 PID 控制

原帖作者 MasterZap：

我尝试清楚说明如下：

正如 Boris 所说，这里有三项设置：

Motor Stop（2016 年不应再使用，忽略即可）

Air Mode（所有人都应使用）

`pid_at_zero_throttle`

!! BORIS - 若我有误请纠正我！

刚解锁时，`pid_at_zero_throttle` 会完全关闭 PID。电机转速高于零后，PID 开始工作。至于其是否持续工作到解除解锁，我不确定；但如下所述，这并不重要。

我猜这个“功能”的动机是避免用户抱怨台架上电机转动，或许如此。对我而言，使用下挂式电池时，四轴飞行器几乎无法站稳；我实际上希望零油门仍有 PID，否则解锁后它必然会翻倒。我*需要*它在地面上保持稳定。

AirMode 同样有启动阈值；超过该阈值后，它会保持开启至解除解锁。此外 AirMode 覆盖 `pid_at_zero_throttle`。即使 `pid_at_zero_throttle` 本身不保持状态，AirMode 会保持状态，且由于覆盖关系，它使 `pid_at_zero_throttle`“实际上保持有效”。因此，只要加过油门，在解除解锁前都拥有完整控制权。

是否已越说越清楚？

/Z

### 陷波滤波器

请参阅：[Blackbox 日志记录与使用](/docs/wiki/guides/current/Black-Box-logging-and-usage)

以下说明陷波滤波器。

Joshua Bardwell 关于陷波滤波的视频：
[https://www.youtube.com/watch?v=UQOqYOBSCc8]

Robogenisis 演示是否使用陷波滤波器的短视频：
[https://youtu.be/ic6Np86Jsrs]

关于如何以及何时设置 LPF 和陷波滤波器的讨论：
[什么时候应该添加什么过滤器？](http://www.rcgroups.com/forums/showpost.php?p=35727622&postcount=38376)
[...当尝试减少 dterm 振动时，您如何决定何时 i) 增加 dterm 过滤，以及 ii) 只是稍微减少 dterm 增益？](http://www.rcgroups.com/forums/showpost.php?p=35728426&postcount=38380)

R.A.V. 的说明：

以下是对 3.0 新陷波滤波器的解释，结合新的 PR 编写。也许 waltr 最清楚其中内容应放在 Wiki 的何处。

摘自维基百科：

引文：在信号处理中，带阻滤波器（band-stop 或 band-rejection filter）让大多数频率不受改变地通过，同时将特定范围内的频率衰减至很低水平。它与带通滤波器相反。陷波滤波器是阻带很窄（高 Q 因子）的带阻滤波器。

PID loop 依据当前陀螺仪角速度和设定点计算误差，并命令电机修正该误差。电机响应速度有限，尝试修正 200 Hz 以上高频成分没有意义。
因此引入低通滤波器。它会保留大多数低于截止值的频率，但在截止频率处已衰减 -3 dB，且随频率升高衰减增加。
遗憾的是，部分配置噪声极大，现有衰减不足，为去除 200 Hz 以上噪声只能把滤波器截止频率降至 70 Hz 或 60 Hz。
这会损失截止频率至 100 Hz 之间的有用信息。更低截止频率也表示更高的滤波器延迟，尤其不利于 D-term，且可能加剧桨流扰动。

陷波滤波器是可为陀螺仪数据和 D-term 数据启用的附加滤波器。在信号进入低通滤波器前，它会去除大量噪声。
这样便无需把低通滤波器的截止值降得过低。
低带宽陷波滤波器配合高截止低通滤波器，相比单独使用低截止低通滤波器，延迟更小、噪声更少。

默认情况下滤波器关闭；设置中心频率后即启用。
中心频率由 `gyro_notch_hz` 调节，下侧截止频率由 `gyro_notch_cutoff` 调节。
对 D-term，对应设置为 `dterm_notch_hz` 和 `dterm_notch_cutoff`。

中心频率应为电机平均频率，很可能在 200 Hz 至 300 Hz 之间。
设置截止值时，应避免让滤波器范围低于 100 Hz。请记住，该频率处的衰减已经是 -3 dB。

我的四轴飞行器噪声很大，平均电机频率为 250 Hz，以下设置运行良好：
```
gyro_notch_hz = 250
gyro_notch_cutoff = 130

dterm_notch_hz = 250
dterm_notch_cutoff = 130

gyro_lowpass = 110
dterm_lowpass = 0
yaw_lowpass = 0
```
这表示陷波滤波器先从陀螺仪信号移除噪声，再由低通滤波器进一步改善信号。
D-term 中仍存在部分噪声，因此需要另一个滤波器。我的案例中，单独的陷波滤波器已足以消除残余噪声；相比低通滤波器，其延迟更低，并让 D-term 与 P-term 保持更一致的相位。
对于这台已滤波陀螺仪的四轴飞行器，偏航不需要滤波。

陷波滤波器要求在陀螺仪与 D-term 的每个轴上执行额外浮点运算，因此 F1 target 启用后可能变慢。
我认为，正确设置的陷波滤波器也能帮助噪声较低的四轴飞行器，尤其对 D-term 有益。

没有 Blackbox，很难确定中心电机频率。我已研究查看器当前的频谱实现，并会增加更容易获取频率的选项。该值无需极其精确，建议从中心频率 200 至 250 开始。4S 上的高 KV 电机会比 3S 上的低 KV 电机产生频率更高的噪声。

Cutoff 描述滤波器响应的下限；为降低延迟，不应设得过低。我认为没有人需要低于约 130。

### 横滚/偏航云台混控

来自 FieserKiller：

请注意，在此版本 BF 中它不再永久生效，必须在 Modes 选项卡中配置。我把它绑定到一个开关，因此终于可以让朋友驾驶我的四轴飞行器，而不会因不熟悉的控制方式而坠机。

### 调整技巧

#### 俯仰轴 D 可以提高到多高？

今天买了一些 HQ Durables，发现我原本适用于 5x4x3 的调校不适合它们。设备为 KISS24 ESC、运行 BF 3.0 的 KISSFC，以及 Lumenier RX2206 电机。我可以降低俯仰 P，但锁定感不如较高 P 增益时；不过 P 较高时，D 几乎必须调到 40 左右。这样合理吗？谢谢，Thomas。

Boris 的回答：

若只是回弹，可以尝试降低 P setpoint weight。

也可尝试测试 D-term setpoint 为 0。

确认上述两项是否能消除提高 D 的需求。

但只要电机不热且声音仍平稳，高 D 完全不是问题。

Thomas 的回复：

将 D-term setpoint 设为 0 后，完全没有回弹。我会尝试提高 Pitch 的 P 并降低 D，以获得想要的手感。

## 关于使用新配置器的讨论

#### 许多设置字段旁都有 `?` 标记。将鼠标悬停其上可查看用途的简短说明。

- Measurement 与 Error 现在通过 D-term 滑块设置。
完全右移为 Error，完全左移为 Measurement；实际情况可能不同。
向下滚动到 PIDs 区域下方。
BF PIDC 不使用 `PID_DELTA_METHOD`（或 CLI 变量）下拉列表，改用滑块。
0 对应 2.9 的 Measurement，1 对应 2.9 的 Error。
详情请参阅上文 2DOF PIDC 说明。

- 此外，在 4k/2k 下 Blackbox logging rate 是否有错误？Blackbox 中显示 1k 是 50%，但实际应是 25%。
不是错误。BB rate 是 PID 控制器速率的百分比，因为这才是重要数据的来源。

- OSD 选项卡只适用于集成 OSD 芯片的 FC 板，Omnibus 就是其中之一。
