---
title: 数据计算 (CoD)
description: Learn about compute-over-data with content-addressed data on IPFS
---

# 具有内容寻址数据的数据计算

content-addressed：内容寻址

Compute-over-Data：数据计算

“基于数据计算”(CoD) 一词通常是指在数据位置附近进行数据处理的计算范式。这一概念在大数据和分布式计算的背景下尤其重要，因为通过网络传输大量数据效率低下且成本高昂。通过在数据存储位置附近执行计算（基于数据计算），可以实现更快的处理速度和更低的网络带宽要求。

IPFS 用户可以使用 [Bacalhau 平台](#bacalhau) 和 [星际虚拟机 (IPVM) 规范](#ipvm) 对 IPFS 数据执行 CoD，这两者都原生支持内容寻址数据。

## Bacalhau

Bacalhau 是一个快速、经济高效、安全的分布式计算平台。Bacalhau 的工作原理是运行生成和存储数据的作业，也称为数据计算 (CoD)。使用 Bacalhau，您可以通过运行任意 Docker 容器和 WebAssembly (Wasm) 映像作为计算任务来简化现有工作流程，而无需进行大量重构。Bacalhau 这个名字源于葡萄牙语中的“咸鳕鱼”。

### 特征

Bacalhau 可以:

- 通过提供一个用于管理跨不同区域、云和边缘设备的作业的**统一平台**，简化计算作业的管理。
- 提供可靠且抗网络分区的编排，确保即使网络中断，作业也能完成。
- 提供完整且永久的审计日志，这样就可以确信作业正在安全执行。
- 运行[私有工作负载](https://docs.bacalhau.org/next-steps/private-cluster)以减少数据泄露到组织外部的可能性。
- 由于工作在更靠近源头的地方进行处理，因此减少了进出成本。
- 针对计算机上[挂载在任何地方](https://docs.bacalhau.org/#how-it-works)的数据运行。
- 与节点上运行的服务集成以运行作业，例如 [DuckDB](https://docs.bacalhau.org/examples/data-engineering/DuckDB/)。
- 大规模地运行并行作业并批量处理 PB 级的数据。
- 使用针对所选艺术家的原创作品进行训练的 [稳定扩散 AI 模型](https://www.waterlily.ai/) 自动生成艺术作品。

### 更多Bacalhau资源 

- [开始教程](https://docs.bacalhau.org/getting-started/installation/)
- [Bacalhau 平台架构](https://docs.bacalhau.org/getting-started/architecture/)
- [GitHub](https://github.com/bacalhau-project/bacalhau)

## IPVM

星际虚拟机 (IPVM) 规范定义了在 IPFS 上运行去中心化计算作业的最简单、最快、最安全和最开放的方式。IPVM 的一种描述方式是“AWS Lambda 的开放、去中心化和本地优先的竞争对手”。

IPVM 使用 [WebAssembly (Wasm)](https://webassembly.org/)、内容寻址、[简单公钥基础设施 (SPKI)](https://en.wikipedia.org/wiki/Simple_public-key_infrastructure) 和对象功能将计算从特定的、预先协商的服务（例如大型云计算提供商）中解放出来。默认情况下，执行可在设备上灵活扩展，一直到边缘接入点 (PoP) 和数据中心。

IPVM 的核心、基于 Rust 的实现和运行时是 [Homestar 项目](https://github.com/ipvm-wg/homestar/)。IPVM 支持与 [Bacalhau](https://bacalhau.org) 和 [Web3Storage](https://web3.storage/) 的互操作性

### 更多IPVM资源

- [github.com/ipvm-wg/homestar/](https://github.com/ipvm-wg/homestar/)
- [面向开放世界的无缝服务](https://youtu.be/Kr3B3sXh_VA) by Brooklyn Zelenka
- [开放世界计算的基础](https://youtu.be/dRz5mau6fsY) by Zeeshan Lakhani
- [开放世界计算的基础：Homestar，一个 IPVM 故事](https://youtu.be/BFAMy5-VHak) by Zeeshan Lakhani
- [IPVM：传说中的执行层](https://www.youtube.com/watch?v=3y1RB8wt_YY) by Brooklyn Zelenka
- [IPVM：面向开放世界的内容寻址计算](https://youtu.be/jhtEYr3ORfk) by Brooklyn Zelenka
- [IPVM - IPFS and WASM](https://www.youtube.com/watch?v=rzJWk1nlYvs) by Brooklyn Zelenka
- [IPVM：用例和系统设计](https://www.youtube.com/watch?v=FhwzEKNZEIA) by Juan Benet
- [IPVM：高级规范](https://github.com/ipvm-wg/spec)
- [IPVM 工作流规范](https://github.com/ipvm-wg/workflow)
- [UCAN调用规范](https://github.com/ucan-wg/invocation)
