---
id: SmartAudio
---

# SmartAudio

SmartAudio 是 TBS 最初为 Unify 系列模拟图传（VTX）开发的一种单线 VTX 控制方案。

将 UART 的一个 TX 引脚连接至支持该协议的 VTX 后，即可通过 Lua 脚本、Configurator 等工具修改频道、发射功率及其他设置。

基本配置要求如下：

- 将所选端口的 TX 焊盘连接至 VTX 的 SmartAudio 输入引脚。
- 在 Configurator 的“Ports”选项卡中，将相应 UART 的“Peripherals”列设为 `VTX (TBS SmartAudio)`。
- 加载或创建 VTX 表（Betaflight 4.1 及以上版本），让固件识别该 VTX 的通信方式。详见 Wiki 的 VTX 页面；常见 VTX 均有可用预设。

本文大部分内容具有历史背景，仅适用于较早版本的 Betaflight。

## 更新记录

- 2017-02-12：补充 SmartAudio V1 设备兼容性说明（见“兼容性”）。
- 2018-07-19：补充运行模式切换说明。
- 2020-07-25：更新目标板说明，删除失效链接，并加入最新版 TBS SmartAudio 文档链接。
- 2024-01-12：补充简介，并调整文件名以改进排序。

#### TBS SmartAudio

最新手册：https://www.team-blacksheep.com/tbs_smartaudio_rev09.pdf

## 设置

#### 摘自 teralift 在 Boris 主题帖中的说明（略作修改）

- 目标板
  所有 F3、F4、F7 和 H7 目标板均支持 TBS SmartAudio（集成 VTX 的目标板除外）。

- 接线
  将 SmartAudio 信号线接至一个空闲 TX 端口即可，可使用硬件 UART 或软件串口。
  使用软件串口时，请注意端口未必标为 TX，或者标为 TX 的端口可能无法使用。（该功能可自由分配至有效的定时器端口。）
  （已有兼容性问题报告；如遇问题，请先检索网络资料，再到 Betaflight GitHub 仓库求助。）

- 配置
  目前的 Configurator 可在选定端口上直接配置 SmartAudio。

1. 打开“Ports”选项卡。
2. 在“Peripherals”下拉菜单中选择 TBS SmartAudio。
3. 波特率可保持为 `AUTO`。

![在 Peripherals 中启用 SmartPort](https://cloud.githubusercontent.com/assets/14850998/22005655/804c7c26-dca8-11e6-80b4-3c67765dc0e3.png)

- 通用 CMS
  Betaflight 3.1 引入了可运行于多种显示设备之上的通用 CMS（Configuration Menu System，配置菜单系统）：FC 集成 OSD、I2C OLED 显示器，以及运行最新版 MWOSD（Release 1.6.5 或更高版本）的外置 OSD（MinimOSD 系列）。
  （也可在 CMS 内于 OSD 与 OLED 之间切换。）
  因此，使用外置 OSD 的用户也能通过 CMS 控制 SmartAudio。

#### 摘自 AILERON8 在 Boris 主题帖中的说明

其中包含少量 SmartAudio 设置资料，但你的具体设备组合可能仍需自行排查。祝顺利；作者本人也期待在下一台 BFF3 四轴飞行器上配置 SmartAudio。

https://github.com/betaflight/betaflight/issues/1029

http://team-blacksheep.com/tbs-unify-pro-5g8-manual.pdf

#### Amano13 的教程

https://tmr.kiwi/betaflight-mwosd-smartaudio-cms/

#### Boris 的说明

最简单的方案当然是选择带 OSD 的 FC，效果非常稳定。此外，Betaflight 还有一个单独维护 Lua 脚本的仓库：

https://github.com/betaflight/betaflight-tx-lua-scripts

作者计划在 GitHub 中加入更多操作教学视频；如有制作高质量教学视频的意愿，请在相应位置发布。

## 用户责任

SmartAudio 支持开放了设备的部分控制能力，以提供最大的配置灵活性。因此，用户有责任确保设备的使用符合当地法规限制。

## 兼容性

- 支持 SmartAudio V1、V2 及更高版本的设备。

- 截至 2017-02-12，SmartAudio V1 与*部分*硬件 UART 不兼容。若 V1 设备接在硬件 UART 上无法正常工作，请尝试软件串口（v3.1.6 补丁版本及以上提供）。

- Unify 5G8 Pro Race Edition：
  不支持较低频率。
  功率设置可以选择 `500` 或 `800`，但实际仅会升至 `200`，状态行也会据此显示。

- SPARKY2：
  受上拉电阻影响，Flexi-port 不适用于 Unify 5G8 Pro、Pro HV 和 Pro HV Race Edition。
  Main-port 可能兼容，但尚需测试。

## SmartAudio CMS 指南

### 顶层菜单（频段/频道模式）

SmartAudio VTX 在频段/频道模式下的顶层菜单如下图所示。
![SmartAudio CMS 顶层菜单（频段/频道模式）](https://cloud.githubusercontent.com/assets/14850998/21961195/c2639562-db46-11e6-9f98-71d54f6a879b.jpg)

多数项目的含义一目了然，以下内容需要额外说明。

### 状态行

SmartAudio VTX 菜单顶层页面的状态行按以下格式显示 VTX 当前状态：

```
m bc ffff ppp
```

其中：

`m`：运行模式，`F`（Freestyle，自由飞）或 `R`（Race，竞赛）。

`b`：当前发射频段，`A`（BOSCAM A）、`B`（BOSCAM B）、`E`（BOSCAM E）、`F`（FatShark/NexWave）或 `R`（Raceband）。

`c`：当前发射频道，范围为 `1` 至 `8`。

`ffff`：当前发射频率。

`ppp`：当前发射 RF 功率；可为以 mW 表示的数值（`25`、`200`、`500`、`800`），也可为 `PIR`（In-Range Pit 模式）或 `POR`（Out-Range Pit 模式）。

请注意，状态行显示的是 VTX 的实际运行状态，因此其数值可能不同于状态行下方的频段、频道和功率设置项。

### 运行模式

在 Betaflight 中，SmartAudio 设备可使用两种运行模式之一：

#### Race

此模式旨在尽量降低对其他飞手的干扰。
SmartAudio 设备会以 Pit 模式上电，并持续停留在 Pit 模式，直到开始发射。

使用该模式时，状态行最左侧字符为 `R`。
若设备处于 Pit 模式，在开始发射前，状态行的当前功率字段将为 `PIR` 或 `POR`。

在 Pit 模式下，修改 `BAND`、`CHAN` 和 `POWER` 后，必须执行 `SET` 菜单项并完成相应确认（即开始发射），设置才会生效。
开始发射后仍可修改 `BAND`、`CHAN` 和 `POWER`，但每次都必须执行 `SET` 才会应用。

“In-Range”和“Out-Range”的含义请参阅 TBS Unify 5G8 Pro 手册。

#### Freestyle

此模式用于单独飞行。SmartAudio 设备上电后，会按上次断电前设定的频段、频道和功率主动发射。
使用该模式时，状态行最左侧字符为 `F`，当前功率字段与功率等级选择菜单项的值一致。
修改 `POWER` 会立即生效；修改 `BAND` 和 `CHAN` 则必须通过 `SET` 开始发射后才会应用。

#### 在 Freestyle 与 Race 间切换

`CONFIG` 子菜单中有 `OPMODEL` 项。选择 `FREE` 或 `RACE` 后，必须立即重新上电设备，改动才会生效。

### 顶层菜单（用户频率模式）

当 SmartAudio 设备处于用户频率模式时，SmartAudio CMS 顶层菜单如下图所示。
![SmartAudio CMS 顶层菜单（频率模式）](https://cloud.githubusercontent.com/assets/14850998/22690953/7ac836ee-ed7b-11e6-8c71-139f1eb919aa.png)

选择 `FREQ` 项即可直接输入 `5600` 至 `5900MHz` 范围内的任意频率，并进入如下子菜单。

![SmartAudio 频率选择菜单](https://cloud.githubusercontent.com/assets/14850998/22690983/a8db502a-ed7b-11e6-9570-e2f406f5d29b.png)

`NEW FREQ` 用于选择新频率，`SET` 用于在该频率上开始发射。进行较大幅度调整时，可使用加速自动重复功能，避免长时间停留在地面。

#### 在频段/频道模式与用户频率模式间切换

从频段/频道模式切换至用户频率模式：

(1) 进入 `SA CONFIG` 菜单。

(2) 如尚未设为 `FREE`，将 `OP MODEL` 改为 `FREE`。

(4) 重新上电 SmartAudio 设备（无需重启 FC）。

(5) 返回 SmartAudio VTX 顶层菜单。

从用户频率模式切换至频段/频道模式：

(1) 进入 `SA CONFIG` 菜单。

(2) 将 `FSEL MODE` 改为 `CHAN`。

(3) 重新上电 SmartAudio 设备（无需重启 FC）。

(4) 返回 SmartAudio VTX 顶层菜单。

### CONFIG 子菜单

![SmartAudio CMS CONFIG 子菜单](https://cloud.githubusercontent.com/assets/14850998/21961345/de0b760a-db4a-11e6-8309-abc6227ddc7c.jpg)

#### OP MODEL

用于选择竞赛运行模式（`RACE`）或自由飞运行模式（`FREE`）。需要重新上电后才会生效。

选择竞赛运行模式后，频率选择模式（`FSEL MODE`）会自动设为 `CHAN`。这是当前硬件（Unify 5G8 Pro/Pro HV/Race）的规格限制。

#### FSEL MODE

频率选择方式。需要重新上电后才会生效。

- 频道模式（`CHAN`）：通过指定频段与频道选择频率。
- 频率模式（`FREQ`）：以 MHz 数值直接指定频率。
  设为频率模式时，运行模式会自动改为自由飞，顶层菜单也会变更为可直接调整频率的形式。

仅当运行模式为自由飞（`FREE`）时，频率模式（`FREQ`）才可用。要选择频率模式，请先将运行模式切换为自由飞。

#### PIT FMODE

指定 Pit 模式下使用的频率。需要重新上电后才会生效。

- In-Range（`PIR`）：Pit 模式频率采用重新上电前设置的频段和频道。
- Out-Range（`POR`）：Pit 模式频率采用 `POR FREQ` 的值。

_*警告*_
如果 VRX 无法接收 `POR FREQ` 项指定的频率，请勿将此项改为 `POR`。
否则，在取消 Out-Range Pit 模式前，你将无法看到图传画面。

#### POR FREQ

指定 Out-Range Pit 模式下使用的频率。

#### STATX

显示飞控与 SmartAudio 设备之间的协议统计信息，可用于排查连接问题。

### 故障排除

#### 意外进入 Out-Range Pit 模式后的恢复方法

- 可通过按键操作取消 Pit 模式。请参阅 Unify 手册。
- 可使用 I2C OLED 等其他 CMS 设备取消 Out-Range 模式。
- 可从 OSD 引出或接入 `VIDEO OUTPUT`，再连接至外部显示器或眼镜的 `VIDEO INPUT`。

## 使用 Spektrum VTX 设置菜单修改 VTX 设置（TBS Unify / TrampHV）

请阅读 IRC Tramp Wiki 页面中的 Spektrum VTX 设置部分：
IRC-Tramp#modify-vtx-settings-tbs-unify--tramp-hv--rtc6705--using-spektrum-vtx-setup-menu

## 使用 FrSky TARANIS 菜单修改 VTX 设置（TBS Unify / TrampHV）

http://www.nitbeatfpv.com/tramphv-unify-vtx-settings-taranis

注意：该“how to”链接中的 BF 脚本不是最新版本，应使用此处链接的脚本：

https://github.com/betaflight/betaflight-tx-lua-scripts

### Taranis 升级与设置

elmattbo 的原始说明：

确保遥控器运行 OpenTX 2.2，避免使用 rc11。若从 2.1 升级，必须将 2.2 的新目录结构复制到 SD 卡；操作前请备份 SD 卡。
早期 BF 3.1 版本虽可在“Ports”选项卡中选择 SmartAudio，但不一定能正常工作，因此请升级至最新 BF 版本。
将 BF Wiki 链接的 Lua 脚本（按机型选择 X7、X9 等）安装到 Taranis SD 卡的 `SCRIPTS` 文件夹。
将 VTX 音频线接至 UART1 或 UART3 的 TX 引脚（RG SSD FC：接至你所用 FC 上可用的 UART）。
在“Ports”选项卡中为相应 UART 选择 TBS SmartAudio。
在 Taranis 的显示设置中将一个屏幕设为 `scripts`，随后应可选择此前安装的 Lua 脚本。
在模型主界面长按 `PAGE` 会打开 BF 脚本；按 `MENU` 可切换至 VTX 页面。

elmattbo 的后续说明：

作者实际测试时发现 VTX 未响应 Lua 脚本中的更改。修改设置后重新上电仍无改善。可能是设置遗漏，也可能是 Taranis 能读取 VTX、却无法写入更改。半波双工（或类似）通信协议曾需要开发者花时间解决，因此问题也可能出在 Betaflight。

问题已解决：此前没有长按 Taranis 的 `MENU` 保存设置。

修改 VTX 设置
存储或重新加载数值：长按 `MENU` 按钮
切换页面：短按 `MENU` 按钮
在数值间导航：`+` 和 `-` 按钮
编辑数值：按 `ENTER`

## 使用 CLI 设置修改 VTX 配置（TBS Unify / TrampHV）

自 Betaflight 3.3.0 起，支持使用 CLI 设置修改 VTX 配置。详见 [VTX CLI Settings](/docs/wiki/guides/current/VTX#vtx-cli-settings)。

## 同时使用 SmartAudio 与麦克风

#### 接线的一般原理

数字信号可直接连接，也可通过电阻连接。

若信号来自 3.3V 微控制器，最佳做法是使用分压器降至约 0.9V，以获得合适的音频电平（本例中使用 4k7 与 1k8 电阻）。

模拟信号需要通过串联电容，从音频源交流耦合至 SmartAudio 信号线。理想电容值约为 100nF。

（解锁后，音频中的咔嗒声会消失。）

#### 理想连接方式

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037455969/original/GsQVQvCDbXk1zf8WJPaz9NLTZu1eNrbL3g?1490626337)

#### 以下两种配置也可能可用，取决于实际用途和接线方式

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037456019/original/SWkM-JY1Fsh8h8loM_yMxBJCPFVLSd0bsw?1490626407)

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037456045/original/zsjw2bevK6FMWT_pgGseUckoLviUUONOjg?1490626445)
