### ASGARD 反相器配置（2017-06-10）

#### 固件

ASGARD V1 和 V2 在 `RX6` 上均配有可编程反相器。为使连接到 RX6 的设备稳定工作，应使用支持此功能的固件：`OMNIBUSF4SD` target 的 3.2 版本，或 3.1.7 之后的开发构建。

`TX6` 上还有另一颗反相器，但它不作为反相器使用，而是一个不稳定的单向缓冲器。该缓冲器的单向特性会阻止 SmartPort、SmartAudio、Tramp 等半双工双向协议工作。

#### 反相器引脚配置

V1 与 V2 的反相器控制引脚不同：V2 使用 `PC8`，V1 使用 `PC9`。`PC8` 也是 OMNIBUS F4 V3 所使用的引脚。

因此，对于 3.1.7 之后的 Betaflight 版本，包括 3.2，RX6 应按以下方式配置：

##### ASGARD V1

使用 `OMNIBUSF4SD` target。

反相器默认引脚为 `PC8`，必须通过以下 CLI 命令显式改为 `PC9`：

```
resource inverter 6 c9
```

##### ASGARD V2

使用 `OMNIBUSF4SD` target。

默认反相器引脚即为 `PC8`，与此版本板卡相符，无需重新分配。

引脚正确配置后，V1 和 V2 的各协议处理程序会正确处理反相控制。

### 其他相关信息

请参阅 [OMNIBUSF4](OMNIBUSF4) 板卡 Wiki。
