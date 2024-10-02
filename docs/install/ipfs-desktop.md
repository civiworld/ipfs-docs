---
标题：IPFS 桌面
描述：IPFS 桌面通过一个方便的桌面应用程序为你提供 IPFS 的所有功能 - 一个完整的 IPFS 节点，以及方便的操作系统菜单快捷方式和一体化文件管理器、对等地图和内容浏览器。
---

# 安装 IPFS 桌面应用程序

**IPFS 桌面将 IPFS 节点、文件管理器、对等管理器和内容浏览器捆绑到一个易于使用的应用程序中。**

使用 IPFS 桌面无需接触终端即可熟悉 IPFS - 或者，如果你已经有经验，可以使用强大的菜单栏/任务栏快捷方式以及命令行来加快你的 IPFS 工作流程。

如果你的计算机上已经有 IPFS 节点，IPFS 桌面将充当该节点的控制面板和文件浏览器。如果你没有节点，它会为你安装一个。无论哪种方式，IPFS 桌面都会自动检查更新。

![IPFS 桌面状态屏幕](./images/ipfs-desktop/desktop-status.png)

| 文件屏幕 | 探索屏幕 | 同伴屏幕 | 设置屏幕 | 菜单栏/任务栏 |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ![文件屏幕截图](./images/ipfs-desktop/desktop-files.png) | ![探索屏幕截图](./images/ipfs-desktop/desktop-explore.png) | ![同伴屏幕截图](./images/ipfs-desktop/desktop-peers.png) | ![设置屏幕截图](./images/ipfs-desktop/desktop-settings.png) | ![Mac/Windows 菜单的屏幕截图](./images/ipfs-desktop/desktop-menubar-taskbar.png) |

### 功能亮点

- **在系统启动时（Mac/Windows）启动你的节点，并使用便捷的菜单栏/系统托盘菜单从你的操作系统控制它**。
- **以多种便捷的方式**快速将文件、文件夹和屏幕截图导入 IPFS**，包括拖放和（对于 Windows）右键单击文件/文件夹的图标。
- **使用熟悉的文件浏览器轻松管理节点的内容**，该浏览器提供重命名/移动/固定文件和文件夹的快捷方式，直接在 IPFS 桌面中预览许多常见文件格式，将内容 ID 或可共享链接复制到剪贴板等。
- **快速下载 CID、IPFS 路径和 IPNS 路径** — 右键单击计算机菜单栏上的 IPFS 图标，选择“下载...”，粘贴哈希值，即可开始使用。
- 在地图上**可视化你全球的 IPFS 对等点**，地图上显示你连接的节点、它们的位置、它们正在使用的连接等。
- 使用可视化工具**探索 IPFS 文件的“Merkle Forest”**，让你亲眼看到存储在 IPFS 上的示例数据集（或你自己的 IPFS 文件）如何分解为内容寻址的部分。
- **操作系统范围内对 IPFS 文件和链接的支持**（在 Mac、Windows 和某些 Linux 版本上）会自动交出以“ipfs://”和“ipns://”开头的链接，以便在 IPFS 桌面中打开。
- **CLI 导师模式**可帮助你随时学习 IPFS 命令。

### 安装说明

要安装 IPFS Desktop，请按照操作系统的具体说明进行操作。IPFS Desktop 是使用 [Electron 框架](https://www.electronjs.org) 构建的，因此该应用程序应该可以在 Electron 工作的任何地方工作。

| [Windows](#windows) | [macOS](#macos) | [Ubuntu](#ubuntu) |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [![Windows 图标](./images/ipfs-desktop/windows-icon.png)](#windows) | [![macOS 图标](./images/ipfs-desktop/apple-icon.png)](#macos) | [![Ubuntu 图标](./images/ipfs-desktop/ubuntu-icon.png)](#ubuntu) |

或者，如果你更愿意使用包管理器，请查看 IPFS 社区维护的 [第三方包列表](#package-managers)。

## Windows

1. 转到 [IPFS Desktop 下载页面](https://github.com/ipfs/ipfs-desktop/releases)
2. 找到以 `.exe` 结尾的链接，获取最新版本的 IPFS Desktop：

![IPFS Desktop 下载页面。](./images/ipfs-desktop/install-windows-download-exe-page.png)

3. 运行 `.exe` 文件以开始安装。
4. 选择你是要为自己安装应用程序还是为计算机上的所有用户安装应用程序。单击 **下一步**：
   ![IPFS Desktop 安装选项窗口。](./images/ipfs-desktop/install-windows-install-options.png)

5. 选择应用程序的安装位置。默认位置通常就可以了。单击**下一步**：

![IPFS Desktop 安装位置窗口。](./images/ipfs-desktop/install-windows-install-location.png)

6. 等待安装完成，然后单击**完成**：

![IPFS Desktop 安装完成窗口。](./images/ipfs-desktop/install-windows-install-finish.png)

7. 你现在可以在状态栏中找到 IPFS 图标：

![Windows 状态栏中的 IPFS Desktop 状态栏菜单。](./images/ipfs-desktop/install-windows-ipfs-desktop-status-bar.png)

IPFS Desktop 应用程序已完成安装。现在，[添加你的网站](../how-to/websites-on-ipfs/single-page-website.md#add-your-site)。

## macOS

1. 从 [ipfs/ipfs-desktop 发布页面](https://github.com/ipfs/ipfs-desktop/releases) 下载最新可用的 `.dmg` 文件

![GitHub 中可用的下载链接列表。](./images/ipfs-desktop/install-macos-dmg-file-link.png)

2. 打开 `ipfs-desktop.dmg` 文件。
3. 将 IPFS 图标拖到 **Applications** 文件夹中：

![MacOS 中的拖动安装窗口。](./images/ipfs-desktop/install-macos-drag-ipfs-drag.png)

4. 打开你的 **Applications** 文件夹并打开 IPFS Desktop 应用程序。
5. 你可能会收到一条警告，提示“无法打开 IPFS Desktop.app”。单击 **在 Finder 中显示**：

![一条错误消息，显示计算机无法安装该应用程序。](./images/ipfs-desktop/install-macos-ipfs-cannot-be-opened.png)

6. 在你的 **Applications** 文件夹中找到 **IPFS Desktop.app**。
7. 按住 `control` 键，单击 **IPFS Desktop.app**，然后单击 **打开**:

![右键单击 IPFS Desktop.app 的上下文菜单。](./images/ipfs-desktop/install-macos-force-open.png)

8. 在新窗口中打开单击 **打开**:

![打开确认窗口。](./images/ipfs-desktop/install-macos-open-confirmation.png)

9. 现在你可以在状态栏中找到 IPFS 图标:

![macOS 状态栏中的 IPFS Desktop 状态栏菜单。](./images/ipfs-desktop/install-macos-ipfs-desktop-status-bar.png)

IPFS Desktop 应用程序已完成安装。现在，[添加你的网站](../how-to/websites-on-ipfs/single-page-website.md#add-your-site)。

## Ubuntu

虽然这些说明特定于 Ubuntu，但它们可能适用于大多数与 Ubuntu 相关的 Linux 发行版。对于非 Ubuntu Linux 发行版，请查看 [IPFS Desktop GitHub 存储库](https://github.com/ipfs/ipfs-desktop#install) 获取安装说明。

### 使用 `.deb` 安装

1. 从 [IPFS Desktop GitHub 存储库](https://github.com/ipfs/ipfs-desktop#linuxfreebsd) 下载最新的 `.deb` 安装程序。
2. 双击使用 Ubuntu 软件安装软件包，或者进入你下载安装程序的位置并从命令行安装：

```shell
sudo dpkg -i ./ipfs-desktop-[version]-amd64.deb
```

将 `[version]` 替换为你刚刚下载的 IPFS 软件包的版本号。

### 使用 AppImage 安装

:::warning
使用 AppImage 可执行文件安装 IPFS Desktop 时，你将无法访问命令行 `ipfs` 命令。此限制是由于 AppImage 的工作方式及其如何容器化其进程造成的。

如果你确定不需要使用命令行 `ipfs` 命令，请继续安装 AppImage。否则，请考虑使用 [deb 安装程序 ↑](#install-with-deb)
:::

1. 从 [IPFS Desktop GitHub 存储库](https://github.com/ipfs/ipfs-desktop#linuxfreebsd) 下载最新的 `.AppImage` 包。
2. 移动到你下载 `.AppImage` 文件的位置，并使其可执行：

```shell
cd Downloads
chmod a+x ./ipfs-desktop-linux.AppImage
```

3. 通过从命令行调用 `./ipfs-desktop-linux.AppImage` 打开 `.AppImage`：

```shell
./ipfs-desktop-linux.AppImage
```

你也可以通过在文件管理器中双击它来运行 `.AppImage` 文件。

## 包管理器

| 包管理器                                                                                                                                   | 命令                                                      |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| [Homebrew](https://formulae.brew.sh/formula/ipfs#default)                                                                              | `brew install ipfs --cask`                              |
| [Chocolatey](https://community.chocolatey.org/packages/ipfs-desktop)                                                                   | `choco install ipfs-desktop`                            |
| [Scoop](https://github.com/ScoopInstaller/Extras/blob/master/bucket/ipfs-desktop.json) 由 [@NatoBoram](https://github.com/NatoBoram) 维护 | `scoop bucket add extras && scoop install ipfs-desktop` |
| [AUR](https://aur.archlinux.org/packages/ipfs-desktop/) 由 [@alexhenrie](https://github.com/alexhenrie) 维护                              | `ipfs-desktop`                                          |

## 后续步骤

现在你已经安装了 IPFS Desktop，你可以开始共享文件并与网络上的其他节点交互！查看如何[使用 IPFS 托管网站 →](../how-to/websites-on-ipfs/single-page-website.md)