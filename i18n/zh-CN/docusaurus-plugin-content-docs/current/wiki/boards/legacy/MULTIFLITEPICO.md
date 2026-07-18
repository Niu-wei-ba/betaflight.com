# MultiFlite PICO-B-FC

http://www.multiflite.co.uk

multiFlite PICO-B-FC 是一款微型有刷飞控，搭载 F3 芯片、支持四轴超过 8 A 的 FET、5 V 输出，并可升级为六轴。该飞控为可靠供电和高性能而设计。

购买链接：

- http://store.multiflite.co.uk/index.php?route=product/product&path=59&product_id=71

特性如下：

- 兼容 Cleanflight 和 Betaflight 固件
- 22.5 x 25 mm，2.25 g
- 单面元件布局，便于安装
- MPU6050
- 支持 4 路有刷电机（均已安装 FET）
- 引出 M5 和 M6，可转换为六轴
- 8 A N 沟道 FET（10 A 持续不超过 5 秒）
- 飞行电池电压监测
- Spektrum Satellite（3.3 V）或 PPM（VBAT）接收机输入
- Spektrum 对频按键（开机时按住以对频）
- 引出多个改装焊盘
- 5 V 降升压稳压器，避免欠压复位
- 由 5 V 供电的 3.3 V 稳压器
- 仅支持 1S（4.2 V）
- 可同时连接电池和 USB 进行测试；未接电池时电机不会转动，USB 不为电机供电
- WS2812B LED 焊盘
- 用于低电压报警的蜂鸣器 LED
- 蜂鸣器晶体管可接实体蜂鸣器或 LED
- 板边及两面均提供带标签的连接器

Spektrum 兼容 DSM2 卫星接收机开箱即用。默认设置为 DSM2、11 bit、11 ms；DSMX 卫星可使用该协议工作。为提高可靠性，建议按发射机和卫星接收机能力调整设置，并尽量使用 DSMX 协议。若需额外通道，请在 Betaflight App 中设置：

```text
set serialrx_provider = 1   (0 为 1024 bit，1 为 2048 bit)
set spektrum_sat_bind = 5
```

有关不同对频模式的详情，请参阅 Cleanflight Spektrum 对频文档。

串行模式的 Deltang 接收机可像其他 Spektrum 卫星接收机一样工作（10 bit、22 ms），但对频流程不同。

MULTIFLITEPICO 的引脚布局与 SPRACINGF3 非常相似。

## 刷写固件

可像其他 target 一样使用 Betaflight App 更新固件。所有 multiFlite 板卡均设有 BOOT 跳线，首次刷写或固件损坏后的恢复时需要将其短接。
