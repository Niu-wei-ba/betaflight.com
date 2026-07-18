# Resource 重映射命令

**注意：此命令仅在 Betaflight 3.1 及更高版本中可用。**

IO 重映射允许配置 MCU 引脚以承担不同功能。这只是起始框架，后续仍可扩展。

通过 `resource` 命令行命令重映射引脚：

`resource [function name] [index] [pin]`，例如 `resource MOTOR 1 A1`。

其中 `MOTOR` 为功能，`1` 为电机索引（从 1 开始，例如四轴飞行器为 1 至 4），`A1` 为 A 端口 1 号引脚；在 STM 数据手册中通常称为 `PA1`。

要删除映射，请以 `NONE` 替代引脚，例如：`resource MOTOR 5 NONE`。

若某功能不需要索引（即只有一个可分配引脚），例如 `BEEPER`、`SONAR_ECHO` 或 `SONAR_TRIGGER`，则**必须**省略索引，例如 `resource BEEPER B6`。

单独执行 `resource` 会列出全部可配置选项及其当前设置。该输出会添加到 `dump`，用于备份和还原配置。请注意，此命令会列出所有“若使用则会被分配”的配置。

例如，`resource` 会显示电机 1 至 8；但若混控器设为 QuadX，实际只使用电机 1 至 4。若将混控器改为 Oct 并重启，则会配置全部 8 个电机。

`resource list`（较新 Betaflight 版本中为 `resource show`）会列出所有引脚及当前分配，包括系统组件正在使用且用户**不可**配置的引脚；也会列出当前启用的 DMA 使用情况。进行任何调整后，必须保存并重启，才能在该输出中看到改变。可将此命令视为当前活动状态的输出。

通过 CLI 修改引脚映射后，必须执行 `save` 命令。

```jsx
<center>
<img src="https://cloud.githubusercontent.com/assets/14850998/21921215/c5d3521c-d9a9-11e6-8ed8-c53afdbda50f.jpg" width="70%"><br>
图：不同 resource 命令变体的工作方式
</center>
```

## 可用功能、数值与限制

| 功能             | 索引  | 说明                 | 限制                                                                                                                                                                             |
| :--------------- | :---: | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADC_BATT`       |   -   | 电池电压传感器       | 只能映射到其他 ADC 引脚。                                                                                                                                                        |
| `ADC_CURR`       |   -   | 电池电流传感器       | 只能映射到其他 ADC 引脚。                                                                                                                                                        |
| `ADC_RSSI`       |   -   | 接收机模拟 RSSI 输入 | 只能映射到其他 ADC 引脚。                                                                                                                                                        |
| `BEEPER`         |   -   | 信号蜂鸣器           | 通常硬连线到晶体管基极，以开关蜂鸣器。                                                                                                                                           |
| `CAMERA_CONTROL` |   -   | FPV 相机 OSD 控制    | [模拟摇杆按键](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation)。需要硬连线电阻和 / 或电容。因此现有 `CAMERA_CONTROL` 引脚*可能*只能用于 SmartAudio 等低频应用。 |
| `ESCSERIAL`      |   ?   | ?                    | ?                                                                                                                                                                                |
| `I2C_SCL`        | `1-n` |                      |                                                                                                                                                                                  |
| `I2C_SDA`        | `1-n` |                      |                                                                                                                                                                                  |
| `INVERTER`       |       |                      |                                                                                                                                                                                  |
| `LED`            | `1-3` | 指示 LED             | 不要与 `LED_STRIP` 混淆。                                                                                                                                                        |
| `LED_STRIP`      |   -   | WS2812 LED 数据      | 若未连接 / 使用 WS2812 LED，通常非常适合改作其他用途。                                                                                                                           |
| `MOTOR`          | `1-n` | 电机信号             | 在其他[电机引脚](Remapping-Motors-with-Resource-Command)之间映射（交换）应始终可行。其他引脚可能不可用（与 DShot 发生 DMA 冲突）。                                               |
| `PPM`            |   -   | 接收机 PPM 输入      | 通常是改作其他用途的良好选择。                                                                                                                                                   |
| `PWM`            | `1-n` | 接收机 PWM 输入      | ?                                                                                                                                                                                |
| `SERIAL_RX`      | `1-n` | 串行接收引脚         | 不能重映射到其他引脚，但可用于其他功能（包括[软件串口](/docs/wiki/guides/current/SoftSerial)）。                                                                                 |
| `SERIAL_TX`      | `1-n` | 串行发送引脚         | `SERIAL_RX` / `SERIAL_TX` 的 `11-12` 为软件串口 #1 和 #2。                                                                                                                       |
| `SERVO`          | `1-n` | 舵机信号             | ?                                                                                                                                                                                |
| `SONAR_ECHO`     |   -   |                      |                                                                                                                                                                                  |
| `SONAR_TRIGGER`  |   -   |                      |                                                                                                                                                                                  |
| `SPI_SDI`        | `1-n` | 曾称为 `SPI_MISO`    |                                                                                                                                                                                  |
| `SPI_SDO`        | `1-n` | 曾称为 `SPI_MOSI`    |                                                                                                                                                                                  |
| `SPI_SCK`        | `1-n` |                      |                                                                                                                                                                                  |

## 使用 Resource 命令的 Wiki 示例页面

[重映射电机输出](Remapping-Motors-with-Resource-Command)
[使用舵机和 SERVO_TILT](Servos-And-SERVO_TILT-for-3-1)
[固定翼飞机设置](Setup-for-a-Fixed-Wing-Aircraft)
