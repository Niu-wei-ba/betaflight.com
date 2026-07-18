---
sidebar_position: 13
---

# 电机选项卡

在此配置电机和 ESC 设置，包括电机方向、混控、高级遥测和飞行功能。

![电机选项卡](/img/betaflight_configurator_motors_tab_zh-cn.png)

## 混控器

混控器决定电机布局，以及 FC 如何利用电机维持稳定飞行。典型四轴飞行器使用 `QUAD X`；不确定时请选择此项。

- **反转电机转向**：常规设置假定前方相机两侧的螺旋桨向内旋转（`props in`）；反转后螺旋桨向外旋转（`props out`）。

:::info

飞手使用 `props out` 可减少杂物被吹入相机，但会将其吹向机架；对小型飞行器也有助于减轻桨流扰动。

:::

- **电机方向**：打开电机方向测试工具，可低速转动电机并方便地反转其方向，使其符合所选混控器。务必拆下螺旋桨并谨慎操作。

## ESC/电机功能

- **电调/电机协议**：DShot 是现代配置的标准协议，可提供最佳飞行性能与功能。

:::info

DShot 速率取决于 PID 环路频率：较慢的 DShot 无法足够快地发送更新，不能充分利用较高的 PID 环路频率。因此建议 8 kHz 配 DShot600、4 kHz 配 DShot300、2 kHz 配 DShot150。Oneshot125 等协议仅适用于原始 BLHELI 等非常旧的 ESC；较新的 BLHeli_S、BLHeli_32、BlueJay 或 AM32 ESC 都应使用 DShot。

:::

- **MOTOR_STOP**：防止已解锁时电机怠速旋转。通常不需要；让电机转动更安全，旁观者可据此识别飞行器已解锁。

| **场景**                          | **解锁后电机行为**                     |
| --------------------------------- | -------------------------------------- |
| **AIRMODE 禁用且启用电机停止** | 电机保持**关闭**，直到抬高油门。       |
| **AIRMODE 禁用且禁用电机停止** | 解锁后电机**以怠速转动**。             |
| **AIRMODE 启用**                  | 解锁后电机**始终转动**，即使油门为零。 |

- **ESC_SENSOR**：优先使用端口选项卡中配置的、通过 UART 连接 ESC 的 ESC 遥测数据。
- **双向 DShot**：RPM 滤波所必需。除了在电机输出线上向 ESC 发送 DShot 命令外，FC 还会在同一根线上监听 ESC 返回的数据。

:::note

默认仅包含 RPM 数据；可通过 `dshot_edt` CLI 命令扩展为通过 DShot 遥测传输 ESC 电压、电流和温度数据，需要较新的 BlueJay/AM32/BLHELI32 ESC 固件。[Extended DShot Telemetry (EDT)](https://github.com/bird-sanctuary/extended-dshot-telemetry) 允许 ESC 通过信号线回传遥测，无需额外 UART。它支持运行 BlueJay 的 8 位 ESC，以及运行 AM32 或 BLHELI32 的 32 位 ESC，从而简化接线与 FC 配置。

:::

- **电机极数**：电机钟罩内部永磁体数量。

:::info

2207、2306 等较大电机通常有 14 个磁体，1103 及更小电机通常有 12 个；14xx/15xx 尺寸的电机通常从 12 个增至 14 个。

:::

- **电机怠速（%）**：设置最小电机输出，确保电机可从怠速平稳加速，不延迟且不失去控制。

:::info

通常提高该值可改善退出俯冲时的平顺性；降低该值可避免倒飞机动时产生不需要的向下推力。

:::

## 3D ESC/电机功能

- **3D**：使电机双向运行，允许倒飞。零油门位于摇杆 50% 位置；最低摇杆位置产生最大负油门，最高摇杆位置产生最大正油门。

:::info

3D 模式下 Air Mode 无法正常工作。应在[配置选项卡](/docs/wiki/app/configuration-tab#other-features)禁用永久 Air Mode，并在[模式选项卡](/docs/wiki/app/auxiliary-tab)中将 Air Mode 设到开关上，使激活 3D 模式时 Air Mode 被禁用。只需将 `Air Mode` 的模式范围设为与 `Disable 3D Mode` 相同的开关通道和值。

:::

:::danger

3D 模式未实现 GPS Rescue 和失控保护降落模式，二者无法正常工作。请极其谨慎。

:::

- **3D 通道死区低值**：3D 模式下无推力零油门区的起点。
- **3D 通道死区高值**：3D 模式下无推力零油门区的终点。
- **3D 通道死区中点**：3D 模式下无推力零油门区的中点。

## 电机测试模式

在工作台测试电机时务必谨慎；如有疑问，请完整阅读本节。使用 LiPo 电池时始终注意安全。可考虑使用 Smoke Stopper 等限制电池电流的保护设备。

:::danger

连接电池和测试电机前必须拆下螺旋桨。反复强调此事是有充分理由的，请务必小心。

:::

此处显示当前电机信号。拆桨后连接电池，待 ESC 联机，即可用滑块转动电机。

- **R**：来自 ESC 的 RPM 遥测数据。
- **E**：DShot 遥测错误率。ESC 未供电时会显示错误；已供电的 ESC 应为 0% 或接近 0%。1% 或更高通常表示硬件问题。DShot 遥测需要 BlueJay、AM32 或 BLHELI32 等现代 ESC 固件。
- **T**：来自 ESC 的温度遥测数据。

有关 DShot 与 RPM 滤波的更多信息，请参阅 [DShot RPM 滤波指南](/docs/wiki/guides/current/DSHOT-RPM-Filtering)。
