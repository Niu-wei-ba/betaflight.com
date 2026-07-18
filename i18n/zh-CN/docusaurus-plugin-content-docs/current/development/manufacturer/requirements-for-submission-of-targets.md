# 新目标和更新目标的提交要求

从现在开始，对添加新目标或修改现有目标的拉取请求提出以下新要求：

1. 硬件应符合[制造商设计指南](manufacturer-design-guidelines)。不符合要求的硬件设计将不会被视为[Betaflight 支持](betaflight-supported)。为了避免代价高昂的问题和延误，**请在设计过程的早期咨询 Betaflight 开发人员。**

2. 需要将新的制造商添加到[制造商列表](https://github.com/betaflight/config/blob/master/Manufacturers.md)。

3. 对于任何新目标，需要将定义文件提交至[betaflight/config](https://github.com/betaflight/config)。请参阅[说明](https://betaflight.com/docs/development/manufacturer/creating-configuration)了解如何创建配置文件。同时确保您遵守[配置目标指南](config-target-guidance)。

4. 对于现有目标的更改，必须在 [Betaflight Config](https://github.com/betaflight/config) 存储库中更新现有定义配置文件。

5. 批准并合并后，您必须按照[文档指南](fc_documentation/how-to-create-board-documentation)添加[董事会文档](/docs/category/boards)。