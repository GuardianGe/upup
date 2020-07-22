var vuexState = {
    install (vue){
        vue.minxi({
            beforeCreate(){
                if(this.$option.isVuex){
                    import ("../store/module"+name).then((res)=>{
                        //this.$store.reisterModule(this.$option)
                    })
                }
            }
        })
    }
}