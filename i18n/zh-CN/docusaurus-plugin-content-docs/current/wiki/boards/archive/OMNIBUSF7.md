# OMNIBUS F7

### V2 支持

#### 固件 target

OMNIBUS F7 V2 请使用 **OMNIBUSF7V2** target，该 target 自 3.2RC-4 起可用。

#### ESC 中间电源轨与 ESC 遥测跳线块

- ESC 中间电源轨可配置为：(a) 5 V 输入电源轨，或 (b) 接入 `UART7_RX`（`RX7`）的 ESC 遥测输入。
- 电流检测使用 J3 连接器的引脚 7。该引脚可作为：(c) 适合输入 ADC 的电压编码电流传感器输出，范围为 0 至 3.3 V；或 (d) 接入 `UART7_RX`（`RX7`）的 ESC 遥测输入。
- 使用下图所示的两个跳线块选择这些功能。

![](https://user-images.githubusercontent.com/14850998/29853571-abed2e8c-8d7b-11e7-81ac-2eaf86052bda.jpg)

---

## 特性

F7 + OSD

- OSD
- SPI 陀螺仪 ICM-20608-G（SPI1）
- SPI 陀螺仪 MPU6000（SPI3）
- STM32 F745 MCU
  - F7 MCU 与 STM32F3 类似，集成反相器
- SBUS/PPM 输入
- 4 路 PWM 输出，已启用 DShot
- BMP280 气压计
- VBAT 传感器，分压器
- 支持外部电流传感器与 RSSI ADC
- SD 卡
