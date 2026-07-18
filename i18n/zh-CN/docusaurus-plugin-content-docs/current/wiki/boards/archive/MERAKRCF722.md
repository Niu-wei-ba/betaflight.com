# MERAKRCF722

MERAKRCF722 飞控采用优化布局，便于进行简洁、可靠的接线。为确保良好的飞行体验，飞控使用高性能 MPU6000 陀螺仪，并经过长期飞行验证以确保性能稳定。详情请参阅 MERAK RC 网站：http://www.merakrc.com

### 硬件

- 处理器与传感器
  - MCU：STM32F722RET6
  - IMU1：MPU6000（0°）
  - OSD：BetaFlight OSD（AT7456E）
  - Blackbox：W25Q128 闪存（16MB）
- 6 路 DShot 输出
- 5 个 UART（UART5 支持 SerialRX）
- 稳定的电源调节：9V/2A DC-DC BEC 用于 VTX、相机等；5V/2A DC-DC BEC 用于飞控、WS2812 等。
- 独立的相机控制。

### 引脚定义

### 所有 UART 均引出焊盘

| 编号 | 标识   |  RX  |  TX  | 备注    |
| :--: | :----- | :--: | :--: | :------ |
|  1   | USART1 | PA10 | PA9  |         |
|  2   | USART2 | PA3  | PA2  |         |
|  3   | USART3 | PB11 | PB10 |         |
|  4   | USART4 | PC11 | PC10 |         |
|  5   | USART5 | PD2  | PC12 | RX 输入 |

### 蜂鸣器/LED 输出

| 编号 | 标识   | 功能   | 引脚 | 备注 |
| :--: | :----- | :----- | :--: | :--- |
|  1   | LED0   | LED    | PC13 |      |
|  2   | BEEPER | 蜂鸣器 | PC14 |      |

### VBAT 输入、电流输入和模拟 RSSI 输入

| 编号 | 标识 | 功能    | 引脚 | 备注 |
| :--: | :--- | :------ | :--: | :--- |
|  1   | ADC1 | VBAT    | PC2  |      |
|  2   | ADC1 | CURRENT | PC1  |      |
|  3   | ADC1 | RSSI    | PC3  |      |

### PWM 输入、PWM 输出、LED 灯带与相机控制

| 编号 | 标识      | 功能     | 引脚 | 备注 |
| :--: | :-------- | :------- | :--: | :--- |
|  1   | TIM8_CH3  | PPM      | PC8  |      |
|  2   | TIM3_CH1  | 电机 1   | PC6  |      |
|  3   | TIM3_CH2  | 电机 2   | PC7  |      |
|  4   | TIM5_CH1  | 电机 3   | PA0  |      |
|  5   | TIM5_CH2  | 电机 4   | PA1  |      |
|  6   | TIM3_CH3  | 电机 5   | PB0  |      |
|  7   | TIM1_CH3N | 电机 6   | PB1  |      |
|  8   | TIM4_CH3  | LED 灯带 | PB8  |      |
|  9   | TIM11_CH1 | 相机控制 | PB9  |      |

### 陀螺仪与加速度计 MPU6000

| 编号 | 标识 | 功能 | 引脚 | 备注        |
| :--: | :--- | :--- | :--: | :---------- |
|  1   | SPI2 | SCK  | PB13 | MPU6000     |
|  2   | SPI2 | MISO | PB14 | MPU6000     |
|  3   | SPI2 | MOSI | PB15 | MPU6000     |
|  4   | SPI2 | CS1  | PB12 | MPU6000_CS  |
|  5   | IO   | INT2 | PC4  | MPU6000_INT |

### OSD MAX7456

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| :--: | :--- | :--- | :--: | :--- |
|  1   | SPI3 | SCK  | PB3  |      |
|  2   | SPI3 | MISO | PB4  |      |
|  3   | SPI3 | MOSI | PB5  |      |
|  4   | SPI3 | CS   | PA15 |      |

### Flash Blackbox

| 编号 | 标识 | 功能 | 引脚 | 备注 |
| :--: | :--- | :--- | :--: | :--- |
|  1   | SPI1 | SCK  | PA5  |      |
|  2   | SPI1 | MISO | PA6  |      |
|  3   | SPI1 | MOSI | PA7  |      |
|  4   | SPI1 | CS   | PA4  |      |
