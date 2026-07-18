# GPS

将 GPS 接收机安装在飞行器上方、并尽量远离其他干扰源，通常能获得最佳效果。

罗盘/磁力计传感器也应远离磁干扰源，例如电源线、电机和电调（ESC）。

支持两种 GPS 协议：NMEA 文本协议和 UBLOX 二进制协议。

## 在 BF Configurator 中启用 GPS

按以下步骤通过 CLI 启用 GPS：

1. [配置一个用于 GPS 的串口。](Serial)
1. 设置 GPS 波特率；若不确定，请保留为 `AUTO`。
1. 启用 `feature GPS`。
1. 设置 `gps_provider`。
1. 将 GPS 接至已配置为 GPS 的串口。
1. 保存并重启。

:::note

已观察到 GPS 在 115200 波特率下可能丢包。若遇到此问题，请尝试 57600。

:::

:::note

**使用 GPS 时，建议采用 8k4k 的 PID 循环频率**（CLI：`set pid_process_denom = 2`）。

8k8k 的循环可能没有足够的 CPU 时间来支持更高的波特率。

GPS 代码的耗时几乎与 Rx 或 OSD 代码相当，CPU 开销较高。

使用 8k8k 时，请通过 `tasks` CLI 命令检查 CPU 占用百分比。

:::

连接方式请参阅对应飞控板的文档，确认引脚和端口编号。

### GPS 提供商

正确设置 `gps_provider`，例如：`set gps_provider=UBLOX`

| 值    |
| ----- |
| NMEA  |
| UBLOX |

### GPS 自动配置

使用 UBLOX 时，建议启用 GPS 自动配置，以确保飞控能接收到所需的 GPS 消息。

使用 `set gps_auto_config=ON` 启用 GPS 自动配置。

:::info

Betaflight 4.5 重写了自动配置功能，建议使用；它适用于大多数飞手。

:::

若不使用 GPS 自动配置，请确保 GPS 接收机以正确频率输出正确的消息。请参阅下方的手动 UBlox 设置。

### SBAS

使用 UBLOX GPS 时，可通过 `gps_sbas_mode` 配置 SBAS 模式。

默认值为 `AUTO`。

| 值                | 区域     |
| ----------------- | -------- |
| AUTO              | 全球     |
| EGNOS             | 欧洲     |
| WAAS              | 北美洲   |
| MSAS              | 亚洲     |
| GAGAN             | 印度     |
| SouthPAN (SPAN)\* | 澳大利亚 |

\*注意：SouthPAN 目前仍在部署中，可在 beta 模式下使用（计划于 2028 年取得生命安全认证）。SBAS 具有区域性，请确认所在地是否在 SBAS 覆盖范围内，且接收机能够处理该区域的信号；并非所有 SBAS 接收机都能配合所有 SBAS 卫星工作。

使用区域专用设置可能比 `AUTO` 更快获得 GPS 定位锁定。

此设置仅在 `gps_auto_config=ON` 时生效。

## GPS 接收机配置

GPS 模块既可由 BF 配置，也可手动配置。

### u-blox GPS 自动（BF）配置

若 `gps_auto_config=ON`，BF 会依次执行多项自动设置：根据是否连接到 Configurator 决定是否启用卫星视图消息，并检测模块是否支持较新的消息类型。若不支持，会自动回退至旧消息模型。实现可见 `gps.c` 中 `gpsInitUblox` 方法的 `GPS_STATE_CONFIGURE` 部分。

### u-blox GPS 手动配置

现代 GPS 接收机可通过二进制 UBX 协议双向通信（与旧式纯文本 NMEA 协议相对）。也可精确配置其行为，例如位置消息的发送频率、是否包含可见卫星信息、是否计算速度等。

这里的目标是：以正确协议（UBX）、足够高的频率（速率）、可靠的通信条件（波特率）接收适量数据（消息类型），从而计算返航点距离、速度、高度等数据。

#### 连接 GPS 模块以进行配置

使用 CLI 命令 `gpspassthrough`，可经由飞控连接 GPS 模块。若控制台开始输出随机字符，说明透传已工作；关闭 BF Configurator 后打开下述 GPS 软件。

注意，部分旧飞控板不会通过 USB 向 GPS 模块提供 +5V，例如 SPRacingF3。若使用 `gpspassthrough`，可能需要在板卡允许的情况下为控制器接入 BEC，或使用独立 UART 适配器。请查阅板卡文档，确认 GPS 端口是否由 USB 供电。

#### 使用 u-blox u-center 配置

需要 [u-blox u-center](https://www.u-blox.com/en/product/u-center)（仅 Windows）。可使用 v1 或 v2；两者的配置视图略有不同，但功能基本相同。以下以旧版 u-center 为例。

启用 `gpspassthrough` 并关闭 BF Configurator 后，打开 u-center 并连接飞控（同一端口；此时 GPS 模块被直接透传，BF 不处于活动状态）。

打开 View/Packet Console，其中会显示正在接收的消息类型。需要移除部分消息以节省资源，并添加部分消息。可通过锁定图标暂停显示，以检查输入消息。

打开 View/Configuration View。

进入 CFG（Configuration）。

选择 `Revert to default configuration`。
单击 `Send`。

#### 端口速度

此时可能需要断开并以默认波特率重新连接，通常是 9600 baud。

进入 PRT（Ports）。

将 `Target` 设为 `1 - Uart 1`。
将 `Protocol In` 设为 `0+1`（NMEA 和 UBX）。
将 `Protocol Out` 设为 `0+1`（NMEA 和 UBX）。
将 `Baudrate` 设为 `57600` 或 `115200`（注意：115200 常会出现间歇性连接问题）。
单击 `Send`。

这会立即“中断”与 GPS 的通信。由于尚未将新波特率保存到非易失性存储器，需在不复位 GPS 的情况下改用新波特率通信：选择 `Disconnect`，将软件波特率改为相同值，再选择 `Connect`。

在 Configuration View 中再次单击 `PRT`，并检查 Packet Console，确认消息正在发送且收到确认。

#### 要启用的消息类型

接下来，需要避免飞控浪费时间处理不必要的消息。单击 `MSG`，仅在 UART1 上启用以下消息，并将速率设为 1。（全局速率稍后会设置为 10Hz，即每秒 10 条消息；速率 1 表示每个周期发送一次，即每 100ms 一次。）

更改每条消息的目标和速率后，记得单击 `Send`：

| 消息类型 | 速率 | 说明                                                                  |
| -------- | ---: | --------------------------------------------------------------------- |
| NAV-PVT  |    1 | 导航位置、速度和时间解；合并位置、速度与时间信息，并包含精度数据。    |
| NAV-DOP  |    1 | 精度因子（DOP）：无量纲数，用于描述相对卫星几何形状对定位误差的影响。 |
| NAV-SAT  |   10 | 显示已知可见或当前由接收机跟踪的卫星信息。                            |

##### 仅当 GPS 模块不支持上述消息类型时使用的后备选项：

~~NAV-POSLLH NAV-DOP NAV-SOL NAV-VELNED~~
~~将速率设为 10，并启用 NAV-SVINFO 以查看可见卫星~~

通过 Packet View 再次确认只接收到所需消息：若有多余消息，禁用不需要的消息；若消息不足，确认已启用上方列出的消息。

#### 消息速率

接下来更改全局更新速率，在 Configuration View 中单击 `Rate (Rates)`。

将 `Measurement period` 设为 `100` ms。
将 `Navigation rate` 设为 `1`。
单击 `Send`。

这会让 GPS 接收机每秒输出所需消息 10 次（10Hz）。若 GPS 接收机无法设为 `100`ms，可尝试 `200`ms（5Hz），但精度会较低。

#### 动态平台模型

:::info

Betaflight 4.5 之后，启用 Auto Config 时，可通过 `set gps_ublox_acquire_model` 和 `set gps_ublox_flight_model` 命令选择动态平台模型。

:::

接下来更改模式，在 Configuration View 中单击 `NAV5 (Navigation 5)`。

将 `Dynamic Model` 设为 `Airborne <1g`，然后单击 `Send`。

这会启用合理性检查：最大高度为 50,000m，最大垂直或水平速度为 100m/s。超出这些范围的测量值会被判定为不合理，从而使定位无效。

使用自动配置时，Betaflight 会在解锁前使用 `Stationary`，解锁后使用 `Airborne <4g`。

建议使用 Airborne \<1g（参见下方说明），但仍应查阅 u-blox 文档了解合理性检查的细节。

摘自 [u-blox 协议规范](https://www.u-blox.com/en/product-resources?query=protocol&legacy=Current)：

- Pedestrian：适用于低加速度、低速度场景，例如行人移动。假定加速度较低。最大高度 [m]：9000；最大速度 [m/s]：30；最大垂直速度 [m/s]：20；合理性检查类型：高度和速度；最大位置偏差：小。
- Portable：适用于低加速度场景，例如便携设备，适合大多数情况。最大高度 [m]：12000；最大速度 [m/s]：310；最大垂直速度 [m/s]：50；合理性检查类型：高度和速度；最大位置偏差：中。
- Airborne < 1G：适用于动态范围和垂直加速度高于乘用车的应用。不支持 2D 定位解。最大高度 [m]：50000；最大速度 [m/s]：100；最大垂直速度 [m/s]：100；合理性检查类型：高度；最大位置偏差：大。

:::note

1G、2G、4G 飞行模式控制模块采用的滤波量和滤波类型。

- 1G 的滤波少得多，通常适合长距离巡航。理论上，1G 具有更准确的位置更新，但更容易受到快速或突兀的位置变化影响。测试表明，在这种情况下，若变化量超过阈值，模块会停止报告位置。

- 4G 的滤波多得多。在高速或快速位置变化时更准确，能更好地应对特技飞行等频繁、大幅的位置变化；在平稳飞行时则较不准确。

- 若以动态性较低、更常见的长距离飞行为目标，1G 可作为默认设置。对于动态更高的飞行，应建议用户依次尝试 2G 和 4G。

:::

#### 卫星增强系统（SBAS）设置

在 Configuration View 中单击 `SBAS (SBAS Settings)`。

将 `Subsystem` 设为 `Enabled`。
将 `PRN Codes` 设为 `Auto-Scan`，或选择所在地的特定 PRN 代码。[例如，SPAN 的 PRN 为 122](https://www.gps.gov/technical/prn-codes/L1-CA-PRN-code-assignments-2019-Oct.pdf)。

单击 `Send`。

#### 启用全球导航卫星系统（GNSS）

在 Configuration View 中单击 `GNSS (GNSS config)`。

大多数 GPS 模块最多支持同时启用 3 个 GNSS 系统。

通常建议启用 GPS（勾选 Configure、Enable、Signals）。

若位于大洋洲（日本/澳大利亚一线），且接收机支持，[准天顶卫星系统（QZSS）](https://qzss.go.jp/en/overview/services/sv01_what.html) 可帮助提高精度。

通常可启用 GPS、Galileo、BeiDou，以及 SBAS 或 QZSS 中的一种。可使用 [GNSS View](https://app.qzss.go.jp/GNSSView/gnssview.html) 查看所在地主要可用的卫星。

单击 `Send`。确认配置已保存（所需复选框均已勾选）；模块可能拒绝某些组合。

#### 保存（持久化）配置

至此所有更改仍只保存在 RAM 中，需要将其保存到 GPS 模块的永久存储器。

在 Configuration View 中单击 `CFG (Configuration)`。

选择 `Save current configuration`，然后单击 `Send`。

## 硬件

市面上有许多 GPS 接收机。
以下列出一些经过用户测试的硬件示例。

### Ublox

#### NEO-M8

| 模块                     | 说明                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| U-blox Neo-M8N w/Compass | 引脚定义可见 Pixfalcon 手册。SDA 和 SCL 可接至 I2C 总线以连接罗盘，TX 和 RX 可接至 UART 以连接 GPS。两者均需供电才能工作。                                                                       |
| Reyax RY825AI            | NEO-M8N、18Hz UART USB 接口、GPS/Glonass/BeiDou/QZSS 天线模块，带闪存。[eBay](http://www.ebay.com/itm/RY825AI-18Hz-UART-USB-interface-GPS-Glonass-BeiDou-QZSS-antenna-module-flash/181566850426) |
| mRo uGPS w/ LIS3MDL      | 超紧凑，重量仅 7.7 克。支持多星座（GPS 和 GLONASS），附带 JST-GH 尾线。可从 [mRobotics](https://store.mrobotics.io/product-p/mro-ugps-samm8q-01.htm) 购买。                                      |

#### NEO-7

| 模块                    | 说明                                                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U-blox Neo-7M w/Compass | [HobbyKing](http://www.hobbyking.com/hobbyking/store/__55558__Ublox_Neo_7M_GPS_with_Compass_and_Pedestal_Mount.html)。必须在 CLI 中设置 `align_mag`，磁力计才能正确工作：`set align_mag = 8`；不要忘记执行 `save`。 |

#### NEO-6

| 模块                          | 说明                                         |
| ----------------------------- | -------------------------------------------- |
| Ublox NEO-6M GPS with Compass | [eBay](http://www.ebay.com/itm/111585855757) |

### 串口 NMEA

#### MediaTek

| 模块     | 说明                                                                                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTK 3329 | 已在 115200 baud（默认）的硬件串口及 19200 baud 的 SoftSerial 上测试。可使用 MiniGPS 软件调整波特率和刷新率；若降低波特率，建议使用该软件。该软件会估算所选波特率和更新频率占用的 UART 带宽百分比。 |
