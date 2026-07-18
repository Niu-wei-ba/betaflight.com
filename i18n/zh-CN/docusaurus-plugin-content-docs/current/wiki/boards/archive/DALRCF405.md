# DALRCF405

DALRCF405 介绍页面：
http://www.dalrcmodel.com/DALRC/plus/view.php?aid=184

该板使用 STM32F405RGT6 微控制器，具有以下特性：

- 1024K Flash、192K RAM、168 MHz CPU / 210 DMIPS
- 用于数据记录的 16M SPI Flash
- 板载 USB VCP 和 Boot 选择按键（用于 DFU）
- 稳定电源：为 VTX、摄像机等提供 9V/2A DC-DC BEC；可通过焊盘选择 5V/9V
- 串行 LED 接口（LED_STRIP）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 摄像机控制、FPORT 和遥测
- 支持 SBUS、Spektrum 1024/2048、PPM；内置反相器，无需外接
- 支持扩展 I2C 设备（气压计、指南针、OLED 等）
- 支持 GPS

### 板载 UART 焊盘

| 编号 | 标识符 | RX   | TX   | 说明                             |
| ---- | ------ | ---- | ---- | -------------------------------- |
| 1    | USART1 | PB7  | PA9  | PB7 用于 SBUS 输入（内置反相器） |
| 2    | USART2 | PA3  | PA2  | 焊盘用于 Tramp/SmartAudio        |
| 3    | USART3 | PB11 | PB10 | 用于 GPS                         |
| 4    | USART4 | PA1  | PA0  | PA0 用于 RSSI/FPORT/遥测等       |
| 5    | USART5 | PD2  | PC12 | 焊盘                             |

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

| 编号 | 标识符 | 功能   | 引脚 | 说明                                   |
| ---- | ------ | ------ | ---- | -------------------------------------- |
| 1    | ADC1   | VBAT   | PC2  | DMA2_Stream0                           |
| 2    | ADC1   | CURR   | PC1  | DMA2_Stream0                           |
| 3    | ADC1   | RSSI   | PA0  | DMA2_Stream0                           |
| 4    | ADC1   | extend | PC0  | DMA2_Stream0，供其他传感器扩展焊盘使用 |

### 8 路输出与 1 路 PPM 输入

| 编号 | 标识符    | 功能    | 引脚 | 说明                    |
| ---- | --------- | ------- | ---- | ----------------------- |
| 1    | TIM12_CH2 | PPM     | PB15 | PPM                     |
| 2    | TIM3_CH3  | OUTPUT1 | PB0  | DMA1_Stream7            |
| 3    | TIM8_CH1  | OUTPUT2 | PC6  | DMA2_Stream2            |
| 4    | TIM1_CH3  | OUTPUT3 | PA10 | DMA2_Stream6            |
| 5    | TIM1_CH1  | OUTPUT4 | PA8  | DMA2_Stream1            |
| 6    | TIM8_CH3  | OUTPUT5 | PC8  | DMA2_Stream4            |
| 7    | TIM3_CH4  | OUTPUT6 | PB1  | DMA1_Stream2            |
| 8    | TIM3_CH2  | OUTPUT7 | PC7  | DMA1_Stream5，无焊盘    |
| 9    | TIM8_CH4  | OUTPUT8 | PC9  | DMA2_Stream7，无焊盘    |
| 10   | TIM4_CH1  | PWM     | PB6  | DMA1_Stream0，LED_STRIP |
| 11   | TIM2_CH1  | PWM     | PA5  | FPV 摄像机控制（FCAM）  |

### 陀螺仪和加速度计

支持 ICM20689/MPU6000。

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI1   | SCK  | PB3  |      |
| 2    | SPI1   | MISO | PA6  |      |
| 3    | SPI1   | MOSI | PA7  |      |
| 4    | SPI1   | CS   | PC4  |      |

### OSD MAX7456

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PC10 |      |
| 2    | SPI3   | MISO | PC11 |      |
| 3    | SPI3   | MOSI | PB5  |      |
| 4    | SPI3   | CS   | PA15 |      |

### 16M Flash

| 编号 | 标识符 | 功能 | 引脚 | 说明 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI2   | SCK  | PB13 |      |
| 2    | SPI2   | MISO | PB14 |      |
| 3    | SPI2   | MOSI | PC3  |      |
| 4    | SPI2   | CS   | PB12 |      |

### SWD

| 引脚 | 功能   | 说明 |
| ---- | ------ | ---- |
| 1    | SWCLK  | 焊盘 |
| 2    | Ground | 焊盘 |
| 3    | SWDIO  | 焊盘 |
| 4    | 3V3    | 焊盘 |

### 设计者

- nyway & DALRC
