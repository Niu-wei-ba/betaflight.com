# OneShot

:::caution 已归档：旧版协议

OneShot125 是与 Naze32、CC3D 及早期 BLHeli 硬件相关的旧版 ESC 通信协议。它已被 **DShot** 取代；DShot 是现代飞控与 ESC 的通用标准。

如需配置当前硬件，请阅读 [DShot](/docs/wiki/guides/current/Dshot)。

:::

OneShot 可加快多旋翼飞控与 ESC 之间的通信，方式如下：

1. 使用 125–250 us 的信号宽度，而非普通 PWM 的 1000–2000 us。
2. 每个飞控控制循环仅发送一次“shot”，并在飞控计算出所需电机转速后立即发送。

## 支持的 ESC

FlyDuino KISS ESC 开箱即可使用 OneShot125，只需进行一处焊接。

BLHeli rev13.0 同样支持 OneShot125，ESC 会自动选择该协议，无需额外操作。

## 支持的板卡

Naze 系列板卡已在多种配置中完成飞行测试。

CC3D 已使用 PPM 接收机测试；并行 PWM 接收机可能无法在该板上正常工作。

## 启用 OneShot

配置 OneShot 前，必须先切断 ESC 的所有供电。

此时建议将 ESC 配置为 OneShot 模式，例如 KISS ESC 需要焊接 `JP1`。

用 USB 线连接飞控，并通过 Chrome GUI 应用连接。

进入 CLI 选项卡，输入：

```
feature ONESHOT125
save
```

现在可安全地重新为 ESC 供电。

## 校准

OneShot ESC 的校准流程与其他 ESC 相同：

1. 确认 ESC 未通电。
2. 通过 USB 连接飞控，进入电机测试页面。
3. 使用主滑块将电机速度调至最大。
4. 为 ESC 接通电源，ESC 会发出提示音。
5. 点击滑块将电机速度降至零，ESC 会再次发出提示音，通常会响数次。
6. 断开 ESC 电源。
7. 重新接通 ESC 电源，确认移动电机滑块时电机能正常加速。

## 参考资料

- FlyDuino：http://flyduino.net/
