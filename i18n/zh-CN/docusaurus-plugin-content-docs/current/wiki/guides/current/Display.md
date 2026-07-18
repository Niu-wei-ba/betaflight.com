# 显示器

Betaflight 支持显示器，用于显示飞行器及 Betaflight 状态信息。

飞行器解锁后显示器不会更新，以免影响飞行；上锁后显示器会在不同页面间循环。

目前无法修改各页面的信息、页面列表或页面切换间隔，欢迎通过 Pull Request 提交代码。

## 支持的硬件

当前除 SSD1306 / UG-2864HSWEG01 外，不支持其他显示器。

## 配置

在 CLI 中启用 `DISPLAY` 功能：

```
feature DISPLAY
```

### SSD1306 OLED 显示器

SSD1306 是 `128x64` OLED 显示器，阳光下仍清晰可见，体积小且耗电极低，因此很适合飞行器使用。

市面上有多种 SSD1306 板卡，品质和实现并不相同，部分需要额外修改后才能工作，请谨慎选择。

显示器链接：

- [banggood.com](http://www.banggood.com/0_96-Inch-4Pin-White-IIC-I2C-OLED-Display-Module-12864-LED-For-Arduino-p-958196.html) 0.96 Inch 4Pin White IIC I2C OLED Display Module 12864 LED For Arduino
- [banggood.com](http://www.banggood.com/0_96-Inch-4Pin-IIC-I2C-Blue-OLED-Display-Module-For-Arduino-p-969147.html) 0.96 Inch 4Pin IIC I2C Blue OLED Display Module For Arduino
- [wide.hk](http://www.wide.hk/products.php?product=I2C-0.96%22-OLED-display-module-%28-compatible-Arduino-%29) I2C 0.96" OLED display module
- [witespyquad.gostorego.com](http://witespyquad.gostorego.com/accessories/readytofly-1-oled-128x64-pid-tuning-display-i2c.html) ReadyToFlyQuads 1" OLED Display
- [multiwiicopter.com](http://www.multiwiicopter.com/products/1-oled) PARIS 1" OLED 128x64 PID tuning screen AIR

撰写本文时，banggood.com 的显示器价格最低，且能正确发送 I2C ACK 信号。

#### Crius CO-16

应尽量避免使用此显示器；但经过改装后可用。

步骤 1

出厂状态下不会发送 I2C ACK 信号，因为制造商未将 D1 和 D2 短接。请在两针脚进入显示器的位置将其焊接在一起；否则屏幕不会显示任何内容。

步骤 2

用手术刀将 14 号引脚与主板断开。然后在 30 号引脚与翘起的 14 号引脚之间连接一个 `10nF` 或 `100nF` 电容。

步骤 3

在 9 号引脚与翘起的 14 号引脚之间连接 `100K` 电阻。

若未完成步骤 2 和 3，显示器可能只在部分上电时正常工作，也可能显示随机点或其他图像损坏。

更多说明见：http://www.multiwii.com/forum/viewtopic.php?f=6&t=2705&start=10

![Crius CO-16 接线图](Wiring/Crius%20CO-16%20OLED%20diagram.png)
![Crius CO-16 改装图](Wiring/Crius%20CO-16%20OLED%20modifications.jpg)

## 连接

将飞控的 `+5V`、Ground、I2C SDA 和 I2C SCL 连接到显示器。

Naze32 rev 5 板卡的 SDA 和 SCL 焊盘位于板底。
