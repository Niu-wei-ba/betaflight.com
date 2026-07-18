# CL_RACING AIO F4

## 描述

- F4 芯片 + OSD + PDB + SD 卡适配器

## MCU、传感器和功能

### 硬件

_（可在此补充未列出的硬件规格。）_

- MCU：STM32F4
- IMU：MPU-6000
- IMU 中断：支持
- 气压计：不支持
- VCP：支持
- 硬件 UART：4 个
- OSD：使用 AB7456 芯片
- Blackbox：SD 卡
- PPM/UART：不复用
- 电池电压传感器：10:1 分压
- 电流传感器：0.5 mOhm；设置中的电流比例为 250
- 集成稳压器：5V/1.2A
- 内置经滤波的 7.86V BEC，供 VTX（最大 800 mW）和摄像机使用

### 功能

- 板载 BEC
- 摄像机和 VTX 的 LC 滤波器
- 全部使用焊盘设计，无通孔排针
- 内置 Betaflight OSD
- 电流传感器
- 内置 SBUS 反相器
- PDB 持续额定电流 120A，10 秒突发 160A

## 制造商和经销商

- www.clrpowered.com（网站当时正在建设）

## 设计者

- bnn1044

## 维护者

- bnn1044

## 相似目标

- 与 OmnibusF4SD 的输入、输出和功能约 99% 相同，但采用 PDB 式电机布局。
- 与 OmnibusF4SD 功能相同，增加了 UART，并将 PPM 从 UART 中独立出来。

## 变体

## 其他资源

设置指南：

## 图片
