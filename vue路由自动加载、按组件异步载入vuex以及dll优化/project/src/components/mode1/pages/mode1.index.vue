<template>
  <div>
      mode1_index11
      {{num2}}
  </div>
</template>

<script>
export default {
    name:'mode1Index',
    isVuex:true,
    data(){
        return{
            
        }
    },
    computed:{
        num2(){
            return this.$store.state.mode1Index?this.$store.state.mode1Index.num2:''
        }
    },
    mounted(){
    }
}
</script>

<style>

</style>