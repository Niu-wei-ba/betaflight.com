# MATEKSYS F722-OSD

![MATEKF722](/img/boards/matekf722/MATEKF722-OSD.JPG)

## 描述

F722 + ICM20602，配备 Betaflight OSD 和 SD 卡插槽。

## MCU、传感器和功能

### 硬件

- MCU：STM32F722
- IMU：ICM-20602（SPI）
- OSD：BetaFlight OSD（AT7456E 芯片）
- 指南针和气压计：不支持
- VCP：支持
- 硬件 UART：UART1、UART2、UART3、UART4
- Blackbox：MicroSD 卡
- PPM/UART 复用：UART2-RX
- 电池电压传感器：支持，比例 1:10
- 电流传感器：无（FCHUB-6S 选项）
- 集成稳压器：无（FCHUB-6S 选项）
- 有刷电机 MOSFET：无
- 按钮：BOOT 按钮
- 6 路 PWM/DShot 输出
- WS2812 LED 灯带：支持
- 蜂鸣器：支持

### 特点

- 32K 陀螺仪 ICM-20602
- 支持 32K 陀螺仪采样率和 32K PID 控制环
- SD 卡插槽
- VCP、UART1、UART2、UART3 和 UART4
- 随附防振支柱

## 制造商和经销商

Matek Systems：http://www.mateksys.com/?portfolio=f722-osd

## 设计师

Matek Systems（www.mateksys.com）

## 维护者

- 硬件：Matek Systems

## 常见问题解答和已知问题

设置指南：

RCGroups 讨论帖：
