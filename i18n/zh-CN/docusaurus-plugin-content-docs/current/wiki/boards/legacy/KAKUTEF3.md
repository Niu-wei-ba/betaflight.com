# KAKUTE F3

## target HEX：SPRACINGF3

## MCU、传感器与功能

### 硬件

- STM32F303CCT6（256 KB Flash）32 位处理器
- MPU6050 陀螺仪/加速度计
- 高品质镀金 PCB
- 用于刷写的 Micro USB 接口
- 尺寸：36 x 36 x 6 mm（高度包含 USB 接口）
- 安装孔：孔中心距为 30.5 mm 正方形
- 重量：4.2 g

### 特性

- 下沉式侧向排针，也可不使用排针而将全部导线直接焊接到焊盘。
- 专用 BOOT 按键，便于刷写固件。
- 加固焊盘，适合直接焊接。
- 超低外形设计。
- 输入电压 7-42 V，可直接由最高 6S 飞行电池供电（仅限 `BAT` 焊盘）。
- VIN 与 VBAT 合并：一根供电线即可提供电压输入以及遥测/OSD 电压数据。
- 带滤波电源输出：5 V/800 mA，以及适用时的 3.3 V/150 mA，可为 GPS、RX、Blackbox、OSD 等外设供电；RX 可选 5 V 或 3.3 V。
- 支持 Cleanflight（RACE target）、硬件 BLHeli 刷写、Raceflight 和 Betaflight。

### Kakute FC 的 Betaflight 附加焊盘分配

| Kakute FC 焊盘 | 功能         |
| -------------- | ------------ |
| PPM            | SoftSerial 1 |
| LED            | SoftSerial 2 |

可使用 `resource` 命令启用 SoftSerial 焊盘分配。这些焊盘可连接 Unify 的 SmartAudio 或 Tramp 的遥测。

**注意：需要 Betaflight 3.1.6 或更高版本。**

在 CLI 中输入：

```text
resource ppm none
resource serial_tx 11 a00
resource led 1 none
resource serial_tx 12 A08
save
```

## 制造商与经销商

https://www.nextfpv.com.au/products/full-metal-racing-kakute-f3-flight-controller-v1-0

## 手册

https://cdn.shopify.com/s/files/1/0412/2761/files/FMR_Kakute_Flight_Controller_Manual_v2.pdf?2155904968756041300

## 图片

![](http://www.fpvwarehouse.com.au/image/cache/product_images/fmr/kakute/KAKUTE-BOT_large-1008x800.png)
