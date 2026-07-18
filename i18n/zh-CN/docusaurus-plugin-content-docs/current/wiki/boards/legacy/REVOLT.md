## REVOLT V2 用户请注意

所有关于 Revolt V2 的信息同样适用于 Skitzo FC；两者为相同板卡，仅颜色不同。

当前 Betaflight 构建尚未直接支持该板，但可按以下步骤运行 Betaflight：

1. 安装 Betaflight 3.1.7 或更高版本。
2. 焊接板底焊盘以启用 UART1 的反相功能。参见 ![照片](https://static.rcgroups.net/forums/attachments/4/7/1/6/9/4/a9783283-253-Revolt_V2%20Bottom.jpg)。
3. 按 Revolt V2 接线图将接收机接到 UART1（务必使用 V2 接线图）：
   https://flightone.us/wiki/#pinout_section
4. 在 CLI 中执行：

```text
set serialrx_halfduplex=ON
```

（自 v3.4.0 起该设置为默认值。） 5. 点击保存。 6. REVOLT V2 还需要跳接 RX1 和 TX1 焊盘才能使接收机工作。详见[此处](https://drive.google.com/file/d/0B5fFGD7QYC-lVFBkT0dLV3Y2ekZId0RWTFV2ci1FWVNFNTlJ/view?usp=sharing&resourcekey=0-zYWN4zV_ZKSK-V4xl_J6Ow)。

#### FrSky XSR 遥测

需进行“非反相 XSR 改装”。参见 [X4R/XSR 改装说明](https://blck.mn/2016/06/smartport-the-frsky-xsr-and-betaflight/)。使用此改装时，S.Port 线应接到 Revolt V2 的 TX3 引脚；不要与 V2 接线图中标注的 RX3 混淆。

#### macOS 的 Blackbox 日志下载损坏

若下载 Blackbox 日志失败，可参考：
https://www.rcgroups.com/forums/showpost.php?p=36811734&postcount=44503

更多细节：
https://github.com/betaflight/betaflight-configurator/issues/411

这是临时方案，需要手动安装修补版 Configurator；后续官方版本将解决该问题。

## v3.4.0 后的 Revolt V1 S.BUS 配置

自 v3.4.0 起，REVOLT target 被改写为独立 target，不再是 REVO target 的子 target。新 target 为 UART1 引入的默认双工设置仅适用于 V2/V3，导致 v3.4.0 前后的 Revolt V1 配置不兼容。

v3.4.0 后，将 S.BUS 接到 SBUS 焊盘的 Revolt V1 用户必须显式关闭 `serialrx_halfduplex`：

```text
set serialrx_halfduplex = OFF
```

下图说明了该操作的硬件原理：

![V1、V2 与 V3 的硬件差异](https://user-images.githubusercontent.com/14850998/44298169-38f6ac00-a319-11e8-8db7-1132bcf28d09.png)

---

# 板卡信息

## 名称

Revolt V1 和 V2

## 说明

该 FC 原为运行 RaceFlight 闭源固件而设计，但 Betaflight 提供名为 `REVOLT` 的 target。

## MCU、传感器与功能

### 硬件

- MCU：STM32F405RGT6
- IMU：ICM-20602
- 虚拟串口（VCP）
- Blackbox
- PPM/UART 共用
- 电池电压传感器（VBAT）
- BOOT 焊盘（无按键）

## 制造商与经销商

https://revoltfc.com/index.html

## 相近 target

该板是 REVO 的精简变体，部分 STM MCU 引脚分配相同。
