# SINGULARITY

Betaflight 3.1.7 中，该 target 应已恢复电机 1-4 的 DShot 支持。

历史上，BF 3.1.x 修改了 Singularity FC 相对于 BF 3.0.1 的默认资源映射，可能导致电机无法解锁或转动。若映射受影响，可在 CLI 中恢复以下映射：

```text
Resource PWM 2 None
Resource PWM 3 None
Resource PWM 4 None
Resource PWM 5 None
Resource Motor 1 B04
Resource Motor 2 B05
Resource Motor 3 B00
Resource Motor 4 B01
Resource Motor 5 B08
Resource PWM 2 A11
Resource PWM 3 A12
Resource PWM 4 A13
Resource PWM 5 A14
```

需要先释放 PWM 资源，才能重映射电机 1-4。该修复也被确认可解决 Betaflight 3.1.6 中的电机不转问题。DShot 支持仅适用于电机 1-4，不适用于电机 5-6。
