## 说明

基于 STM32F7 的开源飞控，采用 CC BY-SA 3.0 许可，专为 Betaflight 与 INAV 使用而设计。

源代码：https://github.com/sambas/hw/tree/master/AnyFCF7

## MCU、传感器与特性

### 硬件

- 尺寸：36 x 36 mm，安装孔距 30.5 x 30.5 mm
- MCU：STM32F745VGT，100 针 LQFP
- IMU：MPU6000（SPI）
- IMU 中断：支持
- 气压计：MS5611
- VCP：支持
- 硬件 UART：8 个
- 10 路 PWM 输出，其中 6 路支持 DShot
- 6 路 PWM 输入，输入 1 支持 PPM，输入 3/4 支持 UART6
- Blackbox：SD 卡
- 电池电压传感器：支持，10 kΩ / 1 kΩ 分压器
- 电流传感器输入：支持，带 1 kΩ 串联保护电阻
- 模拟 RSSI 输入：支持，带 1 kΩ 串联保护电阻
- 用于进入 DFU 的 Boot 焊盘
- 专用外部 I2C，用于罗盘、皮托管等
- 外部 SPI 与 UART4/5 连接器共用，供未来升级使用，例如 OSD、IMU
- CAN 总线就绪

### 特性

- BLHeli passthrough：支持
- WS2811 LED 灯带：支持，映射至输出 4

## 制造商与经销商

MXK 曾开始生产此类板卡，但使用了低价来源元件。已知来源：

- https://www.banggood.com/STM32F745-100lqfp-216MHz-MPU6000-SPI-F7-Flight-Controller-for-FPV-Racing-Support-Betaflight-p-1137386.html
- http://www.buzzhobbies.com.au/anyfc-f7-flight-controller
- http://www.readytoflyquads.com/anyf7-fc

## 设计者

Sambas

## 维护者

Sambas

## 常见问题与已知问题

中国生产板卡的 SD 卡检测可能无法正常工作。

### 输出引脚定义

| 输出编号 | MCU 引脚 | 默认电机 |     DShot     | 其他             |
| -------- | :------: | :------: | :-----------: | ---------------- |
| 1        |   A03    |    4     | 支持 DMA1_ST6 |                  |
| 2        |   A01    |    3     | 支持 DMA1_ST4 |                  |
| 3        |   E06    |          |    不支持     |                  |
| 4        |   B05    |          | 支持 DMA1_ST5 | 默认 `LED_STRIP` |
| 5        |   B09    |          |    不支持     |                  |
| 6        |   A02    |    2     | 支持 DMA1_ST1 |                  |
| 7        |   A00    |          | 支持 DMA1_ST2 |                  |
| 8        |   B03    |          | 支持 DMA1_ST6 |                  |
| 9        |   B04    |          | 支持 DMA1_ST4 |                  |
| 10       |   B08    |    1     | 支持 DMA1_ST7 |                  |

## 其他资源

RC Groups 讨论帖：https://www.rcgroups.com/forums/showthread.php?2847666-Next-generation-flight-controller-AnyFC-F7
