# USB 损坏救援

无需其他前置条件，即可通过 UART 为 FC 刷写固件。这在 FC 的 USB 端口损坏后仍需继续使用时很有用。

> ## 重要
>
> 仅适用于 STM32 处理器。AT32 也可采用类似流程（使用 AT32 的 IAP_Programmer），但尚未测试。

## 前置条件

- USB/UART 适配器（FT232、CP2102 等）
- STM32CubeProgrammer (https://www.st.com/en/development-tools/stm32cubeprog.html)

要让 Betaflight 地面站访问 FC，必须按常规在某个 UART 上启用 MSP。

## 自定义固件

必须构建一个在 UART 上启用 MSP 的自定义“救援”固件。若标准固件已在某个 UART（而非 VCP）上启用 MSP，可跳过此步骤。

### 手动构建

阅读[构建](/docs/category/building)并按说明操作。添加 `-DMSP_UART=[UART]` 作为 `EXTRA_FLAG`，再用下表中的值替换 `[UART]`。

### 云构建

在 Betaflight 地面站中打开“固件烧写工具”，启用“专家模式”，选择目标板和固件版本，添加以下“自定义定义”：`MSP_UART=[UART]`。使用下表中的值替换 `[UART]`。

固件构建完成后，单击“已加载在线固件 [filename]”，将 hex 文件保存到电脑。

`[UART]` 的取值：

| UART | 值                  |
| :--- | :------------------ |
| 1    | SERIAL_PORT_USART1  |
| 2    | SERIAL_PORT_USART2  |
| 3    | SERIAL_PORT_USART3  |
| 4    | SERIAL_PORT_UART4   |
| 5    | SERIAL_PORT_UART5   |
| 6    | SERIAL_PORT_USART6  |
| 7    | SERIAL_PORT_USART7  |
| 8    | SERIAL_PORT_USART8  |
| 9    | SERIAL_PORT_UART9   |
| 10   | SERIAL_PORT_USART10 |

UART 3 示例：

- 手动构建：`-DMSP_UART=SERIAL_PORT_USART3`
- 云构建：`MSP_UART=SERIAL_PORT_USART3`

## 通过 UART 刷写

1. 从 FC 断开**所有**外设和 USB 线缆。使用电池，或 USB/串口转换器提供的 5V 为 FC 供电。
2. 将 UART 1 或 3（其他 UART 不可用）及 GND 连接至 USB/串口转换器（RX -> TX，TX -> RX）。
3. 按住 Boot / DFU 按钮。
4. 为 FC 上电。
5. 启动 STM32CubeProgrammer，进入菜单中的第二项“Erasing & Programming”。
6. 选择 UART（蓝色下拉框），选择 USB/串口适配器的 COM 端口，然后点击“Connect”。下方应显示对应处理器。
7. 点击“Full flash erase”。即使刷写与 FC 原有版本相同的固件，也必须执行此操作，否则 UART 上的 MSP 可能不会激活。
8. 在“Download”下加载之前创建的固件（`betaflight_X.X.X_[PROCESSOR]_[TARGET].hex`）。“Verify programming”为可选但推荐启用。确保**未**启用“Skip flash erase while programming”。
9. 点击“Start Programming”。

流程完成后，关闭 FC 再重新上电；随后 Configurator 即可通过 USB/串口适配器和之前配置的 UART 连接 FC。
