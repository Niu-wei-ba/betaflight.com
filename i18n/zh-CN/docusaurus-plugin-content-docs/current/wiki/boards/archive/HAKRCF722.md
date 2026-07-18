# HAKRCF722

### 硬件与功能

- STM32CubeMX
- MCU：STM32F722RET6
- IMU：MPU6000（SPI）
- VCP：支持
- OSD：Betaflight OSD
- 电池电压传感器：支持
- 稳定的电源调节：9 V/2 A DCDC BEC，可为 VTX、摄像头等供电；通过焊盘可选择 5 V 或 9 V
- 串行 LED 接口（LED_STRIP）
- 5 个 UART
- 气压计：QMP6988/BMP280（I2C1）
- GPS

### 外设映射

| 外设   | 模式/功能       | 引脚     |
| ------ | --------------- | -------- |
| ADC1   | ADC1_IN10       | PC0      |
| ADC1   | ADC1_IN11       | PC1      |
| ADC1   | ADC1_IN12       | PC2      |
| I2C1   | SCL             | PB8      |
| I2C1   | SDA             | PB9      |
| RCC    | OSC_IN          | PH0      |
| RCC    | OSC_OUT         | PH1      |
| SPI1   | MISO            | PA6      |
| SPI1   | MOSI            | PA7      |
| SPI1   | SCK             | PB3      |
| SPI1   | NSS             | PA4      |
| SPI2   | MISO            | PB14     |
| SPI2   | MOSI            | PC3      |
| SPI2   | SCK             | PB13     |
| SPI2   | NSS             | PB12     |
| SPI3   | MISO            | PC11     |
| SPI3   | MOSI            | PB5      |
| SPI3   | SCK             | PC10     |
| TIM1   | CH1             | PA8      |
| TIM1   | CH3             | PA10     |
| TIM2   | CH1             | PA5      |
| TIM3   | CH2             | PC7      |
| TIM3   | CH3             | PB0      |
| TIM3   | CH4             | PB1      |
| TIM4   | CH1             | PB6      |
| TIM8   | CH1             | PC6      |
| TIM8   | CH3             | PC8      |
| TIM8   | CH4             | PC9      |
| TIM12  | CH2（输入捕获） | PB15     |
| UART4  | RX              | PA1      |
| UART4  | TX              | PA0-WKUP |
| UART5  | RX              | PD2      |
| UART5  | TX              | PC12     |
| USART1 | RX              | PB7      |
| USART1 | TX              | PA9      |
| USART2 | RX              | PA3      |
| USART2 | TX              | PA2      |
| USART3 | RX              | PB11     |
| USART3 | TX              | PB10     |

### 引脚定义

| 引脚     | 复用功能  | 标签          |
| -------- | --------- | ------------- |
| PC13     | GPIO 输出 | LED0          |
| PC14     | GPIO 输出 | BEEPER        |
| PC0      | ADC1_IN10 | RSSI          |
| PC1      | ADC1_IN11 | VBAT          |
| PC2      | ADC1_IN12 | CURR          |
| PC3      | SPI2_MOSI |               |
| PA0-WKUP | UART4_TX  | 扩展/UART4_TX |
| PA1      | UART4_RX  |               |
| PA2      | USART2_TX |               |
| PA3      | USART2_RX |               |
| PA4      | SPI1_NSS  |               |
| PA5      | TIM2_CH1  |               |
| PA6      | SPI1_MISO |               |
| PA7      | SPI1_MOSI |               |
| PC4      | GPIO 输出 | SPI1_CS       |
| PB0      | TIM3_CH3  | 输出 1        |
| PB1      | TIM3_CH4  | 输出 6        |
| PB10     | USART3_TX |               |
| PB11     | USART3_RX |               |
| PB12     | SPI2_NSS  |               |
| PB13     | SPI2_SCK  |               |
| PB14     | SPI2_MISO |               |
| PB15     | TIM12_CH2 | PPM           |
| PC6      | TIM8_CH1  | 输出 2        |
| PC7      | TIM3_CH2  | 输出 7        |
| PC8      | TIM8_CH3  | 输出 5        |
| PC9      | TIM8_CH4  | 输出 8        |
| PA8      | TIM1_CH1  | 输出 4        |
| PA9      | USART1_TX |               |
| PA10     | TIM1_CH3  | 输出 3        |
| PA13     | SWDIO     |               |
| PA14     | SWCLK     |               |
| PA15     | SPI3_NSS  |               |
| PC10     | SPI3_SCK  |               |
| PC11     | SPI3_MISO |               |
| PC12     | UART5_TX  |               |
| PD2      | UART5_RX  |               |
| PB3      | SPI1_SCK  |               |
| PB4      | GPIO 输出 | 反相器        |
| PB5      | SPI3_MOSI |               |
| PB6      | TIM4_CH1  | LED1          |
| PB7      | USART1_RX |               |
| PB8      | I2C1_SCL  |               |
| PB9      | I2C1_SDA  |               |

## 制造商和经销商

HAKRC Loopur

## 设计者

HAKRC Loopur
