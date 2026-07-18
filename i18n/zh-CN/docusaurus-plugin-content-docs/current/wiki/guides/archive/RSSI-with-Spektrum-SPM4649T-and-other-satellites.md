# Spektrum 接收机的 RSSI

从 Betaflight 3.3.0 起，可通过多种方式在 OSD 中显示接收信号强度指示（RSSI）。

- 由 SPM4649T 接收机上报的真实 RSSI。前提条件：
  - 接收机已连接并配置遥测，参见 [Spektrum SPM4649T SRXL 遥测设置](Spektrum-SPM4649T-SRXL-Telemetry-setup)。
  - 接收机固件至少升级至 1.1.9。
- 基于任意 Spektrum 卫星接收机上报的链路衰落（fade）的估算 RSSI。无需额外前提条件。

设置方法：

- 在 Betaflight Configurator 的 **Receiver** 选项卡中，为 RSSI 选择一个空闲 RC 通道，例如 `AUX8`。
- 在 Configurator 的 **OSD** 选项卡中启用 RSSI。

完成。

Betaflight 的 RSSI 百分比与 Spektrum 的数值并不相同，且当时不能在 Betaflight 中由用户调整。发射机（Tx）通常可选择 `%`、`dBm` 或 `%R` 三种单位，但它们的标度均不等同于 Betaflight：Spektrum 的 `%` 和 `dBm` 在近距离下降过快，`%R` 则在接近极限距离时下降过快。Betaflight 采用介于两者之间的折中标度，即下图绿线所示。

![RSSI 与距离的关系图](/img/ideal_rssi_to_range.jpg)

Betaflight 的估算 RSSI 与距离的对应关系同样不够理想，更接近上图红色 `%R` 曲线。这是因为它基于 fade 和丢帧，而 fade 往往在接近链路距离极限时才出现。该估算标度当时不可配置：每秒丢失 40 帧视为 0% RSSI，每秒丢失 0 帧视为 100% RSSI。
