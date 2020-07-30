<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :lg="{span:7}" :xs="{span:12}">
                <div class="body-name">
                    AGIC
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :lg="{span:7}" :xs="{span:24}">
                <div class="body-name-introduction"> {{ $t('shortTitle') }}</div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <div class="body-introduction"> {{ $t('title') }}</div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :lg="{span:4}" :xs="{span:24}">
                <div class="home-button">
                    <el-button type="primary" v-on:click="deposit()">{{ $t('getAgic') }}</el-button>
                    <el-button class="buttons" type="primary" v-on:click="redeem()">{{ $t('redeemEth') }}</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :lg="{span:7}" :xs="{span:22}">
                <div class="agic-table">
                    <table>
                        <tr>
                            <td class="left">{{ $t('pledgeEth') }}</td>
                            <td class="right">{{ totalPledgeEth }}</td>
                        </tr>
                        <tr>
                            <td class="left">{{ $t('totalSupply') }}</td>
                            <td class="right">{{ totalSupply }}</td>
                        </tr>
                    </table>
                </div>
                <div class="xiao">{{ $t('userInfo') }}</div>
                <div class="user-table">
                    <table>
                        <tr>
                            <td class="left">{{ $t('walletBalance') }}</td>
                            <td class="right">{{ walletEth }} ETH</td>
                        </tr>
                        <tr>
                            <td class="left">{{ $t('balance') }}</td>
                            <td class="right">{{ balanceOf }} AGIC</td>
                        </tr>
                        <tr>
                            <td class="left">{{ $t('pledgeEth') }}</td>
                            <td class="right">{{ pledgeEth }} ETH</td>
                        </tr>
                        <tr>
                            <td class="left">{{ $t('nowEth') }}</td>
                            <td class="right">{{ nowPledgeEth }} ETH</td>
                        </tr>
                        <tr>
                            <td class="left">{{ $t('interest') }}</td>
                            <td class="right">{{ interests }} ETH</td>
                        </tr>
                    </table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import {Decimal} from "decimal.js";

const agic = require('../web3/agic.js')
const StringUtils = require("../util/StringUtils.js")

export default {
    name: 'HomeBody',
    created() {
        agic.checkMetamask();
        this.getData();
        ethereum.on('accountsChanged', this.accountsChanged);
        ethereum.on('chainChanged', this.chainChanged);
    },
    mounted() {
        this.timer = setInterval(this.getData, 2000);
        this.balanceOfTimer = setInterval(this.getBalanceOf, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.balanceOfTimer);
    },
    data() {
        return {
            network: 0,
            wallet: '',
            totalPledgeEth: 0,
            totalSupply: 0,
            walletEth: 0,
            pledgeEth: '0',
            balanceOf: '0',
            interests: '0',
            nowPledgeEth: 0,
        }
    },
    methods: {
        getData() {
            if (agic.agicInstance !== undefined) {
                agic.totalSupply((err, data) => {
                    this.totalSupply = data / 1e18;
                });
                agic.totalPledgeEth((err, data) => {
                    this.totalPledgeEth = data / 1e18;
                });
            }
        },
        getAccounts() {
            agic.getAddress((error, result) => {
                if (error != null) {
                    console.log(error.message);
                    return;
                }
                this.wallet = result.result[0];
                agic.createInstance(this.network);
                if (StringUtils.isNotBlank(this.wallet) && agic.agicInstance !== undefined) {
                    this.getBalanceOf();
                }
            });
        },
        getBalanceOf() {
            const wallet = sessionStorage.getItem("wallet");
            if (StringUtils.isBlank(wallet)) {
                return;
            } else {
                this.wallet = wallet;
            }
            if (StringUtils.isNotBlank(this.wallet)) {
                agic.getWalletBalance(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    this.walletEth = new Decimal(data.result).dividedBy(1e18).toNumber();
                })
            }
            if (StringUtils.isNotBlank(this.wallet) && agic.agicInstance !== undefined) {
                agic.getBalanceOf(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    this.balanceOf = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                    this.nowPledgeEth = this.balanceOf / 4;
                })
                agic.getPledgeEth(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    this.pledgeEth = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                })
                agic.getInterestAmount((error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    this.interests = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                })
            }
        },
        accountsChanged(accounts) {
            this.wallet = accounts[0];
            if (StringUtils.isNotBlank(this.wallet) && agic.agicInstance !== undefined) {
                this.getBalanceOf();
            } else {
                this.balanceOf = 0;
                this.pledgeEth = 0;
                this.nowPledgeEth = 0;
                this.interests = 0;
            }
        },
        chainChanged(networkId) {
            this.network = new Decimal(networkId).toNumber();
            agic.createInstance(this.network);
            this.getData()
            if (StringUtils.isNotBlank(this.wallet) && agic.agicInstance !== undefined) {
                this.getBalanceOf();
            } else {
                this.balanceOf = 0;
                this.pledgeEth = 0;
                this.nowPledgeEth = 0;
                this.interests = 0;
            }
        },
        deposit() {
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
            if (this.walletEth !== '') {
                this.$prompt(this.$t('prompt.content').toString(), this.$t('prompt.title').toString(), {
                    confirmButtonText: this.$t('prompt.determine'),
                    cancelButtonText: this.$t('prompt.cancel'),
                    inputPattern: /^[0-9]+(.[0-9]{1,18})?$/,
                    inputErrorMessage: this.$t('prompt.inputError')
                }).then(({value}) => {
                    if (value > this.walletEth) {
                        this.errorMsg(this.$t('error'), this.$t('notSoMuchETH'));
                        return;
                    }
                    agic.doDeposit(value, (err, data) => {
                        if (err != null) {
                            console.log(err)
                            return
                        }
                        this.$message({
                            type: 'success',
                            message: this.$t('submitted') + data,
                            duration: 5000
                        });
                    });
                }).catch(() => {
                    console.log("cancel deposit")
                });
            }
        },
        redeem() {
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
            agic.getBalanceOf(this.wallet, (error, data) => {
                if (error != null) {
                    console.log(error);
                    return;
                }
                const balanceOf = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                if (balanceOf <= 0) {
                    this.errorMsg(this.$t('error'), this.$t('notSoMuchBalance'));
                    return;
                }
                agic.redeem((error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    this.$message({
                        type: 'success',
                        message: this.$t('submitted') + data,
                        duration: 5000
                    });
                });
            })

        },
        errorMsg(title, text) {
            this.$notify.error({
                title: title,
                message: text
            });
        },
    }
}
</script>

<style lang="scss">

@media screen and (max-width: 500px) {
    .el-message-box {
        width: 80% !important;
    }
}

.body-name {
    padding-top: 30px;
    text-align: center;
    font-size: 0.5rem;
}

.body-name-introduction {
    padding-top: 30px;
    text-align: center;
    font-size: 0.3rem;
}

.body-introduction {
    text-align: center;
    font-size: 0.2rem;
    margin: 0;
}

.home-button {

    font-size: 0.25rem;
    padding-top: 0.25rem;

}

.agic-table {
    padding-top: 0.5rem;
    font-size: 0.15rem;

    table {
        width: 100%;
        border-collapse: collapse;
        border-top: 1px solid;
        border-bottom: 1px solid black;

        td {
            border: 0;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
        }

        .left {
            width: 30%;
            text-align: left;
            padding-left: 0.25rem;
            border-right: 1px solid #dbdbdb;
        }

        .right {
            width: 70%;
            text-align: right;
            padding-right: 0.25rem;
        }
    }
}

.user-table {
    padding-top: 0.1rem;
    font-size: 0.15rem;

    table {
        width: 100%;
        border-collapse: collapse;
        border-top: 1px solid;
        border-bottom: 1px solid black;

        td {
            border: 0;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
        }

        .left {
            width: 30%;
            text-align: left;
            padding-left: 0.25rem;
            border-right: 1px solid #dbdbdb;
        }

        .right {
            width: 70%;
            text-align: right;
            padding-right: 0.25rem;
        }
    }
}

.xiao {
    padding-top: 0.3rem;
    font-size: 0.2rem;
    text-align: left;
}
</style>