# KroozX

## 说明

KroozX 套装将飞控和 4 合 1 Blheli_S（BB2）ESC 板组合在一起，具备板载 OSD、双视频通道切换、MicroSD 卡槽、两路大功率 BEC、用于清晰图传的 LC 滤波器等功能。其采用高性能 STM32F4 处理器和两颗惯性传感器：MPU6000（SPI 总线）与 ICM20608（I2C 总线），可构建响应迅速、具备冗余 IMU 的四轴飞行器，提升飞行安全性。合理的接线和电路设计可降低陀螺仪和 GPS 噪声，从而改善飞行性能。可选板载 HM-TRP 或 HC-12（两种不同板卡版本）收发器，支持无线设置和飞行中控制。

## MCU、传感器和功能

### 硬件

- MCU：STM32F4RGT6
- IMU：MPU6000（SPI 总线）、ICM20608（I2C 总线）
- 气压计：MS5611
- VCP：支持
- 硬件 UART：5 个（RX6、带板载反相器的 RX1/TX1）
- PWM 输出：10 路
- OSD：MAX7456，支持 2 路视频通道切换
- 黑匣子：MicroSD 卡槽（SD/SDHC，最大 64 GB）
- PPM/SBUS：RX6，带板载反相器
- 无线：可选板载 HM-TRP 或 HC-12 收发器
- 电池电压传感器：支持，最高 6S 输入
- 电流传感器：支持
- 集成稳压器：5 V 2000 mA、10 V 2000 mA，带 LC 滤波器
- 按钮：无（接通板卡电源并插入 USB 后进入 STM DFU Bootloader）
- 蜂鸣器驱动：支持
- RSSI 模拟/PWM 接口：支持
- SWD 接口：支持（SWIO、SWCLK、RST 引脚）

### 功能

- STM32F4 飞控与 4 合 1 20 A Blheli_S（BB2）ESC 堆叠套装
- 双陀螺仪传感器
- 两路大功率集成 BEC
- 双通道视频切换
- 最高 6S 输入
- 尺寸：85×28×20 mm；固定孔距 32×18 mm
- 支持 DShot

## 制造商和经销商

softsr（softsr@yahoo.de）

## 设计者

softsr（softsr@yahoo.de）

## 维护者

softsr

mikeller

# 图片

- KroozX

![](https://farm1.staticflickr.com/276/31024530144_e479538825_h.jpg)
