# A LIGHT Vue3 Starter Admin Template.

<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
	<img src="https://img.shields.io/badge/-Windicss-blue?logo=Windicss&logoColor=white">
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white">
	<img src="https://img.shields.io/badge/-ElementPlus-blue?logo=ElementPlus&logoColor=white">
<p> 

This template should help get you started developing with Vue 3, Pinia, WindiCSS, Mqtt and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs.

![image](https://github.com/tommy44458/vue3-vite-pinia-windi-mqtt-starter/blob/main/src/assets/demo_page1.png)

### Check out the [Online DEMO](https://vue3-vite-pinia-windi-mqtt-starter.vercel.app/).

```sh
// login info
Account: tommy
Password: tommy
```

## This starter template includes:

-   [Vue 3](https://vuejs.org/guide/introduction.html)
-   [Vite](https://vitejs.dev/guide/)
-   [Pinia](https://pinia.vuejs.org/)
-   [WindiCSS](https://windicss.org/)
-   [Vue Router](https://github.com/vuejs/router)
-   [ElementPlus UI](https://element-plus.org/en-US/)
-   [Stylus](https://github.com/stylus/stylus)
-   [Stylelint](https://github.com/stylelint/stylelint)
-   [Eslint](https://eslint.org/)
-   [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript)
-   [mqtt-vue-hook](https://github.com/tommy44458/mqtt-vue-hook)

## Collaboration-code specification
Many tech teams generally use [Airbnb](https://github.com/airbnb/javascript) to constrain code specifications at present.
- Through `pre-commit` to implement  lint check,unit test,code formatting,etc.。 
- Combined with the VsCode（formatting automatically when saving：editor.formatOnSave: true）
- Combined with the Git hooks（execute before commit：pre-commit => yarn lint）
- IDE configuration（`.editorconfig`）,ESLint configuration（`.eslintrc.js` 和 `.eslintignore`）,StyleLint configuration（`.stylelintrc`, `.stylelintignore`）,for details, please refer to the corresponding configuration file。  

Close code specification 
add `.eslintignore`  and  `.stylelintignore`  to `src/`  directory respectively to ignore 

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Getting Started

#### Install

```sh
yarn install
```

#### Dev

```sh
yarn dev
```

#### Build

```sh
yarn build
```

#### Syntax check

```sh
// eslint
yarn lint
// stylelint
yarn lint:style
```
