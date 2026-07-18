# BeeRotor F4

![BeeRotor F4 正面](/img/boards/beerotorf4/beerotorf4_front.jpg)

![BeeRotor F4 背面](/img/boards/beerotorf4/beerotorf4_back.jpg)

## 描述

集成 Betaflight OSD 的 F4 飞控板。

## MCU、传感器和功能

### 硬件

- MCU：STM32F405
- IMU：MPU6050A（SPI）
- IMU 中断：支持
- 气压计：BMP280（I2C）
- VCP：支持
- 硬件 UART：UART1、UART2、UART3
- OSD：Betaflight OSD
- Blackbox：串口 / SD 卡
- PPM/UART 复用：UART2
- 电池电压传感器：支持
- 集成稳压器：无
- 有刷电机 MOSFET：无
- 按键：BOOT
- PWM / DShot 输出：8 路（最多 6 路可用于 DShot）
- LED 灯带输出
- 红外发射器输出
- UART2（SBus RX）和 UART3（SmartPort 遥测）带可切换反相器
- SPI 接口

### 功能

- 8 路电机输出（其中 6 路可用于 DShot）
- 集成 Betaflight OSD
- 将 Blackbox 日志写入 SD 卡

## 制造商和经销商

RCTimer：http://rctimer.com/product-1730.html

## 设计者

RCTimer：http://rctimer.com/

## 维护者

- 硬件：Eric Liang
- 软件：Michael Keller

## 常见问题与已知问题

- 启用电机 6 的 DShot：[操作说明](/docs/wiki/guides/archive/DSHOT-ESC-Protocol-3-1)
- _PDB_ 连接器上的 _SI_ 引脚没有分压器。**如果将 _PDB_ 连接器用作电池电压输入，PDB 必须自带分压器，否则电池电压会立即且永久损坏板上的 MCU！**
  （板上的 _SI_ 焊盘带有分压器；如果 PDB 没有分压器，请使用该焊盘。）
