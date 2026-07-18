# VIVAF4AIO

VIVAF4AIO 产品详情：
https://team-blacksheep.com/products/prod:viva_f4_fc

- STM32 F4 处理器
- ICM20602 陀螺仪、BMP280 气压计
- 5 V/3 A、3.3 V/0.5 A BEC
- 2-6S 电池输入
- Betaflight OSD
- 16 MB Blackbox 日志存储
- VivaFPV 4 合 1 ESC 即插即用接口，支持 ESC 遥测和电流传感器
- TBS Unify Pro HV 即插即用接口（7 针）
- 可直接焊接 TBS Crossfire Nano 和 TBS Crossfire Nano Diversity RX
- 5 个 UART（UART1 = RX，UART2 = VTX）
- 板载电流传感器和相机控制
- 30.5 x 30.5 mm 安装孔距
- 用于固件升级的 Micro USB 接口

### 所有 UART 均引出至板载焊盘

| 编号 | 标识   | RX   | TX   | 备注                             |
| ---- | ------ | ---- | ---- | -------------------------------- |
| 1    | USART1 | PB7  | PA9  | PB7 用于 SBUS 输入（内置反相器） |
| 2    | USART2 | PA3  | PA2  | TRAMP/SmartAudio 专用焊盘        |
| 3    | USART3 | PB11 | PB10 | GPS                              |
| 4    | USART4 | PA1  | PA0  | PA0 用于 RSSI、FPORT、TEL 等     |
| 5    | USART5 | PD2  | PC12 | 预留焊盘                         |

### I2C1 与 GPS 接口共用，也可用于气压计、罗盘等

| 编号 | 标识 | 功能 | 引脚 | 备注            |
| ---- | ---- | ---- | ---- | --------------- |
| 1    | I2C1 | SDA  | PB9  | 与 GPS 接口共用 |
| 2    | I2C1 | SCL  | PB8  | 与 GPS 接口共用 |

### 蜂鸣器与 LED 输出

| 编号 | 标识   | 功能 | 引脚 | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | LED0   | LED  | PC14 |      |
| 2    | BEEPER | BEE  | PC13 |      |

### 6 路输出与 1 路 PPM 输入

| 编号 | 标识      | 功能    | 引脚 | 备注                   |
| ---- | --------- | ------- | ---- | ---------------------- |
| 1    | TIM12_CH2 | PPM     | PB15 | PPM                    |
| 2    | TIM3_CH3  | OUTPUT1 | PB0  | DMA1_Stream7           |
| 3    | TIM8_CH1  | OUTPUT2 | PC6  | DMA2_Stream2           |
| 4    | TIM1_CH3  | OUTPUT3 | PA10 | DMA2_Stream6           |
| 5    | TIM1_CH1  | OUTPUT4 | PA8  | DMA2_Stream1           |
| 6    | TIM8_CH3  | OUTPUT5 | PC8  | DMA2_Stream4           |
| 7    | TIM3_CH4  | OUTPUT6 | PB1  | DMA1_Stream2           |
| 10   | TIM4_CH1  | PWM     | PB6  | DMA1_Stream0 LED_STRIP |
| 11   | TIM2_CH1  | PWM     | PA5  | FPV 相机控制（FCAM）   |

### 陀螺仪与加速度计（ICM20602/MPU6000）

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI1 | SCK  | PB3  |      |
| 2    | SPI1 | MISO | PA6  |      |
| 3    | SPI1 | MOSI | PA7  |      |
| 4    | SPI1 | CS   | PC4  |      |

### MAX7456 OSD

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI3 | SCK  | PC10 |      |
| 2    | SPI3 | MISO | PC11 |      |
| 3    | SPI3 | MOSI | PB5  |      |
| 4    | SPI3 | CS   | PA15 |      |

### 16MB Flash

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| 1    | SPI2 | SCK  | PB13 |      |
| 2    | SPI2 | MISO | PB14 |      |
| 3    | SPI2 | MOSI | PC3  |      |
| 4    | SPI2 | CS   | PB12 |      |
