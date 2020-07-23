### 一、vue路由自动加载
#### 思路
使用统一规则命名路由文件名，通过webpack方法require.context方法对文件进行读取，动态生成路由数据

#### 使用方法
```
//param(路径，是否遍历子文件夹内文件，匹配文件正则)
let r = require.context('./pages',true,/.vue/)
r.keys()//返回遍历的文件路径数组
r(key).default//路由文件输出内容
```

### 二、按组件异步载入vuex
#### 思路
按module划分store，在组件中定义变量标记是否需要vuex管理状态。
使用vue插件方式，在插件用使用Vue.mixin方法全局注入组件
在beforeCreate钩子中判断变量，动态引入并注册（store.registerModule）store

#### 核心代码
```
var vuexState = {
    install (vue){
        vue.mixin({
            beforeCreate:function(){
                if(this.$options.isVuex){
                    let name = this.$options.name
                    import("../store/module/"+name).then((res)=>{
                        this.$store.registerModule(name,res.default)//注册模块名称、注册store
                    })
                }
            }
        })
    }
}
export default vuexState
```

### 三、dll打包优化
#### 思路
使用webpack.DllPlugin将第三方包进行预处理
使用webpack.DllReferencePlugin在正式打包时配置不需要处理的第三方包

#### 相关代码
webpack.dll.js
```
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry:{
        vendor:['vue/dist/vue.esm.js','vue-router']
    },
    output:{
        path:path.join(__dirname,'./static/js'),
        filename:'[name].dll.js',
        library:'[name]_library'
    },
    plugins:[
        new webpack.DllPlugin({
            path:path.join(__dirname,'.','[name]-manifest.json'),
            name:'[name]_library'
        })
    ]
}
```
webpack.prod.conf.js
```
webpack.DllReferencePlugin({
  contet:path.join(__dirname,"..")
  manifest:require("./vendor-manifest.json")
})
```
#### 引用
[github地址](https://github.com/GuardianGe/upup/tree/master/%E8%B7%AF%E7%94%B1%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD)
