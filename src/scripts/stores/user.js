import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => ({
    userInfo: {
      Acc: '',
      ScoreType: 0,
      Status: 0
    },
    // 额度类型：0信用、1现金
    scoreType:{
      0:'信用',
      1:'现金'
    },
    userGame:[],
    presetval: {
      Status: false,
      Value: ''
    },
    userNotices: []
  }),
  getters: {
    userInfoStore: state => state.userInfo,
    userGameStore: state => state.userGame,
    presetvalStore: state => state.presetval,
  },
  actions: {
    upUserInfo(obj){
      this.userInfo.Acc = obj.Name
      this.userInfo.ScoreType = this.scoreType[obj.ScoreType]
      this.userInfo.Status = obj.Status
    },
    upuserGame(data){
      this.userGame = data
    },
    upPresetval(obj){
      console.log(obj)
      for(let key in obj){
        if(this.presetval.hasOwnProperty(key)){
          this.presetval[key] = obj[key]
        }
      }

    },
    upUserNotices(data){
      this.userNotices = data
    }
  },
})

export default userStore