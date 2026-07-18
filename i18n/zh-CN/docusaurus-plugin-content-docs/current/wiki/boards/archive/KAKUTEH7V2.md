# KakuteH7V2

## 说明

Holybro Kakute H7 v2 飞控功能丰富，包括集成蓝牙、HD 摄像头接口、双即插即用 4 合 1 ESC 接口、9 V VTX 开/关 Pit 开关、气压计、OSD、6 个 UART、128 MB 日志闪存、5 V/9 V BEC，以及更大的焊盘和便于焊接的布局等。

Kakute H7 v2 延续 Kakute F7 的优点，并进一步改进硬件和布局。板载蓝牙芯片可通过 SpeedyBee Android 和 iOS App 在手机上无线配置和调参。该板支持 DJI HD 系统：即插即用接口配合板载 9 V 稳压器，可为 DJI/Caddx FPV Air Unit、Caddx Vista 等 HD 图传供电，也支持模拟图传系统。

板载 “VTX ON/OFF Pit Switch” 可通过遥控器上的开关完全切断图传供电。维修飞行器、等待 GPS 定位、赛前准备时，可避免图传过热或干扰其他飞手。该板提供 6 个带内置反相的专用 UART（UART2 用于蓝牙遥测）、128 MB 日志闪存和双即插即用 4 合 1 ESC 接口，支持 x8 八轴配置并保持装机整洁。集成 Betaflight OSD 可在 FPV 画面显示电池电压、飞行时间、警告、RSSI、SmartAudio 等重要信息；板载气压计支持自主飞行。另提供 LED、蜂鸣器及 I2C（SDA/SCL）焊盘，用于外部 GPS/磁力计。

## 相比 KakuteH7 的优势

- 板载闪存
- VTX 开/关 Pit 开关

## 图片

顶视图
![](/img/boards/kakuteh7v2/kakuteh7v2_top.jpg?raw=true)

底视图
![](/img/boards/kakuteh7v2/kakuteh7v2_bottom.jpg?raw=true)

## 规格

- MCU：STM32H743，32 位处理器，运行频率 480 MHz
- IMU：BMI270
- 气压计：BMP280
- OSD：AT7456E
- 板载蓝牙芯片：ESP32-C3
- 注意：飞控解锁（arm）时蓝牙会自动关闭，锁定（disarm）时会自动开启。
- VTX 开/关 Pit 开关：可在 Betaflight 的 Modes（模式）选项卡中使用 USER1 启用。警告：使用 DJI FPV 遥控器时，请勿启用此 Pit 开关。
- 6 个 UART（1、2、3、4、6、7；UART2 用于蓝牙遥测）
- 9 路 PWM 输出（8 路电机输出、1 路 LED）
- 电池输入电压：2S-8S
- BEC：5 V 2 A 持续输出
- BEC：9 V 1.5 A 持续输出
- 安装孔：30.5×30.5 mm，Φ4 mm 孔，配 Φ3 mm 减振胶圈
- 尺寸：35×35 mm
- 重量：8 g
- 2 个 JST-SH1.0 8 针接口（4 合 1 ESC，兼容 x8/八轴）
- 1 个 JST-GH1.5 6 针接口（用于 Caddx Vista、Air Unit 或其他 VTX 等 HD 系统）

## 引脚定义图

顶视图
![](/img/boards/kakuteh7v2/kakuteh7v2_pinout.jpg?raw=true)

引脚：
![](https://docs.holybro.com/fpv-flight-controller/kakute-h7-v2/pinout?raw=true)

## 目标代码

`KAKUTEH7V2`

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
