# Betaflight 4.2 统一 Target

## 操作说明

### 1. 确定应使用的 target

![查找 target 名称的位置](/img/identify_target.png)

也可通过 CLI 获取 target 名称：

```
# version
# Betaflight / STM32F411 (S411) 4.2.0 Jun 14 2020 / 03:04:43 (8f2d21460) MSP API: 1.43
# config: manufacturer_id: MTKS, board_name: MATEKF411, version: be0c9205, date: 2020-01-15T19:44:32Z
# board: manufacturer_id: MTKS, board_name: MATEKF411
```

此示例中的 MCU target 为 `STM32F411`，统一 target 配置为 `MATEKF411`，因为 `board_name` 描述的是板卡类型配置。制造商需负责维护统一 target 配置文件。

### 2. 选择 target

```
MATEKF411 <-- 统一 target
```

- 在**固件烧写工具**中点击加载固件后，可看到如下发布信息：

```
Target: MATEKF411
Manufacturer ID: MTKS
Version: 4.2.0
Binary: betaflight_4.2.0_STM32F411.hex
Date: 14-06-2020 08:40
Unified Target: MTKS-MATEKF411.config
Date: 2020-01-15T19:44:32Z
```

**常见问题**

`Manufacturer ID: MTKS` 是什么？

这四个字符表示板卡制造商。完整列表见 [Manufacturers.md](https://github.com/betaflight/unified-targets/blob/master/Manufacturers)。

提示：刷写新版 Betaflight **前**，请先备份配置，例如导出 `diff`。

**注意：** 仅应导回确定安全的配置项。如不确定，请从全新配置开始。

### 3. 点击“从网络加载固件”，再点击“烧写固件”

### 4. 连接 Configurator，在提示时点击 `Apply Custom Defaults`

![提示应用自定义默认值的通知](/img/apply_custom_defaults_prompt.png)

若统一 target 存在问题，可暂时使用旧版 target；若统一 target 缺少应有配置，请在 [Issue Tracker](https://github.com/betaflight/betaflight/issues) 提交问题。

待补充：具体 target 示例及更多图片。

# 使用统一 Target 的提示

## 处理固件

从[仓库](https://github.com/betaflight/unified-targets/tree/master/configs/default)将统一 target 配置保存到本地。以 `MTKS-MATEKF411.config` 为例：

用文本编辑器打开该文件，查看第一行：

> \# Betaflight / **STM32F411** (S411) 4.1.0 Jun 25 2019 / 10:27:57 (2a6e94d03) MSP API: 1.42

这里的 `STM32F411` 为所用处理器 target，因此编译时应使用：

```
make TARGET=STM32F411
```

### 在 Configurator 中合并并刷写

在 Configurator 中先加载 `.config` 文件，再加载 `betaflight_4.x.x_STM32F411.hex`，然后刷写固件。首次连接时，会像常规刷写流程一样提示 `Apply Custom Defaults`。

### `make_config_hex.sh`

`make_config_hex.sh` 位于 `src/utils`，可将统一 target 配置与固件映像合并。合并后的 HEX 文件适合分享给使用同一飞控的其他用户。使用该 HEX 的用户会与常规刷写流程一样收到 `Apply Custom Defaults` 提示。

`srec_cat` 属于 [srecord](http://srecord.sourceforge.net/)，可通过 Ubuntu 的 universe 仓库安装：

```
apt install srecord
```

Windows 似乎没有现成二进制文件，但提供了[安装说明](http://srecord.sourceforge.net/windows.html)。

更多信息请参见 [src/utils/make_config_hex.sh](https://github.com/betaflight/betaflight/blob/master/src/utils/make_config_hex.sh)。
