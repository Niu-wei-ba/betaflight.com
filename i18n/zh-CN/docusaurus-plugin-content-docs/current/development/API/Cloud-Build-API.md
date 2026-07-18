# Betaflight 云构建 API

固件版本 4.4 中引入了云构建 API。

## API

为了避免 512K 目标的 EOL，我们引入了云构建 API，节省了约 25% 的固件闪存使用量。
构建日志包含有关构建的信息，以防出现任何失败。

### 固件 4.4

固件 4.4 使用统一目标来定义固件中包含哪些硬件驱动程序，如 [统一目标文档](/docs/wiki/guides/archive/Unified-Targets) 中所述。不会合并新的统一目标

### 固件 4.5

固件 4.5 及更高版本使用配置存储库来存储通过预处理器定义定义的目标。更多信息请参见【如何为Betaflight创建飞控配置文件】(/docs/development/manufacturer/creating-configuration)。

## 用法

为了获得最佳结果，请在选择正确的目标后仅选择适合你的飞控的硬件（您可以使用自动检测按钮）。

### 如何安装附加构建选项

使用云构建系统（通过地面站或 API）时，您可以通过选择其他构建选项来自定义固件。这允许您根据需要启用额外的功能、协议或遥测支持。

**要安装附加构建选项：**

1. **选择您的目标**：使用自动检测按钮或手动选择你的飞控目标。
2. **选择构建选项**：在固件刷新器或构建界面中，查找无线电协议、遥测、OSD 和其他选项等功能的复选框、下拉列表或多选列表。如果支持，您可以选择多个选项（例如，启用 CRSF 和 FPORT 协议，或多个遥测系统）。
3. **自定义定义**：添加编译时定义（宏）以自定义您的构建。将它们作为空格分隔的标记输入（例如：`FRSKYOSD SMARTAUDIO_NOPULLDOWN`）。
4. **构建和刷新**：单击构建或刷新按钮。云构建系统将生成包含您选择的选项的固件。

:::info
有关更多详细信息，请参阅 [wiki/Firmware Flasher 页面](/docs/wiki/app/firmware-flasher-tab) 和 [构建选项](/docs/development/Defines) 的完整列表。
:::

:::note
选择许多选项会增加固件大小，并可能超出 512K 目标的闪存限制。
:::

### 无线电协议

```c
SERIALRX_CRSF       // Team BlackSheep Crossfire protocol
SERIALRX_GHST       // ImmersionRC Ghost Protocol
SERIALRX_IBUS       // FlySky and Turnigy receivers
SERIALRX_SBUS       // FrSky and Futaba receivers
SERIALRX_SPEKTRUM   // DSM2/DSMX (Spektrum)
SERIALRX_FPORT      // FrSky FPort
SERIALRX_XBUS       // JR
SERIALRX_SRXL2      // Spektrum SRXL2 protocol
SERIALRX_JETIEXBUS  // Jeti EX Bus Communication protocol
SERIALRX_SUMD       // Graupner Hott protocol
SERIALRX_SUMH       // Graupner legacy protocol
```

### 遥测协议

```c
TELEMETRY_FRSKY_HUB
TELEMETRY_SMARTPORT
TELEMETRY_CRSF
TELEMETRY_GHST
TELEMETRY_SRXL
TELEMETRY_IBUS
TELEMETRY_IBUS_EXTENDED
TELEMETRY_JETIEXBUS
TELEMETRY_MAVLINK
TELEMETRY_HOTT
TELEMETRY_LTM
```

:::note
构建期间包含 CRSF（包括 ELRS）、FPORT 和 GHST 的遥测。
:::

### OSD 选项

```c
FRSKYOSD
OSD_SD
OSD_HD
```

### 其他选项

```c
ACRO_TRAINER
AKK_SMARTAUDIO
ALTITUDE_HOLD
BATTERY_CONTINUE
CAMERA_CONTROL
DASHBOARD
EMFAT_TOOLS
GPS
LED_STRIP
LED_STRIP_64
MAG
PINIO
POSITION_HOLD
RACE_PRO
SERVOS
SOFTSERIAL
VTX
WING
```

### 电机协议

```c
BRUSHED
DSHOT
MULTISHOT
ONESHOT
PROSHOT
PWM
```

### 自定义

```c
CRSF_OFFICIAL_SPEC
EMFAT_AUTORUN
EMFAT_ICON
ESCSERIAL_SIMONK
GIMBAL
OPTICALFLOW
OPTICALFLOW_MT
OSD_QUICK_MENU
RANGEFINDER
RANGEFINDER_MT
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### RACE_PRO 定义

有一个特殊的 `RACE_PRO` 定义，它将以下定义组合为一个功能包：

```c
OSD_QUICK_MENU
RC_STATS
RPM_LIMIT
SPEC_PREARM_SCREEN
```

### WING 定义

有一个特殊的 `WING` 定义，它将以下定义组合为一个功能包：

```c
ADVANCED_TPA
SERVOS
```

请注意，此定义将删除以下定义：

```c
ABSOLUTE_CONTROL
INTEGRATED_YAW_CONTROL
LAUNCH_CONTROL
RUNAWAY_TAKEOFF
YAW_SPIN_RECOVERY
```

### 智能音频错误

此解决方法仅适用于固件 4.5.2 上的某些目标。

```c
NONCOMPLIANT_SMARTAUDIO
```