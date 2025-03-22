<template>
  <div class="bet-footer">
    <button @click="amountDialogVisible = true" style="padding: 2px 8px">快选金额</button>
    &emsp;
    <el-checkbox size="mini" v-model="preCheck" @change="onPreCheck(preCheck)">预设</el-checkbox>
    <label class="set-amount">
      金额
      <input class="quickAmount" v-model="betAmount" @input="emitAmountVal"/>
    </label>
    <div class="but-amount">
      <template v-for="item in useAmountBut">
        <button class="money_btn" v-if="item" @click="onButAmount(item)">{{ item }}</button>
      </template>

    </div>
    <button class="btn4" >确定</button>
    <button class="btn4" @click="onResetBut">重置</button>
<!--    <button class="btn1" @click="selAllBet">全选</button>-->
    <!--快选金额设置-->
    <myDialog1 :isVisible="amountDialogVisible"
               width="300px"
               :modal="true"
               @closeDialog="closeAmountDialog">
      <template v-slot:tit>快选金额设置</template>
      <template v-slot>
        <div class="useamount-box">
          <ul>
            <li v-for="(item,index) in fastAmount" :key="`fastAmount${index}`">
              <input type="text" v-model="fastAmount[index]" placeholder="快选金额">
            </li>
            <li style="padding: 5px 0">
              <el-radio v-model="useAmountStatue" :label="1">启用</el-radio>
              <el-radio v-model="useAmountStatue" :label="0">停用</el-radio>
            </li>
          </ul>
        </div>
      </template>
      <template v-slot:footer>
        <button class="f-btn3" @click="saveQuickAmount(useAmountStatue, fastAmount)" :loading="submitButStatus">储存
        </button>
      </template>
    </myDialog1>
    <myDialog1 :isVisible="betDialogVisible"
               width="700px"
               :modal="true"
               @closeDialog="closebetDialog">
      <template v-slot:tit>投注列表</template>
      <template v-slot>
        <div class="bet-content">
          <table class="bet-list">
            <thead>
            <tr>
              <td style="width: 360px">项目</td>
              <td style="width: 100px">赔率</td>
              <td>金额</td>
              <td>确认</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in betTableData">
              <td>{{ item.Name }}</td>
              <td class="r-c-text">{{ item.Odds }}</td>
              <td>
                <input type="text" v-int v-model="item.Amount">
              </td>
              <td>
                <el-checkbox v-model="item.Check"></el-checkbox>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <table class="bet-list">
          <tbody>
          <tr>
            <td style="width: 360px">合计：{{ betCheckedItem }} 注</td>
            <td colspan="3">总金额：{{ betSumAmount }}</td>
          </tr>
          </tbody>
        </table>
        <div style="padding: 8px 0">
          <el-checkbox v-model="betOddsVary">如赔率变化，按最新赔率投注，不提示赔率变化。</el-checkbox>
        </div>
      </template>
      <template v-slot:footer>
        <button class="f-btn3" :loading="betSubmitButStatus">确 定</button>
        <button class="f-btn3" @click="onCancelBet" style="margin-left: 5px">取 消</button>
      </template>
    </myDialog1>
    <myDialog1 :isVisible="cancelDialogVisible"
               width="304px"
               :modal="true"
               @closeDialog="closeCancelDialog">
      <template v-slot:tit>取消提示</template>
      <template v-slot>
        <div class="cancelTit">
          你确定取消下注？
        </div>
      </template>
      <template v-slot:footer>
        <button class="f-btn3" @click="CancelBet">确 定</button>
        <button class="f-btn3" @click="closeCancelDialog" style="margin-left: 5px">取 消</button>
      </template>
    </myDialog1>
    <myDialog1 :isVisible="betTitDialogVisible"
               width="304px"
               :modal="true"
               @closeDialog="closeTitDialog">
      <template v-slot:tit>{{ betErrorInfo.Tit }}</template>
      <template v-slot>
        <div class="closeTit">
          {{ betErrorInfo.Msg }}
        </div>
      </template>
      <template v-slot:footer>
        <button class="f-btn3" @click="closeTitDialog">确 定</button>
      </template>
    </myDialog1>
  </div>
</template>

<script>
import {iGetQuickAmount, iPutQuickAmount} from "@/scripts/api/self";
import {iGetGameQueryResult, iPostBetData} from "@/scripts/api/bet";
import gameInfoStore from "@/scripts/stores/gameInfo";
import userStore from "@/scripts/stores/user";
import {mapState, mapActions} from "pinia";
import {iGetGameQuotas, iGetPresetval, iGetSiteInfo, iPutPresetval} from "@/scripts/api/summary";

export default {
  name: "betFooter",
  props: ['betListData', 'betLenLimit'],
  components: {
    myDialog1: () => import('@/components/bet/myDialog1.vue')
  },
  data() {
    return {
      iniAmountBut: [5, 10, 20, 50, 100, 500],
      fastAmount: ['', '', '', '', ''],
      useAmountBut: new Array('', '', '', '', ''),
      useAmountStatue: 0,
      preCheck: false,
      betAmount: '',
      amountDialogVisible: false,
      submitButStatus: false,
      betDialogVisible: false,
      betOddsVary: false,
      betTableData: [],
      betSubmitButStatus: false,
      cancelDialogVisible: false,
      betErrorInfo: {
        Tit: '',
        Msg: ''
      },
      betTitDialogVisible: false
    }
  },
  computed: {
    ...mapState(gameInfoStore, ['currentGameInfoStore', 'fastBetAmountStore', 'gameAmountStore']),
    ...mapState(userStore, ['presetvalStore']),
    wBetListData() {
      return JSON.parse(JSON.stringify(this.betListData))
    },
    betCheckedItem() {
      let arr = this.betTableData.filter(item => item.Check)
      return arr.length
    },
    betSumAmount() {
      let arr = this.betTableData.filter(item => item.Check)
      let sum = 0;
      arr.forEach(item => {
        sum = sum + Number(item.Amount)
      })
      return parseInt(sum)
    },
    wcurrentGameInfoStore() {
      return JSON.parse(JSON.stringify(this.currentGameInfoStore))
    },
    wPresetval() {
      return JSON.parse(JSON.stringify(this.presetvalStore))
    }
  },
  watch: {
    wBetListData: {
      handler(nval, oval) {
        let list = []
        let duplex = false
        if(nval.betData.hasOwnProperty('assembleData') && nval.betData.assembleData.length > 0){
          duplex = true
        }
        nval.showData.forEach(item => {
          if(!isNaN(item.Odds) && item.Odds > 0){
            list.push({
              Name: `${item.playName ? `${item.playName}${duplex ? ' [复式]':''}--` : ''}${item.Name}`,
              Odds: item.Odds,
              Keyname: item.Keyname,
              Amount: item.Amount,
              Check: true,
              pId: item.pId
            })
          }
        })
        this.betTableData = list
      },
      deep: true
    },
    fastBetAmountStore(nval) {
      this.emitAmountVal();
    },
    wcurrentGameInfoStore: {
      handler(nval) {
        if (nval.Status !== 1) {
          this.betDialogVisible = false
        }
      },
      deep: true
    },
    wPresetval: {
      handler(nval) {
        this.preCheck = nval.Status
        this.betAmount = nval.Value
      },
      deep: true
    },
    // betAmount(nval, oval){
    //   if(this.presetvalStore.Status){
    //     this.putPresetval(this.presetvalStore.Status, this.betAmount);
    //   }
    // }
  },
  async created() {
    await this.getSysIniBetAmount();
    await this.getQuickAmount();
    await this.getPresetval();
    document.addEventListener('keyup', this.hanleKeyUp)
  },
  mounted() {
    this.preCheck = this.presetvalStore.Status
    this.betAmount = this.presetvalStore.Value
  },
  methods: {
    ...mapActions(gameInfoStore, ['actNewOrder', 'upLMLongKeys', 'upGameAmount']),
    ...mapActions(userStore, ['upPresetval']),
    hanleKeyUp(e) {
      let key = window.event ? e.keyCode : e.which;
      if (key === 13) {

      }
    },
    async getSysIniBetAmount() {
      let res = await iGetSiteInfo('QuickM');
      if(res.length > 0){
        this.iniAmountBut = res[0].JsData.map(Number)
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
    // 未结金额
    async getGameQueryResult(lotterytype) {
      try {
        let res = await iGetGameQueryResult({
          lotteryType: lotterytype
        });
        this.gameResult = res.Result
        this.upGameAmount({
          UnResult: res.UnResult
        })
      } catch (e) {
        console.log(e);
      }
    },
    /*
    * 获取用户设置的快捷金额
    * */
    async getQuickAmount(){
      let res = await iGetQuickAmount();
      try {
        if(res && res.Status == 1){
          let code = false
          for(let i = 0;i < res.QuickAmount.length; i ++){
            if(res.QuickAmount[i] !== ''){
              code = true
              break;
            }
          }
          if(code){
            this.useAmountBut = res.QuickAmount
          }else{
            this.useAmountBut = JSON.parse(JSON.stringify(this.iniAmountBut))
          }
        }else{
          this.useAmountBut = JSON.parse(JSON.stringify(this.iniAmountBut))
          let code = false
          for(let i = 0;i < res.QuickAmount.length; i ++){
            if(res.QuickAmount[i] !== ''){
              code = true
              break;
            }
          }
          if(code){
            this.fastAmount = res.QuickAmount
          }else{
            this.fastAmount = ['', '', '', '', '']
          }
        }
        this.useAmountStatue = res.Status
        sessionStorage.setItem('quickAmount', JSON.stringify({
          QuickAmount: res.QuickAmount,
          Status: res.Status
        }))
      }catch (e) {
        this.useAmountBut = JSON.parse(JSON.stringify(this.iniAmountBut))
        this.fastAmount = ['', '', '', '', '']
      }
    },
    // 保存快选金额
    async saveQuickAmount(status, amount) {
      if (!this.submitButStatus) {
        this.submitButStatus = true
        let res = await iPutQuickAmount({
          Status: status,
          Amount: amount
        });
        if (res.Code === 0) {
          this.useAmountStatue = status
          if (status == 1) {
            this.useAmountBut = amount
          }else{
            this.useAmountBut = this.iniAmountBut
          }
          sessionStorage.setItem('quickAmount', JSON.stringify({
            QuickAmount: amount,
            Status: status
          }))
          this.fastAmount = JSON.parse(JSON.stringify(amount))
          alert(res.Msg)
          this.amountDialogVisible = false
        } else {
          alert(res.Msg)
        }
        this.submitButStatus = false
      }
    },
    onPreCheck(Status){
      this.putPresetval(Status, this.betAmount);
    },
    /*
    * 获取游戏金额预设状态
    * */
    async getPresetval(){
      try {
        let res = await iGetPresetval();
        if(res.Status){
          this.upPresetval({
            Status: res.Status,
            Value: res.Value ? res.Value:''
          })
        }
      }catch (e) {

      }

    },
    // 保存预设状态
    async putPresetval(Status, Value) {
      let res = await iPutPresetval({
        Status: Status,
        Value: Status ? Value: ''
      })
      if(res.Code === 0){
        this.upPresetval({
          Status: Status,
          Value: Status ? Value: ''
        })
      }
    },
    emitAmountVal() {
      this.$emit('pageAutoEnterBetAmount')
    },
    onButAmount(val) {
      this.betAmount = Number(this.betAmount) + Number(val);
      this.betAmount = parseInt(this.betAmount);
      this.emitAmountVal();
    },
    onResetBut() {
      this.$emit('pageResetSelBetItem')
    },

    /*
    * 下注格式1（单式）
    * */
    betFormat1() {
      let settingCode = []
      let betData = {}
      this.betTableData.forEach(item => {
        if (item.Check) {
          betData[item.Keyname] = {
            N: [],
            NS: [],
            NSG: [],
            Pl: item.Odds,
            Score: item.Amount
          }
          if (!settingCode.includes(item.pId)) {
            settingCode.push(item.pId)
          }
        }
      })

      return {
        settingCode: settingCode,
        betData: betData
      }
    },
    /*
    * 下注格式2（复试）
    * */
    betFormat2() {
      let settingCode = []
      let betData = {}
      this.betTableData.forEach(item => {
        if (item.Check) {
          if (item.Keyname === this.betListData.betData.Keyname) {
            betData[this.betListData.betData.pId] = {
              N: [],
              NS: this.betListData.betData.betItem,
              NSG: this.betListData.betData.assembleData,
              Score: Math.floor(this.betTableData[0].Amount / this.betListData.betData.assembleData.length)
            }
            //组合赔率
            if (typeof this.betListData.betData.Odds === 'object') {
              this.$set(betData[this.betListData.betData.pId], 'Pls', this.betListData.betData.Odds)
            } else {
              this.$set(betData[this.betListData.betData.pId], 'Pl', this.betListData.betData.Odds)
            }
            if (this.betListData.betData.hasOwnProperty('Dtype')) {
              this.$set(betData[this.betListData.betData.pId], 'Dtype', this.betListData.betData.Dtype)
            }
            settingCode = [this.betListData.betData.settingCode]
          }
        }
      })

      return {
        settingCode: settingCode,
        betData: betData
      }
    },
    /*
    * 下注格式3（复试,下注内容为key）
    * */
    betFormat3() {
      let settingCode = []
      let betData = {}
      this.betTableData.forEach(item => {
        if (item.Check) {
          let betkey = '';
          if (this.betListData.betData.hasOwnProperty('Dtype') && this.betListData.betData.Dtype === 10) {
            betkey = this.betListData.betData.betItem[0].split(',')[0]
          } else {
            betkey = this.betListData.betData.betItem[0]
          }
          if (item.Keyname === this.betListData.betData.Keyname) {
            betData[betkey] = {
              N: [],
              NS: this.betListData.betData.betItem,
              NSG: this.betListData.betData.assembleData,
              Score: Math.floor(this.betTableData[0].Amount / this.betListData.betData.assembleData.length)
            }
            //组合赔率
            if (typeof this.betListData.betData.Odds === 'object') {
              this.$set(betData[betkey], 'Pls', this.betListData.betData.Odds)
            } else {
              this.$set(betData[betkey], 'Pl', this.betListData.betData.Odds)
            }
            if (this.betListData.betData.hasOwnProperty('Dtype')) {
              this.$set(betData[betkey], 'Dtype', this.betListData.betData.Dtype)
            }
            settingCode = [this.betListData.betData.settingCode]
          }
        }
      })
      return {
        settingCode: settingCode,
        betData: betData
      }
    },
    /*
    * 对碰专用
    * */
    betFormat4() {
      let settingCode = []
      let betData = {}
      this.betTableData.forEach(item => {
        if (item.Check) {
          let betkey = '';
          betkey = this.betListData.betData.assembleData
          if (item.Keyname === this.betListData.betData.Keyname) {
            betData[betkey] = {
              N: [],
              NS: this.betListData.betData.betItem,
              NSG: [],
              Score: Math.floor(this.betTableData[0].Amount / this.betListData.betData.Odds.length),
              Pls: this.betListData.betData.Odds
            }
            //组合赔率
            if (this.betListData.betData.hasOwnProperty('Dtype')) {
              this.$set(betData[betkey], 'Dtype', this.betListData.betData.Dtype)
            }
            settingCode = [this.betListData.betData.settingCode]
          }
        }
      })
      return {
        settingCode: settingCode,
        betData: betData
      }
    },
    /*
    * 多赔率、多settingCode
    * */
    betFormat5() {
      let settingCode = []
      let betData = {}
      this.betTableData.forEach(item => {
        if (item.Check) {
          let betdata = this.betListData.betData.filter(b => b.Keyname === item.Keyname)
          if(betdata.length > 0){
            betData[item.Keyname] = {
              N: [],
              NS: [],
              NSG: [],
              Pls: betdata[0].Odds,
              Score: item.Amount
            }
            betdata[0].pId.forEach(item2 => {
              if (!settingCode.includes(item2)) {
                settingCode.push(item2)
              }
            })
          }
        }
      })

      return {
        settingCode: settingCode,
        betData: betData
      }
    },
    // 点击取消注单
    onCancelBet() {
      this.cancelDialogVisible = true
    },
    // 取消注单
    CancelBet() {
      this.$emit('pageResetSelBetItem')
      this.cancelDialogVisible = false
      this.closebetDialog(false)
    },
    // 关闭下注列表弹框
    closebetDialog(value) {
      this.betDialogVisible = false
    },
    // 关闭快选金额弹框
    closeAmountDialog(value) {
      this.amountDialogVisible = false
    },
    // 取消注单
    closeCancelDialog() {
      this.cancelDialogVisible = false
    },
    closeTitDialog(value) {
      this.betTitDialogVisible = false
    },
    selAllBet() {
      let betcontent = document.querySelectorAll('.bet-odd');
      betcontent.forEach(item => {
        item.click();
      })
      let betcontent2 = document.querySelectorAll('.odd');
      betcontent2.forEach(item => {
        item.click();
      })
    }
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.hanleKeyUp);
  }
}
</script>

<style scoped lang="less">
.bet-footer {
  border: 1px solid #bbc4ce;
  padding: 10px 0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  .but-amount {
    margin: 0px 10px;

    button + button {
      margin-left: 5px;
    }
  }

  .useamount-box {
    li {
      list-style: none;
      margin-top: 5px;

      input[type=text] {
        padding: 2px 5px;
        outline: none;
        width: 120px;
      }
    }
  }

  .v-modal {
    position: absolute;
  }

  .btn4 {
    height: 27px;
    width: 66px;
    margin: 0 0 0 8px;
    border-radius: 3px;
  }
  .btn1 {
    height: 27px;
    width: 66px;
    margin: 0 0 0 8px;
    border-radius: 3px;
  }
  .quickAmount {
    border: 1px solid #d8c28a;
    height: 22px;
    padding: 0 4px;
    width: 65px;
    background: url('~@/assets/img/text_input.gif') #fff repeat-x left top;
  }

  .money_btn {
    min-width: 20px;
    height: 24px;
    line-height: 24px;
    background: url("~@/assets/img/bg2.png") repeat-x 0 0;
    border: 1px solid #d8c28a;
    border-radius: 3px;
    color: #bd0000;
    font-weight: bold;
    margin-left: 3px;
    padding: 0 8px;
  }
}
//.el-checkbox {
//  margin-right: 20px;
//}
</style>