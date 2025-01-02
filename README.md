# lobechat-plugins

A front-end Vue.js framework for LobeChat plugins. 
This code only contains the front-end code for the plugin.
As backend is written in Python using FastAPI, it is not included in this repository.


## Project Setup

### 1. Install Custom LobeChat SDK
Pull git [submodules](https://github.com/simonwu53/lobechat-plugin-sdk) in `./external` directory:

```sh
git submodule update --init --recursive
```

Install dependencies using [pnpm](https://pnpm.io/) and build the dependency.

```sh
cd external/lobechat-plugin-sdk

pnpm install

pnpm build
```

### 2. Run Commands

```sh
pnpm install
```

#### Compile and Hot-Reload for Development

```sh
pnpm dev
```

#### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
