# OSD 配置文件

OSD 配置文件是 OSD 元素的屏幕或页面。支持三种 OSD 配置文件，即您可以配置 3 个不同的 OSD 配置文件或页面，每个都有自己的 OSD 元素。元素也可能位于所有 3 个配置文件上。 OSD 仍然可以像以前一样通过 AUX 通道打开或关闭。因此，不想要此功能的用户不会受到其可用性的影响。如果没有为元素配置配置文件，则所有元素都是可见的，即 OSD 配置文件 1 是默认配置文件。请记住，如果使用某个元素，则该元素必须位于其可见的所有 OSD 配置文件上的相同位置。无法将元素配置为位于不同配置文件的不同位置。

## 配置

目前（地面站 10.4.0）OSD 配置文件只能通过 CLI 进行配置。使用地面站布局 OSD 并保存。在此阶段，位于相同位置但不同配置文件上的元素将在地面站中重叠。 OSD 配置文件可以通过调整范围（启用专家模式后的调整选项卡）或通过使用 CLI 中的 set 命令设置 osd_profile 参数来选择。所选的 OSD 配置文件可以通过无线电上的开关进行控制，也可以配置不同的配置文件，然后使用 CLI 中的 `set osd_profile=2` 命令选择所需的配置文件并保存。

###### OSD 配置

1. 通过地面站中的 OSD 选项卡配置您的 OSD，即元素布局、字体等，如前所述。

###### 选项 1：配置调整范围以更改收音机的 OSD 配置文件

1. 打开专家模式 - 请参阅地面站屏幕右上角的“启用专家模式”。
2. OSD 配置文件选择是使用通过“调整”选项卡配置的调整来执行的。
   - 启用调整。 （“如果启用”）
   - 选择用于更改 OSD 配置文件的 AUX 通道。 （“当频道”）
   - 设置范围以覆盖所选 AUX 通道的整个范围。 （“在范围内”）
   - 对于操作，选择“RC 速率调整”。 （“然后应用”）这将在 CLI 中配置，因为地面站 10.4.0 及更早版本不支持 OSD 配置文件。选择“RC Rate adjustment”只是为了使下面的 CLI 中的配置更容易一些。
   - 选择“via 通道”以匹配上面选择的 AUX 通道。 （“当通道”）。
   - 保存
3. 打开 CLI 并输入 `adjrange`，然后按 Enter。
4. 复制上面步骤 2 中配置的 adjrange 并将其粘贴到命令窗口中。将通道范围后面的“1”更改为“29”，然后按 Enter 键。输入 `save` 并按 Enter 键。现在将保存配置的调整范围并且 FC 将重新启动。
5. 配置对讲机的 AUX 通道。当此通道更改时，所选 OSD 配置文件将更改，显示为所选配置文件配置的所有元素。请注意，默认情况下，元素分配给配置文件 1。要恢复为不使用 OSD 配置文件，请转至 CLI 并选择并键入 `set osd_profile=1` 按 Enter，然后按 `save` 并按 Enter。请记住，配置为仅在配置文件 2 和 3 上可见的元素需要重新配置，并且在配置文件 1 上不可见。

###### 选项 2：使用 CLI 选择 OSD 配置文件（即不使用无线电选择 OSD 配置文件）

1. 打开 CLI。
2. 键入 `get osd_profile`，然后按 Enter 键以显示当前选择的配置文件。
3. 输入 `set osd_profile=x`，其中 x 是配置文件编号 1,2 或 3，然后按 Enter 键。
4. 键入 `save`，然后按 Enter 键以保存选定的配置文件。

###### 配置 OSD 配置文件

仅当使用地面站 10.4.0 或更早版本时才需要执行以下步骤。

1. 打开 CLI。
2. 找到要配置的元素名称，使用`dump`命令或`get osd`命令可以显示所有元素。元素名称以 \_pos 结尾。
3. 获取元素的当前值，应用 OSD 配置文件配置并使用 `set` 命令设置其新值。 OSD 配置文件配置值如下所述。

   例如。 osd_vbat_pos = 6560
   `set osd_vbat_pos = 31136`
   `save`

4. 对每个要配置的元素重复步骤 2 和 3。

###### OSD 配置文件配置值

OSD 配置文件配置存储在 OSD 元素（如 `osd_vbat_pos`）的高位，即位 11、12 和 13。完成 OSD 选项卡的初始布局后，需要在初始值中加入元素的 OSD 配置文件位。计算新值时，将元素当前值转为十六进制；确定元素应在哪些 OSD 配置文件中可见，从下表选择对应十六进制值；对初始元素值和表中值执行 OR 运算；将结果转为十进制，再通过 CLI 的 `set` 命令写入。

```
Binary Value    HEX Value    Profile Configuration   Description
13 12 11
	0  0  1        0x0800   -   1                       Visible in OSD Profile 1
	0  1  0        0x1000   -   2                       Visible in OSD Profile 2
	0  1  1        0x1800   -   1 and 2                 Visible in OSD Profile 1 and 2 only
	1  0  0        0x2000   -   3                       Visible in OSD Profile 3 only
	1  0  1        0x2800   -   1 and 3                 Visible in OSD Profile 1 and 3 only
	1  1  0        0x3000   -   2 and 3                 Visible in OSD Profile 2 and 3 only
	1  1  1        0x3800   -   1, 2 and 3              Visible in all OSD Profiles
```

示例：

1. osd_vbat_pos = 6560
2. 将 `6560` 转为十六进制，得到 `19A0`（可使用 Windows 计算器的程序员模式）。
3. 我们希望该元素在 OSD 配置文件 2 和 3 上可见，因此从上表中选择十六进制值 0x3000。
4. 将两个十六进制值相或 19A0 OR 3000 = 39A0
5. 将 39A0（十六进制）转换为十进制结果 14752。
6. 在 CLI 中，输入 `set osd_vbat_pos = 14752` 并输入 `save`。

## 注意：

1. 如果使用地面站 10.4.0 或更早版本，则在调整选项卡上更改调整时，OSD 配置文件的“然后应用”项 (29) 也将被清除，即设置为 0，并且必须通过 CLI 重新配置，例如`adjrange 0 0 8 900 2100 29 8 0 0`
2. 如果 CLI 打开，则 OSD 配置文件选择不会激活，换句话说，如果您在 CLI 打开时更改 osd_profile 的值，则不会发生任何变化，所选的 OSD 配置文件将保持原样。

## 使用

完成上述配置后，您应该能够从无线电或通过 CLI 选择活动的 OSD 配置文件。在地面或飞行途中可以随时选择/更改配置文件。

## 有用的 OSD 配置文件 CLI 命令

`get osd_profile {enter}` 显示 CLI 中当前选择的 OSD 配置文件。

`set osd_profile= {number, 1-3}` 选择 OSD 配置文件。

## 屏幕和显示调整

不同的显示设备具有不同的特性，因此您可能会遇到一些不便，例如显示的项目在右边缘被截断、最上面的行仅部分可见等类似问题。

您可以调整 CLI 变量以适应屏幕内的内容。

### MAX7456 / AB7456 FC 集成 OSD (SPI)

`vcd_v_offset`
调整第一行的垂直位置。

`vcd_h_offset`
调整左边缘的水平位置。

`displayport_max7456_col_adjust`
调整一行中的字符数。

`displayport_max7456_row_adjust`
调整屏幕上的行数。

### 外部 OSD（支持 DisplayPort 的 MWOSD 等）

`displayport_msp_col_adjust`
调整一行中的字符数。

`displayport_msp_row_adjust`
调整屏幕上的行数。

### 示例

![MAX7456之前](https://cloud.githubusercontent.com/assets/14850998/21984495/9068762e-dc39-11e6-94e5-fde94f0a47d2.jpg)
原屏。

![调整后的屏幕](https://cloud.githubusercontent.com/assets/14850998/21984498/9237de54-dc39-11e6-9ee5-94fa6bab2d07.jpg)
屏幕显示`displayport_max7456_col_adjust = -2`。

## OSD 字体上传问题

### 描述

Betaflight Configurator 通过 USB 上传字体的功能在某些飞控上不起作用。无论您上传字体多少次，OSD 仍显示默认字体。

![OSD 字体管理器](https://oscarliang.com/ctt/uploads/2017/07/betaflight-osd-font-manager.jpg)

### 解决方法

您需要**插入电池**，以便该功能正常工作（**桨叶已拆下！**）。 **首先**插入电池，然后连接到 USB。

### 最可能的原因

当仅连接到 USB 时，某些飞控设计无法正确（或根本）为 OSD 芯片供电。 OSD 字体存储在 OSD 芯片内部，因此必须为其供电并与飞控的其余部分通信才能更新字体。

### 受影响板卡

已知以下板/FC 存在字体上传问题：

| 板卡名称                   | Target        | OSD 芯片 | 接 LiPo 后可修复？ | 产品 URL                                                                                                                                          |
| :------------------------- | :------------ | :------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| DAL RC F405 AIO            | DALRCF405     | N/A      | 是                 | [dalrc](http://www.dalrc.cn/DALRC/plus/view.php?aid=186)                                                                                          |
| DAL RC F722Dual            | DALRCF722DUAL | N/A      | 是                 |                                                                                                                                                   |
| Speedy Bee F7 AIO          | SPEEDYBEEF7   | N/A      | 是                 | [Speedy Bee F7](https://www.speedybee.com/f7-aio-flight-controller/)                                                                              |
| Diatone Mamba F405 Mini FC | FURYF4OSD     | N/A      | 是                 | [diatone](https://www.diatoneusa.com/store/p574/MAMBA_F405_Mini_Betaflight_Flight_Controller_F25_25A_2_4S_DSHOT600_FPV_Racing_Brushless_ESC.html) |

### 来源

[GitHub 问题 #1301](https://github.com/betaflight/betaflight-configurator/issues/1301)
