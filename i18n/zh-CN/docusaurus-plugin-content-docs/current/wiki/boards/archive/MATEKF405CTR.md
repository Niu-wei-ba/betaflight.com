---
id: MATEKF405CTR
---

# Matek F405-CTR

Matek Sys F405-CTR 的完整资料见 [Matek 网站](http://www.mateksys.com/?portfolio=f405-ctr)。Betaflight 目标：`MATEKF405`。

## 硬件规格

- _重量：_ 约 10 g
- _PCB 尺寸：_ 36×46 mm
  - 30×30 mm 孔位（M4；使用橡胶隔振器时为 M3）

### 飞控规格

- 处理器和传感器
  - _MCU：_ [STM32F405RGT6](http://www.st.com/content/ccc/resource/technical/document/datasheet/ef/92/76/6d/bb/c2/4f/f7/DM00037051.pdf/files/DM00037051.pdf/jcr:content/translations/en.DM00037051.pdf)
  - _IMU：_ [MPU6000](https://www.invensense.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf)（通过 SPI 连接）
  - _气压计：_ [BMP280](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001-19.pdf)（通过 I2C 连接）
  - _OSD：_ Betaflight OSD（AT7456E IC）
- _黑匣子：_ MicroSD 卡槽（SD/SDHC）
- 5 个 UART

### 集成 PDB 规格

- _输入：_ 6-30 V（3-6S LiPo），带 TVS 保护
- _ESC 焊盘：_ 每组 ESC 焊盘额定 4×30 A（4×46 A 峰值）
- 稳压器：
  - _5 V BEC：_ 2 A 持续负载（3 A 峰值）
  - _3.3 V LDO：_ 最大负载 300 mA
- 电源检测：
  - _电流传感器：_ 额定 184 A（_建议 scale 值：`179`_）
  - _电压传感器：_ 1:10 信号输出比（_建议 scale 值：`110`_）

## 状态 LED

|      LED | 颜色 | 状态代码                                                                                                                                                              |
| -------: | ---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 飞控状态 | 蓝色 | **熄灭：**未连接 USB 且未解锁；<br/>**常亮：**未连接 USB 且已解锁；<br/>**闪烁：**已连接 USB 且未解锁；<br/>**快速闪烁 5 次后持续闪烁：**已连接 USB，且解锁命令被阻止 |
| 加速度计 | 红色 | 加速度计状态（亮：启用；灭：未启用）                                                                                                                                  |
| 3V3 状态 | 红色 | 亮：启用；灭：未启用                                                                                                                                                  |

## 引脚定义

焊盘分布在板卡左右两侧的两组大焊盘区，板底还有若干焊盘；ESC 相关连接位于板卡角落附近。

```
          __________
         /  U    U  \
/-----------------------------\
|oE                         Eo|
|SC                         SC|
|                             |
| P                        P  |
| A                        A  |
| D                        D  |
| S                        S  |
|                             |
|ES                         ES|
|oC                         Co|
\------------[USB]------------/
```

> **注意：**焊盘 `TX2`、`S5` 和 `S6` 支持 `softserial`，可配置为软串口。

> **注意：**正常使用时，气压计内部 `I2C1` 总线与 WS2812 `LED` 信号焊盘因映射冲突而无法同时使用。不过可将 `LED_STRIP` 功能重映射到 `S5`（`PA15`）焊盘以避免冲突。
>
> 例如，在 CLI 中输入 `resource LED_STRIP 1 A15`。

|           焊盘丝印 | 功能          | 备注                                                                          |
| -----------------: | ------------- | :---------------------------------------------------------------------------- |
|            `+ / -` | 电池输入      | 6-30 VDC LiPo 电源输入（电池 +/- 和 4 合 1 ESC +/- 焊盘）                     |
|            `S1-S6` | ESC 输出      | （S1-4 靠近 ESC 电源连接，S5-6 在前方）支持 PWM、Oneshot、Multishot、DSHOT    |
|   `5V, GND, S1-S4` | ESC 输出      | （板卡后方）4 合 1 ESC 输出                                                   |
|         `VBT, GND` | VBT 输出      | VBAT 电源焊盘（标记为 VTX，但可按需使用）                                     |
|             `CURR` | 电流检测      | 电流传感器 I/O 引脚（可输出板载传感器数据或输入外部传感器数据）               |
|               `5V` |               | 内部 5 V BEC 输出（额定 2 A 持续、3 A 峰值）                                  |
|              `3V3` |               | 3.3 V 稳压器输出（额定 300 mA）                                               |
|              `4V5` |               | 4.4-4.8 V 稳压器输出（额定值未知；连接 USB 时也会供电）                       |
|                `G` | GND           |                                                                               |
|              `LED` | WS2812 信号   |                                                                               |
|          `Bz-, 5V` | 蜂鸣器        |                                                                               |
|             `Rssi` | RSSI          | 来自接收机的 FrSky RSSI 输入                                                  |
| `G, 3V3, SDA, SLC` | I2C           | （板卡后方）标记为磁力计 I2C 接口，但也可按需使用                             |
|    `VTX, Cam, DAC` | VTX/摄像头    | VTX：视频输出；Cam：视频输入；DAC：摄像头控制引脚（从 BF3.3 起可映射到 `S6`） |
|         `RX1, TX1` | UART1         |                                                                               |
|              `TX2` | UART2-TX      | 可重分配为 `softserial1`，作为 FrSky SmartPort 焊盘使用                       |
|              `RX2` | UART2-RX      | Spektrum DSMX/DSM2、FlySky iBUS 或 PPM 的接收端（PPM 时禁用 `UART2`）         |
|             `Sbus` | SBUS（UART2） | SBUS 专用焊盘（`RX2` 的重复焊盘，带信号反相器）                               |
|         `RX3, TX3` | UART3         |                                                                               |
|         `RX4, TX4` | UART4         |                                                                               |
|         `RX5, TX5` | UART5         |                                                                               |
|              `RX5` | UART5-RX      | （每个板角各一个）`RX5` 焊盘副本，用于 ESC 遥测                               |

### UART 与 VCP

|  端口 | 默认分配的功能 |
| ----: | -------------- |
|   VCP | Micro USB 接口 |
| UART1 | _未分配_       |
| UART2 | 接收机连接     |
| UART3 | _未分配_       |
| UART4 | _未分配_       |
| UART5 | ESC 遥测       |
