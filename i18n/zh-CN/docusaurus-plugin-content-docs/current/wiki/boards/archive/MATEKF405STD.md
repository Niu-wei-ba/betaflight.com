---
id: MATEKF405STD
---

# MATEKSYS F405-STD

## 描述

F405+ICM20602，带 Betaflight OSD 和 SD 卡插槽

## MCU、传感器和功能

### 硬件

- MCU：168MHz STM32F405RGT6
- IMU：32K ICM20602 陀螺仪/加速度计（SPI）
- 气压计：BMP280（I2C）
- OSD：带有 AT7456E 芯片的 BetaFlight OSD
- Blackbox：MicroSD 卡插槽（SD/SDHC）
- VCP、UART1、UART2、UART3、UART4、UART5
- 内置 SBUS 输入逆变器 (UART2-RX)
- PPM/UART 共享：UART2-RX
- TX2、S5 或 S6 上的 SoftSerial 可选
- S6 或 DAC 上的相机控制可选
- 支持 SmartAudio 和 Tramp VTX 协议
- 电池电压传感器：1:10
- 电流传感器：无（FCHUB-6S、FCHUB-VTX、FCHUB-W 选项）
- BEC 5V：无（FCHUB-6S、FCHUB-VTX、FCHUB-W 选项）
- LDO 3.3V：最大 300mA
- I2C1 SDA 和 SCL：支持
- WS2812 LED 灯带：支持
- 蜂鸣器：支持
- RSSI：支持

### 特点

- 3 个 LED：用于飞控状态（蓝色、红色）和 3.3V 指示（红色）
- 6 路 PWM/DShot 输出，互不冲突
- 2 路 2812 LED 输出（可选）
- 5 个 UART
- 1 组 5V/G/S1/S2/S3/S4 焊盘，用于 4 合 1 ESC 信号/GND
- 4 对角焊盘，用于 ESC 信号/GND 连接（兼容 DShot）
- 1 对 I2C1 焊盘
- 1 个侧按式 BOOT 按钮，用于进入 DFU 模式
- 1 个底部安装的 16 针 FFC 插槽，用于连接 FCHUB-6S、FCHUB-VTX 或 FCHUB-W
- 36×36mm PCB，安装孔距 30.5mm

随附 2 根 0.5mm×16 针、长 5cm 的柔性扁平电缆，以及 4 个 M3 防振支柱。

## 制造商和经销商

- Matek Systems
  - [F405-STD（新）](http://www.mateksys.com/?portfolio=f405-std)
  - [F405-CTR](http://www.mateksys.com/?portfolio=f405-ctr)
- 停产：
  - [F405-OSD](http://www.mateksys.com/?portfolio=f405-osd)
  - [F405-AIO](http://www.mateksys.com/?portfolio=f405-aio)
- BANGGOOD
  - [F405-STD（新）](https://www.banggood.com/Matek-F405-OSD-BetaFlight-STM32F405-Flight-Controller-Built-in-OSD-Inverter-for-RC-Multirotor-FPV-Racing-Drone-p-1141282.html)
  - [F405-CTR](http://www.banggood.com/Matek-Systems-BetaFlight-F405-AIO-STM32F405-Flight-Controller-Built-in-PDB-5V2A-9V2A-Dual-BEC-p-1165338.html)

## 设计师

Matek Systems（www.mateksys.com）

## 维护者

- 硬件：Matek Systems

## 提示

- 必须使用随附的橡胶防振支柱，以避免振动问题。
- `2812LED_Strip` 默认与 `I2C1_SCL` 焊盘复用；请在 LED 灯带和气压计功能之间二选一。
- 如果同时使用气压计，可将 `2812LED` 重新映射到 `S7 (PB8)`。
- 在气压计上覆盖一小块海绵，以减小气流影响。

## 常见问题解答和已知问题

设置指南（Matek F405-STD）：http://www.mateksys.com/?portfolio=f405-std

RCGroups 讨论帖（Matek F405）：https://www.rcgroups.com/forums/showthread.php?2889298-MATEKSYS-Flight-Controller-F405-OSD-32K-Gyro-5xUARTs-SD-Slot

Matek 飞控 Facebook 群组：https://www.facebook.com/groups/1882519175321708/
