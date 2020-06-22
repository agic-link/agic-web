<template>
  <div id="app">
    <el-container>
    	<!-- 顶部 -->
    	<el-header v-if="isShow">
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
  name: 'App',
  data () {
    var isShow = !this.$route.meta.notHead;
    return {
      isShow: isShow
    }
  },
  watch: {
    $route: {
      handler: function(val){
        this.isShow = !this.$route.meta.notHead;
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
#app {
	.el-header {
		padding: 0rem;
	}
}
</style>
