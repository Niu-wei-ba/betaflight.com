## 使用 Mainport 和 FTDI Video 为 CC3D 刷写 Cleanflight/Betaflight

https://www.youtube.com/watch?v=5wjvJAMEMz0

## 蜂鸣器设置

由 handsomejackuk 发布：

我发现，在 Betaflight 3.16 中需要分别配置资源。以下是在 CC3D 上将蜂鸣器接到引脚 6 的设置；已确认该设置可用于早期 Betaflight 版本。

`# resource`
`resource BEEPER 1 A02`
`resource MOTOR 1 B09`
`resource MOTOR 2 B08`
`resource MOTOR 3 B07`
`resource MOTOR 4 A08`
`resource MOTOR 5 B04`
`resource PPM 1 A01`
`resource PWM 2 B05`
`resource PWM 3 B00`
`resource PWM 4 B01`
`resource PWM 5 A00`
`resource PWM 6 A01`
`resource SERIAL_TX 3 B10`
`resource SERIAL_TX 11 B05`
`resource SERIAL_RX 3 B11`
`resource SERIAL_RX 11 B00`
