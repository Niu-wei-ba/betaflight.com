---
sidebar_position: 11
sidebar_label: 3.2 发行说明
---

# 3.2 发行说明

重要公告

## Betaflight v3.2 将是最后一个支持基于 STM32F1 的飞行控制器的版本。从 v3.3 起，NAZE、CC3D（原版）、ALIENFLIGHTF1、MICROSCISKY 及其克隆板将不再获得支持。

如有疑问或顾虑，请在 [Boris 的 BetaFlight 讨论帖](http://www.rcgroups.com/forums/showthread.php?t=2464844)中反馈。现提前通知，以便大家有充分时间准备。v3.2 将于 10 月发布，v3.3 则要到下一年才会推出。

此处可查看部分相关信息，但内容似乎尚未完善：

https://github.com/betaflight/betaflight/projects/2

Boris（2017 年 6 月 30 日）表示：

发布候选版即将到来。

本次包含大量底层改动，其中多数不会直接影响用户，但也会带来不少新功能。

过去对 Betaflight 的主要抱怨是更新过于频繁，因此我们放慢了节奏。没有快速发布的压力后，便有更多时间思考和研究新方案。

当前 V3.2 文件位于： https://ci.betaflight.tech/job/Betaflight/lastSuccessfulBuild/artifact/obj/

或 https://betaflight.qmd.cl/

### 注意：在论坛中讨论此版本时（Boris 的 BetaFlight 讨论帖）

## 请注明版本号和构建号。

### 如遇问题，请先查看 [ISSUES](https://github.com/betaflight/betaflight/issues)，确认是否已有人报告，并查找可能的临时解决方案。

### Boris 表示：

大家好，希望各位都一切顺利。

我们终于如约按时推出发布候选版！

https://github.com/betaflight/betaflight/releases

## Betaflight 3.2.1

### 维护版本

请阅读升级说明。

此版本仅包含错误修复和目标板变更。完整的新功能列表请参阅 3.2.0。

### 修复：

- 升级后配置未恢复默认值，反而发生损坏（#4280）；
- MavLink 与 MSP 共用端口失效（#4287）；
- 关闭 ACC 后，CRSF 遥测会卡死（#4279）；
- PA14 的定时器分配错误（#4297）；
- 4-way 接口不支持 GD32F350x6 ESC（#4329）；
- 接入电池后 ESC 会连续初始化两次（#4322）；
- 从统计页面调用相机控制时，相机控制菜单会覆盖 OSD 统计页面（#4293）；
- `LED_STRIP` 的 VTX 频段颜色错误（#4362）；
- 蜂鸣器关闭时 DShot 信标仍会发声（#4360）；
- CLI 中的 DShot ESC 信息不一致（#4308）；
- F4 和 F7 的 DShot1200 时序错误（#4367）；
- 长按摇杆时，相机控制的摇杆命令不会重复（#4368）；
- F7 上的 DShot 无法工作（#4165）；
- 在 RunCam Split 上切换 WiFi 会在飞行中将其关闭（#4369）；
- 某些情况下，即使已编译进固件，CLI 仍不会使用解锁禁止标志名称（#4370）。

### 目标板更新：

- KIWIF4V2 / PLUMF4：将 `LED_STRIP` 引脚移回 `VTX.DTA`（#4285）；
- 新目标板：XRACERF4（#4255）；
- ALIENFLIGHT：修复硬件检测不稳定问题（#4300）；
- BEEBRAIN_V2：拆分为 V2D 和 V2F（#4318）。

## Betaflight 3.2.0 发布

### 新增：

- 完整支持 F7（@sambas @blckmn）
- 支持 [SITL](http://ardupilot.org/dev/docs/sitl-simulator-software-in-the-loop.html) 软件在环模拟器（@cs8425）
- CMS 新增十字准星（@lostcontrol）
- 改进三旋翼的 I 项累积（ITerm windup）处理（@martinbudden）
- 新增 SP RACING F3 OSD/PDB 支持（@hydra）
- 新增 `horizon_tilt_effect` 命令（@ethomas997）
- 提高调度器效率（@lilcw）
- 提高电机输出分辨率（@borisbstyle）
- 提高 PWM 定时器精度（@blckmn）
- 新增电机协议 Proshot1000（@TonyBazz）
- 改进配置架构（PG 实现，@martinbudden、@ledvinap）
- 改进 OSD
- 支持新的目标板
- 新增基于噪声频率的自动陷波滤波器（@rav-rav、@martinbudden）
- 修复并启用在自稳模式中关闭 RC 平滑
- 可在地面翻正倒扣的四轴飞行器（反乌龟模式）（@brycedjohnson）
- 优化 Blackbox 存储的紧凑性，可在闪存上以更高记录速率和/或记录更长日志（@martinbudden）
- 相机控制
- 兼容 TBS 的 LED 频率指示器
- 通过蜂鸣器、OSD 和 CLI 提示无法解锁的原因
- 新增 I 项限制，防止 I 项大幅累积

### 问题

- F7 支持仍处于早期阶段，DShot 当前已损坏。开发人员已了解并正在处理。参见 https://github.com/betaflight/betaflight/issues/4129

- NAZE 及其他 F1 板已禁用许多功能，其中包括或曾包括 BLHeli 直通。已有自定义构建移除磁力计和气压计并启用直通功能，最终的 3.2.0 代码可能也会采用该方案。NAZE 代码参见：
  https://www.rcgroups.com/forums/showpost.php?p=38309374&postcount=51892

### 实验性功能，请谨慎使用

- 新增实验性坠机检测与恢复（@martinbudden）
- 为 F4 新增实验性 CPU 超频选项

### 修复：

- 修复 GPS 串口溢出（@mikeller）
- 修复关闭 Airmode 时全油门会失稳的问题
- I 项限制降低发生偏航自旋的概率

### 已知问题：

- 从旧固件版本升级后，配置不会正确重置且很可能损坏。解决方法是：升级前始终执行 CLI 备份；升级后执行“恢复默认值”或 CLI `defaults`；再从备份恢复（[#4280](https://github.com/betaflight/betaflight/pull/4280)）；
- MavLink 与 MSP 共用端口无效（[#4287](https://github.com/betaflight/betaflight/pull/4287)）；
- 从统计页面调用相机控制时，相机控制菜单会覆盖 OSD 统计页面（[#4293](https://github.com/betaflight/betaflight/pull/4293)）；
- 接入电池时 ESC 会连续初始化两次，即初始化提示音会响两遍（[#4257](https://github.com/betaflight/betaflight/issues/4257)）。

### RC2 变更：

- 修复新的 Blackbox 分频系数
- 改进部分情况下的 ACC 缩放

### RC3 变更

- MATEKF405：启用 Spektrum Follow Me 绑定
- 修复 Blackbox `p_denom`
- 节省 ROM 空间
- 在 CLI 中加入缺失的 AHI 侧边栏
- 在滤波器初始化时检查陷波频率为 0 的情况
- 重构引脚定时器映射
- 修复 alienwhoop v2.0 的蜂鸣器
- 修复 Spektrum Telemetry 的 FlightPack Capacity
- 修复 Configurator 中部分陀螺仪的 ACC 报告

### RC4 变更

- 新增实验性 Slew 滤波器
- 修复更改 D 项滤波器时 MSP 锁死的问题
- 改进陀螺仪调试日志
- 验证不受支持的功能
- 实验性偏航溢出处理
- 当电池未充满时新增 OSD 警告
- 修复 OSD 计时器的 CLI 设置
- 新增 I 项限制，防止 I 项大幅累积
- 为坠机检测在坠机后重置 I 项

### RC4 错误（详情请参阅 GitHub Issues 和 Pull Requests）

- 陀螺仪调试和陷波调试无效，分析器不显示数据；已在 Build #179 中修复。
- DSHOT1200 的多项 [问题](https://github.com/betaflight/betaflight/issues/4001)
- NAZE 目标板无法向 Blackbox 记录数据
- 陀螺仪校准提示音 [问题 4107](https://github.com/betaflight/betaflight/issues/4107)
- 当 setpoint transition 保持默认值 1.0 时，setpoint weight 的行为实际上会被视为 0，无论设置何值；已在 RC5 中修复。

### RC5 变更

- 默认 setpoint weight 改为 0。若用户保持默认 `relax ratio = 1`，飞行表现应与此前 3.2 RC 相同，因为这些 RC 中 `relax ratio` 为 1 会禁用 setpoint weight。RC5 已修复该问题，因此即使 `relax` 为 1，D weight 也会生效。希望 D weight 表现与 3.1 相同的用户应将 weight 设为 0.6。
- 移除实验性 Slew 滤波器
- 禁用启动时陀螺仪校准的提示音
- 为部分较新的陀螺仪增加溢出保护（已知 ICMxxx 系列陀螺仪在超过 +/-2000deg/sec 时会因溢出出现反转）
- 为相机控制新增内阻调节
- 在 CLI 中显示 MSP 版本

### RC5 错误（详情请参阅 GitHub Issues 和 Pull Requests）

- Cl Racing F4 飞控升级到 3.2 RC5 后会丢失 PPM 信号。这是已知问题，已在下列 PR 中修复：
  https://github.com/betaflight/betaflight/pull/4182

### RC6 变更

- 在反乌龟模式中禁用小角度保护
- 修复 DShot 3D 混控器
- 改进反乌龟模式混控器
- 修复并行 PWM 的 CCD
- 从反乌龟模式移除 `pidsumlimit`

### 其他功能：

- 3.2 的 Spektrum Satellite 绑定
  Spektrum-Satellite-Bind-for-3.2

- 3.2 的可重新配置气压计
  Barometer-Configuration-(3.2)

## Blackbox Viewer

https://github.com/betaflight/blackbox-log-viewer/commits/master

## 升级说明

**不要**复制粘贴 CLI 命令，因为许多命令的名称已改变，或新增了命令。

请使用最新的 Configurator 完成设置，然后在 CLI 选项卡中手动设置。

Joshua Bardwell 的 [Betaflight 3.2 Ultimate Setup Guide](https://www.youtube.com/watch?v=JkggzZySIqs)

## 新功能，以及旧功能工作方式的变化

### 从 `tlm_inversion` 切换到 `tlm_inverted`

配置参数从 `tlm_inversion` 改为 `tlm_inverted` 后，其适用范围和作用也发生了变化：

- `tlm_inverted` 适用于**所有**遥测协议；
- `tlm_inverted = on` 表示遥测信号应相对于所选协议的默认信号极性反相。例如使用 SmartPort 时，`tlm_inverted = off` 表示飞控期望收到反相串行遥测信号，因为这是 SmartPort 的默认形式。

因此，对所有协议而言，若使用未经改装的硬件，`tlm_inverted = off` 很可能是正确设置。

（另请注意，此功能仅适用于 F3/F7 板，或使用带可切换外部反相器端口的 F4 板。）

### 动态滤波器

待办：补充 CLI 命令及其作用。

注意：F1 板无法处理动态滤波器，没有足够的存储空间和算力。

当前信号路径如下：

```text
gyro -> dynamicNotch -> notch1 -> notch2 -> lpf -> P term
-> motors -> D term -> notchD -> lpfD -> setpointRelax&Weight
```

动态滤波器运行在陀螺仪循环中，因此 PID 循环频率并不重要。

不要在 F3 处理器上使用 8k；此类处理器应使用 4/4。F4/F7 在更高频率下应能正常运行。

mjbudden 在 Boris 讨论帖中就陀螺仪/PID 循环频率与动态滤波发表如下说明：

我和 r.a.v.（我们共同编写了这部分代码）的官方建议是：**使用动态滤波时，不要在 F3 处理器上使用超过 4k/4k 的频率**。在 8k 陀螺仪频率下，每个循环只有 125 微秒，根本不足以完成计算。因此 PID 循环无论如何都会低于 8k。表面上可能没有异常，但 PID 循环中会出现抖动，进而可能引发问题。

### 坠机恢复

待办：补充 CLI 命令及其作用。

该模式简要工作流程如下：

1. 当 `crash_dthreshold` 和 `crash_gthreshold` 均被超过时，判定为坠机。
2. 检测到坠机后，飞行器会尝试自行调平，并忽略横滚和俯仰轴的 RC 输入。
3. 飞行器持续尝试调平，直到满足以下任一条件：
   1. 坠机后经过 `crash_time` 毫秒；或
   2. 横滚和俯仰角均小于 `crash_recovery_angle` 度，且横滚和俯仰轴的陀螺仪角速度均低于 `crash_recovery_rate` 度/秒。
4. 为便于测试，可通过打开蜂鸣器启用坠机恢复（若坠机恢复验证成功，该方式会被移除或改动）。

TCHTHSKY 在 Boris 的讨论帖中发布：

[这里是代码，其中带有注释：](https://github.com/kc10kevin/betaflight/blob/master/src/main/flight/pid.c)

[这里是功能请求：](https://github.com/betaflight/betaflight/issues/2731)

[以及这个：](http://stackissue.com/betaflight/betaflight/added-experimental-crash-detection-and-recovery-2783.html)

[以及本讨论帖此前的另一条内容：](https://www.rcgroups.com/forums/showpost.php?p=37951070&postcount=49982)

#### mjbudden 的重要说明：

坠机恢复例程目前不会尝试限制偏航自旋，只会尝试让四轴飞行器调平。编写坠机恢复例程时，我没有预见到“偏航自旋到月球”（yaw spin to the moon）问题。目前正在研究解决方案。请参阅 GitHub 中的 PR `github.com/betaflight/betaflight/pull/3909`，其中有关于此问题的最新讨论，也欢迎参与。我们同样非常需要“偏航自旋到月球”的 Blackbox 日志，以帮助分析和解决问题。

Yamaford：

为避免其他读者误解，我不认为你的坠机恢复代码是罪魁祸首。无论是否启用 ACC 或坠机恢复，都会出现疯狂的“YSTTM”（Yaw spin to the moon），对吗？

mjbudden：

正确。无论是否启用坠机恢复，都会发生偏航自旋到月球，且并非由坠机恢复代码引起。

已有新的 PR 尝试修复，请参阅 [PR 3909](https://github.com/betaflight/betaflight/pull/3909)。如能测试并提供 Blackbox 日志，将非常有帮助。

#### 失控保护激活期间的坠机恢复

若飞行器处于失控保护模式时检测到坠机，会立即解除解锁。这是为了避免在失控保护事件中（即接收机信号丢失），飞行器撞击物体或地面后造成损坏或人身伤害。失控保护 LANDING 使飞行器落地后，也应触发解除解锁。

失控保护条件解除后，即接收机信号至少恢复 30 秒，飞行器即可再次准备解锁。

### “坠机后翻转模式”（原名 Turtle Mode）

待办：说明其功能、设置方式，以及哪些 ESC 固件支持该功能。

#### 注意：请确认 ESC 固件支持使用 DSHOT 命令反转电机。并非所有最新版 ESC 固件都支持此功能；请查阅所用 ESC 的固件开发者说明或文档。

brycej 的说明：

就当前形式而言（约 2017 年 8 月 8 日），先拨动模式开关，再解锁。油门和偏航摇杆不产生作用；俯仰和横滚则根据摇杆偏转控制哪些螺旋桨转动。俯仰与横滚回中时，所有桨均不转动。

判断哪一侧的螺旋桨没有卡住，然后尝试将机体翻正。如果没有翻过来，请尝试不同的俯仰或横滚方向。若机体卡住，不要把摇杆直接打到底并一直保持。我在大量测试中没有烧毁 ESC，但总会有人用力过猛而做到这一点……

翻正后请解除解锁。关闭 `flipaftercrash` 模式，再重新解锁后飞离。

其他提示：它曾很好地帮助我脱离树上。

首先务必拆桨，在工作台上测试。官方 BLHeli 16.63 在反转全部电机时存在一些问题，因为它比非官方 BLHeli 分支的 16.67 更严格。较新的 Betaflight 版本已加入一些修复来改善该情况。

还应在视距范围内的短草地测试，这样才能看清其工作方式……

它无法修复损坏的桨叶，也无法在长草中救回飞行器，因此并非每次都有效。

RC4 及更早版本会反转混控器，并让四个螺旋桨全部反向旋转。该方式同样可行，但地面动作更混乱，需要一定技巧。

### 偏航跳升调校

ctzsnooze 发帖：

突然停止或反向高速偏航自旋时出现的跳升，是因为两个电机必须全开才能产生最大偏航扭矩，这相当于施加 50% 油门。

`acc_limit_yaw` 延迟的是偏航量累积的速度，而非最大累积量。因此它会延后跳升出现的时机；但若仍需大幅修正，机体最终仍会以相同速度跳升。降低 `acc_limit_yaw` 可减慢偏航动作的起始速度，也会降低偏航对摇杆输入的响应性。

`pid_sum_yaw` 会间接限制偏航动作中要求电机达到的最大转速，从而限制可能达到的最大偏航角速度，并以同样程度降低爬升率。换言之，跳升和偏航无法完全分离。但对于未触及限制的输入，它应能保留干脆的偏航响应。

RC5 包含多项降低“偏航自旋到月球”问题的措施；自升级到 RC5 后，我再未遇到严重情况。

反转螺旋桨旋转方向似乎也能降低前桨外侧擦到赛门时累积的自旋量，从而减少撞门后出现大幅自旋和爬升的概率。

请注意：若擦到赛门后以很高角速度自旋，且使用较高偏航 P，两个电机会全开以对抗自旋，并可能需要保持一段时间才能重新获得控制。

我将摇杆配置为：偏航和横滚摇杆等量偏转时，四轴飞行器以 45 度倾角完成协调转弯。因此我将偏航速率设得与横滚速率相同。然而偏航响应本质上弱于横滚，所以需要较高的偏航 P；这确实会在擦到赛门后造成快速的偏航爬升。

### 通过 OSD 控制 FPV 相机

请咨询支持渠道和 RCG 讨论帖，以确定相机是否需要特殊处理。

参见：[相机控制](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation)

### 实验性 Slew 滤波器，已在 RC5 移除

https://github.com/betaflight/betaflight/pull/3983

更多信息：

https://github.com/betaflight/betaflight/pull/3909

https://github.com/betaflight/betaflight/issues/3959#issuecomment-326430286

https://github.com/betaflight/betaflight/pull/3950

https://github.com/betaflight/betaflight/issues/3893

### 解锁禁止标志

现在可在 CLI `STATUS` 中查看。例如：`Arming disable flags: RX LOSS CLI`

在 F4/F7 STM32 上，解锁状态会输出名称；在 F1/F3 STM32 上则是简单的位字段。

详见[解锁流程与安全](/docs/wiki/guides/current/Arming-Sequence-And-Safety)。

### 速率配置文件与配置文件

根据 Woody_99 的经验：我会分享自己学到的内容；3.2 与旧版本有几项不同。

- 在 3.2 中，速率配置文件确实与普通配置文件分离。
- 在 3.2 中，如果在三段开关上启用速率配置文件选择，无论调整页面中的滑块位置如何，BF 都会使用全部三个速率配置文件。此前若只希望将两个速率配置文件关联到一个普通配置文件，滑块可控制是否根据开关位置选择速率配置文件。这不是坏事，但需要注意这一变化。
- 现在还必须使用不同的槽位。此前可以用不同 AUX 通道在同一槽位执行不同调节；现在不同调节也必须使用不同槽位。

[包含 Adjustment 选项卡截图的帖子](https://www.rcgroups.com/forums/showpost.php?p=38456811&postcount=52308)

## 3.2 中的 CLI 命令变更

### 移除的 CLI 命令

```text
feature -VBAT
feature -FAILSAFE
feature -CURRENT_METER
feature -BLACKBOX
feature -SDCARD
feature -VTX

set align_mag
set bat_detect_thresh
set blackbox_rate_num
set fixedwing_althold_dir
set frsky_vfas_cell_voltage
set gyro_use_32khz
set mwii_ibat_output
set servo_lowpass
```

### 新 CLI 命令

待办：列出所有新 CLI 命令，说明其作用和用法（可添加链接），以及默认值和可选值。

#### `feature -DYNAMIC_FILTER`

#### `beeper BLACKBOX_ERASE`

全局设置：

#### `set beeper_frequency = 0`

`[0..16000]`

#### `set blackbox_record_acc = ON`

`[OFF..ON]`

#### `set camera_control_key_delay = 150`

`[100..500]`

#### `set camera_control_mode = HARDWARE_PWM`

`[HARDWARE_PWM, SOFTWARE_PWM, DAC]`

#### `set camera_control_ref_voltage = 330`

`[100..400]`

#### `set dashboard_i2c_addr = 60`

`[8..119]`

#### `set dashboard_i2c_bus = 1`

`[0..2]`

#### `set esc_sensor_halfduplex = OFF`

`[OFF, ON]`

#### `set ibatv_offset = 0`

`[-16000..16000]`

#### `set ibatv_scale = 0`

`[-16000..16000]`

#### `set led_inversion = 0`

`[0..7]`

#### `set motor_pwm_inversion = OFF`

`[OFF, ON]`

#### `set report_cell_voltage = OFF`

`[OFF, ON]`

#### `set vbat_detect_cell_voltage = 30`

`[10..50]`

#### `set motor_pwm_protocol = ONESHOT125`

`[OFF, ONESHOT125, ONESHOT42, MULTISHOT, BRUSHED, DSHOT150, DSHOT300, DSHOT600, DSHOT1200, PROSHOT1000]`

每个 Profile：

#### `set crash_delay = 0`

`[0..500]`

#### `set crash_dthreshold = 50 :degrees/second/second`

`[0..2000]`

D-term 坠机值，默认值为零（关闭）；至少设为 1 才会启用坠机检测。

#### `set crash_gthreshold = 400 :degrees/second`

`[0..2000]`

陀螺仪坠机阈值。

#### `set crash_recovery = OFF`

`[OFF, ON, BEEP]`

#### `set crash_recovery_angle = 10 :degrees`

`[0..30]`

#### `set crash_recovery_rate = 100 :degrees/second`

`[0..255]`

#### `set crash_setpoint_threshold = 350 :degrees/second`

`[0..2000]`

#### `set crash_time = 500 :ms`

`[0..500]`

#### `set horizon_tilt_effect = 75`

`[0..250]`

#### `set horizon_tilt_expert_mode = OFF`

`[OFF, ON]`

### 名称变更

```text
yaw_motor_direction [1, -1] ==> yaw_motors_reversed [OFF, ON]
sport_halfduplex ==> set tlm_halfduplex
tlm_inversion' ==> tlm_inverted
spektrum_sat_bind_autorst ==> spektrum_sat_bind_autoreset
dfu ==> bl
current_meter_type = ADC ==> current_meter = VIRTUAL
d_lowpass ==> dterm_lowpass
d_lowpass_type ==> dterm_lowpass_type
d_notch_cut ==> dterm_notch_cutoff
d_notch_hz ==> dterm_notch_hz
digital_idle_percent [7.00] ==> dshot_idle_value [450]
yaw_accel_limit ==> acc_limit_yaw
yaw_control_direction [1] ==> yaw_control_reversed [OFF]
anti_gravity_thresh ==> anti_gravity_threshold
battery_meter_type ==> battery_meter
blackbox_rate_denom [4] ==> blackbox_p_denom [32]
ibat_offset [0] ==> ibata_offset [0]
ibat_scale [400] ==> ibata_scale [400]
```

## 新版 Configurator GUI（V3.2.2）中的变更

### Receiver 选项卡

新增“Stick Min”“Stick Center”和“Stick Max”，它们分别就是 `MIN_CHECK`、`MID_RC` 与 `MAX_CHECK`。
