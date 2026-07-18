# Spektrum 对频支持

支持通过硬件对频插头进行 Spektrum 对频。

大多数 Target 已启用 Spektrum 对频代码；但部分板卡可能因 SBus 反相器而无法工作。若需要 Spektrum 对频代码，请确认所用板卡明确提供对频支持。

## 配置对频代码

可在相关 `target.h` 文件中使用以下参数启用和配置：

```text
SPEKTRUM_BIND          Enables the Spektrum bind code
BIND_PORT  GPIOA       Defines the port for the bind pin
BIND_PIN   Pin_3       Defines the bind pin (the satellite receiver is connected to)
```

使用以下定义启用硬件对频插头功能：

```text
HARDWARE_BIND_PLUG     Enables the hardware bind plug feature
BINDPLUG_PORT  GPIOB   Defines the port for the hardware bind plug
BINDPLUG_PIN   Pin_5   Defines the hardware bind plug pin
```

## 硬件

构建固件时定义 `HARDWARE_BIND_PLUG` 即可启用硬件对频插头。还必须定义 `BINDPLUG_PORT` 和 `BINDPLUG_PIN`（见上文）。构建 AlienFlight 固件时会自动完成这些设置。硬件对频插头应接在定义的对频引脚和地线之间。

## 工作方式

CLI 参数 `spektrum_sat_bind` 定义发送给卫星接收机的对频脉冲数（`1` 至 `10`）。无论何种情况，将 `spektrum_sat_bind` 设为零都会禁用对频模式。对频模式只会在上电或硬复位后激活。不同取值见下表。

若配置了硬件对频插头，只有在固件启动时插上该插头才会激活对频模式；`spektrum_sat_bind` 的值会永久保留。正常飞行时应始终拔下对频插头。

若未使用硬件对频插头，`spektrum_sat_bind` 参数会在下一次硬件复位时触发对频流程，之后自动重置为 `0`。

有关特定卫星接收机的对频模式，请参阅接收机文档。通常会以 LED 闪烁指示对频模式。

## `spektrum_sat_bind` 参数值

| 值  | 接收机模式        | 备注               |
| :-- | :---------------- | :----------------- |
| 3   | DSM2 1024bit/22ms |                    |
| 5   | DSM2 2048bit/11ms | AlienFlight 默认值 |
| 7   | DSMX 1024bit/22ms |                    |
| 8   | DSMX 2048bit/22ms | 新版 DXe 使用      |
| 9   | DSMX 2048bit/11ms |                    |

### 将 Spektrum 兼容卫星接收机连接至 Flip32+ 飞控

Flip32/Flip32+ 的接线方式较特殊：卫星模块专用接口与 USB 适配器共用 UART 引脚。因此不能使用该接口，因为它映射到 UART1；不应将 UART1 分配给 `SERIAL_RX`，否则会破坏 USB 功能。（该问题似乎已在较新的 Flip32/Flip32+ 版本中修复。）

要将卫星接收机接至 Flip32+，需将串行数据引脚接到 `RC_CH4`。它是电路板右侧 3x6 排针左列自上而下第 4 个引脚。`GND` 和 `+3.3V` 可取自专用 `SAT` 接口，也可取自任意地线引脚及 `BOOT` 接口的 1 号引脚，该引脚同样提供 `3.3V`。

#### 已测试的卫星接收机与遥控器组合

| Satellite          | Remote         | 备注                                        |
| :----------------- | :------------- | :------------------------------------------ |
| Orange R100        | Spektrum DX6i  | 对频值 3                                    |
| Lemon RX DSMX      | Spektrum DX6i  | 对频值 9                                    |
| Lemon RX DSM2/DSMX | Spektrum DX8   | 对频值 5                                    |
| Lemon RX DSMX      | Walkera Devo10 | 对频值 9，Deviation 固件 4.01，最高 12 通道 |
| Lemon RX DSM2      | Walkera Devo7  | 对频值 9，Deviation 固件                    |
| Lemon RX DSMX      | Spektrum DXe   | 对频值 8，最高支持 9 通道                   |
