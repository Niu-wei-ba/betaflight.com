# 构建DFU_Flash

先决条件：python3、python3-intelhex

### 通过 dfu-util 进行制作和刷新：

对于 Betaflight 4.5 及更高版本，请使用命令语法：

```
make CONFIG=TARGETNAME dfu_flash
```

其中 `TARGETNAME` 是指定的有效飞控目标。

示例：

```
make CONFIG=MATEKF405AIO dfu_flash
```