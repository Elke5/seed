<template>
	<div>
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>
	export default {
	  provide() { // 注册一个方法
	    return {
	      reload: this.reload
	    }
	  },
	  data() {
	      return {
	        isRouterAlive: true
	      }
	    },
	  methods: {
	      reload() {
	        this.isRouterAlive = false
	        this.$nextTick(function() {
	          this.isRouterAlive = true
	        })
	      },
	    }
	}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
