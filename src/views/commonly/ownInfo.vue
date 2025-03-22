<template>
  <div class="main-box" v-loading="loading" element-loading-text="数据加载中~">
    <div class="bar_tit">
      <ul>
        <li class="active">
          <b>个人资讯</b>
        </li>
      </ul>
    </div>
    <table class="ex-table info-t">
      <thead>
      <tr>
        <td colspan="2">用户信息</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>账号</td>
        <td>{{ userInfo.Acc }}</td>
      </tr>
      <tr>
        <td>额度类型</td>
        <td>{{ userInfo.ScoreType }}</td>
      </tr>
      <tr>
        <td>游戏额度</td>
        <td class="td-list">
          <ul>
            <li v-for="item in userQuotas" :key="`${item.KeyName}_Quotas`">
              <el-popover
                  placement="bottom-start"
                  width="400"
                  trigger="hover">
                <div class="popover_txt">
                  <p>{{item.Game.join('，')}}</p>
                </div>
                <i class="el-icon-info title-icon"  slot="reference"></i>
              </el-popover>
              {{ item.Name }}：{{ item.Quota }}（余额：{{ item.NowQuota }}）

            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>游戏盘口</td>
        <td class="td-list">
          <ul>
            <ul>
              <li v-for="item in userPk" :key="`${item.KeyName}_Pk`">
                <span class="gpk-Name">{{ item.Name }}：</span>
                {{ item.Pk.join('，') }} 盘</li>
            </ul>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="play-list">
      <div v-for="item in userGame" :key="`game_${item.LotteryType}`" class="game-item"
      :class="[{'active' : item.LotteryType === currentGame}]"
      @click="changeGame(item.LotteryType)">
        {{item.Name}}
      </div>
<!--      <ul>-->
<!--        <li v-for="item in userGame" :key="`game_${item.LotteryType}`"-->
<!--            :class="[{'active' : item.LotteryType === currentGame}]"-->
<!--            @click="changeGame(item.LotteryType)">{{item.Name}}</li>-->
<!--      </ul>-->
    </div>
    <table class="ex-table">
      <thead>
      <tr>
        <td>玩法</td>
        <td v-for="item in currentGamePk" :key="`H_${item}`">{{ item }} 盘</td>
        <td>单注限额</td>
        <td>单期限额</td>
        <!--        userReturn-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in userReturn">
        <td><b>{{ item.KeyName }}</b></td>
        <td v-for="(pk,index2) in currentGamePk" :key="`pk_${index}${index2}`">{{ item[pk] || 0 }}%</td>
        <td>{{ item.LimitOne }}</td>
        <td>{{ item.LimitAll }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userStore from "@/scripts/stores/user";
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapState} from "pinia";
import {iGetMyInfos} from "@/scripts/api/commonly";
import {iGetUserReturn} from "@/scripts/api/summary";

export default {
  name: "ownInfo",
  data() {
    return {
      loading: false,
      userGame: [],
      userQuotas: [],
      userPk: [],
      currentGame: '',
      currentGamePk: [],
      userReturn: []
    }
  },
  computed: {
    ...mapState(gameInfoStore, ['userGameListStore']),
    ...mapState(userStore, ['userInfo', 'userGameStore']),
  },
  created() {
    console.log(this.userGameListStore)
    this.getOwnInfo();
  },
  methods: {
    async getOwnInfo() {
      let res = await iGetMyInfos();
      let glist = [],
          plist = [],
          qlist = [];
      res.OpenGame.Data.forEach(item => {
        let codeGame = this.userGameListStore.filter(g => g.LotteryType === item)
        if (codeGame.length > 0) {
          glist.push(codeGame[0])
        }
      })

      res.Quotas.Data.forEach(item => {
        this.$set(item, 'Game', [])
        qlist.push(item)
      })

      this.userGame = JSON.parse(JSON.stringify(this.userGameListStore));
      this.userGame.forEach(item => {
        let codePk = res.Pk.Data.filter(p => p.KeyName === item.LotteryType)
        if (codePk.length > 0) {
          this.$set(codePk[0], 'Name', item.Name)
          plist.push(codePk[0])
        }
      })
      qlist.forEach(item => {
        let game = this.userGame.filter(g => g.Scoretype === item.KeyName).map(g => g.Name)
        item.Game = game
      })

      this.userGame = glist
      this.userQuotas = qlist
      this.userPk = plist

      if (this.userGame.length > 0) {
        this.currentGame = this.userGame[0].LotteryType
        await this.getUserReturn(this.currentGame);
      }

    },
    async getUserReturn(lotterytype) {
      this.loading = true
      try {
        let res = await iGetUserReturn(lotterytype);
        this.userReturn = res
        let codePk = this.userPk.filter(item => item.KeyName === lotterytype)
        if (codePk.length > 0) {
          this.currentGamePk = codePk[0].Pk
        }
        this.loading = false
      }catch (e) {
        this.loading = false
      }
    },
    changeGame(lotterytype){
      this.currentGame = lotterytype
      this.getUserReturn(lotterytype);
    }
  }
}

</script>

<style scoped lang="less">
.ex-table {
  tr {
    height: 30px;
  }

  tbody {
    td:first-child {
      background: #f9fcff;
      color: #3c4454;
    }

    tr:nth-child(even) {
      background: #f6f6f6;
    }

    tr:hover {
      background: #ffffc6;
    }
  }
}

.play-list {
  width: 100%;
  height: 40px;
  background: #ffeee3;
  border: 1px solid #bbc4ce;
  box-sizing: border-box;
  margin: 10px 0px 5px 0px;
  padding: 0px 10px;
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  //li {
  //  list-style: none;
  //  float: left;
  //  padding: 0 20px;
  //  height: 34px;
  //  line-height: 34px;
  //  margin-top: 4px;
  //  font-weight: bold;
  //  cursor: pointer;
  //}
  //li+li{
  //  margin-left: -1px;
  //}
  //li.active, li:hover{
  //  border: 1px solid #bbc4ce;
  //  border-bottom: none;
  //  margin-bottom: -1px;
  //  color: #bd0000;
  //  background: #ffffff;
  //}
  .game-item {
    padding: 0 15px;
    height: 34px;
    line-height: 34px;
    margin-top: 4px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
    display: inline-block;
  }
  .game-item.active, .game-item:hover{
    border: 1px solid #bbc4ce;
    border-bottom: none;
    margin-bottom: -1px;
    color: #bd0000;
    background: #ffffff;
  }
}
.gpk-Name{
  display: inline-block;
  width: 160px;
  text-align: right;
}
.title-icon{
  cursor: pointer;
  color: #1862c3;
  font-size: 14px;
}
.play-list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
  background-color: #F5F5F5;
}

.play-list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #747474;
}

.play-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  //-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: #d0d0d0;
}
</style>