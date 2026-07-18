# Podium F4

![](https://github.com/ThrustUAV/betaflight/blob/master/images/Podium%20Whited%20Top_25%25.png)

设计精良的竞速飞控。

## 说明

该飞控面向性能设计，集成 12 V / 5 V 稳压配电板（PDB）。只需接通电源即可使用。

## MCU、传感器与特性

### 硬件

- MCU：STM32F405RTG6
- IMU：ICM-20608-G（SPI）
- IMU 中断：支持
- 气压计：不支持
- VCP：支持
- 硬件 UART：3 个
- OSD：不支持
- Blackbox：可选
- PPM/UART 共用：UART6
- 电池电压传感器：支持，板载电压传感器
- 集成稳压器：支持
- 有刷电机 MOSFET：不支持
- 按钮：1 个，用于 DFU

## 特性

- Micro USB，用于 STMicro VCP
- 串行或 PPM 输入
- 最多支持 4 个 ESC
- 触觉按钮，用于进入 STM Bootloader
- 内置 SmartPort 反相器，UART3
- 内置 SBUS 反相器，UART6
- 支持 BLHeli passthrough
- 支持 WS2812 LED 灯带
- 支持 12 V 与 5 V 输出

## 制造商与经销商

该板仍在开发中，可在 [Thrust-UAV](https://Thrust-uav.com) 预订。

## 硬件

该硬件当前为闭源；先前迭代版本未来可能开源。

## 图片

![Podium 顶面](https://github.com/ThrustUAV/betaflight/blob/master/images/Podium%20Whited%20Top.png)

![Podium 底面](https://github.com/ThrustUAV/betaflight/blob/master/images/Podium%20Whited%20Bottom.png)
