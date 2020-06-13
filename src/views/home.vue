<template>
  <el-row id="home">
  	<!-- 侧边栏 -->
  	<el-col class="height" :span="6">
  		<Aside/>
		</el-col>
  	<!-- 主内容 -->
  	<el-col class="height" :span="18">
  		<Main/>
		</el-col>
  </el-row>
</template>

<script>
import Aside from './aside.vue'
import Main from './main.vue'

export default {
	components: {
		Aside, Main
	},
}
</script>

<style lang="scss" scoped>
#home {
	height: calc( 100% - 3rem);
}
.height {
	height: 100%
}
</style>