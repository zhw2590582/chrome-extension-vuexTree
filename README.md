# chrome-extension-vuexTree

一个Chrome扩展，为 [Vuex](https://github.com/vuejs/vuex) 实现类似 [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) 的状态树展示效果


## 预览
来自 [vue2-elm](https://github.com/bailicangdu/vue2-elm)

<img src='https://raw.githubusercontent.com/zhw2590582/chrome-extension-vuexTree/master/preview01.gif' width='800px'>


## 使用
在 “Chrome => 选项 => 更多工具” 中勾选 “开发者模式”。

直接拖放 vuexTree.crx 到插件目录。

或者在 "加载已解压的扩展程序" 中载入 "vuexTree" 目录。

然后在 Vue 中,在 store 后面添加一个订阅消息即可。
```js
import store from './store';

store.subscribe((mutation, state) => {
  window.__VUEXTREE_GLOBAL_HOOK__ && window.__VUEXTREE_GLOBAL_HOOK__({
    type: '@update',
    mutation,
    state
  });
})

```

## 开发

安装依赖
```sh
$ npm install
```

开发模式：生成 'dev' 目录
```sh
$ npm run dev
```

打包发布：生成 'vuexTree' 目录
```sh
$ npm run build
```

## 依赖
[d3-state-visualizer](https://github.com/romseguy/d3-state-visualizer)
