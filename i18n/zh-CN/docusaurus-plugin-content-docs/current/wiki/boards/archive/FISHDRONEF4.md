### 描述

FishDroneTeam F4 Tower 飞控将飞控、OSD 和 VTX 集成于一体，专为易用性和飞行性能设计。SPI 连接的 ICM20602 惯性传感器具备较高的可靠性、精度和更新速度，可稳定运行较快的循环频率及 ESC 协议。板载气压计用于高度测量，OSD 芯片直接连接主处理器（MCU）。MCU 与 OSD 的紧密集成可加快显示更新，并可直接在 Betaflight Configurator 中配置 OSD，无需 USB/UART 适配器和第三方工具。

---

### 硬件

- MCU：STM32F405RGT6
- IMU：ICM-20602（SPI）
- IMU 中断：支持
- 指南针和气压计：不支持（仅面向 FPV）
- VCP：支持
- OSD：支持，Betaflight OSD（BFOSD）
- VTX：支持
- Blackbox：支持（16 MB Flash 或 TF 卡）
- 电池电压传感器：支持，直接连接，无需布线
- 集成稳压器：支持 2S-6S 电池
- 按键：1 个，DFU
- 有刷电机 MOSFET：无
- UART：UART1、UART3、UART6

---

### 功能

- 一体式设计
- STM32F405 32 位处理器：168 MHz、1 MB Flash、192 KB RAM
- ICM-20602 MPU 通过 SPI 连接
- 通过 STM 虚拟通信端口提供 Micro USB 连接
- 支持串行或 PPM 输入（不支持独立 PWM 通道输入）
- 提供最多 4 路 ESC 输出
- 轻触按键可启动至 STM Bootloader
- 内置 SmartPort 反相器（UART3）
- 内置 SBUS 输入反相器（UART6）
- 板载 16 MB Flash
- 电流传感器：未实现
- BLHeli 直通：支持
- WS2811 LED 灯带：支持
- 蜂鸣器：支持
- 应答器：不支持

---

### 制造商和经销商

---

### 硬件设计

该硬件目前未开源；未来可能会公开较旧的修订版本。

---

### 其他资源

RCGroups 讨论帖：

---

### 常见问题

---

### 图片

#### （这是测试版本，正式版本即将发布。）

![顶部](https://cloud.githubusercontent.com/assets/10217966/20665049/fa097b0e-b598-11e6-9ddc-8f1ef4cedafd.png)
![底部](https://cloud.githubusercontent.com/assets/10217966/20665058/019f9bf0-b599-11e6-8658-aea17a6b8e72.png)
