# FPV 相机控制

## 说明

该功能可为 HS1177 类型的相机模拟 OSD 操纵杆。此类相机通常只有一个 OSD 输入引脚，由按钮电阻分压网络驱动。
目前大多数相机似乎都采用这一设计，其典型电阻值如下：

- 47 kΩ：相机内部电阻；RunCam Sparrow、Foxeer Monster，以及可能的其他 HS1190 相机为 9.9 kΩ（感谢 @khalinatek）
- 45 kΩ：确认（enter）
- 27 kΩ：左
- 15 kΩ：上
- 6.8 kΩ：右
- 0：下

## 配置

- `resource camera_control PIN`：为相机控制功能指定一个 `PIN`。可用引脚取决于相机与飞控（FC）的接线方式。
- `set camera_control_mode = hardware_pwm`：工作模式。`software_pwm` 对可选 `PIN` 的限制最少，但必须搭配电阻和电容才能正常工作；只要能为其腾出一个定时器，`hardware_pwm` 几乎只需一个电阻即可可靠工作；`dac`（尚未实现）将支持极少数引出了 DAC 引脚且该引脚未被其他功能占用的 FC，实现后可直接连接至相机。
- `set camera_control_ref_voltage = 330`：相机悬空 `OSD` 与 `GND` 引脚间测得的电压，单位为 10 mV。通常为 3V3，但并非固定不变；例如 RunCam Sky 为 3V4，另有报告称某些相机低至 3V1。
- `set camera_control_key_delay = 180`：单次按键持续时间，单位为 ms，即 `camera_control` 引脚上的有效输出时间。与 RunCam 沟通后设为 180 ms，以兼容大多数相机；部分相机可接受低至 125 ms 的值。
- `set camera_control_internal_resistance = 470`：相机内部电阻，单位为 100 Ω。大多数 HS1177 衍生型号为 47 kΩ，但并不保证；若默认值无效，需针对相机测得此值。
- `camera_control_button_resistance = 450,270,150,68,0`：设置模拟相机等效按键板上每个按钮的电阻。默认值适用于大多数相机，但部分厂商可能使用非标准数值。若出现某一个按钮无效等问题，请测量相机随附按键板的实际电阻后调整。数值顺序为：`ENTER`、`LEFT`、`UP`、`RIGHT`、`DOWN`。**Betaflight 4.1 新增。**

## 工作模式

### 硬件 PWM

在 FC 的 `PIN` 与相机 `OSD` 之间串联一个 150-600 Ω 电阻。某些 FC 已内置此电阻。建议额外连接 `GND`。

该模式假定相机（或 FC）在 OSD 引脚上具有足够的电容（参见“硬件设计提示”部分）。如果相机无法工作，尝试在相机 `OSD` 与 `GND` 之间增加电容。

#### 如何选择合适的 `PIN`？

硬件 PWM 模式需要具有硬件定时器输出的引脚。部分 FC 有专用的 `CC` 引脚，优先使用它，因为通常已串联电阻。否则，LED 灯带输出或未使用的电机输出（M5/M6）通常是较安全的选择。

要检查引脚是否具备定时器输出，先确定 FC 焊盘连接至 MCU 的哪个引脚。可使用 `resource` 命令，例如：

```
# resource
resource BEEPER 1 D02
resource MOTOR 1 B04
resource MOTOR 2 B00
resource MOTOR 3 B05
resource MOTOR 4 B01
resource MOTOR 5 D12
resource MOTOR 6 D13
resource MOTOR 7 C08
resource MOTOR 8 C09
...
resource SERIAL_RX 4 A01
```

在此示例中，若要在四轴飞行器上使用未占用的 M5 输出，则应使用 `D12`。用 `timer` 命令检查此引脚是否具有定时器：

```
# timer
timer A08 AF1
# pin A08: TIM1 CH1 (AF1)
timer B03 AF1
# pin B03: TIM2 CH2 (AF1)
timer B00 AF2
# pin B00: TIM3 CH3 (AF2)
timer B01 AF2
# pin B01: TIM3 CH4 (AF2)
timer B04 AF2
# pin B04: TIM3 CH1 (AF2)
timer B05 AF2
# pin B05: TIM3 CH2 (AF2)
timer D12 AF2
# pin D12: TIM4 CH1 (AF2)
timer D13 AF2
# pin D13: TIM4 CH2 (AF2)
timer C08 AF3
# pin C08: TIM8 CH3 (AF3)
timer C09 AF3
# pin C09: TIM8 CH4 (AF3)
```

此处可使用未被其他功能占用的定时器 `TIM4`（另一个引脚 `D13` 是我们未使用的 M6 输出）。

取消电机输出映射后，将该引脚映射为相机控制引脚：

```
resource MOTOR 5 none
resource CAMERA_CONTROL 1 D12
```

至此，引脚即配置完成。

若想使用默认未配置定时器的引脚，可再次用 `timer` 命令检查可用定时器。以下示例检查能否重映射 `SERIAL 4` 的 RX 引脚；在此例中它位于 `A01`。因为该引脚未列在已配置定时器清单中，使用 `timer a01 list` 检查其是否可作为定时器输出：

```
# timer a01 list
# AF1: TIM2 CH2
# AF2: TIM5 CH2
```

此处 `TIM2` 已用于引脚 `B03`，但 `TIM5` 未在其他位置使用。使用 `timer A01 AF2` 启用 AF（备用功能）后，即可重映射该引脚。

```
timer A01 AF2
resource SERIAL_RX 4 none
resource CAMERA_CONTROL 1 A01
```

### 软件 PWM

需要一个 150-600 Ω 电阻和一个 1-10 µF 电容，二者构成 RC 滤波器。电阻连接在 `PIN` 与 `OSD` 之间，电容连接在 `OSD` 与 `GND` 之间。

![电阻和电容接线图](/img/camera-control-software-pwm.svg)

### DAC

（尚未实现，当前无法工作！）

无需额外元件；将 `PIN` 连接至 `OSD`，最好同时连接 `GND`。

## 控制方式

- RC 摇杆命令
- `MSP_CAMERA_CONTROL`
- 通过遥测传输的 MSP，例如用于 FrSky 遥控器的 Lua 脚本（[Pull Request #23](https://github.com/betaflight/betaflight-tx-lua-scripts/pull/23)）

## 摇杆命令

![相机控制摇杆命令](/img/camera-control-stick-commands.png)

部分相机具有第二级 OSD 菜单（例如 RunCam Eagle Pro 2），可设置电压监视、计时器、显示名称等项目，也可以通过此功能进入。需依照相机随附手册确定对应的摇杆命令；摇杆位置等同于相机要求的按键序列。

例如，若相机要求长按“下”键进入菜单，则进入相机控制时，保持正常左摇杆的油门居中、偏航向右，同时将俯仰杆保持在“下”位置。简言之，横滚/俯仰摇杆分别对应上、下、左、右按钮；油门居中且偏航向右，则对应相机控制键盘或操纵杆上的“确认”按钮。

## 故障排查

首先确认 `resource list` CLI 命令列出了已分配的 `camera_control`。

若相机无法工作，通常需调整按键延迟、参考电压或内部电阻。默认值适用于大多数 HS1177 衍生相机；遇到问题时，优先尝试调整按键延迟。

### 按键延迟

若发生一次触发被识别为多次按键，将延迟降低 10-15%；若按键无法稳定识别，则增大延迟。已知 Foxeer Arrow v3 在 125 ms 延迟下表现最佳。

### 参考电压

在相机通电时，测量其 `OSD` 与 `GND` 引脚之间的电压即可。

### 内部电阻

已知 Foxeer Monster、RunCam Micro Sparrow（以及可能的其他相机）需要 `camera_control_internal_resistance = 99`。
RunCam Phoenix 2 Nano 需要 `camera_control_internal_resistance = 212`。

要推导未知相机的此值，需要万用表和兼容的操纵杆。先将万用表设为电阻测量模式，逐个按下 OSD 操纵杆按键并测量其电阻，记录测得数值以供后续使用。

接着为相机供电并接入 OSD 操纵杆，测量按下各按键时 OSD 引脚的电压。无需测量所有按键，一个或两个按键即可。同时测量尚未记录的 `Reference Voltage`。

每个按键会得到一组电阻和电压数据。将数据代入以下公式，即可计算内部电阻：
`Rin = Rkey * (Vref / Vkey - 1) where key in (enter, left, up, right, down)`

用多个按键计算结果以作合理性检查，结果应大致相同。得到的 `Rin` 即为 `camera_control_internal_resistance`；注意其单位为 100 Ω，因此需将计算出的电阻值除以 100。

### 按键板电阻值

大多数相机的按键板使用标准电阻值，但有些型号可能使用非标准数值。若大部分按钮可用、只有一两个按钮无效，请测量并调整 `camera_control_button_resistance` 的值（**Betaflight 4.1 新增**）。

## FC 配置示例

### Emax Magnum stack + Foxeer Arrow v3

串联 600 Ω 电阻
相机控制映射至电机 6 输出
`set camera_control_key_delay = 125`

使用以下 CLI 命令：

```
resource MOTOR 6 none
resource CAMERA_CONTROL A08
set camera_control_key_delay = 125
save
```

### Foxeer Arrow Mini、Arrow Micro、Monster

这些相机的 OSD 引脚电容不足甚至没有电容。因此，必须增加至少 0.1 µF 的电容才能使硬件 PWM 工作。Foxeer 可能会发布修复此问题的新版本。

将 1206 电容直接焊接在 JST 连接器背面即可良好工作。下图是焊接于 Arrow Micro v2 的 100 nF 1206 电容；由于 Arrow Mini 使用相同 PCB 设计，此方法同样适用：
![改装用于相机控制的 Foxeer Arrow Micro v2](/img/camera-control-foxeer-arrow-micro-mod.png)

类似方法也适用于 Foxeer Monster。
@todo 添加照片

### Foxeer Predator

**UP 和 DOWN 无法工作**；希望后续批次能修复该固件缺陷。
`set camera_control_internal_resistance = 99`

Predator 对 DOWN 所需的数值极低，而 FC 的输出无法低于 `3.3 * R / (R + 9.9 kΩ)`。
使用 75-150 Ω 的电阻即可使其工作。

笔者样品的参考电压偏高：使用 3S 电池时为 3.43 V，这会造成 UP 按键问题。
该相机似乎按以下逻辑识别 UP 键：

```
if voltage is V_up:
  time_start = now
  while (voltage is not V_max): wait
  time_end = now
  total_time = time_end - time_start

  if total_time is short: UP
  else: LONG_UP
```

因此相机会陷入无限循环，**连 OSD 计时器都会停止计数**，因为 FC 无法输出 `Vmax ~= 3.4`。

Foxeer Predator v4 Mini 实测内部电阻为 47 kΩ、参考电压为 3.27 V，OSD 操纵杆的按键电阻使用本文开头所列的标准值。

### Caddx.us Micro Turbo S1

默认配置即可正常工作，无需电容。

```
set camera_control_internal_resistance = 470
set camera_control_ref_voltage = 325
```

### Caddx.us Micro Turbo F1

该相机的参考电压通常较低；至少有一个样品在 4S 电池供电时测得 2.77 V。除此之外可正常工作，且无需电容。

```
set camera_control_internal_resistance = 470
set camera_control_ref_voltage = 277
```

### Caddx.us Turtle V2

基于上述流程测得的数值。其按键电阻持续高于默认值。

```
set camera_control_internal_resistance = 99
set camera_control_ref_voltage = 300
set camera_control_button_resistance = 460,280,160,78,10
```

**请遵循本页底部的制造商建议，避免出现这类问题！**

## 常见问题

> 哪种阻值最合适？

150-600 Ω 范围内均可，优先选择较低阻值。

> 需要什么额定功率的电阻？

无关紧要。

> RCG 讨论帖

https://www.rcgroups.com/forums/showthread.php?2961216-Betaflight-Camera-Control-Compatibility-Reports

可在此讨论帖中查询兼容性帮助。

## 硬件设计提示

若设计飞控，请选择能够分配专用定时器的 MCU 引脚。
要将相机控制引脚加入默认 target 资源分配，请在 `target.h` 文件中使用以下预处理器宏：

```
#define CAMERA_CONTROL_PIN pin_name
```

在指定 MCU 引脚与焊盘之间串联一个 150-220 Ω 电阻。
为兼容尽可能广泛的相机，建议增加额外电容；100 nF 陶瓷 SMD 电容即可，100-500 nF 范围内的电容均能显著改善用户体验。

若设计相机，同样应遵循上述电容建议。它可为实体操纵杆去抖，并简化最终用户的 FC 配置。
若能控制相机固件，请降低对各个按键电压电平的限制，并在两侧预留约 5-10% 的余量。
