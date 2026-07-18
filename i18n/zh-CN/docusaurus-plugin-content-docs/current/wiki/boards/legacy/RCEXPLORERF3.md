# RC Explorer F3 FC Racing

该板以性能和成本为设计重点。

## 说明

RCExplorer F3FC Racing 是一款经济型 STM32F3 飞控，集成稳压器、电压监测、电流传感器输入、3 个 UART、LED 端口、舵机反馈/RSSI 和 MPU6000 陀螺仪。

target HEX 名称：`RCEXPLORERF3`

## MCU、传感器与功能

### 硬件

- MCU：STM32F303CC
- IMU：MPU6000（SPI）
- IMU 中断：有
- 气压计：无
- VCP：有
- 硬件 UART：3 个
- OSD：无
- Blackbox：无
- PPM/UART 共用：无，PWM6 用于 PPM
- 电池电压传感器：有，直接连接无需接线
- 集成稳压器：有，最高支持 6S
- 有刷电机 MOSFET：无
- 按键：1 个 DFU

### 功能

- 电流传感器：有，输入范围 0-3.3 V
- BLHeli 直通：有
- WS2811 LED 灯带：有，使用专用 LED 输出
- 竞赛应答器：无

## 硬件设计

未公开。

## 制造商与经销商

RCExplorer.se

http://rcexplorer.se/product/f3fc-racing/

## 设计者

David Windestål

## 维护者

Jaakko Laurikainen

## 相近 target

`LUX_RACE`、`SPARKY`

## 已知问题

默认资源映射适用于四轴飞行器。若用于三轴飞行器，需手动重映射资源以提供尾舵机输出：

```text
resource MOTOR 1 A08
resource MOTOR 2 B00
resource MOTOR 3 A04
resource MOTOR 4 NONE
resource MOTOR 5 NONE
resource SERVO 1 A07
```

## 其他资源

http://rcexplorer.se/product/f3fc-racing/
