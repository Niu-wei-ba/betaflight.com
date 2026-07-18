---
sidebar_position: 3
---

# 故障排查

软件问题和配置错误都可能导致飞控异常。本页汇总常见症状及排查方向。

## 连接问题

### 未显示 COM 端口

- 确认 USB 线连接至飞控本身。机架上的其他设备也可能带 USB 口，例如 DJI Air Unit 是图传设备，并非飞控。不要将遥控器连接到 Configurator；遥控器应使用 OpenTX Companion、EdgeTX Buddy 等对应工具配置。
- 确认 USB 线支持数据传输。部分线材只能充电。
- 飞控可能需要安装驱动。可从 Configurator 中打开 ImpulseRC Driver Fixer 的下载链接，或从 [ImpulseRC Driver Fixer](https://github.com/ImpulseRC/ImpulseRC_Driver_Fixer) 获取。
- 若仍无端口，请关闭或卸载可能占用串口的软件。3D 打印软件是常见原因。

### 启用 HID 后未显示 COM 端口

启用 Configurator 的 HID 摇杆模拟后，HID 会接管 USB 连接。若需要再次以常规方式连接飞控，请在 Configurator 选项中启用 `Show all serial devices`。

![显示所有串口设备](/img/betaflight_configurator_show_all_serial_devices.png)

### 可连接飞控但无法刷写

这通常同样由缺少驱动导致。使用 [ImpulseRC Driver Fixer](https://github.com/ImpulseRC/ImpulseRC_Driver_Fixer) 安装驱动，或手动安装所需驱动。Windows 10 及以后版本通常不再需要 STM32 VCP 驱动。

## 设置

### 未检测到传感器

若 Configurator 中所有传感器指示灯均为灰色，说明飞控没有检测到传感器。请检查：

- 传感器是否已正确配置并启用。
- 外接传感器或外设接线是否正确。UART 接线必须为 TX 接 RX、RX 接 TX；TX 对 TX、RX 对 RX 无法通信。
- 是否刷写了错误固件。刷写时选择正确的飞控 target，并在提示时应用自定义默认值。
- 使用 Betaflight 4.4 的 Cloud Build 时，构建固件是否勾选了所需功能。

### 陀螺仪响应与实际运动不一致

通常是飞控安装方向与默认方向不同。请在 Betaflight 地面站中调整“飞控板朝向”。

### 设置恢复为默认值

持续保存失败通常代表设置互相冲突，例如同一端口同时启用 `MSP` 与 `Serial Rx`。确认要保存的功能不存在端口或资源冲突。

### CPU 占用过高

CPU 占用过高会造成控制循环时间不稳定，并引发不同程度的问题，F411/F405 板卡尤为常见。可尝试：

- 禁用不需要的功能。Cloud Build 可选择编入固件的功能；4.4 之前的版本可能需要手动关闭功能。
- 将 DShot600 降至 DShot300，通常已足够。
- 关闭双向 DShot。BiDir DShot 的滤波更直接，但 CPU 开销更大。
- 减少 OSD 元素。过多的活动元素也会增加 CPU 负担。

### 双向 DShot 不工作

仅在 Betaflight 中启用双向 DShot 通常不够，还需调整 ESC 设置：

- BLHeli_S 原生不支持 BiDir DShot，需要刷写 [Bluejay](https://github.com/mathiasvr/bluejay) 等自定义固件。
- 较新固件的 BLHeli_32 支持 BiDir DShot；请将 ESC 升级至最新版本。

## 接收机

### 未检测到接收机输入

- 确认接收机已供电，且已与遥控器对频。
- 确认接线正确：TX 接 RX、RX 接 TX。
- 在[端口选项卡](/docs/wiki/app/ports-tab)中，为接收机所接端口启用 `Serial Rx`。
- 在[接收机选项卡](/docs/wiki/app/receiver-tab)中，将 `Serial Receiver Provider` 设为接收机所用协议。
- 若同时使用外置接收机和 DJI Air Unit，请从 Air Unit 插头上拔除 SBUS 线。

### 未检测到开关

若只有四个主通道有输入而 AUX 通道没有，通常是遥控器没有输出额外通道。使用 OpenTX 或 EdgeTX 时，可在遥控器菜单的 `Mixes` 页面将开关分配到对应通道。

### 通道顺序错误

若遥控器输入与预览不符，请修改通道映射。常见预设如下：

- FrSky/Futaba/Hitec：与 Betaflight 默认 `AETR1234` 相同。
- Spektrum/Graupner/JR：通常使用 `TAER1234`。

若预设无效，可手动修改映射字符串。默认 `AETR` 表示第一个字符为副翼（Aileron）、第二个为升降（Elevator），依此类推；按遥控器输出顺序重新排列字母即可。

## 图传

### 没有 OSD

- 模拟图传：

  - 视频信号必须经过飞控板载 OSD 芯片；相机若直接连接 VTX，将不会显示 OSD。
  - 确认在[配置选项卡](/docs/wiki/app/configuration-tab)启用了 `OSD`。
  - Configurator 预览不一定与护目镜显示完全一致，边缘元素可能被裁切。先放在中央，再逐步向边缘移动确认可见范围。
  - 少数飞控没有 OSD 芯片，无法提供模拟 OSD。

- 数字图传：

  - 数字 OSD 的配置会随版本变化，外部教程应与当前版本对应。
  - 4.3 及以前版本设置较复杂，可能需要 CLI；4.4 及以后只需在[端口选项卡](/docs/wiki/app/ports-tab)启用 `VTX (MSP + Displayport)`。
  - 使用适合所用图传系统的预设。
  - 使用 DJI 与 WTFOS 时，确认 WTFOS 为最新版本。

### 图传距离很短或无图传

- 确认 VTX 天线已完全接好。未接或半接天线不仅距离极短，也可能损坏 VTX。
- 确认 VTX 供电电压足够且符合规格。有些 VTX 只能使用 5 V，另一些可接受宽电压输入。
- 确认未开启 Pit Mode。该模式以极低功率发射，甚至不发射。
- 确认 VTX 没有设为低功率。可在[视频发射器选项卡](/docs/wiki/app/vtx-tab)调整。

### 无法更换字体

- 部分飞控在只接 USB 时不会为 OSD 芯片供电，需要接入电池。
- 没有 OSD 芯片的飞控无法更换字体。

## 飞行问题

### 飞行器无法解锁

- 需要配置 `ARM` 模式，可在[模式选项卡](/docs/wiki/app/auxiliary-tab)设置。不建议使用摇杆命令解锁。
- 解锁前必须通过多项检查。可在 OSD 或[CLI 选项卡](/docs/wiki/app/cli-tab)执行 `status` 查看禁止解锁标志。常见标志包括：

  - `THROTTLE`：油门高于 `min_check`，解锁前将油门杆置于最低位。
  - `ANGLE`：机体倾角超过限制，将飞行器放平。
  - `NOPREARM`：未激活预解锁。
  - `CALIB`：传感器仍在校准，通电后稍等。
  - `RPMFILTER`：飞控已启用双向 DShot，但 ESC 未回传 RPM 遥测。

  使用配置界面时还可能出现：

  - `MSP`：飞行器连接至 Betaflight App 等配置界面。
  - `CLI`：当前位于 Betaflight App 的 CLI 选项卡。
  - `OSD` 或 `CMS`：已通过 OSD 菜单或遥控器 LUA 脚本连接 CMS。

### 无油门输入时电机加速

这称为 I 项累积（I-term windup）。PID 控制器尝试纠正误差，但机体无法按预期运动，输出便会持续增加。

- 最常见原因是未安装螺旋桨：飞行器不能移动，就无法完成纠正。
- 若电机或桨叶方向错误，导致气流整体向上而非向下推动，也会产生相同现象。

### 起飞时翻转并停转

“停转”是预期保护行为：飞控检测到足够大的误差后会关闭电机，避免失控旋转或飞走。请检查：

- 电机方向和桨叶安装方向是否正确。方向错误会造成两侧推力不平衡并导致翻转。
- [电机选项卡](/docs/wiki/app/motors-tab)中的 `Motor direction is reversed` 是否与实际桨叶方向一致。

![Betaflight 电机方向](/img/betaflight_props_in_out.png)

- 电机编号是否正确映射。Configurator 中测试 Motor 1 时，应转动图示对应的电机；可通过 CLI 或新版图形界面重新映射。
- 陀螺仪是否正确对齐。移动飞行器，确认 Betaflight 模型预览与每个实际转动方向一致；若不一致，在 Configuration 选项卡调整各轴偏移。
- 遥控器各轴通道是否居中。

### 飞行中随机抽动

通常由机械部件松动，或物体直接接触陀螺仪引起。清理陀螺仪周围障碍物，紧固全部部件。若飞行性能仍差，请按[调参说明](/docs/wiki/tuning/4-3-Tuning-Notes)进行 PID 调整，并结合可靠的预设或教程进一步排查。
