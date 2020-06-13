<template>
	<el-main id="main">
		<!-- 实时市场数据 -->
		<div class="bazaar">
			<div class="bazaar_item">
				<span class="val">{{(bazaar.average).toFixed(2)}} USDT</span>
				<span class="label">市场均价</span>
			</div>
			<div class="bazaar_item">
				<span class="val just" v-if="bazaar.change >= 0">+{{(bazaar.change).toFixed(2)}}%</span>
				<span class="val lose" v-else>-{{(bazaar.change).toFixed(2)}}%</span>
				<span class="label">24H 变化</span>
			</div>
			<div class="bazaar_item">
				<span class="val">${{(bazaar.volume).toFixed(2)}}</span>
				<span class="label">24H 交易量</span>
			</div>
		</div>
		<!-- 内容 -->
		<el-row style="height: calc( 100% - 2rem )">
			<el-col class="height" :span="8">
				<!-- 订单/历史 -->
	  		<div class="main_left height">
				  <el-tabs v-model="record.tab" @tab-click="recordTab">
				    <el-tab-pane label="订单" name="indent">
				    	
				    </el-tab-pane>
				    <el-tab-pane label="历史" name="history">
				    	
				    </el-tab-pane>
				  </el-tabs>
	  		</div>
			</el-col>
			<el-col class="height" :span="16">
				<!-- 图表 -->
	  		<div class="main_right height">
	  			<span class="title">图标</span>
				  <el-tabs v-model="chart.tab" @tab-click="chartTab">
				    <el-tab-pane label="趋势图" name="tendency">
				    	
				    </el-tab-pane>
				  </el-tabs>
	  		</div>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				// 市场数据集
				bazaar: {
					average: 0,
					change: 0,
					volume: 0
				},
				// 记录数据集
				record: {
					tab: 'indent'
				},
				// 
				chart: {
					tab: 'tendency'
				}
			}
		},
		methods: {
			// 切换记录
			recordTab(tab, event) {
				console.log(tab, event)
			},
			// 切换图表
			chartTab(tab, event) {
				console.log(tab, event)
			},
		}
	}
</script>

<style lang="scss">
#main {
	height: 100%;
	background: $--color-back;
	padding: 0rem;
	font-size: 0.6rem;

	.bazaar {
		width: 100%;
		height: 2rem;
		background: $--color-primary;
		border-bottom: solid 0.05rem $--color-border;
		line-height: 2rem;
		font-size: 0.7rem;

		.bazaar_item {
			display: inline-block;
			vertical-align: middle;
			font-weight: 400;
			margin-left: 1rem;

			.val {
				color: #fff;
				padding-right: 0.5rem;

				&.just {
					color: #36d3c8;
				}
				&.lose {
					color: #e75c56;
				}
			}
			.label {
				color: $--color-gray;
			}
		}
	}
	.height {
		height: 100%;
	}
	.main_left, .main-right {
		box-sizing: border-box;
	}
	.el-tabs__nav {
		float: right;
	}
	.el-tabs__item {
		color: #9fa6ad;
		padding-right: 1rem;
		padding-left: 0rem;
	}
	.el-tabs__item.is-active {
		color: #fff;
	}
	.el-tabs__nav-wrap::after {
		height: 0.05rem;
		background-color: $--color-border;
	}
	.main_left {
		border-right: solid 0.05rem $--color-border;

	}
	.main_right {
		position: relative;

		.title {
			position: absolute;
			top: 0.5rem;
			left: 1rem;
			font-size: 0.7rem;
			color: $--color-gray;
		}
	}
}
</style>