## KAKUTE F4 飞控 V2

### 说明

Holybro Kakute F4 飞控支持 Betaflight/Cleanflight 的 OSD、DShot 等重要功能。更快的 F4 处理器为后续功能预留性能空间：可在仅个位数 CPU 占用下，以 8 kHz PID 环路运行全部功能。其他 F4 板卡受串行反相限制，往往难以同时支持 FrSky SBUS 和 SmartPort 等协议；Kakute F4 可同时支持全部串行协议。

### V2 新功能

- 新增 UART4，用于 RunCam Split 等串行摄像头通信。注意：这与 Betaflight 的摄像头控制功能不同；后者用于操作 Swift、Monster 等 FPV 摄像头菜单。
- 新增 UART5，用于 BLHeli_32、KISS 等 ESC 遥测。
- 采用通孔焊盘代替平面焊盘，焊接更牢固，尤其适合初学者。
- 板载气压计，支持定高模式。
- 提供 I2C 焊盘，可连接部分外部传感器。

### 功能

- 支持 Betaflight 和 Cleanflight。
- 支持 Betaflight OSD。可使用遥控器摇杆和眼镜修改 PID、常用配置参数、图传频道和发射功率。
- 内置软安装：IMU（“陀螺仪”）芯片安装在隔振泡棉上，无需再对整块飞控进行软安装。
- 高性能、低噪声、高灵敏度 IMU：ICM20689，内置 6 轴陀螺仪和加速度计，最高可运行在 32 kHz。
- 2 oz 铜厚 PCB，最大持续电流可达 120 A。
- 专用 Bootloader 按钮，便于刷写固件。
- 低剖面设计，适配紧凑机架。
- 输入电压 7-42 V；可通过 “B+” 焊盘直接由最高 6S 飞行电池供电。
- 自动电压监测。Kakute F4 AIO 直接从电池主电源线监测电压，无需单独连接 vBat 线。
- 板载稳压器提供经过滤波的低噪声视频供电：5 V 输出最高 1.5 A，3.3 V 输出最高 200 mA，可为接收机、VTX、FPV 摄像头或 LED 灯带供电。
- 支持 BLHeli 直通，便于升级和配置 ESC。

### 规格

- MCU：STM32F405RGT6，32 位处理器
- IMU：ICM20689（SPI）
- 气压计：BMP280
- USB VCP 驱动（所有 UART 可同时使用，USB 不占用 UART）
- 5 个硬件 UART（UART1、3、4、5、6）
- 仅支持串行接收机（SBUS、iBus、Spektrum、Crossfire），不支持 PPM 和 PWM 接收机
- 128 Mbit Dataflash 芯片，用于黑匣子记录
- 尺寸：35×30×8 mm（高度包含 USB 接口）
- 安装孔：标准 30.5 mm 正方形孔距（孔中心距）
- 重量：7 g

### 图片

- KakuteF4 V2
  ![](https://github.com/jamming/image/blob/master/IMG_6809.JPG)
  ![](https://github.com/jamming/image/blob/master/IMG_6808.JPG)

- KakuteF4 All-In-One V2
  ![](https://github.com/jamming/image/blob/master/kakuteF4aio-V2-TOP.jpg)
  ![](https://github.com/jamming/image/blob/master/kakuteF4aio-V2-bottom.jpg)

### 制造商和经销商

- www.holybro.com（制造商和设计者）
- www.facebook.com/holybrohobby/

### 经销商

- www.banggood.com
- www.getfpv.com
- www.unmannedtechshop.co.uk
- www.gearbest.com
- www.hobbyking.com
