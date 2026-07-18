# CrazyBee F4 FR Pro

![CrazyBee F4 FR Pro 正面](images/CrazyBeeF4FRProTop.jpg)
![CrazyBee F4 FR Pro 背面](images/CrazyBeeF4FRProBot.jpg)

## 描述

CrazyBee F4 FR Pro 是一款高度集成的飞控板（接收机、四合一 ESC、OSD、电流传感器），适用于 1-2S Whoop 无刷竞速四轴。

## MCU、传感器和功能

### 硬件和功能

- MCU：STM32F411CEU6（100 MHz、512K Flash）
- IMU：MPU6000（SPI）
- OSD：Betaflight OSD
- 电池电压传感器：支持
- 电源：1-2S 电池输入（DC 3.5-8.7V）
- 内置 5V 1A 降压/升压电源，带 LC 滤波
- 集成电流传感器：最大 28A；电流计比例设为 1175
- 内置 SPI FrSky 接收机，支持遥测（D8/D16 可切换）
- UART1 RX 集成 SBUS 反相器，可用于外接接收机
- 集成 4 路 BLHeli_S ESC：每路最大 5A（EMF8BB21F16G）
- ESC 接口：3 针，PicoBlade，1.25 mm 间距
- 蜂鸣器输出：2 针焊盘
- 接收机状态 LED：4 个（2 红、2 白）
- 板卡尺寸：28.5 x 28.5 mm

## 资源映射

| 标签             | 引脚 | 定时器    | DMA | 默认值 | 说明 |
| ---------------- | ---- | --------- | --- | ------ | ---- |
| MPU6000_INT_EXTI | PA1  |           |     |        |      |
| MPU6000_CS_PIN   | PA4  |           |     |        | SPI1 |
| MPU6000_SCK_PIN  | PA5  |           |     |        | SPI1 |
| MPU6000_MISO_PIN | PA6  |           |     |        | SPI1 |
| MPU6000_MOSI_PIN | PA7  |           |     |        | SPI1 |
| OSD_CS_PIN       | PB12 |           |     |        | SPI2 |
| OSD_SCK_PIN      | PB13 |           |     |        | SPI2 |
| OSD_MISO_PIN     | PB14 |           |     |        | SPI2 |
| OSD_MOSI_PIN     | PB15 |           |     |        | SPI2 |
| RX_CS_PIN        | PA15 |           |     |        | SPI3 |
| RX_SCK_PIN       | PB3  |           |     |        | SPI3 |
| RX_MISO_PIN      | PB4  |           |     |        | SPI3 |
| RX_MOSI_PIN      | PB5  |           |     |        | SPI3 |
| RX_GDO0_PIN      | PC14 |           |     |        |      |
| BIND_PLUG_PIN    | PB2  |           |     |        |      |
| RX_LED_PIN       | PB9  |           |     |        |      |
| PWM1             | PB8  | TIM2, CH3 |     |        |      |
| PWM2             | PB9  | TIM4, CH1 |     |        |      |
| PWM3             | PA3  | TIM4, CH2 |     |        |      |
| PWM4             | PA2  | TIM4, CH3 |     |        |      |
| VBAT_ADC_PIN     | PB0  |           |     |        | ADC1 |
| CURRENT_ADC_PIN  | PB1  |           |     |        | ADC1 |
| BEEPER           | PC15 |           |     |        |      |
| UART1 TX         | PA9  |           |     |        |      |
| UART1 RX         | PA10 |           |     |        |      |
| UART2 TX         | PA2  |           |     |        |      |
| UART2 RX         | PA3  |           |     |        |      |

## 制造商和经销商

- 制造商：http://www.happymodel.cn/
- 经销商：待补充。

## 设计者

## 维护者

## 常见问题与已知问题

FrSky 版本：

- 要与 Taranis 绑定，需要使用非 EU 版 OpenTX，以便启用接收机绑定所需的 D8 模式。出厂默认的 Betaflight 接收机模式为 `FRSKY_X`，必要时请调整。
- FrSky X（8/16 通道）和 FrSky D（8 通道）均可稳定工作，包括与 Crash Flip / DShot Beacon 组合使用，但必须禁用 `TELEMETRY` 功能。即使禁用该功能，RSSI、电池电压等基础遥测仍会发送。
- 在 FrSky D 模式下，启用 `TELEMETRY` 后可能偶发掉线；这取决于启用的传感器数量（BARO、GPS 等），可能由时序超限导致。
- 在 FrSky X 模式下，`TELEMETRY` 功能会因遥测生成代码中的缺陷导致硬锁死。

## 其他资源

- 用户手册：http://www.happymodel.cn/wp-content/uploads/2019/01/CrazyBee-F4FR-Pro-Frsky-version-Manual-.pdf
