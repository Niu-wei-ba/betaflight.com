# Seriously Pro SP Racing F3（Acro/Deluxe）

Seriously Pro Racing F3（SPRacingF3）是第一款专为 Cleanflight 设计的板卡。

直接从 SeriouslyPro / SP Racing 或官方零售商购买板卡，有助于资助 Cleanflight 开发；官方零售商始终列于 SeriouslyPro.com。

完整信息：

http://seriouslypro.com/spracingf3

## 硬件特性

- 完整 I/O：可同时连接 OSD、SmartPort、SBus、GPS、LED 灯带、电池监测、声纳和 8 路电机。
- 板载大容量 Blackbox 飞行日志记录器，便于调参（Acro 和 Deluxe）。
- STM32 F3 处理器，带硬件 FPU 和 ARM Cortex-M4 内核。
- 可堆叠设计，适合与 OSD 和配电板集成。
- 16 路 PWM I/O，可连接 ESC、舵机和传统接收机；其中 8 路在标准排针，8 路在侧边连接器。
- 支持 SBus、SumH、SumD、Spektrum1024/2048、XBus、PPM 和 PWM 接收机，内置反相器。
- 可编程 LED 专用输出、OLED 显示屏专用 I2C 端口、电压/电流监测、蜂鸣器端口。
- 额外焊盘：声纳、PPM、RSSI、电流、GPIO、LED 灯带、3.3 V。
- SWD 调试端口和 BOOT 模式选择，带不可变砖引导加载程序。
- 对称布局，支持排针、JST-SH 插座或焊盘布线；气压计置于底面，便于隔绝风压。

## 串口

| 编号 | 标识符 | RX           | TX           | 5 V 容限 | 备注                                                               |
| ---- | ------ | ------------ | ------------ | -------- | ------------------------------------------------------------------ |
| 1    | USART1 | PA10         | PA9          | 是       | 通过 CP2102 IC 与 USB 内部连接，也可通过 USART1 JST 和通孔引脚使用 |
| 2    | USART2 | PA15         | PA14         | 是       | 仅位于 USART2 JST 端口                                             |
| 3    | USART3 | PB11 / IO2_3 | PB10 / IO2_4 | 否       | 位于 IO_2、USART3 JST 和通孔引脚                                   |

- SWD 与 USART2 不能同时使用。
- USART1 RX/TX 接有外设时可能导致刷写失败；请关闭外设电源或断开连接。

## 引脚定义

完整引脚图见：

http://seriouslypro.com/spracingf3#manual

### IO_1

RX_PARALLEL_PWM 模式：

| 引脚    | 功能                        | 备注                        |
| ------- | --------------------------- | --------------------------- |
| 1       | GND                         |                             |
| 2       | VCC_IN                      | BEC 提供的电压              |
| 3/4/5/6 | RC_CH1/RC_CH2/RC_CH5/RC_CH6 |                             |
| 7       | LED_STRIP                   | 启用 `feature LED_STRIP`    |
| 8       | VCC                         | 仅供低电流应用的 3.3 V 输出 |

RX_PPM/RX_SERIAL 模式：

| 引脚 | 功能                            | 备注                        |
| ---- | ------------------------------- | --------------------------- |
| 1    | GND                             |                             |
| 2    | VCC_IN                          | BEC 提供的电压              |
| 3    | RX_PPM                          | 启用 `feature RX_PPM`       |
| 4    | GPIO                            |                             |
| 5/6  | SoftSerial1_RX / SoftSerial1_TX |                             |
| 7    | LED_STRIP                       | 启用 `feature LED_STRIP`    |
| 8    | VCC                             | 仅供低电流应用的 3.3 V 输出 |

### IO_2

RX_PARALLEL_PWM 模式：

| 引脚 | 功能                                  | 备注              |
| ---- | ------------------------------------- | ----------------- |
| 1    | GND                                   |                   |
| 2    | VCC_IN                                | BEC 提供的电压    |
| 3/4  | RC_CH3 / RC_CH4                       |                   |
| 5/6  | RC_CH7/SONAR_TRIG / RC_CH8/SONAR_ECHO |                   |
| 7/8  | ADC_1 / ADC_2                         | 电流传感器 / RSSI |

RX_PPM/RX_SERIAL 模式：

| 引脚 | 功能                                                  | 备注                            |
| ---- | ----------------------------------------------------- | ------------------------------- |
| 1    | GND                                                   |                                 |
| 2    | VCC_IN                                                | BEC 提供的电压                  |
| 3/4  | RX_SERIAL / UART3_TX                                  | UART3 RX/TX                     |
| 5/6  | SONAR_TRIG/SoftSerial2_RX / SONAR_ECHO/SoftSerial2_TX | 启用 `feature SONAR/SOFTSERIAL` |
| 7/8  | ADC_1 / ADC_2                                         | 电流传感器 / RSSI               |

### UART1/2/3

| 引脚 | 功能   | 备注           |
| ---- | ------ | -------------- |
| 1    | GND    |                |
| 2    | VCC_IN | BEC 提供的电压 |
| 3    | TXD    |                |
| 4    | RXD    |                |

### I2C

| 引脚 | 功能      | 备注                         |
| ---- | --------- | ---------------------------- |
| 1    | GND       |                              |
| 2    | 5.0 V     | 由 BEC 或 USB 提供，始终有电 |
| 3/4  | SCL / SDA |                              |

### SWD

该端口不能与 UART2 同时使用。

| 引脚 | 功能   |
| ---- | ------ |
| 1    | GND    |
| 2    | NRST   |
| 3    | SWDIO  |
| 4    | SWDCLK |

参考：[SPRF3](http://seriouslypro.com/files/SPRacingF3-Manual-latest.pdf)
