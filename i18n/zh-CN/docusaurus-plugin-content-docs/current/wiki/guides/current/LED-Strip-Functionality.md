# LED 灯带

Betaflight 支持可寻址 LED 灯带。可寻址灯带可为其中的每颗 LED 独立设定颜色；相较于所有 LED 只能显示同一种颜色的普通 RGB 灯带，其功能更为丰富。

## 基础知识

重要：飞控固件必须在编译时启用 `LED strip` 选项。

每条可编程 LED 灯带的一端都有标记为 `D in` 的数字控制输入，另一端则有标记为 `D out` 的数字控制输出。第一条灯带的 `DIN` 应接至飞控的 LED 焊盘。若将第一条灯带的 `DOUT` 接至下一条灯带的 `DIN`，即可将多条灯带串联。

灯带通电后，数字链路上的每颗 LED 都会从 0 开始获得一个编号。Betaflight 会按编号分别控制每颗 LED。

灯带也可共享同一个 `D in` 信号并联连接，但此时各灯带上相同编号的 LED 会执行相同的显示效果。

注意：为节省 CPU 资源，Betaflight 默认禁用灯带上的全部 LED。

在告知 Betaflight 灯带包含多少颗 LED 前，灯带不会有任何动作。

因此，第一步是在 Betaflight Configurator 中打开 `LED Strip` 标签页，然后：

1. 选择 `Wire Ordering Mode`。
   此时 Betaflight 会知道灯带上有 4 颗 LED，并会在 `STATUS`（默认）灯带配置文件启用时让它们常亮红色。

此时若选择 Beacon 或 Race 配置文件（见下文），相应命令将发送至灯带的前四颗 LED，因为它们已经启用。若要恢复初始状态，点击 `clear All Wiring` 和 `Clear All`，然后保存。有时所选的接线顺序不会被保留；关键是为每颗 LED 完成“布线”，并至少分配一个基础颜色功能。

将以下片段粘贴到 CLI，可可靠地将 LED 0、1、2 和 3 设为红色：

```text
led 0 0,0::C:2
led 1 1,0::C:2
led 2 2,0::C:2
led 3 3,0::C:2
```

## 支持的硬件

目前仅支持最多 32 颗 WS2811/WS2812 LED 的灯带。更长的灯带也可以连接，但仅使用前 32 颗 LED。

WS2812 LED 需要 800 kHz 信号及精确时序，因此必须使用专用硬件定时器。

注意：并非所有 WS2812 IC 的时序都相同，某些批次会采用不同的时序。

如有用户需求，未来或可通过 CLI 指定所需时序。

### 已测试硬件

- [Adafruit NeoPixel Jewel 7](https://www.adafruit.com/products/2226)（初步测试）
  - 全白模式下实测电流约为 350 mA。
  - 适合安装在迷你 250 级四轴飞行器的电机下方。
- [Adafruit NeoPixel Stick](https://www.adafruit.com/products/1426)（运行良好）
  - 全白模式下实测电流约为 350 mA。
- [Aliexpress SK6812 RGBWW strip](https://www.aliexpress.com/wholesale?SearchText=rgbw+sk6812)（运行良好）
  - 替代产品：[Adafruit NeoPixel Stick RGBW](https://www.adafruit.com/product/2869)

### WS2811 与 WS2812

[WS2811](https://cdn-shop.adafruit.com/datasheets/WS2811.pdf) 是与 RGB LED 相连的 LED 驱动 IC。它接收每个红、绿、蓝通道各 8 位的数据。

[WS2812](https://cdn-shop.adafruit.com/datasheets/WS2812.pdf) 将驱动 IC 集成在 5050 LED 封装中，而不是采用独立器件。它接收每个绿、红、蓝通道各 8 位的数据。

[SK6812](https://cdn-shop.adafruit.com/product-files/1138/SK6812+LED+datasheet+.pdf) 也支持 GRBW 变体；该变体具有第四个白色通道，可得到更纯净的白色。

因此，取决于所用的 LED 板或灯带，可能需要 RGB 或 GRB 编码。可通过以下设置控制：

```text
set ledstrip_grb_rgb = RGB
```

或：

```text
set ledstrip_grb_rgb = GRB
```

或：

```text
set ledstrip_grb_rgb = GRBW
```

只需将一颗 LED 设为绿色即可确认设置是否正确。若它显示红色，说明设置错误。随后检查第二颗 LED 是否也显示红色；若不是，则可能使用的是四色 SK6812 LED，应选择 GRBW。

## 连接

WS2812 灯带通常需要一根数据线、5V 和 GND。

WS2812 LED 在全亮度下的电流可能很大。建议测量电流并确认电源能够承受负载。对于使用多个带 BEC 的 ESC 的多旋翼飞行器，可让灯带使用与飞控不同的 BEC，例如 `ESC1/BEC1 -> FC`、`ESC2/BEC2 -> LED strip`。也可由一个 BEC 为灯带的一半供电，另一个 BEC 为另一半供电；只需确保所有 BEC 输出与 LED 共地。

| 目标板                | 引脚 | LED 灯带 | 信号 |
| --------------------- | ---- | -------- | ---- |
| Naze                  | RC5  | Data In  | PA6  |
| CC3D                  | RCO5 | Data In  | PB4  |
| ChebuzzF3/F3Discovery | PB8  | Data In  | PB8  |
| Sparky                | PWM5 | Data In  | PA6  |

Naze 的 RC5 同时用于 SoftSerial，因此不能同时使用 SoftSerial 和 LED 灯带。此外，Naze、Chebuzz 及 STM32F3Discovery 目标板上的 RC5 也用于并行 PWM RC 输入，因此也不能同时使用并行 PWM 与 LED 灯带。

若 LED 间歇工作、闪烁或显示错误颜色，请将 VIN 降至 4.7V 以下，例如在灯带 VIN 线上串联二极管。问题由数据信号与供电信号的电压差引起。WS2811 LED 要求数据输入（DIN）处于 `0.3 × VIN`（逻辑低最大值）至 `0.7 × VIN`（逻辑高最小值）范围内，才能识别有效的逻辑低/高电平。CPU 的 LED 引脚始终介于 0V 和约 3.3V 之间，因此 VIN 应为 4.7V（`3.3V / 0.7 = 4.71V`）。部分 LED 对此条件的容忍度更高。

数据手册：https://www.adafruit.com/datasheets/WS2812.pdf

## 配置

先阅读上文的基础知识，并确认飞控烧录的固件支持 LED_STRIP。然后通过以下任一方式启用 LED 灯带功能：

- 在 Betaflight Configurator 的 Configuration 标签页中勾选 LED Strip；或
- 在 CLI 中输入：

```text
feature LED_STRIP
```

若尝试启用 LED_STRIP 后发现重启时该功能又被关闭，请按上文检查配置是否与其他功能冲突。

## 初始设置

默认情况下，灯带上的全部 LED 都处于“禁用”状态。要让任一 LED 工作，以及让 RACE 或 BEACON 配置文件生效，Betaflight 必须先知道 LED 灯带中有多少颗 LED。

## Betaflight LED 灯带配置文件

Betaflight 提供三种 LED 灯带“配置文件”（工作模式）：STATUS、RACE 和 BEACON。同一时间只能激活一种。

### 选择配置文件

可通过 CLI、OSD LED 灯带菜单或遥控器的调整通道（即遥控器上的开关）选择配置文件。请注意，遥控器调整通道的选择会覆盖其他所有灯带配置文件选择方式。

#### 选项 1：通过 CLI 选择 LED 灯带配置文件

1. 打开 CLI。
2. 输入 `get ledstrip_profile` 并按 Enter，显示当前选择的 LED 灯带配置文件。
3. 输入 `set ledstrip_profile=x`，其中 x 为 STATUS、RACE 或 BEACON 配置文件，并按 Enter。
4. 输入 `save` 并按 Enter，保存所选配置文件。

#### 选项 2：通过 OSD 选择

1. 在遥控器上左打偏航、前推俯仰，打开 OSD 菜单。
2. 使用俯仰摇杆向下移至 LED Strip 菜单，再右打横滚进入菜单。
3. 左摇杆用于返回；右摇杆用于上下导航及修改所选值，可据此配置配置文件和竞赛颜色。
4. 用左摇杆返回顶层菜单，选择 `save & reboot` 完成操作。

#### 选项 3：通过遥控器的调整范围选择 LED 灯带配置文件

1. 在 Configurator 右上角启用专家模式：`Enable Expert Mode`。
2. 打开 Configurator 的 Adjustments 标签页。
   - 启用一项调整（`If enabled`）。
   - 选择用于切换 LED 灯带配置文件的 AUX 通道（`when channel`）。
   - 设置覆盖所选 AUX 通道完整范围的区间（`is in ranges`）。
   - 在动作中选择 `RC Rate Adjustment`（`then apply`）。由于 Configurator 10.4.0 及更早版本不支持 LED 灯带配置文件，实际配置将在 CLI 中完成；选择 `RC Rate Adjustment` 仅是为简化下方 CLI 配置。
   - 选择与上方 AUX 通道一致的 `via channel`（`when channel`）。
   - 保存。
3. 打开 CLI，输入 `adjrange` 并按 Enter。
4. 复制步骤 2 配置的 adjrange，粘贴到命令窗口。将通道范围后的 `1` 改为 `30` 并按 Enter；输入 `save` 并按 Enter。调整范围将被保存，飞控随即重启。
5. 在遥控器上配置该 AUX 通道。切换此通道时，LED 灯带配置文件会在 STATUS、RACE 和 BEACON 间切换；应可看到 LED 功能随之变化。

### RACE 配置文件

RACE 配置文件会将全部 LED 设置为单一颜色，可以是用户选定的颜色，也可以是反映当前 VTX 通道的颜色。

RACE 配置文件激活时，LED 不显示其他信息；Configurator 的 LED Configuration 标签页中除整条灯带亮度外的所有设置都会被忽略。必须通过 CLI 配置：

输入 `get ledstrip_race_color` 并按 Enter，显示当前选定的竞赛颜色。

输入 `set ledstrip_race_color = abc`，其中 abc 为下方颜色表中的目标颜色名称。输入 `save` 并按 Enter 以保存。

#### 将 LED 颜色设为 VTX 频率颜色

配置文件必须为 RACE，`race_color` 必须设为 black，且 VTX 必须通过 SmartAudio 或 IRC Tramp 与飞控通信。可使用以下 CLI 命令启用：

```text
set ledstrip_profile = RACE
set ledstrip_race_color = BLACK
```

随后颜色会按 VTX 频率设置，如下表所示：

| 频率范围        | 通道       | 颜色        | 颜色索引 |
| --------------- | ---------- | ----------- | -------- |
| \<= 5672        | R1         | WHITE       | 1        |
| > 5672 \<= 5711 | R2         | RED         | 2        |
| > 5711 \<= 5750 | R3, F1     | ORANGE      | 3        |
| > 5750 \<= 5789 | F2, F3     | YELLOW      | 4        |
| > 5789 \<= 5829 | R5, F4, F5 | GREEN       | 6        |
| > 5829 \<= 5867 | R6, F6, F7 | BLUE        | 10       |
| > 5867 \<= 5906 | R7, F8     | DARK_VIOLET | 11       |
| > 5906          | R8         | DEEP_PINK   | 13       |

如需修改某个频率范围的颜色，只能编辑该颜色本身的 HSV 值；这也会改变该颜色在所有模式和配置文件中的显示效果。

### BEACON 配置文件

该配置文件会让全部 LED 每秒闪烁一次白色。通常通过遥控器或 OSD 启用，以帮助寻找丢失的四轴飞行器。在此配置文件下，LED 不显示其他信息。

### STATUS 配置文件

STATUS 是默认配置文件，也是最复杂的配置文件。

它可分别或分组配置 LED。每颗 LED 都必须在 Configurator 的 LED Strip 标签页中设置。通常先在“布线模式”中按顺序编号各 LED，然后为每颗 LED 分配所需功能。

当前实现支持：

- 最多 32 颗 LED。（支持超过 32 颗 LED 是可行的，只需进一步开发。）
- 纯色。
- 显示俯仰、横滚和油门摇杆位置的指示灯。
- 航向/机体朝向灯。
- 特定飞行模式的配色方案。
- 低电量及其他警告。
- AUX 控制的开关。
- GPS 状态。
- RSSI 电平。
- 电池电量。
- Larson 扫描、彩虹等效果。

#### 亮度

可在 LED Strip 标签页使用滑块，或使用 CLI 配置整条 LED 灯带的亮度：

1. 打开 CLI。
2. 输入 `get ledstrip_brightness` 并按 Enter，显示当前亮度。
3. 输入 `set ledstrip_brightness=x`，其中 x 是 5 至 100 的亮度百分比。
4. 输入 `save` 并按 Enter，保存亮度。

在 Betaflight GUI 的 LED Strip 标签页中配置 LED。先设置 LED 的布局，以便后续配置时可视化，也让飞控知道可用 LED 的数量。

Oscar Liang 于 2015 年初发布过一份使用 Betaflight App 配置 LED Strip 功能的[分步指南](https://oscarliang.com/setup-led-betaflight/)。阅读本文时，该指南可能已经过时。

#### 高级 LED 配置

可在 CLI 中使用 `led` 命令显示每颗 LED 的配置值。

不带参数的 `led` 命令会输出当前 LED 配置，可复制保存以备后用。

否则，`led` 接受两个参数：从零开始的 LED 索引号、一个空格，以及如下形式的参数序列：`index x,y:ddd:mmm:cc`。其中：

- `index` 为 0 时表示灯带上的第一颗 LED，14 表示第 15 颗 LED，以此类推。
- `x` 和 `y` 是以 0 为起点的 16×16 网格坐标。
- `ddd` 是 LED 的朝向。
- `mmm` 是 LED 的工作模式。

对于 `x,y` 网格坐标，西北角（左上）为 0,0；右侧相邻位置为 1,0；东南角为 15,15。

`ddd` 指定 LED 的朝向。由于一颗 LED 可以面向任意方向，因此可指定多个方向：

- `N`：北
- `E`：东
- `S`：南
- `W`：西
- `U`：上
- `D`：下

例如，面向东南并向下倾斜 45 度的 LED 可设为 `SED`。

注意：未指定方向或方向为 0 均表示未指定。可用 `NESWUD` 为一颗 LED 配置全部方向，但通常没有实际意义。

`mmm` 指定要应用于 LED 的功能。每颗 LED 最多可应用下列三个基础功能或叠加层。

基础功能：

- `C`：`C`olor，颜色。
- `F`：`F`light mode & Orientation，飞行模式与朝向。
- `A`：`A`rmed state，解锁状态。
- `R`：`R`ing thrust state，推力环状态。
- `G`：`G`PS state，GPS 状态。
- `S`：R`S`SI level，RSSI 电平。
- `L`：Battery `L`evel，电池电量。

叠加层：

- `W`：`W`arnings，警告。
- `I`：`I`ndicator，指示灯。
- `T`：`T`hrust state，推力状态。
- `B`：`B`link，闪烁两次模式。
- `O`：Lars`O`n Scanner（Cylon 效果）。
- `Y`：彩虹效果。
- `V`：`V`TX Frequency，VTX 频率。

`cc` 指定颜色编号（从零开始的索引）。

示例：

```text
led 0 0,15:SD:AWI:0
led 1 15,0:ND:AWI:0
led 2 0,0:ND:AWI:0
led 3 0,15:SD:AWI:0
led 4 7,7::C:1
led 5 8,8::C:2
led 6 8,9::B:1
```

```text
led 0 0,0::CW:2
```

上述命令将灯带上的第一颗 LED 设为红色 `C`olor，并叠加 `W`arnings；它位于 Configurator LED 阵列左上角，且没有方向信息。

要清除一颗 LED 并标记灯带链路末端，可使用参数 `0,0::C:0` 的 `led` 命令（位置 0,0；无方向；颜色模式；颜色索引 0，即 BLACK），例如：

```text
led 4 0,0::C:0
```

建议清除所有未连接的 LED。例如，要清除 LED 3 至 8：

```text
led 3 0,0::C:0
led 4 0,0::C:0
led 5 0,0::C:0
led 6 0,0::C:0
led 7 0,0::C:0
led 8 0,0::C:0
```

仅颜色条目的模式似乎始终设为 `C`。

### 模式

#### 警告

该模式会在出现警告时使 LED 闪烁。

| 警告             | LED 图案               | 说明                                                 |
| ---------------- | ---------------------- | ---------------------------------------------------- |
| Arm-lock enabled | 在绿色和熄灭之间闪烁   | 发生于校准期间，或未解锁且飞行器倾斜过大时           |
| Low Battery      | 红色与熄灭交替闪烁     | 必须启用电池监控；高油门导致的电压下降可能会暂时触发 |
| Failsafe         | 在浅蓝色和黄色之间闪烁 | 必须启用失控保护                                     |

闪烁图案会按顺序显示，因此可以明确识别已启用的警告。

#### GPS 状态

该模式显示 GPS 状态和卫星数量。

- 未定位：红色 LED。
- 3D 定位：绿色 LED。

LED 会按卫星数量闪烁相应次数，随后暂停并重新开始。

#### RSSI 电平

该模式将 LED 颜色与 RSSI 电平绑定。

| 颜色       | RSSI |
| ---------- | ---- |
| GREEN      | 100% |
| LIME_GREEN | 80%  |
| YELLOW     | 60%  |
| ORANGE     | 40%  |
| RED        | 20%  |
| DEEP_PINK  | 0%   |

当 RSSI 低于 50% 时，LED 会慢闪；低于 20% 时会快闪。

#### 电池电量

该模式将 LED 颜色与剩余电池容量绑定。

| 颜色       | 容量 |
| ---------- | ---- |
| GREEN      | 100% |
| LIME_GREEN | 80%  |
| YELLOW     | 60%  |
| ORANGE     | 40%  |
| RED        | 20%  |
| DEEP_PINK  | 0%   |

到达 Warning 或 Critical 电压时，LED 将分别慢闪或快闪。注意：此模式需要电流传感器。若没有实际设备，可设置虚拟电流传感器，参见 [Battery](/docs/wiki/guides/current/Battery)。

#### 闪烁

该模式会让当前 LED 在黑色与当前活动颜色之间交替闪烁。

#### Larson 扫描器（Cylon 效果）

Larson Scanner 模拟机械 Cylon 和《霹雳游侠》KITT 上常见的扫描“眼睛”效果。该叠加层会使被分配的全部 LED 变暗，并按照动画在特定时刻点亮其中的某些 LED。无论是否解锁，动画都会运行。

#### 彩虹效果

该模式会周期性地循环 HSV 颜色。可在 LED Strip 标签页通过滑块更改动画频率和增量。

也可使用 CLI：

1. `set ledstrip_rainbow_freq = x`，其中 x 是 1 至 2000 Hz 的频率。
2. `set ledstrip_rainbow_delta = y`，其中 y 是相邻 LED 之间的 HSV 色差，范围为 0 至 359。

:::info

还可与 [Larson 扫描器](#larson-扫描器cylon-效果) 或 [闪烁](#闪烁) 配合使用。

:::

#### VTX 频率

若 VTX 配备 SmartAudio 或 IRC Tramp，该叠加层会使 LED 颜色取决于 VTX 当前通道。颜色按下表选择：

| 频率范围        | 默认颜色    | 颜色索引 |
| --------------- | ----------- | -------- |
| \<= 5672        | White       | 1        |
| > 5672 \<= 5711 | Red         | 2        |
| > 5711 \<= 5750 | Orange      | 3        |
| > 5750 \<= 5789 | Yellow      | 4        |
| > 5789 \<= 5829 | Green       | 6        |
| > 5829 \<= 5867 | Blue        | 10       |
| > 5867 \<= 5906 | Dark violet | 11       |
| > 5906          | Deep pink   | 13       |

可双击某种颜色并移动 Hue 滑块，或通过 CLI 的 `color` 命令更改默认颜色。

#### 飞行模式与朝向

该模式显示飞行模式与机体朝向。

飞行模式激活时，LED 会按模式、网格位置和朝向显示不同颜色。

LED 按以下特定顺序处理：

- 标记为向上或向下的 LED。
- 标记为向西或向东，且位于网格西侧或东侧的 LED。
- 标记为向北或向南，且位于网格北侧或南侧的 LED。

换言之，朝南的 LED 优先级更高。

模式、LED 位置与颜色之间的映射当前固定，不能修改。

#### 指示灯

该模式会闪烁与横滚和俯仰摇杆位置对应的 LED，即指示飞行器即将转向的方向。

| 模式        | 方向  | LED 颜色    |
| ----------- | ----- | ----------- |
| Orientation | North | WHITE       |
| Orientation | East  | DARK_VIOLET |
| Orientation | South | RED         |
| Orientation | West  | DEEP_PINK   |
| Orientation | Up    | BLUE        |
| Orientation | Down  | ORANGE      |
|             |       |             |
| Head Free   | North | LIME_GREEN  |
| Head Free   | East  | DARK_VIOLET |
| Head Free   | South | ORANGE      |
| Head Free   | West  | DEEP_PINK   |
| Head Free   | Up    | BLUE        |
| Head Free   | Down  | ORANGE      |
|             |       |             |
| Horizon     | North | BLUE        |
| Horizon     | East  | DARK_VIOLET |
| Horizon     | South | YELLOW      |
| Horizon     | West  | DEEP_PINK   |
| Horizon     | Up    | BLUE        |
| Horizon     | Down  | ORANGE      |
|             |       |             |
| Angle       | North | CYAN        |
| Angle       | East  | DARK_VIOLET |
| Angle       | South | YELLOW      |
| Angle       | West  | DEEP_PINK   |
| Angle       | Up    | BLUE        |
| Angle       | Down  | ORANGE      |
|             |       |             |
| Mag         | North | MINT_GREEN  |
| Mag         | East  | DARK_VIOLET |
| Mag         | South | ORANGE      |
| Mag         | West  | DEEP_PINK   |
| Mag         | Up    | BLUE        |
| Mag         | Down  | ORANGE      |
|             |       |             |
| Baro        | North | LIGHT_BLUE  |
| Baro        | East  | DARK_VIOLET |
| Baro        | South | RED         |
| Baro        | West  | DEEP_PINK   |
| Baro        | Up    | BLUE        |
| Baro        | Down  | ORANGE      |

#### 解锁状态

该模式会在未解锁时显示绿色、解锁时显示蓝色。

注意：Armed State 不能与 Flight Mode 一起使用。

#### 推力状态

该模式会根据油门摇杆位置，在 HSB 色彩空间中将当前 LED 颜色淡化至前一个或后一个颜色。油门位于中点时颜色不受影响，因此可与朝向颜色结合，同时显示朝向和油门。通常应将 Thrust 与 Color 或 Mode/Orientation 一起使用。

#### 推力环状态

该模式允许使用一个或多个 LED 环（例如 NeoPixel ring）实现加力器效果。具有此模式的 LED 会按重复序列显示其分配的颜色。为推力环模式 LED 分配黑色会阻止该 LED 点亮。

推力环 LED 不分配其他功能时，效果更好。

LED 的朝向及 X/Y 位置与推力环 LED 状态无关。具有该状态的 LED 顺序决定 LED 的行为，油门值决定动画速率。动画仅在解锁时运行。

环上的每颗 LED 可使用不同颜色，可从 16 种可用颜色中选择。

例如，将 LED 0 设为颜色 13 的 `R`ing thrust state LED：

```text
led 0 2,2::R:13
```

LED 灯带和 LED 环可以组合使用。

#### 纯色

该模式可将 LED 设为常亮的指定颜色。

使用此模式时，x,y 位置和方向会被忽略。

其他模式会覆盖颜色模式，或与其组合。

例如，要让 LED 0 始终使用颜色 10，请执行：

```text
led 0 0,0::C:10
```

### 颜色

可使用 CLI 的 `color` 命令配置颜色。

未提供参数时，`color` 会输出当前颜色配置，可复制保存以备后用。

提供两个参数时，必须以空格分隔。第一个参数是 0 至 15 的从零开始颜色标识符；第二个参数是三个定义该颜色的 HSV 值，以逗号分隔。Hue 范围为 0 至 359 度：0 为红色、60 为黄色、120 为绿色、180 为青色，359 时回到红色。S 是颜色饱和度，范围为 0 至 255；0 表示完全饱和，255 表示无饱和度（无颜色）。这与通常 HSV 格式中 100 表示完全饱和的定义相反。V 表示亮度值，范围为 0 至 255；0 始终为黑色，255 为 100% 亮度。亮度为零始终显示黑色。

参见 [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)。注意 Betaflight 对饱和度的处理方式不同。

默认颜色配置如下：

| 索引 | 颜色名称    | Betaflight HSV |
| ---- | ----------- | -------------- |
| 0    | BLACK       | 0,0,0          |
| 1    | WHITE       | 0,255,255      |
| 2    | RED         | 0,0,255        |
| 3    | ORANGE      | 30,0,255       |
| 4    | YELLOW      | 60,0,255       |
| 5    | LIME_GREEN  | 90,0,255       |
| 6    | GREEN       | 120,0,255      |
| 7    | MINT_GREEN  | 150,0,255      |
| 8    | CYAN        | 180,0,255      |
| 9    | LIGHT_BLUE  | 210,0,255      |
| 10   | BLUE        | 240,0,255      |
| 11   | DARK_VIOLET | 270,0,255      |
| 12   | MAGENTA     | 300,0,255      |
| 13   | DEEP_PINK   | 330,0,255      |
| 14   | NOT USED    | -              |
| 15   | NOT USED    | -              |

以下片段将颜色重置为默认值：

```text
color 0 0,0,0
color 1 0,255,255
color 2 0,0,255
color 3 30,0,255
color 4 60,0,255
color 5 90,0,255
color 6 120,0,255
color 7 150,0,255
color 8 180,0,255
color 9 210,0,255
color 10 240,0,255
color 11 270,0,255
color 12 300,0,255
color 13 330,0,255
color 14 0,0,0
color 15 0,0,0
```

### 模式颜色分配

可使用 CLI 的 `mode_color` 命令配置模式颜色。

- 不带参数：列出全部模式颜色。
- 带参数：模式、功能、颜色。

前 8 组 ModeIndex 为：

| mode | 名称        |
| ---- | ----------- |
| 0    | orientation |
| 1    | headfree    |
| 2    | horizon     |
| 3    | angle       |
| 4    | mag         |
| 5    | baro        |
| 6    | special     |
| 7    | channel     |

模式 0 至 5 的功能如下：

| function | 名称  |
| -------- | ----- |
| 0        | north |
| 1        | east  |
| 2        | south |
| 3        | west  |
| 4        | up    |
| 5        | down  |

模式 6 使用以下功能：

| function | 名称               |
| -------- | ------------------ |
| 0        | disarmed           |
| 1        | armed              |
| 2        | animation          |
| 3        | background         |
| 4        | blink background   |
| 5        | gps: no satellites |
| 6        | gps: no fix        |
| 7        | gps: 3D fix        |

ColorIndex 从颜色数组（“调色板”）中选取。

模式 7 与 Thrust state 一起使用，使 LED 颜色取决于油门以外的通道。

示例（使用默认颜色）：

- 将解锁颜色设为红色：`mode_color 6 1 2`
- 将未解锁颜色设为黄色：`mode_color 6 0 4`
- 将 Headfree 模式的 south 设为 CYAN：`mode_color 1 2 8`
- 在 Thrust state 中让颜色取决于 AUX 1：`mode_color 7 0 4`

## 定位

按下图将灯带切成数段。切断灯带后，必须在断开处用导线将每个输出重新接至每个输入，例如将 5V out 接至 5V in、GND 接至 GND、Data Out 接至 Data In。

方位以从上方观察、飞行器机头背对观察者时的方向为准。

### 32 LED 配置示例

默认配置如下：

```text
led 0 15,15:ES:IA:0
led 1 15,8:E:WF:0
led 2 15,7:E:WF:0
led 3 15,0:NE:IA:0
led 4 8,0:N:F:0
led 5 7,0:N:F:0
led 6 0,0:NW:IA:0
led 7 0,7:W:WF:0
led 8 0,8:W:WF:0
led 9 0,15:SW:IA:0
led 10 7,15:S:WF:0
led 11 8,15:S:WF:0
led 12 7,7:U:WF:0
led 13 8,7:U:WF:0
led 14 7,8:D:WF:0
led 15 8,8:D:WF:0
led 16 8,9::R:3
led 17 9,10::R:3
led 18 10,11::R:3
led 19 10,12::R:3
led 20 9,13::R:3
led 21 8,14::R:3
led 22 7,14::R:3
led 23 6,13::R:3
led 24 5,12::R:3
led 25 5,11::R:3
led 26 6,10::R:3
led 27 7,9::R:3
led 28 0,0:::0
led 29 0,0:::0
led 30 0,0:::0
led 31 0,0:::0
```

对应的位置如下：

```text
     6             3
      \           /
       \   5-4   /
        \ FRONT /
    7,8 | 12-15 | 1,2
        /  BACK \
       /  10,11  \
      /           \
     9             0
       RING 16-27
```

LED 0、3、6 和 9 应安装在四轴飞行器下方，朝下。
LED 1-2、4-5、7-8 和 10-11 应分别安装为朝东、北、西、南。
LED 12-13 应安装在中部并朝下。
LED 14-15 应安装在中部并朝上。
LED 16-27 应布置成一圈，位于后部并朝南。

这是默认配置。因此，若不希望在中部上下安装 LED，只需连接前 12 颗 LED。

### 16 LED 配置示例

```text
led 0 15,15:SD:IA:0
led 1 8,8:E:FW:0
led 2 8,7:E:FW:0
led 3 15,0:ND:IA:0
led 4 7,7:N:FW:0
led 5 8,7:N:FW:0
led 6 0,0:ND:IA:0
led 7 7,7:W:FW:0
led 8 7,8:W:FW:0
led 9 0,15:SD:IA:0
led 10 7,8:S:FW:0
led 11 8,8:S:FW:0
led 12 7,7:D:FW:0
led 13 8,7:D:FW:0
led 14 7,7:U:FW:0
led 15 8,7:U:FW:0
```

对应的位置如下：

```text
     6             3
      \           /
       \   5-4   /
      7 \ FRONT / 2
        | 12-15 |
      8 /  BACK \ 1
       /  10-11  \
      /           \
     9             0
```

LED 0、3、6 和 9 应安装在四轴飞行器下方，朝下。
LED 1-2、4-5、7-8 和 10-11 应分别安装为朝东、北、西、南。
LED 12-13 应安装在中部并朝下。
LED 14-15 应安装在中部并朝上。

### 28 LED 配置示例

```text
#right rear cluster
led 0 9,9:S:FWT:0
led 1 10,10:S:FWT:0
led 2 11,11:S:IA:0
led 3 11,11:E:IA:0
led 4 10,10:E:AT:0
led 5 9,9:E:AT:0
# right front cluster
led 6 10,5:S:F:0
led 7 11,4:S:F:0
led 8 12,3:S:IA:0
led 9 12,2:N:IA:0
led 10 11,1:N:F:0
led 11 10,0:N:F:0
# center front cluster
led 12 7,0:N:FW:0
led 13 6,0:N:FW:0
led 14 5,0:N:FW:0
led 15 4,0:N:FW:0
# left front cluster
led 16 2,0:N:F:0
led 17 1,1:N:F:0
led 18 0,2:N:IA:0
led 19 0,3:W:IA:0
led 20 1,4:S:F:0
led 21 2,5:S:F:0
# left rear cluster
led 22 2,9:W:AT:0
led 23 1,10:W:AT:0
led 24 0,11:W:IA:0
led 25 0,11:S:IA:0
led 26 1,10:S:FWT:0
led 27 2,9:S:FWT:0
```

```text
       16-18  9-11
19-21 \           / 6-8
       \  12-15  /
        \ FRONT /
        /  BACK \
       /         \
22-24 /           \ 3-5
       25-27   0-2
```

在此配置中，全部 LED 都应朝机架外侧。

## 故障排除

初次通电时，灯带上的 LED 会设为 WHITE。若测量设备反应足够快，可连接电流表验证电流。多数 5050 LED 单颗功耗为 0.3 W。

这也可用于确认灯带每个 LED 模块中的 R、G、B LED 均正常工作。短暂延迟后，LED 会显示未解锁配色序列和/或低电量警告序列。

另请检查 `LED_STRIP` 功能是否正确启用，以及是否如上文所述与其他功能冲突。某些 LED 配置可能占用大量 CPU，可在 CLI 中查看 `TASKS` 进行检查；RACE 模式占用的 CPU 很少。

## 资源重映射

若开发板没有物理 LED_STRIP 引脚，仍可使用该功能，但配置取决于目标板资源。

以下示例针对 Foxeer F745V3_AIO，将 SERIAL_RX 1 用作 LED_STRIP：

```text
resource SERIAL_RX 1 A10
resource SERIAL_RX 1 NONE
resource LED_STRIP 1 A10
timer show # show current timer list
timer A10 list # check available timers for next command
timer A10 AF1
dma show # show current dma list
dma pin A10 list # check available dma pins for next command
dma pin A10 0
feature LED_STRIP
save
```
