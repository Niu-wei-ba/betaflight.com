# 4.0 CLI 命令行参考

**为了获得最佳结果，请使用键盘上的 Control F 并将转储中的相关 CLI 命令粘贴到弹出的框中。 **

## 获取命令

键入“get”和 CLI 命令名称的一部分（例如：“get acc”）。 cli 将返回名称部分包含当前值加上有效值范围或有效名称的所有 CLI 命令。
这是一个非常方便的功能，可以轻松找到变量名称，然后可以将其从 CLI 显示复制/粘贴到命令行输入框。

## 转储

**align_gyro** = 默认
允许值：DEFAULT、CW0、CW90、CW180、CW270、CW0FLIP、CW90FLIP、CW180FLIP、CW270FLIP
用于确定陀螺仪芯片的飞行方向。 （CPU 负载比主板方向少）

**gyro_hardware_lpf = 正常**
允许值：NORMAL、1KHZ_SAMPLING、EXPERIMENTAL
陀螺仪低通滤波器设置

**gyro_32khz_hardware_lpf = 正常**
允许值：正常、实验
32K 陀螺仪低通滤波器设置

**陀螺仪同步分值 = 1**
允许范围：1 - 32
用于 Blackbox 的陀螺仪同步分母。 _example_ Gyro_sync_denom = 8 表示 Blackbox 记录 1/8 的陀螺仪数据。

**陀螺仪低通类型 = BIQUAD**
允许值：PT1、BIQUAD

**陀螺仪低通频率= 150**
允许范围：0 - 16000

**陀螺仪低通 2\_类型 = PT1**
允许值：PT1、BIQUAD

**陀螺仪低通 2_hz = 0**
允许范围：0 - 16000

**陀螺仪陷波 1_hz = 0**
允许范围：0 - 16000

**陀螺仪缺口 1\_截止= 0**
允许范围：0 - 16000

**陀螺仪陷波 2_hz = 0**
允许范围：0 - 16000

**陀螺仪缺口 2\_截止= 0**
允许范围：0 - 16000

**陀螺仪校准持续时间 = 125**
允许范围：50 - 3000

**陀螺仪校准噪声限制 = 48**
允许范围：0 - 200

**陀螺仪溢出检测=全部**
允许值：关闭、偏航、全部
陀螺仪溢出检测适用的轴
Gyro_overflow_detect 是用于处理 ICM 陀螺仪溢出问题的特殊代码。对于所有轴，默认设置为打开。如果您的穿越机具有 ICM 陀螺仪，则禁用此功能是不明智的。它对于 MPU 陀螺仪来说不需要或没有帮助。

如果 ICM 陀螺仪处于非常高的转速下，则很容易出现溢出反转问题。如果启用并设置为 ALL，只要任何轴超过 1950 度/秒，溢出保护就会启动并禁用所有 PID。

**yaw_spin_recovery = 开**
允许值：关、开
偏航自旋恢复和陀螺仪溢出检测
这项新功能在 betaflight 3.4 中默认启用，可减少非指令严重偏航旋转的严重程度和持续时间。
例如，如果穿越机夹住门、树、树枝或其他物体并导致高速偏航旋转，它可能会进入“永无止境”的无法控制的旋转。
通常，它会发出独特的颤音并快速爬升 - 所谓的偏航旋转月球（YSTTM）问题。 3.4 引入了两个代码功能，可以更快、更干净地控制此类旋转。
偏航旋转恢复主要适用于 FPV 飞行员，最适合与 MPU 陀螺仪配合使用。
使用高偏航率的 LOS 特技飞行员可能更喜欢禁用此功能。

**偏航自旋阈值 = 1950**
允许范围：500 - 1950
“阈值”是旋转保护启动时的旋转速率（以度每秒为单位）。
选择默认阈值 1950 是为了最大限度地减少错误触发。对于 FPV，较低的值，例如建议比最大配置偏航角速度高 100-200。
例如，最大配置偏航率为 700 度/秒的穿越机：
阈值太低可能会导致误触发，并延迟返回正常控制。

**陀螺仪使用\_32khz = 关闭**
允许值：关、开

**陀螺仪使用=首先**
允许值：第一、第二、两者

**dyn_notch_range = 自动**
允许值：高、中、低、自动

**dyn_notch_width_percent = 8**
允许范围：0 - 20

**dyn_notch_q = 120**
允许范围：1 - 1000

**dyn_notch_min_hz = 150**
允许范围：1 - 1000

**dyn_lpf_gyro_min_hz = 150**
允许范围：0 - 1000

**dyn_lpf_gyro_max_hz = 450**
允许范围：0 - 1000

**align_acc = 默认**
允许值：DEFAULT、CW0、CW90、CW180、CW270、CW0FLIP、CW90FLIP、CW180FLIP、CW270FLIP

**acc_hardware = 自动**允许的值：AUTO、NONE、ADXL345、MPU6050、MMA8452、BMA280、LSM303DLHC、MPU6000、MPU6500、MPU9250、ICM20601、ICM20602、ICM20608G、ICM20649、ICM20689、BMI160、FAKE

**acc_lpf_hz = 10**
允许范围：0 - 400

**acc_trim_pitch = 0**
允许范围：-300 - 300

**acc_trim_roll = 0**
允许范围：-300 - 300

**acc_calibration = 0,0,0**
数组长度：3

**mid_rc = 1500**
允许范围：1200 - 1700

**最小检查 = 1050**
允许范围：750 - 2250

**最大检查 = 1900**
允许范围：750 - 2250

**RSSI\_频道 = 0**
允许范围：0 - 18

**rssi_src_frame_errors = 关闭**
允许值：关、开

**RSSI\_规模 = 100**
允许范围：1 - 255

**rssi_invert = 关闭**
允许值：关、开

**rc_interp = 自动**
允许值：关闭、预设、自动、手动

**rc_interp_ch = RPYT**
允许值：RP、RPY、RPYT、T、RPT

**rc_interp_int = 19**
允许范围：1 - 50

**rc_interp_ch = RPYT**
允许值：RP、RPY、RPYT、T、RPT

**rc_interp_int = 19**
允许范围：1 - 50

**rc_smoothing_type = 过滤器**
允许值：插值、滤波器
[参见 3.4 调整说明](/docs/wiki/tuning/older/3-4-tuning-notes)

**rc_smoothing_input_hz = 0**
允许范围：0 - 255
Spektrum 和 RC 平滑滤波器

**rc_smoothing_derivative_hz = 0**
允许范围：0 - 255
Spektrum 和 RC 平滑滤波器

**rc_smoothing_debug_axis = 滚动**
允许值：横滚、俯仰、偏航、油门

**rc_smoothing_input_type = BIQUAD**
允许值：PT1、BIQUAD

**rc_smoothing_derivative_type = BIQUAD**
允许值：OFF、PT1、BIQUAD

**rc_smoothing_auto_smoothness = 10**
允许范围：0 - 50

**fpv*mix* Degrees = 0**
允许范围：0 - 90

**最大辅助通道 = 14**
允许范围：0 - 14

**serialrx_provider = SPEK1024**
允许值：SPEK1024、SPEK2048、SBUS、SUMD、SUMH、XB-B、XB-B-RJ01、IBUS、JETIEXBUS、CRSF、SRXL、CUSTOM、FPORT

**serialrx_inverted = 关闭**
允许值：关、开

**spektrum_sat_bind = 0**
允许范围：0 - 10

**spektrum_sat_bind_autoreset = 开**
允许值：关、开

**airmode_start_throttle_percent = 32**
允许范围：0 - 100
这将使 AirMode 保持关闭状态，直到油门第一次达到该值。此后 AirMode 始终开启。请注意，3D 用户必须将其阈值重新配置为其他值，否则 Air Mode 将始终处于启用状态。

**x_min_usec = 885**
允许范围：750 - 2250

**rx_max_usec = 2115**
允许范围：750 - 2250

**serialrx_halfduplex = 关闭**
允许值：关、开

**adc\_设备 = 1**
允许范围：0 - 3

**adc_vrefint_calibration = 0**
允许范围：0 - 2000

**adc_tempsensor_calibration30 = 0**
允许范围：0 - 2000

**adc_tempsensor_calibration110 = 0**
允许范围：0 - 2000

**输入过滤模式 = 关闭**
允许值：关、开

**blackbox_p_ratio = 32**
允许范围：0 - 32767

**blackbox_device = SDCARD**
允许值：NONE、SPIFLASH、SDCARD、SERIAL

**blackbox_record_acc = 开**
允许值：关、开

**blackbox_mode = 正常**
允许的值：NORMAL、MOTOR_TEST、ALWAYS

**最小油门 = 1070**
允许范围：750 - 2250

**pid_at_min_throttle = 开**
个人资料 0
允许值：关、开
pid_at_min_throttle 使直升机即使在最小油门下也能继续处理 PID 算法。但 pid_at_min_throttle 仅保持 P 和 D 处于活动状态，I 为零

**最大油门 = 2000**
允许范围：750 - 2250

**最小命令 = 1000**
允许范围：750 - 2250

**dshot_idle_value = 550**
允许范围：0 - 2000

**dshot_burst = 关闭**
允许值：关、开
[详情](/docs/wiki/guides/current/DSHOT-RPM-Filtering#dma)

**use_unsynced_pwm = 关闭**
允许值：关、开

**电机*pwm*协议 = ONESHOT125**
允许的值：OFF、ONESHOT125、ONESHOT42、MULTISHOT、BRUSHED、DSHOT150、DSHOT300、DSHOT600、DSHOT1200、PROSHOT1000

**电机脉宽调制率 = 480**
允许范围：200 - 32000

**电机\_pwm_inversion = 关闭**
允许值：关、开

**电机极数 = 14**
允许范围：4 - 255
ESC 报告 erpm，需要使用电机的极数（磁铁）将其转换为 rpm。常规 5" 电机具有 14 极，这是默认设置。较小的电机具有较少的极数，通常为 12。计算它们或查找电机规格
[详情](/docs/wiki/guides/current/DSHOT-RPM-Filtering)

**thr_corr_value = 0**
允许范围：0 - 150

**thr_corr_angle = 800**
允许范围：1 - 900

**failsafe_delay = 4**允许范围：0 - 200

**failsafe_throttle = 1000**
允许范围：750 - 2250

**failsafe_throttle_low_delay = 100**
允许范围：0 - 300

**failsafe_switch_mode = STAGE1**
允许值：STAGE1、KILL、STAGE2

**failsafe_throttle_low_delay = 100**
允许范围：0 - 300

**failsafe_procedure = DROP**
允许值：自动着陆、跌落、GPS 救机

**align_board_roll = 0**
允许范围：-180 - 360

**align_board_pitch = 0**
允许范围：-180 - 360

**align_board_yaw = 0**
允许范围：-180 - 360

**云台模式=正常**
允许值：NORMAL、MIXTILT

**蝙蝠容量= 0**
允许范围：0 - 20000

**vbat*max_cell*电压 = 430**
允许范围：100 - 500

**vbat*full_cell*电压 = 410**
允许范围：100 - 500

**vbat*min_cell*电压 = 330**
允许范围：100 - 500

**vbat*warning_cell*电压 = 350**
允许范围：100 - 500

**vbat\_迟滞 = 1**
允许范围：0 - 250

**电流表 = ADC**
允许值：NONE、ADC、VIRTUAL、ESC、MSP

**电池电量表 = ADC**
允许值：NONE、ADC、ESC

**vbat*检测*细胞\_电压 = 300**
允许范围：0 - 2000

**use_vbat_alerts = 开**
允许值：关、开

**use_cbat_alerts = 关闭**
允许值：关、开

**cbat_alert_percent = 10**
允许范围：0 - 100

**force_battery_cell_count = 0**
允许范围：0 - 24

**vbat_scale = 110**
允许范围：0 - 255

**vbat_divider = 10**
允许范围：1 - 255

**vbat\_乘数 = 1**
允许范围：1 - 255

**ibata_scale = 250**
允许范围：-16000 - 16000

_**ibata_set **_

**ibatv_scale = 0**
允许范围：-16000 - 16000

_**ibatv_set **_

**beeper_inversion = 开**
允许值：关、开

**beeper_od = 关闭**
允许值：关、开

**蜂鸣器频率 = 3800**
允许范围：0 - 16000

**beeper_dshot_beacon_tone = 1**
允许范围：1 - 5

**偏航电机\_反转 = 关闭**
允许值：关、开

**crashflip_motor_percent = 0**
允许范围：0 - 100

**3d_deadband_low = 1406**
允许范围：750 - 1500

**3d_deadband_high = 1514**
允许范围：1500 - 2250

**3d\_中性 = 1460**
允许范围：750 - 2250

**3d_deadband_throttle = 50**
允许范围：1 - 100

**3d_limit_low = 1000**
允许范围：750 - 1500

**3d_limit_high = 2000**
允许范围：1500 - 2250

**3d_switched_mode = 关闭**
允许值：关、开

**伺服中心脉冲 = 1500**
允许范围：750 - 2250

**伺服脉宽调制率 = 50**
允许范围：50 - 498

**servo_lowpass_hz = 0**
允许范围：0 - 400

**tri_unarmed_servo = 开**
允许值：关、开

**频道转发开始 = 4**
允许范围：4 - 18

**重启字符 = 82**
允许范围：48 - 126

**串行更新率\_hz = 100**
允许范围：100 - 2000

**imu_dcm_kp = 2500**
允许范围：0 - 32000

**imu_dcm_ki = 0**
允许范围：0 - 32000

**小角度 = 25**
允许范围：0 - 180

**自动上锁延迟 = 5**
允许范围：0 - 60

**第一臂上的陀螺仪校准 = 关闭**
允许值：关、开

**gps_provider = NMEA**
允许值：NMEA、UBLOX、MSP

**gps*sbas*模式 = 自动**
允许的值：AUTO、EGNOS、WAAS、MSAS、GAGAN

**gps_auto_config = 开**
允许值：关、开

**gps_auto_baud = 关闭**
允许值：关、开

**gps_ublox_use_galileo = 关闭**
允许值：关、开

**gps_rescue_angle = 32**
允许范围：0 - 200
GPS 救机模式

**gps_rescue_initial_alt = 50**
允许范围：20 - 100

**gps_rescue_descent_dist = 200**
允许范围：30 - 500

**gps_rescue_ground_speed = 2000**
允许范围：30 - 3000

**gps_rescue_throttle_p = 150**
允许范围：0 - 500

**gps_rescue_throttle_i = 20**
允许范围：0 - 500

**gps_rescue_throttle_d = 50**
允许范围：0 - 500

**gps_rescue_velocity_p = 80**
允许范围：0 - 500

**gps_rescue_velocity_i = 20**
允许范围：0 - 500

**gps_rescue_velocity_d = 15**
允许范围：0 - 500

**gps_rescue_yaw_p = 40**
允许范围：0 - 500

**gps_rescue_throttle_min = 1200**
允许范围：1000 - 2000

**gps_rescue_throttle_max = 1600**
允许范围：1000 - 2000

**gps_rescue_throttle_hover = 1280**
允许范围：1000 - 2000

**gps_rescue_sanity_checks = RESCUE_SANITY_ON**
允许的值：RESCUE_SANITY_OFF、RESCUE_SANITY_ON、RESCUE_SANITY_FS_ONLY

**gps_rescue_min_sats = 8**
允许范围：0 - 50

**gps_rescue_min_dth = 100**允许范围：50 - 1000

**3d_deadband_low = 1406**
允许范围：750 - 1500

**3d_deadband_high = 1514**
允许范围：1500 - 2250

**3d_deadband_throttle = 50**
允许范围：1 - 100

**死区 = 0**
允许范围：0 - 32

**偏航死区 = 0**
允许范围：0 - 100

**偏航死区 = 0**
允许范围：0 - 100

**偏航控制反转 = 关闭**
允许值：关、开

**pid_process_denom = 4**
允许范围：1 - 16

**失控起飞预防**

防失控起飞
将其设置为“关闭”可完全禁用该功能。请注意，不会针对失控起飞事件提供保护，并且固件的行为将与实现该功能之前一样。

其余参数影响用于检测正常受控飞行并停用电池剩余部分的功能的逻辑：

**失控起飞*停用*延迟**

这是必须累积才能停用该功能的成功飞行时间（以毫秒为单位）。有效值范围从 100（0.1 秒）到 1000（1 秒）。默认值 500（0.5 秒）似乎非常可靠，不需要调整。目标是在我们确定飞行器正常飞行后，在“合理”但短时间内停用逻辑。然而，我们希望它在我们到达可能发生碰撞或其他事件的第一个点（例如在比赛期间的第一个门口）之前停用。提高此值将延迟停用，并且崩溃或门/分支剪辑可能会导致意外解除。将该值降低太多可能会导致逻辑过早停用并且无法在失控事件中提供保护。值得注意的是，延误是指满足其他标准（例如油门级别、操纵杆活动等）的累计飞行时间。因此，如果油门降至限制以下或 R/P/Y 摇杆居中，则停用之前的“实际”经过时间可能会长于 0.5 秒。可以使用 Blackbox 日志记录来查看实际行为 - 请参阅下面的调试部分。

**runaway_takeoff_deactivate_throttle_percent**

确定可以考虑成功飞行的最小油门百分比阈值。有效值范围为 0 到 100。除了油门级别外，逻辑还需要横滚、俯仰或偏航杆上的活动，以及 PID 控制器成功控制飞行器，并使 PID_sum 保持受控。当满足这些条件时，逻辑会累积成功的飞行时间。一般来说，您不需要调整此值，因为大多数穿越机需要大约 25% 或更多油门才能起飞/悬停。例外情况可能是，如果您拥有极其强大或轻型的飞行器，能够以远低于 25% 油门的速度飞行。在这种情况下，您可能希望将该值降低到更接近实际的悬停油门百分比。如果该值设置得太低，则逻辑可能会过快停用，并且可能不会在真正的失控事件中触发。将其设置得太高将导致逻辑 ​​ 需要更多的飞行时间才能停用，因为它仅在油门高于设置时累积飞行时间。

**tlm_inverted = 关闭**
允许值：关、开

**tlm_halfduplex = 开**
允许值：关、开

**frsky_default_lat = 0**
允许范围：-9000 - 9000

**frsky_default_long = 0**
允许范围：-18000 - 18000

**frsky_gps_format = 0**
允许范围：0 - 1

**frsky_unit = 帝国**
允许值：英制、公制

**frsky*vfas* precision = 0**
允许范围：0 - 1

**hott_alarm_int = 5**
允许范围：0 - 120

**pid_in_tlm = 关闭**
允许值：关、开

**报告电池电压 = 关闭**
允许值：关、开

**ibus\_传感器 = 1,2,3,0,0,0,0,0,0,0,0,0,0,0,0**
数组长度：15

**mavlink_mah_as_heading_divisor = 0**
允许范围：0 - 30000

**ledstrip_visual_beeper = 关闭**
允许值：关、开
当设置为打开且 LEDLOW 模式处于活动状态（即 LED 灯带关闭）时，LED 灯带与蜂鸣声同步闪烁，作为飞行器距离太远而无法听到蜂鸣器/多架飞行器正在飞行的情况下的视觉指示器。

**ledstrip_grb_rgb = GRB**
允许的值：GRB、RGB 有关更多信息，请参阅 [LED 灯带功能指南](/docs/wiki/guides/current/LED-Strip-Functionality#ws2811-vs-ws2812)

**sdcard_detect_inverted = 关闭**
允许值：关、开

**sdcard_mode = SPI**
允许值：OFF、SPI、SDIO

**sdcard_dma = 关闭**
允许值：关、开

**sdcard_spi_bus = 2**
允许范围：0 - 3

**osd_units = 公制**
允许值：英制、公制

**osd_warn_arming_disable = 开**
允许值：关、开

**osd_warn_batt_not_full = 开**
允许值：关、开

**osd\_配置文件 = 1**
允许范围：1 - 3

**系统 hse_mhz = 8**
允许范围：0 - 30

**任务统计=开**
允许值：关、开

**调试模式=无**
允许的值：NONE、CYCLETIME、BATTERY、GYRO_FILTERED、ACCELEROMETER、PIDLOOP、GYRO_SCALED、RC_INTERPOLATION、ANGLERATE、ESC_SENSOR、SCHEDULER、STACK、ESC_SENSOR_RPM、ESC_SENSOR_TMP、ALTITUDE、FFT、FFT_TIME、FFT_FREQ、 RX_FRSKY_SPI、RX_SFHSS_SPI、GYRO_RAW、DUAL_GYRO、DUAL_GYRO_RAW、DUAL_GYRO_COMBINE、DUAL_GYRO_DIFF、MAX7456_SIGNAL、MAX7456_SPICLOCK、SBUS、FPORT、RANGEFINDER、RANGEFINDER_QUALITY、LIDAR_TF、ADC_INTERNAL、 RUNAWAY_TAKEOFF、SDIO、CURRENT_SENSOR、USB、SMARTAUDIO、RTH、ITERM_RELAX、ACRO_TRAINER、RC_SMOOTHING、RX_SIGNAL_LOSS、RC_SMOOTHING_RATE、ANTI_GRAVITY、DYN_LPF、RX_SPEKTRUM_SPI

**rate_6pos_switch = 关闭**
允许值：关、开

**cpu\_超频 = 关闭**
允许值：关闭、192MHZ、216MHZ、240MHZ

**pwr_on_arm_grace = 5**
允许范围：0 - 30

**vtx_band = 4**
允许范围：0 - 5
0=用户、1=A、2=B、3=E、4=F（Airwaves/Fatshark）、5=比赛乐队

**vtx_channel = 1**
允许范围：1 - 8
VTX-CLI-设置

**vtx_power = 1**
允许范围：0 - 4
对于智能音频：0=25mW、1=25mW、2=200mW、3=500mW、4=800mW
对于 TBS Unify Nano：0=25mW、1=25mW、2=50mW
对于 IRC-Tramp：0=25mW、1=25mW、2=100mW、3=200mW、4=400mW、5=600mW

**vtx_low_power_disarm = 关闭**
允许的值：OFF、ON、UNTIL_FIRST_ARM
如果打开且飞控上锁，图传输出功率将设置为最低值（vtx_power=1）。否则，视频发射器输出功率将设置为配置的“vtx_power”值。 （注意一个例外：如果发生接收机失控保护，则输出功率将不会降低。）

**vtx_freq = 5740**
允许范围：0 - 5999
如果 vtx_band!=0 并且 VTX 已连接，则显示频率（以 MHz 为单位）
如果 vtx_band==0 则设置频率（以 MHz 为单位）
如果 vtx_band==0 且 vtx_freq==0 那么设置将不会发送到 VTX
例如，要将 VTX 配置为使用频段“F”和通道“6”(5840 MHz)，请进入 CLI 并输入：
设置 vtx_band = 4
设置 vtx_channel = 6
保存
在“保存”并重新启动之前，VTX 配置不会更改。如果成功，则输入“get vtx_freq”将显示当前频率值（以 MHz 为单位）。

频率表：
频道
1 2 3 4 5 6 7 8
频段 1：5865 5845 5825 5805 5785 5765 5745 5725（A：Boscam A / TBS / RC305）
频段 2：5733 5752 5771 5790 5809 5828 5847 5866（B：Boscam B）
频段 3：5705 5685 5665 5645 5885 5905 5925 5945（E：Boscam E / DJI）
频段 4：5740 5760 5780 5800 5820 5840 5860 5880（F：IRC NexWave / Fatshark）
表带 5：5658 5695 5732 5769 5806 5843 5880 5917（右：比赛表带）

**vtx_pit_mode_freq = 0**
允许范围：0 - 5999

**vtx_halfduplex = 开**
允许值：关、开

**vcd_video_system = 自动**
允许值：AUTO、PAL、NTSC

**max7456_clock = 默认**
允许值：HALF、DEFAULT、FULL

**max7456_spi_bus = 3**
允许范围：0 - 3

**max7456_preinit_opu = 关闭**
允许值：关、开

**显示端口*msp_col*调整 = 0**
允许范围：-6 - 0

**显示端口*msp_row*调整 = 0**
允许范围：-3 - 0

**显示端口*max7456_col*调整 = 0**
允许范围：-6 - 0

**显示端口*max7456_row*调整 = 0**
允许范围：-3 - 0

**显示端口\_max7456_inv = 关闭**
允许值：关、开

**显示端口\_max7456_blk = 0**
允许范围：0 - 3

**显示端口\_max7456_wht = 2**
允许范围：0 - 3

**esc_sensor_halfduplex = 关闭**
允许值：关、开

**led_inversion = 0**
允许范围：0 - 7

**相机控制模式=硬件\_PWM**
允许的值：HARDWARE_PWM、SOFTWARE_PWM、DAC 操作模式下，software_pwm 在可用 PIN 选择方面限制最少，但需要电阻器和电容器才能正常工作； hardware_pwm 几乎可以保证只用一个电阻就可以工作，只要你可以为它腾出一个定时器； dac（尚未实现）在极少数具有 DAC 引脚断开且未被其他功能占用的 FC 上受支持，它通过直接连接到相机来工作。
[摄像机控制](/docs/wiki/guides/current/FPV-Camera-Control-Joystick-Emulation)

**相机控制参考电压 = 330**
允许范围：200 - 400
在相机浮动 OSD 和 GND 引脚上测量的电压（以 10 mV 为单位），通常为 3V3，但不保证，例如我的 RunCam Sky 有 3V4，据报道有些相机低至 3V1。

**camera_control_key_delay = 180**
允许范围：100 - 500
每次按键的持续时间（以毫秒为单位存在于 camera_control 引脚上，在与 RunCam 协商后，将其设置为 180 毫秒以适应大多数相机，而其中一些相机接受低至 125 毫秒。

**相机控制内部电阻 = 470**
允许范围：10 - 1000
相机的内阻（以 100 Ω 为单位），大多数 HS1177 衍生品具有 47 kΩ，但这并不能保证。您必须为您的相机导出该值，以防默认值不起作用。

**camera_control_inverted = 关闭**
允许值：关、开

**pinio_config = 1,1,1,1**
数组长度：4
Pinio 和 PinioBox

**pinio_box = 255,255,255,255**
数组长度：4

**usb_hid_cdc = 关闭**
允许值：关、开
HID 操纵杆支持当前仅在 F4 / F7 板上可用。

**usb_msc_pin_pullup = 开**
允许值：关、开

**flash_spi_bus = 3**
允许范围：0 - 3

**rcdevice_init_dev_attempts = 6**
允许范围：0 - 10

**rcdevice_init_dev_attempt_interval = 1000**
允许范围：0 - 327680500

**gyro_1_bustype = SPI**
允许值：NONE、I2C、SPI、SLAVE

**gyro_1_spibus = 1**
允许范围：0 - 3

**gyro_1_i2cBus = 0**
允许范围：0 - 3

**gyro*1_i2c*地址 = 0**
允许范围：0 - 119

**gyro_1_sensor_align = CW0**
允许值：DEFAULT、CW0、CW90、CW180、CW270、CW0FLIP、CW90FLIP、CW180FLIP、CW270FLIP

**gyro_2_bustype = SPI**
允许值：NONE、I2C、SPI、SLAVE

**gyro_2_spibus = 1**
允许范围：0 - 3

**gyro_2_i2cBus = 0**
允许范围：0 - 3

**gyro*2_i2c*地址 = 0**
允许范围：0 - 119

**gyro_2_sensor_align = 默认**
允许值：DEFAULT、CW0、CW90、CW180、CW270、CW0FLIP、CW90FLIP、CW180FLIP、CW270FLIP

*时区*偏移*分钟 = 0*

**dyn_lpf_dterm_min_hz = 150**
个人资料 0
允许范围：0 - 1000

**dyn_lpf_dterm_max_hz = 250**
个人资料 0
允许范围：0 - 1000

**dterm_lowpass_type = BIQUAD**
个人资料 0
允许值：PT1、BIQUAD

**dterm_lowpass_hz = 150**
个人资料 0
允许范围：0 - 16000

**dterm_lowpass2_type = BIQUAD**
个人资料 0
允许值：PT1、BIQUAD

**dterm_lowpass2_hz = 150**
个人资料 0
允许范围：0 - 16000

**dterm_notch_hz = 0**
个人资料 0
允许范围：0 - 16000

**dterm_notch_cutoff = 0**
个人资料 0
允许范围：0 - 16000

**vbat_pid_gain = 关闭**
个人资料 0
允许值：关、开

**pid_at_min_throttle = 开**
个人资料 0
允许值：关、开

**反重力模式=平滑**
个人资料 0
允许值：平滑、步进

**反重力阈值 = 250**
个人资料 0
允许范围：20 - 1000

**反重力增益 = 5000**
个人资料 0
允许范围：1000 - 30000

**前馈\_过渡 = 0**
个人资料 0
允许范围：0 - 100

**acc_limit_yaw = 0**
个人资料 0
允许范围：0 - 500

**acc_limit_yaw = 0**
个人资料 0
允许范围：0 - 500

**acc_limit = 0**
个人资料 0
允许范围：0 - 500

**crash_dthreshold = 50**
个人资料 0
允许范围：0 - 2000

**crash_gthreshold = 400**
个人资料 0
允许范围：0 - 2000

**crash_setpoint_threshold = 350**
个人资料 0
允许范围：0 - 2000

**崩溃时间 = 500**
个人资料 0
允许范围：0 - 5000

**崩溃延迟 = 0**
个人资料 0
允许范围：0 - 500

**崩溃恢复角度 = 10**
个人资料 0
允许范围：0 - 30

**崩溃恢复率 = 100**
个人资料 0
允许范围：0 - 255

**碰撞限制\_偏航 = 200**
个人资料 0
允许范围：0 - 1000

**崩溃恢复角度 = 10**
个人资料 0
允许范围：0 - 30

**崩溃恢复率 = 100**
个人资料 0
允许范围：0 - 255

**崩溃恢复=关闭**
个人资料 0 允许值：关闭、打开、蜂鸣声

**iterm_rotation = 开**
个人资料 0
允许值：关、开

**智能前馈 = 关闭**
个人资料 0
允许值：关、开

**iterm_relax = RP**
个人资料 0
允许值：OFF、RP、RPY、RP_INC、RPY_INC

**iterm_relax_type = 设定点**
个人资料 0
允许值：陀螺仪、设定点

**iterm_relax_cutoff = 20**
个人资料 0
允许范围：1 - 100

**iterm_relax_type = 设定点**
个人资料 0
允许值：陀螺仪、设定点

**iterm_relax_cutoff = 20**
个人资料 0
允许范围：1 - 100

**iterm_windup = 100**
个人资料 0
允许范围：30 - 100

**iterm_limit = 400**
个人资料 0
允许范围：0 - 500

**pidsum_limit = 500**
个人资料 0
允许范围：100 - 1000

**pidsum_limit_yaw = 400**
个人资料 0
允许范围：100 - 1000

**pidsum_limit_yaw = 400**
个人资料 0
允许范围：100 - 1000

**偏航低通频率 = 0**
个人资料 0
允许范围：0 - 500

**油门升压= 5 **
个人资料 0
允许范围：0 - 100

**油门升压截止= 15 **
个人资料 0
允许范围：5 - 50

**油门升压截止= 15 **
个人资料 0
允许范围：5 - 50

**acro_trainer_angle_limit = 20**
个人资料 0
允许范围：10 - 80

**acro_trainer_lookahead_ms = 50**
个人资料 0
允许范围：10 - 200

**acro_trainer_debug_axis = 滚动**
个人资料 0
允许值：滚动、俯仰

**acro_trainer_gain = 75**
个人资料 0
允许范围：25 - 255

**p_pitch = 50**
个人资料 0
允许范围：0 - 200

**i\_螺距 = 75**
个人资料 0
允许范围：0 - 200

**align_board_pitch = 0**
允许范围：-180 - 360

**d\_螺距 = 32**
个人资料 0
允许范围：0 - 200

**f\_螺距 = 60**
个人资料 0
允许范围：0 - 2000

**p_roll = 46**
个人资料 0
允许范围：0 - 200

**i_roll = 65**
个人资料 0
允许范围：0 - 200

**align_board_roll = 0**
允许范围：-180 - 360

**d_roll = 30**
个人资料 0
允许范围：0 - 200

**f_roll = 60**
个人资料 0
允许范围：0 - 2000

**p\_偏航 = 45**
个人资料 0
允许范围：0 - 200

**i\_偏航 = 100**
个人资料 0
允许范围：0 - 200

**align_board_yaw = 0**
允许范围：-180 - 360

**d\_偏航 = 0**
个人资料 0
允许范围：0 - 200

**use_integrated_yaw = 关闭**
个人资料 0
允许值：关、开

**综合偏航\_松弛 = 200**
个人资料 0
允许范围：0 - 255

**f\_偏航 = 100**
个人资料 0
允许范围：0 - 2000

***角度*级别*强度 = 50***
个人资料 0
允许范围：0 - 200

**地平线级别强度 = 50**
个人资料 0
允许范围：0 - 200

**地平线\_过渡 = 75**
个人资料 0
允许范围：0 - 200

**等级限制 = 55**
个人资料 0
允许范围：10 - 90

**地平线倾斜效果 = 75**
个人资料 0
允许范围：0 - 250

**地平线*倾斜*专家\_模式 = 关闭**
个人资料 0
允许值：关、开

**绝对控制增益 = 0**
个人资料 0
允许范围：0 - 20

**绝对控制限制 = 90**
个人资料 0
允许范围：10 - 255

**abs_control_error_limit = 20**
个人资料 0
允许范围：1 - 45

**abs_control_cutoff = 11**
个人资料 0
允许范围：1 - 45

**use_integrated_yaw = 关闭**
个人资料 0
允许值：关、开

**综合偏航\_松弛 = 200**
个人资料 0
允许范围：0 - 255

**launch_control_mode = 正常**
个人资料 0
允许值：NORMAL、PITCHONLY、FULL
发射控制

**launch_trigger_allow_reset = ON**
个人资料 0
允许值：关、开

**launch_trigger_throttle_percent = 20**
个人资料 0
允许范围：0 - 90

**发射角度限制 = 0**
个人资料 0
允许范围：0 - 80

**启动控制增益= 40 **
个人资料 0
允许范围：0 - 200

**thr_mid = 50**
利率档案 0
允许范围：0 - 100

**thr_expo = 0**
利率档案 0
允许范围：0 - 100

**rates_type = BETAFLIGHT**
利率档案 0
允许的值：BETAFLIGHT、RACEFLIGHT
允许范围：0 - 100

**tpa\_断点 = 1500**
利率档案 0
允许范围：750 - 2250

**tpa\_模式 = D**
利率档案 0
允许值：PD、D

**节流限制类型=关闭**
利率档案 0
允许的值：OFF、SCALE、CLIP

**throttle_limit_percent = 100**
利率档案 0
允许范围：25 - 100

**roll_rate_limit = 1998**
利率档案 0
允许范围：200 - 1998

**音调速率限制 = 1998**
利率档案 0
允许范围：200 - 1998

**偏航率限制 = 1998**
利率档案 0
允许范围：200 - 1998

*\*遥测*禁用*电压 = OFF*

_通过_

*\*telemetry_disabled*温度 = OFF\_

_\*gps_ublox_use_galileo = 关闭_

_\*gps_set_home_point_once = OFF\_\_\*gps_rescue_allow_arming_without_fix = OFF_

_\*gps_rescue_use_mag = ON_

_\*推力线性 = 0_

https://github.com/betaflight/betaflight/pull/7304

_\*scheduler_optimize_rate = OFF_

_\*dterm_cut_percent = 65_

d_cut

_\*dterm_cut_gain = 15_

_\*dterm_cut_range_hz = 40_

_\*dterm_cut_lowpass_hz = 7_

_\*integrated_yaw_relax = 200_

_\*use_integrated_yaw = OFF_

_\*gyro_rpm_notch_q = 500_

_\*gyro_rpm_notch_min = 100_

_\*dterm_rpm_notch_harmonics = 1_

_\*dterm_rpm_notch_q = 500_

_\*dterm_rpm_notch_min = 100_

_\*gyro_rpm_notch_harmonics_

_\*airmode_noise_reduction_
