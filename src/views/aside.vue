<template>
	<el-aside width="100%" id="aside">
		<div class="title">交易</div>
		<!-- 价格 -->
		<div>
			<el-table
      :data="tableData"
      class="table">
	      <el-table-column
	        prop="balance"
	        label="余额">
	      </el-table-column>
	      <el-table-column
	      	v-for="item in tableHead"
	      	:key="item.key"
	        :prop="item.key"
	        :label="item.label">
	        <template slot-scope="scope">{{(scope.row[item.key]).toFixed(4)}}</template>
	      </el-table-column>
	    </el-table>
		</div>
		<!-- 选项 -->
		<div class="form card">
	    <el-radio-group v-model="formType" style="width: 100%;">
	      <el-radio-button label="做多"></el-radio-button>
	      <el-radio-button label="做空"></el-radio-button>
	    </el-radio-group>
	    <div class="form_label">
	    	<span class="number">数量({{(bazaar.max).toFixed(4)}} Max)</span>
	    	<span class="max" @click="setMax">Max</span>
	    </div>
		  <el-input placeholder="输入数量" v-model="form.num">
		    <template slot="append">{{bazaar.label}}</template>
		  </el-input>
		</div>
		<!-- 介绍 -->
		<div class="intro card">
			<div class="intro_item">
				<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
		      <div class="text">{{bazaar.label}} 价格</div>
		    </el-tooltip>
				<span>{{(bazaar.price).toFixed(2)}} USDT</span>
			</div>
			<div class="intro_item">
				<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
		      <div class="text">最大滑点</div>
		    </el-tooltip>
				<span>{{(bazaar.maxSlippage).toFixed(2)}} %</span>
			</div>
			<div class="intro_item">
				<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
		      <div class="text">利率</div>
		    </el-tooltip>
				<span>{{(bazaar.interest).toFixed(2)}} % 年利率</span>
			</div>
			<div class="intro_item">
				<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
		      <div class="text">抵押保证金</div>
		    </el-tooltip>
				<span>{{(bazaar.mortgageMargin).toFixed(2)}} USDT</span>
			</div>
			<div class="intro_item">
				<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
		      <div class="text">清算价格</div>
		    </el-tooltip>
				<span>{{(bazaar.clearingPrice).toFixed(2)}} USDT</span>
			</div>
		</div>
		<!-- 按钮 -->
  	<div class="btn">
  		<el-button type="primary" @click="submit">{{formType}} {{bazaar.label}}</el-button>
  	</div>
	</el-aside>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						balance: '钱包',
						ETH: 0,
						USDT: 0
					}
				],
				tableHead: [
					{
						key: 'ETH',
						label: 'ETH'
					},
					{
						key: 'USDT',
						label: 'USDT',
					}
				],
				formType: '做多',
				// 提交的数据集
				form: {
					type: '',
					num: 0
				},
				// 页面数据集
				bazaar: {
					id: 'ETH',
					label: 'ETH',
					max: 0,
					price: 0,
					maxSlippage: 0,
					interest: 0,
					mortgageMargin: 0,
					clearingPrice: 0
				}
			}
		},
		watch: {
			formType(val) {
				if (val == '做多') {
					this.form.type = 'up'
				}
				if (val == '做空') {
					this.form.type = 'down'
				}
			}
		},
		methods: {
			// 设置购买数量最大
			setMax() {
				this.form.num = this.bazaar.max;
			},
			// 提交
			submit() {

			}
		}
	}
</script>

<style lang="scss">
#aside {
	height: 100%;
	background: $--color-primary;
	box-sizing: border-box;
	border-right: solid 0.05rem $--color-border;

	* {
		font-size: 0.6rem;
	}

	.card {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;

		&:not(:last-child) {
			border-bottom: solid 0.05rem $--color-border;
		}
	}
	.form_label {
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		position: relative;

		.number	{
			color: $--color-gray;
		}
		.max {
			position: absolute;
			top: 50%;
			right: 0rem;
			transform: translate(0, -50%);
			color: $--color-gray;
			cursor: pointer;

			&:hover {
				color: #fff;
			}
		}
	}
	.table {
		width: 100%;
		background: none;
		border-bottom: solid 0.05rem $--color-border;

		&.el-table::before {
			display: none;
		}
		td, th, tr, tbody {
			background: none;
			border: none;
		}
		td {
			color: #fff;

			&:first-child {
				color: $--color-gray;
			}
		}
	}
	.form {

		input {
			background: $--color-input;
			border-color: $--color-border;
			border-right: none;
			color: #fff;
		}

		.el-input-group__append {
			background: none;
			border-left: none;
			border-color: $--color-border;
			background: $--color-input;
		}
		.el-radio-button {
			width: 50%;

			&:not(.is-active) {
				.el-radio-button__inner {
					background: $--color-primary;
				}
			}
			.el-radio-button__inner {
				width: 100%;
				border-color: $--color-border;
			}
		}
	}
	.intro {
		.intro_item {
			position: relative;
			line-height: 1.2rem;
			color: $--color-gray;

			span {
				position: absolute;
				top: 50%;
				right: 0rem;
				transform: translate(0, -50%);
				color: #fff;
			}

			.text {
				display: inline-block;
			}
		}
	}
	.btn {
		text-align: center;
		margin-top: 1rem;

		button {
			width: 90%;
		}
	}
}
</style>