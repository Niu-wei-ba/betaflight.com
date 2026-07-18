# 配置 Spektrum SPM4649T SRXL 遥测

按以下步骤配置：

1. 将 SPM4649T 接至 +5 V、GND 和飞控上一个空闲的 UART **TX** 引脚。**必须接 TX，而不是 RX。** 例如 UART3/TX3；Piko F4 OSD 需要使用 UART4/TX4 焊盘。不要连接此接收机的 VBAT/GND 输入，该输入仅在飞控不提供遥测数据时使用。
2. 在 Betaflight Configurator 的 **Ports** 页面，为所接 UART 启用 **Serial RX**，然后保存。
3. 板卡重启后，进入 **Configuration** 页面。在 **Receiver** 中将接收机模式设为 **Serial based Receiver**，串行接收机提供商设为 **SPEKTRUM2048/SRXL**（Configurator 10.2.0 及更早版本显示为 **Spektrum Bidir SRXL**）。

   - 自 Betaflight 3.4 后，还需在 CLI 中执行：

     ```
     set serialrx_halfduplex = ON
     save
     ```

4. 启用 **TELEMETRY** 功能，点击**保存并重启**。
5. 将 SPM4649T 与遥控器对频，参见 [Spektrum 卫星接收机对频（3.2）](Spektrum-Satellite-Bind-for-3.2)。
6. 在 **Receiver** 选项卡选择通道映射 **Spektrum/Graupner/JR (TAER1234)**。

接收机并非必须接在 UART3/TX3；任何空闲 UART 的 TX 引脚均可使用，前提是它直接连接至处理器 I/O 引脚，且中间没有反相器等会阻断双向数据通信的电路。大多数飞控的 UART3 通常可用；基于 F4 的飞控上，UART1 和 UART6 是否可用取决于具体品牌和硬件设计。

基于 F3 的飞控使用 UART2 TX 时存在已知问题：该引脚也可作为 SWDCLK。上电时，在 Betaflight 将其初始化为 UART TX 前，该引脚会被拉低，可能导致 SPM4649T 进入对频模式。

最后还需在遥控器上完成一步：

7. 在 **Function List** > **Telemetry** 菜单中执行 **Auto-Config**。

例如，若 SPM4649T 接至 TX3，也可将下列内容复制到 CLI：

```
serial 2 64 115200 57600 0 115200
feature RX_SERIAL
feature TELEMETRY
set serialrx_provider = SRXL
set serialrx_halfduplex = ON
map TAER1234
save
```

## 可通过 Spektrum 遥测获取的信息

- RSSI、丢帧数和 Holds。
- 电池电压：最小值、最大值和当前值。
- 电池电流及已消耗容量。
- Betaflight 配置菜单系统（CMS）。
- VTX 状态（在单独的 VTX Setup 菜单中）。

Betaflight 4.0 增加了以下项目：

- 电池平均单节电压或整包电压，取决于 CLI 参数：

  ```
  report_cell_voltage = OFF
  Allowed values: OFF, ON
  ```

- 飞控 CPU 核心温度。
- 所有电机的合计平均 RPM。受 Spektrum 遥测帧限制，低于 1000 RPM 的值会显示为 999。

使用遥控器滚轮选择要显示的项目。

注意：通过这种方式使用 CMS 时，为保证性能，CMS 会获得遥测无线链路的最高优先级。使用 CMS 期间，其他部分遥测报告会被禁用。因此必须通过正确的 **EXIT** 退出 CMS，否则可能丢失电池电流、已消耗容量、VTX 状态等遥测数据。

## 遥测示例截图

![Spektrum 遥测概览](/img/Spektrum_TM_Overview.jpg)
![Spektrum 遥测飞行记录](/img/Spektrum_TM_Flightlog.jpg)
![Spektrum 遥测电压最小/最大值](/img/Spektrum_TM_Voltage_MinMax.jpg)
![Spektrum 遥测电压](/img/Spektrum_TM_Voltage.jpg)
![Spektrum 遥测飞行电池容量](/img/Spektrum_TM_FlightPackCapacity.jpg)
![Spektrum 遥测文本 CMS](/img/Spektrum_TM_Text_CMS.jpg)
![Spektrum VTX 状态](/img/Spektrum_VTX_Status.jpg)

### BF 4.0 新项目

![Spektrum BF4 新项目](https://user-images.githubusercontent.com/15121917/54093433-18b33b00-4398-11e9-949c-007c84b51298.jpg)
