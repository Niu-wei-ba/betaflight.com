# MATEKSYS F411-MINI

![Matek F411-MINI](http://www.mateksys.com/downloads/FC/MATEK_F411-MINI.jpg)

## 说明

F411 + MPU6000，配备 BFOSD，无黑匣子。

## MCU、传感器和功能

### 硬件

- MCU：STM32F411CEU6
- IMU：MPU6000（SPI）
- OSD：Betaflight OSD，采用 AT7456E 芯片
- 指南针和气压计：无
- VCP：支持
- 硬件 UART：1、2
- 黑匣子：无
- PPM/UART 共用：UART2-RX
- 电池电压传感器：支持，1:10
- 电流传感器：无（可选 FCHUB-A）
- 集成稳压器：5 V/2 A
- 有刷电机 MOSFET：无
- 按钮：BOOT 按钮
- 6 路 PWM/DShot 输出
- WS2812 LED 灯带：支持
- 蜂鸣器：支持

### 功能

- SBUS 输入（UART1-RX）内置反相器
- 6 路 DShot 输出，无资源冲突
- VCP、UART1、UART2

## 制造商和经销商

- Matek Systems
  - [F411-MINI](http://www.mateksys.com/?portfolio=f411-MINI)

## 设计者

Matek Systems，www.mateksys.com

## 维护者

- 硬件：Matek Systems

## 常见问题与已知问题

设置指南：[http://www.mateksys.com/?portfolio=f411-MINI](http://www.mateksys.com/?portfolio=f411-MINI)

Matek FC Facebook 群组：[https://www.facebook.com/groups/1882519175321708/](https://www.facebook.com/groups/1882519175321708/)

---

#### 示例 5：在 Betaflight 3.2.2 中将 Matek F411 mini 配置为三轴机，作者 Flashted

如需更新 F411 固件，建议通过 CLI 操作。

以下说明已在 Betaflight 3.2.2 中验证。更高版本改变了尾舵输出的处理方式，因此该方法不适用于 Betaflight 3.4.1 及更高版本；3.2.2 至 3.4.0 之间的版本尚未测试。Betaflight 3.2.2 可用较少步骤使飞行器起飞。若要使用 3.2.2 不支持的三轴机 GPS 救援功能，请从支持该功能的 3.4.1 开始自行验证配置。

与许多其他板卡不同，Matek F411 飞控断电后按住 Bootloader 按钮再重新插入，在部分 Windows 10 电脑上不会进入 Bootloader 模式，也没有 LED 闪烁确认，因而此方式不可用。

若电脑无法检测飞控，请用 zadig 重新安装 DFU 驱动，或使用 [https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe](https://impulserc.blob.core.windows.net/utilities/ImpulseRC_Driver_Fixer.exe)。

要在 CLI 中进入 Bootloader 模式：

在 CLI 中输入：

```
bl
```

按 Enter 后将启用 Bootloader 模式，可刷写新固件。

在进行**任何**修改之前，请执行完整 CLI dump，以便保留原始配置作参考；必要时可作为恢复起点。必须先将机型指定为三轴机，并以三轴机模式 “save and reboot”，这样所有资源及其分配才会显示在 CLI 中。

### 设置

- 第 1 路舵机输出用于尾舵机。
- 第 1 路电机输出用于尾电机。
- 第 2 路电机输出用于右侧电机。
- 第 3 路电机输出用于左侧电机。

两颗前电机朝前，尾部电机/舵机朝向飞手。

在板卡上：

- 电机 1（后方）接电机输出 S1。
- 电机 2（右侧）接电机输出 S2。
- 电机 3（左侧）接电机输出 S3。
- 电机输出 S4 空闲，因为这是三轴机。

受时序限制，电机引脚 4 不可用于尾舵机。（尾舵机设置见下文。）

若需更多舵机输出或频闪灯输出：当电机 3（S3）分配给电机时，电机 4（S4）不能重映射为舵机；若 S5 用于舵机，S6 也可以重映射为舵机。示例配置中 S5 用于 Taranis 遥测。

也可以使用 RSSI 或 LED 焊盘作为舵机输出。

作者曾尝试禁用电机 4，但校准 ESC 时因 Betaflight 的行为导致电机 2 也无法工作；将电机 4 恢复原始分配后，电机 2 又恢复正常。因此建议保留电机 4 的原始分配。

在 Betaflight GUI 的 Receiver（接收机）选项卡中，可选择与模型的连接通道顺序。

Betaflight 默认为 AETR1234：Aileron、Elevator、Throttle、Rudder（Yaw）、Aux 1、2、3、4。这是 Taranis 常用的标准设置。

在 Configuration（配置）选项卡中，以下功能必须关闭：

```
feature SERVO_TILT
feature CHANNEL_FOWARDING
```

选择 TRICOPTER 后会自动将偏航输出设为舵机。

### 设置尾舵机

示例中使用引脚 6 作为尾舵机输出，因为引脚 5 用于遥测。

在 CLI 中输入：

```
resource motor 6 none
save
```

这样会释放该引脚。板上对应 S6，位置为 B10。然后输入：

```
resource servo 1 B10
save
```

无需在 Servos（舵机）选项卡中修改动作设置。

三轴机上使用舵机时，请勿从飞控板为舵机供电；正极和黑色负极线应连接到 PDB 的 5 V 输出。

黄色或白色信号线可接到电机引脚 5、6、7 或 8，均可使用。

若希望未解锁时关闭尾舵机，请在 CLI 中输入：

```
set tri_unarmed_servo = OFF
save
```

若希望其保持开启：

```
set tri_unarmed_servo = ON
save
```

现在检查舵机/电机倾转方向是否正确。

将偏航摇杆向左推时，电机必须向右倾转。若方向相反，有两种修正方法。在 CLI 中输入：

```
set yaw_control_direction = -1
save
```

若快速将机尾向右转动，电机必须快速向左倾转，反之亦然。

也可在遥控器上反转偏航方向，但更建议在 GUI 中设置，避免飞控额外处理数据。

在 GUI 中设置行程端点，使两侧偏转均为 40 度，并尽量使中位保持水平。

多数情况下模拟舵机和数字舵机均可使用；作者的模拟舵机方向无需反转，数字舵机可能不同。

希望这些说明有所帮助。

致意！

---
