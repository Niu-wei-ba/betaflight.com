# OMNIBUS Fireworks V2

![飞控](https://image.ibb.co/gxmWGd/fireworksv2_1.jpg)

## 描述

Omnibus Fireworks 飞控使用安装在板载减振盒内、通过 SPI 连接的 ICM20608。板载还配有气压计、用于 Betaflight 集成 OSD 的 AB7456 OSD 芯片，以及 16MB 数据 Flash（Blackbox）。

Omnibus Fireworks 支持 3–6S LiPo 直接输入，内置霍尔效应电流传感器并提供板载电源滤波。

## MCU、传感器和功能

### 硬件

| 硬件 | 型号                                                                                           | 备注           |
| ---- | ---------------------------------------------------------------------------------------------- | -------------- |
| MCU  | [STM32F405RGT6](http://www.mouser.com/ds/2/389/DM00037051-492832.pdf)                          |                |
| IMU  | [ICM-20608](https://store.invensense.com/datasheets/invensense/ICM-20608-G-ProductSpec-V1.pdf) |                |
| OSD  | [AB7456](https://www.unmannedtechshop.co.uk/micro-osd-v2-3-ab7456/)                            | 需要实际数据表 |

| 特性       | 是否支持 |
| ---------- | -------- |
| 气压计     | 支持     |
| VCP        | 支持     |
| OSD        | 支持     |
| SD 卡      | 不支持   |
| 板载 Flash | 支持     |
| 电压传感器 | 支持     |
| 电流传感器 | 支持     |
| BOOT 按钮  | 支持     |

## 制造商和经销商

[Airbot](https://store.myairbot.com/omnibusfireworksv2.html)

## 贡献者

[MiddleMan5](https://github.com/MiddleMan5) - 文档贡献

## 变体

### Fireworks V1

自 V1 以来的变化：

- 新增 ESC 输出电容焊盘（约 8.9mm（长）×4.2mm（宽））；Airbot 建议使用 TMJE106K050RCQXC。
- SmartAudio (UART2/GPIO PA2) 和摄像头控制 (GPIO PB9) 的焊盘
- IMU 方向已调整。
- 排线完全收纳于 IMU 保护罩内。
- 为相机和 VTX 添加 8V@1A（降压）开关稳压器和 LC 滤波器
- SmartPort 使用 GPIO PA9 上的 SoftSerial。Airbot 声称这可将 UART 数量增至 5 个。

（仍需补充 Betaflight 对 PA9 上 SoftSerial 的支持信息。）

### Omnibus F4 V6

特点：

- STM32 F405 MCU
- SBUS/PPM 输入（排针）
- 6 个 PWM 输出（1-4 针头和 Sh1.0 插头，5-6 为针头）
- 包括。巴罗 BMP280
- SPI 传感器 MPU6000
- 闪光灯

## 常见问题解答和已知问题

### 进入引导加载程序模式 (DFU) 时遇到问题：

某些设备（例如连接到 SBUS/IBUS 端口的接收机或连接到 UARTS 之一的设备）可以禁止 FC 进入 USB 引导加载程序模式。在这种情况下，Windows/MacOS 将无法检测到 FC。 Windows 将 FC 检测为“未知设备”，MacOS 报告“枚举错误”。如果您看到其中一些错误，请从 FC 上拔下所有设备并独立刷新 FC。

## 电压和电流缩放：

** 从 Betaflight 3.3 开始 **

#### 电压：

- 规模：110
- 分频器：10
- 乘数：1

#### 当前：

- 规模：176
- 偏移量：-18500

## 资源映射

## 其他资源

### 关于电容器的注意事项

Airbot 建议使用 TMJE106K050RCQXC 电容器，但之前型号的图像显示这些焊盘上放置了 107C（100uF 尺寸 C）电容器：
![综合烟花公开测试版](https://image.ibb.co/iSd2wd/OFW_PTV.png)

#### [MiddleMan5](https://github.com/MiddleMan5) 说：

不要让 Airbot 的网站或无数的视频和论坛帖子欺骗了您；电容器确实丢失了。这与[MLCC 日益短缺](https://www.ttiinc.com/content/ttiinc/en/resources/marketeye/categories/passives/me-zogbi-20180302.html) 直接相关，这种短缺已经影响了许多行业，特别是 PCB 制造。这不仅使陶瓷和钽电容器的成本显着提高，而且还使交货时间显着延长。我并不是说 Airbot 欺骗任何人几美元，但我对这个问题有第一手经验；我工作的公司在陶瓷和钽电容器短缺方面存在许多重大问题。

### 设置指南：

![引脚排列顶部](https://image.ibb.co/j9uq9y/Fire_Works_Pinout2_51557_1528920698.jpg)

![底部引脚排列](https://image.ibb.co/jTZwhJ/Fire_Works_Pinout1_70404_1528920698.jpg)

### 尺寸：

体积：41.9 毫米（长）x 46 毫米（宽）x 10 毫米（高）
（其中宽度是从电池输入、通过 USB 端口到板角测量的）

### 提示

#### RX4 上的电流传感器 ADC

（最初为 Omnibus F4 Nano V6 编写的注释，但它也应该适用于 Fireworks V2。）Omnibus F4 Nano V6 的电流传感器源仅限于 ESC 的遥测，可用作 RX4 (UART4_RX) 的输入。然而，MCU 引脚 PA1（即 UART4_RX 的引脚）也能够分配给 ADC 输入。

该引脚仍然可以作为 RX4 访问（作为 4 合 1 ESC 插座 J3 之一或 J3 旁边标记为 RX4 的小焊盘）。

```
resource SERIAL_RX 4 none  # Release PA1 from RX4
resource ADC_CURR a1       # Assign PA1 as ADC input (ADC123_IN1)
current_meter = adc        # Can be done in battery tab
set ibata_scale = 367      # Ditto. Calibration required.
set ibata_offset = 0       # Ditto
```

#### 对于通过 FPC 连接 Rxsr-Fc 的 FrSky Omnibus 版本，请使用这些 CLI 指令：

```
resource SERIAL_TX 11 C08
resource SERIAL_RX 11 C09
feature SOFTSERIAL
feature TELEMETRY
serial 0 0 115200 57600 0 115200
serial 30 64 115200 57600 0 115200
set serialrx_provider = FPORT
set serialrx_inverted = OFF
set serialrx_halfduplex = ON
```
