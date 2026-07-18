# 概述

Fury F3 飞控由希望获得更好飞控的四轴飞行器飞手和装机玩家从零设计。设计时综合了其他飞控硬件中受到认可的特性，并将其整合为一块便于安装和使用的板卡。

使用 Fury F3 飞控需要具备良好的焊接技能。若焊接经验不足，建议寻找当地用户协助装机。MultiGP 是寻找同好四轴飞行器装机玩家的合适渠道，更多信息请访问 MultiGP.com。

**购买链接：http://www.2dogrc.com/furyf3-board.html**

**RCGroups 讨论帖：https://www.rcgroups.com/forums/showthread.php?t=2628430**

**Facebook 群组：https://www.facebook.com/groups/1391468950869052/**

**网站：http://www.furyflightcontrol.com/**

# 板卡特性

- F3 处理器，可使用较高的循环频率，并提供 3 路专用 UART 输出，用于 GPS、OSD、遥测等设备。
- MPU6000 陀螺仪：在本文档编写时受到许多 FPV 飞手青睐。其噪声底较低、可靠性较高，因此被用于本飞控。
- 板卡边缘配备大焊盘。
- USB 连接器。
- Spektrum 接收机连接器端口；使用 Spektrum 硬件时建议增加接头，但并非必需。
- 用于 I2C 连接的 3.3 V 输出。
- 提供蜂鸣器连接。
- 提供 LED 连接。
- 提供电流传感器连接。

# 板卡规格

- 5 V 输入。
- 标准 36 x 36 板卡（30.5 x 30.5 安装孔距）。
- STM32F303CCT6：32 位、72 MHz、256 K 处理器（支持浮点运算，具有丰富 I/O）。
- 3 路硬件串行端口。
- USB VCP（可与串行端口同时使用）。
- 4 路 PWM 输出（专用于四轴飞行器）。
- 为外部设备/Spektrum 提供专用 3.3 V 稳压器（最高 500 mA）。
- 专用 PPM/SerialRX 输入排针。
- 专用 SPEKTRUM 适配器端口。
- 专用 I2C 排针。
- MPU6000 MEMS 陀螺仪/加速度计。与 9250 或 6500 相比，6000 陀螺仪对噪声不那么敏感；通常无需对控制器进行软安装，并被视为“黄金标准”。
- SPI 陀螺仪连接，通信速度高于多数其他 F3 板采用的 SP。
- 可选 MS561 气压计，位于板底，便于用泡棉覆盖隔离。
- 板载 MicroSD 卡支持，可用于 Blackbox 数据记录，便于获取理想调参结果。
- 电压监测（内置分压器）。
- 电流监测（配合外置电流传感器）。
- RSSI 监测（若所用接收机提供输出）。
- 蜂鸣器连接器。
- LED 灯带连接器。
- SWD 端口。
- 可直接安装 Pololu 开关稳压器，支持最高 6S LiPo 供电。
- 经过考量、便于装机的布局。
- 边缘引出针脚，可构建低剖面机体，也更适合直接焊接。

# 手册

https://quadquestions.com/uploads/furyf3manual.pdf

# 板卡布局

![](http://i.imgur.com/MJ3Oibe.jpg)

![](http://i.imgur.com/nale6a2.jpg)
