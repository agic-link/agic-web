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
            <el-col :lg="{span:8}" :xs="{span:24}">
                <div class="home-button">
                    <el-button type="primary" v-on:click="deposit()">{{ $t('getAgic') }}</el-button>
                    <el-button type="primary" v-on:click="redeem()">{{ $t('redeemEth') }}</el-button>
                    <el-button type="primary" @click="getTransfer()">{{ $t('transfer') }}</el-button>
                    <el-dialog title="交易" :visible.sync="dialogFormVisible" top="30vh" center>
                        <el-form :model="form">
                            <el-form-item :label="$t('recipient')" :label-width="formLabelWidth">
                                <el-input v-model="form.address" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('amount')" :label-width="formLabelWidth">
                                <el-input v-model="form.amount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">{{ $t('prompt.cancel') }}</el-button>
                            <el-button type="primary" @click="transfer()">{{ $t('prompt.determine') }}
                            </el-button>
                        </div>
                    </el-dialog>
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
import {BigNumber} from "bignumber.js"
import config from "@/config/config";

const agic = require('../web3/agic.js')
const StringUtils = require("../util/StringUtils.js")

export default {
    name: 'HomeBody',
    created() {
        if (agic.checkMetamask()) {
            agic.getNetwork((error, result) => {
                if (error != null) {
                    console.error("Body getNetwork Error", error.message);
                    return;
                }
                this.network = new Decimal(result.result).toString();
                window.localStorage.setItem('network', this.network);
                this.agicInstance = agic.createInstance(this.network);
            });
        }
        this.getData();
        ethereum.on('accountsChanged', this.accountsChanged);
        ethereum.on('chainChanged', this.chainChanged);
        ethereum.on('disconnect', this.disconnect);
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
            network: '',
            totalPledgeEth: '0',
            totalSupply: '0',
            walletEth: '0',
            pledgeEth: '0',
            balanceOf: '0',
            interests: '0',
            nowPledgeEth: '0',
            dialogFormVisible: false,
            form: {
                address: '',
                amount: ''
            },
            formLabelWidth: '100px',
            agicInstance: undefined,
            wallet: '',
        }
    },
    methods: {
        disconnect() {
            this.wallel = '';
            this.walletEth = '0';
            this.pledgeEth = '0';
            this.balanceOf = '0';
            this.interests = '0';
            this.nowPledgeEth = '0';
        },
        getData() {
            if (this.agicInstance !== undefined) {
                agic.totalSupply((err, data) => {
                    this.totalSupply = new BigNumber(data).div(1e18).toFixed();
                });
                agic.totalPledgeEth((err, data) => {
                    this.totalPledgeEth = new BigNumber(data).div(1e18).toFixed();
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
                window.localStorage.setItem('wallet', this.wallet);
                this.agicInstance = agic.createInstance(this.network);
                if (StringUtils.isNotBlank(this.wallet) && this.agicInstance !== undefined) {
                    this.getBalanceOf();
                }
            });
        },
        getBalanceOf() {
            this.wallet = window.localStorage.getItem('wallet');
            if (StringUtils.isNotBlank(this.wallet)) {
                agic.getWalletBalance(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    const s = new Decimal(data.result).dividedBy(1e18).toNumber();
                    this.walletEth = new BigNumber(s).toFixed();
                })
            } else {
                this.walletEth = '0';
            }
            if (StringUtils.isNotBlank(this.wallet) && this.agicInstance !== undefined) {
                agic.getBalanceOf(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    const s = new Decimal(data.toNumber()).dividedBy(1e18).toNumber()
                    this.balanceOf = new BigNumber(s).toFixed();
                    this.nowPledgeEth = new BigNumber(s).div(4).toFixed();
                })
                agic.getPledgeEth(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    const s = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                    this.pledgeEth = new BigNumber(s).toFixed();
                })
                agic.getInterestAmount(this.wallet, (error, data) => {
                        if (error != null) {
                            console.log(error);
                            return;
                        }
                        const s = new Decimal(data.toNumber()).dividedBy(1e18).toNumber();
                        this.interests = new BigNumber(s).toFixed();
                    }
                )
            }
        },
        accountsChanged(accounts) {
            this.wallet = accounts[0];
            window.localStorage.setItem('wallet', this.wallet);
            if (StringUtils.isNotBlank(this.wallet) && this.agicInstance !== undefined) {
                this.getBalanceOf();
            } else {
                this.balanceOf = '0';
                this.pledgeEth = '0';
                this.nowPledgeEth = '0';
                this.interests = '0';
            }
        },
        chainChanged(networkId) {
            this.network = new Decimal(networkId).toString();
            window.localStorage.setItem('network', this.network);
            this.agicInstance = agic.createInstance(this.network);
            this.wallet = window.localStorage.getItem('wallet');
            this.getData()
            if (StringUtils.isNotBlank(this.wallet) && this.agicInstance !== undefined) {
                this.getBalanceOf();
            } else {
                this.balanceOf = '0';
                this.pledgeEth = '0';
                this.nowPledgeEth = '0';
                this.interests = '0';
            }
        },
        deposit() {
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
            this.$prompt(this.$t('prompt.content.deposit').toString(), this.$t('prompt.title').toString(), {
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
                    const uri = config.base_url + '/api/deposit';
                    const saveData = {
                        transactionHash: data,
                        created: new Date(),
                        networkId: this.network
                    }
                    this.axios.post(uri, saveData).then((resp) => {
                        console.log("save success, code: ", resp.status);
                    }).catch((error) => {
                        console.log("save error", error);
                    });
                });
            }).catch(() => {
                console.log("cancel deposit")
            });
        },
        redeem() {
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
            this.$prompt(this.$t('prompt.content.redeem').toString(), this.$t('prompt.title').toString(), {
                confirmButtonText: this.$t('prompt.determine'),
                cancelButtonText: this.$t('prompt.cancel'),
                inputPattern: /^[0-9]+(.[0-9]{1,18})?$/,
                inputErrorMessage: this.$t('prompt.inputError'),
                dangerouslyUseHTMLString: true
            }).then(({value}) => {
                agic.getBalanceOf(this.wallet, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    const balanceOf = new Decimal(data.toNumber()).toNumber();
                    const agicValue = new Decimal(value).mul(1e18).toNumber();
                    console.log(agic)
                    if (agicValue > balanceOf) {
                        this.errorMsg(this.$t('error'), this.$t('notSoMuchBalance'));
                        return;
                    }
                    agic.redeem(value, (error, data) => {
                        if (error != null) {
                            console.log(error);
                            return;
                        }
                        this.$message({
                            type: 'success',
                            message: this.$t('submitted') + data,
                            duration: 5000
                        });
                        const uri = config.base_url + '/api/deposit';
                        const saveData = {
                            transactionHash: data,
                            created: new Date(),
                            networkId: this.network,
                            agicAmount: value * 1e18,
                            eth: value / 4 * 1e18,
                        }
                        this.axios.post(uri, saveData).then((resp) => {
                            console.log("save success, code: ", resp.status);
                        }).catch((error) => {
                            console.log("save error", error);
                        });
                    });
                })
            }).catch(() => {
                console.log("cancel redeem")
            });
        },
        getTransfer() {
            this.form.address = '';
            this.form.amount = '';
            this.dialogFormVisible = true;
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
        },
        transfer() {
            this.dialogFormVisible = false;
            if (StringUtils.isBlank(this.wallet)) {
                this.getAccounts();
            }
            const amountPattern = /^[0-9]+(.[0-9]{1,18})?$/;
            const amountRe = new RegExp(amountPattern);
            if (!amountRe.test(this.form.amount)) {
                this.errorMsg(this.$t('error'), this.$t('prompt.inputError'));
                return;
            }
            const addressPattern = /^0x[a-fA-F0-9]{40}$/;
            const addressRe = new RegExp(addressPattern);
            if (!addressRe.test(this.form.address)) {
                this.errorMsg(this.$t('error'), this.$t('prompt.inputError'));
                return;
            }
            agic.getBalanceOf(this.wallet, (error, data) => {
                if (error != null) {
                    console.log(error);
                    return;
                }
                const balanceOf = new Decimal(data.toNumber()).toNumber();
                const amount = new Decimal(this.form.amount).mul(1e18).toNumber();
                if (balanceOf <= amount) {
                    this.errorMsg(this.$t('error'), this.$t('notSoMuchBalance'));
                    return;
                }
                agic.transfer(this.form.address, amount, (error, data) => {
                    if (error != null) {
                        console.log(error);
                        return;
                    }
                    console.log(data);
                    // this.$message({
                    //     type: 'success',
                    //     message: this.$t('submitted') + data,
                    //     duration: 5000
                    // });
                });
            });
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
        width: 90% !important;
    }
    .el-dialog {
        width: 95% !important;
    }
}

.body-name {
    padding-top: 20px;
    text-align: center;
    font-size: 0.5rem;
}

.body-name-introduction {
    padding-top: 15px;
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
    padding-left: 5px;

    .el-button {
        font-size: 0.2rem;
        padding: 0.1rem 0.15rem;
    }

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