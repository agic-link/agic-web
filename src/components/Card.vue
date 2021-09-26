<template>
  <div class="line-break">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <div class="card-name">AIC</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :lg="{span:7}" :xs="{span:22}">
        <div class="card-name-introduction">{{ $t('card.title') }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col>
        <div class="card-introduction">{{ $t('card.introduce') }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <div class="card-type-title">{{ $t('card.type') }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :lg="{span:16}" :xs="{span:24}">
        <div class="card-type">
          <div class="card-type-column">
            <img src="https://gitlab.com/agic/agic.gitlab.io/-/raw/master/1_Card.png" alt="1 Card"
                 width="200px"/>
            <div class="card-type-info">
              <a>{{ $t('card.margin') }}: 10</a>
              <el-button type="primary">{{ $t('card.buy') }}</el-button>
              <br>
              <a>{{ $t('card.price') }}: 1 ETH</a>
              <a>{{ $t('card.total') }}: 14</a>
            </div>
          </div>
          <div class="card-type-column">
            <img src="https://gitlab.com/agic/agic.gitlab.io/-/raw/master/3_Card.png" alt="3 Card"
                 width="200px"/>
            <div class="card-type-info">
              <a>{{ $t('card.margin') }}: 10</a>
              <el-button type="primary">{{ $t('card.buy') }}</el-button>
              <br>
              <a>{{ $t('card.price') }}: 3 ETH</a>
              <a>{{ $t('card.total') }}: 7</a>
            </div>
          </div>
          <div class="card-type-column">
            <img src="https://gitlab.com/agic/agic.gitlab.io/-/raw/master/5_Card.png" alt="5 Card"
                 width="200px"/>
            <div class="card-type-info">
              <a>{{ $t('card.margin') }}: 10</a>
              <el-button type="primary">{{ $t('card.buy') }}</el-button>
              <br>
              <a>{{ $t('card.price') }}: 5 ETH</a>
              <a>{{ $t('card.total') }}: 3</a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {Decimal} from "decimal.js";

const agic = require('../web3/agic.js')

export default {
  name: 'Card',
  created() {
    if (agic.checkMetamask()) {
      agic.getNetwork((error, result) => {
        if (error != null) {
          console.error("Card getNetwork Error", error.message);
          return;
        }
        this.network = new Decimal(result.result).toString();
        window.localStorage.setItem('network', this.network);
        this.agicInstance = agic.createInstance(this.network);
      });
    }
  },
  data() {
    return {
      agicInstance: undefined,
      network: ''
    }
  },
  methods: {}

}
</script>

<style lang="scss">
.line-break {
  /*word-wrap: break-word;*/
  //margin: auto;
  font-size: 0.25rem;
  padding-top: 20px;
  text-align: center;

  .card-name {
    font-size: 0.5rem;
  }

  .card-name-introduction {
    padding-top: 15px;
    text-align: center;
    font-size: 0.3rem;
  }

  .card-introduction {
    text-align: center;
    font-size: 0.2rem;
    margin-top: 20px;
  }

  .card-type-title {
    padding-top: 20px;
  }

  .card-type {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    padding-bottom: 20px;

    .card-type-column {
      padding-top: 20px;
      padding-left: 40px;
      padding-right: 40px;
      display: inline-block;

      .card-type-info {
        padding-top: 15px;
        text-align: center;

        a {
          padding-top: 10px;
          padding-right: 10px;
          vertical-align: middle;
          font-size: 20px;
        }

        .el-button {
          vertical-align: middle;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .card-type {
      word-wrap: break-word;
      padding-bottom: 20px;

      .card-type-column {
        padding-top: 20px;
        padding-left: 0;
        padding-right: 0;

        .card-type-info {
          padding-top: 10px;

          a {
            padding-right: 10px;
          }
        }
      }
    }
  }

}
</style>
