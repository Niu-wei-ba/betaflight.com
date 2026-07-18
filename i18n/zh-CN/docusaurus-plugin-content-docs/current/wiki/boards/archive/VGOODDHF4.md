# VGOODDHF4

## 说明

- F4 芯片、OSD 与 16 MB Flash
- 简洁的基于 STM32F4 的飞控

## MCU、传感器与特性

### 硬件

- MCU：STM32F4
- IMU：MPU6000（SPI）
- IMU 中断：支持
- 气压计：不支持
- VCP：支持
- 硬件 UART：3 个
- OSD：支持
- Blackbox：支持，板载 128 Mbit Flash
- PPM/UART 共用：UART1
- 电池电压传感器：10:1
- 集成稳压器：SBEC 5 V / 3 A
- 按钮：用于进入 DFU 模式

### 特性

- SBUS/PPM 输入，使用排针；SBUS 端口经反相器连接，并与 PPM 引脚共用
- 4 路 PWM 输出
- 5 V / 3 A SBEC
- WS2811 LED 灯带
- 板载 OSD，通过 SPI 总线由 Betaflight/FC 控制
- 电流传感器接口
- 用于进入 DFU 模式的按钮

## 制造商与经销商

## 设计者

## 维护者

VGOODDHF4

## 相似 target

## 变体

- 与 OmnibusF4 有 99% 相同
- 差异：板载 16 MB Flash 用于 Blackbox

## 常见问题与已知问题

## 其他资源

设置指南：

RC Groups 讨论帖：

## 图片
