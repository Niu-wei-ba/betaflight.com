# 串口直通

## 更新 FrSky XSR 接收机固件

由于 FrSky 工具无法加载 COM 端口，本文作者未能复现该流程。如你熟悉此过程，可按需更新本文。

更新：Joshua Bardwell 已发布此流程的视频：
[https://www.youtube.com/watch?v=Hzf-EuQZYsE](https://www.youtube.com/watch?v=Hzf-EuQZYsE)

### FrSky 工具

[https://www.frsky-rc.com/stk/](https://www.frsky-rc.com/stk/)

- 展开 **Tool-FrSky update sport**；
- 点击 **Download**；
- 解压下载的 `.zip` 文件，并记住其路径。

### FrSky 接收机固件

[https://www.frsky-rc.com/download/](https://www.frsky-rc.com/download/)

下载接收机对应的固件。若下列列表未包含你的接收机，请在上述下载页面查找正确的接收机型号固件。解压后记住其路径：

- [https://www.frsky-rc.com/xsr/](https://www.frsky-rc.com/xsr/)
- [https://www.frsky-rc.com/r-xsr/](https://www.frsky-rc.com/r-xsr/)
- [https://www.frsky-rc.com/xm-plus-mini-sbus-non-telemetry-full-range/](https://www.frsky-rc.com/xm-plus-mini-sbus-non-telemetry-full-range/)
- [https://www.frsky-rc.com/x4rsb/](https://www.frsky-rc.com/x4rsb/)
- [https://www.frsky-rc.com/r9-mini/](https://www.frsky-rc.com/r9-mini/)
- https://www.frsky-rc.com/r9-slim-plus/

### 操作流程

注意：此方法未必适用于所有情况。为提高成功率，应通过**非专用接收机电源焊盘**的 `5V` 电源为接收机供电，_不要让接收机由 USB 供电_。某些飞控有专用的接收机焊盘组（Ground、5V 和 Signal）；连接 USB 后，其 `5V` 焊盘有时会供电。应避免使用该 `5V`，改接 FC 上其他 `5V` 电源。

此外，确认 SmartPort 正常工作时成功率最高，因为此流程会使用对应 UART。带专用 SmartPort 焊盘的 F4 飞控最容易处理。若没有专用焊盘，则需要了解反相设置，本文不作展开。F3 和 F7 原生支持 UART 反相，几乎任意 UART `TX` 焊盘均可，因此不受此问题影响。

**重要：刷写 / 升级接收机时，不要断开电源。**

1. 用 USB 将四轴飞行器连接到电脑。若接收机也随之上电，应停止操作，因为它不应上电；记录 COM 端口。
2. 进入 **Ports** 选项卡，确认 SmartPort 所在 UART，并将编号减 1。例如 SmartPort 位于 UART 3 时，需要的编号为 2。
3. 打开 Betaflight App，连接四轴飞行器，进入 CLI。
4. 输入并发送 `serialpassthrough 2 57600`。其中 `2` 是 UART ID：UART 3 实际为 ID 2，UART 2 为 ID 1，UART 1 为 ID 0；然后按 **ENTER**。

若操作正确，应看到：

`Port 2 opened, baud = 57600`

`Forwarding, power cycle to exit`

5. 关闭 Betaflight App，但不要让 FC 断电重启。
6. 启动 **FrSky_Update_sport_rev**... 工具；它位于解压 _Tool-FrSky update sport_ 后的目录中。
7. 选择 Betaflight App 使用的 COM 端口。
8. 点击 **File**，定位至接收机固件解压目录。工具随后等待查找设备，窗口底部显示“_Finding device..._”。
9. 为四轴飞行器接上 LiPo，为接收机供电。

若操作正确，工具窗口底部会显示固件版本，而不是“Finding device”。否则表示未成功。

10. 若上述步骤正常，点击 **Download**。底部状态信息应变为“Please wait, in progressing”（原工具中的拼写如此）。

## 接收机由 USB 供电时

部分设置会出现这种情况。此时需要能断开接收机的方式，例如插头。待工具窗口显示“_Finding device..._”后重新连接接收机，即会开始刷写。操作风险自担。

## 注释

来自 BryceJ：在配有 CP210x 的 Spracingf3 板卡上，只有同时将 MSP 速率改为 `57600` 时才可工作，原因未知。若更改 MSP 速率，请确保也以 `57600` 重新连接 Configurator。

若在 Taranis 上使用 PID/VTx 调整，请确认其仍能工作；曾有若干版本无法正常工作。

若需断开 XSR，仍保留插头时可直接插拔。对直接焊接的 X4R，操作会更麻烦。

## minimOSD 串口直通

可使用 MW OSD Configurator 调整设置和加载字体。

[视频](https://www.youtube.com/watch?v=5ABd0gz3ckI)
