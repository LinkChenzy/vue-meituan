# nuxt-learn

> Nuxt.js project

## Build Setup

``` bash
# install @vue/cli
$ npm install -g @vue/cli
# OR
$ yarn global add @vue/cli
# install koa-template
$ vue init nuxt-community/koa-template <project-name>

# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev # Or yarn run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Question
```bash
# 1.in ./server/index.js** Module build failed: Error: Plugin/Preset files are not allowed to export objects, only functions. In /Users/ygh/stack/source/chapter-5/node_modules/backpack-core/babel.js
# 解决方案 最新版本的nuxt有问题，降低到1.4.2
$ yarn remove nuxt
$ yarn add nuxt@1.4.2
```

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
