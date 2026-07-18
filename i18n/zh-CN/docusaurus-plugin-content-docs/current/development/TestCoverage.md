# 测试覆盖率分析

有多种方法可以分析测试覆盖率并生成各种报告。许多来源都有可用的指南，可以在维基百科上找到详细的概述和更多信息的链接集：

https://en.wikipedia.org/wiki/Gcov

例如，可以使用以下命令制作单个测试的简单报告：

```
gcov -s src/main/sensors -o obj/test/ battery_unittest.cc
```

要生成可供 Jenkins 中的 Cobertura 插件使用的 XML 格式的覆盖率报告，需要安装来自 github 的名为“gcovr”的 Python 脚本：

https://github.com/gcovr/gcovr/tree/dev

Jenkins 中的用法示例：

```
/gcovr-install-path/gcovr/scripts/gcovr obj/test --root=src/main -x > coverage.xml
```

还有许多其他方法可以生成其他格式的测试覆盖率报告，例如 html 等。