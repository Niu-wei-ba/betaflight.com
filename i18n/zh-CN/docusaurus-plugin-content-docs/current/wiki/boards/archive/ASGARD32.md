### 固件目标

- Asgard32 F4 使用 `AG3XF4`。
- Asgard32 F7 使用 `AG3XF7`。

### Asgard32 F4/F7 的已知问题与解决方法

1. LED 灯带焊盘 PB6 因与电机 4 共用定时器而无法工作。可用于规避的焊盘很少，PA2（TX2，标记为 SmartAudio 的 S/A）是较合适的选择。SmartAudio 可迁移到其他可用的定时器通道；官方发布版本已包含该规避配置。

2. 蜂鸣器功能与状态 LED 复用，没有专用蜂鸣器焊盘（BUZ- 焊盘会被状态 LED 信号拉至地）。将蜂鸣器接到 BUZ- 后，它可能在普通蜂鸣器不会提示的事件（例如地面姿态变化）时发声。解决方法见下文。

### Asgard32 F4 焊盘/引脚功能图

![Asgard32 F4 功能图](https://user-images.githubusercontent.com/14850998/43266681-f9381526-9126-11e8-974e-eaa5d4129487.png)

[AG3XF4 功能图 PDF](https://github.com/betaflight/betaflight/files/2232258/AG3XF4-function_map-20180626.pdf)

### 添加真正的蜂鸣器功能

v3.4.1 及更高版本已配置蜂鸣器功能，但默认未分配引脚。

要驱动实体蜂鸣器，需要以下设备之一：

1. 外部 MOSFET 开关，用于驱动自激式蜂鸣器（在 + 和 - 端施加适当电压即可发声）。
2. 蜂鸣器模块，例如 [Mateksys DBUZ5V](http://www.mateksys.com/?portfolio=dbuz5v)，或其他电平触发蜂鸣器。

要将某个引脚配置为电平 I/O，请选择引脚并将其分配给 beeper 资源。例如，M7 焊盘（PB14）适合此用途：

```text
resource beeper b14
```

将选定焊盘连接到蜂鸣器信号焊盘。对于上面的 Mateksys 模块，“B-”即为信号焊盘。

可能还需要调整信号极性：

```text
set beeper_inversion = OFF # 如果蜂鸣器在应静音时发声
set beeper_inversion = ON # 默认值
```

下图为测试使用的电路：

![测试电路](https://user-images.githubusercontent.com/14850998/36553159-f7805d12-183e-11e8-8e22-8cd2740a53b8.png)
