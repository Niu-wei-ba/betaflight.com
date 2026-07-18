# Spektrum 卫星接收机对频（3.2）

### 概述

在 3.2 之前，Spektrum 卫星接收机的对频引脚固定为预定义引脚，通常是某个固定 UART 的 RX 引脚。

从 3.2 起，可根据需要将支持对频功能的 Spektrum 卫星接收机接至任意 UART：

- 对频引脚默认自动选择为已配置卫星接收机所在 UART 的 RX 引脚。如果将 `UARTx` 配置为 Serial RX，并选择任一 SPEKTRUM 类串行接收机协议，则使用 `UARTx_RX` 对频。
- 若将 SRXL 选为串行接收机协议，则使用 `UARTx_TX` 对频。
- 自 3.3 起，自动选择也适用于以半双工方式连接的 DSM 接收机，见下文说明。

**注意**

- 只有飞控处理器与卫星接收机之间存在允许双向数据通信的直接连接时，对频才会成功。REVO 及其他基于 F4 的飞控会在部分 UART 上使用反相器，阻断对频信号。大多数 F4 板的 UART3 通常可用，UART1 与 UART6 则更容易受板卡设计影响。
- 对于 UART TX 直接引出至焊盘/通孔的 F4 板，可使用该 TX 引脚，并在 CLI 中将 `serialrx_halfduplex` 设为 `ON`。

### 覆盖默认对频引脚

可通过 `RX_BIND` 资源与 `resource` CLI 命令覆盖自动引脚选择：

```
resource RX_BIND pin-id
```

有些 target 默认分配了 `RX_BIND`，会禁用自动端口选择。可用以下命令移除该分配：

```
resource RX_BIND NONE
```

### 对频插头

3.2 起，对频插头功能同样可重新配置。使用 `RX_BIND_PLUG` 资源指定对频插头引脚：

```
resource RX_BIND_PLUG pin-id
```

目前仅支持负逻辑插头，即短接至 GND 时触发。

### 完成设置后的对频流程

在 CLI 中输入：

```
set spektrum_sat_bind = 9
save
```

断开 USB 线后重新接入。当接收机 LED 闪烁时，将其与遥控器对频。通常至此即可完成，除非同时禁用了自动退出对频模式。

默认启用自动退出对频模式；有时需要在设置对频的同时将其关闭：

```
set spektrum_sat_bind = 9
set spektrum_sat_bind_autoreset = OFF
save
```

若禁用自动退出，对频完成后必须手动恢复：

```
set spektrum_sat_bind = 0
set spektrum_sat_bind_autoreset = ON
save
```

其他对频选项值：

- `3`：DSM2 1024/22 ms
- `5`：DSM2 2048/11 ms
- `7`：DSMX 2048/22 ms
- `9`：DSMX 2048/11 ms

### 通道反向

通常需要反转横滚（ROLL）和偏航（YAW）：

```
rxrange 0 2000 1000
rxrange 1 1000 2000
rxrange 2 2000 1000
rxrange 3 1000 2000
```

更多详情： https://github.com/SpektrumFPV/SpektrumDocumentation/blob/master/Telemetry/Remote%20Receiver%20Interfacing.pdf
