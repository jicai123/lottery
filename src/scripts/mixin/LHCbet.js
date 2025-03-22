import {rbgBallColor} from "@/scripts/uils/lottery";

export default {
  props: ['currentGame', 'currentPK'],
  data() {
    return {
      LHCSXData: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
      LHCSXDataKey: ['shu', 'niu', 'hu', 'tu', 'long', 'she', 'ma', 'yang', 'hou', 'ji', 'gou', 'zhu'],
    }
  },
  computed:{
    pageSXToNum(sx){
      return sx => {
        let arr = []
        if(this.SXYearNumStore.hasOwnProperty(sx)){
          arr = this.SXYearNumStore[sx]
        }
        return arr
      }
    },
    pageWSToNum(ws){
      return ws => {
        return this.LHCWSToNum(ws)
      }
    }
  },
  methods:{
    /*
    * 六合彩号码颜色
    * */
    LHCBallColor(n, nprefix = this.BallPrefix || ''){
      return rbgBallColor(nprefix, n);
    },
    /*
    * 选中内容
    * */
    selComContent(comdata, content){
      let i = comdata.indexOf(content)
      if(i !== -1){
        comdata.splice(i , 1)
      }else{
        comdata.push(content)
      }
    },

    /*
    * 六合彩尾数
    * */
    LHCWSToNum(name){
      let wNum = name.replace(/[^\d.]/g, '')
      let wObj = []
      for(let i = 1; i < 50; i++){
        if(i % 10 == wNum){
          wObj.push(i)
        }
      }
      return wObj
    }
  }
}