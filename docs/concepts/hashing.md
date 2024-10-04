---
title: Hashing
description: 了解加密哈希以及它们对于 IPFS（星际文件系统）的工作至关重要的原因。
sidebarDepth: 0
---

# Hashing

加密哈希函数是接受任意输入并返回固定长度值的函数。具体值取决于所使用的哈希算法，例如 [SHA-1](https://en.wikipedia.org/wiki/SHA-1)（由 git 使用）、[SHA-256](https://en.wikipedia.org/wiki/SHA-2) 或 [BLAKE2](<https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2>)，但给定的哈希算法对于给定的输入始终返回相同的值。有关更多信息，请查看 Wikipedia 的 [哈希函数完整列表](https://en.wikipedia.org/wiki/List_of_hash_functions)。

例如，输入：

```
Hello world
```

将用 **SHA-1** 表示为：

```
0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E
```

然而，完全相同的输入使用**SHA-256**会生成以下输出：

```
0x64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C
```

请注意，第二个哈希比第一个哈希长。这是因为 SHA-1 创建 160 位哈希，而 SHA-256 创建 256 位哈希。前缀`0x`表示以下哈希以十六进制数表示。

哈希可以用不同的基数表示（`base2`、`base16`、`base32` 等）。事实上，IPFS 将其用作其 [内容标识符](content-addressing.md) 的一部分，并使用 [Multibase](https://github.com/multiformats/multibase) 协议同时支持多种基数表示。

例如，上面的“Hello world”的 SHA-256 哈希值可以以 32 为基数表示为：

```
mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a
```
::: tip
如果您对加密哈希如何融入 IPFS 处理文件的方式感兴趣，请查看 IPFS Camp 2019 的这段视频！[核心课程：IPFS 如何处理文件](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

## 重要的哈希特征

加密哈希具有几个重要特征：

- **确定性** - 相同的输入消息始终返回完全相同的输出哈希值
- **不相关** - 消息中的微小变化应生成完全不同的哈希值
- **唯一** - 从两个不同的消息生成相同的哈希值是不可行的
- **单向** - 无法根据哈希值猜测或计算输入消息

这些功能还意味着我们可以使用加密哈希来识别任何数据：哈希对于我们计算的数据是唯一的，并且它不太长，因此在网络上发送它不会占用大量资源。哈希是固定长度的，因此 1 GB 视频文件的 SHA-256 哈希仍然只有 32 个字节。

这对于像 IPFS 这样的分布式系统至关重要，因为我们希望能够在多个地方存储和检索数据。运行 IPFS 的计算机可以询问与其连接的所有对等方是否拥有具有特定哈希的文件，如果其中一个对等方拥有，则它们会发回整个文件。如果没有像加密哈希这样的简短、唯一的标识符，[内容寻址](content-addressing.md) 就不可能实现。