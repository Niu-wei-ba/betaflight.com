---
sidebar_position: 4
sidebar_label: 在 Fedora 中构建
title: 在 Fedora 中构建
---
# 在 Fedora 44 中构建

本指南介绍了在 Fedora 44 上构建 Betaflight 固件和地面站。

## 克隆 Betaflight 存储库并安装工具链

安装构建依赖项（通过 `make test` 进行单元测试需要 `clang` 和 `libblocksruntime-devel`）：

```bash
$ sudo dnf check-update
$ sudo dnf install git clang libblocksruntime-devel
$ sudo dnf group install "C Development Tools and Libraries"
```

克隆存储库，安装 ARM 工具链并构建：

```bash
$ git clone https://github.com/betaflight/betaflight.git
$ cd betaflight
$ make arm_sdk_install
$ make configs
$ make MATEKH743
```

## 更新和重建固件

```bash
$ cd betaflight
$ git pull
$ make clean
$ make configs
$ make MATEKH743
```

## 构建 Betaflight 地面站

使用 [nvm](https://github.com/nvm-sh/nvm) 安装 Node.js 24：

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
$ source ~/.bashrc
$ nvm install 24
```

或者，如果您更喜欢系统包：

```bash
$ sudo dnf install nodejs24-bin
```

安装系统依赖项、克隆和构建：

```bash
$ sudo dnf install libatomic rpm-build dpkg
$ git clone https://github.com/betaflight/betaflight-configurator.git
$ cd betaflight-configurator
$ npm install
$ npm run dev
```

这将在 `http://localhost:8080/` 处启动开发服务器。

注意：检查 [.nvmrc](https://github.com/betaflight/betaflight-configurator/blob/master/.nvmrc) 文件中当前所需的 Node.js 版本。

## 安装铬

Betaflight 地面站需要基于 Chromium 的浏览器才能支持 [WebSerial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)（Firefox 不支持 WebSerial）。通过 dnf 安装 Chromium：

```bash
$ sudo dnf install chromium
```

在 Chromium 中打开 `http://localhost:8080/` 以使用地面站的开发版本和串行设备访问。

## 串行权限

如果已安装 ModemManager，请将其删除以防止其干扰飞控连接：

```bash
$ sudo dnf remove ModemManager
```

将您自己添加到 `dialout` 组：

```bash
$ sudo usermod -aG dialout $(whoami)
```

创建用于 DFU 设备访问的 udev 规则文件。添加以下内容后保存并重启：

```bash
$ sudo nano /etc/udev/rules.d/45-stdfu-permissions.rules

# Notify ModemManager this device should be ignored
ACTION!="add|change|move", GOTO="mm_usb_device_blacklist_end"
SUBSYSTEM!="usb", GOTO="mm_usb_device_blacklist_end"
ENV{DEVTYPE}!="usb_device", GOTO="mm_usb_device_blacklist_end"

# STM32 DFU
ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", ENV{ID_MM_DEVICE_IGNORE}="1"
# GD32 DFU
ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", ENV{ID_MM_DEVICE_IGNORE}="1"
# AT32 DFU
ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", ENV{ID_MM_DEVICE_IGNORE}="1"
# APM32 DFU
ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", ENV{ID_MM_DEVICE_IGNORE}="1"
# RP2350 (Raspberry Pi Pico) Bootloader
ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", ENV{ID_MM_DEVICE_IGNORE}="1"

LABEL="mm_usb_device_blacklist_end"

# STM32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", TAG+="uaccess"
# GD32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="28e9", ATTRS{idProduct}=="0189", TAG+="uaccess"
# AT32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e3c", ATTRS{idProduct}=="df11", TAG+="uaccess"
# APM32 DFU Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="314b", ATTRS{idProduct}=="0106", TAG+="uaccess"
# RP2350 (Raspberry Pi Pico) Bootloader Access
SUBSYSTEM=="usb", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000f", TAG+="uaccess"
```

## 使用开发容器

[betaflight](https://github.com/betaflight/betaflight) 和 [betaflight-configurator](https://github.com/betaflight/betaflight-configurator) 存储库都包含遵循开放 [开发容器规范](https://containers.dev/) 的 `.devcontainer/` 配置。它们提供了一个开箱即用的完全配置的构建环境。

Devcontainers 可与任何支持该规范的编辑器或工具配合使用：

- **VS Code** — 通过 [Dev Containers 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **devpod** — 一个开源包装器，支持 CLion、IntelliJ、WebStorm、Zed、Cursor 和 [更多](https://devpod.sh/)
- **Docker / Podman** — 直接从命令行，无需 IDE

如果尚未安装 Podman（Fedora 的默认容器运行时）：

```bash
$ sudo dnf install podman
```

有关完整详细信息，请参阅[使用 Docker 构建](./Building-with-Docker) 指南。

## 使用工具箱容器

[Toolbox](https://containertoolbx.org/) 在 Fedora 上提供共享主目录的隔离开发容器。这对于将构建依赖项与主机系统分开非常有用。

创建 Fedora 44 工具箱：

```bash
$ toolbox create betaflight
$ toolbox enter betaflight
```

在工具箱内，按照上面的构建说明进行操作。从工具箱容器内部访问串行设备需要按照上面的串行权限部分中所述配置主机 udev 规则。

对于仅固件构建，专用工具箱使 ARM 工具链保持隔离：

```bash
$ toolbox create --image registry.fedoraproject.org/fedora-toolbox:44 bf-firmware
$ toolbox enter bf-firmware
$ sudo dnf install git clang libblocksruntime-devel
$ sudo dnf group install "C Development Tools and Libraries"
```