# Blackbox Explorer 功率谱密度图

Blackbox Explorer 的频谱分析器可显示功率谱密度（PSD）图。
![图示](/img/blackbox/psd_1.jpg)

功率谱密度图以标准 `dBm/Hz` 单位显示噪声电平。例如：

- 每相差 `10dBm`，噪声功率比为 10；`20dBm` 为 100；`30dBm` 为 1000。
- 每相差 `20dBm`，噪声幅度比为 10；`40dBm` 为 100；`80dBm` 为 1000。

## “Power spectral density” 频谱图

该图按频率显示噪声功率谱密度。
![图示](/img/blackbox/psd_2.jpg)

垂直滑块可调节曲线平滑程度；曲线越不平滑，频率分辨率越高。
![图示](/img/blackbox/psd_3.jpg)

按住 Shift 键时，鼠标光标会显示当前功率值。
![图示](/img/blackbox/psd_4.jpg)

## RPM 功率谱密度热图（“PSD vs RPM”）

该图按频率和 RPM 显示噪声功率谱密度。
![图示](/img/blackbox/psd_5.jpg)

可通过图表右上角三个数值输入框设置：

- `Max dBm`：设为图表中显示为白色的最大功率电平；
- `Min dBm`：设为图表中显示为黑色的最小功率电平；
- `Limit dBm`：低于此阈值的功率显示为黑色。

按住 Shift 键时，鼠标光标会显示当前功率值。
![图示](/img/blackbox/psd_6.jpg)

## 油门功率谱密度热图（“PSD vs Throttle”）

该图按频率和油门显示噪声功率谱密度，外观与 RPM 功率谱密度图类似。但在 RPM 滤波器工作时，RPM 功率谱密度图更有帮助。
![图示](/img/blackbox/psd_7.jpg)

## 比较 Blackbox Explorer 功率谱密度曲线

可使用功率谱密度频谱图比较多个频谱，最多比较 6 个。

比较同一日志文件中不同曲线的 PSD 频谱：

- 显示该曲线的“Power spectral density”图；
- 在曲线图例上按住 Ctrl 并单击，选择多条曲线；
- 分析频谱差异；
- 点击 `Clr` 按钮移除所有待比较曲线；
- 再次按住 Ctrl 并单击某条曲线，可将其从比较中移除。

![图示](/img/blackbox/psd_8.jpg)

比较不同日志文件中曲线的 PSD 频谱：

- 显示第一份日志中曲线的“Power spectral density”；
- 点击 `Exp`（Export）按钮，频谱数据将导出为 `.CSV` 文件；
- 从需要比较的日志文件导出频谱；
- 显示“Power spectral density”，以便将某条曲线与其他曲线比较；
- 点击 `Imp`（Import）按钮，在打开文件对话框中选择多个已导出的曲线日志文件；
- 频谱会显示在同一张图中供分析。

![图示](/img/blackbox/psd_9.jpg)
![图示](/img/blackbox/psd_10.jpg)

可在 User settings 对话框中设置图例宽度和位置。
![图示](/img/blackbox/psd_11.jpg)
