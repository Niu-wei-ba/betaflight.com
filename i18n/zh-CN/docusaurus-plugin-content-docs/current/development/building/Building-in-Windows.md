---
sidebar_position: 2
sidebar_label: 在 Windows 中构建
title: 在 Windows 中构建
---
:::提示替代方案：Docker
您还可以使用 **[Docker/Devcontainers](Building-with-Docker)** 进行构建，它提供了容器化的构建环境。
:::

# 使用 Linux 子系统在 Windows 11 上构建

自 Windows 10 以来，有一项新功能允许任何开发人员在 Windows (WSL) 中快速轻松地运行完整的 Linux 子系统，并通过 `bash` 终端访问它。这使开发人员可以充分利用整个 Linux 操作系统以及所有优秀的现有 Linux 工具和程序。当 Bash for Windows 启动并运行时，感觉就像您通过 ssh 进入了一个完整的 Linux 机器，只不过 Linux 发行版实际上是在本地与 Windows 一起运行的。

安装 WSL 的 Microsoft 官方说明是 https://msdn.microsoft.com/commandline/wsl/install_guide; 但是，我们将在下面包含我们自己的说明。

## 在 Windows 11 中安装 Ubuntu (WSL)

使用提升的权限打开 `Windows Terminal`、`Command Prompt` (CMD) 或 `PowerShell` 中的任意一项。 IE。搜索 `Terminal`、`PowerShell` 或 `CMD` 并选择“以管理员身份运行”。

按顺序执行以下命令：

```
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
wsl.exe --install --no-distribution
wsl.exe --update
shutdown.exe /r /f /t 5
```

:::tip
默认情况下，WSL 配置为使用一半的物理 RAM。 G4 和 H7 等较新的目标可能需要 4GB 或更多内存。使用开始菜单搜索并打开 `WSL Settings`。如果尚未设置，请将 WSL 的 `Memory Size` 至少增加到 `4096`。或者，在构建目标时，将 `-j` 参数与 `make` 命令一起使用以减少内存使用。示例：`make -j 2 [target]`。 （请注意，某些目标（例如 F4 和 F7）仅用 2GB 进行编译。）
:::

重新启动后，再次打开提升的终端并运行以下命令：

```
wsl.exe --install Ubuntu-24.04
```

安装 Ubuntu (WSL) 后，使用“开始”菜单搜索并运行 Ubuntu 24.04。菜单索引可能需要一些时间才能更新。启动 Ubuntu 后，系统将提示您创建新的用户名和密码。 Linux 区分大小写，因此请使用小写用户名。

:::tip
开发人员可以选择创建项目文件夹。尽管不是必需的，但某些示例可能是名为 `Git`、`Github` 或 `My-Projects` 的文件夹。在 `bash` 终端中，使用 `mkdir [foldername]` 创建一个文件夹，然后使用 `cd [foldername]` 切换到该文件夹​​。

示例：

```
mkdir Git
cd Git
```

:::

一旦 Ubuntu (WSL) `bash` 在 Windows 上正常运行，您就可以按照“[在 Ubuntu 中构建](Building-in-Ubuntu)”说明来构建 Betaflight。

:::note
像 Ubuntu 这样的 Linux 系统使用名为 `root` 的管理员帐户，该帐户具有特权。普通用户可以使用 `sudo` 命令提升到 root 权限。

如果您新创建的用户有 sudo 问题或没有权限，请参阅此处的选项 2 或 3：https://www.tenforums.com/tutorials/128094-add-remove-list-sudo-users-wsl-linux-distro-windows-10-a.html#option2
:::

:::note
如果您在 Ubuntu (WSL) 中遇到互联网连接问题，请使用以下一些方法解决：https://www.google.com/search?hl=en&q=wsl%20no%20internet%20on%20public%20network.

具体来说，将 DNS 解析名称服务器替换为已知良好的 DNS 服务器，例如 1.1.1.1 (Cloudflare)、8.8.8.8 (Google) 或 208.67.222.222 (OpenDNS)。
:::

:::info
WSL 的文件系统映射挂载到 `Ubuntu 24.04 //wsl/localhost` 中。它们是可访问的，但它们是使用 `root:root` 权限安装的。这会导致很多事情出现权限问题，并在尝试从 Windows 本地磁盘上的 Linux 中克隆的存储库构建 Betaflight 时出现错误。因此，请始终从 Ubuntu `bash` 终端访问、修改和构建。
示例文件夹：`\\wsl.localhost\Ubuntu-24.04\home\username\Git\betaflight`。
:::

:::info
不建议在 Windows VM（Hypervisor Guest）内运行 WSL，因为性能会下降。如果您选择这样做，则需要在虚拟机管理程序的 VM 选项中启用 `Virtualize Intel VT-x/EPT or AMD-RVI` 选项或类似选项。
:::