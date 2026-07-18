# AIORACERF3

![AIORACERF3 正面](/img/boards/aioracerf3/aioracerf3_front.jpg)

![AIORACERF3 背面](/img/boards/aioracerf3/aioracerf3_back.jpg)

## 硬件规格

- MCU：STM32F303CCT6
- IMU：MPU9250（SPI）
- IMU 中断：支持
- 气压计：BMP280（I2C）
- VCP：支持
- 硬件 UART：3 路
- PWM 输入：不支持
- PWM 输出：8 路
- OSD：支持，Minim-OSD，连接至 UART1
- Blackbox：MicroSD 卡槽（SD/SDHC，最高 64 GB）
- PPM/UART 共用：UART2
- 串行接收机：可选择 UART2 或 UART3
- 电池电压传感器：支持，板载分压器
- 电流传感器：由 ARPDB 提供（可选）
- 电压转换器：3.3 V / 500 mA 降压转换器
- 应答器 IR LED 驱动：支持
- 蜂鸣器驱动：支持
- 按键：1 个 / DFU
- RSSI 模拟量/PWM 端口：支持
- SWD 端口：支持

## 特性

- 四角附近设有 PWM 焊盘，便于连接 ESC 信号线。
- 陀螺仪通过 SPI 连接，可支持 8 kHz 运行频率。
- 集成 Minim-OSD 和 FTDI 调试插座。
- 使用 ZH 1.5-3P 插座连接 DSM、S.BUS 等串行接收机；可通过背面焊盘选择 3.3 V 或 5 V 供电。
- 支持 WS2811 LED 灯带。
- 为可选 ARPDB 优化了焊盘布局。
- 尺寸：35 x 35 x 7.4 mm；安装孔距：30 mm。
- 支持 DShot。
- ARPDB 专为 ARF3 FC 设计。
- 提供两种版本：A 型带 XT60 安装孔，适合 X 型机架；B 型为经典版本。
- 使用 3 oz 铜箔，适合大电流传输。
- 最大输入电压 / 电流检测范围：28 V / 90 A。
- 降压转换器输出：5.3 V / 3.5 A。

## 硬件引脚定义

- GPIO
- TX1：PA9 / RX1：PA10
- TX2：PA14 / RX2：PA15
- TX3：PB10 / RX3：PB11
- MPU_CS：PB9
- MPU_SCK：PB3
- MPU_SDO：PB4
- MPU_SDI：PB5
- MPU_INT：PC13
- SCL：PB6
- SDA：PB7
- SD_CS：PB12
- SD_SCK：PB13
- SD_SDO：PB14
- SD_SDI：PB15
- SENS_I：PA4
- SENS_V：PA5
- RSSI：PB2
- PWM1：PB1
- PWM2：PA7
- PWM3：PA2
- PWM4：PA1
- PWM5：PB0
- PWM6：PA6
- PWM7：PA3
- PWM8：PA0

## 制造商和经销商

- CRIUS
- [购买链接 1](https://www.aliexpress.com/store/product/Crius-AIO-RACER-F3-Flight-Controller-with-OSD-for-Betaflight-firmware-ARPDB-Power-Distribution-Board-Output/604349_32729982152.html?spm=2114.12010608.0.0.TuYtnD)
- [购买链接 2](http://www.ebay.com/itm/AIO-RACER-F3-Flight-Controller-with-OSD-for-Betaflight-firmware-ARPDB-B-Board-/322266398060)

## 设计者

CRIUS

## 维护者

- 硬件：Eric Liang
- 软件：tianbin4279 / lijingwei0710 / Michael Keller

## 相近 Target

- SPRACINGF3EVO

## 其他资源

- [用户手册](https://dl.dropboxusercontent.com/u/584481/AIO_RACER_F3_Manual_D20160909.pdf)
