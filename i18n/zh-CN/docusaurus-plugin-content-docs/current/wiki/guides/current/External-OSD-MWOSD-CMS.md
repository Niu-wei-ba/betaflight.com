# 外置 OSD、MWOSD 和 CMS

本指南面向没有内置 OSD 或希望使用外置 OSD 的用户。

---

## 典型的 MWOSD 安装与配置

### 关于此模式

- MWOSD 从 FC 请求原始数据，将其处理为人类可读格式后显示。
- 屏幕布局和显示项目由 MWOSD GUI Configurator 决定。

### MWOSD 配置

- 可通过 [MWOSD wiki](https://github.com/ShikOfTheRa/scarab-osd/wiki) 获取 MWOSD 安装指南等资料。
- 建议使用 MWOSD GUI Configurator 安装最新固件。
- 从 1.7 版起，MWOSD 已为 Betaflight 启用 CMS 支持。
- 若自行构建 MWOSD 固件，请确保在配置中启用 `CANVAS_SUPPORT`。

### FC 配置

- 对大多数预构建的 F3、F4 和 F7 Target，Betaflight v3.1.0 起已启用 CMS 支持。
- 应在 FC GUI Configurator 中关闭 Use OSD。
- 连接 OSD 的串口必须启用 MSP。
- 波特率必须与 OSD 相同，通常为 `115k`。

若自行构建 Betaflight FC 固件：

- 必须使用 `CMS` 和 `USE_MSP_DISPLAYPORT` 或等效选项构建。
- 如果这些功能由 feature 控制，还应在配置中打开对应功能。

### 菜单激活

- Betaflight CMS 菜单激活组合为 `Thr MID + Yaw LEFT + Pitch UP`。
- MWOSD 菜单激活组合为 `Thr MID + Yaw RIGHT + Pitch UP`。

---

## 非典型 DISPLAYPORT 安装与配置

### 关于此模式

- MWOSD 仅显示 FC 发送的屏幕内容。
- OSD 布局在 Betaflight App 的 OSD 选项卡中配置。

限制：

- 屏幕更新速度低于典型安装方式。
- 如需此模式，请向 MWOSD 团队提交请求。还需进行少量开发以解决显示闪烁问题。

要使用 DISPLAYPORT：

- 在 OSD 上安装最新 MWOSD 固件。
- **请仔细阅读**：使用 MWOSD GUI Configurator 将 `FC fonts` 安装到 OSD；使用 MWOSD 字体可能显示异常字符。
- 应在 FC GUI Configurator 中启用 Use OSD。

若自行构建 Betaflight FC 固件：

- 使用附加选项构建 FC 固件，例如：`make OPTIONS=USE_OSD USE_OSD_OVER_MSP_DISPLAYPORT REVOLT`
- 这会启用 OSD 选项卡和来自 FC 的完整 DISPLAYPORT 支持。

另请参阅：[CMS 调整](OSD-Profiles#screen-and-display-adjustment)
