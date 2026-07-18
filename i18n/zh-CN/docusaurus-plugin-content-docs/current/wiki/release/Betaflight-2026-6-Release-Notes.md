---
sidebar_position: 1
sidebar_label: 2026.6 发行说明
---

# 2026.6 发行说明

欢迎使用 Betaflight 2026.6！此版本为**自主飞行奠定了首批基础**：新增飞行计划选项卡及其底层自动驾驶仪；两者目前仅限仿真使用，后续版本将持续完善。此外，2026.6 还新增 ESP32、STM32H5/N6/C5（包括首个可用的 C5 开发板 NUCLEOC562RE）、STM32H757 双核 MCU 和 X-CORE Labs X32M7 平台支持；支持可切换电池配置、光流位置保持、几乎完全迁移至 Nuxt UI 组件库的现代化应用、适用于 Raspberry Pi Pico 2 (RP2350) 飞控的全新像素 OSD、首个 DroneCAN GPS、面向 QGroundControl 兼容性的扩展 MAVLink 遥测（现含航点任务传输）、Android 原生 USB 刷写、新的应用内 Blackbox 日志查看器、专用 iOS 应用，以及能让 iOS 和其他仅支持 Wi-Fi 的设备无线连接飞控的全新 **Betaflight Bridge** 配套设备；同时还包括广泛的传感器、协议和硬件新增支持。

我们已尽力提升本版本的稳定性。如仍发现 **bug**，请在 [GitHub 问题跟踪器](https://github.com/betaflight/betaflight/issues) 提交 **issue**。

如需帮助、支持或参与社区讨论，请加入专用 [Discord](https://discord.gg/n4E6ak4u3c) 服务器。

## 1. 应用

:::note
请使用在线的[渐进式 Web 应用（PWA）](https://app.betaflight.com)。
:::

应用继续采用与兼容固件相同的发行版本号（2026.6），并在线自动更新。

### 1.1 完成 Vue 3 和 Pinia 迁移

整个应用已基于 **Vue 3** 和 **Pinia** 状态管理重构，取代旧版 jQuery 框架。每个选项卡均已改写为现代 Vue 单文件组件，从而带来更快的加载速度、更流畅的交互，以及全应用一致的使用体验。jQuery 及所有旧版插件均已彻底移除。

### 1.2 迁移至 Nuxt UI 组件库

在 Vue 3 迁移的基础上，应用正逐步采用 **Nuxt UI** 组件库，以获得更统一、现代且无障碍友好的界面。Nuxt UI 主题已与应用的浅色/深色主题同步，并全面改善了响应式断点。

目前几乎所有选项卡均已完成转换。本版本新增：

* **应用框架**：连接/刷写按钮、端口选择和固件虚拟选项
* **侧边栏**导航（Nuxt UI `UNavigationMenu`）
* **选项**选项卡
* **文档与支持**选项卡
* **设置**选项卡
* **端口**选项卡
* **配置**选项卡
* **接收机**选项卡
* **PID 调校**选项卡
* **调整**选项卡
* **失控保护**选项卡
* **OSD** 选项卡
* **电机**选项卡
* **传感器**选项卡
* **GPS** 选项卡
* **模式**选项卡
* **预设**选项卡
* **LED 灯带**选项卡
* **CLI** 选项卡
* **Blackbox** 选项卡（改进搜索功能）
* **飞行计划**选项卡
* **自动调参**选项卡
* **固件刷写器**选项卡（界面焕新）
* **电源**选项卡
* **用户资料**选项卡
* **备份**选项卡（包括云备份/用户资料表格和登录模态框）
* **舵机**选项卡
* **系留日志记录**选项卡
* **VTX** 选项卡

应用内共享对话框（复制配置、重启、问题报告、配置选择、等待、是/否，以及备份、CLI、刷写器、电机、OSD、预设、设置和用户资料中的各选项卡对话框）也已迁移至 Nuxt UI 的 `UModal`，从而保持一致的外观与行为。

其余旧版选项卡将在后续版本中继续迁移。

### 1.3 布局重构

顶部标题栏已取消；连接状态、固件/虚拟选项及常用操作现位于侧边栏和各选项卡自己的工具栏中。这为每个选项卡提供更多垂直空间，也使桌面与移动设备的整体布局更一致。

### 1.4 飞行规划 UI（第一步）

本版本引入新的 **飞行计划**选项卡**首个版本**，为 Betaflight 的自主任务提供用户界面基础。可在交互式地图上直观布置航点、编辑并重新排序，查看高程剖面，并直接向飞控保存或从飞控加载计划。除基础位置航点外，编辑器现支持 **TAKEOFF** 航点和**修饰器**航点类型，因此可在计划中直接描述起飞行为和分段修饰器。

请将其视为**基础设施**：选项卡与工作流已经就绪，功能会在后续版本中持续充实。

:::warning
底层自动驾驶仪固件仍属**实验性功能，尚不可用于飞行**。目前仅在仿真（SITL）中测试。不得在真实飞行器上启用自动驾驶仪后解锁。飞行计划选项卡旨在供早期用户在仿真中试用，功能将在后续版本成熟。
:::

### 1.5 电池配置支持

应用现支持在飞控配置的**多个电池配置**之间切换，便于在不同类型电池间切换而无需重新配置。

### 1.6 自动调参选项卡（实验性）

新增 **自动调参**选项卡，提供基于文件的工作流，可从 Blackbox 日志分析飞控调校。该功能导入包含 chirp 扫频数据的日志，以 Welch 方法计算闭环频率响应，并基于带宽、相位裕度、谐振峰和噪声底，推荐**简化调校**滑块值。

该选项卡无需连接飞控即可使用。连接后，**Apply Gains** 按钮会通过 MSP 写回建议的简化调校值。chirp 数据由 `BOXCHIRP` 飞行模式位驱动分段。自动调参现受“选项”中的**专家模式**限制，并置于侧边栏 Blackbox 附近，避免日常用户的标准侧边栏过于拥挤。

### 1.7 用户账户、备份与云同步

新的**基于 WebAuthn 的登录**系统允许你安全地将配置备份保存并按飞行器在云端管理。备份可下载、编辑和删除，且支持头像编辑与自动备份。

对于 WebAuthn 不可靠的浏览器（例如 Safari），还提供**邮箱验证码登录**作为 Passkey 的替代方案。重新设计的登录对话框提供主 Passkey 按钮、Passkey 设置链接，并可切换至邮箱请求/验证流程。

### 1.8 配色主题

“选项”选项卡新增三种配色主题：**黄色**（默认）、**琥珀色**和**高对比度**，可更灵活地控制应用外观。

### 1.9 飞行前环境检查

新的 **Preflight** 选项卡显示影响飞行安全的实时条件：天气（温度、风、能见度、降水）、太阳活动（Kp 指数）、电池状态、密度高度、民用暮光时段、起雾概率和地点海拔。支持地理定位和已保存的常用飞场。

该选项卡还包含**空域与禁飞区**部分，可获取当前位置的 NOTAM 和空域数据，解析 NOTAM、TFR、特殊用途空域、SNOWTAM 和 ASHTAM 条目及其有效时段和高度限制，并提供 SkyVector 空域图链接。NOTAM 数据源可选择 **FAA NOTAM API**（美国）或 **OpenAIP**（全球），两者均需用户提供 API 密钥；欧洲还提供 EUROCONTROL NOTAM。

### 1.10 板卡资质

固件刷写器现显示**板卡资质状态**：目标是官方验证（Verified Partner）、社区支持（Vendor/Community）还是旧版目标，帮助你在刷写前了解支持等级。

刷写器也已重构：原有四个子选项卡合并为 **Board & Build**（板卡选择和构建配置）与 **Flash**（发行/构建信息和刷写终端）两个；采用选项卡布局、侧边栏图标和可折叠信息框。云构建和刷写状态通过持久显示的**进度环**呈现，刷写结果会在完成后保留，无需重复流程即可查看。

本版本还新增两项刷写器功能：

* **ESP32 固件刷写**：刷写器可通过串行引导加载程序直接写入合并的 ESP32 `.bin`（含芯片自动检测和复位处理），与新增的固件侧 ESP32 平台支持相配套。目前此路径仅支持 **Web Serial**，因为它依赖桌面和移动串行层尚未开放的 DTR/RTS 控制
* **刷写后恢复备份**：若刷写前已创建备份，刷写器可在成功刷写后直接原位恢复，无需重新连接并访问“备份”或“预设”选项卡。刷写时备份选项已移至刷写器高级设置

### 1.11 响应式与移动端改进

* 可适应不同屏幕尺寸的响应式标题栏
* 改进横屏移动端布局
* 采用弹性网格布局的响应式 GPS 选项卡
* 改善平板和手机上的整体易用性

### 1.12 Android 和桌面端

* **Android 通过 USB 使用 DFU**：可直接从 Android 构建原生刷写固件，无需额外工具
* **Android 文件访问**：完整支持使用文件选择器在设备上打开和保存配置备份及日志
* **Tauri 桌面端框架**：为与 PWA 并行的轻量级 Tauri 桌面构建奠定初步基础
* **iOS 应用（TestFlight）**：原生 **Tauri iOS 应用**现已在 CI 中构建并签名，且通过 **TestFlight** 分发。由于 iOS 没有 USB 串口，iOS 应用通过 **TCP** 连接至 [Betaflight Bridge](#3-betaflight-bridge-experimental)，这是目前在 iPhone 或 iPad 上使用 Betaflight 应用的首个实用途径
* **Tauri Android 构建**：除既有的 Capacitor Android 构建外，新增带 Google Play CI 流水线的 Tauri Android 目标
* **嵌入式 WebSocket 部署**：当应用由嵌入式 WebSocket 提供服务时（例如直接运行在飞控或配套设备上），会跳过兼容性检查和 Service Worker，避免该模式下的重载循环

### 1.13 直接向飞行器恢复备份

**备份**选项卡现有 **Restore** 按钮，可将备份直接写回已连接飞控。应用不再需要打开交互式 CLI 会话来应用备份，而是逐项发送设置，并在对话框中实时显示进度。传统 CLI 选项卡不变，仍可作为手动后备方案。

### 1.14 桌面应用与夜间版本下载

新的 Tauri Betaflight 应用桌面安装包（Windows、macOS 和 Linux）现与 Android APK 一同发布在 **[downloads.betaflight.com](https://downloads.betaflight.com)**。同一站点还提供桌面应用和 Android APK 的**夜间构建**，无需等待带标签的发行版，即可在版本间试用最新改动。

为保持跨平台一致性，桌面软件包现命名为 `betaflight-app`。

### 1.15 面向高级连接的专家模式

除非在“选项”选项卡启用**专家模式**，否则 **Virtual Connect** 和 **Manual Connect** 选项会被隐藏，从而减少日常用户界面的干扰，同时仍向高级用户和开发者保留这些工具。

### 1.16 调校 UI 改进

* PID 滤波页面已恢复 **Yaw Low-Pass Filter** 开关；每个滤波器滑块还内置开/关开关（Low / Default / High 标签）
* **PID** 选项卡已重新布局，当前配置名称现显示在选项卡标题中，更清楚地标识正在编辑的配置
* `dyn_notch_q` 滑块提示现明确说明显示值需除以 100
* **RPM 滤波器设置**现显示在 PID 滤波页面，可直接在应用中调整谐波数量、Q 因子和最低频率，无需使用 CLI

### 1.17 Blackbox 日志查看器

完整的 **Blackbox 日志查看器和分析器**现以内置 **Blackbox Viewer** 选项卡提供，即将独立 Blackbox Explorer 直接集成到 Betaflight 应用。打开已记录的 Blackbox 日志后，可使用可配置图表、频谱分析器、2D/3D 飞行器姿态视图、GPS 地图、时间线回放及 CSV 导出进行检查，整个过程无需离开应用。多日志文件可选择要查看其文件头的日志，图表面板可通过拖放重新排序。

它不同于已有的同名 Blackbox 选项卡：**Blackbox** 选项卡负责配置机载记录并从飞控下载日志；**Tethered Logging** 通过连接采集实时日志；新的 **Blackbox Viewer** 则用于离线分析已记录日志。

### 1.18 板卡对齐向导

“传感器”选项卡新增**板卡对齐向导**，用于帮助正确设置飞控安装方向。它根据加速度计和陀螺仪读数实时计算，提供清晰的分步指引以交互方式设置正确方向。

### 1.19 其他应用改动

* **已移除转发器选项卡**：该功能已在配置器中退役；转发器提供方和数据现在通过固件侧 CLI 管理
* **支持 Firefox 151+**：Firefox 151 已提供 WebSerial，故已取消仅限 Chromium 浏览器的检查，应用可在 Firefox 原生运行
* 连接列表现可识别 **CH340 USB 转串口适配器**，包括 CH340 变体、CH341 和 CH340S；Android USB 过滤器已加入 WCH 厂商条目，适配器也可在移动端使用
* “传感器”选项卡中的**传感器硬件显示**已与 GPS 协议分离
* **磁力计校准重构**：除基础引导校准外，新增在客户端拟合校准球体的 **Guided (Client)** 模式，以及一次翻转即可解算硬铁、软铁校正**和**传感器至飞控安装对齐的 **Full Cal (auto-align)** 模式。覆盖范围在 20 个二十面体区域上追踪，并有 8 步引导动作；飞行器图标和磁场矢量箭头由**四元数姿态**数据流 (`MSP_ATTITUDE_QUATERNION`) 绘制，球体视图不会发生万向节锁；罗盘方位标记也已放大以提升清晰度
* **侧边栏和 UserSession 重设计**：日志移入独立模态框，用户会话 UI 基于 Nuxt UI 重建；侧边栏恢复点击外部关闭，并改善移动端/无障碍行为
* 连接至 MSP API >= 1.48 的固件时，PID 选项卡隐藏 **Absolute Control**（该固件版本已不再支持该功能）
* **Simplified Master Slider** 和 **adjCenter/adjScale** 已加入“调整”选项卡；每项调整现有明确的 **Step / Absolute 模式选择器**，仅当所选模式使用时才显示 Center 和 Scale 输入，不再依据非零值推断
* “电源”选项卡的**电池状态**现除原有电池读数外，还显示实时**功耗**（瓦）和**压降**
* **接收机失控保护警告**：飞控处于失控保护时，“接收机”选项卡显示横幅并着色通道条，避免将失控保护输出值误判为接收机故障
* **虚拟模式易用性改进**：提供合理的默认 PID/Rate/Filter 值；CRSF 和 SBUS 加入虚拟模式接收机选项；移植固件的简化调校支持；状态栏现将虚拟模式显示为设备
* **识别 X32M7 板卡**：已为新 X-CORE Labs X32M7 平台加入 USB 串口和 DFU 过滤器，桌面端与 Android 均适用
* UI 语言列表新增**格鲁吉亚语**
* **OSD 元素相对拖放**：元素会按实际鼠标位移移动，不再吸附至放置单元格；包括大型元素在内的精细调整更可预期
* 支持 **OSD time variant** 元素
* 新增用于指示位置保持失败的 **POSHOLD_FAILED OSD warning** 元素
* “端口”选项卡中**仅允许一个 UART 指定为 Serial RX 输入**，防止产生此前需手动排查的无效多端口配置
* 图标集由 Font Awesome 迁移至 **Lucide**（通过 `UIcon`），完全移除 Font Awesome 依赖
* 支持在 Android 设备上用 **sslip.io** 进行本地网络开发
* Android 自适应启动器图标（支持浅色/深色模式）
* 更新至 Capacitor 8.0.2，以改善 Android 兼容性
* 移动端恢复状态栏

### 1.20 应用 Bug 修复

* 修复 Vue 迁移后 DFU 刷写停滞的问题
* 修复电机测试失效的问题
* 修复 CLI 控制台问题
* 修复切换双向 DShot 时动态陷波滤波器设置的问题
* 修复预设警告对话框被遮蔽的问题
* 修复蜂鸣器配置首次加载和批量切换刷新问题
* 修复“端口”选项卡中 GNSS 功能启用问题
* 修复舵机索引显示顺序
* 修复重连进度和 DFU 等待问题
* 修复重启时间戳跟踪和罗盘可用性中的竞态条件
* 修复 GPS 和 Blackbox 选项卡因未定义引用而无法加载的问题
* 修复油门曲线预览不更新的问题
* 修复 OSD 选项卡编辑后丢失脏状态的问题
* 修复新 Nuxt UI 选项卡中的数字输入和数值格式问题
* 修复 CLI 选项卡复制粘贴行为
* 修复 `itermThrottleThreshold` 和 `antiGravity` 的 semver 比较
* 修复 UI 中强制重排的性能问题
* 修复“调整”选项卡提示被固定页面标题裁切的问题
* 修复固件升级要求提示未使用现代对话框存储的问题，现可与应用其余部分一致地呈现
* 修复 OSD 报警范围和脏状态跟踪，确保保存状态准确反映改动
* 修复“电机”选项卡 ESC 传感器处理、脏状态传播和数值格式问题
* 修复“接收机”选项卡刷新时的脏状态与过期重启状态处理
* 修复未执行完整芯片擦除时的 DFU 刷写崩溃
* 修复“选项”对话框 `USelect` 下拉框不可点击的问题，并在打开对话框时重新同步主题/专家/颜色状态，避免显示过期值
* 修复“预设”选项卡固定滤波栏覆盖“选项”对话框的问题
* 修复“失控保护”选项卡首次访问时不加载模式数据的问题，并以 `UBadge` 替换原始 HTML 徽章
* 修复页面卸载时 WebSerial 端口未关闭、重载后要求重新插拔的问题
* 修复 CLI 粘贴变慢、大量粘贴时强制重排及自动滚动不可靠的问题
* 修复 D-Term Lowpass 1 动态最大截止频率滑块约束与固件范围不一致、导致默认值向上吸附的问题
* 修复 [CVE-2026-39315](https://github.com/advisories/GHSA-95h2-gj7x-gx9w) 安全问题

## 2. 固件

### 2.1 主要新功能

#### 自动驾驶仪和航点任务（第一步：仅限仿真）

本版本为 Betaflight 自主飞行奠定了**基础**。包含支持多旋翼和固定翼的首个自动驾驶仪版本，具有 **GPS 航点导航**功能；最多支持 30 个航点，且可分别配置速度、高度和悬停行为。

当前已具备：飞行模式基础设施、固件内航点存储、`AUTOPILOT` 模式位、导航算法（航点跟随、螺旋降落，以及适用于多旋翼和固定翼的多种偏航模式）和 RX 丢失策略。其上方有一个精简的**飞行计划引导执行器**：在启用 `AUTOPILOT` 时，直接由已存飞行计划驱动位置导航外环。`FLYOVER`、`FLYBY` 和 `HOLD`（含时长）航点行为均已接通；`LAND`、`ORBIT` 和 `FIGURE8` 模式仍在开发中。

驱动这些功能的底层**三维位置估计器**也是本版本新增：它将 GPS、加速度计、光流和测距仪数据融合为单一平滑的位置解；这也是自动驾驶仪和无 GPS 位置保持功能得以实现的基础。

未来数个版本将持续建设此基础，直至功能**完全具备实际使用条件**。

:::danger
自动驾驶仪仍属**实验性功能，且仅在仿真（SITL）中测试**。它**尚不可飞行**，不得在真实飞行器上解锁。本初始版本用于让开发者和早期测试者在功能成熟期间端到端试用工作流。
:::

**在仿真中试用：**

* 在“模式”选项卡将 `AUTOPILOT` 飞行模式分配给开关
* 使用 `waypoint` CLI 命令添加、编辑或导出航点
* 使用 `set ap_hover_throttle`、`set ap_landing_altitude_m`、速度 PID 项和地理围栏限制配置行为
* 使用新增 `ap_stop_threshold` 设置调节接近/停止行为：自动驾驶仪现在会更平顺地制动进入下一个航点；旧 `ap_position_a` 项已移除，改用新的制动算法
* 设置 RX 丢失策略（禁用自动驾驶仪、继续任务或降落）

**Upixel UP-T1** 测距仪现由光流代码路径直接处理，无需独立驱动程序。

#### 可切换电池配置

可保存具有独立电压阈值、电芯数和容量设置的**多个电池配置**。更换不同类型电池时，可通过 CLI 或 MSP 切换配置。

**设置：**

* 在 CLI 中使用 `battery_profile <index>` 切换配置
* 每个配置各自具有 `vbatmaxcellvoltage`、`vbatmincellvoltage`、`batteryCapacity`、`forceBatteryCellCount` 和警告阈值
* 配置可命名（最多 8 个字符），便于识别
* 可选基于检测到的电芯数自动切换

#### 光流位置和高度保持

支持 **Upixel UP-T1-001-Plus** 一体化光流与激光测距传感器，可在无 GPS 时实现位置和高度保持，适合室内飞行。

**设置：**

* 将 Upixel 传感器连接至一个空闲 UART，波特率为 115200
* 设置 `set poshold_position_source = AUTO` 在 GPS 与光流之间自动选择，或使用 `GPS_ONLY`、`OPTICALFLOW_ONLY` 强制选择
* 使用 `poshold_opticalflow_quality_min` 和 `poshold_opticalflow_max_range` 调节阈值
* 量程：2.5 cm 至 12 m

#### CAN 总线支持与首个 DroneCAN GPS

Betaflight 现支持 **CAN 总线**：这是一种广泛用于连接 GPS 模块、电子调速器、云台和空速传感器等外设的远距离、抗干扰通信标准。**STM32G4**、**STM32H7** 和新 **STM32C5** 系列已启用硬件支持。

基于 CAN 驱动，本版本还交付了首批 **DroneCAN** 支持。DroneCAN 是许多现代无人机外设采用的开放标准协议：

* 核心 **DroneCAN 协议栈**，包含节点状态通告和节点信息响应，使 DroneCAN GPS 或其他设备可在总线上发现并识别飞控
* **DroneCAN GPS 提供程序**，接收标准 `Fix2` GPS 消息并注入 Betaflight 正常 GPS 流程，因此 GPS Rescue、位置保持、OSD 坐标和 Blackbox 日志均可像使用串行 GPS 一样使用 DroneCAN GPS

使用 `resource CAN_TX <n> <pin>` 和 `resource CAN_RX <n> <pin>` 配置 CAN 引脚，并通过 `set can_bitrate` 设置总线速率（默认 1 Mbit/s）。

:::note
DroneCAN 支持尚处初始阶段。许多外设类型尚未支持，且仅测试了部分常见 GPS 模块。计划在后续版本提供 STM32H5 和 STM32N6 的 CAN 支持。
:::

#### Raspberry Pi Pico 2 (RP2350) 像素 OSD

Betaflight 2026.6 为基于 Raspberry Pi Pico 2 (RP2350) 的飞控引入**全新屏幕显示系统**。此前所有 Betaflight OSD 都依赖独立专用芯片（如 MAX7456）将文字和图标叠加到视频信号上；而 **Pico 2 板卡现可完全在主微控制器内完成此工作**，无需额外 OSD 芯片。

其主要特点：

* **原生模拟视频输出**：OSD 直接叠加在标准模拟视频信号上，可发送至任意接受复合视频的 FPV 图传发射器；支持 **PAL 和 NTSC**
* **自动检测 PAL 或 NTSC**：飞控启动时采样输入视频同步信号并自动选择正确模式。若 OSD 配置中的视频格式与相机不匹配，将显示警告，且 OSD 会以实际线路信号为准
* **像素级 OSD 元素**：除传统字符网格元素外，**人工地平线、地平线侧栏和摇杆叠加图形**现按像素绘制。线条更平滑、角度更精细，不再受限于 12 × 18 像素字符单元
* **上传自定义字体**：默认内置标准 Betaflight OSD 字体；可像在 MAX7456 飞控上一样，从配置器应用的 OSD 选项卡上传自定义字体
* **标准 SD 布局**：屏幕仍使用熟悉的 30 列布局（PAL 16 行、NTSC 13 行），既有 OSD 布局和警告可直接迁移
* **平滑无撕裂更新**：OSD 绘制至后备缓冲区，并在视频帧之间切换至屏幕；即使人工地平线等繁忙元素也不会撕裂或闪烁
* **不降低飞行环性能**：渲染使用 Pico 2 专用片上硬件独立输出像素数据，不影响陀螺仪环路

使用时，飞控需要有三根信号引脚接入视频电路：**白电平引脚**、**黑电平引脚**和**同步检测输入**。硬件厂商会在其 Pico 2 设计上市时发布针对板卡的接线说明。

:::note
像素 OSD 仅适用于 RP2350（Raspberry Pi Pico 2）飞控。MAX7456 和其他基于字符的 OSD 硬件在所有其他支持平台上仍按原方式工作。
:::

### 2.2 新平台支持

#### ESP32（实验性）

Betaflight 现可运行于 ESP32 微控制器，支持 **ESP32-S3** 和原始 **ESP32-WROOM** 作为构建目标。

**ESP32-S3 功能：**

* DShot 150/300 电机输出，支持命令
* 所有主要接收机协议（CRSF、S.BUS、GHST、IBUS、FPORT）、遥测，以及通过 USB 或串口的 MSP
* 具备自动错误恢复的 I2C、ADC，以及带连接检测的 USB
* SD 卡 Blackbox

**ESP32-WROOM**（原始 ESP32）也受支持，具备以上功能，但不支持高速批量传输；适用于较低端的使用场景。

同时新增 **ESP32-C5** 和 **ESP32-P4** 构建目标骨架（并升级至 ESP-IDF 5.4），为未来支持这些芯片奠定基础。

:::warning
ESP32 支持仍为实验性功能，预计会持续开发，并可能引入破坏性改动。
:::

#### STM32H5

完整支持 **STM32H562** 和 **STM32H563** 处理器，为飞控厂商提供又一现代中端选择。ST 的 **NUCLEO-H563ZI** 开发板已作为参考目标移植，使开发者可方便地开始使用 H5 系列。

可用外设包括：串口（UART）、SPI、I2C、ADC、USB、通过 SDIO 使用 SD 卡、DShot 电机输出、常规 PWM 输出、LED 灯带、转发器、相机控制、片上配置存储和硬件内存保护。

#### STM32N6（开发者预览）

初步支持 **STM32N657**，大部分核心外设均可用：UART、SPI、I2C、ADC、USB、DShot、PWM 输出，以及通过 SDIO 使用 SD 卡。还支持闪存存储和从外部内存执行。ST 的 **STM32N6570-DK** 开发板已作为参考目标移植，提供 **LTDC** 显示后端、**SSD1306** I2C OLED 后端及用于检查板载状态的 CLI `dump` 命令。第二块 N6 板 **OPENN657V1** 现可从 XSPI Flash 原地执行 Betaflight，并使用持久片上配置（eeprom save/load、VCP 枚举和重启均端到端可用）。

本版本的后续 N6 工作还修正了大量从 H7 原样带入的引脚/AF 表项：计时器、SPI、I2C、UART 和 ADC 表均已按 ST N6 数据手册审计；RIFSC/GPDMA 安全别名路径已修复；**DShot 电机输出**现可在 N6 上使用。

:::warning
STM32N6 仅适合开发者和早期采用者。
:::

#### 带 NUCLEOC562RE 开发板的 STM32C5（开发者预览）

新 **STM32C5 系列**是 ST 推出的低成本 Cortex-M33 产品线，主频为 144 MHz。Betaflight 2026.6 支持该系列三个成员：

* **STM32C591**：原始 C5 芯片（1 MB Flash、256 KB SRAM）
* **STM32C562**：较小变体（512 KB Flash、128 KB SRAM）；ST 的 **NUCLEOC562RE** 开发板是 C5 系列的**首个可用 Betaflight 目标**，适合作为低成本开发板，供希望适配自有硬件的开发者和早期采用者使用
* **STM32C593**：内置 CAN 总线的变体

NUCLEOC562RE 当前可用功能：串口（UART）、SPI、I2C、ADC、USB、DShot 电机输出（位带实现）、WS2811 LED 灯带、片上配置存储、EXTI 中断和 144 MHz 系统时钟。尚未实现 SD 卡。

:::warning
STM32C5 支持是面向平台移植的开发者预览。NUCLEOC562RE 是合适的开发板，但目前尚无量产 STM32C5 飞控。部分外设类型仍在完善，且这些目标当前未纳入 CI。
:::

#### Xcore32m7（X-CORE Labs，实验性）

Betaflight 现可运行于 **X32M7**，这是一颗来自 **X-CORE Labs** 的 Cortex-M7 微控制器。参考目标为 **X32M7B** 板卡，基于厂商 X32M7 SDK 完成移植。

可用外设包括：串口（UART）、SPI、I2C、ADC、DAC、USB（高速 VCP 和 USB 大容量存储）、通过 SDMMC/SDIO 使用 SD 卡 Blackbox、DShot 电机输出（位带实现）、WS2811 LED 灯带、FDCAN、EXTI 中断、RTC、外部陀螺仪时钟输入 (`GYRO_CLKIN`)、从 XSPI Flash 原地执行和持久片上配置存储。

:::warning
X32M7 支持为本版本新增实验性功能，预计会持续开发，并可能引入破坏性改动。
:::

#### RP2350（Raspberry Pi Pico 2）改进

* **像素 OSD**：全新屏幕显示可直接叠加至模拟视频信号，无需独立 OSD 芯片。详见上文 [Raspberry Pi Pico 2 像素 OSD](#raspberry-pi-pico-2-rp2350-像素-osd)
* **双向 DShot 遥测**现已完整可用，因此 Pico 2 板卡可使用 **RPM 滤波、动态怠速和动态陷波滤波器**
* RP2350A 和 RP2350B 现支持 **SBUS 接收机协议**
* 新增**磁力计**、**通过 UART 的 MSP** 和 **VTX** 支持
* 修复由电机正时问题导致的未解锁状态下电机异常抖动
* 多项串口可靠性修复
* 同时支持 RP2350A 和 RP2350B 变体

### 2.3 新硬件支持

#### 传感器

| 类型 | 传感器 | 说明 |
| --- | --- | --- |
| IMU | ICM-42686P | 6 轴，SPI |
| IMU | ICM-42622P | 6 轴，SPI |
| IMU | LSM6DSK320X | 6 轴，SPI |
| 气压计 | BMP580 / BMP581 | I2C |
| 磁力计 | MMC5603 | I2C |
| 测距仪 | Nooploop TOFSense 系列 | F、FP、F2、F2P、F2PH、F2MINI 变体；115200 波特率 UART |
| 光流 | Upixel UP-T1-001-Plus | 一体化光流 + 激光测距仪 |

#### Flash 芯片

本版本新增支持以下 Blackbox / 配置存储 Flash 芯片：

* GD25Q16E（16 Mbit）、GD25Q128（128 Mbit）、BY25Q64（64 Mbit）、BY25Q128ES（128 Mbit）、Zetta ZD25WQ32CE（32 Mbit）、Macronix MX25L12845G（128 Mbit）、XTX XT25F128F（128 Mbit）NOR Flash
* **OctoSPI 多芯片支持**：包含 **Macronix MX66UW1G45G**（1 Gbit）OctoSPI NOR Flash 驱动；在配备 OctoSPI 总线的平台上，它为 Blackbox 存储提供更高容量和带宽
* 改进块管理的 **MT29F NAND Flash**（MT29F1G01ABAFDWB，1 Gbit），显著增加 Blackbox 存储容量

#### 其他微控制器系列

除上述新 STM32 平台外，厂商还可使用：

* **STM32H757**：H7 系列新增**双核**成员（Cortex-M7 + Cortex-M4）。Betaflight 运行于 M7 核；仅当 `0x08180000` 处刷有有效 M4 镜像时才会释放 M4 的复位，否则 M4 保持停机。还收紧了 USB 时钟设置竞态，使 H757 板卡的 OTG 可稳定枚举
* **GD32H7**：现支持 GigaDevice H7 系列，扩展可运行 Betaflight 的高性能飞控范围
* **APM32F4**（F425/F427）：在既有 F4 支持之外新增 APM32 变体，为厂商提供更灵活的供货选择

### 2.4 协议与连接性

#### ExpressLRS 4.0 SPI 支持

为基于 SPI 的接收机提供兼容 ExpressLRS V4 的协议支持，改进数据包同步稳健性并提升遥测带宽。

新刷写固件默认使用 ELRS V3，该版本与 ELRS V4 发射机不兼容。可在固件刷写器的构建标志中设置 ELRSV4 来启用 V4，但随后将与 ELRS V3 发射机不兼容。

#### CRSF AHRS 遥测

CRSF 遥测已扩展为包含全分辨率运动数据（加速度计和陀螺仪）、气压高度和垂直速度、磁航向，以及三轴 GPS 速度。因此，支持 CRSF 的发射机屏幕可显示更丰富的实时数据。

现还会发送专用 **CRSF GPS Time 消息 (0x03)**，使 CRSF 发射机和下游工具能够以精确 GPS 时间对齐日志和叠加层。

#### MAVLink 遥测：QGroundControl 兼容性

扩展 MAVLink 遥测路径的具体目标是使 Betaflight 飞行器在开源 MAVLink 地面站 **[QGroundControl](https://qgroundcontrol.com/)** 中正确工作。此前版本发送的 MAVLink 数据足以让地面站发现飞行器，但航向箭头异常、没有 Home 位置、没有时间同步、没有人类可读的解锁反馈，且 QGC 无法识别或解锁飞行器。2026.6 补齐了这些缺口：

* **正确的航向箭头**：现按照 MAVLink common 方言要求，以百分之一度发送 `GLOBAL_POSITION_INT.hdg`，修复此前缩小 100 倍、导致 QGC 航向箭头仅在约 3.6 度罗盘范围内移动的问题
* **地图上的 Home 位置**：只要设置 Home 定位，就会连同 `GPS_GLOBAL_ORIGIN` 发送 `HOME_POSITION`，使 QGC 能以经纬度/AMSL 高度绘制 Home 标记
* **时间同步**：以扩展状态流速率发送 `SYSTEM_TIME`；可用时从 RTC 填充，以便 QGC 将现实时间与飞行器对齐
* **解锁反馈**：解锁禁用标志改变时发送 `STATUSTEXT`，使飞行器拒绝解锁时 QGC 屏幕上显示可读原因

为启用与 QGC 的双向通信，遥测端口现以 `MODE_RXTX` 打开，并带有 MAVLink **接收分派器**。当前提供三个握手响应器以使 QGC 标准连接序列顺利完成：**HEARTBEAT**（桩实现）、**PING**（回传时间/序列号）和 **TIMESYNC**（以纳秒回复固件时间）。还接通了 MAVLink **飞行器设置解锁**流程和 `custom_mode` 发现，使 QGC 能识别飞行器并解锁其配置。每次调用限制 RX 排空量，防止被淹没的链路饿死遥测任务。

在该分派器基础上，本版本开始处理由地面站发起的流量，而非继续延后：

* **航点任务传输**：完整实现 MAVLink **MISSION 协议**，因此 QGC 可与飞控的固件内飞行计划存储**上传和下载任务**。可通过标准任务传输序列将 QGC 规划的任务写入飞行器，并读取已存计划
* **由地面站控制消息速率**：`MAV_CMD_SET_MESSAGE_INTERVAL` 和 `MESSAGE_INTERVAL` 的处理器允许地面站设置、禁用或重置各遥测消息的发送间隔；每条消息均按请求间隔独立发送，并验证该间隔

:::note
MAVLink 任务传输和地面站消息速率控制为新增功能，主要针对 QGroundControl 测试。它们与其服务的自动驾驶仪和飞行计划工作流一样，仍遵循仿真优先的成熟度限制。
:::

#### MSP 增强

* **通过 MSP 读写任意 CLI 设置**：配置器应用（及任何第三方工具）现可按名称读写任意 CLI 设置，无需打开交互式 CLI 会话。这是“备份”选项卡新增直接恢复功能的基础
* **设置元数据**：工具还可查询设置类型、允许范围、选项和默认值
* **四元数姿态**：飞行器姿态现也以四元数形式提供给 3D 和外部可视化工具
* **OSD 自定义文本**：外部应用可向 OSD 推送最多四条自定义消息
* **额外 RPM 字段**：MSP 现公开电机 RPM 遥测，并提供额外的逐电机字段，供外部监控使用

#### 强化 MSP/CRSF 数据包验证

改进 MSP 和 CRSF 数据包的输入验证，以防御格式错误的数据。

### 2.5 飞控改动

* **舵机通道转发**：可将任一舵机直接跟随指定 RC 通道，绕过舵机混控器；适合襟翼或云台控制等简单直通输出。使用 `set servo_<N>_forward_from_channel = <1-16>` 逐舵机配置（0 = 禁用）
* **Simplified Master Slider**：新增飞行中调整项，可通过单个开关或旋钮同时缩放全部 PID 值，从而一次提高或降低所有轴的调校
* **高度保持重构**：简化高度保持控制器，修正前馈缩放和垂直加速度符号处理，提升高度跟踪稳定性。`altitude_lpf` 和 `altitude_d_lpf` 滤波范围已扩大（最大值由 1000 提高至 5000）
* **移除 Absolute Control**：实验性 Absolute Control 功能及其 `abs_control_*` 设置已退役；iterm-relax / iterm-rotation 路径是偏航/横滚处理的长期方向
* **非出厂频段的 OSD VTX 状态**：当 MSP 控制的 VTX（如 HDZERO）处于非出厂频段时，OSD 现会正确显示当前频段/通道/功率状态；SmartAudio 行为不变
* **按 VTX 频率显示 LED 灯带颜色**：新增 LED 灯带叠加层，依当前 VTX 通道为灯带着色：R1 以下为白色，从红色渐变至 R8 的品红色；未设置通道时关闭，便于一眼识别 VTX 通道
* **Airmode 响应**：移除 Airmode 上的小型滤波器，使操控反馈更直接
* **状态变量滤波器**：内部双二阶（Direct Form 1）滤波实现已在陀螺仪、PID、RPM、动态陷波和舵机路径中全面替换为**状态变量滤波器（SVF）**，其数值稳定性更好、开销更低。功能表现与此前相同；实际可见改动是原显示为 `BIQUAD` 的滤波器类型选项现显示为 `SVF`
* **重新缩放推力线性化**：推力线性化曲线已重新推导以匹配 ArduPilot 的 `MOT_THST_EXPO` 模型，故可直接迁移各螺旋桨建议值（约为：5 英寸 55、10 英寸 65、20 英寸以上 75）。升级后既有 `thrust_linear` 值会产生略有不同的曲线形状
* **更快的数学计算**：加快正弦和余弦计算，为飞行环路释放少量性能余量

### 2.6 GPS 改进

* **AssistNow Autonomous**：使用 `set gps_ublox_enable_ana = ON` 启用，通过 UBLOX 预测卫星数据更快获得 GPS 定位
* **DroneCAN GPS 支持**：通过 DroneCAN 连接的 GPS 模块现可端到端工作，详见上方新 CAN 章节
* **更快的串行 GPS 解码**：加快串行 GPS 消息解析器，为较慢飞控释放调度器余量
* **Blackbox GPS 时间戳**：Blackbox 日志现写入精确时间信息，以便将飞行轨迹与外部数据精确对齐
* **UBLOX 消息优先级**：优先处理位置更新消息，以加快位置更新
* **GPS 位置保持需先获得航向**：基于 GPS 的位置保持现会等待有效航向后才启用；`poshold_without_mag` 设置已移除（任何引用该设置的已保存 diff 在加载时将被拒绝）
* 改进 GPS 消息处理和去重

### 2.7 CLI 改动

* 新增 `options` 命令，用于显示固件构建配置
* 新增 `sensor_hardware` 命令，替代已弃用的 `gyro_hardware` 命令
* 新增用于飞行计划管理的 `waypoint` 命令
* 新增用于切换电池配置的 `battery_profile` 命令
* 新增 `resource CAN_TX / CAN_RX` 和 `set can_bitrate`，用于在支持的处理器上配置 CAN 总线
* 新增 `env` 命令，用于检查运行时构建环境，替代旧的编译内置 MCU 类型标识符
* **转发器**提供方和数据现通过 CLI 提供（替代已移除的应用选项卡）
* 扩展**chirp 调试通道**，服务于新自动调参选项卡使用的分析工作流
* 外部陀螺仪时钟输入功能 (`GYRO_CLKIN`) 现仅限实际支持它的陀螺仪传感器使用

### 2.8 Bug 修复

:::warning
**IIM-42652 陀螺仪满量程修复（破坏性变更）。**此前 IIM-42652 被错误配置为 ±4000 DPS，现已修正为芯片实际的 ±2000 DPS。这会使现有 PID 增益实际加倍，因此使用 IIM-42652 板卡时，升级后**必须重置并重新调校 PID**，不得使用旧调校直接解锁。（相关的 IIM-42653 抗混叠滤波器放置也已修正。）
:::

* **ICM-40609D 加速度计**因满量程寄存器值错误而读为 0.5g 而非 1.0g
* 修正 **LSM6DSV16X** FS_G_4000DPS 寄存器编码
* **DShot 蜂鸣器**在配置器连接时不再鸣响；同时修复时间戳溢出导致的 35 分钟解锁锁定
* 退出 ESC 直通后，现可正确恢复**电机输出**
* 修复 **CRSF subset frame** 在复制完成前可能读取帧数据的竞态条件
* 修复容量设为 0 时**电池百分比**整数下溢
* 现可正确应用**磁力计偏航对齐**配置
* 修复 **VTX 表功率标签**恰为 3 个字符时的缓冲区损坏
* 修复 **RX_MSP** 缺少 CLI 功能名且 RX 速率始终显示 0
* 修复搜索无描述命令时 **CLI help** 的 NULL 指针崩溃
* **飞行后统计**的最大电流现以小数精度显示
* 修复 DShot 构建中 **escprog `ki 255` (KISSALL)** 失效的问题
* 即使未解锁，**传感器**选项卡现也显示高度
* 修复 **QMC5883P 磁力计**初始化，使传感器可正确检测和读取
* 加载时现无条件将**失控保护流程**限制在有效范围，避免无效保存值使飞行器进入未定义的失控保护状态
* 修复 **MSP 串口处理**竞态：恰在进入 CLI 时收到 MSP 帧可能使端口处于不一致状态
* **busBusy()** 现对 `dev->bus` 进行 NULL 检查，移除驱动查询部分初始化总线设备时的崩溃路径
* 修正**位置估计器**的 GPS 距离计算和东向加速度项符号（包括线性加速度计算中的东西方向反转），提升位置保持和自动驾驶仪精度
* **OSD 时钟**的 RTC 日期/时间元素现应用配置的时区偏移并显示本地时间，而非 UTC
* 位带路径上的**双向 DShot 遥测**读取不再忙等，而是异步中止 DMA，减少 STM32、AT32 和 APM32 上的飞行环路停顿

### 2.9 构建系统与开发者说明

本节面向**从源码构建 Betaflight** 的用户；不影响刷写已发布固件。

#### 厂商 MCU SDK 移至子模块（`lib/modules/`）

由子模块提供的**厂商 MCU/SDK 源码**：APM32F4、GD32H7、STM32C5、STM32H5、STM32N6、X32M7、ESP-IDF、pico-sdk 和 DroneCAN 的 libcanard，已从 `lib/main/` 移至专用 **`lib/modules/`** 目录。并非子模块的嵌入式（in-tree）厂商源码仍与此前一样保留在 `lib/main/` 下。

此变更旨在清晰分隔已初始化的 Git 子模块与嵌入式厂商代码树。此前某一路径可能在一个分支中是嵌入文件、在另一分支中是已初始化的子模块，切换分支时会造成冲突和残留文件。

对贡献者的影响：

* 拉取该变更（或跨越该变更切换分支）后，请刷新子模块，例如 `git submodule update --init --recursive --checkout`。`--recursive` 很重要，因为部分 SDK（pico-sdk、STM32Cube H5/N6）自身包含嵌套子模块
* 新增 **`check-stale-submodule-paths`** 目标并接入 `checks` 目标。因此 CI（以及本地 `make checks`）会标记仍保有残留文件的子模块路径，这是跨越移动但未清理工作树的常见症状。检查输出包含恢复命令
* 从干净检出构建平台时，平台 SDK 缓存键现包含子模块路径，因此该移动会正确失效基于旧 `lib/main/` 位置的既有构建缓存

## 3. Betaflight Bridge（实验性）

Betaflight 2026.6 引入 **[Betaflight Bridge](https://github.com/betaflight/bridge)**：这一全新配套产品可将低成本 **ESP32-S3** 板卡变为 **USB 主机至 Wi-Fi 网桥**。ESP32-S3 作为 USB 主机连接飞控 USB **虚拟 COM 端口（VCP）**，并通过 **TCP/IP** 桥接该串口连接，使任意具备 Wi-Fi 的设备均可无线与飞控通信。

主要用途是服务于**无法使用 USB 串口的 iOS 及其他设备**。iPhone、iPad（以及许多其他平台）没有实用方式可直接打开飞控的 USB VCP，这长期阻碍其使用 Betaflight App。Betaflight Bridge 消除了该限制：网桥处理 USB 端，设备则通过网络连接。

工作方式：

* **将飞控接入 ESP32-S3**：网桥作为 USB 主机枚举飞控 VCP
* **通过 Wi-Fi 连接**：网桥可托管**自己的接入点（AP）**，也可加入**现有 Wi-Fi 网络（station/STA）**，故同时适合野外使用（无需基础设施）和台架使用（家庭网络）
* **Betaflight 应用通过 TCP/IP 连接**：网桥监听 **5761 端口**，即应用目前连接 SITL 所使用的 TCP 端口，因此无需新增应用支持。将应用的 TCP 连接指向网桥地址，飞控 VCP 会以透明方式呈现，效果与有线连接完全相同。网桥一次仅服务**一个应用客户端**
* **内置 Web UI**：网桥还在 **80 端口**提供小型 Web 界面，用于检查状态、扫描并加入 Wi-Fi 网络，以及上传网桥固件

由于网桥完全透明，通常经由 VCP 运行的所有功能（如 MSP 和 CLI）都可通过它工作。

:::warning
Betaflight Bridge 为本版本新增**实验性**功能，预计会持续开发，并可能引入破坏性改动。请参阅 **[Betaflight Bridge 仓库](https://github.com/betaflight/bridge)** 了解支持板卡、构建/刷写说明和设置方法。
:::

## 致谢

Betaflight 2026.6 凝聚了热情社区的共同努力。感谢让本次发行成为可能的每一位贡献者。

### 固件贡献者

Andy Piper, A. Pelicho, blckmn, Bryan Mayland, ctzsnooze, Dominic Clifton, gintaris, Hannes Kaufler, HGLRC, Jacob Dahl, jianpingwu1, Jim Florrick, Jozef Woloch, Jury D'Ambros, katerica, ke deng, Kevin Plaizier, luckk, LYNHQQ, Manwe, Mark Haslinghuis, MatviiG, Michael De Backer, mjs1441, nerdCopter, Osiris Inferi, Oskars Selis, PD45-46, qqqlab, Radu, Remenby31, Robolightning, Sergey Tsypanov, Steve Evans, Thomas Stibor, UAV Tech, Vladimir Demidov, VoodooChild99, zebulon-86

### 应用贡献者

blckmn, ChrisRosser, Eric, Hannes Kaufler, jikanos, Jury D'Ambros, ke deng, Mark Haslinghuis, MikeNomatter, nerdCopter, Nicholas Young, ot0tot, UAV Tech, Vitroid, Vlad, Yaros

### 以及每一位参与者

从编写代码的核心开发者，到保障稳定性的坚持测试者，再到提供文档、翻译与支持的每一个人，你们的努力成就了本次发行。

祝飞行愉快！
