# SpeedyBee F7 AIO

## 描述

SpeedyBee F7 AIO 是一块集成 PDB、蓝牙芯片、气压计和 32 MB 板载 Flash（用于 Blackbox）的 AIO 飞控。借助内置蓝牙芯片，用户可通过 SpeedyBee App 调整飞控参数。

### 硬件特性

- MCU：STM32F722
- IMU：ICM20689
- OSD：BetaFlight OSD（AT7456E 芯片）
- BLE 模块：内部连接至 UART3，可供 SpeedyBee App 或同类应用远程配置
- Blackbox：32MB 板载 Dataflash
- 电流传感器：200A（校准值 102）
- 支持 Betaflight 相机控制焊盘
- 输入电源：3S 至 6S LiPo
- 电源输出：5V×5（含 BZ+），最大负载 2.5A；9V×1，最大负载 2.5A
- ESC 电源输出：4×VCC
- UART：4 组 UART 焊盘（UART1、UART2、UART4、UART5）
- RSSI 输入：RSSI 输入焊盘
- SmartPort：通过 `SOFTSERIAL1` 支持
- I2C：用于外接磁力计、声呐等设备
- 蜂鸣器：`BZ+` 与 `BZ-` 焊盘用于 5V 蜂鸣器
- ESC 信号：S1 至 S5
- LED 引脚：用于 WS2812 LED
- BOOT 按钮：用于快速进入 DFU 模式
- Betaflight 目标：`SPEEDYBEEF7`
