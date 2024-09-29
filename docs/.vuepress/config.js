// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.ipfs.tech'
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''
const pageSuffix = '/'

const installMenuChildren = [
  ['/install/command-line','IPFS Kubo for Go'],
  ['/install/run-ipfs-inside-docker', 'IPFS Kubo in Docker'],
  ['https://github.com/ipfs/helia','IPFS Helia for JavaScript'],
  ['https://iroh.computer/docs/install/', "IPFS Iroh for Rust"],
  ['/install/ipfs-desktop', 'IPFS 桌面应用程序'],
  ['/install/ipfs-companion', 'IPFS Companion 浏览器扩展'],
  ['/install/server-infrastructure', 'IPFS 集群']
]

module.exports = {
  configureWebpack: {
    output: {
      hashFunction: "sha256"
    }
  },
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'IPFS 文档',
      description: 'IPFS 文档'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist')),
      md.use(require('markdown-it-imsize')),
      md.use(require('markdown-it-image-lazy-loading'))
    }
  },
  themeConfig: {
    defaultImage: '/images/social-card.png',
    author: {
      name: 'IPFS Team',
      twitter: '@ipfsbot'
    },
    keywords:
      'IPFS, dweb, protocol, libp2p, ipld, multiformats, bitswap, decentralized web, InterPlanetary File System, dapp, documentation, docs, Protocol Labs',
    // edit links
    domain: DEPLOY_DOMAIN,
    docsRepo: 'ipfs/ipfs-docs',
    docsDir: 'docs',
    docsBranch: 'main',
    feedbackWidget: {
      docsRepoIssue: 'ipfs/ipfs-docs'
    },
    editLinks: false,
    // page nav
    nextLinks: false,
    prevLinks: false,
    // ui/ux
    logo: '/images/ipfs-logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        nav: [
          { text: '开始使用', link: '/install/' },
          { text: '概念', link: '/concepts/' },
          { text: '指南', link: '/how-to/' },
          { text: '参考', link: '/reference/' },
          { text: '项目', link: '/project/' },
          { text: '案例研究',
            items: [
              {text: 'Arbol', link : '/case-studies/arbol/'},
              {text: 'Audius', link : '/case-studies/audius'},
              {text: 'Fleek', link : '/case-studies/fleek'},
              {text: 'LikeCoin', link : '/case-studies/likecoin'},
              {text: 'Morpheus.Network', link : '/case-studies/morpheus'},
              {text: 'Snapshot',link : '/case-studies/snapshot'},
            ]
          }
        ],

        sidebar: {
          '/install/':  [
            ['/concepts/what-is-ipfs','基础概念'],
            {
              title: '快速开始',
              sidebarDepth: 1,
              collapsable: false,
              children: [
                ['/quickstart/publish','发布到IPFS (UI)'],
                ['/quickstart/publish_cli', '发布到IPFS (command line)' ],
                ['/quickstart/retrieve','使用IPFS检索'],
              ]
            },
            {
              title: 'Install',
              sidebarDepth: 1,
              collapsable: false,
              children: installMenuChildren
            },
          ],
          '/quickstart/':  [
            ['/concepts/what-is-ipfs','基础概念'],
            {
              title: '快速开始',
              sidebarDepth: 1,
              collapsable: false,
              children: [
                ['/quickstart/publish','发布到 IPFS (UI)'],
                ['/quickstart/publish_cli', '发布到 (command line)' ],
                ['/quickstart/retrieve','使用IPFS检索'],
                
              ]
            },
            {
              title: 'Install',
              sidebarDepth: 1,
              collapsable: false,
              children: installMenuChildren
            },
          ],
          '/concepts/': [
            {
              title: '基础',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                  '/concepts/what-is-ipfs',
                  '/concepts/ipfs-solves',
                  '/concepts/how-ipfs-works',
              ]
            },
            {
              title: '思想和理论',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                  '/concepts/lifecycle',
                  '/concepts/hashing',
                  '/concepts/immutability',
                  '/concepts/persistence',
                  '/concepts/privacy-and-encryption',
                  '/concepts/nodes',
              ]
            },
            {
              title: '子系统与组件',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/concepts/content-addressing',
                '/concepts/bitswap',
                '/concepts/dht',
                '/concepts/dnslink',
                '/concepts/file-systems',
                '/concepts/ipfs-gateway',
                ['https://ipld.io/docs/intro/primer/', 'IPLD (InterPlanetaryLinkedData)' ],
                '/concepts/ipni',
                '/concepts/ipns',
                '/concepts/libp2p',
                '/concepts/merkle-dag'
              ]
            },
            {
              title: '实现',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['/concepts/implementations', '实现说明'],
                ['/concepts/ipfs-implementations', '实现列表']
              ]
            },
            '/concepts/cod',
            '/concepts/comparisons',
            '/concepts/public-utilities',
            ['/concepts/measuring', '测量网络'],
            '/concepts/faq',
            '/concepts/glossary',
            '/concepts/further-reading/academic-papers'
          ],
          '/how-to/': [
            '/how-to/desktop-app',
            {
              title: 'IPFS Kubo 教程',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/kubo-basic-cli',
                '/how-to/command-line-quick-start',
                '/how-to/configure-node',
                '/how-to/modify-bootstrap-list',
                '/how-to/nat-configuration',
                '/how-to/default-profile',
                '/how-to/ipfs-updater', 
                [
                  'https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/custom-ipfs-repo',
                  '自定义IPFS存储库'
                ],
                '/how-to/kubo-garbage-collection',
                '/how-to/troubleshooting',   
                '/how-to/webtransport',   
              ]
            },
            {
              title: '管理文件',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/work-with-blocks',
                '/how-to/pin-files',
                '/how-to/work-with-pinning-services',
                '/how-to/take-snapshot',
                '/how-to/store-play-videos',
                '/how-to/host-git-repo',
                '/how-to/move-ipfs-installation/move-ipfs-installation',
              ]
            },
            {
              title: '点工作',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/observe-peers',
                '/how-to/peering-with-content-providers'
              ]
            },
            {
              title: 'IPFS上的网站',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/websites-on-ipfs/single-page-website',
                '/how-to/websites-on-ipfs/multipage-website',
                '/how-to/websites-on-ipfs/link-a-domain',
                '/how-to/websites-on-ipfs/introducing-fleek',
                '/how-to/websites-on-ipfs/static-site-generators',
                '/how-to/websites-on-ipfs/redirects-and-custom-404s'
              ]
            },
            {
              title: '浏览器中的IPFS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/address-ipfs-on-web',
                '/how-to/browser-tools-frameworks'
              ]
            },
            {
              title: 'IPNS',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/publish-ipns'
              ]
            },
            {
              title: 'IPFS 网关',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/gateway-best-practices',
                '/how-to/gateway-troubleshooting'
              ]
            },
            {
              title: 'IPFS 伴侣',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/companion-node-types',
                '/how-to/dnslink-companion',
                '/how-to/companion-window-ipfs',
                '/how-to/companion-x-ipfs-path-header'
              ]
            },
            {
              title: 'IPFS & 区块网络',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/how-to/best-practices-for-nft-data'         
              ]
            },
            {
              title: '隐私与加密',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                ['/how-to/privacy-best-practices', 'Privacy and Encryption'], 
              ]
            },
          ],
          '/reference/': [
            '/reference/diagnostic-tools',
            '/reference/http/gateway',
            '/reference/js/api',
            '/reference/go/api',
            {
              title: 'Kubo CLI',
              sidebarDepth: 1,
              collapsable: true,
              path: '/reference/kubo/cli'
            },
            {
              title: 'Kubo RPC API',
              sidebarDepth: 1,
              collapsable: true,
              path: '/reference/kubo/rpc'
            },
            '/reference/kubo-rpc-cli.md'

          ],
          '/community/': [
            ['/community/', '加入社区'],
            '/community/contribute/ways-to-contribute',
            {
              title: 'Write the docs',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                '/community/contribute/grammar-formatting-and-style',
                '/community/contribute/writing-guide',
                '/community/contribute/code-persona',
                '/community/contribute/contribution-tutorial'
              ]
            },
            '/project/history',
            '/project/repository-guide',
            '/project/related-projects',
            ['https://github.com/ipfs/specs', 'Specifications'],
            ['/concepts/further-reading/academic-papers', 'Research'],
            [
              'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
              'Code of conduct'
            ],
          ],
          '/project/' : [
                ['/community/',  'Join the community'],
                '/community/contribute/ways-to-contribute',
                {
                  title: 'Write the docs',
                  sidebarDepth: 1,
                  collapsable: true,
                  children: [
                    '/community/contribute/grammar-formatting-and-style',
                    '/community/contribute/writing-guide',
                    '/community/contribute/code-persona',
                    '/community/contribute/contribution-tutorial'
                  ]
                },
                '/project/history',
                '/project/repository-guide',
                '/project/related-projects',
                ['https://github.com/ipfs/specs', 'Specifications'],
                ['/concepts/further-reading/academic-papers', 'Research'],
                [
                  'https://github.com/ipfs/community/blob/master/code-of-conduct.md',
                  'Code of conduct'
                ],
          ],
          '/case-studies/' : [
            {
              title: '案例研究',
              collapsable: false,
              children: [
                ['/case-studies/arbol', 'Arbol'],
                ['/case-studies/audius', 'Audius'],
                ['/case-studies/fleek', 'Fleek'],
                ['/case-studies/likecoin', 'LikeCoin'],
                ['/case-studies/morpheus', 'Morpheus.Network'],
                ['/case-studies/snapshot', 'Snapshot']
              ]
            }
          ],
          '/': [
            '/install/',
            '/concepts/',
            '/how-to/',
            '/reference/',
            '/project/',
            {
              title: '案例研究',
              collapsable: true,
              children: [
                ['/case-studies/arbol', 'Arbol'],
                ['/case-studies/audius', 'Audius'],
                ['/case-studies/fleek', 'Fleek'],
                ['/case-studies/likecoin', 'LikeCoin'],
                ['/case-studies/morpheus', 'Morpheus.Network'],
                ['/case-studies/snapshot', 'Snapshot']
              ]
            },
          ]
        }
      }
    }
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
    '@vuepress/plugin-back-to-top',
    ['@adamdehaven/vuepress-plugin-custom-tooltip'],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/ipfs-404.html'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN,
        exclude: ['/ipfs-404.html']
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      '@vuepress/html-redirect',
      {
        duration: 0
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10
      }
    ],
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs',
    'vuepress-plugin-mermaidjs',
    'tabs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
