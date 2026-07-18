# 通过 MAVLink 遥测将 Betaflight 连接到 Mission Planner 地面控制站

Betaflight 可通过 ExpressLRS-MAVLink 模式连接地面控制站：
https://www.expresslrs.org/software/mavlink/

## 刷写 Betaflight 固件

将 MAVLink 设为 Serial RX 和遥测协议后刷写固件。
![图示](/img/mavlink/mavlink_flash.jpg)

若未来还需使用 CRSF 协议，请将 `SERIALRX_CRSF` 和 `TELEMETRY_CRSF` 作为 Custom Defines 设置。

## Betaflight 设置

将 MAVLink 设为串行接收机提供程序。在 ELRS 接收机端口启用 Serial RX 模式，并将 MAVLink 设为遥测输出。使用默认遥测波特率。
![图示](/img/mavlink/mavlink_receiver.jpg)
![图示](/img/mavlink/mavlink_port.jpg)

如果同时刷写了 MAVLink 和 CRSF 协议，可在需要时切换到 CRSF Serial RX 和遥测模式。

请注意：不要同时保存 CRSF Serial RX 和 MAVLink 遥测输出；这两个设置不兼容，可能重置端口配置。

## ExpressLRS 设置

请按照 ExpressLRS 手册设置 ExpressLRS 和地面控制站：
https://www.expresslrs.org/software/mavlink/#flashing-elrs-for-mavlink

## 扩展 Betaflight 设置

### 可通过以下 CLI 参数调节 MAVLink 数据包发送速率

- `mavlink_pos_rate`：GPS 数据帧速率（默认 `2Hz`）
- `mavlink_rc_chan_rate`：RC 数据帧速率（默认 `1Hz`）
- `mavlink_ext_status_rate`：状态数据帧速率（默认 `2Hz`）
- `mavlink_extra1_rate`：姿态数据帧速率（默认 `2Hz`）
- `mavlink_extra2_rate`：Heartbeat + VFR HUD 数据帧速率（默认 `2Hz`）
- `mavlink_extra3_rate`：扩展电池状态数据帧速率（默认 `1Hz`）

## 验证 MAVLink 遥测

在 Betaflight App 中将 Blackbox Debug 模式设为 _MAVLINK_TELEMETRY_，然后使用 Blackbox Explorer。

![图示](/img/mavlink/mavlink_bbe_debug.jpg)

Debug Blackbox 曲线会显示 MAVLink 数据包的发送计数器，据此可获得实际遥测数据速率。
![图示](/img/mavlink/mavlink_telem_rates.jpg)

检查 TX 缓冲区是否仍有空闲空间，且不会降至零。Betaflight 遥测使用 `mavlink_min_txbuff` CLI 参数避免 TX 缓冲区溢出；仅当空闲 TX 缓冲区空间大于该参数值时才发送遥测数据。`mavlink_min_txbuff` 默认值为 `35%`。
![图示](/img/mavlink/mavlink_telem_work.jpg)

同时检查实际 RC 数据速率；此示例中为 `100Hz`。
![图示](/img/mavlink/mavlink_rc_data.jpg)
