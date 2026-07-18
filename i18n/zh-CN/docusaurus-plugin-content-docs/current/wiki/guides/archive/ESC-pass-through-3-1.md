# ESC 直通

## Betaflight BLHeli ESC 直通

1. 将飞控（FC）连接到电脑，记下 COM 端口号。
2. 打开 BLHeliSuite，选择 COM 端口并点击 **Connect**。
3. 在 **Select ATEM/SILABS Interface** 菜单中选择 **SILABS BLHeli Bootloader (CleanFlight)**。
4. 通过限流器为 ESC 供电。
5. 点击 **Read Setup**。

现在可以修改 ESC 设置或刷写新固件。

## Betaflight KISS ESC 直通

3.1 引入了通过直通模式和 KISS Flash Loader 应用刷写 KISS ESC 的功能。请注意，此功能当时可能尚未在所有 target 上启用。Flash Loader 是 Chrome 应用，必须在扩展程序中开启**开发者模式**后安装。

目前需要先在 CLI 中启用直通，再通过 Flash Loader 应用刷写；后续版本可能可直接在 Configurator 中完成。

`KISSESC_flashloader` 也可在 [DShot 讨论帖的首帖](https://www.rcgroups.com/forums/showthread.php?2756129-DShot-testing-a-new-digital-parallel-ESC-throttle-signal)“Files”部分获取。

[Flyduino 下载页](http://kiss.flyduino.net/downloads/)

ESC 1 的命令：

```
escprog ki 1
```

ESC 2 的命令：

```
escprog ki 2
```

同时操作全部 4 个 ESC 的命令：

```
escprog ki 255
```

操作步骤：

- 在 CLI 中输入相应命令，然后点击 Configurator 的断开连接按钮。
- 打开 KISS Flash Loader，选择对应的 COM 端口。
- 选择 **USB-UART**。
- 选择要刷写的 DShot HEX 文件。
- 可启用 Fast Bootloader 加快刷写；若失败，请关闭该选项。
- **此时才**通过限流器连接 LiPo。此前不得接入电池。
- 点击 **Flash**，ESC 上的 LED 应开始闪烁。
- 断开 LiPo 和 USB 线后，即可使用 DShot。

若上述命令无效，表示该 target 可能尚未启用 ESC 串口刷写直通。Castle ESC 也可以使用相同方式刷写。

[KISS 刷写提示](https://www.rcgroups.com/forums/showthread.php?2864933-Another-Kiss-24a-ESC-flashing-question%21%21-need-some-tips)

## 限流器

### 在工作台测试、ESC 刷写、校准或 Configurator 打开期间，只要接入 LiPo，就必须使用限流器。

灯泡限流器制作讨论帖，即 Smoke Stopper：

[https://www.rcgroups.com/forums/showthread.php?2327875-DIY-SAVE-YOUR-ELECTRONICS!-BUILD-A-SmokeStopper%C2%99-!](https://www.rcgroups.com/forums/showthread.php?2327875-DIY-SAVE-YOUR-ELECTRONICS!-BUILD-A-SmokeStopper%C2%99-!)
