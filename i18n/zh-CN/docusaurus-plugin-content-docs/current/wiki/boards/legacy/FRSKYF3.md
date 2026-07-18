## FRSKYF3 板卡

FrSky F3 飞控将 FrSky X8R 接收机、OSD 和 SD 卡集成在一块板上。该板可选用 MPU6050 或 MPU6000（出厂安装 MPU6050），支持高速控制环和 ESC 协议。OSD 芯片直接连接至主处理器（MCU），FC 通过内部 SBUS 和 S.Port 与接收机相连，因此无需另装接收机，并可由 Betaflight 将 FC 状态遥测回传至遥控器。

为便于使用，部分 FrSky F3 板卡集成了支持最高 6S 的 PDB 和 XT60 电池插座。将电池直接插入飞控即可使用。

## MCU、传感器与功能

## 硬件

MCU：STM32F3
IMU：MPU6050（I2C）[--MPU6000（SPI）]
IMU 中断：有
VCP：有
硬件 UART：3 个（UART2 --> SBUS，UART3 --> S.Port）
OSD：BFOSD
Blackbox：SD 卡
电池电压传感器：有
集成稳压器：有，最高支持 6S、1 A
有刷电机 MOSFET：无
按键：2 个（1：DFU；2：接收机对频）

## 功能

电流传感器：PB2
BLHeli 直通：有
WS2811 LED 灯带：有
竞赛应答器：有
蜂鸣器：反相
接收机：FrSky X8R
RSSI：SBUS 通道 8

## 制造商与经销商

FrSky（制造商）

购买信息：http://www.frsky-rc.com

## 设计方

FrSky Co. Ltd

## 维护者

shang2017

## 差异

将接收机与 FC 集成在同一块板上。
