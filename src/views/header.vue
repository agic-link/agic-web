<template>
	<el-row id="header">
		<el-col :span="6" class="height logo">
			<div @click="toHome" style="width: 100%; height: 100%;">
				<img src="../assets/img/agic logo2.png" class="logoIcon" />
				<span class="logoTitle">AGIC</span>
			</div>
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
  		var isShow = !this.$route.meta.notHead;
			return {
				activeIndex: "1",
				isShow: isShow
			}
		},
		methods: {
			// 标签切换
			handleSelect(key) {
				console.log(key)
			},
			toHome() {
				this.$router.push({name:'HomeA'});
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
	.logo {
		position: relative;
	}
	.logoIcon {
		width: 2rem;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translate(0, -50%);
	}
	.logoTitle {
		color: #fff;
    padding-left: 4rem;
    font-weight: 600;
    line-height: 3rem;
	}
}
</style>