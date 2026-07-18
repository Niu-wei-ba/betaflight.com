通过 J-link 和 GDB 进行调试时，与其他功能共享 SWD 端口 I/O 引脚可能会出现问题。这可能会阻止 J-link SWD 连接并导致错误消息，例如：

> 警告：RESET（引脚 15）为高电平，但应为低电平。请检查目标硬件

- 在 SMT32F303 上，UART2 TX 与 PA14 上的 SWDCLK 共享。启用 UART2 上的任何功能都会阻止 SWD。使用 UART2 进行 TRAMP VTX 控制时，SPRACINGF3 出现问题。禁用 UART2 解决了该问题。
- 在STM32F405上，SWDIO和SWDCLK不共享，我没有看到任何像上面这样的问题。
- MatekF722-SE 使用 PA14/PA15 作为 LED，但如果移除 LED，至少会提供焊接焊盘，如下所示，其中 JST-SH 4 针连接器用于 SWDIO、SWDCK、3V3 和 GND。
  ![](https://user-images.githubusercontent.com/11480839/63185119-0fb64c00-c051-11e9-9bdb-56a7244bf62e.jpeg)