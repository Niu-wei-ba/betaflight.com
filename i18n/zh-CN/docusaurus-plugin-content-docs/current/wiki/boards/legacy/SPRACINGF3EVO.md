# Seriously Pro SP Racing F3 EVO

Seriously Pro Racing F3 Evo 主板 (SPRacingF3EVO) 是第一款专为 Cleanflight 设计的主板的演变。

直接从 SeriouslyPro / SP Racing 或官方零售商购买板卡，有助于资助 Cleanflight 开发；官方零售商始终列于 SeriouslyPro.com。

完整详细信息可在网站上找到：

http://seriouslypro.com/spracingf3evo

## 硬件特性

- 下一代 STM32 F3 处理器，具有硬件浮点单元，可实现高效的飞行计算和更快的 ARM-Cortex M4 内核。
- 用于 Blackbox 飞行日志记录器的 MicroSD 卡插槽 - 优化您的调整并查看设置结果，无需猜测。
- 内置竞赛应答器，可记录比赛圈速。
- 采用最新的加速计、陀螺仪、磁力/指南针以及气压/高度传感器技术。
- 使用排针连接所有主要连接，以实现出色的耐碰撞性。使用直角或直排针。
- 完整 I/O：可同时连接 USB、OSD、SmartPort、SBus、GPS、LED 灯带、电池监测和 8 路电机。（声纳将在 CF 1.14 支持）
- 8 条用于 ESC 和舵机的 PWM 输出线。安排方便在标准排针上接线。
- 支持直接连接 SBus、SumH、SumD、Spektrum1024/2048、XBus 接收机。无需外部逆变器（内置）。
- 支持通过 3 针通孔 JST-ZH 连接器直接连接 3.3v Spektrum 卫星接收机。
- 专用 PPM 接收机输入。
- 3 个串行端口 - 不与 USB 插座共享。
- 遥测端口
- 微型 USB 插座。
- 可编程 LED 的专用输出 - 非常适合定向、赛车和夜间飞行。 （目前与应答器互斥）。
- 专用 I2C 端口，用于连接 OLED 显示屏，无需飞行电池。
- 电池电压和电流监控。
- RSSI 监控（模拟或 PWM）。
- 蜂鸣器端口用于发出声音警告和通知。
- 开发人员友好的调试端口（SWD）和启动模式选择，不可破解的启动加载程序。
- 对称设计，布线超级整洁。
- JST-SH 插座仅适用于 I2C、UART2 和 SWD。 UART2 也在通孔引脚上。
- 通过 USB 或串行端口刷新。
- 可堆叠设计 - 非常适合与 OSD 和配电板集成。
- 标准安装 - 36x36mm，带标准 30.5mm 安装孔。
- 3v、5v 和状态 LED 指示灯，便于诊断。
  铜蚀刻的 Cleanflight 标志。

## 串口

| 编号 | 标识符 | RX         | TX           | 5 V 容限 | 备注                                                                                            |
| ---- | ------ | ---------- | ------------ | -------- | ----------------------------------------------------------------------------------------------- |
| 1    | USART1 | PA10       | PA9          | 是       | 2 个通孔销。用于连接 OSD/GPS/蓝牙。                                                             |
| 2    | USART2 | PA15       | PA14 / SWCLK | 是       | JST 插座和 PPM 接头。用于连接到 RX。                                                            |
| 3    | USART3 | PB11 / AF7 | PB10 / AF7   | 否       | 可用于 4 个通孔引脚。仅 3.3V 信号！用于 GPS、Spektrum Satellite RX、SmartPort 遥测、HoTT 遥测等 |

- SWD 与 USART2 不能同时使用。
- 使用串行 RX 接收机时，TXD (T2) 引脚不能用于遥测。请改用 UART3 TXD。
- 不支持 SoftSerial。
- Windows DFU 刷新需要 Zadig（请参阅地面站）

## 引脚排列

完整的引脚排列详细信息可在手册中找到，此处：

http://seriouslypro.com/files/SPRacingF3EVO-Manual-latest.pdf

### IO_1

在 RX_SERIAL 模式下使用时，6 引脚 IO_1 连接器具有以下引脚排列。

| 针  | 功能     | 笔记                     |
| --- | -------- | ------------------------ | --- | --- | ------ | ----------------- |
| 1   | 地面     |                          |     | 2   | VCC_IN | 电压由 BEC 提供。 |
| 3   | RX\_串行 | 启用 `feature RX_SERIAL` |
| 4   |          |                          |
| 5   | +V 电池  | 电压由电池提供。         |
| 6   | -V 电池  | 电压由电池提供。         |

使用 RX_PPM 时，IO_1 引脚排列如下。

| 针  | 功能    | 笔记                     |
| --- | ------- | ------------------------ |
| 1   | 地面    |                          |
| 2   | VCC_IN  | 电压由 BEC 提供。        |
| 3   | RX_PPM  | 启用 `feature RX_PPM`    |
| 4   | 遥测    | 启用 `feature TELEMETRY` |
| 5   | +V 电池 | 电压由电池提供。         |
| 6   | -V 电池 | 电压由电池提供。         |

### IO_2

当使用 TRANSPONDER 且 IR 焊盘短接时，6 引脚 IO_2 引脚排列如下。

| 针  | 功能             | 笔记                              |
| --- | ---------------- | --------------------------------- |
| 1   | 红外-            | IR LED 的短腿                     |
| 2   | 红外+            | IR LED 的长腿                     |
| 3   | 当前             | 电流传感器                        |
| 4   | 接收信号强度指示 | RSSI（PWM 或模拟 - 通过焊盘选择） |
| 5   | 蜂鸣器+          | 5V 电源                           |
| 6   | 蜂鸣器-          | 蜂鸣器信号                        |

当使用 LEDSTRIP 且 LED 焊盘短接时，6 引脚 IO_2 引脚排列如下。

| 针  | 功能             | 笔记                              |
| --- | ---------------- | --------------------------------- |
| 1   |                  |                                   |
| 2   | LED 灯条         | WS2812 LED 灯条数据               |
| 3   | 当前             | 电流传感器                        |
| 4   | 接收信号强度指示 | RSSI（PWM 或模拟 - 通过焊盘选择） |
| 5   | 蜂鸣器+          | 5V 电源                           |
| 6   | 蜂鸣器-          | 蜂鸣器信号                        |

### 串口 1

| 针  | 功能 | 笔记 |
| --- | ---- | ---- |
| 3   | TXD  |      |
| 4   | 接收 |      |

### UART2/3

|针 |功能|笔记|
| ---| -------- | ------------------------ | |
| 1 |地面| |
| 2 | VCC_IN |电压由 BEC 提供。 |
| 3 | TXD | |
| 4 |接收| |

### 频谱卫星

| 针  | 功能 | 笔记 |
| --- | ---- | ---- |
| 3   | 3.3V |      |
| 2   | 地面 |      |
| 1   | 接收 |      |

### I2C

| 针  | 功能 | 笔记                             |
| --- | ---- | -------------------------------- |
| 1   | 地面 |                                  |
| 2   | 5.0V | 电压由 BEC 或 USB 提供，始终开启 |
| 3   | SCL  | 仅 3.3V 信号                     |
| 4   | SDA  | 仅 3.3V 信号                     |

### SWD

该端口不能与 UART2 同时使用。

| 针  | 功能   | 笔记 |
| --- | ------ | ---- |
| 1   | 地面   |      |
| 2   | NRST   |      |
| 3   | SWDIO  |      |
| 4   | SWDCLK |      |

## 硬件补充

### 硬件

- MCU：STM32F3
- IMU：MPU9250 加速度计/陀螺仪/罗盘（SPI）
- IMU 中断：有
- 气压计：BMP280
- VCP：有
- 硬件 UART：3 个
- OSD：无
- Blackbox：MicroSD 卡插槽（SD/SDHC，最大 32GB）
- PPM/UART 共享：UART2
- 电池电压传感器：有
- 集成稳压器：有（最大 3.3 V/100 mA；USB 供电时也提供 5.0 V）
- 有刷电机 MOSFET：无
- 按键：无

### 功能

- PPM：有
- RSSI：有（模拟/PWM）
- 蜂鸣器：有
- 遥测端口：有
- Spektrum 卫星接收机：有（提供连接器）
- 电流传感器：有
- BLHeli 直通：有
- WS2811 LED 灯带：有\*\*
- 竞赛应答器：有\*\*

\*\* 您只能使用 Led Strip 或 Transponder，但不能同时使用两者。

## 硬件设计（如果有）

## 制造商和经销商

[严重专业](http://seriouslypro.com/)

此处提供：[认真的专业商店](http://shop.seriouslypro.com/sp-racing-f3-evo)

## 设计师

硬件设计由[Dominic Clifton](https://github.com/hydra)。## 维护者

[Cleanflight 固件](https://github.com/cleanflight/cleanflight/releases) 和 [GUI 工具](https://chrome.google.com/webstore/detail/cleanflight-configurator/enacoimjcgeinfnnnpajinjgmkahmfgb) 由 [Dominic Clifton](https://github.com/hydra) 维护。

[Betaflight 固件](https://github.com/betaflight/betaflight/releases) 和 [GUI 工具](https://chrome.google.com/webstore/detail/betaflight-configurator/kdaghagfopacdngbohiknlhcocjccjao) 由 [Boris B](https://github.com/borisbstyle) 维护。

## 相似目标

_（在此处添加特性或功能相似但具有单独目标的链接板描述）_

## 变体

_（在此处添加特性或功能相似的板的链接，但在刷新时使用此目标）_

## 常见问题解答和已知问题

- Softserial 在 bf 3.1.7 中对此目标被禁用，但从今天开始 (2017-05-13) 可在夜间构建 3.2.0 中使用。
- 由于 DMA 限制，DSHot 无法开箱即用。在该板上启用 DSHOT 的解决方案是将电机 4 重新映射到电机引脚 5 (A06)，这可以通过 CLI 完成，如下所示：

`resource MOTOR 5 NONE`

`resource MOTOR 4 A06`

`save`

请注意，如果您希望通过 DSHOT 使用 SDCARD Blackbox 日志记录，则必须禁用 SDCARD DMA。这将对 SDCARD 记录速率产生负面影响。从 BF 3.2.0-RC3 开始，没有其他解决方案。这可以按如下方式完成：

`set sdcard_dma = OFF`

`save`

资料来源：https://github.com/betaflight/betaflight/issues/2162

## 其他资源

手册：[SPRacingF3EVO PDF 手册](http://seriouslypro.com/files/SPRacingF3EVO-Manual-latest.pdf)

Rcgroups 主题：[SPRacingF3EVO 飞控 - 便宜！ F3/SDC 卡插槽/竞赛应答器](http://www.rcgroups.com/forums/showthread.php?t=2641205)

## 图片

![](http://shop.seriouslypro.com/pub/media/catalog/product/cache/1/image/e9c3970ab036de70892d86c6d221abfe/i/m/img_9310-web.jpg)
