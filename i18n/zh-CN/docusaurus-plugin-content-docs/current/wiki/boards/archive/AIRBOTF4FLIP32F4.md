---
id: AIRBOTF4
---

# AirBotF4 与 FLIP32F4

Flip32F4 与 AirBotF4 基本相同，均基于 OP Revolution 设计，并做了部分修改和扩展。

## 固件目标

带 SD 卡座的板卡使用 AIRBOTF4SD；其他版本使用 AIRBOTF4。

## 3.2 版本的板卡变更

LED 灯带已改接至 MCU 引脚 PB6，该引脚连接到大多数 Airbot/FLIP32 F4 板卡标注的 LED 信号焊盘。请尝试将 LED 重新接到此引脚。

如果保留现有接线，可在 CLI 中执行：

```
resource motor 5 none
resource led_strip a1
```

## 双陀螺仪板卡

对于 AirbotF4 和 FLIP32F4 的双陀螺仪版本（例如 FLIP32-F4-DUAL GYRO EDITION），可通过 CLI 变量 `gyro_to_use` 选择陀螺仪：

```
set gyro_to_use = 0 # 选择 MPU6000
set gyro_to_use = 1 # 选择 ICM2060x
```

## Airbot F4 变体的 Serial RX UART 与可编程反相器

适用于 3.1.7 之后的构建版本。

| 板卡                | Serial RX | 反相器 CLI 命令                                       |
| ------------------- | --------- | ----------------------------------------------------- |
| Airbot F4 MPU9250   | UART1     | `resource inverter 1 a10`                             |
| Airbot F4 Nano      | UART3     | `resource inverter 3 a8`                              |
| Airbot F4 Dual Gyro | UART6     | `resource inverter 6 d2`（`AIRBOTF4SD` 目标的默认值） |
