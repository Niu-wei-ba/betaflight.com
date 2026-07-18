# SpeedyBee F4 AIO

## 描述

SpeedyBee F4 AIO 集成蓝牙模块，可通过 SpeedyBee App 在移动设备上设置飞控参数。它运行 Betaflight，内置 5V 和 9V LC 滤波器；不使用插针连接器，所有连接均在顶面直接焊接，以获得更高耐久性。板上配有电流传感器和 ESC 电源输出。

## 硬件特性

- MCU：STM32F405
- IMU：MPU6000
- OSD：BetaFlight OSD（AT7456E 芯片）
- BLE 模块：内部接至 UART5，可通过 SpeedyBee App 或类似应用远程设置
- Blackbox：16Mb 板载 Dataflash
- 电流传感器：200A（校准值 608）
- 电源输入：3S–6S LiPo
- 电源输出：4.5V×1、3.3V×1、5V×3、9V×1
- 相机和 VTX 电源输出：5V 和 9V 均内置 LC 滤波器
- ESC 电源输出：4×VCC
- UART：3 组 UART 焊盘（UART1、UART3、UART4）
- UART2 用于接收机：RX2 内置 SBUS 反相器；SBUS 焊盘用于 SBUS，RX2 焊盘用于 PPM、DSM2、DSMX、IBUS
- RSSI 输入：RSSI 焊盘
- I2C：用于外接 GPS 或气压计模块
- 蜂鸣器：`Buz-` 和 5V 焊盘用于 5V 蜂鸣器
- ESC 信号：S1–S7
- LED 引脚：用于 WS2812 LED
- BOOT 按钮：用于快速进入 DFU 模式

### 所有 UART 均引出焊盘

| 编号 | 标识   | RX   | TX   | 备注                                                      |
| ---- | ------ | ---- | ---- | --------------------------------------------------------- |
| 1    | USART1 | PA10 | PA9  | PB7 用于 SBUS 输入（内置反相器）                          |
| 2    | USART2 | PA3  | PA2  | PA3 经 SBUS 焊盘连接 SBUS 信号；其他接收机通常接 RX2 焊盘 |
| 3    | USART3 | PC11 | PC10 | 用于 GPS                                                  |
| 4    | USART4 | PA1  | PA0  | PA0 用于 RSSI/FPORT/TEL 等                                |
| 5    | USART5 | PD2  | PC12 | 焊盘                                                      |

### I2C（用于气压计或磁力计）

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | I2C1 | SDA  | PB7  |      |
| 2    | I2C1 | SCL  | PB6  |      |

### 蜂鸣器/LED 输出

| 编号 | 标识   | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | LED0   | LED  | PB9  |      |
| 2    | BEEPER | BEE  | PC13 |      |

### 模拟信号输入

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | ADC1 | VBAT | PC2  |      |
| 2    | ADC1 | CURR | PC1  |      |
| 3    | ADC1 | RSSI | PC3  |      |

### 7 路 PWM 输出

| 编号 | 标识     | 功能    | 引脚 | 备注         |
| ---- | -------- | ------- | ---- | ------------ |
| 1    | TIM8_CH1 | OUTPUT1 | PC6  | DMA1_Stream7 |
| 2    | TIM8_CH2 | OUTPUT2 | PC7  | DMA2_Stream2 |
| 3    | TIM8_CH3 | OUTPUT3 | PC8  | DMA2_Stream6 |
| 4    | TIM8_CH4 | OUTPUT4 | PC9  | DMA2_Stream1 |
| 5    | TIM2_CH1 | OUTPUT5 | PA15 | DMA2_Stream4 |
| 6    | TIM1_CH1 | OUTPUT6 | PA8  | DMA1_Stream2 |
| 7    | TIM4_CH3 | OUTPUT7 | PB8  | DMA1_Stream5 |

### LED 与 PPM 输入

| 编号 | 标识     | 功能                   | 引脚 | 备注 |
| ---- | -------- | ---------------------- | ---- | ---- |
| 1    | TIM5_CH4 | PPM                    | PA3  |      |
| 2    | TIM4_CH1 | LED Strip Signal Input | PB6  |      |

### 陀螺仪与加速度计（MPU6000）

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI1 | SCK  | PA5  |      |
| 2    | SPI1 | MISO | PA6  |      |
| 3    | SPI1 | MOSI | PA7  |      |
| 4    | SPI1 | CS   | PB11 |      |

### OSD（AT7456E）

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI2 | SCK  | PB13 |      |
| 2    | SPI2 | MISO | PB14 |      |
| 3    | SPI2 | MOSI | PB15 |      |
| 4    | SPI2 | CS   | PB10 |      |

### 16MB 板载 Flash

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI3 | SCK  | PB3  |      |
| 2    | SPI3 | MISO | PB4  |      |
| 3    | SPI3 | MOSI | PB5  |      |
| 4    | SPI3 | CS   | PC0  |      |
