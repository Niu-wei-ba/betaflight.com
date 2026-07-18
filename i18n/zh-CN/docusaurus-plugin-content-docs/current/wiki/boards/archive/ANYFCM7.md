## 说明

基于 STM32F7 的开源飞控，采用 CC BY-SA 3.0 许可，专为 Betaflight 与 INAV 使用而设计。

源代码：https://github.com/sambas/hw/tree/master/AnyFCM7

## MCU、传感器与特性

### 硬件

- 尺寸：36 x 36 mm，安装孔距 30.5 x 30.5 mm
- MCU：STM32F722RET6，64 LQFP，216 MHz
- IMU：MPU6000（SPI）
- IMU 中断：支持
- 气压计：MS5611
- VCP：支持
- 硬件 UART：4 个
- 10 路 PWM 输出
- 6 路 PWM 输入，输入 1 支持 PPM，输入 3/4 支持 UART6
- Blackbox：128 MB DataFlash
- 电池电压传感器：支持，10 kΩ / 1 kΩ 分压器
- 用于进入 DFU 的 Boot 焊盘
- 外部 I2C，用于罗盘、皮托管等
- 外部 SPI 与 UART4/5 连接器共用，供未来升级使用，例如 OSD、IMU

### 特性

- BLHeli passthrough：支持
- WS2811 LED 灯带：支持，映射至输出 4

## 制造商与经销商

## 设计者

Sambas

## 维护者

Sambas

## 常见问题与已知问题

## 其他资源

RC Groups 讨论帖：https://www.rcgroups.com/forums/showpost.php?p=37189186&postcount=2
