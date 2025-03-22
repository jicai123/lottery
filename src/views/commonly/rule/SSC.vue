<template>
  <div class="main-box" v-loading="loading" element-loading-text="数据加载中~">
    <ruleTop @selGame="selGame"></ruleTop>
    <div class="rule-txt">
      <h1 class="tit-box">
        规则说明
      </h1>
      <div class="homeurl" v-show="Homeurl.length > 0">
        开奖官网：
        <a :href="Homeurl[0]" target="_blank">{{Homeurl[0]}}</a>
      </div>
      <p class="game-note" v-show="Note.length > 0"><b>{{Note}}</b></p>
      <ol>
        <li class="label"><b>第一球~第五球(万、佰、千、拾、个)</b></li>
        <li class="stress"><b class="r-c-text">第一球~第五球：</b>第一球、第二球、第三球、第四球、第五球：指下注的每一球与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码8，下注第一球为8者视为中奖，其余情形视为不中奖。</li>
        <li class="stress"><b class="r-c-text">单双大小：</b>根据相应单项投注第一球 ~ 第五球开出的球号，判断胜负。</li>
        <li class="stress"><b class="r-c-text">大小：</b>根据相应单项投注的第一球 ~ 第五球开出的球号大於或等於5为大，小於或等於4为小。</li>
        <li class="stress"><b class="r-c-text">单双：</b>根据相应单项投注的第一球 ~ 第五球开出的球号为双数叫双，如2、6；球号为单数叫单，如1、3。</li>
      </ol>
      <ol>
        <li class="label"><b>总和单双大小</b></li>
        <li class="stress"><b class="r-c-text">总和大小：</b>开出五个球的总和大於或等於23为总和大，小於或等於22为总和小。</li>
        <li class="stress"><b class="r-c-text">总和单双：</b>开出五个球的总和双数为总和双，单数为总和单。</li>
      </ol>
      <ol>
        <li class="label"><b>前三、中三、后三特殊玩法： 豹子 > 顺子 > 对子 > 半顺 > 杂六</b></li>
        <li class="stress">所有5个开奖号码的数字总和数值</li>
        <li class="stress"><b class="r-c-text">豹子：</b>中奖号码的百位千位万位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。</li>
        <li class="stress"><b class="r-c-text">顺子：</b>中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。</li>
        <li class="stress"><b class="r-c-text">对子：</b>中奖号码的百位千位万位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。如果开奖号码为豹子,则对子视为不中奖。如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。</li>
        <li class="stress"><b class="r-c-text">半顺：</b>中奖号码的百位千位万位任意两位数字相连，不分顺序。（不包括顺子、对子。）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。如果开奖号码为顺子、对子,则半顺视为不中奖。--如中奖号码为123、901、556、233，视为不中奖。</li>
        <li class="stress"><b class="r-c-text">杂六：</b>不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。 值是单数为总和单。</li>
      </ol>
      <ol>
        <li class="label"><b>龙虎和特殊玩法： 龙 > 虎 > 和 （0为最小，9为最大）</b></li>
        <li class="stress">注：选择的位置1-2代表第一球（万位）和第二球（千位）两个位置开奖号码之间的比较，依次类推</li>
        <li class="stress"><b class="r-c-text">龙：</b>选择的位置上“首位”开奖号码大于“次位”开奖号码为龙，如出两个开奖号码相同为打和，退回投注本金。</li>
        <li class="stress"><b class="r-c-text">虎：</b>选择的位置上“首位”开奖号码小于“次位”开奖号码为虎，如出两个开奖号码相同为打和，退回投注本金。</li>
        <li class="stress"><b class="r-c-text">和：</b>选择的位置上“首位”开奖号码等于“次位”开奖号码为和，其它视为不中奖，扣除投注本金。</li>
      </ol>
    </div>
  </div>
</template>

<script>

import rule from "@/scripts/mixin/rule";

export default {
  name: "SSCRule",
  mixins:[rule],
  components: {
    ruleTop: () => import('@/views/commonly/rule/ruleTop.vue')
  },
  data(){
    return{
      loading: false,
    }
  }
}
</script>

<style scoped>

</style>