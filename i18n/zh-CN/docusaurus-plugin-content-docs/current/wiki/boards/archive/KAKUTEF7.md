# KakuteF7

## 功能

Holybro Kakute F7 飞控将飞控（FC）和屏幕叠加显示（OSD）集成在一块板上。其布局便于连接多旋翼其他部件，并保持装机走线整齐。IMU 已升级为 MPU6000，并采用重新设计、更可靠的减振结构。

- 支持 Betaflight。
- 支持 Betaflight OSD。可使用遥控器摇杆和眼镜修改 PID、常用配置参数、图传频道和发射功率。
- 内置软安装：IMU（“陀螺仪”）芯片安装在隔振泡棉上，无需再对整块飞控进行软安装。
- 高性能、低噪声、高灵敏度 MPU6000 IMU，内置 6 轴陀螺仪和加速度计。
- 适合自主飞行：集成 BMP280 气压计，并提供 SCL/SDA 焊盘，可连接外置 GPS/磁力计。
- 专用 Bootloader 按钮，便于刷写固件。
- 低剖面设计，适配紧凑机架。
- 输入电压 7-42 V；可通过 “B+” 焊盘直接由最高 6S 飞行电池供电。
- 自动电压监测。Kakute F7 直接从电源监测电压，无需单独连接 vBat 线。
- 板载稳压器提供经过滤波的低噪声视频供电：5 V 输出最高 2 A，3.3 V 输出最高 200 mA，可为接收机、VTX、FPV 摄像头或 LED 灯带供电。
- 支持 BLHeli 直通，便于升级和配置 ESC。

## 图片

顶视图
![](/img/boards/kakutef7/kakutef7_top.jpg?raw=true)

底视图
![](/img/boards/kakutef7/kakutef7_bottom.jpg?raw=true)

## 规格

- MCU：STM32F745，32 位处理器
- IMU：MPU6000（SPI）
- 气压计：BMP280
- 电流传感器：最大可测约 130 A
- USB VCP 驱动（所有 UART 可同时使用，USB 不占用 UART）
- 6 个硬件 UART（UART1、2、3、4、6、7）
- 所有 UART 均支持硬件反相；SBUS、SmartPort 等反相协议可在任意 UART 上使用，无需 “uninvert hack”。
- 仅支持串行接收机（SBUS、iBus、Spektrum、Crossfire），不支持 PPM 和 PWM 接收机
- TF 卡用于黑匣子记录
- 尺寸：35×41×7 mm（高度包含泡棉安装的陀螺仪板）
- 安装孔：标准 30.5 mm 正方形孔距（孔中心距）
- 重量：8 g

## 引脚定义图

`顶视图`
![](/img/boards/kakutef7/kakutef7_pin_diagram.jpg?raw=true)

## 目标代码

`KAKUTEF7`

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
