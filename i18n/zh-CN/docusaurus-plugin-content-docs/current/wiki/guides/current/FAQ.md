# 常见问题解答

以下问题来自 Boris 的 ßF 或其他 RCG 讨论串，均为历史上常见的疑问。
其中不少涉及基础知识，但部分答案针对特定 ßF 固件版本；在较新版本中可能已经过时。
请先阅读发行说明，确认当前固件实际支持的命令和功能。

## 目录

1. [我是新手，如何开始？](#im-a-newbie-how-do-i-start-)
1. [如何安装 Betaflight？](#how-do-i-install-betaflight-)
1. [Betaflight 的历史是什么以及它与 Cleanflight 的关系？](#whats-the-history-of-betaflight-and-its-relationship-to-cleanflight-)
1. [Min_check Min_command 和 Min_throttle 以及摇杆输入有什么区别？](#what-is-the-difference-between-min_check-min_command-and-min_throttle-and-stick-inputs-)
1. [为什么升级固件后飞控无法解锁？](#why-wont-my-fc-board-arm-after-upgrading-the-firmware-)
1. [为什么陀螺仪指示灯熄灭且 3D 模型不动？](#why-is-the-gyro-light-turned-off-and-the-3d-model-not-moving-)
1. [什么是 Air Mode？](#what-is-air-mode-)
1. [如何启用 Air Mode？](#how-do-i-enable-air-mode-)
1. [Acro Plus 是什么？](#what-is-acro-plus-)
1. [什么是 2 kHz 模式？](#what-is-2khz-mode-)
1. [如何启用 2 kHz 模式？](#how-do-i-activate-2khz-mode-)
1. [推荐使用哪些飞控来充分利用 BetaFlight？](#what-flight-controllers-are-recommended-to-get-the-best-out-of-betaflight-)
1. [LuxFloat 和 Rewrite PID 控制器有什么区别？](#what-are-the-differences-between-luxfloat-and-rewrite-pid-controllers-)
1. [PID 的作用以及它们是如何做到的？](#what-pids-do-and-how-do-they-do-it-)
1. [是否有学习如何使用 Black Box 进行调优的好资源？](#is-there-a-good-resource-for-learning-how-to-tune-using-black-box-)
1. [为什么我的飞行器在坠毁后表现不稳定？](#why-does-my-copter-behave-erratic-after-a-crash-)
1. [yaw_jump_prevention_limit 如何工作？](#how-does-yaw_jump_prevention_limit-work-)
1. [如何配置失控保护系统？](#how-should-i-configure-the-failsafe-system-)
1. [配置 Throttle 端点的最佳实践是什么？](#what-is-the-best-practice-for-configuring-the-throttle-end-points-)
1. [如何通过 Betaflight 配置 BLHeli 电调？](#how-do-i-configure-blheli-escs-via-betaflight-)
1. [为什么我的飞行器在起飞时会翻转？](#why-does-my-copter-flip-when-trying-to-takeoff-)
1. [从两刀片切换到三刀片时 PID 会发生明显变化吗？](#will-the-pids-change-significantly-when-switching-from-two-blades-to-tri-blades-)
1. [为什么刷写新的 F3 飞控时遇到问题？](#why-do-i-have-issues-flashing-my-new-f3-flight-controller-)
1. [Betaflight 代码会合并回 Cleanflight 吗？](#will-betaflight-code-be-merged-back-into-cleanflight-)
1. [当我更新到最新版本的 BetaFlight 时，我需要重新校准我的电调吗？](#when-i-update-to-the-latest-version-of-betaflight-do-i-need-to-recalibrate-my-escs-)
1. [为什么未装螺旋桨时解锁，电机会在工作台上持续加速？](#why-do-my-motors-keep-accelerating-on-the-bench-when-i-arm-without-props-)
1. [为什么重启飞控时电机会短暂转动？](#why-do-my-motors-spin-briefly-when-rebooting-the-flight-controller-)
1. [如果加速度计被禁用并且失控保护激活，飞行器会发生什么？](#if-the-accelerometer-is-disabled-and-failsafe-activates-what-happens-to-the-copter-)
1. [为什么我的飞控开机时会多次闪烁/蜂鸣？](#why-does-my-flight-controller-blinkbeep-lots-of-times-when-powering-up-)
1. [在 2 kHz 模式下调参后 PID D 增益很小，正常吗？](#my-pid-d-gain-value-is-small-after-tuning-in-2khz-mode-is-that-normal-)
1. [为什么 2 kHz 模式下加速度计的 Blackbox 曲线很差？](#why-are-the-accelerometer-black-box-traces-so-bad-in-2khz-mode-)
1. [如何让 `vbat_pid_compensation` 正常工作？](#how-do-i-get-vbat_pid_compensation-system-working-)
1. [使用 vbat_pid_compensation 从 3S 电池转移到 4S 电池是否存在问题？](#with-vbat_pid_compensation-are-there-issues-moving-from-3s-to-4s-batteries-)
1. [如何才能使 PID 控制器运行速度超过 2kHz？](#how-can-i-run-the-pid-controller-faster-than-2khz-)
1. [什么是 OneShot125、OneShot42 和 MultiShot？它们与 max_throttle 和 Looptime 有何关系？](#what-is-oneshot125-oneshot42-and-multishot-and-how-do-these-relate-to-max_throttle-and-looptime-)
1. [我如何建议 Betaflight 应用程序增强功能？](#how-do-i-go-about-suggesting-betaflight-app-enhancements-)
1. [如何降低飞行器开机时产生魔烟的几率？](#how-do-i-lower-the-chance-of-my-copter-producing-magic-smoke-when-powering-on-)
1. [为什么既有 RC Rate，又有偏航、俯仰和横滚 Rates？](#why-do-we-have-rc-rate-and-also-yaw-pitch-roll-rates-)
1. [为什么防止电机抖动很重要？](#why-does-it-matter-to-prevent-motor-jitter-)
1. [为什么当我使用 CLI 更改某些内容时板会崩溃？](#why-when-i-change-something-using-cli-board-crashes-)
1. [MW2.3 PID 控制器可以在默认 PIDS 上工作吗？](#will-mw23-pid-controller-work-on-default-pids-)
1. [每次升级时如何保留并恢复 Betaflight 设置？](#how-do-i-keep-and-then-restore-my-betaflight-settings-each-time-i-upgrade-)
1. [什么是 yaw_jump_prevention_limit 以及它有什么作用？](#what-is-yaw_jump_prevention_limit-and-what-does-it-do-)
1. [`yaw_iterm_reset_degrees` 是什么，有什么作用？](#what-is-yaw_iterm_reset_degrees-and-what-does-it-do-)
1. [Super Expo 如何工作？](#how-does-super-expo-work-)
1. [速率与俯仰、横滚和偏航度/秒有何关系？](#how-do-rates-relate-to-pitch-roll--yaw-degreess-)
1. [目前哪些飞控使用 SPI？](#which-flight-controllers-currently-use-spi-)
1. [应下载并刷写哪个 HEX 目标到飞控？](#which-hex-target-do-i-download-and-flash-to-my-flight-controller-)
1. [如何设置反向螺旋桨转向？](#how-do-i-setup-for-reversed-prop-rotation-)
1. [建议用什么 FC 和电调配置运行 8 kHz？4/4、4/4/32 或 8/8 又代表什么？](#what-is-a-recommended-fc-and-esc-setup-to-run-at-8khz-also-i-see-reference-to-44-or-4432-or-88-what-are-these-referring-to-)
1. [不同 PIDC 速率下 PID 整定有什么不同吗？](#is-pid-tuning-any-different-at-different-pidc-rates-)
1. [bF 版本中的 PIDC Iterm 有什么区别？](#what-is-the-difference-in-pidc-iterm-in-bf-versions-)
1. [如何使用板载 dataflash 设置 Blackbox 记录速率？](#how-to-setup-blackbox-record-rate-with-onboard-dataflash-)
1. [如何设置费率和 SuperExpo？](#how-to-setup-the-rates-and-superexpo-)
1. [不同 Rate 和 Expo 的原理是什么？](#what-is-the-story-on-the-different-rates-and-expos-)
1. [如何解决偏航抽搐或油门中段振荡？](#how-do-i-solve-yaw-twitches-or-mid-throttle-oscillations-)
1. [有没有办法通过终端客户端下载 Blackbox 日志？](#is-there-a-way-to-download-blackbox-logs-through-a-terminal-client-)
1. [为什么 LED 灯带不亮？](#why-do-led-strips-not-work-)
1. [天气变冷后，四轴开始随机抽动，这是怎么回事？](#recently-with-the-temps-dropping-my-quad-has-started-to-develop-a-random-twitch-anyone-else-experience-random-issues-when-its-20ish-degrees-f-outside-)
1. [为什么我无法使用 MSP over UART1 连接到我的飞控？](#why-cant-i-connect-to-my-flight-controller-using-msp-over-uart1-broken-usb)
1. [是否可以像现在刷 ESC 一样通过飞控刷 FrSky 接收机？](#is-it-possible-that-we-can-flash-the-frsky-receivers-thru-the-flight-controller-like-we-now-flash-the-esc)
1. [有办法关闭 OSD 飞行后统计屏幕吗？](#is-there-a-way-to-dismiss-the-osd-post-flight-statistics-screen)

**如果您的问题未在上面列出，请检查以下页面：**

http://github.com/borisbstyle/betaflight/wiki/Betaflight-specific-CLI-commands

http://github.com/borisbstyle/betaflight/wiki/BetaFlight-Deep-Dive

---

## 我是新手，如何开始？

建议先观看下列视频，了解 Betaflight 及其配置的完整最佳实践：
http://www.youtube.com/watch?v=xSzO6HP6yzs

也可参考 **[MultiWii Wiki](http://www.multiwii.com/wiki/?title=Main_Page)**、**[Naze32 手册](http://www.abusemark.com/downloads/naze32_rev2.pdf)**、GitHub 上的 CF 文档、ßF GitHub 文档和本 Wiki。

快速配置教程：https://youtu.be/tlfBlgcpink

Cleanflight 油门参数配置视频（RC 输入到电调输出）：
http://www.rcgroups.com/forums/showpost.php?p=34144329&postcount=20469

准备好后，请参阅下一个常见问题解答主题（“如何安装 Betaflight”）。

## 如何安装 Betaflight？

请参阅[固件安装](/docs/wiki/getting-started/Firmware-Installation)支持页面。

## Betaflight 的历史及其与 Cleanflight 的关系是什么？

简要历史：一切始于运行在 Arduino 8 位开发板上的开源 MultiWii 代码。32 位 STM32 处理器出现后，MultiWii 被移植到 STM32，成为 BaseFlight。后来有人从 BaseFlight 分叉出 CleanFlight。再后来，Boris 认为可改进 PID 控制环路的工作方式，于是分叉出实验版本 BetaFlight。

因此，ßF 和 CF 文档通常只说明新增或改动的内容；还应查阅相应旧版固件的文档。

## `min_check`、`min_command`、`min_throttle` 与摇杆输入有什么区别？

来自 MasterZap

`min_check` 与电调无关。

`min_command` 是未解锁时发送的值；启用 `motor_stop` 时，已解锁但要求电机停转也发送该值。
`min_throttle` 是已解锁且未启用电机停止时发送的值。

`min_check` 用于判断油门摇杆指令，只与实际油门摇杆有关；它不影响发送给电调的值。

误解源于油门在高于 `min_check` 前不会开始“起作用”。常见说法“飞控将 `min_check` 映射至 `min_throttle`”虽然不算错，却容易让人以为两者存在关联。实际上不存在：飞控只关心从 `min_check` 到满油门的范围，将它重新映射为飞控的 0% 至 100% 输入，再按自身逻辑输出电机指令。

来自 waltr

通常，所有通道的 `min_check` 和 `max_check` 只用于摇杆指令。只有油门通道还会根据其他设置（`pid_at_min_throttle`、AirMode 等）在解锁和 PID 控制器代码中使用 `min_check`。

`mid_rc` 指定飞控所认为的摇杆中点，通常是 1500，部分遥控器可能为 1520。注意，CF 配置 GUI 曾将它误标为油门中点；`mid_rc` 不用于油门通道。默认的 `max_throttle` 值 1850 来自 MultiWii，是适用于所有电调的安全最大值。

MW2.3 `config.h` 中的代码：

/\***\*\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\*\*\*** 电机最大油门 **\*\***\*\***\*\***\*\*\***\*\***\*\***\*\***/
/_ 这是 ESC 在全功率下的最大值，该值最多可以增加到 2000 _/
#define MAXTHROTTLE 1850

`DEADBAND` 仅用于移除摇杆中位值（油门以外的所有通道），消除中位抖动和无法精确回到 1500 的问题，仅此而已。不要把这个术语用于其他含义。

阅读 MultiWii Wiki 乃至 MultiWii 的 `config.h`，有助于理解这些值。链接见 ßF Wiki 的“入门”FAQ。

CF 和 ßF 都设定了预期的摇杆端点值（具体从哪个版本开始并不明确，但原始 MW 到 BF 的移植代码中没有）：

命令：

## `rxrange`

rxrange 0 1000 2000
rxrange 1 1000 2000
rxrange 2 1000 2000
rxrange 3 1000 2000

遥控器无法达到标准值时可调整这些值。也可交换端点来反向摇杆方向，例如 `rxrange 0 2000 1000` 会反转横滚摇杆。

飞控固件使用 `mid_rc` 和上述端点计算传递给 PIDC 的摇杆值；此处不使用 `max_check`。

若通道达不到这些端点，飞控在一侧或两侧都无法识别完整行程。这是建议按这些默认值调整遥控器端点的原因之一；另一个原因是确保摇杆能越过 `min_check` 和 `max_check` 阈值，使摇杆指令正常工作。

约书亚·巴德韦尔的另一个解释：
通道最小和最大值由 `rxrange` 决定，默认是 1000 和 2000。`max_check` 和 `min_check` 用于判断是否正在输入摇杆指令。关键在于：若偏航仍有效，怎样在用摇杆解锁时上锁飞行器？必须打满偏航，飞行器会剧烈偏航。

因此，在油门低于 `min_check` 且采用摇杆解锁（而非开关解锁）时，会禁用偏航输入。启用 `motor_stop` 时，油门低于 `min_check` 也会让电机停止。这种行为有时称为油门行程底端的“死区”；为避免与摇杆中位的 `DEADBAND` CLI 设置混淆，更推荐称为 `DEADZONE`。

无需在油门范围顶端同样禁用输入，因为飞行时不会输入需要顶端行程的摇杆指令。飞行中唯一可输入的摇杆指令是上锁，即低油门加低偏航。因此油门范围底端（`min_check` 以下）存在死区，任何通道范围顶端都没有。

约书亚·巴德韦尔的视频：
Cleanflight 油门参数配置-
第 1 部分：http://www.youtube.com/watch?v=WFU3VewGbbA
第 2 部分：http://www.youtube.com/watch?v=YNRl0OTKRGA

## 为什么升级固件后飞控无法解锁？

检查以下内容：

- 刷写固件时执行完整芯片擦除。
- 处于 CLI 时无法解锁飞控，状态灯会快速闪烁。
- 尝试校准加速度计。
- 检查 RX 基础知识（见下文）
- 减少 AUX 通道数量，降低 RX 任务的执行时间。
- 如果状态指示灯缓慢闪烁，则 CPU 可能负荷过重（见下文）。
- 飞控启动时机架发生移动，陀螺仪未完成校准。校准期间机架**不得移动**。陀螺仪校准完成时，LED（以及已连接的蜂鸣器）会闪烁三次；若未完成，可执行摇杆陀螺仪校准指令、提高 `moron_threshold`，或启用“解锁时校准陀螺仪”（3.0 新增）。
- 机架倾角大于 `small_angle` 设置。提高 `small_angle`；若要允许任意姿态解锁，设为 180。

高于 2.2.0 的固件使用了新的任务调度器。若从更早版本升级，请检查飞控状态灯：闪烁代表已启用的功能没有足够的处理时间完成执行。较新的 Betaflight 地面站会在状态栏显示 CPU 负载，必须低于 100%，最好低于 50%。若为 100%，请降低环路频率（陀螺仪和/或 PID），点击“保存并重启”，再检查 CPU 负载。

在 CLI 中输入 `tasks`，检查输出：

```
# tasks
Task list:
0 - SYSTEM, max = 10 us, avg = 0 us, total = 2 ms
1 - GYRO/PID, max = 934 us, avg = 667 us, total = 26004 ms
2 - ACCEL, max = 153 us, avg = 122 us, total = 974 ms
3 - SERIAL, max = 67 us, avg = 2 us, total = 12 ms
4 - BEEPER, max = 8 us, avg = 0 us, total = 3 ms
5 - BATTERY, max = 40173 us, avg = 1 us, total = 47 ms
6 - RX, max = 180 us, avg = 130 us, total = 483 ms
7 - COMPASS, max = 156 us, avg = 125 us, total = 41 ms
8 - BARO, max = 137 us, avg = 106 us, total = 273 ms
10 - ALTITUDE, max = 264 us, avg = 152 us, total = 165 ms
11 - DISPLAY, max = 130302 us, avg = 26263 us, total = 5115 ms
```

这表明四轴已启用显示器、磁力计、气压计和加速度计。
尝试**逐项**禁用，直到 CPU 负载低于 100%。

对应 CLI 命令如下（新版 Configurator 也可完成这些操作）：

```
feature -DISPLAY
set mag_hardware = NONE
set baro_hardware = NONE
set acc_hardware = NONE
```

禁用加速度计会强制飞行器进入 Acro 模式（Angle 和 Horizon 模式均无自稳）。

**重要：** 记得保存 CLI 设置并退出 CLI，否则飞控无法解锁。

另一种释放 CPU 的方法是：

- 在 ßF 3.0 之前，从 LuxFloat PID 控制器切换到 MWREWRITE，后者所需 CPU 资源更少。
- 在 ßF 3.0 中，从 BetaFlight PID 控制器切换到 Legacy，后者所需 CPU 资源更少。
- 禁用软串行。

也不要忘记基础检查。使用“Receiver”选项卡确认每根摇杆移动了正确的通道滑块，且方向正确。若移动了错误的通道滑块，请检查通道映射（例如应使用 AETR 而不是 TAER）。

还要确认摇杆端点仍为 1000/2000。详细说明见“油门端点的最佳配置方法”。

油门摇杆的最小值必须低于 `min_check`。若“Modes”选项卡显示四轴本应解锁却没有，请用 `set min_check`，使其高于 Receiver 选项卡中的最低油门值。

加速度计是否已经校准？需至少校准一次才能解锁。

要确定 ACC 或其他已启用传感器是否造成问题，请在 CLI 中使用 `status`。其中“System load”必须低于 100%；超过 100% 表示处理器任务过多。

```
	# status
	System Uptime: 40 seconds, Voltage: 0 * 0.1V (3S battery - OK), CPU:8%
	CPU Clock=72MHz, GYRO=MPU6050, ACC=MPU6050.n, BARO=BMP280
	Cycle Time: 491, I2C Errors: 0, config size: 1308
```

## 为什么陀螺仪指示灯熄灭且 3D 模型不动？

这是禁用加速度计的副作用。通过 USB 连接飞控时，Cleanflight Configurator 的 3D 模型依靠加速度计，在移动多旋翼时才能正确转动。陀螺仪灯熄灭只是 Configurator 的显示故障；两者都无需担心，属于正常现象。

在 Configurator 或 CLI 中，将循环时间设得比默认值更快时，Betaflight 会在某些目标上自动禁用加速度计，以释放处理资源并允许更快的循环时间。

## 什么是 Air Mode？

有用户希望在软件中实现类似遥控器 Idle Up 开关的功能。Boris 起初认为，只要在零油门启用 I 项，并通过 `pid_at_min_throttle` 启用 P、D 项即可，但效果仍然疲软、响应迟钝。问题不在于 PID 项是否启用，而在于混控器逻辑。

早期混控逻辑会按油门比例缩放 PID，并在任一电机降至最小油门时放弃稳定控制。Idle Up 之所以感觉更稳定，只是因为它牺牲了底部油门行程。低油门曾被视为“非飞行”状态；但在 2015 年的迷你四轴飞行中，零油门或低油门飞行很常见。真正的解决方法是让混控器始终根据可用电机输出范围计算 PID 校正。

Air Mode 会让飞行器始终按“在空中”处理，持续以最大能力进行校正，而不会在低油门变弱。这正是空中所需的稳定性，但也会影响地面行为。

Air Mode 下，解锁后电机可能升速，不过已有保护：解锁后若油门保持低位（低于 `min_check`），飞控会判定机架仍在地面，电机不会升速。油门高于低位超过 1 秒且俯仰、横滚摇杆不再居中后，零油门稳定功能会完全启用。因此首次起飞后很快落地时，飞控可能仍认为在飞行并为校正而提高电机转速。此时可以上锁，或保持低油门且横滚、俯仰摇杆居中，电机仍会降速，至少不会继续升速。

### ctzsnooze 的快速解释：

假设启用了 `pid_at_min_throttle`，将油门拉到零，所有电机都在 `min_throttle`，然后快速右打横滚。左侧两颗电机会加速，但右侧两颗已无法再减速，所以只有左侧电机在产生横滚力矩。

与悬停油门时的右滚对比，PID 请求相同，左侧电机同样加速；但右侧电机还能降到低于悬停转速，且确实会降速。因此在 Air Mode 出现前，即使启用 Idle Up 或 `pid_at_min_throttle`，悬停油门的滚转总是比零油门更快。

Air Mode 会补偿无法再降速的电机：混控器判定某些电机必须降至 `min_throttle` 时，会相应提高其他电机的转速，使产生转动所需的差速与悬停油门时相同。也就是说，当参与控制的电机触及零（或最大）油门时，Air Mode 仍保持滚转速率，使极端油门下的滚转速率一致。这正是它与 `pid_at_min_throttle` 的区别。

该功能可能仍会根据 Beta 测试者的经验进行优化，但看起来已经不错了。

### Air Mode 使用演示

http://www.youtube.com/watch?v=mlEJFMNWyvQ

http://www.youtube.com/watch?v=b0qVUa4AeDQ

### Joshua Bardwell 关于 Air 模式的视频

https://www.youtube.com/watch?v=d2nRrVENEYM

### Air Mode 的 Blackbox 分析视频

第 1 部分：http://www.youtube.com/watch?v=PP_De47io18

第 2 部分：http://www.youtube.com/watch?v=goYT3PcA-dE

第 3 部分：http://www.youtube.com/watch?v=z0ZUsdUD9iw

## 如何启用 Air Mode？

可使用三段开关：

- 位置 1：未解锁（电机不转）。
- 位置 2：解锁（电机以 **`min_throttle`** 转动）。
- 位置 3：解锁 + Air Mode（电机继续以 **`min_throttle`** 转动，但采用新的 Air Mode 混控器）。

可启用或禁用 Motor Stop；未激活 Air Mode 时，它按正常逻辑工作。一旦 Air Mode 激活，Motor Stop 会被覆盖，电机以 `min_throttle` 或更高转速运行。Boris 对 Air Mode 的 `min_throttle` 建议是：“在电机始终不会停转的前提下，尽可能低；我确实建议使用尽可能大的油门范围，例如 1000 至 2000。”

**`min_throttle` 的确应尽可能低，但实用做法是：在“Motors”选项卡中找到四颗电机都能可靠、无抽动转动的油门值，加 10 后设为 `min_throttle`。较小电机（如 1306 3100 kv）在很低油门下扭矩较小，可能需加 15 或 20。低油门翻转或下落时，螺旋桨空气阻力不应压过 `min_throttle` 提供的动力，导致电机失速停转。**

注意：从零油门快速提高时，部分电调在极低 `min_throttle` 下可能失步。若发生，请把 `min_throttle` 再提高 20 至 40，直到快速加油门不再失步。

来自 teracis 的帖子：
要启用 Air Mode，只需在 Configurator 的“Modes”选项卡中像设置解锁开关一样设置其激活范围。建议用开关解锁；若坚持用摇杆解锁，风险自负。

要永久启用 Air Mode，勾选对应选项并将滑块拖满 1000 至 2000 的范围。

**使用三位开关，飞行程序可以是：**

1. 连接电池，确保飞控启动和陀螺仪校准期间四轴**完全不动**。校准完成时蜂鸣器会鸣叫三次。
2. 解锁电机（电机开始转动）。
3. 启用 Air Mode（地面上不会出现 I 项累积）。
4. 起飞并飞行（飞行中即使油门最低，电机也不会停转）。
5. 着陆并上锁电机。

有人会质疑或抱怨 Air Mode 下的最低油门。

`min_check` 决定发射机可输出的最低油门值。`min_check` 设置得越低，Air Mode 下四轴可达到的油门也越低。

若 `min_check` 设为 1100，而发射机最低为 1000，飞控已经在施加一定限制。可将 `min_check` 设得略高于 1000，例如 1015 或 1020。

## Acro Plus 是什么？

1. 当您的摇杆超过全投程的 70% 时，任何高于 0 的 AcroPlus 值都会导致任何累积的 iTerm 重置为零（并保持为零）。当恢复到低于全摇杆行程的 70% 时，iTerm 只能缓慢恢复到“正常”状态，实际上每个处理器循环恢复 0.1%。因此，在 2kHz 目标上翻转或滚动后，ITerm 需要大约 0.5 秒才能恢复“正常”。这提高了滚动/翻转后的立即稳定性。

2. AcroPlus 通过修改 PID 影响电机的方式来改变摇杆响应能力，尤其是在摇杆运动的极端情况下。

各个 PID 值的计算方式与平常相同，因此 PID 总和值（pTerm、dTerm 和 iTerm 之和）的计算方式完全相同。 PID 总和的最大可能允许限制未更改为 1000。

实际 PID 总和值可以被视为发送到驱动电机的实际最终值。

Acro Plus 修改 PID 总和值，基本上与 acroPlus/100 成线性比例，并与摇杆角度成平方比例，直至最大可能的总 PID 值 1000。

当 AcroPlus 值较低（如 1）时，无论摇杆角度如何，PID 总和几乎不变；PID 基本按常规工作，只是上述 I 项效应完全启用。与平常一样，100% 摇杆行程（即最大横滚速率）的摇杆灵敏度由 RC Rate 和俯仰/横滚 Rate 决定，中心灵敏度还受 Expo 影响。

随着 AcroPlus 值升高，会发生两件事：通常驱动电机的 PIDsum 会随摇杆角度线性减少；被移除的 PIDsum 部分，则以摇杆角度的平方倍数直接送到电机。

让我们考虑一下当前代码的数字结果 - 我希望我做对了：

若 AcroPlus 为 100 且摇杆打满，PID 仍会计算，但会被完全忽略。电机输出直接设为 PIDsum 的最大允许值 1000。若摇杆打满向右，左侧两颗电机基本全速，右侧两颗降至 `min_throttle`；PID 环路不再限制或控制此过程。四轴会以尽可能高的速率转动，等同于在满行程附近直接控制电机。

若 AcroPlus 为 100 而摇杆为 50%，则是两种控制的混合：正常 PIDsum 仍在计算，但驱动电机的量减半，同时叠加最大允许电机输出的 25%。例如某时刻 PIDsum 为 350，送入电机的量为 350 + 250 = 600，即最大可能值的 60%。其中 250 由摇杆角度固定，PID 部分仍按常规过程变化。

若 AcroPlus 为 100 而摇杆为 10%，仍是两种控制的组合，但低摇杆量时常规 PID 机制占主导。电机驱动的 90% 来自常规 PID 计算，只额外加入最大允许输出的 1%，即中位附近基本按常规 PID 工作。

摇杆角度的“直接”电机控制量等于摇杆百分比的平方。因为 0.1 \* 0.1 = 0.01，10% 摇杆角度只产生满行程“直接摇杆控制”量的 1%；20% 为 4%，30% 为 9%，40% 为 16%，50% 为 25%。直接控制相对 PID 控制的比例呈指数式上升。

当 AcroPlus 的数字小于 100 时，“直接控制”效果会按比例线性降低，但您始终可以获得完整的 iTerm 优势。

例如，如果将 AcroPlus 设置为 10，您将获得最大可能 AcroPlus 效果的 10%。这意味着，在 100% 粘杆时，PID 和将仅获得与粘杆角度相关的贡献 100，其余部分将被确定为正常 PID 和值的 90%。在 10% 粘杆时，与粘杆角度相关的 PID 总和贡献仅为 1（最大可能值的 1/1000），99% 将来自正常 PID 过程。

因此，您可以看到，在较高的 AcroPlus 值和较高的摇杆角度下，PID 本身的相关性会降低，因为电机更直接地仅由摇杆角度控制。这使得电机控制更加直接，但也更加极端。

请注意，在接近或非常接近中心操纵杆时，AcroPlus 对正常 PID 控制输出的影响明显较小。因此，20 左右的 AcroPlus 值对中心摇杆灵敏度的影响相对较小，但很可能会显着提高全摇杆滚动速率，超过速率设置。

因此，Acro Plus 可视为常规 PID 机制外的指数式 Rate 乘数。在大多数四轴上，它会显著提高大摇杆量时的横滚速率。I 项代码改动可防止 I 项累积，否则这种高 Rate 的横滚或翻转结束时，必然可能失控或严重反弹。

### 注意：Acro Plus 在 V3.0 中被删除并被 Srates 取代。阅读 3.0.x Wiki 页面。

## 什么是 2kHz 模式？

请参阅支持页面上的“基于陀螺仪的循环实现”描述。
2kHz 模式只是一种更快的基于陀螺仪的循环，以每秒 2000 次或每 500 微秒的更新速率运行。

一个形象的比喻：你在开车，运行于 1 kHz 时，相当于每秒只能睁眼一次。此时不仅要看前方道路，还得看方向盘、车速表、转速表和收音机等，然后闭眼直到下一次。
2khz 让您在与 1khz 相同的时间范围内睁开眼睛并做出两次决定。

所以你正以 60 公里/小时的速度走向碰撞。 1khz 可以让您将该距离调整一倍。 2khz 让你调整两倍（是的，我知道，但我正在解释基础知识）。因此，在 1K 中进行一米水平调整需要 6 米，而在 2k 中进行 1 米水平调整则需要 3 米。
这不是福音，只是解释差异的一种方式。

1KHz 模式等于 1000uSec 的 LoopTime
2KHz 模式等于 500uSec 的 LoopTime

观看此视频了解更多信息：http://www.youtube.com/watch?v=j2YtpeHGafs

## 如何激活 2kHz 模式？

对于 Betaflight 2.4.0 及更高版本，不要使用 CLI；请在“Configuration”选项卡将 `looptime` 设为 500。注意：旧版固件和 Configurator 的 UI 标签可能与当前 Betaflight App 不同。**注意：** F1 开发板上的相应传感器会自动禁用。

对于 2.4.0 之前的 Betaflight 版本，您可以使用 CLI 并执行以下命令，具体取决于飞控类型：

**对于 F3 板**

```shell
set gyro_lpf = OFF
```

**对于 F1 板**

```shell
set acc_hardware = 1
set baro_hardware = 1
set mag_hardware = 1
set gyro_lpf = OFF
```

### 注意：2k 模式在 V3.0 及更高版本中已被删除。

## 2kHz 模式的限制

请注意，2kHz 模式下可用 AUX 通道的数量有限制（实际上是任何大于 1kHz 的环路频率）。

**对于 F3 板**

6 个 AUX 通道可用

**对于 F1 板**

4 个 AUX 通道可用

对于 Betaflight 2.4.1 及以上版本，可以通过设置 max_aux_channels 来选择 Aux 通道的数量（请参阅 CLI 命令部分）。

**注：**
某些 ESC 无法在 2kHz 和更快的循环速率下进行校准，据报道 KISS ESC 存在此问题。解决方法是简单地将循环速率设置为 1kHz（1000usec 循环时间），然后校准 ESC 并改回所需的循环时间。

## 建议使用哪些飞控来充分利用 BetaFlight？

### 注意：此列表已过时，因为现在市场上有太多新的 FC。检查支持菜单中的板和已发布的十六进制文件。

以下是 2016 年 1 月底左右编制的 FC 列表。还显示了有关优点和缺点的意见。

|飞控|处理器/传感器 | 2KHz 模式 |港口 |意见 |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- || Naze32 修订版 5 | F1 MPU6050-I2C | Y（禁用加速计、气压计、磁力计）| UART 1 和 2。UART 1 与 USB 共享 |有杂技和完整版本。完整版本有气压计、磁力计和 Blackbox 数据闪存。使用相对不方便的接收机垫。一个经过尝试和测试的板，但现在被 rev 取代。 6.|
| **[Naze32 修订版。 6](http://www.getfpv.com/acro-naze32-flight-controller-rev6-w-pin-headers.html)** | F1 MPU6500-SPI | Y（禁用加速计、气压计、磁力计）| UART 1 和 2。UART 1 与 USB 共享 |现在，即使是 acro 版本也有气压计和 datafash。使用通孔代替焊盘。 USB 连接器移至右侧。还有一个 SBus 逆变器。 6a 修复了 ESC 校准问题，6b 修复了 Spektrum sat 问题。 F1 处理器开始达到其极限，建议使用 F3 板。一些用户报告了该主板的不稳定行为和奇怪问题，这可能是由于使用了 MPU6500 陀螺仪，其噪声规格比 6050 更差。还有一个 [令人信服的理论](https://www.youtube.com/watch?v=dRyOS9TvIV4) MPU6500 不喜欢高振动环境。 |
| **[SPRacing F3](http://seriouslypro.com/spracingf3)** | F3 |是 | |硬件问题导致看似很高的故障率。微型连接器很糟糕。 |
| **Flip32/Flip32+** **[DragonFly32/DF32+](http://www.rcgroups.com/forums/showthread.php?t=2320471&highlight=dragonfly)** | F1 MPU6050-I2C | Y（禁用加速计、气压计、磁力计）| UART 1 和 2。UART 1 与 USB 共享 |有 acro 和 plus 两种。 Plus 版本有气压计、磁力计。这是 Nase32 的克隆版本，但带有通孔连接器焊盘。 |
| **[TBS PowerCube](http://www.team-blacksheep.com/products/prod:powercube_colibri)** | F3 |是 | |超级昂贵，就像所有 TBS 装备一样。 ESC 被列为能够运行 SimonK，这意味着它是 Atmel，这意味着它的性能可能很平庸。 || **[渡渡鸟](http://www.rcgroups.com/forums/showthread.php?t=2439777)** | F3 MPU6050-I2C |是 | UART1 上的 CP21xx |个人没有什么抱怨。现在他们解决了 V3 上的 ESC 反馈问题。板上还有 2MB SPI 闪存，用于 BB 记录。所以目前这似乎是一个不错的选择。 |
| **[MotoLab 龙卷风](http://www.rcgroups.com/forums/showthread.php?t=2473157#post32330479)** | F3 |是 | VCP USB、UART 1、2、3 |电机输出上的 5v 缓冲器意味着没有 BLHeli 直通。使用 STM 的虚拟 Com 端口需要特殊程序。除此之外，很棒的 FC，价格也很合理。 **[详细说明](http://www.rcgroups.com/forums/showthread.php?t=2537379)** |
| **[MotoLab Cyclone](http://dronehitech.com/motolab-cyclone-flight-controller-announced/)** | F3 MPU6000-SPI |是 | VCP USB、UART 1、2、3 |内置 5V 开关稳压器。用于 HLBeli 直通的双向 ESC 引脚。使用 VCP，这意味着必须连接外部 USB 转串行设备才能使用 BLHeli 直通，直到添加 VCP 直通。没有板载数据闪存|
| **[XRacer F3](http://www.fpvmodel.com/x-racer-f303-flight-controller_g1106.html?u=8D1D164861E0E506)** | F3 MPU6050-I2C |是 | |最便宜的 F3 主板之一。设计和电路板布局不错，但缺少 VBat 和 RSSI 引脚。可以通过将分压器直接焊接到处理器来添加 VBat。拥有比任何其他板更多的数据闪存。请参阅**[此处](http://intofpv.com/t-x-racer-f3-fc-adding-vbat-hack)**。 v2 板有 VBat 和 RSSI 焊盘。 |
| **[勒克斯](http://www.rcgroups.com/forums/showthread.php?t=2554204)** | F3 MPU6500-SPI |是 | VCP USB、UART 1、2、3 |看起来不错。没有数据闪存芯片。使用 STM 的虚拟 Com 端口需要特殊程序。使用 MPU6500，不太理想。 || **[吻](http://www.rcgroups.com/forums/showthread.php?t=2555204)** | F3 MPU6050-I2C |是 | VCP USB |还没有运行 Betaflight 哈哈。 |
| **[SPRacingF3Mini 板](http://www.rcgroups.com/forums/showthread.php?t=2592215)** | F3 |是 | VCP USB |现已在 2.4.0-RC6 中支持。带 SD 卡槽、竞赛应答器和 5V BEC，看起来很适合竞速四轴。 |
| **[MotoLab 暴风雨](http://www.rcgroups.com/forums/showthread.php?t=2715556)** | F3 MPU600-SPI |是 | VCP USB、UART 1、2、3 |内置 5V 开关稳压器。用于 BLHeli 直通的双向 ESC 引脚。加上一个 PDB |

### 附加信息：

基于 F1 的主板综述：http://www.youtube.com/watch?v=7u1PcvDosBM

基于 F3 的主板综述：http://www.youtube.com/watch?v=StnC9Q_O1Fw

推荐的 CleanFlight/BetaFlight 板：http://www.youtube.com/watch?v=SJa_LgbwwMk

## LuxFloat 和 Rewrite PID 控制器有什么区别？

### 注意：这两个 PIDC 已在 V3.0 及更高版本中删除。

根据鲍里斯的说法，Lux 和 Rewrite 之间实际上没有任何区别（从飞行特性的角度来看），只是它们的数字缩放比例不同。因此，它们之间的实际 PID 增益和速率会有所不同，但陀螺仪数据的处理是相同的。 Luxfloat 的主要问题是 CleanFlight 地面站 GUI 默认情况下只提供 0.1 精度，这对于 Luxfloat 来说太大了。这就像尝试调整 Rewrite，却只能使用 4.0、5.0、6.0 等整数。

LuxFloat 使用浮点数学，而 Rewrite 使用整数数学。这是什么意思？浮点数学需要飞控提供更多处理能力，因此基于 F3（及更高版本）CPU 的 FC 将更容易计算 PID 循环中的值，因为它具有用于这些计算的专用浮点单元 (FPU)。
为什么这很重要？PID 控制器处理陀螺仪和加速度计数据越久，“循环时间”就越慢。更短的循环时间更理想，因为它令四轴对飞手输入更灵敏，并且更能修正外部扰动（如风和桨叶尾流）。

从开发的角度来看，LuxFloat 更容易理解，因为 ReWrite 必须使用复杂的例程而不是专用 FPU 可以处理的简单命令来模拟数学函数。如今，人们喜欢 Rewrite 仅仅是因为它更容易调整，因为它在增益方面提供了更高的功能精度。 Luxfloat 和 Rewrite 以不同方式运行的日子（就像 Luxfloat 具有错误搜索 D 术语或其他术语之前）已经一去不复返了。

Luxfloat 中的水平模式角度控制和摇杆灵敏度与 BetaFlight 中的 Rewrite 不同

在 Luxfloat 水平/水平模式下，全摇杆时达到最大最大角度。这意味着在水平/半自稳模式下摇杆灵敏度非常低，在 acro 中速度相当快，特别是当 max_angle 设置为较低值（例如 45 度）时。摇杆灵敏度不随速率变化而变化。我个人无法像这样水平/地平线飞行。

在重写中，操纵杆灵敏度的管理方式不同；灵敏度取决于速率并且更接近 acro 灵敏度。这可能会导致在操纵杆到达其完整行程之前就达到最大角度。我个人更喜欢这个（我认为这是我的编码技巧造成的）。这对于教学和经验丰富的飞行员都有好处。

Boris 在有关调整 Rewrite 的帖子中发布了此内容，以使其感觉与 Luxfloat 相同：

我是说，如果你花一些时间计算一下数学，你可以用两者得出相同的数字
只是一个例子来向您展示。您不必理解代码即可理解这部分。

勒克斯浮法 P
代码：

```
	// -----calculate P component
	PTerm = RateError * P * TPA;
```

重写 P
代码：

```
	// -----calculate P component
	PTerm = (RateError * P * TPA) / 128;
```

上面的区别是，重写时的 P 增益数值较高，但在 PTerm 计算中除以 128，而 Luxfloat 直接使用您从 cli 输入的数值。请注意，RateError 数字在 Luxfloat 中使用度/秒，并重写其对原始陀螺仪输出的抽象，但当选择正确的 P 时，两者都可以产生相同的 PTerm。

因此，如果您能找到可以产生相同 PTerm 结果的 P 组件，您将获得相同的行为。

实用翻译：
Luxfloat 中的 1.0 恰好意味着 Pterm 重写中的 4.0。

可以对所有数字（例如费率、Dterm 和 Iterm）执行相同的转换公式。

V2.5.4 中的新功能

Luxfloat 中的“P”和“D”项现在显示为高 4 倍，以便在调整时提供更好的分辨率。实际的 PID 缩放保持不变，并且可以在 CLI 中看到。

Boris 对 MW 重写诗 Luxfloat 的补充评论：
两者在 PID 和速率方面不应有任何差异。好吧，实际上有一个细微的差别，我忘了提及，甚至我都忘记了。
rewrite 的 D 范围仍然较高。确切地说，由于平均求和而不是平均除以总和，重写的 Dterm 增量增加了 2 倍。我宁愿删除它，但不想让人们不得不重新调整他们的重写。但即使使用这个 Dterm 重写，理论上应该可以更好地处理反弹......对吧？但事实并非如此。

我知道为什么。 Rewrite 在整数逻辑中集成了 Dterm 死区，这有助于消除一些噪音。但是较低的数字可能会导致 Dterm 中出现一些混叠，并且一些不存在的较低频率可能会被扔进 pid 控制器中。
很快就会有更多关于这一点的数据得到证实，但 Luxfloat 现在肯定会成为赢家，因为它变得更好了。

ßF 2.8 及更高版本中的新功能：不再使用 PIDC 名称 LUXFLOAT 和 MWREWRITE，因为 Boris 重写了代码，并且它们不再使用与以前相同的算法。新名称是 FLOAT 和 INTEGER。

## PID 做什么以及如何做？

Bruce 为那些想要了解它的人提供了一个很好的基本 PID 解释。
https://www.youtube.com/watch?v=0vqWyramGy8

## 是否有学习如何使用 Black Box 进行调优的好资源？

一个。 “我会查看 Joshua Bardwell 的 YouTube 频道。我没有看过所有这些视频……我只是从他的频道中挑选了它们。

报价：
http://www.youtube.com/watch?v=FH_m5rI6MKY

http://www.youtube.com/watch?v=hzm6H9WnCgQ

http://www.youtube.com/watch?v=Neqzeh9f-uk

http://www.youtube.com/watch?v=7UNg8fkV6zQ

他还拥有至少 100 个 Blackbox 日志分析视频，在这些视频中他很慷慨地帮助其他人。看看这些，你可以从他回顾人们的镜头并指出事情的过程中学到很多东西。可以这么说，这是一种“艺术”......（并继续提到他并没有真正使用 Black Box 来调音）“ - 来自 Powdermnky007 的回复 b.更多信息：Joshua Bardwells 的 Blackbox 日志视频回复链接：http://www.rcgroups.com/forums/showthread.php?t=2484202

c.但是：“我认为即使没有 Blackbox，你也能得到一首很棒的曲子。

人们没有意识到有两个独立的事物。有费率和 pid。与 PID 相比，我们对费率的感受更为深刻。没有自动调整可以知道你的大脑喜欢什么。
这些速率实际上在我们的大脑中直接被解释为某种棒感。

良好的调谐只会让人感觉更紧，并有助于消除不必要的振荡。但即使有波动，也不意味着感觉会很糟糕。” ——鲍里斯评论

“这和我的经验是一样的。PID 参数是一回事，速率参数是另一回事。以汽车为例。“PID”就像调整发动机，使燃油、空气、正时正确（飞控中的东西）。“速率”就像调整方向盘、踏板、齿轮（像遥控器棒一样直接触摸的东西），以便“感觉”正确。而速率本身的调整对“敏感”程度产生了巨大的影响。飞机的感觉，尤其是对于像我这样的菜鸟来说”- Kuson 评论

d. 电池因素：“不久前，有人把我的 PID 原样复制到他的四轴上，觉得手感很差。我试了他的设置，确实感觉 PID 比预期低了一半。看来他用了近两年的 (Turnigy) Nanotechs 已经完全没劲了。即使我自己的不同电池之间，差异也很大。” ——Boris

另请阅读 [PID 调整指南](PID-Tuning-Guide) [Blackbox 日志记录和使用](/docs/wiki/guides/current/Black-Box-logging-and-usage) 支持页面。

## 为什么我的四轴在撞机后表现异常？

有些人在撞车后经历过不稳定的行为（紧张等），就好像 P 值显着上升一样。

“当你坠毁时，你的陀螺仪可能会变得不安。甚至从 Baseflight 时代起就一直如此。
有些陀螺仪比其他陀螺仪更敏感。
重新校准陀螺仪：“上锁。执行陀螺仪校准（左摇杆向左...右摇杆向下）就可以了。您会看到 LED 闪烁并且会发出蜂鸣声。另外，当将脂肪插入四边形时，_您的四边形不应移动_。” - 鲍里斯评论

如果您在自动调平模式（角度或地平线）下飞行，那么加速度计很容易会感到不安并给出错误的读数。如果振动过度或在快速特技飞行过程中，加速度计也会受到干扰。
除了等待加速度计读数稳定下来之外，您无能为力。如果您运行显示人工地平线的 minimOSD，这一点很容易看出。

## yaw_jump_prevention_limit 如何工作？

“首先，您需要了解多旋翼飞行器上混合器功能的基础知识。
Mixer 获取所有 3 个轴的 PIDsum 并将其转换为电机输出。
显然，那里有一定的可用功率，即每个电机的 max_throttle - min_throttle 范围。
假设它的范围通常为 1000 (2000-1000)。

因此，我们有 4 个电机决定穿越机的行为，所有 3 轴的功率范围为 1000，并按比例缩放到油门。
偏航轴是穿越机上需要大量功率的轴，但也取决于所使用的设置。用于偏航以获得相同旋转速率的功率比大于用于俯仰和滚转的功率之比。
这意味着硬偏航校正可能会使用每个电机中整个可用油门范围的太多，因此横滚和俯仰不会有足够的。而且偏航的工作方式也可以产生很大的推力，在偏航停止期间，穿越机将获得高度以获得所需的偏航校正，从而产生最大的功率。

因此，引入 yaw_jump_prevention_limit 来给出中心棒的偏航 PIDsum 的最大值。这意味着在偏航校正期间，偏航无法使用太多可用电机功率，因此横滚和俯仰不会受到太大影响，并且硬偏航停止也不会产生大量跳跃。

例如，降低 yaw_jump_prevention_limit 将导致在门限幅期间偏航的电机功率减少。

使用摇杆输入时，您仍然可以完全控制偏航。但无论如何，我仍然对你的装备发生跳跃感到惊讶。我想说的是，小而强大的 x 四边形通常不会受到跳跃的影响。” - Boris B

## 我应该如何配置失控保护系统？

FailSafe 是需要在无线电接收机和飞控中配置的东西。
看一下这个概述，它描述了如何完成此操作：http://www.youtube.com/watch?v=dikr9oDzQqc

从 6:20 开始，您可以在此视频中找到一些附加信息：http://www.youtube.com/watch?v=htkw7d97bOo

注意：Betaflight 2.4.0 及以上版本和 CF Configurator 1.2.0 中的失控保护配置已更改。相关文档可以在[此处](/docs/wiki/guides/current/Failsafe)找到。

对于没有失控保护输出（无脉冲）的 RX，这是一个好方法：
[在 FrSky BeeBrain 上设置失控保护](http://fpvobsession.com/setting-up-failsafe-on-frsky-beebrain/)

## 配置 Throttle 端点的最佳实践是什么？

对于 KISS ESC：
只需从 CF 配置电机选项卡中将 max_throttle 设置为 2000，将 min_command 设置为 1000。

Joshua 针对 BLHeli 14.4 及更低版本的方法。
一开始这可能是一个难以理解且令人困惑的概念。描述正确方法的最佳方式是通过以下教程视频。

第 1 部分：http://www.youtube.com/watch?v=WFU3VewGbbA

第 2 部分：http://www.youtube.com/watch?v=YNRl0OTKRGA

有关 BLHeli Max_throttle 校准的新信息。

观看约书亚·巴德韦尔的这些视频
Cleanflight BLHeli 顶端油门校准：https://www.youtube.com/watch?v=spegUYF8Dxk
高端 CleanFlight BLHeli 油门校准的效果：https://www.youtube.com/watch?v=RW2XalNPpQk

新的 BLHeli 固件 v14.5 在校准方面与 14.4 存在一些差异。约书亚 B 建议：
我目前推荐的 BLHeli 14.5 校准程序是 min_command=1000，max_throttle=1980，运行校准。完成。可能不需要顶端校准，因为 BLHeli 14.5 顶部的死区似乎少得多或几乎没有。

使用 max_throttle=1980 是因为如果使用 max_throttle=2000，每个人似乎都会将 2020 作为校准值。因此，使用 1980 的目标是确保您在刻度顶部以下进行校准。

我看到建议的另一种方法是设置 min_command=1000、max_throttle=2000，然后手动使用“电机”选项卡确定每个电机的旋转点和最大转速点，然后手动将这些值设置到 ESC 中。这也是一个很好的方法，但更深入一些。
然后 compudaze 发布：
我有一些 ESC 仍然使用 1980 年达到 2020 年。一直使用 1970 年，因为它没有达到最大值。使用 LB20、RG20、UBAD30、XM20 进行测试。

Joshua Bardwell 发布的新视频，标题为“BLHeli - 100% 解释”。
https://www.youtube.com/watch?v=0Bi1XcdpnQI

## 如何通过 BetaFlight 配置 BLHeli 电调？

如果需要以 1kHz 或更快的速度运行 BLHeli 14.2 或更高版本，请在 BLHeli 配置中禁用 PWM。这是为了确保 BLHeli 固件正确识别 OneShot125 脉冲。

若运行 Betaflight，可直接通过飞控为 BLHeli 电调（仅限具有 BLHeli 引导加载程序的型号）编程和刷写，无需断开信号线或拆机。

作为确定您的 ESC 是否可以通过 BetaFlight 进行刷新的粗略指南：

| 电调 MCU 制造商 | 电调固件 | 引导加载程序类型 | 通过 BetaFlight 进行 Flash |
| --------------- | -------- | ---------------- | -------------------------- |
| 爱特梅尔        | 西蒙·K   | 西蒙·K           | 尼                         |
| 爱特梅尔        | BL 合力  | 西蒙·K           | 尼                         |
| 爱特梅尔        | BL 合力  | BL 合力          | 是                         |
| 西拉布斯        | 西蒙·K   | 西蒙·K           | 尼                         |
| 西拉布斯        | BL 合力  | 西蒙·K           | 尼                         |
| 西拉布斯        | BL 合力  | BL 合力          | 是                         |

一般来说，这一切都取决于电调具有 BLHeli Bootloader，以便可以通过 Betaflight 完成电调的刷新。

请按照本指南了解更多信息：http://www.youtube.com/watch?v=YWLk4qcQcvw

| 请注意：这不适用于以下主板： | 飞控                                                                                                                                                                                       | 失败原因 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| 摩托龙卷风                   | 由于电机输出上的 5v 缓冲器是单向的，不支持双向通信。这些缓冲器使电机输出更加稳定，但防止直通。没有软件可以解决这个问题。唯一的解决办法是重新设计电路板以删除缓冲区或将其更改为双向缓冲区。 |
| Naze32 **第 6 版**           | Naze 从 USB 端口向 ESC 进行反馈。因此，ESC 将通电、查看油门信号、初始化，然后就不会进入编程模式。 Rev6a 自 2015 年 11 月发布以来已修复此问题                                               |

## 为什么我的飞行器在尝试起飞时会翻转？

以下是最常见的原因：

- 电机插入了错误的 FC 接头。
- 自定义组合不正确。
- 电机旋转方向错误。
- 螺旋桨安装在错误的电机上。
- 飞行控制板安装面向错误方向（例如，偏航向左 90 度，但 board_align 尚未配置为反映这一点）。

## 从两刀片切换到三刀片时，PID 会发生显着变化吗？

有些人发现，当从两片刀片转为三片刀片时，他们需要稍微减少 P 增益。
四轴仍可飞行且无其他变化，但有些机架的桨叶尾流振荡会增加。

## 为什么刷写新的 F3 飞控时遇到问题？

一些新的 F3 开发板带有虚拟 COM 端口（VCP），通过 USB 与 PC 或 Mac 通信。下列视频讨论如何刷写带 VCP 的 Lumenier LUX 开发板：
http://www.youtube.com/watch?v=b8fMsazyxDw

在此常见问题解答中，请查看“建议使用哪些飞控来充分利用 BetaFlight”的答案，了解有关哪些 FC 具有 VCP 端口的更多详细信息。

[固件安装](/docs/wiki/getting-started/Firmware-Installation) 有关于 USB 驱动程序等的更多详细信息。

## Betaflight 代码会合并回 Cleanflight 吗？

是的，我们的意图是随着时间的推移，这将逐渐发生。有时 CleanFlight 的功能也会合并到 BetaFlight 中。从 BetaFlight V2.4.0 和 CleanFlight V1.12 开始，这种代码合并（双向）已经开始发生。

#### 3.0.0 发布后发布的问题和鲍里斯的回答：

Ede2016 提出的问题 - 这是否意味着从现在开始 BetaFlight 和 CleanFlight 彼此独立？
我认为这个想法是 BetaFlight 适合所有 Beta 测试者（现在已经很多了），而 CleanFlight 应该适合“普通”飞行员，他们可以等待几个月的更新 - 在他们经过 Beta 测试并稳定之后。
来自 Boris 的 A - 这是该项目的初始范围，但您可以理解这一切都是在空闲时间完成的。维护多个版本确实非常耗时且效率低下……实际上是不可能的。

由于 betaflight 发生了很多变化，想要轻松地合并回来并不是那么容易。 Betaflight 是完全开源的，所有代码都可用于其他开源项目，例如 cleanflight。实际上，有一些开发人员不断地致力于来回合并事物，但即使是那些开发人员，也随着分歧越来越大而苦苦挣扎。

而且 cleanflight 的范围非常广泛，betaflight 主要只关注特技和水平性能。

三个主要的开源分支及其重点：

- Cleanflight（宽焦点区域）
- iNav（自主模式，如 GPS 等）- Betaflight（主要是 Acro 和水平性能）

但他们都一起工作并分享东西。

但你也可以想象，合并事物的其他方面是，你不能简单地告诉用户升级后“你的多旋翼飞行器将完全不同，你必须完全改变你的速率/PID”

## 当我更新到最新版本的 BetaFlight 时，我需要重新校准我的电调吗？

除非您更改了 BetaFlight 中的最小/最大油门值，否则 ESC 不需要重新校准。
有关 ESC 校准的更多信息，请观看此视频：http://www.youtube.com/watch?v=o3Mg-9M0l24

## 当我在没有桨叶的情况下手臂时，为什么我的电机在长凳上不断加速？

未装螺旋桨、在工作台上解锁后，电机开始转动。稍微提高油门再回到最低值后，电机转速会持续升高。它们不会加到最大，但会明显提高。启用加速度计的 Angle/Horizon 模式下，可以理解为四轴正尝试自稳；但在 Acro 模式下，为何油门也会自行改变？我猜是 Air Mode 的效果，想进一步了解原因。

答：这是飞控试图纠正方面的变化，主要是因为当电机旋转时你的穿越机轻微晃动，传感器拾取它，然后飞控试图纠正，但不能，因为你没有打开桨叶。一切都很正常。

补充说明：

最初由 MasterZap 发表 查看帖子
抱歉，这听起来像是对 I 术语如何运作的根本误解。

或者相反，你在替补席上看到的行为正是 I 术语所期望的。

为什么？因为四轴没有运动。没有运动就没有陀螺仪输入；没有陀螺仪输入，就没有正（或负）误差信号加入 I 项。

I 项是可加的。当测量误差时，该误差会添加到 I 中。如果误差持续存在，I 就会增大。如果错误停止，我就会留下来。只有出现负错误时我才会再次缩小。

由于四轴并未飞行，你只给它提供了误差：摇杆要求每秒旋转 x 度，但四轴实际每秒旋转 0 度，所以误差为每秒 x 度，I 项会增长。在空中，四轴开始转动，误差会减小，最终变负并降低 I 项。

所以完全正常。

如果不让“我”术语按照它想要的方式行事，你根本无法对“我”术语的行为做出判断。如果没有桨叶，坐在板凳上，你就会变得毫无意义。

/Z

测试是否存在其他问题的快速方法是使用电机测试页从方程中删除 PID。

## 为什么重启飞控时电机会短暂旋转？

由于闪烁 2.4.0 并在插入电池的情况下从地面站重新启动，电机会短暂旋转。我相当确定 2.1.6 中没有发生这种情况，但不确定 2.3.5 中是否如此。

回答：这种情况可能发生在任何插入电池的固件中。这种情况可能发生率为 100 次或每次。这不是一个错误......这就是 OneShot 的工作原理。 ESC 会将加电和断电期间的小脉冲解释为信号并旋转电机。这确实是一个短脉冲，不会真正伤害任何东西，但仍然可以吓到你！

强烈建议在连接 LiPo 并打开配置 GUI 时始终使用限流器。这样可以防止烧毁电调和电机。请参阅：http://www.rcgroups.com/forums/showthread.php?t=2327875

## 禁用加速度计后触发失控保护，四轴会怎样？

如果没有激活加速计传感器，它就无法进行自动调平，因此它不会自动调平，只会滚落到地面。

建议设置失控保护以在进入第 2 阶段后立即上锁（关闭电机），并在加速度计被禁用时允许飞行器下降。

## 为什么我的飞控在开机时会多次闪烁/发出蜂鸣声？

在固件启动期间，陀螺仪已校准，并应发出三声蜂鸣声/闪烁声。这表明固件已准备就绪。
解锁后，会发出一声蜂鸣声，这是将视频同步到 BB 日志时发出的声音。如果重复发出 2 声蜂鸣声，则表示没有有效的 RX - 这可能是 RX 线路损坏，或者 RX 未绑定到 TX，或者 TX 尚未发送数据。

5 次短闪烁/蜂鸣声后接任意次数的长闪烁/蜂鸣声表示错误代码。
长时间闪烁次数表示以下错误：

1. **_FAILURE_DEVELOPER_**：传感器外部中断初始化失败。
2. **_FAILURE_MISSING_ACC_**：加速度计/陀螺仪传感器丢失
3. **_FAILURE_ACC_INIT_**：加速计/陀螺仪传感器初始化失败
4. **_FAILURE_ACC_INCOMPATIBLE_**：发现的加速度计/陀螺仪传感器不兼容/不是预期的
5. **_FAILURE_INVALID_EEPROM_CONTENTS_**：EEPROM/FLASH 配置内容无效
6. **_FAILURE_FLASH_WRITE_FAILED_**：将配置写入 EEPROM/FLASH 失败
7. **_FAILURE_GYRO_INIT_FAILED_**：SPI MPU6000 加速度计/陀螺仪陀螺仪初始化失败

最常见的错误似乎是错误 2，即找不到加速度计/陀螺仪传感器，这是由传感器损坏或传感器连接不良引起的，也可能是由于严重碰撞而发生。在大多数板上，陀螺仪和加速度计是同一芯片，因此当找不到加速度计时，不可能进行特技飞行，这不仅是加速度计坏了，而且整个芯片也坏了。

错误 3、4 和 7 也可能是由加速度计/陀螺仪传感器损坏引起的。
错误 5 和 6 表示 MCU（主处理器）内存读写问题。
在大多数情况下，如果用户无法重新焊接传感器，则需要新的飞控。

以上是处理器在启动和初始化时检测到的硬故障。 LED 闪烁和/或发出蜂鸣声的其他原因包括：
RX 没有信号。这可能只是 TX 关闭或选择了错误的型号/绑定或 RX 的硬故障（例如没有电源或电缆损坏）。
如果启用 ACC，则加速计不会校准（检查 CLI）。如果启用了 acc，则必须调用一次，并且通常在配置 GUI 中完成。
启用 Acc 时，四轴倾角过大。

## 我的 PID D 增益在 2khz 模式下调谐后值很小，这正常吗？

Betaflight 的最新 2KHz 版本似乎增强了 P 的影响，达到了您可以以良好的 P 增益和很少的 D 飞行的程度。保持较低的 D 增益也是一个很好的做法，这样电机就不会在速度快速变化时变得太热。

## 为什么加速计 Blackbox 痕迹在 2KHz 模式下如此糟糕？

当我的穿越机放在地面上时，1Khz，没有桨叶，电机停止，加速度计轨迹是平滑的 x=0 y=0 z=1。芯片本身只会产生极少量的噪音。
在 2Khz 上，BlackBox 里的数据都是废话，到处都是 X=7G、3G、5G。穿越机静止在地面上，电机不旋转，这是混叠吗？

回答：是的，这确实是您在那里看到的混叠效果。 Acc 与 2khz 无关……它与任何陀螺仪速率相同。我们只是在 2khz 上对其进行欠采样。
如果您使用水平/半自稳模式，那么只需坚持使用 1khz 或获得一些非常快的 F3 目标......即使在更快的速率下也能进行完全采样的加速。

## 如何让 vbat_pid_compensation 系统工作？

```
set vbat_pid_compensation = ON
```

使用完整的 lipo 调整您的四路...然后您的 PID 将缩放至该参考电压。
从满脂到空脂的电压缩放限制为 25%。应该足够了，因为我们通常飞行到 3.3v。

当您有新旧脂肪时也很好。电压降较大的旧型号将自动获得更多 PID 调节。
当电压完全降至 2 节以下时，它也会自行禁用

eL_Verde 的论坛问题：

我试过你的 PID 电压补偿。感觉很好，但我认为对我和我的设置来说，电压低时 25% 以上的增益有点高。我可以将此值修改为 20% 或 15% 吗？
鲍里斯的回答：

电压增益可调

- 最大电压 = 1
- 最小电压（默认 3,3）= 最小调整。甚至超过了 25%！
- 当你提高最小电压时，你会得到更少的补偿
  我还认为 vbat 补偿有助于防止螺旋桨清洗，因为电机在功率下降期间提供更恒定的功率。除了空气效应之外，这些都是螺旋桨清洗出现奇怪振荡的主要原因**注意：** 这需要 FC 上的 VBAT 连接（LiPo 电池组电压）并且启用 VBAT 功能。

## vbat_pid_compensation 从 3S 电池转移到 4S 电池是否存在问题？

不会有问题，电池计数是计算出来的，PID 调整是基于电池电压的。

## 如何才能使 PID 控制器运行速度超过 2kHz？

### ßF V2.5.0 RC6 及更高版本但 V3.0 之前的说明

在配置 GUI 中设置循环时间（微秒）。
现在支持 OneShot42 和 MultiShot

2 个自动配置示例

循环时间 125

- 始终 8khz 陀螺仪采样 (gyro_sync_denom = 1)
- 当只是 oneshot125 时：
- pid_process_denom = 3
- 当 use_oneshot42 或 use_multishot 时
- pid_process_denom = 2

循环时间 250

- 始终 4k 陀螺仪采样 (gyro_sync_denom = 2)
- pid_process_denom = 2
- 在带有 luxfloat 的 f1 板上
- pid_process_denom = 3

等等....

电机更新速度 = pid 速度
电机速度计算：电机更新间隔 us= 125 _ gyro_sync_denom _ pid_process_denom

PID 始终与电机同步！ PID 速度即为您的电机更新速度。陀螺仪可以比 PID 运行得更快。这样做的好处是更高的采样减少了滤波延迟，并有助于捕获所有较高的频率，这些频率在采样不足时可能会折叠成较低的频率。即使 GYRO 的运行速度比 PID 快，它仍然保持同步，但每个 (pid_process_denom) 个样本都是同步的。

### ßF 版本至 2.4.1 的说明

待办事项

- FC 设置？
  要更改刷新率，一种方法是进入 CLI 并更改陀螺仪分母设置。
  对于 2khz (500usec)，将其设置为 = 4
  对于 2.6khz (375usec)，将其设置为 = 3
  对于 4 khz (250usec)，将其设置为 = 2（具体取决于 ESC）
  对于 8 khz (125usec)，将其设置为 1（不推荐）
  或者只需在配置 GUI 中设置循环时间。请注意，仅支持 5 个循环时间：1000、500、375、250 和 125usec。

- 此功能适用于哪些 FC，以及它们运行 PID 控制器/陀螺仪读数的速度有多快？

- 哪些 ESC 以及哪些电机？

并非所有电调都能接受更快的刷新率。这也取决于电机额定电压。由于运行循环时间没有这么快，因此最好读取您正在使用的 ESC 上的 RCG 中的线程，以了解可能的刷新率和电机 kv。

- 以 250usec（4kHz 循环速率）和 OneShot125 运行 Looptime。如何防止最大油门时“无脉冲”。

由于 OneShot125 的最大脉冲宽度为 250usec，如果循环时间也是 250usec，则此功能将不起作用。如果 max_throttle = 2000usec（OneShot 脉冲宽度 = 油门输出/8），FC 绝不会设置逻辑低电平以在脉冲之间留有间隙。解决这个问题的一种方法是将 max_throttle 设置为较低的值，并将 ESC 校准为该值。 Max_throttle = 1850usec 应该可以工作（一个人使用了这个并且它可以工作）。这允许 max_throttle 的脉冲之间有 150/8 = 18.75usec 的间隙。这在论坛帖子中被称为 ESC 的“短校准”。

到目前为止，ßF 尚不支持 OneShot42，但允许 4kHz 刷新率。检查 MultiShot、RaceFlight 和 BLHeli_S 固件。

**重要提示：环路频率越高，启动时的陀螺仪校准越快；连接电池时四轴可能因此发生移动。若陀螺仪校准期间机架移动，可能造成严重后果。请确认 LED 快速闪烁或蜂鸣器鸣叫三次。若怀疑校准期间机架移动，可用摇杆指令手动校准陀螺仪：保持最低油门和偏航，同时横滚和俯仰保持最低。**

## 什么是 OneShot125 OneShot42 和 MultiShot 以及它们与 max_throttle 和 Looptime 有何关系？

待办事项
标准 ESC 校准为 min_command = 1000 和 max_throttle = 2000。
OneShot125 将向 ESC 发送脉冲，该脉冲是标准值 1000 至 2000 或 125 至 250usec 的 1/8。

最初由 HIGHOCTANE32 发表一旦你认真思考循环时间和 ESC 脉冲（无论是 1000-2000us pwm，还是 125-250uS 单次或任何时间（它们是），这一切都变得更有意义。尝试同步每 125us（8khz）甚至 250uS 更新的陀螺仪速率与可能 250uS 长的 ESC 信号脉冲..你可以 Oneshot 42 和 multi shot 进一步缩短了 ESC 信号脉冲，就像 oneshot 125 所做的那样，但甚至更短，因此信号脉冲可以比陀螺仪/PID 更新更快地完成，这不是一个科学的解释，但希望这是有道理的。
但我同意，如果乔什还没有视频，他需要一个

Oscar Liang 的优秀博客网站上有一些关于 MultiShot 技术的信息：
http://blog.oscarliang.net/raceflight-multishot/

## 我如何提出 Betaflight 应用程序增强功能建议？

1. 在 GitHub 上，打开 Betaflight 应用程序存储库。
2. 单击“问题”并首先搜索现有请求。
3. 如果没有匹配，请使用功能请求模板打开一个新问题，并提供清晰、简洁的摘要。
4. 描述增强功能、用户利益以及任何屏幕截图/模型。

## 如何降低飞行器开机时产生魔烟的几率？

如果您有万用表，请首先使用万用表进行连续性检查。快速测试配电板上的负极和正极焊盘之间的短路可以避免很多麻烦。

但在将锂聚合物电池连接到工作台上并测试新设置时，请务必使用限流器。这为很多人节省了一些电调和电机。构建并使用带有串联开关的限制器，以便轻松打开/关闭电源。
http://www.rcgroups.com/forums/showthread.php?t=2327875

## 为什么我们有 RC 速率和偏航、俯仰、横滚速率？

更深层的问题是，RC Rate、Pitch/Roll/Yaw Rate 和 Expo 常被混淆。P/R/Y Rate 是四轴的旋转速度，Expo 的概念也较直观；但 RC Rate 究竟是什么？有人说它与 P/R/Y Rate 作用相同，有人说不同，也有人称其为摇杆灵敏度。摇杆灵敏度又是什么，是否等同于 Expo？

答：可以将其视为 RC Rate 的微调。它做同样的事情，只是增量更小，并将轴分开。

有些人将 RC 速率设置为 1.0 并调整 P/R/Y 速率，直到四边形处理他们喜欢的方式（翻转/滚动的速度等）。设置完成后，应增加 Expo 值，以降低靠近中心位置的摇杆的灵敏度。这将带来更流畅的飞行体验，并且当操纵杆远离中心时能够执行快速滚动等。这是目前最好的方法。

## 为什么防止电机抖动很重要？

两个原因：

- 电机停止启动，这会产生热量并可能损坏/磨损组件。
- 如上所述，您的电机停止启动，它没有提供应有的推力，您的穿越机会摇晃/振荡/崩溃，并且通常无法飞行。请参阅“深入探讨”页面以获取更深入的解释。

## 为什么当我使用 CLI 更改某些内容时板会崩溃？

如果 FC 使用 STM32 的 VCP，则在离开 CLI 时，配置 GUI 会执行“保存”操作，从而重新启动 FC。然后 Windows 不会重新建立 USB。检查设备管理器以查看端口是否已恢复。如果没有，解决方法是断开 USB 并重新连接。在某些 PC/FC 上，此功能不起作用，因此请将 USB 插入 PC 上的其他 USB 端口。我将两根 USB 电缆插入供电 USB 集线器，只需将 USB 电缆交换到 FC，端口就会返回到设备管理器中，并且配置 GUI 现在可以看到端口。
这不是 FC 或固件问题，而是 Windows USB 问题。

## MW23 PID 控制器可以在默认 PIDS 上工作吗？

不！尽管 Boris 认为这是现在最好的飞行 PID 控制器，但它不会像 Rewrite 和 Lux 那样在默认 PID 上正确飞行。您需要像过去那样手动调整。
用 BorisB 在 Regroups 中的话来说“伙计们，我读了很多关于 MW23 pid 控制器的默认默认值的评论。我会再说一遍......MW23 没有默认值。默认值实际上是为重写而设置的。不可能同时具有默认值......重写和 MW23。
你真的必须自己调整那个。”

报告显示默认 PIDS 太高。首次解锁时要小心，因为可能会出现严重的振荡。

关键要点是：

- P 增益需要小于 MWREWRITE
- 偏航率需要低于 MWREWRITE
- 横滚和俯仰速率需要高于 MWREWRITE

**最初由鲍里斯·B 发表**

看来 D 还是蛮宽容的。我将其缩放到最初不存在的循环时间。

我第一次开始测试较低的循环时间是为了获得所需的较低 I 和 D。现在它被标准化为循环时间 ~2000，以给出接近原始 multiwii 的值。

但 iterm 更具侵略性。它甚至会引起振荡，这最终使 Iterm 调整变得更容易。

这些是我的 PID。虽然没有完全调整，因为我更关注固件测试：
卷 3.0 0.025 22
螺距 3.5 0.035 35
偏航 5.8 0.045 0
RC 率 1.0
费率 0.7 0.8 0.8
RC Expo 0.2
RC Yaw Expo 0.3

级别（我并没有真正飞行级别，但必须测试它，因为级别也有 I 和 D）：
级别 P 9.0 I 0.005 D 0

另外：
起始价格约为 0.7
偏航率 0.8
RC 速率 1
RC Yaw Expo 0.3
RC Expo 0.3

角度和半自稳模式仍需要一些改进

不要忘记遵循以下好方法来调整您的多旋翼：
http://github.com/borisbstyle/betaflight/wiki/PID-Tuning-Guide

## 每次升级时如何保留并恢复 Betaflight 设置？

首先，需要注意的是，从以前的 Betaflight 版本上传**完整**设置转储可能会导致你的飞机无法正常飞行，根本无法飞行，甚至损坏组件。

还值得注意的是，刷新 Betaflight 的方法**可能**依赖于 FC 板。所以最好参考你正在使用的 FC 板上的线程。常见问题解答中的讨论区列表包含指向这些主题的链接。
更新中的任何问题/差异通常都列在必须阅读的发行说明中。

话虽如此，以下视频中介绍了一种值得考虑的确保您的设置从一个 Betaflight 版本迁移到另一个版本的方法：

http://www.youtube.com/watch?v=HsxTqp76Brs
http://www.youtube.com/watch?v=F1sjC5l0ywM

总而言之，该视频的主要要点是：

- 保留一个单独的自定义配置文件，其中仅包含您为了获得所需的正确飞行体验而投入时间的设置（PID、速率、AUX 开关设置等）。
- 将 FC 升级到所需的 Betaflight 版本，然后上传您的自定义配置文件。
- 确保自定义配置文件在调整期间和调整后具有最新的 PID 和速率值。这样，如果您更改了固件版本并需要返回，您可以比较调音和/或恢复调音。

以下工具可用于比较配置文件：

1. Notepad++ 及 Compare 插件
1. https://www.diffchecker.com/

## 什么是 yaw_jump_prevention_limit 以及它有什么作用？

约书亚·巴德韦尔

偏航摇杆居中时，`yaw_jump_prevention_limit` 会限制偏航 P 项的上限。大幅偏航后突然松杆时，偏航控制力有限，四轴无法按预期迅速响应，误差和 P 项都会增大；在偏航动作结束时，电机可能剧烈喘振。降低 `yaw_jump_prevention_limit` 会柔化偏航停止，但可防止电机喘振和四轴跳动。提高该值会令停止更利落，但偏航控制力不足时也会引起电机喘振。若高性能四轴有强大的偏航控制力且希望偏航动作更快停止，可设为 500（禁用限制）。此设置只影响偏航动作末端，因为仅在摇杆居中时生效。

Adam Pyschny 补充：过低的 `yaw_jump_prevention_limit` 会限制偏航 P 项，可能不足以避免四轴在高速纯横滚转弯中突然爆冲。

## `yaw_iterm_reset_degrees` 是什么，有什么作用？

约书亚·巴德韦尔

`yaw_iterm_reset_degrees` 决定 I 项重置为零并保持为零的角速度阈值，单位是度/秒，范围为 25 至 1000。在翻转、横滚等激烈动作中，I 项可能积累误差；动作结束时，I 项尝试消除误差会造成反弹或过冲，而不是干净地停止。旋转速率超过阈值时，该参数会使 I 项归零。因为翻转或横滚时，并不需要修正该轴的持续偏差，只需使动作接近目标角速度。

## Super Expo 如何工作？

来自鲍里斯 B

Super Expo 与 Acro Plus 类似，但 Acro Plus 在 PID 控制器外增加角速度，PID 会与之对抗，手感不够自然。Super Expo 则直接调整 PID 控制器，从而实现 Expo 效果。

它会在大摇杆量下加速 P 项、小摇杆量下减速 P 项，通常能让特技动作更干净、对 D 项的需求更低。若按中位摇杆调好四轴，中位手感几乎不变，甚至略软；但打满摇杆会加速。它类似 MultiWii 的实现，同时保留 MultiWii 缺少的快速中位摇杆响应。

除此之外，betaflight 2.6 允许更高的 D，且没有噪音，因此您无论如何都可以更轻松地获得平滑效果。

约书亚·巴德韦尔的另一个解释

super_expo_factor 的工作原理如下。通常，PID 控制器的工作方式是操纵杆位置命令一定的角速率，然后使用实际角速率与目标角速率之间的差来计算误差值。 P 项与误差值成正比。 P 项越大，电机的输出就越强，以实现所命令的角速率变化。明白了吗？
但对于 super expo，它的工作原理是，你的摇杆偏转得越多，P 项就与摇杆位置成正比，而不是与误差值成正比。因此，当您偏转操纵杆时，PID 控制器会说：“我不在乎当前的角速率是多少，或者误差是什么，只要用力推动即可。”
打个比方：通常开车时会关注目标速度，例如 55 mph；快了就松油门，慢了就加油门，这就是 PID 控制器。Super Expo 更像是说：“不管当前速度，保持 75% 油门。”

与 I 项重置一样，极端特技动作时不必精确达到例如 1234 度/秒的角速度；只要四轴的行为可预测，让它略微“放开”地旋转反而更好。观察翻转或横滚的 Blackbox，P 项常会多次改变符号，在 0.2 秒内不断试图减速、加速、再减速，这并不理想。

鲍里斯评论：
关于 iterm Reset 只是一件事。
在 Super Expo 模式下，横滚和俯仰超过特定度/秒（默认 200）时，I 项也会重置。
这确实必要，因为 Super Expo 会给 P 项增加一些加速，I 项会以为 P 项工作不足而开始更多地累积。
iterm 在低于阈值速率时再次变得活跃，并及时恢复到正常水平，而您不会注意到任何情况。
在更快的特技动作中移除 iterm 可提供更紧密的联系感，因为 Iterm 的所有粘性都被移除。

视频讲解：
https://www.youtube.com/watch?v=HGAa8J1Ihac

## Rate 与俯仰、横滚和偏航的度/秒有什么关系？

MadmanK 编写了一个电子表格，向您展示 Rewrite 和 Luxfloat 中的俯仰、横滚和偏航速率，以显示它与每秒度数的速率之间的关系。
只需更改灰色框中的值，就会调整图表和表格。

[重写/勒克斯率](https://dl.dropboxusercontent.com/u/31537757/Betaflight%20Rates%20v1_4.xlsx)

## 目前哪些飞控使用 SPI？

截至 2016 年 10 月 11 日
Hummingbird Racing
Lux Racing
MotoLab Cyclone 和 Tempest
SPRACINGF3EVO
DOGE
CC3D（虽然这是 F1 板......重写时比 i2c F3 板稍好一些）
AlienFlight F3 V2、F4
XRacer F303（仅限 v3.1，之前版本使用 I2C）

注意：市场上还有更多新的 FC。检查卖家的规格。

## 应下载并刷写哪个 HEX 目标到飞控？

Cloud Builds 现已可供所有用户使用。可自行编译固件，也可使用 Cloud Builds 简化流程。

## 如何设置反向螺旋桨转向？

只需在电调管理工具中反转螺旋桨和电机转向。随后在 CLI 中输入：`set yaw_motors_reversed = ON`，然后 `save`。重启飞控以确保设置生效。

## 建议用什么 FC 和电调配置运行 8 kHz？4/4、4/4/32 或 8/8 又代表什么？

第一个数字是陀螺仪频率（由循环时间设定：1000 = 1 kHz、500 = 2 kHz、250 = 4 kHz、125 = 8 kHz）。

第二个数字是 PID 计算频率，由循环时间确定：`pid denom 1` = 与陀螺仪相同频率，`pid denom 2` = 陀螺仪频率的一半，依此类推。

第三个数字是电调更新率；若没有第三个数字，则与 PID 计算频率相同（同步）。

在 BF v2.7.0 中，需要：

set unsynced_fast_pwm=ON
set fast_pwm_protocol = MULTISHOT
set motor_pwm_rate = 32000

使用新版 BF Configurator 1.6.4，可在“Configuration”选项卡的“ESC/Motor Features”中进行上述更改；CLI 命令仍然可用。

OneShot125 最高 4 kHz（125 至 250 μs）
OneShot42 最高 12 kHz（42 至 84 μs）
MultiShot 最高 32 kHz（5 至 25 μs）

一般来说，取决于 pidc、使用的串行端口、Rx aux 通道的数量等。在以下大多数情况下 acc 被禁用。
F1 大多运行在 2.6K - 2K 之间，如果你买一个 9 美元的 cc3d，它们运行 4K/4K，ccd3d-F3 运行 8K/8K。
F3 主要运行 4K/2K，但可以运行 lux pidc 并且具有更多串行端口。
带 spi 陀螺仪（LUX 等）的 F3 可以运行 8K/8K。
Raceflight 上的 F4（revo/etc）可以运行 8K/8K，如果使用 6500 或 9250 陀螺仪（sparky2/etc），它们现在才开始运行 32K/32K/32K。

这些 FC 都可使电调以最高 32 kHz 的更新率运行，而无需额外代价。始终用 CLI 的 `status` 检查 CPU 使用率；BF 上建议维持在 30% 以下，部分配置可承受更高负载。

## PID 整定在不同的 PIDC 速率下有什么不同吗？

#### 来自鲍里斯（2016 年 7 月 31 日）

但事情是这样的。之前有过讨论，关于 P 是否需要在更高的循环时间上重新调整。例如，有些人声称感受到了 1k 与 8k 的差异，并声称需要重新调整。那些感觉是安慰剂吗？
答案还不是结论性的，但从我的测试来看，似乎存在可以解释的差异。

例如，我们已经看到 1k 到 8k 之间的响应有所改善。正是您所期望的 800-1000us 左右的差异。当然，更快的 PID 循环意味着更快地看到旋转变化。
这如何转化为不同的感觉甚至曲调？
我惊讶地发现 8k 测试显示设定点时间比 1k 测试稍慢，而加速时间几乎相同。我确实感觉 8k 上的四边形更加宽松。
这可以通过以下方式进行解释。由于 PID 控制器更快，PID 控制器可以更快地看到达到设定值，并且会稍微提前开始“减速”。这正是 1k 上设定点时间更快的原因。这是好是坏？
嗯，是的，8k 可以更早地开始减速，这是一个优势，因此您可以像 1k 那样以更少的超调来增加 P 更多。
只是想指出一些 P 稍高的人毕竟不是疯子。

但这些差异仍然非常微小，与相同 PID 控制器速度的不同螺旋桨或电机相比仍然算不了什么。接下来的测试将是同步与不同步以及 32k，因为有些人想知道这一点以及 blheli 测试。我认为从我所看到的情况来看，我可以期待同步获胜，但让我们等待结果。

## bF 版本中的 PIDC Iterm 有什么区别？

通过 ctzsnooze：
任何慢速后仰类型的事情都与 iTerm 相关。向后倾斜意味着仅靠 P 无法保持 FFF 中的预期角度，而 iTerm 则不断累积以试图达到该角度。当降低油门时，对 iTerm 数量的需求会发生变化，并且 iTerm 需要很短的时间才能回落。从这个意义上说，这是 P 不够，或者 I 太多的症状。

然而，在某些情况下，ITerm 积累是不可避免的，挑战在于如何最好地应对它。

在 2.6 中引入了代码，一旦陀螺仪指示一定程度的旋转，将 iTerm 设置为零。直到陀螺仪速率回落到阈值以下，ITerm 才再次开始累积。这控制了过多的 iTerm 增益，但在返回超过阈值时导致了音高的微小但不想要的阶跃变化。

在 2.7 中，此更改为不重置为零，而是保持超过阈值时 iTerm 的值。这在恢复正常时也导致了类似的问题，因为它突然改变了新需要的 iTerm 值。
Boris：2.6 和 2.7 中并非如此。实际上仍有与 2.6 类似的 I 项重置，但只在 Super Expo 模式或通过 CLI 强制时发生，并非正常默认行为。

2.8 有代码，滚动率越高，iTerm 累积就越少，但绝不会任意将其削减为零。如果阈值降低，高滚动率事件对 iTerm 的影响较小，但 iTerm 在低滚动率时段（例如 FFF）仍能正常工作。

我能否建议有这个问题的人首先尝试更多的 P，如果可能的话，但如果更多的 P 不理想，也许可以尝试将 iTerm 忽略阈值降低到 50 甚至 25。这具有在高滚动事件期间减少 iTerm 的效果，并且可能会改善情况，而不会降低 iTerm 保持四边形稳定的能力。如果降低阈值意味着整体 I 水平不足，请尝试同时增加 I。

为了找到最佳值，这些参数可能会有很大变化。但最好的解决方案是使用一个四边形，其中 P 足以独自获得您想要的角度。

## 如何使用板载数据闪存设置 Blackbox 记录速率？

使用板载数据闪存设置 Blackbox 记录速率时要小心。
当在板的边缘运行时（例如 sp3 板上的 4khz/4khz/4khz），存在过高速率（例如 1/1，甚至 1/2）超出 CPU 的风险。
您需要在没有桨叶的情况下进行地面测试并检查 cpu 使用情况，因此只需 ARM，激活 blackbox，然后通过 cli 命令检查状态即可。
保持一个安全值并为 CPU 使用留出一些空间。
对于 4khz/4khz/4khz 的 sp3 板来说，1/4 应该是正确的值。

## 如何设置费率和 SuperExpo？

- 首先查看 2.8.1 发行说明中的费率计算器，并观看 ßF 2.8 上 Joshia 的视频

最初由 Boris B 发表 查看帖子
我已经在这个帖子中解释过很多次了。
RC 速率 / RC 偏航速率 = 中杆感觉
费率=远杆手感
RC expo / yaw expo 实际上根本没有必要。
调整到感觉良好为止。

#### 鲍里斯：

我不是已经解释过 3 次了，他只需要输入一个命令来禁用该功能，并且老式的线性速率在 0 到 2000 度/秒之间
每个人都有不同的选择和不同的风格。没有任何假设。

注意：Super Expo 使用浮点数学，启用后会使用更多的 CPU 周期。这意味着在具有 IIC 陀螺仪目标的 F1 和 F3 上，循环时间可能需要减少。
鲍里斯表示：不只是 Super Expo。
只需降低 F1 板上的循环时间即可。 4k 并不能让它飞得更好。

#### compudaze 的方法：我在 2.8 中先调整 Rate，使 2000 μs 的度/秒与 2.7 Super Expo 匹配；再调 RC Rate，使 1750 μs 的度/秒与 2.7 Super Expo 匹配。但这并不简单，需要不断查看数值才能精确匹配。只需记住：Rate 主要影响端点摇杆，RC Rate 主要影响中位摇杆。

#### 鲍里斯的更多内容：

这些步骤实际上取决于所选的 rc 速率。较小的 rc 速率 = 较小的速率步长。

除此之外，你真的感觉到 20-50 度/秒的差异那么大吗？

其实你问的一切都在那里。
增加 RC Rate 加 RC Expo 会保留最高 Rate，只改变曲线形状。
最重要的是，还有一些费率可以作为超级费率，您可以在其中调整中棒和最高费率。
我更喜欢最后一张。最重要的是中棍。这就是您主要调整/配置和使用的内容。最高费率并不是“常规”飞行场景。

地面站是目前的限制，因为它并不完全清楚。
最终，Betaflight App 或下一版 Cleanflight Configurator 中每个轴都会有 3 个参数：RC Rate、Super Rate 和 RC Expo，从而覆盖所有调参场景。

快速总结：
Rc 速率：速率线性增加
RC Expo：向现有 Rate 添加 Expo 曲线。
(sexpo) 速率：在中杆上保持与现在相同的线性度，但弯曲极端值。

旧费率：
rc 速率和速率 = 相等....bot 线性。这有多令人困惑？

#### RC Slater 的另一个解释：

每个人都应该将所有带有“Expo”一词的内容设置为 0。我知道默认情况下它设置为 0.10，但鲍里斯本人表示这是不必要的，您应该将其删除。

注意：若禁用 `superexpo_rates` 以恢复旧式线性控制，仍可能需要使用 Expo 参数改变曲线。除此以外，使用 Super Expo Rate 时应把所有 Expo 保持为 0（默认启用 Super Expo）。

使用 superexpo_rates，极限或全杆偏转时的旋转速率由俯仰速率、滚转速率、偏航速率控制。如果您希望最大翻转/滚动速率更快，请相应地调整它们。

如果你想调整你的飞行器对小修正的敏感度（围绕中杆），那么只需调整 RC 速率即可。请注意，偏航有其自己的 RC 速率，因为我们有时想要将偏航上的中摇杆感觉与俯仰和滚转分开调整。

示例：
股票价格为：
俯仰、横滚和偏航率 = .7
RC 率 = 1.0
RC 速率偏航 = 1.0

我决定要大致保持最大旋转速率相同，但使中杆在所有轴（包括偏航）上更加敏感

俯仰、横滚和偏航率 = .7
RC 率 = 1.10
RC 偏航率 = 1.10

现在，我喜欢中摇杆在俯仰和横滚方面的灵敏度，但希望在偏航方面有更多的灵敏度。所以...

俯仰、横滚和偏航率 = .7
RC 率 = 1.10
RC 速率偏航 = 1.20

现在我只想增加最大俯仰和滚转速率，但保留偏航，我所有的中摇杆感觉都一样：

俯仰率 = .8
滚转率 = .8
偏航率 = .7
RC 率 = 1.10
RC 速率偏航 = 1.20
RC Slater 现已上线 发送私信给 RC Slater 查找 RC Slater 的更多帖子

约书亚·巴德韦尔的视频：
https://www.youtube.com/watch?v=cttFDHkec0c

## 不同 Rate 和 Expo 的原理是什么？

感谢约书亚巴德韦尔撰写本文。

让我们来上一点历史课吧。

曾经有 MultiWii。MultiWii 只有 RC Rate 和 Expo：RC Rate 设定摇杆行程对应的旋转速度，Expo 调整中位柔和度与打满摇杆时的速度关系。

对新一代高机动 LOS 飞手（Warthox）而言，MultiWii 在满摇杆时的旋转速度不够快，因此增加了 Pitch/Roll Rate。MW2.3 PID 控制器中，随着摇杆偏转增大，P/R Rate 会放宽 PID，让四轴转得更快。因此 P/R Rate 有点像叠加在常规 RC Rate 和 Expo 之上的 Super Expo，其作用是提高极端摇杆偏转时的最大旋转速率。

后来 Cleanflight 有多个 PID 控制器。它保留 MW2.3，因而有 RC Rate、P/R Rate 和 Expo；但 Luxfloat 和 Rewrite 没有类似 Super Expo 的效果，仅使用带 Expo 的线性 Rate 曲线。对于这两个控制器，P/R Rate 基本直接加到 RC Rate 上。实际效果并非完全线性，因为 P/R Rate 和 RC Rate 的比例因子不同，添加 0.5 P/R Rate 不会产生与添加 0.5 RC Rate 相同的度/秒。关键是：在 Luxfloat 和 Rewrite 中，P/R Rate 没有特殊的 Super Expo 效果，只是线性提高 Rate 曲线，然后再应用 Expo 曲线。

之后转向 Betaflight。Boris 的关注点变化期间，Betaflight 持续调整 PID 控制器；Luxfloat 曾是他的首选，随后是 Rewrite。最终，Boris 发现 MW2.3 的 Super Expo 效果在部分场景确实不错，于是在 Betaflight 实现 Super Expo。

此时 Betaflight App 参数出现了一些不一致的情况。如果你使用的是 feature super-expo，那么 P/R 速率参数就像 MW2.3 中一样，全棒速率大幅增加。如果您没有使用 feature super-expo，那么 P/R 参数的工作方式就像 Luxfloat 和 Rewrite 中一样，速率呈线性增加。当然，这一切仍然与原始的 Expo 功能交互。

可以看出，这种安排既令人困惑，又没有必要。如果您想要线性速率函数，则不需要两个参数（RC 和 P/R）。您只需使用 RC 和 Expo 即可完成。 RC 和 P/R 都会影响线性速率函数的唯一原因是因为 Cleanflight 有多个 PID 控制器，其中一些（Luxfloat 和 Rewrite）具有线性速率函数，而其他（MW2.3）具有超指数函数。但在 Betaflight 3.0 中，MW2.3 PID 控制器现已消失，因此无需重复、相互冲突的 P/R 速率函数定义。

因此，Betaflight 3.0 RC12 的 Rate 体系是对上述历史问题的最终整理：不再有单独的“Super Expo”功能，只保留三个参数。

1. RC 速率影响线性速率乘数。速率“曲线”是一条直线，线的斜率由 RC 速率决定。 RC 率使基线更陡。

2. Expo 对 Rate 曲线应用三次函数（标准 Expo 曲线）。
   Expo 降低中位摇杆响应，改变曲线形状，但不影响端点。

3. P/R Rate（现称 S.Rate）实现与 MW2.3 类似的 Super Expo 效果，尽管其内部实现已有很大变化。
   S.Rate 保留中位摇杆特性，同时使端点曲线更陡。

您可以使用 expo 和 s.rates 获得或多或少相同的曲线，这仅取决于您是否愿意首先考虑调整中心杆，然后从那里推出全偏转率，或者您是否愿意考虑调整全偏转率，然后从那里软化中心杆。

## 如何解决偏航抽搐或油门中部振荡问题？

#### 问题和解决方法的简短概述：

- 使用的任何陀螺仪芯片都可能发生陀螺仪问题。如果您在任何轴上看到偏航抽搐或过多噪音（Blackbox 日志是查看这些情况的明确方法），请首先尝试正确安装 FC。
- 必须正确软安装 FC，确保 FC 板及其陀螺仪不会在安装处直接受振。
- 现代电调（主动制动）和高功率电机会向电气系统引入大量噪声。增加大容量（常见约 1000 uF）低 ESR 电容，有助于避免噪声进入 FC 的陀螺仪芯片，同时能改善视频清晰度并防止高压尖峰损坏其他电子设备。
- 没有一种方案适用于所有四轴。每台机架结构不同，需尝试不同解决方法；有些只需增加大电容，有些只需软安装 FC，有些两者都要。

- 有一个新的[软安装和降噪](Soft-Mounting-and-Noise-Reduction)支持页面。有关软安装的详细信息将移至此新页面，因此请回来查看。

以下内容摘自有关此问题的观察、理论、讨论和建议解决方案的帖子。通读所有讨论并点击链接以了解有关该问题和解决方案的几乎所有内容。

##### 第一份问题报告：

许多人在油门中间会出现偏航抽搐或振荡，而许多人则不会。所有出现此问题的设备似乎都运行使用 MPU6500 陀螺仪芯片（Naze32 rev6、LUX 等）和较新电机的 FC。 Boris B 的 6500 陀螺仪并没有出现这个问题，直到他升级到更新、更强的电机。许多人通过软安装 FC 板解决了这个问题，但这并不是在所有情况下都有效。

链接到包含 MPU9250 陀螺仪数据的线程：
http://www.rcgroups.com/forums/showthread.php?t=2718308#post35460394

许多讨论和实验表明，这是机械和电气噪声进入陀螺仪并影响偏航的问题。以下是一些讨论。

#### 鲍里斯的帖子

无论如何，我想与你分享一些东西。正如大家所知，我已经在几架穿越机上使用 MPU6500 飞行一段时间了，没有出现任何重大问题。我知道这些比较敏感，但并没有真正打扰我。我从来没有像有些人那样出现过任何抽搐和问题……直到本周！
那么发生了什么。直到最近，我几乎所有的设置都使用我值得信赖的 CM2204 2300kv 眼镜蛇飞行。自从我换成 5S 以来，我发现这些电机不适合该功率，所以我开始寻找新的替代电机。这正是问题开始的地方。
更换电机后，我的两台 MPU6500 四轴，甚至 DOGE FC，都完全失控，无法调好且抽动严重，正是过去报告过的问题。我不得不把四轴调得很钝，以掩盖振动和抽动。
比我用旋风分离器（mpu6000）板和吊杆交换它们......双倍高 PID 和光滑并锁定为黄油。

没有消息。但第一次独自经历这些问题真的很有趣。

#### 最初由 Cheredanine 发表

有趣的是这件事发生在所有三个 FC 上，
假设您没有尝试软安装，您使用什么电机？

#### 最初由 鲍里斯 发表

其中 2 个是软安装的，而我的 DOGE 则不是。我正在尝试的新眼镜蛇电机在工作台上绝对平稳。但不知何故，在一定的转速下，陀螺仪会发疯。很想更好地理解这一点。只是随机偏航抽搐等，就像我们多次在这些陀螺仪上看到的报道一样。
将旋风分离器放在上面完全相同的四边形上之后，其他一切都像在长凳上一样绝对平滑。哦，是的，旋风分离器是硬装的！
实际上我什至尝试了两种不同的电机。 Cobra Champion 系列 2205 2300kv 和 Brotherhobby 2205 2300 kv。电机肯定没有任何问题。只是某种谐振频率扰乱了 MPU6500。是的，我在旧的 CM2204 和 CM2206 电机之间来回切换，它们始终都很平稳。

#### 最初由 prokreat 发表

我的钱花在了 6500 上更强的磁铁上。

#### 最初由 鲍里斯 发表

看起来确实是这样的！电机质量越好，似乎对其影响越大。我真的想知道这是否与电噪声有关，而不是与振动噪声有关。

可能是由于 mpu6500 的系数较小，缺少了一些关键的电源滤波电路。
我知道几年前，由于手机制造商的持续巨大需求，InvenSense 面临着生产更小外形尺寸陀螺仪的压力。

#### 最初由 waltr 发表

不久前，在此线程中对这个抽搐问题和添加低 ESR 上限进行了非常简短的讨论。这里的理论是，来自电机/ESC 的噪声尖峰干扰了陀螺仪读数。

我们知道软安装有很大帮助，但是为 ESC 电源添加上限又如何呢？
既然您已经有导致此问题的设置，也许这对您来说尝试 Boris 会有好处

另一个可能是在 MPU6500 电源/接地引脚上添加良好的电容。从我在原理图和 PCB 布局上看到的情况来看，这些去耦电容在许多 FC 板上似乎没有正确设计。
它们看起来并不重要，但实际上对于现代电子设备的运行非常重要。
这可能不是 MPU6500 芯片的直接问题，而是原理图和 PCB 布局设计没有正确完成。

#### 最初由 joshuabardwell 发表

我不想这么说，因为我知道有好的产品供应商有 6500 或 9250，但我个人不会建议任何人购买带有 6500 或 9250 的 FC，因为是否会遇到这些问题只是一个赌注。许多人乘坐飞机完全没有问题。许多遇到问题的人都能够软安装并修复它们。但有些人遇到了问题，根本无法解决它们，这似乎是一个没有人应该抓住的机会，在一个有非常好的 FC 使用 6000 或 6050 的世界里。如果有一个您绝对喜欢的“故障”FC，例如因为内置 PDB 的 DTFc，或者因为它的应答器和内置 SD 读卡器的 SP3 Evo，那么购买它时要知道您可能会不走运并有故障你无法修复。但如果您只是在寻找 FC，并且对任何主板都没有特别的喜爱，那么绝对只购买带有 6000 或 6050 芯片的主板。

#### 来自 QuadMcFly 的帖子

为了插话 6500/9250 问题，这里似乎发生了一些事情。正如鲍里斯提到的，这里似乎存在电噪声问题，使事情变得更加复杂。 MPU 6500 对 3.3v 电源线上的电压波动极其敏感，这会提高 IMU 的本底噪声。额外的电源滤波肯定有助于解决这个问题。

### 案例：

#### 最初由 Gunadeau 发表

也许我的故事可以帮助一些人。我在偏航轴上遇到了非常严重的抽搐问题。这是无法调节的。我尝试软安装 FC，它有所帮助，但并不完美。真正解决我的问题的是在 PDB 的电池连接器处放置一个 1000uf 电容器 35v 105 度。
我的陀螺仪现在非常干净，而且飞得非常好。

设置：
ZMX v2 2300kv
艾康 blheli_s
Xracer v2.2 多重同步 4/4

#### 电容器上的 RCG 螺纹

http://www.rcgroups.com/forums/showthread.php?t=2657808

#### 切雷达宁发表

如果您在电池连接上使用，一般建议是低 ESR 1000uf，额定电压为 35V，如果您在每个 ESC 上盖上盖子，则可以使用较低规格

软安装可以通过多种方式完成，传统上硬安装意味着尼龙支架
对于软安装，可以在支座上使用橡胶或硅 O 形圈
或者可以使用橡胶隔振支架
或者双面粘泡棉

#### ctzsnooze 发表的文章（2016 年 7 月 30 日）

这是我对陀螺仪问题的想法。

主要陀螺仪问题的特征是陀螺仪数据仅在一个轴上出现异常，无法通过其他方式解释。

最初的描述是仅在 6500 陀螺仪上出现偏航突然发生的急加速、抽搐和尖峰。它们的上升和下降速度如此之快，以至于无法由电机产生。电机和 PID 对称且正常地响应这些尖峰，表明它们不是原因。通常，峰值仅发生在非常窄的油门范围内，例如 100 个油门点内。毫无疑问，这来自陀螺仪。

虽然这些抽搐在偏航轴上更为常见，但我见过纯粹在俯仰轴上出现孤立陀螺仪抽搐的日志，有一次用户更换了电机，俯仰轴尖峰停止了，但随后它们转到了滚转轴！6000 / 6050 陀螺仪存在一个单独的问题，它们在某些节流点处会出现大幅单轴共振振荡 - 纯偏航振荡，其他轴上根本没有任何振荡。

我的穿越机就遇到过这种情况，它完美地飞行了很长一段时间，然后突然由于失控的偏航振荡而变得无法飞行。

让我怀疑陀螺仪的振荡仅在偏航轴上，绝对巨大，其频率与穿越机的基本噪声非常不同，不可能是偏航 P 反馈，因为即使偏航 P 设置为零，它仍然存在，尽管更换了 ESC 和电机，但没有变得更好，在电机选项卡中的测试中不存在，并且通过更换板上的陀螺仪芯片来修复。

在那之前，我永远不会相信陀螺仪芯片会导致类似振荡的问题，但现在我确信它们可以，而且这已经被几个人和我报告过。

我不知道这样的事情是否会发生在所有轴上，而不仅仅是偏航轴上，在某些油门点上。到目前为止，我想我一直认为所有轴上油门中间的一些噪音只是陀螺仪拾取框架振动以及相关的 PID 响应叠加，使它们比其他情况下更糟糕。

我从未考虑过固有陀螺仪问题可能会加剧油门中部抖动的可能性。

我在“电机”选项卡中进行了大量手持式测试，大多数框架确实会在油门中间晃动。普通陀螺仪会检测到油门中部框架抖动，PID 系统会尝试修复它。

但是我们如何知道 Blackbox 中的油门中部振荡是否只是陀螺仪检测到并由 PID 控制器调制的实际帧抖动，或者陀螺仪本身是否有某种共振和振荡的倾向，从而放大或夸大这些东西？

一种可能的方法是首先找出框架本身存在多少晃动。使用电机选项卡和手持（小心），您可以感觉到桨叶和电机在某些油门点对框架的作用。然后您就知道陀螺仪和 PID 未激活时会得到什么。

然后，您可以在陀螺仪和 PID 处于活动状态的情况下使用 Tx 加速。如果感觉相同，则陀螺仪或 PID 不会使您的晃动变得更严重。如果情况看起来更糟，则在所有轴上将 P 和 D 设置为 1 的情况下重复测试将删除 PID 控制器以及电机将执行的任何陀螺仪输入 - 有点像通过无线电运行电机选项卡。

我们可以将穿越机 Blackbox 化，将所有 PID 设置为 1，这样 Blackbox 将记录陀螺仪输出。这将显示陀螺仪确定的抖动以及陀螺仪生成的任何错误数据。

问题是我们没有“参考”陀螺仪来了解到底发生了什么。我们如何知道陀螺仪是否忠实地向 FC 报告穿越机，或者是否夸大了某些事情？我们需要在“问题”陀螺仪上方安装第二个“已知良好”FC，并同时记录两者......

所以......除非日志是陀螺仪问题的典型特征（例如抽搐或极端单轴振荡），否则在不将陀螺仪与已知良好的陀螺仪进行比较的情况下很难确定正在发生的情况。如果更换 FC 或陀螺仪芯片可以解决问题，那么这就将矛头指向了陀螺仪。

我们飞行这些东西的基础是，向 FC 提供的陀螺仪数据能够清晰、准确地表示框架的真实运动。陀螺仪有可能在某些油门点出现错误共振并产生错误振荡数据，这并不是一件值得考虑的事情。

#### 解决偏航抽动/振荡问题的报告：

http://www.rcgroups.com/forums/showpost.php?p=35385057&postcount=34964

#### 上限示例：

http://www.rcgroups.com/forums/showthread.php?t=2464844&page=2332

#### Swing3r 发表

我在使用 Aikons + Lumenier 2206-2350KV 电机时遇到了中油门偏航振荡问题。软安装有帮助，但并不完全，所以我还在我的 PDB（旋风 FC 直接由 lipo 供电）和中提琴上添加了一个低 ESR 1000uF 63V 电容器，偏航振荡的所有痕迹都消失了。

硬安装、软安装和软安装 + 1000uF 电容的日志。
https://www.dropbox.com/sh/a4kvsilpi...h56ocCO1a?dl=0

#### AliB 发表我开始相信中油门振荡不仅仅发生在 6500 陀螺仪上。

我和一个朋友在使用 Xracer f303 v3 时都出现过油门中段振荡的情况。
他使用的是 aikon esc，他的 esc 完全无法飞行，直到他软安装了飞控。

我使用的是 KISS esc，我的可以飞行，但有明显的中级振荡。全油门就好了。也就 1300-1400 左右
即使 P 值下降到 2 左右，也能保持静止。

我们都在运行 GTINpower 2205。不错的电机，但 powerrrr 很饿

#### 托尼·利兰发表

在我的 Alien 版本中，我也经历了中油门“振动”，并尝试过对 BF 2.9.0 进行广泛的调整，并且还软安装了 FC，但没有成功。

我运行以下命令：
EMAX 2205 2300KV
HQ 5" 三叶
KISS 24A 电调 V1.1
渡渡鸟 V3a FC
FC 和 RX 的 RC 滤波器
Turnigy 石墨烯 1300

我在 Blackbox 痕迹中看到了这一点，特别是在偏航轴上。

一开始我想是不是 KISS 电调固件，但还没有刷写——等待 V1.3 出来。

人们称其为中油门问题；就我而言，这是四轴动力系统承受最大压力的时刻，即机架快速加速且电流消耗达到最高时。我可以中油门高空悬停，而 FPV 画面或高清录像中没有振动。

接下来我将尝试击球手引线附近的电容器并向你们通报最新情况。

#### fftunes 发表

只是另一个关于电噪声的小报告：朋友用 naze r6 构建了另一个全新的四核，无论过滤器/PID 等设置为何，它都会产生奇怪的高频嗡嗡声。

pdb 上的单个电容 (35v 470uf) 修复了它。

#### 发表者 jubifly

我的构建上也有类似的问题。我尝试了这两种方法，通过电容器限制可能的电噪声，并通过使用一些橡胶 O 形圈软安装 FC 来限制机械振动。两人都没有运气。然后，我尝试将 FC 从框架上的固定部件上完全拆下，并将其悬在空中（只有电机和接收线），偏航抽搐消失了。我对此的想法是，橡胶环不适用于软安装（可能太硬？！）...
也许可以尝试将 FC 悬在空中，看看是否仍然会发生这种情况 - 只是为了绝对消除机械噪音成为问题的可能性。

#### 这是来自 ctzsnooze 的一篇关于更好的软安装方法的帖子。

http://www.rcgroups.com/forums/showpost.php?p=35486733&postcount=36111

#### ctzsnooze 关于这个问题的一个很好的结论

我们很多人都亲眼目睹过这种行为。我很惊讶你现在发现这件事发生在你身上时看起来如此惊讶。它是随机发生的。这可能发生在任何人身上。它恰好发生在你身上。 :-)

更换陀螺仪芯片、更换 FC 或软安装 FC 即可消失；无论是否添加电容器，这些修复都有效。有时只需添加电容器即可消失。

由于软安装是一种可靠的修复方法，外部振动似乎是可能的罪魁祸首，否则很难解释软安装通常如何导致它消失。 Blheli-s ESC 比非 BLHeli-s ESC 更常见，在某些情况下电容器会有所帮助，因此可能会产生电气影响。偏航轴比其他轴更常见。芯片内的偏航传感器在物理上必须与俯仰/滚动不同，因为相对于偏航与俯仰/滚动的硅层的轴有很大不同。

这就是我们所知道的一切。这些因素实际上是如何引起振荡的，以及为什么它是偏航所独有的，完全是推测性的。

当软安装不起作用时，通常是因为它没有以有效隔离 FC 的方式完成。

我见过一些极端的例子，导致穿越机无法飞行，也见过一些温和得多的例子，所以这不是一个全有或全无的事情。

虽然幅度因偏航 P 的增加而增加，但它不是简单的反馈振荡，没有 P 的阈值，低于该阈值它就会消失。实际振荡频率非常低，不会被 O 形圈衰减。 O 形圈到底阻挡什么还不清楚。它不能通过过滤陀螺仪数据来消除 - 正如之前指出的，主振荡频率在我们正常飞行穿越机所需的范围内。

这不是 blheli 或 betaflight 中的软件问题，我们可以确定这一点。更换陀螺仪芯片不会改变该软件，但确实可以解决问题。

我的直觉是，这是这些陀螺仪芯片本身固有的问题，并且这些芯片的某些个别示例的情况比其他芯片更糟糕。这就是为什么如果简单的软安装无法解决问题，我建议更换陀螺仪芯片或整个 FC。

#### ctzsnooze 的另一篇文章（2016 年 9 月 22 日）

当你们说你们是软安装时，请注意，您需要将孔过度钻孔至 4 毫米，并且最好将孔的顶部和底部倾斜，以便 FC 在所有轴上“浮动”。您需要检查是否可以自由活动。如果不钻孔，螺栓孔会粘在螺栓上并直接传递振动。此外，您不能用任何硬物推动 FC，理想情况下所有进出 FC 的电线都必须是非常细的硅胶。

您应该重新审视该安装并检查它是否正常工作，就像您可以在所有三个动作中自由摆动板一样。在做其他事情之前先这样做。这是最有可能解决的问题。

我已经见过这个问题两次（两个独立的四边形，都是 6000，大概有 15 台机器），并对这两个有问题的解决方案进行了详尽的测试。试图将其过滤掉是毫无意义的。这是一个硬件陀螺仪问题，它对 BLHeli-s ESC 驱动的电机产生的噪音很敏感。它会受到偏航 P 变化的影响，但通常不会消除。

在这两种情况下，适当的软安装将其固定。如果没有软安装，我也可以通过拆焊陀螺仪芯片并将其更换为全新的芯片来消除它。我没有在另一个身上尝试过。

我的概念模型是，BLHeli-S 电调中的硬件 PWM 系统会在某些油门点产生某种非常特殊的噪声，从而深深影响某些陀螺仪芯片的偏航传感器部分。

也有可能 BLHeli-S 代码存在问题导致该问题。我的意思是可能存在输出非线性的节流点。我注意到，通过在电机选项卡中非常缓慢地旋转电机并仔细聆听，会发现一些节流点使电机失去了平滑性。非 BLHeli-s ESC 上也存在某些点的不平滑情况。所有四个电机在这些点上在一起可能会以某种方式鼓励积极的反馈。为了排除这种情况，需要有人进行推力测试，以验证受影响范围内的线性比例电机输出。但迄今为止，还没有人做过该测试或发现任何特定的 ESC 固件问题。 FWIW，我禁用 BLHeli-S 中的所有抖动。也许可以尝试一下。

#### 但最重要的是真正实用的软安装。不是一些三心二意的 O 形圈

MotoLab Cyclone 板的孔周围有足够的空间，这是故意的，没有问题。对于渡渡鸟来说，情况完全不同，它的组件非常靠近孔。如果 FC 螺栓由于结构原因（例如在许多小型框架上）需要继续上升，则尤其困难，在这种情况下，您别无选择，只能扩大孔。

我必须强调，仅仅过度钻探是不够的。板可以并且将会在 O 形圈上滑动，直到一个孔停止，该孔的边缘楔在螺栓上。将孔的顶部和底部倾斜可以重新居中，这对于此类偏航问题至关重要。我使用便宜的锥形磨石来制作斜角。

#### airmaxx23 的解决方案

http://www.rcgroups.com/forums/showpost.php?p=35785741&postcount=38781
所以，好消息，这完全解决了我的偏航抖动问题。在尝试之前我也没有改变任何其他内容。以防万一有人想要打印其中一些支架，我可以将它们放在 Thingiverse 上，或者如果您想将它们画出来，它们的外径为 6 毫米，内径为 2.9 毫米。
给你，8 毫米、10 毫米和 12 毫米。如果有人需要的话，我可以用橙色、红色、黑色、蓝色或透明色打印它们。
http://www.thingiverse.com/thing:1785455

另一种可能的解决方案：
http://www.rcgroups.com/forums/showpost.php?p=35786828&postcount=38790

#### scripto23 发布：我还有另一个数据点可以添加到陀螺仪噪音/抽搐的争论中。我有配备 9250 陀螺仪的 Spacingf3 evo。在一个全新的版本中，它实际上是无法飞的，我并不是说它飞得像垃圾一样，我的意思是我无法将它从地面上拿下来，因为它像一头被困住的猪一样抽搐。

通读令人惊叹的 wiki 中的相关部分（感谢 waltr）尝试软安装（pdb 上已经有一个电容器）并设法将其置于空中，但在所有轴上超过 1/3 油门的任何地方仍然有非常糟糕的微振荡；在 FPV 和 Blackbox 日志上可见。我尝试了 PID 的所有组合，但没有任何帮助。最后我把 FC 换成了 spracingf3，搭配 6050 陀螺仪，所有微振荡的痕迹都完全消失了。

似乎有些人没有问题，有些人有轻微问题，而有些人像我一样有严重问题。带有这些陀螺仪的主板完全是碰碰运气。我真诚地怀疑这部分的质量控制（或缺乏质量控制）。

#### 来自 Boris 帖子的更多内容（2016 年 10 月 7 日）：

由 mikenxzz 发表:
我对强磁电机（Tornado T2 2206）有一个问题，在启动后，闲置时，电机振动很大。
由网友 ctzsnooze 回复:
是的，我有一个构建，可以与 Tornado T2 2206 2600 电机执行完全相同的操作，但不能与同一框架上的 SunnySky 2204 2300 电机执行相同的操作。它只在等待我起飞时短暂发生，然后我就再也没有在飞行中看到它。奇怪，以前没见过。还没有将其 Blackbox 化还不足以让我烦恼。怀疑某些 BLHeli 设置（例如启动功率）需要稍微更改。
鲍里斯的回复：
碰巧我一直在分析几种不同的电机/桨叶组合及其振动，以确定一些更好的通用默认过滤器。我确实看到了很多差异，特别是在灯光和扭矩设置方面。
差异在于不同油门范围内的振动。
对于龙卷风电机，默认 3.0 会导致 100hz 和 230hz 之间出现一些低油门振动。但振动最大的地方是 400hz 左右的节气门上部部分。
即使级联时，低通滤波器的强度也不足以完全消除噪声。唯一有帮助的是陀螺仪上的陷波滤波器，因为它可以在特定范围内切得很深。
我使用双陀螺仪，效果非常好，几乎没有延迟损失。只是一些信息丢失。
陷波 1 180hz 和截止 80hz
陷波 2 400hz 和截止 300hz

Dterm 缺口为默认值。

这就是为什么我会在 3.0.1 补丁中添加第二个缺口选项。

但我也通过尝试过的几种不同的降噪滤波器取得了巨大的成功。
Savitzky golay 做得很好，但就 cpu 而言太贵了。

与旧电机相比，现在的电机确实会产生更多的微振动
某些电调会更明显地发出这种噪音。
不知道为什么 blheli_s 目前似乎是最敏感的。

#### Race Miata 的另一个解决方案（发布在 BLHeli_S 线程中）：

关于中油门抽搐，我尝试了各种调音、滤波器、FC 安装方法，但由于那些超级扭矩的 2306 电机，运气不佳。到目前为止对我来说最有效的是

1. 仔细旋转平衡每个整个转子组件（电机加支柱）。我说的是整个转子组件的不平衡度小于 0.002g，

2.硬安装 FC（并不奇怪，因为就像机载视频一样，软安装凸轮对我来说永远无法减少果冻，但一旦我平衡桨叶，硬安装凸轮效果最好，并且

3. 在转子组件经过精心平衡后，将电工胶带夹在电机和框架之间，以吸收来自电机的高频振动。进行细致平衡的原因是，如果电机没有超硬地安装到框架上，那么振动可能会被放大。与软安装 FC 相比，带有减震电机的硬安装 FC 可以更有效地将高频振动从电机隔离到 FC，因为高频振动可以很好地穿过硬体（提示：整个框架）。当到达 FC 时，再多的软安装 FC 也无法有效工作。 FC 的质量不足以软安装以使其有效工作。 OTOH，当振动隔离装置位于朝向源的更上游时，整个框架增加了振动隔离装置下游的质量以有效地吸收振动。如果您像我一样是赛车调校极客，请考虑簧载重量与非簧载重量。为了使悬架发挥最佳作用，始终希望将汽车的大部分重量作为簧载重量而不是非簧载重量。

此时，仍然有一些中油门抽搐，如下面的视频所示，但随着它的缓和，我不必降低我的 PID/过滤器调整以损害响应能力和螺旋桨清洗处理。至少现在在油门中部附近巡航要愉快得多。之前（参见我之前的 Multistar 250 视频），我非常讨厌使用中油门，所以我只是尽力做 0-1 油门以避免使用部分油门。

我的 Multistar250 配有旋转平衡和减震电机支架（2 分 40 秒）
https://www.youtube.com/watch?v=rXB9Rl7vLDI

#### AILERON8 对此的评论：

在振动放大之前从源头隔离振动是几乎所有机械和航空工程手册中的标准做法。然而，出于某种原因，大多数从事这一爱好的人都过于专注于基于软件的滤波器或某种类型的 FC 增强，他们对应该是显而易见的解决方案视而不见。抑制电机振动、加固框架，甚至在电机附近或电机上放置传感器（利用 FC 软件中的主动反馈信号作为自动/增强型滤波器）将比世界上所有软件滤波对降噪产生更显着的效果。
我还想提一下，我绝不试图暗示飞控中基于软件的过滤器无效。我认为减少电机振动具有巨大且尚未开发的潜力

#### 继续讨论（2017 年 2 月 13 日）：

##### AILERON8：

电机软安装也是如此，必须隔离螺栓才能充分发挥该方法的潜力。我还没有看到带有完全软安装电机的穿越机，但我怀疑它会成为有史以来最平滑、最无振动的穿越机。因此，这些 32khz 陀螺仪无振荡，应该已准备好起飞。浮动电机应消除共振向敏感陀螺仪发展和传播的机会。与软安装 FC 不同，为了使电机阻尼有效，不需要消除框架振动。电机阻尼的目标是当电机的振荡频率和幅度发生变化时，将框架的自然共振频率与电机解耦。无论平衡如何，所有电机都会振荡。如果框架与电机分离，则框架不会振动。然而，为了达到这种效果，电机必须完全浮动。这就是为什么我认为当人们看到电机软安装完全实施后会感到惊讶。老实说，当结果开始涌入时，我认为 FC 软安装将成为过去……

##### Tesseract1984：

同意。
尝试过所有方法（软安装 FC、电源盖、ESC 盖、软安装电机）后，这似乎就是问题所在。我对每种选择都取得了不同程度的成功。其中最无用的是电源上限。
软安装电机最有意义。在我看来，对 FC 执行此操作只是一个创可贴，而对电机执行此操作会攻击源并且不会引入任何延迟。一个小轶事故事；我曾经过度软安装 LUX v1，实际上导致了问题。我不仅有那些橡胶线轴，还有 O 形圈和位于带有螺丝孔的 TPU 印刷板上的下部支架。这导致了非常缓慢的摆动，类似于 I-term 太高时的情况（至少在较旧的 BetaFlight 版本中）。
虽然多旋翼飞行仍处于起步阶段，我们正在尝试新事物，但确实有很多炒作。正如你所看到的，我已经研究过所有这些问题，但实际上，这是第一个最终解决了众多问题的问题，包括：

- FPV 视频干扰
- 高清凸轮果冻
- 零星偏航抽搐
- 不可调节的 D 项
- 等等等等
  希望看到框架中内置有电机软安装的框架。 IMO 这应该成为行业标准。几个月前还有一个想法，FC 螺丝孔采用硅材料，孔足够大，可以容纳螺丝。
  无论如何，只是我的 2 分钱。刚刚使用 tpu 软支架改装了我的整个机队，它确实改变了我的穿越机体验。我的高清镜头实际上开始看起来我可能知道自己在做什么。
  全体上车，宣传列车即将离开车站！

##### AILERON8：

我同意，太多的阻尼会导致骑行不顺畅。在使用绑在一块巨大泡沫上的 SPracingF3 板之前，我已经过度阻尼了我的 FC。当然，没有振荡，但无论我将 PID 调到多高，它都感觉松散且草率。我们希望电机浮动，但仍让低频不受影响。这绝对是一个很好的平衡。我认为电机软安装无法解决的一件事是电噪声。其中大部分来自 ESC 通过阻尼光。尽管最近 Aargh80 提出了一种新颖的方法，使用小型 270uF 电容器与小型 MLCC 板并联，最大限度地减少后者噪声，该小型 MLCC 板可以远程隐藏在堆栈或机身的任何位置。我希望看到一个生产版本，尽管制作起来并不难，但为了方便起见，最好将其全部准备好。

##### 四麦飞：

显然，从源头消除振动比从框架中拾取各种谐波后试图消除振动要有效得多，我已经整理了如何做到这一点的想法，但小体积太昂贵，不值得。它包括比框架高 1mm-1.5mm 的肩部螺栓、比肩部螺栓宽 1mm-1.5mm 的螺钉孔以及用于安装孔的 ninja-flex 印刷索环。肩部螺栓紧固在电机底座上以防止退出，但仍然“漂浮”在手臂中的 ninja-flex 索环上。足够的密封性可以防止电机错位，但足够的隔离可以非常有效地抵抗高频振动。为了使其更便宜，人们可以简单地在肩部螺栓的肩部部分使用正确直径的热缩管，然后以老式的方式隔离电机。不幸的是，少量的带肩螺栓非常昂贵。

#### ghall05 修复油门中部振荡的另一篇文章

我已经拥有这台 qav210 有一段时间了，它有中油门振荡的问题。更换了 escs 和 fc，也尝试了一些不同的软安装方法，但没有成功。然而，在主电池连接上添加一个 25v 1000uf 低 ESR 电容就解决了这个问题！这也是硬装 FC 的情况。

只是另一个数据点！从现在开始，我将对我的所有构建设置上限。

编辑：我应该补充一点，我首先使用 Kiss fc，然后使用旋风分离器（我现在仍在使用）。因此，在没有 6500 陀螺仪的情况下，中油门振荡肯定会发生。

#### 好 BB 前后软安装示例：

https://www.rcgroups.com/forums/showpost.php?p=36091829&postcount=2453

#### 关于振荡问题的另一个讨论：

维尼 3019：
只是想跟大家分享一下我的一些想法...最近，我非常努力地对抗中油门“副作用”，例如中油门振荡和偏航抽搐（不是谈论零 PID 问题仍然存在的情况）。我意识到所有这些问题都是在我切换到“动力过大”构建时开始的，其中电机更强，桨叶更轻，框架更轻且更小（惯性更小）。我记得当我运行 Sunnysky 2204 时，它非常容易调整。我能够毫无问题地将 P 和 D 推得很高。是的，这些电机相对较弱，扭矩较低，加速较慢。然后我切换到 Cobra 2204/2206，它在这里开始（油门振荡中），但它仍然是可调的。今天，我正在运行 Cobra Champion 2205 2300，仅仅尝试消除这些副作用就变得非常困难。尝试了多种方法来解决这个问题，我发现有两种最有效的方法：

1. 桨叶稍重，但仍然高效，如 HQ5x4x4 而不是 HQ5x4x3
2. FC（软安装）的机械阻尼。我发现它不仅对敏感陀螺仪有用。
   无论如何，假设使用低 ESR 电容器是一种良好的做法。

因此，如果我尝试分析所有这些输入，我可以看到，增加的中档扭矩和更高的电机加速速度，再加上轻型螺旋桨、更精确的 Air Mode 中油门权限、全功率 ESC 和高放电电池，不仅在高油门时，而且在中油门和快速油门转换时，都会使现有 PID 控制器不稳定。

现在，较重的桨叶和软安装如何帮助防止这些问题？
从我的角度来看，它们在闭环系统（如 PID 控制器）中充当机械阻尼器。

因此，如果我们的构建在电机优点和框架惯性/重量之间具有良好的匹配，那么我们将很有可能不会产生副作用。但是，当我们的构建功率过大而没有足够的“内置”机械阻尼系数时，会发生什么情况呢？正如我所看到的，现有的 PID 控制器并不总是能够充分处理它。

我认为可以向 PID 控制器添加可选的动态软件阻尼器。
我们已经有一种称为 TPA 的产品，但它仅在高油门时起作用，而且非常简单且线性。

我的建议是考虑一些可配置的非线性 P 衰减器以获得理想的油门范围。用户可以定义应用 P 衰减器的开始和停止节流点以及衰减系数。有些类似于陷波滤波器的工作原理。
通过这种方式，我们将能够控制中油门副作用，而不会使我们的穿越机失谐，并且可能更好地处理螺旋桨清洗。
你是这么认为的吗？

鲍里斯的回答：
我不确定你已经尝试过什么，但如果你使用像 MPU6000/MPU6050 这样的低噪声陀螺仪，噪声真的很容易解决。
确实没有必要像你建议的那样降低你的 P。在这种情况下，从技术上讲，您甚至不需要 TPA。
3.0.1 中的陷波默认滤波器应在大多数情况下处理中低油门振动。
我有几台四轴也使用与你相同的 Cobra Champion 系列电机，过去未使用陷波滤波器时，这些电机很难调好。

#### 另一篇关于解决 linklemming 振荡问题的文章：

https://www.rcgroups.com/forums/showpost.php?p=36220137&postcount=41113
后来评论：
我只是将三片方形（~15 毫米）电工胶带粘在电机下方的框架上，用一把精确的刀在胶带上切出螺丝孔，然后重新安装电机，确保不要将它们拧得太紧。

我真的很怀疑它是否会像以前一样有效，因为振动仍然可以通过安装螺钉来，但它解决了问题。

##### 电机隔振器。采用超柔韧的 NinjaFlex 印刷（比 TPU 更软）

https://www.rcgroups.com/forums/showpost.php?p=36698872&postcount=2693

##### 关于解决油门中段振动的挫败感的短文。

https://www.rcgroups.com/forums/showthread.php?2787839-AHHAHAHA-Trouble-shooting-over-a-month-Mid-Throttle-oscillations-Finaly-Solved
寓意：这可能不是你想的那样。在这种情况下，很可能是一个松动的 FPV 相机。这是用 BB 测井确认振荡的一个很好的理由。

##### 成功治愈振荡：

问题：https://www.rcgroups.com/forums/showpost.php?p=36310032&postcount=249
修正：https://www.rcgroups.com/forums/showpost.php?p=36326501&postcount=253
损坏：https://www.rcgroups.com/forums/showpost.php?p=36330372&postcount=255

https://www.rcgroups.com/forums/showpost.php?p=36857612&postcount=2746

##### 成功治愈偏航抽搐：

https://www.rcgroups.com/forums/showpost.php?p=36692751&postcount=916

##### 新 ICM20602 陀螺仪的测试：

Boris：噢......郑重声明，不仅仅是 ICM20602，MPU6500、MPU9250 和所有其他 ICM2xxxx 器件也表现出完全相同的行为。几乎每个 32khz 都支持陀螺仪。
https://www.rcgroups.com/forums/showpost.php?p=36622960&postcount=43273
更多讨论：https://www.rcgroups.com/forums/showpost.php?p=36623357&postcount=43282
https://www.rcgroups.com/forums/showpost.php?p=36623562&postcount=43287
https://www.rcgroups.com/forums/showpost.php?p=36630278&postcount=43337
https://www.rcgroups.com/forums/showpost.php?p=36630822&postcount=43348

##### KgedMayhem 发布：

我看到有关陷波滤波器有助于解决噪声问题的评论，以及 mpu6000 和新的 icm20602 之间的比较，但没有看到有关 Betaflight 当前迭代是否有助于解决噪声问题的任何内容。这就是陷波滤波器的用途吗？
鲍里斯：
您当然可以使过滤更积极，但在硬安装解决方案上，ICM20xxx 陀螺仪的读数可能太混乱，因此软安装以降低它们的敏感度似乎是唯一的解决方案，而在 mpu60x0 上，您通常可以采用标准安装。

##### 在向电源系统添加大、低 ESR 电容之前和之后测试 Dshot 的帖子：

https://www.rcgroups.com/forums/showpost.php?p=36713066&postcount=3133
https://www.rcgroups.com/forums/showpost.php?p=36718584&postcount=3144
https://www.rcgroups.com/forums/showpost.php?p=36720323&postcount=3157

##### arcaine25 关于正确软安装的帖子：

我在使用 9250 陀螺仪并启用 32khz 模式（设置 16 / 16）时遇到问题，但发现问题出在我“软安装”的方式上。我有点过度强迫症，我把它拧得太紧了，还有一些匆忙中犯下的其他安装错误。当纠正这些并安装得“更松”一点时，偏航抽搐就消失了。今天我将奉献一个 32khz 模式四核并在各处进行测试......哈哈

##### 关于降噪帽的主题：

https://www.rcgroups.com/forums/showthread.php?2830948-Capacitors-for-noise-reduction

##### 软安装硬件链接：

OZ——我正在使用这些，8 个运费 4.30 美元。它们是橡胶 8mm x 8mm，具有标准 M3 公/母安装。
http://www.ebay.com/itm/151873404692?_trksid=p2057872.m2749.l2649&ssPageName=STRK%3AMEBIDX%3AIT&rmvSB=true
这些是我尝试过的唯一的，所有偏航抽搐都消失了，它们比我想象的要硬，但在我的反抗（SSG）和 sparky2 的（9250）飞控@ 32/16 上运行良好，电机是硬安装的。

这些刚刚发布，看起来是红色硅（更软？）
http://rotorgeeks.com/index.php?route=product/product&product_id=599&search=damp

Gozz——这些也是我最近开始使用的，它们的尺寸非常适合。
https://www.readymaderc.com/store/index.php?main_page=product_info&cPath=53_777&products_id=6306

什么被认为是软电机的正确方法？
来自 AILERON8 的回答：
有很多不同的方法可以做到这一点，但我所做的是确保使用真正的“软”安装座，无论是橡胶还是低填充 TPU，并在每个电机下方和臂下放置一个，以便电机螺钉也浮动。您希望电机与框架分离，而在此过程中不会松动。这是一种微妙的平衡，如果执行得当，就会产生最好的调音。
http://pirofliprc.com/1mm-Medium-density-motor-soft-mounting-pad-10-pcs_p_3852.html

SadLeprechaun 的软安装零件列表-
我用这个东西来软安装/振动：
[电机](http://www.getfpv.com/motor-soft-mount-silicone-pad-w-3m-backing-set-of-4.html)
[对峙](http://www.getfpv.com/anti-vibration-flight-controller-standoff-7mm.html)
[O 形圈（位于支架顶部）](http://www.getfpv.com/multipurpose-o-ring-set-of-8.html)
[高清摄像头/ESC:](http://www.getfpv.com/rtom-anti-vibration-moongel.html)
[电池引线盖：](https://www.amazon.com/dp/B00T2IA7MM?tag=viglink20264-20)
[电调上限：](https://www.amazon.com/Panasonic-470uF-Radial-Electrolytic-Capacitor/dp/B00WOQ0ILE?tag=viglink20264-20)
完成所有这些工作并移除陀螺仪陷波滤波器/PT1 修复后，F60 Pro 穿越机运行时不会出现油门中间抖动的情况。每件事都让他们越来越减少。

### 滤波器调整有帮助吗？

3.0 和 3.1 中的较新过滤器具有相当激进的默认值。许多传单通过减少滤波器的使用来减少振荡问题。有关详细信息和讨论，请参阅[陀螺仪和滤波器 3.1](/docs/wiki/guides/archive/Gyro-And-Dterm-Filtering-Recommendations-3-1) 支持页面。

## 有没有办法通过终端客户端下载 Blackbox 日志？

感谢 dropax 提出这个问题并找出答案。

一些代码挖掘揭示了一个 CLI 命令“flash_read”，该命令仅适用于 Sparky2：
在 spracingF3/target.h 中添加“#define USE_FLASH_TOOLS”，编译并烧录板。
设置 PuTTY 将所有会话输出记录到文件中，连接，输入“#”进入 CLI，输入“flash_info”获取 usedSize，“flash_read 0 'usedSize'”然后节目开始。 11 分钟后，关闭 PuTTY，并在硬盘上找到一个不错的 8MB 日志。
Blackbox 查看器足够强大，无需关心日志文件中的初始“谈话”。

一开始吸引我的一件事是 PuTTY 中的流量控制设置，必须为“无”，默认情况下日志会被截断。不像在地面站中点击一些按钮那么方便，但它会节省我很多时间，非常感谢添加这段方便的代码的人。

我认为 [this](https://github.com/cleanflight/cleanflight/commit/3eb28f16eaa5d4f4a085bcb87f334ba85d3ace84) 是对 cleanflight 的初始提交，[this](https://github.com/betaflight/betaflight/commit/3eb28f16eaa5d4f4a085bcb87f334ba85d3ace84#diff-34076ed1dbe02400da4a39189fe5c250) 对 betaflight 的初始提交，两者的日期都是 01/28/2015。所以我要感谢 thenickdude，闪光灯和 Blackbox 大师。

由于它仅针对“全新”sparky2 目标（08/06/2016）启用，我认为它仅用于调试目的。下载后，串行端口似乎挂起，我必须重新启动 FC，但节省的时间是完全值得的。

## 为什么 LED 灯带不工作？

一个可能的原因是：
许多 LED 灯带在电源超过 5V 时无法工作，因为 FC 的串行输出仅为 3.3V 逻辑，并且 LED 芯片永远不会看到有效的逻辑高电平。将 LED 电压降低至少一个二极管压降即可使其正常工作。
两个工作解决方案是：
添加一个硅二极管 1N4002，与 LED 灯条的 5V 电压串联。
通过调整至 4.7V 左右的调节器为 LED 灯带供电。如果仍然不起作用，可能需要调低一点。

## 最近降温后，我的四轴开始随机抽动。室外约 20 华氏度时，其他人也遇到过随机问题吗？

AILERON8 的精彩回答：
不只是抽动，广义故障也确实会发生。我曾经营移动 DJ 业务 15 年，主要在缅因州沿海的寒冷气候中生活和工作，完成过数百场演出。例如今天 5 华氏度还算温和；根据这些年经验，低温会给电子设备和硬件带来三类主要问题，而且都不乐观。

- 收缩与膨胀：微电子器件设计时会考虑多种环境温度，包括本爱好常用的 FET、低 ESR 电容和大型集成电路板。它们依靠四轴飞行时的充足气流散热，但高效散热也可能让板上部分元件过冷。元件由多种原材料构成，过冷时会以不同速率收缩。设计通常会预留一定余量，但严寒下收缩也可能非常严重，导致元件短路、开裂、变脆或断裂；损坏可能是暂时性的，也可能永久存在。

- 冷凝：寒冷环境中，元件本身不会凝露，但护目镜一定会起雾。长时间处于冰点以下后，若快速把设备带回温暖室内，冷凝可能严重到永久损坏不应受潮的部件。无论在电调、FC 或 PDB 喷多少 Corrosion-X，若不让设备逐步回温至室温，仍会完全受潮。请缓慢回温，否则数次飞行后四轴就可能短路、嗡鸣甚至起火。

- 低温造成的缓慢老化：这是重点。若经常在严寒中飞行，会显著缩短每个元件的寿命。这不是抱怨，而是事实。即使从低温环境取出时逐步回温，所有元件和电路也会因反复收缩和膨胀承受很大应力，且无法完全避免冷凝。LiPo 在低温中本就承受额外压力，电池不愿提供被要求的额外功率；结果反而可能是落地时电调、电机，尤其 LiPo 温度很高。务必小心，电池可能热到起火。幸运的是，磁铁喜欢适度低温，并且[在约 -125°C 前强度会略有提高](https://www.kjmagnetics.com/blog.asp?p=temperature-and-neodymium-magnets)。

## 为什么我无法使用 MSP over UART1 连接到我的飞控（USB 损坏）？

从 Betaflight 4.5 开始，可以使用定义来添加基于 UART 的 MSP，以使用 USART1 上的 FTDI 适配器来闪存固件

```
make [TARGET] EXTRA_FLAGS="-DMSP_UART=SERIAL_PORT_USART1"
```

Configurator Cloud Build 也支持自定义 define `MSP_UART=SERIAL_PORT_USART1`。

:::note
`MSP_UART` 也可以分配给另一个端口。
:::

## 是否可以像刷写电调一样，通过飞控刷写 FrSky 接收机？

Fishpepper 已实现此功能：
[OpenSky/tinyFISH](http://fishpepper.de/2017/02/24/opensky-tinyfish-how-to-update-the-opensky-receiver-firmware-through-betaflight/)

## 可以关闭 OSD 的飞行后统计屏幕吗？

可以。将油门或俯仰摇杆推高，即可关闭统计屏幕并返回“主”OSD 屏幕。
