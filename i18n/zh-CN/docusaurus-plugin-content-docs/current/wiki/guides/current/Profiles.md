# 配置文件（亦称 PID 配置文件）

配置文件（Profile）是一组与飞行性能有关的设置，包含 PID 数值、滤波器设置、Anti Gravity、撞机恢复等。Betaflight 目前支持 3 个配置文件。默认使用配置文件 1（在 CLI 中为 `profile 0`）。

配置文件提供了另一种 PID 或滤波器调校方式（目前仅限 D 项滤波器）。例如，配置文件 1 可以保留一套经过验证、能够安全起飞且不会损伤电机的默认设置；同时，你可以在其他配置文件中尝试将 D 项滤波器从 PT1 改为 Bi-quad、提高 P 值或降低 D 值，而无需牺牲当天的飞行。它很适合在工作台上编辑各个配置文件，再在外场选择需要测试的配置。若四轴飞行器的飞行表现不理想，只需切回原来的配置文件即可继续飞行。

## 切换配置文件

可通过 Betaflight App、CLI、OSD 或摇杆组合切换配置文件。选定后，可修改设置并保存到当前活动配置文件。请注意，配置文件一旦选定，即使重新上电也会保持为活动配置文件。

Betaflight App（GUI）：在 **PID Tuning** 选项卡中，通过下拉菜单选择配置文件。选定后，该配置文件立即成为当前使用的配置文件；点击 **Save** 后会保存所有修改。

OSD：进入 CMS（偏航左 + 俯仰上）> 选择 `Profiles` > 更改 `PID Prof`。

摇杆组合：在未解锁状态下，使用下列摇杆指令选择配置文件。切换时，飞控上的状态 LED 会闪烁。

| 配置文件 | 油门 | 偏航 | 俯仰 | 横滚 |
| -------- | ---- | ---- | ---- | ---- |
| 0        | 下   | 左   | 中位 | 左   |
| 1        | 下   | 左   | 上   | 中位 |
| 2        | 下   | 左   | 中位 | 右   |

CLI：可使用 `profile` 命令切换配置文件：

```
profile <index>
```

保存配置更改：

```
save
```

## 速率配置文件

速率配置文件（Rate Profile）是一组与速率有关的设置。它保存俯仰、横滚和偏航的速率类型、RC Rate、Super Rate、Expo，以及油门 Expo 和 TPA 设置。

在 BetaFlight 3.2 之前，PID 配置文件与速率配置文件相互绑定。每个 PID 配置文件各自拥有 3 个速率配置文件，因此最多可使用 9 个速率配置文件。
Betaflight 3.2 取消了这种绑定关系，PID 配置文件和速率配置文件从此相互独立。选择速率配置文件不再影响 PID 配置文件，但可用的速率配置文件数量为 3 个。
从 BetaFlight 3.3 起，速率配置文件数量由 3 个增加到 6 个。

### 切换速率配置文件

可通过 GUI、CLI、OSD 或 AUX 通道选择速率配置文件。选定后（与 PID 配置文件相同），可以修改设置并保存到当前活动速率配置文件。手动切换速率配置文件后，即使重新上电也会保持为活动配置文件；但使用 AUX 通道选择时例外。Betaflight 启动时，活动配置文件由 AUX 通道的位置决定。

Betaflight App（GUI）：点击 **PID Tuning** 选项卡 > 通过下拉菜单选择速率配置文件。选定后，对设置所做的更改会在点击 **Save** 后保存到所选速率配置文件。选择速率配置文件的操作也会立即将其设为当前使用的速率配置文件。

OSD：进入 CMS（偏航左 + 俯仰上）> 选择 `Profiles` > 更改 `Rate Prof`。请务必选择 **Save + Exit** 或 **Save + Reboot** 保存设置。

AUX 通道（飞行中调整）：必须先在 Betaflight App 中配置调整项，且遥控器上必须有可用的 AUX 通道。  
在 App 中启用专家模式 > 点击 **Adjustments**。  
打开 **If enable** 的滑块，选择要使用的 AUX # 通道。  
在 **Range** 中选择完整范围 900 至 2100；从下拉菜单选择 **Rate Profile Selection**。**Via Channel** 使用的通道应与前面选择的 AUX 通道相同。

CLI：可使用 `rateprofile` 命令切换速率配置文件：

```
rateprofile <index>
```

保存配置更改：

```
save
```

## 备份 PID 配置文件和速率配置文件

目前，通过 Betaflight App 创建备份时，仅会备份当前活动的 PID 配置文件和速率配置文件。因此，查看和备份全部配置文件的最佳方式是使用 CLI。

### 使用 Diff 和 Dump 仅输出配置文件

使用以下命令查看和备份完整的当前活动配置文件（包括默认设置）：`dump profile` 和 `dump rates`。  
若要查看所有已配置的配置文件，请添加 `all` 参数：`dump all` 和 `diff all`。  
使用以下命令查看和备份当前活动配置文件相对于默认设置的改动：`diff profile` 和 `diff rates`。

示例：

```
# diff rates

# rateprofile
rateprofile 0

set roll_rc_rate = 200
set pitch_rc_rate = 200
set yaw_rc_rate = 200
set roll_expo = 50
set pitch_expo = 50
set yaw_expo = 90

# dump rates

# rateprofile
rateprofile 0

set thr_mid = 50
set thr_expo = 0
set rates_type = BETAFLIGHT
set roll_rc_rate = 200
set pitch_rc_rate = 200
set yaw_rc_rate = 200
set roll_expo = 50
set pitch_expo = 50
set yaw_expo = 90
set roll_srate = 70
set pitch_srate = 70
set yaw_srate = 70
set tpa_rate = 10
set tpa_breakpoint = 1650
set throttle_limit_type = OFF
set throttle_limit_percent = 100

# diff profile

# profile
profile 0

set p_pitch = 40
set d_pitch = 26
set p_roll = 20
set d_roll = 13
set p_yaw = 80

# dump profile

# profile
profile 0

set dterm_lowpass_type = PT1
set dterm_lowpass_hz = 100
set dterm_lowpass2_hz = 200
set dterm_notch_hz = 0
set dterm_notch_cutoff = 160
set vbat_pid_gain = OFF
set pid_at_min_throttle = ON
set anti_gravity_mode = SMOOTH
set anti_gravity_threshold = 250
set anti_gravity_gain = 5000
set feedforward_transition = 0
set acc_limit_yaw = 100
set acc_limit = 0
set crash_dthreshold = 50
set crash_gthreshold = 400
set crash_setpoint_threshold = 350
set crash_time = 500
set crash_delay = 0
set crash_recovery_angle = 10
set crash_recovery_rate = 100
set crash_limit_yaw = 200
set crash_recovery = OFF
set iterm_rotation = ON
set smart_feedforward = OFF
set iterm_relax = OFF
set iterm_relax_type = GYRO
set iterm_relax_cutoff = 11
set iterm_windup = 40
set iterm_limit = 150
set pidsum_limit = 500
set pidsum_limit_yaw = 400
set yaw_lowpass_hz = 0
set throttle_boost = 5
set throttle_boost_cutoff = 15
set acro_trainer_angle_limit = 20
set acro_trainer_lookahead_ms = 50
set acro_trainer_debug_axis = ROLL
set acro_trainer_gain = 75
set p_pitch = 40
set i_pitch = 50
set d_pitch = 26
set f_pitch = 60
set p_roll = 20
set i_roll = 45
set d_roll = 13
set f_roll = 60
set p_yaw = 80
set i_yaw = 45
set d_yaw = 0
set f_yaw = 60
set p_level = 50
set i_level = 50
set d_level = 75
set level_limit = 55
set horizon_tilt_effect = 75
set horizon_tilt_expert_mode = OFF
set abs_control_gain = 0
set abs_control_limit = 90
set abs_control_error_limit = 20
```

```
# profile
profile 0

set dterm_lowpass_hz = 0
set dterm_lowpass2_hz = 0
set dterm_notch_cutoff = 0
set p_pitch = 40
set d_pitch = 26
set p_roll = 20
set d_roll = 13
set p_yaw = 80

# profile
profile 1

set dterm_lowpass_type = BIQUAD
set dterm_notch_cutoff = 0

# profile
profile 2

set dterm_notch_cutoff = 0

# restore original profile selection
profile 2

# rateprofile
rateprofile 0

set roll_rc_rate = 200
set pitch_rc_rate = 200
set yaw_rc_rate = 200
set roll_expo = 50
set pitch_expo = 50
set yaw_expo = 90

# rateprofile
rateprofile 1


# rateprofile
rateprofile 2


# rateprofile
rateprofile 3

set thr_expo = 25
set roll_rc_rate = 155
set tpa_breakpoint = 1500

# rateprofile
rateprofile 4


# rateprofile
rateprofile 5


# restore original rateprofile selection
rateprofile 3
```
