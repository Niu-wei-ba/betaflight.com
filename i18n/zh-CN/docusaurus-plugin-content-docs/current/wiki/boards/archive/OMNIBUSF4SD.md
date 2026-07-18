# OMNIBUSF4SD

## 说明

这是其他 [OmnibusF4](/docs/wiki/boards/archive/OMNIBUSF4) 板卡的一个变体，配置略有不同。

此 target 适用于许多变体，包括不带 SD 读卡器的 20 x 20 板卡。

## 关于 I2C

Betaflight 配置文件中，UART3 TX 与 RX 分别设为 `B10` 和 `B11`。

但部分板卡会将 I2C 的 SCL、SDA 焊盘与 TX3、RX3 焊盘并联。因此两种功能无法同时使用。

若要在这类板卡上连接磁力计或其他 I2C 设备，将 SCL 接至 `TX3/SCL` 焊盘、SDA 接至 `RX3/SDA` 焊盘，然后按以下方式重新配置 Betaflight：

```
resource SERIAL_TX 3 none
resource I2C_SCL 1 B10

resource SERIAL_RX 3 none
resource I2C_SDA 1 B11
```

恢复为默认 UART3 配置：

```
resource I2C_SCL 1 none
resource serial_tx 3 B10

resource I2C_SDA 1 none
resource serial_rx 3 B11
```

可能需要从 3.3 V 向 SDA、SCL 两条线各接一只 2.2 kΩ 上拉电阻，但并非总是需要。

更多信息请参阅：https://docs.px4.io/v1.12/en/flight_controller/omnibus_f4_sd.html
