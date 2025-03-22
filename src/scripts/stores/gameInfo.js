import { defineStore } from 'pinia'

export const gameInfoStore = defineStore('gameInfoStore', {
  state: () => ({
    currentGameInfo:{
      LotteryType:'',
      MoudleName: '',
      //当期
      Installments:'',
      //上期
      Period: '',
      OpenTime: 0,
      CloseTime: 0,
      ResultTime: 0,
      PK: '',
      HomeUrl: '',
      Name:'',
      Result: [],
      NumNote:[],
      Status: 1,
      Scoretype: ''
    },
    //最新订单
    newOrder: {
      Iss:'',
      betList:[]
    },
    gameAmount: {
      Amount: 0,
      UnResult: 0,
    },
    //游戏暂停玩法
    betPausePlay: {},
    // 服务器时间
    serverTime: 0,
    //游戏初始化状态
    iniGameInfoStatus: false,
    //生肖对应号码
    SXYearNum: {},
    //用户开放游戏
    userGameList: [],
    //选中的长龙
    LMLongKeys: [],
    // 快捷下注选中的号码
    fastBetNum: [],
    // 快捷下注金额
    fastBetAmount: '',
    // 显示快捷下注
    showFastBet: false
  }),
  getters: {
    currentGameInfoStore: state => state.currentGameInfo,
    newOrderStore: state => state.newOrder,
    iniGameInfoStatusStore: state => state.iniGameInfoStatus,
    SXYearNumStore: state => state.SXYearNum,
    userGameListStore: state => state.userGameList,
    LMLongKeysStore: state => state.LMLongKeys,
    fastBetNumStore: state => state.fastBetNum,
    fastBetAmountStore: state => state.fastBetAmount,
    showFastBetStore: state => state.showFastBet,
    gameAmountStore: state => state.gameAmount,
    serverTimeStore: state => state.serverTime,
    betPausePlayStore: state => state.betPausePlay,
  },
  actions: {
    upcurrentGameInfo(obj){
      for(let k in obj){
        if(this.currentGameInfo.hasOwnProperty(k)){
          this.currentGameInfo[k] = obj[k]
        }
      }
    },
    actNewOrder(data){
      if (typeof data === 'object'){
        let newOrder = []
        data.betList.forEach(item => {
          newOrder.push(item)
        })
        this.newOrder.betList = newOrder
        this.newOrder.Iss = data.installment
      }
    },
    upSXYearNum(obj){
      if(Object.keys(obj).length === 12){
        this.SXYearNum = obj
      }
    },
    upUserGameList(data){
      this.userGameList = data
    },
    upLMLongKeys(data){
      this.LMLongKeys = data
    },
    upFastBetNum(data){
      if (typeof data === 'object'){
        this.fastBetNum = JSON.parse(JSON.stringify(data))
      }
    },
    upFastBetAmount(data){
      this.fastBetAmount = data
    },
    upShowFastBet(data){
      if (typeof data === "boolean"){
        this.showFastBet = data
      }
    },
    upServerTime(value){
      this.serverTime = value
    },
    upGameAmount(obj){
      for(let k in obj){
        if(this.gameAmount.hasOwnProperty(k)){
          this.gameAmount[k] = obj[k]
        }
      }
    },
    upBetPausePlay(obj){
      for(let k in obj){
        this.betPausePlay[k] = obj[k]
      }
    },
    upIniGameInfoStatus(value){
      this.iniGameInfoStatus = value
    }
  },
})

export default gameInfoStore