# CrazyBee F3 FS

## 说明

![CrazyBee F3 FS 正面](./images/CrazyBeeF3FStop.jpg)
![CrazyBee F3 FS 背面](./images/CrazyBeeF3FSbottom.jpg)

CrazyBee F3 FS 是一块面向 1S Whoop 无刷竞速机的高度集成飞控。它可能是全球首批在 Tiny Whoop 尺寸内集成接收机、四合一 ESC、OSD 和电流表的无刷飞控之一。

## MCU、传感器与功能

### 硬件与特性

- MCU：STM32F303CCT6
- IMU：MPU6000（SPI）
- IMU 中断：支持
- VCP：支持
- OSD：Betaflight OSD
- 电池电压传感器：支持
- 集成稳压器：支持，升压型，5 V / 800 mA
- 集成电流传感器：最大 14 A，更换电阻后可改为 28 A
- 集成兼容 Flysky 的接收机
- 按键：1 个（接收机对频按键）
- 集成 4 路 BlHeli_S ESC：每路最大 5 A
- ESC 连接器：3 针，PicoBlade，1.25 mm 间距
- 蜂鸣器输出：2 针焊盘
- 4 个接收机状态 LED：2 个红色、2 个白色

## 资源映射

| 标签             | 引脚 | 定时器     | DMA | 默认值 | 说明               |
| ---------------- | ---- | ---------- | --- | ------ | ------------------ |
| MPU6000_INT_EXTI | PC13 |            |     |        |                    |
| MPU6000_CS_PIN   | PA4  |            |     |        | SPI1               |
| MPU6000_SCK_PIN  | PA5  |            |     |        | SPI1               |
| MPU6000_MISO_PIN | PA6  |            |     |        | SPI1               |
| MPU6000_MOSI_PIN | PA7  |            |     |        | SPI1               |
| OSD_CS_PIN       | PB1  |            |     |        | SPI1               |
| OSD_SCK_PIN      | PA5  |            |     |        | SPI1               |
| OSD_MISO_PIN     | PA6  |            |     |        | SPI1               |
| OSD_MOSI_PIN     | PA7  |            |     |        | SPI1               |
| RX_CS_PIN        | PB12 |            |     |        | SPI2               |
| RX_SCK_PIN       | PB13 |            |     |        | SPI2               |
| RX_MISO_PIN      | PB14 |            |     |        | SPI2               |
| RX_MOSI_PIN      | PB15 |            |     |        | SPI2               |
| RX_IRQ_PIN       | PA8  |            |     |        |                    |
| RX_BIND_PIN      | PA9  |            |     |        |                    |
| RX_LED_PIN       | PA10 |            |     |        |                    |
| PWM1             | PB8  | TIM8, CH2  |     |        |                    |
| PWM2             | PB9  | TIM8, CH3  |     |        |                    |
| PWM3             | PA3  | TIM2, CH4  |     |        |                    |
| PWM4             | PA2  | TIM15, CH1 |     |        |                    |
| VBAT_ADC_PIN     | PA0  |            |     |        | ADC1               |
| RSSI_ADC_PIN     | PA1  |            |     |        | ADC1               |
| BEEPER           | PC15 |            |     |        |                    |
| UART3 TX         | PB10 |            |     |        | 将尽快补充引脚定义 |
| UART3 RX         | PB11 |            |     |        | 将尽快补充引脚定义 |

## 制造商和经销商

https://www.banggood.com/Racerstar-Crazybee-F3-Flight-Controller-4-IN-1-5A-1S-Blheli_S-ESC-Compatible-Flysky-AFHDS-Receiver-p-1271331.html

## 设计者

## 维护者

## 常见问题和已知问题

参阅 [CrazyBeeF3FR](./CRAZYBEEF3FR#faq--known-issues) 中相同项目的说明。

## 其他资源

用户手册：http://img.banggood.com/file/products/20180225215703Crazybeef3flysky.pdf
