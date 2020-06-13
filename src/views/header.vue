<template>
	<el-row id="header">
		<el-col :span="6" class="height">
			text
		</el-col>
		<el-col :span="18" class="height">
			<el-menu 
			 	class="height"
				:default-active="activeIndex"
			  mode="horizontal"
			  @select="handleSelect"
			  background-color="#171b1f"
			  text-color="#9fa6ad"
			  active-text-color="#fff">
			  <el-menu-item index="3">
  				<el-button type="primary">连接钱包</el-button>
			  </el-menu-item>
			  <el-menu-item index="2">账户</el-menu-item>
			  <el-menu-item index="1">交易</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: "1"
			}
		},
		methods: {
			// 标签切换
			handleSelect(key) {
				console.log(key)
			}
		}
	}
</script>

<style lang="scss">
#header {
	height: 3rem;
	background: $--color-primary;
	border-bottom: solid 0.05rem $--color-border;

	.el-menu--horizontal>.el-menu-item {
		float: right;
		height: calc( 100% - 0.05rem );
	}
	.el-menu.el-menu--horizontal {
		border: none;
	}
	.height {
		height: 100%;
	}
}
</style>