# Acro Trainer

Acro Trainer 为学习 Acro 模式的飞手增加角度限制。主要面向 LOS Acro 新手，也可用于 FPV。

该功能通过名为 `ACRO TRAINER` 的模式启用。启用后，飞行器仍以普通 Acro 模式飞行，但横滚和俯仰不会超过设定角度。新手可从较小限制开始，随技术提升逐渐增大。

**必须启用加速度计，功能才能配置并正常工作。**

该功能仅在 Acro 飞行模式下生效；选择 ANGLE 或 HORIZON 时会自动禁用。

大多数用户只需在 Configurator 的“模式”选项卡中配置 `ACRO TRAINER`，再通过 CLI 设置角度限制。

配置参数：

- `acro_trainer_angle_limit`：角度限制，范围 10-80 度。
- `acro_trainer_lookahead_ms`：预测时间，范围 10-200 ms，用于在高陀螺仪角速度接近限制时减少过冲和反弹。默认值 50 适合多数机型；低功率或响应慢的机型可适当提高。
- `acro_trainer_debug_axis`：启用调试时记录的轴，`ROLL` 或 `PITCH`。
- `acro_trainer_gain`：角度限制强度，范围 25-255。数值增大可减少过冲，但也可能在限制角附近引起振荡。默认值 75 通常有效。

启用调试：

```text
set debug_mode = ACRO_TRAINER
```

- `debug(0)`：当前角度
- `debug(1)`：内部逻辑状态
- `debug(2)`：修正后的设定值
- `debug(3)`：根据陀螺仪角速度和预测周期推算的角度

该功能不会修改 PID 控制器的计算或行为；它仅截获横滚和俯仰轴的飞手输入并加以调整，防止超过设定角度限制。
