## 说明

简洁的基于 STM32F7 的飞控，是 Naze 的 F7 替代方案。

![NERO 顶面，rev1](/img/boards/nero/nero-rev1-top.jpg)
![NERO 底面，rev1](/img/boards/nero/nero-rev1-bottom.jpg)

## MCU、传感器与特性

### 硬件

- 尺寸：36 x 36 mm，安装孔距 30.5 x 30.5 mm
- MCU：STM32F722RET6
- IMU：ICM-20602（SPI）
- IMU 中断：支持
- VCP：支持
- 硬件 UART：3 个
- OSD：UART3 上提供兼容 MinimOSD 的引脚，可堆叠安装
- Blackbox：SD 卡
- PPM/UART 共用：UART6
- 电池电压传感器：支持，直接连接，无需额外接线；全尺寸版本使用 Pololu 时适用
- 集成稳压器：可选 Pololu 背插模块
- 按钮：用于进入 DFU 模式

### 特性

- 电流传感器：可作为 ADC 输入使用，但 PDB 或电池线需要分流电路
- BLHeli passthrough：支持
- WS2811 LED 灯带：支持，使用电机输出引脚 5
- 应答器：不支持
- 引出了 SPI2，可扩展 SPI 外设，例如另一颗陀螺仪

## 制造商与经销商

该板现已上市，预订订单正在发货。

购买地址：

- [fpvgame.eu](https://www.fpvgame.eu/product-page/fc-f7-nero)
- [electricwingman.com](https://www.electricwingman.com/nero-f7-flight-controller)
- [readytoflyquads.com](http://www.readytoflyquads.com/nero-f7-flight-controller)

更多信息：

- [nerofc.com](https://nerofc.com)

## 配置信息

### 接线图

主要接线：

![接线图，rev1](/img/boards/nero/nero-rev1-wiring.png)

Micro 引脚详情：

![Micro 引脚，rev1](/img/boards/nero/nero-rev1-micro-pins.png)

### 原理图

此处提供 MCU 引脚定义，供考虑使用相同 target 开发板卡的人员参考，有助于后续减少 target 数量，也可协助其他开发者添加功能。

![MCU 输出原理图，rev1](/img/boards/nero/nero-rev1-mcu-schematic.png)

# 其他资源

RC Groups 讨论帖：https://www.rcgroups.com/forums/showthread.php?2734745-NERO-STM32F7-based-FC
