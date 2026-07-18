# FLYWOOF411

该飞控采用 STM32F411CEU6 微控制器，具备以下功能：

- 用于黑匣子记录的 16 MB SPI 闪存
- 板载 USB VCP 和启动选择按钮（用于 DFU）
- 稳定的电源调节：9 V/1.5 A DCDC BEC，可为 VTX、摄像头等供电；通过焊盘可选择 5 V 或 9 V 输出
- 串行 LED 接口（LED_STRIP）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 摄像头控制、FPORT 和遥测
- 支持 SBus、Spektrum 1024/2048、PPM，无需外部反相器（板载集成）
- 支持扩展 I2C 设备（气压计、指南针、OLED 等）
- 支持 GPS

### 板上为所有 UART 提供焊盘

| 编号 | 标识符 | RX  | TX  | 备注                        |
| ---- | ------ | --- | --- | --------------------------- |
| 1    | USART1 | PB7 | PB6 | SBUS 输入（内置反相器）     |
| 2    | USART2 | PA3 | PA2 | 用于 VTX、SmartAudio/IRC 等 |

### I2C 与 GPS 共用端口

可用于气压计、指南针等设备。

| 编号 | 标识符 | 功能 | 引脚 | 备注            |
| ---- | ------ | ---- | ---- | --------------- |
| 1    | I2C1   | SDA  | PB9  | 与 GPS 接口共用 |
| 2    | I2C1   | SCL  | PB8  | 与 GPS 接口共用 |

### 蜂鸣器/LED 输出

| 编号 | 标识符 | 功能   | 引脚 | 备注 |
| ---- | ------ | ------ | ---- | ---- |
| 1    | LED0   | LED    | PC13 |      |
| 2    | BEEPER | 蜂鸣器 | PC14 |      |

### VBAT、电流和 RSSI 输入

VBAT 输入分压比为 1:10；同时提供电流信号和模拟/数字 RSSI 输入。

| 编号 | 标识符 | 功能 | 引脚 | 备注         |
| ---- | ------ | ---- | ---- | ------------ |
| 1    | ADC1   | VBAT | PA0  | DMA2_Stream0 |
| 2    | ADC1   | CURR | PA1  | DMA2_Stream0 |
| 3    | ADC1   | RSSI | PB1  | DMA2_Stream0 |

### 8 路输出、1 路 PPM 输入

| 编号 | 标识符   | 功能   | 引脚 | 备注         |
| ---- | -------- | ------ | ---- | ------------ |
| 1    | TIM9_CH1 | PPM    | PA2  | PPM          |
| 2    | TIM1_CH1 | 输出 1 | PA8  | DMA2_Stream1 |
| 3    | TIM1_CH2 | 输出 2 | PA9  | DMA2_Stream2 |
| 4    | TIM1_CH3 | 输出 3 | PA10 | DMA2_Stream6 |
| 5    | TIM3_CH3 | 输出 4 | PB0  | DMA1_Stream7 |
| 6    | TIM3_CH1 | 输出 5 | PB4  | DMA1_Stream4 |
| 7    | TIM3_CH4 | 未指定 | PB1  | DMA1_Stream2 |
| 8    | TIM5_CH4 | 未指定 | PA3  | DMA1_Stream3 |
| 9    | TIM2_CH3 | CAM_C  | PB10 | DMA1_Stream1 |
| 10   | TIM2_CH4 | LED    | PB11 | DMA1_Stream6 |

### 陀螺仪与加速度计 ICM20689

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI1   | SCK  | PA5  |      |
| 2    | SPI1   | MISO | PA6  |      |
| 3    | SPI1   | MOSI | PA7  |      |
| 4    | SPI1   | CS   | PA4  |      |

### OSD MAX7456

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PB13 |      |
| 2    | SPI3   | MISO | PB14 |      |
| 3    | SPI3   | MOSI | PB15 |      |
| 4    | SPI3   | CS   | PB12 |      |

### 16 MB 闪存

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PB13 |      |
| 2    | SPI3   | MISO | PB14 |      |
| 3    | SPI3   | MOSI | PB15 |      |
| 4    | SPI3   | CS   | PB2  |      |

### SWD

| 引脚 | 功能  | 备注 |
| ---- | ----- | ---- |
| 1    | SWCLK | 焊盘 |
| 2    | GND   | 焊盘 |
| 3    | SWDIO | 焊盘 |
| 4    | 3V3   | 焊盘 |

- FLYWOO TECH
