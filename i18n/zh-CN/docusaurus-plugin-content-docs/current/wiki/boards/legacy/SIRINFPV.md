# SIRINFPV

_OSD 与 VTX_

## 说明

SirinFPV 板集成 Betaflight OSD 和 VTX。

## MCU、传感器与功能

### 硬件

- MCU：STM32F3
- IMU：MPU6050（SPI）
- IMU 中断：有
- 气压计：无
- VCP：有
- 硬件 UART：3 个
- OSD：无
- Blackbox：无
- PPM/UART 共用：UART2
- 电池电压传感器：有，直接连接无需接线
- 集成稳压器：有，电压限制未知
- 有刷电机 MOSFET：有
- 按键：1 个 DFU

### 功能

- 电流传感器：未实现
- BLHeli 直通：无（缓冲输出限制）
- WS2811 LED 灯带：未实现
- 竞赛应答器：无

## 设计与维护

[Savaga](https://github.com/savaga)

## 相近 target

- [OMNIBUS](/docs/wiki/boards/archive/OMNIBUS)
