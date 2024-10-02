---
title：IPFS Cluster
description：IPFS Cluster 通过分配、复制和跟踪分布在多个对等体之间的全局 pin-set，为 IPFS 守护进程群提供数据编排。在此处了解如何安装。
current-ipfs-cluster-version：v1.1.1
---

# 使用 IPFS Cluster 设置服务器基础架构

如果你想在服务器环境中安装 IPFS 并将 IPFS 作为服务提供，你应该查看 [IPFS Cluster](https://cluster.ipfs.io/)，以将 IPFS 部署扩展到单个 IPFS 守护进程之外。IPFS Cluster 通过分配、复制和跟踪分布在多个对等体之间的全局 pin-set，为 IPFS 守护进程群提供数据编排。这使得管理多个 IPFS 节点并确保数据在内部网络中可用变得非常容易。

IPFS Cluster 是一个分布式应用程序，可作为 IPFS 对等节点的附属节点，维护全局集群 pinset 并智能地将其项目分配给 IPFS 对等节点。这使得管理多个 IPFS 节点并确保数据在内部网络中可用变得非常容易。IPFS Cluster 为大型 IPFS 存储服务提供支持，例如 [nft.storage](https://nft.storage/) 和 [web3.storage](https://web3.storage/)。

:::tip
作为 Kubernetes 用户，你可以使用名为 [IPFS operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) 的 IPFS Kubernetes 运算符轻松创建和管理由数百个对等节点组成的集群。
IPFS 运算符正在积极开发中，尚不推荐用于生产用例。如果你想将操作员纳入你的基础设施，请查看 [官方文档](https://ipfs-operator.readthedocs.io/) 和 [操作员源代码](https://github.com/redhat-et/ipfs-operator) 以获取说明和最新进展。
:::

## 功能

IPFS 集群具有以下功能：

- _易于运行_：独立于 IPFS 和 IPFS 守护进程的 API 运行。
- _处理数百万个引脚到数百个 IPFS 守护进程的复制：_ 异步跟踪引脚寿命，要求 IPFS 以可持续的速率固定事物，并在发生故障时重试固定。
- _巧妙的固定优先级：_ 新引脚优先于旧的或多次固定失败的引脚请求。
- _大规模提取引脚：_ 从引脚被集群对等点跟踪和管理的那一刻起，引脚可以以每秒数百个的速度添加到集群中。
- _平衡分配：_ 在不同组和子组（即区域、可用区域）的对等点之间均匀分配引脚，最终选择具有最多可用存储空间的对等点。
- _API 和 CLI_：提供命令行客户端和功能齐全的 Cluster HTTP REST API。
  _无需管理中央服务器：_ 集群对等点形成分布式网络，并维护全局、复制、无冲突的引脚列表。
- _内置权限：_ 嵌入式权限模型支持具有更改集群引脚集权限的对等点，以及按指示存储内容但不能修改引脚集的对等点。
- _命名你的引脚：_ 支持每个引脚的自定义复制因子、名称和元数据。
- _多对等点添加：_ 将 IPFS 内容直接提取到多个守护进程。
- _CAR 导入支持：_ 使用自定义 DAG 直接导入 CAR 存档内容。
- _IPFS 代理 API：_ 集群对等点提供额外的 IPFS 代理 API，其行为与 IPFS 守护进程的 API 完全相同。
- _集成就绪：_ 可以使用 Go 和 Javascript 客户端以编程方式启动和控制集群对等点。
- _由 [libp2p](https://libp2p.io/) 提供支持：_ 基于 libp2p 构建，这是 IPFS、Filecoin 和 Ethereum V2 使用的久经考验的下一代 p2p 网络库。

<!-- markdown-link-check-disable -->
@[youtube](-SYDlid7Nqs)
<!-- markdown-link-check-enable-->

## 创建本地集群

要查看 IPFS 集群是否适合你的项目，请按照此快速入门指南并启动本地 IPFS 集群实例。在本指南结束时，你将对如何设置 IPFS 集群以及如何与其交互有一个深入的了解。要创建本地集群，请完成先决条件。然后，按照步骤操作。

:::tip
如果你希望创建一个可用于生产的集群，请查看 [官方 IPFS 集群文档 →](https://cluster.ipfs.io/)
:::

### 先决条件

你必须同时安装 [Docker](https://docs.docker.com/install/) 和 [Docker Compose](https://docs.docker.com/compose/install/)。通过检查版本来检查它们是否都已正确安装：

```shell
docker 版本

> 客户端：Docker Engine - Community
> 版本：19.03.13
> API 版本：1.40
> ...

docker-compose 版本

> docker-compose 版本 1.27.4，内部版本 40524192
> docker-py 版本：4.3.1
> ...
```

如果你在安装或使用 Docker 或 Docker-Compose 时遇到问题，请参阅 [官方文档 →](https://docs.docker.com/)。

### 程序

1. 从 [dist.ipfs.tech](https://dist.ipfs.tech/#ipfs-cluster-ctl) 下载最新的 `ipfs-cluster-ctl` 软件包：

```shell
wget https://dist.ipfs.tech/ipfs-cluster-ctl/v1.1.1/ipfs-cluster-ctl_v1.1.1_linux-amd64.tar.gz
```

1. 解压软件包：

```shell
tar xvzf ipfs-cluster-ctl_v1.1.1_linux-amd64.tar.gz

> ipfs-cluster-ctl/ipfs-cluster-ctl
> ipfs-cluster-ctl/LICENSE
> ipfs-cluster-ctl/LICENSE-APACHE
> ipfs-cluster-ctl/LICENSE-MIT
> ipfs-cluster-ctl/README.md
```

1. 下载 [`docker-compose.yml` 文件](https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.1.1/docker-compose.yml) 并将其放入 `ipfs-cluster-ctl` 目录中：

```shell
wget https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.1.1/docker-compose.yml
```

1. 使用 `docker-compose` 启动集群：

:::callout
根据你的系统权限，你可能必须以 root 用户身份运行该命令。
:::

```shell
docker-compose up

> 重新创建 ipfs2 ... done
> 重新创建 ipfs1 ... done
> 重新创建 ipfs0 ... done
> 重新创建 cluster2 ... done
> ...
```

:::warning

可能会显示以下错误：

```shell
cluster2 | 2020-10-27T15:20:15.116Z ERROR ipfshttp 错误发布到 IPFS：发布“http://172.18.0.2:5001/api/v0/pin/ls?type=recursive”：拨号 tcp 172.18.0.2:5001：连接：连接被拒绝
```

你现在可以放心地忽略这些错误。显示这些错误是因为集群中的某些 IPFS 节点尚未完成启动。几分钟后，所有内容应该都已加载：

```shell
> ipfs1 | API 服务器监听 /ip4/0.0.0.0/tcp/5001
> ipfs1 | WebUI：http://0.0.0.0:5001/webui
> ipfs1 | 网关（只读）服务器监听 /ip4/0.0.0.0/tcp/8080
> ipfs1 | 守护进程已准备就绪
```
:::

1. 打开一个新的终端窗口。

1. 你现在可以与集群交互。在新的终端窗口中，导航到 `ipfs-cluster-ctl` 目录。

1. 列出集群内的对等节点：

```shell
./ipfs-cluster-ctl peers ls

> 12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf | cluster2 |看到另外 2 个对等点
> > 地址:
> - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
> - /ip4/172.18.0.5/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
> ...
> 12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE | cluster0 |看到另外 2 个对等点
> > 地址:
> - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
> - /ip4/172.18.0.7/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
> ...
> 12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w | cluster1 |看到其他 2 个对等点
> > 地址：
> - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
> - /ip4/172.18.0.6/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
> ...
```

1. 将文件添加到集群中：

```shell
wget https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg
./ipfs-cluster-ctl add Neptune_-_Voyager_2_\(29347980845\)_flatten_crop.jpg

> created QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn Neptune_-_Voyager_2_(29347980845)_flatten_crop.jpg
```

1. 使用上面给出的 CID 查看该文件在 IPFS 节点集群中的状态：

```shell
./ipfs-cluster-ctl status QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn

> QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn:
> > cluster2 : PINNED | 2020-10-27T15:42:39.984850961Z
> > cluster0 : PINNED | 2020-10-27T15:42:39.984556496Z
> > cluster1 : PINNED | 2020-10-27T15:42:39.984842325Z
```

输出显示 `QmdzvHZ...` 已固定在我们集群内的三个 IPFS 节点上。

1. 操作完成后，终止集群：

:::callout
根据你的系统权限，你可能必须以 root 用户身份运行该命令。
:::

```shell
docker-compose kill

> Killing cluster0 ... done
> Killing cluster1 ... done
> Killing cluster2 ... done
> Killing ipfs1 ... done
> Killing ipfs0 ... done
> Killing ipfs2 ... done
```

运行 `ipfs-cluster-ctl` 守护进程的终端将关闭所有打开的连接：

```shell
> ...
> ipfs0 exited with code 137
> ipfs1 exited with code 137
> cluster0 exited with code 137
> cluster2 exited with code 137
> cluster1 exited with code 137
> ipfs2 exited with code 137
```

## 后续步骤

如果你想深入了解 IPFS Cluster，请查看 [cluster.ipfs.io] 上的项目文档→]（https://cluster.ipfs.io/）