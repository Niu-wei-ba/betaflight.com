# HID 手柄支持

目前仅 F4/F7 板卡支持 HID 手柄。

在 CLI 中将 `usb_hid_cdc` 设为 `on`，然后重启飞控。之后通过 USB 连接时，系统会将飞控识别为 HID 手柄。

Windows 7 需要安装驱动，可从[此处](/resources/hid_driver_windows_7.zip)下载。
