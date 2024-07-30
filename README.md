# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

```
bdit_bigDataWeb
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api
│  │  ├─ businessOperationReport
│  │  │  └─ index.ts
│  │  ├─ common
│  │  │  └─ index.ts
│  │  ├─ financeReport
│  │  │  └─ index.ts
│  │  ├─ hr
│  │  │  └─ index.ts
│  │  ├─ hrReport
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  ├─ job
│  │  │  └─ index.ts
│  │  ├─ operation
│  │  │  └─ index.ts
│  │  ├─ projectReport
│  │  │  └─ index.ts
│  │  ├─ recruitReport
│  │  │  └─ index.ts
│  │  └─ userList
│  │     └─ index.ts
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ CountTo.vue
│  │  │  ├─ EchartsCard.vue
│  │  │  ├─ ParticleEffect.vue
│  │  │  ├─ Progress.vue
│  │  │  ├─ Progress2.vue
│  │  │  └─ SelectTabs.vue
│  │  ├─ financeReport
│  │  │  ├─ CardTree.vue
│  │  │  └─ TopBox.vue
│  │  ├─ HelloWorld.vue
│  │  ├─ hr
│  │  │  ├─ FeeCard.vue
│  │  │  └─ SimpleCard.vue
│  │  ├─ job
│  │  │  └─ Card.vue
│  │  ├─ operation
│  │  │  ├─ Card.vue
│  │  │  ├─ HeadCard.vue
│  │  │  ├─ LampIcon.vue
│  │  │  └─ SimpleCard.vue
│  │  └─ recruitReport
│  │     ├─ BaseLine.vue
│  │     ├─ Circle.vue
│  │     ├─ Circle2.vue
│  │     ├─ Circle3.vue
│  │     ├─ ColNumBox.vue
│  │     ├─ HeaderNumBox.vue
│  │     ├─ LightRankingCard.vue
│  │     └─ ProcessTable.vue
│  ├─ constants
│  │  ├─ financeReport
│  │  │  └─ index.ts
│  │  ├─ hrReport
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  ├─ localStorageKeys
│  │  └─ sessionStorageKeys
│  │     └─ index.ts
│  ├─ env.d.ts
│  ├─ icon
│  │  └─ Exit.vue
│  ├─ main.ts
│  ├─ routers
│  │  └─ index.ts
│  ├─ store
│  │  └─ index.ts
│  ├─ types
│  │  ├─ businessOperationRt
│  │  │  └─ index.ts
│  │  ├─ common
│  │  │  └─ Index.ts
│  │  ├─ financeReport
│  │  │  └─ index.ts
│  │  ├─ hr
│  │  │  └─ index.ts
│  │  ├─ hrReport
│  │  │  └─ index.ts
│  │  ├─ job
│  │  │  └─ index.ts
│  │  ├─ operation
│  │  │  └─ Index.ts
│  │  ├─ projectReport
│  │  │  └─ index.ts
│  │  └─ recruitReport
│  │     └─ index.ts
│  ├─ utils
│  │  ├─ base64.ts
│  │  ├─ http.ts
│  │  ├─ particleUtil.ts
│  │  ├─ requestAnimationFrame.ts
│  │  └─ storage.ts
│  └─ view
│     ├─ bigScreen
│     │  ├─ hr
│     │  │  └─ Index.vue
│     │  ├─ Index.vue
│     │  ├─ job
│     │  │  └─ Index.vue
│     │  └─ operation
│     │     └─ Index.vue
│     ├─ businessOperationReport
│     │  └─ Index.vue
│     ├─ financeReport
│     │  ├─ cost
│     │  │  └─ index.vue
│     │  ├─ income
│     │  │  └─ Index.vue
│     │  ├─ Index.vue
│     │  └─ result
│     │     └─ Index.vue
│     ├─ home
│     │  └─ Index.vue
│     ├─ hrReport
│     │  └─ Index.vue
│     ├─ layout
│     │  ├─ Index.vue
│     │  ├─ LeftMenu.vue
│     │  ├─ SubMenuItem.vue
│     │  └─ TestTSX.tsx
│     ├─ login
│     │  └─ Index.vue
│     ├─ projectReport
│     │  └─ Index.vue
│     ├─ recruitReport
│     │  └─ Index.vue
│     └─ userList
│        └─ Index.vue
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ yarn.lock
└─ _gitignore

```