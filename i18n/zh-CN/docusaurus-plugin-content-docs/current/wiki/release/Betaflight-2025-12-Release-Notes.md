---
sidebar_position: 2
sidebar_label: 2025.12 发布说明
---

# 2025.12 发布说明

:::warning
重要：检查飞控板安装方向

更新后，若四轴飞行器响应不正确，例如发生翻转，请检查飞控板安装方向。此版本移除了“用户不可维护”的陀螺仪对齐设置，转而简化板卡对齐。陀螺仪对齐指 IMU 在飞控 PCB 上的安装位置，用户无法修改；请确保板卡对齐设置适合实际安装。PCB 上应有指示机头方向的箭头。若箭头指向四轴飞行器前方，板卡对齐应设为 `0`（ZERO）。
:::

欢迎使用 Betaflight 2025.12。请注意，我们采用了基于日历的新版版本号规则：今后格式为 `YYYY.M.PATCH`，预期每 6 个月发布一次。

我们已尽力消除缺陷；若仍发现 **bug**，请在 [GitHub tracker](https://github.com/betaflight/betaflight/issues) 提交 **issue**。

需要帮助、支持或社区交流时，可加入专用 [Discord](https://discord.gg/n4E6ak4u3c) 服务器。

## 1. App

:::note
请使用位于[线上](https://app.betaflight.com)的新 Progressive Web App（PWA）。
:::

App 现使用与兼容固件相同的发布版本号，即 `2025.12`，因此 App 与固件会一同发布。

许多 App 模块均获得大幅改进。

它现在是 Progressive Web App（PWA），即会随着线上获批 PR（GitHub Pull Request）更新和增强。无需手动下载新版本，线上 App 会自动更新；需要更新时会通知你。

## 2. 固件

### 2.1 关键新功能

- **自主与安全功能：**新增 **Altitude Hold**、**Position Hold**、**Collision Detection**，以及在着陆冲击时触发的**自动解除解锁**功能。
- **固定翼增强：**本版本重点改进固定翼，新增让飞行更平顺的 **S-term**、基于空速的 **Throttle and PID Attenuation (TPA)** 模式及专用 PID 倍率曲线。
- **飞行与用户体验：**
  - **更新的 Turtle/Crashflip 模式：**改进坠机后帮助飞行器翻正的模式。
  - **Launch Timer：**专为起飞设计的新计时器。
  - **LED 调光和功能：**新增 LED 调光器，以及用于 GPS、电池和高度的 LED 条形指示器。

### 2.2 改进与优化

- **硬件支持：**新增对陀螺仪（如 IIM42653、ICM456xx）、闪存芯片、测距仪和 CADDX 相机云台的支持。
- **协议与通信：**改进 CRSF（升降率计与气压计支持）、ELRS（FLRC F-modes、Model Match ID）和 MAVLink 等协议。MSP 已扩展，可支持更多命令和直通 CLI 命令。
- **Blackbox 与 OSD：**Blackbox 现在可记录舵机数据、GPS Home 高度、IMU 姿态和 MCU ID。OSD 也新增元素和显示选项。
- **代码重构：**大规模清理与重组代码库，将平台专属代码（不同微控制器）移入专用目录，简化后续开发并提高可维护性。

### 2.3 Bug 修复

本版本修复大量问题。完整列表见[变更日志](https://github.com/betaflight/betaflight/compare/4.5.0...2025.12.0-RC1)。

### 2.4 新硬件 Target

新增微控制器支持，显著扩大兼容飞控范围。此版本包括：

- **Raspberry Pi PICO (RP2350)**
- **APM32F40X series**

代码库已大幅重构，将平台专属代码与 Betaflight 核心代码分离，可更快采用未来的新技术。

# 感谢各位

随着 Betaflight 2025.12 发布，我们向过去与现在的每位贡献者致以衷心感谢。

本项目的成功直接来自大家的热情与投入：从编写代码的核心开发者，到确保稳定性的不懈测试者，再到提供文档和支持的每个人，正是你们的努力促成这一重要版本。

Betaflight 2025.12 是属于所有人的里程碑。感谢大家始终致力于让 FPV 飞行变得更好。

祝飞行愉快！
