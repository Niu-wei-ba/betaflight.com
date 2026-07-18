# AbuseMark Naze32

Naze32 target 支持所有 Naze 硬件修订版。主维护者经常使用修订版 4 和 5 飞行；较早的硬件修订版可能存在问题，发现后请通过 [GitHub issue tracker](https://github.com/cleanflight/cleanflight/issues) 报告。

## 串口

| 编号 | 标识符      | RX        | TX               | 备注                                                                   |
| ---- | ----------- | --------- | ---------------- | ---------------------------------------------------------------------- |
| 1    | USART1      | RX / PA10 | TX / PA9 / TELEM | TELEM 输出始终反相（用于 FrSky），并通过 CP2102 IC 与 USB 端口内部相连 |
| 2    | USART2      | RC4 / PA3 | RC3 / PA2        |                                                                        |
| 4    | SOFTSERIAL1 | RC5 / PA6 | RC6 / PA7        |                                                                        |
| 5    | SOFTSERIAL2 | RC7 / PB0 | RC8 / PB1        |                                                                        |

- USART1、TX 与 TELEM 引脚不能同时使用。
- RX/TX 引脚接有外设时可能导致刷写失败；请先断开 RX/TX。

## 引脚定义

在 RX_PPM/RX_SERIAL 模式下，10 针 RC I/O 连接器定义如下：

| 引脚 | 标识   | 功能                 | 备注                                                                |
| ---- | ------ | -------------------- | ------------------------------------------------------------------- |
| 1    |        | GND                  |                                                                     |
| 2    | Circle | +5V                  |                                                                     |
| 3    | 1      | RX_PPM               | 启用 `feature RX_PPM`                                               |
| 4    | 2      | RSSI_ADC             | 启用 `feature RSSI_ADC`；连接 PWM-RSSI 调理器输出，输入范围 0-3.3 V |
| 5    | 3      | USART2 TX            |                                                                     |
| 6    | 4      | USART2 RX            |                                                                     |
| 7    | 5      | LED_STRIP            | 启用 `feature LED_STRIP`                                            |
| 8    | 6      | 未使用               |                                                                     |
| 9    | 7      | Sonar Trigger        |                                                                     |
| 10   | 8      | Sonar Echo / CURRENT | 启用 `feature CURRENT_METER`；连接电流传感器输出，输入范围 0-3.3 V  |

启用 SOFTSERIAL 后，LED_STRIP 与 CURRENT_METER 不可用，但可改用两个 SoftSerial 端口：

| 引脚 | 标识 | 功能           | 备注                      |
| ---- | ---- | -------------- | ------------------------- |
| 7    | 5    | SOFTSERIAL1 RX | 启用 `feature SOFTSERIAL` |
| 8    | 6    | SOFTSERIAL1 TX |                           |
| 9    | 7    | SOFTSERIAL2 RX |                           |
| 10   | 8    | SOFTSERIAL2 TX |                           |

## 恢复

### 板卡

- 短接标为 `Boot` 的两个焊盘，**务必不要碰到 5V 焊盘**。
- 为板卡供电。
- 移除短接。

### Cleanflight Configurator

- 选择正确硬件和所需的 Cleanflight 固件版本。
- 勾选 “No reboot sequence”。
- 刷写固件。

```text
/-------------------\\
|O                 O|
| []5V              |
| [][]Boot          |
|                   |
|                   |
|                   |
|                   |
|O                 O|
\\-------[USB]-------/
```

### GPS

- 受 Flash 空间限制，GPS **不可用**；可能可通过自定义固件启用。
