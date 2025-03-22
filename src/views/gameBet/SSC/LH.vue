<template>
  <div class="main-box">
    <top-time @newOdds="newOdds" :playName="topPlayName"></top-time>
    <div class="bet-box">
      <div class="bet-content pm">
        <table class="betTable">
          <thead>
          <tr>
            <td colspan="3">龙</td>
          </tr>
          <tr>
            <td>号码</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in TableData1"
              :key="`t1${index}`"
              @click="onBetContent(item)"
              :class="checkedBet(item)">
            <td>
              <div :class="[{'betNum1 Ball_1_B' : !isNaN(item.Name)}]">
                <span>
                  {{item.Name}}
                </span>
              </div>
            </td>
            <td class="bet-odd">{{ closeOdd(item.Odds) }}</td>
            <td>
              <input type="text" v-model="item.Amount" @click.stop v-int>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="betTable">
          <thead>
          <tr>
            <td colspan="3">虎</td>
          </tr>
          <tr>
            <td>号码</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in TableData2"
              :key="`t1${index}`"
              @click="onBetContent(item)"
              :class="checkedBet(item)">
            <td>
              <div :class="[{'betNum1 Ball_1_B' : !isNaN(item.Name)}]">
                <span>
                  {{item.Name}}
                </span>
              </div>
            </td>
            <td class="bet-odd">{{ closeOdd(item.Odds) }}</td>
            <td>
              <input type="text" v-model="item.Amount" @click.stop v-int>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="betTable">
          <thead>
          <tr>
            <td colspan="3">和</td>
          </tr>
          <tr>
            <td>号码</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in TableData3"
              :key="`t1${index}`"
              @click="onBetContent(item)"
              :class="checkedBet(item)">
            <td>
              <div :class="[{'betNum1 Ball_1_B' : !isNaN(item.Name)}]">
                <span>
                  {{item.Name}}
                </span>
              </div>
            </td>
            <td class="bet-odd">{{ closeOdd(item.Odds) }}</td>
            <td>
              <input type="text" v-model="item.Amount" @click.stop v-int>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <betFooter ref="betFooter"
               @pageAutoEnterBetAmount="pageAutoEnterBetAmount"
               @pageResetSelBetItem="pageResetSelBetItem"
               :betListData="betListData"
               @pageBetData="pageBetData">
    </betFooter>
  </div>
</template>

<script>
import bet from "@/scripts/mixin/bet";

export default {
  name: "SSCXTBet",
  mixins: [bet],
  data(){
    return{
      topPlayName: '龙虎',
      TableData1: [],
      TableData2: [],
      TableData3: [],
    }
  },
  methods: {
    changePlayItem(keyname) {
      if (this.currentPlay !== keyname) {
        this.selBetItem = []
        this.currentPlay = keyname
        this.iniBetData();
      }
    },
    pagePlayBetData(lotterytype, play) {
      return this.playBetData(lotterytype, play)
    },
    pagePlayOdds(lotterytype, play, pk) {
      return this.playOdds(lotterytype, play, pk)
    },
    async iniBetData() {
      let pplay = ['LH']
      let betKeys = await this.pagePlayBetData(this.currentGame.LotteryType, pplay.join(','));
      let betOdds = await this.pagePlayOdds(this.currentGame.LotteryType, pplay.join(','), this.currentGame.currentPK);
      let KeysList = []
      for (let k in betKeys) {
        let data = JSON.parse(betKeys[k]);
        data.forEach(item => {
          let betOdd = this.betContentOdd(betOdds, item.Keyname)
          KeysList.push({
            Name: item.Name,
            Keyname: item.Keyname,
            Odds: betOdd,
            Amount: '',
            pId: k,
            playName: '龙虎'
          })
        })
      }
      let dataArr1 = [],
          dataArr2 = [],
          dataArr3 = [];
      KeysList.forEach(item => {
        if(item.Name.includes('龙')){
          dataArr1.push(item);
        }
        if(item.Name.includes('虎')){
          dataArr2.push(item);
        }
        if(item.Name.includes('和')){
          dataArr3.push(item);
        }
      })
      this.TableData1 = dataArr1
      this.TableData2 = dataArr2
      this.TableData3 = dataArr3
    },
    async newOdds() {
      let pplay = ['LH']
      let betOdds = await this.pagePlayOdds(this.currentGame.LotteryType, pplay.join(','), this.currentGame.currentPK);
      this.TableData1.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
      this.TableData2.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
      this.TableData3.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
    },
    pageAutoEnterBetAmount() {
      let val = this.$refs.betFooter.betAmount
      val = val.toString();
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData1);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData2);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData3);
    },
    pageResetSelBetItem() {
      this.selBetItem = [];
      this.resetSelBetItem(this.TableData1);
      this.resetSelBetItem(this.TableData2);
      this.resetSelBetItem(this.TableData3);
    },
    pageOnBetContent(key){
      key = `${this.currentPlay}${key}`
      let i =  this.selBetItem.indexOf(key)
      if(i === -1){
        this.selBetItem.push(key)
        for(let i = 0;i < this.TableData1.length; i ++){
          if(this.TableData1[i].Keyname === key){
            let val = this.$refs.betFooter.betAmount
            val = val.toString();
            this.TableData1[i].Amount = val
            break;
          }
        }
      }else{
        this.selBetItem.splice(i,1)
        for(let i = 0;i < this.TableData1.length; i ++){
          if(this.TableData1[i].Keyname === key){
            this.TableData1[i].Amount = ''
            break;
          }
        }
      }
    },
    pageBetData() {
      let berArr = []
      let t1 = this.TableData1.filter(item => item.Amount > 0)
      let t2 = this.TableData2.filter(item => item.Amount > 0)
      let t3 = this.TableData3.filter(item => item.Amount > 0)
      for (let i in t1) {
        berArr.push(t1[i])
      }
      for (let i in t2) {
        berArr.push(t2[i])
      }
      for (let i in t3) {
        berArr.push(t3[i])
      }
      let betDataObj = {
        betData: berArr
      }
      this.tidyBetData(betDataObj, this.currentGame.LotteryType);
    }
  }
}
</script>

<style scoped lang="less">
.pm{
  .betTable + .betTable{
    margin-left: 5px;
    td{
      border-left: 1px solid #bbc4ce !important;
    }
  }
}
.betNum1 span {
  font-weight: bold;
  position: absolute;
  left: 9px;
  top: -1px;
}
</style>