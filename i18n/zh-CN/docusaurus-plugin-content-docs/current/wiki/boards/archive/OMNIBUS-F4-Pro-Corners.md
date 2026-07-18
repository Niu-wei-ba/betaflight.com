## OMNIBUS F4 Pro Corners

## 说明

- 3.2.0：已配置 UART3 的可编程反相器（由 PC9 控制），但默认未启用，因为会影响 PC9 的其他用途。用户必须执行 `resource INVERTER 3 C09` 来启用它（见下例）。

## 硬件

- OMNIBUS F4 Pro 的变体（使用 `OMNIBUSF4SD` 目标）。更多信息请参阅 OMNIBUS F4 Wiki 页面。
- 仍然使用 OMNIBUSF4SD 目标。
- 配有两个双反相器，分别位于 UART3（PC9 控制）与 UART6（PC8 控制）；支持 SBUS 和原生 SmartPort（SmartPort 需要二极管）。
- 可通过跳线将 `UART1_RX` 接至 ESC 遥测。

## 配置示例 1

- UART1 ESC 遥测
- UART3 SBUS
- UART6 SmartPort（反相、TX 串联二极管）
- SOFTSERIAL1 SmartAudio

![](https://user-images.githubusercontent.com/14850998/29904533-3ec5c1f6-8e44-11e7-879f-e1b433b4d8f1.jpg)

```
# Betaflight / OMNIBUSF4SD (OBSD) 3.2.0 Aug 28 2017 / 12:02:37 (b2cd7294e)

# resources
resource SERIAL_TX 1 NONE
resource SERIAL_TX 11 A09
resource INVERTER 3 C09

# feature
feature SOFTSERIAL
feature TELEMETRY
feature ESC_SENSOR

# serial
serial 0 1024 115200 57600 0 115200
serial 2 64 115200 57600 0 115200
serial 5 32 115200 57600 0 115200
serial 30 2048 115200 57600 0 115200

# master
set serialrx_provider = SBUS
set current_meter = ESC
set battery_meter = ADC
set tlm_halfduplex = OFF
```

## 配置示例 2

- UART1 ESC 遥测
- UART3 SBUS
- UART6 空闲（例如用于 GPS）
- SOFTSERIAL1 SmartPort（UART TX1 焊盘）
- SOFTSERIAL2 IRC Tramp（M5 焊盘）

![Omnibus F4 Pro Corner 接线图](https://github.com/stsa64/Quadcopter/blob/master/Omnibus%20F4%20pro%20corner%20diagram.jpg)

```
# Betaflight / OMNIBUSF4SD (OBSD) 3.2.5 Feb 11 2018 / 00:49:36 (6e69ff00c) MSP API: 1.36

# resources
resource MOTOR 5 NONE
resource SERIAL_TX 1 NONE
resource SERIAL_TX 11 A09
resource SERIAL_TX 12 A01

# feature
feature MOTOR_STOP
feature SOFTSERIAL
feature TELEMETRY
feature ESC_SENSOR

# serial
serial 0 1024 115200 57600 0 115200
serial 2 64 115200 57600 0 115200
serial 30 32 115200 57600 0 115200
serial 31 8192 115200 57600 0 115200

# master
set serialrx_provider = SBUS
```
