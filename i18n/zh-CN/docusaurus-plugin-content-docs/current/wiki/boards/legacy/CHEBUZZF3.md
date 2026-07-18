# ChebuzzF3

ChebuzzF3 是一块子板，可连接到 STM32F3Discovery 板的底部，并为各种飞控连接提供排针和接口。

所有连接均先使用万用表追线，再依据下列修订版本的 TauLabs 源代码验证：

https://github.com/TauLabs/TauLabs/blob/816760dec2a20db7fb9ec1a505add240e696c31f/flight/targets/flyingf3/board-info/board_hw_defs.c

## 连接说明

### 板卡方向

以下说明假定板卡排针朝上放置，板卡右下角靠近 8 组 INPUT 排针。

“内侧”是指两排排母之间，“外侧”是指板卡左右边缘与排母之间。

### SPI2 / 外部 SPI

```text
sclk GPIOB 13
miso GPIOB 14
mosi GPIOB 15
```

在 Ext SPI 标签旁有 4 个标记为 CS1 至 CS4 的引脚。第 3 个引脚连接到板卡右下内侧的 Flash 芯片；该 Flash 芯片的其他引脚连接至 PB3、PB4 和 PB5。

### SPI3 / SPI

```text
sclk GPIOB 3
miso GPIOB 4
mosi GPIOB 5
```

```text
ssel 1 GPIOB 10 / Ext SPI CS1
ssel 2 GPIOB 11 / Ext SPI CS2
ssel 3 GPIOB 12 / Ext SPI CS3 - 连接至 M25P16 15 Mbit Flash 芯片的片选端
ssel 4 GPIOB 13 / Ext SPI CS4 - 因用作 SPI2 sclk，无法使用
```

### RC 输入

```text
INPUT
PA8 / CH1 - TIM1_CH1
PB8 / CH2 - TIM16_CH1
PB9 / CH3 - TIM17_CH1
PC6 / CH4 - TIM8_CH1
PC7 / CH5 - TIM8_CH2
PC8 / CH6 - TIM8_CH3
PF9 / CH7 - TIM15_CH1
PF10 / CH8 - TIM15_CH2
```

### PWM 输出

```text
OUTPUT
PD12 / CH1 - TIM4_CH1
PD13 / CH2 - TIM4_CH2
PD14 / CH3 - TIM4_CH3
PD15 / CH4 - TIM4_CH4
PA1 / CH5 - TIM2_CH2
PA2 / CH6 - TIM2_CH3
PA3 / CH7 - TIM2_CH4
PB0 / CH8 - TIM3_CH3
PB1 / CH9 - TIM3_CH4
PA4 / CH10 - TIM3_CH2
```

### 其他接口

板卡左上内侧预留了 MS5611 气压传感器的位置。

板卡左侧外部有 I2C 插座，与其正对内侧的 PCA9306 I2C 电平转换器相连。部分板卡未焊接 PCA9306，因此 I2C 插座不可用。

板卡右上外侧有 CAN 插座，连接至 MAX3015 CAN 收发器。部分板卡未焊接 MAX3015，因此 CAN 插座不可用。

板卡右上内侧有标记为 Ext 1 至 Ext 4 的焊盘：

```text
GPIOE 6 / PE6 / Ext 1
GPIOD 3 / PD3 / Ext 2
GPIOD 4 / PD4 / Ext 3
GPIOB 3 / PB3 / Ext 4
```

板卡左上内侧有标记为 ADC0 至 ADC3 和 Diff Press 的焊盘，连接至左上外侧的 ADC 插座：

```text
PC3 / Diff Press - ADC12_IN9（差压）
PC2 / ADC2 - ADC12_IN8
PC1 / ADC1 - ADC12_IN7
PC0 / ADC0 - ADC12_IN6
```

板卡预留了 MPXV5004/MPVZ5004 差压传感器的位置；焊接该传感器后，其模拟引脚连接至 PC3。

板卡有 5 路标记为 USART1 至 USART5 的 UART 插座。

另有一个标记为 RX_IN 的插座：

```text
GPIOD 2 / PD2 / RX_IN
```
