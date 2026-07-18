# OMNIBUS F4 AIO、F4 V2/V3/V4、F4 Pro v2/V3 和 ASGARD

### 主板识别

有关主板标识，请参见
[OMNIBUS F4 V2 和 V3：识别修订版](https://www.rcgroups.com/forums/showthread.php?2837385-OMNIBUS-F4-V2-Identifying-revisions)

### Omnibus F4 V6 和 Omnibus F4 Nano V6 用户注意事项 (2019-01-17)

- V6 的固件目标是 `OMNIBUSF4V6`，Nano V6 的固件目标是 `OMNIBUSF4FW`。

### Omnibus F4 Nano V4、V5 和 V6 用户注意事项 (2018-08-24)

- 用于反相协议（例如 S.BUS）的 Serial RX 端口为 UART1，且没有可编程反相器。
- Flit10 RX 仅可使用 UART3。

### OMNIBUS F4 V3、V4、V5 和 ASGARD 用户注意事项

- 在 OMNIBUS F4 V3 及更高版本上，串行 RX 是 **UART6**，而不是 UART1。
- ASGARD 还使用 UART6 RX (J5) 进行串行 RX。
- 这些板需要具有可编程逆变器支持的固件（仍然是 OMNIBUSF4SD 目标）。
- 支持该功能后，会根据所选 Serial RX 协议（例如 SBUS、IBUS）自动启用或关闭反相。
- 然而，F4 V3/V4 和 ASGARD 之间的逆变器引脚不同，OMNIBUSF4SD 目标默认为 F4 V3/V4 设计。
  ASGARD 用户必须通过执行以下 CLI 命令显式更改引脚映射。

```
resource inverter 6 c9
```

- 完整的反相器支持可在当前开发主分支中获取：http://andwho.sytes.net:8080/job/BorisB_BetaFlight/ 。请选择 #1253 之后的构建。
- 基于 3.1.7 的固定反转固件可在 https://www.dropbox.com/s/hj4jd3av8oko9ji/betaflight_3.1.6_Asgard_PC9_HIGH_SBUSInverter_Enabled?dl=0 获得
  使用此固件，UART6 是带反转的串行 RX (SBUS)。
- 注意：Spektrum 用户可使用原版 3.1.7。
- IBUS 用户可能需要完整的逆变器支持（出于稳定性原因）。

### v3.1.7 及更高版本：OMNIBUSF4SD 目标的 LED 灯带引脚分配已更改

_这也适用于 ASGARD_

v3.1.x 及更早版本将 PWM5（`OMNIBUSF4` 目标）或 PWM6（`OMNIBUSF4SD` 目标）用于 LED 灯带，而非标有 LED 的引脚。这是为规避初代 OMNIBUS F4 AIO 指定 LED 引脚无效而采取的措施。较新的 OMNIBUS F4 修订版已为 LED 引脚分配有效引脚；该引脚在 BF 3.1.6 及更早版本尚不可用，但从 BF 3.1.7 起成为默认设置。因此，若不显式重新映射，3.1.6 及更早版本接在非 LED 连接器/通孔上的原有可用接线将失效。

如果板支持映射，那些在 PWM5 或 PWM6 上使用 LED 灯条的用户可以迁移到新分配，或者使用 `resource` CLI 命令显式分配旧映射。

1. 迁移到新分配

以下板卡的用户可将 LED 灯带信号重新接线，迁移至使用指定 LED 通孔/连接器的新分配。

- OMNIBUS F4 V2 (J9)
- OMNIBUS F4 V3 (J9)
- OMNIBUS F4 Pro V3 (J1)
- ASGARD V1 和 V2 (J1)

注意：

1. v3.1.7 固件已改为使用这些通孔/连接器。
2. PPM 用户无法使用这一新分配，因为新引脚（MCU `PB6`）会与 PPM 输入引脚（`PB8`）发生定时器冲突；必须使用下文的重新映射方法。

3. 显式重新映射引脚分配

选择（或在 PPM 情况下强制）不迁移到新分配的用户必须使用下面的资源 CLI 命令显式地将分配重新映射到旧的默认值。

```
resource led_strip a8
```

### 主板命名（需要更新）

这些板的名称因经销商而异。

```
+----------------------+----------------------------+-------------+
| myairbot.com         | RTFQ                       | BF target   |
+----------------------+----------------------------+-------------+
| OMNIBUS AIO F4       | FLIP32-F4-OMNIBUS          | OMNIBUSF4   |
| OMNIBUS AIO F4 V2    | FLIP32-F4-OMNIBUS V2       | OMNIBUSF4SD |
| OMNIBUS F4 Pro       | FLIP32-F4-OMNIBUS V2 PRO   | OMNIBUSF4SD |
| OMNIBUS F4 Pro (v2)  |                            |             |
+----------------------+----------------------------+-------------+
```

## OMNIBUS F4 AIO 特性

- SPI 陀螺仪 MPU6000
- STM32 F405 MCU，运行 Betaflight 3.0 固件
- SBUS/PPM 输入（排针）
- 6 路 PWM 输出（1–4 为排针和 SH1.0 插座，5–6 为排针）
- 无气压计
- 128Mbit 闪存

## OMNIBUS F4 Pro 特性

- SPI 陀螺仪 MPU6000
- 板载 OSD（由 Betaflight 通过飞控 SPI 总线控制）
- MicroSD Blackbox
- 气压计（BMP280）
- F4 处理器 (F405)
- 5V 3A SBEC
- 内置电流传感器
- 板载视频滤波器（只能为 VTX 和摄像头提供 5V 电压）

## Betaflight 3.1 专用配置

### OMNIBUS F4 一体机

- 使用 OMNIBUSF4 目标。
- LED 灯条端口为 PWM5。

#### 资源映射（WIP）

| 标签     | 引脚 | 定时器 | DMA | 默认分配           | 备注                |
| -------- | ---- | ------ | --- | ------------------ | ------------------- |
| RSSI     | A0   |        |     |                    | 不支持 ADC          |
| PWM5     | A1   | 5,2    | 1,4 | motor 5、led_strip |                     |
| PWM4     | A2   | 2,3    | 1,1 | motor 4            |                     |
| PWM3     | A3   | 2,4    | 1,6 | motor 3            |                     |
| PWM6     | A8   | 1,1    | 2,3 | motor 6            |                     |
| UART1 TX | A9   | 1,2    | 2,2 | serial_tx 1        | v3.1 不可重新映射   |
| UART1 RX | A10  | 1,3    | ?,? | serial_rx 1        | v3.1 不可重新映射   |
| PWM1     | B0   | 3,3    | 1,7 | motor 1            |                     |
| PWM2     | B1   | 3,4    | 1,2 | motor 2            |                     |
| LED      | B6   | 4,1    | 1,0 |                    | J9（v3.1 不可访问） |
| PPM      | B14  | 12,3   | n.a | ppm                |                     |
| CH2      | B15  | 12,4   | n.a |                    |                     |
| UART3 TX | B10  | 2,3(!) | ?,? | serial_tx 2        |                     |
| UART3 RX | B11  | 2,4(!) | ?,? | serial_rx 2        |                     |
| CRNT     | C1   | ---    | 2,4 | adc_curr           |                     |
| VBAT     | C2   | ---    | 2,4 | adc_batt           |                     |
| UART6 TX | C6   | 8,1    | 2,2 | serial_tx 3        |                     |
| UART6 RX | C7   | 8,2    | 2,3 | serial_rx 3        |                     |
| CH5      | C8   | 8,3    | 2,4 |                    |                     |
| CH6      | C9   | 8,4    | 2,7 |                    |                     |

### OMNIBUS F4 V2 和 F4 Pro

- 使用 OMNIBUSF4SD 目标。
- v3.1.7 及更高版本：对于 OMNIBUS F4 Pro V2，LED 灯条信号连接到 PWM6。
- v3.1.6 及更早版本：LED 灯条信号连接到 PWM6。

#### 资源映射（WIP）

（尚未提供）

## 其他资源

F4 AIO 的 RCgroups 线程位于 https://www.rcgroups.com/forums/showthread.php?2754926-Omnibus-F4-AIO

F4 Pro 的 RCgroups 线程位于 https://www.rcgroups.com/forums/showthread.php?2801694-Omnibus-f4-pro

F4 Pro 的布局 [顶部](https://www.rcgroups.com/forums/showatt.php?attachmentid=9631520&d=1482680395) [底部](https://www.rcgroups.com/forums/showatt.php?attachmentid=9631521&d=1482680397)

## 接收机设置

### 串行接收

在 OMNIBUSF4 上，UART1 RX 引脚可在 3 个不同的接头上使用，在任何给定时间只能使用其中一个：

- SBUS 端口（通过反相器），该引脚也与 PPM 引脚共享。
- Spektrum sat 接头（无逆变器）
- UART1 接头（无逆变器）

### Spektrum 绑定 (v3.1.6+)

- 在 Betaflight App 的“Ports”选项卡中将 UART1 设置为 Serial RX，然后点击“Save”。切换到“Configuration”选项卡，在“Receiver”部分将模式设为 SerialRX，并将 Provider 设为：

  - DSMX 的 Spektrum 2048
  - 适用于 DSM2 的 Spektrum 1024

- 在 CLI 中运行：

```
set spektrum_sat_bind = 9
set spektrum_sat_bind_autorst = 0
save
```

- 等待飞控重启，然后断开所有电源（拔下 USB），稍候后重新插入 USB 线。

- 接收机上的绑定灯应该闪烁。

- 在绑定模式下打开遥控器。

- 接收机上的闪烁灯现在应该常亮。

- 关闭遥控器。

- 最后通过在 CLI 中运行以下命令使接收机退出绑定模式：

```
set spektrum_sat_bind = 0
save
```

- 确保在 Betaflight 应用程序的“接收机”选项卡下更改为 TAER 频道顺序。
