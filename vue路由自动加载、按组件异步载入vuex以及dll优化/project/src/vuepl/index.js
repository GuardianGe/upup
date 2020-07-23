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