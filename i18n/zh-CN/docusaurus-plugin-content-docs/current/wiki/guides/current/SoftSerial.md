# SoftSerial

SoftSerial 可在缺少可引出的真实 UART 的 MCU（例如 F411）上增加一个“虚拟”UART。

SoftSerial 最适合为 FC 增加一个单线数据流所需的额外 `TX` 引脚，例如：

- 模拟 VTX 控制（SmartAudio、Tramp 等）；
- S.Port 遥测（FrSky 的双向单线接口）；
- 串行 ESC 遥测。

SoftSerial 也可用于将硬件 UART 的某个引脚分配给独立功能。

:::note

**Betaflight 4.5 的变化**

- 在 CLI 中，使用 `RESOURCE SOFTSERIAL_TX1 <pin>` 配置 SoftSerial 1 的 `TX` 线。
- SoftSerial 不再可用于 MSP 连接。
- SoftSerial 的硬性波特率上限为 `19200`。

:::

使用 SoftSerial 时请注意：

- 不应高于 `19200` 波特率（Betaflight 4.5 中不可能更高）；
- 不应用于 HD OSD 等 MSP 连接（Betaflight 4.5 中不允许）；
- 部分串行设备可能无法工作；
- 同时最多使用两个 SoftSerial UART；
- 所有 SoftSerial 端口必须使用相同波特率；
- 有可用硬件 UART 时，始终优先使用硬件 UART。

:::warning

绝不可将 SoftSerial 用于串行遥控接收机。

即使在高性能 MCU 上，SoftSerial 通常也要求使用 `4k` PID loop。

:::

下表汇总常见使用情境：

| 用途                               | 说明                                                                |
| :--------------------------------- | :------------------------------------------------------------------ |
| 串行遥控接收机                     | 不要使用 SoftSerial，使用真实 UART                                  |
| 通过蓝牙进行 MSP 配置              | 不要使用 SoftSerial，使用真实 UART；4.5 中不允许                    |
| 通过 MSP 的 HD OSD（DisplayPort）  | 不要使用 SoftSerial，使用真实 UART；4.5 中不允许                    |
| GPS Rescue 或位置保持 GPS          | 不要使用 SoftSerial，使用真实 UART                                  |
| 用于 1–2 Hz 位置数据的 GPS         | 见下方说明                                                          |
| 通过串口的 Blackbox                | 不要使用 SoftSerial，使用真实 UART                                  |
| 模拟 VTX 控制（SmartAudio、Tramp） | 分配 SoftSerial `TX`；FC 到 VTX 单向数据                            |
| 通过 MSP 的 HD VTX 控制 / OSD      | 分配 SoftSerial `TX`，保持 OSD 简单，使用 4k PID loop；4.5 中不允许 |
| S.Port 等单线通信协议              | 分配 SoftSerial `TX`；数据速率不过高时应可工作                      |
| ESC 串行遥测                       | 分配 SoftSerial `RX`；数据速率不过高时应可工作                      |
| 相机控制                           | 分配 SoftSerial `TX`；可能需要硬件电阻                              |

:::info

SmartPort 无法在 `19200` 波特率下通过 SoftSerial 工作。<br />
如前述限制所示，为 4.5 或更新固件提供了 `OVERRIDE_SOFTSERIAL_BAUDRATE` Custom Define 来覆盖限制。请注意，当负载超过阈值时，新的 `LOAD` 禁止解锁标志会阻止解锁。<br />
**使用该 Define 时出现的任何问题均不提供支持。**

:::

### SoftSerial 与 GPS

GPS 模块有两种不同用途：

- 以低数据速率（例如 `1–2 Hz`）收集纬度、经度、高度、速度等，用于寻找遗失飞行器或记录轨迹；
- 用于 GPS Rescue 与位置保持，通常以 `10Hz` 接收数据。

若仅需简单位置数据，可先在 uCenter 或 pyGpsClient 中将 GPS 模块设置为低启动波特率，例如 `19200` 或 `9600`，且只在 `1Hz` 发送位置数据。此时 Betaflight 只需单个 `RX` 引脚接收数据，该引脚可为 SoftSerial。GPS 选项卡中**必须**关闭自动配置；SoftSerial 端口波特率必须匹配 GPS 启动波特率。先在真实 `RX` 引脚上测试，并确认未发送不需要的数据，例如卫星位置信息。Configurator 中不应显示卫星列表，只显示 Latitude、Longitude、Altitude 等。真实 `RX` 引脚可用后，再测试 SoftSerial 引脚。

GPS Rescue 中，SoftSerial 无法成功处理 GPS 自动配置。自动配置需要连接至 GPS 模块的 `RX` 与 `TX` 两条线；许多现代 GPS 的默认 `57600` 波特率也高于 SoftSerial 能力，因此自动配置可能失败。

关闭自动配置时，需手动将 GPS 设置为：

- 波特率 `19200`；
- 仅以 `2 Hz` 发送 `Nav_PVT` 数据。

随后可将其接至 FC 的单个 SoftSerial `RX` 引脚，波特率为 `19200`。仅 `2Hz` 数据会使救援过程非常顿挫且不可靠；不要冒险，应使用真实 UART。

### SoftSerial 与通过 MSP 的 HD OSD（DisplayPort）

在 4.5 中，禁止将 SoftSerial 用于任何 MSP 连接，包括 HD OSD。

在 4.4 及更早版本，技术上可行但不推荐。必须定义 `TX` 和 `RX` 引脚；除最简单 OSD 外，数据速率很可能压垮连接。SoftSerial 上限为 `19200`，不要使用更高波特率。

### 启用 SoftSerial

SoftSerial 需要自定义 CLI 命令。必须找到带关联 timer 的未用引脚，最常见是 PPM 或 `LED_STRIP` 引脚。并非所有此类引脚都可在所有板卡上工作；启用前可能需要研究所用板卡的 SoftSerial 可行性。

先在 CLI 中输入 `resource`，获取设备现有焊盘的已分配引脚号列表。

例如，若 `LED_STRIP 1` 分配到 `A15`，板上有 LedStrip 焊盘且未使用，可通过以下命令取消其 `LED_STRIP 1` 分配：

`resource led_strip 1 none`

随后可将该引脚分配给 SoftSerial 1 的 `TX`。命令已变更：

- Betaflight 4.5 及更新版本：`RESOURCE SOFTSERIAL_TX 1 A15`
- Betaflight 4.4 及更早版本：`RESOURCE SERIAL_TX 11 A15`

资源重分配成功后，4.5 中执行 `diff` 会显示：

```
resource LED_STRIP 1 NONE
resource SOFTSERIAL_TX 1 A15
```

注意：

- CLI `diff` 显示相对于默认资源配置的变化；
- CLI `resource show all` 会提供所有串口、timer 等的完整列表；
- 资源已重分配并不代表 SoftSerial 端口一定可正常工作。

Oscar Liang 提供了很好的 [SoftSerial 设置总结](https://oscarliang.com/betaflight-soft-serial/)。请记住，Betaflight 4.5 中命令已改变。

### CLI `serial` 命令

SoftSerial 激活时，`serial` CLI 命令会显示所有已配置串口。以 `30` 开头的行表示 SoftSerial 1，以 `31` 开头的行表示 SoftSerial 2。

例如，若将 SmartAudio 配置在 SoftSerial 1 的 `TX` 引脚，执行 `serial` 后应出现如下行：

```
serial 30 2048 115200 57600 0 115200
```

更多信息见[串口页面](/docs/wiki/guides/current/Serial)。

### 历史说明

SoftSerial 的历史信息见 [Wiki Guides Archive](/docs/wiki/guides/archive/Single-Wire-Software-Serial)。
