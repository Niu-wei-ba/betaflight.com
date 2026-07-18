# MotoLab Typhoon F4

![](http://gdurl.com/GGSY)
![](http://gdurl.com/9Idm)
![](https://static.rcgroups.net/forums/attachments/4/5/2/0/2/8/a10021635-46-IMG_20170507_155528.jpg)

[MotoLab Typhoon F4 与 VTX 视频](https://www.youtube.com/watch?v=h0VcUPcgi8A)

## 描述

由两块板组成的完整 FC、PDB、VTX、OSD 和 MicroSD 系统，采用 F4 CPU，所需接线极少。

## 硬件

### Typhoon F4 飞控

- 采用 168MHz STM32F4 的 Tempest 版本
- 100A 以上 PDB，配备 200A 电机电流传感器
- SPI 总线上的 MPU6000 陀螺仪/加速度计
- 最多 4 个 UART，另加 USB
- 多达 6 个 DShot 电机输出
- 用于 SBUS 和 S.Port 的串行反相器
- 1.5A 5V 稳压器，带 LC 滤波 5V，用于 VTX 和摄像头
- 与 VTX 板的插接式连接
- 38×40mm 板尺寸，30.5mm 安装孔距
- 兼容 2S 至 6S LiPo

- Typhoon F4 使用新的 Betaflight 板级目标 `MLTYPHF4`。
- F4 板直接与 VTX 板配对，两者之间无需外部接线。

### Typhoon VTX

- 25/200/500mW 可切换的 40 频道图传发射器
- Betaflight OSD
- Blackbox 的 MicroSD 插槽
- 使用定制线缆，可插接连接相机和天线
- 用于相机操纵杆的直通连接器
- 38×38mm 板尺寸，30.5mm 安装孔距

- Typhoon VTX 是独立的视频系统，由 Typhoon F4 提供经滤波的 5V 电源。视频信号与 PDB 配电隔离，可获得更干净的画面。

- VTX 板直接与 F4 控制器板配对，两者之间无需外部接线。

- 注意：VTX 板不由 USB 输入供电。未连接天线时，不得使用 LiPo 为该板供电。

- 在上传字体前，VTX 屏幕会显示满屏字母“V”。请在 Configurator 的 VTX 选项卡中点击“Upload Font”，然后选择字体文件。上传期间必须由 LiPo 为 VTX 供电。

可通过遥控器的 Betaflight OSD 功能控制 VTX。需要在 Betaflight App 的 Font Manager 中上传字体；其余控制仅为功率选择开关，设置如下：

- SW1 ON、SW2 ON：25mW
- SW1 OFF、SW2 ON：200mW
- SW1 OFF、SW2 OFF：500mW

使用 USB 供电时（VTX 未上电），也可在 Configurator 中通过 CLI 命令 `vtx_band` 和 `vtx_channel` 配置 VTX。

CLI 中 `vtx_band` 的取值（1–5）为：

- 1：Boscam A
- 2：Boscam B
- 3：Boscam E
- 4：Fatshark
- 5：Raceband

频道 1–8 对应 `vtx_channel` 值 1–8。

### 来源

- [RocketCityFPV](http://www.rocketcityfpv.com/Motolab-TyphoonF4-Flight-Controller_p_77.html)
- [DefianceRC](https://www.defiancerc.com/collections/flight-controller/products/motolab-typhoon-f4-flight-controller-vtx-combo)
- [65Drones](https://www.65drones.com/products/motolab-typhoon-f4-flight-controller-and-typhoon-vtx)
- [Multicopter Builders](https://multicopterbuilders.com/products/motolab-tempest-f4-flight-controller-fc)

### 固件

- 固件目标：MLTYPHF4

MLTYPHF4 目标包含在 Betaflight 3.2 及更高版本中。

### 引脚排列

https://www.rcgroups.com/forums/showatt.php?attachmentid=10039116&d=1494799003

## 制造商和经销商

制造商：MotoLab。

## 设计师

Moto Moto

## 维护者

Moto Moto
_（如果您帮助测试或贡献此板的代码，请在此处添加您的名字）_

## 相似目标

[MotoLab Tempest F4](MLTEMPF4)

## 常见问题解答和已知问题

#### 我无法在 DFU 模式下正确连接！

该板可能未显示为正确的设备有两个原因：

1. 固件损坏或加载了错误的文件。红色 LED 应在启动时闪烁，如果固件正在运行，则如果板从水平位置旋转，则红色 LED 会闪烁。如果没有，请使用引导引脚强制进入 DFU 模式，并启用“无重启序列”重新刷新。

2. 安装了错误的驱动程序。 Zadig 应该仅用于安装 DFU 模式驱动程序。在 DFU 模式下连接引导引脚，然后安装帖子 #1 中列出的驱动程序。默认 Windows 驱动程序应适用于 VCP 模式。

#### 如何配置 VTX，例如切换频道？

摇杆命令显示在 OSD 启动画面：中油门、偏航左、横滚居中、俯仰上。

#### Typhoon 可堆叠 VTX 的功率、频段和频道能否通过遥控器或护目镜调整？

Typhoon 的频段和频道可通过 Betaflight OSD 或 CLI 选择。功率由开关选择；虽然 OSD 中也有功率设置，但它影响的是射频前置放大器增益，而不是功率放大器增益。

Typhoon FC 专门用于与 VTX 配合使用。它无法轻松连接到其他 VTX。 Tempest F4 专为与 Unify Pro 配合使用而设计，并配有定制电缆。 Tempest 的 FC 板上也有 OSD 和 SD 卡。如果您想使用 Unify，请购买 Tempest F4。

## 其他资源

设置指南：
请参阅该主题的帖子 #2：
https://www.rcgroups.com/forums/showthread.php?2537379-MotoLab-Board-Setup-and-Troubleshooting
此线程中的更多内容：
https://www.rcgroups.com/forums/showthread.php?2715556-MotoLab-Flight-Controllers

主板卡在“未知设备”模式？查看这篇文章：
https://www.rcgroups.com/forums/showpost.php?p=37567682&postcount=3053

Joshua Bardwell 视频[评测](https://www.youtube.com/watch?v=dD7Hla63Xho)
