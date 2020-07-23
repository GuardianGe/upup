<template>
  <div>
      mode1_second
      {{num2}}
  </div>
</template>

<script>
export default {
    name:'mode1Second',
    isVuex:true,
    data(){
        return{
            
        }
    },
    computed:{
        num2(){
          console.log(this.$store)
            return this.$store.state.mode1Second?this.$store.state.mode1Second.num2:''
        }
    },
}
</script>

<style>

</style>