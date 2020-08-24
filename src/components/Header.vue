<template>
    <div>
        <el-row type="flex">
            <el-col :lg="{span:3,offset:2}" :xs="{span:12,offset:1}">
                <img src="../assets/logo.png" class="img" alt="logo"/>
                <div class="header-title">AGIC</div>
            </el-col>
            <el-col :lg="{span:4,offset:14}" :xs="{span:10,offset:0}">
                <div class="link-wallet-button">
                    <div v-show="wallet!==''">{{ shortWallet }}</div>
                    <div class="float-right" v-show="wallet!==''">{{ networkName }}</div>
                    <div class="yuan float-right" v-show="wallet!==''"></div>
                    <el-button v-show="wallet===''" type="primary" v-on:click="getAccounts()">
                        {{ $t('linkWallet') }}
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :lg="{span:10,offset:7}" :xs="{span:20,offset:2}">
                <div class="router">
                    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                        <el-tab-pane :label="$t('tab.index')" name="zhu"></el-tab-pane>
                        <el-tab-pane :label="$t('tab.history')" name="history"></el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

const agic = require('../web3/agic.js')
const StringUtils = require("../util/StringUtils.js")
import {Decimal} from 'decimal.js';

export default {
    name: 'Header',
    created() {
        agic.checkMetamask();
        ethereum.on('accountsChanged', this.accountsChanged);
        ethereum.on('chainChanged', this.chainChanged);
        ethereum.on('disconnect', this.disconnect);
    },
    data() {
        return {
            wallet: '',
            network: '',
            networkName: '',
            shortWallet: '',
            activeName: 'zhu'
        }
    },
    methods: {
        accountsChanged(accounts) {
            this.wallet = accounts[0] == null ? '' : accounts[0];
            this.shortWallet = StringUtils.shortenKey(this.wallet);
        },
        chainChanged(networkId) {
            this.network = new Decimal(networkId).toString();
            this.networkName = agic.getNetworkName(this.network);
        },
        getAccounts() {
            agic.getAddress((error, result) => {
                if (error != null) {
                    console.log(error.message);
                    return;
                }
                this.wallet = result.result[0];
                this.shortWallet = StringUtils.shortenKey(this.wallet);
                this.$emit("headerWallet", this.wallet);
                agic.getNetwork((error, result) => {
                    if (error != null) {
                        console.error(error.message);
                        return;
                    }
                    this.network = new Decimal(result.result).toString();
                    this.networkName = agic.getNetworkName(this.network);
                });
            });
        },
        disconnect() {
            console.log("断开连接")
            this.wallel = '';
            this.shortWallet = '';
        },
        handleClick(tab) {
            console.log(tab.name)
        }
    }
}
</script>

<style lang="scss">
.link-wallet-button {
    font-size: 15px;
    text-align: right;

    .yuan {
        width: 12px;
        height: 12px;
        background-color: #06f386;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        margin-top: 3px;
    }

    .float-right {
        float: right;
        margin-right: 3px;
    }
}

.router {
    font-size: 20px;
    text-align: center;
}

.img {
    float: left;
    width: 50px;
}

.header-title {
    font-weight: bold;
    padding-top: 7px;
    font-size: 25px;
    float: left;
}
</style>