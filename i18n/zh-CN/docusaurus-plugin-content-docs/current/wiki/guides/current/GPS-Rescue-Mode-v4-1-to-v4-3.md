# GPS Rescue 4.1 至 4.3

### **这是什么：**

GPS Rescue Mode 用于在图传或遥控链路丢失等紧急情况下，自动让四轴飞行器返航。**它唯一的目的，是让飞行器回到可重新接管的范围内。**它不是可靠的返航（Return to Home）模式。请牢记这一点；除初始测试外，只应在避免丢机时激活。为提高 GPS Rescue 成功率，请阅读本文，并按自身飞行环境和风格尽可能妥善地配置系统。

### **这不是什么：**

GPS Rescue 不是完整的“Return To Home”（RTH）功能。它不是让四轴飞行器自主飞回家的工具，也不应以这种方式使用。它不能自动着陆，接近 Home 点时会有意“软坠落”。发生信号丢失时，它的全部目的仅是将飞行器拉回更接近 Home 的位置，**以便飞行员恢复控制**。飞行员应尽快接管，不应依赖 GPS Rescue 飞回家。

## **要求**

- 必须有 GPS。推荐 Ublox m8n 系列，已使用 18x18 mm m8n、Beitian BN 880 及类似型号测试。
- **必须启用并正确校准加速度计**；Rescue Mode 要依赖它保持飞行器自稳。
- 气压计为可选项，但推荐使用；板载和外接（I2C）设备均已测试。
- **本模式不要求指南针，但若可用则会使用。**
- **不支持 3D 模式。**若已启用 3D 功能，GPS Rescue 会被禁用。

## **免责声明**

- 这是实验性功能。
- 请极度谨慎使用。
- 本文档**会**变化，请经常查看。
- 除非另有说明，本文档指向最新稳定版本（当前为 BF4.0）。
- 若计划将其用作 failsafe 方法，务必启用合理性检查！

## 前置条件

配置或测试 GPS Rescue 前，必须校准加速度计并确认 Angle 模式正常。配置“ANGLE”飞行模式并实飞测试，确认飞行器可自稳且行为正常。若无法正确调平，请重新校准加速度计后再次测试。GPS Rescue 使用 Angle 模式；若 Angle 模式异常，GPS Rescue 无法恢复飞行器，甚至可能使其朝错误方向飞行。

## 设置 GPS Rescue

强烈建议从零开始遵循完整设置流程。该流程用于在受控环境中练习并充分理解 GPS Rescue 的行为和限制。直接复制他人配置会降低成功概率。

### 在 Betaflight 的 Modes 标签页为 GPS Rescue Mode 添加开关，并确认该模式确实激活（当然须拆桨）。

然后在 CLI 配置以下参数：

`set gps_rescue_initial_alt=[number]`（默认 50）

这是最重要的参数。激活 Rescue Mode 后，四轴飞行器将指向 Home 点，并尝试爬升到相对于起飞点的安全高度。该高度取此参数与飞行记录最大高度 +15 m 中较高者。作者个人倾向使用 70 或 80 m。

`set gps_rescue_ground_speed=[number]`（默认 2000）

返航速度，单位为厘米每秒。作者偏好 1500（约 35 mph），但此设置取决于飞行方式和环境。

`set gps_rescue_angle=[number]`（默认 32）

返航时允许的最大倾斜角。该设置可能限制全速飞行；若修改默认值，必须测试。注意，角度越高，高度控制器越难维持稳定高度。可能逆风返航时，作者倾向设为 45 度。

`set gps_rescue_descent_dist =[number]`（默认 200）

飞行器开始朝 Home 点下降时的距离，单位米。

`set gps_rescue_ascend_rate = [number]`（默认 500，Betaflight 4.1 新增）

飞行器爬升的垂直速度，单位厘米每秒。

`set gps_rescue_descend_rate = [number]`（默认 150，Betaflight 4.1 新增）

飞行器下降的垂直速度，单位厘米每秒。

Betaflight 4.1 中，`gps_rescue_throttle_min` 和 `gps_rescue_throttle_max` 仅限制新的 PID 控制器行程（[PR #8015](https://github.com/betaflight/betaflight/pull/8015)）。

`gps_rescue_alt_mode = [MAX_ALT, FIXED_ALT, CURRENT_ALT]`（Betaflight 4.1 新增）

现在可设置 GPS Rescue 高度：

- **MAX_ALT**：旧设置，高度为 `gps_rescue_initial_alt` 或飞行记录最大高度 +15 m 中较高者。
- **FIXED_ALT**：四轴飞行器始终尝试以设定高度（`gps_rescue_initial_alt`）返航。
- **CURRENT_ALT**：四轴飞行器维持触发 Rescue 时读取的高度返航（不建议）。

### 至此可以测试 Rescue Mode

等待 GPS 获得良好定位。默认情况下，卫星数低于 `gps_rescue_min_sats`（默认 8）时，飞行器无法解锁。

## 建议的测试流程

沿直线飞至超过下降距离至少 100 m。例如下降距离设置为 150 m，则飞到 250 m。继续直飞时，Home Arrow 应调整为指向 Home 点。

### **非常重要：若箭头未指向 Home 点，切勿激活 GPS Rescue。否则四轴飞行器会沿箭头方向飞行。**

激活 GPS Rescue。

### **重要：若飞行器未朝你飞回而开始返航，请准备立即关闭该模式并接管。**

若一切正常，四轴飞行器会朝你返回并开始下降。不要让它太接近地面或自己，因为当前构建不含着陆功能；飞行器可能在附近坠毁或越过你。

若飞行器难以维持稳定高度，可能是 GPS 高度读数不稳定，控制器在追逐移动目标。若高度读数非常稳定，但飞行器仍无法在期望高度 10 m 内稳定，可能需要调整高度油门 PID 增益：

`gps_rescue_throttle_P`
`gps_rescue_throttle_I`
`gps_rescue_throttle_D`

大多数用户不需要微调导航速度增益；如需调整，PID 增益为：

```
gps_rescue_velocity_P = 80
gps_rescue_velocity_I = 10
gps_rescue_velocity_D = 20
```

四轴飞行器可靠返航一次后，可在更大距离和不同方向逐步测试。对功能建立合理信任后，可将 failsafe 设为 GPS_RESCUE：

`set failsafe_procedure = GPS-RESCUE`

如此设置后，failsafe 发生时会启动 GPS Rescue。

v4.0.x 说明：遥控链路恢复后，控制权会立刻返回用户。此时用户应在遥控器上手动激活 Rescue Mode，避免突然切回手动控制；或者随时准备接管。推荐第一种方式，因此若同时用于 failsafe，必须把 Rescue Mode 设在开关上。

v4.1 及以后：RC 链路恢复后，须将任一横滚 / 俯仰 / 偏航输入移出中心，超过 `failsafe_stick_threshold` 百分比，才能退出 failsafe 并将控制权交还飞行员。默认值为 30，表示横滚、俯仰或偏航须离中心至少 30% 才会取消 Failsafe 并恢复控制。若希望 failsafe 与完全控制间的过渡不那么突兀，可降低该值。

此外，可在 Configurator 的 Failsafe 标签页或 OSD 菜单（`FEATURES > FAILSAFE`）中启用 failsafe 流程。若在受限空域飞行，例如室内或树林中，OSD 菜单也便于在飞场禁用 failsafe GPS Rescue；请在适当时重新启用。

## 处理故障 / 合理性检查（非常重要）

若以受监督方式使用 Rescue Mode，例如仅在有图传时通过开关使用，或周边无危险的环境中使用（如水面上），合理性检查完全可选。若计划把它设为 failsafe，通常即使不设 failsafe 也应强烈考虑启用。

`set gps_rescue_sanity_checks = RESCUE_SANITY_ON`

若仅希望在 failsafe（无人监督）时生效，可设为 `RESCUE_SANITY_FS_ONLY`。

合理性检查会确认：

- GPS 接收机仍连接到飞控；
- GPS 接收机正在发送有效 GPS 定位；
- 四轴飞行器未经历剧烈震动（可能是坠机）；
- 卫星数不低于 `gps_min_sats`；
- 到达初始高度后，四轴飞行器正接近 Home 点。

若任一条件不满足，Rescue 操作会中止，即四轴飞行器会坠落。不过最后两个条件在触发前有数秒宽限。若飞行器未接近 Home 点且正在使用磁力计，Rescue 会将 GPS 航向作为第二次机会；若仍检测到飞离，操作会最终中止。

## 无 GPS 定位时解锁

默认情况下，若已将 GPS Rescue 配置到开关或作为 failsafe 流程，Betaflight 不允许无 GPS 定位解锁。有时可能希望在 GPS 定位前飞行，例如信号覆盖较差，或等待获得卫星期间进行短时侦察飞行；代价是 GPS Rescue 被禁用。执行以下设置：

`set gps_rescue_allow_arming_without_fix = ON`

该值允许无 GPS 定位起飞，但**本次飞行中 GPS Rescue 不可用**。OSD 会显示警告 `RESCUE OFF`。若飞行中获得足够卫星，要启用 GPS Rescue，必须降落、上锁并再次解锁。

## Rescue 不可用

若 GPS Rescue 映射到开关和/或设为 failsafe 流程，系统会持续检查最低条件（GPS 接收机已连接、有效 GPS 定位、最低卫星数）。任一条件不满足时，OSD 显示 `RESCUE N/A`。这只是警告；即使警告显示时激活 Rescue，合理性检查仍会计入宽限时间。无论是否启用合理性检查，都会显示该警告。

## 常见陷阱

- 测试 GPS Rescue 前，确保飞行距离超过最低 Home 距离（默认 100 m）。可用 CLI `set gps_rescue_min_dth = <meters>` 设置最小距离；距离小于此值时，GPS Rescue 会使飞行器坠落。
- 某些构型中，加速度计可能随时间漂移，导致 GPS Rescue 无法正常工作。可长时间飞行后激活 Angle 模式检查；若飞行器不能达到接近完美的稳定姿态，请勿在该机使用 GPS Rescue。
- 部分 GPS 设备须用 U-Center 配置才能工作。请参考 Painless360 的[此视频](https://www.youtube.com/watch?v=8FIi_xuH4Vo)。
- GPS Rescue 仍在积极维护 / 开发中；若未使用最新稳定 Betaflight 版本，可能遇到已知问题。请确保使用最新稳定版（当前 4.0）。
- GPS Rescue 并非且永远不会完全可靠，因此绝不应作为唯一恢复措施。即使测试前，也应在 OSD 显示经纬度 GPS 坐标并用 DVR 录制飞行、在遥控器记录包含 GPS 坐标的遥测，或使用独立蜂鸣器等措施。

### 旧版常见陷阱

- 对 4.0 前 Betaflight，强烈建议启用 Air Mode，并可选微调 failsafe Stage 1 设置，以规避刚进入 Rescue Mode 时的坠机检测问题。本质上要确保进入 Stage 2 时不会处于自由下落。
- 使用 Betaflight Configurator 10.4 或更低版本修改 failsafe 参数时，failsafe 流程会被静默重置。保存 Failsafe 标签页改动后，务必在 CLI 手动设置 failsafe 流程。
- 每次解锁都会更新 Home 点。BF 4.0 前，Home 点在上锁时更新，快速切换可能错过。各版本最佳起飞实践是：解锁后等待数秒，直至 OSD 显示 Home 点且距离为 0，再开始飞行；否则上锁、等待数秒并重试。自 Betaflight 4.0 起，可用 `set gps_set_home_point_once = ON`，这样仅电池接入后的第一次解锁用于设置 Home 点。
- 若使用 Crossfire，请在 “CROSSFIRE RX” 菜单将 Failsafe 参数设为 “Cut”。

## 版本历史

**Betaflight 4.1**

- GPS Rescue 在 Failsafe 后接管时，使用摇杆恢复控制（https://github.com/betaflight/betaflight/pull/7936）。

**Betaflight 4.0**

- 防止刚进入 GPS Rescue Mode 时触发坠机检测（https://github.com/betaflight/betaflight/pull/7034）。
- 允许配置最小 Home 距离（https://github.com/betaflight/betaflight/pull/6404）。
- 修复初始阶段 Sanity Check 误报 STALLED / FLYAWAY 的问题（https://github.com/betaflight/betaflight/pull/7254）。
- 为 GPS Rescue 不可靠添加警告提示（https://github.com/betaflight/betaflight/pull/7256）。
- 增加无定位或低卫星数解锁的显式参数：`gps_rescue_allow_arming_without_fix`（https://github.com/betaflight/betaflight/pull/7320）。

**Betaflight 3.5.5**

- 修复初始阶段 Sanity Check 误报 STALLED 的问题（https://github.com/betaflight/betaflight/pull/7254）。

**Betaflight 3.5.3**

- 修复 GPS Rescue 激活时 `MOTOR_STOP` 与自动上锁被激活的问题（https://github.com/betaflight/betaflight/pull/6979）。

**Betaflight 3.5**

- Failsafe 激活 GPS Rescue 时，无论 Sanity Check 设置如何，均检查四轴飞行器距 Home 至少 100 m。更近时会坠落。非 failsafe 激活的 GPS Rescue 行为与 3.4 相同。

**Betaflight 3.4**

- Sanity Check 包含一项测试：Rescue Mode 激活时，四轴飞行器距目标 Home 必须超过 100 m。启用 Sanity Check 时，若在距 Home 小于 100 m 处手动或由 failsafe 激活 GPS Rescue，飞行器会坠落。
