# MotoLab Tempest F4

![](https://static.rcgroups.net/forums/attachments/4/5/2/0/2/8/a10242740-88-Angle.jpg)

## 描述

一块集成 PDB、OSD、MicroSD 和电流传感器的 F4 飞控。

## 规格：

- 采用 168MHz STM32F4 的 Tempest 版本
- 100A 以上 PDB，配备 200A 电机电流传感器
- SPI 总线上的 MPU6000 陀螺仪/加速度计
- Betaflight OSD
- 支持 DMA 的 Micro SD 插槽
- 最多 5 个 UART，另加 USB
- 多达 6 个 DShot 电机输出
- 用于 SBUS 和 S.Port 的串行反相器
- 兼容 TBS SmartAudio 和 IRC Tramp 串行协议
- 1.5A 5V 短路保护稳压器，带 LC 滤波 5V，用于 OSD 和摄像头
- 使用定制线缆，可插接连接 VTX 和相机
- 蜂鸣器和串行 LED 输出
- 38×40mm 板尺寸，30.5mm 安装孔距
- 随附可直接连接到 Unify Pro HV VTX 和 HS1177 摄像机的电缆
- 兼容 2S 至 6S LiPo
- 可靠的通孔接线连接，可避免焊盘脱落
- 所有接线连接均可从顶部焊接

Tempest F4 使用新的 Betaflight 板级目标 `MLTEMPF4`。
随附电缆可直接插入 HS1177 摄像机和 Unify Pro HV VTX。

注意：在上传字体前，VTX 屏幕会显示满屏字母“V”。请在 Configurator 的 VTX 选项卡中点击“Upload Font”，然后选择字体文件。上传期间必须由 LiPo 为 VTX 供电。

建议先对导线预上锡并修剪长度，从电路板底面穿入后在顶面焊接。

链接到线程：
https://www.rcgroups.com/forums/showthread.php?2715556-MotoLab-Typhoon-F4-Flight-Controller-and-VTX/page49#post38010951

### 来源

- [RocketCityFPV](http://www.rocketcityfpv.com/MotoLab-Tempest-F4-Flight-Controller-FC_p_111.html)
- [DefianceRC](https://www.defiancerc.com/collections/flight-controller/products/motolab-tempest-f4-flight-controller)
- [Multicopter Builders](https://multicopterbuilders.com/collections/flight-controller/products/motolab-tempest-f4-flight-controller-fc)

### 固件

- 板目标：MLTEMPF4

MLTEMPF4 目标包含在 Betaflight 3.2 及更高版本中。

### 故障排除和讨论主题

https://www.rcgroups.com/forums/showthread.php?2537379-MotoLab-Board-Setup-and-Troubleshooting

### 引脚图

![](https://static.rcgroups.net/forums/attachments/4/5/2/0/2/8/a14563873-224-TempestF4-PinOut.jpg)

## 制造商和经销商

制造商：MotoLab。

## 设计师

Moto Moto

## 维护者

Moto Moto
_（如果您帮助测试或贡献此板的代码，请在此处添加您的名字）_

## 相似目标

[MLTYPHF4](MLTYPHF4)
