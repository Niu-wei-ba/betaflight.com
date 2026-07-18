# 硬件参考

## 简介

本页为未来板卡的硬件开发者提供参考信息，以确保与 Betaflight 的最大兼容性。

## Target 维护

硬件开发者负责在 Betaflight 中开发和维护其 Target。Target 文件会尽可能与主代码分离，以便于维护。

## 添加新 Target

如需添加新的飞行控制器：

1. 所有 PR 都应基于 `master` 分支提交。
2. 不要修改 `travis.yml` 或 `fake_travis_build.sh` 文件；它们仅用于从全部构建中抽取一个子集来检查 PR。
3. 在支持文档的板卡章节中添加页面，说明该飞控，并提供至少一个供应商链接。

## 硬件

### MPU（SPI 与 I2C）

### MPU 中断

### Blackbox 闪存

### MCU

以下数据手册 / 参考手册摘录涵盖可能的引脚、定时器和 DMA 分配：

- [STM32F3](/reference/stm/stm32f3_pins_timers_dma.pdf)
- [STM32F405](/reference/stm/stm32f405_pins_timers_dma.pdf)
- [STM32F411](/reference/stm/stm32f411_pins_timers_dma.pdf)
- [STM32F722](/reference/stm/stm32f722_pins_timers_dma.pdf)
- [STM32F745](/reference/stm/stm32f745_pins_timers_dma.pdf)
- [STM32H743](/reference/stm/stm32h743_pins.pdf)（仅引脚）

## 协议

### 遥测

#### IBus

[IBus 遥测规范](/docs/wiki/guides/current/IBus-telemetry)
