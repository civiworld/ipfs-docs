---
title：使用 `window.ipfs`
description：了解如何通过“window.ipfs”在 IPFS Companion 中公开 IPFS API。
---

# 在 IPFS Companion 中使用 `window.ipfs`

了解如何通过“window.ipfs”在 IPFS Companion 中公开 IPFS API。

::: danger

## `window.ipfs` 当前已禁用

IPFS Companion 2.11 已停止注入 `window.ipfs`。根据 [window.ipfs Meta Issue](https://github.com/ipfs-shipyard/ipfs-companion/issues/589#issuecomment-712356448) 上的评论，截至 2020 年 10 月 19 日，它目前已永久禁用，并且 [删除旧版 window.ipfs](https://github.com/ipfs/in-web-browsers/issues/172) 截至 2020 年 12 月 14 日。此页面仅供参考。

<!-- 当 window.ipfs 注入恢复时，以下免责声明将被恢复
### 免责声明

该界面是实验性的，可能会发生变化：有大量 [正在进行的工作](https://github.com/ipfs-shipyard/ipfs-companion/issues/589)。想帮忙塑造它吗？请参阅 [#589](https://github.com/ipfs-shipyard/ipfs-companion/issues/589) 和 [`area/window-ipfs` 标签的问题](https://github.com/ipfs-shipyard/ipfs-companion/labels/area%2Fwindow-ipfs)。
-->
:::

## 背景

IPFS Companion 在每个网页上将 IPFS API 的子集作为 `window.ipfs` 公开。这意味着网站可以检测到 `window.ipfs` 已经存在并使用它，而不是生成自己的 `js-ipfs` 节点，从而节省资源、电池等。

有关更多上下文，请参阅：

- 第一次迭代：[window.ipfs v1](https://github.com/ipfs-shipyard/ipfs-companion/issues/330)
- 第二次迭代（目前正在开发中）：[window.ipfs v2](https://github.com/ipfs-shipyard/ipfs-companion/issues/589)

## 使用 `window.ipfs` 创建应用程序

如果用户安装了 IPFS Companion，则只要第一个脚本在你的网页上运行，`window.ipfs` 就会可用，因此你可以使用简单的 `if` 语句来检测它：

```js
if (window.ipfs && window.ipfs.enable) {
  const ipfs = await window.ipfs.enable({ commands: ['id', 'dag', 'version'] })
  console.log(await ipfs.id())
} else {
  // Fallback
}
```

要添加和获取内容，你可以更新上述示例以执行以下操作：

<!-- TODO: update below example to use async iterators:
https://blog.ipfs.tech/2020-02-01-async-await-refactor/
-->

```js
if (window.ipfs && window.ipfs.enable) {
  try {
    const ipfs = await window.ipfs.enable({ commands: ['add', 'cat'] })
    const [{ hash }] = await ipfs.add(Buffer.from('=^.^='))
    const data = await ipfs.cat(hash)
    console.log(data.toString()) // =^.^=
  } catch (err) {
    if (err.code === 'ERR_IPFS_PROXY_ACCESS_DENIED') {
      // Proxy is present but user denied access.
      // (fallback to js-ipfs or js-ipfs-http-client goes here)
    } else {
      // Something else went wrong (error handling)
      throw err
    }
  }
} else {
  // No IPFS Proxy
  // (fallback to js-ipfs or js-ipfs-http-client goes here)
}
```
::: 提示

使用 [ipfs-provider](https://github.com/ipfs-shipyard/ipfs-provider) 确保你的应用遵循此接口的任何未来更改。当 `window.ipfs` 不可用时，它可以减少实现对 HTTP API 或嵌入式 js-ipfs 的强大回退所需的代码量。

:::

### 错误代码

IPFS 代理返回的错误可以通过 `code` 属性的值来识别。

当当前范围没有请求的命令的访问权限时，会抛出 `ERR_IPFS_PROXY_ACCESS_DENIED`。

可选的 `scope` 和 `permissions` 属性提供详细信息：

- 如果拒绝对特定命令的访问，则 `permissions` 列表存在并包含被阻止的命令的名称
- 如果用户禁用了整个 IPFS 代理，则 `permissions` 列表完全缺失

## 问答

### 什么是 `window.ipfs`？

它是一个 IPFS 代理端点，可让你获取 IPFS API 实例。根据 IPFS Companion 的配置方式，你可能直接与 Companion 中运行的 `js-ipfs` 节点、`js-ipfs-http-client` 上的 `kubo` 守护程序或 `js-ipfs-http-client` 上的 `js-ipfs` 守护程序对话……将来可能还会与其他人对话。请注意，`window.ipfs.enable` 返回的对象不是 `js-ipfs` 或 `js-ipfs-http-client` 的实例，而是其中一个的代理，因此不要指望能够检测到它们中的任何一个或能够使用任何未记录或特定于实例的函数。

有关可用函数的信息，请参阅 [js-ipfs](https://github.com/ipfs/js-ipfs) 和 [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) 文档以了解可用函数。如果你发现缺少某些新功能，则代理可能已过期。请检查 [当前状态](https://github.com/tableflip/ipfs-postmsg-proxy#current-status) 并提交 PR。

### 如果 `window.ipfs` 不可用，我该如何回退？

请参阅 [示例代码](https://github.com/ipfs-shipyard/ipfs-companion/blob/master/examples/window.ipfs-fallback.html) 以获取具有回退功能的 IPFS 实例。

**提示：**使用 [window.ipfs-fallback](https://www.npmjs.com/package/window.ipfs-fallback) 库，它负责处理回退仪式。它将确保你的应用程序遵循 API 更改并且不会在将来中断。

### IPFS 节点配置怎么样？

目前，对 `config` 命令的访问被阻止，你无法对节点的配置方式做出任何假设。例如，用户可能没有启用 PubSub 等实验性功能。

如果你需要非标准配置或任何实验性功能，请生成专用的 js-ipfs 实例。

### 是否有权限控制 (ACL)？

是的。IPFS Companion 用户可以有选择地控制对代理命令的访问，因此如果用户决定拒绝访问，调用可能会被拒绝（或回调）并出现 [错误](#error-codes)。首次调用代理函数时，系统会提示用户允许或拒绝调用，并且系统会记住该决定以供后续调用。如下所示：

![Firefox 中的单一权限对话框](./images/companion-permissions.png =740x463)

### 我是否需要确认每个 API 调用？

[每个范围](#how-are-permissions-scoped) 仅需确认一次命令访问。如果你在通过 `window.ipfs.enable({commands})` 请求 API 实例时提供命令列表，则将向用户显示单个权限对话框：

![Firefox 中的批量权限对话框](./images/companion-permissions-bulk.png =740x460)

对于其他所有情况，只有第一次调用需要用户做出决定。你将能够调用之前列入白名单的 IPFS 命令，并且第二次将不会提示用户允许/拒绝访问。

请注意，用户可以在事后修改他们的权限决定，因此你不应期望总是允许调用之前成功调用的命令。

### 我可以禁用此功能吗？

用户可以通过禁用 `window.ipfs` 实验 IPFS Companion 的首选项来永久拒绝访问所有 IPFS 命令。

### 权限范围如何？

权限范围为请求权限的文件的 **来源和路径**（以及子路径）。

`window.ipfs` 中的范围权限的工作方式与它们在 [服务工作者注册](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Examples) 中的工作方式类似，不同之处在于用户无法控制范围，并且它设置为请求权限的来源和路径。

基于范围的权限允许在 IPFS 网关上运行的应用程序被授予不同的权限。考虑在 ipfs.io 网关上运行的以下两个网站：

- [QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4](https://ipfs.io/ipfs/QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4/)
- [QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV](https://ipfs.io/ipfs/QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV/)

使用 [同源策略](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)，这两个应用程序将被授予相同的权限。使用范围权限，这两个应用程序将被授予一组不同的权限。例如：

- Allow `files.add` to `https://domain.com/`
  - ...will allow `files.add` to:
    - `https://domain.com/file`
    - `https://domain.com/file2.html`
    - `https://domain.com/sub/paths`
    - `https://domain.com/sub/paths/files`
    - etc.
- Allow `files.add` to `https://domain.com/feature`
  - ...will allow `files.add` to:
    - `https://domain.com/feature/file`
    - `https://domain.com/feature/file2.html`
    - `https://domain.com/feature/sub/paths`
    - `https://domain.com/feature/sub/paths/files`
    - `https://domain.com/featuresearch/sub/paths/files` (note substring)
    - `https://domain.com/features.html` (note substring)
    - etc.
  - ...will cause additional prompt for `files.add` to:
    - `https://domain.com/`
    - `https://domain.com/files`
    - etc.

### 可变文件系统 (MFS) 文件是否被沙盒化到目录中？

是的。为了避免冲突，每个应用都有自己的 MFS 目录，用于存储文件。使用 MFS 命令（[更多信息](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system)）时，此目录将自动添加到你传递的路径中。你应用的 MFS 目录基于你的应用运行的**来源和路径**。例如：

- `files.write` to `/myfile.txt` on `https://domain.com/`
  - writes to `/dapps/https/domain.com/myfile.txt`
- `files.write` to `/path/to/myfile.txt` on `https://domain.com/feature`
  - writes to `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.read` from `/feature/path/to/myfile.txt` on `https://domain.com/`
  - reads from `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.stat` to `/` on `https://domain.com/feature`
  - stats `/dapps/https/domain.com/feature`
- `files.read` from `/../myfile.txt` on `https://domain.com/feature`
  - reads from `/dapps/https/domain.com/feature/myfile.txt` (no traverse above your app's root)
