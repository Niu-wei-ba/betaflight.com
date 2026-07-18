---
sidebar_position: 2
---

# 固件安装

## 在飞控上安装 Betaflight 固件

:::caution

不要急于将飞控刷写为最新固件。成品机通常已由制造商写入正确配置，刷写会清除这些配置；即使是自组机，飞控出厂配置也可能包含某些功能所需的默认项。请先连接并检查现有配置。

:::

在 Betaflight 地面站中打开**固件烧写工具**，可通过在线或本地固件两种方式选择要刷写的版本：

1. 在线加载：在左上角选择目标板和固件版本，点击右下角的**从网络加载固件**。
2. 本地加载：点击**从本地电脑加载固件**，浏览并选择与飞控对应的 Betaflight HEX 固件文件。

   ![](https://user-images.githubusercontent.com/25552059/43810531-307d9cc8-9a86-11e8-9e2c-55cbfe386258.png)

   保持所有选项未勾选（默认值），点击**烧写固件**。地面站会擦除目标板并刷写所选固件。此操作依赖正确的驱动和连接设置，详见下文。

飞控通常使用以下两类 USB 设备：

- 类型 1：使用 Silabs CP2103 USB 接口芯片。
  - 需要 Silabs CP210x 驱动，在 Bootloader 刷写模式和正常配置模式中均使用；在 BFC 中显示为 `COMx`。
  - http://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers
- 类型 2：使用 MCU 集成的 STM32 VCP USB 接口。
  - Bootloader 刷写模式需要 WinUSB 驱动，可通过 Zadig 或 ImpulseRC Driver Fixer 安装；在 BFC 中显示为 `DFU`。
  - 连接和配置需要 STM VCP 驱动；在 BFC 中显示为 `COMx`。
- CC3D 是特殊情况：它属于类型 2，但因使用 STM32F1，缺少 USB DFU 接口。所有 F1 飞控仅支持基于 UART 的 Bootloader，因此 CC3D 需要通过 UART1 接外置 USB 转串口适配器进行刷写，或先刷写 OP Bootloader 等辅助 Bootloader。

## 原生 USB 飞控：类型 2

本节适用于未使用 FTDI、Silabs CP210x 等硬件串口桥的飞控。

驱动问题可使用 [ImpulseRC Driver Fixer](https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe) 修复。该工具要求 .NET Framework 4.5，可从 https://www.microsoft.com/en-au/download/details.aspx?id=30653 获取。

若连接飞控遇到问题，可观看：

[![](https://img.youtube.com/vi/m4ygG6Y5zXI/0.jpg)](https://www.youtube.com/watch?v=m4ygG6Y5zXI)

### Windows：通过 USB DFU 刷写

使用 Windows 刷写 DFU 设备时，需要 Zadig：

1. 下载 [Zadig](http://zadig.akeo.ie/)。
2. 让设备进入 DFU 模式。首次安装 Betaflight 时，在将 USB 接入板卡的同时短接 `BL` 或 `BOOT` 焊盘，或按住 BOOT 按键。
3. 打开 Zadig。
4. 依次选择 **Options** > **List All Devices**。
5. 在下拉列表中选择 `STM32 BOOTLOADER`。

   ![Zadig 截图](https://raw.githubusercontent.com/rs2k/raceflight/raceflight/docs/assets/images/zadig-dfu.png)

6. 在绿色箭头右侧选择 `WinUSB (v6.1.7600.16385)`。
7. 点击 **Install Driver**。
8. 安装完成后重启电脑。若重启期间 USB 持续供电，板卡将保持 DFU 模式；否则重新执行第 2 步。
9. 打开 Betaflight App。
10. 进入固件烧写工具，选择**无重启序列**。
11. 对 F4 目标板，关闭**全芯片擦除**；之后在地面站中重置配置。[#200](https://github.com/betaflight/betaflight-configurator/issues/200) 记录了相关问题。
12. 点击**从本地电脑加载固件**。
13. 选择正确的 HEX 文件，例如 REVO 使用 `betaflight_REVO.hex`。
14. 点击**烧写固件**。
15. 板卡将依次执行擦除、刷写和校验。
16. 刷写完成后板卡会重启；如 Betaflight App 仍无法连接，可能需要安装下文所述 STM VCP 驱动。

### Windows：安装 STMicro Virtual COM Port（VCP）驱动

许多 F7、F4（REVO、ALIENFLIGHTF4、BLUEJAYF4 等）和部分 F3（SPRacingF3EVO、STM32DISCOVERY）使用 STM32 VCP，即 CDC 串口实现。它允许 USB 连接时仍可使用板载 UART，且需要安装 STM VCP 驱动才能在电脑上识别为额外 COM 端口。该流程与安装 FTDI 或 Silabs 等 USB 转串口驱动类似。

STM32 VCP 驱动下载地址： http://www.st.com/web/en/catalog/tools/PF257938

**注意：** 下载并运行安装程序后，通常只是解压驱动文件；请找到安装目录并运行适用于当前系统的 EXE。

例如 `C:\Program Files (x86)\STMicroelectronics\Software\Virtual comport driver\Win8\` 内有 `dpinst_amd64.exe`（64 位）和 `dpinst_x86.exe`（32 位）。

### Windows 10

若以上方法不适用，安装 Silabs 虚拟 COM 端口驱动通常可解决问题：

https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers

### Linux

Linux 不使用产品专属设备驱动，通常无需安装驱动；但 Betaflight App 需要通过 udev 规则取得 USB 写权限。

可能需要安装 `libatomic`：

```
sudo apt install libatomic1
```

#### 步骤 0

至少在 Ubuntu 20.04 及更高版本中，未执行以下命令时 Configurator 无法启动：

```
sudo usermod -a -G plugdev $USER
```

#### 步骤 1

将以下命令复制至终端以创建 DFU 权限规则：

```
(echo '# DFU (Internal bootloader for STM32 and AT32 MCUs)'
	echo 'ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"'
	echo 'ACTION=="add", SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0664", GROUP="plugdev"') | sudo tee /etc/udev/rules.d/45-stdfu-permissions.rules > /dev/null
```

该命令会创建 `/etc/udev/rules.d/45-stdfu-permissions.rules`，飞控处于 DFU 模式时将使用该规则。

#### 步骤 2

确认在非 DFU 模式下也有访问飞控的权限。以下示例假设 USB 设备为 `/dev/ttyUSB0`，Linux 用户为 `user`，且拥有 sudo 权限：

```
[user@machine ~]$ ls -la /dev/ttyUSB0
crw-rw----. 1 root dialout 188, 0 Apr  3 21:16 /dev/ttyUSB0
```

以上权限表示设备所属组为 `dialout`，需要将登录用户加入该组：

```
sudo usermod -a -G dialout user
```

注销并重新登录后应可访问设备。若 `groups` 仍未显示 `dialout`，请重启系统。

#### 安装问题排查

若板卡接入后 `ttyUSB` 设备立即消失，可能是 ModemManager 将它误识别为 GSM 调制解调器。可临时停止该服务：

```
sudo systemctl stop ModemManager.service
```

没有 `systemctl` 时，使用发行版相应的服务管理命令。若需要保留蜂窝网络功能，可将设备 ID 加入 ModemManager 黑名单，但这超出本文范围。

其他程序（配置脚本、ESC 刷写器等）可能改变 `/dev/ttyUSB0` 或 `/dev/ttyACM0` 的端口模式，导致拔插 USB 后仍无法连接。可用下列命令将端口设置复位：

```
stty sane -F /dev/\<your port>
```

## 判断 CPU 已损坏还是仅缺失固件（Blue LED of Death）

CPU 烧毁与仅缺失固件的症状几乎相同，区别在于已损坏的 CPU 无法刷写固件。CPU 可能出厂即损坏、因制造缺陷首次上电失效，或因接线错误而损坏，例如将 5 V 或电池电压接至 UART。损坏时未必会出现可见烟雾。

STM32 需要稳定的 3.3 V 工作电压，因此板上会有专用稳压器。可用以下方式初步判断：

- 使用万用表测量飞控 3.3 V 焊盘与任一 GND 之间的电阻。CPU 正常时，电阻通常为中高千欧级；CPU 损坏时，可能接近零（1–3 ohm）。
- 没有万用表时，找到飞控 3.3 V 稳压器并通过 USB 供电。温度保持较低（约 30 C）时，飞控可能正常；若迅速升至 80–150 C，CPU 可能已损坏。

视频教程：

[![](https://i.ytimg.com/vi/qQ86-GsXVQE/hqdefault.jpg)](https://www.youtube.com/watch?v=qQ86-GsXVQE)

## 其他教程

Betaflight 配置最佳实践视频：

http://www.youtube.com/watch?v=xSzO6HP6yzs

Joshua Bardwell 的 Betaflight App 视频：

https://www.youtube.com/watch?v=VAHUZZXIn9o

Betaflight 飞控刷写分步指南：

http://quadquestions.com/blog/2015/12/25/betaflight_flashing/

CC3D 刷写 Betaflight 视频指南：

http://www.rcgroups.com/forums/showpost.php?p=34196999&postcount=21477

FAQ 中的 “Which HEX target do I download and flash to my Flight Controller” 有助于判断应使用的固件文件。也可查看对应板卡页面；多数板卡页面由设计方、销售方或社区用户维护，个别页面可能为空。
