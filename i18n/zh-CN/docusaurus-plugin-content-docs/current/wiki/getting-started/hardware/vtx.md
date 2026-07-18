# 图传（VTX）

视频发射器通常称为 VTX。它们一般是工作在 5.8 GHz 频段的模拟或数字图传系统；部分专用长距离飞行器也会使用其他频段。

## 模拟 FPV 图传

模拟图传系统通过 5.8 GHz 频段的频道，以 PAL 或 NTSC 制式传输 CVBS 视频信号。

- 早期穿越机的 FPV 硬件源自模拟安防摄像头及其配套发射设备。
  - 早期设备需要通过 VTX 上的物理开关手动选择频道，使用并不方便。
  - 飞手很容易开机后占用或干扰正在飞行的其他飞手的视频频道。
- 随着相机性能提升，VTX 已更深度地融入整个 FPV 使用体验。
  - [TBS SmartAudio](/docs/wiki/guides/current/SmartAudio) 和 [ImmersionRC Tramp](/docs/wiki/guides/current/IRC-Tramp) 可让用户通过 FC 调整视频频道、频段和发射功率。飞手必须向 FC 提供有效的频道、频段和功率档位列表，即 [VTX 表](/docs/wiki/guides/current/VTX#vtx-tables)。
  - [OpenVTX](https://github.com/OpenVTx/OpenVTx) 引入 MSP VTX 控制。MSP VTX 可上报可用的频道、频段与功率信息，因此无需 VTX 表。
  - [ExpressLRS Backpack](https://github.com/ExpressLRS/Backpack/wiki) 可控制任意 SmartAudio、Tramp 或 MSP VTX，同时让护目镜自动切换到相同频道。

早期系统的 OSD 是类似 Minim OSD 的独立扩展板，如今已被 FC 板载 OSD 芯片取代。许多 FC 使用 AT7456：它会在把视频信号送往 VTX 发射之前，将黑白字符式 OSD 叠加到相机画面上。

## 数字 FPV 图传

- [HDZero](https://www.hd-zero.com/) 是单向数字图传系统，被视为对既有模拟图传技术路线的延续。
  - 使用相同频段；模拟 Raceband 可与模拟图传飞手共用，不会干扰其他频道。
  - 支持从 FC 通过 MSP 控制 VTX 的频段和频道。
  - 可与 ELRS Backpack 集成，实现 VTX 与护目镜的联动。
  - 已实现并可使用 MSP DisplayPort。
- [DJI FPV](https://www.dji.com/fpv) v1 于 2019 年推出，是首个广泛可用、适合安装在 5 英寸穿越机上的数字 FPV 系统。
  - DJI FPV v1 包括 Goggles v1，以及后续推出的 Goggles v2。
  - 提供两款 VTX：没有安装孔的大型双天线 Air Unit，以及带 20 x 20 mm M2 安装孔的小型单天线 Air Unit Lite。
  - 大型 VTX 宣称支持 1080p 板载 microSD DVR 录制，但 Air Unit 上的录制可靠性较差，常在数秒后停止。
  - 数字图传性能足够使用，但 OSD 实现不佳，缺少 `Warnings` 等关键元素的支持。
  - WTFOS 是一套第三方系统，可为初代 DJI FPV 系统提供完整 OSD 支持。
  - Caddx 和 Runcam 曾推出多款非 DJI 相机。
- [DJI O3](https://www.dji.com/newsroom/news/dji-launches-o3-air-unit) 于 2022 年推出，是 v1 系统的后继产品。
  - 同时推出 Goggles 2，注意它不同于 Goggles v2。
  - 同时推出 O3 Air Unit VTX 与相机，画质和传输距离均优于 v1。
  - Goggles 2 通过固件更新可配合上一代 Air Unit Lite 使用，但会使该 Air Unit 无法再搭配 Goggles v1 和 v2。
  - Goggles v2 可切换至兼容 O3 Air Unit 的模式，但这可能清除与上一代 Air Unit 的配对信息。
  - 支持与 DJI Action 2 相当的板载 4K DVR，并兼容免费的 [GyroFlow 防抖](https://gyroflow.xyz/)。
  - MSP DisplayPort 仅部分实现，部分字符无法正确绘制，且仍存在缺陷。
- [Caddx WalkSnail Avatar](https://caddxfpv.com/collections/walksnail-avatar-system) 于 2022 年作为新的数字 VTX 系统推出。
  - 提供多种护目镜、独立 VRX、VTX 和相机。
  - 初期护目镜基于与 Fat Shark 的合作，之后由 Caddx 推出新型号。
  - 性能与 DJI v1 接近，但 VTX 体积更小。
  - 支持录制 1080p 板载 DVR 到 8 GB 或 32 GB 内部闪存。
  - v2 及更新相机配有板载陀螺仪，可记录数据供免费的 [GyroFlow 防抖](https://gyroflow.xyz/) 使用。
  - 已完整实现 MSP DisplayPort，并在 Betaflight 4.5 中支持彩色字体。

数字图传系统通常在 FPV 护目镜中渲染 OSD，而不是在发射前将其叠加到视频上。原因包括：低功耗 VTX 难以承担高分辨率数字视频的 OSD 叠加计算，以及数字视频压缩算法通常不擅长处理边缘清晰的文本字符。在护目镜端渲染是一种折中方案，能够同时提供低延迟视频和清晰的 OSD 文本。OSD 数据通过 UART 由 FC 使用 [MSP DisplayPort 协议](/docs/development/API/DisplayPort)发送至 VTX，再作为独立 OSD 数据流与视频流一同发送至护目镜。
