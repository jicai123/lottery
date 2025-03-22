<template>
  <div class="main-box" v-loading="loading" element-loading-text="数据加载中~">
    <div class="bar_tit">
      <ul>
        <li class="active">
          <b>今日已结</b>
        </li>
      </ul>
    </div>
    <table class="ex-table">
      <thead>
      <tr>
        <td>单号</td>
        <td>下注时间</td>
        <td>类型</td>
        <td>下注内容@赔率</td>
        <td>盘口</td>
        <td>下注金额</td>
        <td>退水(%)</td>
        <td>结果</td>
      </tr>
      </thead>
      <tbody>
      <template v-if="tableData.length > 0">
        <tr v-for="item in tableData">
          <td>
            {{item.OddNo}}
          </td>
          <td>
            {{item.Addtime}}
          </td>
          <td>
            <p>{{item.LotteryName}}</p>
            <p class="g-c-text">第{{item.Installments}}期</p>
          </td>
          <td :class="[{'detail' : item.DuplexType > 0}]" @click="OpenDuplexDialog(item)">
            <span class="b-c-text" :class="[{'b-txt' : item.DuplexType > 0}]">{{item.MidType}}--{{item.Displayname}}</span> @ <span class="r-c-text" :class="[{'b-txt' : item.DuplexType > 0}]">{{item.Odds}}</span>
          </td>
<!--          <td>-->
<!--            <span class="b-c-text">{{item.MidType}}&#45;&#45;{{item.Displayname}}</span> @ <span class="r-c-text">{{item.Odds}}</span>-->
<!--          </td>-->
          <td>
            {{item.OddsType}}
          </td>
          <td>
            {{item.BetAmount}}
          </td>
          <td>
            {{item.ReturnValue}}%
          </td>
          <td>
            <span  :class="[item.TotalResult >= 0 ? 'b-c-text':'r-c-text']">
              {{item.TotalResult}}
            </span>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="8">暂无数据！</td>
        </tr>
      </template>
      </tbody>
      <tfoot>
        <tr class="total-tr">
          <td colspan="5" style="font-weight: bold; text-align: right">此页面统计：{{pageSum.Count}} 笔</td>
          <td>{{pageSum.Amount}}</td>
          <td></td>
          <td :class="[pageSum.Result >= 0 ? 'b-c-text':'r-c-text']">{{pageSum.Result}}</td>
        </tr>
        <tr class="total-tr" v-show="pageSum.Tot > pageConfig.limit">
          <td colspan="5" style="font-weight: bold; text-align: right">总计：{{allSum.Count}} 笔</td>
          <td>{{allSum.Amount}}</td>
          <td></td>
          <td :class="[allSum.Result >= 0 ? 'b-c-text':'r-c-text']">{{allSum.Result}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="pagination-box">
      <el-pagination
          small
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageConfig.page"
          :page-size="pageConfig.limit"
          layout="total, prev, pager, next"
          :total="pageSum.Tot">
      </el-pagination>
    </div>
    <myDialog1 :isVisible="DuplexDialogVisible"
               width="700px"
               :modal="true"
               :showPage="true"
               @closeDialog="CloseDuplexDialog">
      <template v-slot:tit>复式明细</template>
      <template v-slot>
        <table class="d-table">
          <thead>
          <tr>
            <td>序号</td>
            <td>投注内容</td>
            <td>下注金额</td>
            <td>退水(%)</td>
            <td>下注结果</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in DuplexTableData">
            <td>
              {{index + 1}}
            </td>
            <td>
              <span class="b-c-text">{{item.MidType}} 〖{{item.Displayname}}〗</span> @ <span class="r-c-text">{{item.Odds}}</span>
            </td>
            <td>
              {{item.BetAmount}}
            </td>
            <td>
              {{item.ReturnValue}}%
            </td>
            <td>
              {{item.MemAmount}}
            </td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">
                合计：{{DuplexTableSum.Tot}}笔
              </td>
              <td>
                {{DuplexTableSum.BetAmount}}
              </td>
              <td></td>
              <td>
                {{DuplexTableSum.Result}}
              </td>
            </tr>
          </tfoot>
        </table>
      </template>
      <template v-slot:page>
        <el-pagination
            small
            background
            @current-change="DuplexCurrentPageChange"
            :current-page="DuplexPageConfig.page"
            layout="prev, pager, next"
            :page-size="15"
            :total="DuplexTableSum.Tot">
        </el-pagination>
      </template>
    </myDialog1>
  </div>
</template>

<script>
import {iGetDuplexDetail, iGetPrfsettlOrder} from "@/scripts/api/commonly";
export default {
  //今日已结
  name: "prfSettle",
  components:{
    myDialog1: () => import('@/components/bet/myDialog1.vue')
  },
  data(){
    return{
      DuplexDialogVisible: false,
      DuplexTableData: [],
      DuplexTableSum: {
        BetAmount: 0,
        Count: 0,
        Result: 0,
        Tot: 0
      },
      tableData:[],
      pageSum: {
        Amount: 0,
        Count: 0,
        Result: 0,
        Tot: 0
      },
      allSum: {
        Amount: 0,
        Count: 0,
        Result: 0
      },
      pageConfig:{
        page: 1,
        limit: 15
      },
      loading: true,
      DuplexPageConfig:{
        page: 1,
        limit: 15
      },
    }
  },
  created() {
    this.getUnsettlOrder();
  },
  methods:{
    async getDuplexDetail(id){
      let res = await iGetDuplexDetail({
        betId: id,
        page: this.DuplexPageConfig.page
      })
      this.DuplexTableData = res.BetList
      this.DuplexTableSum.BetAmount = res.Sum.BetAmount
      this.DuplexTableSum.Count = res.Sum.Count
      this.DuplexTableSum.Result = res.Sum.Result
      this.DuplexTableSum.Tot = res.Tot
    },
    async OpenDuplexDialog(row){
      if(row.DuplexType > 0){
        this.DuplexPageConfig.id = row.Id
        await this.getDuplexDetail(this.DuplexPageConfig.id);
        this.DuplexDialogVisible = true
      }
    },
    CloseDuplexDialog(){
      this.DuplexDialogVisible = false
      this.DuplexPageConfig.page = 1
      this.DuplexPageConfig.id = ''
    },
    DuplexCurrentPageChange(value){
      this.DuplexPageConfig.page = Number(value);
      this.getDuplexDetail(this.DuplexPageConfig.id);
    },
    async getUnsettlOrder(){
      this.loading = true
      let res = await iGetPrfsettlOrder(this.pageConfig);
      this.tableData = res.BetList
      if(res.hasOwnProperty('Sum')){
        this.pageSum.Amount = res.Sum.TotalBettingAmount
        this.pageSum.Count = res.Sum.TotalCount
        this.pageSum.Result = res.Sum.TotalResult
        this.pageSum.Tot = res.Tot
      }
      if(res.hasOwnProperty('AllSum')){
        this.allSum.Amount = res.AllSum.TotalBettingAmount
        this.allSum.Count = res.AllSum.TotalCount
        this.allSum.Result = res.AllSum.TotalResult
      }
      this.loading = false
    },
    handleSizeChange(val){
      this.pageConfig.limit = val
      this.getUnsettlOrder();
    },
    handleCurrentChange(val){
      this.pageConfig.page = val
      this.getUnsettlOrder();
    }
  }
}
</script>

<style scoped lang="less">
.ex-table{
  tbody{
    tr:hover{
      background: #ffffc6;
    }
  }
  tfoot{
    background: #f2f2f2;
  }
}

.detail{
  cursor: pointer;
}

</style>