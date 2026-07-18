## 说明

[Crazyflie 2.0](https://www.bitcraze.io/crazyflie-2/) 是由瑞典 [Bitcraze AB](https://www.bitcraze.io/) 销售的有刷纳米四轴开发套件。飞控板本身就是飞行器：PCB 呈 X 形，塑料电机座可滑装在四个机臂上。它集成 NRF51822 SoC 作为接收机。

Crazyflie 2.0 拥有丰富的[扩展板](https://wiki.bitcraze.io/projects:crazyflie2:expansionboards:index)系统。不同扩展板插入扩展排针后，可提供蜂鸣器、LED、室内定位等附加功能；甚至还有用于安装到更大无刷机架的 ESC 转接扩展板。

该板拥有自己的操作系统和客户端工具，用于支持飞行器及其扩展板的全部功能。此 Betaflight/Cleanflight 移植版旨在支持核心飞行场景，并不一定支持所有扩展板功能。

## MCU、传感器与特性

### 硬件

- MCU：STM32F405RG，飞行控制；NRF51822，Bluetooth 与 Nordic ESB 接收机
- IMU：Invensense MPU9250
- IMU 中断：支持
- 气压计：STM LPS25H，Betaflight 尚无驱动
- 罗盘：MPU9250 内置
- USB：STM32 VCP
- 硬件 UART：0 个；NRF51822 至 STM32 有一条内部桥接
- 软件 UART：0 个
- OSD：不支持
- RC 接收机：NRF51822，Bluetooth 或 Nordic ESB，自定义接收机协议
- FPV 发射机：不支持
- Blackbox：不支持
- PPM/UART 共用：不支持
- 电池电压传感器：不支持
- 有刷电机 MOSFET：支持
- 按钮：连接至 NRF51822 的电源键，可用于[进入 DFU 模式](https://wiki.bitcraze.io/projects:crazyflie2:development:dfu)
- ESC/电机输出：4 路有刷电机
- 无缓冲双向 ESC 输入/输出：不支持
- 状态 LED：LED0/LED1/LED2
- 有源蜂鸣器输出：不支持
- 无源蜂鸣器输出：不支持
- LED 灯带输出：不支持
- SBUS 反相器：不支持
- PDB：支持，使用 1S 电池
- 稳压器：支持，最高 1S 输入
- 滤波电源输出：不支持

### 软件

- 固件 target：CRAZYFLIE2

## 制造商与经销商

[Bitcraze AB 在线商店](https://store.bitcraze.io/)

[SeeedStudio](https://www.seeedstudio.com/Crazyflie-2.0-p-2103.html)

## 设计者

[Arnaud Taffanel、Marcus Eliasson、Tobias Antonsson](https://www.bitcraze.io/team/)

## 维护者

[Sean Kelly](https://github.com/theseankelly)

## 相似 target

_在此添加功能相似但具有独立 target 的板卡说明链接。_

## 变体

差异：

## 常见问题与已知问题

## 其他资源

[原理图](https://wiki.bitcraze.io/_media/projects:crazyflie2:hardware:crazyflie_2.0_rev.c_schematics.pdf)

[Bitcraze Wiki 设置指南](https://wiki.bitcraze.io/projects:crazyflie2:development:dfu)

## 图片
