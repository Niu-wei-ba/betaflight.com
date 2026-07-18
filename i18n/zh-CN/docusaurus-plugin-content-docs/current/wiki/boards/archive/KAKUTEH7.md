# KakuteH7

## 说明

Holybro Kakute H7 飞控功能丰富，包括集成蓝牙、双即插即用 4 合 1 ESC 接口、HD 摄像头接口、气压计、OSD、6 个 UART、全尺寸黑匣子 MicroSD 卡槽、5 V/9 V BEC 以及便于焊接的布局等。

Kakute H7 延续 Kakute F7 的优点，并进一步改进硬件和布局。板载蓝牙芯片可通过 SpeedyBee Android 和 iOS App 在手机上无线配置和调参。Kakute H7 支持 DJI HD 系统：即插即用接口配合板载 9 V 稳压器，可为 DJI/Caddx FPV Air Unit、Caddx Vista 等 HD 图传供电，也支持模拟图传系统。

该板提供 6 个带内置反相的专用 UART（UART2 用于蓝牙遥测），并配备全尺寸 MicroSD 卡槽，几乎不受限地记录黑匣子数据。双即插即用 4 合 1 ESC 接口支持 x8 八轴配置，装机简洁。集成 Betaflight OSD 可在 FPV 画面显示电池电压、飞行时间、警告、RSSI、SmartAudio 等重要信息；板载气压计支持自主飞行。另提供 LED、蜂鸣器及 I2C（SDA/SCL）焊盘，用于外部 GPS/磁力计。

## 相比 KakuteF7 的优势

- H7 是更快的处理器（400 MHz，相比 F7 的 216 MHz），可支持更快的环路时间。
- 板载蓝牙，可在不连接电脑的情况下完成配置。
- 提供更多带硬件反相的 UART。
- 具备超标量流水线和 DSP 能力，为未来优化飞控算法提供更好的平台。
- 板载 BMP280 气压计，支持更多飞行模式。
- 支持 SD 卡黑匣子记录。
- I2C1 焊盘可连接外部指南针。

## 图片

顶视图
![](/img/boards/kakuteh7/kakuteh7_top.jpg?raw=true)

底视图
![](/img/boards/kakuteh7/kakuteh7_bottom.jpg?raw=true)

## 规格

- MCU：STM32H743，32 位处理器，运行频率 480 MHz
- IMU：MPU6000
- 气压计：BMP280
- OSD：AT7456E
- 板载蓝牙芯片：ESP32-C3
  - 兼容 SpeedyBee iOS 和 Android App
  - 注意：飞控解锁（arm）时蓝牙会自动关闭，锁定（disarm）时会自动开启。
- 6 个 UART（1、2、3、4、6、7；UART2 用于蓝牙遥测）
- 9 路 PWM 输出（8 路电机输出、1 路 LED）
- 2 个 JST-SH1.0 8 针接口（4 合 1 ESC，兼容 x8/八轴）
- 1 个 JST-GH1.25 6 针接口（用于 Caddx Vista、Air Unit 等 HD 系统）
- 电池输入电压：7-42 V
- BEC：5 V 2 A 持续输出
- BEC：9 V 1.5 A 持续输出
- 安装孔：30.5×30.5 mm，Φ4 mm 孔，配 Φ3 mm 减振胶圈
- 尺寸：35×35 mm
- 重量：8 g

## 引脚定义图

`顶视图`
![](/img/boards/kakuteh7/kakuteh7_pin_diagram.jpg?raw=true)

## 目标代码

`KAKUTEH7`

## 制造商和经销商

www.holybro.com（制造商和设计者）

经销商：

## 常见问题与已知问题

`“Board Align” 功能说明`

## 其他资源

`联系我们：`

`•电子邮件：productservice@holybro.com`

`•Facebook 页面：Holybro`

`•Facebook 群组：Holybro Hobby Official Group`
