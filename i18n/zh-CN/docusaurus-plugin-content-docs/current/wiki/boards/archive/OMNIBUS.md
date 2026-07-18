# OMNIBUS

_Omnibus 在拉丁语中是“为所有人”的意思。_

## 描述

Omnibus F3 是一款集成飞控与 OSD，兼顾易用性和飞行性能。它采用通过 SPI 连接的 MPU6000 惯性传感器，具有较高的可靠性、精度和更新速度，可运行较高的控制环速率及 ESC 协议。板载 BMP280 气压计用于高度测量，OSD 芯片直接连接主处理器（MCU）。这种紧密集成可快速更新显示内容，并可在 Betaflight Configurator 中直接配置 OSD，无需再借助 USB/UART 适配器和第三方配置工具。

为简化安装，Omnibus F3 配有板载稳压器，可直接接入最高 5S 电池，无需额外 PDB。电源管理设计同时对敏感的 OSD 芯片提供保护；即使使用 5S 电池，通常也无需额外的火花抑制器。

## MCU、传感器和功能

### 硬件

- MCU：STM32F3
- IMU：MPU6000（SPI）
- IMU 中断：支持
- 气压计：BMP280（SPI）
- VCP：支持
- 硬件 UART：3 个
- OSD：支持，BetaFlight OSD（BFOSD）
- Blackbox：SD 卡
- PPM/UART 共享：UART3（可选）
- 电池电压传感器：是，直接连接，无需接线
- 集成稳压器：支持，最高 5S、1.5A
- 有刷电机 MOSFET：无
- 按钮：2 个（1：DFU，2：未分配）

### 特点

- 电流传感器：PA1
- BLHeli 直通：支持
- WS2811 LED 灯带：支持
- 应答器：支持
- 蜂鸣器：倒置

## 制造商和经销商

[Airbot](https://myairbot.com)（制造商）

此处可用：http://shop.myairbot.com/index.php/flight-control/cleanflight-baseflight/omnibusv11.html

#### 经销商

- http://www.readytoflyquads.com/
- https://www.pitchrollyaw.net
- https://www.fpv303.com

## 设计师

[Airbot](https://myairbot.com) 和 [Nathan](https://github.com/nathantsoi)

## 维护者

_（如果您帮助测试或贡献此板的代码，请在此处添加您的名字）_

[Nathan](https://github.com/nathantsoi)

## 相似目标

_（在此处添加特性或功能相似但具有单独目标的链接板描述）_

- [SirinFPV](/docs/wiki/boards/legacy/SIRINFPV)

## 变体

OMNIBUS AIO F3 PRO - http://shop.myairbot.com/index.php/omnibus-prov1-72.html

差异：

- 添加电流传感器
- 添加电源滤波器
- SBEC 代替 LDO

## 常见问题解答和已知问题

_（添加与此板特别相关的常见问题解答、已知问题和解决方法。请将正在进行的问题链接到相关的 github 问题或拉取请求）_

_格式为记者[姓名]，（状态）：问题内容_

#### 为固定翼/飞翼重新映射伺服输出

要使用伺服功能，必须在 CLI 中将当前分配给电机的引脚重新映射到伺服输出。

以下是飞翼配置的 CLI `resource` 输出，其中电机 3 和 4 已重新映射为伺服 1 和 2。

`resource MOTOR 1 B08`
`resource MOTOR 2 B09`
`resource MOTOR 3 NONE`
`resource MOTOR 4 NONE`
`resource MOTOR 5 B07`
`resource MOTOR 6 B06`
`resource MOTOR 7 NONE`
`resource MOTOR 8 NONE`
`resource SERVO 1 A02`
`resource SERVO 2 A03`
`resource SERVO 3 NONE`
`resource SERVO 4 NONE`
`resource SERVO 5 NONE`
`resource SERVO 6 NONE`
`resource SERVO 7 NONE`
`resource SERVO 8 NONE`

### 在 BF 3.1.x 中设置三轴机

此配置适用于运行 Betaflight 3.1.6 的 Flip32 F3 Omnibus。

伺服需要独立的、可提供足够电流的 5V 电源；Omnibus 的板载 5V 不可用于驱动伺服。首先需要将电机输出 4 配置为伺服控制器。对于 F3 Omnibus，CLI 最终配置应如下；其他板只需替换相应的电机资源分配。

CLI

`# resource`
`resource BEEPER 1 C15`
`resource MOTOR 1 B08`
`resource MOTOR 2 B09`
`resource MOTOR 3 A03`
`resource MOTOR 5 B07`
`resource MOTOR 6 B06`
`resource SERVO 1 A02`
`resource PPM 1 B04`
`resource LED_STRIP 1 A08`

请在 CLI 中执行以下命令以得到上述配置：

`resource`

记录电机 4 当前的 `xx` 分配（本例中为 `A02`）。

`resource MOTOR 4 none`
`resource SERVO 1 A02`
`save`

在 Cleanflight 主页右上角启用专家模式，然后打开“Servo”选项卡（启用专家模式后才会显示）。

在“Servo”选项卡中，选择 `Servo 0` 所在行，并在 `CH4` 下勾选。

`save`

将尾舵机接到电机输出 4（仅使用该输出的信号线）。确保伺服由 PDB 或其他电源提供 5V DC 和 GND。

这样即可在 Flip F3 Omnibus 上正常驱动尾舵机。

其他几个指针：

1. 如舵机方向不正确，请在遥控器中反向该通道。
2. CLI 中的 `SERVO 1` 在“Servo”选项卡中对应 `Servo 0`，即选项卡编号等于资源编号减 1。
3. 若要将舵机分配给 AUX 功能，请在 `A1`–`Axx` 对应格中勾选。例如分配 AUX4 时，在 `A4` 下勾选。
4. 每次改动后都要点击“Save”。

BobFlyer

### 额外的定时器引脚

如果您使用 S.BUS 或其他串行 RX 接收机，则可以将接收机输入从 SBUS/PPM 接头 (J8) 移至 UART3 RX（F3：J22/PWM6、F3 Pro：J12/PWM6），并使 SBUS/PPM 接头专用于 PPM 信号。

![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/t9770685-40-thumb-6547DA9F-A6FA-4217-BCB0-3355A92A6AC1.jpg?d=1486736891)

PPM 信号接至 MCU 引脚 `PB4`，可用于 Betaflight 3.1.6 及更高版本提供的单线 SoftSerial。
（取自这里：https://www.rcgroups.com/forums/showthread.php?2831228-OMNIBUS-F3-F3-Pro-PPM-An-extra-timer-pin）

`feature -RX_PPM` // 禁用 RX_PPM
`feature RX_SERIAL` // 切换至串行接收机
`feature SOFTSERIAL` // 启用 SoftSerial
`resource SERIAL_TX 11 B04` // 在 B04（J8 上的 PPM）启用 SoftSerial1 TX
和/或：`resource SERIAL_TX 12 B07` // 在 B07（J12 上的 PWM5）启用 SoftSerial2 TX
`save`

### Club 24A VCC-RAM 旁路改装

如果您在使用 VCC-RAM 跳线时遇到不正确的电流读数，那么这是建议的修复方法。
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529383-153-OMNIBUS_F3_PRO_VCC-RAM_Bypass_0.jpg)
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529390-246-OMNIBUS_F3_PRO_VCC-RAM_Bypass_1.jpg)
![](https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9529395-59-OMNIBUS_F3_PRO_VCC-RAM_Bypass_3.jpg)

（取自这里：https://www.rcgroups.com/forums/showpost.php?p=36217140&postcount=640）

## 其他资源

设置指南：https://nathan.vertile.com/blog/2016/07/07/omnibus-typhoon-miniquad/

RCGroups 讨论帖：http://www.rcgroups.com/forums/showthread.php?t=2711617

## 图片

OMNIBUS AIO F3
![](http://shop.myairbot.com/media/catalog/product/cache/1/image/54b2359dd2430bcca06ee462d488eb40/o/m/omnibusf3-v1.1-3.jpg)
OMNIBUS AIO F3 PRO
![](http://shop.myairbot.com/media/catalog/product/cache/1/image/54b2359dd2430bcca06ee462d488eb40/o/m/omnibusf3-pro-4_1.jpg)
![](https://nathan.vertile.com/assets/images/blog/airbot/180/omnibusf3-pro-top-a0c107c7.png)
![](https://nathan.vertile.com/assets/images/blog/airbot/180/omnibusf3-pro-bottom-c19f8aea.png)
