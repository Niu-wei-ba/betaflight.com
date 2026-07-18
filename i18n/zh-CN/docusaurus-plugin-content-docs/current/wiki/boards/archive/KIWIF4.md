# KIWI F4

## 说明

## MCU、传感器和功能

### 硬件

- MCU：STM32F405RGT6
- IMU：MPU6000
- IMU 中断：
- 气压计：无
- VCP：支持
- 硬件 UART：4 个
- OSD：支持
- 黑匣子：闪存芯片
- PPM/UART 共用：
- 电池电压传感器：支持
- 集成稳压器：支持
- 有刷电机 MOSFET：无
- 按钮：BOOT

### 功能

## 制造商和经销商

[https://flyinglemon.eu/flight-controllers/39-kiwif4-flight-controller.html](https://flyinglemon.eu/flight-controllers/39-kiwif4-flight-controller.html)

[https://beaverfpv.com/collections/new-arrivals/products/kiwi-f4-flight-controller-kiwi-pdb](https://beaverfpv.com/collections/new-arrivals/products/kiwi-f4-flight-controller-kiwi-pdb)

## 设计者

- JohnLemon
- Flyinglemon

## 维护者

（若参与测试或为该板卡贡献代码，请在此添加姓名。）

## 相似目标

（在此添加功能相近但使用独立 target 的板卡说明链接。）

## 变体

差异：

## 常见问题与已知问题

（在此添加该板卡相关的常见问题、已知问题和解决方法；进行中的问题请链接至对应 GitHub issue 或 pull request。）

格式：报告者 [姓名]，（状态）：问题内容。

### FrSky XSR 遥测

要使用遥测，需要对 XSR 执行 “un-inverted XSR hack”，操作并不复杂。

[X4R/XSR 改造说明](https://blck.mn/2016/06/smartport-the-frsky-xsr-and-betaflight/)

完成该 XSR 改造后，遥测仅可在 UART6 使用（UART3 不可用）。

### macOS 用户修复黑匣子日志下载损坏

若下载黑匣子日志时出现问题（可能仅影响 BF3.1 及更高版本），可参考：

[https://www.rcgroups.com/forums/showpost.php?p=36811734&postcount=44503](https://www.rcgroups.com/forums/showpost.php?p=36811734&postcount=44503)

更多细节：

[https://github.com/betaflight/betaflight-configurator/issues/411](https://github.com/betaflight/betaflight-configurator/issues/411)

这是临时方案，需要手动安装修补版 BF Configurator；官方 BF Configurator 的后续版本将修复此问题。

### LED 信号线

接线图未标注 RGB LED 信号线。该信号线接在飞控背面的 DATA 焊盘；5 V 和地线需从板上其他位置引出，例如 UART3/6 接口。请注意，KIWI 的电源容量为 600 mA，其中飞控和 OSD 约需 280 mA。

### 无法进入 Bootloader 模式（DFU）

某些设备，例如连接到 SBUS/IBUS 端口的接收机，或连接到任一 UART 的设备，可能阻止飞控进入 USB Bootloader 模式。此时 Windows/macOS 无法识别飞控：Windows 显示为 “Unknown Device”，macOS 报告 “enumeration errors”。若出现这些错误，请拔掉飞控上的所有外接设备，仅连接飞控后再刷写。

### 电压和电流标定

Flying Lemon 建议使用以下标定值：电压 57，电流 320。若怠速时显示反向电流、飞行时读数过高，可尝试电压 57、电流 444、偏移量 11。

对于带 PDB 的 KIWIF4V2：`set ibata_scale = 411`，并设置 `set ibata_offset = -7`。

## 其他资源

设置指南：

[http://flyinglemon.eu/ext_images/kiwif4_wiring_s.pdf](http://flyinglemon.eu/ext_images/kiwif4_wiring_s.pdf)

RCGroups 讨论：

## 图片
