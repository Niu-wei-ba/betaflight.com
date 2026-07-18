# RunCam 设备协议

## 描述

RunCam 设备协议是最初为 RunCam Split 和模拟相机开发的串行通信协议。

该协议本身不仅支持完整的相机 OSD 菜单导航，还支持在分体式相机上触发录制，以及通信可用的 SD 卡空间、同步当前日期、写入 OSD 以及打开和关闭相机或 WiFi 功能（如果可用）。

目前 Betaflight 并不支持该协议的全部功能，但 Betaflight 支持和协议本身仍在持续开发。

最近，与 TBS SmartAudio 和 IRC Tramp 类似，其他公司（例如 Caddx）开始在其摄像机中采用对该协议的支持。

## Betaflight 当前支持的功能

- 完整的相机 OSD 控制
- 在分体式摄像机上开始/停止录制
- 在 runcam 分体式相机上触发照片快照
- Runcam 分体式摄像机上的 Wifi 和电源切换

## 协议规范

当前的协议规范可以在这里找到：

[协议规范](http://note.youdao.com/groupshare/?token=9AD3F89F0B92488E8241F58CAEDF7939&gid=29699666)

---

## 设置

- FC 上需要 1 个空闲的非反向 UART（TX 和 RX）
- 在 Betaflight 应用程序的端口选项卡中为所使用的 UART 选择 Runcam 设备。
- 软串行可能适用于某些设备和某些功能（据报道，软串行至少可与 Runcam Split 2/Mini 配合使用录制按钮功能）。

## 支持的相机/设备和功能

### 模拟/经典 fpv 相机

任何支持 UART 相机控制的 RunCam 相机都应该可以工作。

Micro Swift 3、Runcam Racer 2 等

#### 支持的功能

- OSD 菜单控制
- 场景切换等快捷键

### RunCam 拆分

RunCam Split 相机（1,2、mini 和 mini 2 等）也可以使用，但可能需要固件更新。第一个 runcam split 附带了不同的协议 - 确保以任何一种方式升级它，因为新的固件改进了各种功能。

#### 支持的功能：

##### OSD 菜单控制

进入 OSD 菜单以修改设置，应使用与 [FPV 相机控制](FPV-Camera-Control-Joystick-Emulation) 相同的摇杆命令。

![相机控制杆命令](/img/camera-control-stick-commands.png)

##### 相机按钮模拟（录制/拍照/Wifi/电源按钮）

视频演示：[https://goo.gl/tm8CPS](https://goo.gl/tm8CPS)

###### 准备

固件：BetaFlight 固件（≥3.2.0）
配置软件：Betaflight Configurator (≥3.2.0)

BetaFlight 上任何可用的 UART 接口

###### 1.将 RunCam Split 与飞控的 UART 接口连接

![split2_fc-01](https://s3-us-west-2.amazonaws.com/runcamfcfiles/split2_fc-01.jpg)

###### 2.让飞控识别分体

例如，我们将 Split 连接到 BetaFlight 上的 UART 3 接口：将飞控连接到电脑，然后打开 Betaflight App。
在 UART3 行的外围设备列中（在端口选项卡上），选择 RunCam 设备并单击保存并重新启动。
![bf-ports-setup-for-rcsplit](https://s3-us-west-2.amazonaws.com/runcamfcfiles/bf-ports-setup-for-rcsplit.png)

###### 3.摄像机功能及分配发射通道说明

在 Betaflight 应用程序中，导航至“模式”选项卡。有新的“相机 WI-FI”、“相机电源”和“相机更换”模式。

CAMERA WI-FI：打开/关闭相机的 WIFI。当处于相机的 OSD 中时，它用于确认您的选择。
摄像机电源：开始/停止视频。当处于相机的 OSD 中时，这用于移至下一个菜单项。
摄像机切换模式：在视频、照片和 OSD 设置模式三种模式之间切换。当处于相机的 OSD 中时，这将退出菜单。
将任何可用通道分配给您需要的功能，例如：

将 AUX1 分配给 CAMERA WI-FI，范围 1900-2100
将 AUX2 分配给 CAMERA POWER，范围 1900-2100
将 AUX3 分配给 CAMERA CHANGE MODE，范围 1900-2100
![bf-modes-setup-for-rcsplit](https://s3-us-west-2.amazonaws.com/runcamfcfiles/bf-modes-setup-for-rcsplit.png)

###### 4.将通道分配给控制器的开关

请在控制器上选择您的型号，然后进入混控器界面并将通道分配给控制器的开关。以 opentx 2.2.0 为例，将通道 CH5、CH6、CH7 分别分配给 SA、SB、SD。
![IMG_0371-1](https://s3-us-west-2.amazonaws.com/runcamfcfiles/IMG_0371-1.jpg)

###### 5.测试

为飞控和 RunCam Split 上电：

- 将 SA 拨到底部，相机打开 / 关闭 WiFi；
- 将 SB 拨到底部，相机开始 / 停止录像；
- 将 SD 拨到底部，相机在视频、照片和 OSD 设置三种模式间切换。

### Caddx 海龟 v2

Caddx 还通过其最新固件更新实现了对 RunCam 设备协议的支持。
但请注意，只有 Turtle v2 正确支持 UART 控制，因为 v1 尽管有 UART 焊盘，但板上仍有一些不兼容的连接。

对于 v1，您仍然可以使用[FPV 相机控制](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation) 进入 OSD 并通过遥控器控制相机。

请注意，录制期间 OSD 控制被禁用。

CADDX 支持：Turtle V2 无需刷新固件即可支持 RUNCAM 协议。

Turtle V2 有两个不同版本的硬件。刷固件可能会导致黄屏无法工作。如果您需要技术支持，请前往 CADDXFPV 官方 Facebook

#### 支持的功能：

##### OSD 菜单控制

进入 OSD 菜单以修改设置，应使用与 [FPV 相机控制](FPV-Camera-Control-Joystick-Emulation) 相同的摇杆命令。

![相机控制杆命令](/img/camera-control-stick-commands.png)

##### 相机按钮模拟（录制）

就像 RunCam Split 一样，支持在开关上开始/停止录制。请按照上述说明进行设置。

## 其他支持的设备

### RunCam 控制适配器（OSD 电缆模拟）

RunCam 控制适配器连接在 FC 上的 OSD 引脚和 UART 之间，允许通过遥控器导航 OSD 菜单。
与 [FPV 相机控制](FPV-Camera-Control-Joystick-Emulation) 不同的是，不需要额外的电阻器或电容器。

根据设备的不同，还支持一些快捷键。例如，使用 Micro Swift2 时，按住向右滚动将切换当前选定的场景。

#### 设置指南

![RC-CA_viki-manua](https://s3-us-west-2.amazonaws.com/runcamfcfiles/RC-CA_viki-manual_v3.jpg)

#### 已确认兼容相机列表

| 雨燕系列         | 兼容 |     | 鹰系列   | 兼容 |     | 麻雀系列 | 兼容 |     | 猫头鹰系列 | 兼容 |     | 天空系列 | 兼容 |     | 纳米 | 兼容 |
| ---------------- | ---- | --- | -------- | ---- | --- | -------- | ---- | --- | ---------- | ---- | --- | -------- | ---- | --- | ---- | ---- |
| 斯威夫特 2       | 是的 |     | 微鹰     | 是的 |     | 麻雀     | 是的 |     | 猫头鹰 2   | 是的 |     | 天空加   | 是的 |     | 纳米 | 没有 |
| 微斯威夫特 2     | 是的 |     | 鹰 2 Pro | 是的 |     | 微麻雀   | 是的 |     | 猫头鹰     | 没有 |     | 天空     | 是的 |     |      |      |
| Swift 2 旋翼暴动 | 是的 |     | 夜鹰 2   | 是的 |     |          |      |     |            |      |     |
| 微斯威夫特       | 是的 |     | 鹰 2     | 是的 |     |          |      |     |            |      |     |
| 雨燕迷你 2       | 是的 |     | 鹰       | 没有 |     |          |      |     |            |      |
| 斯威夫特迷你     | 是的 |     |          |      |     |          |      |     |
