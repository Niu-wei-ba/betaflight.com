# Spektrum 与 RC 平滑滤波

### 背景

Spektrum 有两种基础 RC 协议，并可使用不同帧率：

- DSMX 22 ms
- DSMX 11 ms（推荐）
- DSM2 22 ms
- DSM2 11 ms（较少见）

大多数用户使用 DSMX，且多数 Spektrum 发射机支持 DSMX 11 ms；但仍有少数型号不支持。

对频时，如可选择，请始终选择 11 ms 模式。

### 不支持 11 ms 的发射机

- DX6i
- DXe
- DX6e

若使用上述任一发射机并采用 DSMX，可能需要手动将 RC 平滑滤波截止频率设为：

```
set rc_smoothing_input_hz = 21
set rc_smoothing_derivative_hz = 21
```

这是 22 ms 模式的默认值，前提是自动检测成功识别该帧率。

若未使用上述发射机，通常无需继续调整。自动检测截止频率（CLI 中设为零）很可能正常工作。要确认检测结果，请在发射机和接收机通电并连接后，在 CLI 输入 `rc_smoothing_info`，检查检测到的帧率。自 3.4.0 起，22 ms 似乎至少在部分情况下能被自动检测，但不能保证始终可靠。

其原因是 DSMX（Spek2048）接收机始终向飞控输出 11 ms 帧，因此 RC 平滑滤波会正确检测到 11 ms 帧间隔，并将 Input 和 Derivative 滤波器都设为 41 Hz。若发射机实际发送 22 ms 帧，41 Hz 截止频率则不足以抑制变化，会在 RC 指令、D-term 和电机输出中产生明显尖峰。飞控只能识别接收机输出的帧间隔，无法判断 TX-RX 链路本身使用的帧间隔。

### DSM2 协议

本文作者没有 DSM2 硬件可供验证，因此 DSM2 也可能存在相同问题。最可靠的确认方法是查看日志，或将日志发布至 Slack、Facebook、RCGroups 等社区，请其他用户协助分析。

### Spektrum 发射机 DSMX 11 ms 支持情况图表

https://www.dropbox.com/s/3nkaonks1uimvrb/Spektrum%20transmitter%20comparison%20charts.zip?dl=0
