### 串行接收机配置说明（v3.3.0 及更高版本）

FF_PIKOBLX target 明确将 `serialrx_inverted` 的默认值设为 `ON`，以兼容 Furious FPV 非标准的非反相 SBUS 接收机。该设置会将协议规范中的*反相信号*转换为*非反相*状态。

此设置的注意事项：

- 对于标准 SBUS 接收机，必须将 `serialrx_inverted` 设为 `OFF`。
- 对于所有其他串行接收机，也必须明确将 `serialrx_inverted` 设为 `OFF`，因为即使更改 `serialrx_provider`，该设置仍会保留。此行为从 v3.3.0 开始出现：此前仅影响 SBUS 的 `sbus_inversion` 设置被改为与协议无关的 `serialrx_inverted`。
