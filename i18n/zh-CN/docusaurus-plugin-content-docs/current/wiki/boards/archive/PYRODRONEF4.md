# PYRODRONEF4

`PYRODRONEF4` 目标对应 http://pirofliprc.com/ 开发的新板卡。

- 平整底面，底部没有元器件。
- 6 个 UART，4 路电机输出（支持 DShot）。
- UART1 配有可选择的 SBUS 反相器；UART3 配有用于 FrSky 遥测的反相器。
- 板载 5V BEC。
- 可直接焊接 4 合 1 ESC，也可使用 4 合 1 ESC 插座。
- 4 合 1 ESC 插座内引出 UART RX 引脚，可用于 ESC 遥测。
- USB VCP。

## 串行端口

| 编号 | 标识   | RX   | TX   | 备注 |
| ---- | ------ | ---- | ---- | ---- |
| 1    | USART1 | PA10 | PA9  |      |
| 2    | USART2 | PA3  | PA2  |      |
| 3    | USART3 | PB11 | PB10 |      |
| 4    | USART4 | PA1  | PA0  |      |
| 5    | USART5 | PD2  | PC12 |      |
| 6    | USART6 | PC7  | PC6  |      |

## 引脚定义

- TX1、RX1 -> UART1 SBUS 焊盘（RX1 用于 SBUS，内置反相器）
- TX2、RX2 -> UART2 ESC 遥测（用于 ESC 遥测）
- TX3、RX3 -> UART3 TEL 焊盘（用于 FrSky 遥测，内置反相器）
- TX4、RX4 -> UART4（空闲 UART）
- TX5、RX5 -> UART5；TX5 用于 SmartAudio，未引出 RX5
- TX6、RX6 -> UART6（设计用于 Crossfire 接收机）

## 板载丝印

| 丝印      | 定义                       |
| --------- | -------------------------- |
| `vtx*+`   | VTX 电源（VBAT）           |
| `vtx*-`   | VTX 地线                   |
| `video`   | VTX 视频信号               |
| `current` | 电流传感器输入             |
| `bb+`     | 蜂鸣器正极                 |
| `bb-`     | 蜂鸣器负极                 |
| `m1`–`m4` | 电机 1–4                   |
| `Vbat`    | 电池正极输入               |
| `Gnd`     | 电池负极输入               |
| `Cam_C`   | 相机控制（内置电阻和电容） |
| `5V`      | 5V 输出                    |
| `led_s`   | LED 灯带信号               |
