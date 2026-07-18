# 在 Arch Linux 中构建

要构建 BetaFlight，首先必须安装 ARM 工具链：

## 设置 GNU ARM 工具链

```bash
pacman -S arm-none-eabi-gcc arm-none-eabi-newlib arm-none-eabi-binutils
```

为了运行测试，还必须安装 AUR 中的 `libblocksruntime` 包：

```bash
trizen -S libblocksruntime
```

在撰写本文时，GCC 的存储库版本是 9.2.0，与 BetaFlight 预期的 9.2.1 不同。
如果出现以下错误，您可以在继续之前覆盖 `make/locak.mk` 中的 GCC 版本：

```bash
$ make
make/tools.mk:301: *** **ERROR** your arm-none-eabi-gcc is '9.2.0', but '9.2.1' is expected. Override with 'GCC_REQUIRED_VERSION' in make/local.mk or run 'make arm_sdk_install' to install the right version automatically in the tools folder of this repo.  Stop.
$ echo "GCC_REQUIRED_VERSION = 9.2.0" >> make/local.mk
```

## 建筑

安装 ARM 工具链后，您应该能够从源代码构建。

```bash
cd src
git clone git@github.com:betaflight/betaflight.git
cd betaflight
make configs
make MATEKF411
```

您将看到一组文件正在编译，最后链接，生成 ELF 和 HEX：

```
...
$ ls -l obj/
total 1516
-rwxr-xr-x 1 s-ol s-ol  428584 Jan 11 12:04 betaflight_4.4.2_MATEKF411.bin*
-rw-r--r-- 1 s-ol s-ol 1136991 Jan 11 12:04 betaflight_4.4.2_MATEKF411.hex
drwxr-xr-x 3 s-ol s-ol    4096 Jan 11 12:04 main/
```

您可以使用 Betaflight-Configurator 刷新 `obj/betaflight_4.4.2_MATEKF411.hex` 文件。

## 更新和重建

导航到本地 betaflight 存储库并使用以下步骤提取最新更改并重建 betaflight 版本：

```bash
cd src/betaflight
git reset --hard
git pull
make clean
make
```