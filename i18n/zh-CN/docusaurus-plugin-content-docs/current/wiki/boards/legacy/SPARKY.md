# Sparky

Sparky 是一款成本低、性能强大的飞控板。

- 3 个硬件串行端口。
- 内置串行端口逆变器，无需外部逆变器即可使用 S.BUS 接收机。
- USB（可与串行端口同时使用）。
- 10 个 PWM 输出。
- 专用 PPM/SerialRX 输入引脚。
- MPU9150 I2C 加速度计/陀螺仪/磁力计
- 气压计

使用修订版 1 和 2 板进行测试。

## 待办事项

- 显示屏（通过 Flex 端口）
- SoftSerial - 虽然有 3 个硬件串行端口使其有点多余。
- 飞机 PWM 映射。

# 电压和电流监控（ADC 支持）

通过 PWM9 引脚启用时可以进行电压监控，并且可以通过 PWM8 引脚监控电流。分压器和电流传感器需要外接。需要调整 vbatscale cli 参数以适应传感器规格。有关传感器硬件的更多详细信息，您可以在此处查看：https://github.com/TauLabs/TauLabs/wiki/User-Guide:-Battery-Configuration

# 刷写固件

## 通过设备固件上传（DFU、USB）- Windows

这些说明适用于在 Windows 下使用 DfuSE 刷新 Sparky 板。
致谢 Thomas Shue（以下步骤的完整视频可在此处找到：https://www.youtube.com/watch?v=I4yHiRVRY94）

所需软件：
DfuSE 版本 3.0.2（最新版本 3.0.4 导致错误）：http://code.google.com/p/multipilot32/downloads/detail?name=DfuSe.rar
STM VCP 驱动程序 1.4.0：http://www.st.com/web/en/catalog/tools/PF257938

DFU 需要二进制文件，而不是 .hex 文件。如果发行版中未包含其中之一，请按如下方式构建一个。

```
Unpack DfuSE and the STM VCP Drivers into a folder on your Hardrive
Download the latest Sparky release (cleanflight_SPARKY.hex) from:
https://github.com/cleanflight/cleanflight/releases and store it on your Hardrive

In your DfuSE folder go to BIN and start DfuFileMgr.exe
Select: "I want to GENERATE a DFUfile from S19,HEX or BIN files" press OK
Press: "S19 or Hex.."
Go to the folder where you saved the cleanflight_SPARKY.hex file, select it  and press open
(you might need to change the filetype in the DfuSE explorer window to "hex Files (*.hex)" to be able to see the file)
Press: "Generate" and select the .dfu output file and location
If all worked well you should see " Success for 'Image for lternate Setting 00 (ST..)'!"

```

通过在临时桥接引导加载程序引脚的情况下打开 Sparky 电源，将设备置于 DFU 模式。唯一应该亮起的灯是蓝色 PWR LED。

检查 Windows 设备管理器以确保正确识别该板。
它应该在通用串行总线控制器下显示为“DFU 模式下的 STM 设备”

如果它在端口（COM 和 LPT）下显示为“STMicroelectronics Virtual COM”，则说明该板未处于 DFU 模式。断开电路板，连接电路板时再次短接引导加载程序引脚。

如果该板在设备管理器中显示为“STM 32 Bootloader”设备，则需要手动更新驱动程序。
在设备管理器中选择设备，按“更新驱动程序”，选择“手动更新驱动程序”，然后选择提取 STM VCP 驱动程序的位置，选择“让我选择要安装的驱动程序”。您现在应该能够选择 STM32 Bootloader 驱动程序或 DFU 模式驱动程序中的 STM。选择后者并安装。

然后刷新二进制文件，如下所示。

```
In your DfuSE folder go to BIN and start DfuSeDemo.exe
Select the Sparky Board (STM in DFU Mode) from the Available DFU and compatible HID Devices drop down list
Press "Choose.." at the bootom of the window and select the .dfu file created in the previous step
"File correctly loaded" should appear in the status bar
Press "Upgrade" and confirm with "Yes"
The status bar will show the upload progress and confirm that the upload is complete at the end

```

断开开发板与 USB 的连接并重新连接，然后按照正常方式继续通过 Cleanflight 地面站对其进行配置

## 通过设备固件上传（DFU、USB）- Mac OS X / Linux

这些说明适用于 dfu-util，已使用来自 OpenTX 项目的 dfu-util 0.7 for OSX 进行测试。

http://www.open-tx.org/2013/07/15/dfu-util-07-for-mac-taranis-flashing-utility/

DFU 需要二进制文件，而不是 .hex 文件。如果发行版中未包含其中之一，请按如下方式构建一个。

```
make TARGET=SPARKY clean
make TARGET=SPARKY binary
```

通过在临时桥接引导加载程序引脚的情况下打开 Sparky 电源，将设备置于 DFU 模式。唯一应该亮起的灯是蓝色 PWR LED。

运行“dfu-util -l”以确保列出设备，如下所示。

```
$ dfu-util -l
dfu-util 0.7

Copyright 2005-2008 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2012 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to dfu-util@lists.gnumonks.org

Found DFU: [0483:df11] devnum=0, cfg=1, intf=0, alt=0, name="@Internal Flash  /0x08000000/128*0002Kg"
Found DFU: [0483:df11] devnum=0, cfg=1, intf=0, alt=1, name="@Option Bytes  /0x1FFFF800/01*016 e"
```

然后刷新二进制文件，如下所示。

```
dfu-util -D obj/cleanflight_SPARKY.bin --alt 0 -R -s 0x08000000
```

输出应该与此类似：

```
dfu-util 0.7

Copyright 2005-2008 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2012 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to dfu-util@lists.gnumonks.org

Opening DFU capable USB device... ID 0483:df11
Run-time device DFU version 011a
Found DFU: [0483:df11] devnum=0, cfg=1, intf=0, alt=0, name="@Internal Flash  /0x08000000/128*0002Kg"
Claiming USB DFU Interface...
Setting Alternate Setting #0 ...
Determining device status: state = dfuERROR, status = 10
dfuERROR, clearing status
Determining device status: state = dfuIDLE, status = 0
dfuIDLE, continuing
DFU mode device DFU version 011a
Device returned transfer size 2048
No valid DFU suffix signature
Warning: File has no DFU suffix
DfuSe interface name: "Internal Flash  "
Downloading to address = 0x08000000, size = 76764
......................................
File downloaded successfully
can't detach
Resetting USB to switch back to runtime mode

```

在 Linux 上，您可能需要注意调制解调器管理器不会尝试将您的 Sparky 用作调制解调器，使其进入引导加载程序模式。如有疑问，您可能想卸载它。修复 udev 也是个好主意。看起来 teensy 就是这么做的 -> http://www.pjrc.com/teensy/49-teensy.rules （未经测试）

要进行整个芯片擦除，您可以使用由以下命令创建的文件

```
dd if=/dev/zero of=zero.bin bs=1 count=262144
```

这可以由 dfu-util 使用。

## SWD

板的底部有一个 SWD 接头插座，可焊接到开关上的 JST-SH 连接器。
一旦连接了 SWD，您就可以使用 st-link 或 j-link 工具来刷新二进制文件。

请参阅 Sparky 原理图了解 CONN2 引脚排列。

## TauLabs 引导加载程序

刷新 cleanflight 将擦除 TauLabs 引导加载程序，这不是问题，可以使用 st flashloader 工具轻松恢复。

# 串口

|价值|标识符 |接收|德克萨斯州 |笔记|| -----| ---------- | ---------| ---------- | -------------------------------------------------------------------------- |
| 1 | USB VCP |接收（USB）| TX（USB）| |
| 2 | USART1 | RX / PB7 | TX / PB6 | Conn1 / 灵活端口。 |
| 3 | USART2 | RX / PA3 |脉宽调制 6 / PA2 | RX 位于 INPUT 标头上。串行 RX 输入的最佳端口 |
| 4 | USART3 | RX / PB11 | TX / PB10 | RX/TX 位于 PWM 输出上方 6 针接头的一端。 |

USB VCP*可以*与其他串行端口同时使用（与 Naze32 不同）。

所有 USART 端口均支持自动硬件反转，允许直接连接 FrSky X4RSB 等串行接收机 - 无需外部逆变器。

# 声纳连接

| 针         | 信号 | 功能   | 电阻    |
| ---------- | ---- | ------ | ------- |
| 脉宽调制 6 | PA2  | 触发销 | 1K 欧姆 |
| 脉宽调制 7 | PB1  | 回声针 | 1K 欧姆 |

警告：PWM6 和 PWM7 引脚均不耐 5V 电压，因此传感器和 FC 引脚之间需要一个 1K 欧姆的电阻。

# 电池监测连接

| 针         | 信号 | 功能     |
| ---------- | ---- | -------- |
| 脉宽调制 9 | PA4  | 电池电压 |
| 脉宽调制 8 | PA7  | 电流表   |

## 电压监测

Sparky 没有电池分压器电路，PWM9 有一个内联 10k 电阻，必须将其纳入电阻计算中。
分压器电路最终应在 MCU 输入引脚处产生 0v 至 3.3v（最大值）之间的电压。

警告：在连接到 FC 之前，请使用电压表仔细检查分压器的输出。

### 示例电路

对于 3 芯电池分压器，以下电路有效：

`Battery (+) ---< R1 >--- PWM9 ---< R2 >--- Battery (-)`

- R1 = 8k2（灰红红）
- R2 = 2k0（红黑红）

  11.2v 电池的电压为 2.2k。该分隔线的 `vbat_scale` 应设置在 `52` 附近。

## 电流监测

将电流传感器连接到 PWM8/PA7，提供 0v 和 3.3v 输出（最大值）之间的范围。
