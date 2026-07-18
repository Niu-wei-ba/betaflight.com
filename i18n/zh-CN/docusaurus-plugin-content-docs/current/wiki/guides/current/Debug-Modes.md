# 调试模式

### CLI 信息命令

- `VERSION`：显示当前加载的固件，以及该固件构建对应的最后一个 GitHub 代码提交，例如 `(9f67a584b)`。

- `STATUS`：显示四轴飞行器配置的多项信息，例如可用于固件的 ROM 空间、陀螺仪类型和检测到的电压等。

- `TASKS`：显示正在运行的任务及其 CPU 占用率。确认陀螺仪/PID 任务的速率（Hz）是否按设定频率运行。

- `DSHOT_TELEMETRY_INFO`：显示各 ESC 的 DShot 双向 RPM 遥测数据包成功情况。（4.1+）

- `RC_SMOOTHING_INFO`：显示检测到的接收机帧率。仅当接收机页面的 RC 信号平滑类型选择 `Filter`，且 `Input Cutoff Type` 与 `Derivative Cutoff Type` 均设为 `auto` 时可用。要使检测到的帧率数据有效，遥控器和接收机均须已连接并通电。

- `get DEBUG_MODE`：显示当前调试模式及所有可用调试模式。

---

### 调试模式

## 陀螺仪信号 (https://youtu.be/A09sprstYqI)

`GYRO_RAW`：（未经缩放或滤波的原始陀螺仪数据）
用于查看输入固件、未经缩放的陀螺仪信号，以检测堆栈溢出（ICM 陀螺仪）。

- [0] = 横滚：输入固件的陀螺仪信号，**未**缩放
- [1] = 俯仰：输入固件的陀螺仪信号，**未**缩放
- [2] = 偏航：输入固件的陀螺仪信号，**未**缩放
- [3] = [空]

`GYRO_SCALED`：（已转换为 deg/s、尚未经过任何飞控滤波的陀螺仪数据）

- [0] = 横滚：输入固件的陀螺仪信号，已**缩放**为 deg/s
- [1] = 俯仰：输入固件的陀螺仪信号，已**缩放**为 deg/s
- [2] = 偏航：输入固件的陀螺仪信号，已**缩放**为 deg/s
- [3] = [空]

`GYRO_FILTERED`：（与默认记录的陀螺仪曲线相同）

- [0] = 横滚：滤波后的陀螺仪曲线
- [1] = 俯仰：滤波后的陀螺仪曲线
- [2] = 偏航：滤波后的陀螺仪曲线
- [3] = [空]

`GYRO_SAMPLE`：

- [0] = 降采样至 PID 环路频率前的陀螺仪数据
- [1] = PID 环路频率下的陀螺仪数据
- [2] = PID 环路频率下、经 RPM 滤波后的陀螺仪数据
- [3] = PID 环路频率下、经 RPM 和全部静态滤波器后、动态陷波滤波器前的陀螺仪数据

### 滤波器 (https://youtu.be/__vyp60cU_8)

`D_LPF`：

- [0] = 横滚：未滤波的 D 项
- [1] = 俯仰：未滤波的 D 项
- [2] = 横滚：经滤波、经过 DMin/Dmax 调整、应用 TPA 前的 D 项
- [3] = 俯仰：经滤波、经过 DMin/Dmax 调整、应用 TPA 前的 D 项

`DYN_LPF`：

- [0] = 横滚：原始陀螺仪数据（已缩放）
- [1] = 横滚：陷波中心频率
- [2] = 横滚：低通滤波器截止频率
- [3] = 横滚：动态陷波前（低通滤波器后）的陀螺仪数据

`FFT_FREQ`：

- [0] = gyroDebugAxis：陷波 1 的中心频率
- [1] = gyroDebugAxis：陷波 2 的中心频率
- [2] = gyroDebugAxis：陷波 3 的中心频率
- [3] = gyroDebugAxis：动态陷波前的陀螺仪数据（低通与 RPM 滤波后）

`FFT`：

- [0] = gyroDebugAxis：动态陷波前的陀螺仪数据（低通与 RPM 滤波后）
- [1] = gyroDebugAxis：动态陷波后的陀螺仪数据
- [2] = gyroDebugAxis：用于 FFT 的降采样数据
- [3] = [空]

`FFT_TIME`：

- [0] = 当前活动的计算步骤
- [1] = 此步骤的持续时间
- [2] = [空]
- [3] = [空]

`RPM_FILTER`：

- [0] = 电机 #1 RPM 陷波中心频率（预期电机噪声峰值所在位置）
- [1] = 电机 #2 RPM 陷波中心频率
- [2] = 电机 #3 RPM 陷波中心频率
- [3] = 电机 #4 RPM 陷波中心频率

## PID

`D_MAX`：

- [0] = 陀螺仪因子（百分比，按 `d_max_gain` 缩放）
- [1] = 设定点因子（百分比，按 `d_max_advance` 缩放）。_gyro_ 和 _setpoint_ 因子中较大的一个生效。
- [2] = 横滚：当前 D 项增益
- [3] = 俯仰：当前 D 项增益

`ITERM_RELAX`：(https://youtu.be/QfiGTG5LfCk)

- [0] = 用于检测较大设定点变化的高通滤波器
- [1] = 放松因子（百分比，仅用于 `SETPOINT` 模式）
- [2] = 放松后的 I 项误差
- [3] = 绝对控制轴误差 [横滚]

`ANTI_GRAVITY`：油门快速变化期间的 I、P 增益提升

- [0] = 由高通油门计算的基础 I 增益因子（\* 1000）
- [1] = 最终 I 增益因子（包含延迟且经平滑的低通分量）（\* 1000）
- [2] = P 增益因子（\* 1000）[横滚]
- [3] = P 增益因子（\* 1000）[俯仰]

`FEEDFORWARD_LIMIT` (`FF_LIMIT`)：当摇杆快速接近最大速率时降低前馈

- [0] = 限制因子 [横滚]
- [1] = 限制因子 [俯仰]
- [2] = 受限后的前馈 [横滚]
- [3] = 未使用

`FEEDFORWARD`（4.3）：

- [0] = 插值后的设定点 [横滚]
- [1] = 经平滑的设定点增量 [横滚]
- [2] = 经平滑的 Boost 因子 [横滚]
- [3] = RC 指令增量 [横滚] (us)

`FF_INTERPOLATED`（4.2）：

- [0] = 设定点增量 [横滚]
- [1] = 设定点加速度 [横滚]
- [2] = 限幅后的设定点加速度 [横滚]
- [3] = 重复计数器

`FF_INTERPOLATED`（4.0）：

- [0] = 设定点增量 Impl [横滚]
- [1] = Boost 量 [横滚]
- [2] = 限幅后的 Boost 量 [横滚]
- [3] = 限幅量

## ESC 和电机

`DSHOT_RPM_TELEMETRY`：在 Configurator 10.8 中显示 RPM；在低于 10.8 的版本中显示 eRPM（其中 `RPM = eRPM * motor_magnet_count`）。

- [0] = 电机 #1 RPM
- [1] = 电机 #2 RPM
- [2] = 电机 #3 RPM
- [3] = 电机 #4 RPM

`DSHOT_RPM_ERRORS`：

- [0] = 电机 #1：各电机无效数据包的百分比，以百分之一百分点计，因此 123 表示 1.23%
- [1] = 电机 #2：同上
- [2] = 电机 #3：同上
- [3] = 电机 #4：同上

`DYN_IDLE`（4.3）：

- [0] = 动态怠速 P [横滚]
- [1] = 动态怠速 I [横滚]
- [2] = 动态怠速 D [横滚]
- [3] = min RPM（当前最低电机转速）

`DYN_IDLE`（\<4.3）：

- [0] = `motorRangeMinIncrease * 1000`
- [1] = `targetRpsChangeRate`（简单 RPM 误差 \* `idle_adjustment_speed`）
- [2] = error（需要修正的误差量）
- [3] = minRps（当前最低电机转速，单位为每秒转数 \* 10）
  例如，minRps 为 500 对应 `50.0 * 60 = 3000rpm`。

## 环路时间稳定性

`CYCLETIME`：

- [0] = 自 PID 任务上次运行起经过的时间，单位为微秒
- [1] = 当前 CPU 负载百分比
- [2] = 距上一次电机更新的时间（uS）
- [3] = 电机更新间隔相对目标 PID 环路时间的偏差（uS）
  注：4.2.x 重构陀螺仪/PID 环路后，[2] 和 [3] 已无实际意义，因为电机更新现在属于 PID 任务。

`PIDLOOP`：

- [0] = 陀螺仪任务的运行时间（BF 4.2.x 后无用）
- [1] = PID 计算耗时，单位为微秒
- [2] = 混控器、舵机、电机更新和 DShot 遥测统计耗时，单位为微秒
- [3] = 磁力计定向保持与 Blackbox 处理逻辑耗时，单位为微秒

`SCHEDULER_DETERMINISM`：

- [0] = 陀螺仪任务启动周期时间，单位为 0.1 us
- [1] = 延迟任务的 ID
- [2] = 任务延迟量，单位为 0.1 us
- [3] = 陀螺仪锁定偏差，单位为时钟周期

`TIMING_ACCURACY`：

- [0] = CPU 忙碌百分比
- [1] = 上一秒发生延迟的任务数
- [2] = 上一秒的总延迟量，单位为 0.1 us
- [3] = 上一秒运行的任务总数

### RC 平滑 (https://youtu.be/M50fKpvFjT8)

`RC_INTERPOLATION`：

- [0] = 原始、未经平滑的 RC 通道数据 [横滚]
- [1] = 当前接收机帧率
- [2] = 插值步数
- [3] = RC 设定点 [横滚]

`RC_SMOOTHING`：

- [0] = 原始、未经平滑的 RC 通道数据
- [1] = 原始、未经平滑的设定点导数
- [2] = 应用于设定点权重前、经滤波的设定点导数
- [3] = 当前计算出的平均值（显示当前用于设置滤波器的“锁定”速率）

`RC_SMOOTHING_RATE`：

- [0] = 记录每个接收机帧间隔（显示与前一帧的时间间隔，单位为微秒）
- [1] = 记录训练步骤计数
- [2] = 当前计算出的平均值（显示当前用于设置滤波器的“锁定”速率）
- [3] = 指示保护时间是否处于活动状态

### 飞行动力学

`AC_ERROR`（绝对控制误差）：

- [0] = 横滚：轴误差 \* 10
- [1] = 俯仰：轴误差 \* 10
- [2] = 偏航：轴误差 \* 10
- [3] = [无]

`AC_CORRECTION`（AC = 绝对控制）：

- [0] = 横滚：轴 AC 修正 \* 10
- [1] = 俯仰：轴 AC 修正 \* 10
- [2] = 偏航：轴 AC 修正 \* 10
- [3] = [无]

`FF_THUMB`（绝对控制修正）：

- [0] = 横滚的常规 FF
- [1] = 摇杆限幅后的横滚 FF
- [2] = 最大偏转后的 FF
- [3] = 由摇杆外推得到的预测最大速率

## 传感器融合陀螺仪板

`DUAL_GYRO_RAW`：

- [0] = 横滚：原始陀螺仪 #1 数据（未缩放为 deg/s）
- [1] = 俯仰：原始陀螺仪 #1 数据（未缩放为 deg/s）
- [2] = 横滚：原始陀螺仪 #2 数据（未缩放为 deg/s）
- [3] = 俯仰：原始陀螺仪 #2 数据（未缩放为 deg/s）

`DUAL_GYRO_SCALED`：

- [0] = 横滚：已缩放的原始陀螺仪 #1 数据（已缩放为 deg/s）
- [1] = 俯仰：已缩放的原始陀螺仪 #1 数据（已缩放为 deg/s）
- [2] = 横滚：已缩放的原始陀螺仪 #2 数据（已缩放为 deg/s）
- [3] = 俯仰：已缩放的原始陀螺仪 #2 数据（已缩放为 deg/s）

`DUAL_GYRO_DIFF`：

- [0] = 横滚：陀螺仪 #1 的滤波数据 - 陀螺仪 #2 的滤波数据
- [1] = 俯仰：陀螺仪 #1 的滤波数据 - 陀螺仪 #2 的滤波数据
- [2] = 偏航：陀螺仪 #1 的滤波数据 - 陀螺仪 #2 的滤波数据
- [3] = [空]

`DUAL_GYRO_COMBINED`：（仅对开发者有用）

- [0] = [空]
- [1] = 横滚：滤波后的陀螺仪数据（与“gyro”曲线相同）
- [2] = 俯仰：滤波后的陀螺仪数据（与“gyro”曲线相同）
- [3] = [空]

`DUAL_GYRO_COMBINED`：（仅对开发者有用）

- [0] = [空]
- [1] = 横滚：滤波后的陀螺仪数据（与“gyro”曲线相同）
- [2] = 俯仰：滤波后的陀螺仪数据（与“gyro”曲线相同）
- [3] = [空]

## VTX

`SMARTAUDIO`：

- [0] = SmartAudio 版本 \* 100 + 设备模式
- [1] = 设备通道
- [2] = 设备频率
- [3] = 设备功率

`TRAMP`

- [0] = 状态
- [1] = 应答代码
- [2] = Pit 模式
- [3] = 重试计数

## 接收机

`SBUS`（FrSky SBUS）

- [0] = 帧标志
- [1] = 状态标志
- [2] = 帧时间
- [3] = 未使用

`FPORT`（FrSky FPORT）

- [0] = 帧间隔
- [1] = 帧错误
- [2] = 最后一次错误
- [3] = 遥测间隔

`GHST`（Ghost）

- [0] = CRC 错误计数
- [1] = RSSI
- [2] = 链路质量
- [3] = 未知帧计数

`CRSF_LINK_STATISTICS_UPLINK`

- [0] = 上行 RSSI 1
- [1] = 上行 RSSI 2
- [2] = 上行链路质量
- [3] = RF 模式

`CRSF_LINK_STATISTICS_UPLINK`

- [0] = 上行 RSSI 1
- [1] = 上行 RSSI 2
- [2] = 上行链路质量
- [3] = RF 模式

`CRSF_LINK_STATISTICS_PWR`

- [0] = 天线
- [1] = SNR
- [2] = 发射功率
- [3] = 未使用

`CRSF_LINK_STATISTICS_DOWN`

- [0] = 下行 RSSI
- [1] = 下行 LQ
- [2] = 下行 SNR
- [3] = 未使用

`RX_SFHSS_SPI`（基于 FrSky SPI 软件的接收机）

- [0] = 数据状态
- [1] = 缺失帧
- [2] = 最大偏移量
- [3] = 最小偏移量

`RX_EXPRESSLRS_PHASELOCK`（基于 ExpressLRS 软件的 PPL）

- [0] = rawOffsetUs：上一次定时器 tick 测得的瞬时相位偏移
- [1] = offsetUs：软件 PLL 使用的滤波后偏移值
- [2] = frequencyOffsetTicks：ELRS 发射机与接收机之间的频率偏移（单位为定时器 tick）
- [3] = phaseShiftUs：将在下一次定时器 tick 应用的当前瞬时相位偏移值

`RX_EXPRESSLRS_SPI`（ExpressLRS SPI 接收机）

- [0] = lostConnectionCounter：自启动以来连接丢失的次数
- [1] = rssiFiltered：由 sx1280/sx127x 上报的当前低通滤波 RSSI 值
- [2] = snr：由 sx1280/sx127s 上报的当前 SNR
- [3] = uplinkLQ：上行链路质量百分比

### 调试列表

部分固件构建中并非所有调试选项都可用。

| DEBUG TYPE                        |
| :-------------------------------- |
| DEBUG_CYCLETIME                   |
| DEBUG_BATTERY                     |
| DEBUG_GYRO                        |
| DEBUG_GYRO_FILTERED               |
| DEBUG_ACCELEROMETER               |
| DEBUG_PIDLOOP                     |
| DEBUG_GYRO_SCALED                 |
| DEBUG_RC_INTERPOLATION            |
| DEBUG_ANGLERATE                   |
| DEBUG_ESC_SENSOR                  |
| DEBUG_SCHEDULER                   |
| DEBUG_STACK                       |
| DEBUG_ESC_SENSOR_RPM              |
| DEBUG_ESC_SENSOR_TMP              |
| DEBUG_ALTITUDE                    |
| DEBUG_FFT                         |
| DEBUG_FFT_TIME                    |
| DEBUG_FFT_FREQ                    |
| DEBUG_RX_FRSKY_SPI                |
| DEBUG_RX_SFHSS_SPI                |
| DEBUG_GYRO_RAW                    |
| DEBUG_DUAL_GYRO_RAW               |
| DEBUG_DUAL_GYRO_COMBINED          |
| DEBUG_DUAL_GYRO_DIFF              |
| DEBUG_MAX7456_SIGNAL              |
| DEBUG_MAX7456_SPICLOCK            |
| DEBUG_SBUS                        |
| DEBUG_FPORT                       |
| DEBUG_RANGEFINDER                 |
| DEBUG_RANGEFINDER_QUALITY         |
| DEBUG_LIDAR_TF                    |
| DEBUG_ADC_INTERNAL                |
| DEBUG_RUNAWAY_TAKEOFF             |
| DEBUG_SDIO                        |
| DEBUG_CURRENT_SENSOR              |
| DEBUG_USB                         |
| DEBUG_SMARTAUDIO                  |
| DEBUG_RTH                         |
| DEBUG_ITERM_RELAX                 |
| DEBUG_ACRO_TRAINER                |
| DEBUG_RC_SMOOTHING                |
| DEBUG_RX_SIGNAL_LOSS              |
| DEBUG_RC_SMOOTHING_RATE           |
| DEBUG_ANTI_GRAVITY                |
| DEBUG_DYN_LPF                     |
| DEBUG_RX_SPEKTRUM_SPI             |
| DEBUG_DSHOT_RPM_TELEMETRY         |
| DEBUG_RPM_FILTER                  |
| DEBUG_D_MAX                       |
| DEBUG_AC_CORRECTION               |
| DEBUG_AC_ERROR                    |
| DEBUG_DUAL_GYRO_SCALED            |
| DEBUG_DSHOT_RPM_ERRORS            |
| DEBUG_CRSF_LINK_STATISTICS_UPLINK |
| DEBUG_CRSF_LINK_STATISTICS_PWR    |
| DEBUG_CRSF_LINK_STATISTICS_DOWN   |
| DEBUG_BARO                        |
| DEBUG_GPS_RESCUE_THROTTLE_PID     |
| DEBUG_DYN_IDLE                    |
| DEBUG_FF_LIMIT                    |
| DEBUG_FF_INTERPOLATED             |
| DEBUG_BLACKBOX_OUTPUT             |
| DEBUG_GYRO_SAMPLE                 |
| DEBUG_RX_TIMING                   |
| DEBUG_D_LPF                       |
| DEBUG_VTX_TRAMP                   |
| DEBUG_GHST                        |
| SCHEDULER_DETERMINISM             |
| TIMING_ACCURACY                   |
| DEBUG_RX_EXPRESSLRS_SPI           |
| DEBUG_RX_EXPRESSLRS_PHASELOCK     |
