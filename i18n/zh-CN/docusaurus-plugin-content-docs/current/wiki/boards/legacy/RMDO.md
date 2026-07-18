# RMRC Dodo

RMRC Dodo 由 Ready Made RC 制造和销售。其 CPU 引脚映射是 SPRacingF3 的克隆（另见 SPRacingF3 文档）。目前有硬件略有差异的 Rev. 1、2、3 三个版本。

Rev. 3 将 CPU 从 128 KB Flash 更换为 256 KB Flash，但出于兼容性原因，Cleanflight 仍只支持并使用其中 128 KB。所有 DODO 板可使用相同二进制文件。

## 硬件特性

- STM32 F3 ARM Cortex-M 处理器，带 128 KB 或 256 KB 程序 Flash（Rev. 1/2：128 KB；Rev. 3：256 KB）
- 2 MB 外部 Flash 存储
- MPU6050 加速度计/陀螺仪（Rev. 2：MPU6000）
- BMP280 气压计
- 无罗盘
- 3 个硬件 UART（另加 2 个软件 UART），用于 GPS、遥测、OSD 等，兼容 5 V
- 板载 5 V/0.5 A BEC，直接由 2-6S 主电池供电，无需外置 BEC/稳压器
- 板载 3.3 V 稳压器，可为 Spektrum 卫星接收机等外设供电
- 36 x 36 mm 板卡，30.5 mm 安装孔距（与 CC3D/Naze32 相同，但引脚定义不同）

注意：早期修订版的蜂鸣器电路存在问题。

## 串口

| 名称  | RX（板端） | TX（板端） | RX（MCU） | TX（MCU） | 备注                          |
| :---: | :--------: | :--------: | :-------: | :-------: | ----------------------------- |
| UART1 |    U1RX    |    U1TX    |   PA10    |    PA9    | 与 USB 连接共用               |
| UART2 |    U2RX    | U2TX/SWCLK |   PA15    |   PA14    | 与 SWD 共用                   |
| UART3 |   U3RX/3   |   U3TX/4   |   PB11    |   PB10    | RX 还连接至 Spektrum 卫星接口 |

## 引脚定义

### 右侧（前至后）

|          标签          | 说明                           |
| :--------------------: | ------------------------------ |
| RC_IN_8/SOFTSERIAL2_TX | RC8 PPM 输入或 SoftSerial 2 TX |
| RC_IN_7/SOFTSERIAL2_RX | RC7 PPM 输入或 SoftSerial 2 RX |
| RC_IN_6/SOFTSERIAL1_TX | RC6 PPM 输入或 SoftSerial 1 TX |
| RC_IN_5/SOFTSERIAL1_RX | RC5 PPM 输入或 SoftSerial 1 RX |
|      RC_IN_4/U3TX      | RC4 PPM 输入或 UART3 TX        |
|      RC_IN_3/U3RX      | RC3 PPM 输入或 UART3 RX        |
|        RC_IN_2         | RC2 PPM 输入                   |
|     RC_IN_1/PPM IN     | RC1 PPM 输入或 SUM/CPPM        |
|           5V           | 5 V 总线                       |
|          GND           | 地                             |

### 后侧（左至右）

|        标签        | 说明               |
| :----------------: | ------------------ |
|  SPEKTRUM_VCC/3V3  | 3.3 V 输出         |
|  SPEKTRUM_GND/GND  | 地                 |
| SPEKTRUM_DATA/U3RX | UART3 RX           |
|        USB         | Micro USB 接口     |
|        BAT+        | 主电池正极（2-6S） |
|      GND/BAT-      | 主电池负极         |

### 前侧（左至右）

|    标签     | 说明                         |
| :---------: | ---------------------------- |
|  BZ_5V/BZ+  | 5 V，连接蜂鸣器正极          |
|  BZ_OC/BZ-  | 开集电极输出，连接蜂鸣器负极 |
|  RC_OUT_1   | ESC 1 输出（四轴后右，CW）   |
|  RC_OUT_2   | ESC 2 输出（四轴前右，CCW）  |
|  RC_OUT_3   | ESC 3 输出（四轴前左，CW）   |
|  RC_OUT_4   | ESC 4 输出（四轴后左，CCW）  |
| RC_OUT_5-8  | PPM 输出 5-8                 |
|   LED_OUT   | WS2811 LED 输出              |
| LED_GND/GND | 地                           |

### 右侧双排（前至后）

|    标签    |   位置    | 说明                                          |
| :--------: | :-------: | --------------------------------------------- |
|    GND     |   外侧    | 地                                            |
| U1TX/U1RX  |   外侧    | UART1 TX/RX（与 USB 共用）                    |
|     5V     |   外侧    | 5 V 总线                                      |
|    3V3     | 外侧/内侧 | 3.3 V 输出，可为低功耗外设供电                |
|    GND     |   内侧    | 地                                            |
|  SDA/SCL   |   内侧    | I2C 数据/时钟                                 |
|  PPM_RSSI  |   内侧    | 低通滤波的 PPM 型 RSSI 输入（FrSky 或 EzUHF） |
|    U2RX    |   外侧    | UART2 RX                                      |
| U2TX/SWCLK |   外侧    | UART2 TX 或 SWD 时钟                          |
|   SWDIO    |   外侧    | SWD 输入/输出                                 |

### 顶部焊盘

| 标签 | 说明                                          |
| :--: | --------------------------------------------- |
| CURR | 无缓冲电流传感器 ADC 输入                     |
| RSSI | 无缓冲 RSSI ADC 输入；滤波输入请使用 PPM_RSSI |
| BOOT | 用于恢复损坏引导加载程序的 BOOT 跳线          |

### 底部焊盘

| 标签 | 说明                                     |
| :--: | ---------------------------------------- |
| TRIG | 声纳触发，板载 1 kOhm 串联电阻，兼容 5 V |
| ECHO | 声纳回波，板载 1 kOhm 串联电阻，兼容 5 V |
