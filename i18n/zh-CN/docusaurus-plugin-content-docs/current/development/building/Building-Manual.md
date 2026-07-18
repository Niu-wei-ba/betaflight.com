# 构建 PDF 手册

手动 PDF 文件是通过连接相关 Markdown 文件并使用 Gimli 转换结果来生成最终的 PDF 文件。此步骤由位于 Makefile 旁边的存储库根目录中的 `build_docs.sh` 脚本自动处理。

## 要求和安装

PDF手册生成使用Gimli进行转换。它可以通过 ruby​​ gems 安装。在基于 Debian 的系统上，安装步骤如下：

```bash
    sudo apt-get install ruby1.9.1 ruby1.9.1-dev rubygems zlib1g-dev wkhtmltopdf libxml2-dev libxslt-dev
    sudo gem1.9.1 install gimli
```

## 配置

所有markdown文件都需要通过修改`doc_files`变量/数组来单独注册到`build_manual.sh`文件中：

```bash
doc_files=( 'Configuration.md'
	'Board - CC3D.md'
	'...'
	'...'
)
```