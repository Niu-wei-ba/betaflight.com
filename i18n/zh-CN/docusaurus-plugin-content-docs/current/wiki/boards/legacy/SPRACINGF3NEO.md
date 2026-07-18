# Seriously Pro SP Racing F3 NEO

Seriously Pro Racing F3 NEO 板（SPRacingF3NEO）是一款专为穿越机设计的全功能板。 NEO FC/PDB 采用最新的陀螺仪技术并与 OSD/VTX 板堆叠。该堆栈提供了极其紧凑且易于安装的解决方案，所需的焊接连接和外部电缆最少。它非常适合初学者和经验丰富的飞行员。 acc/陀螺仪是 ICM20602，它比截至 2016 年 12 月所有其他 F3 板和大多数 F4 板中的版本都要新。

直接从 SeriouslyPro / SP Racing 或官方零售商购买板卡，有助于资助 Cleanflight 开发；官方零售商始终列于 SeriouslyPro.com。

完整详细信息可在网站上找到：

http://seriouslypro.com/spracingf3neo

## 硬件特性

NEO 由两块板组成。

1. NEO FC/PDB - FC/PDB/电流监控/LC 滤波器/12V BEC/5V BEC/ETC
2. NEO OSD/VTX - OSD/VTX/按钮/天线/等

组合堆叠高度仅为 15 mm。

### NEO FC/PDB 板。

- 下一代 STM32 F3 处理器，具有硬件浮点单元，可实现高效的飞行计算和更快的 ARM-Cortex M4 内核。
- 通过 SPI 连接采用最新的加速度计和陀螺仪技术 (ICM20602)。
- 用于 Blackbox 飞行日志记录器的 MicroSD 卡插槽 - 优化您的调整并查看设置结果，无需猜测。
- 内置 110 A 电流监测传感器。
- 遥测支持（FrSky、SmartPort/S.PORT、IBus 等）。
- 5 个串行端口。例如接收机 + 遥测 + 3 个备用 - 不与 USB 共享。
- 内置 LC 滤波器，视频更清晰。
- 内置竞赛应答器，可记录比赛圈速。
- BOOT 按键，便于 DFU/USB 刷写。
- 使用用于 ESC 连接的焊盘和用于接收机的电缆或接头引脚进行接线。
- 6 条用于 ESC 和舵机的 PWM 输出线。板子的每个角上均布置了 4 个，以便于接线。 （4 个主要输出支持 DSHOT \*）。
- 支持直接连接 SBus、SumH、SumD、Spektrum1024/2048、XBus/IBus 接收机。无需外部逆变器（内置）。
- 支持通过 3 针通孔 JST-ZH 连接器直接连接 3.3v Spektrum 卫星接收机。
- 支持 PPM 接收机。
- 微型 USB 插座。
- 可编程 LED 的专用输出 - 非常适合定向、赛车和夜间飞行。
- 专用 I2C/UART3/UART5 端口，用于连接 OLED 显示屏、GPS 接收机、外部 MAG/BARO，无需飞行电池。
- 电池、12v 和 5v 电源电压监控。
- 模拟 RSSI 监控。
- 蜂鸣器端口用于发出声音警告和通知。
- 面向开发者的 SWD 调试端口和不可变砖引导加载程序。
- 对称设计，接线超级整洁，每个 ESC 每个角只需 4 根电线即可完成！
- JST-SH 插座仅适用于 I2C/UART3/UART4 和 SWD。 UART1 可在通孔堆叠引脚上使用，并在 OSD/VTX 板上断开。
- 用于堆叠 OSD/VTX 板的 12 位连接器。 （SPI/CS1/CS2/VSYNC/HSYNC/VTX 启用/按钮），
- 通过 PicoBlade 连接器实现接收机的通孔焊盘和无焊连接。
- 用于应答器 IR LED 的通孔焊盘。
- RSSI 焊盘。
- LED 灯条的焊盘。
- ESC 电源焊盘。 （每个角 2 个）
- ESC 信号和接地的焊盘。 （每个角 2 个）。
- 用于 2x 附加 PWM 输出的焊盘（例如用于平移/倾斜伺服系统）。
- 直接连接 XT60 插座。 （通孔）。
- 支持通过 USB 或串口刷写。
- 标准 30.5mm 安装孔，板适合大多数 36x36x 安装空间。
- 板尺寸为 45x50mm，边角有切口，以留出框架间隙。
- 用于 3v（蓝色）、5v（绿色）和 12v（黄色）电源的 LED。
- 两个状态 LED（红色、白色），便于诊断/飞行模式指示。
- 提供电缆，用于无焊接连接 FrSky XSR 接收机。
- 随附接收机电缆，用于与大多数其他接收机进行无焊接连接。
- 配有 JST-ZH 插座，用于连接 3.3v spektrum 卫星接收机。
- Cleanflight 标志。
- SPRacing 标志。

- 注意：未来的 Cleanflight 版本将支持 DShot。

### NEO VTX/OSD 板

- OSD 具有可自定义布局。
- VTX 输出功率为 25/200 mW。
- 用于更改 VTX 频道/频段/射频功率/功率/等的按钮。
- 可通过 NEO USB 接口使用 Cleanflight Configurator 配置。
- 用于天线连接的 U.FL 插座，镀金。
- 可显示电流、电压、RSSI、飞行模式、通电时长、解锁时长、5 V、12 V、呼号、电机等。
- 不带 VTX 模块，因此用户可以使用外部 VTX 或替代兼容的 VTX 模块。
- VTX 可远程关闭（例如通过发射机），适合团队比赛或 Pit Mode 配置。
- 5V、5V 开关、3.3V、12V、视频输入/输出、音频、GND 的焊盘。
- 分线 2.54 毫米间距通孔，用于连接到 NEO 上的 UART1 - 例如用于蓝牙/Wifi 模块。
- Picoplade 连接器，用于无焊接连接到外部 VTX，具有 12V/VIDEO/AUDIO/5V 开关/GND 信号。
- 2.54mm 通孔焊盘，用于连接蜂鸣器（通过 NEO 控制）。
- 2.54mm 通孔焊盘，用于连接 12V 设备。
- 用于连接摄像机和外部 VTX 板的 JST-ZH 插座（随附）的通孔垫。
- 用于 PCB 侧装天线 JACK 连接的焊盘（不使用 U.FL 连接器时）。
- CAMERA 和 EXTERNAL VTX 插座电源可选择 5V 和 12V。
- 用于访问其下方 NEO 上的启动按钮（通过回形针）的孔。
- 板尺寸为 36x36mm，带有标准 30.5mm 安装孔。
- 12 位连接器，用于堆叠在 NEO 上方。
- 白色 LED 照明。
- 蓝色 LED 用于 3v3 电源。
- Cleanflight 标志。
- SPRacing 标志。

## 引脚排列

完整的引脚排列详细信息可在手册中找到，此处：

http://seriouslypro.com/files/SPRacingF3NEO-Manual-latest.pdf

### 频谱卫星

| 针  | 功能 | 笔记 |
| --- | ---- | ---- |
| 3   | 3.3V |      |
| 2   | 地面 |      |
| 1   | 接收 |      |

### 接收机

| 针  | 功能       | 笔记                             |
| --- | ---------- | -------------------------------- |
| 1   | UART2 接收 | 串行 RX 或 PPM                   |
| 2   | UART2 发送 | FrSky 遥测                       |
| 3   | UART5 发送 | SmartPort/S.PORT 遥测            |
| 4   | 5.0V       | 电压由 BEC 或 USB 提供，始终开启 |
| 5   | 地面       |                                  |

### I2C/UART3/UART4

| 针  | 功能      | 笔记                             |
| --- | --------- | -------------------------------- |
| 1   | 地面      |                                  |
| 2   | 5.0V      | 电压由 BEC 或 USB 提供，始终开启 |
| 3   | SCL       | 仅 3.3V 信号                     |
| 4   | SDA       | 仅 3.3V 信号                     |
| 5   | UART3 RXD | 仅 3.3V 信号                     |
| 6   | UART3 TXD | 仅 3.3V 信号                     |
| 7   | UART4 RXD | 3.3V 或 5V 信号正常              |
| 8   | UART4 TXD | 3.3V 或 5V 信号正常              |

### SWD

| 针  | 功能   | 笔记 |
| --- | ------ | ---- |
| 1   | 地面   |      |
| 2   | NRST   |      |
| 3   | SWDIO  |      |
| 4   | SWDCLK |      |
