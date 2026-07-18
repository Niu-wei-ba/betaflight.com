# Betaflight 飞行控制器 LED 指示灯

Betaflight 飞行控制器通常配有两个 LED，也可能配有三个，用于指示以下状态。

FC 至少应实现一个活动状态 LED；推荐使用第二个，第三个则为可选。

| LED 编号 | 颜色   | 是否必需 | 功能                                                                                                                                                                                                            |
| :------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0        | 蓝色   | 是       | 启动时闪烁 5 次<br/>解锁时常亮<br/>闪烁表示警告<br/>ESC 直通期间闪烁<br/>USB MSC 活动期间闪烁<br/>串口直通时指示活动状态<br/>串行 4way 时指示接收机活动状态<br/>Spektrum 对频期间闪烁<br/>Hard Fault 状态下闪烁 |
| 1        | 绿色   | 推荐     | 启动时闪烁 5 次<br/>串行 4way 时指示发射端活动状态<br/>Hard Fault 状态下闪烁                                                                                                                                    |
| 2        | 琥珀色 | 否       | 通常常亮<br/>Spektrum 对频期间闪烁<br/>Hard Fault 状态下闪烁                                                                                                                                                    |

错误码的表示方式为：先短暂闪烁 `100 ms`，再按下表次数进行每次 `250 ms` 的闪烁。

| 错误                                 | 闪烁次数 |
| :----------------------------------- | :------- |
| FAILURE_MISSING_ACC                  | 1        |
| FAILURE_ACC_INIT                     | 2        |
| FAILURE_ACC_INCOMPATIBLE             | 3        |
| FAILURE_INVALID_EEPROM_CONTENTS      | 4        |
| FAILURE_CONFIG_STORE_FAILURE         | 5        |
| FAILURE_GYRO_INIT_FAILED             | 6        |
| FAILURE_FLASH_READ_FAILED            | 7        |
| FAILURE_FLASH_WRITE_FAILED           | 8        |
| FAILURE_FLASH_INIT_FAILED            | 9        |
| FAILURE_EXTERNAL_FLASH_READ_FAILED   | 10       |
| FAILURE_EXTERNAL_FLASH_WRITE_FAILED  | 11       |
| FAILURE_EXTERNAL_FLASH_INIT_FAILED   | 12       |
| FAILURE_SDCARD_READ_FAILED           | 13       |
| FAILURE_SDCARD_WRITE_FAILED          | 14       |
| FAILURE_SDCARD_INITIALISATION_FAILED | 15       |
| FAILURE_SDCARD_REQUIRED              | 16       |
