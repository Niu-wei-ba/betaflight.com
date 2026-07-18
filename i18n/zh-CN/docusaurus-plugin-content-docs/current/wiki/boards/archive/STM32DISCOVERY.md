# STM32 Discovery

STM32 Discovery 是价格相对低廉的开发板，搭载由 [STMicroelectronics](https://www.st.com/) 制造和销售的 STM32 MCU。它们通常被称为“实验板”，并非专门设计为飞控，而是可用于多种用途。与标准飞控相比，这些板卡更大、更重，但配有排针，便于连接和快速改动，无需焊接。

该系列提供多种 MCU 和板型；其引脚分配较为相似，便于兼容外接扩展板。

STMicroelectronics 提供了完整的技术文档。

## 目标

| 目标                 | MCU           | 文档                                                                                                                                                                                                                                                                |
| -------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STM32F3DISCOVERY`   | `STM32F303VC` | [用户手册](https://www.st.com/content/ccc/resource/technical/document/user_manual/8a/56/97/63/8d/56/41/73/DM00063382.pdf/files/DM00063382.pdf/jcr:content/translations/en.DM00063382.pdf) \| [MCU 数据表](https://www.st.com/resource/en/datasheet/stm32f303vc.pdf) |
| `STM32F4DISCOVERY`   | `STM32F407VG` | [用户手册](https://www.st.com/content/ccc/resource/technical/document/user_manual/70/fe/4a/3f/e7/e1/4f/7d/DM00039084.pdf/files/DM00039084.pdf/jcr:content/translations/en.DM00039084.pdf) \| [MCU 数据表](https://www.st.com/resource/en/datasheet/stm32f407vg.pdf) |
| `STM32F411DISCOVERY` | `STM32F411VE` | [用户手册](https://www.st.com/content/ccc/resource/technical/document/user_manual/e9/d2/00/5e/15/46/44/0e/DM00148985.pdf/files/DM00148985.pdf/jcr:content/translations/en.DM00148985.pdf) \| [MCU 数据表](https://www.st.com/resource/en/datasheet/stm32f411re.pdf) |

硬件规格、外设、引脚分配及其他资料均可在上述用户手册中查阅。本文其余部分重点介绍如何为这些板卡配置 Betaflight，以及示例装配和接线方式。

_注意：用户手册似乎未列出全部引脚分配，建议同时核对 MCU 数据表。_

### 引脚

| 功能           | F3   | F4   | F411 |
| -------------- | ---- | ---- | ---- |
| PPM 接收机     | PB8  | PB9  | PB8  |
| 电机 1         | PA8  | PB1  | PD12 |
| 电机 2         | PC6  | PB0  | PB1  |
| 电机 3         | PC7  | PA2  | PB0  |
| 电机 4         | PC8  | PA3  | PA2  |
| 电机 5         | /    | PA10 | PA3  |
| 电机 6         | /    | PA8  | PA10 |
| 蜂鸣器         | PD12 | /    | PA8  |
| USART1 TX      | PA9  | PB6  | PA15 |
| USART1 RX      | PA10 | PB7  | PA10 |
| USART2 TX      | PD5  | PA2  | PA2  |
| USART2 RX      | PD6  | PA3  | PA3  |
| USART3 TX      | PB10 | PB10 | /    |
| USART3 RX      | PB11 | PB11 | /    |
| USART4 TX      | PC10 | PA0  | /    |
| USART4 RX      | PC11 | PA1  | /    |
| USART5 TX      | PC12 | /    | /    |
| USART5 RX      | PD2  | /    | /    |
| USART6 TX      | /    | PC6  | PC6  |
| USART6 RX      | /    | PC7  | PC7  |
| HCSR04 Trigger | PB0  | /    | /    |
| HCSR04 Echo    | PB1  | /    | /    |

_注意：`/` 表示不支持或未配置。_

## 设置

### 刷写固件

- 使用标有 `ST-LINK` 的端口连接板卡（通常是 Mini-B USB 接口）。

**Linux 和 macOS：**

- 安装 [stlink](https://github.com/texane/stlink)
- `$ st-flash --format ihex write program.hex`

**Windows：**

- 安装并使用 [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html)

### 连接 Configurator

- 使用标有 `USER` 的端口连接板卡（通常是 Micro-AB 或第二个 Mini-B USB 接口）。

## 装配示例

作为完整装配示例，[feriCopterV1](https://github.com/Nailim/feriCopterV1) 是一架为学生项目完全定制的无人机。该项目包含简易 3D 打印机架、零件清单、装配说明和引脚连接说明，适合希望以较低成本自行组装小型无人机并了解其工作原理的用户。

该示例基于 `STM32F3DISCOVERY` target（固件目标），Configurator 中所需的更改见下文。其他 Discovery 板请参阅[目标引脚](#pins)表；非引脚相关的其他改动也列于下文。

**Configurator：**

| 设置     | 值          |
| -------- | ----------- |
| Mixer    | Quad X 1234 |
| Receiver | PPM RX 输入 |

### F411 的改动

- 前后方向反转（前方即后方，后方即前方）。
- 由于跳线位置不同，机架需要稍作开孔。
