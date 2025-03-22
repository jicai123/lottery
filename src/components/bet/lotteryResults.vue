<template>
  <div class="resultNum">
    <div class="gameiss">
      <p>{{currentGameInfoStore.Name}}</p>
      <p>{{currentGameInfoStore.Period}}期开奖</p>
    </div>
    <div class="result-box lhc" v-if="currentGameInfoStore.MoudleName === 'LHC'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li v-if="index === 6" class="tico">
            <div>
              <b>+</b>
            </div>
            <p> </p>
          </li>
          <li>
            <div class="num-ball" :class="LHCBallColor(item,'Ball_1_')">
              <b>{{item.padStart(2, '0')}}</b>
            </div>
            <p>{{currentGameInfoStore.NumNote[index]}}</p>
          </li>
        </template>
      </ul>
    </div>
    <div class="result-box XY5" v-if="currentGameInfoStore.MoudleName === 'FT5'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="num-ball">
              <b>{{item}}</b>
            </div>
            <p>{{FT_F(item)}}番</p>
          </li>
        </template>
      </ul>
    </div>
    <div class="result-box BG5" v-if="currentGameInfoStore.MoudleName === 'BG5'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="num-ball">
              <b>{{item}}</b>
            </div>
            <p>{{NUM_DX(item, 41)}}|{{NUM_DS(item)}}</p>
          </li>
        </template>
        <li class="bg5-hz">
          <b>{{Result_SUM(currentGameInfoStore.Result)}}</b>
        </li>
        <li class="bg5-hz">
          <b>{{BG5_LH(currentGameInfoStore.Result)}}</b>
        </li>
      </ul>
    </div>
    <div class="result-box PK10" v-if="currentGameInfoStore.MoudleName === 'PK10FT3' || currentGameInfoStore.MoudleName === 'PK10'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="num-ball" :class="`pk10_${Number(item)}_back`">
              <b><em>{{Number(item)}}</em></b>
            </div>
          </li>
        </template>
      </ul>
      <div class="f-tit" v-if="currentGameInfoStore.MoudleName === 'PK10FT3'">
        <b>前三：{{PK10QZH3FT(currentGameInfoStore.Result, 'B1')}}</b>
        <b>中三：{{PK10QZH3FT(currentGameInfoStore.Result, 'B2')}}</b>
        <b>后三：{{PK10QZH3FT(currentGameInfoStore.Result, 'B3')}}</b>
      </div>
      <div class="f-tit long" v-if="currentGameInfoStore.MoudleName === 'PK10'">
        <b>总和{{Result_SUM([currentGameInfoStore.Result[0], currentGameInfoStore.Result[1]])}}</b>
        <b>{{NUM_DS(Result_SUM([currentGameInfoStore.Result[0], currentGameInfoStore.Result[1]]))}}</b>
        <b>{{NUM_DX(Result_SUM([currentGameInfoStore.Result[0], currentGameInfoStore.Result[1]]), 12)}}</b>
        <b>|</b>
        <b>{{LH(currentGameInfoStore.Result[0], currentGameInfoStore.Result[9])}}</b>
        <b>{{LH(currentGameInfoStore.Result[1], currentGameInfoStore.Result[8])}}</b>
        <b>{{LH(currentGameInfoStore.Result[2], currentGameInfoStore.Result[7])}}</b>
        <b>{{LH(currentGameInfoStore.Result[3], currentGameInfoStore.Result[6])}}</b>
        <b>{{LH(currentGameInfoStore.Result[4], currentGameInfoStore.Result[5])}}</b>
      </div>
    </div>
    <div class="result-box XY5" v-if="currentGameInfoStore.MoudleName === 'XY5FT2'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="num-ball">
              <b>{{Number(item)}}</b>
            </div>
          </li>
        </template>
      </ul>
      <div class="f-tit">
        <b>和值：{{XY5FT2(currentGameInfoStore.Result, 'B1')}}</b>
        <b>后二：{{XY5FT2(currentGameInfoStore.Result, 'B2')}}</b>
      </div>
    </div>
    <div class="result-box XY5" v-if="currentGameInfoStore.MoudleName === 'SSC'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="num-ball">
              <b>{{item}}</b>
            </div>
          </li>
        </template>
      </ul>
      <div class="f-tit">
        <b>总和：{{Result_SUM(currentGameInfoStore.Result)}}</b>
        <b>{{NUM_DS(Result_SUM(currentGameInfoStore.Result))}}</b>
        <b>{{NUM_DX(Result_SUM(currentGameInfoStore.Result), 23)}}</b>
        <b>{{LH(currentGameInfoStore.Result[0], currentGameInfoStore.Result[4])}}</b>
      </div>
    </div>
    <div class="result-box K3" v-if="currentGameInfoStore.MoudleName === 'K3'">
      <ul>
        <template v-for="(item,index) in currentGameInfoStore.Result">
          <li>
            <div class="k3-ball" :class="`K3_${Number(item)}`"></div>
          </li>
        </template>
      </ul>
      <div class="f-tit">
        <b>总和：{{Result_SUM(currentGameInfoStore.Result)}}</b>
        <b>{{NUM_DS(Result_SUM(currentGameInfoStore.Result))}}</b>
        <b>{{NUM_DX(Result_SUM(currentGameInfoStore.Result), 10)}}</b>
      </div>
    </div>
  </div>
</template>

<script>
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapState} from "pinia";
import {rbgBallColor} from "@/scripts/uils/lottery";
export default {
  name: "lotteryResults",
  computed:{
    ...mapState(gameInfoStore, ['currentGameInfoStore']),
    FT_F(){
      return n => {
        let nf = n % 4
        if(nf === 0){
          nf = 4
        }
        return `${nf}`
      }
    },
    NUM_DS(){
      return n => {
        if(n % 2 === 0){
          return '双'
        } else{
          return '单'
        }

      }
    },
    NUM_DX(){
      return (n,code) => {
        if(n < code){
          return '小'
        } else{
          return '大'
        }
      }
    },
    LH(){
      return (n1,n2) => {
        if(Number(n1) > Number(n2)){
          return '龙'
        }else if(Number(n1) < Number(n2)){
          return '虎'
        }else{
          return '和'
        }
      }
    },
    Result_SUM(){
      return arr => {
        let sum = 0
        arr.forEach(item => {
          sum += Number(item)
        })
        return sum
      }
    },
    BG5_LH(){
      return arr => {
        let lh = '龙'
        if(Number(arr[0]) < Number(arr[arr.length - 1])){
          lh = '虎'
        }
        return lh
      }
    },
    PK10QZH3FT(){
      return (result, ball) => {
        let n = 1;
        if(ball === 'B1'){
          n = Number(result[0]) + Number(result[1]) + Number(result[2])
        }else if(ball === 'B2'){
          n = Number(result[4]) + Number(result[5]) + Number(result[6])
        }else if(ball === 'B3'){
          n = Number(result[7]) + Number(result[8]) + Number(result[9])
        }
        let nf = n % 4
        if(nf === 0){
          nf = 4
        }
        return `${nf}番`
      }
    },
    XY5FT2(){
      return (result, ball) => {
        let n = 1;
        if(ball === 'B1'){
          n = Number(result[0]) + Number(result[1]) + Number(result[2]) + Number(result[3]) + Number(result[4])
        }else if(ball === 'B2'){
          n = Number(result[3]) + Number(result[4])
        }
        let nf = n % 4
        if(nf === 0){
          nf = 4
        }
        return `${nf}番`
      }
    }
  },
  methods:{
    LHCBallColor(n, nprefix){
      return rbgBallColor(nprefix, n);
    },
    FT5BallColor(n, nprefix){
      let c = n % 3
      let colorName = ''
      if(c === 0){
        c = 3
      }
      if(c === 1){
        colorName = `${nprefix}R`
      }else if(c === 2){
        colorName = `${nprefix}G`
      }else{
        colorName = `${nprefix}B`
      }
      return colorName
    },
  }
}
</script>

<style scoped lang="less">
.resultNum{
  display: flex;
  align-items: center;
  flex-direction: row;
  .gameiss{
    color: #ffd100;
    font-size: 12px;
    padding: 0 10px 0px 30px;
    p{
      line-height: 18px;
    }
  }
  .result-box{
    li{
      list-style: none;
      float: left;
      width: 25px;
      height: 46px;
      .num-ball{
        width: 27px;
        height: 26px;
        line-height: 24px;
        font-size: 14px;
        margin: auto;
      }
      b{
        margin-left: -3px;
      }
      p{
        color: #ffffff;
        font-weight: bold;
        font-size: 12px;
        line-height: 20px;
      }
    }
    .tico{
      color: #ffd100;
      width: 10px;
      line-height: 26px;
    }
    .f-tit{
      color: #ffffff;
      text-align: center;
      b + b{
        margin-left: 25px;
      }
    }
    .f-tit.long{
      b + b{
        margin-left: 10px;
      }
    }
  }
  .lhc{
    li{
      margin-left: 10px;
    }
  }
  .ft5{
    li{
      margin-left: 20px;
    }
  }
  .bg5-hz{
    color: #ffffff;
    line-height: 26px;
  }
  .PK10 {
    .num-ball{
      font-size: 18px !important;
      color: #ffffff;
      text-stroke:1px #898989;
      -webkit-text-stroke:1px #898989;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      b{
        margin-left: 0;
      }
    }
  }
  .PK10,.XY5{
    li{
      margin-left: 2px;
      width: auto;
      height: auto;

    }
  }
  .XY5{
    li{
      margin-left: 20px;
    }
    .num-ball{
      width: 22px !important;
      height: 22px !important;;
      font-size: 20px;
      border-radius: 50%;
      background: #ffffff;
      border: 4px solid #468ce7;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      b{
        margin-left: 0;
      }
    }
  }
  .BG5{
    li{
      width: 30px;
      margin-left: 10px;
      display: inline-block;
    }
    .num-ball{
      width: 22px !important;
      height: 22px !important;;
      font-size: 20px;
      border-radius: 50%;
      background: #ffffff;
      border: 4px solid #468ce7;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      b{
        margin-left: 0;
      }
    }
  }
  .K3{
    li{
      margin-left: 20px;
      height: 26px;
    }
    .k3-ball{
      width: 26px;
      height: 26px;
    }
  }
}
</style>