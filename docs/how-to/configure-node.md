---
title：配置节点
description：可以使用配置文件自定义 IPFS 节点。默认值应该适用于大多数用例。但是，如果你正在运行专门的 IPFS 节点，或者只是想根据自己的喜好进行调整，则可能需要进行一些更改。
---

# 配置节点

节点配置因实现而异。

- 对于 Kubo，请参阅 [config.md](https://github.com/ipfs/kubo/blob/master/docs/config.md)。
- 对于 Helia，请参阅 [HeliaInit](https://ipfs.github.io/helia/interfaces/helia.HeliaInit.html) 文档。请注意，与已弃用的 js-ipfs 实现不同，你必须直接配置节点 - 请参阅 [Helia 示例](https://github.com/ipfs/helia/wiki/Migrating-from-js-IPFS#config)。