---
title: Kubo
description: 通过命令行使用 IPFS Kubo 可以让你执行 IPFS Desktop 可以执行的所有操作，但可以更精细地执行，因为你可以指定要运行的命令。在此处了解如何安装。
current-ipfs-version: v0.30.0
---

# 安装 IPFS Kubo

本指南介绍了 IPFS Kubo 的可用安装过程，IPFS Kubo 是基于 Go 的星际文件系统 (IPFS) 协议实现。Kubo 是 IPFS 的第一个实现，也是当今使用最广泛的实现。Kubo 允许你执行 IPFS Desktop 可以执行的所有操作，但更精细，因为你可以指定要运行哪些命令。Kubo 具有以下特点：

- IPFS 守护进程服务器
- 广泛的命令行工具
- 用于控制节点的 HTTP RPC API
- 用于向 HTTP 浏览器提供内容的 HTTP 网关
- 适用于 Windows、MacOS、Linux、FreeBSD 和 OpenBSD 的二进制文件

在命令行中安装 Kubo 对于许多用例来说都很方便，例如在 IPFS 节点之上构建应用程序和服务，或者设置没有用户界面的节点（远程服务器或虚拟机通常是这种情况）。

首先，请熟悉系统要求。然后，确定是否要使用 5 个官方二进制发行版之一安装 Kubo，或从源代码构建 Kubo。安装 Kubo 后，确定要在命令行中使用哪个节点。最后，查看后续步骤。

:::warning
仅当你在资源严重受限的系统上运行 Kubo 或为 Kubo 项目做出贡献时，才建议从源代码构建。
:::

## 系统要求

Kubo 可在大多数满足以下要求的 Windows、MacOS、Linux、FreeBSD 和 OpenBSD 系统上运行：

- 6 GiB 内存。
- 2 个 CPU 核心（kubo 高度并行）。

请注意以下几点：
- IPFS 安装使用的磁盘空间量取决于你共享的数据量。基本安装使用大约 12MB 的磁盘空间。
- 你可以通过 [--enable-gc](../reference/kubo/cli.md#ipfs-daemon) 启用自动垃圾收集，并使用 [默认最大磁盘存储](https://github.com/ipfs/kubo/blob/v0.30.0/docs/config.md#datastorestoragemax) 调整从其他对等点检索的数据。


<!-- TODO: hide this footgun until https://github.com/ipfs/kubo/pull/10524 is merged and released in stable kubo 
### Kubo on resource-constrained systems 

If you are running Kubo on a resource-constrained system (such as a Raspberry Pi), you should initialize your daemon with the `lowpower` profile. 
  
  ```bash
  ipfs init --profile=lowpower
  ```

This reduces daemon overhead on the system but may degrade content discovery and data fetching performance.

-->

## 安装官方二进制发行版

本节介绍如何在 Windows、MacOS、Linux、FreeBSD 和 OpenBSD 操作系统上从“dist.ipfs.tech”下载并安装 Kubo 二进制文件。IPFS 团队在 [dist.ipfs.tech 网站](https://dist.ipfs.tech#kubo) 上发布了最新的官方预构建 Kubo 二进制文件。新的 IPFS Kubo 二进制版本会自动显示在“dist.ipfs.tech”上的 Kubo 页面上。

:::callout
如果你无法访问 [dist.ipfs.tech](https://dist.ipfs.tech#kubo)，你也可以从项目的 GitHub [releases](https://github.com/ipfs/kubo/releases/latest) 页面或 [dweb.link](https://dweb.link/ipns/dist.ipfs.tech#kubo) 网关上的 `/ipns/dist.ipfs.tech` 下载 Kubo (go-ipfs)。
:::

二进制文件适用于以下操作系统：

| OS      | 32-bit | 64-bit | ARM | ARM-64 |
|---------|--------|--------|-----|--------|
| macOS   | No     | Yes    | No  | Yes    |
| FreeBSD | Yes    | Yes    | Yes | No     |
| Linux   | Yes    | Yes    | Yes | Yes    |
| OpenBSD | Yes    | Yes    | Yes | No     |
| Windows | Yes    | Yes    | No  | No     |

有关你的操作系统的安装说明，请选择适当的选项卡。

:::: tabs

::: tab windows id="install-kubo-windows"

### Windows

1. 从 [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) 下载 Windows 二进制文件。

   ```powershell
   wget https://dist.ipfs.tech/kubo/v0.30.0/kubo_v0.30.0_windows-amd64.zip -Outfile kubo_v0.30.0.zip
   ```

1. 将文件解压到合理位置，例如`~\Apps\kubo_v0.30.0`。

   ```powershell
   Expand-Archive -Path kubo_v0.30.0.zip -DestinationPath ~\Apps\kubo_v0.30.0
   ```

2. 进入`kubo_v0.30.0`文件夹

   ```powershell
   cd ~\Apps\kubo_v0.30.0\kubo
   ```

3. 检查`ipfs.exe`是否正常工作：

   ```powershell
   .\ipfs.exe --version

   > ipfs version 0.30.0
   ```

   此时，Kubo 即可使用。但是，强烈建议你首先按照以下步骤将`ipfs.exe`添加到`PATH`中：

1. 将当前工作目录保存到临时变量中：

   ```powershell
   $GO_IPFS_LOCATION = pwd
   ```

1. 创建 PowerShell 配置文件：

   ```powershell
   if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
   ```

   此命令首先检查你是否已设置配置文件。如果已设置，则保留配置文件，不会创建新配置文件。你可以在编辑器（如记事本）中打开配置文件来查看其内容：

   ```powershell
   notepad $PROFILE
   ```

1. 添加你的 Kubo 守护程序的位置，并通过将其截断至 PowerShell 配置文件的末尾将其添加到 PowerShell 的`PATH`中：

   ```powershell
   Add-Content $PROFILE "`n[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;$GO_IPFS_LOCATION')"
   ```

1. 加载你的 `$PROFILE`：

   ```powershell
   & $profile   
   ```

1. 导航到你的主文件夹

   ```powershell
   cd ~
   ```

1. 测试 Kubo 是否正确安装：

   ```powershell
   ipfs --version

   > ipfs version 0.30.0
   ```

:::

::: tab macOS id="install-kubo-mac"

### macOS

> The `brew` installation method supports both Intel and Apple Silicon hardware. If you prefer a manual installation, `darwin-amd64` (Intel) and `darwin-arm64` (Apple Silicon) artifacts available [here](https://dist.ipfs.tech/kubo/v0.21.0/).

1. 打开终端。

1. 使用 `brew` 安装 Kubo：

   ```shell
   brew install ipfs
   ```

1. 确认你的 Kubo 安装：

   ```bash
   ipfs --version
   ```

   如果安装了 Kubo，则会显示版本号。例如：

   ```bash
   > ipfs version 0.30.0
   ```
:::

::: tab linux id="install-kubo-linux"

### Linux

1. 从 [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) 下载 Linux 二进制文件。

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.30.0/kubo_v0.30.0_linux-amd64.tar.gz
   ```

1. 解压缩文件：

   ```bash
   tar -xvzf kubo_v0.30.0_linux-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. 进入`kubo`文件夹：

   ```bash
   cd kubo
   ```

1. 运行安装脚本

   ```bash
   sudo bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. 测试 Kubo 是否已正确安装：

   ```bash
   ipfs --version

   > ipfs version 0.30.0
   ```

:::

::: tab freeBSD id="install-kubo-freeBSD"

### FreeBSD

1. 从 [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) 下载 FreeBSD 二进制文件。

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.30.0/kubo_v0.30.0_freebsd-amd64.tar.gz
   ```

1. 解压缩文件：

   ```bash
   tar -xvzf kubo_v0.30.0_freebsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. 进入`kubo`文件夹：

   ```bash
   cd kubo
   ```

1. 运行安装脚本：

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. 测试 Kubo 是否已正确安装：

   ```bash
   ipfs --version

   > ipfs version 0.30.0
   ```

:::

::: tab openBSD id="install-kubo-openBSD"

### OpenBSD

1. 从 [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) 下载 OpenBSD 二进制文件。

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.30.0/kubo_v0.30.0_openbsd-amd64.tar.gz
   ```

1. 解压缩文件：

   ```bash
   tar -xvzf kubo_v0.30.0_openbsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. 进入`kubo`文件夹：

   ```bash
   cd kubo
   ```

1. 运行安装脚本：

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. 测试 Kubo 是否已正确安装：

   ```bash
   ipfs --version

   > ipfs version 0.30.0
   ```

:::

::::


## 从源代码构建 Kubo

有关如何从源代码手动下载、编译和构建 Kubo 的最新说明，请参阅 Kubo 存储库中的 [从源代码构建](https://github.com/ipfs/kubo/blob/v0.30.0/README.md#build-from-source) 部分。

## 使用命令行确定要使用的节点

命令行可以检测并使用任何正在运行的节点，除非将其配置为使用外部二进制文件。以下是用于本地守护程序或远程客户端的节点：

### 本地守护进程

本地守护进程在 CLI 中通过命令 `ipfs daemon` 自动启动。它会创建一个带有 [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) 地址的 `$IPFS_PATH/api` 文件。

### 远程客户端

你可以独立安装独立的 IPFS CLI 客户端，并使用它来与 IPFS Desktop 节点或 Brave 节点通信。使用 [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) 与 `ipfs` 守护进程通信。

当 IPFS 命令不带参数执行时，CLI 客户端会检查 `$IPFS_PATH/api` 文件是否存在并连接到其中列出的地址。

- 如果 `$IPFS_PATH` 位于默认位置（例如，Linux 上的 `~/.ipfs`），则它会自动运行，并且 IPFS CLI 客户端无需任何额外配置即可与本地运行的 `ipfs` 守护进程通信。

- 如果 `$IPFS_PATH` 不在默认位置，请使用 `--api <rpc-api-addr>` 命令行参数。或者，你可以将环境变量设置为 `IPFS_PATH`。`IPFS_PATH` 将指向一个目录，其中 `$IPFS_PATH/api` 文件指向现有 `ipfs` 守护进程实例的 Kubo RPC。

#### 最常见的例子

如果你是 IPFS Desktop 用户，你可以安装 CLI 工具，然后会自动获取 `.ipfs/api` 文件。

如果你没有运行 IPFS Desktop，请在 CLI 中使用 `ipfs --api /ip4/127.0.0.1/tcp/<port> id` 指定自定义端口。

例如，Brave RPC API 在端口 45001 上运行，因此 CLI 可以使用 `ipfs --api /ip4/127.0.0.1/tcp/45001 id` 与 Brave 守护进程通信。你可以使用 `mkdir -p ~/.ipfs && echo "/ip4/<ip>/tcp/<rpc-port>" > ~/.ipfs/api` 来避免每次都传递 `--api`。

## 下一步

现在你已经安装了 IPFS Kubo：

- 查看 [指南中的 IPFS Kubo 教程](../how-to/command-line-quick-start.md)，它将指导你将 Kubo 节点联机并与网络交互。
- 了解如何使用 [ipfs-update](../how-to/ipfs-updater.md) 快速安装、卸载、升级和降级 Kubo。