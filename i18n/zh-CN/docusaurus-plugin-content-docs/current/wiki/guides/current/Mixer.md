# 混控

Betaflight 支持多种预设混控配置，也支持自定义混控。混控配置决定舵机和电机如何协同工作以控制飞行器。

## 机架类型

要选择内置机架混控器，请使用 [Betaflight App](https://app.betaflight.com)。其中提供了混控类型示意图，可协助完成正确接线。

也可使用 CLI：

1. 使用 `mixer list` 查看所有支持的类型
2. 选择一种类型，例如 `mixer TRI`
3. 执行 `save` 使设置生效

### 支持的机架类型

| 名称             | 说明                         | 电机   | 舵机           |
| ---------------- | ---------------------------- | ------ | -------------- |
| TRI              | 三轴飞行器                   | M1-M3  | S1             |
| QUADP            | 加号构型四轴飞行器           | M1-M4  | 无             |
| QUADX            | X 构型四轴飞行器             | M1-M4  | 无             |
| BI               | 双轴飞行器（左右布局）       | M1-M2  | S1、S2         |
| GIMBAL           | 云台控制                     | 不适用 | S1、S2         |
| Y6               | Y6 飞行器                    | M1-M6  | 无             |
| HEX6             | 加号构型六轴飞行器           | M1-M6  | 无             |
| FLYING_WING      | 固定翼；升降副翼             | M1     | S1、S2         |
| Y4               | Y4 飞行器                    | M1-M4  | 无             |
| HEX6X            | X 构型六轴飞行器             | M1-M6  | 无             |
| OCTOX8           | X 构型八轴飞行器（上下共轴） | M1-M8  | 无             |
| OCTOFLATP        | 平面加号构型八轴飞行器       | M1-M8  | 无             |
| OCTOFLATX        | 平面 X 构型八轴飞行器        | M1-M8  | 无             |
| AIRPLANE         | 固定翼；Ax2、R、E            | M1     | S1、S2、S3、S4 |
| HELI_120_CCPM    | 支持 3D 的直升机             | M1     | S1、S2、S3、S4 |
| HELI_90_DEG      |                              |        |                |
| VTAIL4           | V 尾四轴飞行器               | M1-M4  | 不适用         |
| HEX6H            | H 构型六轴飞行器             | M1-M6  | 无             |
| PPM_TO_SERVO     |                              |        |                |
| DUALCOPTER       | 双旋翼飞行器                 | M1-M2  | S1、S2         |
| SINGLECOPTER     | 常规直升机                   | M1     | S1             |
| ATAIL4           | A 尾四轴飞行器               | M1-M4  | 不适用         |
| CUSTOM           | 用户自定义                   |        |                |
| CUSTOM AIRPLANE  | 用户自定义固定翼             | M1-M2  | S1-S8          |
| CUSTOM TRICOPTER | 用户自定义三轴飞行器         |        |                |

:::note
在 2025.12 固件中，`CUSTOM AIRPLANE` 混控模型现在至少需要一个电机。
:::

---

## 混控算法（`mixer_type`）

`mixer_type` 设置控制电机达到控制权威极限时，如何组合 PID 输出和油门。下方所有曲线均展示启用 AIRMODE 时的情形；禁用 AIRMODE 时，低油门会采用标准的混控限幅。

### LEGACY

**`set mixer_type = LEGACY`**，默认启用。

![混控类型：LEGACY 曲线，展示油门与电机输出在控制权威极限处发生明显限幅](https://user-images.githubusercontent.com/10757508/100614257-294ad800-3316-11eb-9ccf-d260d03e541e.png)

### LINEAR

**`set mixer_type = LINEAR`**

![混控类型：LINEAR 曲线，展示逐步调整油门以避免控制权威极限处的陡变](https://user-images.githubusercontent.com/10757508/100615013-49c76200-3317-11eb-877d-f0f181dcb204.png)

### DYNAMIC

**`set mixer_type = DYNAMIC`**

![混控类型：DYNAMIC 曲线，展示根据多轴合成 PIDsum 自适应调整的油门响应](https://user-images.githubusercontent.com/10757508/100614211-120bea80-3316-11eb-8510-8d58d0c69c38.png)

_注意：上图展示的是理想情形。实际行为取决于各轴对 PIDsum 的贡献；若仅一个轴请求全部控制权威，结果与 LINEAR 相同。多个轴同时请求控制权威时可获得最佳效果。_

### EZLANDING

**`set mixer_type = EZLANDING`**

EzLanding 设置请参见 [Betaflight 4.5 发布说明](https://betaflight.com/docs/wiki/release/betaflight-4-5-release-notes#12-ezlanding)。

### 摘要

| 类型        | 行为                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **LEGACY**  | 尽可能维持所请求的油门位置，随后为保持控制权威而大幅改变油门。达到极限时的过渡更突兀。                                         |
| **LINEAR**  | 更早开始改变油门，避免末端的陡变，使为实现所需修正而增加或降低推力的过程更平滑。                                               |
| **DYNAMIC** | 与 LINEAR 类似但会自适应。当 PIDsum 来自单一轴时行为与 LINEAR 相同；当 PIDsum 由多轴合成时，会自适应以更贴近所请求的油门水平。 |

---

## 舵机配置

`servo` CLI 命令定义舵机输出设置。`smix` 命令控制混控器如何将飞控数据（RC 输入、PID 输出、通道转发）映射到这些输出。

### 通道转发

通道转发可将 AUX 通道通过 PWM 引脚转发到舵机。可在 Betaflight App 的“功能”中启用，或通过 CLI 执行 `feature CHANNEL_FORWARDING`。

### `servo` 命令

`servo <min> <max> <middle> <angleMin> <angleMax> <rate> <forwardFromChannel>`

| 参数                       | 说明                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `<min>`、`<max>`           | 限制舵机行程，单位为 µs                                                                                                      |
| `<middle>`                 | 未转发时的中点值；舵机混控器的值会叠加到此值上                                                                               |
| `<angleMin>`、`<angleMax>` | 未使用                                                                                                                       |
| `<rate>`                   | 舵机混控器或云台输入值的缩放比例，范围为 -100% 至 100%                                                                       |
| `<forwardFromChannel>`     | 使用 RC 通道值而非 `<middle>` 作为参考值。舵机跟随该 RC 通道，同时仍可接受舵机混控器的修正。`<min>` / `<max>` 限制仍然有效。 |

### 舵机滤波

可启用低通滤波器，避免激发机架结构模态，例如三轴飞行器尾管的共振。

**配置（仅限 CLI）：**

1. `set servo_lowpass_freq = nnn`，截止频率，有效范围为 10–400 Hz（两阶滤波器）
2. `set servo_lowpass_enable = ON`

**调整截止频率：**

1. 让飞行器可在受影响的轴上自由运动，例如托住三轴飞行器，使其能够偏航。
2. 轻敲飞行器或直接驱动舵机。
3. 若振荡持续数秒，将 `servo_lowpass_freq` 减半后重复测试。
4. 当振荡可在约一秒内衰减时停止。执行 `save`。

---

## 自定义电机混控

自定义电机混控可完全自定义电机配置。每个电机分别定义其对油门、横滚、俯仰和偏航的贡献。

**设置步骤：**

1. `mixer custom`，启用自定义混控
2. `mmix reset`，清除现有自定义混控
3. 可选：`mmix load <name>`，加载内置混控作为起点
4. 为每个电机执行一条 `mmix` 语句

**语法：**`mmix n THROTTLE ROLL PITCH YAW`

| 参数       | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| `n`        | 电机索引，从 0 开始                                        |
| `THROTTLE` | 油门贡献。通常所有启用的电机均为 1.0；未使用的电机为 0.0。 |
| `ROLL`     | 横滚控制权威，标称范围为 -1.0 至 1.0                       |
| `PITCH`    | 俯仰控制权威，标称范围为 -1.0 至 1.0                       |
| `YAW`      | 旋转方向：1.0 = 逆时针（CCW），-1.0 = 顺时针（CW）         |

:::note
`mmix` 可能显示当前未启用的混控；只有选择自定义混控器后，自定义电机混控才会生效。电机索引必须从 0 开始连续定义；表格在遇到第一个 THROTTLE = 0 的条目时结束。
:::

---

## 自定义舵机混控

自定义舵机混控规则可将飞控数据源映射到舵机输出。规则按定义顺序应用。

### `smix` 命令

| 命令               | 说明                                         |
| ------------------ | -------------------------------------------- |
| `smix`             | 输出当前舵机混控器                           |
| `smix reset`       | 清除当前配置文件中的自定义舵机混控和舵机反向 |
| `smix load <name>` | 加载指定配置的舵机部分                       |

**规则语法：**`smix <rule> <servo> <source> <rate> <speed> <min> <max> <box>`

**`<servo>` ID：**

| ID  | 舵机槽位                                                             |
| --- | -------------------------------------------------------------------- |
| 0   | 云台俯仰                                                             |
| 1   | 云台横滚                                                             |
| 2   | 升降舵 / SINGLECOPTER_4                                              |
| 3   | 副翼升降舵 1（左）/ SINGLECOPTER_1                                   |
| 4   | 副翼升降舵 2（右）/ BICOPTER_LEFT / DUALCOPTER_LEFT / SINGLECOPTER_2 |
| 5   | 方向舵 / BICOPTER_RIGHT / DUALCOPTER_RIGHT / SINGLECOPTER_3          |
| 6   | 油门（仅第一个电机输出）                                             |
| 7   | 襟翼                                                                 |

只有部分舵机通道会根据混控模式连接到输出。自定义模式中：CUSTOM_TRI 使用方向舵；CUSTOM_AIRPLANE 使用升降舵至襟翼；CUSTOM 不使用舵机。GIMBAL 的处理逻辑硬编码，不受 `mmix` 规则影响。

**`<source>` ID：**

| ID  | 数据源                           |
| --- | -------------------------------- |
| 0   | 稳定后的横滚                     |
| 1   | 稳定后的俯仰                     |
| 2   | 稳定后的偏航                     |
| 3   | 稳定后的油门（仅第一个电机输出） |
| 4   | RC 横滚                          |
| 5   | RC 俯仰                          |
| 6   | RC 偏航                          |
| 7   | RC 油门                          |
| 8   | RC AUX 1                         |
| 9   | RC AUX 2                         |
| 10  | RC AUX 3                         |
| 11  | RC AUX 4                         |
| 12  | 云台俯仰                         |
| 13  | 云台横滚                         |

在 PASSTHRU 模式中，稳定后的 ROLL/PITCH/YAW 直接取自 RC 指令。

**其他参数：**

- `<rate>`，数据源的缩放比例，范围为 -100% 至 100%。零值表示 `smix` 表结束。
- `<speed>`，限制每个循环中的数据源变化速率（默认循环周期为 1 ms）。零表示不限制。
- `<min>`、`<max>`，以完整舵机行程百分比表示的值范围（0% = 最小值，50% = 中点，100% = 最大值）。
- `<box>`，仅当其为 0，或启用了对应的 SERVOx 模式时，该规则才生效。

### 舵机反向

`smix reverse`，输出当前反向配置。

`smix reverse <servo> <source> r|n`，将给定舵机的数据源设为反向（`r`）或正常（`n`）。这几乎等效于使用负的 `<rate>`，但 `<min>`/`<max>` 限制会在反向前应用。

`smix reverse` 是按配置文件保存的设置，需要在各个所需配置文件中分别配置。

**示例：反向三轴飞行器（TRI 混控器）的尾舵机：**

```
smix reverse 5 2 r
```

---

## 示例

### 示例 1：KK2.0 接线方式的电机设置

使用 KK 板电机编号的 X 构型四轴飞行器：

```
  1CW      2CCW
     \    /
       KK
     /    \
  4CCW     3CW
```

```
mixer custom
mmix reset
mmix 0 1.0,  1.0, -1.0, -1.0   # Front Left  — positive roll, negative pitch, CW
mmix 1 1.0, -1.0, -1.0,  1.0   # Front Right — negative roll, negative pitch, CCW
mmix 2 1.0, -1.0,  1.0, -1.0   # Rear Right  — negative roll, positive pitch, CW
mmix 3 1.0,  1.0,  1.0,  1.0   # Rear Left   — positive roll, positive pitch, CCW
```

### 示例 2：HEX-U 飞行器

U 形六轴飞行器。电机 1 和 6 更靠近横滚轴，因此其横滚控制权威为外侧电机的一半。

```
.4........3.
............
.5...FC...2.
............
...6....1...
```

```
mixer custom
mmix reset
mmix 0 1.0, -0.5,  1.0, -1.0   # half negative roll, full positive pitch, CW
mmix 1 1.0, -1.0,  0.0,  1.0   # full negative roll, no pitch, CCW
mmix 2 1.0, -1.0, -1.0, -1.0   # full negative roll, full negative pitch, CW
mmix 3 1.0,  1.0, -1.0,  1.0   # full positive roll, full negative pitch, CCW
mmix 4 1.0,  1.0,  0.0, -1.0   # full positive roll, no pitch, CW
mmix 5 1.0,  0.5,  1.0,  1.0   # half positive roll, full positive pitch, CCW
```

### 示例 3：自定义三轴飞行器

```
mixer CUSTOMTRI
mmix reset
mmix 0 1.000 0.000 1.333 0.000
mmix 1 1.000 -1.000 -0.667 0.000
mmix 2 1.000 1.000 -0.667 0.000
smix reset
smix 0 5 2 100 0 0 100 0
profile 0
smix reverse 5 2 r
profile 1
smix reverse 5 2 r
profile 2
smix reverse 5 2 r
```

### 示例 4：带差动推力的自定义固定翼

双发固定翼使用差动推力。电机接在输出 1–2；舵机接在上方舵机 ID 表定义的槽位。偏航影响系数设为 0.3，可按需要增减差动量。

| 引脚 | 输出          |
| ---- | ------------- |
| 1    | 左发动机      |
| 2    | 右发动机      |
| 3    | 俯仰 / 升降舵 |
| 4    | 横滚 / 副翼   |
| 5    | 横滚 / 副翼   |
| 6    | 偏航 / 方向舵 |

```
mixer CUSTOMAIRPLANE
mmix reset
mmix 0 1.0 0.0 0.0  0.3   # Left Engine
mmix 1 1.0 0.0 0.0 -0.3   # Right Engine

smix reset
# Rule  Servo  Source  Rate  Speed  Min  Max  Box
smix 0  3      0       100   0      0    100  0   # Roll / Aileron
smix 1  4      0       100   0      0    100  0   # Roll / Aileron
smix 2  5      2       100   0      0    100  0   # Yaw / Rudder
smix 3  2      1       100   0      0    100  0   # Pitch / Elevator
```

### 示例 5：跳过损坏的电机输出

若需使用输出 0、1、2、4（跳过损坏的输出 3），请为电机 3 添加一个 PID 贡献为零的占位 `mmix` 条目，以避免表格过早结束。

```
mixer custom
mmix reset
mmix 0 1.0, -1.0,  1.0, -1.0
mmix 1 1.0, -1.0, -1.0,  1.0
mmix 2 1.0,  1.0,  1.0,  1.0
mmix 3 1.0,  0.0,  0.0,  0.0   # dummy — keeps table alive for motor 4
mmix 4 1.0,  1.0, -1.0, -1.0
save
```

### Octo X8 仿真

```
mixer custom
mmix reset
mmix 0  1.000 -1.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  1.000
mmix 2  1.000  1.000  1.000  1.000
mmix 3  1.000  1.000 -1.000 -1.000
mmix 4  1.000 -1.000  1.000  1.000
mmix 5  1.000 -1.000 -1.000 -1.000
mmix 6  1.000  1.000  1.000 -1.000
mmix 7  1.000  1.000 -1.000  1.000
```

### PPM 转 SERVO 仿真

直接通道映射示例：

```
mixer customairplane
smix reset
smix 0 0 4 100 0 0 100 0
smix 1 1 5 100 0 0 100 0
smix 2 2 6 100 0 0 100 0
smix 3 3 7 100 0 0 100 0
smix 4 4 8 100 0 0 100 0
smix 5 5 9 100 0 0 100 0
smix 6 6 10 100 0 0 100 0
smix 7 7 11 100 0 0 100 0
```

如需为任意内置混控配置创建 `mmix`/`smix`，请参考固件源代码中 `src/main/flight/mixer.c` 和 `src/main/flight/servos.c` 的对应行。

---

## 旧版支持矩阵

:::note
此矩阵适用于 3.x 固件版本。当前固件已不再支持 F1 和 F3 目标，仅供历史参考。
:::

| 混控器           | F1  | F3  | F4 与 F7 | 备注                       |
| ---------------- | --- | --- | -------- | -------------------------- |
| QUADX            | o   | o   | o        |                            |
| QUADX 1234       | o   | o   | o        |                            |
| QUAD+            | o   | o   | o        |                            |
| Tricopter        | o   | o   | o        |                            |
| Gimbal           | o   | o   | o        |                            |
| Hex +            | x   | x   | o        |                            |
| Hex X            | o   | o   | o        |                            |
| Hex H            | x   | x   | o        |                            |
| Octo Flat +      | x   | x   | o        |                            |
| Octo Flat X      | x   | x   | o        |                            |
| Flying Wing      | o   | o   | o        |                            |
| Airplane         | o   | o   | o        | 单螺旋桨                   |
| Heli 120         | x   | x   | x        | 无代码                     |
| Heli 90          | x   | x   | x        | 无代码                     |
| Single Copter    | x   | x   | x        | 代码不足（无 mmix）        |
| Dual Copter      | x   | x   | o        |                            |
| Bicopter         | x   | x   | o        |                            |
| V-tail Quad      | o   | o   | o        |                            |
| A-tail Quad      | o   | o   | o        |                            |
| Y4               | o   | o   | o        |                            |
| Y6               | x   | x   | o        |                            |
| Octo X8          | x   | x   | o        | 可通过 mmix 仿真（见示例） |
| PPM to SERVO     | x   | x   | x        | 可通过 smix 仿真（见示例） |
| Custom           | o   | o   | o        |                            |
| Custom Airplane  | o   | o   | o        |                            |
| Custom Tricopter | o   | o   | o        |                            |
