import topTime from "@/components/bet/topTime.vue";
import betFooter from "@/components/bet/betFooter.vue";
import {iGetManyPlayOdds, iGetPlayBetData} from "@/scripts/api/bet";
import {getAssembleType, getLottryTypeBcakName} from "@/scripts/uils/gamePlay";
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapActions, mapState} from "pinia";

export default {
  props:['currentGame'],
  data(){
    return{
      //下注列表数据
      betListData: {
        LotteryType:'',
        playName: '',
        //提交的下注数据
        betData: [],
        betType: 1,
        //显示的下注数据
        showData: []
      },
      selBetItem:[],
      //胆码
      selDanItem: [],
      //胆码个数
      selDanSize: 1,
      //拖码
      selTuoItem: [],
      combinationLimit: 300
    }
  },
  components:{
    betFooter,
    topTime
  },
  computed:{
    ...mapState(gameInfoStore,['currentGameInfoStore', 'LMLongKeysStore', 'serverTimeStore', 'betPausePlayStore']),
    checkedBet(){
      return (item) => {
        let cla = ''
        if(typeof(item) === 'object' && item.hasOwnProperty('Keyname')){
          if(this.selBetItem.includes(item.Keyname)){
            cla = 'checkedBet'
          }
        }
        return cla
      }
    },
    backName(){
      return (lotterytype) => {
        return getLottryTypeBcakName(lotterytype)
      }
    },
    changeGame(){
      return JSON.parse(JSON.stringify(this.currentGameInfoStore))
    },
    wCurrentGame(){
      return JSON.parse(JSON.stringify(this.currentGame))
    },
    wLMLong(){
      return JSON.parse(JSON.stringify(this.LMLongKeysStore))
    },
    wcurrentGameInfoStore(){
      return JSON.parse(JSON.stringify(this.currentGameInfoStore))
    },
    closeOdd(){
      return odd => {
        if(this.currentGameInfoStore.Status === 1){
          return odd
        }else{
          return '--'
        }
      }
    }
  },
  watch:{
    wCurrentGame:{
      async handler(nval,oval){
        // if(nval.LotteryType !== oval.LotteryType && nval.MoudleName === oval.MoudleName){
        //   await this.iniBetData();
        // }else{
          if(nval.currentPK != oval.currentPK){
            this.newOdds();
          }
        // }
      },
      deep:true
    },
    selDanSize(){
      this.selBetItem = [];
      this.selDanItem = [];
      this.selTuoItem = [];
    },
    // wCurrentGame:{
    //   handler(nval,oval){
    //     if(nval.LotteryType !== oval.LotteryType && nval.LotteryType !== ''){
    //       if(this.currentGame.PK !== ''){
    //         this.iniBetData();
    //       }
    //     }
    //   },
    //   deep: true
    // },
    wLMLong:{
      handler(nval, oval){
        this.selBetItem = nval
      },
      deep: true
    },
    wcurrentGameInfoStore:{
      handler(nval){
        if(nval.Status !== 1){
          this.selBetItem = []
          this.selTuoItem = []
          this.selDanItem = []
          this.pageResetSelBetItem();
        }
      },
      deep: true
    },
    serverTimeStore(nval){
      if(nval > this.currentGameInfoStore.CloseTime && this.currentGameInfoStore.Status == 1){
        this.upcurrentGameInfo({
          Status: 2
        })
        this.newOdds();
      }
    }
  },
  async mounted() {
    if(sessionStorage.getItem('LMLONGPATH') === this.$route.path){
      this.selBetItem = JSON.parse(JSON.stringify(this.LMLongKeysStore))
    }
    if(this.currentGame.LotteryType !== '' && this.currentGame.PK !== ''){
      this.upIniGameInfoStatus(true)
      await this.iniBetData();
      this.upIniGameInfoStatus(false)
    }
  },
  methods:{
    ...mapActions(gameInfoStore, ['upLMLongKeys', 'upShowFastBet', 'upcurrentGameInfo', 'upIniGameInfoStatus']),
    /*
    * 整理下注数据
    * */
    tidyBetData(tabledata, lotterytype, bettype = 1){
      this.betListData.betType = bettype;
      this.betListData.LotteryType = lotterytype
      this.betListData.betData = tabledata.betData
      if(tabledata.hasOwnProperty('showData') && tabledata.showData.length > 0){
        this.betListData.showData = tabledata.showData
      }else{
        this.betListData.showData = tabledata.betData
      }
    },
    /*
    * 重置选中的下注内容
    * */
    resetSelBetItem(tabledata){
      tabledata.forEach(item => {
        item.Amount = ''
      })
    },
    /*
    * 赋值点击下注内容的金额
    * */
    autoEnterBetAmount(val, selbetitem, tabledata){
      if(this.currentGameInfoStore.Status !== 1) return false
      for(let i in tabledata){
        if(selbetitem.includes(tabledata[i].Keyname)){
          tabledata[i].Amount = val.replace(/[^\d.]/g, '')
        }
      }
    },

    /*
    * 匹配下注内容赔率
    * */
    betContentOdd(odds, keyname) {
      let odd = '--'
      if (odds.hasOwnProperty(keyname) && this.currentGameInfoStore.Status == 1 ) {
        if(this.betPausePlayStore.hasOwnProperty(this.currentGameInfoStore.LotteryType) && this.betPausePlayStore[this.currentGameInfoStore.LotteryType].includes(keyname)){
					odd = '--'
				}else{
					odd = odds[keyname]
				}
      }
      return odd
    },
    /*
    * 获取玩法下注内容
    * */
    async playBetData(lotterytype, play) {
      let res = await iGetPlayBetData(lotterytype, play);
      return res.Data
    },
    /*
    * 获取多个玩法赔率
    * */
    async playOdds(lotterytype, play, pk) {
      let res = await iGetManyPlayOdds(lotterytype, play, pk);
      let oddData = {}
      for (let k in res.Data) {
        if(typeof res.Data[k] === 'object'){
          for (let k2 in res.Data[k]) {
            oddData[k2] = res.Data[k][k2]
          }
        }else{
          oddData[k] = res.Data[k]
        }

      }
      return oddData
    },
    openFastBetor(state){
      this.upShowFastBet(state)
    }
  }
}