## Windows 上的 Cygwin

不再支持 Windows 上的 Cygwin。请改用适用于 Linux 的 Windows 子系统 (WSL)。

## GNU ARM 工具链版本

要安装或更新 GNU Arm 嵌入式工具链，请运行：

```
make arm_sdk_install
```

## 链接单元测试可能会失败。

当尝试在 Linux 或 WSL 上构建和运行单元测试时，您可能会遇到以下问题：

```
linking ../../obj/test/alignsensor_unittest/alignsensor_unittest
/usr/bin/ld: cannot find -lBlocksRuntime
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

问题是缺少库，请按以下方式安装：

```
$ sudo apt install libblocksruntime-dev
```

## 编译单元测试失败并出现错误

Betaflight 已更新为可与最新的 clang 版本 18 配合使用，并且从现在起将成为官方支持（必需）的版本。 `Makefile` 已更新为与此版本兼容，以便成功运行测试。 `make test` 取决于特定的 `clang` 编译器。代码库和工具已更新，可与版本 18 配合使用。Ubuntu 24.04 LTS（包括适用于 Linux 的 Windows 子系统）应可与已安装的 clang 版本配合使用。使用以下命令在 Ubuntu（包括 WSL）上安装 `clang`：

```
$ sudo apt update
$ sudo apt install clang
```

## Alpine 上的 GLIBC 问题

请参阅：[Alpine wiki](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)