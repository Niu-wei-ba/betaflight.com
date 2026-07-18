# AlienFlight（ALIENFLIGHTF1 和 ALIENFLIGHTF3 Target）

AlienWii 现已更名为 AlienFlight。此 target 支持多个有刷和无刷飞控变体，其设计文件已公开发布，见：

http://www.alienflight.com

所有公开设计均由多位用户完成实飞测试。项目旨在让这些飞控设计可供熟练用户或 RC 厂商制作和使用。

这些板卡的通用硬件规格如下：

- STM32F103CBT6 MCU（ALIENFLIGHTF1）
- STM32F303CCT6 MCU（ALIENFLIGHTF3）
- MPU6050/6500/9250 加速度计 / 陀螺仪（/ 磁力计）传感器单元
- 所有新版 F3 设计均将 MPU 传感器中断连接至 MCU，并已在固件中启用
- 集成 4 至 8 路、每路 4.2 A 至 9.5 A 的有刷 ESC，可驱动高性能微型电机
- PCB 使用加宽走线，提升电流承载能力
- 集成 USB 端口
- （\*）用于外接 DSM2/DSMX 卫星接收机的串行接口，例如 Spektrum SAT、OrangeRx R100、Lemon RX 或 Deltang Rx31
- CPPM 输入
- 接收机 GND 和 3.3 V 供电
- 用于便捷对频的硬件绑定跳线帽
- 电机连接点位于四角，接线更整洁
- 占板面积小
- 可直接由单节锂聚合物电池供电
- 3.3 V LDO 稳压器（早期原型）
- 3.3 V 升降压电源转换器（所有新版）
- 用于 FPV 的 5 V 升降压电源转换器（部分版本）
- 通过 LED 实现电池监测和蜂鸣器提示功能（仅部分 ALIENFLIGHTF3 变体）

（\*）固件原生支持兼容 Spektrum 的 DSM2 卫星接收机。默认设置下，DSMX 卫星接收机将以 DSM2 协议工作（预设为 DSM2、11 bit、11 ms），以获得最大的兼容性。为获得最佳连接效果，建议根据发射机和卫星接收机的能力调整设置。若条件允许，建议使用可靠性更高的 DSMX 协议。要使用更多通道，请在 Cleanflight Configurator 中调整以下两个参数：

```
set serialrx_provider = 1   (0 for 1024bit, 1 for 2048bit)
set spektrum_sat_bind = 5
```

不同绑定模式的详细信息请参阅 [Spektrum 对频](/docs/wiki/guides/current/Spektrum-bind) 文档。

处于串行模式的 Deltang 接收机与其他 Spektrum 卫星接收机兼容设备（10 bit、22 ms）的工作方式相同，仅绑定流程不同。

ALIENFLIGHTF1 的引脚布局与 NAZE32 及其相关克隆板（MW32、Flip32 等）非常相近，硬件绑定引脚连接到引脚 41（PB5）。ALIENFLIGHTF3 的引脚布局与 Sparky 相近，硬件绑定引脚连接到引脚 25（PB12）。新版 AlienFlightF3 V2 通过 SPI 连接传感器，且引脚布局略有差异。所有 AlienFlight/AlienWii F3 布局均使用同一固件，固件会通过硬件检测处理这些差异。

AlienFlight 固件构建 target 为 ALIENFLIGHTF1 或 ALIENFLIGHTF3。固件镜像带有对应的默认设置，可提供即插即飞的体验；使用小型四轴飞行器时无需电脑即可起飞。默认设置中包含为八轴飞行器预配置的自定义混控器，可让 AlienFlight 使用整洁的直连接线。可在 CLI 中使用 `mixer custom` 激活该混控器。若将 AlienFlight 用于六轴或八轴飞行器，或需要进一步调校，仍可通过 CLI 或 Cleanflight Configurator 进行常规配置。

## 刷写固件

与其他 target 一样，可使用 Cleanflight Configurator 更新固件。所有 AlienFlight 板均带有 BOOT 跳线，首次刷写或从损坏的固件中恢复时需要将其短接。
