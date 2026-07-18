# Aikon F4

## 描述

这是一块不含 PDB、面向多旋翼和固定翼的飞控。Aikon F4 采用精心设计的定时器分配，可高效驱动 4–6 路支持 Burst DShot 的电机。板上提供 ESC 遥测、VTX 和相机控制专用焊盘；另有 11 针连接器，可即插即用连接 Aikon AK32 4 合 1 ESC，无需额外导线即可获得电压、电流和 ESC 遥测读数。

## MCU、传感器与功能

### 硬件

- MCU：STM32F405
- IMU：ICM-20602
- 电机输出：4–6 路
- IMU 中断：支持
- 气压计：可选
- VCP：支持
- 硬件 UART：UART1 用于 SerialRX，UART3 用于反相 SmartPort；UART2 和 UART4 可作通用用途
- 软件串口：SOFTSERIAL1 用于 VTX 控制（与 UART1 TX 复用）；SOFTSERIAL2 用于 ESC 遥测（与 UART4 RX 复用）
- OSD：支持
- Blackbox：16MB SPI Flash
- PPM/LED_STRIP 复用：支持
- 电池电压传感器：支持
- 集成稳压器：支持
- 按钮：BOOT

### 功能

UART3 反相器可通过软件控制。按需要设置 `serialrx_inverted` 后，可将 SBUS 焊盘用于任意单向协议。另有一个焊接跳线可旁路反相器，使 `UART3_RX` 直接连接至 DSMX 焊盘。

默认已配置软件串口；只需在 Configurator 的“Ports”选项卡中，为 VTX 控制启用 `SOFTSERIAL1`，并为 ESC 传感器启用 `SOFTSERIAL2`。

## 制造商与经销商

https://www.aikon-electronics.com/

## 设计者

AIKON Electronics，Avi Jang

## 维护者

Andrey Mironov（@DieHertz）
