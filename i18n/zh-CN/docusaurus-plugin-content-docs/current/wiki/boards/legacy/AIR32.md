# AIR32

## 说明

AIR32 飞控采用 STM32F3 处理器，并通过 SPI 总线连接低噪声 MPU6000 陀螺仪，可更快采集陀螺仪数据。该板提供 3 路可完全使用的 UART，不会与 USB 端口（VCP）冲突，同时仍兼容 BLHeli 直通功能。

## MCU、传感器与功能

### 硬件规格

- MCU：STM32F3
- IMU：MPU6000
- 气压计：不支持
- VCP：支持
- 硬件 UART：3 路
- OSD：不支持
- Blackbox：不支持
- PPM：支持
- 电池电压传感器：支持
- 集成稳压器：5 V / 600 mA（最高 6S 输入）
- 有刷电机 MOSFET：不支持
- 按键：BOOT 按键

### 特性

（待补充特性列表）

## 制造商和经销商

Flyinglemon - https://flyinglemon.eu

## 设计者

Flyinglemon - https://flyinglemon.eu

## 维护者

（如参与本板测试或代码贡献，请在此添加姓名）

## 相近 Target

（在此添加功能或用途相近、但使用独立 target 的板卡链接）

## 变体

差异：

## 常见问题和已知问题

**接线：**

仅可依据 PDF 中的接线图接线：https://flyinglemon.eu/index.php?controller=attachment&id_attachment=5

网站图示中的 UART1 GND 与 VCC 标注有误，两者位置互换。

**DShot：**

目前仅可通过 master 分支的测试版本使用。使用测试版固件时请务必谨慎。

如需使用，必须进行以下调整：

1. 将电机 1 焊接到飞控的电机 5 焊盘。
2. 电机 2 和电机 3 保持连接在原焊盘。
3. 将电机 4 焊接到飞控的电机 6 焊盘。
4. 使用以下命令重新映射资源：

`resource MOTOR 5 free`
`resource MOTOR 6 free`
`resource MOTOR 1 A01`
`resource MOTOR 4 A02`
`save`

LED 灯带输出应可正常工作，但它与电机 4 焊盘共用 DMA。这正是必须将第 4 路电机重新映射到其他引脚的原因。

PPM 焊盘与 MOT6 共用同一个 DMA 通道，因此不建议将 PPM 焊盘用作电机输出。更合理的做法是使用电机 6 焊盘，以便所有电机仍使用专用的 MOT1 至 MOT6 焊盘。
