# FLYWOOF7DUAL

该飞控采用 STM32F722RET6 微控制器，具备以下功能：

- 带 FPU 的高性能 DSP、ARM Cortex-M7 MCU，配备 512 KB 闪存
- 216 MHz CPU、462 DMIPS/2.14 DMIPS/MHz（Dhrystone 2.1），支持 DSP 指令、Art Accelerator、L1 缓存和 SDRAM
- 双陀螺仪 MPU6000 和 ICM20689：可在 CLI 中选择 MPU6000（更稳定、平滑）或 ICM20689（更高速率，32K/32K），在同一块板上体验不同陀螺仪
- 用于黑匣子记录的 16 MB SPI 闪存
- 板载 USB VCP 和启动选择按钮（用于 DFU）
- 稳定的电源调节：9 V/2 A DCDC BEC，可为 VTX、摄像头等供电；通过焊盘可选择 5 V 或 9 V 输出
- 串行 LED 接口（LED_STRIP）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 摄像头控制、FPORT 和遥测
- 支持 SBus、Spektrum 1024/2048、PPM，无需外部反相器（板载集成）
- 支持扩展 I2C 设备（气压计、指南针、OLED 等，带接口）
- 支持 GPS（带接口）

### 板上为所有 UART 提供焊盘

| 编号 | 标识符 | RX   | TX   | 备注                        |
| ---- | ------ | ---- | ---- | --------------------------- |
| 1    | USART1 | PA10 | PA9  | SBUS 输入（内置反相器）     |
| 2    | USART2 | PA3  | PA2  | 用于 Tramp/SmartAudio       |
| 3    | USART3 | PB11 | PB10 | 用于 GPS                    |
| 4    | USART4 | PA1  | PA0  | 焊盘，用于 Tramp/SmartAudio |
| 5    | USART5 | PD2  | PC12 | 焊盘，ESC 传感器            |
| 6    | USART6 | PC7  | PC6  | 焊盘                        |

### I2C 与 GPS 共用端口

可用于气压计、指南针等设备。

| 编号 | 标识符 | 功能 | 引脚 | 备注            |
| ---- | ------ | ---- | ---- | --------------- |
| 1    | I2C1   | SDA  | PB7  | 与 GPS 接口共用 |
| 2    | I2C1   | SCL  | PB6  | 与 GPS 接口共用 |

### 蜂鸣器/LED 输出

| 编号 | 标识符 | 功能   | 引脚 | 备注 |
| ---- | ------ | ------ | ---- | ---- |
| 1    | LED0   | LED    | PC15 |      |
| 2    | BEEPER | 蜂鸣器 | PC14 |      |

### VBAT、电流和 RSSI 输入

VBAT 输入分压比为 1:10；同时提供电流信号和模拟/数字 RSSI 输入。

| 编号 | 标识符 | 功能 | 引脚 | 备注         |
| ---- | ------ | ---- | ---- | ------------ |
| 1    | ADC1   | VBAT | PC1  | DMA2_Stream0 |
| 2    | ADC1   | CURR | PC0  | DMA2_Stream0 |
| 3    | ADC1   | RSSI | PC2  | DMA2_Stream0 |

### 6 路输出、1 路 PPM 输入

| 编号 | 标识符    | 功能   | 引脚 | 备注                    |
| ---- | --------- | ------ | ---- | ----------------------- |
| 1    | TIM11_CH1 | PPM    | PB9  | PPM                     |
| 2    | TIM3_CH4  | 输出 1 | PB1  | DMA1_Stream2            |
| 3    | TIM3_CH1  | 输出 2 | PB4  | DMA1_Stream4            |
| 4    | TIM2_CH2  | 输出 3 | PB3  | DMA1_Stream6            |
| 5    | TIM2_CH1  | 输出 4 | PA15 | DMA1_Stream5            |
| 6    | TIM8_CH3  | 输出 5 | PC8  | DMA2_Stream4            |
| 7    | TIM8_CH4  | 输出 6 | PC9  | DMA2_Stream1            |
| 8    | TIM1_CH1  | LED    | PA8  | LED_STRIP               |
| 9    | TIM4_CH3  | PWM    | PB8  | FC CAM                  |
| 10   | TIM8_CH3  | LED    | PC8  | DMA2_Stream2，LED_STRIP |
| 11   | TIM1_CH2  | PWM    | PA9  | FPV 摄像头控制（FCAM）  |

### 陀螺仪与加速度计 ICM20689

| 编号 | 标识符 | 功能 | 引脚 | 备注                |
| ---- | ------ | ---- | ---- | ------------------- |
| 1    | SPI1   | SCK  | PA5  | MPU6000 和 ICM20689 |
| 2    | SPI1   | MISO | PA6  | MPU6000 和 ICM20689 |
| 3    | SPI1   | MOSI | PA7  | MPU6000 和 ICM20689 |
| 4    | SPI1   | CS1  | PA4  | MPU6000             |
| 5    | SPI1   | CS2  | PB2  | ICM20689            |
| 6    | SPI1   | INT1 | PC3  | MPU6000             |
| 7    | SPI1   | INT2 | PC4  | ICM20689            |

### OSD MAX7456

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI2   | SCK  | PB13 |      |
| 2    | SPI2   | MISO | PB14 |      |
| 3    | SPI2   | MOSI | PB15 |      |
| 4    | SPI2   | CS   | PB12 |      |

### 16 MB 闪存

| 编号 | 标识符 | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | SPI3   | SCK  | PC10 |      |
| 2    | SPI3   | MISO | PC11 |      |
| 3    | SPI3   | MOSI | PB5  |      |
| 4    | SPI3   | CS   | PC13 |      |

### SWD

| 引脚 | 功能  | 备注 |
| ---- | ----- | ---- |
| 1    | SWCLK | 焊盘 |
| 2    | GND   | 焊盘 |
| 3    | SWDIO | 焊盘 |
| 4    | 3V3   | 焊盘 |

- FLYWOO TECH
- www.flywoo.net
