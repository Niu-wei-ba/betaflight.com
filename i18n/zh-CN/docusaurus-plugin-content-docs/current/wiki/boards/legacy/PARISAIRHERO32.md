# Paris Air Hero 32 / Acro Naze 32 Mini

该板使用与 Naze32 相同的固件。

## 传感器

MPU6500，通过 SPI 接口连接。

## 端口

- 6 路 3 针 ESC/舵机输出
- 1 个 8 针 JST 连接器（PPM/PWM/UART2）
- 1 个 4 针 JST 连接器（UART3/I2C）

## 引脚定义

在 RX_PPM/RX_SERIAL 模式下，10 针 RC I/O 连接器定义如下。从板边观察插座时，顺序为从右至左。

| 引脚 | 功能      | 备注                                                                |
| ---- | --------- | ------------------------------------------------------------------- |
| 1    | GND       |                                                                     |
| 2    | +5V       |                                                                     |
| 3    | RX_PPM    | 启用 `feature RX_PPM`                                               |
| 4    | RSSI_ADC  | 启用 `feature RSSI_ADC`；连接 PWM-RSSI 调理器输出，输入范围 0-3.3 V |
| 5    | USART2 TX |                                                                     |
| 6    | USART2 RX | 内置反相器                                                          |
| 7    | LED_STRIP | 启用 `feature LED_STRIP`                                            |
| 8    | 未使用    |                                                                     |

启用 SOFTSERIAL 后，LED_STRIP 与 CURRENT_METER 不可用，但可使用一个 SoftSerial 端口：

| 引脚 | 功能           | 备注                      |
| ---- | -------------- | ------------------------- |
| 7    | SOFTSERIAL1 RX | 启用 `feature SOFTSERIAL` |
| 8    | SOFTSERIAL1 TX |                           |

## 串口

| 编号 | 标识符      | RX        | TX               | 备注                                                                   |
| ---- | ----------- | --------- | ---------------- | ---------------------------------------------------------------------- |
| 1    | USART1      | RX / PA10 | TX / PA9 / TELEM | TELEM 输出始终反相（用于 FrSky），并通过 CP2102 IC 与 USB 端口内部相连 |
| 2    | USART2      | RC4 / PA3 | RC3 / PA2        |                                                                        |
| 3    | USART3      | F3 / PB11 | F2 / PB10        | 配置 Flex 端口后作为 UART3 使用                                        |
| 4    | SOFTSERIAL1 | RC5 / PA6 | RC6 / PA7        |                                                                        |
