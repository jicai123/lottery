<template>
  <div class="fastbet-box" v-show="true">
    <div class="fastbet-tit">
      快选
    </div>
<!--    <table class="fast-table">-->
<!--      <tbody>-->
<!--      <tr v-for="(itr,index) in 10">-->
<!--        <td v-for="(itd,index2) in 5">-->
<!--          <span class="bnum"-->
<!--                :class="[{'checkednum' : fastBetNumStore.includes(index + 1 + index2 * 10)}]"-->
<!--                v-if="index + 1 + index2 * 10 < 50"-->
<!--                @click="onNumTd(index + 1 + index2 * 10)">-->
<!--            {{ index + 1 + index2 * 10 }}-->
<!--          </span>-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td colspan="5"></td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td colspan="5">-->
<!--          <b>金额：</b><input type="text" v-model="Amount" v-int>-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td colspan="5">-->
<!--          <el-button size="mini">下注</el-button>-->
<!--          <el-button size="mini" @click="resetSelNum">重置</el-button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <table class="fast-table">-->
<!--      <tbody>-->
<!--      <tr>-->
<!--        <td>-->
<!--          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB)">-->
<!--            <span class="r-c-text">{{ fastNumItem.RB.label }}</span>-->
<!--          </el-checkbox>-->
<!--        </td>-->
<!--        <td>-->
<!--          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB)">-->
<!--            <span class="b-c-text">{{ fastNumItem.BB.label }}</span>-->
<!--          </el-checkbox>-->
<!--        </td>-->
<!--        <td>-->
<!--          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB)">-->
<!--            <span class="g-c-text">{{ fastNumItem.GB.label }}</span>-->
<!--          </el-checkbox>-->
<!--        </td>-->
<!--        <td></td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
    <table class="fast-table">
      <tbody>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB)">
            <span class="r-c-text">{{ fastNumItem.RB.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB)">
            <span class="b-c-text">{{ fastNumItem.BB.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB)">
            <span class="g-c-text">{{ fastNumItem.GB.label }}</span>
          </el-checkbox>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB_DX_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB_DX_D)">
            <span class="r-c-text">{{ fastNumItem.RB_DX_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB_DX_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB_DX_D)">
            <span class="b-c-text">{{ fastNumItem.BB_DX_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB_DX_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB_DX_D)">
            <span class="g-c-text">{{ fastNumItem.GB_DX_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.N_DX_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.N_DX_D)">
            <span class="r-c-text">{{ fastNumItem.N_DX_D.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB_DX_X.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB_DX_X)">
            <span class="r-c-text">{{ fastNumItem.RB_DX_X.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB_DX_X.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB_DX_X)">
            <span class="b-c-text">{{ fastNumItem.BB_DX_X.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB_DX_X.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB_DX_X)">
            <span class="g-c-text">{{ fastNumItem.GB_DX_X.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.N_DX_X.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.N_DX_X)">
            <span class="r-c-text">{{ fastNumItem.N_DX_X.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB_DS_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB_DS_D)">
            <span class="r-c-text">{{ fastNumItem.RB_DS_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB_DS_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB_DS_D)">
            <span class="b-c-text">{{ fastNumItem.BB_DS_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB_DS_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB_DS_D)">
            <span class="g-c-text">{{ fastNumItem.GB_DS_D.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.N_DS_D.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.N_DS_D)">
            <span class="r-c-text">{{ fastNumItem.N_DS_D.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.RB_DS_S.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.RB_DS_S)">
            <span class="r-c-text">{{ fastNumItem.RB_DS_S.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.BB_DS_S.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.BB_DS_S)">
            <span class="b-c-text">{{ fastNumItem.BB_DS_S.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GB_DS_S.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.GB_DS_S)">
            <span class="g-c-text">{{ fastNumItem.GB_DS_S.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.N_DS_S.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.N_DS_S)">
            <span class="r-c-text">{{ fastNumItem.N_DS_S.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.DXSD_DD.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.DXSD_DD)">
            <span class="r-c-text">{{ fastNumItem.DXSD_DD.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.DXSD_DS.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.DXSD_DS)">
            <span class="r-c-text">{{ fastNumItem.DXSD_DS.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.DXSD_XD.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.DXSD_XD)">
            <span class="b-c-text">{{ fastNumItem.DXSD_XD.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.DXSD_XS.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.DXSD_XS)">
            <span class="b-c-text">{{ fastNumItem.DXSD_XS.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.HDS_HD.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.HDS_HD)">
            <span class="r-c-text">{{ fastNumItem.HDS_HD.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.HDS_HS.Key" :disabled="banStatus" @change="onFastItem($event,fastNumItem.HDS_HS)">
            <span class="r-c-text">{{ fastNumItem.HDS_HS.label }}</span>
          </el-checkbox>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.JYSX_J.Key" :disabled="banStatus" @change="onJYFastItem($event,fastNumItem.JYSX_J)">
            <span class="b-c-text">{{ fastNumItem.JYSX_J.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.JYSX_Y.Key" :disabled="banStatus" @change="onJYFastItem($event,fastNumItem.JYSX_Y)">
            <span class="b-c-text">{{ fastNumItem.JYSX_Y.label }}</span>
          </el-checkbox>
        </td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table>
    <table class="fast-table">
      <tbody>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.SHU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.SHU)">
            <span>{{ fastNumItem.SHU.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.NIU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.NIU)">
            <span>{{ fastNumItem.NIU.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.HU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.HU)">
            <span>{{ fastNumItem.HU.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.TU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.TU)">
            <span>{{ fastNumItem.TU.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.LONG.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.LONG)">
            <span>{{ fastNumItem.LONG.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.SHE.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.SHE)">
            <span>{{ fastNumItem.SHE.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.MA.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.MA)">
            <span>{{ fastNumItem.MA.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.YANG.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.YANG)">
            <span>{{ fastNumItem.YANG.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.HOU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.HOU)">
            <span>{{ fastNumItem.HOU.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.JI.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.JI)">
            <span>{{ fastNumItem.JI.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.GOU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.GOU)">
            <span>{{ fastNumItem.GOU.label }}</span>
          </el-checkbox>
        </td>
        <td>
          <el-checkbox v-model="selNumItem" :label="fastNumItem.ZHU.Key" :disabled="banStatus" @change="onSXFastItem($event,fastNumItem.ZHU)">
            <span>{{ fastNumItem.ZHU.label }}</span>
          </el-checkbox>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapActions, mapState} from "pinia";
export default {
  name: "LHCFastBet",
  data() {
    return {
      fastNumItem: {
        RB: {
          Key: 'RB',
          label: '红波',
          BetNum: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
        },
        BB: {
          Key: 'BB',
          label: '蓝波',
          BetNum: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
        },
        GB: {
          Key: 'GB',
          label: '绿波',
          BetNum: [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
        },
        RB_DX_D: {
          Key: 'RB_DX_D',
          label: '红大',
          BetNum: [29, 30, 34, 35, 40, 45, 46]
        },
        BB_DX_D: {
          Key: 'BB_DX_D',
          label: '蓝大',
          BetNum: [25,26,31,36,37,41,42,47,48]
        },
        GB_DX_D: {
          Key: 'GB_DX_D',
          label: '绿大',
          BetNum: [27,28,32,33,38,39,43,44,49]
        },
        N_DX_D: {
          Key: 'N_DX_D',
          label: '大号',
          BetNum: [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
        },
        RB_DX_X: {
          Key: 'RB_DX_X',
          label: '红小',
          BetNum: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24]
        },
        BB_DX_X: {
          Key: 'BB_DX_X',
          label: '蓝小',
          BetNum: [3, 4, 9, 10, 14, 15, 20]
        },
        GB_DX_X: {
          Key: 'GB_DX_X',
          label: '绿小',
          BetNum: [5, 6, 11, 16, 17, 21, 22]
        },
        N_DX_X: {
          Key: 'N_DX_X',
          label: '小号',
          BetNum: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        RB_DS_D: {
          Key: 'RB_DS_D',
          label: '红单',
          BetNum: [1,7,13,19,23,29,35,45]
        },
        BB_DS_D: {
          Key: 'BB_DS_D',
          label: '蓝单',
          BetNum: [3,9,15,25,31,37,41,47]
        },
        GB_DS_D: {
          Key: 'GB_DS_D',
          label: '绿单',
          BetNum: [5,11,17,21,27,33,39,43,49]
        },
        N_DS_D: {
          Key: 'N_DS_D',
          label: '单号',
          BetNum: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49]
        },
        RB_DS_S: {
          Key: 'RB_DS_S',
          label: '红双',
          BetNum: [2,8,12,18,24,30,34,40,46]
        },
        BB_DS_S: {
          Key: 'BB_DS_S',
          label: '蓝双',
          BetNum: [4,10,14,20,26,36,42,48]
        },
        GB_DS_S: {
          Key: 'GB_DS_S',
          label: '绿双',
          BetNum: [6,16,22,28,32,38,44]
        },
        N_DS_S: {
          Key: 'N_DS_S',
          label: '双号',
          BetNum: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48]
        },
        DXSD_DD: {
          Key: 'DXSD_DD',
          label: '大单',
          BetNum: [25,27,29,31,33,35,37,39,41,43,45,47,49]
        },
        DXSD_DS: {
          Key: 'DXSD_DS',
          label: '大双',
          BetNum: [26,28,30,32,34,36,38,40,42,44,46,48]
        },
        DXSD_XD: {
          Key: 'DXSD_XD',
          label: '小单',
          BetNum: [1,3,5,7,9,11,13,15,17,19,21,23]
        },
        DXSD_XS: {
          Key: 'DXSD_XS',
          label: '小双',
          BetNum: [2,4,6,8,10,12,14,16,18,20,22,24]
        },
        HDS_HD: {
          Key: 'HDS_HD',
          label: '合单',
          BetNum: [1,3,5,7,9,10,12,14,16,18,21,23,25,27,29,30,32,34,36,38,41,43,45,47,49]
        },
        HDS_HS: {
          Key: 'HDS_HS',
          label: '合双',
          BetNum: [2,4,6,8,11,13,15,17,19,20,22,24,26,28,31,33,35,37,39,40,42,44,46,48]
        },
        JYSX_J: {
          Key: 'JYSX_J',
          label: '家禽'
        },
        JYSX_Y: {
          Key: 'JYSX_Y',
          label: '野兽'
        },
        SHU: {
          Key: 'SHU',
          label: '鼠'
        },
        NIU: {
          Key: 'NIU',
          label: '牛'
        },
        HU: {
          Key: 'HU',
          label: '虎'
        },
        TU: {
          Key: 'TU',
          label: '兔'
        },
        LONG: {
          Key: 'LONG',
          label: '龙'
        },
        SHE: {
          Key: 'SHE',
          label: '蛇'
        },
        MA: {
          Key: 'MA',
          label: '马'
        },
        YANG: {
          Key: 'YANG',
          label: '羊'
        },
        HOU: {
          Key: 'HOU',
          label: '猴'
        },
        JI: {
          Key: 'JI',
          label: '鸡'
        },
        GOU: {
          Key: 'GOU',
          label: '狗'
        },
        ZHU: {
          Key: 'ZHU',
          label: '猪'
        }
      },
      selNumItem: [],
      Amount: '',
      banStatus: false
    }
  },
  computed:{
    ...mapState(gameInfoStore, ['SXYearNumStore', 'fastBetNumStore', 'showFastBetStore', 'currentGameInfo']),
    wCurrentGameInfo(){
      return JSON.parse(JSON.stringify(this.currentGameInfo))
    }
  },
  watch:{
    wSelBetNum:{
      handler(nval){
        this.$emit('fastBetNumChange',nval)
      },
      deep:true
    },
    showFastBetStore(){
      //初始化全局快捷选号
      this.resetSelNum();
    },
    Amount(nval){
      if(this.showFastBetStore){
        this.upFastBetAmount(nval);
      }
    },
    wCurrentGameInfo:{
      handler(nval, oval) {
        if(nval.Status !== oval.Status){
          this.resetSelNum();
          if(nval.Status !== 1){
            this.banStatus = true
          }else{
            this.banStatus = false
          }
        }
      },
      deep: true
    }
  },
  methods:{
    ...mapActions(gameInfoStore, ['upFastBetNum', 'upFastBetAmount']),
    onNumTd(n){
      if(this.currentGameInfo.Status !== 1) return false
      n = Number(n)
      let FastBetNum = JSON.parse(JSON.stringify(this.fastBetNumStore));
      let nindex = FastBetNum.indexOf(n)
      if(nindex === -1){
        FastBetNum.push(n)
      }else{
        FastBetNum.splice(nindex,1)
      }
      this.upFastBetNum(FastBetNum);
    },
    /*
    * 两面、波色快捷选项
    * */
    onFastItem(e,item){
      let FastBetNum = JSON.parse(JSON.stringify(this.fastBetNumStore));
      if(e){
        item.BetNum.forEach(item => {
          if(!FastBetNum.includes(item)){
            FastBetNum.push(item)
          }
        })
      }else{
        item.BetNum.forEach(item => {
          let i = FastBetNum.indexOf(item)
          if(i !== -1){
            FastBetNum.splice(i ,1)
          }
        })
      }
      this.upFastBetNum(FastBetNum);
    },
    /*
    * 生肖快捷选项
    * */
    onSXFastItem(e,item){
      let nArr = this.SXYearNumStore[item.label] || []
      let FastBetNum = JSON.parse(JSON.stringify(this.fastBetNumStore));
      if(e){
        nArr.forEach(item => {
          item = Number(item);
          if(!FastBetNum.includes(item)){
            FastBetNum.push(item)
          }
        })
      }else{
        nArr.forEach(item => {
          item = Number(item);
          let i = FastBetNum.indexOf(item)
          if(i !== -1){
            FastBetNum.splice(i ,1)
          }
        })
      }
      this.upFastBetNum(FastBetNum);
    },
    /*
    * 家禽、野兽快捷选项
    * */
    onJYFastItem(e,item){
      let JSSX = {
        JYSX_J: ['牛','马','羊','鸡','狗','猪'],
        JYSX_Y: ['鼠','虎','龙','蛇','兔','猴']
      }
      let nArr = []
      let FastBetNum = JSON.parse(JSON.stringify(this.fastBetNumStore));
      JSSX[item.Key].forEach(item => {
        let sxArr = this.SXYearNumStore[item] || []
        sxArr.forEach(i => {
          nArr.push(i)
        })
      })
      if(e){
        nArr.forEach(item => {
          item = Number(item);
          if(!FastBetNum.includes(item)){
            FastBetNum.push(item)
          }
        })
      }else{
        nArr.forEach(item => {
          item = Number(item);
          let i = FastBetNum.indexOf(item)
          if(i !== -1){
            FastBetNum.splice(i ,1)
          }
        })
      }
      this.upFastBetNum(FastBetNum);
    },
    resetSelNum(){
      this.selNumItem = []
      this.upFastBetAmount('')
      this.upFastBetNum([]);
    }
  }
}
</script>

<style scoped lang="less">
.fastbet-box{
  width: 210px;
  margin: 10px 0px 0px 10px;
  border: none;
  .fastbet-tit{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: linear-gradient(to top, #d2e8f7, #f7fbff);
    border: 1px solid #bbc4ce;
    box-sizing: border-box;
    border-bottom: none;
  }
}

.fast-table {
  width: 100%;
  td {
    height: 30px;
    line-height: 30px;
    .bnum{
      width: 100%;
      height: 100%;
      display: inline-block;
      cursor: pointer;
    }
    .bnum:hover{
      background-color: rgb(204, 204, 204);
    }
    /deep/.el-checkbox{
      .el-checkbox__label{
        padding-left: 2px;
      }
    }
  }
  .checkednum{
    background-color: rgb(204, 204, 204);
  }

  input[type=text] {
    width: 80px;
    padding: 1px 4px
  }
}
.fast-table + .fast-table{
  margin-top: -1px;
}
</style>