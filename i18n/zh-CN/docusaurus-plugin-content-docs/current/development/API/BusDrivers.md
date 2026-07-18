# 总线和外部设备驱动程序

Betaflight 区分外部设备和它们所在的总线。例如，每种类型的陀螺仪都有一个设备驱动程序，该驱动程序了解陀螺仪的寄存器映射，并且将通过总线驱动程序（I2C 或 SPI）访问这些寄存器。设备实例由 `extDevice_t` 结构表示，该结构引用与访问设备所通过的总线实例相对应的 `busDevice_t` 结构。

## 与总线无关的设备访问例程

有一组与总线无关的通用设备访问函数。在每种情况下，都会传递设备实例句柄 `dev` 来指示要访问的设备，并从中选择适当的总线实例。

### 直接访问寄存器的访问例程

这些写入例程不会屏蔽 `reg` 中的值。

```
bool busRawWriteRegister(const extDevice_t *dev, uint8_t reg, uint8_t data);
```

将值 `data` 写入寄存器偏移量 `reg`。

```
bool busRawWriteRegisterStart(const extDevice_t *dev, uint8_t reg, uint8_t data);
```

将值 `data` 写入寄存器偏移量 `reg`。如果设备位于 I2C 总线上，则此调用是非阻塞的，仅启动访问，因此有名称后缀，但应注意不要在第一次访问完成之前再次调用此调用。

```
bool busRawReadRegisterBuffer(const extDevice_t *dev, uint8_t reg, uint8_t *data, uint8_t length);
```

从寄存器偏移量 `reg` 将 `length` 字节读取到 `*data` 处的缓冲区中。

```
bool busRawReadRegisterBufferStart(const extDevice_t *dev, uint8_t reg, uint8_t *data, uint8_t length);
```

从寄存器偏移量 `reg` 将 `length` 字节读取到 `*data` 处的缓冲区中。如果设备位于 I2C 总线上，则此调用是非阻塞的，仅启动访问，因此有名称后缀。

### 编写寄存器编号用 `0x7f` 屏蔽的例程

通常通过设置寄存器编号的 7 (`0x80`) 来指示从 SPI 寄存器读取。因此，有许多例程可以清除该位以指示写入。 I2C 寄存器地址只有 7 位，具有显式读/写位。

```
bool busWriteRegister(const extDevice_t *dev, uint8_t reg, uint8_t data);
```

将值 `data` 写入寄存器偏移量 `reg`，与 `0x7f` 进行逻辑与。

```
bool busWriteRegisterStart(const extDevice_t *dev, uint8_t reg, uint8_t data);
```

将值 `data` 写入寄存器偏移量 `reg`，与 `0x7f` 进行逻辑与。如果设备位于 I2C 总线上，则此调用是非阻塞的，仅启动访问，因此有名称后缀。

### 读取寄存器与 `0x80` 进行或运算的例程

通常通过设置寄存器编号的 7 (`0x80`) 来指示从 SPI 寄存器读取。因此，有许多例程设置该位来指示读取。 I2C 寄存器地址只有 7 位，具有显式读/写位。

```
uint8_t busReadRegister(const extDevice_t *dev, uint8_t reg);
```

从寄存器偏移量 `reg` 中读取单个字节，并与 `0x80` 进行逻辑与。

```
bool busReadRegisterBuffer(const extDevice_t *dev, uint8_t reg, uint8_t *data, uint8_t length);
```

从寄存器偏移量 `reg` 处将 `length` 字节读入缓冲区 `*data`，与 `0x80` 进行逻辑与。

```
bool busReadRegisterBufferStart(const extDevice_t *dev, uint8_t reg, uint8_t *data, uint8_t length);
```

从寄存器偏移量 `reg` 处将 `length` 字节读入缓冲区 `*data`，与 `0x80` 进行逻辑与。如果设备位于 I2C 总线上，则此调用是非阻塞的，仅启动访问，因此有名称后缀。

## I2C 特定访问

I2C 总线访问速度较慢，因此，除了启动设备初始化期间外，应避免使用阻塞访问。因此，应使用 `bus...Start()` 例程，它使用中断来处理后台传输。气压计驱动程序是如何执行 I2C 设备访问的一个很好的示例，使用状态机以便在一种状态下启动访问，并且读取结果的处理或启动下一个写入会等到下一个状态。

必须将设备注册为 I2C 总线上的设备才能对其进行访问。

```
bool i2cBusSetInstance(const extDevice_t *dev, uint32_t device);
```

这会将外部设备 `dev` 注册到 I2C 总线设备实例 `device`。

```
void i2cBusDeviceRegister(const extDevice_t *dev);
```

对 `i2cBusDeviceRegister` 的调用只是增加正在使用的 I2C 设备数量的计数。

## SPI 特定访问SPI 连接设备以更高的速度访问，因此可以使用阻塞读/写来访问，但是较长的传输或需要多次传输的访问最好使用中断控制下的 DMA 传输来执行。

有许多 SPI 特定的总线访问例程可以促进此类优化。

与 I2C 一样，多个设备可以共享公共 SPI 总线。

必须将设备注册为 SPI 总线上的设备才能对其进行访问。

```
bool spiSetBusInstance(extDevice_t *dev, uint32_t device);
```

这会将外部设备 `dev` 注册到 SPI 总线设备实例 `device`。

```
void spiSetClkDivisor(const extDevice_t *dev, uint16_t divider);
```

SPI 总线上的每个设备都可以使用不同的 SPI 总线时钟速度，这会设置给定设备访问时使用的时钟分频器。

提供了两个实用程序来确定要使用的 `divider` 值，以便实现最大 SPI 时钟速度，并返回与该除数相对应的实际时钟速度。

```
// Determine the divisor to use for a given bus frequency
uint16_t spiCalculateDivider(uint32_t freq);
// Return the SPI clock based on the given divisor
uint32_t spiCalculateClock(uint16_t spiClkDivisor);
```

访问 SPI 设备需要正确设置时钟相位/极性。请参阅[https://en.wikipedia.org/wiki/Serial_Peripheral_Interface](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface)。

```
void spiSetClkPhasePolarity(const extDevice_t *dev, bool leadingEdge);
```

如果 `leadingEdge` 设置为 true（默认值），则数据将在时钟的第一个上升沿计时，如果为 false，则在第二个下降沿计时。

```
void spiDmaEnable(const extDevice_t *dev, bool enable);
```

某些设备（例如 CC2500）无法处理 DMA 的顺序访问的时序，因此这使得 DMA 能够在每个设备的基础上启用（默认）或禁用。

为了支持 SPI 的有效使用，不仅可以执行如上所述的单次访问，​​还可以使用 `busSegment_t` 元素的数组定义传输序列，然后这些元素组成一个完整的事务。这些可能很复杂，例如在执行写入之前支持轮询总线状态。

每个 `busSegment_t` 元素传递一对分别用于写入/读取的缓冲区指针的联合，以及用于终止列表的空链接结构。以下是传输中的字节数、布尔值 `negateCS`，指示 SPI CS 线是否应在段末尾取反，以及可选的回调例程。

一个很好的例子是 `m25p16_readBytes()`，其中段列表的定义如下：

```
    busSegment_t segments[] = {
            {.u.buffers = {readStatus, readyStatus}, sizeof(readStatus), true, m25p16_callbackReady},
            {.u.buffers = {readBytes, NULL}, fdevice->isLargeFlash ? 5 : 4, false, NULL},
            {.u.buffers = {NULL, buffer}, length, true, NULL},
            {.u.link = {NULL, NULL}, 0, true, NULL},
    };
```

在上面的示例中，在第一个元素中轮询闪存的繁忙状态，然后调用 `m25p16_callbackReady()` 来检查读取状态。如果设备忙，则返回值 `BUS_BUSY`，并且该元素将在中断/DMA 控制下重复。如果设备准备好接受新命令，则返回 `BUS_READY` 并处理下一个元素。 `BUS_ABORT` 也可以在中止整个事务时返回，尽管当前尚未使用。

使用轮询访问而不是设置 DMA 来执行短传输会更快，并且规则如下以确定是否应使用 DMA。

1. 总线和设备上启用DMA
2. 所有发送/接收缓冲区均位于支持 DMA 的内存中
3. 以下之一：
   1. 至少有 `SPI_DMA_THRESHOLD` 字节要传输
   2. 段列表中存在多个单个元素
   3. `negateCS` 布尔值在列表的终止条目中设置为 `false`。

`rx_sx1280.c` 中的 ELRS 驱动程序是 3.3 的示例，其中终止链路将 `negateCS` 设置为 `false`。这样可以确保所有访问都在后台运行而不会阻塞。

```
void spiSequence(const extDevice_t *dev, busSegment_t *segments);
```

该例程将给定的段列表排队以进行处理。如果设备的总线已经繁忙，则该段列表将链接到队列中的前一个段列表，以便访问将自动尽快地一个接一个地进行。

```
void spiWait(const extDevice_t *dev);
```

阻止，等待指示设备的总线活动完成。

```
bool spiIsBusy(const extDevice_t *dev);
```

如果设备总线繁忙，则返回 true。