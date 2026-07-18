# AIO Betaflight F3 飞控

## 更新

### 定时器映射已调整（3.2），2017-07-16

- 软件串口不再干扰电机 1 至 4。
- 软件串口焊盘 / 通孔可用于电机 5 至 6（启用 DShot；六轴 DShot）。
- 在六轴 DShot 配置中，LED 灯带与电机 5 存在 DMA 冲突。建议使用其他定时器资源，推测可使用 PPM。

## 说明

- 集成 OSD、PDB 和 SD 卡适配器。

## MCU、传感器与功能

### 硬件规格

_（请补充硬件规格和未列出的项目）_

- MCU：STM32F303CCT6
- IMU：MPU-6000
- IMU 中断：
- 气压计：无
- USB：STM32 VCP
- 硬件 UART：3 路
- OSD：使用 AB7456 芯片
- Blackbox：SD 卡
- PPM/UART 共用：
- 电池电压传感器：支持
- 电流传感器：0.5 mOhm
- 集成稳压器：3 A；为接收机提供 5 V 或 3 V，为 VTX/相机提供 VBAT 或 5 V，带滤波 AGND
- 按键：BOOT 按键
- 已引出软件串口
- 重量：5.4 g

### 特性

_（待补充特性列表）_

## 制造商和经销商

http://www.fpvmodel.com/-pre-order-betaflight-f3-flight-controller_g1231.html
https://strictlyracingdrones.com/shop/electronics/betaflightf3-flight-controller/

## 设计者

- FPVModel
- Boris B

## 维护者

_（如参与本板测试或代码贡献，请在此添加姓名）_

## 相近 Target

_（在此添加功能或用途相近、但使用独立 target 的板卡链接）_

## 变体

## 常见问题和已知问题

_（在此补充本板专属 FAQ、已知问题与解决方法；进行中的问题请链接对应 GitHub issue 或 pull request）_

_格式：报告人 [姓名]，（状态）：问题内容_

- DSM2/SBUS 焊盘连接至 RX2。
- 在 Betaflight 3.1.0 中，LED_STRIP 与电机 2 冲突。升级到 3.1.6 或更高版本可修复。
- 地平面会充当散热器，使 GND（-）焊盘较难焊接。使用热风台将作业区域预热至 100°C 至 150°C（200°F 至 300°F），可使焊接更快、更容易。
- SD 卡需要按特定参数格式化。
- 必须在 Betaflight 软件中校准电流传感器。
- 滤波电源轨（RAM）供电能力较弱。
- OSD 与 16:9 相机会使 OSD 出现闪烁。
- USB 5 V 电源连接至主 5 V 电源轨。若连接了蜂鸣器、LED 灯带、接收机等大量设备，USB 供电可能关断。此时应先接通电池电源，再连接 USB。
- 状态 LED 为反相接法，且与蜂鸣器并联（PC15）。蜂鸣器静音时 LED 点亮，反之亦然，行为较为特殊。

## 其他资源

## 问题修复

### SD 卡

Samsung Evo Class 10 系列的 16 GB 或 32 GB 卡似乎比其他卡兼容性更好。
（不保证对所有卡有效）

1. 使用 SDcardformatter v4 格式化存储卡。
2. 插入存储卡，仅连接 USB 供电，刷写 BF 3.1.3。
3. 直接进入 CLI 并执行 `set sdcard_dma=on`。
4. 卡应完成初始化，BF 图形界面 Blackbox 选项卡中的图标应显示为绿色。
5. 返回 CLI 并执行 `set sdcard_dma=off`。

### 电流传感器

可测量板上的一个电阻，并据其阻值计算比例系数。

电阻图片见以下链接；其实际位置可能不同，但通常位于附近：

https://static.rcgroups.net/forums/attachments/5/9/3/2/6/3/a9650746-128-EDB2C10E-33D3-40BA-988A-6029EA696B4F.jpg

计算方法见：

https://www.rcgroups.com/forums/showthread.php?2798055-Understanding-Current-Meters

### 驱动程序相关问题

部分用户反馈 Windows PC 无法识别该板卡。

在引导加载程序模式下，需要将默认 STM USB-DFU 驱动替换为 Configurator 固件刷写器可使用的通用 WinUSB 驱动。可使用 Zadig 或 IRCDF 完成此操作。

Zadig：http://zadig.akeo.ie/

ImpulseRC Driver Fixer：https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe（IRC 官方站点链接）

正常模式下，需要安装 STM VCP 驱动：http://www.st.com/en/development-tools/stsw-stm32102.html

这并非本板专有问题。所有使用 STM USB-VCP 端口的 FC 都具有相同行为。详情请阅读[固件安装](/docs/wiki/getting-started/Firmware-Installation)。

### 电机重映射

http://i.imgur.com/Mh41SmG.jpg

## 设置指南

示例：

Tramp HV 或 Unify Pro HV：

- 遥测连接至 UART3 TX 引脚
- 视频信号连接至 video out
- 从 VBAT 和 AGND 取电

相机：

- 视频信号连接至 video in
- 从 VBAT 和 AGND 取电

X4R-SB：

- SmartPort 遥测连接至 UART1 TX 引脚
- SBUS 连接至 UART2
- 从 5 V 电源轨取电

Rcgroups 讨论帖：https://www.rcgroups.com/forums/showthread.php?2795213-NEW-Betaflight-F3-Flight-Controller-OSD-PDB-SD-card-BEC-current-sensor

可能是关于 BFF3 的首个视频：https://www.youtube.com/watch?v=kr16b45Lhw4

适合首次使用 Betaflight F3 FC 装机的参考视频（注意：该视频使用 BFF3 FC 的 ARMATTAN CHAMELEON 装机）：https://www.youtube.com/watch?v=wmbRVg3stoE

https://www.rcgroups.com/forums/showthread.php?2795213-NEW-Betaflight-F3-Flight-Controller-OSD-PDB-SD-card-BEC-current-sensor

## 图片

http://www.fpvmodel.com/-pre-order-betaflight-f3-flight-controller_g1231.html
