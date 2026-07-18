# ESC 遥测

将 ESC 数据传送至飞控有两种方式：

- DShot 遥测：通过控制电机的同一根 DShot 信号线，从 ESC 回传数据；
- 串行 ESC 遥测：一个或多个 ESC 通过串口连接飞控。

:::note
本文说明如何将 RPM 及相关数据从 ESC 传送至飞控，不讨论如何再从飞控传回遥控接收机。
:::

## DShot 遥测

### DShot RPM 遥测

JoeLucid 于 2019 年 3 月开发双向 DShot 代码，使 RPM 数据能够通过单根 DShot 通信线回传至飞控。DShot RPM 遥测相较串行 ESC 遥测更新速度更快，且无需额外接线，目前几乎所有 DShot ESC 固件均支持。

DShot RPM 遥测带来以下功能：

- [RPM 滤波](/docs/wiki/guides/current/DSHOT-RPM-Filtering)：动态陷波滤波器跟踪每个电机的中心频率；四轴飞行器可使用 12 个动态 RPM 滤波器，显著改善基于 RPM 的噪声抑制；
- [动态怠速](/docs/wiki/guides/current/Dynamic-Idle)：在 PID 控制下快速改变电机驱动力，使转速不会低于定义的最低 RPM。相较简单的最小怠速油门，可降低不同步风险，并让 PID 使用完整的电机驱动范围；
- [RPM 限制](/docs/wiki/release/Betaflight-4-5-Release-Notes#162-rpm-limiter-build-option)：可为统一规格竞速限制最大平均 RPM；
- RPM 日志记录，用于测试和调试。Debug 值可显示在 OSD 中，因此可显示“实时”RPM。

### 扩展 DShot 遥测

扩展 DShot 遥测（EDT）会将 ESC 温度、电压、电流等附加参数发送至 FC。并非所有 ESC 固件均支持，Daniel Mosquera 的 [Bluejay](https://github.com/bird-sanctuary/bluejay) 是目前最新的实现。

虽然尚无 EDT 的 Wiki 页面，但可参考 [Betaflight GitHub EDT PR](https://github.com/betaflight/betaflight/pulls?q=is%3Apr+EDT) 和 [bird-sanctuary 的 GitHub 页面](https://github.com/bird-sanctuary/extended-dshot-telemetry)。

## 串行 ESC 遥测

以下信息较旧，可能不再准确。

### 要求

- 支持 Betaflight 3.1.0 RC1 或更高版本的飞控；
- Betaflight App 1.8.5 或更高版本；
- 已启用串行遥测的 ESC（通常需要 AM32 或 BLHeli32）；
- 飞控上一个空闲的硬件 UART；
- （可选）从飞控发送至遥控接收机的遥测。

### 操作步骤

**将 ESC 安装到四轴飞行器，并将 ESC 的 Tx 引脚和地线连接至飞控空闲硬件 UART 的 RX 引脚。**若使用独立 ESC，需要将 UART RX 引脚的一根线分成四根线，每个 ESC 一根。

**打开 Betaflight 地面站（1.8.5 或更高版本），进入“端口”选项卡。**

找到连接 ESC 遥测的 UART。在“传感器输入”列左侧框中选择 `ESC`，右侧框保持 `AUTO`，然后点击“保存并重启”。

**仍在 Betaflight 地面站中，切换到“配置”选项卡。**

_**确保 ESC 通信使用 DShot 协议。**_

在“其他功能”下，确认已启用 `ESC_SENSOR`。

在“Battery Voltage”部分启用 `VBAT`，并在下方下拉菜单选择 `ESC Sensor`。按需配置单节电压，默认值通常可用。

在“Current Sensor”部分启用 `CURRENT_METER`，并在下方下拉菜单选择 `ESC Sensor`。按需配置标度和偏移，默认值通常可用。

_测试时，完成全部设置后连接飞控和电池，在上电数秒内于 Configurator 的 Configuration 选项卡通过遥控器解锁。工作台测试必须拆桨。_

**确认遥控发射机正在接收遥测。**

若使用 Taranis，点击“Discover Sensors”时不要忘记解锁四轴飞行器，否则不会发现 ESC 遥测。Taranis 用户可将 `FUEL` 传感器从 `%` 改为 `mAh`，以获得准确读数。
