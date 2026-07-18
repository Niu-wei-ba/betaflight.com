# 蜂鸣器

Betaflight 支持蜂鸣器，可用于：

- 低电压和严重低电压报警（启用电池监测时）；
- 解锁 / 上锁提示音（以及解锁后的警告蜂鸣）；
- 提示校准完成；
- 通过 TX-AUX 控制蜂鸣，便于坠机后寻找飞行器；
- 提示失控保护状态；
- 提示飞行模式变更；
- 提示速率配置文件变更（通过 TX-AUX 开关）。

若通过摇杆执行解锁 / 上锁，将摇杆保持在上锁位置会持续发出重复提示音，可用于定位遗失的模型。

飞控上电后立即发出三声蜂鸣，表示陀螺仪校准已成功完成。Betaflight 每次上电时都会自动校准陀螺仪。在听到三声蜂鸣前，飞行器必须在地面上保持静止，以免影响校准。若校准期间明显移动飞行器，Betaflight 会检测到这一情况，并在飞行器再次静止后自动重新开始校准，因而延后“三声蜂鸣”。若只发生轻微移动，陀螺仪校准仍可能不正确，飞行器可能无法正常飞行。此时可通过[摇杆命令](Controls)手动校准陀螺仪，或直接让飞控断电后重新上电。

获得 GPS 定位后，解锁时会使用专用提示音；GPS 获得定位后还会发出一次“就绪”提示音。若已获得 GPS 定位，通过 TX-AUX 开关触发的提示音会报出卫星数量。

CLI 命令 `play_sound` 可用于试听蜂鸣器提示音。重复输入该命令会依次播放不同提示音；使用数字索引参数（见下文）可播放对应的提示音。

对于已连接蜂鸣器的 Target，蜂鸣器默认启用。

## 提示音序列

蜂鸣器提示音序列由方波生成：第 1、3、5…个数值表示蜂鸣器开启持续时间，第 2、4、6…个数值表示关闭持续时间。单位为毫秒 / 10（例如 `5` 代表 `50ms`）。

Betaflight 提供以下序列：

```
0    GYRO_CALIBRATED       20, 10, 20, 10, 20, 10	Gyro is calibrated
1    RX_LOST_LANDING       10, 10, 10, 10, 10, 40, 40, 10, 40, 10, 40, 40, 10, 10, 10, 10, 10, 70    SOS morse code
2    RX_LOST               50, 50		TX off or signal lost (repeats until TX is okay)
3    DISARMING             15, 5, 15, 5		Disarming the board
4    ARMING                30, 5, 5, 5		Arming the board
5    ARMING_GPS_FIX        5, 5, 15, 5, 5, 5, 15, 30	Arming and GPS has fix
6    BAT_CRIT_LOW          50, 2		Battery is critically low (repeats)
7    BAT_LOW               25, 50		Battery is getting low (repeats)
8    NULL                  multi beeps		GPS status (sat count)
9    RX_SET                10, 10		RX is set (when aux channel is set for beep or beep sequence how many satellites has found if GPS enabled)
10   ACC_CALIBRATION       5, 5, 5, 5		ACC inflight calibration completed
11   ACC_CALIBRATION_FAIL  20, 15, 35, 5	ACC inflight calibration failed
12   READY_BEEP            4, 5, 4, 5, 8, 5, 15, 5, 8, 5, 4, 5, 4, 5	GPS locked and copter ready
13   NULL                  multi beeps		Variable # of beeps (confirmation, GPS sat count, etc)
14   DISARM_REPEAT         0, 100, 10		Stick held in disarm position (after pause)
15   ARMED                 0, 245, 10, 5	Board is armed (after pause ; repeats until board is disarmed or throttle is increased)
```

## 支持的蜂鸣器类型

蜂鸣器通过启用或关闭板载 GPIO 输出引脚来控制。因此蜂鸣器必须在供电后能自行发声。

需要模拟信号或 PWM 信号的蜂鸣器无法工作，只会发出咔嗒声或完全无声。

以下为已知可用的蜂鸣器示例：

- [Hcm1205x Miniature Buzzer 5v](http://www.rapidonline.com/Audio-Visual/Hcm1205x-Miniature-Buzzer-5v-35-0055)
- [5V Electromagnetic Active Buzzer Continuous Beep](http://www.banggood.com/10Pcs-5V-Electromagnetic-Active-Buzzer-Continuous-Beep-Continuously-p-943524.html)
- [Radio Shack Model: 273-074 PC-BOARD 12VDC (3-16v) 70DB PIEZO BUZZER](http://www.radioshack.com/pc-board-12vdc-70db-piezo-buzzer/2730074.html#.VIAtpzHF_Si)
- [MultiComp MCKPX-G1205A-3700 TRANSDUCER, THRU-HOLE, 4V, 30MA](http://uk.farnell.com/multicomp/mckpx-g1205a-3700/transducer-thru-hole-4v-30ma/dp/2135914?CMP=i-bf9f-00001000)
- [3-24V Piezo Electronic Tone Buzzer Alarm 95DB](http://www.banggood.com/3-24V-Piezo-Electronic-Tone-Buzzer-Alarm-95DB-Continuous-Sound-p-919348.html)
