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
![github地址]()
