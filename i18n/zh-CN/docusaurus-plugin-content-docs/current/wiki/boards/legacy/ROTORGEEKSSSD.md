# RG SSD

## 说明

Rotorgeeks SSD 是一款基于 F3 的飞控，采用高规格元件、合理布局并具备良好性价比。

支持原生 DShot、MPU6000（SPI）、5 个 UART、用于计时系统的板载低矮 IR LED、高电流 5 V 电源、最高 6S 电池直连，以及用于 Blackbox 的 MicroSD 卡槽。

## MCU、传感器与功能

### 硬件

- MCU：STM32F303RCT6
- IMU：MPU6000（SPI）
- IMU 中断：有
- 气压计：无
- VCP：有
- 硬件 UART：5 个
- OSD：无
- Blackbox：有，MicroSD 卡
- PPM/UART 共用：UART2
- 电池电压传感器：有，集成
- 集成稳压器：有，最高支持 6S
- 按键：无

### 功能

- 用于计时系统的 IR LED
- 电流传感器：提供输入引脚
- BLHeli 直通：有
- WS2811 LED 灯带：有，带 5 V 供电
- 竞赛应答器：参见 IR LED

## 已知问题

- 电压标度需设为 119。
- 蜂鸣器连接讨论：https://www.rcgroups.com/forums/showpost.php?p=36610466&postcount=14
- iLap 和 Easy Race Lap Timer 的 IR 应答器支持历史讨论：https://github.com/betaflight/betaflight/issues/2131

## 其他资源

[手册](http://rotorgeeks.com/download/RG_SSD_Manual.pdf)

https://www.rcgroups.com/forums/showthread.php?2805794-Rotorgeeks-SSD-F3-flight-controller

## 图片

![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-top.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-bottom.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-top.labels.800-800x600.jpg)
![](http://rotorgeeks.com/image/cache/data/electronics/FC/RG-SSD-bottom.labels.800-800x600.jpg)
