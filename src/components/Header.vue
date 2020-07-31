<template>
    <el-row type="flex">
        <el-col :lg="{span:3,offset:2}" :xs="{span:12,offset:1}">
            <img src="../assets/logo.png" class="img" alt="logo"/>
            <div class="header-title">AGIC</div>
        </el-col>
        <el-col :lg="{span:4,offset:13}" :xs="{span:10,offset:0}">
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
    },
    data() {
        return {
            wallet: '',
            network: '',
            networkName: '',
            shortWallet: ''
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
            sessionStorage.setItem("network", this.network);
        },
        getAccounts() {
            agic.getAddress((error, result) => {
                if (error != null) {
                    console.log(error.message);
                    return;
                }
                this.wallet = result.result[0];
                this.shortWallet = StringUtils.shortenKey(this.wallet);
                sessionStorage.setItem("wallet", this.wallet);
                agic.getNetwork((error, result) => {
                    if (error != null) {
                        console.error(error.message);
                        return;
                    }
                    this.network = new Decimal(result.result).toString();
                    this.networkName = agic.getNetworkName(this.network);
                    sessionStorage.setItem("network", this.network);
                });
            });
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