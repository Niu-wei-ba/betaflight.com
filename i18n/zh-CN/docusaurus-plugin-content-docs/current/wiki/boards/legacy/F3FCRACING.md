# F3FC Racing

由 RCExplorer.se 设计。

完整信息请参阅：

http://rcexplorer.se/product/f3fc-racing/

## 硬件特性

- STM32F303CC 处理器
- 通过 SPI 连接 MPU6000（中断引脚已连接）
- 3 路 UART
- VCP USB
- 6 路 PWM 通道（选择 PPM 输入时，PWM 6 用作 PPM 输入）
- 支持 SBus、SumH、SumD、Spektrum1024/2048、XBus 和 PPM 接收机；无需外置反相器。
- 专用 RGB LED 控制引脚。
- 专用 I2C 端口。
- 集成电池监测。
- 电流传感器输入引脚。
- 蜂鸣器端口。
- 内置 5 V BEC（500 mA）。
- 用于进入 DFU 模式的按键。
- 提供用于 Spektrum 卫星接收机的 3.3 V 焊盘。

## 串行端口

| 数值 | 标识符 | RX   | TX   | 说明                |
| ---- | ------ | ---- | ---- | ------------------- |
| 1    | VCP    | PA11 | PA12 | Mini USB 连接器     |
| 2    | USART1 | PB7  | PB6  | 板上标记为 R1 和 T1 |
| 3    | USART2 | PA3  | PA2  | 板上标记为 R2 和 T2 |
| 4    | USART3 | PB11 | PB10 | 板上标记为 R3 和 T3 |

## 引脚定义

完整引脚定义请参阅：

http://rcexplorer.se/product/f3fc-racing/

### IO

| 焊盘   | 信号 | 说明                     |
| ------ | ---- | ------------------------ |
| Isense | PB2  | 模拟传感器               |
| Vbat   | PA5  | 为内置 BEC 供电的电压    |
| LED    | PB8  | RGB LED 控制             |
| FB     | PA6  | 舵机位置反馈 / RSSI 输入 |
| BZ-    | PA0  | 蜂鸣器输出               |
| 6      | PA1  | 选择后用作 PPM 输入      |
| SCLK   | PA9  | I2C SCLK                 |
| SDA    | PA10 | I2C SDA                  |

PWM 标记为 1 至 6。

## 电压和电流监测

通过连接至 PA5 的 10 k/1 k 分压器，在 “Vbat”（同时为内置 BEC 供电）焊盘测量电压。

Isense 焊盘直接连接至 PB2，期望输入范围为 0 至 3.3 V 的模拟电压。
