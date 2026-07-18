# KISSFC

_Keep It Simple Stupid（保持简单直接）。_

## 说明

KISSFC 是一款基于 STM32F3 的飞控，具有集成电压调节器、有刷电机驱动器和共享 PPM/UART RX 输入引脚。

## MCU、传感器和功能

### 硬件

- 单片机：STM32F3
- 惯性测量单元：MPU6050
  IMU 中断：是
- 巴罗：没有
  VCP：是的
- 硬件 UART：3
- 软件连续剧：2
- OSD：无
- Blackbox：是，连接到 UART1 的外部 Blackbox 设备（使用 PORT2 连接器或 TX/RX 焊盘）
- PPM/UART 共享：UART2
- 电池电压传感器：是，直接连接，无需接线
- 集成电压调节器：是的，电压限制未知
  有刷电机 MOSFET：是的
- 按钮：1 - DFU

### 功能

电流传感器：是（自 BF 3.1.6 起）

- BlHeli 直通：否（由于缓冲输出）
- WS2811 LED 灯带：是（自 BF 3.1 起）
  应答器：无

### KISS FC 的 Betaflight 附加功能焊盘分配

| KISS FC 焊盘   | MCU 引脚 | Betaflight 功能 |
| -------------- | -------- | --------------- |
| PITCH          | A02      | 电流传感器      |
| PWM5（电机 5） | A06      | LED 灯带        |
| AUX1           | A13      | SoftSerial 1    |
| ROLL           | A15      | SoftSerial 2    |

可以使用 `resource` 命令更改软串行焊盘分配。电流传感器和 LED 灯带分配是硬编码的，目前无法在运行时更改。
默认情况下，焊盘被分配给其原始功能（请参阅焊盘名称），并且需要释放才能分配上表中显示的备用功能之一。

首先释放所有（或部分）资源：

`resource PWM 2 NONE`

`resource PWM 3 NONE`

`resource PWM 4 NONE`

`resource PWM 5 NONE`

为软串行分配资源：

`resource SERIAL_TX 11 A13`

`resource SERIAL_TX 12 A15`

## 硬件设计（如果有）

## 制造商和经销商

[Flyduino.net](https://flyduino.net)

此处可用：http://flyduino.net/KISS-FC-32bit-Flight-Controller-V103_1

## 设计师

_（如果您对此板的设计做出了贡献，请在此处添加您的名字）_

[费多尔指挥官](https://github.com/fedorcomander)

## 维护者

_（如果您帮助测试或贡献此板的代码，请在此处添加您的名字）_

## 相似目标

_（在此处添加特性或功能相似但具有单独目标的链接板描述）_

## 变体

_（在此处添加特性或功能相似的板的链接，但在刷新时使用此目标）_

## 常见问题解答和已知问题

_（添加与此板特别相关的常见问题解答、已知问题和解决方法。请将正在进行的问题链接到相关的 github 问题或拉取请求）_

### 最大陀螺仪更新/PID 控制环频率

KISS FC 具有与 I2C 连接的板载 MPU6050 陀螺仪，因此仅限于 4kHz 陀螺仪更新频率和 4kHz PID 控制器频率。

### ESC 遥测（ESC 传感器）

使用 KISS 24RE ESC 时，您可以通过将 ESC 遥测线连接到 KISS FC 板上的 TLM 焊盘来使用 ESC 遥测。
要在使用 BF 3.2 之前版本时使 ESC 遥测与 TLM 焊盘配合使用，您需要在 KISS FC 板底部焊接桥接 TX3/RX3 焊盘。在 BF 3.2 中不再需要焊桥，使用 CLI 命令 `set esc_sensor_halfduplex = ON` 您可以将 UART 设置为除了同一焊盘上的 TX 和 RX 信号。

如何启用/使用 ESC 遥测：

1. 在 KISS FC 板底部的 TX3/RX3 之间创建焊桥。
2. 将 ESC 遥测线连接至 TLM 焊盘 3.启动 Betaflight 应用程序
3. 打开端口选项卡
4. 在`UART3`上为`Sensor Input`选择`ESC`。
5. 点击保存并重新启动。
6. 打开配置选项卡
7. 启用`VBAT_SENSOR`功能。选择 `ESC Sensor` 为 `Voltage Meter Type`
8. 启用`CURRENT_SENSOR`功能。选择 `ESC Sensor` 作为 `Current Meter Type`。
9. 点击保存并重新启动。

### 电机顺序

KISS 原始固件使用与 Betaflight 不同的另一种电机布局模式。无需再重新焊接电机。 Betaflight 有一个内置混控器，可以将正确的电机分配到正确的焊盘，只需将电机焊接到相应的焊盘（电机 1 -> PWM1、电机 2 -> PWM2，...）。 Betaflight 将完成剩下的工作。

## 其他资源

引脚排列、原理图和 RX 接线：http://nathan.vertile.com/blog/2016/07/29/betaflight-kiss-flight-controller/#pinout

Rcgroups 线程：http://www.rcgroups.com/forums/showthread.php?t=2555204

## 图片

![](https://cdn3.volusion.com/zzpvf.kmsuu/v/vspfiles/photos/elec-fc-kiss103-4.jpg)
