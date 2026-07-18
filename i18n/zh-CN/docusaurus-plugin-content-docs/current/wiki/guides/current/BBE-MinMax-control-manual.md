# Blackbox Explorer MinMax 控制

MinMax 控制可快速、完整地调整曲线的缩放和位置。当前 MinMax 曲线设置显示在“Configure graphs”对话框的“Minimum”和“Maximum”列中。
![图示](/img/blackbox/min-max_1.jpg)

可通过以下方式修改 MinMax 值：

- 在“Configure graphs”对话框中直接编辑表格单元格；可手动输入，也可在数值字段双击鼠标恢复默认值。
- 使用上下文菜单。

要打开上下文菜单，请在需要编辑的 Minimum 或 Maximum 数值字段上单击鼠标右键。

主上下文菜单：
![图示](/img/blackbox/min-max_2.jpg)

## 主菜单

主菜单包含：

1. 编辑全部曲线的操作；
2. 编辑通过右键选中的[单条曲线](#单条曲线子菜单)的操作（图中示例为“Gyro pitch”）；
3. [扩展模式](#扩展模式)。

## 操作

- `Like this one`：将右键选中曲线（例如“Gyro pitch”）的 MinMax 值应用于全部曲线。
- `Full range`：根据整个飞行时段的日志数据设置全部曲线的 MinMax 值。
- `One scale`：将全部曲线设为同一比例。
- `Centered`：使曲线以 X 轴为中心。
- `Zoom in`、`Zoom out`：缩放全部曲线。
- `Default`：将全部曲线的 MinMax 值恢复默认。

## 单条曲线子菜单

单条曲线子菜单包含相同操作：
![图示](/img/blackbox/min-max_3.jpg)

## 单条曲线的上下文菜单

若在单条曲线图表上打开上下文菜单，会显示简化菜单：
![图示](/img/blackbox/min-max_4.jpg)

## 扩展模式

主菜单提供扩展模式。按住 `Shift` 键激活后，选择所需子菜单。
![图示](/img/blackbox/min-max_5.jpg)

### `Like this one` 扩展子菜单

可修改 MinMax 值，并通过复选框选择需要应用这些值的曲线。单击 `SET MIN-MAX VALUES` 应用。单击 `Back` 返回主菜单，或单击 `Close` 关闭菜单。单击主“Configure graphs”对话框中的 `Apply change` 或 `Cancel`，可立即关闭菜单和对话框。
![图示](/img/blackbox/min-max_6.jpg)

### `Full range` 扩展子菜单

通过复选框选择需要应用数值的曲线：

- `At all global log time`：根据整个日志时段的数据设置 MinMax；
- `At local window time`：根据图表窗口当前时间区间设置 MinMax；
- `At marker time range`：根据使用 `I`、`O` 键选择的标记时间区间设置 MinMax；若未选择，则应用整个日志时段。

单击 `Back` 返回主菜单，或单击 `Close` 关闭菜单。单击主“Configure graphs”对话框中的 `Apply change` 或 `Cancel`，可立即关闭菜单和对话框。
![图示](/img/blackbox/min-max_7.jpg)

### `One scale` 扩展子菜单

通过复选框选择需设为相同缩放比例的曲线，单击 `SET CURVES TO SAME SCALE` 应用。`Back`、`Close`、`Apply change` 和 `Cancel` 的作用同上。
![图示](/img/blackbox/min-max_8.jpg)

### `Centered` 扩展子菜单

通过复选框选择需居中的曲线，单击 `SET CURVES TO ZERO OFFSET` 应用。`Back`、`Close`、`Apply change` 和 `Cancel` 的作用同上。
![图示](/img/blackbox/min-max_9.jpg)

### `Zoom in`、`Zoom out` 扩展子菜单

设置缩放百分比，并通过复选框选择需缩放的曲线。单击 `ZOOM IN` 或 `ZOOM OUT` 应用。`Back`、`Close`、`Apply change` 和 `Cancel` 的作用同上。
![图示](/img/blackbox/min-max_10.jpg)

### `Default` 扩展子菜单

通过复选框选择需恢复默认值的曲线，单击 `SET CURVES TO DEFAULT` 应用。`Back`、`Close`、`Apply change` 和 `Cancel` 的作用同上。
![图示](/img/blackbox/min-max_11.jpg)

### 单条曲线的 `Full range` 扩展项

该项与 `Full range` 扩展子菜单相同，但只作用于当前选中的一条曲线。
![图示](/img/blackbox/min-max_12.jpg)

## MinMax 控制使用示例

1. 若已知需要的曲线 MinMax 值，可直接在 MinMax 输入字段中设置；然后打开主菜单，使用 `Like this one` 将该设置应用到全部曲线。也可使用扩展 `Like this one` 子菜单，为所选曲线设置不同 MinMax。
2. 可使用 `Full range` 主菜单项或扩展子菜单，自动为选定时间范围设置 MinMax；随后使用 `Centered` 和 `One scale` 自动整理显示数值。

下图中，Gyro 和 Setpoint 采用同一满量程比例，PID 值使用另一套满量程比例；所有曲线均居中。
![图示](/img/blackbox/min-max_13.jpg)

## 在工作区中使用 MinMax 值

曲线的 MinMax 设置会保存到工作区。
![图示](/img/blackbox/min-max_14.jpg)

Blackbox Explorer 内置两个预装工作区。按 `Shift+W` 可从菜单选择。
![图示](/img/blackbox/min-max_15.jpg)
