<template>
    <div>
        <el-row type="flex">
            <el-col :lg="{span:2,offset:21}" :xs="{span:20,offset:2}">
                <div class="router2">
                    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" tab-position="bottom">
                        <el-tab-pane label="质押" name="DEPOSIT"></el-tab-pane>
                        <el-tab-pane label="赎回" name="REDEEM"></el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :lg="{span:20,offset:2}" :xs="{span:20,offset:2}">
                <div class="deposit" v-show="activeName==='DEPOSIT'" style="width: 100%;">
                    <el-table :data="tableData" @cell-click="cellClick">
                        <el-table-column prop="created" label="时间" width="180"></el-table-column>
                        <el-table-column prop="value" label="eth数量" width="180"></el-table-column>
                        <el-table-column prop="agicValue" label="agic数量" width="180"></el-table-column>
                        <el-table-column prop="transactionHash" label="交易">
                            <template slot-scope="scope">
                                <a style="cursor:pointer;">{{ scope.row.transactionHash }}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination layout="prev, pager, next" :total="depositTotal" :background="true"
                                   :current-page="depositNowPage" :page-size="10" :page-count="depositPages"
                                   @current-change=""
                                   style="padding-top: 20px">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :lg="{span:20,offset:2}" :xs="{span:20,offset:2}">
                <div class="redeem" v-show="activeName==='REDEEM'">
                    <el-table :data="tableData">
                        <el-table-column prop="created" label="时间" width="180"></el-table-column>
                        <el-table-column prop="value" label="eth数量" width="180"></el-table-column>
                        <el-table-column prop="agicValue" label="agic数量" width="180"></el-table-column>
                        <el-table-column prop="serviceCharge" label="服务费" width="180"></el-table-column>
                        <el-table-column prop="subPledgeEth" label="减掉质押额" width="180"></el-table-column>
                        <el-table-column prop="transactionHash" label="交易">
                            <template slot-scope="scope">
                                <a style="padding-top: 20px">{{ scope.row.transactionHash }}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination layout="prev, pager, next" :total="redeemTotal" :background="true"
                                   :page-count="redeemPages"
                                   :current-page="redeemNowPage" style="padding-top: 20px">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import config from '../config/config'
import {BigNumber} from "bignumber.js"

const StringUtils = require("../util/StringUtils.js")
const DateUtils = require("../util/DateUtils.js")

export default {
    name: 'Orders',
    created() {
        this.orders(0, config.orders_event.deposit);
    },
    data() {
        return {
            activeName: config.orders_event.deposit,
            tableData: [],
            depositTotal: 0,
            depositPages: 0,
            depositNowPage: 0,
            redeemTotal: 0,
            redeemPages: 0,
            redeemNowPage: 0
        }
    },
    methods: {
        handleClick(tab) {
            if (tab.name === 'deposit') {
                this.activeName = 'deposit'
            } else {
                this.activeName = 'redeem'
            }
        },
        cellClick(row, column) {
            if (column.property === "transactionHash") {
                window.open(row.hashLink);
            }
        },
        pageChange(val){
            console.log(val)
        },
        prevClick(val){
            console.log(val)
        },
        nextClick(val){
            console.log(val)w
        },
        orders(page, event) {
            const wallet = window.localStorage.getItem('wallet').toUpperCase();
            const network = window.localStorage.getItem('network');
            if (StringUtils.isNotBlank(wallet) && StringUtils.isNotBlank(network)) {
                const uri = config.base_url + '/api/orders?network=' + network + '&user=' + wallet + '&event=' + event + '&page=' + page;
                this.axios.get(uri).then((resp) => {
                    if (resp.status === 200) {
                        const data = resp.data;
                        let dataLis = [];
                        let baseUrl;
                        if (network === '1') {
                            baseUrl = this.$i18n.locale === 'zh' ? config.etherscan.cn : config.etherscan.main;
                        } else {
                            baseUrl = config.etherscan.ropsten;
                        }
                        data.list.forEach((orders) => {
                            dataLis.push({
                                created: DateUtils.dateFormat("YYYY-MM-dd HH:mm:ss", new Date(orders.created)),
                                value: new BigNumber(orders.value).div(1e18).toFixed(),
                                agicValue: new BigNumber(orders.agicValue).div(1e18).toFixed(),
                                serviceCharge: new BigNumber(orders.serviceCharge).div(1e18).toFixed(),
                                subPledgeEth: new BigNumber(orders.subPledgeEth).div(1e18).toFixed(),
                                transactionHash: StringUtils.shortenTx(orders.transactionHash),
                                hashLink: baseUrl + orders.transactionHash,
                            })
                        })
                        this.tableData = dataLis;
                        if (event === config.orders_event.deposit) {
                            this.depositTotal = data.totalCount;
                            this.depositPages = data.totalPage;
                            this.depositNowPage = page;
                        } else {
                            this.redeemTotal = data.totalCount;
                            this.redeemPages = data.totalPage;
                            this.redeemNowPage = data.page;
                        }

                    }
                })
            }

        }
    }
}
</script>

<style lang="scss">

.deposit {
    font-size: 0.2rem;
    width: 100%;
    text-align: center !important;
}

.redeem {
    font-size: 0.2rem;
    width: 100%;
    text-align: center !important;
}

.router2 {
    font-size: 20px;
    text-align: center;
}
</style>