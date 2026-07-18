# AlienFlight（ALIENFLIGHTF1、ALIENFLIGHTF3、ALIENFLIGHTF4 和 ALIENFLIGHTNGF7 Target）

AlienWii 现已更名为 AlienFlight。部分设计以 CC BY-SA 4.0 公开发布，其他设计以 CC BY-NC-SA 4.0 许可用于非商业用途，见：

http://www.alienflight.com

AlienFlight F3 的 Eagle 文件见：

https://github.com/MJ666/Flight-Controllers

AlienFlightNG（Next Generation）设计以 CC BY-NC-SA 4.0 或 CC BY-NC-ND 4.0 许可用于非商业用途，见：

http://www.alienflightng.com

这些 target 支持多个有刷和无刷飞控变体。所有公开设计均由多位用户完成实飞测试，项目旨在让熟练用户及部分 RC 厂商能够制作和使用这些飞控。

部分 AlienFlight 控制器可从以下渠道购买：

http://www.microfpv.eu
https://micro-motor-warehouse.com

板卡通用硬件规格如下：

- STM32F103CBT6 MCU（ALIENFLIGHTF1）
- STM32F303CCT6 MCU（ALIENFLIGHTF3）
- STM32F405RGT6 MCU（ALIENFLIGHTF4）
- STM32F711RET6 MCU（ALIENFLIGHTNGF7）
- MPU6050/6500/9250/ICM-20602 加速度计 / 陀螺仪（/ 磁力计）传感器单元
- 所有已发布设计均将 MPU 传感器中断连接至 MCU，并已在固件中启用
- 集成 4 至 8 路、每路 4.2 A 至 9.5 A 的有刷 ESC，可驱动高性能微型电机（有刷变体）
- PCB 使用加宽走线，提升电流承载能力（有刷变体）
- 部分新版 F4 板使用四层 PCB，以改善电源分配
- 集成 USB 端口
- （\*）用于外接 DSM2/DSMX 卫星接收机（例如 Spektrum SAT、OrangeRx R100、Lemon RX 或 Deltang Rx31）和 SBUS 的串行接口
- CPPM 输入
- 接收机 GND 和 3.3 V 供电；部分板卡还可为 5 V 接收机供电
- 用于便捷对频的硬件绑定跳线帽
- 电机连接点位于四角，接线更整洁
- 占板面积小
- 有刷版本可直接由单节 LiPo 电池供电
- 3.3 V LDO 稳压器（早期原型）
- 3.3 V 升降压电源转换器（所有新版）
- 用于 FPV 的 5 V 升降压电源转换器（部分版本）
- 无刷版本按 4S 供电设计，并提供 5 V 输出
- 通过 LED 或蜂鸣器输出进行电池监测（仅部分变体）
- 电流监测（F4/F7 V1.1 版本）
- 用于 Blackbox 记录的 SD 卡读卡器（F4/F7 V1.1 版本）
- （\*\*）集成 OpenSky（兼容 FrSky）接收机及 FrSky Hub 遥测（F4/F7 V2 版本）
- 通过硬件检测识别有刷和无刷版本，并加载对应默认设置

（\*）固件原生支持兼容 Spektrum 的 DSM2 卫星接收机。默认设置下，DSMX 卫星接收机将以 DSM2 协议工作（预设为 DSM2、11 bit、11 ms），以获得最大的兼容性。为获得最佳连接效果，建议根据发射机和卫星接收机的能力调整设置。若条件允许，建议使用可靠性更高的 DSMX 协议。要使用更多通道，请在 Cleanflight Configurator 中调整以下两个参数：

```
set serialrx_provider = 1   (0 for 1024bit, 1 for 2048bit)
set spektrum_sat_bind = 5
```

（\*\*）该接收机基于 uSky 和 OpenSky 项目：http://www.fishpepper.de

不同绑定模式的详细信息请参阅 CleanFlight Spektrum Bind 文档。

处于串行模式的 Deltang 接收机与其他兼容 Spektrum 卫星接收机的设备（10 bit、22 ms）工作方式相同，仅绑定流程不同。

AlienFlight F1 的引脚布局与 NAZE32 及相关克隆板（MW32、Flip32 等）非常相近。AlienFlight F3 的引脚布局与 Sparky 相近；新版 AlienFlightF3 V2 通过 SPI 连接传感器，且引脚布局略有差异。所有 AlienFlight F3 飞控均使用同一固件，固件会通过硬件检测处理这些差异。AlienFlight F4 和 F7 各自具有独立的引脚布局和设计。

（\*\*）若板上存在带遥测功能的 OpenSky 接收机，默认会启用该接收机。

AlienFlight 固件构建 target 为 ALIENFLIGHTF1、ALIENFLIGHTF3、ALIENFLIGHTF4 或 ALIENFLIGHTNGF7。固件镜像带有对应的默认设置，可提供即插即飞的体验；使用小型四轴飞行器时无需电脑即可起飞。默认设置中包含为八轴飞行器预配置的自定义混控器，可让 AlienFlight 使用整洁的直连接线。可在 CLI 中使用 `mixer custom` 激活该混控器。若将 AlienFlight 控制器用于六轴或八轴飞行器，或需要进一步调校，仍可通过 CLI 或 Betaflight App 进行常规配置。

## 刷写固件

与其他 target 一样，可使用 Betaflight App 更新固件。所有 AlienFlight 板均带有 BOOT 跳线，首次刷写或从损坏的固件中恢复时需要将其短接。

OpenSky 接收机固件可通过串行直通和内置引导加载程序更新。首次刷写必须使用 ISP 编程引脚。内置 AlienFlight OpenSky 接收机的 target 为 `AFF4RX`。更多信息请参阅 OpenSky 项目：

https://github.com/fishpepper/OpenSky/blob/master/README.md
