# Demon Soul F4

## 描述

基于 REVO，配有 SBUS 和 S.Port 反相器；仅引出一个完整功能的 UART3。

## MCU、传感器与功能

### 硬件

- MCU：STM32F405
- IMU：MPU-6000
- 电机输出：4 路
- IMU 中断：未说明
- 气压计：不支持
- VCP：支持
- 硬件 UART：UART1 仅用于 SBUS RX，UART6 用于 S.Port，UART3 可作通用用途
- OSD：不支持
- Blackbox：2MB SPI Flash
- PPM/UART 复用：支持
- 电池电压传感器：支持
- 集成稳压器：不支持
- 有刷电机 MOSFET：不支持
- 按钮：无

### 功能

SmartPort 遥测反相。本板使用下列原理图对 SmartPort 信号进行反相，并拆分为 RX 和 TX 分量：

![S.Port 反相器](/img/boards/soulf4/smartport-inverter-schematic.png)

要正确设置 SmartPort，请将接收机对应导线接到飞控标有 `S.Port` 的焊盘，然后在 CLI 中输入：

```
set tlm_inverted = off
set tlm_halfduplex = off
save
```

不要忘记为 UART6 启用 SmartPort 遥测（“Ports”选项卡中的第 3 个 UART）。

## 制造商与经销商

http://demonrc.eu/product/demon-soul-f4-high-performance-flight-controller/

## 设计者

Adam Tusk（？）

## 维护者

Andrey Mironov（@DieHertz）

## 相似目标

REVO F4

## 常见问题与已知问题

- 本板的 `PB2/BOOT1` 引脚未接地（感谢 [Dominic Clifton（hydra）](https://github.com/hydra) 指出此问题），因此即使短接 BOOT 焊盘也可能无法进入 DFU 模式。可按下图从 PB2 接一根跳线至 GND 解决。
  ![BOOT1 接地](/img/boards/soulf4/soulf4-dfu-boot1-fix.png)
- SWD 连接器引脚定义：GND、SWCLK、SWD、NRST、VDD。

## 图片

![正面](http://demonrc.eu/wp-content/uploads/2017/01/Demon-Soul-F4-Flight-Controller-Connection-Diagram.jpg)
![背面](/img/boards/soulf4/soulf4-back-face.png)
