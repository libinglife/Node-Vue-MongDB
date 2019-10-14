<template>
  <div class="child">
    <button @click="down">-</button>
    <button @click="up">+</button>
    <p>{{num}}</p>
  </div>
</template>

<script>
export default {
  name: 'child',
  props:['num'],
  data () {
    return {
      // num:17
    }
  },
  methods:{
      down(){
         this.$emit('parentDown')
      } , 
      up(){
         this.$emit('parentUp')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
