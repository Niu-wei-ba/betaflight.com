---
sidebar_position: 2
---

# 端口选项卡

GPS、VTX 控制、无线适配器等设备都会接到飞控的 UART。此页面用于定义飞控应如何读取并处理各端口的数据。

![端口选项卡](/img/betaflight_configurator_ports_tab_zh-cn.png)

## 标识符

端口标签，通常为 `UART[x]`、`SOFTSERIAL` 或 `USB`。UART 编号对应飞控上的 RX/TX 引脚对。

## 设置/MSP

通常用于通过 MSP（MultiWii Serial Protocol）与外部设备进行配置或直接控制，也可设置对应波特率。

:::caution

不要把它当作设置“串行接收机”等功能时的 UART“开关”。同时启用冲突选项会导致配置无法保存，这是非常常见的错误。

:::

## 串行接收机

将 UART 用于接收接收机的串行数据，是 UART 最常见的用途。启用该项后，通常无需为同一端口再配置其他功能。

## 回传输出

供较旧遥控系统经独立 UART 向接收机回传遥测，可能需要设置设备波特率。大多数现代系统（如 ELRS）不使用它：现代接收机默认通过与“串行接收机”相同的双向端口交换遥测。

同时要在“接收机”选项卡启用“回传输出”，飞控才会向接收机发送遥测。

## 传感器输入

用于从传感器接收数据，例如 BLHeli_32 ESC 遥测或 GPS。GPS 可能还需要手动指定波特率。

## 外设

用于让飞控控制 VTX、相机、外置 OSD 或支持 MSP 的数字图传等外设。与“回传输出”和“传感器输入”相同，可能需要设置设备波特率；SmartAudio、Tramp 和 MSP VTX 等常见设备通常可使用默认波特率。

更多串口配置见[串口指南](/docs/wiki/guides/current/Serial)，软件模拟串口见 [SoftSerial 指南](/docs/wiki/guides/current/SoftSerial)。
