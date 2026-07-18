---
sidebar_position: 9
---

# 模式选项卡

模式用于启用或禁用功能，并通过 AUX 通道开关触发飞控（FC）操作。满足“范围”或“链接”的条件时，模式即会激活。

| 设置           | 说明                                                     |
| -------------- | -------------------------------------------------------- |
| 范围（Ranges） | 当接收机通道读数落在指定的最小值和最大值之间时激活模式。 |
| 链接（Links）  | 当其他已链接的模式处于激活状态时激活模式。               |

可使用布尔 `AND` 或 `OR` 运算符匹配和组合多个范围与链接，从而定义模式的激活条件。

### 模式类型

| 选项                     | 说明                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| ARM                      | 启用电机输出，允许飞行器解锁并飞行。                                                                  |
| ANGLE                    | 利用加速度计保持机身水平；摇杆输入决定飞行器倾角。                                                    |
| HORIZON                  | 利用加速度计保持水平；摇杆输入决定倾角，但大行程时仍可完成翻转，之后恢复自稳。                        |
| ANTI GRAVITY             | 油门快速变化时提高 P 和 I 项，改善摇杆跟随并减少机头漂移。                                            |
| MAG                      | 通过磁力计（罗盘）启用航向锁定。                                                                      |
| HEADFREE                 | 以外部参考方向（通常为飞手面向方向）定义偏航参考的飞行模式。面向新手但很少使用，建议使用 ANGLE 模式。 |
| HEADADJ                  | 为 HEADFREE 模式设置新的偏航原点。                                                                    |
| CAMSTAB                  | 驱动伺服响应飞行器姿态，自动调平云台以稳定相机。                                                      |
| PASSTHRU                 | 跳过 PID 环路，将横滚、偏航和俯仰直接传递给固定翼混控器的伺服输出。                                   |
| BEEPER                   | 激活蜂鸣器（未解锁时可使用 DShot 电机蜂鸣）或外置蜂鸣器，便于寻找坠机后的飞行器。                     |
| LEDLOW                   | 关闭 LED 灯带。                                                                                       |
| CALIB                    | 在飞行中校准加速度计的横滚和俯仰偏移量；建议在飞行前于工作台上完成。                                  |
| OSD                      | 启用或禁用 OSD 叠加显示。                                                                             |
| TELEMETRY                | 启用或禁用向遥控链路接收机或其他输出端口发送 FC 遥测数据。                                            |
| SERVO1                   | 启用或禁用第一个伺服输出。                                                                            |
| SERVO2                   | 启用或禁用第二个伺服输出。                                                                            |
| SERVO3                   | 启用或禁用第三个伺服输出。                                                                            |
| BLACKBOX                 | 启用或禁用 Blackbox 日志；存储空间有限时可只记录所需数据。                                            |
| FAILSAFE                 | 模拟遥控链路丢失事件，以便完整测试 GPS Rescue 返航。                                                  |
| AIRMODE                  | 启用或禁用 Air Mode；在零油门时仍保持完整 PID 修正能力。                                              |
| 3D                       | 启用可逆电机方向以产生负推力，允许倒飞；油门范围从 `0` 至 `100` 改为 `-100` 至 `+100`。               |
| FPV ANGLE MIX            | 相对于相机角度施加偏航旋转的飞行模式。面向新手设计，但通常不建议使用。                                |
| BLACKBOX_ERASE           | 清除 Blackbox 闪存或 microSD 存储设备中的全部数据。                                                   |
| CAMERA CONTROL 1         | 为兼容 Runcam 的相机配置自定义操作；用于控制部分 Runcam/Caddx 高清录像机。                            |
| CAMERA CONTROL 2         | 为兼容 Runcam 的相机配置自定义操作；用于控制部分 Runcam/Caddx 高清录像机。                            |
| CAMERA CONTROL 3         | 为兼容 Runcam 的相机配置自定义操作；用于控制部分 Runcam/Caddx 高清录像机。                            |
| FLIP OVER AFTER CRASH    | 启用反乌龟模式；四轴飞行器仅反转一侧螺旋桨以在倒扣坠机后翻正，需使用 DShot。                          |
| BOXPREARM                | 启用两阶段解锁；为提高安全性，必须先激活 PREARM 开关，才能激活 ARM。                                  |
| BEEP GPS SATELLITE COUNT | 通过相同次数的蜂鸣提示已锁定的 GPS 卫星数量。                                                         |
| VTX PIT MODE             | 在 VTX 上启用低功率输出模式，避免干扰空中的其他飞手；需要 VTX 支持。                                  |
| USER1                    | 用户自定义开关 1；通过 PINIO 控制任意输出。                                                           |
| USER2                    | 用户自定义开关 2；通过 PINIO 控制任意输出。                                                           |
| USER3                    | 用户自定义开关 3；通过 PINIO 控制任意输出。                                                           |
| PID AUDIO                | 将 PID 控制器状态作为音频输出。                                                                       |
| PARALYZE                 | 永久禁用已坠落的飞行器，直至重新上电。                                                                |
| GPS RESCUE               | 启用 GPS Rescue，使飞行器自主返回起飞点并着陆。                                                       |
| ACRO TRAINER             | 在 Acro 模式下限制飞行器倾角的飞行模式。                                                              |
| DISABLE VTX CONTROL      | 禁止通过 OSD 控制 VTX 设置。                                                                          |
| LAUNCH CONTROL           | 竞速辅助起飞系统；让电机转动并将飞行器前倾至指定角度，但不实际起飞。                                  |
| MSP OVERRIDE             | 启用 MSP Override 模式。                                                                              |
| STICK COMMANDS DISABLE   | 禁用或启用摇杆命令。                                                                                  |
| BEEPER MUTE              | 禁用或启用蜂鸣器，包括警告、状态提示和蜂鸣模式。                                                      |
| READY                    | 通过开关在 OSD 中显示“READY”。                                                                        |
| LAP TIMER RESET          | 重置单圈计时器。                                                                                      |

有关飞行模式和解锁的更多信息，请参阅[模式指南](/docs/wiki/guides/current/Modes)和[解锁顺序与安全指南](/docs/wiki/guides/current/Arming-Sequence-And-Safety)。
