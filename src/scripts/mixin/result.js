import gameInfoStore from "@/scripts/stores/gameInfo";
import {urlQueryFn} from "@/scripts/uils/httpFn";
import {mapState} from "pinia";

export default {
  data(){
    return{
      tableData:[],
      pageConfig:{
        page: 1,
        limit: 15
      },
      Tot: 0,
      loading: true,
      gameOptions:[],
      openGame: this.$route.query.lotteryType,
      showLotteryDate: false,
      chooseDate: ''
    }
  },
  computed:{
      ...mapState(gameInfoStore, ['userGameListStore']),
  },
  watch:{
    $route:{
      handler(nval, oval){
        if(nval.name === oval.name && nval.query.lotteryType !== oval.query.lotteryType){
          this.getUnsettlOrder(this.$route.query.lotteryType, this.chooseDate);
          this.showLotteryDate = this.codeShowDate(this.$route.query.lotteryType)
        }
      },
      deep:true
    }
  },
  created() {
    this.gameOptions = JSON.parse(JSON.stringify(this.userGameListStore))
    if(this.$route.query.hasOwnProperty('day')){
      this.chooseDate = this.$route.query.day
    }
    this.getUnsettlOrder(this.$route.query.lotteryType, this.chooseDate);
    this.showLotteryDate = this.codeShowDate(this.$route.query.lotteryType)
  },
  methods:{
    changeGame(lotteryType){
      let game = this.userGameListStore.filter(g => g.LotteryType === lotteryType)
      if(game.length > 0){
        let path = ''
        let query = {
          lotteryType: '',
          day: ''
        }
        switch (game[0].MoudleName) {
          case 'LHC':
            path = `/History/LHC`
            break;
          case 'FT5':
            path = `/History/FT5`
            break;
          case 'PK10FT3':
            path = `/History/PK10FT3`
            break;
          case 'PK10':
            path = `/History/PK10`
            break;
          case 'SSC':
            path = `/History/SSC`
            break;
          case 'K3':
            path = `/History/K3`
            break;
          case 'XY5FT2':
            path = `/History/XY5FT2`
            break;
          case 'BG5':
            path = `/History/BG5`
            break;
          default:
            path = `/`
        }
        query.lotteryType = game[0].LotteryType
        if(game[0].ShowDate == 1){
          this.chooseDate = this.$dayjs().format('YYYY-MM-DD')
          this.showLotteryDate = true
          query.day = this.chooseDate
        }else{
          this.showLotteryDate = false
          this.chooseDate = ''
          query.day = ''
        }
        this.$router.push({
          path: `${path}${urlQueryFn(query)}`,
        })
        this.openGame = lotteryType
        this.pageConfig.page = 1
        this.pageConfig.limit = 15
        // this.getUnsettlOrder(this.$route.query.lotteryType, this.chooseDate);
      }
    },
    codeShowDate(lotteryType){
      let day = false
      let code = this.userGameListStore.filter(g => g.LotteryType === lotteryType)
      if(code.length > 0){
        day = code[0].ShowDate ? true: false
      }
      return day
    },
    handleChangeDate(game, day){
      this.getUnsettlOrder(game, day);
    },
    handleSizeChange(val){
      this.pageConfig.limit = val
      this.getUnsettlOrder();
    },
    handleCurrentChange(val){
      this.pageConfig.page = val
      this.getUnsettlOrder(this.$route.query.lotteryType, this.chooseDate);
    },
  }
}