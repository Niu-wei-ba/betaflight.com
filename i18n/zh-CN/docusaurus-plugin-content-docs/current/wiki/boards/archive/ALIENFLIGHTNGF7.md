# ALIENFLIGHTNGF7

AlienWii 现已更名为 AlienFlight。设计文件部分以 CC BY-SA 4.0 许可公开，部分以 CC BY-NC-SA 4.0 许可用于非商业用途：

http://www.alienflight.com

AlienFlight F3 Eagle 文件：

https://github.com/MJ666/Flight-Controllers

AlienFlightNG（下一代）设计以 CC BY-NC-SA 4.0 或 CC BY-NC-ND 4.0 许可用于非商业用途：

http://www.alienflightng.com

此固件目标支持多种有刷和无刷飞控变体。所有已发布的设计均经过实际飞行测试，旨在让熟练用户及部分遥控设备厂商能够自行制作这些飞控。

部分 AlienFlight 变体可从以下渠道购买：

http://www.microfpv.eu  
https://micro-motor-warehouse.com

以下为该板的一般硬件规格：

- MCU：STM32F711RET6（ALIENFLIGHTNGF7）
- MPU6050/6500/9250/ICM-20602 加速度计/陀螺仪（/磁力计）传感器
- 所有已发布设计都将 MPU 传感器中断连接至 MCU，并在固件中启用
- 集成 4-8 个 4.2A 至 9.5A 有刷 ESC，可驱动高性能微型电机（有刷版本）
- PCB 采用超宽走线以提高功率承载能力（有刷版本）
- 部分新 F4 板采用四层 PCB，以改善电源分配
- 集成 USB 接口
- (\*) 提供外接 DSM2/DSMX 卫星接收机和 SBUS 的串行接口
- CPPM 输入
- 为接收机提供 GND 和 3.3V；部分板卡也可提供 5V 接收机电源
- 硬件绑定插头，便于绑定
- 电机接口位于板角，布线整洁且更短
- 紧凑尺寸
- 有刷版本可直接由单节锂电池供电
- 3.3V LDO 稳压器（较早原型）
- 3.3V 降压-升压转换器（所有新版本）
- 5V 降压-升压转换器，用于 FPV 设备（部分版本）
- 无刷版本按 4S 供电设计，并提供 5V 输出
- 部分变体提供 LED 或蜂鸣器电池监测输出
- 电流监测（F4/F7 V1.1）
- SD 卡读卡器，用于 Blackbox 记录（F7 V1.1）
- 集成 OpenSky（兼容 FrSky）接收机，并支持 FrSky Hub 遥测（F7 V2）
- 可自动识别有刷和无刷版本，并应用对应默认值

Spektrum 兼容 DSM2 卫星接收机开箱即用。DSMX 卫星默认按 DSM2 协议工作（预设 DSM2、11 bit、11 ms），以获得最大兼容性。为获得最佳连接，建议根据遥控器和卫星接收机能力调整设置；若条件允许，建议使用更可靠的 DSMX 协议。要启用额外通道，请在 Cleanflight Configurator 中设置：

```
set serialrx_provider = 1   (0 表示 1024 bit，1 表示 2048 bit)
set spektrum_sat_bind = 5
```

### 接收机说明

该接收机基于 uSky 和 OpenSky 项目：http://www.fishpepper.de

有关绑定模式的详细信息，请参阅 Cleanflight Spektrum Bind 文档。

Deltang 接收机处于串行模式时，与其他 Spektrum 卫星兼容接收机一样工作（10 bit、22 ms），但绑定流程不同。

AlienFlight F1 的引脚布局与 NAZE32 及其克隆板（MW32、Flip32 等）非常相似；F3 与 Sparky 相似。AlienFlight F3 V2 通过 SPI 连接传感器，布局略有不同。所有 AlienFlight F3 飞控使用同一固件，并通过硬件检测处理差异。AlienFlight F4 和 F7 各自拥有独立的引脚布局。

### OpenSky 遥测

如果板上存在带遥测功能的 OpenSky 接收机，默认会启用该功能。

AlienFlight 固件目标包括 ALIENFLIGHTF1、ALIENFLIGHTF3、ALIENFLIGHTF4 和 ALIENFLIGHTNGF7。固件附带适配的默认设置，可实现即插即用。使用小型四轴飞行器无需计算机即可起飞。默认设置包含八轴飞行器的自定义混控器，可在 CLI 中执行 `mixer custom` 启用。若用于六轴或八轴飞行器，或需要进一步调参，可在 CLI 或 Betaflight App 中继续配置。

### 刷写固件

与其他目标一样，可使用 Betaflight App 更新固件。所有 AlienFlight 板卡都带 Boot 跳线，首次刷写或从损坏固件恢复时必须短接该跳线。

OpenSky 接收机固件可通过串行直通和内置 Bootloader 更新。首次刷写必须使用 ISP 编程引脚。内置 AlienFlight OpenSky 接收机的目标为 `AFF4RX`。更多信息请参阅 OpenSky 项目：

https://github.com/fishpepper/OpenSky/blob/master/README.md
