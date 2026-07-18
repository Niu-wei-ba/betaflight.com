# Flytower F4 V2

## 描述

Exuav（https://www.facebook.com/EXUAV/）出品的一体式塔状飞控，集成 FC（F4）、VTX（25 mW-400 mW）、Betaflight OSD、PDB、40A DShot ESC 和 SD 卡 Blackbox。

## MCU、传感器和功能

### 硬件

- MCU：STM32F405
- IMU：ICM-20608
- IMU 中断：SPI
- VCP：支持
- 硬件 UART：1 个
- OSD：支持，Betaflight OSD（STM32 在 DMA 模式下通过 SPI 控制 OSD 芯片）
- Blackbox：支持 32 GB SD 卡
- PPM/UART 复用：UART1、UART3、UART6、2 路软件串口
- 电池电压传感器：支持
- 集成稳压器：支持
- 按键：F4 Boot 模式
- 尺寸：36 x 36 mm，30.5 mm 安装孔距

### 功能

★ 实用：连接器易于接入  
★ 可配置：可选择使用的连接器  
★ 可堆叠：可安装四合一 ESC  
★ 紧凑：仅 36 x 36 x 15 mm（加装风冷散热片后最大 36 x 36 x 20 mm）  
★ 重量：26.3 g，双层堆叠板  
★ 专业：对称整洁，易于安装在竞速四轴上  
★ 36 x 36 mm 板卡，30.5 mm 安装孔距  
★ STM32 F405 MCU，支持 Betaflight 固件（自 v3.1 起）  
★ SD 卡槽  
★ ICM-20608 加速度计和陀螺仪通过 SPI 总线连接  
★ STM32 通过 SPI 的 DMA 模式控制 OSD 芯片，CPU 占用更低、刷新更快  
★ Micro USB 插座  
★ 1 个 6 针 JST-SH 插座（PPM、PWM、Serial RX、GPIO、ADC、3V、5V、GND）  
★ 板载引脚可方便连接四合一 ESC 和 PDB 板  
★ 内置 40 通道 VTX，25/400 mW 可调图传功率  
★ 可直接通过 OSD 调整 VTX 功率和频率  
★ 1 个 4 针 JST-SH 插座，用于蜂鸣器和 WS2811 RGB LED  
★ 1 个 4 针 JST-SH 插座，用于视频和音频传输  
★ 1 个 IPX 插座，便于连接外接天线  
★ 4 组 3 焊盘电机输出  
★ 1 组 2 焊盘电池输入，便于焊接

## 制造商和经销商

www.exuavrc.com  
http://www.banggood.com/F4-Tower-Flight-Controller-Build-In-Accelerometer-Gyroscope-with-PDB-Buzzer-For-RC-Racer-p-1108717.html

## 设计者

Exuav

## 维护者

Exuav  
Francisco Perea（fncisco）

## 相似目标

[FishDroneF4](FISHDRONEF4)

## 变体

差异：

- 四合一 ESC
- 提供更多 VTX 调整选项。

## 常见问题与已知问题

无。

## 其他资源

设置指南：  
https://www.dropbox.com/s/0jjxp2tivvswze1/Fly%20FishTower%20F4%20Instructions%20V1.2.pdf?dl=0

RCGroups 讨论帖：

https://www.rcgroups.com/forums/showthread.php?2813391-Flytower-F4-Flight-Controller-25-200-400mW-Switchable-FPV-VTX-OSD-DShot-40A-4in1-ESC

## 图片

http://www.banggood.com/F4-Tower-Flight-Controller-Build-In-Accelerometer-Gyroscope-with-PDB-Buzzer-For-RC-Racer-p-1108717.html?p=3T212374947582016110
