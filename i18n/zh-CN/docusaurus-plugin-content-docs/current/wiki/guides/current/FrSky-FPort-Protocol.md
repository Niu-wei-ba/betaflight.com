# FrSky FPort 协议

## 背景

FPort 是 FrSky 与 Betaflight 联合开发的新 RC 协议。相较 FrSky 硬件使用的既有协议，它有以下改进：

- 仅需一条串行连接，RC 控制信息、遥测（包括 MSP 隧道）和 RSSI 均通过该连接传送；
- 串行连接使用 `115200, N81`，更易在对“特殊”模式支持有限的硬件上实现；
- 信号经过反相（现有接收机的测试固件无法实现）。

Betaflight 已加入 FPort 驱动，自 Betaflight 3.3 起可用。

FPort 详细规范：[F.Port.protocol.betaFlight.V2.1.2017.11.21.pdf][1]

FrSky 公告：[此处][9]

# 兼容性

| 接收机          | 是否兼容 | 固件下载页 |
| :-------------- | :------- | :--------- |
| FrSky R-XSR     | 是       | [此处][8]  |
| FrSky X4R       | 是       | [此处][10] |
| FrSky X4R-SB    | 是       | [此处][11] |
| FrSky XSR       | 是       | [此处][2]  |
| FrSky XSR-M     | 是       | [此处][12] |
| FrSky R9M Slim  | 是       | [此处][13] |
| FrSky R9M Slim+ | 是       | [此处][14] |

# 使用 FPort

## 要求

- FrSky XSR、X4R(SB)、XSR-m 或 R-XSR 接收机（见上表）；
- 飞控上一个空闲硬件端口（F3 或更高），并且该端口能与接收机运行 SmartPort：它必须支持反相双向通信，或者接收机必须已应用“未反相 SmartPort”改装。

## 安装

1. 下载并安装接收机固件（见上表）；固件安装说明见[此处][3]和[此处][4]。
2. 为飞控安装最新版 Betaflight。
3. 将接收机 SmartPort 端口连接至飞控的反相双向端口。对于已做“未反相 SmartPort”改装的接收机搭配 F3 / F4，或 F7，接收机连接到串口 `TX` 引脚；对于未改装接收机搭配 F4，连接方式取决于双向反相器设计，请查阅飞控手册。（实际上，该连接在两端都使用“非 FPort 固件下连接 SmartPort”时的相同引脚。）
4. 配置飞控：为接收机连接的端口启用 `Serial RX`，将接收机类型设为 `Serial Rx`，协议选为 `FPort`。对于已做“未反相 SmartPort”改装的接收机搭配 F3 / F4，或 F7，在 CLI 中设 `serialrx_halfduplex = on`。若**未**使用“未反相 SmartPort”改装接收机，则设 `serialrx_inverted = on`。全部完成后，`dump` 的相关内容应如下（假设使用 UART3）：

   F3 / F7：

   ```
   serial 2 64 115200 57600 0 115200
   set serialrx_provider = FPORT
   set serialrx_halfduplex = ON
   set serialrx_inverted = ON
   ```

   未改装接收机的 F4（飞控需要双向反相器）：

   ```
   serial 2 64 115200 57600 0 115200
   set serialrx_provider = FPORT
   set serialrx_halfduplex = OFF
   set serialrx_inverted = ON
   ```

   已做“未反相 SmartPort”改装接收机的 F4：

   ```
   serial 2 64 115200 57600 0 115200
   set serialrx_provider = FPORT
   set serialrx_halfduplex = ON
   set serialrx_inverted = OFF
   ```

5. 将接收机与发射机对频。
6. 测试 RC 控制：打开发射机，将飞控连接 Configurator，确认移动发射机摇杆时 Receiver 选项卡的通道条会移动。
7. 测试遥测：在 OpenTX 中必须重新扫描传感器，因为 SmartPort 与 FPort 的传感器 ID 不同。确认遥测页面显示飞控数值。注意，FPort 可能出现 RC 控制正常但遥测失效的情况；这意味着所用串行连接不是双向的，接收机到飞控数据流正常，但飞控到接收机数据流不正常。此时检查端口设置，并在 F4 上确认端口支持反相双向通信。
8. 若要在 Taranis / Horus 上使用 Betaflight Lua 遥测脚本，请从[此处][6]下载并安装最新版（1.0 或更高）。
9. 飞行愉快。

与错误报告请提交至[此处][7]。

[1]: https://github.com/betaflight/betaflight/files/1491056/F.Port.protocol.betaFlight.V2.1.2017.11.21.pdf
[2]: https://www.frsky-rc.com/xsr/
[3]: https://oscarliang.com/flash-frsky-rx-firmware/
[4]: http://thrustworx.com/frsky-x-series-receiver-sensor-s-port-firmware-flashing-9xr-pro-complete-guide/
[5]: https://ci.betaflight.tech/job/Betaflight/
[6]: https://github.com/betaflight/betaflight-tx-lua-scripts/releases
[7]: https://github.com/betaflight/betaflight/issues
[8]: https://www.frsky-rc.com/r-xsr/
[9]: https://www.frsky-rc.com/frsky-betaflight-introduction-of-f-port-protocol/
[10]: https://www.frsky-rc.com/x4r/
[11]: https://www.frsky-rc.com/x4rsb/
[12]: https://www.frsky-rc.com/xsr-m/
[13]: https://www.frsky-rc.com/r9-slim/
[14]: https://www.frsky-rc.com/product/r9-slim-plus/
