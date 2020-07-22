### 思路
使用统一规则命名路由文件名，通过webpack方法require.context方法对文件进行读取，动态生成路由数据

### 使用方法
```
//param(路径，是否遍历子文件夹内文件，匹配文件正则)
let r = require.context('./pages',true,/.vue/)
r.keys()//返回遍历的文件路径数组
r(key).default//路由文件输出内容
```
#### 引用
[github地址](### 思路
使用统一规则命名路由文件名，通过webpack方法require.context方法对文件进行读取，动态生成路由数据

### 使用方法
```
//param(路径，是否遍历子文件夹内文件，匹配文件正则)
let r = require.context('./pages',true,/.vue/)
r.keys()//返回遍历的文件路径数组
r(key).default//路由文件输出内容
```
#### 引用
[github地址](https://github.com/GuardianGe/upup/tree/master/%E8%B7%AF%E7%94%B1%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD)
)
