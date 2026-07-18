# YuPiF7

Copperyu 为高要求飞手打造的高品质飞控。

## 说明

YuPiF7 是一块搭载 F7 微控制器的 36 x 36 mm 板卡，安装孔距为 30.5 x 30.5 mm。

## MCU、传感器与特性

### 硬件

- MCU：STM32F722
- IMU：ICM-20689（SPI）
- IMU 中断：支持
- 气压计：不支持
- VCP：支持
- 硬件 UART：3 个，其中一个带 SBUS 反相器
- Blackbox：SD 卡插槽
- PPM：提供专用 PPM 输入焊盘
- 电池电压传感器：支持，直接连接，无需额外接线
- 电流传感器：支持，直接连接，无需额外接线
- 集成稳压器：可直接由 2S 至 6S LiPo 供电
- 有刷电机 MOSFET：不支持
- 电机输出：最多驱动 6 个电机
- 按钮：Boot0，用于进入 DFU 模式

### 特性

- BLHeli passthrough：支持
- WS2811 LED 灯带：支持，使用电机输出引脚 5
- 应答器：不支持

## 设计者与维护者

[RcNet](https://github.com/ted-rcnet) 与 [FaduF](https://github.com/Faduf)

## 制造商与经销商

可从 FR 网站商店购买：http://www.yupifc.com

## 硬件设计（如有）

该硬件目前为闭源。
