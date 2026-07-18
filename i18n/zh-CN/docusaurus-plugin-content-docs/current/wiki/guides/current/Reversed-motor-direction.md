# 使用反向电机方向

### 前后外转

本页说明常见的“外转”电机方向：前左逆时针、前右顺时针，与传统内转相反。

```text
      ^    ^
     4|    |2
       \   /
         x
    ^  /   \ ^
    |3      1|
```

从 Betaflight 3.2 起，使用：

```text
set YAW_MOTORS_REVERSED=ON
```

旧版 Betaflight 使用：

```text
set YAW_MOTOR_DIRECTION=-1
```

注意：这些设置**不会**改变电机实际转向；它们只会告知 Betaflight 电机方向已反转，以便正确控制偏航。实际转向需在 BLHeli 中设置或通过交换电机线改变。
