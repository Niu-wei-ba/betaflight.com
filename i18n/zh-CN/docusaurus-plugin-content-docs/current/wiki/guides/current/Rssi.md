# RSSI

RSSI 是接收信号强度的测量值，可用于判断飞行器是否即将超出控制范围，或是否受到射频干扰。

部分接收机提供 RSSI 输出，支持三种方式：

1. 通过 PPM 通道传输 RSSI；
2. 通过并行 PWM 通道传输 RSSI；
3. 通过带 RSSI 输出的 PPM 遥控系统接入 ADC，即 RSSI ADC。

## 通过 PPM 获取 RSSI

将接收机配置为在空闲通道输出 RSSI，再通过 CLI 选择该通道。

例如使用 9 通道时：

```
set rssi_channel = 9
```

注意：EZUHF 等部分系统会反转 RSSI（`0 = 满信号` / `100 = 丢失信号`）。可通过以下命令反转通道输入以获得正确读数：

```
set rssi_invert = ON
```

正常情况默认值为 `OFF`（`100 = 满信号` / `0 = 丢失信号`）。

## 通过并行 PWM 通道获取 RSSI

将 RSSI 信号接至任一 PWM 输入通道，然后按“通过 PPM 获取 RSSI”的方式设置 RSSI 通道。

## 从 Futaba S.Bus 接收机获取 RSSI

S.Bus 串行协议包含丢帧检测。可通过以下命令监测并将其报告为 RSSI：

```
set rssi_src_frame_errors = ON
```

注意，RSSI 是 Received Signal Strength Indicator（接收信号强度指示）的缩写；S.Bus 丢帧检测实际反映的是信号**质量**而非信号强度。因此，在距离极限处，使用此方式报告的 RSSI 可能比直接报告信号强度下降得更快。

## RSSI ADC

将 RSSI 信号接至 `RC2/CH2` 输入。信号必须介于 `0V` 与 `3.3V` 之间；必要时使用串联电阻降压，串联平滑电容也可能有帮助。可轻松制作简单的 PPM->RSSI 调节器，详见 `PPM-RSSI conditioning.pdf`。

在 CLI 中：

- 通过 `feature RSSI_ADC` 启用 `RSSI_ADC` 功能；
- 设置 `RSSI_SCALE` 参数（`1` 至 `255`）以按实际配置调整 RSSI 电平。原始 ADC 值会除以该参数值。

注意：部分系统会反转 RSSI（`0 = 满信号` / `100 = 丢失信号`）。可使用以下命令反转输入：

```
set rssi_invert = ON
```

### `RSSI_SCALE` 简易设置方法

- 设置 `rssi_scale = 100`，此时显示百分比即为原始 ADC 值；
- 打开接收机并让其靠近飞控，RSSI 值应有轻微变化；
- 将 `rssi_scale` 更新为此前测得的最大 RSSI 值。

支持 FrSky D4R-II 和 X8R。启用 `RX_PARALLEL_PWM` 时不能使用该功能。

## `RSSI_SCALE` 标定方法

要计算 RSSI 偏移和比例，测量满信号时的 RC 值（`rssi_fullsig`）及几乎无信号强度时的 RC 值（`rssi_nosig`），再使用以下公式：

```
rssi_offset = (1000-rssi_nosig) / 10
rssi_scale = 100 * 1000 / (rssi_fullsig - rssi_nosig)
```

示例：

| RC 系统  | 满信号时 RC 值 | 无信号时 RC 值 | `rssi_offset` | `rssi_scale` |
| :------- | :------------- | :------------- | :------------ | :----------- |
| Graupner | `1900`         | `1100`         | `-10`         | `125`        |

随后通过 CLI 设置：

```
set rssi_offset = -10
set rssi_scale = 125
```

## Crossfire（CRSF）LQ 和 RSSI

Betaflight 可在 OSD 中显示 Crossfire LQ（链路质量）。LQ 是成功发送和接收的数据包比例。由于 Crossfire 硬件整体信号强度较高，LQ 比 RSSI 更适合作为信号指标。

### Betaflight 4.1 及更高版本（原生 CRSF LQ 与 RSSI dBm 支持）

1. 将飞控配置为使用 CRSF 协议。
2. 在 Configuration 选项卡中选择串行接收机与 CRSF 协议，确认 `RSSI_ADC` 已关闭。
3. 在 Receiver 选项卡中确认 RSSI Channel 已禁用。
4. 在 OSD 菜单中启用并放置 LQ 元素。

### Betaflight 4.0 及更早版本

1. 通过 Crossfire OLED 菜单或 Lua 脚本，将 Crossfire 接收机配置为在未使用 RC 通道上传送 LQ。
2. 在 Configuration 选项卡中选择串行接收机与 CRSF 协议，确认 `RSSI_ADC` 已关闭。
3. 在 Receiver 选项卡中，将 RSSI Channel 设为正确的 AUX（通道号减 4）。
4. 在 OSD 中启用并放置 RSSI 元素。
