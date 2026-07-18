# 遥测

_最后更新：2026-07-01_

遥测是通过 RC 数据链路回传至遥控发射机的信息。例如，遥测可让发射机读取主电池电压或 RSSI。要使用遥测，RC 接收机和发射机均须支持该功能。Betaflight 发送的具体数据取决于所用遥测协议。

遥测可始终开启，也可仅在解锁时启用。若遥测串口与其他功能共用，则该端口上的遥测只会在解锁时启用。

## Crossfire（CRSF）

以下为通过 Crossfire 协议发送的遥测字段：

| 数据点 | 说明                                       | 数据单位                   | 数据源 ID      | SubId |
| :----- | :----------------------------------------- | :------------------------- | :------------- | :---- |
| 1RSS   | 上行：接收信号强度，天线 1（RSSI）         | db                         | LINK ID        | 0     |
| 2RSS   | 上行：接收信号强度，天线 2（RSSI）         | db                         | LINK ID        | 1     |
| RQLY   | 上行：链路质量（有效数据包）               | %                          | LINK ID        | 2     |
| RSNR   | 上行：信噪比                               | db                         | LINK ID        | 3     |
| ANT    | 天线                                       | raw                        | LINK ID        | 4     |
| RFMD   | 上行：更新率；0 = 4Hz；1 = 50Hz；2 = 150Hz | raw                        | LINK ID        | 5     |
| TPWR   | 上行：发射功率                             | mW                         | LINK ID        | 6     |
| TRSS   | 下行：信号强度天线（遥控器）               | db                         | LINK ID        | 7     |
| TQLY   | 下行：链路质量（有效数据包）               | %                          | LINK ID        | 8     |
| TSNR   | 下行：信噪比                               | db                         | LINK ID        | 9     |
| GPS    | GPS 坐标                                   | lat + lon                  | GPS_ID         | 0     |
| GSpd   | GPS 对地速度                               | kmh                        | GPS_ID         | 2     |
| Hdg    | 磁航向 / 航向                              | deg                        | GPS_ID         | 3     |
| Alt    | GPS 高度                                   | m                          | GPS_ID         | 4     |
| Sats   | 已获取 GPS 卫星数                          | raw                        | GPS_ID         | 5     |
| RxBt   | 电池电压（或平均单节电压，见下文）         | V                          | BATTERY_ID     | 0     |
| Curr   | 电流消耗                                   | A                          | BATTERY_ID     | 1     |
| Capa   | 已消耗容量                                 | mAh                        | BATTERY_ID     | 2     |
| Bat%   | 剩余电量                                   | %                          | BATTERY_ID     | 3     |
| Ptch   | FC 俯仰角                                  | radians                    | ATTITUDE_ID    | 0     |
| Roll   | FC 横滚角                                  | radians                    | ATTITUDE_ID    | 1     |
| Yaw    | FC 偏航角                                  | radians                    | ATTITUDE_ID    | 2     |
| FM     | 飞行模式                                   | [见下文](#crsf-flightmode) | FLIGHT_MODE_ID | 0     |

`RxBt` 通常报告电池总电压；启用 CLI 设置 `report_cell_voltage` 后，则报告平均单节电压。

除上述数据点外，当装有气压计或 GPS 并启用升降率遥测时，Betaflight 还会发送 **Vario Sensor** 帧（垂直速度）。装有气压计且启用高度遥测时，还会发送 **Baro Altitude** 帧（气压高度 + 垂直速度）。两者均属于原始 CRSF 传感器集，支持 CRSF 的遥控器会像处理上述数据点一样解码和显示它们。

### CRSF 飞行模式

| 飞行模式 | 含义                 |
| :------- | :------------------- |
| !FS!     | 失控保护模式         |
| RTH      | GPS 救援（返航）模式 |
| PASS     | 直通模式             |
| ANGL     | 自稳模式             |
| POSH     | 位置保持模式         |
| ALTH     | 高度保持模式         |
| HOR      | 地平线模式           |
| CHIR     | Chirp 模式           |
| AIR      | Air mode             |
| ACRO     | Acro 模式（默认）    |

上锁且未处于失控保护时，飞行模式字符串会附加以下字符之一：

| 后缀 | 含义                                     |
| :--- | :--------------------------------------- |
| \*   | 可解锁                                   |
| !    | 禁止解锁                                 |
| ?    | 已配置 GPS Rescue，但卫星数不足 / 未定位 |

### AHRS / 伴随计算机遥测帧

Betaflight 还可发送以下 [CRSF 规范](https://github.com/tbs-fpv/tbs-crsf-spec/blob/main/crsf.md)帧。准确载荷见 [`crsf.c`](https://github.com/betaflight/betaflight/blob/master/src/main/telemetry/crsf.c)。这些帧旨在为伴随计算机和 AHRS 使用方（例如 ArduPilot 桥接器）提供全分辨率飞行数据，而非供飞手直接读取。由于它们是 CRSF 规范中的较新内容，多数遥控器目前尚不会将其解码为具名传感器。

| 帧           | 说明                                    | 发送条件                                                        |
| :----------- | :-------------------------------------- | :-------------------------------------------------------------- |
| Baro         | 原始气压计压力与温度                    | 已装气压计（CRSF v3 按自己的定时计划发送）                      |
| Mag          | X/Y/Z 轴原始磁场强度                    | 已装磁力计                                                      |
| GPS Time     | 来自 GPS 接收机的 UTC 日期 / 时间       | 已装 GPS 且上锁（仅 CRSF v3，每 30 秒重发）                     |
| GPS Extended | GPS 定位类型、NED 速度与精度 / DOP 数据 | 已装 GPS（仅 CRSF v3）                                          |
| AccGyro      | 原始陀螺仪 / 加速度计采样与陀螺仪温度   | 已启用 `crsf_tlm_accgyro`、运行 CRSF v3 且已装陀螺仪 / 加速度计 |

## 使用 MAVLink 遥测将 Betaflight 连接到 Mission Planner 地面控制站

[MAVLink-ELRS 模式](/docs/wiki/guides/current/MAVLinkELRS)

### 其他协议

## SmartPort 协议

SmartPort 是 FrSky 发射机与接收机（例如 Taranis/XJR、X8R、X6R 和 X4R(SB)）使用的遥测系统。

Betaflight 所发送的完整 SmartPort 传感器 ID 列表见[固件源代码](https://github.com/betaflight/betaflight/blob/master/src/main/telemetry/smartport.c)。

可在此查看所有遥测协议：https://github.com/betaflight/betaflight/tree/master/src/main/telemetry
