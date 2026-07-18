# 串口

Betaflight 的串口配置具有较高灵活性，但相应地也更复杂。

Betaflight 区分功能（MSP、GPS、串口接收机等）和端口（VCP、UARTx、SoftSerial x、LPUART1）。
受硬件引脚映射、功能冲突、硬件与软件限制影响，并非所有功能都能在所有端口上使用。

## 串口类型

- USB 虚拟串口（VCP）- USB 端口上的 USB 引脚直接连接至处理器，无需专用的 USB 转 UART 适配器。VCP 不会“占用”物理 UART 端口。
- UART - 一对专用的硬件发送和接收引脚；信号检测与生成均由硬件完成。
- SoftSerial - 一对硬件发送和接收引脚；信号检测与生成均由软件完成。
- LPUART - Betaflight 4.5 及更高版本支持 G4 及其他 MCU 提供的“低功耗”UART 格式。默认情况下，LPUART 限制为 9600 波特率，但 Betaflight 会重新配置它，使其与普通 UART 的工作方式一致。通常仅有一个 LPUART，即 LPUART1。可在 CLI 中通过 `RESOURCE SERIAL_TX 11 <pin>` 和 `RESOURCE SERIAL_TX 11 <pin>` 配置其引脚分配。

“真正的”硬件 UART 在 CPU 占用方面效率最高。
SoftSerial 效率最低且速度最慢，只应供低带宽、低优先级应用使用，例如发送或接收遥测数据。

如果飞控不带板载 USB 转 UART 转换器，且不支持 VCP，除非将某个 UART 设置为 MSP，否则无法将计算机连接到该板。此时可使用 USB 转 UART 适配器通过该 UART 连接 Configurator。

USB 转串口适配器有时被称为 FTDI 板。FTDI 只是许多 USB 转 UART 板所采用芯片（FT232RL）的常见制造商。

选择 USB 转 UART 适配器时，建议选择引出了 DTR 且可选择 3.3V / 5V 电平的型号，适用范围更广。

通常还需要安装与该适配器芯片组匹配的驱动程序。

示例：

- [FT232RL FTDI USB To TTL Serial Converter Adapter](https://www.google.com/search?q=FT232RL+FTDI+USB+To+TTL+Serial+Converter+Adapter)
- [USB To TTL / COM Converter Module CP2102](https://www.google.com/search?q=USB+To+TTL+%2F+COM+Converter+Module++CP2102)

SoftSerial 和 UART 端口均可通过 USB 转 UART 转换板连接到计算机。通常不应将 SoftSerial 用于此用途；Betaflight 4.5 及更高版本也不允许将 SoftSerial 用于 MSP 连接。

## 串口配置

最佳做法是在 Configurator 中配置串口。

应先配置串口，再启用或禁用使用这些端口的功能。要配置 SoftSerial 端口，必须启用 `SOFTSERIAL` 功能。

### 限制

配置无效时，串口配置会重置为默认值，且部分功能可能被禁用。

- 必须始终保留一个可用于 MSP/CLI 的端口。
- MSP 端口默认数量为 3。从固件 2025.12 起，可使用自定义 define 增加 MSP 端口数量。例如刷写时，在“Build Configuration”部分添加自定义 define：`MAX_MSP_PORT_COUNT=n`；其中 n 为端口数量，最大不得超过 6。
- 要在端口上使用某项功能，还必须启用该功能对应的 feature。例如，为端口配置 GPS 后，还需启用 GPS feature。
- 使用 SoftSerial 时，所有 SoftSerial 端口必须使用相同波特率。
- SoftSerial 的波特率上限为 19200。
- 除 MSP 外，所有遥测系统都会忽略试图覆盖波特率的设置。
- MSP/CLI 可与 Blackbox 或遥测二选一共用端口。在共享模式下，仅在解锁后输出 Blackbox 或遥测数据。
- SmartPort 遥测不能与 MSP 共用端口。
- 不支持其他串口端口共享组合。
- 可同时使用任意数量的不同遥测系统。
- 每种遥测系统只能使用一次。例如，不能在两个端口上使用 FrSky 遥测，但可分别在不同端口上使用 MSP Telemetry 和 FrSky。

### 通过 CLI 配置

也可通过 CLI 配置，但这些命令面向开发者和高级用户。

`serial` CLI 命令接受 6 个参数：

```
serial <port identifier> <port function> <msp baudrate> <gps baudrate> <telemetry baudrate> <blackbox baudrate>
```

| `serial` CLI 命令参数 |
| --------------------- |
| 1. 串口标识符         |
| 2. 串口功能           |
| 3. MSP 波特率         |
| 4. GPS 波特率         |
| 5. 遥测波特率         |
| 6. Blackbox 波特率    |

注意：标识符请参阅源代码中的 `serialPortIdentifier_e`；功能位掩码请参阅源代码中的 `serialPortFunction_e`。

### 1. 串口标识符

| 标识符                  |  值 |
| ----------------------- | --: |
| SERIAL_PORT_NONE        |  -1 |
| SERIAL_PORT_USART1      |   0 |
| SERIAL_PORT_USART2      |   1 |
| SERIAL_PORT_USART3      |   2 |
| SERIAL_PORT_UART4       |   3 |
| SERIAL_PORT_UART5       |   4 |
| SERIAL_PORT_USART6      |   5 |
| SERIAL_PORT_USART7      |   6 |
| SERIAL_PORT_USART8      |   7 |
| SERIAL_PORT_UART9       |   8 |
| SERIAL_PORT_USART10     |   9 |
| SERIAL_PORT_USB_VCP     |  20 |
| SERIAL_PORT_SOFTSERIAL1 |  30 |
| SERIAL_PORT_SOFTSERIAL2 |  31 |
| SERIAL_PORT_LPUART1     |  40 |
| SERIAL_PORT_UART0       |  50 |
| SERIAL_PORT_USART1      |  51 |
| SERIAL_PORT_USART2      |  52 |
| SERIAL_PORT_USART3      |  53 |
| SERIAL_PORT_UART4       |  54 |
| SERIAL_PORT_UART5       |  55 |
| SERIAL_PORT_USART6      |  56 |
| SERIAL_PORT_USART7      |  57 |
| SERIAL_PORT_USART8      |  58 |
| SERIAL_PORT_UART9       |  59 |
| SERIAL_PORT_USART10     |  60 |

固件 2025.12 修改了 CLI 处理串口配置的方式：它使用串口名称而非标识符。

```
serial VCP 1 115200 57600 0 115200
serial UART1 2048 115200 57600 0 115200
serial UART2 64 115200 57600 0 115200
serial UART3 0 115200 57600 0 115200
serial UART4 0 115200 57600 0 115200
serial UART6 2 115200 57600 0 115200
```

:::note

- ID 0-19 保留给 UART 1-20（在固件 2025.12 中为旧式用法）
- ID 20-29 保留给 USB VCP
- ID 30-39 保留给 SoftSerial 1 和 2
- ID 40-49 保留给 LPUART 1
- ID 50-60 保留给 UART 0-10（在固件 2025.12 中新增）
- 可从 ID 70 开始添加其他设备
- 端口 0、4、5、9 使用 `UART` 标识
- 端口 1、2、3、6、7、8、10 使用 `USART` 标识

:::

在固件 4.5 中，SOFTSERIAL 或 LPUART 使用以下资源：

```
resource SOFTSERIAL_TX 1 <PIN>
resource SOFTSERIAL_RX 1 <PIN>
resource SOFTSERIAL_TX 2 <PIN>
resource SOFTSERIAL_RX 2 <PIN>
resource LPUART_TX 1 <PIN>
resource LPUART_RX 1 <PIN>
```

### 2. 串口功能

| 功能                         |     值 |        位 |
| ---------------------------- | -----: | --------: |
| FUNCTION_NONE                |      0 |         0 |
| FUNCTION_MSP                 |      1 |  1 \<\< 0 |
| FUNCTION_GPS                 |      2 |  1 \<\< 1 |
| FUNCTION_TELEMETRY_FRSKY_HUB |      4 |  1 \<\< 2 |
| FUNCTION_TELEMETRY_HOTT      |      8 |  1 \<\< 3 |
| FUNCTION_TELEMETRY_LTM       |     16 |  1 \<\< 4 |
| FUNCTION_TELEMETRY_SMARTPORT |     32 |  1 \<\< 5 |
| FUNCTION_RX_SERIAL           |     64 |  1 \<\< 6 |
| FUNCTION_BLACKBOX            |    128 |  1 \<\< 7 |
| 未使用                       |    256 |  1 \<\< 8 |
| FUNCTION_TELEMETRY_MAVLINK   |    512 |  1 \<\< 9 |
| FUNCTION_ESC_SENSOR          |   1024 | 1 \<\< 10 |
| FUNCTION_VTX_SMARTAUDIO      |   2048 | 1 \<\< 11 |
| FUNCTION_TELEMETRY_IBUS      |   4096 | 1 \<\< 12 |
| FUNCTION_VTX_TRAMP           |   8192 | 1 \<\< 13 |
| FUNCTION_RCDEVICE            |  16384 | 1 \<\< 14 |
| FUNCTION_LIDAR_TF            |  32768 | 1 \<\< 15 |
| FUNCTION_FRSKY_OSD           |  65536 | 1 \<\< 16 |
| FUNCTION_VTX_MSP             | 131072 | 1 \<\< 17 |

注意：

`FUNCTION_FRSKY_OSD` = `(1\<\<16)` 需要 17 位。这里最多可使用 32 位（`1\<\<32`）。

要配置 `MSP_DISPLAYPORT`，请使用 `FUNCTION_VTX_MSP | FUNCTION_MSP` 的组合。

### 3. MSP 波特率

|  波特率 |
| ------: |
|    9600 |
|   19200 |
|   38400 |
|   57600 |
|  115200 |
|  230400 |
|  250000 |
|  500000 |
| 1000000 |

### 4. GPS 波特率

| 波特率 |
| -----: |
|   9600 |
|  19200 |
|  38400 |
|  57600 |
| 115200 |

注意：还提供布尔值 `AUTOBAUD`。建议使用固定波特率，并根据设备文档配置 GPS 波特率。

### 5. 遥测波特率

| 波特率 |
| -----: |
|   AUTO |
|   9600 |
|  19200 |
|  38400 |
|  57600 |
| 115200 |

### 6. Blackbox 波特率

|  波特率 |
| ------: |
|   19200 |
|   38400 |
|   57600 |
|  115200 |
|  230400 |
|  250000 |
|  400000 |
|  460800 |
|  500000 |
|  921600 |
| 1000000 |
| 1500000 |
| 2000000 |
| 2470000 |

### 串口波特率

串口波特率定义如下：

| ID  |  波特率 |
| --- | ------: |
| 0   |    自动 |
| 1   |    9600 |
| 2   |   19200 |
| 3   |   38400 |
| 4   |   57600 |
| 5   |  115200 |
| 6   |  230400 |
| 7   |  250000 |
| 8   |  400000 |
| 9   |  460800 |
| 10  |  500000 |
| 11  |  921600 |
| 12  | 1000000 |
| 13  | 1500000 |
| 14  | 2000000 |
| 15  | 2470000 |

### 直通

Betaflight 可进入特殊的串口直通模式，将串口数据转发至连接在 UART/SoftSerial 端口上的设备。这可用于更改 Betaflight 外设的配置，例如 OSD、蓝牙适配器、串口接收机等。

要启动直通模式，请使用 CLI 命令 `serialpassthrough`。该命令接受四个参数：

    serialpassthrough \<port1 id> [port1 baud] [port1 mode] [port1 DTR PINIO] [port2 id] [port2 baud] [port2 mode]

`PortX ID` 是 Betaflight 源代码中串口的内部标识符（请参阅源代码中的 `serialPortIdentifier_e`）。例如，UART1-UART4 的标识符分别为 0-3，SoftSerial1/SoftSerial2 则分别为 30/31。`PortX Baud` 是目标波特率，`portX mode` 为关键字 `rx` 与 `tx` 的组合（`rxtx` 表示全双工）。波特率和模式参数可覆盖指定端口已配置的值。`port1 DTR PINIO` 用于标识可选连接到所连设备 DTR 线的 PINIO 资源。

若未指定 port2 配置（最后三个参数），直通将在 port1 和 VCP 之间运行。最后三个参数用于“UART 之间直通”，详见该章节。

例如，若 MWOSD 连接至 UART 2，可使用以下命令启用与该设备的通信。该命令未指定波特率或模式，因此使用端口已配置的值（见上文）。

```
serialpassthrough 1
```

如果未指定波特率，或将其设为 0，`serialpassthrough` 支持通过 USB 更改波特率。这允许 MWOSD GUI 等工具动态将波特率设为 57600 以重新刷写 MWOSD 固件，之后再设为 115200 调整设置，无需在两项操作之间重启飞控板。

_要使用 MWOSD GUI 等工具，必须断开 Betaflight App 或退出该程序。_

**要退出串口直通模式，请重启飞控。**

要通过 `serialpassthrough` 重新刷写基于 Arduino 的设备（例如 MWOSD），除 RX 和 TX 串口线外，还必须连接 DTR 线。DTR 用作复位线以调用 bootloader。DTR 线可连接到飞控上的任意 GPIO 引脚；随后必须将此引脚关联到 PINIO 资源，并将对应实例传递给 `serialpassthrough` 命令。若不需要 DTR，可忽略此参数或将其设为 `none`。可在 CLI 中使用 `resource` 命令，将与任意 UART 关联的 DTR 线指定为 PINIO 资源。

例如，以下 OpenPilot Revolution 配置将 UART6 串口的 TX 配置在 C06 引脚，RX 配置在 C07 引脚，DTR 连接则使用 C08 引脚上的 PINIO。

```
resource SERIAL_TX 1 A09
resource SERIAL_TX 3 B10
resource SERIAL_TX 4 A00
resource SERIAL_TX 6 C06
resource SERIAL_RX 1 A10
resource SERIAL_RX 3 B11
resource SERIAL_RX 6 C07

resource PINIO 1 C08
```

要将 DTR 线分配到其他引脚，请使用以下命令：

```
resource PINIO 1 c05
```

要取消 DTR 与引脚的关联，请使用以下命令：

```
resource PINIO 1 none
```

按上述示例配置与 DTR 线关联的 PINIO 资源后，可使用以下命令连接到挂接在 OpenPilot Revolution 上的 MWOSD：

`serialpassthrough 5 0 rxtx 1`

这将使用 UART 6 建立连接：通过 USB 设置波特率、使用全双工模式，并由 PINIO 资源 1 驱动 DTR。

将 DTR 线配置为关联 PINIO 资源还有一个理想的副作用：飞控复位时，所连接的 Arduino 设备也会复位。

注意：若在运行标准 MWOSD 固件的端口上保持 DTR 配置，飞控复位时显示将出现花屏。这是因为 MWOSD 默认不能正确处理来自 DTR 的复位。可采用以下两种解决方案：

1. 在重新刷写 MWOSD 前，使用上述 `resource` 命令分配 DTR 引脚；之后再取消 DTR 与该引脚的关联。
2. 在定义 `MAX_SOFTRESET` 的条件下重新构建 MWOSD。此后每次飞控复位时，MWOSD 都能正确复位。

### UART 之间直通

在 BetaFlight 4.1 或更高版本中，可在 UART 之间建立串口直通。

`serialpassthrough` 的最后三个参数用于 UART 之间直通：`[port2 id]`、`[port2 baud]`、`[port2 mode]`。若不需要 UART 之间直通，可忽略它们，并按上述说明使用 `serialpassthrough`。若需要 UART 之间直通，`[port2 id]` 为必填参数，其取值范围与 `port1 ID` 相同，表示串口的内部标识符。`[port2 baud]` 和 `[port2 mode]` 为可选参数，默认值分别为 `57600` 和 `MODE_RXTX`。

例如，若使用飞控内置 BLE 芯片，且该 BLE 芯片内部连接到一个 UART，可使用以下命令让该 UART 与另一个 UART 通信：

```
serialpassthrough 0 115200 rxtx none 4 19200
```

该命令会在 UART1 和 UART5 之间建立串口直通：UART1 的波特率为 115200、模式为 `MODE_RXTX`、DTR 为 `none`；UART5 的波特率为 19200，未指定模式，因此采用默认值 `MODE_RXTX`。
