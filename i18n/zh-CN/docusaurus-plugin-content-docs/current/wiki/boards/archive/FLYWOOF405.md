# FLYWOOF405

该板使用 STM32F405RGT6 微控制器，具有以下特性：

- 1024K Flash、192K RAM、168 MHz CPU / 210 DMIPS
- 用于数据记录的 16M SPI Flash
- 板载 USB VCP 和 Boot 选择按键（用于 DFU）
- 稳定电源：为 VTX、摄像机等提供 9V/1.5A DC-DC BEC；可通过焊盘选择 5V/9V
- 串行 LED 接口（LED_STRIP）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 摄像机控制、FPORT 和遥测
- 支持 SBUS、Spektrum 1024/2048、PPM；内置反相器，无需外接
- 支持扩展 I2C 设备（气压计、指南针、OLED 等）
- 支持 GPS

### 板载 UART 焊盘

| 编号 | 标识符 | RX   | TX   | 说明                         |
| ---- | ------ | ---- | ---- | ---------------------------- |
| 1    | USART1 | PA10 | PB6  | 用于 SmartPort/FPORT/遥测等  |
| 2    | USART3 | PB11 | PB10 | 用于 SBUS 输入（内置反相器） |
| 3    | USART4 | PA1  | PA0  | 焊盘用于 Tramp/SmartAudio    |
| 4    | USART5 | PD2  | /    | ESC 传感器焊盘               |
| 5    | USART6 | PC7  | PC6  | 焊盘用于 GPS/BLE 等          |

### I2C 与 GPS 接口共用

用于气压计、指南针等。

| 编号 | 标识符 | 功能 | 引脚 | 说明            |
| ---- | ------ | ---- | ---- | --------------- |
| 1    | I2C1   | SDA  | PB9  | 与 GPS 接口共用 |
| 2    | I2C1   | SCL  | PB8  | 与 GPS 接口共用 |

### 蜂鸣器/LED 输出

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | LED0   | LED  | PC14 |      |
| 2    | BEEPER | BEE  | PC13 |      |

### 传感器模拟输入

VBAT 采用 1/10 分压；另有电流信号和模拟/数字 RSSI 输入。

| 编号 | 标识符 | 功能 | 引脚 | 说明         |
| ---- | ------ | ---- | ---- | ------------ |
| 1    | ADC1   | VBAT | PC3  | DMA2_Stream0 |
| 2    | ADC1   | CURR | PC2  | DMA2_Stream0 |
| 3    | ADC1   | RSSI | PC1  | DMA2_Stream0 |

### 8 路输出与 1 路 PPM 输入

| 编号 | 标识符    | 功能    | 引脚 | 说明                    |
| ---- | --------- | ------- | ---- | ----------------------- |
| 1    | TIM10_CH1 | PPM     | PB7  | PPM                     |
| 2    | TIM3_CH3  | OUTPUT1 | PB0  | DMA1_Stream7            |
| 3    | TIM3_CH4  | OUTPUT2 | PB1  | DMA1_Stream2            |
| 4    | TIM2_CH4  | OUTPUT3 | PA3  | DMA1_Stream6            |
| 5    | TIM2_CH3  | OUTPUT4 | PA2  | DMA1_Stream1            |
| 6    | TIM3_CH2  | OUTPUT5 | PB5  | DMA1_Stream5            |
| 7    | TIM4_CH2  | OUTPUT6 | PB7  | DMA1_Stream3            |
| 8    | TIM8_CH4  | OUTPUT7 | PC9  | DMA2_Stream7            |
| 9    | TIM3_CH1  | OUTPUT8 | PB4  | DMA1_Stream4            |
| 10   | TIM8_CH3  | LED     | PC8  | DMA2_Stream2，LED_STRIP |
| 11   | TIM1_CH2  | PWM     | PA9  | FPV 摄像机控制（FCAM）  |

### 陀螺仪和加速度计 ICM20689

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI1   | SCK  | PA5  |      |
| 2    | SPI1   | MISO | PA6  |      |
| 3    | SPI1   | MOSI | PA7  |      |
| 4    | SPI1   | CS   | PC4  |      |

### OSD MAX7456

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PC10 |      |
| 2    | SPI3   | MISO | PC11 |      |
| 3    | SPI3   | MOSI | PC12 |      |
| 4    | SPI3   | CS   | PB14 |      |

### 16M Flash

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PC10 |      |
| 2    | SPI3   | MISO | PC11 |      |
| 3    | SPI3   | MOSI | PC12 |      |
| 4    | SPI3   | CS   | PB3  |      |

### SWD

| 引脚 | 功能   | 说明 |
| ---- | ------ | ---- |
| 1    | SWCLK  | 焊盘 |
| 2    | Ground | 焊盘 |
| 3    | SWDIO  | 焊盘 |
| 4    | 3V3    | 焊盘 |

- FLYWOO TECH
