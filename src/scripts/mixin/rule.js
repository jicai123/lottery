import {iGetHomeUrl} from "@/scripts/api/summary";

export default {
  data(){
    return{
      Homeurl:[],
      Note: '',
      loading: false,
      currentGame: '',
    }
  },
  watch: {
    currentGame(nval, oval){
      this.getHomeUrl(nval)
    },
    $route:{
      handler(nval, oval){
        if(nval.name === oval.name && nval.query.game !== oval.query.game){
          this.currentGame = nval.query.game
        }
      },
      deep: true
    }
  },
  created(){
    if(this.$route.query.hasOwnProperty('game')){
      this.currentGame = this.$route.query.game
    }
  },
  methods: {
    selGame(game){
      this.currentGame = game
    },
    async getHomeUrl(lotteryType){
      let res = await iGetHomeUrl(lotteryType)
      let Homeurl = JSON.parse(res.Homeurl)
      let HomeurlArr = []
      Homeurl.forEach(item => {
        console.log(item, item.trim())
        if(item.trim().length > 0){
          HomeurlArr.push(item)
        }
      })
      this.Homeurl = HomeurlArr
      this.Note = res.Note
    },
  }
}