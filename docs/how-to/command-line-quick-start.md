---
title：初始化 Kubo 节点并与 IPFS 网络交互
description：初始化 Kubo 节点存储库，使你的节点在线，与 IPFS 网络交互，并使用 IPFS Desktop 查看本地节点上的 Web 控制台
---

# 初始化 Kubo 节点并与 IPFS 网络交互

在本教程中，你将初始化 IPFS Kubo 节点存储库，使你的节点在线，与 IPFS 网络交互，并查看本地节点上的 Web 控制台。如果你在遵循本指南时遇到任何问题，请参阅 [故障排除](#troubleshooting)。

## 先决条件

如果你尚未安装 Kubo，请按照 [Kubo 安装指南](../install/command-line.md) 操作。

## 初始化存储库

`ipfs` 将其所有设置和内部数据存储在名为 _the repository._ 的目录中。在首次使用 Kubo 之前，你需要初始化存储库。

:::tip
 - 如果你在数据中心运行 Kubo 节点，则应使用“服务器”配置文件初始化 IPFS。这样做将阻止 IPFS 创建试图发现本地节点的数据中心内部流量：
    ```bash
    ipfs init --profile server
    ```
 - 在 Unix 平台（包括 macOS）上使用 `sudo` 时要小心！运行 `sudo ipfs init` 将为 `root` 用户创建存储库，而不是你的本地用户帐户。Kubo 不需要 root 权限，因此最好以普通用户身份运行所有 `ipfs` 命令！
:::

1. 打开一个终端窗口。

1. 使用 `ipfs init` 命令初始化存储库

    ```bash
    ipfs init
    ```

   输出类似以下内容：

    ```bash
    > initializing ipfs node at /Users/jbenet/.ipfs
    > generating 2048-bit RSA keypair...done
    > peer identity: Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z
    > to get started, enter:
    >
    >   ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
    ```
    
    :::tip
    `peer identifier` 旁边的哈希是你的节点 ID，与上面输出中显示的不同。网络上的其他节点使用`peer identifier`来查找和连接你。
    如果需要，运行`ipfs id`来显示 `peer identity`。
    :::



2. 现在，尝试运行`ipfs init`输出中建议的命令（即`ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`）：
   ```bash
   ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
   ```

   你应该看到类似这样的内容：

    ```
    Hello and Welcome to IPFS!

    ██╗██████╗ ███████╗███████╗
    ██║██╔══██╗██╔════╝██╔════╝
    ██║██████╔╝█████╗  ███████╗
    ██║██╔═══╝ ██╔══╝  ╚════██║
    ██║██║     ██║     ███████║
    ╚═╝╚═╝     ╚═╝     ╚══════╝

    If you see this, you have successfully installed
    IPFS and are now interfacing with the ipfs merkledag!

    -------------------------------------------------------
    | Warning:                                              |
    |   This is alpha software. use at your own discretion! |
    |   Much is missing or lacking polish. There are bugs.  |
    |   Not yet secure. Read the security notes for more.   |
    -------------------------------------------------------

    Check out some of the other files in this directory:

      ./about
      ./help
      ./quick-start     <-- usage examples
      ./readme          <-- this file
      ./security-notes
    ```

1. `quick-start` 目录显示了其他可供尝试的示例命令。要显示 `quick-start` 的内容，请运行：

    ```bash
    ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
    ```

   :::tip
   你可以设置一大堆其他配置选项 - 有关详细信息，请参阅[完整参考]（https://github.com/ipfs/kubo/blob/master/docs/config.md）。
   :::

## 使你的节点联机

接下来，让你的节点上线并与 IPFS 网络进行交互：

1. 打开另一个终端窗口。

2. 在新终端窗口中启动 IPFS 守护程序：

    ```bash
    ipfs daemon
    ```

   片刻之后，将显示如下输出，表示你的节点已准备就绪：

    ```bash
    > Initializing daemon...
    > API server listening on /ip4/127.0.0.1/tcp/5001
    > Gateway server listening on /ip4/127.0.0.1/tcp/8080
    ```

   记下输出中的 TCP 端口。如果它们不同，请在下面的命令中使用你的端口。

    ::: danger NEVER EXPOSE THE RPC API TO THE PUBLIC INTERNET

   API 端口（默认为 `5001`）提供对你的 Kubo IPFS 节点的管理员级访问权限。有关更多信息，请参阅 [RPC API v0 文档](../reference/kubo/rpc.md)。

    :::

1. 切换回原来的终端窗口。

1. 如果你已连接到网络，请运行`ipfs swarm peers`以查看你的对等方的 IPFS 地址：

    ```bash
    ipfs swarm peers
    ```

   输出类似以下内容：

    ```bash
    > /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
    > /ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
    > /ip4/134.121.64.93/tcp/1035/p2p/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5
    > /ip4/178.62.8.190/tcp/4002/p2p/QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB
    ```

   显示的地址由 `<传输地址 transport address>`（即 `/ip4/104.131.131.82/tcp/4001`）和 `<公钥哈希值 hash-of-public-key>`（即 `QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx`）组成，从而产生形式为 `<传输地址 transport address>/p2p/<公钥哈希值 hash-of-public-key>` 的地址。

1. 现在，使用`ipfs cat`从网络获取一张宇宙飞船发射的酷图片：

    ```bash
    ipfs cat /ipfs/QmSgvgwxZGaBLqkGyWemEDqikCqU52XxsYLKtdy3vGZ8uq > ~/Desktop/spaceship-launch.jpg
    ```

   当上述命令运行时，Kubo 会在 IPFS 网络中搜索指定的 CID（`QmSgv...`），并将数据写入名为`spaceship-launch.jpg`的文件中。

1. 验证名为“spaceship-launch.jpg”的宇宙飞船发射照片是否位于你的“~/Desktop”中。

1. 接下来，创建一个文件添加到你的节点：

   ```bash
   echo "meow" > meow.txt
   ```

1. 使用`ipfs add`添加`meow.txt`：

   ```bash
   ipfs add meow.txt
   ```

   输出类似以下内容：

   ```bash
   > added QmabZ1pL9npKXJg8JGdMwQMJo2NCVy9yDVYjhiHK4LTJQH meow.txt
   ```

   记下 CID（即`QmabZ1..`），因为你在下一步中会需要它。

1. 通过指定上一步返回的 CID `<CID>` 查看对象：

    :::tip
   下面的示例使用`curl`作为浏览器，但你可以在其他浏览器中打开 IPFS 地址。根据网络状态，`curl`可能需要一段时间，因为公共网关过载或难以联系到你。
    :::

    ```bash
    curl "https://ipfs.io/ipfs/<CID>"
    ```

   输出类似下面的内容：

    ```bash
    > meow
    ```

   在此步骤中，网关从你的计算机提供文件。网关查询分布式哈希表 (DHT)，找到你的计算机，请求文件，你的计算机将其发送到网关，网关将其发送到你的浏览器。

1. 查看自己本地网关上的对象：

    ```bash
    curl "http://127.0.0.1:8080/ipfs/<CID>"
    ```

    ```bash
    > meow
    ```

   默认情况下，你的网关不会向外界公开。它仅在本地工作。

## 使用 Web 控制台与节点交互

你可以通过导航到`localhost:5001/webui`来查看本地节点的Web控制台。

![Web 控制台连接视图](./images/command-line-quick-start/webui-connection.png)

Web 控制台显示 [可变文件系统 (MFS)](../concepts/file-systems.md#mutable-file-system-mfs) 中的文件。MFS 是 Web 控制台内置的工具，可帮助你以与标准、基于名称的文件系统相同的方式浏览 IPFS 文件。

当你使用 [CLI 命令 `ipfs add ...`](../reference/kubo/cli.md#ipfs-add) 添加文件时，这些文件不会自动在 MFS 中可用。要查看使用 CLI 添加的 IPFS Desktop 中的文件，你必须将文件复制到 MFS：

1. 在浏览器中输入`localhost:5001/webui`以查看Web控制台。

1. 在左侧边栏菜单中，单击**文件**。将显示一个空目录，并显示以下消息：

    ```plaintext
    No files here yet! Add files to your local IPFS node by clicking the Import button above.
    ```

1. 导航回你原来的终端窗口。

1. 使用上一步将`meow.txt`添加到节点时获得的 CID `<CID>`，将文件复制到 MFS。

    ```shell
    ipfs files cp /ipfs/<CID> /meow.txt
    ```

   例如，如果 `meow.txt` 的 `<CID>` 是 `QmabZ1pL9npKXJg8JGdMwQMJo2NCVy9yDVYjhiHK4LTJQH`，它将被复制到 MFS，如下所示：

    ```shell
    ipfs files cp /ipfs/QmabZ1pL9npKXJg8JGdMwQMJo2NCVy9yDVYjhiHK4LTJQH /meow.txt
    ```

1. 在浏览器中，刷新**文件**页面。文件列表显示`meow.txt`。

## 将 IPFS Compon 与 Kubo 结合使用

你可以使用 IPFS Companion（一种浏览器扩展程序），它简化了对 IPFS 资源的访问并增加了对 IPFS 协议的支持，可以自动将 IPFS 网关请求重定向到你的本地守护程序，这样你就不依赖远程网关。

有关 IPFS Companion 的更多信息，包括如何安装它，请参阅 [IPFS Companion 快速入门](../install/ipfs-companion.md)。

## 故障排除

### 检查你的 Go 版本

IPFS 适用于 Go 1.12.0 或更高版本。要检查你安装的 go 版本，请输入`go version`：

```bash
go version

> go version go1.12.2 linux/amd64
```

如果你需要更新，我们建议你从 [规范的 Go 软件包](https://go.dev/doc/install) 安装。软件包管理器通常包含过时的 Go 软件包。

### 检查 FUSE 是否已安装

你需要安装并设置 FUSE 才能挂载文件系统。有关设置 FUSE 的更多详细信息，请参阅 [github.com/ipfs/kubo/blob/master/docs/fuse.md](https://github.com/ipfs/kubo/blob/master/docs/fuse.md)

### 进一步帮助

IPFS 社区很友好，能够提供帮助！[在 IPFS 论坛中获取其他 IPFS 开发人员的支持](../community/README.md#get-technical-support-and-help)，或加入 [社区聊天频道](../community/README.md#chat)。