# EXF405DUAL

### 硬件

- MCU：STM32F405RGT6
- IMU1：ICM20608（SPI1）
- IMU2：MPU6000（SPI1）
- OSD：AT7456E（SPI2）
- Blackbox：Micron M25P16VP（SPI3）

### 特性

- 具备 FPU 的高性能 ARM MCU，配有 512 KB Flash。
- 双陀螺仪 MPU6000 与 ICM20608。可在 CLI 中选择 MPU6000，以获得更稳定平滑的表现；也可选择 ICM20608，以使用更高的 32 kHz/32 kHz 速率。在同一块板上即可体验不同陀螺仪的特性。
- 16 MB SPI Flash，用于数据日志记录。
- 板载 USB VCP 和 Boot 选择按钮，用于进入 DFU。
- 串行 LED 接口（`LED_STRIP`）。
- VBAT/CURR/RSSI 传感器输入。
- 支持 IRC Tramp、SmartAudio、FPV 相机控制、FPORT 和遥测。

### 图片

![image](https://user-images.githubusercontent.com/10217966/49683467-72d60300-fb00-11e8-9a50-4e68b66155dd.png)

![image](https://user-images.githubusercontent.com/10217966/49683470-7bc6d480-fb00-11e8-8927-b2bc21bb99a4.png)

### 制造商

- EXUAV FPV
- Facebook：https://www.facebook.com/profile.php?id=100013651722728

### 量产版本即将推出
