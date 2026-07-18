# TBS Colibri RACE

Colibri RACE 是一款基于 STM32F3 的飞行控制器，专为配合 TBS POWERCUBE 多旋翼堆叠系统设计。

## 硬件特性

- 基于 STM32F303 芯片组，提供高性能。
- 支持 PPM、SBUS、DSM、DSMX 输入（内部总线提供 5 V 和 3.3 V）；无需反相器或额外改装。
- 6 路 PWM ESC 输出通道（自动连接，内部总线）。
  - 支持 RGB LED 灯带及其电源管理。
  - 提供 GPS / 外置磁力计 / 气压传感器扩展端口。
  - 提供用于外设的 UART 端口（Blackbox、FrSky 遥测等）。
  - 遥控接收机和蜂鸣器可选择即插即用插座或焊盘。
  - 5 V 蜂鸣器输出。
  - MPU6500 新一代加速度计/陀螺仪。
  - 3 个状态 LED（DC-DC 电源 / 3.3 V 电源 / 状态）。
  - 监测 12 V、5 V 和 VBAT 电源。
  - 尺寸：36 mm x 36 mm（30.5 mm 标准孔距）。
  - 重量：4.4 g。

更多信息请访问：

http://www.team-blacksheep.com/powercube

## 串行端口

| 数值 | 标识符 | 板上标识   | 说明                            |
| ---- | ------ | ---------- | ------------------------------- |
| 1    | VCP    | USB PORT   | 用于 MSP 的主端口               |
| 2    | USART1 | FREE PORT  | PC4 和 PC5（分别为 TX 和 RX）   |
| 3    | USART2 | PPM Serial | PA15                            |
| 4    | USART3 | GPS PORT   | PB10 和 PB11（分别为 TX 和 RX） |

## 引脚定义

完整引脚定义请参阅以下手册：

http://www.team-blacksheep.com/colibri_race

### SWD - ICSP

| 引脚 | 功能    | 说明  |
| ---- | ------- | ----- |
| 1    | VCC_IN  | 3.3 V |
| 2    | SWDIO   |       |
| 3    | nRESET  |       |
| 4    | SWCLK   |       |
| 5    | Ground  |       |
| 6    | SWO/TDO |       |

### 内部总线

| 引脚 | 功能       | 说明                            |
| ---- | ---------- | ------------------------------- |
| 1    | PWM1       | 电机 1                          |
| 2    | PWM2       | 电机 2                          |
| 3    | PWM3       | 电机 3                          |
| 4    | PWM4       | 电机 4                          |
| 5    | PWM5       | 电机 5（用于 Y6 或 Hex X）      |
| 6    | PWM6       | 电机 6（用于 Y6 或 Hex X）      |
| 7    | BST SDA    | 用于 TBS CorePro 控制设备       |
| 8    | BST SCL    | 用于 TBS CorePro 控制设备       |
| 9    | PWM7       | 可作为普通 GPIO（PA1）或 PWM    |
| 10   | PWM8       | 可作为普通 GPIO（PA2）或 PWM    |
| 11   | 12.2V DCDC | 检测到 12 V 时，蓝色 LED 会亮起 |
| 12   | 5.1V DCDC  | MCU 供电电压                    |

### 舵机

| 引脚 | 功能      | 说明                       |
| ---- | --------- | -------------------------- |
| 1    | Ground    |                            |
| 2    | VCC_OUT   | 为 LCD 灯带提供 5.1 V 输出 |
| 3    | PWM Servo | PB14 - PWM10               |

### IO_1 - LED 灯带

| 引脚 | 功能      | 说明                       |
| ---- | --------- | -------------------------- |
| 1    | LED_STRIP | 启用 `feature LED_STRIP`   |
| 2    | VCC_OUT   | 为 LCD 灯带提供 5.1 V 输出 |
| 3    | Ground    |                            |

### IO_2 - 传感器接口

| 引脚 | 功能     | 说明                          |
| ---- | -------- | ----------------------------- |
| 1    | VCC_OUT  | 为设备提供 4.7 V 输出         |
| 2    | Ground   |                               |
| 3    | UART3 TX | GPS                           |
| 4    | UART3 RX | GPS                           |
| 5    | SDA      | 磁力计、气压计或其他 I2C 设备 |
| 6    | SCL      | 磁力计、气压计或其他 I2C 设备 |

### IO_3 - RC 输入

IO_3 用于 RX_PPM/RX_SERIAL。使用 RX_SERIAL 时，请在 `PORT` 选项卡中将 RX_SERIAL 设置为 UART2。

| 引脚 | 功能       | 说明                  |
| ---- | ---------- | --------------------- |
| 1    | PPM/Serial | 可作为 PPM 或串行输入 |
| 2    | VCC_OUT    | 为设备提供 3.3 V 输出 |
| 3    | Ground     |                       |
| 4    | VCC_OUT    | 为设备提供 5.1 V 输出 |

### IO_4 - 蜂鸣器

| 引脚 | 功能    | 说明                  |
| ---- | ------- | --------------------- |
| 1    | BUZZER  | 高电平有效（5.1 V）   |
| 2    | VCC_OUT | 为设备提供 5.1 V 输出 |

### IO_5 - 空闲 UART

| 引脚 | 功能     | 说明                  |
| ---- | -------- | --------------------- |
| 1    | UART1 TX | 空闲 UART             |
| 2    | UART1 RX | 空闲 UART             |
| 3    | Ground   |                       |
| 4    | VCC_OUT  | 为设备提供 4.7 V 输出 |

### IO_6 - IR TX（扩展）

| 引脚 | 功能   | 说明 |
| ---- | ------ | ---- |
| 1    | IR TX  |      |
| 2    | Ground |      |
