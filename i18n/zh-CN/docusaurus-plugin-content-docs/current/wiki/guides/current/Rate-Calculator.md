# 速率计算器

Betaflight 支持不同的速率模型。速率模型是将摇杆位置转换为角速度（deg/s）的数学方法。`RCRate`、`Rate` 和 `Expo` 三个参数决定速率模型曲线。

通常，该数学曲线会降低摇杆中心附近的灵敏度，并提高较大行程处的灵敏度。

飞手可根据飞行风格调整速率。一般而言：

- 竞速飞手偏好更线性的曲线，最大角速度约为 `550` 至 `650 deg/s`；
- 自由式通常使用柔和的中心区域和较高最大角速度的组合（`850` 至 `1200 deg/s`）；
- 影视飞行采用较平缓的中心区域会更顺滑。

适应速率变化需要时间，请勿操之过急。

Betaflight 支持 Actual、Quick、Betaflight、Raceflight 和 Kiss 模型。

[Metamarc 的速率转换器](https://rates.metamarc.com)可能是目前最好的转换器和可视化工具，支持 Betaflight 当前提供的全部速率模型。

## Actual Rates

由 @ctzsnooze 提出的“Actual”速率于 4.2 引入，并在 4.3 成为 Betaflight 默认速率。旧版“Betaflight”速率模型仍受支持。在 Actual 速率中，可直接以 deg/s 输入中心灵敏度和最大速率。Expo 设置只会移动曲线的拐点，不影响中心速率或最大速率；各参数彼此完全独立。

可通过以下图表工具比较 Actual 与 Betaflight 速率：

- [metamarc.com](https://rates.metamarc.com) - 可能是最佳选择；
- [ctzsnooze on Desmos](https://www.desmos.com/calculator/r5pkxlxhtb)（包含完整数学公式，但较难使用）；
- [kmitchel](https://kmitchel.github.io/)（似乎已失效）。

有关 Actual 速率的更多信息：

- [4.2 调校说明](/docs/wiki/tuning/4-2-Tuning-Notes#new-rates-modes)
- [GitHub PR 9495](https://github.com/betaflight/betaflight/pull/9495)
- [GitHub PR 9506](https://github.com/betaflight/betaflight/pull/9506)

## Quick Rates

由 @illusionfpv 提出的 Quick Rates 可将中心灵敏度设为独立值；`Expo` 与 `Rate` 会相互作用，以决定 Expo 曲线特性及最大角速度。

可通过以下工具在 Betaflight 和 Quick Rates 间转换：

- [illusionfpv.github.io](https://illusionfpv.github.io/)

## Betaflight、Kiss 和 Raceflight

对于 Betaflight、Kiss 和 Raceflight 速率模型，修改模型中的任意一个参数，都会改变最大速率和中心灵敏度。

要查看这些速率系统的差异，并可视化中心灵敏度和最大速率，可使用以下工具：

- [metamarc.com](https://rates.metamarc.com)（再次推荐，因为它确实最好）；
- RotorPirates [RaceFlight/Betaflight/KISS 速率查看器](https://apocolipse.github.io/RotorPirates/)（转换器不可用）；
- [erikspen 的 Betaflight 曲线和速率查看器](https://erikspen.github.io/betaflightratestuner)。

## FlightOne

- [FlightOne 到 Betaflight 的数值速率转换器](https://flightone.com/rates/)

## 速率列表

- [microraptor 的 gist 页面](https://gist.github.com/microraptor/52f01490f1c7aa86d91e8710556f123b)列出了截至 2021 年夏季部分飞手及特定应用所使用的速率类型和值。
