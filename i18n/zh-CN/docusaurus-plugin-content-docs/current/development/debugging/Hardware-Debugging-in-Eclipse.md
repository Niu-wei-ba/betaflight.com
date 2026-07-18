# Eclipse 中的硬件调试

使用命令行或通过 Eclipse make target 构建带有调试信息的二进制文件。

示例 Eclipse 生成目标

![](../assets/eclipse-gdb-debugging/make%201%20-%20OLIMEXINO%20GDB.PNG)

# GDB 和 OpenOCD

启动openocd

在 eclipse 中创建一个新的调试配置：
![连接到 openocd](http://i.imgur.com/somJLnq.png)
![使用工作区默认值](http://i.imgur.com/LTtioaF.png)

您可以通过 telnet 连接控制 openocd：

```
telnet localhost 4444
```

停止开发板，刷新固件，重新启动：

```
	reset halt
	wait_halt
	sleep 100
	poll
	flash probe 0
	flash write_image erase /home/user/git/betaflight/obj/betaflight_STM32F4DISCOVERY.hex 0x08000000
	sleep 200
	soft_reset_halt
	wait_halt
	poll
	reset halt
```

此时您可以在 Eclipse 中启动调试。
![](http://i.imgur.com/u7wDgxv.png)

# GDB 和 J 链接

以下是 Hydra 对 Eclipse (Kepler) 配置的一些屏幕截图

如果您使用 cygwin 构建二进制文件，那么请确保首先配置您的公共 `Source Lookup Path`, `Path Mappings`，如下所示：

![](../assets/eclipse-gdb-debugging/config%207.PNG)

从 `Run` 菜单创建新的 `GDB Hardware Debugging` 启动配置

首先构建使用 GDB 调试信息编译的可执行文件非常重要。
选择适当的 .elf 文件（不是十六进制文件） - 在这些示例中，目标平台是 OLIMEXINO。

禁用自动构建

![](../assets/eclipse-gdb-debugging/config%201.PNG)

选择适当的 gdb 可执行文件 - 最好来自用于构建可执行文件的同一工具链。

![](../assets/eclipse-gdb-debugging/config%202.PNG)

配置启动如下

初始化命令

```
target remote localhost:2331
monitor interface SWD
monitor speed 2000
monitor flash device = STM32F103RB
monitor flash download = 1
monitor flash breakpoints = 1
monitor endian little
monitor reset
```

![](../assets/eclipse-gdb-debugging/config%203.PNG)

![](../assets/eclipse-gdb-debugging/config%204.PNG)

指定运行命令也可能很有用：

```
monitor reg r13 = (0x00000000)
monitor reg pc = (0x00000004)
continue
```

![](../assets/eclipse-gdb-debugging/config%2013.PNG)

如果您使用 cygwin，“源”选项卡上应显示一个附加条目（此屏幕截图中未显示）

![](../assets/eclipse-gdb-debugging/config%205.PNG)

通用选项卡上的默认值无需更改

![](../assets/eclipse-gdb-debugging/config%206.PNG)

以USB模式启动J-Link服务器

![](../assets/eclipse-gdb-debugging/config%209.PNG)

如果它连接到您的目标设备，它应该看起来像这样

![](../assets/eclipse-gdb-debugging/config%2010.PNG)

从 Eclipse 中使用运行/调试配置...启动应用程序，Eclipse 应该将编译后的文件上传到目标设备，如下所示

![](../assets/eclipse-gdb-debugging/config%2011.PNG)

当它运行时，J-Link 服务器应该如下所示。

![](../assets/eclipse-gdb-debugging/config%2012.PNG)

最后，您可以使用 Eclipse 调试功能来检查变量、内存、堆栈跟踪、设置断点、单步执行代码等。

![](../assets/eclipse-gdb-debugging/debugging.PNG)

如果 Eclipse 找不到断点并且它们被忽略，则检查路径映射（如果使用 cygwin）或使用其他调试启动器，如下所示。请注意配置窗口底部的“选择其他...”。

![](../assets/eclipse-gdb-debugging/config%208%20-%20If%20breakpoints%20do%20not%20work.PNG)