# BlueJay F4

## 描述

基于 STM32F4 的简洁飞控，是 Naze 的 F4 替代方案。

![BlueJayF4 - rev3](https://cloud.githubusercontent.com/assets/6168871/21573427/4e0d21f2-cf38-11e6-893d-73e1eb90bfd0.png)

提供两种尺寸（且各有多个修订版本）：全尺寸 36 x 36 mm（30.5 x 30.5 安装孔距）以及迷你版 25 x 25 mm（20 x 20 安装孔距）。

## MCU、传感器和功能

### 硬件

- MCU：STM32F405RTG6
- IMU：rev4 为 ICM-20602（SPI）；rev3 和 Mini 为 ICM-20608-G（SPI）；rev1/rev2 为 MPU9250（SPI）
- IMU 中断：支持
- 气压计：全尺寸可选，Mini 不支持
- VCP：支持
- 硬件 UART：3 个；全尺寸板重映射四轴电机输出后可使用 4 个
- OSD：全尺寸板的 UART3 提供与 MinimOSD 兼容、可堆叠的引脚定义
- Blackbox：rev3 为 16 MB、rev1 为 2 MB；rev2/rev3 全尺寸支持 SD 卡，Mini 不支持 SD 卡
- PPM/UART 复用：UART6
- 电池电压传感器：支持；全尺寸使用 Pololu 时无需接线，Mini 需接至 PDB 的 VBAT 电源
- 集成稳压器：全尺寸 rev3/rev4 可选 Pololu 背插模块
- 带 DFU 模式按键

### 功能

- 电流传感器：可作为 ADC 输入使用，但 PDB 或电池线需要分流电路。
- BLHeli 直通：支持
- WS2811 LED 灯带：支持（电机输出引脚 5）
- 应答器：不支持

## 制造商和经销商

全尺寸和 Mini 版本可在部分 RC 网店购买，也可直接从制造商 BlueJayRC 购买。

购买地址：[BlueJayRC.com](https://bluejayrc.com)

## 硬件设计（如有）

硬件目前未开源；未来可能会公开较旧修订版本。

## 变体

BlueJayF4 rev1、rev2、rev3，均包含 Mini 版本。

rev3 Mini（另有 PDB 可选）：
![bluejayf4-mini](https://cloud.githubusercontent.com/assets/6168871/21573442/6dd9f65e-cf38-11e6-979c-87ccb497e97d.png)

rev3 全尺寸：
![BlueJayF4 - rev3](https://cloud.githubusercontent.com/assets/6168871/21573427/4e0d21f2-cf38-11e6-893d-73e1eb90bfd0.png)

![BlueJayF4 - rev3 - 底面](https://cloud.githubusercontent.com/assets/6168871/21573428/4e11abfa-cf38-11e6-9fb7-0153eaf0ff61.jpg)

rev2 全尺寸：
![BlueJayF4 - rev2](https://cloud.githubusercontent.com/assets/6168871/21573437/6458d622-cf38-11e6-9195-baab4166d8d4.jpg)

## 配置信息

### 接线图

![接线图 - rev4](/img/boards/bluejayf4/bluejayf4-rev4-wiring.png)

![接线图 - rev3](/img/boards/bluejayf4/bluejayf4-rev3-wiring.jpg)

### FrSky SmartPort

FrSky SmartPort（S.Port）为反相半双工信号。可按以下文章改装 X4R 或 XSR：

[SmartPort、FrSky X4R(S) 与 Betaflight](https://blck.mn/2016/06/smartport-the-frsky-x4rs-and-betaflight/)  
[可在反相/非反相之间切换的改装](https://blck.mn/2016/12/smartport-frsky-x4rs-and-betaflight-part-2/)

rev3 用户可在 UART1 上增加二极管，并使用 BF3.1 或更高版本的构建，从而无需改装接收机即可直接连接 S.Port。

![](https://cloud.githubusercontent.com/assets/6168871/21573182/a800cbbc-cf35-11e6-90a5-ccdb9159eec1.png)

在 CLI 中执行：

`set sport_halfduplex=OFF`

### 串行线调试

串行线调试（SWD）输出位于板卡底面，并提供与 STM32Fx Discovery 板兼容的引脚定义，可用作 SWD 适配器：

![接线图 - rev4 SWD](/img/boards/bluejayf4/bluejayf4-rev4-wiring-swd.png)

![bjf4-swd-rev2](/img/boards/bluejayf4/bluejayf4-rev2-wiring-swd.jpg)

# 已知问题

rev2 需要进行电阻改装，以避免上电时崩溃；rev3 没有该问题。

按下图进行 rev2 电阻改装：
![电阻改装](https://cloud.githubusercontent.com/assets/6168871/17614652/3daa257c-60ab-11e6-8567-ab51625e8e89.png)

rev2 板载稳压器的电流能力有限，已改用可背插的 Pololu 模块，以提高灵活性。
![已焊接的 Pololu](https://cloud.githubusercontent.com/assets/6168871/17614559/abe4d650-60aa-11e6-8c85-93ed35a8b04f.jpg)

# 其他资源

RCGroups 讨论帖：http://www.rcgroups.com/forums/showthread.php?t=2593106

# 配置第 4 个 UART（3.2 及更高版本）

- 电机输出 1 和 2 支持第 4 个硬件 UART（UART4），但需通过资源命令显式启用。
- 必须重映射电机输出 1 和 2，避免与 UART4 冲突。

### 示例

以下资源命令用于配置 UART4，将电机输出整体后移两位（电机 1 使用电机输出 3，电机 2 使用电机输出 4，依此类推），并将 DEBUG 焊盘用于 LED 灯带：

```
# Disable functions on motor outputs 5 and 6 so motors can be shifted by two
resource SERIAL_TX 11 NONE
resource SERIAL_RX 11 NONE
resource MOTOR 5 NONE
resource MOTOR 6 NONE

# Remap LED
resource LED_STRIP 1 B03

# Remap motors
resource MOTOR 3 B00
resource MOTOR 4 B01
resource MOTOR 1 A02
resource MOTOR 2 A03

# Configure UART4
resource SERIAL_TX 4 A00
resource SERIAL_RX 4 A01
```
