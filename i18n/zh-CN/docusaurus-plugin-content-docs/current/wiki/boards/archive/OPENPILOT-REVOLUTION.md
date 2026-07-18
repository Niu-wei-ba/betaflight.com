## 硬件概览

- STM32F405RGT6 ARM Cortex-M4 微控制器。
- Invensense MPU6000 数字 MEMS 陀螺仪/加速度计。
- Measurement Specialties MS5611 气压计。
- Honeywell HMC5883L 磁力计。
- 集成 HopeRF RFM22B 100mW 433MHz 无线电，可配合 OPLink 调制解调器进行无线遥测、配置和控制。`BetaFlight 不支持此功能`。

### 硬件设计及更多信息

[请参阅 OpenPilot Revolution Wiki 页面。](https://librepilot.atlassian.net/wiki/display/LPDOC/OpenPilot+Revolution)

## 常见问题与已知问题

- 不支持集成的 HopeRF RFM22B 100mW 433MHz 无线电。

## 配置

可在 **Hardware Configuration** 选项卡的 System Configuration 中启用加速度计、气压计和磁力计。

### CPPM 接收机

- 将接收机的 CPPM 输出接至 Flex-IO 排针的 **5** 号引脚。
- 启用 **RX_PPM**。

### 电池电压监测

前提是已按照 [LibrePilot Wiki](https://librepilot.atlassian.net/wiki/display/LPDOC/Configure+a+Current-Voltage+sensor) 的说明，实际接入电压分压器（基础电压传感器）。

- 启用 **VBAT**。
- 将 **Battery Voltage Scale** 设为 55。_注意：该值会受电阻误差等因素影响。_

此配置适用于 3S/4S 电池。

## 其他资源

RCGroups 讨论帖：_暂未找到链接，应该存在于某处。_
