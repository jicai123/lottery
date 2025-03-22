<template>
  <div class="main-box">
    <top-time @newOdds="newOdds" :playName="topPlayName"></top-time>
    <div class="bet-box">
      <div class="bet-content pm">
        <table class="betTable">
          <thead>
          <tr>
            <td colspan="3">第一球</td>
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
            <td colspan="3">第二球</td>
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
            <td colspan="3">第三球</td>
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
        <table class="betTable">
          <thead>
          <tr>
            <td colspan="3">第四球</td>
          </tr>
          <tr>
            <td>号码</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in TableData4"
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
            <td colspan="3">第五球</td>
          </tr>
          <tr>
            <td>号码</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in TableData5"
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
      <div class="bet-content">
        <table class="betTable" v-for="(item,index) in TableData6" :key="`hzt${index}`">
          <thead>
          <tr>
            <td>总和</td>
            <td>赔率</td>
            <td>金额</td>
          </tr>
          </thead>
          <tbody>
          <tr @click="onBetContent(item)"
              :class="checkedBet(item)">
            <td>
              {{item.Name}}
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
  name: "SSCZHBet",
  mixins: [bet],
  data(){
    return{
      topPlayName: '整合',
      TableData1: [],
      TableData2: [],
      TableData3: [],
      TableData4: [],
      TableData5: [],
      TableData6: [],
      betListPlayName:{
        B1: '第一球',
        B2: '第二球',
        B3: '第三球',
        B4: '第四球',
        B5: '第五球',
        ZOH: '总和'
      }
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
      let pplay = ['B1', 'B2', 'B3', 'B4', 'B5', 'ZOH']
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
            playName: this.betListPlayName[k]
          })
        })
      }
      let dataArr1 = [],
          dataArr2 = [],
          dataArr3 = [],
          dataArr4 = [],
          dataArr5 = [],
          dataArr6 = [];
      KeysList.forEach(item => {
        if(item.pId === 'B1'){
          dataArr1.push(item);
        }
        if(item.pId === 'B2'){
          dataArr2.push(item);
        }
        if(item.pId === 'B3'){
          dataArr3.push(item);
        }
        if(item.pId === 'B4'){
          dataArr4.push(item);
        }
        if(item.pId === 'B5'){
          dataArr5.push(item);
        }
        if(item.pId === 'ZOH'){
          dataArr6.push(item);
        }
      })
      this.TableData1 = dataArr1
      this.TableData2 = dataArr2
      this.TableData3 = dataArr3
      this.TableData4 = dataArr4
      this.TableData5 = dataArr5
      this.TableData6 = dataArr6
    },
    async newOdds() {
      let pplay = ['B1', 'B2', 'B3', 'B4', 'B5', 'ZOH']
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
      this.TableData4.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
      this.TableData5.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
      this.TableData6.forEach(item => {
        item.Odds = this.betContentOdd(betOdds, item.Keyname)
      })
    },
    pageAutoEnterBetAmount() {
      let val = this.$refs.betFooter.betAmount
      val = val.toString();
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData1);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData2);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData3);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData4);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData5);
      this.autoEnterBetAmount(val, this.selBetItem, this.TableData6);
    },
    pageResetSelBetItem() {
      this.selBetItem = [];
      this.resetSelBetItem(this.TableData1);
      this.resetSelBetItem(this.TableData2);
      this.resetSelBetItem(this.TableData3);
      this.resetSelBetItem(this.TableData4);
      this.resetSelBetItem(this.TableData5);
      this.resetSelBetItem(this.TableData6);
    },
    pageBetData() {
      let berArr = []
      let t1 = this.TableData1.filter(item => item.Amount > 0)
      let t2 = this.TableData2.filter(item => item.Amount > 0)
      let t3 = this.TableData3.filter(item => item.Amount > 0)
      let t4 = this.TableData4.filter(item => item.Amount > 0)
      let t5 = this.TableData5.filter(item => item.Amount > 0)
      let t6 = this.TableData6.filter(item => item.Amount > 0)
      for (let i in t1) {
        berArr.push(t1[i])
      }
      for (let i in t2) {
        berArr.push(t2[i])
      }
      for (let i in t3) {
        berArr.push(t3[i])
      }
      for (let i in t4) {
        berArr.push(t4[i])
      }
      for (let i in t5) {
        berArr.push(t5[i])
      }
      for (let i in t6) {
        berArr.push(t6[i])
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