---
sidebar_position: 1
---

# 设置指南

本指南按步骤说明如何从零开始配置运行 Betaflight 的飞控（FC）。文中假定你已经具备基本的 RC 知识；如果你刚接触遥控模型，请先了解基本操控、焊接和遥控器使用等基础内容。[RCGroups](http://www.rcgroups.com/forums/index.php) 和 [FliteTest](https://www.youtube.com/user/flitetest) 是不错的入门资源。

:::caution 免责声明
本文是实操指南，并非权威的安全检查清单。在组装和飞行 RC 飞行器时，请始终保持常识、独立判断和谨慎操作。
:::

## 硬件

:::info 保护加速度计
飞控上的加速度计对冲击十分敏感。FC 尚未安装到机架时，裸板质量很小；跌落或受到剧烈碰撞会使加速度计承受很大的力，可能造成损坏。在飞控牢固安装到飞行器之前，请小心拿放。
:::

将 FC 连接到电脑前，先规划要使用哪些功能。这会决定需要焊接哪些焊盘，以及后续需要配置哪些选项：

- 阅读 FC 随附的说明书。可跳过厂商软件的设置部分，本指南会涵盖相关内容。
- 确定接收机的连接方式。可用方案请参阅[接收机文档](/docs/wiki/guides/current/Rx)。
- 阅读[混控器](/docs/wiki/guides/current/Mixer)，确定 ESC 和舵机所需的输出引脚数量。
- 如需监测电池电压，请参阅[电池监测](/docs/wiki/guides/current/Battery)。
- 如需通过蜂鸣器获得声音提示，请参阅[蜂鸣器文档](/docs/wiki/guides/current/Buzzer)。
- 如需将接收机的 RSSI 转发至 FC，请参阅 [RSSI 文档](/docs/wiki/guides/current/Rssi)。
- 如需使用 GPS 辅助飞行功能，例如 GPS 救机，请参阅 [GPS 文档](/docs/wiki/guides/current/Gps)。
- 如计划使用 Blackbox 记录器、OSD 或遥测，请参阅[串口文档](/docs/wiki/guides/current/Serial)。

明确所需功能和引脚后，只焊接必要的连接，以保持装机整洁。焊接 FC 本体前，先在废板或废料上练习。

## 软件设置

在电脑上安装 [Betaflight Configurator 地面站](https://github.com/betaflight/betaflight-configurator/releases/latest)。这是用于连接、配置和更新飞控的应用程序。

## 连接飞控

安装并打开地面站后，会看到欢迎界面：
![Betaflight 地面站](/img/betaflight_configurator_welcome.png)

通过 USB 将飞控连接到电脑。连接成功后，右上角的下拉菜单会出现新的 COM 端口：
![Betaflight 地面站](/img/betaflight_configurator_com_ports.png)

选择该 COM 端口，然后点击 **Connect**。

### 没有出现端口或无法连接？

:::info

如果没有新的 COM 端口出现，或地面站无法连接，请依次检查：

- 确认 USB 线连接的是飞控，而不是其他设备。不要将 Betaflight App 连接到 HD 图传系统或遥控器；它只能用于连接飞控。
- 确认 USB 线支持数据传输。有些 USB 线只能充电。
- 可能需要安装飞控驱动。地面站内提供了 ImpulseRC Driver Fixer 的下载链接，也可从 [ImpulseRC Driver Fixer 仓库](https://github.com/ImpulseRC/ImpulseRC_Driver_Fixer)下载。
- 使用 Linux 时，可能需要将当前用户加入 `dialout` 组，并修改 udev 规则。
- 问题仍未解决时，尝试关闭或卸载其他可能占用 COM 端口的软件，3D 打印软件是常见原因。

:::

:::tip

如需安装或重新安装固件，请参阅[固件安装](/docs/wiki/getting-started/firmware-installation)指南。否则，应先连接并检查现有配置，尤其是整机出厂的穿越机，厂商通常已经完成正确配置。

:::

## 首次连接与备份

连接成功后会进入[设置页](/docs/wiki/app/setup-tab)。移动飞控，确认地面站中的 3D 模型会同步运动，这说明飞控正在正常工作。你可以在此使用界面按钮校准陀螺仪和加速度计。磁力计校准是可选项，仅在 FC 配备磁力计时才需要。

### 备份配置

进行任何修改前，请先备份当前配置。在 [CLI 页面](/docs/wiki/app/cli-tab)执行 `diff all` 或 `dump` 命令，然后复制或保存输出内容。这样在出现问题时可以恢复原始设置。

## 接收机设置

先确认接收机连接到了哪个 UART 串口。接到 `RX1`/`TX1` 焊盘的接收机使用 UART1，接到 `RX2`/`TX2` 的使用 UART2，依此类推。在[端口页](/docs/wiki/app/ports-tab)中，为对应的 UART 启用 `Serial RX`。

:::caution

不要把 MSP 开关当作当前 UART 的通用开关。在同一 UART 上同时启用 MSP 和 `Serial RX` 会产生冲突；为防止意外行为，地面站将拒绝保存该配置。

:::

:::info

如果飞控内置 SPI 接收机，则无需配置 UART。请直接进入下方的[接收机页](/docs/wiki/app/receiver-tab)设置。

:::

启用 `Serial RX` 后，打开[接收机页](/docs/wiki/app/receiver-tab)，按接收机类型设置：

### 基于 UART 的接收机

将 `Receiver Mode` 设为 `Serial (via UART)`，并选择与你的协议对应的 `Serial Receiver Provider`：

- **ELRS / Crossfire / Tracer**：CRSF
- **FrSky**：SBUS 或 FPort
- **Spektrum**：Spektrum1024/2048 或 Spektrum SRXL2
- **FlySky**：IBUS

### 基于 SPI 的接收机

将 `Receiver Mode` 设为 `SPI Rx (e.g. built-in Rx)`，然后选择 `SPI Bus Receiver Provider`：

- **ELRS**：EXPRESSLRS
- **FrSky**：FrSky_D (D8)、FrSky_X(\_LBT) (ACCST D16)、FrSky_X_V2(\_LBT) (ACCST V2 D16)
- **Spektrum**：SPEKTRUM
- **FlySky**：A7105_FLYSKY(\_2A)

完成配置后，移动摇杆，确认通道数值会更新且 3D 模型会响应。若通道顺序不正确，请调整[通道映射](/docs/wiki/app/receiver-tab#频道地图)。

## VTX 设置

大多数系统无需在 Betaflight 中配置即可获得基本图像。若要控制图传（VTX）或使用 HD OSD，则需要进行额外设置。

### 模拟图传

模拟图传是最常见的视频系统，通常无需配置即可工作。如需通过 Betaflight 控制频道或发射功率，需要设置 SmartAudio 或 Tramp。在[端口页](/docs/wiki/app/ports-tab)中，将连接 VTX 的 UART 外设设为 `SmartAudio` 或 `Tramp`，然后在 [VTX 页面](/docs/wiki/app/vtx-tab)配置 VTX。

特定 VTX 可能需要 VTX 表，支持以下两种格式：

- **CLI 代码**：直接粘贴到 CLI 中：

```text
# vtxtable
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A CUSTOM 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B CUSTOM 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E CUSTOM 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F CUSTOM 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R CUSTOM 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 5
vtxtable powervalues 25 100 200 400 600
vtxtable powerlabels 25 200 500 1.5 2.5
```

- **JSON**：加载或粘贴到地面站的 VTX 表区域：

<details>
	<summary>点击展开</summary>

```json
{
  "description": "Betaflight VTX Config file for Rush Tank Ultimate",
  "version": "1.0",
  "vtx_table": {
    "bands_list": [
      {
        "name": "BAND_A  ",
        "letter": "A",
        "is_factory_band": true,
        "frequencies": [5865, 5845, 5825, 5805, 5785, 5765, 5745, 5725]
      }
    ],
    "powerlevels_list": [
      {
        "value": 0,
        "label": "25 "
      },
      {
        "value": 1,
        "label": "200"
      }
    ]
  }
}
```

</details>

如果找不到预设或 VTX 表，请查阅 VTX 的说明书。

:::tip

如果 VTX 无法设置到某些频道或功率档位，可能需要先解锁。通常是在上电时按住 VTX 上的按钮；请搜索对应型号的操作教程。

:::

### 数字图传

数字图传需要配置才能启用 OSD 和 VTX 控制。在[端口页](/docs/wiki/app/ports-tab)中，为连接 VTX 的 UART 启用 `VTX (MSP + Displayport)`，MSP 会自动启用。低于 4.4 的版本仅启用 MSP，并按相应指南操作。

[预设页](/docs/wiki/app/presets-tab)提供了针对不同系统的预设以简化设置：

- HDZero，适用于 4.2/4.3 和 4.4
- Avatar，适用于 4.2/4.3
- FPV.WTF MSP OSD，适用于 4.2/4.3
- FPV.WTF + O3 + Avatar，适用于 4.4

关于 4.4 及更新版本的详细信息，请参阅[发行说明](/docs/wiki/release/Betaflight-4-4-Release-Notes#2-高清屏显)。

## 电机设置

在[电机页](/docs/wiki/app/motors-tab)中，将 `ESC/Motor Output` 下拉菜单设为正确的协议。对于大多数现代电调（ESC），通常是 `DShot300` 或 `DShot600`。

:::info 选择正确的 DShot 速率

- **DShot300** 更适合较慢的处理器，例如 F411 飞控，以及以 3.2 kHz 运行的陀螺仪，例如 BMI270。
- **DShot600** 更适合较快的处理器，例如 F7 系列。以 8 kHz 运行的陀螺仪，例如 MPU6000，可充分利用该速率。

使用高于陀螺仪可支持速率的 DShot 不会造成问题，但也没有收益。

:::

**测试电机前必须拆下螺旋桨。** 接上电池，勾选确认框，然后缓慢抬高 `Master` 滑块。数值很低时电机可能会轻微抖动，但稍微提高后应平稳旋转。按照 `Motor direction is reversed` 开关的设定，确认所有电机转向正确（`Props In` 为桨叶内转，`Props Out` 为桨叶外转）：
![电机转向](/img/betaflight_props_in_out.png)

若电机转向错误，请在 `Motor direction` 子菜单中反转转向。若电机编号与图示不符，请重新映射。

## 模式设置

模式可将 AUX 通道开关作为输入，以在飞行中改变穿越机的行为。在[模式页](/docs/wiki/app/auxiliary-tab)中可查看全部可用模式。

唯一必须设置的模式是 **ARM**：
![ARM 模式](/img/betaflight_configurator_modes_arm.png)

`ARM` 会启用 PID 控制回路，使电机可以转动。设置方法如下：

1. 点击 **Add Range**，创建一个绑定 AUX 通道的范围滑块。通道数值处于该范围内时，此模式生效。
2. 翻动要使用的开关，`AUTO` 下拉菜单会自动选择相应的 AUX 通道；也可手动选择通道。
3. 调整范围滑块，使开关处于解锁位置时，通道指示值位于该范围内。

建议额外设置以下模式：

- `BEEPER`：启用蜂鸣器和/或电机鸣叫，便于定位坠机后的穿越机。
- `ANGLE`：自稳模式，适合新手或用于姿态恢复。
  :::tip

  默认飞行模式是 **Acro**，也称速率模式：摇杆位置控制穿越机的旋转速率。这是大多数飞行使用的标准模式，启用其他飞行模式后会覆盖它。

  Angle 模式会让飞行器保持摇杆指令的倾角，而不是持续旋转，适合新手或进行有针对性的练习。

  :::

- `FLIP OVER AFTER CRASH`：坠机后反转电机，使穿越机翻回正面。
  :::danger

  坠机后若电机被卡住，此功能会对电机和 ESC 施加极大负荷。仅在确认安全时使用。

  :::

## OSD 设置

OSD 会将飞行信息叠加到视频画面上。在 [OSD 页面](/docs/wiki/app/osd-tab)中，左侧是元素列表，右侧有三列复选框，每列对应一个 OSD 配置文件。OSD 配置文件让你可以在飞行中切换不同布局。

勾选元素对应的复选框，即可将其添加到相应配置文件。启用的元素会显示在预览中，可拖动改变位置。部分元素还提供单位、计时器来源或告警阈值等额外设置。

至少启用以下元素：

- `Warnings`：低电压、低 RSSI 和其他关键状态的告警。
- `Battery average cell voltage`：无论电池组串数如何，均显示单节平均电压。
- `Link quality`、`RSNR Value`、`RSSI Value` 或 `RSSI dBm Value` 之一：选择你的遥控系统支持的指标，具体请查看厂商文档。

## 最终测试与安全

飞行前，确认飞行器已正确配置。不要跳过以下步骤，配置错误的穿越机可能失控飞离，或造成人身和财产损失。

1. 首先阅读[安全文档](/docs/wiki/guides/current/Safety)。
2. 了解如何对 FC 解锁和上锁，并阅读[操控文档](/docs/wiki/guides/current/Controls)。
3. 正确设置[失控保护](/docs/wiki/guides/current/Failsafe)，并认真确认其工作方式。
4. **在工作台上且不安装螺旋桨时**，确认失控保护会按设定触发。
5. 测试遥控器的副翼和升降舵输入：飞行器是否向正确方向响应？
6. **不安装螺旋桨、油门约为 30% 时**，倾斜飞行器：电机是否会短暂补偿倾角，模拟对阵风的修正？
7. **在 ANGLE 模式下，不安装螺旋桨、油门约为 30% 时**，倾斜飞行器，使一个电机朝向地面：该电机是否会提高并保持较高转速，直到飞行器重新调平？

以上任一测试失败时，请勿尝试飞行。返回相应配置步骤，检查通道是否反向，并确认飞控安装方向设置正确。

## 准备飞行

完成配置和测试后，再次确认所有设置正确，然后进行一次短暂悬停测试，验证整机是否按预期工作。

如遇问题，请回顾本指南中的常见配置错误。还可查看[故障排除页面](/docs/wiki/getting-started/troubleshooting)获取更多解决方案。问题仍未解决时，可前往 [Betaflight Discord](https://discord.betaflight.com/invite) 提问。

## 高级主题

熟悉基础设置后，可继续了解以下功能和指南：

- [配置文件](/docs/wiki/guides/current/Profiles)
- [PID 调参](/docs/wiki/guides/current/PID-Tuning-Guide)
- [飞行中调整](/docs/wiki/guides/current/Inflight-Adjustments)
- [Blackbox 日志记录](/docs/wiki/guides/current/Black-Box-logging-and-usage)
- [GPS 与 GPS 救机](/docs/wiki/guides/current/Gps)
- [Spektrum 对频](/docs/wiki/guides/current/Spektrum-bind)
- [遥测](/docs/wiki/guides/current/Telemetry)
- [LED 灯带](/docs/wiki/guides/current/LED-Strip-Functionality)
