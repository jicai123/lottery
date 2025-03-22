<template>
  <div>
    <div class="bar_tit">
      <ul>
        <li class="active">
          <b>活动规则</b>
        </li>
      </ul>
      <div class="r-box">
        游戏：
        <select size="mini" v-model="currentGame" placeholder="请选择" @change="changeGame(currentGame)">
          <option
              v-for="item in gameOptions"
              :key="item.LotteryType"
              :label="item.Name"
              :value="item.LotteryType">
          </option>
        </select>
      </div>
    </div>
    <div class="rule-txt">
      <h1 class="tit-box">
        重要声明
      </h1>
      <ol>
        <li>1.如果客户怀疑自己的资料被盗用，应立即通知本公司，并更改详细数据，以前的使用者名称及密码将全部无效。</li>
        <li>2.客户有责任确保自己的账户及登入资料的保密性。以使用者名称及密码进行的任何网上投注将被视为有效。 </li>
        <li>3.公布赔率时出现的任何打字错误或非故意人为失误，本公司保留改正错误和按正确赔率结算投注的权力。 </li>
        <li>4.每次登入时客户都应该核对自己的账户结余额。如对余额有任何疑问，请在第一时间内通知本公司。</li>
        <li>5.一旦投注被接受，则不得取消或修改。</li>
        <li>6.所有号码赔率将不时浮动，派彩时的赔率将以确认投注时之赔率为准。</li>
        <li>7.每注最高投注金额按不同[场次]及[投注项目]及[会员账号]设定浮动。如投注金额超过上述设定，本公司有权取消超过之投注金额。</li>
        <li>8.所有投注都必须在开奖前时间内进行否则投注无效。</li>
        <li>9.所有投注派彩彩金皆含本金。</li>
      </ol>
    </div>
  </div>
</template>

<script>
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapState} from "pinia";
import {iGetHomeUrl} from "@/scripts/api/summary";
export default {
  name: "ruleTop",
  data(){
    return{
      gameOptions:[],
      currentGame: ''
    }
  },
  computed:{
    ...mapState(gameInfoStore, ['userGameListStore']),
    wUserGameList(){
      return JSON.parse(JSON.stringify(this.userGameListStore))
    }
  },
  created() {
    if(this.userGameListStore.length > 0){
      this.gameOptions = this.userGameListStore
      this.currentGame = this.$route.query.game || this.userGameListStore[0].LotteryType
    }
  },
  watch:{
    wUserGameList:{
      handler(nval,oval){
        if(nval.length > 0){
          this.gameOptions = nval
          this.currentGame = nval[0].LotteryType
        }
      },
      deep:true
    }
  },
  methods:{
    changeGame(lotteryType){
      let game = this.userGameListStore.filter(g => g.LotteryType === lotteryType)
      let Mod = ''
      if(game[0].MoudleName === 'PK10FT3' || game[0].MoudleName === 'XY5FT2' || game[0].MoudleName === 'FT5'){
        Mod = 'FT'
      }else{
        Mod = game[0].MoudleName
      }
      if(Mod){
        this.$router.push({
          path: `/rule/${Mod}`,
          query:{
            game: game[0].LotteryType
          }
        })
        this.$emit('selGame', game[0].LotteryType)
      }
    },
  }
}
</script>

<style scoped lang="less">

</style>