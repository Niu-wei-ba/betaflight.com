# MICROSCISKY

集成多种接收机的 F1 有刷飞控。

## 说明

Micro Scisky 是一款集成 RC 接收机的紧凑型飞控。

## MCU、传感器与特性

### 硬件

- MCU：STM32F1
- IMU：MPU6050
- IMU 中断：不支持
- 气压计：不支持
- VCP：CP210x（Silicon Labs）
- 硬件 UART：3 个
- OSD：不支持
- Blackbox：不支持
- PPM/UART 共用：UART2
- 电池电压传感器：不支持
- 集成稳压器：集成式 5 V DC-DC 转换器
- 有刷电机 MOSFET：支持
- 按钮：部分变体/修订版配有对频按钮

### 特性

## 硬件设计（如有）

无

## 制造商与经销商

具体经销商请参阅下方的*变体*部分。

## 相似 target

无

## 变体

截至 2017 年 1 月，共有三个接收机不同的变体，板卡布局也略有差异。

- 内置兼容 DSMX/DSM2 的接收机

  可从 [Banggood](http://www.banggood.com/Micro-Scisky-32bits-Brushed-Flight-Control-Board-Based-On-Naze-32-For-Quadcopters-p-1002341.html)、[HobbyKing](http://www.hobbyking.com/hobbyking/store/__86503__Quanum_Pico_32bit_Brushed_Flight_Control_Board.html?strSearch=quanum%20micro)、[overskyrc](http://www.overskyrc.com/micro-scisky-32-bits-brushed-flight-control-board-dsmxdsm2-rx-p-661.html) 获取。

- 内置兼容 Futaba SFHSS 的接收机

  可从 [Banggood](http://www.banggood.com/Micro-Scisky-32bits-Brushed-Flight-Control-Board-Built-in-Futaba-SFHSS-Compatible-RX-For-DIY-Frame-p-1092126.html?rmmds=search) 获取。

- 内置兼容 FlySky 的接收机

  可从 [Banggood](http://www.banggood.com/Micro-Scisky-32bits-Brushed-Flight-Control-Board-Built-in-FlySky-Compatible-RX-For-DIY-Micro-Frame-p-1093312.html?rmmds=search) 获取。

## 其他资源

http://community.micro-motor-warehouse.com/t/how-to-set-up-scisky-fc-step-by-step/1224
