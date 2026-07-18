# KakuteF4-AIO

## 简介

Holybro Kakute F4 All-In-One 飞控将飞行控制器（FC）、电源分配板（PDB）和 OSD 集成在一块板上，便于构建多旋翼机。其布局简洁，方便连接其他部件并保持整机走线整齐。

![](https://github.com/jamming/image/blob/master/kakuteF4-package1.jpg?raw=true)

## 功能

- 支持 Betaflight 和 Cleanflight。
- 支持 Betaflight OSD。可使用遥控器摇杆和眼镜修改 PID、常用配置参数、图传频道和发射功率。
- 内置软安装。板载“陀螺仪”芯片安装在隔振泡棉上，无需再对整块飞控进行软安装。
- 高性能、低噪声、高灵敏度 IMU：ICM20689，内置 6 轴陀螺仪和加速度计，最高可运行在 32 kHz。
- 2 oz 铜厚 PCB，最大持续电流可达 120 A。
- 专用 Bootloader 按钮，便于刷写固件。
- 低剖面设计，适配紧凑机架。
- 输入电压 7-42 V；可通过 “BAT” 焊盘直接由最高 6S 飞行电池供电。
- 自动电压监测。Kakute F4 AIO 直接从电池主电源线监测电压，无需单独连接 vBat 线。
- 板载稳压器提供经过滤波的低噪声视频供电：5 V 输出最高 1.5 A，3.3 V 输出最高 200 mA，可为接收机、VTX、FPV 摄像头或 LED 灯带供电。
- 支持 BLHeli 直通，便于升级和配置 ESC。

## 图片

![顶视图](https://github.com/jamming/image/blob/master/kakuteF4aio-top.jpg?raw=true)

![底视图](https://github.com/jamming/image/blob/master/kakuteF4aio-bottom.jpg?raw=true)

![尺寸图](https://github.com/jamming/image/blob/master/kakuteF4-side.jpg?raw=true)

![包装 1](https://github.com/jamming/image/blob/master/kakuteF4-package2.jpg?raw=true)
![包装 2](https://github.com/jamming/image/blob/master/kakuteF4-package3.jpg?raw=true)

## 规格

- MCU：STM32F405RGT6，32 位处理器
- IMU：ICM20689（SPI）
- 气压计：BMP280（仅 V2 支持）
- USB VCP 驱动（所有 UART 可同时使用，USB 不占用 UART）
- 硬件 UART：V1 为 UART1/3/6；V2 为 UART1/3/4/5/6
- 128 Mbit Dataflash 芯片，用于黑匣子记录
- 尺寸：35×43×6 mm（高度包含 USB 接口）
- 安装孔：标准 30.5 mm 正方形孔距（孔中心距）
- 重量：7 g

## 引脚定义图

![引脚定义图](https://github.com/jamming/image/blob/master/kakuteF4-size.jpg?raw=true)

```
BUZ- : 压电蜂鸣器负极

BUZ+ : 压电蜂鸣器正极

LED       : WS2182 可寻址 LED 信号线

SmartPort : FrSky SmartPort 遥测

R3, T3    : UART3 RX（带 SBUS 反相器）和 TX

R6, T6    : UART6 RX 和 TX

RSSI      : 模拟 RSSI 输入（0-3.3 V）

3V3       : 3.3 V 输出（最大 200 mA）

5V        : 5 V 输出（最大 1.5 A）

M1 至 M6 : 电机信号输出

VO        : 至图传的视频输出

VI        : 来自 FPV 摄像头的视频输入

Boot      : Bootloader 按钮

G         : 地

B+        : 电池正极电压（2S-6S）

+         : 主电池电源线正极

-         : 主电池电源线负极
```

## 目标代码

KAKUTEF4

## 硬件设计（如有）

硬件设计目前未开源。

## 制造商和经销商

www.holybro.com（制造商和设计者）

经销商：

www.hobbyking.com；

www.banggood.com；

www.getfpv.com；

www.unmannedtechshop.co.uk；

www.gearbest.com；

## 常见问题与已知问题

“Board Align” 功能说明：

[https://www.youtube.com/watch?v=jSzWRnAqsSY](https://www.youtube.com/watch?v=jSzWRnAqsSY)

如何使用万用表检查连通性：

[https://www.youtube.com/watch?v=MZ8YxBMQI5Q](https://www.youtube.com/watch?v=MZ8YxBMQI5Q)

Betaflight 驱动程序说明（包括安装方法）：

[https://www.youtube.com/watch?v=m4ygG6Y5zXI](https://www.youtube.com/watch?v=m4ygG6Y5zXI)

### SmartPort

Kakute F4 的双向反相器使用 MOSFET 设计。工厂已使用 XSR 接收机和 X9D 对每块板的 SmartPort 进行测试；但某些特殊 XSR 接收机的输入电容高于正常值，可能使 SmartPort 波形失真，导致低电平期间波形无法降至 0 V。见下图。

![](https://github.com/jamming/image/blob/master/waveform.png?raw=true)

将 KakuteF4 上一颗电阻从 4.53K 更换为 2.2K 后，波形会恢复正常，这可能是原因所在。

![](https://github.com/jamming/image/blob/master/smartport.png?raw=true)
![](https://github.com/jamming/image/blob/master/waveform2.png?raw=true)

若 SmartPort 工作不稳定，请尝试此方法。若没有 SMD 电阻，也可使用一颗 5.1K 直插电阻，将 SmartPort 信号旁路至 GND，效果相同。

后续批次产品已将该电阻从 4.53K 更换为 2.2K。

## 其他资源

手册：

[http://www.holybro.com/manual/Holybro_Kakute_F4_AIO_Manual_v1.4.pdf](http://www.holybro.com/manual/Holybro_Kakute_F4_AIO_Manual_v1.4.pdf)

讨论：

[https://www.rcgroups.com/forums/showthread.php?2904475-Holybro-Kakute-F4-AIO-Flight-Controller](https://www.rcgroups.com/forums/showthread.php?2904475-Holybro-Kakute-F4-AIO-Flight-Controller)

联系我们：

- 电子邮件：productservice@holybro.com
- Facebook 页面：Holybro
- Facebook 群组：Holybro Hobby Official Group
