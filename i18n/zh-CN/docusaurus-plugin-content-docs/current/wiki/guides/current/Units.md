# 单位

本文说明用于配置特定功能的单位设置，以及不同单位对相关显示元素的影响。

### 单位

| 单位制             | 速度 | 距离  | 温度       |
| :----------------- | :--- | :---- | :--------- |
| 英制 (`Imperial`)  | MPH  | Miles | Fahrenheit |
| 公制 (`Metric`)    | KPH  | KM    | Celsius    |
| 英国制 (`British`) | MPH  | KM    | Celsius    |

### 受影响的 OSD 元素

| OSD 元素   | 英制  | 公制  | 英国制 |
| :--------- | :---- | :---- | :----- |
| 高度       | Feet  | Metre | Metre  |
| GPS 速度   | MPH   | KPH   | MPH    |
| 距离起点   | Feet  | Metre | Metre  |
| 数值升降率 | FTPS  | MPS   | MPS    |
| 飞行距离   | Feet  | Metre | Metre  |
| OSD 效率   | Miles | KM    | KM     |

注意：可在 CLI 中通过 `set osd_units = <UNIT>` 配置，也可在 Betaflight App 的 OSD 选项卡中配置。例如：`set osd_units = BRITISH`。

### 受影响的 FrSky Hub 遥测元素

| 元素 | 英制       | 公制    | 英国制  |
| :--- | :--------- | :------ | :------ |
| HDOP | Fahrenheit | Celsius | Celsius |

可在 CLI 中通过 `set frsky_unit = <UNIT>` 修改 FrSky Hub 遥测单位。例如：`set frsky_unit = METRIC`。
