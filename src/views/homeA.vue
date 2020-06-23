<template>
	<div id="www">
		<div class="content">
			<div class="title">
				<div class="logo">
					<img src="../assets/img/agic logo2.png">
					<span class="logo_title">AGIC</span>
				</div>
			</div>
			<div class="txt">
				<div class="logo_name">
					<p>AGIC</p>
					<p>交易平台</p>
				</div>
				<div class="logo_name_inro">
					智能合约赋能的去中心杠杆交易平台，5倍杠杆，看涨看跌以太坊，随存随取，每秒赚利息
				</div>
				<div class="buttons">
  				<el-button type="primary">开始交易</el-button>
				</div>
			</div>
			<div class="intro">
				<img src="../assets/img/intro.png" />
			</div>
			<div class="item">
				<div class="item_title">借款，贷款，交易</div>
				<div class="item_text">
					<img src="" />
					<span class="item_name">借款：</span>
					<span class="item_text_span">通过杠杆交易功能，增大收益。</span>
				</div>
				<div class="item_text">
					<img src="" />
					<span class="item_name">借款：</span>
					<span class="item_text_span">通过杠杆交易功能，增大收益。</span>
				</div>
				<div class="item_text">
					<img src="" />
					<span class="item_name">借款：</span>
					<span class="item_text_span">通过杠杆交易功能，增大收益。</span>
				</div>
				<div class="buttons">
  				<el-button type="primary" @click="toPlay">开始交易</el-button>
				</div>
			</div>
			<div class="item">
				<div class="item_title">开始交易</div>
				<div class="buttons">
 					<el-button type="primary" @click="toPlay">主要按钮</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ABI from '@/config/ABI.json'
import { AGRE_ADDRESS } from '@/config/index'
import { contractInstance } from '@/util/contractInstance'

	export default {
		data() {
    // console.log(ABI)

			return {
				activeIndex: "1"
			}
		},
		created() {
			this.getMetacoin();
		},
		methods: {
			// 标签切换
			handleSelect(key) {
				console.log(key)
			},
			toPlay() {
				this.$router.push({name:'Home'});
			},
	    // 调用合约合约对象
	    getMetacoin() {
	    	console.log(contractInstance.methods.totalPledgeEth)
	    	// contractInstance.at()
	    }
	  }
	}
</script>

<style lang="scss">
.el-container {
	background: #282c34;
	overflow-y: scroll;
}
#www {
	width: 100%;
	box-sizing: border-box;

	.content {
		width: 54rem;
		margin: auto;

		&>div {
			margin-bottom: 4rem !important;
		}

		.title {
			width: 100%;
			margin-bottom: 2rem;

			.logo {
				img {
					width: 2rem;
					vertical-align: middle;
				}
				.logo_title {
					color: #fff;
			    padding-left: 1rem;
			    font-weight: 600;
			    line-height: 3rem;
				}
			}
		}
		.txt {
			width: 30rem;;

			.logo_name {
				p {
					font-size: 2rem;
					font-weight: 600;
					color: #fff;
					margin: 1rem 0rem;
				}
			}
			.logo_name_inro {
				color: #aab2b6;
				margin-bottom: 1rem;
			}
		}
		.intro {
			width: 100%;

			img {
				width: 100%;
			}
		}
		.item {
			width: 50%;
			margin: auto;

			.item_title {
				font-size: 2rem;
				font-weight: 600;
				color: #fff;
				margin-bottom: 1rem;
			}
			.item_text {

				.item_name {
					font-size: 1.5rem;
					color: #fff;
					font-weight: 500;
				}
				.item_text_span {
					font-size: 1.5rem;
					color: #aab2b6;
					font-weight: 400;
				}
			}
			.buttons {
				margin-top: 1rem;
			}
		}
	}
}
</style>