## FRSKYF4 板卡

FrSky F4 飞控将 FrSky X8R 接收机、OSD 和 SD 卡集成在一块板上，采用 MPU6050。该板支持高速控制循环和 ESC 协议；OSD 芯片直接连接主处理器（MCU）。飞控通过内部 SBUS 和 S.Port 与接收机连接，因此无需额外安装接收机，还可通过 Betaflight 将飞控信息回传到遥控器。

为便于使用，部分 FrSkyF4 板卡集成了支持最高 6S 的 PDB，并配备电池 XT60 插座。将电池直接接入飞控即可使用。

## MCU、传感器和功能

## 硬件

- MCU：STM32F4
- IMU：MPU6000（SPI）
- IMU 中断：支持
- VCP：支持
- 硬件 UART：3 个（UART1→SBUS，UART6→S.Port）
- OSD：BFOSD
- 黑匣子：SD 卡
- 电池电压传感器：支持
- 集成稳压器：支持最高 6S，1 A
- 有刷电机 MOSFET：无
- 按钮：2 个（1：DFU，2：接收机绑定）

## 功能

- 电流传感器：PC1
- BLHeli 直通：支持
- WS2811 LED 灯带：支持
- 应答器：支持
- 蜂鸣器：反相
- 接收机：FrSky X8R
- RSSI：SBUS 通道 8

## 制造商和经销商

FrSky（制造商）

即将提供：[http://www.frsky-rc.com](http://www.frsky-rc.com)

## 设计者

FrSky Co. Ltd

## 维护者

shang2017

## 差异

在同一块板上集成接收机与飞控。
