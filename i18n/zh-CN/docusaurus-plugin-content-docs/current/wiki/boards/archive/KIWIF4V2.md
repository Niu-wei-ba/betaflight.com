# KIWI F4 V2

![飞控](http://i.imgur.com/1XKRUdq.jpg)

## 说明

采用 MPU-6000 的 F4 飞控，配套可堆叠 PDB。集成 12 V 与 5 V 稳压器、OSD、S.Port 反相器和 SD 卡槽。

## MCU、传感器和功能

### 硬件

| 硬件        | 型号                                                                                         | 备注                             |
| ----------- | -------------------------------------------------------------------------------------------- | -------------------------------- |
| MCU         | [STM32F405RGT6](http://www.mouser.com/ds/2/389/DM00037051-492832.pdf)                        | 4 个硬件 UART；PPM/UART 共用待定 |
| IMU         | [MPU-6000](https://store.invensense.com/datasheets/invensense/MPU-6050_DataSheet_V3%204.pdf) | 中断待定                         |
| OSD         | [MAX 7456](https://datasheets.maximintegrated.com/en/ds/MAX7456.pdf)                         |                                  |
| 12 V 稳压器 | [NCP1117 17-12G](https://www.onsemi.com/pub/Collateral/NCP1117-D.PDF)                        | LDO 线性稳压，最大 1 A           |
| 5 V 稳压器  | [LMR14206](http://www.ti.com/lit/ds/symlink/lmr14206.pdf)                                    | 开关频率：1.25 MHz               |

| 功能       | 是否支持 |
| ---------- | -------- |
| 气压计     | 否       |
| VCP        | 是       |
| OSD        | 是       |
| SD 卡      | 是       |
| 电压传感器 | 是       |
| 电流传感器 | 是       |
| BOOT 按钮  | 是       |

## 制造商和经销商

[Flying Lemon](https://flyinglemon.eu/flight-controllers/39-kiwif4-flight-controller.html)

[Beaver FPV](https://beaverfpv.com/collections/new-arrivals/products/kiwi-f4-flight-controller-kiwi-pdb)

## 贡献者

[FlyingLemonFPV](https://github.com/flyinglemonfpv) - 板卡设计者

[MiddleMan5](https://github.com/MiddleMan5) - 文档

## 变体

[Kiwi F4](KIWIF4)

V2 在 Kiwi F4 的基础上增加 SD 卡槽，将 IMU 移近板卡中心，并将通孔焊点改为焊盘。

[Plum F4](PLUMF4)

Kiwi F4 V2 的低成本版本，移除了 PDB 插座、OSD 和视频线路滤波器。

## 常见问题与已知问题

### 无法进入 Bootloader 模式（DFU）

某些设备，例如连接到 SBUS/IBUS 端口的接收机，或连接到任一 UART 的设备，可能阻止飞控进入 USB Bootloader 模式。此时 Windows/macOS 无法识别飞控：Windows 显示为 “Unknown Device”，macOS 报告 “enumeration errors”。若出现这些错误，请拔掉飞控上的所有外接设备，仅连接飞控后再刷写。

### 电压和电流标定

Flying Lemon 建议使用以下标定值：电压 57，电流 444，偏移量 11。

## 资源映射

**BF 3.2.5**

| 标签                  | 引脚 | 定时器 | DMA | 默认 | 备注 |
| --------------------- | ---- | ------ | --- | ---- | ---- |
| LED0_PIN              | PB4  |        |     |      |      |
| BEEPER                | PA8  |        |     |      |      |
| INVERTER_PIN_UART1    | PC0  |        |     |      |      |
| MPU6000_INT_EXTI      | PC4  |        |     |      |      |
| MPU6000_CS_PIN        | PA4  |        |     |      |      |
| MAX7456_SPI_CS_PIN    | PA15 |        |     |      |      |
| SDCARD_DETECT_PIN     | PB9  |        |     |      |      |
| SDCARD_SPI_CS_PIN     | PB12 |        |     |      |      |
| VBUS_SENSING_PIN      | PC5  |        |     |      |      |
| UART1 TX              | PA9  |        |     |      |      |
| UART1 RX              | PA10 |        |     |      |      |
| UART3 TX              | PB10 |        |     |      |      |
| UART3 RX              | PB11 |        |     |      |      |
| UART6 TX              | PC6  |        |     |      |      |
| UART6 RX              | PC7  |        |     |      |      |
| VBAT_ADC_PIN          | PC1  |        |     |      |      |
| RSSI_ADC_PIN          | PC2  |        |     |      |      |
| CURRENT_METER_ADC_PIN | PC3  |        |     |      |      |

### SPI3（MAX7456）

| 标签          | 引脚 | 定时器 | DMA | 默认 | 备注 |
| ------------- | ---- | ------ | --- | ---- | ---- |
| SPI3_NSS_PIN  | PA15 |        |     |      |      |
| SPI3_SCK_PIN  | PC10 |        |     |      |      |
| SPI3_MISO_PIN | PC11 |        |     |      |      |
| SPI3_MOSI_PIN | PC12 |        |     |      |      |

### I2C（默认禁用）

| 标签       | 引脚 | 定时器 | DMA | 默认 | 备注 |
| ---------- | ---- | ------ | --- | ---- | ---- |
| I2C_C1_SCL | PB6  |        |     |      |      |
| I2C_C1_SDA | PB7  |        |     |      |      |

## 其他资源

### 启用摄像头控制

1. 请参阅[此页面](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation)配置摄像头。
2. 配置硬件（RC 滤波器）后，将 OSD 控制线焊接到 VTX.CLK 焊盘（引脚 B06）。
3. 输入以下命令：

```
resource CAMERA_CONTROL 1 B06
set camera_control_mode = software_pwm
set camera_control_ref_voltage = 330
set camera_control_key_delay = 180
set camera_control_internal_resistance = 470
save
```

可能需要根据摄像头调整参考电压、`key_delay` 和/或内部电阻。以 [MiddleMan5](https://github.com/MiddleMan5) 的设置为例：在 Foxeer Monster V2 的 OSD 与地之间直接焊接 1 uF 电容，并在 OSD 焊盘（VTX.CLK）串联 220 ohm 电阻；参考电压和按键延迟与上文相同，内部电阻设置为 107。

**注意：**上述配置仅适用于作者的设备，并不保证适用于所有设备，可能需要自行调整。VTX.CLK 上的软件 PWM 也未必是最佳方案，但在该设置中可以正常工作。

### 设置指南

![接线图](https://i.imgur.com/WmDlIHV.jpg)

尺寸：
FC：36 mm × 36 mm × 6.8 mm（高）
