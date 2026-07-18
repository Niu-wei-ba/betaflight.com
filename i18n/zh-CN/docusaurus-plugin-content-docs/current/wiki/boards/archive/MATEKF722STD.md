# MATEKSYS F722-STD

## 说明

STM32F722RET6、ICM20602、BMP280、Betaflight OSD、SD 卡插槽、VCP 加 5 个 UART、6 路 PWM / DShot 输出。

## MCU、传感器与特性

### 硬件

- MCU：216 MHz STM32F722RET6
- IMU：32 kHz ICM20602 陀螺仪/加速度计，SPI
- 气压计：BMP280，I2C
- OSD：Betaflight OSD，AT7456E 芯片
- Blackbox：MicroSD 卡插槽，支持 SD/SDHC
- VCP、UART1、UART2、UART3、UART4、UART5
- PPM/UART 共用：UART2 RX
- 电池电压传感器：1:10，最高支持 36.3 V
- 电流传感器：不支持，可选 FCHUB-6S、FCHUB-VTX
- 5 V BEC：不支持，可选 FCHUB-6S、FCHUB-VTX
- 3.3 V LDO：最高 300 mA
- I2C1 SDA 与 SCL：支持
- 相机控制：支持
- DAC：支持
- WS2812 LED 灯带：支持
- 蜂鸣器：支持
- RSSI：支持

### 特性

- 3 个 LED：FC 状态指示灯，蓝色和红色；3.3 V 指示灯，红色
- 7 路无冲突 PWM / DShot 输出
- 5 个 UART
- 1 组 G/S1/S2/S3/S4 焊盘，用于 4 合 1 ESC 信号/GND
- 1 个 I2C1
- 4 对角落焊盘，用于 ESC 信号/GND 连接，兼容 DShot
- 1 个侧按式按钮，用于进入 BOOT/DFU 模式
- 1 个底部安装的 16 针 FFC 插槽，用于连接 FCHUB-6S 或 FCHUB-VTX
- 36 x 36 mm PCB，安装孔距为 30.5 mm

随附两条 0.5 mm x 16 针、5 cm 柔性扁平电缆和四个 M3 减振支柱。

## 制造商与经销商

- Matek Systems
  - [F722-STD（新版）](http://www.mateksys.com/?portfolio=f722-std)

## 设计者

Matek Systems，www.mateksys.com

## 维护者

- 硬件：Matek Systems

## 提示

- 必须使用随附的橡胶减振支柱，以避免振动问题。

## 常见问题与已知问题

设置指南：Matek F722-STD：http://www.mateksys.com/?portfolio=f722-std#tab-id-3

RC Groups 讨论帖：https://www.rcgroups.com/forums/showthread.php?2986161-Matek-Flight-Controller-F722-STD
