# FOXEERF405

此处介绍的 FOXEERF405 使用 STM32F405RGT6 微控制器，具有以下特性：

- 1,024 KB Flash、192 KB RAM、168 MHz CPU、210 DMIPS
- 16 MB SPI Flash，用于数据日志记录
- 板载 USB VCP 和 Boot 选择按钮，用于进入 DFU
- 稳定的电压调节；为 VTX、相机等提供 9 V / 2 A DC-DC BEC，可通过焊盘选择 5 V / 9 V
- 串行 LED 接口（`LED_STRIP`）
- VBAT/CURR/RSSI 传感器输入
- 支持 IRC Tramp、SmartAudio、FPV 相机控制、FPORT 和遥测
- 支持 S.Bus、Spektrum1024/2048、PPM；无需外置反相器，板载已集成
- 支持扩展 I2C 设备，例如气压计、罗盘和 OLED
- 支持 GPS
- 支持 MPU6000 或 ICM20689
