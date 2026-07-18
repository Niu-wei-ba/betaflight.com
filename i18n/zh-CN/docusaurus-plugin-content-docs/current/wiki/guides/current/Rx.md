# 接收机（RX）

接收机用于接收发射机发出的遥控信号，并将其转换为飞控可以识别的信号。

接收机基本分为 3 类：

1. 并行 PWM 接收机
2. PPM 接收机
3. 串行接收机

自 2016 年起，建议新购时选择串行或 PPM 接收机。请避免使用并行 PWM 接收机（每个通道一根信号线），因为这类接收机会占用大量 IO 引脚；部分新飞控不支持并行 PWM。

## 并行 PWM 接收机

支持 8 个通道，每个输入引脚对应一个通道。在某些平台上，使用并行输入会禁用串口和 SoftSerial，因而难以使用遥测或 GPS 功能。

## PPM 接收机

PPM 有时也称为 PPM SUM 或 CPPM。

单个输入引脚可传输 12 个通道。其精度和抗抖动表现不如采用串行通信的方案，但较为容易获得。

已报告可正常工作的接收机：

- [FrSky D4R-II](http://www.frsky-rc.com/product/pro.php?pro_id=24)
- [Graupner GR24](http://www.graupner.de/en/products/33512/product.aspx)
- [R615X Spektrum/JR DSM2/DSMX Compatible 6Ch 2.4GHz Receiver w/CPPM](http://www.hobbyking.com/hobbyking/store/__46632__OrangeRx_R615X_DSM2_DSMX_Compatible_6Ch_2_4GHz_Receiver_w_CPPM.html)
- [FrSky D8R-XP 8ch telemetry receiver, or CPPM and RSSI enabled receiver](http://www.frsky-rc.com/product/pro.php?pro_id=21)
- [FrSky X4R and FrSky X4RSB](http://www.frsky-rc.com/download/view.php?sort=&down=158&file=X4R-X4RSB)：刷入 CPPM 固件后，在信号针脚 2 与 3 之间插入跳线并完成绑定
- 所有支持 FrSky S.Bus 的设备：接入 [S.Bus CPPM converter cable](http://www.frsky-rc.com/product/pro.php?pro_id=112)。不插跳线时，该转换线使用 21 ms 帧周期（通道 1-8）；插入跳线后使用 28 ms 帧周期，可用通道 1-12
- FlySky/Turnigy FS-iA4B、FS-iA6B、FS-iA10 接收机：若发射机发送 8 个通道，这些接收机均可提供 8 个通道（FS-i6 和 FS-i10 发射机）。使用 `rx-setup/ppm` 设置启用。

## 串行接收机

### Spektrum

目前通过串行接口支持 8 个通道。

已报告可正常工作的接收机：

Lemon Rx DSMX Compatible PPM 8-Channel Receiver + Lemon DSMX Compatible Satellite with Failsafe
http://www.lemon-rx.com/index.php?route=product/product&product_id=118

### S.BUS

目前通过串行接口支持 16 个通道。请参阅下文设置发射机的方法。

- 接收机输出与飞控之间可能需要反相器。不过部分飞控已内置反相器（例如 CC3D 的主端口），无需额外添加。
- 部分 OpenLRS 接收机输出非反相 SBUS 信号。使用 F3 系列飞控时，可通过 CLI 命令 `set sbus_inversion = OFF` 关闭 SBUS 反相。
- SoftSerial 端口不能用于 SBUS，因为其波特率过高（1 Mbps）。请参阅与飞控板对应的章节，确定可使用哪些端口。
- 需要在 Betaflight App 的“接收机”选项卡或 CLI（`map` 命令）中配置通道映射。注意，8 通道以上的通道按原始顺序直接映射，不能重新映射。

已报告可正常工作的接收机：

FrSky X4RSB 3/16ch Telemetry Receiver
http://www.frsky-rc.com/product/pro.php?pro_id=135

FrSky X8R 8/16ch Telemetry Receiver
http://www.frsky-rc.com/product/pro.php?pro_id=105

Futaba R2008SB 2.4GHz S-FHSS
http://www.futaba-rc.com/systems/futk8100-8j/

#### OpenTX S.BUS 配置

使用 OpenTX 时，请将发射机模块设为 D16 模式，并且在绑定**前**于发射机中选择 CH1-16，才能接收全部 16 个通道。

部分 Taranis X9D Plus 发射机搭载的 OpenTX 2.09 存在一个缺陷：[issue:1701](https://github.com/opentx/opentx/issues/1701)。该缺陷会导致无法使用全部 16 个通道。请升级至最新版 OpenTX，确保 16 个通道均能正确接收；未修复时，无论 CH1-16/D16 设置如何，均只能使用 8 个通道。

### SRXL（原 XBUS）

（Serial Receiver Link Protocol，串行接收机链路协议）

SRXL 是一种开放数据传输协议，只需一根信号线，即可将 RC 接收机的控制数据传输至无副翼系统等其他设备。SRXL.org 建立该协议的目的，是提供一个可自由获取的统一协议，让制造商能够轻松将其实现到接收机及处理接收机数据的设备中。

该协议并未规定数据的具体处理方式，只定义了接收机数据的封装框架。各制造商可以使用各自的 ID，并将其附加在每个数据集的开头，以便使用该数据的设备正确识别并处理数据集的有效载荷。

支持的接收机：

#### Multiplex

所有支持 SRXL 的接收机（包括 FLEXX 接收机）

#### Graupner / SJ HOTT

所有支持 SUMD 的接收机

#### Spektrum

AR7700 / AR9020 接收机

#### JR

JR X-BUS

务必在发射机菜单中将 XBUS 设为“MODE B”！
有关 JR XBUS 协议的信息，请参阅：http://www.jrpropo.com/english/propo/XBus/

已报告可正常工作的接收机：

XG14 14ch DMSS System w/RG731BX XBus Receiver
http://www.jramericas.com/233794/JRP00631/

#### Jeti

带 UDI 输出的接收机

### XBUS MODE B RJ01

有一种遥控接收机专为 Align T-Rex 150 直升机等小型 BNF 模型设计。代码也支持将 Align DMSS RJ01 接收机直接与 Betaflight 配合使用。

使用此接收机时，必须从硬件为其提供 3 V 电源，然后像其他串行 RX 接收机一样连接串行信号线。

要使该接收机工作，必须将 `serialrx_provider` 指定为 `XBUS_MODE_B_RJ01`。此外，也必须将遥控器的 XBUS 模式设为“MODE B”。

接收机名称：Align DMSS RJ01 (HER15001)

### SUMD

目前通过串行接口支持 16 个通道。

已报告可正常工作的接收机：

GR-24 receiver HoTT
http://www.graupner.de/en/products/33512/product.aspx

Graupner receiver GR-12SH+ HoTT
http://www.graupner.de/en/products/870ade17-ace8-427f-943b-657040579906/33565/product.aspx

### SUMH

目前通过串行接口支持 8 个通道。

SUMH 是旧版 Graupner 协议。Graupner 已为许多接收机发布固件更新，使其可改用 SUMD。

### IBUS

目前通过串行接口支持 10 个通道。

IBUS 是 FlySky 的数字串行协议，可用于 FS-IA4B、FS-IA6B 和 FS-IA10 接收机。Turnigy TGY-IA6B 与 TGY-IA10 是相同设备，仅标签不同，因此同样可用。

若使用 FS-I6 或 TGY-I6 等 6 通道发射机，必须将发射机刷写为 10 通道固件，才能使用这些额外通道。

已报告可正常工作的接收机（均通过串行接口提供 10 个通道）：

- FlySky/Turnigy FS-iA4B 4-Channel Receiver (http://www.flysky-cn.com/products_detail/productId=46.html)
- FlySky/Turnigy FS-iA6B 6-Channel Receiver (http://www.flysky-cn.com/products_detail/&productId=51.html)
- FlySky/Turnigy FS-iA10 10-Channel Receiver (http://www.flysky-cn.com/products_detail/productId=53.html)
- FlySky/Turnigy FS-iA10B 10-Channel Receiver (http://www.flysky-cn.com/products_detail/productId=52.html)

#### 在同一飞控串口上合并 FlySky IBUS 遥测与串行 RX

按下图连接 FlySky FS-iA6B 接收机：

```
    +---------+
    | FS-iA6B |
    |         |
    | Ser RX  |---|<---\       +------------+
    |         |        |       | FC         |
    | Sensor  |--#==#--*-------| SerialTX   |
    +---------+                +------------+
```

使用一个二极管，将其阴极接至接收机的串行 RX 输出（例如 1N4148）；阳极接至飞控的串行 _TX_ 引脚，并经由一个电阻（10 KOhm）连接至接收机的 IBUS 传感器端口。

注意（2018-07-27）：某些情况下串联电阻的阻值可能过大，降至 1 K[ohm] 可能会获得良好结果。

通过 CLI 启用：

```
    serial 1 1088 115200 57600 115200 115200
    feature RX_SERIAL
    set serialrx_provider = IBUS
    save
```

### Jeti EX Bus

该协议支持 16 个通道，传输速率为 100 Hz。目前不支持 HS（High Speed）选项。

必须在设备管理器中将接收机配置为 EX Bus，并将其连接至一个空闲飞控串口的 _TX_ 引脚。

有关接线和设置的更多信息，请参阅[此文档](/resources/Jeti-Ex-Bus-Setup.pdf)。

## MultiWii 串行协议（MSP）

允许使用 MSP 命令作为 RC 输入。为保持与 MSP 的兼容性，仅支持 8 个通道。

## 配置

以下 3 个功能用于控制接收机模式：

```
RX_PPM
RX_SERIAL
RX_PARALLEL_PWM
RX_MSP
```

一次只能启用一种接收机功能。

### RX 信号丢失检测

软件始终启用信号丢失检测，用于保障安全并触发失控保护。

`rx_min_usec` 和 `rx_max_usec` 设置用于检测 RX 何时停止发送数据、进入失控保护状态或丢失信号。

默认情况下，检测到信号丢失后，飞控会将俯仰、横滚和偏航设为 `mid_rc` 配置的值。油门将设为 `rx_min_usec` 配置的值；使用 3D 功能时则设为 `mid_rc`。

出现以下情况时可检测到信号丢失：

1. 未收到 RX 数据（可能由无线信号、接收机配置或接线问题导致）。
2. 使用串行 RX，且接收机指示进入失控保护状态。
3. 前 4 个摇杆通道中任一通道的值不在 `rx_min_usec` 与 `rx_max_usec` 指定的范围内。

### RX 丢失配置

使用 `rxfail` CLI 命令配置各通道在 RX 丢失时的行为。

飞行通道可设为 AUTOMATIC 或 HOLD；AUX 通道可设为 SET 或 HOLD。

- AUTOMATIC：飞行通道设为安全值（低油门；偏航、俯仰和横滚回中）。
- HOLD：通道保持最后一个值。
- SET：通道设为指定的配置值。

飞行通道默认使用 AUTOMATIC，AUX 通道默认使用 HOLD。

`rxfail` 命令可与模式范围结合使用，以触发不同动作。

`rxfail` 命令接受 2 或 3 个参数：

- 通道索引（见下文）
- 模式（`a` = AUTOMATIC、`h` = HOLD、`s` = SET）
- 使用 SET 模式时的设定值

无论通道映射如何，通道始终按照以下顺序指定：

- 横滚为 0
- 俯仰为 1
- 偏航为 2
- 油门为 3
- AUX 通道从 4 开始。

示例：

使油门通道在检测到 RX 丢失时使用自动值：

`rxfail 3 a`

使 AUX4 在检测到 RX 丢失时设为 2000：

`rxfail 7 s 2000`

使 AUX8 在检测到 RX 丢失时保持当前值：

`rxfail 11 h`
