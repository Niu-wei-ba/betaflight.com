# 应答器

Betaflight 可在兼容 Target 上生成竞速应答器信号。

红外 LED 的连接方式因 Target 而异。请查阅飞控参考手册。

Betaflight 支持多个应答器协议提供商。

## iLap 提供商

### 链接

网站：http://www.rclapcounter.com/
联系邮箱：cs@rclapcounter.com

### 说明

iLap 是商用系统，使用 6 字节应答器代码和 `460kHz` 载波。

在 Betaflight App 的 Transponder 选项卡中输入 12 个十六进制数字，即可设置应答器代码。

代码理论上是唯一的。可从 iLap 获取代码，部分飞控也会附带代码。

![iLap 提供商](Screenshots/Provider%20iLap.png)

## ArcTimer 提供商

### 链接

[网站](http://www.arcitimer.com)
联系邮箱：info@arcitimer.com

### 说明

Arctimer 是商用系统，使用 9 字节应答器代码和 `42kHz` 载波。

Arctimer 仅有 9 个唯一代码。在 Betaflight App 的 Transponder 选项卡中从列表选择代码。

![ArcTimer 提供商](Screenshots/Provider%20ArcTimer.png)

## EasyRaceLapTimer (ERLT) 提供商

### 链接

[网站](http://www.easyracelaptimer.com/)
[Facebook](https://www.facebook.com/groups/1015588161838713/)
[RCGroups](https://www.rcgroups.com/forums/showthread.php?2538917-EasyRaceLapTimer-open-source-and-open-hardware-FPV-racing-lap-time-tracking-system)
[GitHub](https://github.com/polyvision/EasyRaceLapTimer)

### 说明

EasyRaceLapTimer 是开源系统，使用 6 位应答器代码和 `38kHz` 载波。

ERLT 有 64 个唯一代码。在 Betaflight App 的 Transponder 选项卡中从列表选择代码。

![ERLT 提供商](Screenshots/Provider%20ERLT.png)
