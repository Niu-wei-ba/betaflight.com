# JHEF7DUAL

## 功能

- 处理器与传感器
  - _MCU：_ STM32F722RET6
  - _IMU：_ ICM20689（陀螺仪 1）和 MPU6000（陀螺仪 2），通过 SPI1 连接
  - _气压计：_ BMP280（通过 I2C1 连接）
  - _OSD：_ Betaflight OSD（AT7456E，通过 SPI2 连接）
- _黑匣子：_ FLASH M25P16（通过 SPI3 连接）
- 6 个 UART（1、2、3、4、5、6）
- 8 路 DShot 输出
- 2 路 PINIO（VTX 电源开关/User1 和摄像头开关/User2）
- 板载 USB VCP 和启动选择按钮（用于 DFU）
- 串行 LED 接口（LED_STRIP）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 摄像头控制、FPORT 和遥测
- 支持 SBus、Spektrum 1024/2048、PPM，无需外部反相器（板载集成）
- 支持扩展 I2C 设备（指南针、OLED 等）
- 支持 GPS

## 引脚定义

### 板上为所有 UART 提供焊盘

| 编号 | 标识符 |  RX  |  TX  |            备注             |
| :--: | :----: | :--: | :--: | :-------------------------: |
|  1   | USART1 | PA10 | PA9  |   SBUS 输入（内置反相器）   |
|  2   | USART2 | PA3  | PA2  |    用于 Tramp/SmartAudio    |
|  3   | USART3 | PB11 | PB10 |          用于 GPS           |
|  4   | USART4 | PA1  | PA0  | 焊盘，用于 Tramp/SmartAudio |
|  5   | USART5 | PD2  | PC12 |      焊盘，ESC 传感器       |
|  6   | USART6 | PC7  | PC6  |            焊盘             |

### I2C 与 GPS 共用端口

可用于气压计、指南针等设备。

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| :--: | :----: | :--: | :--: | :--: |
|  1   |  I2C1  | SDA  | PB7  |      |
|  2   |  I2C1  | SCL  | PB6  |      |

### 蜂鸣器/LED 输出

| 编号 | 标识符 |  功能  | 引脚 | 备注 |
| :--: | :----: | :----: | :--: | :--: |
|  1   |  LED0  |  LED   | PA15 |      |
|  2   | BEEPER | 蜂鸣器 | PC15 |      |

### VBAT、电流和模拟 RSSI 输入

| 编号 | 标识符 | 功能 | 引脚 |     备注     |
| :--: | :----: | :--: | :--: | :----------: |
|  1   |  ADC1  | VBAT | PC2  | DMA2_Stream0 |
|  2   |  ADC1  | CURR | PC1  | DMA2_Stream0 |
|  3   |  ADC1  | RSSI | PC0  | DMA2_Stream0 |

### PWM 输入与 PWM 输出

| 编号 |  标识符  |  功能  | 引脚 |     备注     |
| :--: | :------: | :----: | :--: | :----------: |
|  1   | TIM9_CH2 |  PPM   | PA3  |     PPM      |
|  2   | TIM3_CH3 | 电机 1 | PB0  | DMA1_Stream2 |
|  3   | TIM3_CH4 | 电机 2 | PB1  | DMA1_Stream2 |
|  4   | TIM3_CH1 | 电机 3 | PB4  | DMA1_Stream4 |
|  5   | TIM2_CH2 | 电机 4 | PB3  | DMA1_Stream6 |
|  7   | TIM8_CH4 | 电机 5 | PC9  | DMA2_Stream1 |
|  8   | TIM8_CH3 | 电机 6 | PC8  | DMA2_Stream4 |
|  9   | TIM1_CH1 |  LED   | PA8  |  LED_STRIP   |
|  10  | TIM4_CH3 | 未指定 | PB8  |    FC CAM    |

### 陀螺仪与加速度计 ICM20689

| 编号 | 标识符 | 功能 | 引脚 |        备注         |
| :--: | :----: | :--: | :--: | :-----------------: |
|  1   |  SPI1  | SCK  | PA5  | MPU6000 和 ICM20689 |
|  2   |  SPI1  | MISO | PA6  | MPU6000 和 ICM20689 |
|  3   |  SPI1  | MOSI | PA7  | MPU6000 和 ICM20689 |
|  4   |  SPI1  | CS2  | PA4  |       MPU6000       |
|  5   |  SPI1  | CS1  | PB2  |      ICM20689       |
|  6   |  SPI1  | INT2 | PC3  |       MPU6000       |
|  7   |  SPI1  | INT1 | PC4  |      ICM20689       |

### OSD MAX7456

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| :--: | :----: | :--: | :--: | :--: |
|  1   |  SPI2  | SCK  | PB13 |      |
|  2   |  SPI2  | MISO | PB14 |      |
|  3   |  SPI2  | MOSI | PB15 |      |
|  4   |  SPI2  |  CS  | PB12 |      |

### 2 MB 闪存

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| :--: | :----: | :--: | :--: | :--: |
|  1   |  SPI3  | SCK  | PC10 |      |
|  2   |  SPI3  | MISO | PC11 |      |
|  3   |  SPI3  | MOSI | PB5  |      |
|  4   |  SPI3  |  CS  | PC13 |      |

### SWD

| 引脚 | 功能  | 备注 |
| :--: | :---: | :--: |
|  1   | SWCLK | 焊盘 |
|  2   |  GND  | 焊盘 |
|  3   | SWDIO | 焊盘 |
|  4   |  3V3  | 焊盘 |

## 设计者

- JHE_FPV
