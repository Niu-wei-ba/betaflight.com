# 串行 Blackbox 日志

## OpenLog 不适用于 Betaflight 4.0 及更高版本的串行 Blackbox 日志

为分析更多且更丰富的飞行特性，串行 Blackbox 的输出带宽最终超过了 **OpenLog** 支持的最高 230.4 kbps。

Betaflight 4.0 及更高版本的串行 Blackbox 用户必须使用通信速度更快的日志设备，例如 **OpenLager**，并将波特率至少设为 1.5 Mbps 以获得稳定记录。

不同日志速率的带宽需求见：https://github.com/betaflight/betaflight/issues/9043#issuecomment-544333986

### 来自 Betaflight 4.3 的补充信息

现在可[禁用 Blackbox 文件头](https://github.com/betaflight/betaflight/pull/9726)以减少记录开销。这可能使 OpenLog 再次可用，因为需处理的数据更少。可使用 [blackbox_disable 预设](https://github.com/betaflight/firmware-presets/blob/master/presets/4.3/other/blackbox_disable.txt) 禁用文件头。

请实际测试：数据量降低后，较慢的日志设备可能重新可用。
