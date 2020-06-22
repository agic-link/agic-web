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
					    <div class="listBox">
					    	<div class="list_title">
					    		<div class="title_item">数量</div>
					    		<div class="title_item">价格</div>
					    		<div class="title_item">我的</div>
					    	</div>
					    	<div class="list_content">
					    		<div class="list_item" v-for="(item, idx) in record.list" :key="idx">
					    			<div class="list_item_text">{{item.number.toFixed(4)}}</div>
					    			<div class="list_item_text" :class="item.tendency == 'up' ? 'just' : 'lose'">{{item.pirce.toFixed(2)}}</div>
					    			<div class="list_item_text">{{item.my.toFixed(2) || '-'}}</div>
					    		</div>
					    	</div>
					    </div>
				    </el-tab-pane>
				    <el-tab-pane label="历史" name="history">
					    <div class="listBox">
					    	<div class="list_title">
					    		<div class="title_item">数量</div>
					    		<div class="title_item">价格</div>
					    		<div class="title_item">时间</div>
					    	</div>
					    	<div class="list_content">
					    		<div class="list_item" v-for="(item, idx) in history.list" :key="idx">
					    			<div class="list_item_time" v-if="idx == 0 || (item.times.day != history.list[idx-1].times.day)">{{item.times.month}} {{item.times.day}}, {{item.times.year}}</div>
					    			<div class="list_item_text">{{item.number.toFixed(4)}}</div>
					    			<div class="list_item_text" :class="item.tendency == 'up' ? 'just' : 'lose'">
					    				{{item.pirce.toFixed(2)}}
					    				<img v-if="item.tendency == 'up'" src="../assets/img/right-top.png"/>
					    				<img v-if="item.tendency == 'down'" src="../assets/img/right-bottom.png"/>
					    			</div>
					    			<div class="list_item_text item_hour">{{item.times.hour}}:{{item.times.minute}}</div>
					    		</div>
					    	</div>
					    </div>
				    </el-tab-pane>
				  </el-tabs>
	  		</div>
			</el-col>
			<el-col class="height" :span="16">
	  		<div class="main_right height">
					<!-- 图表 -->
	  			<div class="chartBox" ref="chartBox" v-loading="isTradingViewLoading"
					    element-loading-spinner="el-icon-loading"
					    element-loading-background="rgba(0, 0, 0, 0.8)">
	  				<span class="title">图表</span>
					  <el-tabs v-model="chart.tab" @tab-click="chartTab">
					    <el-tab-pane label="趋势图" name="tendency">
					    	<!-- TradingView Widget BEGIN -->
								<div class="tradingview-widget-container">
								  <div id="tradingview"></div>
								</div>
							<!-- TradingView Widget END -->
					    </el-tab-pane>
					  </el-tabs>
	  			</div>
	  			<div class="shipping">
	  				<div class="text">仓位</div>
	  				<div class="list"></div>
	  			</div>
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
					tab: 'indent',
					list: []
				},
				// 历史数据集
				history: {

				},
				// 图表
				chart: {
					tab: 'tendency'
				},
				// 仓位
				shipping: {

				},
				// 显示图表
				isTradingViewLoading: true
			}
		},
		created() {
			this.getRecord();
			this.getHistory();
		},
		mounted() {
			this.$nextTick(() =>{
				this.createTradingView();
				console.log('3333')
				this.isTradingViewLoading = false;
			})
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
			// 获取记录
			getRecord() {
				this.record.list = [
					{
						number: 12.56,
						pirce: 238.56,
						my: 222.23,
						tendency: 'up',
						info: {
							sale: 224.56,
							expenditur: 256.23,
							average: 253.41
						}
					},
					{
						number: 12.56,
						pirce: 238.56,
						my: 222.23,
						tendency: 'down',
						info: {
							sale: 224.56,
							expenditur: 256.23,
							average: 253.41
						}
					}
				]
			},
			// 获取历史
			getHistory() {
				let list = [
					{
						number: 22,
						pirce: 235.56,
						tendency: 'up',
						time: 1592096300122
					},
					{
						number: 22,
						pirce: 235.56,
						tendency: 'up',
						time: 1592096300122
					},
					{
						number: 22,
						pirce: 235.56,
						tendency: 'down',
						time: 1592013600000
					}
				];

				list.map(item => {
					let date = new Date(item.time);
					let year = date.getFullYear();
					let monthN = date.getMonth();
					let day = date.getDate();
					let hour = date.getHours();
					let minute = date.getMinutes();
					let monthList = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ];
					let month = monthList[monthN] + '月';

					hour = hour < 10 ? ('0' + hour) : hour;
					minute = minute < 10 ? ('0' + minute) : minute;

					item.times = {
						year,
						month,
						day,
						hour,
						minute
					};
				})

				this.history.list = list;
			},
			// 镶入图表
			createTradingView() {
				let height= parseInt(this.$refs.chartBox.offsetHeight) - 40;
				let width= this.$refs.chartBox.offsetWidth;

				new TradingView.widget(
				  {
					  "width": width,
					  "height": height,
					  "symbol": "NASDAQ:AAPL",
					  "interval": "D",
					  "timezone": "Etc/UTC",
					  "theme": "light",
					  "style": "1",
					  "locale": "zh_CN",
					  "toolbar_bg": "#f1f3f6",
					  "enable_publishing": false,
					  "allow_symbol_change": true,
					  "container_id": "tradingview"
					}
			  );
			}
		}
	}
</script>

<style lang="scss">
#main {
	height: 100%;
	background: $--color-back;
	padding: 0rem;
	font-size: 0.6rem;

	.just {
		color: #36d3c8 !important;
	}
	.lose {
		color: #e75c56 !important;
	}
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
			}
			.label {
				color: $--color-gray;
			}
		}
	}
	.el-tabs__header {
		margin-bottom: 0rem;
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
		.chartBox {
			height: 60%;
			position: relative;
			border-bottom: solid 0.05rem $--color-border;
		}
		.shipping {
			height: 40%;

			.text {
				border-bottom: solid 0.05rem $--color-border;
				height: 2rem;
				width: 100%;
				box-sizing: border-box;
				padding: 0.5rem 1rem;
				font-size: 0.7rem;
				color: $--color-gray;
			}
			.list {

			}
		}
	}
	.listBox {
		width: 100%;

		.list_title {
			color: $--color-gray;
			padding: 0.5rem 0rem;

			.title_item {
				display: inline-block;
				width: 33.33%;
				text-align: right;
				box-sizing: border-box;
				padding: 0rem 0.5rem;
			}
		}
		.list_content {
			.list_item {
				padding: 0.5rem 0rem;

				.list_item_text {
					display: inline-block;
					width: 33.33%;
					text-align: right;
					box-sizing: border-box;
					padding: 0rem 0.5rem;
					color: #fff;

					img {
						width: 1rem;
						height: 1rem;
						vertical-align: middle;
					}
				}
				.list_item_time {
					padding-bottom: 0.5rem;
					width: 100%;
					text-align: center;
					color: $--color-gray;
				}
				.item_hour {
					color: $--color-gray;
				}
			}
		}
	}
}
</style>