## ALIENWHOOP 板卡

![AlienWhoop F7 飞控](https://cdn.shopify.com/s/files/1/2371/1335/products/IMG_20170922_213059_8cee69cc-6f5e-48d7-9d72-639ff104019a_1024x1024.jpg?v=1511621625)

AlienWhoop 飞控适用于 Tiny Whoop、Blade Inductrix、Eachine、BetaFPV 及其他微型有刷四轴机架，运行 BetaFlight 固件，提供出色的飞行性能。

- 可选用以下高性能 ARM 处理器：
  - STMicroelectronics ARM Cortex-M4 F4，168 MHz
  - STMicroelectronics ARM Cortex-M7 F7，216 MHz
  - STMicroelectronics ARM Cortex-M4 F4，**超频至 240 MHz**
- 可选用以下高性能运动传感器：
  - Invensense MPU-6500 六轴 MEMS 运动跟踪器（陀螺仪 + 加速度计，低功耗）
  - Invensense MPU-9250 九轴 MEMS 运动跟踪器（陀螺仪 + 加速度计 + 指南针，低功耗）
- 超频 F4 支持 32 kHz 陀螺仪采样和 32 kHz PID 循环（具体取决于所选功能，16/16 或 16/8 可能更合适）
- 强劲的有刷电机驱动能力，可选：
  - Fairchild Semiconductor FDMA410NZ MOSFET，连续 9.5A、突发 24A
  - FDMA410NZT MOSFET，连续 9.5A、突发 63A
  - Infineon Technologies IRFHS8342 MOSFET
- UART4 焊盘可连接 WS2812B RGB LED 灯带，或连接 Micro MinimOSD 的 RX/TX
- 支持大多数串行外部接收机，包括 FrSky XM、XM+、R-XSR（SBUS/Fport）、LemonRX DSM2/DSMX（SBUS）和 FlySky FS-A8S（iBUS）卫星接收机

## MCU、传感器和功能

## 硬件

- MCU：STM32F405RGT6 或 STM32F722RET6
- 有刷电机 MOSFET：FDMA410NZ（9.5A/23A 脉冲）、FDMA410NZT（9.5A/63A 脉冲）或 Infineon IRFHS8342（最高 75A 脉冲）
- IMU：MPU-6500 或 MPU-9250（均通过 SPI 连接）
- 气压计：不适用
- USB：STM32 VCP
- 硬件 UART：UART4 焊盘，用于 Micro MinimOSD、LED 灯带等
- OSD：不适用
- Blackbox：V2 不支持；V2.1 通过板载 Flash 支持
- PPM/UART 复用：不适用
- 电池电压传感器：不适用
- 电流传感器：不适用
- 集成稳压器：3.3V
- 跳线：2 个（1：DFU，2：接收机绑定）

## 制造商和经销商

AlienWhoop（制造商）

- AlienWhoop 商店：[AlienWhoop V2.1 F4](https://shop.alienwhoop.us/products/alienwhoop-v2-1-f4-brushed-flight-controller)
- BetaFPV：[AlienWhoop F4](https://betafpv.com/products/alienwhoop-f4-brushed-flight-controller)
- Drone Junkie：https://www.dronejunkie.co.uk/alienwhoop-f4-brushed-flight-controller-v2
- TinyWhoop：https://www.tinywhoop.com/collections/electronics/products/alien-whoop-v2-1-f4-brushed-flight-controller
- DIY 文件：[OSH Park 项目](https://oshpark.com/shared_projects/p4hs6DbI)

## 设计者

AlienWhoop

## 维护者

@brucesdad13 (https://github.com/brucesdad13)

## 致谢

\*AlienWhoop V2 和 2.1 是 [AlienFlight F3 Quad Brushed V1](https://github.com/brucesdad13/AlienFlightArchive/tree/master/Flight-Controllers/F3-V1/F3-Quad) 的再设计版本。
