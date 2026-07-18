# Pinio 与 PinioBox

## 概述

- PINIO 是对简单 GPIO（通用输入/输出）引脚功能的抽象；PINIO BOX 用于将模式（box）关联到 PINIO。
- 大多数飞控目标均支持为 PINIO 配置最多四个引脚，并可通过 PINIO BOX 控制这些引脚。

## PINIO

可通过 `resource` CLI 命令将 MCU 引脚分配给 `PINIO`：

```
resource PINIO <index> <pinID>
```

`PINIO` 的 `resource` 配置示例：

```
[...]
resource PINIO 1 A01
resource PINIO 2 A08
resource PINIO 3 C09
resource PINIO 4 D02
[...]
```

## PINIO CONFIG

每个引脚的 I/O 配置由 CLI 变量 `pinio_config` 指定。该变量是由 8 位数值组成的逗号分隔列表（数组）：最高位（MSB）表示反相，其余 7 位定义 I/O 模式，具体定义见 [drivers/pinio.h](https://github.com/betaflight/betaflight/blob/master/src/main/drivers/pinio.h)（此 PR 仅定义推挽输出）。

| PINIO CONFIG              | HEX  | DEC |
| ------------------------- | ---- | --: |
| PINIO_CONFIG_OUT_INVERTED | 0x80 | 128 |
| PINIO_CONFIG_MODE_MASK    | 0x7F | 127 |
| PINIO_CONFIG_MODE_OUT_PP  | 0x01 |   1 |

`注意`：这些数值可以组合使用。

`pinio_config` 示例：

```
set pinio_config = 1,129,1,1
```

该配置将 PINIO #1、#3 和 #4 设为推挽输出，将 PINIO #2 设为反相推挽输出。

默认值为 `1`（推挽输出）。

## PINIO BOX

CLI 变量 `pinio_box` 是由模式永久 ID 组成的逗号分隔列表，用于将模式关联到对应的 PINIO。关联后，模式的激活状态会反映到相应的 PINIO（继而反映到引脚）。PINIO BOX 能自行监测模式的激活状态，因此独立于这些模式本身的用途运行。换言之，PINIO BOX 为模式**增加**了 PINIO 控制能力。

永久 ID `40` 至 `43` 为用户自定义模式。它们激活后，会在 Configurator 的 Modes 等位置以 USER1 至 USER4 的形式显示在模式列表中。

`pinio_box` 示例：

```
set pinio_box = 0, 39, 43, 255
```

按此分配，PINIO #1 至 #4 会关联到以下模式：

| `PINIO` | 说明           | 永久 ID |
| ------- | -------------- | ------: |
| `1`     | `ARM`          |     `0` |
| `2`     | `VTX PIT MODE` |    `39` |
| `3`     | `USER4`        |    `43` |
| `4`     | `BOXID_NONE`   |   `255` |

下表列出了模式（或 AUX 模式）的永久 ID，依据 [msp/msp_box.c](https://github.com/betaflight/betaflight/blob/master/src/main/msp/msp_box.c)。

| Box                     | 模式                     |   ID | 备注    |
| ----------------------- | ------------------------ | ---: | ------- |
| `BOXARM`                | ARM                      |  `0` |
| `BOXANGLE`              | ANGLE                    |  `1` |
| `BOXHORIZON`            | HORIZON                  |  `2` |
| `BOXALTHOLD`            | ALTITUDE HOLD            |  `3` | 2025.12 |
| `BOXANTIGRAVITY`        | ANTI GRAVITY             |  `4` |
| `BOXMAG`                | MAG                      |  `5` |
| `BOXHEADFREE`           | HEADFREE                 |  `6` |
| `BOXHEADADJ`            | HEADADJ                  |  `7` |
| `BOXCAMSTAB`            | CAMSTAB                  |  `8` |
| `BOXCAMTRIG`            | CAMTRIG                  |  `9` | 已移除  |
| `BOXGPSHOME`            | GPS HOME                 | `10` | 已移除  |
| `BOXPOSHOLD`            | POSITION HOLD            | `11` | 2025.12 |
| `BOXPASSTHRU`           | PASSTHRU                 | `12` |
| `BOXBEEPERON`           | BEEPER                   | `13` |
| `BOXLEDMAX`             | LEDMAX                   | `14` | 已移除  |
| `BOXLEDLOW`             | LEDLOW                   | `15` |
| `BOXLLIGHTS`            | LLIGHTS                  | `16` | 已移除  |
| `BOXCALIB`              | CALIB                    | `17` |
| `BOXGOV`                | GOVERNOR                 | `18` | 已移除  |
| `BOXOSD`                | OSD DISABLE SW           | `19` |
| `BOXTELEMETRY`          | TELEMETRY                | `20` |
| `BOXGTUNE`              | GTUNE                    | `21` | 已移除  |
| `BOXRANGEFINDER`        | RANGEFINDER              | `22` | 已移除  |
| `BOXSERVO1`             | SERVO1                   | `23` |
| `BOXSERVO2`             | SERVO2                   | `24` |
| `BOXSERVO3`             | SERVO3                   | `25` |
| `BOXBLACKBOX`           | BLACKBOX                 | `26` |
| `BOXFAILSAFE`           | FAILSAFE                 | `27` |
| `BOXAIRMODE`            | AIR MODE                 | `28` |
| `BOX3D`                 | DISABLE / SWITCH 3D      | `29` |
| `BOXFPVANGLEMIX`        | FPV ANGLE MIX            | `30` |
| `BOXBLACKBOXERASE`      | BLACKBOX ERASE (>30s)    | `31` |
| `BOXCAMERA1`            | CAMERA CONTROL 1         | `32` |
| `BOXCAMERA2`            | CAMERA CONTROL 2         | `33` |
| `BOXCAMERA3`            | CAMERA CONTROL 3         | `34` |
| `BOXFLIPOVERAFTERCRASH` | FLIP OVER AFTER CRASH    | `35` |
| `BOXPREARM`             | PREARM                   | `36` |
| `BOXBEEPGPSCOUNT`       | BEEP GPS SATELLITE COUNT | `37` |
| `BOX3DONASWITCH`        | 3D ON A SWITCH           | `38` | 已移除  |
| `BOXVTXPITMODE`         | VTX PIT MODE             | `39` |
| `BOXUSER1`              | USER1                    | `40` |
| `BOXUSER2`              | USER2                    | `41` |
| `BOXUSER3`              | USER3                    | `42` |
| `BOXUSER4`              | USER4                    | `43` |
| `BOXPIDAUDIO`           | PID AUDIO                | `44` |
| `BOXPARALYZE`           | PARALYZE                 | `45` |
| `BOXGPSRESCUE`          | GPS RESCUE               | `46` |
| `BOXACROTRAINER`        | ACRO TRAINER             | `47` |
| `BOXVTXCONTROLDISABLE`  | DISABLE VTX CONTROL      | `48` |
| `BOXLAUNCHCONTROL`      | LAUNCH CONTROL           | `49` |
| `BOXMSPOVERRIDE`        | MSP OVERRIDE             | `50` |

`注意`：数值 255 定义为 BOXID_NONE，表示该槽位未使用。

## 示例

以下为一些**通用**示例。

某些内置或外接设备/模块带有专用引脚或导线，可用于启用或禁用设备。PINIO 能否按预期工作取决于该控制引脚或导线；有些设备需要将其设为 `HIGH/ON/1`（约 3.3 V）才能启用，有些则需要设为 `LOW/OFF/0`（约 0 V）。具体取决于设备本身。

### 查找已定义的 PINIO 功能

一些飞控目标已经**预先配置**了 PINIO，例如用于切换相机、VTX 供电电压或内置蓝牙设备。

请查看**你的**飞控的[统一目标配置](https://github.com/betaflight/unified-targets/tree/master/configs/default)，或在已运行的飞控板上执行 `resource` 命令，以查找已有的 PINIO（如果存在）。

你可能会看到 `resource PINIO 1 B00` 或 `PINIO 1 B00`。这表示已存在索引为 `1` 的 PINIO（PINIO #1）。

如需添加更多 PINIO，**务必通过递增索引来避免覆盖已有配置。**

### 飞行器解锁时禁用内置蓝牙设备

多数带内置蓝牙模块的飞控目标已经**预先配置**，通常无需进行任何设置。

不过，了解其配置方式仍然很有价值。

配置可能如下：

```
# resource
[...]
resource PINIO 1 B00
[...]

# get pinio_config
pinio_config = 129,1,1,1
Array length: 4

# get pinio_box
pinio_box = 0,255,255,255
Array length: 4
Default value: 0,255,255,255
```

这是 PINIO #1（映射到引脚 `B00`），因此只需查看数组中四个逗号分隔值的**第一个**。

`pinio_box` 的值为 `0`，根据上表，它对应 `BOXARM` 模式。因此，飞行器解锁时，该模式也会被激活。

`pinio_config` 的值为 `129`；简单来说，它表示该引脚使用开/关输出模式且已反相。**反相**意味着匹配的 PINIO 打开时，此引脚会关闭，反之亦然。

因此，飞行器解锁后，`B00` 引脚将被设为 `LOW`（约 0 V）。在本例中，内置蓝牙模块检测到该引脚的低电平信号后便会关闭，这由其硬件设计决定。

### 飞行器解锁时禁用外接蓝牙 UART 适配器

此配置与内置模块的示例基本相同。

区别在于，你需要选择一个空闲引脚来控制设备开关，并确认设备所需的信号类型（HIGH 或 LOW）。

假设你决定使用未占用的 PPM 引脚来控制新加装的蓝牙模块。该模块带有额外的引脚或导线，可能标注为 POWER 或 ENABLE；其文档说明该引脚必须为 LOW 才会关闭模块。请注意，蓝牙模块转接板上可能存在实际上未连接到任何地方的引脚。

你还需要确认是否已配置一个或多个 `PINIO` 功能（见上文）。

```
# resource
[...]
resource PPM B09
[...]
resource PINIO 1 C08
resource PINIO 2 C09
[...]

# resource PPM none
Resource is freed

# resource PINIO 3 B09
Resource is set to B09

# get pinio_config
pinio_config = 1,1,1,1
Array length: 4

# set pinio_config = 1,1,129,1
pinio_config set to 1,1,129,1

# get pinio_box
pinio_box = 40,41,255,255

# set pinio_box = 40,41,0,255
pinio_box set to 40,41,0,255

# save
```

这里需要注意：

- 已设置两个 `PINIO` 功能，因此新增的功能应使用 #3。

- 将 `pinio_config` 的**第三个**值从 `1` 改为 `129`（反相），因为希望该模式打开时设备关闭。

- 将 `pinio_box` 的**第三个**值从 `255` 改为 `0`，因为希望在设备解锁时激活此功能（见上表）。

- 不要忘记保存。

### Pit Mode 下开启蓝牙设备

该配置与上例完全相同，但不再将 PINIO #3 的 `pinio_box` 设为 `0`，而是设为 `39`。这样，进入 Pit Mode 时蓝牙模块便会开启。

### 使用遥控器控制的 USERn 功能开关 VTX

本例中，我们希望使用遥控器上的实际开关控制 VTX。为此，需要：

- VTX 带有可将其关闭的控制引脚。

- 飞控板具有可切断 VTX 供电电压的功能。

- 在 VTX 供电端与 VTX 之间加入一个简单的晶体管电路。市面上有如 “RealPit” 的现成模块可用。

这里使用 `BOXUSER<n>` 模式（ID 为 40 至 43）之一。这会在 Configurator 的 Modes 选项卡中添加相应的 User 模式/功能，然后即可将其映射到遥控器通道。

假设使用的是一块没有预配置 PINIO 或 User 功能的“纯净”飞控板，并选择 PPM 引脚：

```
#resource
[...]
resource PPM B03
[...]

# resource PPM none
Resource is freed

# resource PINIO 1 B03
Resource is set to B03

# get pinio_box
pinio_box = 255,255,255,255

# set pinio_box = 40,255,255,255
pinio_box set to 40,255,255,255

# save
```

这里需要注意：

- 不修改 `pinio_config`，因为示例 VTX 在引脚被拉至 HIGH 时会**开启**；因此默认值 `1` 即可。

- 将 `pinio_box` 的第一个值设为 `40`，因为这是该飞控板上第一个也是唯一的 User 功能（同样见上表）。

- 最后需在 Configurator 的 Modes 选项卡中映射此功能。注意，只有在 `pinio_box` 中设置 `40-43` 的 ID 后，该功能才会显示。

- 不要忘记保存。

## 常见问题

- 暂无。
