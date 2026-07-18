# LUXF4OSD

这是一款集成 OSD 与 30 A BLHeli_32 ESC 的 F4 一体式飞控（AIO FC）。

更多信息请参阅：
http://www.multirotorguide.com/news/lumenier-alpha-aio-flight-controller-f4-fc-with-osd-and-30a-blheli_32-esc/

## iBus 与 SmartAudio

该 FC 仅引出了一个 UART，即 UART6，因此同时使用需要 UART RX 的 iBus 和 SmartAudio 可能比较困难。可按以下方式配置：

1. 将 iBus 焊接到标有 `RX6` 的焊盘，将 SmartAudio 焊接到标有 `TX6` 的焊盘。
2. 按常规方式在 Betaflight 中为 Port 6 配置 iBus。
3. 在 CLI 中执行以下命令：

   `resource PWM 3 NONE`

   `resource SERIAL_TX 6 NONE`

   `resource SERIAL_TX 11 C06`

   `feature SOFTSERIAL`

   `save`

4. 此时应可在 Ports 页面看到另一个 SoftSerial，可用于配置 SmartAudio。
