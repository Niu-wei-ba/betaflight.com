# MATEKSYS F722-SE

有关 MATEKSYS F722-SE 的完整信息，请参阅 Matek 网站：[mateksys.com/?portfolio=f722-se](http://www.mateksys.com/?portfolio=f722-se)。Betaflight 目标：`MATEKF722SE`

## 硬件规格

- _重量：_ 约 10g
- _PCB 尺寸：_ 36×46mm
  - 30×30mm 安装孔距（M4 孔；使用橡胶隔振柱时可安装 M3 螺钉）

### 飞控规格

- 处理器与传感器
  - _MCU：_ STM32F722RET6
  - _IMU：_ MPU6000（陀螺仪 1）和 ICM20602（陀螺仪 2），通过 SPI1 连接
  - _气压计：_ BMP280（通过 I2C1 连接）
  - _OSD：_ BetaFlight OSD（AT7456E，通过 SPI2 连接）
- _Blackbox：_ MicroSD 卡插槽（通过 SPI3 连接）
- 5 个 UART（UART1、UART2、UART3、UART4、UART6）
- 8 路 DShot 输出
- 2 路 PINIO（VTX 电源开关/USER1，以及相机切换/USER2）

### 集成 PDB 规格

- _输入：_ 6–36V（3–8S LiPo）
- _ESC 焊盘：_ 每组额定 4×35A（峰值 4×46A）
- 电压调节器：
  - _5V BEC：_ 持续负载 2A（峰值 3A）
  - _3.3V LDO：_ 最大负载 200mA
- 电源检测：
  - _电流传感器：_ 额定 184A（_建议校准值 `179`_）
  - _电压传感器：_ 信号输出比例 1:10（_建议校准值 `110`_）

## 状态 LED

|    LED | 颜色 | 指示      |
| -----: | ---- | :-------- |
|   LED0 | 蓝色 | 飞控状态  |
|   LED1 | 绿色 | 飞控状态  |
| LED3.3 | 红色 | 3.3V 状态 |

## 引脚定义

焊盘分布在电路板左右两侧的两大片区域；板底还有几组焊盘，板角附近设有 ESC 相关连接。

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

|       焊盘丝印 | 功能        | 说明                                                                             |
| -------------: | ----------- | :------------------------------------------------------------------------------- |
|        `+ / -` | 电池输入    | 6–36V DC LiPo 电源输入（_电池 +/- 和 4 合 1 ESC +/- 焊盘_）                      |
|        `S1-S8` | ESC 输出    | （_1–4 位于 ESC 电源连接处，5–8 位于右侧_）；支持 PWM、Oneshot、Multishot、DSHOT |
|   `GND, S1-S4` | ESC 输出    | （_板背面_）4 合 1 ESC 输出                                                      |
|     `VBat GND` | VBAT 输出   | VBAT 电源焊盘（_标记为 VTX_），可通过 PINIO1（PC8）切换电源                      |
|         `CURR` | 电流检测    | 电流传感器 I/O 引脚（_板载传感器输出或外部传感器输入_）                          |
|           `5V` |             | 内部 5V BEC 输出（_持续 2A，峰值 3A_）                                           |
|          `3V3` |             | 3.3V 稳压器输出（_额定 200mA_）                                                  |
|          `4V5` |             | 4.4–4.8V、0.5A 输出（_通过 USB 连接时同样供电_）                                 |
|            `G` | GND         |                                                                                  |
|          `LED` | WS2812 信号 |                                                                                  |
|      `Bz-, 5V` | 蜂鸣器      |                                                                                  |
|       `CL, DA` | I2C1        | 标记为磁力计接口，也可用于其他 I2C 外设                                          |
|          `VTX` | VTX         | VTX 视频输出                                                                     |
|        `C1/C2` | 相机        | C1：相机 1 输入；C2：相机 2 输入；可通过 PINIO2（PC9）切换两路视频               |
|     `RX1, TX1` | UART1       |                                                                                  |
|          `TX2` | UART2-TX    |                                                                                  |
|          `RX2` | UART2-RX    | Spektrum DSMX/DSM2、FlySky iBUS 或 PPM 接收输入（使用 PPM 时请禁用 `UART2`）     |
|     `RX3, TX3` | UART3       | TX3 可用于 VTX 控制                                                              |
|     `RX4, TX4` | UART4       | RX4 引脚 `PA1` 可重新映射为相机 PWM 控制                                         |
|          `TX6` | UART6-TX    |                                                                                  |
|          `RX6` | UART6-RX    | （_每个板角各一组_）用于 ESC 遥测的 RX6 复制焊盘                                 |
|         `Rssi` | RSSI        | 来自接收机的 FrSky RSSI 输入（_板背面_）                                         |
|          `PA4` | ADC/DAC     | `EXTERNAL1`/`ADC_PIN`（_板背面_）                                                |
| `D+、D-、VBus` | USB 引脚    | （_板背面_）                                                                     |
