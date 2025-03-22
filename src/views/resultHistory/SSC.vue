<template>
  <div class="main-box" v-loading="loading" element-loading-text="数据加载中~">
    <div class="bar_tit">
      <ul>
        <li class="active">
          <b>开奖结果</b>
        </li>
      </ul>
      <div class="r-box">
        <label>
          彩种选择
          <select v-model="openGame" placeholder="请选择" @change="changeGame(openGame, chooseDate)">
            <option
                v-for="item in gameOptions"
                :key="item.LotteryType"
                :label="item.Name"
                :value="item.LotteryType">
            </option>
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label v-show="showLotteryDate">
          日期
          <el-date-picker
              size="mini"
              @change="handleChangeDate(openGame, chooseDate)"
              v-model="chooseDate"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </label>
      </div>
    </div>
    <table class="ex-table" style="width: 800px">
      <thead>
      <tr>
        <td>期数</td>
        <td>日期</td>
        <td>结果</td>
        <td colspan="3" style="width: 90px">总和</td>
        <td>龙虎</td>
        <td>前三</td>
        <td>总三</td>
        <td>后三</td>
      </tr>
      </thead>
      <tbody>
      <template v-if="tableData.length > 0">
        <tr v-for="(item,index) in tableData" :key="`open${index}`">
          <td>{{item.Issue}}</td>
          <td>{{ item.Date }}</td>
          <td class="lotteryNumber">
            <ul>
              <li v-for="num in item.Num">
                <div class="xy5ball">
                  <span>{{Number(num)}}</span>
                </div>
              </li>
            </ul>
          </td>
          <td>
            <b>{{NUM_SUM(item.Num)}}</b>
          </td>
          <td :class="NUM_SUM(item.Num) | NUM_DX | text_color">
            <b>{{NUM_SUM(item.Num) | NUM_DX}}</b>
          </td>
          <td :class="NUM_SUM(item.Num) | NUM_DS | text_color">
            <b>{{NUM_SUM(item.Num) | NUM_DS}}</b>
          </td>
          <td :class="LH(item.Num[0], item.Num[4]) | text_color">
            <b>{{LH(item.Num[0], item.Num[4])}}</b>
          </td>
          <td class="r-c-text">
            <b>{{[item.Num[0], item.Num[1], item.Num[2]] | NUM_XT}}</b>
          </td>
          <td class="r-c-text">
            <b>{{[item.Num[1], item.Num[2], item.Num[3]] | NUM_XT}}</b>
          </td>
          <td class="r-c-text">
            <b>{{[item.Num[2], item.Num[3], item.Num[4]] | NUM_XT}}</b>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="30">暂无数据！</td>
        </tr>
      </template>
      </tbody>
    </table>
    <div class="pagination-box" v-show="!showLotteryDate">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageConfig.page"
          :page-sizes="[15, 30, 50]"
          :page-size="pageConfig.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Tot">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {iGetResultHistory} from "@/scripts/api/commonly";
import result from "@/scripts/mixin/result";

export default {
  name: "SSCHistory",
  mixins:[result],
  computed:{
    LH(){
      return (n1, n2) => {
        if(n1 > n2){
          return '龙'
        }else if(n1 < n2){
          return '虎'
        }else{
          return '和'
        }
      }
    },
    NUM_SUM(){
      return arr => {
        let sum = 0
        arr.forEach(item => {
          sum += Number(item)
        })
        return sum
      }
    }
  },
  filters: {
    NUM_DS: (n) => {
      if(n % 2 === 0){
        return '双'
      }else{
        return '单'
      }
    },
    NUM_DX: (sum) => {
      if(sum > 22){
        return '大'
      }else{
        return '小'
      }
    },
    NUM_XT: (arr) => {
      arr = arr.sort((a,b)=>{
        return b - a
      })
      if(arr[0] == arr[arr.length - 1]){
        return '豹子'
      }
      if(arr[0] - 1 ==  arr[1] && arr[1] - 1 ==  arr[2]){
        return '顺子'
      }
      if(arr[0] ==  arr[1] || arr[1] ==  arr[2]){
        return '对子'
      }
      if(arr[0] - 1 ==  arr[1] || arr[1] - 1 ==  arr[2]){
        return '半顺'
      }
      if(arr[0] - 1 !=  arr[1] && arr[1] - 1 !=  arr[2]){
        return '杂六'
      }
    },
    text_color(n){
      switch (n) {
        case '大':
          return 'r-c-text'
        case '单':
          return 'r-c-text'
        case '龙':
          return 'r-c-text'
        case '和':
          return 'g-c-text'
      }
    }
  },
  methods:{
    // 获取开奖数据
    async getUnsettlOrder(LotteryType, day){
      this.loading = true
      let res = await iGetResultHistory(LotteryType,{
        page: day ? '':this.pageConfig.page,
        date: day
      });
      let darr = [];
      res.List.forEach(item => {
        let numArr = item.Opencode.split(',');
        darr.push({
          Issue: item.Issue,
          Date: item.Opentime,
          Num: numArr,
        })
      })
      this.Tot = Math.ceil(res.Tot / this.pageConfig.limit)
      this.tableData = darr;
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.ex-table{
  margin: auto;
}
/deep/.r-box{
  position: relative;
  select{
    height: 22px;
    line-height: 22px;
  }
  .el-date-editor{
    width: 130px;
    .el-input__inner{
      height: 20px;
      line-height: 20px;
      border-radius: 0;
      border:1px solid #121212;
    }
    .el-input__icon{
      line-height: 20px;
      color: #000000;
    }
  }
  .choose-box{
    position: absolute;
    right: 20px;
    top: 12px;
  }
}
.lotteryNumber{
  ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    li{
      float: left;
      list-style: none;
    }
  }
  li + li{
    margin-left: 4px;
  }
  .xy5ball{
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    border: 4px solid #2a67b6;
    font-weight: bold;
  }
}
.gap-td{
  background: #f3f3f3;
}
</style>