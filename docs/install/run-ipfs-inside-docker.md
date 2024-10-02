---
title：在 Docker 中安装 IPFS Kubo
description：你可以在 Docker 中运行 IPFS 以简化部署流程，并水平扩展 IPFS 基础设施。
---

# 在 Docker 中安装 IPFS Kubo

你可以在 Docker 中运行 Kubo IPFS 以简化部署流程，并水平扩展 IPFS 基础设施。

## 设置

1. 获取托管在 [hub.docker.com/r/ipfs/kubo](https://hub.docker.com/r/ipfs/kubo/) 的 IPFS docker 镜像。
1. 要使文件在容器内可见，你需要使用 `-v` 选项将主机目录挂载到 Docker。选择要用于从 IPFS 导入和导出文件的目录。你还应该选择一个目录来存储 IPFS 文件，这些文件将在重新启动容器时保留。

```shell
export ipfs_staging=</absolute/path/to/somewhere/>
export ipfs_data=</absolute/path/to/somewhere_else/>
```

1. 启动运行 ipfs 的容器并公开端口 `4001` (P2P TCP/QUIC 传输)、`5001` (RPC API) 和 `8080` (网关)：

```shell
docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```

::: danger 切勿将 RPC API 暴露给公共互联网

API 端口提供对你的 IPFS 节点的管理员级访问权限。有关更多信息，请参阅 [RPC API 文档](../reference/kubo/rpc.md)。

:::

1. 查看 ipfs 日志：

```shell
docker logs -f ipfs_host
```

1. 等待 IPFS 启动：

```shell
RPC API 服务器监听 /ip4/0.0.0.0/tcp/5001
WebUI：http://0.0.0.0:5001/webui
网关服务器监听 /ip4/0.0.0.0/tcp/8080
守护进程已准备就绪
```

你现在可以停止查看日志。

1. 使用 `docker exec ipfs_host ipfs <args...>` 运行 IPFS 命令。例如：

连接到对等点：

```shell
docker exec ipfs_host ipfs swarm peers
```

添加文件：

```shell
cp -r <something> $ipfs_staging
docker exec ipfs_host ipfs add -r /export/<something>
```

1. 停止正在运行的容器：

```shell
docker stop ipfs_host
```

首次使用空数据目录启动运行 ipfs 的容器时，它将调用 `ipfs init` 来初始化配置文件并生成新的密钥对。此时，你可以使用 `IPFS_PROFILE` 环境变量选择要应用哪个配置文件：

```shell
docker run -d --name ipfs_host -e IPFS_PROFILE=server -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```

## 自定义你的节点

可以通过在容器中的 `/container-init.d` 目录中挂载脚本来运行自定义初始化代码。这些操作按顺序按字典顺序执行，在运行 `ipfs init` 并复制 swarm 密钥之后（如果 IPFS repo 需要初始化），在启动 IPFS 守护进程之前。

由于每次启动容器时都会运行此操作，因此你应该检查初始化代码是否应该是幂等的，特别是如果你在容器外部保持状态（例如使用已安装的目录）。

例如，在守护进程启动之前设置自定义引导节点：

```shell
#!/bin/sh
set -ex
ipfs bootstrap rm all
ipfs bootstrap add "/ip4/$PRIVATE_PEER_IP_ADDR/tcp/4001/ipfs/$PRIVATE_PEER_ID"
```

这显示了如何在运行容器时将文件挂载到 `container-init.d` 目录中：

```shell
docker run -d --name ipfs \
-e PRIVATE_PEER_ID=... \
-e PRIVATE_PEER_IP_ADDR=... \
-v ./001-test.sh:/container-init.d/001-test.sh \
-p 4001:4001 \
-p 127.0.0.1:8080:8080 \
-p 127.0.0.1:5001:5001 \
ipfs/kubo
```

:::tip 在自定义图像中使用
请参阅 [go-ipfs-docker-examples 存储库](https://github.com/ipfs-shipyard/go-ipfs-docker-examples) 上的 `gateway` 示例
:::

## Docker 中的私有群集

可以使用变量 `IPFS_SWARM_KEY` 和 `IPFS_SWARM_KEY_FILE` 使用群集密钥文件 (`/data/ipfs/swarm.key`) 初始化容器。`IPFS_SWARM_KEY` 使用变量本身的内容创建 `swarm.key`，而 `IPFS_SWARM_KEY_FILE` 从存储在变量中的路径复制密钥。 `IPFS_SWARM_KEY_FILE` **覆盖**由 `IPFS_SWARM_KEY` 生成的密钥。

```shell
docker run -d --name ipfs_host -e IPFS_SWARM_KEY=<your swarm key> -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```

也可以使用 docker secrets 初始化 swarm key，需要 `docker swarm` 或 `docker-compose`：

```shell
cat your_swarm.key | docker secret create swarm_key_secret -
docker run -d --name ipfs_host --secret swarm_key_secret -e IPFS_SWARM_KEY_FILE=/run/secrets/swarm_key_secret -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
```
## Docker 内部的密钥轮换

可以在临时容器中执行密钥轮换，该容器临时针对挂载在 `/data/ipfs` 下的卷执行：

```shell
# 给定名为 'ipfs-test' 的容器，该容器在 /path/to/persisted/.ipfs 处持久化 repo
docker run -d --name ipfs-test -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:latest
docker stop ipfs-test

# 密钥轮换的工作方式如下（旧密钥保存在 'old-self' 下）
docker run --rm -it -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:latest key rotate -o old-self -t ed25519
docker start ipfs-test # 将使用新密钥启动
```