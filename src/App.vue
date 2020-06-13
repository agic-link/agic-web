<template>
  <div id="app">
    <el-container>
    	<!-- 顶部 -->
    	<el-header>
  			<Header/>
    	</el-header>
    	<router-view/>
    </el-container>
  </div>
</template>

<script>
import Header from './views/header.vue'

export default {
	components: {
		Header
	},
  name: 'App'
}
</script>

<style lang="scss">
#app {
	.el-header {
		padding: 0rem;
	}
}
</style>
