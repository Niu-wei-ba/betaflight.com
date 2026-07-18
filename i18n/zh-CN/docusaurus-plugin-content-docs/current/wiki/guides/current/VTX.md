# VTX

Betaflight 支持控制 VTX（图传发射器）模块。

## VTX 系统

当前支持以下系统：

1. 直接连接至 CPU 的 RTC6705（也可经由 PCB 板间连接器连接，例如 SPRACINGF3NEO）
2. IRC Tramp
3. TBS SmartAudio

## VTX 按钮

若飞控带有按钮，且该按钮不是 BOOT 按钮，即可将其用于控制 VTX。

部分飞控，例如 SPRacingF3NEO，同时带有 VTX 模块和一个按钮；另一些飞控，例如 SPRacingF3MINI，则带有多个按钮。

### VTX 按钮的用法

按住 VTX 按钮时，STATUS 2 LED 会以每秒闪烁 N 次的方式提示松开按钮后将执行的操作。按下按钮即开始闪烁；按住并计数，在对应时间松开即可。

| 按住时长   | 功能                   | 闪烁次数 |
| ---------- | ---------------------- | -------- |
| 25ms 到 1s | 循环切换频道           | 4        |
| 1s 到 3s   | 循环切换频段           | 3        |
| 3s 到 5s   | 循环切换功率和 RF 功率 | 2        |
| 5s 或更长  | 保存飞控设置           | 1        |

以下示例说明如何循环切换 VTX 功率：

```text
| 0 seconds      | 1 second      | 2 seconds    | 3 seconds     | 4 seconds     | 5 seconds     | 6 seconds or more |
|-HOLD BUTTON-----------------------------------|-RELEASE BUTTON-NOW------------|-RELEASED TOO LATE TO CHANGE POWER-|
| 4 Flashes      | 3 flashes     | 3 flashes    | 2 flashes     | 2 flashes     | 1 flash       | 1 flash           |
```

VTX 按钮适用于所有 VTX 系统，包括板载 RTC6705、Tramp 和 SmartAudio。

若 VTX 支持关机，POWER 0 会关闭 VTX，POWER 1 会将 VTX 设为最低输出功率。若 VTX 不支持关闭，POWER 0 会将其设为最低输出功率。

## VTX 表

### 下载供 Configurator 使用的 VTX 表

可下载预制的 VTX 表文件，并直接导入 Betaflight Configurator：

- 右键单击文件链接，然后选择**链接另存为**。
- 在 Configurator 的**图传发射器**选项卡中，使用**从文件加载**导入已保存的文件。
- 单击**保存**，将 VTX 表写入飞行控制器。

如需快速了解如何确定 SmartAudio 版本，可观看此视频：https://youtu.be/eaSmoOPk9KY?t=65

SmartAudio `Debug[0]` 键值：

| 值  | 含义           |
| --- | -------------- |
| 100 | SA 1.0         |
| 116 | SA 1.0，已解锁 |
| 200 | SA 2.0         |
| 216 | SA 2.0，已解锁 |
| 300 | SA 2.1         |
| 316 | SA 2.1，已解锁 |

:::note
欧盟地区的 SmartAudio 表已于 2019 年 10 月 30 日更新，用于修正 F 和 R 频段的错误频率。若正在使用旧版表，请重新安装。
:::

| 适用厂商/型号                                                                                                        | 文件                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **IRC Tramp 协议：**                                                                                                 |                                                                                                                                             |
| IRC Tramp                                                                                                            | [IRC Tramp（美国）](/resources/vtx_tables/vtx_table_irc_tramp_us.json)                                                                      |
|                                                                                                                      | [IRC Tramp（欧盟）](/resources/vtx_tables/vtx_table_irc_tramp_eu.json)                                                                      |
| [MATEKSYS VTX-MINI](http://www.mateksys.com/?portfolio=vtx-mini#tab-id-6)                                            | [VTX-MINI（国际）](http://www.mateksys.com//Downloads/VTX/MATEK_VTX-mini.json)                                                              |
| [iFlight The Force Long Range](https://www.iflight-rc.com/index.php?route=product/product&path=24_75&product_id=732) | [Force LR（美国）](https://raw.githubusercontent.com/Maizzer/Betaflight-VTX-Tables/master/BTFL_vtxtable_iFlight_Force_Long_Range_-_US.json) |
| [RunCam TX200U](https://shop.runcam.com/runcam-tx200u/)                                                              | [IRC Tramp（美国）](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX200U/runcam_tx200u_vtx_table_irc_tramp_us.json)  |
|                                                                                                                      | [IRC Tramp（欧盟）](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX200U/runcam_tx200u_vtx_table_irc_tramp_eu.json)  |
| [RunCam TX100](https://shop.runcam.com/runcam-tx100-nano/)                                                           | [IRC Tramp（美国）](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX100/runcam_tx100_vtx_table_irc_tramp_us.json)    |
|                                                                                                                      | [IRC Tramp（欧盟）](https://runcamfcfiles.s3-us-west-2.amazonaws.com/vtxtable/betaflight/TX100/runcam_tx100_vtx_table_irc_tramp_eu.json)    |
| [Speedy Bee TX800](https://www.speedybee.com/speedybee-tx800/)                                                       | [IRC Tramp（美国）](<https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX800/SpeedyBee-TX800(USA).json>)                               |
|                                                                                                                      | [IRC Tramp（欧盟）](<https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX800/SpeedyBee-TX800(EU).json>)                                |
| [Speedy Bee TX500](https://www.speedybee.com/tx500/)                                                                 | [IRC Tramp（美国）](https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX500/speedybee_tx500_vtx_table_irc_tramp_us.json)               |
|                                                                                                                      | [IRC Tramp（欧盟）](https://speedybee.s3.amazonaws.com/vtxtable/betaflight/TX500/speedybee_tx500_vtx_table_irc_tramp_eu.json)               |
| **TBS SmartAudio 协议：**                                                                                            |                                                                                                                                             |
| TBS（SA 1.0 仅用于第一代 TBS 设备）                                                                                  | [SmartAudio 1.0（美国）](/resources/vtx_tables/vtx_table_smart_audio_1_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 1.0（欧盟）](/resources/vtx_tables/vtx_table_smart_audio_1_0_eu.json)                                                           |
| TBS（适用于大多数支持 SmartAudio 的 VTX）                                                                            | [SmartAudio 2.0（美国）](/resources/vtx_tables/vtx_table_smart_audio_2_0_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.0（欧盟）](/resources/vtx_tables/vtx_table_smart_audio_2_0_eu.json)                                                           |
| TBS（目前仅适用于 EVO 或 Pro32 等最新 TBS 型号）                                                                     | [SmartAudio 2.1（美国）](/resources/vtx_tables/vtx_table_smart_audio_2_1_us.json)                                                           |
|                                                                                                                      | [SmartAudio 2.1（欧盟）](/resources/vtx_tables/vtx_table_smart_audio_2_1_eu.json)                                                           |
| **板载 VTX：**                                                                                                       |                                                                                                                                             |
| 带板载 VTX 的飞行控制器                                                                                              | [RTC6705（美国）](/resources/vtx_tables/vtx_table_rtc6705_us.json)                                                                          |
|                                                                                                                      | [RTC6705（欧盟）](/resources/vtx_tables/vtx_table_rtc6705_eu.json)                                                                          |

### 通过 CLI 设置 VTX 表

自 Betaflight 4.1.0 起，控制图传发射器所需的频段/频道和功率级别信息不再内置于固件中，而是保存于名为 `vtxTable` 的新机制内。

必须手动设置 `vtxTable` 内容，并使其符合所用硬件、当地法律法规及用户偏好。

在 CLI 中输入 `vtxtable` 命令可查看表内容。例如：

```text
# vtxtable
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY    0 5845 5825 5805 5785 5765 5745    0
vtxtable band 2 BOSCAM_B B FACTORY    0 5752 5771 5790 5809 5828 5847    0
vtxtable band 3 BOSCAM_E E FACTORY    0    0    0    0    0    0    0    0
vtxtable band 4 MYBAND   M CUSTOM  5745 5769    0 5806    0 5843    0    0
vtxtable band 5 RACEBAND R FACTORY    0    0    0 5769 5806 5843    0    0
vtxtable powerlevels 3
vtxtable powervalues  14 20 26
vtxtable powerlabels 25 100 400
```

#### 频段和频道

上例包含 5 个频段，**每个频段均具有名称、单字母缩写、出厂标志和 8 个频率。**

出厂标志决定 Betaflight 与 VTX 的通信方式。

**标志设为 `FACTORY` 时，Betaflight 向 VTX 发送频段和频道编号。**VTX 随后使用其内置频率表。
在此模式下，`vtxtable` 的实际内容**不会**发送给 VTX，仅用于 OSD 等位置的显示。因此，标志为 `FACTORY` 的频段应与 VTX 内置频率表保持一致。

**标志设为 `CUSTOM` 时，Betaflight 向 VTX 发送其应使用的频率。**此模式会使用表中的内容，用户可用任意频率创建自定义频段。
**不带内置频率表的图传发射器，例如 IRC Tramp 或 rtc6705，仅支持 `CUSTOM`。**

将 `vtxtable` 条目的频率设为 0 可禁用该条目。此方法尤其适用于 `FACTORY` 频段：将图传内置频率表中不需要条目的槽位设为 0，即可有效禁用它们。
上述示例利用该方式，仅允许 5725 至 5875 MHz 的频率，以符合德国飞手所需遵循的德国法规；此外还用一个新的自定义频段替换了 Fatshark 频段。

下表列出常用频率，可作为起点：

```text
# This table should not be used as-is, but trimmed down according to local laws and regulations.
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
```

#### 功率级别

除频率外，图传发射器还需要获知其应使用的发射功率。前述示例包含 3 个功率级别，**每个级别都具有数值和标签。**标签显示在 OSD 中，数值则发送至 VTX。

功率级别必须设置为与所用硬件相符的值。

##### IRC Tramp 设备应使用：

```text
vtxtable powerlevels 5
vtxtable powervalues 25 100 200 400 600
vtxtable powerlabels 25 100 200 400 600
```

##### rtc6705 应使用：

```text
vtxtable powerlevels 2
vtxtable powervalues 1 2
vtxtable powerlabels MIN MAX
```

请注意，无法通过 `powervalues` 关闭 rtc6705 设备；请使用 Pitmode。

##### SmartAudio V1.0 设备应使用：

```text
vtxtable powerlevels 4
vtxtable powervalues 7 16 25 40
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio V2.0 设备应使用：

```text
vtxtable powerlevels 4
vtxtable powervalues 0 1 2 3
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio V2.1 设备因具体型号而异，请查阅制造商网站。

对此类设备，`powervalues` 是以 dBm 为单位的输出功率。

要查询 SmartAudio 2.1 VTX 可用的功率级别，请在 CLI 中不带参数输入 `vtx_info` 命令。系统会报告可用的功率设置：

```text
# vtx_info
level 14 dBm, power 25 mW
level 20 dBm, power 100 mW
level 26 dBm, power 400 mW
```

例如：

[TBS Unify Pro32 Nano 5G8](https://www.team-blacksheep.com/products/prod:unifypro32_nano)：

```text
vtxtable powerlevels 3
vtxtable powervalues 14 20 26
vtxtable powerlabels 25 100 400
```

[TBS Unify Pro 5G8 HV - Race 2 (MMCX)](https://www.team-blacksheep.com/products/prod:unify_pro_hv_race2_m)：

```text
vtxtable powerlevels 3
vtxtable powervalues 13 20 26
vtxtable powerlabels 25 100 400
```

[TBS Unify Pro32 HV (MMCX)](https://www.team-blacksheep.com/products/prod:unifypro32_hv)：

```text
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 30
vtxtable powerlabels 25 100 400 1W
```

[TBS Unify EVO](https://www.team-blacksheep.com/products/prod:tbs_unify_evo)：

```text
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 29
vtxtable powerlabels 25 100 400 800
```

可省略部分功率级别，以符合当地法律法规。此外，`powerlabels`（但不能是数值）可以设为任意三个字符。例如，TBS Unify EVO 也可使用以下配置：

```text
vtxtable powerlevels 2
vtxtable powervalues 20 26
vtxtable powerlabels .1W .4W
```

#### 完整示例

##### IRC Tramp 设备

```text
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A CUSTOM 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B CUSTOM 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E CUSTOM 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F CUSTOM 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R CUSTOM 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 5
vtxtable powervalues 25 100 200 400 600
vtxtable powerlabels 25 100 200 400 600
```

##### SmartAudio 1.0 设备

```text
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 7 16 25 40
vtxtable powerlabels 25 200 500 800
```

##### SmartAudio 2.0 设备

```text
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
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

##### SmartAudio 2.1 设备

```text
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A FACTORY 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B FACTORY 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E FACTORY 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F FACTORY 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R FACTORY 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 4
vtxtable powervalues 14 20 26 30
vtxtable powerlabels 25 100 400 1W
```

##### rtc6705

```text
# This example enables a lot of power levels and channels.
# Almost nobody will be able to legally use this without modification.
# Check your local laws and regulations before use!
vtxtable bands 5
vtxtable channels 8
vtxtable band 1 BOSCAM_A A CUSTOM 5865 5845 5825 5805 5785 5765 5745 5725
vtxtable band 2 BOSCAM_B B CUSTOM 5733 5752 5771 5790 5809 5828 5847 5866
vtxtable band 3 BOSCAM_E E CUSTOM 5705 5685 5665 5645 5885 5905 5925 5945
vtxtable band 4 FATSHARK F CUSTOM 5740 5760 5780 5800 5820 5840 5860 5880
vtxtable band 5 RACEBAND R CUSTOM 5658 5695 5732 5769 5806 5843 5880 5917
vtxtable powerlevels 2
vtxtable powervalues 1 2
vtxtable powerlabels MIN MAX
```

#### Pitmode

Pitmode 独立于 `vtxTable`；不应在表中为 Pitmode 创建功率级别。
可通过 OSD、AUX 开关和 Lua 脚本等多种方式控制 Pitmode。

部分图传发射器对 Pitmode 的使用有所限制。例如，SmartAudio V1.0 和 V2.0 设备仅可在上电时进入 Pitmode。Betaflight 可使这些设备退出 Pitmode，但无法使其进入 Pitmode。

rtc6705 设备不支持真正的超低功率 Pitmode。若开发板支持，Pitmode 会直接完全关闭 rtc6705 设备。

## VTX CLI 设置

自 Betaflight 3.3.0 起，可使用下列 CLI 设置配置连接至飞行控制器的可寻址图传发射器，例如 [TBS SmartAudio](/docs/wiki/guides/current/SmartAudio) 和 [IRC Tramp](/docs/wiki/guides/current/IRC-Tramp)。

启动时，系统会将这些设置应用于发射器。若通过 [CMS OSD 菜单](/docs/wiki/guides/current/SmartAudio) 或 MSP（Taranis/OpenTX smartport [Lua 脚本](https://github.com/betaflight/betaflight-tx-lua-scripts)）修改图传配置，相关设置也会更新。

这些设置的一项实用用途是：在图传发射器尚未上电时，通过 USB/CLI 配置频率。保存并重新上电后，系统将以新频率启动。

`vtx_freq` 设置的工作方式如下：若 `vtx_band=0` 且 `vtx_freq!=0`，启动时会在发射器上设置 `vtx_freq` 值（单位：MHz）。若两者均为零，系统会忽略这些设置。若 `vtx_band!=0` 且已连接图传发射器，启动时 `vtx_freq` 会设为当前频率值（单位：MHz）。

:::note
`vtx_band`、`vtx_channel` 和 `vtx_power` 等设置适用于 Betaflight 4.1 之前的版本，当时其默认值内置于固件中。Betaflight 4.1 及更高版本必须配置 [VTX 表](#vtx-tables) 才能控制 VTX；请依据当地法规自行定义频段、频道和功率设置。
:::

**`vtx_band = #`**
允许范围：0 - 5
0=用户，1=A，2=B，3=E，4=F(Airwaves/Fatshark)，5=Raceband

**`vtx_channel = #`**
允许范围：1 - 8

**`vtx_power = #`**
允许范围：0 - 5
对于 SmartAudio：0=25mW，1=25mW，2=200mW，3=500mW，4=800mW
对于 TBS Unify Nano：0=25mW，1=25mW，2=50mW
对于 IRC-Tramp：0=25mW，1=25mW，2=100mW，3=200mW，4=400mW，5=600mW

**`vtx_low_power_disarm = ON|OFF`**
若设为 ON 且飞行控制器处于未解锁状态，图传发射器输出功率将设为最低值（`vtx_power=1`）。否则，图传发射器输出功率设为配置的 `vtx_power` 值。
注意：若发生接收机失控保护，输出功率不会降低。

**`vtx_freq = ####`**
允许范围：0 - 5999
若 `vtx_band!=0` 且已连接 VTX，显示当前频率（MHz）
若 `vtx_band==0`，设置频率（MHz）
若 `vtx_band==0` 且 `vtx_freq==0`，不会向 VTX 发送这些设置

例如，要将 VTX 配置为使用 F 频段和频道 6（5840 MHz），请进入 CLI 并输入：

```text
set vtx_band = 4
set vtx_channel = 6
save
```

在执行 `save` 并重启前，VTX 配置不会改变。若设置成功，输入 `get vtx_freq` 将显示当前频率（MHz）。

**频率表：**

| 频段                                | 频道 1 | 频道 2 | 频道 3 | 频道 4 | 频道 5 | 频道 6 | 频道 7 | 频道 8 |
| ----------------------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 频段 1（A：Boscam A / TBS / RC305） | 5865   | 5845   | 5825   | 5805   | 5785   | 5765   | 5745   | 5725   |
| 频段 2（B：Boscam B）               | 5733   | 5752   | 5771   | 5790   | 5809   | 5828   | 5847   | 5866   |
| 频段 3（E：Boscam E / DJI）         | 5705   | 5685   | 5665   | 5645   | 5885   | 5905   | 5925   | 5945   |
| 频段 4（F：IRC NexWave / Fatshark） | 5740   | 5760   | 5780   | 5800   | 5820   | 5840   | 5860   | 5880   |
| 频段 5（R：Raceband）               | 5658   | 5695   | 5732   | 5769   | 5806   | 5843   | 5880   | 5917   |

### 通过 AUX 通道切换 VTX 功率

`vtx` CLI 命令可将 AUX 通道映射至 VTX 频段、频道和功率设置：

```text
vtx <index> <aux_channel> <vtx_band> <vtx_channel> <vtx_power> <start_range> <end_range>
```

`aux_channel` 值从零开始编号（0 = Aux1，1 = Aux2，依此类推）。

例如，下列配置将 Aux3 上的三段开关用于切换功率级别 1、2 和 3：

```text
vtx 0 2 0 0 1 900 1200
vtx 1 2 0 0 2 1300 1700
vtx 2 2 0 0 3 1800 2100
```

将 `vtx_band`、`vtx_channel` 或 `vtx_power` 设为 0 时，会保留当前设置不变；以上示例仅改变功率，不改变频段或频道。

若已启用 Low Power Disarm，该选项会覆盖 `vtx` 命令做出的变更。

请在 OSD 选项卡启用 **VTX Channel** OSD 元素，以显示当前 VTX 频道和功率级别。
