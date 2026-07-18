# 社区预设

### 以下预设**_由社区制作，供社区使用_**。页面会标明预设面向的 BF 版本，以及发布推荐预设的飞手姓名。欢迎社区成员在此页面提交自己的预设；只需拥有一个 GitHub 账号即可。

### 重要提示：这些设置并非由 Betaflight 项目提供或背书。它们只是其他用户认为适合其特定四轴飞行器的示例，**未必适合您的机型**。更合理的用法是查看与您配置相近的方案，从中获得调参方向，而不是盲目复制和粘贴他人的设置。务必谨慎并在安全条件下测试。

使用时，将预设的 CLI 命令复制到 Betaflight Configurator 的 CLI 标签页并粘贴。粘贴后输入 `save`，再按 [Enter]；预设设置便会加载并保存，其中大部分可在 Configurator 的各标签页中查看。

# BF 4.2

Betaflight 4.2 搭配 Configurator 10.7 引入多项重要且实用的调参功能，其中许多都强烈推荐启用。

这些功能包括电池电压下垂补偿（VBat Sag Compensation）、前馈插值（Feed Forward Interpolation）、在 Setpoint 模式下正确工作的固定 I-Term Relax，以及可让滤波计算更稳定的环路时间改进。
现有功能同样可用于获得性能更佳、更稳健的调参，包括 DMin/Boost Gain 与 Advance、TPA 和推力线性化（Thrust Linearization）。

VBat Sag Compensation 的目标是在电池组可飞行的整个电压区间内保持一致的电机响应。它会在高电压时略微降低混控器的峰值电机输出，并随着电池电压下垂逐步提高输出。这项功能强烈推荐使用；但若您依赖“感到电压下垂”作为即将降落的信号，或担心损伤电池，尤其是相对高效机型上的 6S 电池，也可设置低于 100 的值以保留大部分收益。例如 `vbat_sag_comp = 70` 既能保留大部分效果，又会在满电时带来少量额外爆发力。

前馈（FF）插值已改进：它取 2 至 4 个遥控器设定点样本的滑动平均值作为前馈输入，再乘以 FF 增益。对于噪声较大或一致性较差的 RC 信号，例如 FrSky R9，`ff_interpolate_sp = 4` 有明显改善；对于 CRSFShot、AFHDS2A-IBUS 或 Futaba FASSTer 等较稳定的信号，其轨迹足够平滑，可使用 `ff_interpolate_sp = 2`（默认值）及更低的自动 RC 平滑度。具备长航程能力的 7 英寸机型使用约 8 的平滑度仍足够稳定。

I-Term Relax 现在可在 Setpoint 模式下正确处理低于 20 的数值。对于大型飞行器，较低的值可减少甚至完全消除翻滚和横滚后由 I-Term 导致的反弹。

DMin/Boost 工具，例如 DMin-Gain 和 DMin-Advance，可在打杆时（主要由 DMin Advance）及桨洗时（主要由 DMin Gain）提高有效 D 增益。Gain 设为 44 至 55、Advance 设为 80 至 100，可获得更高且更一致的 D-Term 响应以衰减 P-Term 阶跃响应；同时正常飞行时仍可保持较低的 DMin，不会放大高频噪声。

`thrust_linear` 用于将通常随油门位置呈二次关系的推力输出部分线性化，从而在整个油门范围内获得更一致的 PID 响应。在实际使用中，它最常用于提高低油门处的 PID 增益，以补偿控制余量较小的机型。低电压的 65 mm 和轻量 3 英寸四轴飞行器，以及使用较小电机的 6 至 8 英寸四轴飞行器，可尝试将 `thrust_linear` 设为 20 至 30，以消除低转速时的抖动和不稳定。通常还应同时提高 TPA（默认情况下可视为油门 D-Term 衰减系数）并提高断点，例如 `TPA = 0.72-0.78`、`TPA_Breakpoint = 1270-1420`。这种组合可提高低油门 PID 响应，又不会因高油门时放大的 D 增益使电机过热。

推荐主要使用 Configurator 10.7 的滑块调参。许多常见机型可依照以下标准流程快速调好：先确定合适的 P:D 增益比；逐步提高 P 和 D 增益，直至出现振荡或啸叫后回退 1 至 2 格；最后通过增益滑块及 Feed Forward Transition 调整前馈，直到获得所需的摇杆手感。Feed Forward Transition 会从摇杆中心开始线性降低有效前馈，并在指定杆量处恢复至全量。

注意：Configurator 10.7 的 D Ratio 调参滑块与旧版不同。向右移动滑块会增加 D 增益，而 P 增益保持不变。P:D Balance 滑块为 1.2 时，P≈D；为 1.0 时，D 增益约为 P 增益的 0.8 倍。

动态陷波滤波器范围以最小和最大 Hz 表示。若将 BF 4.1.x 的调参迁移至 BF 4.2，必须把 `dyn_notch_max_hz` 改为实际的赫兹数值；大多数应用建议设为 `dyn_notch_max_hz = 350`。

## 飞手：Krunked

简介：这是我推荐所有人尝试的基础调参。可能需要少量调整，但对 99% 的飞手都有很好的效果。必须配合下方强调的 ESC 设置与 RPM 滤波使用。
F7 = DShot600 8k8k, F4 = DShot300 8k4k..  
许多人抱怨 4.2 的“晃动”；配合正确的 P/D 增益，`thrust_linear = 25` 可解决这个问题。48 kHz 会损失部分低转速扭矩，而该设置会在零油门时提高 PID 作用，恢复低油门控制余量。尽管如此，48 kHz 在我使用过的所有四轴飞行器，以及采用这些设置的其他飞手机型上，整体飞行表现均明显更好。

### 5 英寸四轴基础调参：48 kHz、23° 电机正时、解磁补偿设为高、`thrust_linear = 25`

<details>
    <summary>Krunked 的通用 5 英寸 CLI 设置（复制/粘贴）</summary>

```python
# ESC SETTINGS
# 48khz, 23 motor timing, demag high *this is important for this tune*

#Settings for 5inch quads
set feedforward_transition = 100 #this just makes FF attenuated across the stick, reducing its effect near center stick and being 100% engaged at full deflection
set iterm_relax_cutoff = 10
set ff_spike_limit = 55
set ff_smooth_factor = 50
set ff_boost = 0
set vbat_sag_compensation = 100
set anti_gravity_gain = 7000
set iterm_windup = 30
set pidsum_limit = 1000
set thrust_linear = 25 # this is the golden setting for wobbles and 48khz
set rc_smoothing_derivative_type = PT1
set rc_smoothing_auto_smoothness = 20

# PID settings for 5 inch quads 48khz 23 timing
# sliders = 1.0 master, 1.3 pd balance, 1.2 pd gain, 1.5 stick response, DMIN OFF.
set p_pitch = 55
set d_pitch = 50
set f_pitch = 143
set p_roll = 50
set d_roll = 46
set f_roll = 135
set p_yaw = 54
set f_yaw = 135
set d_min_roll = 0
set d_min_pitch = 0

#FILTER settings (these are safe for any quad, you can get more aggressive based on your gyro logs and noise profiles, but these are good to start)
# set gyro_rpm_notch_q = 800 # use this if u want to reduce delay further, but only if you have noise free using 800.
set gyro_lowpass_hz = 300
set gyro_lowpass2_hz = 0
set dyn_notch_width_percent = 8 # feel free to use 0 here, if you don't have noise....
set dyn_notch_q = 200 # this can go to 250, if 250 is sufficient and crushing any resonance/peak noise bleeding around the rpm notches
set dyn_notch_min_hz = 90
set dyn_notch_max_hz = 450
set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 225
set dyn_lpf_dterm_curve_expo = 10 # this setting makes the dyn lpf on D shoot up must faster in the throttle range, reducing delay
set dterm_lowpass2_hz = 250

# krunked freestyle rates
set rates_type = KISS
set roll_rc_rate = 145
set pitch_rc_rate = 145
set yaw_rc_rate = 143
set roll_expo = 22
set pitch_expo = 22
set yaw_expo = 18
set roll_srate = 75
set pitch_srate = 75
set yaw_srate = 74

save
```

</details>

## 飞手：Tehllama

简介：Tehllama 偏好竞速手感；这套竞速速率旨在将阶跃响应延迟降至最低，并尽可能保留电机温度余量。
虽然可进一步提高调参激进程度，但这套竞速配置为桨叶受损后完成一个计时回合留出了较大余量。

<details>
    <summary>Tehllama 的通用 CLI 设置（复制/粘贴）</summary>

```python
# Settings for All Quadcopters
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set yaw_motors_reversed = ON
set small_angle = 180

# LlamaRates - 360°/s on Roll/Pitch, 270°/s on Yaw
set roll_rc_rate = 72
set pitch_rc_rate = 72
set yaw_rc_rate = 54
set roll_expo = 0
set pitch_expo = 0
set yaw_expo = 0
set roll_srate = 60
set pitch_srate = 60
set yaw_srate = 60

#LaunchControl_Preferred
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

save
```

</details>

### 竞速配置：RotorBuild 装机链接及 CLI 调参（复制/粘贴）

---

#### Gemfan 3016-3（Diatone GTB-339）：3 英寸、1105 5500KV、3S [F411，DShot300]

<details>
<summary>
CLI 复制/粘贴
</summary>

```python

# For these lightweight 3" Craft, 48kHz PWM, Bidirectional DShot, MedHigh/23° Timing, 0.25 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters
set gyro_lowpass_hz = 275
set gyro_lowpass2_hz = 425
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 444
set dyn_lpf_gyro_min_hz = 0

# Configuration - 1105/1106/1204 Motors
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set motor_poles = 12
set dshot_idle_value = 475  # Dynamic Idle Set Below

set tpa_rate = 72
set tpa_breakpoint = 1370

# Profiles 3S and 2S - Uses Thrust_Linear
set thrust_linear = 20
profile 0
# profile 0 - 3S for 450-550 mAh batteries
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 333
set dterm_lowpass2_hz = 225
set vbat_sag_compensation = 70
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 115
set throttle_boost = 8
set p_pitch = 51
set i_pitch = 72
set d_pitch = 44
set f_pitch = 238
set p_roll = 47
set i_roll = 68
set d_roll = 40
set f_roll = 222
set p_yaw = 50
set i_yaw = 72
set f_yaw = 222
set d_min_roll = 28
set d_min_pitch = 30
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 3
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 20
set dyn_idle_min_rpm = 16

profile 1
# profile 1 - 2S for 450-650mAh batteries
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 288
set dterm_lowpass2_hz = 240
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 115
set throttle_boost = 10
set p_pitch = 67
set i_pitch = 81
set d_pitch = 55
set f_pitch = 238
set p_roll = 60
set i_roll = 77
set d_roll = 50
set f_roll = 222
set p_yaw = 65
set i_yaw = 81
set f_yaw = 222
set d_min_roll = 38
set d_min_pitch = 35
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 2
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 25
set dyn_idle_min_rpm = 16

save
```

</details>

---

#### Gemfan 3052-3：3 英寸、1408 4100KV、4S

装机链接：[https://rotorbuilds.com/build/18675]

<details>
<summary>
CLI 复制/粘贴
</summary>

```python

# For these lightweight 3" Craft, 48kHz PWM, Bidirectional DShot, MedHigh/23° Timing, 0.25 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 333
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000

# Configuration - 1407/1408 Motors
# Users of 1507 motors should verify by counting magnets
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set motor_poles = 12

# Profiles - Aggressive Props
set thrust_linear = 20

set gyro_rpm_notch_harmonics = 2
set gyro_rpm_notch_q = 750


profile 0
# profile 0 - 3S 650-1000mAh batteries
set dyn_lpf_dterm_min_hz = 112
set dyn_lpf_dterm_max_hz = 272
set dterm_lowpass2_hz = 240
set vbat_sag_compensation = 88
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 111
set throttle_boost = 10
set p_pitch = 64
set d_pitch = 56
set f_pitch = 190
set p_roll = 59
set d_roll = 52
set f_roll = 180
set p_yaw = 63
set f_yaw = 180
set d_min_roll = 39
set d_min_pitch = 42
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 3
# Launch Stand Mode
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 22
set dyn_idle_min_rpm = 16

profile 1
# profile 1 - 4S for 520-850mAh batteries
set dyn_lpf_dterm_min_hz = 112
set dyn_lpf_dterm_max_hz = 320
set dyn_lpf_dterm_curve_expo = 8
set dterm_lowpass2_hz = 240
set vbat_sag_compensation = 70
set anti_gravity_gain = 4400
set iterm_rotation = ON
set iterm_relax = RPY
set iterm_relax_cutoff = 33
set yaw_lowpass_hz = 111
set i_pitch = 81
set f_pitch = 190
set p_roll = 41
set i_roll = 77
set f_roll = 180
set i_yaw = 81
set f_yaw = 180
set d_min_roll = 25
set d_min_pitch = 27
set d_min_boost_gain = 33
set d_min_advance = 0
set auto_profile_cell_count = 4
# Launch Stand Mode
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set dyn_idle_min_rpm = 16

save
```

</details>

---

#### Neutron-R Hybrid-SX：5 英寸、2150KV 6S / 2650KV 5S，Gemfan 51433/51466/51477

装机链接：[https://rotorbuilds.com/build/18676]

构建链接：[https://rotorbuilds.com/build/21176]

<details>
<summary>
CLI 复制/粘贴
</summary>

```python

# For racing 5" craft, preferred ESC settings are 48kHz PWM, 23° Timing, 0.25 Rampup Power, DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set small_angle = 180

# Filters - Aggressive
set gyro_lowpass_hz = 222
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 333
set dyn_notch_min_hz = 115
set dyn_notch_max_hz = 444
set dyn_lpf_gyro_min_hz = 0
set dshot_idle_value = 440
set dshot_bidir = ON

# Profiles - Aggressive
set gyro_rpm_notch_harmonics = 2
set gyro_rpm_notch_q = 750

# Default PID/Filter profile - 6S
profile 0
set auto_profile_cell_count = 6
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 288
set dyn_lpf_dterm_curve_expo = 8
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 70
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set p_pitch = 41
set i_pitch = 72
set d_pitch = 40
set p_roll = 37
set i_roll = 68
set d_roll = 37
set p_yaw = 40
set i_yaw = 72
set d_min_roll = 24
set d_min_pitch = 26
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 15
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# Auto-Applies for 5S
profile 1
set auto_profile_cell_count = 5
set dyn_lpf_dterm_min_hz = 105
set dyn_lpf_dterm_max_hz = 266
set dyn_lpf_dterm_curve_expo = 9
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 75
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set i_pitch = 81
set d_pitch = 45
set p_roll = 41
set i_roll = 77
set d_roll = 41
set i_yaw = 81
set d_min_roll = 27
set d_min_pitch = 30
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 18
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# Auto-Applies for 4S
profile 2
set auto_profile_cell_count = 4
set dyn_lpf_dterm_min_hz = 98
set dyn_lpf_dterm_max_hz = 238
set dyn_lpf_dterm_curve_expo = 10
set dterm_lowpass2_hz = 210
set vbat_sag_compensation = 80
set anti_gravity_gain = 5000
set iterm_rotation = ON
set iterm_relax = RPY
set yaw_lowpass_hz = 105
set p_pitch = 55
set d_pitch = 55
set p_roll = 50
set d_roll = 50
set p_yaw = 54
set d_min_roll = 33
set d_min_pitch = 36
set f_pitch = 190
set f_roll = 180
set f_yaw = 180
set d_min_boost_gain = 33
set d_min_advance = 0
set ff_max_rate_limit = 102
set ff_smooth_factor = 33
set ff_boost = 21
# Launch Stand Operations - First Arm Only
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

# restore default profile selection
profile 0

save
```

</details>

---

#### 7 英寸：2408 1622KV 6S / 2507 1500KV 6S / 2408 1900KV 5S

构建链接：[https://rotorbuilds.com/build/21178]

构建链接：[https://rotorbuilds.com/build/10199]

<details>
<summary>
CLI 复制/粘贴
</summary>

```python

# For these 7" Craft, I use 48kHz PWM, Med/19° Timing, 0.125 Startup Power, and DemagComp=Low

# Settings for All Quadcopters - Motors Reversed
set debug_mode = GYRO_SCALED
set iterm_relax = RPY
set vbat_pid_gain = OFF
set vbat_sag_compensation = 70
set yaw_lowpass_hz = 100
set yaw_motors_reversed = ON
set small_angle = 180

# Filters - 7" Biblade, 7" Triblade, F7 Folding Compatible
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 333
set dyn_notch_min_hz = 80
set dyn_notch_max_hz = 270
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000

# Configuration - Racing, Mountain Surfing, Cinematic Cruising, and Chasing Fast Cars
set dshot_bidir = ON
set motor_pwm_protocol = DSHOT300
set rc_smoothing_auto_smoothness = 20
set ff_interpolate_sp = AVERAGED_3
set feedforward_transition = 33

# Profile - Low-Throttle Smoothness Enhanced
set dyn_lpf_dterm_min_hz = 91
set dyn_lpf_dterm_max_hz = 221
set dterm_lowpass2_hz = 150
set iterm_rotation = ON
set thrust_linear = 33 # This is a fairly high thrust_linear value, but for lower authority (2408, 2507) this is what I've found works
set tpa_rate = 75
set tpa_breakpoint = 1350
set iterm_relax_type = SETPOINT
set iterm_relax_cutoff = 7
set throttle_boost = 15
set p_pitch = 72
set i_pitch = 117
set d_pitch = 72
set f_pitch = 148
set p_roll = 65
set i_roll = 111
set d_roll = 65
set f_roll = 140
set p_yaw = 70
set i_yaw = 117
set f_yaw = 140
set d_min_roll = 43
set d_min_pitch = 47
set d_min_boost_gain = 44
set d_min_advance = 100
set dshot_idle_value = 399
set idle_min_rpm = 12

# LaunchControl_Preferred - Yes, I do actually use launch mode on my Long Range rigs
set launch_control_mode = PITCHONLY
set launch_trigger_allow_reset = OFF
set launch_angle_limit = 60

save
```

</details>

## 飞手：Furadi

<details>
<summary>
Furadi 5 英寸 NBD Infinity CLI 设置（复制/粘贴）
</summary>

四轴飞行器配置（非推广链接）

- RR CL1 [https://tinyurl.com/trq8dat]
- NBD Infinity 20x20 [https://tinyurl.com/wgatgat]
- Hypetrain Vanover [https://tinyurl.com/rdoaxpb]
- Caddx Vista [https://tinyurl.com/rebl4xy]
- GoPro 相机座（Hero Mount）- [https://tinyurl.com/ycblvodd]
- Pyrodrone 1100 6s - [https://tinyurl.com/wtd7jph]
- Gemfan 51466 - [https://tinyurl.com/ycjn76ag]

```python
# DIFF for Furadi 5" NBD Infinity Build

# name: INFINITY

# master
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000
set dshot_bidir = ON
set yaw_motors_reversed = OFF
set yaw_deadband = 10

profile 0

# profile 0
set dyn_lpf_dterm_min_hz = 140
set dyn_lpf_dterm_max_hz = 340
set dyn_lpf_dterm_curve_expo = 7
set dterm_lowpass2_hz = 300
set vbat_sag_compensation = 50
set throttle_boost = 0
set p_pitch = 90
set i_pitch = 117
set d_pitch = 60
set f_pitch = 112
set p_roll = 82
set i_roll = 111
set d_roll = 55
set f_roll = 105
set p_yaw = 88
set i_yaw = 117
set f_yaw = 105
set d_min_roll = 36
set d_min_pitch = 39
set d_min_advance = 32

rateprofile 0

# rateprofile 0 - Furadi Rates
set rates_type = KISS
set roll_rc_rate = 90
set pitch_rc_rate = 90
set yaw_rc_rate = 90
set roll_srate = 77
set pitch_srate = 75
save
```

</details>

<details>
<summary>
Furadi 7 英寸 FR-7 NBD Infinity CLI 设置（复制/粘贴）
</summary>

FR7：

机架文件 - [https://www.thingiverse.com/thing:359...]
打印文件 - [https://www.thingiverse.com/thing:360...]

Newbeedrone Infinity Stack - [https://tinyurl.com/ulqey7j]
Hyperlite 2408.5 1922kv - [https://tinyurl.com/r7jkk3m]
Dynogy 6s 3700 65c - [https://tinyurl.com/w5wmtf7]
HQ 7x4x3 - [https://tinyurl.com/uvvdu96]
Lumenier AXII 2 LR - [https://tinyurl.com/u9la6zg]

```python
# DIFF for Furadi 7" NBD Infinity Build

# master
set gyro_lowpass2_hz = 500
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_lpf_gyro_min_hz = 400
set dyn_lpf_gyro_max_hz = 1000
set dshot_bidir = ON

# GPS Setup (Optional)
set failsafe_procedure = GPS-RESCUE
set yaw_motors_reversed = OFF
set gps_provider = UBLOX
set gps_sbas_mode = AUTO
set gps_ublox_use_galileo = ON
set gps_set_home_point_once = ON
set gps_rescue_initial_alt = 60
set gps_rescue_descent_dist = 120
set gps_rescue_min_sats = 6
set gps_rescue_allow_arming_without_fix = ON
set gps_rescue_alt_mode = FIXED_ALT
set yaw_deadband = 10
set pid_process_denom = 2

profile 0

# profile 0
set dyn_lpf_dterm_min_hz = 140
set dyn_lpf_dterm_max_hz = 340
set dterm_lowpass2_hz = 300
set vbat_sag_compensation = 80
set throttle_boost = 0
set p_pitch = 77
set i_pitch = 108
set d_pitch = 58
set f_pitch = 114
set p_roll = 71
set i_roll = 102
set d_roll = 53
set f_roll = 108
set p_yaw = 76
set i_yaw = 108
set f_yaw = 108
set d_min_roll = 35
set d_min_pitch = 38
set d_min_advance = 27

# rateprofile 0 - Furadi Rates
set rates_type = KISS
set roll_rc_rate = 90
set pitch_rc_rate = 90
set yaw_rc_rate = 90
set roll_srate = 77
set pitch_srate = 75
save
```

</details>

## 飞手：JJang FPV

简介：提供“灵敏但顺滑”的手感，适用于搭载 GoPro 6/7/8、使用 4S 电池的普通 5 英寸花式飞行机型（电影感、Juicy 风格等）。可完全消除桨洗。

注意：应启用“双向 DShot”以使用 RPM 滤波，并将 `idle_min_rpm` 设为约 `dshot_idle_rpm` 的 70%，或先从 `21` 开始。

<details>
<summary>
JJang 的 PID：5 英寸 4S 常规花式飞行 CLI 设置（复制/粘贴）
</summary>

```python
set gyro_lowpass2_hz = 300
set dyn_notch_width_percent = 0
set dyn_notch_q = 250
set dyn_notch_min_hz = 90
set dyn_notch_max_hz = 515
set dyn_lpf_gyro_min_hz = 240
set dyn_lpf_gyro_max_hz = 600
set min_check = 1020
set max_check = 1995
set rc_smoothing_auto_smoothness = 7
set blackbox_device = NONE
set min_throttle = 1020
set dshot_idle_value = 500
set dshot_bidir = ON
set use_unsynced_pwm = OFF
set motor_pwm_protocol = DSHOT300
set deadband = 2
set yaw_deadband = 2
set pid_process_denom = 2
set gyro_rpm_notch_q = 700
set dyn_lpf_dterm_min_hz = 84
set dyn_lpf_dterm_max_hz = 204
set dyn_lpf_dterm_curve_expo = 7
set dterm_lowpass2_hz = 180
set vbat_sag_compensation = 100
set anti_gravity_gain = 3900
set feedforward_transition = 40
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 20
set yaw_lowpass_hz = 100
set throttle_boost = 7
set throttle_boost_cutoff = 25
set p_pitch = 65
set i_pitch = 104
set d_pitch = 58
set f_pitch = 116
set p_roll = 60
set i_roll = 99
set d_roll = 54
set f_roll = 109
set p_yaw = 69
set i_yaw = 99
set f_yaw = 109
set d_min_roll = 35
set d_min_pitch = 39
set ff_interpolate_sp = AVERAGED_3
set ff_spike_limit = 70
set ff_smooth_factor = 40
set idle_min_rpm = 21
set roll_rc_rate = 120
set pitch_rc_rate = 120
set yaw_rc_rate = 175
set roll_expo = 15
set pitch_expo = 15
set yaw_expo = 20
set roll_srate = 72
set pitch_srate = 75
set yaw_srate = 41
set tpa_rate = 70
set tpa_breakpoint = 1150
set throttle_limit_type = CLIP
set throttle_limit_percent = 98

save
```

</details>

# BF 4.1.X

Betaflight 4.1.X 搭配 Configurator 10.6。

注意：Configurator 10.6 的 P:D Ratio 滑块方向与后续版本相反。在 10.6 中，向右移动滑块会提高 P 增益并降低 D 增益；10.7 并非如此。PD Balance 滑块为 0.8 时，P≈D；为 1.0 时，D 增益约为 P 增益的 0.8 倍。

4.1.X 新增了一些功能，但也存在几个值得注意的问题。

在 BF 4.1.X 中，启用双向 DShot 功能（RPM 滤波和动态怠速）以及通过 Configurator 参数配置 RC Smoothing 都更简单。RPM 陷波滤波器会衰减电机噪声频段；为充分获得 RPM 滤波带来的改善，通常还需要调整低通滤波，尤其是动态低通滤波。

此版本引入前馈（FF）插值：它以 2 个遥控器设定点样本的滑动平均值作为前馈输入，再乘以 FF 增益。对于噪声较大或一致性较差的 RC 信号，例如 FrSky R9，使用 `ff_interpolate_sp = averaged` 会有改善；BF 4.2 及之后的版本可要求更多样本，最多 4 个。

Setpoint 模式下的 I-Term Relax 对低于 20 的数值无实际效果。对于需要较低 I-Term Relax 值的大型飞行器，或依赖移除 I-Term 影响来调节 P/D 比和增益的策略，应改用 Gyro 模式；在 4.2 及之后的版本中可重新使用 Setpoint 模式。

VBat PID Compensation 通常有助于调参飞行；在进行 Blackbox 记录，或重视电池电压接近下垂时的控制余量时，建议启用。BF 4.2 中已由 VBat Sag Compensation 有效取代它。

推荐主要使用 Configurator 10.6 的滑块调参。许多常见机型可按标准流程快速调好：先确定合适的 P:D 增益比，逐步提高 P 和 D 增益，直至出现振荡或啸叫后回退 1 至 2 格；最后通过增益滑块和 Feed Forward Transition 调整前馈，直至达到所需的摇杆手感。后者会从摇杆中心开始线性降低有效前馈，并在指定杆量处恢复到全量。

完全可以使用更高的偏航 P 增益，尽管滑块无法这样设置。BF 4.2 的默认值在相同的有效 PID 增益下允许偏航 P 增益等于横滚 P 增益，并且对大多数飞行器效果良好。因此，若调参时需要更高的偏航 P 增益，无须担心，可继续提高直到与横滚 P 增益相同。

# BF 4.0.X

---

#### 返回 BF 4.0.x 默认值

此预设会将您的设置恢复为 BF 4.0.x 默认值。

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 150

set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 450
set gyro_lowpass_hz = 0
set gyro_lowpass_type = BiQUAD
set gyro_lowpass2_hz = 150
set gyro_lowpass2_type = PT1

set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 100

set dyn_notch_width_percent = 8 #Dual Dynamic Notches is as default; 8% spread from center to center.

#PID Gains Settings
set vbat_pid_gain = OFF
set anti_gravity_gain = 5000
set p_pitch = 46
set i_pitch = 70
set d_pitch = 38
set f_pitch = 75

set p_roll = 42
set i_roll = 60
set d_roll = 35
set f_roll = 70

set p_yaw = 35
set i_yaw = 100
set d_yaw = 0
set f_yaw = 0

set d_min_pitch = 20
set d_min_roll = 22
set d_min_boost_gain = 27
set d_min_advance = 20

set pidsum_limit = 500 #restricted to 50% by default

#For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = Setpoint
set iterm_relax_cutoff = 20

#TPA Settings (which is D-term only by default)
set tpa_rate = 50
set tpa_breakpoint = 1500
save
```

</details>

---

## 飞手：UAV TECH

**短暂前飞约 15 秒后，务必检查电机温度。**

**警告：若未解决机械或电气问题（大多数问题通常源于此），以下设置可能需要更重的滤波和更低的 PID 增益，即使用 BF 默认值。** 更重的滤波和更低的 PID 增益可降低电机温度，但会牺牲飞行性能。

“干净的装机”是指在一次全程且激烈的飞行中，原始陀螺仪噪声轨迹（`debug_mode = GYRO_SCALED`）的频谱图达到下图所示或更好的水平：

![https://github.com/spatzengr/UAVtech-Resources/blob/master/Gyro_Raw%20Noise%20Profiles/Clean/Nova%20on%20BF4.0.png]

“更好”是指频谱线更低，或共振峰更清晰。一个重要指标是 80 Hz 至 200 Hz 区间内原始电机振动（“噪声”）较低。

---

#### 无刷 Whoop 级（基于 2S Mobula 7）

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 100

set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 300
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 0
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 0

set dyn_lpf_dterm_min_hz = 70
set dyn_lpf_dterm_max_hz = 170
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 80
set i_pitch = 25
set d_pitch = 80
set f_pitch = 100

set p_roll = 80
set i_roll = 25
set d_roll = 80
set f_roll = 100

set p_yaw = 90
set i_yaw = 90
set d_yaw = 0
set f_yaw = 100

set d_min_pitch = 0
set d_min_roll = 0
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 2 至 3 英寸四轴飞行器：11xx 至 12xx 电机

`（与 George Hartmann 协作）`

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set gyro_lowpass_type = BiQUAD
set dyn_notch_min_hz = 150
set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 700
set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass2_hz = 150

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 33
set i_pitch = 85
set d_pitch = 35

set p_roll = 28
set i_roll = 78
set d_roll = 32

set d_min_pitch = 18
set d_min_roll = 16
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

#### 3 英寸四轴飞行器：14xx 至 15xx 电机

`（与 George Hartmann 协作）`

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set gyro_lowpass_type = BiQUAD
set dyn_notch_min_hz = 150
set dyn_lpf_gyro_min_hz = 150
set dyn_lpf_gyro_max_hz = 650
set dyn_lpf_dterm_min_hz = 150
set dyn_lpf_dterm_max_hz = 250
set dterm_lowpass_type = BiQUAD
set dterm_lowpass2_hz = 150

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 5000

set p_pitch = 38
set i_pitch = 85
set d_pitch = 35

set p_roll = 35
set i_roll = 78
set d_roll = 32

set d_min_pitch = 18
set d_min_roll = 16
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

#### 5 英寸四轴飞行器：Setpoint Tracker，较低截止频率滤波（滤波更重）

适用于：起飞重量（AUW）650 g 至 725 g 的四轴飞行器，角速率（Rates）1000 至 1100 度/秒。

适用于 50 Hz 至 200 Hz 区间存在噪声的四轴飞行器。

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_gyro_max_hz = 0
set gyro_lowpass_hz = 0
set gyro_lowpass_type = PT1
set gyro_lowpass2_hz = 200
set gyro_lowpass2_type = PT1


set dyn_lpf_dterm_min_hz = 0
set dyn_lpf_dterm_max_hz = 0
set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = BiQUAD
set dterm_lowpass2_hz = 125

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 60
set i_pitch = 70
set d_pitch = 60
set f_pitch = 350

set p_roll = 65
set i_roll = 60
set d_roll = 65
set f_roll = 325

set p_yaw = 100
set i_yaw = 100
set d_yaw = 0
set f_yaw = 125

set d_min_pitch = 45
set d_min_roll = 45
set d_min_boost_gain = 30
set d_min_advance = 0
set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 5 英寸四轴飞行器：Setpoint Tracker，较高截止频率滤波（滤波更轻）

适用于：起飞重量（AUW）650 g 至 725 g 的四轴飞行器，角速率（Rates）1000 至 1100 度/秒。

适用于 50 Hz 至 200 Hz 区间没有噪声的四轴飞行器。

**要求四轴飞行器在 50 Hz 至 200 Hz 区间完全没有噪声问题。若不能确定，请先使用上方的预设；若效果良好，再尝试这些设置。**

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_gyro_max_hz = 0
set gyro_lowpass_hz = 0
set gyro_lowpass_type = PT1
set gyro_lowpass2_hz = 0
set gyro_lowpass2_type = PT1

set dyn_lpf_dterm_min_hz = 80
set dyn_lpf_dterm_max_hz = 175
set dterm_lowpass_type = BiQUAD
set dterm_lowpass_hz = 0
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 60
set i_pitch = 70
set d_pitch = 60
set f_pitch = 350

set p_roll = 65
set i_roll = 60
set d_roll = 65
set f_roll = 325

set p_yaw = 100
set i_yaw = 100
set d_yaw = 0
set f_yaw = 125

set d_min_pitch = 45
set d_min_roll = 45
set d_min_boost_gain = 30
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### 6 / 7 英寸四轴飞行器

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 100
set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 300
set dyn_lpf_dterm_min_hz = 100
set dyn_lpf_dterm_max_hz = 200
set dterm_lowpass_type = PT1
set dterm_lowpass2_hz = 0

#For RPM Filter: Without RPM leave at = 8 (default)
#Set to 0 if you can afford less Dynamic Notch filtering because RPM is added (reduces to one notch instead of two on DN)
#set dyn_notch_width_percent = 8

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000

set d_pitch = 58
set d_roll = 55

set d_min_pitch = 28
set d_min_roll = 25
set d_min_boost_gain = 45
set d_min_advance = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

#### X 级 [开发中]

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 50
set dyn_lpf_gyro_min_hz = 50
set dyn_lpf_gyro_max_hz = 200
set dyn_lpf_dterm_min_hz = 60
set dyn_lpf_dterm_max_hz = 150
set dterm_lowpass_type = BIQUAD
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set d_pitch = ??
set d_roll = ??
set d_min_pitch = ??
set d_min_roll = ??
set d_min_boost_gain = 45
set d_min_advance = 0

#Assumes Freestyle | For racing use "Setpoint" and cutoff = 20
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1750
save

```

</details>

---

#### PID 调参预设

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set dyn_notch_min_hz = 80
set gyro_lowpass_type = PT1
set dyn_lpf_gyro_min_hz = 100
set dyn_lpf_gyro_max_hz = 350
set gyro_lowpass2_hz = 0
set dterm_lowpass_type = BiQUAD
set dyn_lpf_dterm_min_hz = 80
set dyn_lpf_dterm_max_hz = 175
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000

set f_pitch = 0
set f_roll = 0
set f_yaw = 0

set d_min_pitch = 0
set d_min_roll = 0

set pidsum_limit = 1000 #unleashes PID Sum to be 100% (not restricted to 50% by default)

#PID Controller Settings
set feedforward_transition = 0
set abs_control_gain = 0
set use_integrated_yaw = OFF
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 10

#TPA Settings (which is D-term only by default)
set tpa_rate = 80
set tpa_breakpoint = 1800
save

```

</details>

---

## 飞手：RipperDrone

#### 5 英寸四轴飞行器（5S 至 6S）

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Filter Settings
set gyro_lowpass_type = PT1
set dyn_notch_min_hz = 100
set dyn_lpf_gyro_max_hz = 510
set dterm_lowpass_type = PT1
set dterm_lowpass2_hz = 0

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 10000
set p_pitch = 35
set d_pitch = 25
set f_pitch = 32
set p_roll = 33
set d_roll = 23
set f_roll = 30
set p_yaw = 30
set i_yaw = 90
set d_min_roll = 0
set d_min_pitch = 0

```

</details>

---

## 飞手：CUDA KEER

#### [3 英寸 Toothfairy，Emax RS1306b，BF 4.2](https://github.com/cudakeer808/betaflight/wiki/3%22-toothfairy-with-Emax-1306-4000kv-BF4.2)

#### [Floss 2.1 Hybrid，Hyperlite 2207 1922KV，BF 4.2 竞速机](https://github.com/cudakeer808/betaflight/wiki/floss-2.1-2207-1922-BF4.2)

#### [6 英寸 Floss 2.1，Hyperlite 2207 1922KV，BF 4.0 竞速机](https://github.com/cudakeer808/betaflight/wiki/floss-2.1-2207-1922-rpm_filter)

#### [5 英寸 Massive Droner，T-Motor F60pro II](https://github.com/cudakeer808/betaflight/wiki/Massive-Droner-2207-1750kv)

---

## 飞手：TehLlama

#### 6 英寸 Neutron-R，BrotherHobby R6 2207 竞速机

##### [装机详情](https://rotorbuilds.com/build/18676)

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
# Filter Settings
set dyn_lpf_dterm_min_hz = 91
set dyn_lpf_dterm_max_hz = 221
set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 150
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 225

#PID Gains Settings
set vbat_pid_gain = ON
set anti_gravity_gain = 3000
set p_pitch = 53
set i_pitch = 70
set d_pitch = 37
set f_pitch = 180
set p_roll = 48
set i_roll = 68
set d_roll = 34
set f_roll = 170
set p_yaw = 40
set i_yaw = 80
set d_yaw = 0
set f_yaw = 100
set d_min_pitch = 24
set d_min_roll = 27

# This is my preferred, but unconventional iTermRelax Setup - relies on FF to push Yaw axis around
set iterm_relax = RPY
set iterm_relax_type = SETPOINT
set iterm_relax_cutoff = 12

# Rates - These are good novice racer rates
# Max stick deflection values are 375°/375°/275° rates (R/P/Y)
set rates_type = BETAFLIGHT
set roll_rc_rate = 75
set pitch_rc_rate = 75
set yaw_rc_rate = 55
set roll_expo = 0
set pitch_expo = 0
set yaw_expo = 0
set roll_srate = 60
set pitch_srate = 60
set yaw_srate = 60


```

</details>

---

## 将 BF 4.0.x 默认值回退为旧版 Betaflight 默认值

这些预设可应用于 BF 4.0.x，以恢复旧版 Betaflight 的默认设置。若您偏好旧版飞行体验，但仍希望使用 BF 4.0.x 的新功能，可使用这些预设。

#### 恢复到 BF 3.5.X

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Features to be off by Default
feature -AIRMODE

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 100
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 300

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set dyn_notch_range = Auto
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 130

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 50
set i_pitch = 50
set d_pitch = 27
set f_pitch = 60
set p_roll = 46
set i_roll = 45
set d_roll = 25
set f_roll = 60
set p_yaw = 65
set i_yaw = 45
set d_yaw = 0
set f_yaw = 60

#PID Controller Settings
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 11
set abs_control_gain = 0
set use_integrated_yaw = OFF

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>

---

#### 恢复到 BF 3.4.X

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Features to be off by Default
feature -AIRMODE

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 100
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 300

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set dyn_notch_range = Low
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 125

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 200

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 50
set i_pitch = 50
set d_pitch = 27
set f_pitch = 150
set p_roll = 46
set i_roll = 45
set d_roll = 25
set f_roll = 150
set p_yaw = 70
set i_yaw = 45
set d_yaw = 0
set f_yaw = 0

#PID Controller Settings
set feedforward_transition = 0
set abs_control_gain = 0
set use_integrated_yaw = OFF
set anti_gravity_gain = 5000

#I-term Relax is OFF by Default
set iterm_relax_type = Setpoint
set iterm_relax_cutoff = 100
#if you turn on i-Term Relax, 3.4 defaults are below (take "#" off front)
#set iterm_relax_type = Gyro
#set iterm_relax_cutoff = 11

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>

---

#### 恢复到 BF 3.2.x 和 3.3.X（它们是相同的）

<details>
<summary>
CLI 复制\粘贴
</summary>

```python
#Features to be off by Default
feature -AIRMODE
feature -DYNAMIC_FILTER
feature -ANTI_GRAVITY

# Filter Settings
set gyro_lowpass_type = PT1
set gyro_lowpass_hz = 90
set gyro_lowpass2_type = PT1
set gyro_lowpass2_hz = 0

set dyn_lpf_gyro_min_hz = 0
set dyn_lpf_dterm_min_hz = 0

set gyro_notch1_hz = 400
set gyro_notch1_cutoff = 300
set gyro_notch2_hz = 200
set gyro_notch2_cutoff = 100

set dyn_notch_range = Low
set dyn_notch_width_percent = 0
set dyn_notch_q = 70
set dyn_notch_min_hz = 125

set dterm_lowpass_type = BIQUAD
set dterm_lowpass_hz = 100
set dterm_lowpass2_type = PT1
set dterm_lowpass2_hz = 0
set dterm_notch_hz = 260
set dterm_notch_cutoff = 160

set d_min_roll = 0
set d_min_pitch = 0
set d_min_yaw = 0

# Default PIDs
set p_pitch = 58
set i_pitch = 50
set d_pitch = 35
set f_pitch = 0
set p_roll = 40
set i_roll = 40
set d_roll = 30
set f_roll = 0
set p_yaw = 70
set i_yaw = 45
set d_yaw = 0
set f_yaw = 0

#PID Controller Settings
set feedforward_transition = 0
set iterm_relax = OFF
set abs_control_gain = 0
set use_integrated_yaw = OFF
set anti_gravity_gain = 1000

set tpa_mode = PD
set tpa_rate = 10
set tpa_breakpoint = 1650

#RC smoothing settings
set rc_smoothing_type = INTERPOLATION
save

```

</details>
