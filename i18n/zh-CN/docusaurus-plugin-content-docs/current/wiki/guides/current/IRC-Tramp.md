# IRC Tramp

## 前提条件

需要一台固件至少为 1.26 的 IRC Tramp HV。2016 年夏季在若干 FPV 活动中分发的设备尚不支持串行接口。正式发布后直接从中国生产和发货的设备应搭载 1.26 版。要使串行接口在 1.26 固件上工作，必须断开 TNR 标签；否则该标签会主动阻止串行接口工作。从 2 月中旬开始生产、包含 1.27 固件的下一批设备将取消此限制。

检查清单：

- 固件 `>= 1.26`；
- 固件 `== 1.26` 时断开 TNR 标签。

**请注意：**设备所含的实际固件版本不一定等于标签版本。示例设备标签为“Batch 01”和“1.22”，但通过串行接口读取后实际为“1.26”。

## 设置

- 接线：将 Tramp `T`（遥测）线连接至空闲硬件 UART 的 `TX` 端口。
- 配置：最新版 Configurator 支持在所选端口轻松配置 SmartAudio。

1. 打开 Ports 选项卡。
2. 在 Peripherals 下拉菜单中选择 IRC Tramp。
3. Speed 可保持 `AUTO`。

![在外设中选择 IRC Tramp](https://cloud.githubusercontent.com/assets/14850998/22005847/ddc6641a-dca9-11e6-8de3-64dc39ecb5cf.png)

## IRC Tramp CMS 指南

IRC Tramp VTX 的顶层菜单如下。
![IRC Tramp CMS 菜单](https://cloud.githubusercontent.com/assets/14850998/21991074/8bd7c464-dc54-11e6-822c-53defecdc915.jpg)

多数条目易于理解，以下条目需额外说明。

### 状态行

Tramp VTX 菜单顶层页面的状态行按以下格式显示 VTX 当前状态：

```
* bc ffff tppp
```

其中：

- `b`：当前发射频段，`A`（BOSCAM A）、`B`（BOSCAM B）、`E`（BOSCAM E）、`F`（FatShark/NexWave）或 `R`（Raceband）；
- `c`：当前发射通道，`1` 至 `8`；
- `ffff`：当前发射频率；
- `t`：当前热保护状态。热保护生效时为 `*`，否则为空格（` `）；
- `ppp`：当前发射 RF 功率，数值单位为 mW（毫瓦）。

状态行显示的是 VTX 的“运行”状态，因此数值可能不同于状态行下方的频段、通道和功率设置项。

### 热保护

热保护生效时，设备会自动调节 RF 功率。因此状态行不会显示 `POWER` 项中设置的数值。

## 使用 FrSky TARANIS Betaflight LUA 脚本修改 VTX 设置（TBS Unify / TrampHV）

https://github.com/betaflight/betaflight-tx-lua-scripts/releases

## 使用 Spektrum VTX Setup 菜单修改 VTX 设置（TBS Unify / Tramp HV / RTC6705）

所有可通过 CMS 和 CLI 配置的 VTX，也可通过 Spektrum 发射机的 VTX Setup 菜单控制。该功能在 Betaflight 3.3.0 中引入。

![Spektrum VTX Setup 菜单](/img/Spektrum_VTX_Control_menu.jpg)

若使用遥测和 SPM4649T 接收机，还可在同一 VTX Setup 页面查看 VTX 当前状态。若 VTX 设置由发射机 VTX Setup 菜单之外的方式更改，这会很有用。

![Spektrum VTX 状态与设置菜单](/img/Spektrum_VTX_Control_status_menu_1.21exp.jpg)

## 使用 CLI 设置修改 VTX 配置（TBS Unify / TrampHV）

从 Betaflight 3.3.0 起，支持通过 CLI 设置修改 VTX 配置。详情参见 [VTX CLI 设置](/docs/wiki/guides/current/VTX#vtx-cli-settings)。
