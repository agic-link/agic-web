<template>
  <div>
    <el-row type="flex">
      <el-col :md="{span:3,offset:20}" :xs="{span:10,offset:10}">
        <div class="router2">
          <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" tab-position="bottom">
            <el-tab-pane :label="$t('orders.deposit')" name="DEPOSIT"></el-tab-pane>
            <el-tab-pane :label="$t('orders.withdraw')" name="WITHDRAW"></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :lg="{span:20,offset:2}" :xs="{span:20,offset:2}">
        <div class="deposit" v-show="activeName==='DEPOSIT'" style="width: 100%;">
          <el-table :data="tableData" @cell-click="cellClick">
            <template slot="empty">
              <span>{{ $t('orders.empty') }}</span>
            </template>
            <el-table-column prop="created" :label="$t('orders.time')" width="200"></el-table-column>
            <el-table-column prop="value" :label="'Eth '+ $t('orders.amount')" width="450"></el-table-column>
            <el-table-column prop="agicValue" :label="'Agic '+ $t('orders.amount')" width="450"></el-table-column>
            <el-table-column prop="transactionHash" :label="$t('orders.transaction')" width="200">
              <template slot-scope="scope">
                <a style="cursor:pointer;">{{ scope.row.transactionHash }}</a>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="depositTotal" :background="true"
                         :current-page="depositNowPage" :page-size="10" :page-count="depositPages"
                         @current-change="pageChange"
                         style="padding-top: 20px">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :lg="{span:24,offset:0}" :xs="{span:20,offset:2}">
        <div class="redeem" v-show="activeName==='WITHDRAW'">
          <el-table :data="tableData" @cell-click="cellClick">
            <template slot="empty">
              <span>{{ $t('orders.empty') }}</span>
            </template>
            <el-table-column prop="created" :label="$t('orders.time')" width="150"></el-table-column>
            <el-table-column prop="value" :label="'Eth '+ $t('orders.amount')" width="300"></el-table-column>
            <el-table-column prop="agicValue" :label="'Agic '+ $t('orders.amount')" width="300"></el-table-column>
            <el-table-column prop="serviceCharge" :label="$t('orders.fee')" width="300"></el-table-column>
            <el-table-column prop="subPledgeEth" :label="$t('orders.subPledge')" width="300"></el-table-column>
            <el-table-column prop="transactionHash" :label="$t('orders.transaction')" width="200">
              <template slot-scope="scope">
                <a style="cursor:pointer;">{{ scope.row.transactionHash }}</a>
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
import {Decimal} from "decimal.js";

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
      if (tab.name === config.orders_event.deposit) {
        this.activeName = config.orders_event.deposit
      } else {
        this.activeName = config.orders_event.withdraw
      }
      this.orders(0, this.activeName);
    },
    cellClick(row, column) {
      if (column.property === "transactionHash") {
        window.open(row.hashLink);
      }
    },
    pageChange(page) {
      this.orders(page - 1, this.activeName);
    },
    orders(page, event) {
      const wallet = window.localStorage.getItem('wallet').toUpperCase();
      const network = window.localStorage.getItem('network');
      if (StringUtils.isNotBlank(wallet) && StringUtils.isNotBlank(network)) {
        const uri = config.base_url + '/orders?network=' + network + '&user=' + wallet + '&event=' + event + '&page=' + page;
        this.axios.get(uri).then((resp) => {
          if (resp.status === 200) {
            const data = resp.data;
            let dataLis = [];
            let baseUrl;
            if (network === '1') {
              baseUrl = this.$i18n.locale === 'zh' ? config.etherscan.cn : config.etherscan.main;
            } else {
              baseUrl = config.etherscan.kovan;
            }
            data.list.forEach((orders) => {
              dataLis.push({
                created: DateUtils.dateFormat("YYYY-MM-dd HH:mm:ss", new Date(orders.created)),
                value: new BigNumber(orders.value).div(1e18).toFixed(),
                agicValue: new BigNumber(orders.agicValue).div(1e18).toFixed(),
                serviceCharge: orders.serviceCharge === undefined ? 0 : new BigNumber(new Decimal(orders.serviceCharge).div(1e18).toNumber()).toFixed(),
                subPledgeEth: orders.subPledgeEth === undefined ? 0 : new BigNumber(new Decimal(orders.subPledgeEth).div(1e18).toNumber()).toFixed(),
                transactionHash: StringUtils.shortenTx(orders.transactionHash),
                hashLink: baseUrl + orders.transactionHash,
              })
            })
            this.tableData = dataLis;
            if (event === config.orders_event.deposit) {
              this.depositTotal = data.totalCount;
              this.depositPages = data.totalPage;
              this.depositNowPage = page + 1;
            } else {
              this.redeemTotal = data.totalCount;
              this.redeemPages = data.totalPage;
              this.redeemNowPage = data.page + 1;
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

  .el-tabs__active-bar {
    background-color: #06f386;
  }

  .el-tabs__item.is-active {
    color: #06f386;
  }
}
</style>
