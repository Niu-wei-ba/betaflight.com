# MotoLab

MOTOLAB 构建目标支持 MotoLab 提供的基于 STM32F3 的开发板。

目前包括 TornadoFC、CycloneFC 和 MotoF3。

CycloneFC 和 TornadoFC 的描述如下：

http://www.rcgroups.com/forums/showpost.php?p=32330479&postcount=2

MotoF3 的描述如下：

http://www.rcgroups.com/forums/showpost.php?p=28508139&postcount=3

所有板卡均使用 STM32F303 微控制器，并具有以下特性：

- 256 KB Flash
- 浮点数学协处理器
- 3 个硬件 UART
- USB 使用内置 USB PHY，不会占用任何硬件 UART
- 稳定的电压调节
- 高电压/大电流蜂鸣器/LED 输出
- 串行 LED 接口
- 具有 1/10 分频比的低通滤波 VBAT 输入
- 低通滤波 PWM 或模拟 RSSI 输入
- 8 个短路保护 PWM 输出，TornadoFC 上具有 5V 缓冲
- 板载 4S 兼容开关稳压器（CycloneFC 和 MotoF3）
- 可直接安装 Pololu 开关稳压器，支持最高 6S LiPo（TornadoFC）
- 使用 Cleanflight 地面站对基于 BLHeli 的 ESC 进行直通编程和配置

MotoF3 还为四个 ESC 提供内置配电、板载蜂鸣器和用于数据记录的 2Mbyte SPI 闪存。

# 刷写固件

MotoLab 板均使用 STM32F3 微控制器上的内置 USB 接口。新版本的 Cleanflight 可以通过 USB 接口使用 Cleanflight Configurator 安装。新固件的安装描述如下：

[USB 刷写](/docs/wiki/guides/current/USB-Flashing)

使用 Windows 操作系统安装固件比较复杂，因为 DFU 编程模式下 STM32 USB 接口的默认设备驱动程序与 Configurator flash 工具不兼容。必须手动安装所需的 DFU 模式驱动程序。连接地面站还需要正常 (VCP) 模式下 USB 端口的默认驱动程序。此处提供了有关驱动程序及其安装的更多详细信息：

http://www.rcgroups.com/forums/showthread.php?t=2537379

## 同一文件中的补充内容

## 描述

四个 FC 均使用相同的 Target HEX

- MotoF3 - 专为 ImpulseRC Warp Quads 设计的板形状，作为框架的一部分。
- Tornado - 由于电机输出引脚上有 5V 单向驱动器，因此不允许 BLHeli 直通。
  需要在板上安装 Pololu 5V 稳压器。
- Cyclone - 与 Tornado 类似，但支持 BLHeli 直通，并在板上内置了 5V 稳压器。
- Tempest（F3 版本）- 板上内置 PDB 以及为配件供电的 5V 稳压器。

## MCU、传感器和功能

### 硬件

- 单片机：STM32F3
- IMU：MPU6000、SPI（旋风、暴风雨）
  ：MPU6050、IIC（MotoF3、龙卷风）
- IMU 中断：
- 巴罗：没有
  VCP：是的
- 硬件 UART：3
- OSD：无
- Blackbox：串行
- PPM/UART 共享：UART2
  电池电压传感器：是的
  集成稳压器：是（MotoF3，Cyclone，Tempest）
  ：Pololu 5V（龙卷风）
  有刷电机 MOSFET：无
- 按钮：无。焊接引导焊盘

### 特点

_（添加功能列表）_

## 制造商和经销商

_（添加制造商和经销商的链接）_

## 设计师

## 维护者

_（如果您帮助测试或贡献此板的代码，请在此处添加您的名字）_

## 相似目标

_（在此处添加特性或功能相似但具有单独目标的链接板描述）_

## 变体

差异：

## 常见问题解答和已知问题

- BF 开发人员在 3.1.x 中从 MotoLab 目标中删除了闪存支持。其他 MotoLab 板使用相同的目标，但没有闪存，因此显然他们忽略了 MotoF3，并认为不需要闪存代码。

- 要将 DSHOT ESC 协议与 ßF3.1 Motor1 一起使用，需要将其重新映射到 PPM 引脚。

- Tornado 有输出驱动芯片，因此无法在输出引脚接头上添加电线来使用 DSHOT。因此，只需将 1 号电机的 ESC 直接连接到 PPM 引脚并重新映射即可。

- Cyclone 和 Tempest 板可以将 PPM 引脚连接到电机 #1 输出引脚。

请参阅 [DSHOT 和 Betaflight](/docs/wiki/guides/archive/DSHOT-ESC-Protocol-3-1) 页面。

对于旋风和暴风雨 -
可以将电线从 PPM 引脚焊接到电机 1 接头引脚，或者将 ESC#1 直接连接到 PPM 引脚。
注意：如果将 ESC #1 的信号线直接连接到 PPM 引脚，则不需要添加此线。将电机 1 从输出 #1 接头引脚移动到 PPM 输入接头引脚。

按照上述操作并在 CLI 中重新映射输出类型：
`resource ppm none  `
`resource motor 1 A07 `
`save  `

- 添加到旋风分离器的电线照片。
  https://www.rcgroups.com/forums/showpost.php?p=36589146&postcount=2787

- 关于修改 MotorF3 (Warp Quad) 板以使用 DShot 的照片和帖子。请注意，这是一种将 PPM 连接到电机 #7 输出的交替网络方法，因为 #7 输出非常靠近 PPM 引脚。

CLI 重新映射为：
`resource motor 7 none `
`resource ppm none `
`resource motor 1 A07 `
`save `
https://www.rcgroups.com/forums/showthread.php?2537379-MotoLab-Board-Setup-and-Troubleshooting/page197#post37314713

- 报告说，通过 Mod 和重新映射来运行 DSHOT，与电机 #4 的 LED 的 DMA 存在冲突。
  目前需要禁用 LED 才能运行 DSHOT。
  ctzsnooze 报告了修复：
  对于 3.3 之前的 betaflight 版本，解决方案是将电机 4 的 ESC 信号线焊接到电机 5 焊盘上，并在 CLI 中保存：
  `resource MOTOR 4 A01`
  `resource MOTOR 5 NONE`

### BF3.1 上带有 DSHOT 的 Servo_tilt：

如上所述对 DSHOT 进行修改和设置。
Cyclone（龙卷风和暴风雨）上的输出 7 和 8 具有可用于伺服系统的计时器（输出 5 和 6 也可能可用，但未经测试）。
在 CLI 中输入：

`resource motor 7 none`
`resource motor 8 none`
`resource servo 1 A03`
`resource servo 2 A08`
`save`

重新连接 USB 并重新打开地面站。
在“配置”选项卡上启用“Servo_tilt”并单击“保存并重新启动”。
在“伺服”选项卡上，检查伺服 0 的 CH1（滚动）（这里的伺服 0 是 CLI 中的伺服 1），检查伺服 1 的 CH2（俯仰）。
单击“保存”。输出 7 和 8 现在应 ​​ 该是 1000 到 2000usec 伺服脉冲。使用“电机”选项卡检查输出引脚上的 O'scope。调整“最小值”和“最大值”以获得所需的运动。

### BF3.1 上配备 DShot 电调的三轴飞行器：

必须将 PPM 连线添加到 DShot 的输出 1。
伺服必须位于输出 5 或 6（计时器限制：请参阅 SERVO_TILT wiki 页面）。不要启用 SERVO_TILT，选择 TRICOPTER 会将偏航杆定向到 Servo 1。
使用以下 CLI 命令将电机 5 重新映射到伺服器 1（输出 5 上的伺服器）：

`resource MOTOR 5 none  `
`resource servo 1 A01  `
`save  `

### BF3.1 上配备 DShot ESC 的六轴飞行器：

这似乎不起作用。电机 1 上无 DSHOT 输出（无 DMA 分配），电机 6 上输出错误。

## 其他资源

设置指南：

龙卷风和旋风
https://www.rcgroups.com/forums/showthread.php?t=2537379

暴风雨
https://www.rcgroups.com/forums/showthread.php?t=2715556

## 图片
