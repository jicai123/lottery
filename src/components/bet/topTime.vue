<template>
  <div class="bet-top-tit">
    <div class="l">
      <div class="top-icon ycolor">
        <i class="el-icon-s-claim" style="font-size: 20px"></i>
        {{playName}}
      </div>
      <div>
        今日输赢:&nbsp;
        <span class="amount-box" :class="txtColor(gameResult)">
          {{gameResult}}
        </span>
      </div>
      <div class="homeurl" v-show="currentGameInfoStore.HomeUrl.length > 0 && currentGameInfoStore.HomeUrl[0].trim().length > 0">
        <a :href="currentGameInfoStore.HomeUrl[0]" target="_blank" class="ycolor">官网地址：{{currentGameInfoStore.HomeUrl[0]}}</a>
      </div>
    </div>
    <div class="r">
      <div>
        <b>{{currentGameInfoStore.Installments}}期</b>&emsp;
        距离封盘：&nbsp;
        <span class="cd-box">
          {{closeTime}}
        </span>
      </div>
      &emsp;
      <div>
        距离开奖：&nbsp;
        <span class="cd-box">{{resultTime}}</span>
      </div>
      <div class="timer">
        {{tTime}}&nbsp;秒
      </div>
    </div>

  </div>
</template>

<script>
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapState, mapActions} from "pinia";
import {iGetCurrentInstall, iGetGameQueryResult} from "@/scripts/api/bet";
import {SXToNum} from "@/scripts/uils/lottery";
import {iGetGameQuotas} from "@/scripts/api/summary";


export default {
  name: "topTime",
  props:['playName'],
  data(){
    return {
      newTimer: '',
      iniTime: 10,
      tTime: 10,
      gameResult: 0
    }
  },
  computed:{
    ...mapState( gameInfoStore, ['LMLongKeysStore', 'currentGameInfoStore', 'serverTimeStore']),
    txtColor(n){
      return (n) => {
        n = Number(n)
        if(n >= 0){
          return 'b-c-text'
        }else{
          return 'r-c-text'
        }
      }
    },
    closeTime(){
      if(this.currentGameInfoStore.CloseTime - this.serverTimeStore <= 0){
        this.upcurrentGameInfo({
          Status: 2
        });
        return '00:00:00'
      }else{
        let sub = this.currentGameInfoStore.CloseTime - this.serverTimeStore;
        let s = sub % 60 < 10 ? ('0' + sub % 60) : sub % 60;
        let h = sub / 3600 < 10 ? ('0' + parseInt(sub / 3600)) : parseInt(sub / 3600);
        let m = (sub - h * 3600) / 60 < 10 ? ('0' + parseInt((sub - h * 3600) / 60)) : parseInt((sub - h * 3600) / 60);
        return `${h}:${m}:${s}`
      }
    },
    resultTime(){
      if(this.currentGameInfoStore.ResultTime - this.serverTimeStore <= 0){
        return '00:00:00'
      }else{
        let sub = this.currentGameInfoStore.ResultTime - this.serverTimeStore;
        let s = sub % 60 < 10 ? ('0' + sub % 60) : sub % 60;
        let h = sub / 3600 < 10 ? ('0' + parseInt(sub / 3600)) : parseInt(sub / 3600);
        let m = (sub - h * 3600) / 60 < 10 ? ('0' + parseInt((sub - h * 3600) / 60)) : parseInt((sub - h * 3600) / 60);
        return `${h}:${m}:${s}`
      }
    },
    wcurrentGameInfoStore(){
      return JSON.parse(JSON.stringify(this.currentGameInfoStore))
    }
  },
  watch:{
    wcurrentGameInfoStore:{
      async handler(nval, oval){
        if(nval.LotteryType !== oval.LotteryType){
          this.tTime = this.iniTime
          await this.getGameQueryResult(nval.LotteryType)
        }else{
         if(nval.Installments !== oval.Installments){
           await this.getGameQueryResult(nval.LotteryType)
         }
        }
      },
      deep: true
    }
  },
  created() {
    this.timer1();
    if(this.currentGameInfoStore.LotteryType){
      this.getGameQueryResult(this.currentGameInfoStore.LotteryType);
    }
  },
  methods:{
    ...mapActions(gameInfoStore, ['upcurrentGameInfo', 'upGameAmount', 'upSXYearNum']),
     timer1(){
      clearInterval(this.newTimer)
      this.newTimer = setInterval(async () => {
        if(this.tTime > 0){
          this.tTime --
        }else{
          await this.getCurrentInstall(this.currentGameInfoStore);
          this.$emit('newOdds')
          this.getGameQueryResult(this.currentGameInfoStore.LotteryType);
          this.tTime = this.iniTime
        }
      }, 1000)
    },
    async getGameQueryResult(lotterytype){
      try {
        let res = await iGetGameQueryResult({
          lotteryType: lotterytype
        });
        this.gameResult = res.Result
        this.upGameAmount({
          UnResult: res.UnResult
        })
      }catch (e) {
        console.log(e);
      }
    },
    async getCurrentInstall(game){
      let res = await iGetCurrentInstall(game.LotteryType);
      if(res){
        let sx = {}
        if(game.MoudleName === 'LHC'){
          sx = SXToNum(res.PreShengXiaoYear)
          this.upSXYearNum(sx)
        }

        let CloseStatus = 2
        if(this.serverTimeStore > res.CloseTimeStamp && res.Status !== 3){
          CloseStatus = 2
        }else{
          if(res.Status !== 3){
            CloseStatus = 1
          }else{
            CloseStatus = 3
          }
        }
        this.upcurrentGameInfo({
          OpenTime: res.OpenTimeStamp,
          CloseTime: res.CloseTimeStamp,
          ResultTime: res.ResultTimeStamp,
          Installments: res.Installments || '',
          Period: res.PreInstallments || '',
          LotteryType: game.LotteryType,
          MoudleName: game.MoudleName,
          Name: game.Name,
          Result: res.PreLotteryResult.split(',') || '',
          NumNote: fSX(res.PreLotteryResult.split(','), sx),
          Status: CloseStatus
        })
        setTimeout(()=>{
          this.getGameQuotas(game.LotteryType, game.Scoretype);
        },2000)
      }

      //六合彩模块生肖对应的号码
      function fSX(nArr, sx){
        let sxArr = []
        let NtheSX = {}
        for(let k in sx){
          sx[k].forEach(item => {
            NtheSX[Number(item)] = k
          })
        }
        nArr.forEach(item => {
          if(NtheSX.hasOwnProperty(Number(item))){
            sxArr.push(NtheSX[Number(item)])
          }else{
            sxArr.push('')
          }
        })
        return sxArr;
      }
    },
    // 游戏金额
    async getGameQuotas(lotterytype, Scoretype) {
      let res = await iGetGameQuotas({
        LotteryType: lotterytype
      });
      if (res.length > 0) {
        let game = res.filter(g => g.KeyName === Scoretype)
        if (game.length > 0) {
          this.upGameAmount({
            Amount: game[0].NowQuota
          })
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.newTimer)
  }
}
</script>

<style scoped lang="less">
.l{
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: bold;
  >div{
    margin-right: 20px;
  }
  .top-icon{
    i{
      margin-right: 5px;
    }
    display: flex;
    align-items: center;
  }
  .amount-box{
    padding: 2px 5px;
    border-radius: 3px;
    background: #ffffff;

  }
  .ycolor{
    color: #ffd100;
  }
}
.homeurl{
  white-space:nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 220px;
}
.r{
  display: flex;
  align-items: center;
  flex-direction: row;
  .cd-box{
    color: #ce0000;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 5px;
    text-align: center;
    background: #fff;
    border: 1px solid #c3a318;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
}
.r-c-text{
  color: #ce0000;
}
</style>