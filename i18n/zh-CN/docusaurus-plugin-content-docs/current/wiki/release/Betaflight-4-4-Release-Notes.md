---
sidebar_position: 4
sidebar_label: 4.4 发布说明
---

# 4.4 发布说明

**Cloud Build、HD OSD、GPS Rescue、预设等更多内容……**

## 1. Cloud Build

Cloud Build 主要为飞行员提供便利，也让 512 KB Flash Target（STM32F411 和 STM32F722）在未来多年仍可继续使用。该系统允许你选择所需功能，并为你生成一份**自定义固件**。

遇到 Cloud Build 流程问题，请查看 [Discord 服务器](https://discord.betaflight.com/invite)的 `#cloud-build-issues` 频道。请使用 Configurator 10.9.0 的 Command Line Interface（CLI）标签页中新加入的 `Support` 按钮，帮助我们诊断问题；该按钮会提供有价值的诊断信息。

**注意：**如果 Cloud Build 缺少通常应有的硬件，例如 Flash 芯片或气压计，原因是 Unified Target 中的板卡配置尚未由社区或制造商补充这些信息。

若确有硬件缺失，建议刷写 `core` 版本。它会载入全部硬件驱动，但不包含所有功能；之后可从 CLI 标签页提交 `Support` 详情。启用“Expert Mode”后，也可使用显示的 **custom defines** 输入框。

缺少气压计时，可在 **custom defines** 输入框中尝试以下任一项或全部项：`BARO_MS5611 BARO_SPI_MS5611 BARO_BMP280 BARO_SPI_BMP280 BARO_BMP388 BARO_SPI_BMP388 BARO_LPS BARO_SPI_LPS BARO_QMP6988 BARO_SPI_QMP6988 BARO_DPS310 BARO_SPI_DPS310 BARO_BMP085 BARO_2SMBP_02B BARO_SPI_2SMBP_02B`。

缺少 Flash 芯片时，可在 **custom defines** 输入框中尝试以下任一项或全部项：`FLASH_W25P16 FLASH_W25Q128FV FLASH_W25M02G FLASH_W25N01G FLASH_W25M`。

感谢各位耐心协助确认不同板卡搭载的硬件。硬件组合极其多样，因此我们需要飞行员帮助众包这些信息。

感谢 @blckmn 实现 Cloud Build！

## 2. HD OSD

现已支持 HD OSD，并增加了以下功能。请注意，并非所有 HD 护目镜 / VTX 组合都支持全部功能，但希望后续会逐步支持。

构建选项中只要包含 `OSD`，或包含 `OSD (HD)`，即会加入 HD 支持。

要启用 HD 支持，请在 Ports 标签页中，为 VTX 所连接 UART 选择 `VTX (MSP + Displayport)`；`MSP` 会自动选中。

![image](https://user-images.githubusercontent.com/11480839/212375683-0ac11ca1-9694-451d-a399-db910a72a062.png)

可在 OSD 标签页中与 `PAL`、`NTSC` 并列手动选择 `HD` 预览，但通常不必这样做。HD 护目镜 / VTX 系统首次上电时，飞控会检测到它，并自动应用以下设置、保存并重启。只有在这些设置尚未应用时才会发生。此功能较新，HD 系统可能暂未支持；若 OSD 标签页未自动切换到 HD，请手动输入以下命令：

```
set osd_displayport_device = MSP
set vcd_video_system = HD
```

画布尺寸（可见列数 / 行数）默认是 53x20；相比之下，PAL 为 30x16，NTSC 为 30x13。VTX 可通过 MSP 命令调整画布尺寸，例如 WTFOS 会设为 60x22。该过程自动完成，无需用户操作。若护目镜厂商支持其他画布尺寸，可在护目镜菜单中选择；新尺寸会传递给 Betaflight，后者随之调整可用 OSD 行列数。

不论画布尺寸如何，启动图标、解锁消息、统计信息、CMS 菜单等都会正确居中。

若画布缩小，无论是选择 PAL / NTSC，还是 VTX 发送了不同的画布尺寸，所有 OSD 元素都会移到可用画布中，可使用 Configurator 重新定位。

除常规 OSD 元素外，若护目镜 / VTX 厂商支持，现在还可启用、禁用和重新定位以下 OSD 元素。若没有显式启用任何一项，将在默认位置显示所有受支持的项目。

1. 护目镜电池电压
2. VTX 电压
3. 比特率
4. 延迟
5. 距离
6. 视频链路质量
7. 护目镜 DVR 图标
8. VTX DVR 图标
9. VTX 警告
10. VTX 温度
11. 护目镜风扇转速
<br/>

为更好地利用 HD 系统的彩色 OSD 能力，现在支持四种字体，分别以**白色**、**绿色**、**琥珀色**和**红色**显示对应**正常**、**良好**、**边缘**和**严重**状态的文本及图标。例如，链路质量文字与图标可在严重时显示红色、边缘时显示琥珀色、良好时显示绿色。

要启用此功能，请设置 `displayport_msp_fonts` 数组，为**正常**、**良好**、**边缘**、**严重**状态依次选择字体编号（0 至 4）。

启用全部四种字体：

```
set displayport_msp_fonts = 0,1,2,3
```

仅使用默认的（主要为白色）字体：

```
set displayport_msp_fonts = 0,0,0,0
```

若要让严重警告显示红色，正常、良好与边缘 OSD 元素使用第一种字体，严重 OSD 元素使用第三种字体：

```
set displayport_msp_fonts = 0,0,0,3
```

感谢 @SteveCEvans 带来的这些改进！

## 3. 预设收藏夹

此功能减少了用户在预设标签页中的搜索工作。Configurator 会记住正在使用的预设，并自动以“星标”标记。收藏预设始终排在初始列表和搜索结果之前。配合已连接飞控自动预选当前固件的修复，用户无需搜索常用预设即可直接选择。UI 中的“星标”可点击，用户也可手动添加或移除收藏。

![image](https://user-images.githubusercontent.com/2925027/212130300-f67a5d82-dbc2-4726-9c07-b6aae0aa98ae.png)

收藏预设按其在仓库中的路径加名称保存。因此，若另一仓库中具有相同名称和路径，该预设也会自动成为收藏项。

## 4. GPS 返航增强

**GPS “Rescue”已大幅改进。**四轴飞行器应能以设定速度可靠返航、以一定角度下降、在 Home 点数米范围内着陆，并在触地时自动上锁。高度和返航速度分别使用 PID 控制；默认值对“典型”四轴飞行器效果很好。初次测试时，应使用模式开关，在合理近距和低空进行。要让 GPS Rescue 在 RxLoss failsafe 时可靠返航，设置与测试并不简单，但非常值得投入。

**强烈建议阅读[使用说明](/docs/wiki/guides/current/GPS-Rescue)。**

请记住，任何真实 failsafe 中，四轴飞行器都会在启动 Rescue 前先进入 Failsafe Stage 1，持续 1 秒（用户可配置）。必须把 Stage 1 行为设置为非 `DROP`；否则飞行器会在 Stage 1 上锁坠落，永远不会进入 GPS Rescue。最安全的 Stage 1 设置是：在 AUX 开关上配置 Angle Mode，并让 Stage 1 Failsafe 以固定悬停 / 轻微爬升油门值启用 Angle Mode，同时强制其他摇杆回中。信号丢失超过 300 ms 时，飞行器会进入 Angle Mode 并开始调平，能提前明确提示信号出现中断。或者，可让 Failsafe Stage 1 保持当前全部值；此时飞行器会沿原轨迹继续飞行，直至 Stage 1 超时并启动 Rescue。

**请禁用指南针 / 磁力计**，除非：

- 它已经完整校准；并且
- 已通过日志确认磁力计航向值无噪声，且反映四轴飞行器真实姿态。

**在大多数短距离飞行中，使用 Baro 会显著改善高度控制。**Baro 数据比 GPS 数据更新更频繁且通常波动更小。用户可决定对 Baro 和 GPS 高度数据的信任比例。长距离飞行以及部分特定 Baro 器件或安装方式中，Baro 漂移会更突出，此时应提高对 GPS 数据的信任。

新增三种实用的 GPS Rescue Debug 模式。其中一种显示飞行器跟踪目标高度和目标速度的精度，另两种用于调校 GPS Rescue PID。若启用 Mag，Mag 信息会自动记录。

GPS 硬件数据采集现在默认使用 10 Hz UBlox 协议。NMEA 模式已经改进，在某些情况下也会以 10 Hz 运行。现在可记录精度衰减因子（DOP）数值，供后续改进使用。

对合理性检查进行了大量改进。多数情况下，飞行器会尝试自行着陆而非上锁；必要时只依赖 Baro 信号。

**警告：起飞后务必检查 Home Arrow 是否直接指向 Home 点！**有时若在解锁期间或起飞后立即旋转飞行器，姿态信息可能损坏，Home Arrow 会指向错误方向。最佳做法是平稳解锁，并在起飞后立刻以合理速度沿直线飞离 Home 点；仔细观察 Home Arrow，确认它很快指回 Home 点。若 failsafe 发生时箭头指向错误，GPS Rescue 起初会朝错误方向飞行，可能导致丢机。

感谢 @ctzsnooze、@karatebrot、@haslinghuis。

## 5. 其他 OSD 改进

**可通过模式开关在 OSD 中显示 `READY`**

这是面向竞速的特定改进，适用于所有飞行员视频画面汇集到同一中央屏幕的场景。飞行员可拨动开关表示已准备飞行，OSD 将显示 `READY`；赛事主管通过中央屏幕即可判断是否所有飞行员都已就绪。解锁后，`READY` 文字会消失。

更多信息见 [PR#11886](https://github.com/betaflight/betaflight/pull/11886)，感谢 @jonmahoney15。

**飞行器和飞行员名称现可正确处理**

用户现在可以配置 OSD，仅显示飞行器名称、仅显示飞行员名称，或同时显示两者。

更多信息见 [PR#11391](https://github.com/betaflight/betaflight/pull/11391)，感谢 @krasiyan。

**OSD 显示 PID 配置文件和速率配置文件名称**

感谢 @qvasic。

## 6. 支持 Extended DShot Telemetry

若 ESC 支持，现在可通过 DShot Telemetry 获取每个电机的温度、电流和电压。

更多信息见 [PR11694](https://github.com/betaflight/betaflight/pull/11694)，感谢 @damosvil。

## 7. 飞行改进

**AntiGravity**

AntiGravity 经以下调整，在油门快速变化时稳定性更高：

- 不再对偏航施加 AntiGravity P 增益，避免快速油门变化时额外产生偏航晃动；
- 降低整体 AntiGravity P 增益，减少非预期 P 晃动的概率；
- 可通过 `anti_gravity_p_gain` 独立于 I 增益，设置 AntiGravity 期间的相对 P 增益。默认 100，表示“正常”。对于油门变化时容易出现 P 晃动的机型，较低数值会按比例减小默认 P 增益；反之亦然；
- 进一步优化增益效果的时序。默认使用 6 Hz PT2 滤波器。可通过 `anti_gravity_cutoff` 聚焦最需要时的增益效果：较高数值会使增益略强但持续更短；响应较慢的构型或需要更长增益的场景，较低数值可能更好；
- 对 AntiGravity 引起的 iTerm 增加应用 iTerm windup 限制（感谢 tbolin）；
- 移除未按预期工作的旧“step”模式。

AntiGravity 值现在直接对应 iTerm 增益量，默认值为 80，表示快速收油时 iTerm 增益为 8 倍。**除非已制作日志并确认不存在 P 晃动，否则请勿提高 AntiGravity；请使用 Debug。**

更多信息见 [PR#11679](https://github.com/betaflight/betaflight/pull/11679)，感谢 @ctzsnooze、@tbolin。

**iTermWindup**

iTermWindup 是一种较早的方法：当四轴飞行器无法达到目标速率时，阻止 iTerm 持续增长。4.4 默认启用 iTermWindup，值为 85。每当 motorMix 百分比超过 `iterm_windup` 的 85% 限值时，iTerm 增长会按 `motor_mix` 超出 `iterm_windup` 的程度被抑制；只有 motorMix 差值为 100% 时，iTerm 才完全不再增长。iTerm 抑制适用于包括偏航在内的全部轴。

默认值适合几乎所有四轴飞行器。较重或控制余量极低、存在明显 iTerm windup 问题（大动作时出现慢速振荡）的机型，可能受益于较低的 `iterm_windup` 值。

iTermWindup 是 iTermRelax 的补充，尤其适合低控制余量机型：这类机型在摇杆停止后的一段时间内可能仍无法达到目标速率。iTermRelax 在摇杆快速运动时最有效且工作更平滑；iTermWindup 还可在各种碰撞或故障状态下限制 iTerm 增长。

更多信息见 [PR#11806](https://github.com/betaflight/betaflight/pull/11806)，感谢 @ctzsnooze。

**极端摇杆输入或陀螺仪速率下更平滑的混控油门调节**

过去在一些边缘条件下，Airmode 油门增益的开始并不平滑，且不同混控器类型的表现不同。混控器现已改进。

更多信息见 [PR#11867](https://github.com/betaflight/betaflight/pull/11867) 和 [PR#11857](https://github.com/betaflight/betaflight/pull/11857)，感谢 @QuickFlash。

## 7. ELRS SPI 板卡支持 ELRS 3.x

注意：使用 Betaflight 4.x 刷写的 ELRS SPI 板卡无法与 ELRS 2.x 发射机对频。

## 其他变化

- PID 配置文件为 4 个（原为 6 个），速率配置文件为 4 个（原为 3 个），感谢 @haslinghuis；
- TPA 设置移入 PID 配置文件，感谢 @haslinghuis；
- 改进气压计平滑和校准，修复姿态计算和滤波问题，感谢 @karatebrot；
- 支持 HD OSD，感谢 @SteveCEvans；
- 通过 MSP 支持 VTX 设备，[PR11705](https://github.com/betaflight/betaflight/pull/11705)，感谢 @phobos；
- 解析并记录 GPS 精度衰减因子（DOP），[PR11912](https://github.com/betaflight/betaflight/pull/11912)，感谢 @karatebrot；
- 支持更新的陀螺仪芯片，改进 BMI160/270 的滤波等，感谢 @SteveCEvans 及其他贡献者；
- 动态陷波最低频率降至 20 Hz，适合使用超大螺旋桨的低 RPM 配置；
- 对使用极小螺旋桨的四轴飞行器，动态怠速最低 RPM 从 100（10k RPM）提高到 200（20k RPM）；
- Cloud Build 选项支持 64 个独立 LED，PR12064，感谢 @Limonspb；
- 修复 10 Hz NMEA 和 UBlox 通信，感谢 @Karatebrot、@krzysztofkuczek；
- 支持 Winbond W25q80 Flash，感谢 @David-OConnor；
- 大量 Bug 修复、Target 更新、驱动更新与修复，感谢众多无法逐一列出的贡献者。
