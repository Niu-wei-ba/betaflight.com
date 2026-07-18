# DShot 和 BetaFlight 3.1

:::note
这是一份无数据说明，描述了 DShot 在 3.1 中的早期引入。

DShot 是新的，目前代码正在开发和测试中。由于存在许多依赖性，并且并非所有当前硬件都可以工作，因此这是为了帮助跟踪。

DShot 的官方主题是：https://www.rcgroups.com/forums/showthread.php?t=2756129
请阅读此主题以了解其工作原理和最新信息的详细信息。该线程的第一篇文章包含所有需要的代码和其他信息的链接。关于 DShot 和 ESC 协议的好文章在这里：
https://blck.mn/2016/11/dshot-the-new-kid-on-the-block/

Joshua Bardwell 的 ESC 协议视频：
https://www.rcgroups.com/forums/showpost.php?p=36552970&postcount=2765

在 DShot 主题中，有一篇关于如何重新刷新 ESC 和 FC 的文章：
https://www.rcgroups.com/forums/showpost.php?p=36200950&postcount=1468

对于 KISS FC 和 ESC，请参阅 KISS DShot 线程：
https://www.rcgroups.com/forums/showthread.php?t=2780055

[BetaFlight V3.1 发布](/docs/wiki/release/older/Betaflight-3-1-Release-Notes)
请记住，这仍然是实验代码，可能有严重的限制。
请阅读此处，了解正在解决的固件问题和功能：
https://github.com/betaflight/betaflight/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc

建议使用地面站的最新开发版本。

### 一些已知的限制是：

3.1 似乎大多数问题都已修复。现在发现的任何问题都应该在 3.1.X wiki 页面中。

- 所有 STM32F1 目标不支持 DSHOT
- 某些带有信号过滤器盖的 ESC 在取下盖后可能无法工作。
- 某些目标的电机和 LED 之间存在 DMA 冲突。有些有解决方法，但有些则没有。如果未列出解决方法，则禁用 LED 并联系 FC 设计者/支持人员。
- 没有 DShot 适用于 HEX 直升机的报道。

### 快速确定烧录到 FC 的固件是否支持 DShot 的方法：

转到 CLI 并输入“get pwm”。所有名称中带有“pwm”的设置都将与所有选项一起显示。
如果 DSHOT150、DSHOT300、DSHOT600 不在“motor_pwm_protocol”列表中，则该固件不支持 DShot。
不支持 DShot 的目标示例：

motor_pwm_protocol = ONESHOT42
允许的值：OFF、ONESHOT125、ONESHOT42、MULTISHOT、BRUSHED

### 设置最小油门

注意：在固件 3.1.1 及更早版本中，min_check 和 min_throttle 会影响 DShot 怠速值，因此调整电机怠速并不简单。如果运行这些早期版本的固件，请尝试使用默认值，然后调整“digital_idle_percent”，直到电机达到所需的速度。
这个问题在 3.1.2 及更高版本中得到修复，因此现在 digital_idle_percent 仅设置 DShot 空闲速度。
请注意，DShot ESC 可以以低得多的速度运行电机，但如果怠速太低，电机可能会在剧烈机动时在飞行中失速，从而导致“死亡翻滚”。如果发生这种情况，请增加 digital_idle_percent 的值。

##### Cheredanine 关于在 ßF 3.1.2 及更高版本中设置 IDLE 的帖子：

好吧，第一点 - dshot 不使用最小和最大油门，你不需要这样做。
第二点 - 当不使用最小和最大油门时，您应该从 bf 进行校准，而不是在 blheli 中手动设置。
有人可以解释一下我是否需要输入“digital_idle_offset”命令吗？
那么让我们来处理你的问题。
要检查数字空闲应设置为什么值，请连接到地面站，转到电机选项卡，拆下桨叶。单击页面中间的小复选框，显示您已取下桨叶，您知道自己在做什么，您对自己的行为承担全部责任，并且无论如何您认为手指毫无意义。

然后将锂聚合物电池插入四核（始终使用限流器）。单击主滑块并使用键盘上的向上箭头将主滑块一次增加一个点，直到到达所有 4 个电机刚刚开始旋转的点，我不是指抽搐、卡顿或启动停止，我的意思是它们旋转的最低值，它可能约为 1010，如果不是，请不要担心，但我将使用该数字作为示例。

现在，您可以将主滑块调回零并拔下锂聚合物电池。

取该数字（例如目的 1010）并添加 30 个点（因此在示例中我们现在为 1040）。
我们不需要计算出油门范围的百分比，我不知道你的数学能力，如果这有点勉强的话，很抱歉。
减去 1000，然后除以 10

所以在例子中：
1040-1000=4040/10=4

转到地面站中的 cli 选项卡
单击底部的框并输入：

设置 digital_idle_percent = 4

（将 4 替换为您在计算中得出的数字空闲值）
按回车键，您将在上面的后面看到处理的命令，
然后再次单击该框并键入

保存

按回车键并完成

### ESC 校准和最小/最大油门

带有 DShot 的 ßF 固件不使用 min_throttle 或 max_throttle 设置，这些将被忽略。
只需确保在 ESC (BLHeli Suite) 中，PPM_MIN_THROTTLE 设置为 1000，PPM_MAX_THROTTLE 设置为 2000。
注意：BLHeli_S 16.43 及更高版本中不需要此操作，因为 PPM_MIN 和 MAX 值不用于 DShot。

**这意味着当使用 DSHOT 时，不需要 ESC 校准。只需选择 DSHOT。**

#### 不同 dshot 版本支持的最大 ESC 更新速度：

##### 警告：由于处理器任务、FC 和/或 ESC，最大更新速率可能不起作用 -

##### 没有桨叶和限流器的测试。

理论速度要高得多。固件中的速度受到限制，以便在信号之间提供更多的传播。

- DSHOT150：最大 4kHz
- DSHOT300：最大 10,6kHz（10,6khz 仅适用于 32khz 陀螺仪板）
- DSHOT600：最大 16kHz
- DSHOT1200：>32khz max（目前仅 KISS24 支持 DSHOT1200）

注：当 DSHOT 启用时，Unsyced PWM 被禁用。 DSHOT 始终以 PID 循环速率运行。

#### Dshot 数字值：

0 = 上锁。
1 至 47 = 保留用于特殊命令。
48 至 2047 = 主动油门控制。

### 最初由 airmaxx23 发表

我最近完成了使用 BFF3 控制器和 Armattan 20a ESC（启用 DShot 300）的新四核构建。我注意到的第一件事是，当我插入电池时，ESC 音调不同步，并且我偶尔会出现翻转/滚动死亡的情况。我应该先检查什么？

#### AILERON8 的回答

我一直在重新加载 BLHeli 地面站并重新刷新 ESC，然后将 ESC 设置为 MS，同步我的 FC/ESC 循环并进行校准。然后我就回到 DShot 并正常设置。不要问我为什么或者它是如何工作的，但我现在不得不不止一次地这样做，或者我会在背景中听到一首或两首遥远的 ESC 歌曲，就像你现在一样。这每次都有效，但并不是说它一定对你有效。

### DShot 是否适用于除 Quad-X 之外的其他型号，例如六轴飞行器和三轴飞行器？

如果 FC 是为他们设计的，那么他们肯定可以工作。
您需要将电机重新映射到三轴飞行器的伺服器。请参阅 SERVO_TILT wiki 页面获取帮助。
MOTOLAB 页面上还有三轴飞行器设置的信息。

### 这一切都从 DShot 线程开始（上面的链接）：

此处发布的信息均按现状提供。
它源自该论坛上的帖子（RCGroups/Boris 的 Betaflight、FC、DSHOT 和 ESC 线程）以及与用户的直接通信。

使用以下信息的风险由您自行承担

BETAFLIGHT 和 DSHOT -

由于每个目标的 DMA 引脚排列设计不同，Betaflight 可能无法支持所有目标（或特定板）。请参阅下文，了解哪些内容可能有效或无效。

### 飞控经测试可在 Betaflight 3.1 上支持 DShot，无需 Mod 或重新映射：

- AIORACERF3
- 空中机器人 F3 (SPRACINGF3)
- 外星人飞行 3
- 外星人飞行 NGF7
- 测试飞行 F3
- 蓝鸟 F4
- BrainFPV RE1（需要从 BrainFPV 存储库构建）
- Colibri Race v2.0
- 渡渡鸟 (RMDO)
- 渡渡鸟 (SPRACINGF3)
- DTFc - 构建 #389 - 在替补席上工作
- DTFC (DOGE)
- FLIP32F4
- 狂怒 F3
- 狂怒 F4
- HGLRC AIO F3 v3 (SPRACINGF3)
- 脉冲 SECF3
- KISSFC
  sskaug 的注释：KISS FC 使用电阻器将油门信号驱动为高电平（上拉）。所以它对 ESC 信号上的电容相当敏感。
- LUX_RACE
- LUXV2_RACE
- MRM Mantis F3 (SPRACINGF3) - DShot300
- OMNIBUS（Omnibus F4 怎么样？F3 和 F4 是相同的东西，但具有不同的处理器吗？）
- OMNIBUSPRO（Blheli 地面站在 3.1 中读取时挂起，在 3.01 中闪存失败）
- 赛基足球俱乐部
- REVO（和克隆）
- Rotorgeeks RG SSD
- SIRINFPV
- SOULF4 - (SOULF4) - 与 REVO.hex 配合使用
- SPRacingF3（特技/豪华）
- SPRacingF3NEO - 对所有标准电机输出的完整硬件支持 - 由电路板设计者测试。
- 玉皮 F4- X-Racer V2.1 (SPRACINGF3)
- X-Racer F303 (X_RACERSPI) -

### FC 目标可与 DShot 配合使用，但需要硬件模组并使用 Resource 命令重新映射引脚：

鲍里斯评论：
我对 MOTOLAB（和其他 FC）提出了很多要求，但并非所有电机都可以使用 DMA。我们可能会将其中一台电机分配给 PPM 引脚，以便您可以重新焊接它。不太好，但我想总比没有好吧？

##### 重新映射引脚的一般说明：

1- 所有需要使用 FC 的 PPM 输入引脚作为电机输出的 FC，因此不能使用 PPM RX。任何使用 UART 的串行 RX 都可以工作。根据 FC 板的需要正常设置串行 RX。
2- 检查下面 FC 板的引脚，其中 STM32 引脚需要重新映射。首先在 CLI 中输入以下内容是个好主意：

```
resource
resource list
```

并将它们复制/粘贴到文本文件中并保存以供默认引脚映射参考。
3- 在配置选项卡中选择 OneShot（42 或 125）。单击“保存”。保留此选择，直到重新映射引脚为止。
4- 在 CLI 类型中（x = 电机编号，yyy = STM32 引脚编号）：

```
resource ppm none
resource motor x yyy
save
```

5- 现在选择您选择的 DSHOT 协议。

请参阅：[CLI 资源命令](/docs/wiki/guides/current/Resource-remapping)

##### 外星人飞行 4

将电机 2 线移至板底部的 PPM 焊盘。您也可以直接将电机 2 信号焊盘与 PPM 焊盘连接。更新后的电路板设计可在底部添加 DSHOT 焊接跳线来实现此连接。在这种情况下，您可以将电机 2 保留为焊接输出 #2。注意：在此配置中不能使用 PPM 接收机。
如果您的控制器有 SDCard 插槽 (V2.0)，除了让电机 4 与 DSHOT 一起工作之外，您还需要使用以下命令：`set sdcard_dma=off `。
在 CLI 窗口中输入以下命令以重新映射输出：

```
resource ppm none
resource motor 2 A08
save
```

请参阅：[AlienFlightNG 支持](https://www.alienflightng.com/wiki/)

##### MOTOLAB -（MotoF3、Cyclone 和 Tempest）

将电机 1 从输出 #1 接头引脚移动到 PPM 输入接头引脚。
[有关接线详细信息，请参阅 MOTOLAB 板](/docs/wiki/boards/legacy/MOTOLAB)
按照上述操作并在 CLI 中重新映射输出类型：

```
resource ppm none
resource motor 1 A07
save
```

有关其他重映射信息，请参阅 [MOTOLAB](/docs/wiki/boards/legacy/MOTOLAB) Wiki 页面。

##### PIKOBLX - 将电机 1 重新映射到 PPM 引脚（与 MotoLab 相同）。将电机 1 信号焊接到 PPM 焊盘，使 SBUS 跳线“短路”。

为了允许使用 LED 引脚，将电机 4 重新映射到电机 5，发出 a01 信号，该信号也必须如此焊接。

注意：RX 必须使用 SBUS，因为 PPM 引脚现已重新分配给电机 1。

修改详细信息链接：https://www.rcgroups.com/forums/showpost.php?p=36608148&postcount=43149
按照上述操作并在 CLI 中重新映射输出类型：

```
resource ppm none
resource motor 1 A07
save
```

从 BetaFlight 3.3 开始，不再需要硬件模式或重新映射。

##### SPRACINGF3EVO - 必须将电机 4 移至新的引脚分配（CLI = 资源电机 4 A06）。然后将电机 #4 的 ESC 焊接到电机输出 #5，修复与电机输出 2 和 4 的 DMA 冲突。

按照上述操作并在 CLI 中重新映射输出类型：

```
resource ppm none
resource motor 1 A06
save
```

DMA 与 BB 日志记录似乎也存在冲突。 [参见 Github 问题 #2162](https://github.com/betaflight/betaflight/issues/2162) 该修复似乎是在 CLI 中禁用 BB 日志记录 DMA：
`set sdcard_dma = OFF  `
注意：SD 卡 DMA 在 3.1.6+ 上默认设置为 OFF

由于 Betaflight 3.3.x 在 F3 芯片上启用了 DMA 突发，如果启用了 dshot，我们会与 LEDstrip 发生更多 DMA 冲突。
将 LED 灯条移至电机 #8 输出，然后在 CLI 中输入以下内容以重新映射 LED 灯条输出：

```
resource ppm none
resource motor 1 B01
save
```

##### SPRACINGF3MINI - 将电机 #4 移至 PPM 引脚。然后使用资源命令禁用 PPM 并将电机 4 输出映射到 B04。

按照上述操作并在 CLI 中重新映射输出类型：

```
resource ppm none
resource motor 1 B04
save
```

限制：内部 SDCard 上的 BlackBox 可与 MultiShot 配合使用，但不能与 DShot 配合使用。

##### KOMBINI V1 - 将电机 #1 从输出 #1 接头引脚移动到 PPM 输入接头引脚。

按照上述操作并在 CLI 中重新映射输出类型：

```
resource ppm none
resource motor 1 A07
save
```

限制：不允许使用 DShot 的 LED 功能。
有关使该 FC 正常工作的视频：https://www.rcgroups.com/forums/showpost.php?p=36269451&postcount=1966

从 BetaFlight 3.3 开始，不再需要硬件模式或重新映射。 LED 灯条也能发挥作用。

##### AIORACERF3

将 MOTOR 2 移至新的引脚分配，因为它与 MOTOR 1 存在 DMA 冲突：

将电机 2 的 ESC 连接到板上的“LED”引脚。
然后重新映射电机 2 输出：在 CLI 中键入：```
resource motor 1 A08
save

```

电机 2 的新映射与 `LED_STRIP` 和 `TRANSPONDER` 冲突，因此请确保在地面站中禁用这两个功能。

##### EMAX FEMTO F3

电机 4 需要移至 fc 底部的 LED 焊盘。

`LED_STRIP` 需要禁用，然后电机 4 重新映射到该垫。

```

resource LED_STRIP none
resource motor 4 A08
save

```

Daryoon 获得 DShot 输出和 LED 灯条以同时工作：

将电机 4 连接到 PPM 板并在 CLI 中输入以下内容。
`resource ppm none  `
`resource motor 4 A15 `
`save  `

有关更多详细信息，请参阅 Github 问题 #2282 [Emax Femto (SPRACING F3EVO) - DSHOT 600 电机 4 不旋转 BF 3.1](https://github.com/betaflight/betaflight/issues/2282)。

##### BeeRotor F4 -（与六轴飞行器一起使用）电机 6 需要移至“SC”连接器上的 LED 引脚。

`LED_STRIP` 需要禁用，然后电机 6 重新映射到该引脚：
`feature -LED_STRIP`
`resource motor 6 B08`
`save`

##### AIR32 - [说明](/docs/wiki/boards/legacy/AIR32#faq-and-known-issues)

#### FC 目标报告不工作

- SPARKY2 - Oz 报告：我尝试了 DS600，只有电机 2 和 4 会旋转，1 和 3 不会旋转，我猜测电机输出 1 和 3 没有 DMA 或？

#### 添加了 DSHOT 代码但需要测试的 FC 目标：

- 上面未列出的所有其他目标。

### 支持 DShot 的电调：

#### BLHeli_32

2017 年 4 月 3 日宣布：
https://www.rcgroups.com/forums/showthread.php?2864611-BLHeli_32-Power-to-perform#post37240208

#### 吻 24

https://www.rcgroups.com/forums/showthread.php?2555162-KISS-ESC-24A-Race-Edition-Flyduino-32bit-ESC

- 150、300、600、900、1200 有关 ESC 代码，请参阅 DShot 线程（上面的链接）。
  KISS24 ESC 蜂鸣代码：
- 1beep/秒=太多dshot错误（超过10%是坏的），但它并没有上锁，它只是告诉
- 2 声蜂鸣声/秒 = 最后 1/3 秒没有有效信号，它解除并停止电机（ESC 失败保存）
- 3 声/秒 = 无法启动电机或电机因被阻塞而停止

- 注意：运行更快的循环速率时，KISS24 固件似乎存在问题。
  Rossbow 报告：我们一直在 BF 上对 Kiss 24a 电调进行一些测试，看来它们无法在 DShot 的 4 或 8 kHz 下安全运行。
  如果你想测试它，请拆下桨叶并将穿越机设置为Air Mode，然后让它在工作台上闲置运行。
  在 8khz 下，我们看到 esc 开始关闭前 1 到 6 分钟，看起来他们可能在 8khz 下收到太多的 CRC 错误。
  在 1 和 2 khz 下，我们可以得到 15 分钟或更长时间，因此请注意，在 8 khz 下您很可能会死掉。
  我测试过 1.08a、1.08f 和 110b RC7，都有同样的问题。 Oneshot 42和125都可以。
  顺便说一句，它与 Betaflight 无关，Kiss FC 与 24a esc 配合使用的原因似乎是因为它仅在 Kiss fw 上运行在 1khz 上，而在 Betaflight 上运行在 4 khz 上。 khz 越高，电调开始关闭之前的时间就越短。
  因此，BF fw 上的 Kiss FC 可能不会显示该问题，因为在寒冷的天气中，飞行时间很短，在 4khz 下，您可能会毫无问题地完成 2 到 2.5 分钟的完整飞行。
  我对在 BF 上使用这些 24a esc 的建议是运行 oneshot42 或在 DShot 上运行不超过 2khz。这不是保证，而是找到永久修复之前的最佳解决方案。 Kiss 硬件不仅能够运行 8 + khz，所以我想说这只是一个 esc 固件问题。
  juuuut：不急，我正在做。我和鲍里斯谈过，我这里有一个 8k 设置，我可以在那里重现它。在某些油门情况下似乎是看门狗的不当行为。但我想我很快就会有一个新版本来修复它！
  问候，菲利克斯
  Alpha 修复：https://www.rcgroups.com/forums/showpost.php?p=37048819&postcount=3510

#### BLheli-S：

从 v16.43 开始支持 BLHELI_S ESC 上的 DSHOT，并在 v16.5 及更高版本中正式支持。
采用 BB1 处理器的旧款 ESC 可能仅支持 DShot150 和 300。
原因如下：https://www.rcgroups.com/forums/showpost.php?p=36025232&postcount=376
现在发现，如果使用 BB2 处理器并且删除任何输入信号过滤，所有 BLHeli_S 电调都将在 DSHOT150、300 和 600 上运行。有关移除过滤器盖的详细信息，请参阅下面的列表。
[DSHOT O'scope 捕获](https://www.rcgroups.com/forums/showpost.php?p=36490579&postcount=2631) 典型 RC 滤波器之前和之后。

BLHeli_S Rev16.6 发布在 github 上（2017 年 1 月 10 日）。
[从此处从 Github 获取固件](https://github.com/bitdump/BLHeli)。在 BLHeli Github 和 BLHlei Suite 和文档中检查最新的 ESC 固件。

请参阅 [BLHeli_S 知识库](https://github.com/blheli-configurator/blheli-configurator/wiki/BLHeli_S-Firmware-Knowledge-Base) 了解要使用的十六进制。注意：许多 ESC 在控制输入信号线上都有 RC 滤波器。必须拆下此 RC 滤波器的盖子才能使用 DShot，如下表所示。即使 DShot 似乎可以工作，也建议取下任何 ESC 的盖子。所有其他协议在没有此过滤器盖的情况下仍然可以工作。
现在，许多 ESC 在制造和运输时都没有安装信号过滤器盖，但最好自行检查以确保未安装该盖。

发布关于在向电源系统添加大型、低 ESR 电容之前和之后测试 DShot 的文章：
https://www.rcgroups.com/forums/showpost.php?p=36713066&postcount=3133
https://www.rcgroups.com/forums/showpost.php?p=36718584&postcount=3144
https://www.rcgroups.com/forums/showpost.php?p=36720323&postcount=3157

#### Cheredanine 的概览：

各位，有很多人发布了显然不理解或没有阅读维基的内容。所以为了理顺事情：
最小和最大油门
D镜头不使用它。 “我改变了最小油门”——这很好，但毫无意义

##### 校准

你不需要这样做，它对dshot没有任何影响，claibration是关于校准PWM脉冲长度，dshot是串行协议，而不是PWM，不要浪费你的时间

而最重要的是——

##### 上限或关闭以及 wiki

信号线上的电容可以平滑信号，消除抖动。 DShot 是信号的快速变化，它看起来像抖动，信号越快，上限就越有可能平滑它，从而消除信号。因为 dshot 是 16 位，所以某些信号值看起来比其他信号更像抖动。除了上限之外，信号还受到其他因素的影响

因此，去掉上限使 dshot 更有可能工作，但 wiki 中的记录不是黑白分明的，它们是人们声称工作的记录，具有相同 esc 的四核可能不会做出相同的反应。 （我有 2 个穿越机，具有完全相同的 ESC，其中一个在打开上限的情况下可以正常工作到 dshot300，另一个需要为 dshot 关闭上限）

##### 如果我的 ESC 未列出或图片不匹配怎么办？

那么您就是该 ESC 的实验测试员。以下是有关如何在任何 BLHeli ESC 上查找信号输入和上限的通用说明的链接：
https://www.rcgroups.com/forums/showpost.php?p=36216745&postcount=1645
另一篇关于寻找信号过滤器盖的帖子：
https://www.rcgroups.com/forums/showpost.php?p=36897835&postcount=3488

##### 关闭盖子后电机从电机选项卡上看很平稳，但我在摇杆上感到抖动

所以 dshot 很好，当你使用你的摇杆时，无线电、接收机、接收机的接线、陀螺仪、四核物理组件和 PID 控制器都组合在一起，某些地方导致飞控命令你看到的震动，解决问题并停止担心 dshot

##### dshot 将与这些 esc 一起工作......

DShot 将在 blheli_s esc 上工作（当然还有 Kiss，但现在有一个单独的 Kiss 线程），如果 esc 闪烁有支持它的 blheli_s 版本，并且大写不会干扰信号。 Bb1 处理器不会提供更快的速度，但 bb2 可以达到 dshot600。只是因为 esc 没有在文献中公开说明 - dshot 在许多 blheli_s esc 之后出现 - 或者因为它是 4 in 1 或 2 in 1 或 0.5 in 1 ，也许不是最后一个，但如果是 blheli_s bb2 请确保从信号线上移除大写，它将运行 dshot

因此，如果您想运行 dshot - 请将盖子取下（制造商开始发货时不带盖子）
如果你不这样做并且遇到问题，那么你猜怎么着？

#### 已测试 BLheli ESC:s

**注意：有些电调完全相同，但名称不同。
最好检查一下盖子拆卸链接中的图片并与您手中的电调进行比较。**

- 艾康 20A/Spedix 20A
  两者的盖子均取下：https://www.rcgroups.com/forums/showpost.php?p=36182572&postcount=1319
- 艾康 SEFM v2 30A - (C-H-25)
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- 艾康 SEFM v1 30A - (C-H-15)
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36213821&postcount=1611
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- AIKON SEFM 20A - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36214609&postcount=1614
- Armattan 20A 和 30A - 2v1 需要拆下盖子，v2（现在从 Armattan 发货）无需修改即可工作
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36416316&postcount=2432
- BeeRotor BLS20A - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36217144&postcount=1654
- BumpBee_S - 移除盖子
  取下盖子：https://nathan.vertile.com/blog/2016/11/14/flash-blheli_s-with-dshot/#flashing
- 蝉BB2 10A -
- 蝉 v1 20A -
- 蝉 v2 20A -
- 蝉v1 30A -
- Cicada v2 30A - 取下盖子
  取下盖子：https://www.electricwingman.com/guides/building-fpv-racing-quadcopter.aspx
- Cicada 4n1 20a V2 - 去掉盖子取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36286446&postcount=2036
- Cicada 35Ax4 35A - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36384215&postcount=2337
- 眼镜蛇 CP30A 电调 30A BLheli_S -
- DALRC BS25A 16.5 - 拆下盖子
  取下盖子：https://www.rcgroups.com/forums/showthread.php?t=2777858#post36223562
  https://www.rcgroups.com/forums/showthread.php?t=2777858
- DYS XS20 v1.x
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36297135&postcount=2068
- DYS XS20A v2 或 XSC20A
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36253268&postcount=1878
- DYS XS30A - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36133930&postcount=836
  https://www.rcgroups.com/forums/showpost.php?p=36245544&postcount=1848
- DYS XSD20A | XSD30A - 新产品公告：
  https://www.rcgroups.com/forums/showthread.php?t=2784634#post36278564
- Emax 闪电 S 35A -
- 飞色猛禽 BLS-02 -
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=37070719&postcount=10
- FVT 小蜜蜂 20A-S
- FVT LittleBee-Spring 20Ax4 - 声称 Dshot 但未知
  主题：https://www.rcgroups.com/forums/showthread.php?2800280-Favourite-FVT-LittleBee-Spring-20Ax4-4-in-1-Blheli_S-ESC-w-built-in-5V-12V-BEC
- LB30a 4 合 1 春季版 - 与 dshot600 开箱即用。
- 小蜜蜂_S 20A (A-H-15)-
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36181966&postcount=40934
- 小蜜蜂_S 30A
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36230015&postcount=1745
- 流明尼尔 30A
- Maverick 24A - 新产品公告：
  https://www.rcgroups.com/forums/showthread.php?2795245-Fully-compatible-with-DShot-New-upgraded-32-bit-Maverick-24A-ESC#post36408093
- MRM ZEUS-S 20A - 移除盖子（请参阅 FVT littlebee-s 20a 移除盖子）
- Multistar BLHeli_S 20A - 发货时不带信号过滤器盖
- 多星BLHeli_S 30A -
- 赛车之星 v2 6a -
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36268041&postcount=1961
- 赛车之星 v1 20A -
- 赛车之星 v1 30A -
- 赛车之星 v2 30a -
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36209787&postcount=1569
- 赛车之星 v2 12A -
- 赛车星 v2 20A -
- 赛车之星 25a -
- 赛车之星 v2 35A -
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36654973&postcount=3006
- 赛车之星 MS15A -
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36426101&postcount=336
- Racerstar MS25A - (A_H_20) - 需要拆下信号盖，与 Racerstar MS35A 相同的盖
- 赛车之星 MS35A -
  盖子取下后，O'scope 痕迹：https://www.rcgroups.com/forums/showpost.php?p=36588994&postcount=2834
- Racerstar 4in1 20A V1 - 需要拆下信号帽。
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36550495&postcount=178
- Racerstar RS20Ax4 V2 Blheli_S 20A 2-4S 4合1电调 -
  链接：https://www.rcgroups.com/forums/showthread.php?t=2782732#post36254434
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36654973&postcount=3006
- Racerstar RS20A v2 - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36503849&postcount=2672
- Racerstar RS30A LiteS - 取下盖子。
  取下盖子：https://www.rcgroups.com/forums/showthread.php?2690769-Racerstar-Blheli_S-ESCs-%28v2-just-released%29-10-for-20a-12-for-30a-30-4in1-20a/page38
- Racerstar RS30Ax4 v2（4 合 1）-
  更多信息：https://www.rcgroups.com/forums/showthread.php?2790572-DShot-bench-test-super-smooth-motor-spining-at-1011-REVO-and-Racerstar-BLHeli_S
- Schubkraft 35A 4in1（SCHUBKRAFT X4 BB21，45A Burst）V2 - 开箱即用
- Spedix ES 20 lite - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36203466&postcount=1509
- Spedix 25a - 拆除信号帽
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36324412&postcount=2157
- Spedix ES30 HV 16.43 - 拆除信号帽
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36205800&postcount=1527
- TBS 25 - 取下盖子
  取下盖子：https://www.rcgroups.com/forums/showpost.php?p=36209076&postcount=1548
- Xrotor mini 30A BL_S - 需要拆下信号盖
- XRotor Micro BLHeli-S 30A - 需要拆下信号盖
- ZTW 北极星 30A (A_H_20 16.42) -

#### 盖子拆卸方法：

**注意 - 如果操作不当可能会导致 ESC 无法使用，并有可能在通电时烧毁 ESC。**

- 方法 1. 剪刀 - 当有足够的空间时使用此方法，只需将盖子剪成两半，将两端从板上剪下来
- 方法 2. 工艺刀 - 当其他组件太靠近而无法使用剪刀时使用，例如 tbs 电调 - 滑动刀片，使其沿着板表面并远离其他组件的方向滑动，然后用力，将盖子从电调上切下来
- 方法 3. 烙铁 - 用镀锡烙铁加热盖子的两端。然后用熨斗的尖端将盖子从垫子上擦掉。小心不要拆焊任何其他部件，并用好的放大镜检查电路板是否有任何焊料飞溅。
- BeeRotor BS20A 视频 - http://scontent.cdninstagram.com/t50.2886-16/15378420_376830535984172_2316137375807307776_n.mp4

#### 组件已尝试但当前无法工作：

无人举报

#### 可能永远无法工作的组件：

- Naze32 和克隆
- 所有配备 STM32F1 处理器的 FC
- 所有不能运行BLHeli_S固件的电调（KISS24A除外）
```
