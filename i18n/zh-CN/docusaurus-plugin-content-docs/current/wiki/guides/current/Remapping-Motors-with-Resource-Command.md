# 使用 Resource 命令重映射电机

有时需要交换、移动或旋转电机位置。v3.1 前，要么在 FC 与 ESC 之间使用较长导线来保留原映射（会使装机杂乱），要么使用自定义混控改变每台电机参与姿态校正的方式。

从 3.1 起，可使用 `resource` CLI 命令方便地修改电机映射。命令说明见 [Betaflight Resource 映射](Resource-remapping)。

#### 视频

Joshua Bardwell：[Resource Remapping - No more Custom Motor Mixer](https://www.youtube.com/watch?v=z5aO-3_n-Hs)

Project Blue Falcon：[Find Bad ESC output Pin and Remap Motors](https://www.youtube.com/watch?v=cEMfs_4X2VM)

Blue Falcon：[Remap Motors In Betaflight (damaged pins fix)](https://www.youtube.com/watch?v=cEMfs_4X2VM&feature=youtu.be&t=159)

### 示例

以下以最常见的“旋转 FC 或 PDB”为例。

假设板卡上的电机编号如下：

```
     FRONT
4            2

3            1
     BACK
```

若需要将板卡顺时针旋转 `90°`，则旋转后的编号为：

```
     FRONT
3            4

1            2
     BACK
```

可按以下步骤修复。

1. 记录当前电机映射。

   输入 `resource list`，查找原始映射：

   ```
   # resource list
   ...
   A06: MOTOR 1
   A07: MOTOR 2
   A11: MOTOR 3
   A12: MOTOR 4
   ...
   ```

2. 画出原始的“引脚到电机”映射图：

   ```
          FRONT
   4(A12)       2(A7)

   3(A11)       1(A6)
          BACK
   ```

3. 将该图顺时针旋转 `90°`：

   ```
          FRONT
   3(A11)       4(A12)

   1(A6)        2(A7)
          BACK
   ```

4. 移除旧的电机位置标签：

   ```
          FRONT
   A11            A12

   A6             A7
          BACK
   ```

   这就是 MCU 引脚的实际位置。

5. 将新的电机位置标签分配给 MCU 引脚：

   ```
          FRONT
   4(A11)       2(A12)

   3(A6)        1(A7)
          BACK
   ```

   这就是新的映射。

6. 对应的 CLI `resource` 命令：

   ```
   resource motor 1 a7
   resource motor 2 a12
   resource motor 3 a6
   resource motor 4 a11
   save
   ```

输入这些命令时，可能出现 `* ERROR * X also used by MOTOR Y` 形式的错误。映射重叠只是过渡状态，完成全部命令后会得到干净映射。若不想看到这些报错，可在设置新映射前先清除旧映射：

```
resource motor 1 none
resource motor 2 none
resource motor 3 none
resource motor 4 none
```

这仅为示例。请根据自己的实际情况完成映射，**飞行前务必验证电机顺序和方向**。
