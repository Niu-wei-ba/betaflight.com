# 固定翼飞机设置

### **_如需配置简易三角翼，请直接跳至页面底部。_**

有人问过 Betaflight 能否用于控制固定翼飞机。

### Boris 的说明

#### 没有人在持续测试此功能，因此我不会信赖它，但它或许可以工作。

#### iNav 分支在飞机模式上投入了大量精力，最好优先尝试 iNav。

#### 本页用于帮助希望使用 Betaflight 对固定翼功能进行实验和测试的用户。

#### 请记住：**你就是测试人员。**

请参阅 [Betaflight 资源重映射](/docs/wiki/guides/current/Resource-remapping)。
注意：引脚重映射需要 Betaflight 3.1 或更高版本。

#### AresFPV 曾在 Boris 的 ßF 讨论帖中提出此问题，随后研究了实现方法。以下是其结论：

固定翼配置成功：
对于少数尝试让 Betaflight 支持固定翼的用户，我已经在工作台上取得了一些进展。我使用 Betaflight 是因为 iNAV 当时尚未提供 piko blx 目标。以下帖子很有帮助：https://www.rcgroups.com/forums/showpost.php?p=36886595&postcount=45058

将机型类型设为 `WING`。

核心做法是：使用 CLI 的 `resource` 命令，将正确的舵机映射到飞翼上原本分配给电机 3 和电机 4 的引脚。
如有需要，可在 Servos（舵机）选项卡中反转舵机。
将 PWM 频率设为与 PID 环路分离，并设为 50 Hz，使模拟舵机能够工作（这样会失去所有新式 ESC 协议，但对固定翼而言通常不重要）。
现有模式和混控对我可以直接使用，其他功能预计也能正常工作（例如 OSD）。接下来只需加装 FPV 设备并试飞。

---

#### Maine_Guy 的说明，2020-01-25

下方笔记虽然有参考价值，但并未直接解决我让 4 通道微型 F4 飞控板工作的需求；最终是坚持、运气和最新构建版本解决了问题。

新版 Betaflight 支持定时器重映射，可能可以缓解下文提到的定时器冲突。

--混控器设置为

`mixer CUSTOMAIRPLANE`

--保留电机 1 的原始分配

`resource MOTOR 1 B00`

--将电机输出 2 至 4 重新分配为舵机

`resource SERVO 1 A02`

`resource SERVO 2 A03`

`resource SERVO 3 B01`

--电机混控

`mmix 0  1.000  0.000  0.000  0.000`

--舵机混控（这是经反复试验得到的配置，因为舵机输出似乎与预期不符，但它可以工作）

`smix reset`

`smix 0 3 1 100 0 0 100 0` //

`smix 1 2 0 100 0 0 100 0` //

`smix 2 4 2 100 0 0 100 0` //

`smix 3 0 3 100 0 0 100 0` //是否需要这一项尚不确定

--最后，重映射 B01 上的定时器

`timer B01 AF1`

---

#### RCvehicleGuy 的帖子

我曾尝试让 Betaflight 用于飞机，但它显然并非为此设计。我的目标是利用 `resource` 命令，将 Naze 飞控上的电机输出 1 至 4 分配给舵机 1 至 4；然后通过自定义 `smix`，分别把稳定横滚、稳定俯仰、RC 油门和稳定偏航分配给各输出，类似 Futaba 遥控器。听起来很简单，但我昨晚始终没能让它工作。我认为某个环节存在问题。这些组合大概没有得到测试，因为 Betaflight 的设计目标是特技四轴飞行器，实际测试也基本都在特技四轴飞行器上进行。

我认为关键在于 `smix` 命令：要么它没有按预期工作，要么是我对其理解不足。等有更多时间后，我会再次尝试。
因此，如果先重置 `smix`，要把稳定横滚输出至舵机 1，我认为命令应类似于：
smix 0 0 0 100 0 0 100 0，或接近这个形式。其含义是规则 0、舵机 0（即舵机 1）、源 0（PID 横滚）、100（速率）、0（空速）、0（最小值）、100（最大值）、0（Box，不清楚其含义）。
如前所述，我会继续尝试。我也试过 iNav，但没有 `resource` 命令时，我无法将舵机 1 映射到电机输出 1，或者至少不了解应如何实现。

第 2 部分：
好的，更新一下：我的 Naze32 输出已可提供稳定横滚、俯仰和偏航，适用于典型的三舵机、四通道飞机。
我使用 1 kHz 循环和 PID 环路时间。本想将电机输出 4（资源 B07）用作方向舵，但它在我的 Naze 上似乎无法工作，因此改用输出 3，并决定把接收机的油门输出直接接入。施加油门时观察 PID 积分项累积很有意思：设定点变化时累积得更明显，飞控板移动时则几乎不累积。这可能带来有趣的飞行特性。我很期待将它装到 Crack Laser 上试飞，看看它会怎样改变飞行表现。完成滚滚后松开副翼，积分项累积却让飞机额外继续滚三圈左右，应该会很有趣，哈哈。

我更关注自稳模式的应用。对于刚接触飞机的用户，或者临时想试飞的朋友，可用的自稳模式很有价值。至少对小型 3D 泡沫机而言，原本灵敏的特技机可以借助自稳模式变成近似三通道教练机。

等我将其安装到飞机上、完成反向设置并试飞后，会再更新。
以下是我的 `smix` 截图：
https://www.rcgroups.com/forums/showthread.php?2464844-Betaflight-Flight-Controller-Firmware-Discussion-Thread/page3040#post36958637

smix 0 2 0 100 0 0 100 0
smix 1 3 1 100 0 0 100 0
smix 2 4 2 100 0 0 100 0
smix 3 5 7 100 0 0 100 0

第 3 部分：
的确，完成滚转动作后飞机还会继续滚三圈，哈哈。我已将 I 项设为 0。原本我理解为 I 项会衰减，随着误差积累会逐步减弱，累积误差在一段时间后会被消除。
我会继续调校。我确实把陀螺仪装到一架原本飞得很好的飞机上，也许根本无法让它变得更好。

第 4 部分：
我得出的结论是：飞机其实并不需要陀螺仪稳定。我仍会继续研究，因为这很有趣，而且飞机确实能飞。到目前为止，唯一比较巧妙的效果是为点滚提供硬停止。
目前 D 值为 3，但其阻尼效果仍然过强。接近目标角速度时，D 项会介入并降低角速度。先将 D 设为 0，再稍微提高速率。
提高速率并移除 D 项后，配置开始合理了。我会降低副翼的 P，再重新加入一些 D，看看表现如何。飞行感觉有点奇怪，后续再观察是否能调好。

第 4 部分：
飞行体验很有意思。我认为它更适合不太受 Naze32 额外约 7 g 重量影响的机体。效果不算糟，但能感觉到额外载荷。我的机体是 Twisted Hobbies Crack Laser，一款用于 3D 特技飞行、全机重量约 160 至 170 g 的 EPP 飞机。我飞 3D 泡沫机很多年了，这也是我最擅长的项目。自稳模式能工作，但还需更细致地调校。对于飞机，特别是这种平翼泡沫机，升降舵对俯仰的控制并不与舵机行程成正比，因此需要调校。横滚轴效果很好，但俯仰轴控制力不足。在已设 45 度角度限制的情况下，我必须一直将摇杆拉到底，机头才会抬到足以维持飞行。若要让飞机上的自稳模式真正好用，Angle 模式的强度参数可能需要将俯仰和横滚解耦。当地天气转坏，可能要数天后才能继续调整这些设置并确认能否良好工作。
我需要试验 D 项和 D 设定点权重。最有意思的应用，是让滚转停顿产生异常利落的效果。

实际来看，在此类飞机上使用陀螺仪往往是弊大于利，不过实验过程很有趣。我认为这类飞控板最适合四轴飞行器，也希望后续能有人继续试验，让直升机也能工作。

我使用的 `smix` 如下：
`# smix`
`smix 0 2 0 100 0 0 100 0` /_将 PID 横滚关联到电机输出 1_/
`smix 1 3 1 100 0 0 100 0` /_将 PID 俯仰关联到电机输出 2_/
`smix 2 4 2 100 0 0 100 0` /_将 PID 偏航关联到电机输出 3_/
`smix 3 5 7 100 0 0 100 0` /_尝试将 RC 油门关联到电机输出 4_/

该 `smix` 适用于单舵机副翼、升降舵和方向舵。设计目标是让前三个舵机使用前四个输出中的三个，并让 ESC 使用第 4 个输出。对我的 Naze 而言，可能是飞控板或代码的问题，我无法让电机输出 4 输出任何信号。最终我将油门直接接到接收机，这也可以正常使用。但双副翼机型需要将电机输出 4 用于第二个副翼，或在需要额外输出时使用它。
如需了解 `smix` 各参数的含义，可搜索 `cleanflight smix`，其中有较好的说明。
针对飞翼 `smix`，应该也有相关的视频教程。

我的资源配置如下：
`# resource`
`resource SERVO 1 A08`
`resource SERVO 2 A11`
`resource SERVO 3 B06`
`resource SERVO 4 B07`
这些通常是电机 1 至 4 所使用的资源。有意思的是，如 Betaflight App 的 Servos 选项卡及 `smix` 命令所示，`resource` 命令中的所有舵机标签值，比 `smix` 和 Servos 选项卡中使用的值小 1。这是一个可以修复的问题。为舵机分配资源时，必须使用 1 到 8 之间的索引。我曾尝试用舵机 0 和 -1 来补偿这种差异，但系统不允许。
这些资源应仅适用于 Naze32。其他飞控板的 IO 可能不同，可利用 `resource` 命令确定应将舵机分配到哪里。你可以查看电机 1 至 4 目前分配的资源，并在相应位置改为舵机。

问题：
顺带一提，我遇到过 BF CLI 的问题。有时显示顶部会出现乱码，偶尔还会发生其他异常。我给 Naze 刷入 Cleanflight 后，其 CLI 显示整齐清晰。这并不表示 Betaflight 不能工作，只是显示有些奇怪，特此说明。
`smix` 似乎仅适用于 `mixer customairplane`。使用 `mixer custom` 时，我无法让舵机工作。
如上所述，只有前三个电机输出有反应，我无法让第四个工作。最后两个**可能**可用，但我目前未在飞控板上焊接引脚。
我不知道 Betaflight 是否有舵机更新频率参数，但若有，对飞机会很有用。数字舵机可使用 200 至 300 Hz 更新频率。针对未来的直升机应用，我知道部分尾舵机的中立脉宽更小，大致介于 OneShot 与 PWM 之间。

以上就是我目前对 Betaflight 和飞机使用方式的全部了解。

#### touchthebitum 的帖子

这不是一个很出色的视频（第一次进行目视飞行测试），它仅用于说明 Betaflight 可以相当好地用于固定翼。
我对 ACC 模式下的着陆速度印象深刻。当时风很大，约为 20 km/h。
https://youtu.be/DpmqeoRGwgA

---

# EPP 泡沫飞机上的 Betaflight 兼容飞控

#### 作者：etheli

我想在一架 28 英寸 EPP 泡沫飞机上安装 Betaflight 兼容飞控，以获得 OSD、FrSky SBUS 接收机支持、便捷的 VTX 频率配置和稳定飞行模式。经过一些研究和调整，我得到了一套适合飞机的 Betaflight 配置。该配置在 F3 Omnibus 飞控板上的接线如下：

[![BF_plane_wiring](http://www.etheli.com/FPVFoamCombat/files/Flip32F3Omnibus_plane_wiring_s.png)](http://www.etheli.com/FPVFoamCombat/files/Flip32F3Omnibus_plane_wiring.png)

我使用 Betaflight v3.3.3，并以 `CUSTOMAIRPLANE` 模型/混控类型为起点。资源分配如下：

`resource MOTOR 1 B08  # motor PWM1 <- Throttle`
`resource SERVO 1 A02  # motor PWM4 <- Elevator`
`resource SERVO 2 A03  # motor PWM3 <- Aileron`
`resource SERVO 3 B07  # motor PWM7 <- Aileron2`
`resource SERVO 4 B06  # motor PWM8 <- Rudder`
`resource SERVO 5 B04  # SBUS/PPM <- Camera tilt  [AUX2 (ch6)]`
`resource SERVO 6 A08  # ledstrip <- AUX3 (ch7)`

`# Rule    Servo    Source    Rate    Speed    Min    Max    Box`
`smix 0 2 1 100 0 0 100 0   # Servo 1 Elevator <- Stabilized pitch`
`smix 1 3 0 100 0 0 100 0   # Servo 2 Aileron <- Stabilized roll`
`smix 2 4 0 100 0 0 100 0   # Servo 3 Aileron2 <- Stabilized roll`
`smix 3 5 2 100 0 0 100 0   # Servo 4 Rudder <- Stabilized yaw`
`smix 4 6 9 100 0 0 100 0   # Servo 5 <- RC AUX2 (ch6)`
`smix 5 7 10 100 0 0 100 0  # Servo 6 <- RC AUX3 (ch7)`

受内部处理器定时器限制，PWM2 输出无法驱动舵机，只能驱动电机。任何需要的舵机反向均应在飞控中完成，而非在发射机中完成。舵机反向命令如下：

`smix reverse 2 1 r   # reverse Servo 1 Elevator`
`smix reverse 3 0 r   # reverse Servo 2 Aileron`
`smix reverse 4 0 r   # reverse Servo 3 Aileron2`
`smix reverse 5 2 r   # reverse Servo 4 Rudder`
`smix reverse 6 9 r   # reverse Servo 5 RC AUX2 (ch6)`
`smix reverse 7 10 r  # reverse Servo 6 RC AUX3 (ch7)`

我的配置中需要反转升降舵和方向舵。包含基础配置的文件请参阅[这里](http://www.etheli.com/FPVFoamCombat/settings/diff_Flip32F3Omnibus_plane_basic.txt)。

飞机在陀螺仪稳定的 Acro 模式下飞行良好。调校时，我需要降低大部分数值以抑制振荡，并提高舵机的 `rate` 值以提升操纵响应：

`set p_pitch = 40`
`set i_pitch = 40`
`set d_pitch = 25`
`set p_roll = 25`
`set i_roll = 25`
`set d_roll = 15`
`set p_yaw = 50`
`set i_yaw = 30`
`set roll_srate = 100`
`set pitch_srate = 80`
`set yaw_srate = 80`

要使自稳飞行模式良好工作，在 Betaflight 中校准加速度计时，应将飞机置于略微机头上仰的姿态。也可以在该方向上微调校准。该飞机的完整装机文章发布在[这里](http://www.etheli.com/FPVFoamCombat)。

---

# 用 Betaflight 配置**三角翼**（使用 Betaflight F3）

#### 作者：DangerFlite

我阅读了上文，并跟随 rcgroups 讨论帖，尝试让 Betaflight F3 在我的三角翼上使用简单的 Rate 模式。遇到问题的原因如下：

- 我并未使用 Naze32，因此上面的资源分配不适用。
- 我只使用两个升降副翼，因此上面的混控并不适用。
- Betaflight 的舵机编号容易令人困惑：在 Betaflight 各处，升降副翼似乎是舵机 3 / 4；但分配资源时，它们被称为舵机 1 / 2。
- 实际配置比看上去简单得多。本指南旨在帮助没有相关经验的用户。

目前，飞控在 Passthrough（手动飞行）、Acro/Rate（稳定）和 Angle（自稳）模式下都工作良好。即使使用 Passthrough 模式，BF F3 仍然很有价值，因为它可以支持 SBUS 接收机、遥测、电池监测和优秀的 OSD。

#### 接线配置

- 将 ESC 连接到 Betaflight F3 的 `M1` 焊盘（下图中的 1/2）。
- 将左侧升降副翼舵机连接到 Betaflight F3 的 `M3` 焊盘（下图中的 3）。
- 将右侧升降副翼舵机连接到 Betaflight F3 的 `M4` 焊盘（下图中的 4）。

![betaflight mixer](http://i.imgur.com/EU7EVEJ.png)

#### Betaflight 设置

- 为 Betaflight 刷写固件时执行全芯片擦除。
- 按常规配置 Ports、Receiver 和其他设置。
- 在 Configuration 选项卡中，选择 `Flying Wing` 混控器类型。
- 在 CLI 选项卡中，执行以下命令以启用舵机：
  > resource servo 1 b08

> resource servo 2 b09

> save

- 在 Servos 选项卡中，如有需要，将舵机 **3** 或 **4** 的 rate 设为 -100，以反转舵机（假定需要 100% 行程）。
- 在 Modes 选项卡中，设置解锁开关。
- 在 Modes 选项卡中，为手动飞行设置 Passthrough 模式（无稳定），并为自稳设置 Angle 模式（正确调平后很有用）。建议保留 Passthrough 模式，以便发生异常调校问题时能够接管控制。

# 用 Betaflight 配置**三角翼**（使用 Matek F405 和 Matek FCHUB-W PDB）

#### 作者：druckgott

#### 接线配置

- 将 ESC 连接到 Matek FCHUB-W PDB 的 `M1` 焊盘。
- 将左侧升降副翼舵机连接到 Matek FCHUB-W PDB 的 `SV3` 焊盘。
- 将右侧升降副翼舵机连接到 Matek FCHUB-W PDB 的 `SV4` 焊盘。

![betaflight mixer](http://i.imgur.com/EU7EVEJ.png)

现在需要将舵机映射到这些引脚：

> resource servo 1 C07
> resource servo 2 C08
> save

现在即可工作。

#### 一些故障排查和补充说明

如果飞机的横滚响应正确，但俯仰响应方向错误（或相反），请交换两个舵机的资源分配。

我的 ESC 完全无法工作，尽管飞控设为 Quad X 配置时它工作正常。以下配置解决了问题。根据 ESC 支持的协议，你也许可以保留 `MULTISHOT125` 或某种 `DSHOT` 设置；问题应该与定时器有关。无论选择何种 ESC 协议，舵机都可以工作。

- _Configuration 选项卡 > 将 ESC/Motor protocol 设为 `PWM`†_
- _Configuration 选项卡 > 启用 `Motor PWM Separated from PID Speed`†_
- _Configuration 选项卡 > 将 `Motor PWM Frequency` 设为 480 Hz†_

我尝试过的所有 PID 环路 / 陀螺仪更新频率组合，结果都相同。

我必须显著提高俯仰/横滚 P，并几乎完全禁用 I 项，才能让飞翼感觉足够灵敏，同时避免严重超出目标姿态。D 基本保持原来的设置。能利用 OSD 在场地内配置这些参数非常方便。
