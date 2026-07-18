# 配置

Betaflight 主要通过 [Betaflight App](https://app.betaflight.com) 配置。

CLI 和 Betaflight App 都可通过目标板的串口访问，包括 USB 虚拟串口、物理 UART 或 SoftSerial。串口详情请参阅串口章节和所用板卡的专属文档。

Betaflight App 尚不能配置全部功能与设置，部分功能必须通过 CLI 启用或配置。

**Betaflight App 或固件发布新版本前，强烈建议通过 CLI 备份设置，以便之后重新应用。**

## Betaflight App

![Betaflight App](/img/betaflight_configurator_welcome.png)

[Betaflight App](https://app.betaflight.com) 是首选配置方式，内置终端可与 CLI 交互。

若因固件兼容性无法使用最新版应用连接 FC，仍可通过 CLI 备份设置，或安装旧版应用。旧版（原 Configurator）可从 [releases 页面](https://github.com/betaflight/betaflight-configurator/releases)下载；安装说明见相应 release 中的 README。

## CLI

也可通过命令行配置 Betaflight，详见 [CLI](Cli) 章节。
