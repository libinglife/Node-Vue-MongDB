<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <chird :num='test' @parentDown ="parentDown1" @parentUp ="parentUp1"></chird>

    <p >parent:{{test}}</p>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>

import chird from './Chird.vue'

export default {
  name: 'HelloWorld',
  components:{
  	chird
  },
  data () {
    return {
      msg: 'Welcome to Your App',
      test:10
    }
  },
  methods:{
  	parentDown1(){
       this.test--
      
  	},
  	parentUp1(){
       this.test++
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
