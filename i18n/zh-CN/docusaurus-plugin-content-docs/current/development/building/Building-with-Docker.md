---
sidebar_position: 1
sidebar_label: 使用 Docker 构建
title: 使用 Docker 构建
---
# 使用 Docker/Devcontainers 进行构建

Betaflight 存储库包含一个预配置的开发容器，可在所有平台上提供一致的构建环境。

## 先决条件

### Docker 桌面（Windows/macOS）

1.下载并安装Docker Desktop：
   - [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
   - [macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
2. 确保 Docker 正在运行（检查系统托盘图标）

### Docker 引擎（Linux）

请遵循适用于您的发行版的[官方安装指南](https://docs.docker.com/engine/install/)。

```bash
# After installation, add your user to the docker group
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect
```

## 选项 1：带有开发容器的 VS Code（推荐）

这通过完整的 IDE 集成提供了最佳的开发体验。

### 设置

1.安装[Visual Studio Code](https://code.visualstudio.com/)
2.安装[开发容器扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. 分叉并克隆 Betaflight 存储库：
   ```bash
   # Fork betaflight/betaflight on GitHub first, then:
   git clone https://github.com/YOUR_USERNAME/betaflight.git
   cd betaflight
   ```
4.在VS Code中打开文件夹
5. 当提示“在容器中重新打开”时，单击**是**
   - 或按 `Ctrl+Shift+P` →“开发容器：在容器中重新打开”

VS Code 将构建容器并在其中打开一个终端。第一次这可能需要几分钟。

### 构建固件

进入容器后，使用集成终端：

```bash
# Build a specific target
make TARGET=SPEEDYBEEF405WING

# Build all targets
make all

# Clean build artifacts
make clean

# See available targets and options
make help
```

## 选项 2：仅命令行

如果您不想使用 VS Code，可以直接从命令行构建。

### 构建容器镜像

```bash
cd betaflight
docker build -t betaflight-dev -f .devcontainer/containerfile .devcontainer/
```

### 构建固件

```bash
# Build a specific target
docker run --rm -v ${PWD}:/workspace -w /workspace betaflight-dev make TARGET=SPEEDYBEEF405WING

# Interactive shell for multiple builds
docker run --rm -it -v ${PWD}:/workspace -w /workspace betaflight-dev bash
```

:::提示 Windows PowerShell
在 Windows PowerShell 上，使用 `$[[[00000009]]]` 作为当前目录。在 CMD 上，请使用 `%cd%` 代替。
:::

## 选项 3：Podman（无根替代方案）

[Podman](https://podman.io/) 是 Docker 的无根、无守护程序替代品。

```bash
# Install Podman (see https://podman.io/docs/installation)

# Build the container
podman build -t betaflight-dev -f .devcontainer/containerfile .devcontainer/

# Build firmware
podman run --rm -v ${PWD}:/workspace:Z -w /workspace betaflight-dev make TARGET=SPEEDYBEEF405WING
```

## 硬件访问（通过 DFU 刷新）

devcontainer 包含 DFU 实用程序，用于将固件直接刷新到你的飞控。

### Linux 主机

在主机系统上设置 udev 规则以进行设备访问：

1. 创建`/etc/udev/rules.d/99-betaflight.rules`：

   ```bash
   SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="5740", MODE="0666", TAG+="uaccess"
   SUBSYSTEM=="usb", ATTR{idVendor}=="0483", ATTR{idProduct}=="df11", MODE="0666"
   ```

2.重新加载udev规则：

   ```bash
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

3.拔下并重新插入飞控

### Windows 主机

在 Windows 上从容器内刷新 DFU 需要额外的设置。建议：

- 在容器中构建
- 在 Windows 主机上使用 [Betaflight 地面站](https://app.betaflight.com) 进行闪存

## 故障排除

### 容器构建失败

确保 Docker 分配了足够的资源：

- **内存**：至少 4GB（对于 H7 目标建议 8GB）
- **磁盘**：至少 10GB 可用空间

### 权限被拒绝错误

在 Linux 上，确保您的用户位于 `docker` 组中：

```bash
sudo usermod -aG docker $USER
# Log out and back in
```

### 在 Windows/macOS 上构建缓慢

Windows 和 macOS 上的 Docker 在虚拟机中运行，这可能会减慢文件操作速度。为了获得更好的性能：

- 在容器的文件系统中克隆存储库
- 确保 Docker Desktop 使用 WSL2 后端（现代安装的默认设置）

## 进一步阅读

- [Devcontainer README](https://github.com/betaflight/betaflight/blob/master/.devcontainer/README.md) - 详细的 devcontainer 文档
- [开发容器规范](https://containers.dev/) - 官方开发容器规范