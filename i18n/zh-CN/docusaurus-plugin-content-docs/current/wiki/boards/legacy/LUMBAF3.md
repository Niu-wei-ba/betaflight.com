# LUMBAF3

基于 F3 和 MPU6000 的经济型基础飞控。

## 说明

LUMBAF3 面向希望获得优秀飞行性能的飞手，提供一块飞控所需的基本功能。

## MCU、传感器与功能

### 硬件

- MCU：STM32F3
- IMU：MPU6000
- USB：STM32 VCP
- 硬件 UART：2 个
- 软件 UART：1 个
- Blackbox：板载 Flash
- PPM/UART 共用：无
- 电池电压传感器：有
- BOOT 按键：有
- ESC/电机输出：5 路（其中 1 路与 LED 共用）
- 无缓冲双向 ESC 输入/输出：有
- 支持 ESC 直通：有
- LED 灯带输出：有
- SBUS 反相器：可配置，UARTx

### 软件

- 固件 target：Betaflight

### 功能

- 仅 PPM：有
- 蜂鸣器：有
- 遥测端口：有
- Spektrum 卫星接收机：有
- BLHeli 直通：有
- WS2811 LED 灯带：有

## 制造商与经销商

[EMCEE TECHNOLOGIES](http://www.emceetech.com)

## 设计与维护

Muzakkir（miskol）

## 其他资源

![LUMBAF3 接线图](https://www.dropbox.com/s/u5hwf2yf6vngtek/LumbaF3%20DiagramV2.jpg)

## 图片

![LUMBAF3](https://instagram.fkul8-1.fna.fbcdn.net/t51.2885-15/e35/18013960_2105744329565129_7425440925079306240_n.jpg)
