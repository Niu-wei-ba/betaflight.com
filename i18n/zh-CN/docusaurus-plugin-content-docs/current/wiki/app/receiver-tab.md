---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 接收机选项卡

接收机接收发射机（通常是遥控器）的数据。本页用于配置飞控读取接收机数据的方式，分为接收机输出预览和接收机配置两部分。

![接收机选项卡](/img/betaflight_configurator_receiver_tab_zh-cn.png)

## 输出预览

显示当前接收机各通道的数值和图形状态，以及它们如何影响飞行器运动。

## 接收机配置

用于配置与接收机相关的所有设置。

### 接收机

选择接收机使用的通信协议：

- **PPM/CPPM**：旧版协议，现代配置中较少使用。
- **基于串行**：多数现代接收机通过串行协议通信，例如 CRSF 或 SBUS。
- **PWM**：旧版协议，现代配置中较少使用。
- **MSP**：高级选项，使用 MSP 协议与接收机通信。
- **SPI**：用于多数集成式接收机，例如 Tinywhoop AIO 板上的 ExpressLRS。

:::caution

选择错误协议会造成无信号或信号解析错误。必须选择与接收机匹配的协议。

:::

### 回传

打开或关闭遥测输出。通过 ELRS 接收机控制 VTX 时也需要启用。

### RSSI

主要面向旧设备，用于配置独立的 0–3.3 V 模拟 RSSI 输入。多数现代接收机通过与控制数据相同的串行连接传输 RSSI 及其他遥测数据。

现代接收机不要启用此选项。

### 通道映射

不同接收机输出四个主控制通道的顺序可能不同：

- **Aileron**：横滚（左右）
- **Elevator**：俯仰（前后）
- **Throttle**：油门（上下）
- **Rudder**：偏航（左右）

:::caution

若遥控器输入与预览不符，必须修改通道映射。常见预设：

- **FrSky/Futaba/Hitec**：通道顺序与 Betaflight 默认 `AETR1234` 相同。
- **Spektrum/Graupner/JR**：通道顺序不同，通常为 `TAER1234`。

:::

### RSSI 通道

部分旧接收机仅通过一个通道输出 RSSI。使用此类接收机时可设置读取 RSSI 的通道，通常为 AUX 4 或 AUX 12。使用 CRSF、GHST 等现代协议时应保持禁用。

现代设备的一个特殊用途是在 DJI FPV 护目镜上显示 LQ，因为其没有原生 LQ 字段。此时可将该项设为 LQ 所在通道，例如 ELRS 的 AUX11。更好的方案是启用 `osd_craftname_msgs` CLI 选项，或在 DJI FPV 系统安装 WTFOS 以获得完整可定制 OSD。

### 摇杆设置

设置四个主控制通道的最小值、中心值和最大值，用于限定摇杆范围、校准和安全检查。

### 死区设置

死区是被忽略的摇杆移动范围。若遥控器或接收机存在轻微抖动，可使用此设置消除影响；也可分别设置偏航和 3D 模式油门的死区。

### RC 平滑

打开或关闭 RC 平滑滤波器。

更多 RSSI 和接收机配置说明见 [RSSI 指南](/docs/wiki/guides/current/Rssi)与 [Rx 指南](/docs/wiki/guides/current/Rx)。
