# RUSHCORE7

本页介绍 RUSHCORE7。

该板采用 STM32F722RET6 微控制器，具有以下特性：

- 高性能 ARM Cortex-M7 MCU，带 FPU、DSP 和 512KB Flash。
- 216MHz CPU，462 DMIPS/2.14 DMIPS/MHz（Dhrystone 2.1），支持 DSP 指令、Art Accelerator、L1 缓存和 SDRAM。
- 支持 MPU6000 或 ICM20602。
- 板载 OSD。
- 板载 16MB SPI Flash，用于数据记录。
- 板载 USB VCP 和 BOOT 按钮（DFU）。
- 板载 5V/2A BEC。
- 串行 LED（`LED_STRIP`）。
- VBAT/CURR/RSSI 传感器输入。
- 支持 IRC Tramp、SmartAudio、FPV 相机控制、FPORT 和遥测。
- 支持 SBUS、Spektrum 1024/2048、PPM 等。
- 支持扩展 I2C 设备（气压计、磁力计、OLED 等）。
- 支持 GPS。
- 更多信息：www.rushfpv.com

### UART

| 编号 | 标识   | RX   | TX   | 备注                        |
| ---- | ------ | ---- | ---- | --------------------------- |
| 1    | USART1 | PB7  | PB6  |                             |
| 2    | USART2 | PA3  | PA2  | SBUS 输入（内置反相器）/PPM |
| 3    | USART3 | PC11 | PC10 |                             |
| 4    | USART4 | PA1  | PA0  | PA0 用于 RSSI/FPORT/TEL 等  |
| 5    | USART5 | PD2  | PC12 | PC12：TRAMP/SmartAudio      |

### I2C

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | I2C1 | SDA  | PB9  |      |
| 2    | I2C1 | SCL  | PB8  |      |

### 蜂鸣器/LED 输出

| 编号 | 标识   | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | LED0   | LED  | PC13 | 板载 |
| 2    | Buzzer | BEE  | PB1  |      |

### VBAT 输入（分压比 1:10）、电流信号输入与模拟/数字 RSSI 输入

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | ADC1 | VBAT | PC1  |      |
| 2    | ADC1 | CURR | PC3  |      |
| 3    | ADC1 | RSSI | PA0  |      |

### 9 路输出

| 编号 | 标识     | 功能    | 引脚 | 备注                 |
| ---- | -------- | ------- | ---- | -------------------- |
| 1    | TIM2_CH3 | PPM     | PA2  | PPM/SBUS             |
| 2    | TIM8_CH3 | OUTPUT1 | PC8  | DMA                  |
| 3    | TIM8_CH1 | OUTPUT2 | PC6  | DMA                  |
| 4    | TIM8_CH4 | OUTPUT3 | PC9  | DMA                  |
| 5    | TIM8_CH2 | OUTPUT4 | PC7  | DMA                  |
| 6    | TIM1_CH1 | OUTPUT5 | PA8  | DMA                  |
| 7    | TIM1_CH2 | OUTPUT6 | PA9  | DMA                  |
| 8    | TIM2_CH4 | PWM     | PB11 | DMA LED_STRIP        |
| 9    | TIM3_CH3 | PWM     | PB0  | FPV 相机控制（FCAM） |

### 陀螺仪与加速度计（支持 ICM20602 和 MPU6000）

| 编号 | 标识 | 功能 | 引脚 | 备注                |
| ---- | ---- | ---- | ---- | ------------------- |
| 1    | SPI1 | SCK  | PA5  | MPU6000 和 ICM20602 |
| 2    | SPI1 | MISO | PA6  | MPU6000 和 ICM20602 |
| 3    | SPI1 | MOSI | PA7  | MPU6000 和 ICM20602 |
| 4    | SPI1 | CS   | PA4  | MPU6000 和 ICM20602 |
| 5    | SPI1 | INT  | PC4  | MPU6000 和 ICM20602 |

### OSD MAX7456

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI2 | SCK  | PB13 |      |
| 2    | SPI2 | MISO | PB14 |      |
| 3    | SPI2 | MOSI | PB15 |      |
| 4    | SPI2 | CS   | PB12 |      |

### 16MB Flash

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI3 | SCK  | PB3  |      |
| 2    | SPI3 | MISO | PB4  |      |
| 3    | SPI3 | MOSI | PB5  |      |
| 4    | SPI3 | CS   | PC15 |      |

### SWD

| 引脚 | 功能  | 备注 |
| ---- | ----- | ---- |
| 1    | SWCLK | 焊盘 |
| 2    | GND   | 焊盘 |
| 3    | SWDIO | 焊盘 |
| 4    | 3V3   | 焊盘 |
