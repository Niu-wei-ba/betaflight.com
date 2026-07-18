# PID 调校指南

## 四轴飞行器与 Betaflight 速查表

## 简介

在学习过程中，我看过大量视频、教程和手册，包括 Bardwell、UAV Tech、JohnnyFPV、Mr. Steele、Le Drib、RotorRiot 等资料（如有遗漏，敬请见谅），并整理了其中的建议。本文是这些笔记的汇总，尽量以最紧凑的形式提供开始设置和调校四轴飞行器所需的关键信息。

本文示例使用常见的 `Taranis X7` 遥控器。

我是一名**自由式飞手**，因此这些设置以自由式需求为主：飞行手感更平顺、更柔和。

# 遥控器（Taranis X7）

## 通道映射

`TAER Throttle/Aileron(Roll)/Elevator(Pit)/Rudder(Yaw)`
`TRPY`

| 缩写 | 名称   | 直升机 | 固定翼 | 德语        | 中文 | 通道 |
| ---- | ------ | ------ | ------ | ----------- | ---- | ---- |
| A    | 副翼   | 横滚   | 横滚   | Querruder   | 横滚 | CH1  |
| E    | 升降舵 | 俯仰   | 俯仰   | Höhenruder  | 俯仰 | CH2  |
| T    | 油门   | 油门   | 油门   | Gas         | 油门 | CH3  |
| R    | 方向舵 | 偏航   | 起落架 | Seitenruder | 偏航 | CH4  |

# Betaflight

## 默认起始设置

- **陀螺仪更新频率**：8k
- **PID 环频率**：8k 采样
- **Airmode**：始终开启
- **Anti Gravity**：开启增益
- **动态滤波**：开启
- **滤波器**：关闭固定陷波滤波器
- **PID**：将自己的 Rates 作为参考加入设置
- **Blackbox**：2-4k 采样
- **Bardwell 的起始 Rates（主要针对 5 英寸四轴）**：

|       | P   | I   | D   | FF  | RC   | SR   | RCexpo |
| ----- | --- | --- | --- | --- | ---- | ---- | ------ |
| Roll  | 46  | 45  | 25  | 100 | 1.55 | 0.73 | 0.3    |
| Pitch | 50  | 50  | 27  | 100 | 1.55 | 0.73 | 0.3    |
| yawD  | 65  | 45  | 0   | 100 | 1.0  | 0.73 | 0.3    |

# 电池 / LiPo 数值

以下范围来自测试结果，可作为参考。

遥控器电池：

| 电芯        | mAh     | 电压           | 说明                                            |
| ----------- | ------- | -------------- | ----------------------------------------------- |
| _NiMh_ 6 节 | 800mAh  | 7 至 8 volts   | 7 volts 时约剩 1 小时；8 volts 时约 4 小时。    |
| _NiMh_ 6 节 | 2400mAh | 7 至 8 volts   | 7 volts 时约剩 2 小时；8 volts 时约 12.5 小时。 |
| _Lipo_ 3 节 | 800mAh  | 11 至 12 volts | 11 volts 时约剩 1 小时；12 volts 时约 6 小时。  |

## 带载状态

**_LiPo 单节完全放电时的电压为 3.00V；低于该值放电必然损坏电芯。_**

| 电芯数 | 最低          | 标称  | 最高  | 说明 |
| ------ | ------------- | ----- | ----- | ---- |
| 1      | 3.2V - 3.3V   | 3.7V  | 4.2V  |      |
| 2      | 6.4V - 6.6V   | 7.4V  | 8.4V  |      |
| 3      | 9.6V - 9.9V   | 11.1V | 12.6V |      |
| 4      | 12.8V - 13.2V | 14.8V | 16.8V |      |
| 5      | 16.0V - 16.5V | 18.5V | 21.0V |      |
| 6      | 19.2V - 19.8V | 22.2V | 25.2V |      |

## C（持续放电倍率）

`2600mAh (2.6Ah) and a C rating of 55C
55 * 2.6 = max constant output, which is 143A.`

`5C 1300mAh: 5 * 1.3A == 5.6A`

## 电芯容量 / 百分比

电压与剩余容量对照表。

| 单节电压 | 百分比 |
| -------- | ------ |
| 4.00V    | 84%    |
| 3.96     | 77%    |
| 3.93     | 70%    |
| 3.90     | 63%    |
| 3.86     | 56%    |
| 3.83     | 48%    |
| 3.80     | 43%    |
| 3.76     | 35%    |
| 3.73     | 27%    |
| 3.70     | 21%    |
| 3.67     | 14%    |

# PID

![PID animation](https://github.com/bw1129/PIDtoolbox/raw/master/images/PID_Compensation_Animated.gif)

- **P** = 当前（比例项）
- **I** = 过去（积分项）
- **D** = 未来（微分项 / 阻尼）！有风险

[社区预设](Community-Presets?fbclid=IwAR10HqBt_ZjxHivCQ8Os55f1TzKGcTH9vdOiiuNWeWOKA_IlLX4JYaDLoJY#2---3-quad---11xx-12xx-motors)

## P 项

P 项控制飞行器跟随摇杆设定值（Setpoint）的力度。

提高数值（增益）可使跟手更紧，但若相对于微分项（D 项）过高，可能造成过冲。可将 P 项理解为汽车悬挂中的弹簧。

P 增益决定**飞控为修正误差、达到预期飞行轨迹所施加的修正力度**，即飞手通过发射机摇杆要求四轴飞行器到达的状态。

可将其视为灵敏度和响应度设置。较高 P 增益带来的利落响应，甚至会让人感觉 Rates 变高。

**通常，P 增益越高，操控越锐利；P 增益越低，操控越柔和。**

**P 过高时，四轴飞行器会过于灵敏且倾向过度修正**，最终导致过冲和**高频振荡**。

降低 P 可以减弱振荡；但 P 降得过低，飞行器会显得松散、迟钝。

- 它与误差大小（设定值与陀螺仪测量值之差）成比例。
- **误差越大**，越用力推动飞行器达到设定值。
- **误差越小**，仍会继续修正，但力度较小。
- **误差为零**，不执行修正。

- 它是决定飞行手感和操控特性的主要因素。
- **高 P 增益**意味着飞行器会更强力地加速，以达到目标角速度。
- **较高 P 增益**手感更`锐利`。
- **较低 P 增益**手感更`柔和`。
- **P 增益过高**会引发更多（缓慢、迟滞的）振荡。

## I 项（积分项）

I 项决定**飞控抵抗风力、重心偏移等外力时，维持飞行器姿态的力度**。

可将它理解为飞行器维持姿态的刚性，以及其保持当前姿态的能力。

**若在没有操控指令时发现飞行器漂移，应提高 I。**

当 **I 增益过高时，飞行器会被过度约束，手感变得僵硬且响应不足**。这类似于反应变慢、P 增益下降。极端的过高 I 增益也可能产生低频振荡。

提高 I 增益可修正这些细微的飞行表现问题。为避免高 I 带来的不必要僵硬感，可使用“Anti Gravity”。它允许巡航时采用较低 I 增益，只在大幅推油门时提高 I 增益。

- 与误差的大小和持续时间成比例。
- 修正持续累积、尚未被修正的误差。
- 修正稳态误差和持续偏置。
- **过低时**，四轴会打滑、漂移，像在冰面上一样。
- 提高 I 增益，直至飞行器在剧烈油门变化时仍能在三个轴上保持姿态（其余由 `anti_gravity_gain` 处理）。
- 在 Betaflight 中，先仅提高 I 至飞行器正常飞行时能保持姿态，再加入 `anti_gravity_gain` 控制油门耦合。

## D 项（危险）（阻尼）

D 项控制飞行器**任何运动**的阻尼强度。对摇杆动作，D 项会抑制指令；对外部扰动（桨流扰动或阵风），D 项会抑制该扰动。

较高增益提供更强阻尼，并减小 P 项和 FF 导致的过冲。但 D 项对陀螺仪高频振动（噪声）**非常敏感**，可将噪声放大 10 至 100 倍。

若 D 增益过高或陀螺仪噪声滤除不足，高频噪声会使电机发热，甚至烧毁电机（参见滤波器选项卡）。

可将 D 项理解为汽车减震器，但其天然缺点是会放大高频陀螺仪噪声。

**D 增益过高会烧毁电机！**
D 增益起到**阻尼器作用，可减少 P 项引起的过度修正和过冲**。就像减震器防止悬挂反复弹跳，**增加 D 增益可柔化并抵消过高 P 增益导致的振荡，也可减小桨流扰动振荡。**

当 **D 项过低时，翻滚或横滚结束时回弹明显，垂直下降时的桨流扰动振荡也会最严重**。提高 D 增益能改善这些问题；但 D 值过高会放大系统噪声，造成飞行器振动，最终导致电机过热和四轴振荡。

**D 项过高的另一副作用是响应下降，通常被形容为“发黏”或“软”。**

`set debug_mode = D_MAX` _（参见 [Dynamic D guide](/docs/wiki/guides/current/Dynamic-D)）_

- 与误差的*变化量*成比例。
- 根据系统当前运动预判其*未来状态*。
- 它可降低 P 项的过冲和振荡（_阻尼效果_）。
- 但也会加速 P 项！

- 会*放大系统噪声*（振动）。
  1. 电机产生振动。
  2. 振动传到陀螺仪。
  3. D 项放大该振动。
  4. 电机烧毁。
- 必须对 D 项使用**低通滤波器**以移除高频噪声。

- 减小 P 项振荡的影响。
- **允许使用更高 P 增益**（获得更锐利的操控）而不过度振荡。
- 是唯一能足够快速响应桨流扰动等快速变化情况的 PID 项。
- 是唯一在调校不慎时可能烧毁电机的 PID 项。
- 始终应以较小步长提高 D 增益。
- **每次提高 D 增益后，都必须短暂试飞并检查电机温度！**

## 动态 D

动态 D 会在较低的基础 D 值（平顺飞行时生效）和较高的峰值 D 值（快速动作及桨流扰动时生效）之间调节 D 项。这样可在巡航时让电机更凉，同时在需要时提供足够强的阻尼。

完整的调校步骤、CLI 变量说明、调试日志及版本迁移注意事项，请参见[动态 D 指南](/docs/wiki/guides/current/Dynamic-D)。

## PID 调校要点

- 提高 P，直至四轴感觉“锐利”。
- 提高 D，直至手感足够柔和。
- 提高 I，直至过高而失去控制感（响应变慢）。
- 若振荡频率高，降低 D。
- 若振荡频率低，提高 D（或降低 P）。

**若要在 Blackbox 工具中分析误差，请将 FF（FeedForward）设为零（禁用）！**

```
P -> Higher makes Quad more sharp (oscillates if too high or low)
I -> High Makes the quad more digital / mechanical (measures errors) holds the attitude better if raised
D -> High values dampen the P (works against P, flattens the curve) D-term relates on the gyro measurements
```

### 处理方法

- 高 D / 低 P = 低 PD 比 = 回弹
- 低 D / 高 P = 高 PD 比 =

### 偏航 PID

- `P -> 过低时过于松散，像在冰上`；可提高至 60、90、100。
- `I maybe 120`
- `D could be 0`
- 然后用 FeedForward 恢复锐利度（100？）。

## 自由式调校

- 我的调校重点是：
  - 尽量减小桨流扰动。
  - 消除翻滚和横滚后的回弹。
  - 在油门变化时保持稳定姿态。
- 用于调校的主要动作是急转、翻滚、横滚和大幅推油门。

## PID 调校（引自 Betaflight 手册）

[指南](PID-Tuning-Guide)

先从安装的 BetaFlight 固件默认 P 增益略低的数值开始。俯仰和横滚的 P 设为 4.0 是合适的起点。还应降低俯仰和横滚的 I、D 增益，使 P 的调校尽量少受 I、D 干扰。I 设为 20、D 设为 5 是合适的起点。对于偏航，为排除该轴作为振荡来源，建议先将默认 P 减半，并略微降低 I。偏航应最后调校。

在连续多次试飞中，提高横滚轴 P 增益，直到接近满油门时出现振荡，且能看到并听到非常快速的抖动。然后将 P 项设为导致振荡数值的大约 70%。

通过让飞行器横滚至某一角度，然后反复大幅推、收油门，测试其能否保持预期横滚角。相对于地平线给定的角度不应明显变化。若角度出现漂移，提高 I 增益；若没有漂移，则不要修改 I。达到良好调校后，仍可通过提高或降低 I 改变飞行器手感。（I 实际上不会影响最终的 P 和 D 值。）

仅在某轴的 D 增益能够减小翻滚/横滚后的回弹，或急速下降后的桨流振荡时才提高该轴 D。若两者都不是问题，D 应保持较低。此时飞行器应已完成约 80-90% 的调校。

注意：D 项过高会使电机发热。试飞 10-30 秒后降落并检查电机。若手指能持续按在电机上，说明温度尚未过高。

偏航通常需要最少调校，但忽略它仍可能引入明显振荡。以第一步中减半后的偏航 P 开始，确认长时间拉升或高速前飞时没有明显振动。随后每次以 .5 的步长提高偏航 P，直至高速前飞或大幅推油门时 FPV 画面开始出现粗糙抖动，再略微降低。通过查看 Blackbox 中的 Yaw P 项进行精调。它*可能*略有振荡，但应同时调出偏航 gyro 轨迹，确认这些 P 振荡是否实际传到陀螺仪。若偏航 gyro 曲线相对平滑，即可接受。

**注意：**偏航天生比俯仰和横滚拥有更小的正向控制力（即控制权），所以可接受的数值范围更宽。相对于俯仰和横滚，较高 P、I 和较低 D 通常是正常选择，因为偏航的固有控制权较小。精调通常需要 Blackbox 日志。多数过量 P 振荡来自横滚或俯仰；但若满油门时仍有粗糙抖动，应查看 Blackbox 日志，确认偏航 P 是否在满油门开始振荡。若是，降低偏航 P。

最后，观察飞行器在强力转弯时是否抗拒转向或“陷入”转向，以精调 P 与 I 的关系。极低 I 会使某轴随时间漂移。某轴较低 I 会使该轴姿态更自由地变化，但仍可能保持姿态；某轴较高 I 能很好地保持姿态，但可能抗拒运动并带来惯性感。I 过高会产生过度“机器人化”的手感，甚至振荡。还可通过分析 Blackbox 日志精调 P，以更接近理想调校。

**说明：\*\***回弹振荡\*\*这一不良飞行特性，是在骤然将俯仰/横滚摇杆回中时，飞行器转动不能干净停止而产生的。其原因可能是：

1. D 过低。
2. P 过高。
3. 或 P 过低（低 P 增益会因控制权不足，产生缓慢、松散的振荡，无法达到预期最终状态）。

##### Trashcan PID

|       | P   | I   | D   | FF  | RC   | SR   | RCexpo |
| ----- | --- | --- | --- | --- | ---- | ---- | ------ |
| Roll  | 45  | 45  | 25  | 100 | 1.20 | 0.75 | 0.0    |
| Pitch | 50  | 50  | 27  | 100 | 1.20 | 0.75 | 0.0    |
| yawD  | 45  | 100 | 0   | 100 | 1.30 | 0.80 | 0.0    |

### PID 大师课

#### 根据电池电压自动选择 Profile

连接 3S 电池时选择 Profile 1；连接 4S 电池时选择 Profile 2。
`profile 0` 用于选择 Profile 1。
`set auto_profile_cell_count=3` 用于 3S Profile。
`profile 1` 用于选择 Profile 2。
`set auto_profile_cell_count=4` 用于 4S Profile。

# 滤波

如果四轴出现“颠簸”、翻滚失控或飞走，可能是滤波不足。

1. 减少滤波可改善桨流扰动表现。
2. 将 D 增益提高约 5 点。
3. 每一级滤波都会引入延迟/滞后。

#### 默认 / 最佳飞行性能：

gyro_lowpass = 100
dterm_lowpass = 110
gyro_lpf = OFF

#### 略有噪声的装机：

gyro_lowpass = 80
dterm_lowpass = 100
gyro_lpf = OFF

#### 噪声很大的装机

gyro_lowpass = 50
dterm_lowpass = 100
gyro_lpf = 188HZ

## 开启动态陷波滤波器

**可始终开启。**
（中频范围 100 - 400Hz）这是电机噪声滤波器；它读取 ESC 电机转速并让滤波频率跟随转速变化，不是“固定”的滤波器。

（Gyro Low pass < 90Hz）

宽度可设为 20-40（UAV-Tech 建议）。

## 动态滤波（多数情况下关闭）

若使用动态滤波，按 UAV Tech 的建议可关闭 Gyro Notch Filter 1 和 2，因为它们已被动态滤波取代。

### dyn_filter_range

- Low（1kHz 采样）
  - 83Hz 至 500Hz
  - 较低最小值 = 67 Hz | 中心最小值 83Hz
  - 低 KV 或较大尺寸四轴（6 英寸以上桨叶）
- Medium（1.3KHz 采样）
  - 110Hz 至 660Hz
  - 较低最小值 = 89Hz | 中心最小值 = 110Hz
  - 普通 4S 5 英寸四轴
- High（2KHz 采样）
  - 166Hz 至 900Hz
  - 较低最小值 = 133Hz | 中心最小值 = 166Hz
  - 小于 3 英寸四轴 | 高 KV | 6S 5 英寸四轴

### 修改任何滤波器后始终检查电机温度

- 电机发热（噪声过多）时需要增加滤波。
- 每增加一级滤波都会增加延迟，滤波越多，手感越发黏。

## D 项低通

- 最需要滤波的部分。
- 截止频率过低会引入更多延迟。

- _PT1_ = 至少使用一个（更快，桨流扰动处理更好）。
- （不应使用 BIQUAD：Bardwell 认为如此；UAV-Tech 认为 PT1 不足。BIQUAD 延迟更大，但滤波更强。）

## 陀螺仪陷波滤波器

- 多数装机不需要陀螺仪陷波滤波器。
- 如果关闭后电机不会发热，可以关闭。

## 陀螺仪低通

- 在 Betaflight-Blackbox-Explorer 或 PID-Toolbox 中确定低通频率设置位置。

## D 项陷波

- 若试飞 30 秒至 1 分钟后电机发热，可能需要 D 项陷波。
- **硬件状态不佳时**（桨叶和电机振动）可以开启。
- 若要完成最终调校，应关闭它。

## 偏航低通

偏航通常比其他轴更嘈杂。

# 振荡

- 固定频率的规律振荡 = P 项问题。
- 随机 / 不规律振动可能是 D 项问题（它会放大噪声）。
- 桨叶（大幅推油门）振荡的频率更高。

# 桨流扰动

桨流扰动会在改变速度，或从静止状态突然加速时发生。这类突发动作会让桨叶旋转产生湍流，从而在操控时造成不稳定。

- 调整 P/D 比例。
- 降低 P 并提高 D（提高 D 会让电机更热）。
- 或使用 FeedForward。

## RC 平滑

- Smoothing Type = Filter
- Ch Smoothed = RPYT
- 若不对 Y 轴平滑，则不能在偏航使用 FF。
- Input cutoffType = AUTO
- Input FilterType = BIQUAD
- Derivative CutoffType = AUTO
- Derivative FilterType = BIQUAD

# 油门 Boost

使油门提升速度快于你的操控指令。

# 绝对控制

适合有风天气。
1-5（10）可能带来最佳体验。

# FeedForward

**F 增益仅在摇杆运动时生效，负责飞行器的响应性。**简单说，**若要更锐利的响应，提高 F 增益；若要快速动作结束得更平顺，提高 D 增益。D 越多，一切越平顺；F 越多，控制感越强。**

若**偏航出现振荡，可尝试提高 F 和 I，再降低 P 以维持响应性，同时将 P 增益导致的振荡控制在最低程度。**

摇杆移动越快，FeedForward 越大。FeedForward 协助 P 推动四轴进入转弯。与 P 不同，无论增加多少 FF，FeedForward 本身不会引发振荡。

FeedForward 可在不把 P 提高到引起抖动的程度下改善摇杆响应，并缩短输入到响应的延迟。延迟变小意味着误差和 I 项累积/过冲更少。它很适合竞速、LOS 和激进自由式飞行，不适合电影级 HD 飞行。

过高会造成：

- 翻滚开始时过冲，尤其在摇杆达到 100% 行程时。
- 对 RC 阶跃输入的响应被夸张。
- 飞手手冷或紧张造成的抖动被放大。
- 大幅 RC 阶跃时，电机轨迹出现尖峰和短暂抖动。
- gyro 领先于 setpoint。

## 优点：

- 可按轴调节。
- 直接根据 RC-Rate 计算。
  - （导数 = 斜率大小）
- 不受陀螺仪噪声影响。
- 不增加 D 项延迟。
- 可用于偏航（无需 D 项）。
- 为后续开发提供更好的基础（更干净）。

## Smart FeedForward

- 使 FF 与 P 项不再相加。
- 可让 FF 推动动作。
- 可基于测量值实现动作（旧 Setpoint Weight = 0），同时为迅速摇杆输入保留 FF 数值。
- 需要较高 FF 值（>200）才能使 FF 产生明显效果。

### FeedForward transition / 旧方式：Setpoint Weight

- _feedforward_ == Setpoint Weight
- 较低更平顺 / 迟缓。
- 若感觉过硬则提高 FF / 降低 cutoff。
- 摇杆快速变化时增加更锐利的动作。
- 其他情况下手感更柔和。
- 例如 70 - 200。

**自由式飞手偏好更平顺的动作，因此应降低它。**
**它对偏航轴可能很有帮助。**

_0.15 表示摇杆行程中心 15% 的手感更柔和。_

FeedForward 提供“动态摇杆增压”或“动态摇杆响应”。摇杆快速移动时，它会更快推动四轴进入转弯。摇杆越快，推动力越大；它不等待误差产生，因此响应即时发生。

transition 参数会在摇杆中心附近衰减 FeedForward 效果。自由式飞行可将 transition 设为常见的 0.5 或 0.1，使中心更有阻尼（较不灵敏）；竞速及追求直接响应时，最好保持为 0。

FeedForward 为零时，D 项可始终对四轴提供阻尼，即使飞行器被指令快速转向也是如此。

**FeedForward 过高可能使四轴过于灵敏**，并造成过冲。

**[D-gain]/26 x [setpoint] x 100 = FF gain**

```

set f_pitch = 100
set f_roll = 100

beacon RX_SET
set small_angle = 180
set pid_process_denom = 1
set vbat_pid_gain = ON
feature ANTI_GRAVITY

set gyro_lowpass2_hz = 0
set dyn_filter_range = HIGH
set dshot_idle_value = 250

```

## ff_boost

这是一个出色的新功能，可显著减小快速设定值变化时的延迟。

多数电机加、减速都需要时间。在动作刚开始时，所需的推动力大于动作中段。FF 和 P 在动作开始时都会缓慢爬升，因为手指起初移动较慢，而且大多数飞手会在 Rates 中使用 Expo。因此，除非使用很高的 FF 增益（250+），否则电机此前得不到所需的即时推动。但在这种 FF 增益下，过冲难以控制，尤其 SuperRate 会在摇杆末端生效，使 FF 恰好在飞行器需要开始减速以避免过冲时增强动作。

`ff_boost` 是一个与摇杆加速度成比例的 PID 参数。从技术上说，它是 Setpoint 的二阶导数。

### Setpoint Weight（已过时，> 4.x；新方式：FeedForward）

- setpoint 是由*摇杆位置*命令的旋转角速度，单位为*度每秒*。
- Measurement 是由*陀螺仪*报告的旋转角速度，单位为*度每秒*。
- 这里只讨论 Acro/Rate 模式，不讨论自动调平。

* 0.5 可能过于迟缓。
* 2.0
* D26/26 SW1 == FF 100

* _HIGH_ -> 更激进，每次摇杆动作都会立即复制 - 255
* _LOW_ -> 更发黏 / 更平顺，适合自由式 - 0（此时需要更多 D）

### Setpoint（已弃用）/ FeedForward transition

- 摇杆回中时降低权重。
- 0.15 = 摇杆行程的 15% 更平顺。

- 大幅推油门时机头上仰/下俯，应提高 AG。
- 修改它相当于虚拟的 `I` 增强器。

## I 项旋转

在连续偏航滚转、漏斗等动作中，四轴发生旋转时，将当前 I 项矢量正确旋转到其他轴。LOS 特技飞手尤其重视此功能。

## I 项放松

在快速摇杆动作时减少 I 项累积。它可显著减少翻滚或横滚后的 I 项回弹，并允许使用比以往更高的 I。**通常 I 可提高 50% 或更多，从而改善湍流飞行和高速接近旗门时的方向稳定性。**

- _LOW_ -> 手感更松（10）（即使不使用 FeedForward 也是如此）。
- _HIGH_ -> 更硬（尤其适合自由式跟拍动作）。
- **开启 I-term relax** = 减少翻滚和横滚结束时的回弹。
- 竞速类设置中可明显感受到其效果。

自由式：

- Cutoff: 10
- Type: Gyro

竞速：

- Cutoff: 20
- Type: Setpoint

## Integrated Yaw

Integrated Yaw 用于修正四轴控制中的一个基础问题：俯仰和横滚通过桨叶产生的推力差控制，而偏航不同。Integrated Yaw 在将偏航 PID 输出送入混控器之前对其积分，以修正这一问题。这会使 PID 的工作方式标准化，从而可以像调校其他轴一样调校偏航。它要求使用绝对控制，因为启用 Integrated Yaw 后不需要 I 项。

## I-term relax 类型

限制快速运动发生时 I 项的累积。这尤其有助于减小横滚及其他快速动作结束时的回弹。可以选择生效的轴，并选择以 Gyro 还是 Setpoint（摇杆）检测快速运动。

- **Gyro** = 更适合自由式飞手（擅长处理回弹，转弯表现较差）。
  - 使用基于摇杆动作变化速率的高通滤波器。
  -
- **Setpoint** = 更适合竞速和通用用途（回弹表现较差，转弯表现较好）（但应自行试验）。
  - 翻滚后落点更好。
  -

### I-term relax cutoff

- 较低值可带来更松的摇杆手感，替代高 FeedForward。
- 手感不再僵硬。
- 默认 20，常用 15 - 10。

## Anti Gravity

用于修正快速移动油门摇杆时，飞行器机头上仰或下俯的问题。
`0 - 30`

Anti Gravity 在检测到快速油门变化时增强 I 项。更高的增益可在快速推拉油门时提供更好的稳定性和姿态保持。

- Throttle Mid 0.5
- Throttle expo 0

## TPA（Throttle PID Attenuation，油门 PID 衰减）

TPA 会随着油门增加降低 PD 增益的有效性（默认仅 D 项）。

TPA 本质上允许调校较激进、手感锁定的多旋翼，在油门超过 TPA 阈值/断点后降低 PID 增益，从而消除快速振荡。

- tpa_mode: PD/D（默认只作用于 D 项）
- tpa_rate: TPA 0.6 表示满油门时 PID 降低 60%。
- tpa_breakpoint: TPA breakpoint 1250(25%) - TPA 开始生效的油门值。

![TPA](https://user-images.githubusercontent.com/15355893/165534786-978e3129-04e6-4943-9be0-bcc79ed3d622.png)

可改善桨流扰动（提高 D 增益之前，先提高 TPA）。

# 油门限制

避免达到 100% 油门。

- scale / clip
- throttle limit（百分比）

# 遥控频率与系统

- Taranis 2,4Ghz（出厂标准）。
- Crossfire 900MHz（距离更远 / 更昂贵）。

# 分析工具

- Blackbox Explorer
- PID Toolbox
- Plasmatree
- blackbox-tools

## BLACKBOX EXPLORER

使用 UAV-Tech 的 JSON 文件以获得最重要的视图：
https://drive.google.com/drive/folders/1hWgcADCI3Aa4XLUiGsGQbPHxdkE94taP

1. 整体飞行表现。
2. PID 工作情况。
3. 桨流扰动评估。\*

- 陀螺仪如何跟随设定值。

4. SAND BOX
5. 平滑。
6. SAND BOX
7. 偏航评估。

- 回弹。

8. 俯仰评估。

- 回弹。

9. 横滚评估。

- 回弹。

0. 噪声分析。

- 噪声轨迹。

# Debug 模式（在记录器中记录滤波器）

通常可以使用 `set debug_mode = GYRO_SCALED`。

- 获取 debug。
- set gyro_filter_debug_axis = ROLL
- set rc_smoothing_debug_axis = ROLL
- set acro_trainer_debug_axis = ROLL
- set osd_debug_pos = 2049
- set debug_mode = GYRO_SCALED
- `set debug_mode=gyro_raw`
- `set debug_mode=notch`
- `set debug_mode=fft`
- `set debug_mode=gyro`
- `set debug_mode=dfilter`

- 若 PID-error 为零，则四轴调校完美（有风时也如此）。
- D 项应平顺（无噪声），否则无法处理桨流扰动。

### I 项

- 低于零时，四轴相对更偏重右侧。
- 高于零时，四轴相对更偏重左侧。
- 有风天也可能出现该现象（外力）。
- 是乘以增益后的陀螺仪值。

### PID 误差

- 是设定值与陀螺仪值的偏差。
- “完美调校的四轴”PID 误差始终为零。
- 陀螺仪应精确跟随设定值。
- 开始急速俯仰或横滚时误差最大。
- 桨流扰动也会产生 PID 误差。
- 它驱动 PID。

### PID SUM

- 是 Setpoint 减去 Gyro。

# 调校技巧

TL;TR，来自 https://oscarliang.com/quadcopter-pid-explained-tuning/

一次只调一个轴：先横滚，再俯仰，最后偏航。每次修改数值后，都应问自己：“变好了还是变差了？”应找到飞行器具有最佳飞行特性的峰值，再避免性能继续下降。

P 增益过低：缓慢振荡。
P 增益过高：非常快速的振荡。

精调至飞行器感觉灵敏、敏捷，同时确保没有过多振动。也应倾听电机声音：电机抽动是 P 增益过高的迹象，即使相机画面未必可见。

若四轴在低至中等油门飞行正常，仅在高油门振荡，提高 TPA 会有帮助。

执行一次大幅拉升，观察是否有快速振荡；若有，提高 TPA。良好的 TPA 会使拉升相对平顺。我个人不会使用超过 0.4 的 TPA，否则四轴在高油门时可能感觉“松”。

进行翻滚、横滚等激烈动作后，若飞行器在动作结束时过冲再回弹，请提高相应轴的 D。

提高 D 增益也可减小桨流扰动（下降时的振荡）。

请谨慎：过高 D 增益会引入振荡并使电机发热，因此只应使用足以最小化桨流扰动的数值。D 项过多的另一迹象是横滚或翻滚结束时出现快速振荡。

注意，要消除翻滚或横滚结束时的回弹，也可使用下一节将介绍的 Setpoint Transition。

向左、向右倾斜四轴，观察能否良好保持角度。理想情况下，松开横滚摇杆后应保持同一姿态。若飞行器无法保持角度，可能表示 I 增益过低。

四轴会随风漂移，因此在有风天可视情况稍微提高 I。

建议将 I-term 设为刚好足以保持水平的数值；I 过高会带来僵硬、机器人化的手感，甚至振荡。

**Setpoint** 是命令的横滚速率。
**Gyro** 应尽可能跟踪 Setpoint（有风天时亦然）。

## PID 工作过程简述

D 项始终与 P 项对抗：

- P 上升时，D 变高。
- P 降低时，D 也再次变高。

## PID Toolbox

https://github.com/bw1129/PIDtoolbox/wiki/PIDtoolbox-user-guide

PID-error = Setpoint - Gyro

## 引脚 / 资源

- `resource`
- `resource show` `resource list (bf 3.x)`：显示正在使用的引脚（例如 LedStrip、I2C）。
- `resource i2c_scl 1 none`：取消当前 I2C 分配。
- `resource led_strip 1 none`：取消当前 LedStrip 分配。
- `resource camera_control B06`：使用你的 PIN ID。
- `resource list`：检查修改是否生效。
- `set camera_control_key_delay = 125`
- `save`

# 列出与默认设置的差异

`diff`

# CameraControl

### Mamba F405（FURYF4OSD）

- 1kohm 电阻。
- `resource LED_STRIP 1 NONE`
- `resource CAMERA_CONTROL 1 A00`
- `set camera_control_ref_voltage = 300`
- `set camera_control_key_delay = 150`
- `set camera_control_internal_resistance = 100`

camera_control_button_resistance = 450,270,150,68,0
->>> 测得 450,270,150,68,0

# Crossfire

CF Nano RX：

- Ch1 - RX
- Ch2 - TX
- Ch4 - LQ（用于 RSSI）

# SmartAudio

SmartAudio 使用一个 UART。

SBUS - RX
Smart Port - TX

## 协议

# 遥控设置

**1RSS** - 天线 1 上行信号强度 - 接收信号强度天线 1（RSSI）

**2RSS** - 天线 2 上行信号强度 - 接收信号强度天线 2（RSSI）

**TRSS** - 发射机遥控信号强度（下行信号强度）

**RQly** - 上行 - 链路质量（有效数据包）（接收机链路质量）

**RSNR** - 上行 - 信噪比 - RX 上行 SNR - 上行 - 信噪比

**TQly** - 下行 - 链路质量（发射机链路质量）

**TPWR** - 发射功率（发射功率）

**TSNR** - 发射机下行 SNR - 下行 - 信噪比

**FM** - 飞行模式

**RFMD** - 更新频率：0 = 4Hz；1 = 50Hz；2 = 150Hz

**GPS** - GPS 坐标

**GSpd** - GPS 速度

**Hdg** - GPS 航向

**Alt** - GPS 高度

**Sats** - 卫星数量

**Ptch** - MFD 俯仰角

**Roll** - MFD 横滚角

**Yaw** - MFD 偏航角（相对于正北？）

**RXBt** - 接收机电池电压

**Curr** - 电流（0.00 A）

**Capa** - 容量（0 mAh）（电池容量）

**VFAS** - 飞控电压

# BLHeli 设置

基本就是这些：

- _PWM Frequency: 48KHz for freestyle_；竞速使用默认值（或更高）。
- _Motor Timing: 22 or Auto for freestyle_；竞速使用 25（或更高）。
- ESC 协议：DShot1200 或 Multishot。

# 电机

2200KV == 每 Volt 2200 rpm
KV == *V*elocity *C*onstant（科学记号中的 K）

## 重映射电机

输入 `resource`。

示例：假设 1 和 4 错误。

```text
resource MOTOR 1 B01
resource MOTOR 2 A02
resource MOTOR 3 A03
resource MOTOR 4 B00
```

先取消 1 和 4 的映射，再按以下方式重新映射：

```text
resource MOTOR 1 none
resource MOTOR 4 none
resource MOTOR 1 B00
resource MOTOR 4 B01
save
```

完成。

## 将 Super Mario 设为启动声音

### 电机 1

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### 电机 2

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### 电机 3

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

### 电机 4

```text
Set Music On
Set Gen. Length 5
Set Gen. Interval 0
Paste these notes:
C6 8 G5 8 C6 8 E6 8 G6 8 C7 8 G6 8 G#5 8 C6 8 D#6 8 G#6 8 D#6 8 G#6 8 C7 8 D#7 8 G#7 8 D#7 8 D6 8 F6 8 A#6 8 F6 8 A#6 8 D7 8 F7 8 D7 8 F7 8 A#7 8 F7 8
```

# 双向 DShot

更新 BLHeli 并升级至最新固件。
统计电机磁铁数量，并在 Betaflight App 中填写。
设置 Dshot 300/600。
进入 Motors 选项卡，连接电池，确认错误率（百分比）**必须为 0%**（未连接电池时为 100%）。
进入 Filter 设置并开启 Gyro RPM Filter。
Harmonics 设为 1（多数情况）（**但应设为 3**）。

现在可以使用动态陷波监测除电机外的噪声（松动线缆、螺丝等）。
将 Dyn filter range 设为“low”。
Q 设为 200。

进行一次短暂试飞；若电机凉或只是微温，可将 “Gyro Filter Multiplier” 和 “D term Filter multiplier” 向右调节以减少滤波。
不要使用非常新的桨叶（避免滤波过少）。

##### 也可使用以下设置

移除其他滤波器（仅 Version == 4.0）。
d-term lp 1 dyn min cutoff 60
d-term lp 1 dyn max cutoff 175

# VTX

根据我过去测试 VTX 的经验，较低频率的频道通常有较高输出功率。例如在 Raceband 中，R1 通常比 R8 输出功率更高。

还需考虑发射端和接收端天线的调谐频率。假设两者均调谐至 5800MHz，则 F4（Fatshark 4）或 R5（Raceband）频道的表现更好。若调谐至 5700MHz，则最佳频道为 E1 或 R2。

# VTX 表

参见[图传表](/docs/wiki/guides/current/VTX#vtx-tables)。

### TBS UNIFY PRO 5G8 HV

### vtx

```text
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 0 1 2 3
vtxtable powerlabels 25 200 500 800
```

### master

```text
set vtx_power = 3
set vtx_band = 3
set vtx_channel = 3
set vtx_freq = 5665
```

# 个人 PID 调校

#### Trashcan

- `set dshot_idle_value = 250`（而非 450；450 过于漂浮）。
- `set throttle_limit_type = SCALE`
- `set throttle_limit_percent = 80` // 或 70 或 50

##### 油门

`set thr_mid = 0`
`set thr_expo = 25`

# Cinewhoop

## 电机

3800 没有问题。
这类 whoop 的甜点配置是 4S 使用 1407 或 1507、3600/3800kv。
使用 6S 时为 2800-3100kv。

# Banggood 包裹 / 配送

_Priority Direct_ 看起来会先合法进口到欧洲，之后从 .nl 再发货，非常快。它会*绕过欧盟以外包裹的税费*。

_European Direct_ 与 Priority Direct 相同，使用包裹公司而非普通邮件；我个人收到这些包裹时遇到过一些问题。

_Default Shipping_：所有免税（这里为低于 E21 的包裹）且可以等待的订单，我会选择默认免费配送。
_Air Parcel Register_：中国航空邮件，不一定会被征税。

_EMS_ 会被征税，但税务处理服务费应已包含在运费中。

_Expedited Shipping_ 是会收取较高海关和税务处理服务费的快递服务。

# BF 4.2

自由式设置 `set ff_interpolate_sp = AVERAGED_3`。

# 总结

1 - 横滚或翻滚回弹。如果四轴过冲后回弹，提高受影响轴的 D。

2 - 俯仰前飞时，若俯仰角变化，提高俯仰 I。若倾斜角无法保持，提高横滚 I。

3 - 缓慢振荡表示 P 项过低。

4 - 大幅推油门再收油。若出现姿态移动，增加 anti-gravity 增益。

5 - 未提高油门时机头游走，提高 I 增益。与第 2 项类似。

6 - 随油门变化而机头游走，提高 anti-gravity 增益。

7 - 急转时出现桨流扰动。提高 D 或降低 P。应在俯仰和横滚上均进行尝试。

8 - 转弯时侧滑。提高偏航 I 增益。

9 - 仅高油门振荡。提高 TPA。

10 - 若想让四轴有更强的机器人化手感，提高俯仰和横滚 I。
