<template>
  <div class="page_bg">
    <div class="page_box">
      <div class="page_title">
        重要声明&nbsp;客户一经在本公司开户或投注，即被视为已接受以下规则。
      </div>
      <div class="page_con">
        <ul>
          <li>● 00. 为避免出现争议，请您务必在下注之后查看「下注状况」。</li>
          <li>● 01. 任何投诉必须在开奖之前，本系统不接受任何开奖之后的投诉。</li>
          <li>● 02. 公布赔率时出现的任何打字错误或非故意人为失误，所有（相关）注单一律不算。</li>
          <li>● 03. 公布之所有赔率为浮动赔率，下注时请确认当前赔率及金额，下注确认后一律不能修改。</li>
          <li>● 04. 开奖后接受的投注，一律视为投机漏洞，[本局注单一律不返还本金及盈利]，敬请会员遵守游戏规则。</li>
          <li>● 05. 若本后台发现客户以不正当的手法投注或投注注单不正常，后台将有权「取消」相应之注单，客户不得有任何异议。</li>
          <li>● 06. 如因软件或线路问题导致交易内容或其他与账号设定不符合的情形，请在开奖前立即与本后台联络反映问题，否则本后台将以资料库中的数据为准。</li>
          <li>● 07. 倘若发生遭黑客入侵破坏行为或不可抗拒之灾害致网站故障或资料损坏、数据丢失等情况，后台将以资料库数据为依据。如发现玩家使用不正当程序上获得利益，本公司有权要求取消所获得之不当得利。</li>
          <li>● 08. 各级管理人员及客户必须对本系统各项功能进行了解及熟悉，任何违反正常使用的操作，后台概不负责。</li>
          <li>● 09. 请认真了解各款彩票游戏规则。</li>
          <li style="color: red;">● 10. 如果会员信用额度超额或者为负数引起的争议，一律以公司处理为准。</li>
          <li>● 11. 客户有责任确保自己的账户及密码保密，如果因客户的账户、密码简单，或因泄露导致被盗用，造成的损失由客户本人承担；同时应立即通知本公司，并更改其个人详细资料。</li>
          <li>● 12. 若官方福彩中心开奖错误导致本系统采集数据同时出错情况下当期错误的所有注单以福彩中心官方网站更改后的数据为标准重新结算！在此特别声明，客户不得有任何异议。</li>
          <li>● 13. 本公司将不承担任何因客戶违反当地相关交易法令，所引起之任何责任。</li>
          <li>● 14. 本系统所有投注皆含本金。</li>
          <li>以上协议解释权归本系统所有。</li>
        </ul>
        <div class="page_btns">
          <a class="submit_btn" @click="gopath(1)">同意</a>
          <a @click="gopath(2)" class="submit_btn">不同意</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statement",
  methods:{
    gopath(type){
      if(type === 1){
        this.$router.push({
          path: '/'
        })
      }else{
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.page_bg {
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/page_bg.png') #fff repeat-x top center;
  .page_box {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -300px;
    margin-left: -365px;
    width: 785px;
    background: #edf6fc;
    box-shadow: 0 0 4px #717aae;
    border-radius: 5px;
    .page_title {
      background: #2161b3;
      color: #ffffff;
      display: block;
      font-size: 18px;
      text-align: center;
      height: 44px;
      line-height: 44px;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #cec0a4;
      font-weight: 500;
    }
    .page_con ul {
      padding: 20px 30px;
      width: 100%;
      box-sizing: border-box;
      li {
        line-height: 15px;
        margin: 0 0 10px;
        list-style: none;
        text-align: left;
        font-size: 13px;
      }
    }
    .page_btns {
      margin: 10px;
      padding: 10px;
      border-top: 1px solid #ddd;
      text-align: center;
      .submit_btn {
        background: #2161b3;
        border: 1px solid #2262b4;
        box-shadow: 0 0 1px #fff inset;
        color: #fff;
        text-shadow: 1px 1px 0 #717aae;
        display: inline-block;
        width: 80px;
        line-height: 32px;
        height: 32px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 700;
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
      }
      .submit_btn:hover {
        background: #36f;
      }

    }
  }
}
</style>