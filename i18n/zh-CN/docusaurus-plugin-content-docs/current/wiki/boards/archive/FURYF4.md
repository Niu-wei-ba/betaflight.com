# FuryF4

FuryF4 是 Fury 系列飞控的后续型号，基于 STM32F4 MCU，采用便于接线的简洁布局。通过 SPI 连接 MPU-6000 或 ICM-20689 陀螺仪，可实现高速通信。飞行数据可记录到板载数据闪存或 SD 卡插槽。

**RCGroups 讨论：[https://www.rcgroups.com/forums/showthread.php?t=2628430](https://www.rcgroups.com/forums/showthread.php?t=2628430)**

# **板卡功能**

- F4 处理器，支持高速控制循环，并提供 3 个独立 UART 输出，可连接 GPS、OSD、遥测等设备
- MPU6000 或 ICM20689 陀螺仪。MPU-6000 噪声低、可靠性高；ICM20689 是 Invensense 为替代 MPU-6000 设计的新型号
- 板边大焊盘
- USB 接口
- Spektrum 接收机接口（使用 Spektrum 硬件时可直接连接，也可选配额外连接器）
- 3V3 输出，可连接 I2C 设备
- 蜂鸣器接口
- LED 接口
- 电流传感器接口

# **板卡规格**

- 5 V 输入或板载 5 V、2 A 开关稳压器
- 标准 36×36 mm 板卡（30.5×30.5 mm 安装孔距）
- STM32F4：32 位、168 MHz、1 MB，支持浮点运算和丰富 I/O
- 3 个硬件串口
- USB VCP（可与串口同时使用）
- 4 路 PWM 输出（专用于四轴）
- 3.3 V 稳压器输出，可为外部设备/Spektrum 供电（最高 500 mA）
- 独立 PPM/SerialRX 输入排针
- 独立 SPEKTRUM 适配器接口
- 独立 I2C 排针
- MPU6000 或 ICM20689 MEMS 陀螺仪/加速度计；相较 MPU9250/6500 抗噪性更好，通常无需软安装
- SPI 陀螺仪接口，通信速度高于传统串行协议
- 板底可选 MS561 气压计，可用泡棉隔离
- 板载 MicroSD 卡，便于黑匣子记录和调参
- 板载 16 MB 闪存，用于黑匣子记录
- 电压监测（内置分压器）
- 电流监测（需外部电流传感器）
- RSSI 监测（取决于接收机是否提供输出）
- 蜂鸣器接口
- LED 灯带接口
- SWD 接口
- 可直接安装 Pololu 开关稳压器，未使用板载 5 V 稳压器时支持最高 6S 锂电池
- 便于装配的合理布局
- 板边引出焊盘，适合低剖面安装和直接焊接

# **板卡布局**

![](http://i.imgur.com/oTEpDBK.jpg)

![](http://i.imgur.com/25HUK2C.jpg)
