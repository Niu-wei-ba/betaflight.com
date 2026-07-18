# 命令行接口 (CLI)

Betaflight 提供命令行接口（CLI），可用于修改设置和配置飞控（FC）。

本文档是 Betaflight **2025.12** 中**所有 CLI 命令和变量的完整参考**。内容覆盖全部可配置参数，包括陀螺仪和滤波器调校、PID 配置、速率、失控保护、GPS、电池监测、OSD、LED 灯带、VTX、遥测及硬件配置等。下列默认值和取值范围仅适用于 **Betaflight 2025.12**，旧版本可能有所不同。

## 重要版本差异

- 动态阻尼的命名和计算已改变：在 **4.5** 中，`d_roll` 是 D_max，`d_min_roll` 是基础 D；在 **2025.12** 中，`d_roll` 是基础 D，`d_max_roll` 是峰值，`d_min_roll` 已不存在。
- GPS Rescue：`gps_rescue_*` 变量仅存在于 **4.5**；2025.12 已重新设计该功能。
- 失控保护的着陆时长：`failsafe_off_delay`（4.5）改为 `failsafe_landing_time`（2025.12）。

---

## CLI 访问与使用

### 进入 CLI

通过串口发送 `#`（或使用 Betaflight Configurator 的 CLI 标签页）进入 CLI。输入 `save` 写入设置并重启；输入 `exit` 或 `exit noreboot` 可不保存退出。

### 常用 CLI 命令

在 CLI 中输入 `help` 会显示可用命令。下表列出调校和配置最常用的命令；完整清单以所用 Betaflight 版本的 `help` 输出为准。

| 命令                                                                                                   | 说明                                                         |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `batch start\|end`                                                                                     | 开始或结束一批命令                                           |
| `get [name]`                                                                                           | 显示一个或所有变量的当前值（可使用部分名称，例如 `get acc`） |
| `set name=value`                                                                                       | 设置变量，之后必须执行 `save`。                              |
| `save`                                                                                                 | 将设置写入闪存并重启飞控                                     |
| `save noreboot`                                                                                        | 写入设置但不重启（2025.12+）                                 |
| `exit`                                                                                                 | 不保存退出 CLI 并重启                                        |
| `exit noreboot`                                                                                        | 不保存退出 CLI 且不重启                                      |
| `diff [master\|profile\|rates\|hardware\|all] {defaults\|bare}`                                        | 列出相对默认配置的改动                                       |
| `diff all`                                                                                             | 显示所有配置文件中的全部非默认设置                           |
| `dump [master\|profile\|rates\|hardware\|all] {defaults\|bare}`                                        | 完整导出配置（包括默认值）                                   |
| `dump all`                                                                                             | 完整导出所有配置文件                                         |
| `defaults`                                                                                             | 恢复默认值并重启                                             |
| `defaults nosave`                                                                                      | 恢复默认值但不重启                                           |
| `status`                                                                                               | 显示飞控状态：陀螺仪类型、循环时间、CPU 负载、解锁禁止标志   |
| `version`                                                                                              | 显示固件版本字符串                                           |
| `tasks`                                                                                                | 显示任务调度统计（各任务 CPU 用量）                          |
| [`profile [0-5]`](/docs/wiki/guides/current/Profiles)                                                  | 切换活动 PID 配置文件                                        |
| [`rateprofile [0-5]`](/docs/wiki/guides/current/Profiles)                                              | 切换活动速率配置文件                                         |
| `feature list`                                                                                         | 列出所有可用功能                                             |
| `feature <feature_name>`                                                                               | 启用功能                                                     |
| `feature -<feature_name>`                                                                              | 禁用功能                                                     |
| [`aux <index> <mode> <channel> <start> <end> <logic>`](/docs/wiki/guides/current/Modes)                | 配置 AUX 模式开关                                            |
| [`mixer list\|<name>`](/docs/wiki/guides/current/Mixer)                                                | 显示混控器名称或列表                                         |
| [`mmix`](/docs/wiki/guides/current/Mixer)                                                              | 设计自定义电机混控器                                         |
| [`smix`](/docs/wiki/guides/current/Mixer)                                                              | 设计自定义舵机混控器                                         |
| [`servo`](/docs/wiki/guides/current/Mixer)                                                             | 配置舵机                                                     |
| [`led`](/docs/wiki/guides/current/LED-Strip-Functionality)                                             | 配置 LED                                                     |
| [`color`](/docs/wiki/guides/current/LED-Strip-Functionality)                                           | 配置颜色                                                     |
| [`mode_color`](/docs/wiki/guides/current/LED-Strip-Functionality)                                      | 配置模式和特殊颜色                                           |
| [`play_sound [<index>]`](/docs/wiki/guides/current/Buzzer)                                             | 播放指定索引的声音；不带索引时播放下一个                     |
| [`map`](/docs/wiki/guides/current/Rx)                                                                  | 显示或设置 RC 通道顺序映射                                   |
| [`rxrange`](/docs/wiki/guides/current/Rx)                                                              | 配置接收机通道范围（端点）                                   |
| [`rxfail`](/docs/wiki/guides/current/Rx)                                                               | 显示或设置各通道的失控保护回退值                             |
| `resource <> \| <resource name> <index> [<pin>\|none] \| show [all]`                                   | 显示或设置引脚分配                                           |
| `dma`                                                                                                  | 显示或设置 DMA 通道分配                                      |
| [`serial`](/docs/wiki/guides/current/Serial)                                                           | 配置串口与波特率                                             |
| `serialpassthrough <id1> [<baud1>] [<mode1>] [none\|<dtr pinio>\|reset] [<id2>] [<baud2>] [<mode2>]`   | 将串口 1 的数据直通至 VCP 或串口 2                           |
| [`adjrange`](/docs/wiki/guides/current/Inflight-Adjustments)                                           | 配置飞行中调整范围                                           |
| `motor <index> [value]`                                                                                | 读取或驱动电机（务必拆桨）                                   |
| `dshot_telemetry_info`                                                                                 | 显示 DSHOT 遥测信息和统计                                    |
| `dshotprog <index> <cmd>+`                                                                             | 发送 DSHOT ESC 编程命令                                      |
| `escprog <mode [sk/bl/ki/cc]> <index>`                                                                 | 将 ESC 直通到串口                                            |
| [`gpspassthrough`](/docs/wiki/guides/current/Gps)                                                      | 将 GPS 直通到串口                                            |
| `gyroregisters`                                                                                        | 导出原始陀螺仪硬件寄存器内容                                 |
| `simplified_tuning apply\|disable`                                                                     | 应用或清除简化调校滑块值                                     |
| `bind_rx`                                                                                              | 发起接收机绑定（SRXL2、CRSF、SPI RX）                        |
| `bl [rom]`                                                                                             | 重启并进入引导加载程序                                       |
| `msc`                                                                                                  | 切换到 USB 大容量存储模式（SD 卡或闪存）                     |
| `rc_smoothing_info`                                                                                    | 显示 RC 平滑运行设置                                         |
| `vtx_info`                                                                                             | 显示 VTX 功率配置                                            |
| `flash_info`                                                                                           | 显示闪存芯片信息                                             |
| `flash_scan`                                                                                           | 扫描闪存设备错误                                             |
| `flash_erase`                                                                                          | 擦除闪存芯片（会删除 Blackbox 日志）                         |
| `tasks`                                                                                                | 显示任务统计                                                 |
| `timer <> \| <pin> list \| <pin> [af<alternate function>\|none\|<option(deprecated)>] \| list \| show` | 显示或设置定时器                                             |

### 备份与恢复

务必在更新固件前备份。**切勿将某一固件版本的 `diff` 或 `dump` 粘贴到另一版本中**：变量名称和合法范围会随版本变化，错误导入可能在无提示的情况下损坏配置。

```
# 备份
diff all         # 推荐：仅导出已修改设置，包含全部配置文件

# 恢复
defaults         # 先完整擦除芯片
# 逐行粘贴 diff 输出（通过 USART 时不要过快）
save
```

---

## 变量参考

列标题：**变量** | **默认值** | **范围 / 取值** | **说明**

原始 `dump` 中的作用域标注：`profile N` 表示每个 PID 配置文件，`rateprofile N` 表示每个速率配置文件；无标注表示主配置（全局）。

---

### 陀螺仪与 IMU

| 变量                     | 默认值  | 范围 / 取值                              | 说明                                                                                                                                                                                |
| ------------------------ | ------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gyro_hardware_lpf`      | NORMAL  | NORMAL、OPTION_1、OPTION_2、EXPERIMENTAL | 陀螺仪芯片内置硬件低通滤波器模式。NORMAL 适用于几乎所有机型；若传感器支持，可用 OPTION_1、OPTION_2 或 EXPERIMENTAL 选择其他硬件带宽。                                               |
| `gyro_calib_duration`    | 125     | 50–3000                                  | 陀螺仪校准时长，步长为 0.1 s（125 = 12.5 s）。时长越长，零偏测量越准确。                                                                                                            |
| `gyro_calib_noise_limit` | 48      | 0–200                                    | 校准期间的噪声阈值。运动超过该值会重新开始校准；在嘈杂环境中无法校准时可提高该值。                                                                                                  |
| `gyro_offset_yaw`        | 0       | −1000–1000                               | 手动偏航陀螺仪微调，单位为 0.1 度/s。摇杆微调或加速度计微调不足以修正持续偏航漂移时使用。                                                                                           |
| `gyro_overflow_detect`   | ALL     | OFF、YAW、ALL                            | 检测陀螺仪 ADC 饱和（传感器到达量程极限）并禁止解锁。建议设为 ALL。                                                                                                                 |
| `imu_dcm_kp`             | 2500    | 0–32000                                  | 互补滤波器比例增益，决定加速度计数据与陀螺仪积分结果的融合力度。默认值适合常规使用。                                                                                                |
| `imu_dcm_ki`             | 0       | 0–32000                                  | 互补滤波器积分增益。非零值允许缓慢的、基于加速度计的偏航校正，通常无需改动。                                                                                                        |
| `imu_process_denom`      | 2       | 1–4                                      | 相对陀螺仪任务速率的 IMU 姿态更新分频。2 表示每两个陀螺仪周期更新一次；更高可降低 CPU 负载，但会牺牲姿态精度。                                                                      |
| `small_angle`            | 25      | 0–180                                    | 允许解锁的最大倾角（度）。设为 180 可在任意角度解锁，不建议这样做。PID 调校时，可设为 30 以便安全地进行室内自稳模式飞行。                                                           |
| `pid_process_denom`      | 1       | 1–16                                     | 相对陀螺仪速率的 PID 环路分频。1 表示每个陀螺仪样本运行一次 PID；8 kHz 陀螺仪配合 denom=2 即为 4 kHz PID。目标：BMI270 为 3.2 kHz（据此调整分频）；ICM-42688P / MPU-6000 为 8 kHz。 |
| `gyro_cal_on_first_arm`  | OFF     | OFF、ON                                  | 上电后首次解锁时重新校准陀螺仪。适用于飞控预热后、首次解锁前陀螺仪已发生漂移的情况。                                                                                                |
| `prearm_allow_rearm`     | OFF     | OFF、ON                                  | 允许两次飞行之间不切换预解锁开关而重新解锁。                                                                                                                                        |
| `auto_disarm_delay`      | 5       | 0–60                                     | 油门归零后自动上锁前的秒数。0 表示禁用。                                                                                                                                            |
| `gyro_filter_debug_axis` | ROLL    | ROLL、PITCH、YAW                         | 选择在调试字段中公开的轴，用于分析陀螺仪滤波器。                                                                                                                                    |
| `acc_calibration`        | 0,0,0,0 | 长度为 4 的数组                          | 校准流程写入的原始加速度计校准偏移量。请勿手动编辑。                                                                                                                                |
| `acc_limit`              | 0       | 0–500（profile）                         | 限制角度 / 地平线模式姿态估计中施加的加速度计校正量。0 表示不限制。                                                                                                                 |
| `acc_limit_yaw`          | 0       | 0–500（profile）                         | 与 `acc_limit` 相同，但作用于偏航轴。0 表示不限制。                                                                                                                                 |
| `acc_high_range`         | OFF     | OFF、ON                                  | 为支持该功能的传感器启用高量程加速度计模式。                                                                                                                                        |

---

### 陀螺仪滤波器

陀螺仪 LPF1 是主要的陀螺仪低通。在大多数带有 RPM 过滤的现代版本中，**禁用 LPF1** (`gyro_lpf1_static_hz = 0`)，因为它会增加不必要的延迟。 LPF2 是抗混叠滤波器；如果陀螺仪和 PID 速率相等，则提高其截止值或禁用。

| 变量                   | 默认 | 范围/值               | 描述                                                                                                |
| ---------------------- | ---- | --------------------- | --------------------------------------------------------------------------------------------------- |
| `gyro_lpf1_type`       | PT1  | PT1、BIQUAD、PT2、PT3 | 陀螺仪 LPF1 的滤波器类型。 PT1 = 一阶、最小延迟。                                                   |
| `gyro_lpf1_static_hz`  | 250  | 250 0–1000            | LPF1 的静态截止。设置为 **0 以禁用**（建议与 RPM 过滤一起使用）。                                   |
| `gyro_lpf1_dyn_min_hz` | 250  | 250 0–1000            | 动态 LPF1 最小截止（低油门）。设置等于 `gyro_lpf1_static_hz` 以使用静态模式。                       |
| `gyro_lpf1_dyn_max_hz` | 500  | 500 0–1000            | 动态 LPF1 最大截止（全油门）。                                                                      |
| `gyro_lpf1_dyn_expo`   | 5    | 0–10                  | 动态 LPF1 截止与油门的 Expo 曲线塑造。更高=更快的上升。                                             |
| `gyro_lpf2_type`       | PT1  | PT1、BIQUAD、PT2、PT3 | 陀螺仪 LPF2 的滤波器类型（抗锯齿）。                                                                |
| `gyro_lpf2_static_hz`  | 500  | 500 0–1000            | LPF2 截止。提高到 1000 Hz 以减少相位延迟。如果陀螺仪速率 = PID 速率（不可能出现混叠），则设置为 0。 |
| `gyro_notch1_hz`       | 0    | 0–1000                | 静态陀螺仪陷波 1 的中心频率。0 = 禁用。用于动态陷波未处理的特定持续共振。                           |
| `gyro_notch1_cutoff`   | 0    | 0–1000                | 陀螺仪陷波 1 的带宽。必须小于`gyro_notch1_hz`。                                                     |
| `gyro_notch2_hz`       | 0    | 0–1000                | 静态陀螺仪陷波 2 的中心频率。0 = 禁用。                                                             |
| `gyro_notch2_cutoff`   | 0    | 0–1000                | 陀螺仪陷波器带宽 2。                                                                                |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### 动态陷波滤波器

动态陷波滤波器会跟踪并消除机架共振。在 Blackbox 频谱中，共振通常表现为固定频率、幅度随油门变化的竖条纹。

| 变量               | 默认 | 范围/值    | 描述                                                                                                                                                                                   |
| ------------------ | ---- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dyn_notch_count`  | 3    | 0–7        | 独立跟踪的动态陷波数。 **如果频谱中没有可见帧共振，则设置为 0 以禁用**（消除延迟）。当 RPM 过滤处于活动状态时，1-2 个陷波足以满足大多数框架共振。如果没有 RPM 过滤，请使用 4–5。       |
| `dyn_notch_q`      | 300  | 300 1–1000 | Q 因子 — 每个陷波的窄度。增加直到共振刚好停留在凹口内，然后停止。最大有用值~1000。                                                                                                     |
| `dyn_notch_min_hz` | 100  | 100 20–250 | 20–250 任何陷波将跟踪的最小频率。将设置设置为低于您需要捕获的最低共振频率约 25 Hz。 **切勿无故设置低于 150 Hz**（理想情况下 ≥200 Hz）——跟踪低频会导致对 PID 相关信号进行不必要的过滤。 |
| `dyn_notch_max_hz` | 600  | 200–1000   | 任何陷波将跟踪的最大频率。默认 600 对于大多数构建来说都很好。缩小范围可提高陷波分辨率。                                                                                                |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### D 项和 PID 输出滤波器

两级 D 项滤波器链可减少由高频 D 项内容引起的电机噪音发热。使用空手道方法（基于滑块）或 AOS 方法（手动动态截止）——不要同时使用这两种方法。

| 变量                    | 默认 | 范围/值                | 描述                                                                                               |
| ----------------------- | ---- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `dterm_lpf1_type`       | PT1  | PT1、BIQUAD、PT2、PT3  | D 项 LPF1 的类型。 BIQUAD 提供更锐利的滚降； PT1 为少相。                                          |
| `dterm_lpf1_static_hz`  | 75   | 75 0–1000（配置文件）  | D 项 LPF1 的静态截止。当 `dterm_lpf1_dyn_min_hz == dterm_lpf1_dyn_max_hz` 时使用。                 |
| `dterm_lpf1_dyn_min_hz` | 75   | 75 0–1000（配置文件）  | 动态 D 项 LPF1 最小截止（怠速油门）。 AOS 调谐：80 Hz。                                            |
| `dterm_lpf1_dyn_max_hz` | 150  | 150 0–1000（配置文件） | 动态 D 项 LPF1 最大截止（全油门）。 AOS 调谐：110 Hz。                                             |
| `dterm_lpf1_dyn_expo`   | 5    | 0–10（个人资料）       | 动态 D 项 LPF1 与油门的 Expo 曲线。尽可能高地推油门，避免油门中间振荡。                            |
| `dterm_lpf2_type`       | PT1  | PT1、BIQUAD、PT2、PT3  | D 项 LPF2 的类型。                                                                                 |
| `dterm_lpf2_static_hz`  | 150  | 0–1000（profile）      | D 项 LPF2 的截止频率（始终为静态），用于辅助抑噪。                                                 |
| `dterm_notch_hz`        | 0    | 0–1000（配置文件）     | 静态 D 项陷波中心频率。 0 = 禁用。当动态陷波处于活动状态时很少需要。                               |
| `dterm_notch_cutoff`    | 0    | 0–1000（配置文件）     | 静态 D 项陷波带宽。                                                                                |
| `yaw_lowpass_hz`        | 100  | 100 0–500（个人资料）  | 低通滤波器应用于最终偏航 PID 输出（后求和）。减少输入电机的偏航噪音。设置为 0 可禁用最大偏航响应。 |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### PID 增益

所有收益均按个人资料计算。原始转储中的范围显示为 `profile N`。简化的调整滑块缩放这些值 - 应用简化的调整后，原始值反映结果。

| 变量                     | 默认   | 范围                                       | 描述                                                                                                                                                                                                         |
| ------------------------ | ------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `p_roll`                 | 45     | 45 0–250                                   | 滚动 P 增益。对角度误差做出反应。太高 → 剧烈波动时快速振荡。                                                                                                                                                 |
| `i_roll`                 | 80     | 0–250                                      | 滚动我获得。纠正累积的角度误差并保持姿态。太低 → 漂移；太高 → 翻转后摆动缓慢。                                                                                                                               |
| `d_roll`                 | 30     | 0–250                                      | 基地 D — 平稳飞行时活跃。抑制变化率，对抗 P 超调和螺旋桨洗流。快速移动时朝着 `d_max_roll` 方向提升。                                                                                                         |
| `d_max_roll`             | 40     | 0–250                                      | 动态阻尼上限 - 快速移动时使用的 D 值。必须 ≥ `d_roll`。                                                                                                                                                      |
| `f_roll`                 | 120    | 0–1000                                     | 横滚前馈。补偿摇杆输入滞后，并由 `simplified_feedforward_gain` 滑块缩放。                                                                                                                                    |
| `s_roll`                 | 0      | 0–250                                      | 横滚 S 项（稳定性项）。2025.12 新增，用于提供额外的稳定性控制。_（需要：`USE_WING`）_                                                                                                                        |
| `p_pitch`                | 47     | 47 0–250                                   | 螺距 P 增益。由于惯性较大，俯仰通常需要比横滚稍高的 P。                                                                                                                                                      |
| `i_pitch`                | 84     | 84 0–250                                   | 我获得了音高。                                                                                                                                                                                               |
| `d_pitch`                | 34     | 34 0–250                                   | 基地 D — 平稳飞行时活跃。快速移动时向 `d_max_pitch` 方向提升。                                                                                                                                               |
| `d_max_pitch`            | 46     | 46 0–250                                   | D_max 为音高。                                                                                                                                                                                               |
| `f_pitch`                | 125    | 125 0–1000                                 | 向前馈送俯仰。                                                                                                                                                                                               |
| `s_pitch`                | 0      | 0–250                                      | S 术语表示音调。 _（需要：`USE_WING`）_                                                                                                                                                                      |
| `p_yaw`                  | 45     | 45 0–250                                   | 偏航 P 增益。                                                                                                                                                                                                |
| `i_yaw`                  | 80     | 0–250                                      | 偏航我赢了。                                                                                                                                                                                                 |
| `d_yaw`                  | 0      | 0–250                                      | 偏航 D 增益。通常保留为 0 — 偏航是基于扭矩的并且本质上较慢； D 增加噪音。                                                                                                                                    |
| `d_max_yaw`              | 0      | 0–250                                      | 偏航 D_max。                                                                                                                                                                                                 |
| `f_yaw`                  | 120    | 0–1000                                     | 偏航前馈。                                                                                                                                                                                                   |
| `s_yaw`                  | 0      | 0–250                                      | S 项表示偏航。 _（需要：`USE_WING`）_                                                                                                                                                                        |
| `pidsum_limit`           | 500    | 500 100–1000（个人资料）                   | 钳位总 P+I+D 输出。初始 PID 整定时设置为 1000（取消钳位）；之后恢复默认。                                                                                                                                    |
| `pidsum_limit_yaw`       | 400    | 100–1000（个人资料）                       | 钳位总偏航 PID 输出。初始调整时设置为 1000；默认 400 限制偏航权限。                                                                                                                                          |
| `anti_gravity_gain`      | 80     | 0–250（配置文件）                          | 提高油门快速变化时的 I-term，以防止冲头出现偏航/俯仰下降。如果出现油门冲头摆动则减少。                                                                                                                       |
| `anti_gravity_p_gain`    | 100    | 100 0–250（配置文件）                      | 在油门快速变化时增强 P 项（除了 I 之外）。如果拳击引起 P 引起的振荡，则减少。                                                                                                                                |
| `anti_gravity_cutoff_hz` | 5      | 2–50（个人资料）                           | LPF 截止用于反重力使用的油门导数。针对非常大或非常小的构建进行调整（较大 = 更快，更小 = 响应更慢）。                                                                                                         |
| `iterm_rotation`         | 关闭   | 关、开（配置文件）                         | 在偏航期间随飞机旋转 I 项矢量，以减少交叉轴耦合。主要用于 3D 飞行。                                                                                                                                          |
| `iterm_relax`            | RP     | 关闭、RP、RPY、RP_INC、RPY_INC（配置文件） | I-term 松弛（快速移动期间的抗饱和）处于活动状态的轴。 RP = 横滚和俯仰。 RPY 包括偏航。                                                                                                                       |
| `iterm_relax_type`       | 设定点 | 陀螺仪、设定点（轮廓）                     | 用于检测快速移动的信号。 SETPOINT 采用摇杆输入信号； GYRO 使用实际的陀螺仪速率。 SETPOINT 是默认值，适用于大多数情况。                                                                                       |
| `iterm_relax_cutoff`     | 15     | 1–50（profile）                            | I 项松弛高通滤波器的截止频率。更高表示反应更快，适合竞速；更低表示更平滑，适合大型或慢速机型。典型值：竞速 30–40、5 英寸自由式 15、7 英寸以上 10、X-Class 3–5。若回弹或翻转后振荡持续，依次降低：15→10→7→5。 |
| `iterm_windup`           | 80     | 20–100（profile）                          | 电机接近饱和时抑制 I 项累积（百分比）。默认 80 合理。                                                                                                                                                        |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### 动态阻尼

在急剧移动时动态增加 D，同时在平静飞行期间保持较低的 D（以减少电机热量和噪音）。需要设置下限 D 和上限 D — 请参阅上面 PID 增益部分中的版本说明。

| 变量            | 默认 | 范围                 | 描述                                                                                                                                                       |
| --------------- | ---- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `d_max_gain`    | 37   | 37 0–100（个人资料） | 控制 D 在急剧移动时从基础 D 向 `d_max` 上升的积极程度。默认即可；如果 D boost 在移动开始时引起螺旋桨洗流，则减少。                                         |
| `d_max_advance` | 20   | 0–200（个人资料）    | 使用前馈信号，允许 D boost 在陀螺仪速率达到峰值之前启动。 **在基线调整期间设置为 0** — 几乎没有好处，并且可能导致过早的 D 振荡。仅在基线稳定后才进行探索。 |

**设置：** 设置 `d_roll` = 下限 D（例如 15），`d_max_roll` = 上限 D（例如 30）。平静飞行使用 `d_roll`;急剧的走势推动`d_max_roll`。使用 `set debug_mode = D_MAX` 进行调试。

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)
- [D min](/docs/wiki/guides/archive/DMIN) _(已存档 — 2025.12 重命名的变量)_

---

### 前馈

前馈添加了一个棒输入导数项——它预测移动而不是对错误做出反应。需要干净的棒输入；首先应用适当的 RC 连接预设。

**注意：** 在自稳模式下，前馈被绕过。仅在 acro/rate 模式下测试 FF。

| 变量                         | 默认  | 范围/值                                 | 描述                                                                                                                                                                               |
| ---------------------------- | ----- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feedforward_transition`     | 0     | 0–100（个人资料）                       | 将 FF 向靠近摇杆中心的零方向混合。 0 = 全程 FF（赛车）。 40 = 自由式/高清。 70 = 电影。 **当 `feedforward_jitter_factor` 处于活动状态时设置为 0** — 它们具有重叠的目的，不得组合。 |
| `feedforward_averaging`      | 2\_点 | 关闭、2_POINT、3_POINT、4_POINT（轮廓） | 平均值在 FF 计算之前粘住输入样本，以平滑 RC 链路量化。 OFF = 不求平均（snappiest）； 4_POINT = 最重的平滑。                                                                        |
| `feedforward_smooth_factor`  | 65    | 0–95（profile）                         | 对 FF 信号施加额外平滑；值越高，FF 输出越平滑。                                                                                                                                    |
| `feedforward_jitter_factor`  | 7     | 0–20（profile）                         | 在极慢或抖动的摇杆输入时抑制 FF。更高会带来更平滑的中心手感（自由式 / HD），更低则更灵敏，适合竞速。                                                                               |
| `feedforward_boost`          | 15    | 15 0–50（个人资料）                     | 向 FF（摇杆的二阶导数）添加加速度分量。如果陀螺仪在移动开始时滞后，则增加。如果陀螺仪在移动进入时超调（开始时反弹），则减少。                                                      |
| `feedforward_max_rate_limit` | 90    | 90 0–200（个人资料）                    | 当斗杆接近最大偏转时减少 FF。 90 = 当斗杆处于 90% 行程时切 FF。提高到 92-95 可以在响应式构建中获得更清晰的移动输入。                                                               |
| `feedforward_yaw_hold_gain`  | 15    | 15 0–100（个人资料）                    | 释放操纵杆后，在偏航中维持残余 FF 信号，抵消 I-term 偏航不足。                                                                                                                     |
| `feedforward_yaw_hold_time`  | 100   | 100 10–250（个人资料）                  | 松开摇杆后偏航 FF 保持的持续时间（毫秒）。                                                                                                                                         |

另请参阅：

- [前馈](/docs/wiki/guides/current/Feed-Forward-2-0)

---

### 简化的调整滑块

当简化调节处于活动状态时，这些中间值驱动实际的 PID/滤波器增益。在 CLI 中使用 `simplified_tuning apply` 计算并写入原始值。 `simplified_tuning disable` 将简化系统归零并保留原始值以供手动编辑。

| 变量                                 | 默认 | 范围                     | 描述                                                                                          |
| ------------------------------------ | ---- | ------------------------ | --------------------------------------------------------------------------------------------- |
| `simplified_pids_mode`               | RPY  | OFF、RP、RPY（配置文件） | 简化的 PID 滑块控制哪些轴。 RPY = 所有轴。                                                    |
| `simplified_master_multiplier`       | 100  | 100 0–200（个人资料）    | 主增益滑块 — 将所有 P、I、D 和 D_max 一起缩放。相当于 PIDtoolbox“主乘法器”。 100 = 默认增益。 |
| `simplified_pi_gain`                 | 100  | 100 0–200（个人资料）    | P 和 I 缩放滑块（相对于主控）。                                                               |
| `simplified_d_gain`                  | 100  | 100 0–200（个人资料）    | D 缩放滑块。                                                                                  |
| `simplified_d_max_gain`              | 100  | 100 0–200（个人资料）    | D_max 缩放滑块（动态阻尼上限）。                                                              |
| `simplified_i_gain`                  | 100  | 100 0–200（个人资料）    | I 缩放滑块（独立于 P）。                                                                      |
| `simplified_feedforward_gain`        | 100  | 100 0–200（个人资料）    | 前馈缩放滑块。                                                                                |
| `simplified_pitch_pi_gain`           | 100  | 100 0–200（个人资料）    | 仅用于桨距的附加 P 和 I 乘数（桨距惯量的相对补偿）。                                          |
| `simplified_pitch_d_gain`            | 100  | 0–200（profile）         | 仅用于俯仰的附加 D 倍率。                                                                     |
| `simplified_gyro_filter`             | ON   | OFF、ON                  | 简化滑块是否控制陀螺仪滤波器截止频率。                                                        |
| `simplified_gyro_filter_multiplier`  | 100  | 100 10–200               | 陀螺仪滤波器截止缩放滑块。 100 = 当前静态值。升高以减少陀螺仪过滤（更快）。                   |
| `simplified_dterm_filter`            | 开   | 关、开（配置文件）       | 简化滑块是否控制 D 项滤波器截止值。                                                           |
| `simplified_dterm_filter_multiplier` | 100  | 100 10–200（个人资料）   | D 项滤波器截止缩放滑块。                                                                      |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)

---

### TPA（油门 PID 衰减）

衰减高油门时的 PID 增益，以抵消全功率时电机响应速度的增加。仅当滤波器和 PID 经过其他调整后在高油门时出现振荡时才使用。

| 变量                       | 默认  | 范围/值                    | 描述                                                                                                            |
| -------------------------- | ----- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `tpa_mode`                 | d     | PD、D、PDS（简介）         | 其中 TPA 项会衰减。 `D` = 仅 D（默认，最安全）。 `PD` = P 和 D。`PDS` = P、D 和 S 项。                          |
| `tpa_rate`                 | 65    | 65 0–100（个人资料）       | 全油门时的最大衰减百分比。 65 = PID 高于断点 35%。                                                              |
| `tpa_breakpoint`           | 1350  | 1350 1000–2000（简介）     | TPA 开始时的油门级别（1000-2000 刻度）。从这里到全油门衰减成正比。                                              |
| `tpa_low_rate`             | 20    | −128–100（轮廓）           | D 最小油门衰减（TPA 低）。减少油门踩下时的 D 项抖动。                                                           |
| `tpa_low_breakpoint`       | 1050  | 1050 1000–2000（简介）     | 油门级别低于 TPA 低时适用。                                                                                     |
| `tpa_low_always`           | 关闭  | 关、开（配置文件）         | OFF = TPA Low 仅在 Airmode 激活之前激活； ON = 在整个飞行过程中处于活动状态。                                   |
| `tpa_curve_type`           | 经典  | 经典，双曲线（轮廓）       | TPA 曲线形状。 CLASSIC 与传统 TPA 行为相匹配。 HYPERBOLIC 应用双曲衰减曲线。 _（需要：`USE_ADVANCED_TPA`）_     |
| `tpa_curve_expo`           | 20    | −100–100（轮廓）           | Expo 应用于 TPA 曲线。负=低油门时衰减更多；正=高油门时更多。 _（需要：`USE_ADVANCED_TPA`）_                     |
| `tpa_curve_pid_thr0`       | 200   | 200 0–1000（配置文件）     | TPA 曲线零油门时的 PID 值（×0.1%）。默认 200 = 空闲时完整 PID 的 20%。 _（需要：`USE_ADVANCED_TPA`）_           |
| `tpa_curve_pid_thr100`     | 70    | 70 0–1000（配置文件）      | TPA 曲线全油门时的 PID 值（×0.1%）。默认 70 = 最大油门时完整 PID 的 7%。 _（需要：`USE_ADVANCED_TPA`）_         |
| `tpa_curve_stall_throttle` | 30    | 0–100（个人资料）          | 油门百分比，低于该值飞行器被视为失速（对于机翼/固定翼 TPA）。 _（需要：`USE_ADVANCED_TPA`）_                    |
| `tpa_speed_type`           | BASIC | BASIC、ADVANCED（profile） | 基于速度的 TPA。BASIC 使用 GPS 推导的速度；ADVANCED 使用基于电机 / 螺旋桨参数的物理模型。_（需要：`USE_WING`）_ |
| `tpa_speed_basic_delay`    | 1000  | 1–65535（profile）         | 速度变化后、基于速度的 TPA 更新前的延迟（ms），可防止机动时增益快速变化。_（需要：`USE_WING`）_                 |
| `tpa_speed_basic_gravity`  | 50    | 50 1–65535（个人资料）     | BASIC 速度 TPA 的重力因子。影响 TPA 响应曲线与空速的关系。 _（需要：`USE_WING`）_                               |
| `tpa_speed_max_voltage`    | 2520  | 2520 0–65535（配置文件）   | 用于标准化 BASIC 速度 TPA 中电机速度的最大电池组电压（以 mV×0.1 为单位）。 _（需要：`USE_WING`）_               |
| `tpa_speed_pitch_offset`   | 0     | −32768–32767（配置文件）   | 速度 TPA（机翼/固定翼配平）的俯仰偏移校正。 _（需要：`USE_WING`）_                                              |
| `tpa_speed_adv_drag_k`     | 1000  | 1000 1–65535（个人资料）   | ADVANCED 速度 TPA 物理模型的气动阻力系数。 _（需要：`USE_WING`）_                                               |
| `tpa_speed_adv_mass`       | 1000  | 1000 1–65535（个人资料）   | ADVANCED 速度 TPA 物理模型的工艺质量（g×0.1）。 _（需要：`USE_WING`）_                                          |
| `tpa_speed_adv_prop_pitch` | 370   | 370 0–65535（配置文件）    | ADVANCED 速度 TPA 物理模型的螺旋桨螺距 (mm)。 _（需要：`USE_WING`）_                                            |
| `tpa_speed_adv_thrust`     | 2000  | 2000 1–65535（个人资料）   | ADVANCED 速度 TPA 物理模型的最大推力 (g)。 _（需要：`USE_WING`）_                                               |

---

### 速率

Betaflight 2025.12 默认采用实际费率系统。实际情况：RC_Rate = 摇杆中心的度/秒，Expo = 过渡清晰度，Super Rate = 最大速率。在 BETAFLIGHT 遗留系统中：RC_Rate、Expo 和 RC_Rate 的交互方式不同。

| 变量                     | 默认 | 范围                                                    | 描述                                                                                  |
| ------------------------ | ---- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `rates_type`             | 实际 | BETAFLIGHT、RACEFLIGHT、KISS、ACTUAL、QUICK（速率资料） | 费率计算系统。 ACTUAL 是最直观的（中心灵敏度和最大速率直接设置）。                    |
| `roll_rc_rate`           | 7    | 1–255（速率概况）                                       | 摇杆中心的滚转速率，单位为 deg/s×10（实际）或 RC 乘数（传统）。                       |
| `pitch_rc_rate`          | 7    | 1–255（速率概况）                                       | 摇杆中心的俯仰速率。                                                                  |
| `yaw_rc_rate`            | 7    | 1–255（速率概况）                                       | 摇杆中心的偏航率。                                                                    |
| `roll_expo`              | 0    | 0–100（速率概况）                                       | Roll expo — 中心灵敏度和最大速率之间的过渡。更高=更多的曝光，更慢的中心，更快的边缘。 |
| `pitch_expo`             | 0    | 0–100（速率概况）                                       | 推介博览会。                                                                          |
| `yaw_expo`               | 0    | 0–100（速率概况）                                       | 偏航博览会。                                                                          |
| `roll_srate`             | 67   | 0–255（rateprofile）                                    | 横滚 Super Rate，即摇杆全偏转时的最大速率（ACTUAL 系统）。                            |
| `pitch_srate`            | 67   | 0–255（rateprofile）                                    | 俯仰 Super Rate。                                                                     |
| `yaw_srate`              | 67   | 67 0–255（速率配置文件）                                | 偏航超速率。                                                                          |
| `quickrates_rc_expo`     | 关闭 | 关闭、开启（速率配置文件）                              | 在 QUICK 费率模式下，全局应用 expo。                                                  |
| `thr_mid`                | 50   | 50 0–100（速率概况）                                    | 油门曲线中点 — 将推力设置为 50% 操纵杆。                                              |
| `thr_expo`               | 0    | 0–100（速率概况）                                       | 油门博览会。                                                                          |
| `thr_hover`              | 50   | 50 0–100（速率概况）                                    | 估计悬停油门百分比。由 alt-hold 和一些内部计算使用。                                  |
| `throttle_limit_type`    | 关闭 | 关闭、缩放、剪辑（速率配置文件）                        | 限制最大油门输出。 SCALE = 按比例缩放所有输出； CLIP = 硬质天花板。                   |
| `throttle_limit_percent` | 100  | 100 25–100（比率概况）                                  | `throttle_limit_type` 处于活动状态时的最大油门百分比。                                |
| `roll_rate_limit`        | 1998 | 200–1998（比率概况）                                    | 滚动速率的硬上限（以度/秒为单位），在速率曲线之后应用。                               |
| `pitch_rate_limit`       | 1998 | 200–1998（比率概况）                                    | 推介率的硬性上限。                                                                    |
| `yaw_rate_limit`         | 1998 | 200–1998（比率概况）                                    | 偏航率的硬上限。                                                                      |
| `yaw_control_reversed`   | 关闭 | 关，开                                                  | 反转偏航杆的方向。                                                                    |
| `fpv_mix_degrees`        | 0    | 0–90                                                    | FPV 相机倾斜角度，用于倾斜补偿偏航混合。                                              |

另请参阅：

- [个人资料](/docs/wiki/guides/current/Profiles)
- [费率计算器](/docs/wiki/guides/current/Rate-Calculator)

---

### 角度与地平线模式

| 变量                             | 默认 | 范围                    | 描述                                                                                                          |
| -------------------------------- | ---- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `angle_p_gain`                   | 50   | 50 0–200（个人资料）    | 自稳模式自稳的 P 增益。更高=更强的回归水平。                                                                  |
| `angle_feedforward`              | 50   | 50 0–200（个人资料）    | 自稳模式前馈 — 减少移动角度设定点时的滞后。                                                                   |
| `angle_feedforward_smoothing_ms` | 80   | 10–250（个人资料）      | 应用于角度前馈信号的平滑。                                                                                    |
| `angle_limit`                    | 60   | 10–80（profile）        | 角度模式下的最大倾角（度）。                                                                                  |
| `angle_earth_ref`                | 100  | 0–100（profile）        | 角度模式使用的地球坐标系参考比例。0 表示机体坐标系，100 表示完整地球坐标系；为兼容 GPS Rescue，建议设为 100。 |
| `angle_pitch_offset`             | 0    | −450–450（轮廓）        | 自稳模式的俯仰修剪偏移以十分之一度为单位。用于调整水平悬停点，无需飞行。 _（需要：`USE_WING`）_               |
| `horizon_level_strength`         | 75   | 75 0–100                | 水平模式下摇杆中心的水平模式强度。                                                                            |
| `horizon_limit_sticks`           | 75   | 75 10–200               | 水平模式赋予完全特技权限的摇杆偏转 (%)。                                                                      |
| `horizon_limit_degrees`          | 135  | 135 10–250              | 半自稳模式强制调平之前的最大姿态角。                                                                          |
| `acc_trim_pitch`                 | 0    | −300–300                | 用于水平校准的加速度计俯仰微调。                                                                              |
| `acc_trim_roll`                  | 0    | −300–300                | 加速度计滚动调整用于水平校准。                                                                                |
| `acc_lpf_hz`                     | 25   | 25 0–500                | 加速度计低通滤波器截止。平滑用于姿态估计的 acc 读数。                                                         |
| `horizon_delay_ms`               | 500  | 500 10–5000（个人资料） | 摇杆返回中心后水平模式重新应用调平之前的时间（毫秒）。延迟返回水平以获得更像特技表演的感觉。                  |
| `horizon_ignore_sticks`          | 关闭 | 关、开（配置文件）      | 当打开时，水平模式会忽略水平转换的摇杆输入 - 仅受 `horizon_delay_ms` 控制。                                   |
| `level_race_mode`                | 关闭 | 关、开（配置文件）      | 当打开时，自稳模式将当前角度保留为设定点，而不是主动调平。对于赛车使用自稳模式。                              |
| `landing_disarm_threshold`       | 0    | 0–250（配置文件）       | 着陆时自动上锁的加速度计影响阈值（由 GPS Rescue 和 EZ Landing 使用）。 0 = 禁用。                             |

另请参阅：

- [模式](/docs/wiki/guides/current/Modes)

---

### 电机和电调

|变量|默认 |范围/值|描述 |
| ------------------------ | | ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motor_pwm_protocol` | DSHOT600 | PWM、ONESHOT125、ONESHOT42、MULTISHOT、拉丝、DSHOT150、DSHOT300、DSHOT600、PROSHOT1000、已禁用 |电调通讯协议。 DSHOT600 适用于 ICM-42688P/MPU-6000，频率为 8kHz； **DSHOT300 适用于 3.2kHz 的 BMI270**（3.2kHz 的 DSHOT600 是边缘值）。 |
| `dshot_bidir` | OFF | OFF、ON | 启用双向 DSHOT RPM 遥测。RPM 滤波必需，且 ESC 固件必须支持。_（需要：`USE_DSHOT` + `USE_DSHOT_TELEMETRY`）_ |
| `dshot_burst` | AUTO | OFF、ON、AUTO | DSHOT 突发传输模式。AUTO 会依据硬件能力选择。_（需要：`USE_DSHOT` + `USE_DSHOT_DMAR`）_ |
| `dshot_edt` |关闭 |关闭、打开、强制|扩展 DSHOT 遥测 — 提供 RPM 之外的附加 ESC 数据。即使 bidir 关闭，FORCE 也会启用 EDT。 _（需要：`USE_DSHOT` + `USE_DSHOT_TELEMETRY`）_ |
| `dshot_bitbang` |自动 |关闭、开启、自动 | DSHOT bitbang 实现（软件 DSHOT）。 AUTO 自动选择。 _（需要：`USE_DSHOT` + `USE_DSHOT_BITBANG`）_ |
| `dshot_bitbang_timer` |自动 |自动、TIM1、TIM8 |用于 bitbang DSHOT 的计时器。 _（需要：`USE_DSHOT` + `USE_DSHOT_BITBANG`）_ |
| `motor_poles` | 14 | 14 4–255 |电机钟上的磁极数（磁铁数，**不是**定子数）。 **对于 RPM 滤波器精度至关重要。** 大多数 5" 电机有 14 个磁铁；请验证您的特定电机。错误值 → 滤波器跟踪错误频率。 |
| `motor_kv`| 1960 | 1–40000 |电机 KV 额定值。用于一些内部计算。设置为您的实际电机 KV，以获得精确的 RPM 限制和动态怠速功能。 |
| `motor_idle`| 550 | 550 0–2000 |准备就绪时，空闲油门值发送至 ESC（单位取决于协议）。用作最小非零电机命令。 |
| `min_command` | 1000 | 1000 750–2250 |上锁或零油门时发送至 ESC 的 PWM 值（对于基于 PWM 的协议）。对于 DSHOT，这会被协议覆盖。 |
| `max_throttle` | 2000 | 2000 750–2250 |发送到 ESC 的最大 PWM 值（对于基于 PWM 的协议）。 |
| `motor_output_limit` | 100 | 1–100（profile） | 各电机输出上限（百分比）。电池节数高于电机额定值时使用，例如 4S 电机使用 6S 时设为约 66%。 |
| `motor_output_reordering` | 0,1,2,3,4,5,6,7 | 数组 | 无需重新接线即可重排电机输出通道；指定每个电机位置所用的输出索引。 |
| `motor_pwm_rate` | 480 | 480 200–32000 |有刷电机模式的 PWM 频率。与 DSHOT 协议无关。 |
| `motor_pwm_inversion`|关闭 |关，开|反转 PWM 输出极性。适用于需要反转信号的电调。 |
| `use_unsynced_pwm`|关闭 |关，开|将不同步的电机 PWM 发送到 PID 控制器。主要用于有刷电机。 |
| `thrust_linear`| 0 | 0–150（个人资料）|线性化低油门时的推力曲线。提高低油门权威和响应能力，特别是对于百日咳和 48kHz 电调。 **20–40% 通常就足够了**；中油门以上没有影响。 |
| `throttle_boost` | 5 | 0–100 |快速换油门杆时可瞬时提高油门输出，立即获得油门感觉。 |
| `throttle_boost_cutoff`| 15 | 15 5–50 | `throttle_boost` 使用的油门导数的 LPF 截止。 |
| `yaw_motors_reversed` |关闭 |关，开|反向偏航 PID 输出符号。当电机旋转方向与正常旋转方向交换时使用。 |
| `rpm_limit` |关闭 |关，开|启用每个电机的 RPM 限制。 _（需要：`USE_RPM_LIMIT`）_ |
| `rpm_limit_value` | 18000 | 1–65535 | `rpm_limit` 为 ON 时的最大电机转速。_（需要：`USE_RPM_LIMIT`）_ |
| `rpm_limit_p` | 25 | 0–100 | RPM 限制器控制器的 P 增益。_（需要：`USE_RPM_LIMIT`）_ |
| `rpm_limit_i`| 10 | 10 0–1000 |我为转速限制器控制器增益。 _（需要：`USE_RPM_LIMIT`）_ |
| `rpm_limit_d`| 8 | 0–100 | RPM 限制器控制器的 D 增益。 _（需要：`USE_RPM_LIMIT`）_ |
| `esc_sensor_current_offset`| 0 | 0–16000 |应用于 ESC 传感器电流读数的电流偏移（以 mA 为单位）。用于对 ESC 电流报告进行调零。 _（需要：`USE_ESC_SENSOR`）_ |
| `esc_sensor_halfduplex`|关闭 |关，开|为 ESC 传感器启用半双工 UART（单线上的 BLHeli32/AM32 遥测）。 _（需要：`USE_ESC_SENSOR`）_ |
| `mixer_type`|遗产|传统、线性、动态、EZLANDING |电机混控器输出模式。 LEGACY = 经典混控器。 LINEAR = 线性输出缩放。 DYNAMIC = 动态输出缩放。 EZLANDING = 启用 EZ Landing 软着陆功能。 |

另请参阅：

- [ESC 遥测](/docs/wiki/guides/current/ESC-Telemetry)
- [DShot RPM 过滤](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

---

### RPM 滤波器（双向 DSHOT）

需要双向 DSHOT (`dshot_bidir = ON`) 和支持它的 ESC 固件（BLHeli_32、AM32、BlueJay）。电机噪音通常从 100 Hz 左右开始，并随着油门的增加而增加。谐波出现在基波的 2 倍和 3 倍处。

| 变量                       | 默认        | 范围/值                          | 描述                                                                                                                                                             |
| -------------------------- | ----------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --- | ---------- | ------------------------------------------------------------------------------------------- |
| `rpm_filter_harmonics`     | 3           | 0–3                              | 每个电机要过滤的 RPM 谐波数量。 3=基本+第二+第三。 0 禁用 RPM 过滤。                                                                                             |
| `rpm_filter_weights`       | 100,100,100 | 100,100,100 3 个数组，每个 0–100 | 每谐波陷波深度百分比。三叶桨：尝试 `100,0,80`（不存在二次谐波）。双刀片：`100,80,0`或`100,50,0`。尽可能降低每个值，以免过滤陀螺仪中出现电机噪音。                |
| `rpm_filter_q`             | 500         | 500 250–3000                     | Q 因子（陷波锐度）。 **配置良好的 5" 版本上的目标为 1000** — 默认 500 是一个起点，而不是目标。更高的 Q = 更窄的陷波 = 更少的相位延迟。仅当电机噪声渗入时才回退。 | `rpm_filter_min_hz` | 100 | 100 30–200 | 低于该频率，不应用陷波。使用较慢旋转电机的较大四轮驱动器的频率较低（7"+ 降低至 60–80 Hz）。 |
| `rpm_filter_fade_range_hz` | 50          | 50 0–1000                        | 低油门时凹口淡入的频段，减少怠速时的延迟。                                                                                                                       |
| `rpm_filter_lpf_hz`        | 150         | 150 100–500                      | 陷波后平滑 LPF 应用于用于陷波跟踪的 RPM 信号。                                                                                                                   |

另请参阅：

- [PID 整定](/docs/wiki/guides/current/PID-Tuning-Guide)
- [PID 整定指南](/docs/wiki/guides/current/PID-Tuning-Guide)
- [DShot RPM 过滤](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

---

### 动态怠速

防止电机在翻转/滚动和油门劈裂期间失速。任何非零 `dyn_idle_min_rpm` 都会启用它。 **启用动态空闲时始终设置 `transient_throttle_limit = 0`。**

| 变量                       | 默认 | 范围                   | 描述                                                                                                             |
| -------------------------- | ---- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `pid_at_min_throttle`      | 开   | 关，开                 | 在最小油门（空闲）下保持 PID 处于活动状态。Air Mode 正常运行所必需的；通常保持开启状态。                         |
| `dyn_idle_min_rpm`         | 0    | 0–200（个人资料）      | 由动态怠速维持的最小电机转速。 **设置非零以启用。** 按桨叶尺寸设定目标。                                         |
| `dyn_idle_p_gain`          | 50   | 50 1–250（个人资料）   | 动态怠速 RPM 控制器的 P 增益。如果闲置引起振荡则减小。                                                           |
| `dyn_idle_i_gain`          | 50   | 50 1–250（个人资料）   | I 动态怠速 RPM 控制器的增益。                                                                                    |
| `dyn_idle_d_gain`          | 50   | 50 0–250（配置文件）   | 动态怠速 RPM 控制器的 D 增益。                                                                                   |
| `dyn_idle_max_increase`    | 150  | 150 10–255（个人资料） | 动态怠速控制器可以命令高于静态怠速值的最大油门增量（以电机单位为单位）。                                         |
| `transient_throttle_limit` | 0    | 0–30（个人资料）       | 限制快速油门瞬变。 **启用动态空闲时必须设置为 0。** 在动态空闲存在之前使用非零值。 _（需要：`USE_AIRMODE_LPF`）_ |

另请参阅：

- [动态空闲](/docs/wiki/guides/current/Dynamic-Idle)

---

### RC 输入与平滑

| 变量                                | 默认 | 范围/值                                                                 | 描述                                                                                 |
| ----------------------------------- | ---- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `serialrx_provider`                 | CRSF | SPEK1024、SPEK2048、SBUS、SUMD、IBUS、JETIEXBUS、CRSF、SRXL、SRXL2、... | 串行 RX 协议，必须与接收机输出格式匹配。                                             |
| `serialrx_inverted`                 | OFF  | OFF、ON                                                                 | 反转串行 RX 信号。部分飞控设计搭配某些接收机时需要。                                 |
| `serialrx_halfduplex`               | 关闭 | 关，开                                                                  | 使用单线半双工 UART 进行串行 RX（某些 CRSF 实现）。                                  |
| `sbus_baud_fast`                    | 关闭 | 关，开                                                                  | 启用快速 (200kbps) SBUS 模式。对于支持它的 SBUS 接收机。                             |
| `crsf_use_negotiated_baud`          | 关闭 | 关，开                                                                  | 允许 CRSF 协商波特率。当使用更快的 CRSF 速率（例如 ELRS 协商速度）时启用。           |
| `rx_min_usec`                       | 885  | 885 750–2250                                                            | 认为有效的最短通道脉冲宽度。低于此值会触发信号丢失检测 (PPM/PWM)。                   |
| `rx_max_usec`                       | 2115 | 2115 750–2250                                                           | 最长通道脉冲宽度被视为有效。                                                         |
| `mid_rc`                            | 1500 | 1500 1200–1700                                                          | RC 中点。与遥控器的摇杆中心值匹配。 Futaba 收音机经常需要 1520。                     |
| `min_check`                         | 1050 | 1050 750–2250                                                           | 低于该值的 RC 通道值可识别解锁/上锁和操纵杆命令。                                    |
| `max_check`                         | 1900 | 1900 750–2250                                                           | RC 通道值，高于该值即可识别解锁/上锁和操纵杆命令。                                   |
| `deadband`                          | 0    | 0–32                                                                    | 杆中心周围的 RC 死区（微秒）。如果棍子没有回到精确的中心，则增加。                   |
| `yaw_deadband`                      | 0    | 0–100                                                                   | 中心周围偏航特定死区。                                                               |
| `max_aux_channels`                  | 14   | 14 0–14                                                                 | 处理的 AUX 通道的最大数量。                                                          |
| `rc_smoothing`                      | 开   | 关，开                                                                  | 启用 RC 输入插值和接收帧之间的平滑。                                                 |
| `rc_smoothing_auto_factor`          | 30   | 0–250                                                                   | 设定点通道的自动平滑攻击性。更高=更平滑但更滞后。预设为您的 RC 链路应用正确的值。    |
| `rc_smoothing_auto_factor_throttle` | 30   | 0–250                                                                   | 自动平滑油门通道的攻击性。                                                           |
| `rc_smoothing_setpoint_cutoff`      | 0    | 0–255                                                                   | 手动设定点平滑截止频率。0 表示使用自动值。                                           |
| `rc_smoothing_throttle_cutoff`      | 0    | 0–255                                                                   | 手动油门平滑截止频率。0 表示使用自动值。                                             |
| `rc_smoothing_debug_axis`           | 滚动 | 横滚、俯仰、偏航、油门                                                  | 在 RC 平滑调试字段中公开哪个轴（当 `debug_mode = RC_SMOOTHING` 时在黑框中可见）。    |
| `airmode_start_throttle_percent`    | 25   | 25 0–100                                                                | Air Mode 激活的油门百分比。在较高的值下，电机在 Air Mode 启动之前开始空转。          |
| `rssi_channel`                      | 0    | 0–18                                                                    | AUX 通道承载 RSSI 信号。 0 = 不使用通道 RSSI。                                       |
| `rssi_scale`                        | 100  | 100 1–255                                                               | 缩放 RSSI 输入。                                                                     |
| `rssi_offset`                       | 0    | −100–100                                                                | 偏移 RSSI 读数。                                                                     |
| `rssi_invert`                       | 关闭 | 关，开                                                                  | 反转 RSSI 信号（某些接收机发送反转的 RSSI）。                                        |
| `rssi_smoothing`                    | 125  | 125 0–255                                                               | 用于 RSSI 平滑的 LPF 周期。更高=对信号变化的响应更平滑但更慢。                       |
| `rssi_src_frame_errors`             | 关闭 | 关，开                                                                  | 从帧错误率导出 RSSI（对于不直接报告 RSSI 的接收机）。                                |
| `rssi_src_frame_lpf_period`         | 30   | 0–255                                                                   | 用于基于帧错误的 RSSI 平滑的 LPF 周期。                                              |
| `pid_in_tlm`                        | 关闭 | 关，开                                                                  | 在遥测输出中包含 PID 数据（在遥测协议支持的情况下）。                                |
| `channel_forwarding_start`          | 4    | 4–18                                                                    | 第一个 AUX 通道转发到伺服输出（用于转发到伺服系统的通道）。 _（需要：`USE_SERVOS`）_ |
| `input_filtering_mode`              | 关闭 | 关，开                                                                  | 启用硬件级 RC 输入滤波。某些 F1 目标需要；在现代硬件上保留“OFF”。                    |

另请参阅：

- [控制](/docs/wiki/guides/current/Controls)
- [接收机 (RX)](/docs/wiki/guides/current/Rx)
- [RSSI](/docs/wiki/guides/current/Rssi)
- [Spektrum 绑定支持](/docs/wiki/guides/current/Spektrum-bind)

---

### 电池与电流检测

|变量|默认|范围/值 |描述 || ---------------------------- | -------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `battery_meter` |模数转换器 |无、ADC、ESC |电池电压读数源。 ADC = 板载分压器。 ESC = 来自 ESC 遥测。 |
| `battery_continue` |关闭 |关，开|电池断开/重新连接后继续记录/飞行（对于热插拔版本）。 _（需要：`USE_BATTERY_CONTINUE`）_ |
| `vbat_scale` | 110 | 110 0–255 |分压器校准。进行调整，直到报告的电压与万用表匹配。 |
| `vbat_divider` | 10 | 10 1–255 |分压器比分子。 |
| `vbat_multiplier` | 1 | 1–255 |分压器比率乘数。 |
| `vbat_detect_cell_voltage` | 300 | 300 0–2000 |高于该电压时电池被视为已连接（每个电池 ×0.01V）。 |
| `force_battery_cell_count` | 0 | 0–24 |覆盖自动细胞计数检测。 0 = 从 `vbat_max_cell_voltage` 自动检测。 |
| `vbat_max_cell_voltage`| 430 | 430 100–500 |自动细胞计数检测的最大每细胞电压（×0.01V）。默认 430 = 4.30V。 |
| `vbat_full_cell_voltage` | 410 | 410 100–500 |用于容量显示的“全”电池电压。默认 410 = 4.10V。 |
| `vbat_warning_cell_voltage` | 350 | 100–500 | 每节电池的告警阈值电压（×0.01 V）。默认 350 = 3.50 V。 |
| `vbat_min_cell_voltage` | 330 | 100–500 | 最低单节电压，触发电池严重告警（×0.01 V）。默认 330 = 3.30 V。 |
| `vbat_hysteresis` | 1 | 0–250 |电压警告迟滞以防止闪烁 (×0.01V)。 |
| `vbat_duration_for_warning` | 0 | 0–150 |在发出警告警报之前，电压必须连续十分之一秒保持在警告阈值以下。防止短暂尖峰误报。 |
| `vbat_duration_for_critical` | 0 | 0–150 |与上面相同，但针对临界阈值。 |
| `vbat_display_lpf_period` | 30| 1–255 | OSD 上显示的电压的 LPF 周期（平滑显示闪烁）。不影响警报阈值。 |
| `vbat_sag_lpf_period` | 2 | 1–255 |用于电池电压跌落补偿电压测量的 LPF 周期。更低=对下垂的响应更快。 |
| `vbat_cutoff_percent` | 100 | 100 0–100 |在极低电压下应用的 `vbat_sag_compensation` 的百分比。 |
| `vbat_sag_compensation` | 0 | 0–150（个人资料）|补偿电池电压骤降，以保持整个电池组一致的 PID 权威和节流输出。 **90% 是一个很好的目标** — 避免在低电压下对电池组施加压力，同时仍提供一致性。需要监测电池电压；启用时配置低电压 OSD 警告。 |
| `bat_capacity` | 0 | 0–20000 |电池容量（mAh）。与电流表一起使用来估计剩余电量。 |
| `use_vbat_alerts` |开 |关，开|启用基于电压的 OSD/蜂鸣器警告。 |
| `use_cbat_alerts` | OFF | OFF、ON | 启用基于容量的 OSD / 蜂鸣器告警。 |
| `cbat_alert_percent` | 10 | 0–100 | 触发电池告警的剩余容量百分比。 |
| `report_cell_voltage` |关闭 |关，开|在遥测中报告每节电池电压（总电压/电池计数）而不是电池组电压。 |
| `current_meter`|模数转换器 |无、ADC、虚拟、ESC、MSP |电流传感器源。 ADC = 板载分流器。 ESC = ESC 遥测电流。 |
| `ibata_scale` | 558 | 558 −16000–16000 | ADC 电流传感器比例因子 (mV/A × 10)。针对已知负载进行校准。 |
| `ibata_offset` | 0 | −32000–32000 | ADC 电流传感器偏移（以毫伏为单位）。 |
| `ibatv_scale`| 0 | −16000–16000 |虚拟电流传感器刻度。 _（需要：`USE_VIRTUAL_CURRENT_METER`）_ |
| `ibatv_offset` | 0 | 0–16000 |虚拟电流传感器电压偏移。 _（需要：`USE_VIRTUAL_CURRENT_METER`）_ |
| `ibat_lpf_period` | 10 | 10 0–255 |显示当前读数的 LPF 周期。越高 = OSD 当前显示越平滑。 |

另请参阅：

- [遥测](/docs/wiki/guides/current/Telemetry)
- [ESC 遥测](/docs/wiki/guides/current/ESC-Telemetry)
- [电池](/docs/wiki/guides/current/Battery)

---

### Blackbox

| 变量                          | 默认     | 范围/值                    | 描述                                                                                                                                              |
| ----------------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blackbox_device`             | SPIFLASH | 无、SPIFLASH、SDCARD、串行 | 记录目的地。 SPIFLASH = 板载闪存。 SDCARD=SD 卡。 SERIAL = 通过串行端口（需要高波特率）。                                                         |
| `blackbox_sample_rate`        | 1/4      | 1/1、1/2、1/4、1/8、1/16   | 记录的 PID 循环迭代比例。默认 `pid_process_denom = 1`（PID 速率 = 陀螺仪速率）时，在 8 kHz 下：`1/8` → 1 kHz，`1/4` → 2 kHz。采样越密，日志越大。 |
| `blackbox_mode`               | NORMAL   | NORMAL、MOTOR_TEST、ALWAYS | NORMAL 仅在解锁时记录；ALWAYS 即使上锁也记录；MOTOR_TEST 为电机测试模式。                                                                         |
| `blackbox_high_resolution`    | 关闭     | 关，开                     | 将陀螺仪和设定点字段的数据精度加倍。增加日志大小。                                                                                                |
| `blackbox_disable_pids`       | 关闭     | 关，开                     | 从日志中排除 PID 数据。减少日志大小。                                                                                                             |
| `blackbox_disable_rc`         | 关闭     | 关，开                     | 从日志中排除 RC 通道数据。                                                                                                                        |
| `blackbox_disable_setpoint`   | 关闭     | 关，开                     | 排除设定点数据。                                                                                                                                  |
| `blackbox_disable_bat`        | 关闭     | 关，开                     | 排除电池数据。                                                                                                                                    |
| `blackbox_disable_alt`        | 关闭     | 关，开                     | 排除海拔数据。                                                                                                                                    |
| `blackbox_disable_rssi`       | 关闭     | 关，开                     | 排除 RSSI 数据。                                                                                                                                  |
| `blackbox_disable_gyro`       | 关闭     | 关，开                     | 排除过滤后的陀螺仪数据。                                                                                                                          |
| `blackbox_disable_gyrounfilt` | 关闭     | 关，开                     | 排除未过滤的陀螺仪数据。                                                                                                                          |
| `blackbox_disable_acc`        | 关闭     | 关，开                     | 排除加速度计数据。                                                                                                                                |
| `blackbox_disable_debug`      | 关闭     | 关，开                     | 排除调试字段。                                                                                                                                    |
| `blackbox_disable_motors`     | 关闭     | 关，开                     | 排除电机输出数据。                                                                                                                                |
| `blackbox_disable_rpm`        | 关闭     | 关，开                     | 排除 RPM 遥测数据。 _（需要：`USE_DSHOT_TELEMETRY`）_                                                                                             |
| `blackbox_disable_gps`        | 关闭     | 关，开                     | 排除 GPS 数据。 _（需要：`USE_GPS`）_                                                                                                             |
| `blackbox_disable_attitude`   | 关闭     | 关，开                     | 从日志中排除姿态（滚动/俯仰/偏航角）数据。                                                                                                        |
| `blackbox_disable_servos`     | 关闭     | 关，开                     | 从日志中排除伺服输出数据。 _（需要：`USE_SERVOS`）_                                                                                               |

另请参阅：

- [Blackbox](/docs/wiki/guides/current/Black-Box-logging-and-usage)

---

### 失控保护

始终使用基于飞控的失控保护：将接收机配置为在失去信号时发送**无数据**，而不是固定通道值。不建议使用接收机端失控保护，因为飞控无法识别这种情况。

|变量|默认 |范围/值|描述 |
| -------------------------------------- | ---------- | ------------------------ | | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `failsafe_procedure`|下降 |自动着陆、空投、GPS 救机 |第 2 阶段程序。 **DROP** = 立即电机切断并上锁（默认，对于赛车来说最安全）。 **自动着陆**=固定油门+居中摇杆`failsafe_landing_time`然后上锁。 **GPS-RESCUE** = 自主返航。 |
| `failsafe_delay` | 15（1.5 秒）| 1–200（十分之一）|第 1 阶段保护持续时间 — 从确认信号丢失到第 2 阶段激活的时间。默认 15 = 1.5 秒。最小安全值为 2（200 毫秒）。 |
| `failsafe_landing_time` | 60（6 秒）| 0–250（十分之一）|着陆模式（自动着陆）第 2 阶段的持续时间。
| `failsafe_throttle`| 1000 | 1000 750–2250 |在着陆模式第 2 阶段期间应用的油门值，并用作第 1 阶段后备油门（如果已配置）。 **默认 1000 = 电机关闭。** 对于 GPS 救机：必须设置为悬停油门值，否则在救援激活之前穿越机下降到第 1 阶段。 |
| `failsafe_switch_mode`|第一阶段 |第一阶段，杀戮，第二阶段 |辅助开关行为：STAGE1 = 模拟信号丢失（对于测试和紧急开关很有用），STAGE2 = 跳过第 1 阶段（即时 GPS 救机/掉落），KILL = 即时上锁（危险，任何故障都会导致穿越机崩溃）。 |
| `failsafe_recovery_delay` | 5（0.5 秒）| 1–200（十分之一）|在第 2 阶段之后，在飞行员重新武装之前或在评估操纵杆输入之前（对于 GPS 救机），信号必须保持稳定的持续时间。 |
| `failsafe_stick_threshold`| 30| 0–50 |信号恢复后退出 GPS 救机第 2 阶段所需的摇杆偏转（距中心的度数）。一旦视频返回且 RXLOSS 清除，请将棒移至此阈值。 |
| `failsafe_throttle_low_delay` | 100（10 秒）| 0–300（十分之一）|如果在第 2 阶段触发之前油门在这段时间内一直处于低位，FC 会立即上锁，而不是激活着陆模式（“Just Drop”覆盖）。保护着陆后未上锁而关闭遥控器电源的飞行员。 |

另请参阅：

- [失控保护](/docs/wiki/guides/current/Failsafe)

---

### GPS Rescue

先决条件：GPS 模块（最低 UBlox M8N，推荐 M10）、校准的加速度计、验证的自稳模式调平、解锁前最少的卫星数量、飞行前建立的返航点。

|变量|默认 |范围/值|描述 || -------------------------------------------------- | -------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gps_rescue_initial_climb` | 10 | 10 0–100 m |回家之前从当前位置爬升的高度。设置得足够高以清除局部障碍。 |
| `gps_rescue_return_alt` | 30| 0–150 m |目标返航巡航高度。如果穿越机已经高于此高度，它将保持当前高度。 |
| `gps_rescue_alt_mode` |最大 ALT |最大 ALT、固定 ALT、当前 ALT | MAX*ALT = 使用 `gps_rescue_initial_climb` 或记录的最大高度 + 15 m 中的较高者。 FIXED_ALT = 始终返回到 `gps_rescue_initial_climb`。 CURRENT_ALT = 保持当前高度（不推荐）。 |
| `gps_rescue_ascend_rate` | 750 | 750 100–2500 厘米/秒 |初始爬升阶段的爬升率。 |
| `gps_rescue_descend_rate`| 150 | 150 100–500 厘米/秒 |接近家时的下降率。 |
| `gps_rescue_ground_speed` | 750 | 750 10–3000 厘米/秒 |返回时的前进速度（cm/s）。 750 ≈ 27 公里/小时。减少以保证大风条件下的可靠性。 |
| `gps_rescue_max_angle` | 45 | 45 0–60 度 |返回时允许的最大倾斜角度。越高，飞行速度越快，但高度控制就越困难。逆风而行。 |
| `gps_rescue_descent_dist` | 20 | 5–200 m |下降开始时距家的距离。 |
| `gps_rescue_min_start_dist` | 15 | 15 10–3000 米 |启动救机所需的离家最短距离。比这更近 → 上锁并投降（防止附近意外启动救机）。 |
| `gps_rescue_min_sats` | 8 | 5–50 | 配置 GPS Rescue 所需的最少卫星数。低于该值时，OSD 显示 `RESCUE N/A`。 |
| `gps_rescue_sanity_checks` | RESCUE_SANITY_FS_ONLY | RESCUE_SANITY_ON、RESCUE_SANITY_FS_ONLY、OFF | **强烈建议使用 RESCUE_SANITY_ON。** GPS 丢失、定位无效、四轴飞行器坠毁、卫星数下降或飞行器未朝返航点接近时，中止救援并上锁。 |
| `gps_rescue_allow_arming_without_fix`|关闭 |关，开|允许在没有 GPS 定位的情况下解锁。在此类飞行期间，GPS 救机不可用 — OSD 显示 `RESCUE OFF`。 |
| `gps_rescue_use_mag`|开 |关，开|在救援过程中使用磁力计进行航向。 **仅当磁力读数已被验证准确时才启用**（与手机指南针比较；两者必须在 10° 以内一致）。不正确的弹匣会导致飞散。 *(需要：`USE_GPS` + `USE_GPS_RESCUE` + `USE_MAG`)\_ |
| `gps_rescue_velocity_p` | 8 | 0–250 |速度控制器 P 增益（正向速度调节）。 |
| `gps_rescue_velocity_i`| 40| 0–250 |速度控制器我增益。 |
| `gps_rescue_velocity_d` | 12 | 12 0–250 |速度控制器 D 增益。 |
| `gps_rescue_yaw_p`| 20 | 0–250 |救援期间的偏航 P 增益（航向修正）。 |
| `gps_rescue_imu_yaw_gain`| 10 | 10 0–250 |救援期间 IMU 航向校正的积极性。如果航向振荡则减少。 |
| `gps_rescue_roll_mix`| 150 | 150 0–250 |进场期间混合滚转与偏航进行横向校正。 |
| `gps_rescue_pitch_cutoff` | 75 | 75 10–250 |救援期间音高 D 项的平滑截止。 |
| `gps_rescue_disarm_threshold` | 20 | 0–100 |着陆时自动解除碰撞检测阈值。更低=更敏感。 |

另请参阅：

- [GPS](/docs/wiki/guides/current/Gps)
- [GPS 救机](/docs/wiki/guides/current/GPS-Rescue)

---

### GPS 设置

| 变量                       | 默认值   | 范围 / 取值                                                                   | 说明                                                                                                                         |
| -------------------------- | -------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `gps_provider`             | 优宝乐   | NMEA、UBLOX、MSP、虚拟                                                        | GPS 协议。首选 UBLOX 作为 UBlox 模块 — 比 NMEA 更可靠。                                                                      |
| `gps_auto_config`          | 开       | 关，开                                                                        | 在连接时自动配置 UBlox 模块（波特率、更新率、消息类型）。除非您使用 uCenter 预先配置模块，否则请保持打开状态。               |
| `gps_auto_baud`            | 关闭     | 关，开                                                                        | 自动检测 GPS 波特率。                                                                                                        |
| `gps_update_rate_hz`       | 10       | 10 1–20                                                                       | 目标 GPS 更新率。 GPS 救机建议使用 10 Hz。如果不使用 GPS 救机，则降低至 1–2 Hz（减少 CPU 负载，在某些主板上可能允许 8k8k）。 |
| `gps_sbas_mode`            | 无       | 自动、EGNOS、WAAS、MSAS、GAGAN、无                                            | 该地区的 SBAS（卫星校正）系统。                                                                                              |
| `gps_ublox_use_galileo`    | 关闭     | 关，开                                                                        | 在 UBlox 模块上启用伽利略星座。                                                                                              |
| `gps_ublox_acquire_model`  | 固定式   | 便携式、固定式、步行式、汽车式、AT_SEA、AIRBORNE_1G、AIRBORNE_2G、AIRBORNE_4G | 获取修复时使用的 UBlox 动态模型。                                                                                            |
| `gps_ublox_flight_model`   | 空降\_4G | 便携式、固定式、步行式、汽车式、AT_SEA、AIRBORNE_1G、AIRBORNE_2G、AIRBORNE_4G | 飞行期间使用的 UBlox 动态模型。 AIRBORNE_4G 可处理高动态 FPV。                                                               |
| `gps_set_home_point_once`  | 关闭     | 关，开                                                                        | 仅在连接电池后在第一臂上设置起始点。如果您解除中场武装并重新武装，可以防止主场被重置。                                       |
| `gps_use_3d_speed`         | 关闭     | 关，开                                                                        | 使用 3D 速度（包括垂直）进行 GPS 速度显示。                                                                                  |
| `gps_sbas_integrity`       | 关闭     | 关，开                                                                        | 在使用 SBAS 校正之前需要 SBAS 完整性数据。                                                                                   |
| `gps_nmea_custom_commands` | —        | 字符串（1–64）                                                                | 初始化时发送到 GPS 模块的自定义 NMEA 语句（仅 NMEA 提供程序）。                                                              |
| `gps_ublox_utc_standard`   | AUTO     | AUTO、USNO、EU、SU、NTSC                                                      | 在 u-blox 模块上配置的 UTC 时间标准。                                                                                        |

另请参阅：

- [GPS](/docs/wiki/guides/current/Gps)

---

### 系统与调试

| 变量                                          | 默认 | 范围/值                                                                                                                                                                                                                 | 描述                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug_mode`                                  | 无   | NONE、GYRO_SCALED、FFT、FFT_TIME、FFT_FREQ、GYRO_FILTERED、D_MAX、DYN_IDLE、ITERM_RELAX、FEEDFORWARD、RC_SMOOTHING、DSHOT_RPM_TELEMETRY、RPM_FILTER、GPS_RESCUE_VELOCITY、GPS_RESCUE_HEADING、FAILSAFE，...（许多更多） | 选择在 Blackbox 调试字段中公开哪些内部信号。关键模式：**FFT_FREQ**（滤波器频率分析）、**FFT_TIME**（FFT 时域）、**FFT**（通用 FFT）、**GYRO_SCALED**（原始陀螺仪、滤波器调谐）、**D_MAX**（动态阻尼）、**DYN_IDLE**（动态空闲）、**ITERM_RELAX**（I 项松弛）、**FEEDFORWARD**（FF 信号）、**FAILSAFE** （失控保护状态）。 |
| `task_statistics`                             | 开   | 关，开                                                                                                                                                                                                                  | 启用通过 `tasks` CLI 命令可见的 CPU 任务分析。关闭以减少重负载系统的开销。                                                                                                                                                                                                                                                |
| `cpu_overclock`                               | OFF  | OFF、192MHZ、216MHZ、240MHZ                                                                                                                                                                                             | 对 STM32 F7 处理器超频。仅在 CPU 负载过高且板卡支持时使用。                                                                                                                                                                                                                                                               |
| `pwr_on_arm_grace`                            | 5    | 0–30 s                                                                                                                                                                                                                  | 上电后的宽限期，期间禁止解锁，以防接收机完成连接前意外解锁。                                                                                                                                                                                                                                                              |
| `serial_update_rate_hz`                       | 100  | 100 100–2000                                                                                                                                                                                                            | 处理 MSP/CLI 串行输出的速率。                                                                                                                                                                                                                                                                                             |
| `reboot_character`                            | 82   | 82 48–126                                                                                                                                                                                                               | 发送到 FC 时触发重新启动的 ASCII 字符（默认值：“R”）。                                                                                                                                                                                                                                                                    |
| `scheduler_relax_rx`                          | 25   | 25 0–500 μs                                                                                                                                                                                                             | RX 任务的调度程序松弛时间。控制 RX 处理期间可以运行的其他任务数量。                                                                                                                                                                                                                                                       |
| `scheduler_relax_osd`                         | 25   | 25 0–500 μs                                                                                                                                                                                                             | OSD 任务的调度程序松弛时间。                                                                                                                                                                                                                                                                                              |
| `align_board_roll`                            | 0    | −180–360                                                                                                                                                                                                                | 板卡横滚旋转偏移量（度），用于非标准飞控安装方向。                                                                                                                                                                                                                                                                        |
| `align_board_pitch`                           | 0    | −180–360                                                                                                                                                                                                                | 板卡俯仰旋转偏移量（度）。                                                                                                                                                                                                                                                                                                |
| `align_board_yaw`                             | 45   | 45 −180–360                                                                                                                                                                                                             | 板旋转偏航偏移（度）。适用于非标准 FC 安装方向。                                                                                                                                                                                                                                                                          |
| `mag_declination`                             | 0    | −18000–18000（百分之几度）                                                                                                                                                                                              | 您所在位置的磁偏角校正。请访问 ngdc.noaa.gov/geomag/calculators。 _（需要：`USE_MAG`）_                                                                                                                                                                                                                                   |
| `rate_6pos_switch`                            | 关闭 | 关，开                                                                                                                                                                                                                  | 通过 AUX 通道启用 6 位速率配置文件选择。                                                                                                                                                                                                                                                                                  |
| `enable_stick_arming`                         | 关闭 | 关，开                                                                                                                                                                                                                  | 启用摇杆组合解锁（油门向下/偏航向右）。如果使用专用臂开关则禁用。                                                                                                                                                                                                                                                         |
| `runaway_takeoff_prevention`                  | ON   | OFF、ON                                                                                                                                                                                                                 | 检测解锁后未经指令的油门并上锁，防止意外起飞导致伤害。                                                                                                                                                                                                                                                                    |
| `runaway_takeoff_deactivate_delay`            | 500  | 100–1000 ms                                                                                                                                                                                                             | 解锁后到失控起飞保护停止监测前的时长。                                                                                                                                                                                                                                                                                    |
| `runaway_takeoff_deactivate_throttle_percent` | 20   | 0–100                                                                                                                                                                                                                   | 油门百分比，高于该百分比飞行员的意图是明确的并且失控保护会停用。                                                                                                                                                                                                                                                          |
| `cpu_late_limit_permille`                     | 10   | 10 0–100                                                                                                                                                                                                                | CPU 延迟任务限制以 permille（每千）为单位。控制任务延迟运行时的调度程序行为。 _（需要：`USE_LATE_TASK_STATISTICS`）_                                                                                                                                                                                                      |
| `scheduler_debug_task`                        | 0    | 0–36                                                                                                                                                                                                                    | 要在调度程序调试输出中公开的任务索引。用于每个任务的时序分析。                                                                                                                                                                                                                                                            |
| `mco2_on_pc9`                                 | 关闭 | 关，开                                                                                                                                                                                                                  | 在 PC9 引脚上输出 MCO2 时钟信号（STM32 特定）。仅高级硬件调试。                                                                                                                                                                                                                                                           |
| `system_hse_mhz`                              | 0    | 0–30                                                                                                                                                                                                                    | 外部晶体频率（MHz）。设置为 0 进行自动检测。某些非标准时钟速度所需。                                                                                                                                                                                                                                                      |

---

### 板卡与硬件

|变量|默认 |范围/值|描述 || ------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `acc_hardware` |自动 |自动、无、MPU6050、MPU6000、MPU6500...（完整列表请参阅 `get acc_hardware`）|强制加速计驱动器或自动检测。 |
| `baro_hardware` |自动 |自动，无，BMP085，MS5611，BMP280，BMP388，DPS310，... |强制气压计驱动器或自动检测。 _（需要：`USE_BARO`）_ |
| `baro_bustype` | SPI |无、I2C、SPI、从机 |气压计总线类型。 _（需要：`USE_BARO`）_ |
| `baro_spi_device` | 2 | 0–5 |气压计的 SPI 总线编号。 _（需要：`USE_BARO`）_ |
| `baro_i2c_device` | 0 | 0–5 |气压计的 I2C 总线编号（0 = 默认值）。 _（需要：`USE_BARO`）_ |
| `baro_i2c_address` | 0 | 0–119 |气压计的 I2C 地址覆盖（0 = 默认自动检测）。 _（需要：`USE_BARO`）_ |
| `mag_hardware`|无 |无、自动、HMC5883、QMC5883、... |磁力计硬件选择。无=禁用。 _（需要：`USE_MAG`）_ |
| `align_mag`|默认|默认、CW0、CW90、CW180、CW270、CW0FLIP、... |磁力计方向。 _（需要：`USE_MAG`）_ |
| `altitude_source`|默认|默认、仅气压、仅 GPS |覆盖自动驾驶仪和 OSD 高度显示的高度数据源。 |
| `altitude_prefer_baro`| 100 | 100 0–100 |当两者都可用时，气压计与 GPS 高度的权重（0 = 仅 GPS，100 = 仅气压计）。 |
| `altitude_lpf` | 300 | 300 10–1000 |用于高度估计的低通滤波器截止 (Hz×10)。较低=更平滑但更滞后的高度。 |
| `altitude_d_lpf` | 100 | 100 10–1000 |高度导数（垂直速度）的低通滤波器截止（Hz×10）。 |
| `adc_device` | 2 | 0–3 |用于电压/电流感测的 ADC 器件。 |
| `adc_tempsensor_calibration30` | 0 | 0–2000 | 30°C 时的 ADC 温度传感器校准值（工厂校准）。 |
| `adc_tempsensor_calibration110` | 0 | 0–2000 | 110°C 时的 ADC 温度传感器校准值（工厂校准）。 |
| `adc_vrefint_calibration` | 0 | 0–2000 | ADC 内部参考电压校准值（出厂设置）。 |
| `flash_spi_bus` | 3 | 0–3 | 板载闪存（Blackbox 存储）的 SPI 总线编号。_（需要：`USE_FLASH_SPI`）_ |
| `i2c1_clockspeed_khz` | 800 | 100–1300 | I2C 总线 1 时钟速度（以 kHz 为单位）。 _（需要：`USE_I2C_DEVICE_1`）_ |
| `i2c1_pullup` |关闭 |关，开|启用 I2C 总线 1 上的内部上拉电阻。_（需要：`USE_I2C_DEVICE_1`）_ |
| `i2c2_clockspeed_khz` | 800 | 100–1300 | I2C 总线 2 时钟速度（以 kHz 为单位）。 _（需要：`USE_I2C_DEVICE_2`）_ |
| `i2c2_pullup` |关闭 |关，开|启用 I2C 总线 2 上的内部上拉电阻。_（需要：`USE_I2C_DEVICE_2`）_ |
| `i2c3_clockspeed_khz` | 800 | 100–1300 | I2C 总线 3 时钟速度（以 kHz 为单位）。 _（需要：`USE_I2C_DEVICE_3`）_ |
| `i2c3_pullup` |关闭 |关，开|启用 I2C 总线 3 上的内部上拉电阻。_（需要：`USE_I2C_DEVICE_3`）_ |
| `usb_hid_cdc` |关闭 |关，开|使用 USB HID（组合 HID + CDC）而不是纯 CDC。某些 OTG 主机需要。 |
| `usb_msc_pin_pullup` |开 |关，开|在 USB MSC 检测引脚上启用上拉。 |
| `pinio_box`| 255,255,255,255 | 255,255,255,255 4 个数组 | 4 个 PINIO 输出的 AUX 盒分配（255 = 禁用）。 |
| `pinio_config` | 1,1,1,1 | 1,1,1,1 | 4 个数组 | PINIO 输出配置（高/低有效、漏极开路等）。 |
| `serialmsp_halfduplex`|关闭 |关，开|在 MSP 串行端口上启用半双工操作。 |

---

### 标识与配置文件名称

| 变量                      | 默认              | 范围/值                         | 描述                                                                               |
| ------------------------- | ----------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| `craft_name`              | —                 | 字符串 (1–16)                   | OSD 和地面站中显示的飞行器的显示名称。                                             |
| `pilot_name`              | —                 | 字符串 (1–16)                   | OSD 中显示飞行员名称。                                                             |
| `profile_name`            | —                 | 字符串（1-8，每个配置文件）     | 活动 PID 配置文件的名称。显示在 OSD 配置文件显示中。                               |
| `rateprofile_name`        | —                 | 字符串（1–8，每个速率配置文件） | 活动速率配置文件的名称。                                                           |
| `box_user_1_name`         | —                 | 字符串（1–16）                  | 用户自定义 AUX 盒 1（USER1）的名称。                                               |
| `box_user_2_name`         | —                 | 字符串（1–16）                  | 用户自定义 AUX 盒 2（USER2）的名称。                                               |
| `box_user_3_name`         | —                 | 字符串 (1–16)                   | 用户定义的 AUX 盒 3 (USER3) 的名称。                                               |
| `box_user_4_name`         | —                 | 字符串 (1–16)                   | 用户定义的 AUX 盒 4 (USER4) 的名称。                                               |
| `auto_profile_cell_count` | 0（每个配置文件） | -1–8                            | 当检测到的细胞计数匹配时，自动激活此 PID 配置文件。 0 = 禁用。 -1 = 匹配任意一个。 |

---

### 崩溃恢复

崩溃恢复检测不受控制的崩溃并尝试恢复。默认禁用。

| 变量                       | 默认                 | 范围/值                  | 描述                                                             |
| -------------------------- | -------------------- | ------------------------ | ---------------------------------------------------------------- |
| `crash_recovery`           | 关闭（每个配置文件） | 关闭、打开、蜂鸣声、上锁 | 启用崩溃恢复。 BEEP = 恢复并发出蜂鸣声； DISARM = 恢复然后上锁。 |
| `crash_delay`              | 0（每个配置文件）    | 0–500 毫秒               | 启动碰撞检测之前启动后的延迟。                                   |
| `crash_time`               | 500（每个配置文件）  | 100–5000 毫秒            | 恢复触发前的最短崩溃持续时间。                                   |
| `crash_dthreshold`         | 50（每个配置文件）   | 10–2000                  | D 项阈值，高于该阈值就会检测到崩溃 (deg/s2)。                    |
| `crash_gthreshold`         | 400（每个配置文件）  | 100–2000                 | 碰撞检测的陀螺仪速率阈值（度/秒）。                              |
| `crash_setpoint_threshold` | 350（每个配置文件）  | 50–2000                  | 碰撞检测的设定点阈值。                                           |
| `crash_limit_yaw`          | 200（每个配置文件）  | 0–1000                   | 碰撞恢复期间的偏航速率限制（度/秒）。                            |
| `crash_recovery_angle`     | 10（每个配置文件）   | 5–30 度                  | 最大恢复校正角度（度）。                                         |
| `crash_recovery_rate`      | 100（每个配置文件）  | 50–255 度/秒             | FC 尝试从崩溃中恢复的速率。                                      |
| `crashflip_motor_percent`  | 0                    | 0–100                    | 反乌龟/反乌龟模式期间的电机输出百分比。 0 = 全功率。             |
| `crashflip_rate`           | 0                    | 0–250                    | 反乌龟模式期间的旋转速率限制（度/秒）。 0 = 无限制。             |
| `crashflip_auto_rearm`     | 关闭                 | 关，开                   | 成功反乌龟恢复后自动重新启动。                                   |

---

### EZ Landing

EZ Landing 提供简单的自动着陆辅助功能，可在飞行器下降时逐渐减小油门。

| 变量                   | 默认               | 范围/值 | 描述                                    |
| ---------------------- | ------------------ | ------- | --------------------------------------- |
| `ez_landing_threshold` | 25（每个档案）     | 0–200   | 油门百分比低于该百分比，EZ 着陆将激活。 |
| `ez_landing_limit`     | 15（每个配置文件） | 0–75    | EZ 着陆强制执行的最小油门底限 (%)。     |
| `ez_landing_speed`     | 50（每个配置文件） | 0–250   | EZ 着陆期间油门减小的速率。             |

---

### SPA：设定点处理衰减

SPA 根据设定点（摇杆输入）的大小减少 P 和 D 增益，防止快速翻转期间的振荡，同时保持摇杆中心的全部权限。个人资料范围。

|变量|默认 |范围/值 |描述 || ------------------ | ----------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `spa_roll_mode` |关闭（每个配置文件）|关闭、I*FREEZE、I、PID、PD_I_FREEZE |滚动的 SPA 模式。 I = 尺度 I 项； PID = 缩放所有项； PD*I*FREEZE = 缩放 P 和 D，冻结 I。 *（需要：`USE_WING`）\_ |
| `spa_roll_center` | 0（每个配置文件）| 0–65535 |不应用衰减的设定点中心值（横滚）。 _（需要：`USE_WING`）_ |
| `spa_roll_width` | 0（每个配置文件）| 0–65535 |衰减从 0 渐变到最大（滚动）的设定点范围。 _（需要：`USE_WING`）_ |
| `spa_pitch_mode`|关闭（每个配置文件）|关闭、I*FREEZE、I、PID、PD_I_FREEZE |用于音调的 SPA 模式。 *（需要：`USE_WING`）_ |
| `spa_pitch_center` | 0（每个配置文件）| 0–65535 |螺距 SPA 的设定点中心值。 _（需要：`USE_WING`）_ |
| `spa_pitch_width` | 0（每个配置文件）| 0–65535 |音调 SPA 衰减斜坡的设定点宽度。 _（需要：`USE_WING`）_ |
| `spa_yaw_mode` |关闭（每个配置文件）|关闭、I_FREEZE、I、PID、PD_I_FREEZE |偏航 SPA 模式。 _（需要：`USE_WING`）_ |
| `spa_yaw_center` | 0（每个配置文件）| 0–65535 |偏航 SPA 的设定点中心值。 _（需要：`USE_WING`）_ |
| `spa_yaw_width` | 0（每个配置文件）| 0–65535 |偏航 SPA 衰减斜坡的设定点宽度。 _（需要：`USE_WING`）\_ |

---

### 蜂鸣器

| 变量                       | 默认 | 范围/值      | 描述                                                                                                        |
| -------------------------- | ---- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `beeper_inversion`         | 关闭 | 关，开       | 反转蜂鸣器信号（低电平有效与高电平有效）。 _（需要：`USE_BEEPER`）_                                         |
| `beeper_od`                | 开   | 关，开       | 开漏蜂鸣器输出模式。 ON = 漏极开路（需要外部上拉）。 _（需要：`USE_BEEPER`）_                               |
| `beeper_frequency`         | 0    | 0–16000 赫兹 | 无刷蜂鸣器的 PWM 频率。 0 = 使用默认 ESC 蜂鸣音。 _（需要：`USE_BEEPER`）_                                  |
| `beeper_dshot_beacon_tone` | 1    | 1-5          | 1-5 用于基于电机的蜂鸣器的 DSHOT ESC 信标音调索引（解锁/丢失型号）。 _（需要：`USE_BEEPER` + `USE_DSHOT`）_ |

---

### VTX（图传发射器）

| 变量                   | 默认 | 范围/值                  | 描述                                                                             |
| ---------------------- | ---- | ------------------------ | -------------------------------------------------------------------------------- |
| `vtx_band`             | 0    | 0–8                      | VTX 频段（0 = 未设置/使用 vtx_freq）。                                           |
| `vtx_channel`          | 0    | 0–8                      | 所选频段内的 VTX 频道。                                                          |
| `vtx_freq`             | 0    | 0–5999 MHz               | VTX 频率（以 MHz 为单位）。当 vtx_band = 0 时使用。                              |
| `vtx_power`            | 0    | 0–7                      | VTX 功率级别索引（0 = 最低）。实际功率取决于 VTX 表。                            |
| `vtx_low_power_disarm` | OFF  | OFF、ON、UNTIL_FIRST_ARM | 上锁时切换至最低功率级别。UNTIL_FIRST_ARM 表示仅在连接后的首次解锁前使用低功率。 |
| `vtx_pit_mode_freq`    | 0    | 0–5999 MHz               | 在坑模式下使用的频率。                                                           |
| `vtx_halfduplex`       | 开   | 关，开                   | 半双工 VTX 通信（SmartAudio/Tramp）。                                            |
| `vtx_softserial_alt`   | 关闭 | 关，开                   | 对软串行 VTX 使用备用引脚分配。                                                  |
| `vtx_spi_bus`          | 0    | 0–3                      | 用于 SPI 连接的 VTX 的 SPI 总线（例如 RTC6705）。                                |
| `vcd_video_system`     | 高清 | 自动、PAL、NTSC、高清    | OSD 视频格式。 HD = 数字系统（DJI、Walksnail、HDZero）。自动检测模拟。           |
| `vcd_h_offset`         | 0    | -32–31                   | 模拟 OSD 字符渲染的水平偏移。                                                    |
| `vcd_v_offset`         | 0    | -15–16                   | 模拟 OSD 字符渲染的垂直偏移。                                                    |

---

### LED 灯条

| 变量                           | 默认       | 范围/值                                                                                          | 描述                                                                      |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `led_inversion`                | 0          | 0–7（位掩码）                                                                                    | 反转 LED 灯带输出信号（每个通道的位掩码）。                               |
| `ledstrip_profile`             | 状态       | 种族、灯塔、状态                                                                                 | LED 灯条工作模式。状态=基于功能； RACE = 固定颜色； BEACON = 闪烁的信标。 |
| `ledstrip_race_color`          | 橙色       | 黑色、白色、红色、橙色、黄色、石灰绿、绿色、薄荷绿、青色、浅蓝色、蓝色、深紫罗兰、洋红色、深粉色 | RACE 配置文件中使用的纯色。                                               |
| `ledstrip_beacon_color`        | 白色       | （同色表）                                                                                       | 用于信标闪烁的颜色。                                                      |
| `ledstrip_beacon_period_ms`    | 500        | 500 50–10000 毫秒                                                                                | 信标闪烁周期（以毫秒为单位）。                                            |
| `ledstrip_beacon_percent`      | 50         | 50 0–100                                                                                         | 信标闪光的占空比（接通时间百分比）。                                      |
| `ledstrip_beacon_armed_only`   | 关闭       | 关，开                                                                                           | 仅在解锁时激活信标。                                                      |
| `ledstrip_visual_beeper`       | OFF        | OFF、ON                                                                                          | LED 灯随蜂鸣器同步闪烁，作为视觉告警。                                    |
| `ledstrip_visual_beeper_color` | WHITE      | （与颜色表相同）                                                                                 | 视觉蜂鸣器闪烁所用的颜色。                                                |
| `ledstrip_grb_rgb`             | 伽玛射线暴 | GRB、RGB、GRBW                                                                                   | LED 灯带颜色字节顺序。 GRB 为标准 WS2812B； GRBW 用于 RGBW 条带。         |
| `ledstrip_brightness`          | 100        | 100 5–100                                                                                        | 所有 LED 模式的全局亮度百分比。                                           |
| `ledstrip_rainbow_delta`       | 0          | 0–359                                                                                            | 彩虹模式下连续 LED 之间的色调偏移。                                       |
| `ledstrip_rainbow_freq`        | 120        | 120 1–2000                                                                                       | 彩虹动画速度（更新/秒）。                                                 |

另请参阅：

- [LED 灯条](/docs/wiki/guides/current/LED-Strip-Functionality)

---

### DisplayPort 与 OSD 硬件

| 变量                               | 默认    | 范围/值        | 描述                                                  |
| ---------------------------------- | ------- | -------------- | ----------------------------------------------------- |
| `displayport_max7456_blk`          | 0       | 0–3            | MAX7456 黑电平(0 = 最暗)。                            |
| `displayport_max7456_wht`          | 2       | 0–3            | MAX7456 白电平(2 = 标准)。                            |
| `displayport_max7456_inv`          | 关闭    | 关，开         | 反转 MAX7456 视频输出。                               |
| `displayport_max7456_row_adjust`   | 0       | -3–0           | MAX7456 字符显示的行偏移调整。                        |
| `displayport_max7456_col_adjust`   | 0       | -6–0           | MAX7456 字符显示的列偏移调整。                        |
| `displayport_msp_row_adjust`       | 0       | -3–0           | MSP 显示端口 (DJI/HD OSD) 的行偏移。                  |
| `displayport_msp_col_adjust`       | 0       | -6–0           | MSP 显示端口的列偏移。                                |
| `displayport_msp_fonts`            | 0,1,2,3 | 4 个数组       | MSP 显示端口系统上 4 个 OSD 配置文件的字体索引。      |
| `displayport_msp_use_device_blink` | 关闭    | 关，开         | 对 MSP OSD 元素 (DJI) 使用设备本机闪烁。              |
| `max7456_spi_bus`                  | 2       | 0–3            | MAX7456 OSD 芯片的 SPI 总线。                         |
| `max7456_clock`                    | 标称    | 一半、名义、双 | MAX7456 SPI 时钟速度。如果出现视频故障，请使用 HALF。 |
| `max7456_preinit_opu`              | 关闭    | 关，开         | 飞行前预初始化 MAX7456 OSD 像素输出。                 |
| `dashboard_i2c_bus`                | 0       | 0–3            | 用于 OLED 仪表板显示的 I2C 总线。                     |
| `dashboard_i2c_addr`               | 60      | 8–119          | OLED 仪表板的 I2C 地址（默认 0x3C = 60）。            |

---

### OSD

OSD 位置变量将 x/y 位置和启用状态编码为单个 16 位值（位 11 = 启用，位 5–0 = 列，位 10–6 = 行）。默认 341 = 禁用（位模式 0b0000000101010101）。使用 Betaflight Configurator OSD 选项卡直观地设置位置。

**OSD 设置**

|变量|默认|范围/值 |描述 |
| `osd_displayport_device` | MSP | NONE、AUTO、MAX7456、MSP、FRSKYOSD | OSD 输出设备。MSP 用于数字高清系统（DJI、Walksnail、HDZero），MAX7456 用于模拟 OSD 芯片。 |
| `osd_units` |公制 |英制、公制、英制 | OSD 值的单位系统（速度、距离、高度）。 |
| `osd_framerate_hz` | 12 | 12 1–60 赫兹 | OSD 更新率。更高 = 更流畅，但 CPU 负载更大。 |
| `osd_profile` | 1 | 1-3 | 1-3 活动 OSD 配置文件（布局）。通过 AUX 通道切换配置文件。 |
| `osd_profile_1_name` | — |字符串 (1–16) | OSD 配置文件 1 的名称。
| `osd_profile_2_name` | — |字符串 (1–16) | OSD 配置文件 2 的名称。
| `osd_profile_3_name`| — |字符串 (1–16) | OSD 配置文件 3 的名称。
| `osd_use_quick_menu` |开 |关，开|启用快速访问 OSD 菜单（单击）。 |
| `osd_menu_background`|透明|透明、黑色、灰色、浅灰色 | OSD 菜单背景样式。 |
| `osd_arming_logo` | 0 | 0–3 |手臂上显示徽标。 0 = Betaflight 徽标。 |
| `osd_craftname_msgs` |关闭 |关，开|在 OSD 中显示工艺名称消息。 |
| `osd_logo_on_arming` |关闭 |关闭、开启、首次解锁 |在手臂上显示徽标动画。 FIRST_ARMING = 仅在连接后的第一个臂上。 |
| `osd_logo_on_arming_duration` | 5 | 5–50 (x0.1 秒) |武装徽标动画的持续时间。 |
| `osd_show_spec_prearm` |关闭 |关，开|在预解锁屏幕中显示电机规格。 |

**OSD 警报**

| 变量                      | 默认       | 范围/值             | 描述                                                             |
| ------------------------- | ---------- | ------------------- | ---------------------------------------------------------------- |
| `osd_rssi_alarm`          | 20         | 0–100%              | RSSI 报警阈值（%）。当 RSSI 低于此值时发出警报。                 |
| `osd_rssi_dbm_alarm`      | -60        | -130–0 dBm          | RSSI dBm 警报阈值。                                              |
| `osd_rsnr_alarm`          | 4          | -30–20 分贝         | RSNR（射频信噪比）警报阈值。                                     |
| `osd_link_quality_alarm`  | 80         | 0–100%              | 链路质量警报阈值（ELRS/CRSF）。                                  |
| `osd_alt_alarm`           | 100        | 100 0–10000 米      | 高度报警阈值。                                                   |
| `osd_cap_alarm`           | 2200       | 2200 0–20000 毫安时 | 电池容量消耗报警阈值。                                           |
| `osd_distance_alarm`      | 0          | 0–65535 米          | 离家距离警报（0 = 禁用）。                                       |
| `osd_esc_rpm_alarm`       | -1         | -1–32767 转/分钟    | ESC RPM 警报（-1 = 禁用）。                                      |
| `osd_esc_current_alarm`   | -1         | -1–32767 A          | ESC 当前警报（-1 = 禁用）。                                      |
| `osd_esc_temp_alarm`      | 0          | 0–255 °C            | ESC 温度告警。                                                   |
| `osd_core_temp_alarm`     | 70         | 0–255 °C            | 飞控核心温度告警。                                               |
| `osd_stat_bitmask`        | 1879062316 | 0–4294967295        | 飞行后统计屏幕上显示的统计数据位掩码。                           |
| `osd_stat_avg_cell_value` | 关闭       | 关，开              | 在飞行后统计数据中显示平均电池电压（相对于总电池组）。           |
| `osd_warn_bitmask`        | 397311     | 0–4294967295        | 启用 OSD 警告的位掩码（ARMING、FAIL_SAFE、BATTERY_WARNING 等）。 |

**OSD 定时器配置**

| 变量       | 默认 | 范围/值      | 描述                            |
| ---------- | ---- | ------------ | ------------------------------- |
| `osd_tim1` | 2560 | 2560 0–32767 | 定时器 1 配置（源和精度编码）。 |
| `osd_tim2` | 2561 | 2561 0–32767 | 定时器 2 配置。                 |

**OSD 辅助和摄像头**

| 变量                           | 默认        | 范围/值     | 描述                                         |
| ------------------------------ | ----------- | ----------- | -------------------------------------------- | --------------------------------------------------- |
| `osd_aux_channel`              | 1           | 1–18        | RC 通道显示为辅助 OSD 值。                   |
| `osd_aux_scale`                | 200         | 200 1–1000  | AUX 通道显示的比例因子。                     |
| `osd_aux_symbol`               | 65          | 65 ASCII 码 | 用于 AUX 显示的符号字符 (65 = A)。           |
| `osd_rcchannels`               | -1,-1,-1,-1 | -1,-1,-1,-1 | 4 个数组（通道 1–18 或 -1）                  | 要在 OSD RC 通道元素中显示的 RC 通道（-1 = 禁用）。 |
| `osd_stick_overlay_radio_mode` | 2           | 1-4         | 1-4 用于棒覆盖显示的无线电模式（模式 1-4）。 |
| `osd_camera_frame_width`       | 24          | 2–30        | 相机框架覆盖宽度（以字符为单位）。           |
| `osd_camera_frame_height`      | 11          | 11 2–16     | 相机框架覆盖高度（以字符为单位）。           |
| `osd_gps_sats_show_pdop`       | 关闭        | 关，开      | 在卫星计数旁边显示 PDOP（位置精度衰减）。    |
| `osd_ah_invert`                | 关闭        | 关，开      | 反转人工地平线方向。                         |
| `osd_ah_max_pit`               | 20          | 0–90 度     | 人造地平线上显示的最大俯仰角（度）。         |
| `osd_ah_max_rol`               | 40          | 40 0–90 度  | 人造地平线上显示的最大横滚角（度）。         |

**OSD 位置变量**（所有默认值 341 = 禁用，范围 0–65535）

| 变量                              | 描述                   |
| --------------------------------- | ---------------------- |
| `osd_rssi_pos`                    | RSSI (%)               |
| `osd_rssi_dbm_pos`                | RSSI dBm               |
| `osd_rsnr_pos`                    | RSNR                   |
| `osd_link_quality_pos`            | 链接质量               |
| `osd_link_tx_power_pos`           | 发射功率               |
| `osd_vbat_pos`                    | 电池电压               |
| `osd_avg_cell_voltage_pos`        | 平均电池电压           |
| `osd_current_pos`                 | 电流消耗               |
| `osd_power_pos`                   | 功率（瓦）             |
| `osd_mah_drawn_pos`               | 消耗毫安时             |
| `osd_wh_drawn_pos`                | 消耗瓦时               |
| `osd_battery_usage_pos`           | 电池用量栏             |
| `osd_remaining_time_estimate_pos` | 预计剩余飞行时间       |
| `osd_efficiency_pos`              | 飞行效率（mAh/km）     |
| `osd_altitude_pos`                | 海拔高度               |
| `osd_nvario_pos`                  | 垂直速度（数字变速计） |
| `osd_nheading_pos`                | 罗盘航向               |
| `osd_compass_bar_pos`             | 指南针栏               |
| `osd_gps_speed_pos`               | GPS 速度               |
| `osd_gps_sats_pos`                | GPS 卫星数量           |
| `osd_gps_lat_pos`                 | GPS 纬度               |
| `osd_gps_lon_pos`                 | GPS 经度               |
| `osd_home_dist_pos`               | 到家的距离             |
| `osd_home_dir_pos`                | 回家的方向             |
| `osd_flight_dist_pos`             | 总飞行距离             |
| `osd_lidar_dist_pos`              | 激光雷达距离           |
| `osd_throttle_pos`                | 油门百分比             |
| `osd_flymode_pos`                 | 飞行模式               |
| `osd_disarmed_pos`                | 上锁指示器             |
| `osd_ready_mode_pos`              | 就绪模式指示灯         |
| `osd_crosshairs_pos`              | 十字准线               |
| `osd_ah_pos`                      | 人工地平线             |
| `osd_ah_sbar_pos`                 | 啊侧边栏               |
| `osd_up_down_reference_pos`       | 上/下参考              |
| `osd_pit_ang_pos`                 | 俯仰角                 |
| `osd_rol_ang_pos`                 | 横滚角                 |
| `osd_g_force_pos`                 | 重力                   |
| `osd_tim_1_pos`                   | 定时器 1               |
| `osd_tim_2_pos`                   | 定时器 2               |
| `osd_craft_name_pos`              | 工艺名称               |
| `osd_pilot_name_pos`              | 飞行员姓名             |
| `osd_pid_roll_pos`                | 滚动 PID 值            |
| `osd_pid_pitch_pos`               | 变桨 PID 值            |
| `osd_pid_yaw_pos`                 | 偏航 PID 值            |
| `osd_pidrate_profile_pos`         | PID/速率曲线指示器     |
| `osd_pid_profile_name_pos`        | PID 配置文件名称       |
| `osd_rate_profile_name_pos`       | 评价个人资料名称       |
| `osd_profile_name_pos`            | OSD 配置文件名称       |
| `osd_anti_gravity_pos`            | 反重力指示器           |
| `osd_debug_pos`                   | 调试值 1               |
| `osd_debug2_pos`                  | 调试值 2               |
| `osd_esc_tmp_pos`                 | 电调温度               |
| `osd_esc_rpm_pos`                 | ESC 转速               |
| `osd_esc_rpm_freq_pos`            | 电调转速频率           |
| `osd_core_temp_pos`               | FC 核心温度            |
| `osd_vtx_channel_pos`             | VTX 频道               |
| `osd_flip_arrow_pos`              | 反乌龟箭头             |
| `osd_log_status_pos`              | Blackbox 日志状态      |
| `osd_motor_diag_pos`              | 电机诊断               |
| `osd_adjustment_range_pos`        | 调整范围指示器         |
| `osd_rcchannels_pos`              | 遥控通道               |
| `osd_stick_overlay_left_pos`      | 左摇杆覆盖             |
| `osd_stick_overlay_right_pos`     | 右摇杆覆盖             |
| `osd_aux_pos`                     | AUX 通道值             |
| `osd_total_flights_pos`           | 航班总数               |
| `osd_rtc_date_time_pos`           | RTC 日期/时间          |
| `osd_warnings_pos`                | 警告（默认 14772）     |
| `osd_camera_frame_pos`            | 相机框架叠加           |
| `osd_sys_warnings_pos`            | 系统警告               |
| `osd_sys_lq_pos`                  | 系统链路质量           |
| `osd_sys_bitrate_pos`             | 系统比特率             |
| `osd_sys_delay_pos`               | 系统延迟               |
| `osd_sys_distance_pos`            | 系统距离               |
| `osd_sys_goggle_voltage_pos`      | 护目镜电压             |
| `osd_sys_vtx_voltage_pos`         | VTX 电压               |
| `osd_sys_vtx_temp_pos`            | VTX 温度               |
| `osd_sys_fan_speed_pos`           | 风扇转速               |
| `osd_sys_goggle_dvr_pos`          | 护目镜 DVR 指示灯      |
| `osd_sys_vtx_dvr_pos`             | VTX DVR 指示灯         |

---

### 舵机与云台

| 变量                 | 默认值 | 范围 / 取值         | 说明                                                                                        |
| -------------------- | ------ | ------------------- | ------------------------------------------------------------------------------------------- |
| `servo_center_pulse` | 1500   | 1500 750–2250 我们  | 伺服中心脉冲宽度。 _（需要：`USE_SERVOS`）_                                                 |
| `servo_pwm_rate`     | 50     | 50 50–498 赫兹      | 伺服 PWM 更新率。 50 Hz = 标准模拟； 333+ Hz = 数字。 _（需要：`USE_SERVOS`）_              |
| `servo_lowpass_hz`   | 0      | 0–400 赫兹          | 用于伺服输出平滑的低通滤波器截止（0 = 禁用）。 _（需要：`USE_SERVOS`）_                     |
| `tri_unarmed_servo`  | 开     | 关，开              | 上锁时保持尾舵机处于活动状态（三轴飞行器）。防止手臂产生机械噪音。 _（需要：`USE_SERVOS`）_ |
| `thr_corr_angle`     | 800    | 1–900（十分之一度） | 高于该角度时油门校正将激活（补偿倾斜引起的升力损失）。                                      |
| `thr_corr_value`     | 0      | 0–150               | 最大倾斜时的油门修正量。 0 = 禁用。                                                         |
| `gimbal_mode`        | 正常   | 正常，混合倾斜      | 三旋翼尾翼云台控制模式。 _（需要：`USE_SERVOS`）_                                           |
| `yaw_type`           | 舵     | 舵，差动推力        | 偏航控制类型。 DIFF*THRUST 使用差动推力（双旋翼/差动）。 *（需要：`USE_WING`）\_            |

---

### 遥测

遥测数据通过串行端口传输到地面站/遥控器。每个 `telemetry_disabled_*` 标志都会抑制遥测流中的特定传感器类型。

另请参阅：

- [遥测](/docs/wiki/guides/current/Telemetry)
- [ESC 遥测](/docs/wiki/guides/current/ESC-Telemetry)

**遥测串行设置**

| 变量             | 默认      | 范围/值   | 描述                                                                |
| ---------------- | --------- | --------- | ------------------------------------------------------------------- |
| `tlm_halfduplex` | 开        | 关，开    | 半双工模式下的遥测（共享 TX/RX 引脚）。 FrSky S.Port 和 HoTT 需要。 |
| `tlm_inverted`   | 关闭      | 关，开    | 反转遥测信号逻辑。某些协议需要（例如某些线路上的 FrSky）。          |
| `hott_alarm_int` | 5         | 0–120 秒  | HoTT 警报间隔（重复警报之间的秒数）。 0 = 禁用。                    |
| `ibus_sensor`    | 1,2,3,0,… | 15 个数组 | 15 个插槽的 iBus 传感器类型分配。                                   |

**FrSky 遥测**

| 变量                   | 默认 | 范围/值                    | 描述                                             |
| ---------------------- | ---- | -------------------------- | ------------------------------------------------ |
| `frsky_default_lat`    | 0    | -9000–9000（百分之几度）   | 未修复时的默认 GPS 纬度（用于 FrSky GPS 显示）。 |
| `frsky_default_long`   | 0    | -18000–18000（百分之几度） | 未修复时的默认 GPS 经度。                        |
| `frsky_gps_format`     | 0    | 0–1                        | FrSky 的 GPS 坐标格式（0 = 十进制，1 = DMS）。   |
| `frsky_unit`           | 公制 | 英制、公制、英制           | FrSky 遥测值的单位系统。                         |
| `frsky_vfas_precision` | 0    | 0–1                        | FrSky VFAS 电压精度（0 = 0.2V，1 = 0.1V）。      |

**MAVLink 遥测**

|变量|默认|范围/值|描述 || -------------------------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `mavlink_min_txbuff` | 35 | 35 1–100% |发送 MAVLink 消息之前所需的最低 TX 缓冲区级别。 |
| `mavlink_mah_as_heading_divisor` | 0 | 0–30000 |通过除以该值将 mAh 编码为标题。 0 = 禁用（发送真实航向）。 |

**禁用遥测传感器**（每个 ON 标志都会抑制来自遥测流的数据）

| 变量                                 | 默认 | 描述             |
| ------------------------------------ | ---- | ---------------- |
| `telemetry_disabled_voltage`         | 关闭 | 电池电压         |
| `telemetry_disabled_current`         | 关闭 | 电流消耗         |
| `telemetry_disabled_fuel`            | 关闭 | 燃料（使用容量） |
| `telemetry_disabled_cap_used`        | 开   | 已用容量         |
| `telemetry_disabled_mode`            | 关闭 | 飞行模式         |
| `telemetry_disabled_acc_x`           | 关闭 | 加速度计 X       |
| `telemetry_disabled_acc_y`           | 关闭 | 加速度计 Y       |
| `telemetry_disabled_acc_z`           | 关闭 | 加速度计 Z       |
| `telemetry_disabled_pitch`           | 关闭 | 俯仰角           |
| `telemetry_disabled_roll`            | 关闭 | 横滚角           |
| `telemetry_disabled_heading`         | 关闭 | 标题             |
| `telemetry_disabled_altitude`        | 关闭 | 海拔高度         |
| `telemetry_disabled_lat_long`        | 关闭 | GPS 纬度/经度    |
| `telemetry_disabled_ground_speed`    | 关闭 | GPS 地面速度     |
| `telemetry_disabled_distance`        | 关闭 | 离家的距离       |
| `telemetry_disabled_vario`           | 关闭 | 垂直速度         |
| `telemetry_disabled_temperature`     | 关闭 | 温度             |
| `telemetry_disabled_esc_current`     | 开   | 电调电流         |
| `telemetry_disabled_esc_voltage`     | 开   | 电调电压         |
| `telemetry_disabled_esc_rpm`         | 开   | ESC 转速         |
| `telemetry_disabled_esc_temperature` | 开   | 电调温度         |

---

### 相机控制

相机控制驱动模拟分压器来模拟具有单线控制接口的相机上的按钮按下。

| 变量                                 | 默认             | 范围/值                               | 描述                                                   |
| ------------------------------------ | ---------------- | ------------------------------------- | ------------------------------------------------------ |
| `camera_control_mode`                | 硬件\_PWM        | 硬件\_PWM、软件\_PWM、DAC             | 相机控制信号的输出方式。                               |
| `camera_control_ref_voltage`         | 330              | 330 200–400（厘伏，例如 330 = 3.30V） | 相机控制电路的参考电压。                               |
| `camera_control_key_delay`           | 180              | 180 100–500 毫秒                      | 模拟按钮按下的持续时间。                               |
| `camera_control_internal_resistance` | 470              | 470 10–1000 欧姆                      | 分压器的内阻。                                         |
| `camera_control_button_resistance`   | 450,270,150,68,0 | 5（欧姆）阵列                         | 每个相机按钮的电阻值（ENTER、LEFT、UP、RIGHT、DOWN）。 |
| `camera_control_inverted`            | 关闭             | 关，开                                | 反转相机控制信号逻辑。                                 |

---

### 接收机协议

**SRXL2 / 光谱**

| 变量                          | 默认 | 范围/值 | 描述                                                                                   |
| ----------------------------- | ---- | ------- | -------------------------------------------------------------------------------------- |
| `srxl2_unit_id`               | 1    | 0–15    | SRXL2 单元 ID（在 SRXL2 总线上必须是唯一的）。 _（需要：`USE_SERIALRX_SRXL2`）_        |
| `srxl2_baud_fast`             | ON   | OFF、ON | SRXL2 使用 400000 波特率；OFF 使用 115200。_（需要：`USE_SERIALRX_SRXL2`）_            |
| `spektrum_sat_bind`           | 0    | 0–10    | 卫星接收机绑定脉冲数。0 为正常运行，3–10 进入绑定模式。_（需要：`USE_SPEKTRUM_BIND`）_ |
| `spektrum_sat_bind_autoreset` | 开   | 关，开  | 绑定后自动将 spektrum*sat_bind 重置为 0。 *（需要：`USE_SPEKTRUM_BIND`）\_             |

**遥控设备（RunCam 等）**

| 变量                                 | 默认 | 范围/值           | 描述                                                               |
| ------------------------------------ | ---- | ----------------- | ------------------------------------------------------------------ |
| `rcdevice_protocol_version`          | 0    | 0–1               | RC 设备协议版本（0 = auto，1 = v1）。 _（需要：`USE_RCDEVICE`）_   |
| `rcdevice_init_dev_attempts`         | 6    | 0–10              | RC 设备的初始化尝试次数。 _（需要：`USE_RCDEVICE`）_               |
| `rcdevice_init_dev_attempt_interval` | 1000 | 1000 0–5000 毫秒  | 初始化尝试之间的间隔。 _（需要：`USE_RCDEVICE`）_                  |
| `rcdevice_feature`                   | 0    | 0–65535（位掩码） | RC 设备具有位掩码（相机控制、OSD 等）。 _（需要：`USE_RCDEVICE`）_ |

---

### MSP 覆盖

MSP 通道覆盖允许外部设备（配套计算机、护目镜）通过 MSP 覆盖 RC 通道。

| 变量                         | 默认 | 范围/值            | 描述                                               |
| ---------------------------- | ---- | ------------------ | -------------------------------------------------- |
| `msp_override_channels_mask` | 0    | 0–262143（位掩码） | 可以被 MSP 覆盖的 RC 通道的位掩码。位 0 = 通道 1。 |
| `msp_override_failsafe`      | 关闭 | 关，开             | 当信号丢失时，使用 MSP 覆盖值作为失控保护。        |

---

### 统计

Betaflight 在 EEPROM 中累积整个电源周期的飞行统计数据。

| 变量                     | 默认 | 范围/值             | 描述                                                                                   |
| ------------------------ | ---- | ------------------- | -------------------------------------------------------------------------------------- |
| `stats_total_flights`    | 0    | 0–4294967295        | 记录的解锁事件总数。 _（需要：`USE_PERSISTENT_STATS`）_                                |
| `stats_total_time_s`     | 0    | 0–4294967295 秒     | 总解锁时间（以秒为单位）。 _（需要：`USE_PERSISTENT_STATS`）_                          |
| `stats_total_dist_m`     | 0    | 0–4294967295 米     | 总飞行距离（米）。 _（需要：`USE_PERSISTENT_STATS`）_                                  |
| `stats_mah_used`         | 0    | 0–4294967295 毫安时 | 消耗的电池总容量。 _（需要：`USE_PERSISTENT_STATS` + `USE_BATTERY_CONTINUE`）_         |
| `stats_min_armed_time_s` | -1   | -1–127 秒           | 计算一次航班的最短臂持续时间（-1 = 计算所有航班）。 _（需要：`USE_PERSISTENT_STATS`）_ |
| `stats_save_move_limit`  | 20   | 0–255               | 计算 GPS 距离之前所需的最小移动量（厘米）。 _（需要：`USE_PERSISTENT_STATS`）_         |

---

### 光流与测距仪

| 变量                   | 默认 | 范围/值                                                        | 描述                                                                     |
| ---------------------- | ---- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `rangefinder_hardware` | 无   | 无、HCSR04、TFMINI、TF02、MTF01、MTF02、MTF01P、MTF02P、TFNOVA | 测距仪（激光雷达）硬件选择。 _（需要：`USE_RANGEFINDER`）_               |
| `opticalflow_hardware` | NONE | NONE、MT                                                       | 光流传感器硬件。_（需要：`USE_OPTICALFLOW`）_                            |
| `opticalflow_flip_x`   | OFF  | OFF、ON                                                        | 翻转光流 X 轴，以匹配传感器的实际安装方向。_（需要：`USE_OPTICALFLOW`）_ |
| `opticalflow_rotation` | 0    | 0–359 度                                                       | 光流传感器的旋转偏移。 _（需要：`USE_OPTICALFLOW`）_                     |
| `opticalflow_lpf`      | 0    | 0–10000                                                        | 光流数据的低通滤波器截止。 0 = 禁用。 _（需要：`USE_OPTICALFLOW`）_      |

---

### 杂项

| 变量                      | 默认 | 范围/值       | 描述                                                                       |
| ------------------------- | ---- | ------------- | -------------------------------------------------------------------------- |
| `timezone_offset_minutes` | 0    | -780–780 分钟 | RTC 显示时区与 UTC 的时区偏移（以分钟为单位）。 _（需要：`USE_RTC_TIME`）_ |
