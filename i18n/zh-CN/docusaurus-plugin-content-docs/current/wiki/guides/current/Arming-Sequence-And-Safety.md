# 解锁顺序和安全

## 切换解锁

配置为解锁的 AUX 通道将选择一个超出配置解锁范围的默认值（在“模式”地面站选项卡中配置），该值要么高于或低于配置范围 1“步长”（25us）。这是一项安全功能，可确保默认值不会导致意外解锁。

请注意，此默认值会被来自接收机的第一个值数据覆盖，因此不良的 RX 初始状态或失控保护设置仍然可能导致问题。

## 解锁阻止条件

Betaflight 3.2（及更高版本）包含有关飞行器无法启动的情况的更详细的故障排除信息。

此信息可通过以下方式获取：

- 命令行界面
- Betaflight OSD
- 蜂鸣声模式
- Betaflight 应用程序

其中一些条件是为了帮助防止由于无线电系统配置不良、接收机不可靠/质量差和用户错误而导致的意外解锁。

这些无法解锁的原因会编码为一组标志（请参阅 [runtime_config.h](https://github.com/betaflight/betaflight/blob/master/src/main/fc/runtime_config.h)）。

## 命令行界面

可以通过 `status` 命令查看标志。

某些闪存空间有限的目标将仅提供这些标志的十六进制表示形式，在这种情况下，活动标志必须源自 `runtime_config.h` 中的 `armingDisableFlags_e` 枚举（确保您正在查看的文件版本与固件版本匹配）。

## 蜂鸣器

当尝试解锁但失败时，如果蜂鸣器连接到飞控，它将发出警告信号，指示禁用解锁的最重要（最低数量）原因。

信号如下：

- 五声短促的“注意”蜂鸣声；
- 多次长鸣（可能为 0）；
- 多次间隔较长的短蜂鸣声（可能为 0）。

当前解锁阻止条件的报码可按 `(5 * <长鸣次数>) + <间隔较长的短鸣次数>` 计算。例如：

- 1 声长声和 2 声短声 = 7
- 2 声长蜂鸣声 = 10

## 解锁阻止标志说明

每个标志的含义以及您应该采取哪些措施（可能）解决该问题。

此列表*应该*与 `master`（[src/main/fc/runtime_config.h](https://github.com/betaflight/betaflight/blob/master/src/main/fc/runtime_config.h#L42-L72) 中的 `armingDisableFlags_e` 中的代码保持最新，因此可用于查找对应于某个索引的标志，但是如果您运行旧版本，则必须如上所述手动检查。

<table>
<tr><th rowspan="2">名称</th><th rowspan="2">描述</th><th colspan="6">蜂鸣代码</th><th rowspan="2">建议操作</th></tr>
<tr><th>3.2</th><th>3.3</th><th>3.4/3.5</th><th>4.0</th><th>4.1</th><th>4.2+</th></tr>
<tr><td><code>NOGYRO</code></td><td>未检测到陀螺仪</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>可能是硬件故障，如果之前的固件版本正常运行，则可能是固件问题。或者您可能刷错了固件目标。</td></tr>
<tr><td><code>FAILSAFE</code></td><td>失控保护已激活</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>排除故障情况并重试。</td></tr>
<tr><td><code>RXLOSS</code><sup>(1)</sup> or <code>RX_FAILSAFE</code></td><td>未检测到有效的接收机信号</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>您的接收机可能有故障，或者与发射机没有连接。</td></tr>
<tr><td><code>BADRX</code><sup>(1)</sup> or <code>NOT_DISARMED</code></td><td>您的接收机刚刚从失控保护中恢复，但解锁开关仍处于开启状态</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>将解锁开关拨到关闭位置。</td></tr>
<tr><td><code>BOXFAILSAFE</code></td><td>“FAILSAFE”开关已激活</td><td>5</td><td>5</td><td>5</td><td>5</td><td>5</td><td>5</td><td>参见 <code>FAILSAFE</code></td></tr>
<tr><td><code>RUNAWAY</code></td><td>已触发失控起飞预防（Runaway Takeoff Prevention）</td><td> </td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>上锁（Disarm）以清除此状态。</td></tr>
<tr><td><code>CRASH</code></td><td>已触发防炸机恢复（Crash Recovery）</td><td> </td><td> </td><td> </td><td> </td><td>7</td><td>7</td><td>上锁（Disarm）以清除此状态。</td></tr>
<tr><td><code>THROTTLE</code></td><td>油门通道过高</td><td>6</td><td>7</td><td>7</td><td>7</td><td>8</td><td>8</td><td>将油门降低到 <code>min_check</code> 以下。</td></tr>
<tr><td><code>ANGLE</code></td><td>飞行器不够水平</td><td>7</td><td>8</td><td>8</td><td>8</td><td>9</td><td>9</td><td>将飞行器放置水平，使其处于 <code>small_angle</code> 设定的度数以内（默认 25 度）。</td></tr>
<tr><td><code>BOOTGRACE</code></td><td>通电后过快尝试解锁</td><td>8</td><td>9</td><td>9</td><td>10</td><td>10</td><td>10</td><td>请等待 <code>pwr_on_arm_grace</code> 设定秒数（默认 5 秒）过后。</td></tr>
<tr><td><code>NOPREARM</code></td><td>预解锁开关未激活，或上锁后未重新拨动预解锁开关</td><td>9</td><td>10</td><td>10</td><td>10</td><td>11</td><td>11</td><td>拨动预解锁开关。</td></tr>
<tr><td><code>LOAD</code></td><td>系统负载过高，无法安全飞行</td><td>10</td><td>11</td><td>11</td><td>11</td><td>12</td><td>12</td><td>检查配置并禁用一些功能。</td></tr>
<tr><td><code>CALIB</code></td><td>传感器校准仍在进行中</td><td>11</td><td>12</td><td>12</td><td>12</td><td>13</td><td>13</td><td>等待传感器校准完成。</td></tr>
<tr><td><code>CLI</code></td><td>CLI 处于活动状态</td><td>12</td><td>13</td><td>13</td><td>13</td><td>14</td><td>14</td><td>退出 CLI。</td></tr>
<tr><td><code>CMS</code></td><td>CMS（配置菜单）处于活动状态 - 通过 OSD 或其他显示设备</td><td>13</td><td>14</td><td>14</td><td>14</td><td>15</td><td>15</td><td>退出 CMS（或 OSD 菜单）。</td></tr>
<tr><td><code>OSD</code></td><td>OSD 菜单处于活动状态</td><td>14</td><td>15</td><td>16</td><td></td><td></td><td></td><td>退出 OSD 菜单。</td></tr>
<tr><td><code>BST</code></td><td>黑羊遥测设备（例如 TBS Core Pro）已上锁并阻止解锁</td><td>15</td><td>16</td><td>16</td><td>15</td><td>16</td><td>16</td><td>请参阅您硬件的手册。</td></tr>
<tr><td><code>MSP</code> </td><td>MSP 连接处于活动状态，可能通过 Betaflight 应用程序连接</td><td>16</td><td>17</td><td>17</td><td>16</td><td>17</td><td>17</td><td>断开 Betaflight 应用程序的连接。</td></tr>
<tr><td><code>PARALYZE</code></td><td>已激活瘫痪模式</td><td></td><td></td><td>18</td><td>17</td><td>18</td><td>18</td><td>重新给飞控断通电以重置。</td></tr>
<tr><td><code>GPS</code></td><td>已配置 GPS 救机模式，但未定位到所需数量的卫星</td><td></td><td></td><td>19</td><td>18</td><td>19</td><td>19</td><td>等待 GPS 定位，启用无 GPS 定位解锁，或禁用 GPS 救机模式。</td></tr>
<tr><td><code>RESCUE_SW</code></td><td>GPS 救机开关处于不安全位置</td><td></td><td></td><td></td><td>19</td><td>20</td><td>20</td><td>关闭 GPS 救机开关以允许解锁。</td></tr>
<tr><td><code>RPMFILTER</code><sup>(2)</sup> or <code>DSHOT_TELEM</code></td><td>基于电机转速（RPM）的滤波未正常工作</td><td></td><td></td><td></td><td>21</td><td>21</td><td>21</td><td>一个或多个电调（ESC）未提供有效的 RPM 遥测。</td></tr>
<tr><td><code>REBOOT_REQD</code></td><td>需要重启飞控</td><td></td><td></td><td></td><td></td><td>22</td><td>22</td><td>重启飞控以使设置更改生效。</td></tr>
<tr><td><code>DSHOT_BBANG</code></td><td>DShot Bitbang 未正常工作</td><td></td><td></td><td></td><td></td><td>23</td><td>23</td><td>(3)</td></tr>
<tr><td><code>NO_ACC_CAL</code></td><td>需要校准加速度计</td><td></td><td></td><td></td><td></td><td></td><td>24</td><td>校准加速度计，或禁用使用它的功能。</td></tr>
<tr><td><code>MOTOR_PROTO</code></td><td>电调/电机协议未配置</td><td></td><td></td><td></td><td></td><td></td><td>25</td><td>在地面站“配置”选项卡上选择要使用的电调/电机协议。</td></tr><tr><td><code>ARMSWITCH</code></td><td>解锁开关处于不安全位置</td><td>17</td><td>18</td><td>20</td><td>21</td><td>24</td><td>26</td><td>拨动解锁开关至关闭位置后再试。</td></tr>
</table>

(1) 飞行过程中 Betaflight OSD 上可能会出现此信息，请将其视为您的无线电系统有故障或您正在飞行范围的边缘。就像处理“RSSI 极低”警告一样对待它。

(2) 基于 RPM 的过滤已启用，但一个或多个 ESC 未提供有效的 DSHOT 遥测。检查 ESC 是否有能力并安装了支持双向 DSHOT 遥测所需的固件。

(3) Bitbang DSHOT 工作不正常，无法控制电机。可能是由于计时器与飞控上启用的其他功能冲突所致。
