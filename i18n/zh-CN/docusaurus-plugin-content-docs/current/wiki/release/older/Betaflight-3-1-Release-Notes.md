---
sidebar_position: 12
sidebar_label: 3.1 发行说明
---

# 3.1 发行说明

## Betaflight 3.1.7 发行说明

3.1.7 维护版本：
https://github.com/betaflight/betaflight/releases/tag/v3.1.7

完整的 3.1 发布信息请参阅：
https://github.com/betaflight/betaflight/releases/tag/v3.1.0

混控器支持：Mixer-Support-in-3.1.7-(and-later)

### 新增

- 当未启用功能或模式时，Airmode 现会完全关闭。此前 Airmode 始终有效，只是在低油门时 I 项未生效。
- 在 OSD 中新增数字怠速百分比显示。
- 可通过功能或模式开关关闭 Anti Gravity。
- 新增 RSSI 反转。
- 新增 KROOZX、CL_RACINGF4 和 SPRACINGF4EVO 目标板。
- 重新调整默认配置。
- 为 F4 新增应答器驱动程序。

### 修复

- 提升极高循环频率下 DSHOT 的安全性。
- 改进 D 项陷波设置的有效性校验。
- 修复 Spektrum 绑定卡死问题。
- 修复 AK8975 磁力计检测。
- 修复 SPRACINGF3EVO 的 SoftSerial 故障。
- 修复同一块板上同时使用 SD 卡和板载 Blackbox 时的“死亡开关”问题（BLUEJAYF4）。
- 修复 `angletrim` 问题。
- 修复部分板卡的 `escprog` 功能；KISS ESC 直通现在应能更可靠地工作。
- 修复 F4 使用错误闪存扇区的问题。
- 修复 COLIBRI_RACE 等部分故障目标板。

### 已知问题

- 关闭 Airmode 时，飞行器在全油门下无法保持姿态：https://github.com/betaflight/betaflight/issues/3016

#### 默认值变更说明

Boris 的说明：

用户持续反馈 Betaflight 默认 D 值过于保守，因此已作调整。设定点过渡已关闭（`1.0`），使整个摇杆行程内的响应更线性。

若机架条件允许，仍建议逐步减少默认滤波，以获得更好的效果。现在多数机架采用软安装，减少滤波通常能提升性能。为保证安全，默认值针对硬安装、噪声中等的环境优化。最佳调校效果通常来自尽可能少的滤波。

更多信息请参阅[陀螺仪与滤波器](/docs/wiki/guides/archive/Gyro-And-Dterm-Filtering-Recommendations-3-1)。

#### Airmode 功能与失控保护问题

此说明针对 [RCGroups 中的讨论](https://www.rcgroups.com/forums/showpost.php?p=37535627&postcount=48369) 及 [issue #3108](https://github.com/betaflight/betaflight/issues/3108)。

遇到的问题源于失控保护配置错误，具体是关闭了失控保护第 2 阶段。第 2 阶段负责在故障后让飞行器进入安全状态；第 1 阶段仍被视为可能恢复的状态（例如 RX 链路恢复时）。

固件此前允许关闭第 2 阶段，这本身就是问题，因此已移除该选项（[PR #3562](https://github.com/betaflight/betaflight/pull/3562)）。

如果在开启遥控器前先接通四轴飞行器电池，电机通常不会意外启动。例外是默认 AUX 通道位置接近 ARM 或 AIRMODE 模式范围，这种配置本身并不安全。

即使在最坏情况下，失控保护时油门处于最低位置，电机最高转速也受 `min_command` 限制，无法全油门运转。

只要失控保护配置正确，Airmode 功能不存在安全隐患。

组装、飞行和测试时降低受伤风险的建议：

- 始终拆下桨叶后再测试。
- 安装桨叶前务必测试失控保护。
- 始终将 ARM 范围滑块设置在远离默认通道值的位置，通常通道高端即可，例如 `1800-2000`。
- 遥控器与四轴飞行器尽量相距一英尺以上，确保近距离仍有良好的遥控链路。
- 接通电池时牢牢握住四轴飞行器；正常情况下不应需要这样做，但这是额外的安全措施。

## Betaflight 3.1.6

https://github.com/betaflight/betaflight/releases

### 新增

- 感谢 @jflyper，新增动态双向 SoftSerial，通过资源命令分配。（NAZE 用户无需再短接 TX 与 RX 即可让 SmartPort 工作。）
- SDK 更新至 `6.2.1 2016q4`。

### 修复

- 修复 F1 和 F3 的 `max_aux` 上限为 6。
- 为 XRACER 目标板新增 6 电机 DSHOT 支持。
- 为 KISSFC 新增 LED 灯带支持。
- 为 KISSFC 新增电流传感器引脚。
- 为全部目标板启用 SoftSerial。
- 修复 HEADFREE 模式激活。
- 修复指示器用 LED 灯带方向。
- 修复人造地平仪横滚方向错误。
- 修复 Configurator 中的 3D DShot 转换。
- 修复 KAKUTEF4 的 LED 灯带。
- 修复目标循环时间。
- 修复 F4 上 DSHOT 定时器极性反转问题。
- 为 SPRACINGF3EVO 禁用 SD 卡 DMA。
- 使用更柔和的 D 项设定点默认值。
- 修复试图滤除高于奈奎斯特频率信号的滤波器问题（500 Hz 模式无法工作）。
- 放宽 F1 循环时间限制。
- 修复 OmnibusF4 的 Spektrum 绑定。

### 已知问题/缺陷

- 未校验 D 项陷波滤波器的截止频率（`D Term Notch Filter Cutoff`）是否高于中心频率（`D Term Notch Filter Frequency`）。**警告：**若将截止频率设为高于中心频率，可能导致电机加速失控。（同样适用于 3.1.6 之前的版本。）

- 若飞控同时具备 SD 卡 Blackbox 与板载 Flash，且希望在未插入 SD 卡时使用板载 Flash，须关闭 `SDCARD` 功能；Configurator `1.9.3` 起可操作。据了解，只有 BluejayF4 同时提供这两种 Blackbox 存储选项。这并非 3.1.6 独有问题，之前版本同样如此。

- 在 Powercube V1 上刷写 Colibri Race 目标板的 3.1.6 后，设备无法连接、无法启动且不再被检测到。
  Boris：将在 3.1.7 中处理。

- CC3D 上接收机会在每次启动时进入绑定模式；已在 3.1.7 alpha 修复。
  http://andwho.sytes.net:8080/job/BorisB_BetaFlight_Maint/

- 使用 Configurator `1.9.3`。

## Betaflight 3.1.5 - 维护版本

发布链接：https://github.com/betaflight/betaflight/releases/tag/v3.1.5

- 恢复 MultiWii 油门 Expo。
- 修复 SIRINFPV 的电机 6。
- 修复 `VTX SmartAudio` 在用户自定义频率模式下的状态字符串。
- 修复标准 PWM 故障。
- 更改 BFF3 的默认电流计比例系数；默认在 UART2 启用串口 RX。
- 在资源列表中注册 SDCard DMA。
- `CHANNEL_FOWARDING` 的起始 AUX 通道现可配置。
- 修复 Tramp 功率菜单。
- 简化 Anti Gravity 增益参数（默认关闭）。
- 修复经由 MSP 对 Tramp 进行多项修改的问题。
- 修复 Raceband Channel 7 的 Tramp 显示问题（此前显示为 F8）。
- 将 `min_throttle` 和 `max_throttle` 与定高功能解耦。

#### 已知问题/缺陷

- 最多只能使用 6 个 AUX 通道，计划在 2017 年 3 月 1 日的下一版本修复。
- 一个 SoftSerial 已够用；但在 3.1.6 中可通过资源命令手动分配。SoftSerial 上的 SmartPort 也无需再短接 TX 与 RX。
- Configurator `1.9.2` 存在 Spek Sat 设置问题，已在 `1.9.3` 修复。

## Betaflight 3.1.4 - 补丁

- 无 HEX 文件，仅提供源代码：https://github.com/betaflight/betaflight/releases/tag/v3.1.4
- 简化 Anti Gravity。
- 修复油门 Expo。

## Betaflight 3.1.3 - 维护版本

发布链接：https://github.com/betaflight/betaflight/releases/tag/v3.1.3

- 对 PID 代码进行小幅优化。
- 修复 `iterm anti_windup_gain` 的轴耦合问题。

Boris 的说明：

原本 3.1.2 应是最后一个版本，但后来发现更多值得发布的改动，所以推出新补丁。更新补丁会保留现有设置，无需擦除配置。

## Betaflight 3.1.2 - 维护版本

发布链接：https://github.com/betaflight/betaflight/releases/tag/v3.1.2

- 修复 `min_throttle` 影响 `rcCommand` 油门缩放的问题。
- 以新版浮点实现替换旧版 MultiWii 油门 Expo。
- 简化部分 CLI 命令，详见下方 CLI 名称变更列表。
- 降低部分默认参数的强度，例如新的 `anti_gravity_gain`。

Boris 的说明：

这应是最后一个补丁，接下来转向 3.2。

可能仍有部分目标板相关问题，但可处理空间不大。很快会提供两类目标板列表：一类为开发者投入时间完整支持的 FC；另一类为尽力支持的目标板，通常是开发者未持有，或制造商没有提供足够支持的板卡。这不代表会移除目标板，只是不能保证所有功能都得到同等支持。因此，若某目标板的 DSHOT 或 Blackbox 不能工作，应向购买该板卡的商家反馈。

##### 注意：油门 Expo 现在按常规 Expo 工作，不再涉及油门中点。

这只是自定义油门曲线完成前的临时方案，预计在 3.2 实现。之所以这样改，是因为旧代码会将 `min_throttle` 混入油门值。当前最好不要使用此功能。

## Betaflight 3.1.1 - 维护版本

发布链接：https://github.com/betaflight/betaflight/releases/tag/v3.1.1

#### 新增

- 资源重映射命令不再要求先将资源设置为 `NONE`，现在可直接粘贴 `diff` 输出。@blckmn
- 新增 KISSCC 目标板。@borisbstyle @ronlix
- 新增更多 OSD 可配置功能及告警。@jflyper @DanNixon
- 新增 IBUS 遥测。@mikeller
- 将 Blackbox 加入 CMS。@DanNixon
- 新增通过 MSP 配置 VTX。@raphaelcoeffic

#### 修复

- 改进 I 项积分饱和处理。@borisbstyle @martinbudden
- 修复部分 OSD 参数的 `diff` 输出。@DanNixon
- 简化 F1 与 F3 目标板上的 CLI，以节省 Flash 空间。@mikeller
- 修复 REVONANO 目标板。@blckmn
- 小幅代码优化。@borisbstyle
- 改进默认配置，包括更高的默认怠速偏移与新的抗积分饱和参数。@borisbstyle
- 修复 OSD 开关。@DanNixon
- 修复 RCExplorer 目标板上的电机映射。@blckmn
- 改进错误资源映射时的启动问题。@blckmn

**注意：**要使用本版本的功能，需要使用以下版本或更高版本：

- Configurator `1.9.1`

## Betaflight 3.1.0 发布版

发布链接：https://github.com/betaflight/betaflight/releases

注意：GitHub 发行说明中包含视频嵌入链接。

以下页面可查看当前正在处理的固件问题和功能：
https://github.com/betaflight/betaflight/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc

### Betaflight 3.1.0（发布）

Betaflight 固件进行了多项底层重大变更。硬件驱动经过优化，以提升未来可维护性，并使目标板及硬件支持更容易实现。Betaflight 团队还逐行审查代码，以尽可能挖掘飞行性能；当前版本相比前一版本包含不同开发者提交的 1800 多项代码变更。此处仅列出发行说明的重点，完整变更记录请查看 GitHub 提交历史。

#### 发行说明重点

- 新增 F7 支持，已有少量受支持目标板。@sambas
- 动态 IO / 引脚分配。@blckmn
- 为 F3 和 F4 新增 [DSHOT 支持](/docs/wiki/guides/current/Dshot)，支持 DSHOT150、300、600 与 1200；支持硬件请查看板卡章节。@blckmn
- 飞行控制逻辑全面采用浮点运算。@borisbstyle
- 新增多项动态配置，例如滤波器、设定点权重等。@borisbstyle
- 大量代码优化，F3 和 F4 可使用更快的 PID 频率。@martinbudden 和 @borisbstyle
- 支持 KISS ESC 遥测，仅适用于 DSHOT。@basdelfos
- KISS ESC 遥测新增温度和 RPM。@mikeller
- 为 KISS24 和 CASTLE ESC 新增[串口 ESC 直通](/docs/wiki/guides/archive/ESC-pass-through-3-1)。@sambas
- 新增目标板支持，现已覆盖 4 类 MCU、72 个目标板。
- 新增 CMS 显示支持。@jflyper
- 新增 TBS 接收机的 CRSF 支持及相应遥测。@martinbudden 和 @blckmn
- 新增 PID、功率等额外 OSD 参数。@martinbudden 和 @rafl
- 新增 [Unify SmartAudio](/docs/wiki/guides/current/SmartAudio) 支持。@jflyper
- 新增经由 SmartPort 的 MSP。@raphaelcoeffic
- OSD 支持自动视频制式。
- Configurator 改进。@mikeller
- 加速构建系统，以适应不断增加的目标板数量。@AndersHoglund
- 修复 VCP 目标板上的 JUMBO 帧处理，使 Blackbox 日志下载更快。@AndersHoglund
- CLI 新增 `anti_gravity_threshold` 参数。@borisbstyle
- 防止电机速度过高，例如选择 ONESHOT125 时，允许的最大 PID 和电机频率为 2 kHz。@borisbstyle
- 为支持的陀螺仪新增实验性 32 kHz 支持。@martinbudden
- Blackbox 功能增强，使用 `2.5.8` Blackbox Viewer。@GaryKeeble
- 新增以度为单位的 `level_sensitivity` 与 `level_limit` 参数；`level_limit` 为最大允许倾角，`level_sensitivity` 为满摇杆时的最大偏转。@borisbstyle
- 新增 IRC Tramp VTX 支持，可修改信道、频段、功率与 Pit Mode。@jflyper
- 更多内容：https://github.com/betaflight/betaflight/commits/master
- 现仅保留一种 PIDC，即 2DOF / Betaflight PIDC；详见 3.0.x 发行说明。

**注意：**要使用本版本的功能，需要使用以下版本或更高版本：

- Configurator `1.9.0`
- Blackbox Viewer `2.5.9`

### 警告：不建议在固件版本之间使用任何 Save/Restore，也不建议复制粘贴 CLI `dump` / `diff`。

始终通过配置器 GUI 设置，并在执行 `get 'name'` 后手动输入 CLI 命令，以确认新版本中的拼写和可用选项。

### 缺陷与修复

- RC2：修复 RC Expo 对称性；修复部分目标板缺少气压计的问题。
- RC3：启用实验性 32 kHz 支持。
- RC4：修复不支持 MPU INT 的目标板；为 NAZE 新增 MPU INT；修复设定点调整；进行部分清理。
- RC5：修复更多不支持 MPU INT 的目标板；修复 RACEBASE 和部分 SPRACINGF3 变体；修复 BETAFLIGHTF3 与 IMPULSERCF3 的 LED 灯带；新增用于测试的 DSHOT900 和 DSHOT1200，当前仅可通过 CLI 启用。
- RC6：修复 IMPULSERCF3 LED 灯带；修复 SIRINFPV 的 DSHOT；新增 PODIUMF4；改进 CPU 使用；优化 RC 插值；提高 DSHOT 速度；增强 DSHOT 限制的安全性（DSHOT150 限制为 4 kHz）。
- RC7：修复 32k 模式下的陀螺仪检测处理；改进目标板限制。
- RC8：修复 FPV 角度混控；新增 RG_SSD_F3 目标板；优化 SPRACINGF3NEO DSHOT；修复 CC3D_OPBL；默认从 UART1 移除 MSP；新增陀螺仪校准噪声调试；小幅优化。
- RC9（Build #959 - 16Jan2017）：修复三旋翼伺服混控缩放；为 NAZE 新增 SoftSerial；新增 IRC Tramp VTX 支持；修复 FPV 角度混控。
- RC10（Build #965 - 19Jan2017）：新增 `anti_gravity_gain`；KISSFC DSHOT 支持电机 5 和 6；解决 CC3D 启动问题；为自稳与 PID 使用新默认值。
- RC11：修复 BFF3 的 Spektrum 绑定引脚；修复部分目标板连接；恢复缺失的 Blackbox 日志字段。
- RC12（-25Jan2017）：将 FPV 角度混控应用于实际 Rates；修复截断的 Blackbox 日志；重新定义 OSD 默认值，默认不在屏幕显示 PID；扩大可配置滤波器范围。
- RC13：已解决 Blackbox 会自行关闭的已报告问题。

- 近期 Configurator 版本中，从 dataflash 保存 Blackbox 文件会在下载中途卡住。Configurator Issue #411：https://github.com/betaflight/betaflight-configurator/issues/411
  已在 Configurator `1.9.3` 修复。

- 设置 Spektrum Sat RX 协议时，Configurator 似乎存在缺陷。更新至 Configurator `1.9.3` 可修复。

- 若出现异常失控，请确认不是以下问题所致。Adamtfc 指出，D 项陷波滤波器并不会检查截止频率（`D Term Notch Filter Cutoff`）是否高于中心频率（`D Term Notch Filter Frequency`）。**警告：**如果截止频率高于中心频率，可能导致电机加速失控。（同样适用于 3.1.6 之前的版本。）

- 有报告称，当 BB 直接记录至 SD 卡时，飞行器会抖动或振荡。详见 [GitHub Issue #2631](https://github.com/betaflight/betaflight/issues/2631)。

##### 注意：从 v3.1 起，必须通过资源 CLI 命令手动配置舵机。**不要使用 `CHANNEL_FORWARDING`**，它会导致严重问题。

[参阅 Teralift 的帖子](https://www.rcgroups.com/forums/showpost.php?p=36792606&postcount=44331)
[TeraLift：在 Naze32 上为 Servo_tilt 映射舵机](https://www.rcgroups.com/forums/showpost.php?p=36821753&postcount=44612)

##### Boris 的说明

据 Boris 所知，DSHOT1200 现在能工作，但仅限 KISS24。

团队决定加入许多可通过 CLI 使用的新功能供测试，同时尽量只在 Configurator 中加入经过验证的功能。

### Boris 的 BetaFlight 主题帖中有关 3.1 的问答

#### Woody_99 的问题

> 我已在 Naze32 上使用 BF（3.01）飞了一段时间，运行似乎正常。经过所有代码优化后，Naze 是否仍值得继续使用，还是应换成更新的 FC？

Boris 的回答：

不，NAZE32 和其他 F1 实际上在 3.1 中更慢。3.1 是首个全面采用浮点运算的版本；F1 缺少浮点运算单元，因而要做更多工作。此外，它只有 128k Flash，无法容纳我们采用的许多新优化。所有优化仅影响 F3、F4 和 F7 板卡。

例如，与其使用新版 Betaflight 或重新 fork，不如继续使用当前版本。遗憾的是，F1 板卡没有未来方案，所有新功能都**不会**加入其中。即使你愿意放弃 ACC，也会有许多其他用户不愿意，因此这不是解决方法。

从最近的清理（RC9？）后，SoftSerial 似乎又能放入固件，但 Naze 现在只剩约 1 kB 空间。

#### fftunes 的问题

> 若运行 8k/1k，PID 环路会使用 8 个陀螺仪样本的平均值，还是只使用 8 个中的一个样本？

Boris 的回答：

没有取平均值，而是使用比平均更快的 IIR 滤波。每个样本的信息都会部分带入下一个样本。也可选择 FIR 滤波器类型来启用简单平均，但平均通常会带来较大的延迟。

许多人可能错过了早期 Betaflight 中对这些问题的充分讨论。建议阅读滤波工作原理，并了解混叠（aliasing）。

#### spikerspike97 的问题

> 为什么从 BB 日志看，我的油门和偏航 `rcCommand` 有很多阶梯，而俯仰和横滚非常平滑？

Boris 的回答：

只有横滚和俯仰受微分突变（Derivative kick）影响，因此默认只对这两个通道平滑。可在 CLI 中启用全通道平滑，但建议先按当前方式飞行。

平滑 RC 输入的唯一原因是抑制微分突变，否则 `PIDsum` 可能非常跳变。

注意：请参阅下方新的 `rc_interpolation_channels` CLI 命令，可平滑所有通道。

#### Ede2016 的问题

> BF3.1 的平均 CPU 负载如何？应以 Configurator 内未解锁或解锁时低于 50% 为准，还是有其他方式判断建议的最高频率？

Boris 的回答：

50% 是不错的参考值，但只要能正常解锁就可以。只要所有功能都正常工作，就说明 CPU 性能足够。

通常 CPU 占用过高时，优先级较低的功能会先停止工作。例如遥测、Blackbox、电流传感器或 VBAT 会先于 PID 环路或 RX 代码失效。此前 CPU 过高的真正风险是电机命令可能重叠，但各电机命令之间留有很大间隔，并且不同协议还受循环时间限制保护。

我个人在机架上会启用所有功能，只关闭加速度计。

#### Jerm357 的问题

> 3.1.3 中的 `Angle Limit` 和 `Sensitivity` 应如何设置，才能让自稳模式接近 3.0.1 的手感？

Boris 的回答：

```text
Sensitivity 100
Limit 70
```

#### 有人认为 3.1 比 3.0.1 更“颠”，是否属实，应调什么？

Boris 的回答：

3.1 确实更偏向“基于误差”（from error）。降低设定点权重可使其更平顺。当前默认值对部分机架可能偏高，尤其是快速翻滚或横滚结束时。

设定点权重的作用可简单理解为：

- 向右调高：摇杆加速度更大，响应更锐利。四轴飞行器会更快达到目标，Rates 手感更快，但电机负担更大、制动也必须更快。
- 向左调低：四轴飞行器的加速和减速动作会被更多抑制，运动更平顺，几乎不会反弹；可能更适合自由式飞行。

权重过渡本质上是从中摇杆至满摇杆，逐步改变设定点权重的过程。不过当前它的作用并不小。

QuadMcFly 的补充：设定点会随具体机架而变化，不能假定每台四轴飞行器都相同。较重、变桨响应慢的桨叶需要较低设定点，较轻、响应快的桨叶则不然。例如其 5x4.5x3HBN 桨叶必须使用很低的值，而 Lumenier ButterCutter 则几乎可调到最右侧。实际操作是持续降低，直到快速翻滚和横滚时不再出现回弹或“拍击”。

#### joshuabardwell 对 SetPoint 的补充

有关设定点过渡，请参阅：[PIDC 与 Setpoint 讨论](Betaflight-3-0-Release-Notes)。

误差增量（较高的 D 项设定点权重）具有极其锐利、直接的摇杆响应，但翻滚和横滚结束时可能回弹，飞行也可能不够平顺，尤其不适合部分自由式飞手。高 D 项设定点权重会让四轴飞行器感觉连接紧密、响应即时，但每一个细微的手指动作都会立刻转化为飞行器动作，这未必是每个飞手想要的效果。

测量增量（较低的 D 项设定点权重）会带来更平顺、更慢的摇杆响应。四轴飞行器的直接连接感较弱，但会更平滑；并且基于测量最适合抑制翻滚和横滚结束时的回弹/振荡。

可以把进入翻滚或横滚视为“正向”摇杆输入，退出视为“负向”摇杆输入。摇杆远离中心即为正向，回到中心即为负向。理论上，误差增量（高 D 项设定点权重）同样可能在正向输入时造成回弹；但在实际中，飞手做正向输入时通常很少猛推摇杆。摇杆回中（负向输入）时，摇杆回中机构会让摇杆急停。正向输入时，即便手指动作很快，摇杆通常也不会如此急停；部分飞手可能不是这样。若在正向输入时，例如做四点横滚时出现振铃或回弹，则可能属于该规则的例外。

那么什么是设定点过渡？它试图兼顾两者。当设定点过渡 `= 1` 时，**不会发生设定点过渡**，D 项完全按照设定点权重计算。当提高设定点过渡时，正向摇杆输入的 D 项仍按设定点权重计算；负向输入时，设定点权重会放松（降低），D 项从基于误差逐步过渡为基于测量。目标是在正向输入时提供锐利的“误差式”控制，在负向输入时提供柔和的“测量式”控制，从而获得误差式控制的优势，同时避免翻滚和横滚结束时回弹。

可按以下方式理解：

1. 按希望获得的“基于误差”与“基于测量”的手感设置设定点权重。
2. 降低设定点过渡，以修复翻滚和横滚结束时的回弹。请记住，默认值较低，且在 3.0.1 中基本没有人抱怨急停问题。
3. 提高设定点过渡，以增加中摇杆稳定性，尤其是 P 较低和/或设定点权重较低时。

若设定点权重很低，设定点过渡不会产生作用，因为设定点已经无法明显再降低。

还应注意，调整这些数值时**必须**同步调 P 和 D。P 与 D 强烈互相影响，设定点权重也与 D 强烈关联；这三个参数彼此相连，并不适合新手调校。建议先以默认值为起点，将 P 和 D 尽量调好；然后把设定点权重调至极端值感受差异。若喜欢较高或较低设定点权重的软硬手感，可围绕该值重新调 P 和 D。最后再调设定点过渡，尝试消除翻滚、横滚结束时或其他负向摇杆输入下的回弹。

#### AILERON8 的评论

我一直通过提高设定点过渡来减少普遍的翻滚/横滚回弹。即便 PID 保持默认，此设置对减少回弹也有非常明显的效果。过去我会在调校末尾才处理回弹；现在这是第一步，而且很容易完成。

#### fftunes：用 SetPoint 改善调校的另一种方法

主要问题是中摇杆太软/不稳定，同时又不能继续明显提高 P，否则噪声会过多。结果是 I 项大幅波动，摇杆手感极不可靠，甚至出现漂移。

将设定点过渡从 `0.35` 提至 `0.50` 后，中摇杆、小幅快速动作以及以较小输入保持摇杆的快速转弯，都变得非常扎实可靠。

在用设定点过渡“修复”后，我觉得甚至可以再次略微降低 P。

#### 检查 DMA 冲突的步骤（感谢 teralift）

1. 禁用 DShot，启用 `LED_STRIP`，保存并重启。
2. 进入 CLI。
3. 输入 `resource list`。
4. 在列表末尾的 DMA 区域记录 `LED_STRIP` 使用的 DMA 资源。
5. 输入 `exit`。
6. 启用 DShot，禁用 `LED_STRIP`，保存并重启。
7. 进入 CLI。
8. 输入 `resource list`。
9. 检查分配给电机的 DMA 资源是否与 `LED_STRIP` 使用的资源相同。

### 3.1 的新 CLI 命令

注意：有关 3.0.x 中新增的 CLI 命令及其他功能，请参阅[3.0 发行说明](Betaflight-3-0-Release-Notes)。

#### 资源重映射

Betaflight v3.1 新增了资源映射命令。现在不再需要仅为移动一个电机引脚而创建自定义电机混控。

[资源映射](/docs/wiki/guides/current/Resource-remapping)详细说明了如何使用此命令。

#### set digital_idle_percent = 3.000

*[0..20]*

仅在选择 DSHOT ESC 协议时使用。

参阅[使用 DShot 设置最小油门](/docs/wiki/guides/current/Dshot)。

#### set anti_gravity_threshold = 350 - per Profile

*[20..1000]*

用于提升飞行中 G 力快速变化时的稳定性。它适用于快速油门跳变，即多旋翼飞行器可能经历失重过渡的情况。此时 I 项因积分极性快速变化，可能产生不希望出现的效果，例如抬头或偏航。

要关闭 Anti Gravity，请设置 `anti_gravity_threshold = 1000`。

请参阅下方的 Anti Gravity 讨论。

#### set yaw_accel_limit = 20.000 - per Profile

*[0..50]*

Boris 的说明：旧值曾被放大；现在以浮点表示的值才是真实值，单位为 `deg/sec/ms`，更容易理解。

AILERON8 的说明：`yaw_accel_limit` 通过限制电机转速变化率发挥作用。该值越低，四轴飞行器可实现的偏航转速变化越小。它可防止桨叶过快加速，可用于减少快速偏航跳变或偏航方向上的其他快速增量。但该功能不能阻止 I 项积分饱和，因此未必能完全避免偏航跳变，只能降低其严重程度。

### set yaw_p_limit

由于 2DOF PIDC 不使用该参数，它已不再有效。此参数仅用于旧版 PIDC（3.0 中可用）。

#### set gyro_isr_update = OFF

*[OFF..ON]*

mjbudden 的说明：

`gyro_isr_update` 是新增的实验功能。启用后，陀螺仪会在 ISR（interrupt service routine，中断服务例程）内读取和滤波。这是“非常规”的编程实践，许多人不建议这样做，因此默认关闭。

理论上启用可能带来少量性能提升，但须经飞行测试验证，应谨慎使用。

Boris 的说明：

它可能对 NAZE 等较慢的 I2C 目标板有用，但仅用于测试。发行说明与手册未提及的设置通常不应改动，除非你确实希望成为“测试者”。

### RC3 新增 CLI 命令

#### set gyro_use_32khz = OFF

*[OFF..ON]*

仅适用于 F4 和 F7 目标板。

通常 F4 板卡运行 32 kHz 陀螺仪和 16 kHz PID 环路没有问题；32/32 对 CPU 略重。F7 目标板目前是唯一即使启用加速度计也能完美运行 32 kHz/32 kHz 的平台。要启用 32 kHz 模式，请在 CLI 中设置 `gyro_use_32khz = ON`。（在下一次 Configurator 更新前，Configurator 不会显示正确速度，但可看到实际循环时间。）**注意：**仅搭载 MPU6500、MPU9250 和 ICM 系列（例如 ICM20689）陀螺仪的飞控支持 32 kHz 模式。

增加 32 kHz 只是因为硬件能做到，并不会默认采用更强的滤波。若要飞 32 kHz，必须自行尝试优化滤波器。

默认滤波足以应对 8k 陀螺仪采样，但 32 kHz 会因机架而需要更强滤波。

旧款 BLHeli ESC 反而可能在 32 kHz 下表现良好，因为响应较慢；而 BLHeli_S 及其他制动更强、响应更快的 ESC 在 32 kHz 下可能明显受微小振荡影响。

##### Ksyrium 的说明

我有两块 BlueJay F4 rev 3。起初飞行非常怪异，直到我学会正确软安装 FC；完整软安装堆叠的帮助很有限。

随后其中一块在 32 kHz 下拒绝解锁，CPU 占用为 50%，而另一块为 40%。解决方法是将 `moron_threshold` 设置为 `100`。

##### arcaine25 的说明

我想在 Revolt V2 上跑 32k/32k，但 CPU 占用约 50%。我知道 Boris 说这没问题，但不想冒险。32k/16k 已飞得很好，难以想象与 32/32 会有非常大的差异。

Revolt V2 上不必修改 `moron_threshold`，但带 MPU9250 的 Flip32 F4 则必须改到约 `110-120` 才能工作；否则陀螺仪永远不会校准，也无法解锁。正确软安装后，设置该阈值即可正常工作。RMRC 的 M3 减震柱非常出色，我还订了一些备件。3.1.5 中 `moron_threshold` 默认值为 `48`。

##### fftunes 的问题

> 有人比较过 32k 下 MPU6500 与 ICM20x 吗？Felix 的测试中 ICM20x 看起来不太好。

Boris 的回答：

我比较过，差异为零，绝对没有差异。实际上，ICM208601 似乎略更容易受到电机频率撞上其谐振频率的影响。

我还进一步研究过新旧陀螺仪，甚至与 InvenSense 沟通过。情况是这样的：

MPU60x0 等旧陀螺仪内部有 3 个独立陀螺仪，每个轴各有一个。这对手机功耗太高，市场需要更省电的陀螺仪。厂商因此移除其中两个，让一个陀螺仪负责三个轴，从而降低功耗并取得成功；这种陀螺仪已装在几乎所有手机上，销量以百万计。但它们也牺牲了一些鲁棒性和硬件，而这些似乎对无人机应用至关重要。新陀螺仪也因此比旧款更便宜。

无人机行业需要的是更好的陀螺仪，而非更便宜、更省电的产品，因为功耗对我们并不关键。理想情况是制造更昂贵、质量更好、专为无人机设计的陀螺仪。

### RC6 新增 CLI 命令

3.1 中自稳模式略有变化，增加了更多参数。Configurator 的 PID 标签页中有两个新的自稳参数：`level sensitivity` 和 `level limit`，两者都以度为单位。

`level sensitivity` 是满摇杆时的最大倾角，`level limit` 是受限的最大倾角。例如灵敏度为 `100` 时，满摇杆会给出 100 度倾角；但如果限制仅为 70 度，摇杆行程最后 30% 将不起作用。

降低灵敏度可使摇杆控制更平顺，默认值或许略显激进。RC rate、其他 Rate 或 Expo 参数均不影响自稳模式。

#### set level_limit = 70

*[10..120]*

以度为单位的最大允许倾角。

#### set Level_sensitivity = 100

*[10..200]*

满摇杆时的最大偏转角度（度）。

### RC10 新增 CLI 命令

#### anti_gravity_gain = 4.000 - per Profile

*[1..30]*

此增益表示油门快速变化时对 I 项的临时加速。

Boris：先按默认值飞行，若可以请提交一些日志。要关闭 Anti Gravity，请设置 `anti_gravity_threshold = 1000`。请参阅下方的 Anti Gravity 讨论。

### 3.1 中似乎新增的其他 CLI 命令

注意：其中许多命令没有使用说明。

#### rc_interpolation_channels = RP

允许值：`RP`、`RPY`、`RPYT`

平滑 Roll、Pitch、Yaw、Throttle 的 RX 输入。

#### consumption_warning_percentage = 10

允许范围：`0 - 100`

#### displayport_msp_col_adjust = 0

允许范围：`-6 - 0`

#### displayport_msp_row_adjust = 0

允许范围：`-3 - 0`

#### sdcard_dma = ON

允许值：`OFF`、`ON`

有报告称，在 BFF3 板卡上设置为 `OFF` 可修复 BB 记录问题。但 Boris 表示不必这么做，BFF3 上开启 DMA 的 SD 卡工作会更好。

#### blackbox_on_motor_test = OFF

允许值：`OFF`、`ON`

#### task_statistics = ON

允许值：`OFF`、`ON`

#### beeper_inversion = ON

允许值：`OFF`、`ON`

#### beeper_od = OFF

允许值：`OFF`、`ON`

#### ledstrip_visual_beeper = OFF

允许值：`OFF`、`ON`

#### debug_mode = NONE (added in 3.0)

允许值：`NONE`、`CYCLETIME`、`BATTERY`、`GYRO`、`ACCELEROMETER`、`MIXER`、`AIRMODE`、`PIDLOOP`、`NOTCH`、`RC_INTERPOLATION`、`VELOCITY`、`DFILTER`、`ANGLERATE`、`ESC_SENSOR`、`SCHEDULER`、`STACK`

可将附加值写入 Blackbox 日志，用于在滤波前测量噪声频率及进行其他调试。有关噪声和滤波测量，请参阅 [BB logging 页面](/docs/wiki/guides/current/Black-Box-logging-and-usage)。

#### pidsum_limit = 0.500

允许范围：`0 - 1`

Mjbudden 与 Boris 建议降低 `pidsum_limit`，以降低碰撞旋转的影响并使偏航更柔和。

### 3.1.2 与 3.1.3 间的 CLI 变更

#### dump

不再输出区段名称。

#### CLI 名称变更

##### rc_interpolation => rc_interp
##### rc_interpolation_channels => rc_interp_ch
##### rc_interpolation_interval => rc_interp_int
##### roll_yaw_cam_mix_degrees => fpv_mix_degrees
##### telemetry_switch => tlm_switch
##### telemetry_inversion => tlm_inversion
##### frsky_default_lattitude => frsky_default_lat
##### frsky_default_longitude => frsky_default_long
##### frsky_coordinates_format => frsky_gps_format
##### hott_alarm_sound_interval => hott_alarm_int

##### hott_alarm_sound_interval => hott_alarm_int
##### pid_values_as_telemetry => pid_in_tlm
##### battery_capacity => bat_capacity
##### current_meter_scale => ibat_scale
##### current_meter_offset => ibat_offset
##### multiwii_current_meter_output => mwii_ibat_output
##### battery_notpresent_level => bat_detect_thresh
##### use_consumption_alerts => use_cbat_alerts
##### consumption_warning_percentage => cbat_alert_percent
##### throttle_correction_value => thr_corr_value
##### set throttle_correction_angle => thr_corr_angle
##### servo_lowpass_freq => servo_lowpass_hz
##### servo_lowpass_enable => servo_lowpass
##### airmode_activate_throttle => airmode_start_throttle
##### dterm_lowpass_type => d_lowpass_type
##### dterm_lowpass => d_lowpass
##### dterm_notch_hz => d_notch_hz
##### dterm_notch_cutoff => d_notch_cut
##### vbat_pid_compensation => vbat_pid_gain
##### anti_gravity_threshold => anti_gravity_thresh
##### dterm_setpoint_weight => d_setpoint_weight
##### level_stick_sensitivity => level_sensitivity
##### level_angle_limit => level_limit

### 3.1.3 新增内容

#### set anti_gravity_rate_max = 80

允许范围：`0 - 2000`

请参阅下方的 Anti Gravity 讨论。

#### set iterm_windup = 50

允许范围：`30 - 100`

Boris 的说明：

该参数仅限制 I 项可增长的上限，是防止 I 项在高动态情形下失控的阈值，例如快速摇杆输入或其他类似场景。

从我分析过的许多配置来看，默认值相当合适。除非确实遭遇严重 I 项积分饱和，否则无需调校。

#### fpv_mix_degrees = 0

允许范围：`0 - 50`

注意：这与 V2.x 中的 `set roll_yaw_cam_mix_degrees` 是同一命令。更多信息及视频链接请参阅 2.x CLI 命令页面。

注意，在更新的 BF 版本中，必须在模式标签页启用 `FPV ANGLE MIX` 飞行模式，混控才会生效。可配置开关来开关 FPV 相机角度混控，也可将任一开关的全范围设为启用，使其永久开启。

### 3.1.3 移除内容

#### accum_threshold = 200
#### set yaw_accum_threshold

## 新功能讨论

### Anti Gravity

#### Vaflius 的帖子

我试过一些 Anti Gravity 数值，但仍很困惑。共有三个参数：

```text
set anti_gravity_thresh = 350
set anti_gravity_gain = 3.000
set anti_gravity_rate_max = 80
```

`thresh` 很容易理解：它是灵敏度，即 Anti Gravity 在何时启动。将 `thresh` 调到最大值等同于关闭 Anti Gravity。

`gain` 和 `rate_max` 有什么区别？

截至目前的测试中，我在油门快速变化时有明显抬头；将 `gain` 提至 5 的改善最大。其他 Anti Gravity 参数保持默认时，`gain=5` 与 `gain=6` 看不出区别。将 `thresh` 降至 200 或将 `rate_max` 提至 90 似乎都没有正面效果。

我当前的设置为：

```text
set anti_gravity_thresh = 200
set anti_gravity_gain = 6.000
set anti_gravity_rate_max = 90
```

效果好得多，但油门时仍会轻微抬头；将 `thresh` 降到 200 后，油门急加速/点动时出现类似桨流扰动（propwash）的现象。有人在自己的四轴飞行器上测试过这些参数吗？

我笔记中记录的 Boris B 说明：

不要用这么低的阈值，`300` 或 `350` 应该合适。

该值意味着什么？例如，`350` 表示油门的 35%。若油门在 `100ms` 内增加或减少 35%，就意味着可能发生了剧烈 G 力变化，I 项需要加速以更快达到新值。`gain` 是 Ki 乘数，因此 I 增益会得到临时的“氮气加速”，以防止 I 项过慢导致的抬头/低头。默认值 `2` 很温和；出于安全原因才如此设置，因为许多人使用较高 I 增益，而较高增益可能更容易将 I 项推向失控边缘。

`rate_max` 是达到该速率时完全忽略此功能的阈值。

[Joshua Bardwell 的 Anti Gravity 视频](https://www.youtube.com/watch?v=SmSWZFjXBGM)
