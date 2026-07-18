# 舵机与舵机倾斜

### 简介

## 自 v3.1 起，固件不再提供默认的舵机输出分配。必须使用 `resource` CLI 命令显式分配舵机输出。（`resource` 命令的详情请参阅 [Betaflight 资源重映射](/docs/wiki/guides/current/Resource-remapping)。）

背景

STM32 处理器内部带有定时器（Timer），用于为电机、舵机等输出脉冲提供计时。不同飞控（FC）板会将不同的 STM32 引脚接至板上的输入和输出端，这也是 Target 固件十六进制文件各不相同的主要原因之一。引脚及内部资源的定义位于[此处](https://github.com/betaflight/betaflight/tree/master/src/main/target)的 `target.c` 源文件中。

例如，`SPRacingF3/target.c` 中的输出定时器和通道分配如下：

```
Output 1: TIM16 CH1
Output 2: TIM17 CH1
Output 3: TIM4 CH1
Output 4: TIM4 CH2
Output 5: TIM4 CH3
Output 6: TIM4 CH4
Output 7: TIM15 CH1
Output 8: TIM15 CH2

```

基本规则是：同一个定时器的各通道不能分配给不同类型的功能。

如果电机接在输出 3 和 4 上，`TIM4` 就会专用于电机，不能再承担其他用途。因此不能把输出 5 和 6 用作舵机输出。（例外情况是电机使用传统 PWM 协议时，同一计时器的通道可能可以混用电机和舵机。若该方式无法在你的板上工作，请参阅下文的解决方法。）

可选分配方式为：

(1) 输出 1 和 2：舵机；输出 3 至 6：电机

或

(2) 输出 1 至 4：电机；输出 7 和 8：舵机

使用 DShot 时还需要考虑另一项因素：DMA 通道冲突。

---

### 一般信息

使用 `resource list` 查看当前的资源分配。

```
resource list
```

使用 `resource` CLI 命令将舵机分配给板载焊盘/引脚。

```
resource servo n xYY
```

其中，`n` 是从 1 开始的舵机编号，`xYY` 是 MCU 引脚标识符，例如 `A8`、`c8` 和 `B10`。

注意，CLI 中的舵机编号从 1 开始。这与 Configurator 的 Servos（舵机）选项卡不同：此处配置的舵机 1 和 2，分别对应 Servos 选项卡中的舵机 0 和 1。

---

### 示例

下面给出一些资源分配示例。若没有适合你的配置，请阅读本页后半部分的[自行配置](#自行配置)。

**Target/板卡维护者请补充示例条目，示例应反映基于 v3.0.1 `pwm_mapping.c` 的映射。示例可以涵盖全部映射，而不应仅限于舵机倾斜。**

---

#### 示例 1：NAZE32 的“**电机输出后移 2 位**”式分配

如果你的 NAZE32 已按“**Shift Motor Outputs by 2**”（电机输出后移 2 位）规则配置，并且在 v3.1 之前能够工作，可使用以下分配。

**注意：**默认分配使用电机 1 至 4。若尝试将舵机重新分配到电机 5 至 6，会产生冲突。对于 F1 板卡，应将舵机输出分配到电机 #1 和 #2，以避免定时器冲突；随后将电机 1 至 4 重新分配到原先的 3 至 6 引脚，从而避免定时器问题。

```
resource motor 1 none
resource motor 2 none
resource servo 1 a8
resource servo 2 a11
resource motor 1 b6
resource motor 2 b7
resource motor 3 b8
resource motor 4 b9
save
```

---

#### 示例 2：SPRacing F3 控制外接 PWM 触发蜂鸣器

_本示例用于控制 Matek 5-in-1 PDB 上由 PWM 触发的蜂鸣器，也可应用于其他场景。_

目标：在 SPRacing F3 上，使用 AUX2 开关通过 `IO_1[4]`（RC CH2）控制外部 PWM 设备（Matek 5-in-1 PDB 蜂鸣器）。

可通过以下两种方式实现：

> A.（所有 v3.1 版本均可用）使用 `SERVO_TILT`，并在 Servos 选项卡中将所选 AUX 通道分配给舵机 0。
>
> B.（仅 v3.1.5 及更高版本）使用 `CHANNEL_FORWARDING`，并将 CLI 变量 `channel_forwarding_start` 设为开关所在的通道号。

如果未使用云台舵机且设备数量不超过两个，建议使用方案 A（`SERVO_TILT` 只能控制两个通道）。

以下为使用 AUX2 控制 `IO_1[4] (RC CH2)` 的方案 A 操作步骤：

(1) BF 3.1 不会自动配置任何舵机，必须显式分配。

(1-1) 确认未使用 PPM 输入（CH2 与 PPM 共用一个定时器）。

(1-2) 使用以下 CLI 命令：

```
resource pwm 2 none
resource servo 1 a1
save
```

(2) 启用 `SERVO_TILT`。（如果已启用 `CHANNEL_FORWARDING`，请将其关闭。）

(3) 在 Servos 选项卡中，为 `servo 0` 勾选 `A2`。上述资源命令指定的是 `servo 1`，但该编号从 1 开始；Servos 选项卡的舵机编号从 0 开始，因此两者指向同一输出。

(4) 此时应可在 Motors 选项卡中确认 `servo 0` 会响应 AUX2 开关输入。

(5) 将外接设备连接至 `IO_1[4]` 后，应可确认设备正常工作。

---

#### 示例 3：SPRacing F3 EVO 控制外接静态相机快门

使用电机输出 8：

```
resource servo 1 b1
```

---

#### 示例 4：F3 板卡上的三轴飞行器舵机（感谢 Bking1340）

以下是一个在 F3 板（Xracer F303）和 Betaflight 3.1.7 上让三轴飞行器尾舵机完全正常工作的经验反馈。

电机 1 至 3 接至电机引脚 1 至 3。

不希望舵机从飞控板取电，因此舵机的正、负电源线接至 5 V UBEC，信号线接至电机引脚 8。（在 F3 板上，应将舵机输出设在电机 #7 和 #8，以避免定时器冲突。）

现在必须在 CLI 中分配舵机：在 CLI 输入 `resource` 后，可以看到电机 8 位于 `A03`，而 `Serial_Rx 2` 也位于 `A03`。此示例的处理方式是：

```
Resource motor 8 None
Resource Serial_Rx 2 None
Resource servo 1 A03
```

这样舵机即可工作，无需修改舵机方向、EPA 等参数。

作者并非专业人员，也不确定 `Serial_Rx 2` 的用途；但最近两次飞行均正常。其使用配有 X4R 接收机的 Taranis，通过 SBUS 和 SmartPort 连接；Taranis 上可以显示 PID 和电池电压，因此看起来并未使用 `Serial_Rx 2`。

作者曾将偏航 P、I 从默认值各减半，但尾部变得松散；恢复默认值后系统非常稳定，没有振荡。

---

#### 示例 5：Flashted 在 Betaflight 3.2.2 中为 Matek F411 mini 配置三轴飞行器

如果需要更新 F411 的固件，最好通过 CLI 完成。

以下说明已确认可用于 Betaflight 3.2.2。更高版本改变了尾舵机输出方式，因此该方法不适用于 Betaflight 3.4.1 或更高版本。

作者也未在 3.2.2 到 3.4.0 之间的版本中测试过。目前仍在确认改动内容和原因；若想在较高版本中尝试，需要自行验证。Betaflight 3.2.2 只需较少配置即可让机体起飞。

作者计划日后在三轴飞行器上试验 GPS Rescue。Betaflight 3.2.2 不支持该功能，因此将从支持 GPS Rescue 的 3.4.1 版本开始测试。

对于 Matek F411 飞控，即使像许多其他板卡一样断电、按住 Bootloader 按钮再重新接入，至少在作者的 Windows 10 笔记本电脑上也不会进入 Bootloader 模式，且没有闪烁的 LED 用于确认 Bootloader 模式；这种方式无效。

如果电脑无法识别设备，请用 zadig 重新安装 DFU 驱动，或使用 https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe

通过 CLI 进入 Bootloader 模式：

在 CLI 中输入：

bl

然后按 Enter。这样会启用 Bootloader 模式，即可刷写更新的固件。

在做**任何**更改之前，请先执行完整 CLI `dump`，保留原始配置作为参考；若必须从头开始，这将是可靠的起点。必须先将机型设为三轴飞行器，然后以三轴飞行器配置“保存并重启”，这样所有资源及其名称才会显示在 CLI 中。

配置：

- 第一个舵机输出通道用于尾舵机。
- 第一个电机输出通道用于尾部电机。
- 第二个电机输出通道用于右侧电机。
- 第三个电机输出通道用于左侧电机。

两台前电机朝前；尾部（后方）电机/舵机朝向飞手。

板上连接方式：

- 电机 1（后方）接电机输出引脚 S1。
- 电机 2（右侧）接电机输出引脚 S2。
- 电机 3（左侧）接电机输出引脚 S3。
- 因为这是三轴飞行器，电机 4 输出引脚 S4 空闲。

由于定时器限制，电机引脚 4 不能用于尾舵机。

（尾舵机设置请继续阅读下文。）

如果需要更多舵机输出，或像本示例一样需要频闪灯，在电机 3（S3）已分配给电机时，不能将电机 4（S4）重映射为舵机。若使用 S5 作为舵机输出，S6 也可以重映射为舵机。作者将 S5 用于 Taranis 遥测。

也可使用 RSSI 焊盘或 LED 焊盘作为舵机输出。

作者曾尝试禁用电机 4，却发现校准 ESC 时由于 Betaflight 的异常行为导致电机 2 丢失。将电机 4 重新分配回原始配置后，电机 2 又恢复正常工作。

Betaflight 图形界面的 Receiver（接收机）选项卡可选择模型连接的通道映射方式。

Betaflight 默认映射为 `AETR1234`：Aileron（横滚）、Elevator（俯仰）、Throttle（油门）、Rudder（方向/偏航）、Aux 1、2、3、4。

这是 Taranis 上通行的标准设置。

在 Configuration（配置）选项卡中：

feature SERVO_TILT

feature CHANNEL_FOWARDING

都必须关闭。

选择 `TRICOPTER` 会自动将偏航输出设为舵机。

尾舵机设置方法：

本示例选择将引脚 6 用作尾舵机，因为如前所述，引脚 5 用于遥测。

在 CLI 中输入：

resource motor 6 none

save

这样该引脚就会被释放。

板上对应引脚为 S6，MCU 引脚位置为 `B10`。

输入：

resource servo 1 B10.

save

无需在 Servos 选项卡中更改设置即可产生动作。

特别是在三轴飞行器上，切勿让舵机从飞控板取电。

正极和黑色负极线接至 PDB 的 5 V 输出。

黄色或白色的信号线可以接至电机引脚 5、6、7 或 8，均可工作。

若希望在未解锁时禁用尾舵机，请在 CLI 中输入：

set tri_unarmed_servo = OFF

save

或者若希望保持启用，输入：

set tri_unarmed_servo = ON

save

接着检查舵机/电机的倾斜方向是否正确。

向左推动偏航摇杆时，电机必须向右倾斜。若方向错误，有两种解决方法。

在 CLI 中输入：

Set yaw_control_direction = -1

save

快速向右移动机尾时，电机必须快速向左倾斜，反之亦然。

可以直接在遥控器上反转偏航方向，但最好在 Betaflight App 中完成，避免飞控额外处理数据。

在 Betaflight App 中设置端点，使两个方向均有 40 度偏转，并让中位尽量保持水平。

多数情况下模拟舵机和数字舵机均可使用。作者使用模拟舵机时无需反向，但数字舵机可能需要反向。

希望这些信息有所帮助。

致意！

---

---

#### 新示例占位符

---

### 自行配置

要成功为舵机分配 MCU 引脚，需要遵守以下几项规则。

1. **MCU 引脚必须连接到可访问的板载焊盘或通孔。**
   板上可能有空闲未使用的 MCU 引脚，但如果该引脚没有引出为可访问的焊盘或通孔，就只能通过显微焊接引出 MCU 引脚，这项工作极其困难。

2. **MCU 引脚必须具有定时器功能。**
   MCU 引脚关联的功能各不相同。有些可作为 UART 信号引脚，有些可作为 I2C 或 SPI 总线信号引脚，还有一些只能将引脚逻辑电平拉高或拉低。舵机输出需要定时器功能。执行 `resource list` 并查找 `MOTOR` 或 `PWM` 条目，即可找出关联定时器的引脚。

3. **定时器不得与其他用途冲突。**
   这条规则需要进一步说明。关联某个 _timer_（定时器）的 MCU 引脚，会连接到该 _timer_ 的一个 _timer channel_（定时器通道）。每个 _timer_ 都有自己的 _time base_（时间基准或时钟），同一 _timer_ 上的所有 _timer channel_ 都按该 _time base_ 工作。

   例如，一组人都看着一只只有一个指针的实体时钟。给每个人安排任务：当指针前进特定次数时大喊。若时钟的指针每秒前进一次，他们就会按秒大喊。

   再想象另一组人，给他们一只指针每小时才前进一次的时钟，他们就会按小时大喊。

   不能在同一组中混合要求“每 X 秒大喊”的人和要求“每 Y 小时大喊”的人。

（未完待续……）
