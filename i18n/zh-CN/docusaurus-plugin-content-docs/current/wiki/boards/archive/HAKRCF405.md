# HAKRC F405

### 硬件与功能

- STM32CubeMX
- MCU：STM32F405RGT6
- IMU：MPU6000（SPI）
- 支持 VCP
- OSD：Betaflight OSD
- 支持电池电压检测
- 稳压供电；为图传发射器（VTX）、摄像头等设备提供 9 V/2 A DC-DC BEC，焊盘可选择 5 V 或 9 V 输出
- 串行 LED 接口（`LED_STRIP`）
- 5 路 UART
- 气压计：QMP6988/BMP280（`I2C1`）
- GPS 接口

| 外设   | 模式              | 功能             | 引脚                |
| ------ | ----------------- | ---------------- | ------------------- |
| ADC1   | IN10              | `ADC1_IN10`      | PC0                 |
| ADC1   | IN11              | `ADC1_IN11`      | PC1                 |
| ADC1   | IN12              | `ADC1_IN12`      | PC2                 |
| I2C1   | SMBus 两线接口    | `I2C1_SCL`       | PB8                 |
| I2C1   | SMBus 两线接口    | `I2C1_SDA`       | PB9                 |
| RCC    | 晶体/陶瓷谐振器   | `RCC_OSC_IN`     | PH0-OSC_IN          |
| RCC    | 晶体/陶瓷谐振器   | `RCC_OSC_OUT`    | PH1-OSC_OUT         |
| SPI1   | 全双工主机        | `SPI1_MISO`      | PA6                 |
| SPI1   | 全双工主机        | `SPI1_MOSI`      | PA7                 |
| SPI1   | 全双工主机        | `SPI1_SCK`       | PB3                 |
| SPI1   | 硬件 NSS 输入信号 | `SPI1_NSS`       | PA4                 |
| SPI2   | 全双工主机        | `SPI2_MISO`      | PB14                |
| SPI2   | 全双工主机        | `SPI2_MOSI`      | PC3                 |
| SPI2   | 全双工主机        | `SPI2_SCK`       | PB13                |
| SPI2   | 硬件 NSS 输出信号 | `SPI2_NSS`       | PB12                |
| SPI3   | 全双工主机        | `SPI3_MISO`      | PC11                |
| SPI3   | 全双工主机        | `SPI3_MOSI`      | PB5                 |
| SPI3   | 全双工主机        | `SPI3_SCK`       | PC10                |
| SYS    | SysTick           | `SYS_VS_Systick` | `VP_SYS_VS_Systick` |
| TIM1   | 输出比较 CH1      | `TIM1_CH1`       | PA8                 |
| TIM1   | 输出比较 CH3      | `TIM1_CH3`       | PA10                |
| TIM2   | 输出比较 CH1      | `TIM2_CH1`       | PA5                 |
| TIM3   | 输出比较 CH2      | `TIM3_CH2`       | PC7                 |
| TIM3   | 输出比较 CH3      | `TIM3_CH3`       | PB0                 |
| TIM3   | 输出比较 CH4      | `TIM3_CH4`       | PB1                 |
| TIM4   | 输出比较 CH1      | `TIM4_CH1`       | PB6                 |
| TIM8   | 输出比较 CH1      | `TIM8_CH1`       | PC6                 |
| TIM8   | 输出比较 CH3      | `TIM8_CH3`       | PC8                 |
| TIM8   | 输出比较 CH4      | `TIM8_CH4`       | PC9                 |
| TIM12  | 直接模式输入捕获  | `TIM12_CH2`      | PB15                |
| UART4  | 多处理器通信      | `UART4_RX`       | PA1                 |
| UART4  | 多处理器通信      | `UART4_TX`       | PA0-WKUP            |
| UART5  | 多处理器通信      | `UART5_RX`       | PD2                 |
| UART5  | 多处理器通信      | `UART5_TX`       | PC12                |
| USART1 | 多处理器通信      | `USART1_RX`      | PB7                 |
| USART1 | 多处理器通信      | `USART1_TX`      | PA9                 |
| USART2 | 多处理器通信      | `USART2_RX`      | PA3                 |
| USART2 | 多处理器通信      | `USART2_TX`      | PA2                 |
| USART3 | 多处理器通信      | `USART3_RX`      | PB11                |
| USART3 | 多处理器通信      | `USART3_TX`      | PB10                |

| 引脚编号 | 引脚           | 功能             | 标签              |
| -------- | -------------- | ---------------- | ----------------- |
| 2        | PC13-ANTI_TAMP | GPIO 输出        | LED0              |
| 3        | PC14-OSC32_IN  | GPIO 输出        | Beep              |
| 5        | PH0-OSC_IN     | `RCC_OSC_IN`     |                   |
| 6        | PH1-OSC_OUT    | `RCC_OSC_OUT`    |                   |
| 8        | PC0            | `ADC1_IN10`      | RSSI              |
| 9        | PC1            | `ADC1_IN11`      | VBAT              |
| 10       | PC2            | `ADC1_IN12`      | CURR              |
| 11       | PC3            | `SPI2_MOSI`      |                   |
| 14       | PA0-WKUP       | `UART4_TX`       | extend/`UART4_TX` |
| 15       | PA1            | `UART4_RX`       |                   |
| 16       | PA2            | `USART2_TX`      |                   |
| 17       | PA3            | `USART2_RX`      |                   |
| 20       | PA4            | `SPI1_NSS`       |                   |
| 21       | PA5            | `TIM2_CH1`       |                   |
| 22       | PA6            | `SPI1_MISO`      |                   |
| 23       | PA7            | `SPI1_MOSI`      |                   |
| 24       | PC4            | GPIO 输出        | `SPI1_CS`         |
| 26       | PB0            | `TIM3_CH3`       | OUTPUT1           |
| 27       | PB1            | `TIM3_CH4`       | OUTPUT6           |
| 29       | PB10           | `USART3_TX`      |                   |
| 30       | PB11           | `USART3_RX`      |                   |
| 33       | PB12           | `SPI2_NSS`       |                   |
| 34       | PB13           | `SPI2_SCK`       |                   |
| 35       | PB14           | `SPI2_MISO`      |                   |
| 36       | PB15           | `TIM12_CH2`      | PPM               |
| 37       | PC6            | `TIM8_CH1`       | OUTPUT2           |
| 38       | PC7            | `TIM3_CH2`       | OUTPUT7           |
| 39       | PC8            | `TIM8_CH3`       | OUTPUT5           |
| 40       | PC9            | `TIM8_CH4`       | OUTPUT8           |
| 41       | PA8            | `TIM1_CH1`       | OUTPUT4           |
| 42       | PA9            | `USART1_TX`      |                   |
| 43       | PA10           | `TIM1_CH3`       | OUTPUT3           |
| 46       | PA13\*         | `SYS_JTMS-SWDIO` |                   |
| 49       | PA14\*         | `SYS_JTCK-SWCLK` |                   |
| 50       | PA15\*         | `SPI3_NSS`       |                   |
| 51       | PC10           | `SPI3_SCK`       |                   |
| 52       | PC11           | `SPI3_MISO`      |                   |
| 53       | PC12           | `UART5_TX`       |                   |
| 54       | PD2            | `UART5_RX`       |                   |
| 55       | PB3            | `SPI1_SCK`       |                   |
| 56       | PB4            | GPIO 输出        | Inverter          |
| 57       | PB5            | `SPI3_MOSI`      |                   |
| 58       | PB6            | `TIM4_CH1`       | LED1              |
| 59       | PB7            | `USART1_RX`      | `USART1_RX`       |
| 61       | PB8            | `I2C1_SCL`       |                   |
| 62       | PB9            | `I2C1_SDA`       |                   |

## 制造商与经销商

HAKRC Loopur

## 设计方

HAKRC Loopur
