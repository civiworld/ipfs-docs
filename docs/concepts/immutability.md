---
title: Immutability
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/386
description: Learn about the concept of data immutability and how it's critical to how IPFS works.
related:
  'IPFS Docs: Content addressing and CIDs': /concepts/content-addressing/
  'Video: How IPFS deals with files (IPFS Camp 2019)': https://www.youtube.com/watch?v=Z5zNPwMDYGg
  'Tutorial: How IPFS deals with files (IPFS Camp 2019)': https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A
  'Wikipedia: Content-addressable storage': https://en.wikipedia.org/wiki/Content-addressable_storage
---

# 不变性

不可变对象是一旦创建就无法更改或修改其状态的对象。将文件添加到 IPFS 网络后，如果不更改文件的 [内容标识符 (CID)](../concepts/content-addressing.md)，则无法更改该文件的内容。此功能非常适合存储不需要更改的数据。但是，当涉及到需要更改或更新的内容时，不变性就会成为一个问题。本页讨论了如何保持由不可变构建块构建的可变状态。

CID 是指向内容的绝对指针。无论我们何时请求 CID，CID 值都将始终相同。这是内容架构的一部分，无法更改。要在可变系统中管理不可变文件，我们需要在 CID 之上添加另一层。

作为一个基本示例，我们将两个内容块中的字符串`hello` 和`world`散列到两个叶节点中，其 CID 分别为 `A` 和 `B`。如果我们连接这两个节点，那么我们将得到 CID `C`。在这个根 CID 之上，我们分配一个指针“Pointer”。

```shell
   +-----------+
   |  Pointer  |
   +-----------+
         ↓
      +-----+
   +--|  C  |-+
   |  +-----+ |
   |          |
+-----+    +-----+
|  A  |    |  B  |
+-----+    +-----+
"hello"    "world"
```

如果我们将`B`的内容更改为`IPFS!`，则所有上游路径也会发生变化。在这个简单的示例中，唯一的上游路径是`C`。如果我们从指针请求内容，我们会得到新内容，因为指针现在指向完全不同的节点。节点`B`未被编辑、更新或以其他方式更改。相反，我们正在创建一个新的 DAG，其中指针指向连接节点`A`和新节点`D`的 CID `E`。

```shell
   +-----------+
   |  Pointer  | --------------+
   +-----------+               |
                               ↓
      +-----+               +-----+
   +--|  C  |-+         +-- |  E  | --+
   |  +-----+ |         |   +-----+   |
   |          |         |             |
+-----+    +-----+     +-----+    +-----+
|  A  |    |  B  |     |  A  |    |  D  |
+-----+    +-----+     +-----+    +-----+
"hello"    "world"     "hello"    "IPFS!"
```

同样，节点 `B` 不会改变。它将始终引用相同的内容`world`。节点`A`也出现在新的 DAG 中。这并不一定意味着我们将包含`hello`字符串的内存/缓冲区复制到我们的新消息中；这意味着位置寻址范式关注的是`哪里`而不是`什么`。在内容寻址系统中，任何时候有人写字符串`hello`，它总是有 CID `A`，无论我们是从以前的位置复制字符串还是从头开始编写它。

## 例子

在此示例中，我们有一个网站，显示两个标题，分别称为`header_1`和`header_2`。标题的内容由变量`string_1`和`string_2`提供。

```html
<body>
  <h1 id="header_1"></h1>
  <h1 id="header_2"></h1>
</body>
<script>
  let string_1 = 'hello'
  let string_2 = 'world'
  document.getElementById('header_1').textContent = string_1
  document.getElementById('header_2').textContent = string_2
</script>
```

该网站的 CID 为 `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`。用户可以前往 [`example.com/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`](https://gateway.pinata.cloud/ipfs/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP) 查看该网站。如果我们将 `string_2` 更改为 `IPFS`，则该网站的 CID 更改为 `Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`。现在用户可以访问 [`example.com/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`](https://gateway.pinata.cloud/ipfs/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5)。

让用户使用 CID 访问网站很麻烦，因为每次更新变量时 CID 都会发生变化。因此，我们可以使用一个指针来维护最新更新页面的 CID。这样，用户可以访问`example.com`，并始终被引导到最新内容。此指针是可变的；可以对其进行更新以反映下游的更改。

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer | ---> | QmWLd... |
+--------+      +---------+      +----------+
```

在网站示例中，当我们更改变量时，网页的 CID 会有所不同。必须更新指针以将用户重定向到最新网页。重要的是旧 CID 仍然存在。没有任何内容被覆盖。原始 CID `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`将始终引用带有标题`hello`和`world`的网页。我们正在做的是构建一个新的 [DAG](../concepts/merkle-dag.md)。

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer |      | QmWLd... |
+--------+      +---------+      +----------+
                     |
                     |           +----------+
                     + --------> | Qme1A... |
                                 +----------+
```

此过程本质上就是 [InterPlantery 命名服务 (IPNS)](../concepts/ipns.md) 所做的！CID 可能难以处理且难以记住，因此 IPNS 可让用户免于直接处理 CID 的繁琐任务。更重要的是，CID 会随内容而变化，因为它们就是内容。而 URL/指针的入站引用保持不变，出站引用会发生变化：

```shell
+--------+      +----------------+      +-------------------------------------------------------------+
|  User  | ---> | docs.ipfs.tech | ---> | bafybeigsddxhokzs3swgx6mss5i3gm6jqzv5b45e2xybqg7dr3jmsykrku |
+--------+      +----------------+      +-------------------------------------------------------------+
```
