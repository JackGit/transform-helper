<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TransformHelper from 'transform-helper'

export default {
  name: 'app',

  components: {
    HelloWorld
  },

  mounted () {
    window.t = new TransformHelper()
    t.transform({ top: 100, left: 100, width: 100, height: 100 })
    t.activate(['move', 'resize', 'rotate'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
