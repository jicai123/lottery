<template>
    <div class="container">
      <div id="header">
        <div class="top-unav">
          <div class="logo-box">
            {{siteName}}
          </div>
<!--开奖结果-->
          <lotteryResults></lotteryResults>
          <div class="u-nav">
            <ul>
              <li @click="$router.push({path:'/unSettle', query:{page:1}})">未结明细</li>
              <li @click="$router.push({path:'/prfSettle', query:{page:1}})" >今日已结</li>
              <li @click="$router.push({path:'/betHistory'})">报表查询</li>
              <li @click="goHistory()">开奖结果</li>
              <li @click="$router.push({path:'/ownInfo'})">个人资讯</li>
              <li @click="goRule">活动规则</li>
              <li @click="$router.push({path:'/changePwd'})">修改密码</li>
              <li @click="quitLogin">退出系统</li>
            </ul>
          </div>
        </div>
        <div class="h-game-play">
          <div class="game-box">
            <div class="spritearrow arrowup"></div>
            <ul>
              <li :class="[{'activ' : item.LotteryType === currentGame.LotteryType}]" v-for="item in showHeadGame(GameList)" @click="handoffGame(item)">
                {{item.Name}}
                <div class="edit-icon-back" v-show="editGameNavStatus" @click.stop="delGameNavItem(item)">
                  <i class="el-icon-remove edit-icon"></i>
                </div>
              </li>
              <li v-show="GameList.length > 9" class="MoreGame-btn" :class="[{'activ' : MoreGameInfo.LotteryType === currentGame.LotteryType}]">
                <div class="name" @click="MoreGameBox = !MoreGameBox">
                  {{MoreGameInfo.Name}}
                  <i class="el-icon-caret-bottom"></i>
                </div>
<!--                MoreGameBox @mouseleave="MoreGameBox = false"-->
                <div class="MoreGame-box" v-show="MoreGameBox" @mouseleave="mouseleaveMoreGameBox">
                  <div class="MoreGame-list">
                    <div class="list_c" v-for="(col,i1) in Math.ceil(showMoreGame(GameList).length / 3)">
                      <template v-for="(row,i2) in 3">
                        <div class="list_r MoreGame-item" @click="changeMoreGame(showMoreGame(GameList)[i1 * 3 + i2])"
                             v-if="showMoreGame(GameList).length > i1 * 3 + i2">
                          {{showMoreGame(GameList)[i1 * 3 + i2].Name}}
                          <div class="edit-icon-back" v-show="editGameNavStatus" @click.stop="addGameNavItem(showMoreGame(GameList)[i1 * 3 + i2])">
                            <i class="el-icon-circle-plus edit-icon"></i>
                          </div>

                        </div>
                      </template>

                    </div>
                  </div>
                  <div class="MoreGame-footer">
                    <label>注：可将彩种添加导航也可从导航删除</label>
                    <div>
                      <el-button type="primary" size="mini" v-show="!editGameNavStatus" @click="editGameNav">编辑</el-button>
                      <el-button type="primary" size="mini" v-show="editGameNavStatus" @click="saveGameNav">确定</el-button>
                      <el-button type="info" size="mini" v-show="editGameNavStatus" @click="cancelEditGameNav">取消</el-button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="play-box">
            <ul>
              <li v-for="item in playList">
                <span class="name" :class="[{'active' : currentPlay == item.Keyname}]" @click="onPlayItem(item)">
                  {{item.Name}}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="main">
        <div id="aside">
          <div class="left_menu">
            <div class="acc_box">
              <ul>
                <li>会员账号：{{userInfo.Acc}}</li>
                <li>
                  盘口类型：
                  <select v-model="currentPK" size="mini" placeholder="请选择" style="width: 90px" @change="changePK(currentPK)">
                    <option
                        v-for="item in currentGame.PK"
                        :key="item"
                        :label="item"
                        :value="item">
                    </option>
                  </select>
                </li>
                <li>
                  信用额度：
                  {{gameAmountStore.Amount}}
                </li>
                <li>
                  未结金额：
                  {{gameAmountStore.UnResult}}
                </li>
              </ul>
            </div>
            <div class="result-site" v-show="LotteryHomeUrl.length > 0" @click="goLotteryHome(LotteryHomeUrl)">
              全国开奖网
            </div>
            <div class="left-order">
              <div class="tit">最新订单</div>
              <div class="left-order-content" v-show="newOrderStore.betList.length > 0">
                <div class="neworder-box" v-for="(item,index) in newOrderStore.betList" :key="`newOrder${index}`">
                  <p>单号：{{item.OddNo}}</p>
                  <p>
                    <span class="b-c-text">{{`${item.MidType}-${item.Displayname}`}}</span>
                    @
                    <span class="r-c-text">{{item.Odds}}</span>
                  </p>
                  <p>下注金额：{{item.Amount}}</p>
                  <p>可赢金额：{{accurateNumber(item.Amount * item.Odds, 3)}}</p>
                </div>
                <table style="width: 180px;margin: 10px auto 0px auto;">
                  <tbody>
                  <tr>
                    <td>下注期数</td>
                    <td>{{newOrderTotal.Iss}}</td>
                  </tr>
                  <tr>
                    <td>下注笔数</td>
                    <td>{{newOrderTotal.Total}}</td>
                  </tr>
                  <tr>
                    <td>合计金额</td>
                    <td>{{newOrderTotal.Amount}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="left-order-content"  v-show="newOrderStore.betList.length === 0">
                <div style="height: 100px; font-size: 26px; text-align: center; line-height: 100px; ">暂无注单</div>
              </div>
            </div>
          </div>
        </div>
        <div id="main-view"
             v-loading="iniGameInfoStatusStore"
             element-loading-text="数据加载中..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div class="bet-view">
            <router-view :key="`${$route.name}${currentGame.LotteryType}`" :currentGame="currentGame" ref="betView"/>
          </div>
          <div class="lmlong-box" v-show="showLong">
            <div class="long-tit">
              两面长龙排行
            </div>
            <ul>
              <li class="long-item" v-for="(item,index) in LMLongList" :key="`LM_${index}`" @click="onLMLong(item)">
                <div class="long-name">{{item.Name}}</div>
                <div class="long-iss">{{item.Iss}}期</div>
              </li>
            </ul>
          </div>
          <LHCFastBet v-show="showFastBetStore"></LHCFastBet>
        </div>
      </div>
      <div id="footer">
        <div class="notices-info">
          <marquee direction="left" align="bottom" id="notices" height="24" onmouseout="this.start()"
                   onmouseover="this.stop()" scrollamount="2" scrolldelay="1" style="text-align:left">
            <span style="color: #f54b00">{{noticesTxt}}</span>
          </marquee>
        </div>
        <div class="more_c" @click="notHistoryDialogVisible = true">
          更多
        </div>
      </div>
      <myDialog1 :isVisible="notHistoryDialogVisible"
                 width="800px"
                 :modal="true"
                 @closeDialog="closenotHistoryDialog">
        <template v-slot:tit>历史公告</template>
        <template v-slot>
          <table class="not-list">
            <thead>
            <tr>
              <td style="width: 150px;">时间</td>
              <td>公告详情</td>
            </tr>
            </thead>
            <tbody>
            <template v-if="userNotices.length > 0">
              <tr v-for="(item,index) in userNotices" :key="`not${index}`">
                <td>{{ item.AddTime }}</td>
                <td>{{ item.NoticeTxt }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2">查询暂无数据</td>
              </tr>
            </template>

            </tbody>
          </table>
        </template>
        <template v-slot:footer>
          <button class="f-btn3" @click="notHistoryDialogVisible = false">关闭</button>
        </template>
      </myDialog1>
      <myDialog1 :isVisible="noticesDialogVisible"
                 width="500px"
                 modal="true"
                 @closeDialog="closenoticesHistoryDialog">
        <template v-slot:tit>最新公告</template>
        <template v-slot>
          <template v-if="userNotices.length > 0">
            {{userNotices[noticesIndex].NoticeTxt}}
          </template>
        </template>
        <template v-slot:footer>
          <button class="f-btn3" @click="nextNotices">确定</button>
        </template>
      </myDialog1>
    </div>
</template>

<script>
import {
  iGetSysGameList,
  iGetGamePk,
  iGetGameQuotas,
  iGetUserGameList,
  iGetHeartbeat,
  iGetUserInfo, iGetQueryResult, iGetPresetval, iGetNotices, iGetSiteInfo, Logout
} from "@/scripts/api/summary";
import {iGetBetPause, iGetCurrentInstall, iGetGameLong, iGetGameQueryResult} from "@/scripts/api/bet";
import {getModPlayList} from "@/scripts/uils/gamePlay";
import {iGetQuickAmount} from "@/scripts/api/self";

import userStore from "@/scripts/stores/user";
import gameInfoStore from "@/scripts/stores/gameInfo";
import {mapActions, mapState} from "pinia";
import {SXToNum} from "@/scripts/uils/lottery";
import {getLMLongBetContent, getModBallName} from "@/scripts/uils/LMLong";
import {head} from "axios";
export default {
  name: "Home",
  components:{
    LHCFastBet: () => import('@/components/bet/LHCFastBet.vue'),
    lotteryResults: () => import('@/components/bet/lotteryResults.vue'),
    myDialog1: () => import('@/components/bet/myDialog1.vue')
  },
  data(){
    return{
      LotteryHomeUrl: '',
      siteName: '',
      GameList:[],
      UserGameData:{},
      currentGame:{
        Homeurl: '',
        Name:'',
        LotteryType:'',
        MoudleName:'',
        PK: [],
        NowQuota: 0,
        UnResult: 0,
        currentPK: ''
      },
      currentPK: '',
      playList:[],
      currentPlay: '',
      lotteryTime:{
        Period: '',
        openTime: 0,
        closeTime: 0,
        resultTime: 0
      },
      asyncStatus: false,
      newOrderTotal: {
        Iss:'',
        Total: 0,
        Amount: 0,
      },
      //心跳包计时器
      heartbeatTimer: '',
      heartbeatTime: 120,
      //公告计时器
      NoticeTimer: '',
      NoticeTime: 30,
      openNumData:{
        Name:'',
        Iss: '',
        Num: [],
        SX: []
      },
      LMLongList:[],
      //请求开奖计时器
      openNumberTimer: '',
      openNumberTime: 10,
      noticesTxt: '',
      notHistoryDialogVisible: false,
      noticesDialogVisible: false,
      noticesIndex: 0,
      noticesMaxIndex: 0,
      MoreGameBox: false,
      MoreGameInfo:{
        LotteryType: '',
        Name: '更多游戏'
      },
      editGameNavStatus: false,
      GameNavList: [],
      OldGameNavList: [],
    }
  },
  computed:{
    ...mapState(gameInfoStore,['newOrderStore','currentGameInfoStore', 'userGameListStore', 'LMLongKeysStore', 'showFastBetStore', 'serverTimeStore', 'gameAmountStore', 'betPausePlayStore', 'iniGameInfoStatusStore']),
    ...mapState(userStore, ['userInfo', 'userNotices']),
    wnewOrderStore(){
      return JSON.parse(JSON.stringify(this.newOrderStore))
    },
    wCurrentGameInfoStore(){
      return JSON.parse(JSON.stringify(this.currentGameInfoStore))
    },
    /*
    * 显示长龙
    * */
    showLong(){
      if(this.$route.meta.hasOwnProperty('showLong') && this.$route.meta.hasOwnProperty('belong')){
        if(this.$route.meta.belong === 'betPage'){
          if(!this.showFastBetStore && this.$route.meta.showLong){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
      }else{
        return false
      }
    },
    accurateNumber(){
      return (n,len) => {
        return Number(n.toFixed(len))
      }
    },
    wUserNotices(){
      return JSON.parse(JSON.stringify(this.userNotices))
    },
    showHeadGame(){
      return gamelist => {
        if(this.GameNavList.length > 0){
          let list = []
          this.GameNavList.forEach(item => {
            let game = gamelist.find(g => g.LotteryType === item)
            if(game){
              list.push(game)
            }
          })
          if(gamelist.length < 10){
            return list
          }else{
            return list.slice(0,10)
          }
        }else{
          if(gamelist.length < 10){
            return gamelist
          }else{
            return gamelist.slice(0,10)
          }
        }
      }
    },
    showMoreGame(){
      return gamelist => {
        if(this.GameNavList.length > 0){
          let list = []
          gamelist.forEach(item => {
            if(!this.GameNavList.includes(item.LotteryType)){
              list.push(item)
            }
          })
          return list
        }else{
          if(gamelist.length > 9){
            return gamelist.slice(gamelist.length - 10, gamelist.length)
          }else{
            return []
          }
        }

      }
    }
  },
  watch:{
    $route:{
      handler: function(val, oldVal){
        console.log('路由发生变化')
        this.upShowFastBet(false);
      },
      // 深度观察监听
      deep: true
    },
    wnewOrderStore(nval){
      if(nval.hasOwnProperty('betList')){
        this.newOrderTotal.Iss = nval.Iss
        this.newOrderTotal.Total = nval.betList.length
        let amountSum = 0
        nval.betList.forEach(item => {
          amountSum += item.Amount
        })
        this.newOrderTotal.Amount = amountSum
      }
    },
    // serverTimeStore(nval){
    //   if(nval > this.currentGameInfoStore.ResultTime){
    //     this.startOpenNumber();
    //   }
    // },
    wUserNotices:{
      handler(nval, oval){
        if(nval.length > 0){
          this.noticesTxt = nval[0].NoticeTxt
        }
        if(oval.length === 0 && nval.length > 0){
          this.noticesDialogVisible = true
        }
        if(oval.length === 0 && nval.length > 0){
          this.noticesDialogVisible = true
          this.noticesIndex = 0
          let nlist = nval.filter(item => item.ShowType == 2 || item.ShowType == 1)
          this.upUserNotices(nlist)
          this.noticesMaxIndex = nlist.length
        }else{
          if(oval.length > 0 && nval.length > 0 && oval[0].NoticeTxt !== nval[0].NoticeTxt){
            let nlist = nval.filter(item => item.ShowType == 1)
            if(nlist.length > 0){
              this.noticesIndex = 0
              this.upUserNotices([nlist[0]])
              this.noticesDialogVisible = true
              this.noticesMaxIndex = 1
            }
          }
        }
      },
    },
    wCurrentGameInfoStore:{
      handler(nval, oval){
        if(nval.Status === 1 && nval.Status !== oval.Status){
          this.getGameLong(nval);
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  async created() {
    await this.getUserInfo();
  },
  mounted() {
    /*
    * 监听浏览器标签是否在应用页面
    * */
    document.addEventListener('visibilitychange', this.handleVisiable)
    this.getNotices();
    this.Noticebeat();
  },
  methods:{
    ...mapActions(gameInfoStore,['upcurrentGameInfo', 'upSXYearNum', 'upUserGameList', 'upLMLongKeys','upServerTime', 'upShowFastBet', 'upGameAmount', 'upBetPausePlay', 'upIniGameInfoStatus']),
    ...mapActions(userStore,['upUserInfo', 'upuserGame', 'upPresetval', 'upUserNotices']),
    /*
    * 获取站点信息
    * */
    async getSiteInfo(){
      let res = await iGetSiteInfo('SiteName,OpenUrl');
      if(res.length > 0){
        res.forEach(item => {
          if(item.KeyName === 'SiteName'){
            this.siteName = item.ValStr
          }
          if(item.KeyName === 'OpenUrl'){
            this.LotteryHomeUrl = item.ValStr
          }
        })

      }
    },
    /*
    * 获取缓存数据
    * */
    getSessionStorage(){
      // if(sessionStorage.getItem('currentGame')){
      //   this.currentGame = JSON.parse(sessionStorage.getItem('currentGame'))
      // }
      if(sessionStorage.getItem('uGameList')){
        this.GameList = JSON.parse(sessionStorage.getItem('uGameList'))
      }
      if(sessionStorage.getItem('playList')){
        this.playList = JSON.parse(sessionStorage.getItem('playList'))
      }
      // if(sessionStorage.getItem('currentPlay')){
      //   this.currentPlay = sessionStorage.getItem('currentPlay')
      // }

    },
    /*
    * 获取用户信息
    * */
    async getUserInfo(){
      let res = await iGetUserInfo();
      this.upUserInfo(res);
      this.getSiteInfo();
      this.getSessionStorage();
      await this.iniUserGameInfo();
      // await this.getAmount();
      await this.getHeartbeat();
    },
    // 游戏今日输赢
    async getGameQueryResult(lotterytype) {
      try {
        let res = await iGetGameQueryResult({
          lotteryType: lotterytype
        });
        this.gameResult = res.Result
        this.upGameAmount({
          UnResult: res.UnResult
        })
      } catch (e) {
        console.log(e);
      }
    },
    /*
    * 获取系统游戏列表
    * */
    async getSysGameList(){
      let res = await iGetSysGameList();
      return res
    },
    /*
    * 获取用户开放游戏列表
    * */
    async getUserGameList(){
      let res = await iGetUserGameList();
      return res
    },
    /*
    * 获取用户开放游戏列表
    * */
    async getBetPause(lotterytype){
      let res = await iGetBetPause(lotterytype);
      return res
    },
    /*
    * 获取用户游戏盘口
    * */
    async getGamePk(lotterytype){
      let res = await iGetGamePk({LotteryType: lotterytype});
      return res
    },
    /*
    * 获取用户游戏金额
    * */
    async getGameQuotas(lotterytype){
      try {
        let res = await iGetGameQuotas({LotteryType: lotterytype});
        return res
      }catch (e) {
        return null
      }

    },
    /*
    * 游戏未结金额
    * */
    async getQueryResult(lotterytype){
      let res = await iGetQueryResult({
        lotterytype: lotterytype.join(',')
      })
      return res
    },
    /*
    * 获取游戏长龙
    * */
    async getGameLong(game){
      let res = await iGetGameLong({LotteryType: game.LotteryType});
      let ballArr = getModBallName(game.MoudleName)
      let betContentArr = getLMLongBetContent(game.MoudleName)
      let longlist = []
      for(let key in res){
        if(key === 'Command'){
          let Command = res[key];
          for(let i in Command){
            if(ballArr.hasOwnProperty(i)){
              let ball = ballArr[i].Name || '';
              for(let k in Command[i]){
                let clData = Command[i][k];
                if(betContentArr.hasOwnProperty(k)){
                  let betcontent = betContentArr[k].Name || '';
                  if(ball !== '' && betcontent !== '' && clData > 1){
                    let betKeyname = '';
                    if(game.MoudleName === 'LHC'){
                      if(i == 6){
                        betKeyname = betContentArr[k].TKeyname
                      }else{
                        betKeyname = `${ballArr[i].Ball}-${betContentArr[k].ZKeyname}`
                      }
                    }else{
                      if(ballArr[i].NeedBall){
                        betKeyname = `${ballArr[i].Ball}${betContentArr[k].TKeyname}`
                      }else{
                        betKeyname = betContentArr[k].TKeyname
                      }
                    }
                    longlist.push({
                      Name: `${ball} - ${betcontent}`,
                      Iss: clData,
                      Keyname: betKeyname,
                      Path: ballArr[i].Path
                    })
                  }
                }
              }
            }
          }

        }else if(key === 'LongHu'){
          if(game.MoudleName === 'SSC'){
            let LongHu = res[key];
            for(let i in LongHu){
              for(let k in LongHu[i]) {
                let contKey = `${i}${k}`
                if (betContentArr.hasOwnProperty(contKey)) {
                  let betcontent = betContentArr[contKey].Name || '';
                  let clData = LongHu[i][k];
                  if (betcontent !== '' && clData > 1) {
                    longlist.push({
                      Name: betContentArr[contKey].Name,
                      Iss: clData,
                      Keyname: betContentArr[contKey].TKeyname,
                      Path: ballArr[key].Path
                    })
                  }
                }
              }
            }
          }else if(game.MoudleName === 'PK10'){
            let LongHu = res[key];
            for(let i in LongHu){
              if(ballArr.hasOwnProperty(i)){
                let ball = ballArr[i].Name || '';
                for(let k in LongHu[i]) {
                  let clData = LongHu[i][k];
                  if (betContentArr.hasOwnProperty(k)) {
                    let betcontent = betContentArr[k].Name || '';
                    if (ball !== '' && betcontent !== '' && clData > 1) {
                      let betKeyname = '';
                      if(ballArr[i].NeedBall){
                        betKeyname = `${ballArr[i].Ball}${betContentArr[k].TKeyname}`
                      }else{
                        betKeyname = betContentArr[k].TKeyname
                      }
                      longlist.push({
                        Name: `${ball} - ${betcontent}`,
                        Iss: clData,
                        Keyname: betKeyname,
                        Path: ballArr[i].Path
                      })
                    }
                  }
                }
              }
            }
          }else{

          }
        }else if(key === 'HeWei'){
          if(game.MoudleName === 'BG5'){
            let HeWei = res[key];
            for(let i in HeWei){
              if(ballArr.hasOwnProperty(i)){
                let ball = ballArr[i].Name || '';
                for(let k in HeWei[i]){
                  let clData = HeWei[i][k];
                  if(betContentArr.hasOwnProperty(k)){
                    let betcontent = betContentArr[k].Name || '';
                    if(ball !== '' && betcontent !== '' && clData > 1){
                      let betKeyname = '';
                      betKeyname = `${ballArr[i].Ball}${betContentArr[k].TKeyname}`
                      longlist.push({
                        Name: `${ball} - ${betcontent}`,
                        Iss: clData,
                        Keyname: betKeyname,
                        Path: ballArr[i].Path
                      })
                    }
                  }
                }
              }
            }
          }else{

          }
        }else{
          let ball = ballArr.hasOwnProperty(key) ? ballArr[key].Name : '';
          let betcontent = betContentArr.hasOwnProperty(key) ? betContentArr[key].Name : '';
          let betKeyname = '';
          if (ball !== '' && betcontent !== '') {
            if(ballArr[key].NeedBall){
              betKeyname = `${ballArr[key].Ball}${betContentArr[key].TKeyname}`
            }else{
              betKeyname = betContentArr[key].TKeyname
            }
            let clData = res[key];
            if(clData > 1){
              longlist.push({
                Name: `${ball} - ${betcontent}`,
                Iss: clData,
                Keyname: betKeyname,
                Path: ballArr[key].Path
              })
            }
          }

        }

      }
      this.LMLongList = longlist.sort((a,b) => {
        return b.Iss - a.Iss
      })
      console.log(this.LMLongList);
    },
    /*
    * 变换盘口
    * */
    changePK(e){
      this.upcurrentGameInfo({
        PK: e
      })
      this.currentGame.currentPK = e
      this.currentPK = e
      this.upLocalStoragePK(this.currentGame.LotteryType, e)
      // let sessCurrentGame = JSON.parse(sessionStorage.getItem('currentGame'))
      // console.log(sessCurrentGame);
      // sessCurrentGame.currentPK = e
      // sessionStorage.setItem("currentGame", JSON.stringify(sessCurrentGame));
    },
    /*
    * 点击长龙内容
    * */
    onLMLong(long){
      if(this.currentGameInfoStore.Status !== 1) return false
      if(this.$route.path !== long.Path){
        this.upLMLongKeys([long.Keyname])
        this.$router.push({
          path: long.Path
        })
        sessionStorage.setItem('LMLONGPATH', long.Path)
      }else{
        let selLong = JSON.parse(JSON.stringify(this.LMLongKeysStore))
        let codeIndex = selLong.indexOf(long.Keyname)
        if(codeIndex === -1){
          selLong.push(long.Keyname)
        }else{
          selLong.splice(codeIndex,1)
        }
        sessionStorage.setItem('LMLONGPATH', '')
        this.upLMLongKeys(selLong)
      }
    },
    async iniUserGameInfo(){
      let uPK,uQuotas,sysGameList,uOpenGame;
      let lotterytype = '';
      if(sessionStorage.getItem('currentGame')){
        lotterytype = JSON.parse(sessionStorage.getItem('currentGame')).Lotterytype
      }
      if(localStorage.getItem('gameNavList')){
        let localStorage_gameNavList = JSON.parse(localStorage.getItem('gameNavList'))
        if(localStorage_gameNavList.hasOwnProperty(this.userInfo.Acc)){
          this.GameNavList = localStorage_gameNavList[this.userInfo.Acc]
        }
      }
      try {
        uPK = await this.getGamePk(lotterytype);
        uPK.forEach(item => {
          item.Pk = item.Pk.sort()
        });
        uQuotas = await this.getGameQuotas(lotterytype);
        sysGameList = await this.getSysGameList();
        uOpenGame = await this.getUserGameList();


      }catch (e) {
        this.asyncStatus = false
        setTimeout(function (){
          this.iniUserGameInfo();
        },2000)
      }
      let gData = {};
      let uGameList = sysGameList.filter(item => uOpenGame.includes(item.LotteryType))
      // this.upuserGame(uGameList)

      //游戏未结金额
      let allGame = [];
      uGameList.forEach(item => {
        allGame.push(item.LotteryType);
      })
      let queryResult = await this.getQueryResult(allGame);
      this.currentGame.UnResult = queryResult.UnResult

      for(let i in uGameList){
        let key =  uGameList[i].LotteryType;
        // let fsysGame = sysGameList.filter(item => item.LotteryType === key);
        let fPK = uPK.filter(item => item.KeyName === key);

        gData[key] = uGameList[i]
        if(fPK.length === 1){
          this.$set(gData[key], 'PK', fPK[0].Pk)
        }
        if(uQuotas){
          let fQuotas = uQuotas.filter(item => item.KeyName === uGameList[i].Scoretype);
          if(fQuotas.length === 1){
            this.$set(gData[key], 'NowQuota', fQuotas[0].NowQuota)
          }
        }
      }

      //游戏长龙
      await this.getGameLong(this.currentGame);

      this.GameList = JSON.parse(JSON.stringify(uGameList))
      // uGameList.forEach((item,i) => {
      //   if(i < 5){
      //     this.GameList.push(item)
      //   }
      // })
      // console.log(this.GameList);
      let localStorage_gameNavList = {}
      if(localStorage.getItem('gameNavList')){
        localStorage_gameNavList = JSON.parse(localStorage.getItem('gameNavList'))
        if(localStorage_gameNavList.hasOwnProperty(this.userInfo.Acc)){
          for(let i = localStorage_gameNavList[this.userInfo.Acc].length - 1; i >= 0; i--){
            let codeGame = this.GameList.find(item => item.LotteryType === localStorage_gameNavList[this.userInfo.Acc][i])
            if(!codeGame){
              localStorage_gameNavList[this.userInfo.Acc].splice(i,1)
            }
          }
          localStorage.setItem('gameNavList', JSON.stringify(localStorage_gameNavList))
        }else{
          localStorage_gameNavList[this.userInfo.Acc] = []
          for(let i = 0; i < 9; i++){
            if(i < this.GameList.length){
              localStorage_gameNavList[this.userInfo.Acc].push(this.GameList[i].LotteryType)
            }else{
              break
            }
          }

          localStorage.setItem('gameNavList', JSON.stringify(localStorage_gameNavList))
        }
      }else{
        localStorage_gameNavList[this.userInfo.Acc] = []
        for(let i = 0; i < 9; i++){
          if(i < this.GameList.length){
            localStorage_gameNavList[this.userInfo.Acc].push(this.GameList[i].LotteryType)
          }else{
            break
          }
        }
        localStorage.setItem('gameNavList', JSON.stringify(localStorage_gameNavList))
      }
      this.GameNavList = localStorage_gameNavList[this.userInfo.Acc]

      // 缓存用户游戏列表
      this.upUserGameList(JSON.parse(JSON.stringify(uGameList)));
      this.UserGameData = JSON.parse(JSON.stringify(gData));
      sessionStorage.setItem("uGameList", JSON.stringify(uGameList));

      //跳转到默认游戏下注页面
      if(this.userGameListStore.length > 0){
        let playList = this.playListData(this.currentGame.MoudleName)
        if(playList.length > 0){
          await this.$router.push({
            path: `${playList[0].Path}`,
          })
        }
      }
    },
    playListData(mod){
      let list = getModPlayList(mod);
      return list;
    },
    async onPlayItem(play){
      this.upLMLongKeys([])
      this.currentPlay = play.Keyname
      await this.getCurrentInstall(this.currentGame)
      await this.$router.push({
        path: play.Path
      })
    },
    /*
    * 获取用户设置的快捷金额
    * */
    // async getAmount(){
    //   let res = await iGetQuickAmount();
    //   sessionStorage.setItem('quickAmount', JSON.stringify(res))
    // },

    /*
    * 获取当前选中游戏期数、开奖号
    * */
    async getCurrentInstall(game){
      let res = await iGetCurrentInstall(game.LotteryType);
      if(res){
        // this.openNumData
        // res = {
        //   "MinPre": 0,
        //   "MaxPre": 0,
        //   "Calcuid": 0,
        //   "Killsta": 0,
        //   "Inputodds": 0,
        //   "Limitmax": 0,
        //   "Limitmin": 0,
        //   "Status": 1,
        //   "Msg": null,
        //   "PreShengXiaoYear": "龙",
        //   "Installments": "2024090",
        //   "PreLotteryResult": "45,12,21,8,35,44,2",
        //   "PreInstallments": "2024089",
        //   "CloseTimeStamp": 1724555800,
        //   "OpenTimeStamp": 1723532400,
        //   "ResultTimeStamp": 1723555800
        // }
        let sx = {}
        if(game.MoudleName === 'LHC'){
          sx = SXToNum(res.PreShengXiaoYear)
          this.upSXYearNum(sx)
        }

        let CloseStatus = 2
        if(this.serverTimeStore > res.CloseTimeStamp){
          CloseStatus = 2
        }else{
          CloseStatus = 1
        }
        this.upcurrentGameInfo({
          OpenTime: res.OpenTimeStamp,
          CloseTime: res.CloseTimeStamp,
          ResultTime: res.ResultTimeStamp,
          Installments: res.Installments || '',
          Period: res.PreInstallments || '',
          LotteryType: game.LotteryType,
          MoudleName: game.MoudleName,
          Name: game.Name,
          Result: res.PreLotteryResult.split(',') || '',
          NumNote: fSX(res.PreLotteryResult.split(','), sx),
          Status: CloseStatus
        })
      }

      //六合彩模块生肖对应的号码

      function fSX(nArr, sx){
        let sxArr = []
        let NtheSX = {}
        for(let k in sx){
          sx[k].forEach(item => {
            NtheSX[Number(item)] = k
          })
        }
        nArr.forEach(item => {
          if(NtheSX.hasOwnProperty(Number(item))){
            sxArr.push(NtheSX[Number(item)])
          }else{
            sxArr.push('')
          }
        })
        return sxArr;
      }

    },
    /*
    * 切换游戏
    * */
    async handoffGame(game){
      try {
        if(this.iniGameInfoStatusStore) return;
        this.upIniGameInfoStatus(true)
        this.upLMLongKeys([])
        if(this.currentGame.LotteryType !== game.LotteryType){

          // this.upcurrentGameInfo({
          //   LotteryType: gameData.LotteryType,
          //   MoudleName: gameData.MoudleName,
          //   Scoretype: gameData.Scoretype,
          //   Name: gameData.Name,
          // })
          //判断游戏模板是否有变化
          if(this.currentGame.MoudleName != game.MoudleName){
            this.playList = this.playListData(game.MoudleName);
          }
          if(this.currentGame.LotteryType != game.LotteryType){
            await this.getCurrentInstall(game);
          }

          if(this.UserGameData.hasOwnProperty(game.LotteryType)){
            let gameData = this.UserGameData[game.LotteryType]

            let localPK = this.getLocalStoragePK(gameData.LotteryType);
            let gPK = ''
            if(localPK){
              if(gameData.PK.includes(localPK)){
                gPK = localPK
              }else{
                gPK = gameData.PK[0]
                this.upLocalStoragePK(gameData.LotteryType, gPK)
              }
            }else{
              gPK = gameData.PK[0]
              this.upLocalStoragePK(gameData.LotteryType, gPK)
            }

            let cGame = {
              LotteryType: gameData.LotteryType,
              MoudleName: gameData.MoudleName,
              Name: gameData.Name,
              PK: gameData.PK || [],
              currentPK: gPK
            }
            this.currentGame = JSON.parse(JSON.stringify(cGame))

            this.currentPK = gPK
            let gQuotas = await this.getGameQuotas(this.currentGame.LotteryType);
            if(gQuotas){
              let NowQuota = gQuotas.filter(g => g.KeyName === gameData.Scoretype)
              this.upGameAmount({
                Amount: NowQuota[0].NowQuota || 0
              })
            }
            this.upcurrentGameInfo({
              HomeUrl: typeof gameData.Homeurl === 'object' ? JSON.parse(gameData.Homeurl) : [],
              LotteryType: gameData.LotteryType,
              MoudleName: gameData.MoudleName,
              Scoretype: gameData.Scoretype,
              Name: gameData.Name,
              PK: gPK
            })
            await this.$router.push({
              path: this.playList[0].Path
            })
            this.currentPlay = this.playList[0].Keyname
          }

          this.MoreGameInfo.Name = '更多游戏'
          this.MoreGameInfo.LotteryType = ''
          //游戏长龙
          await this.getGameLong(this.currentGame);
        }
        this.upIniGameInfoStatus(false)
      }catch (e) {
        console.log(e)
        this.upIniGameInfoStatus(false)
      }

    },
    async changeMoreGame(data){
      if(this.iniGameInfoStatusStore) return;
      await this.handoffGame(data)
      this.MoreGameInfo.Name = data.Name
      this.MoreGameInfo.LotteryType = data.LotteryType
      this.MoreGameBox = false
    },
    goHistory(){
      if(this.userGameListStore.length > 0){
        this.$router.push({
          path:`/History/${this.userGameListStore[0].MoudleName}`,
          query:{
            lotteryType: this.userGameListStore[0].LotteryType
          }
        })
      }
    },
    // 系统公告
    async getNotices(){
      let res = await iGetNotices()
      if(res.length > 0){
        let popUpNotice = res.filter(item => item.ShowType == 2 || item.ShowType == 1);
        if(popUpNotice.length > 0){
          this.upUserNotices(popUpNotice);
          this.noticesTxt = popUpNotice[0].NoticeTxt
        }
      }
    },
    //心跳包
    async getHeartbeat(){
      let res = await iGetHeartbeat();
      this.upServerTime(res.TimeUnix)
      await this.heartbeat()
    },
    //倒计时请求心跳包
     async heartbeat(){
       clearInterval(this.heartbeatTimer);
       let sTime = this.serverTimeStore
       this.heartbeatTimer = setTimeout( () => {
         this.heartbeatTime --
         this.upServerTime(sTime + 1)
         if(this.heartbeatTime < 0){
           this.heartbeatTime = 120
           this.getHeartbeat();
         }else{
           this.heartbeat();
         }
       },1000)

    },
    //倒计时请求公告
    async Noticebeat(){
      clearInterval(this.NoticeTimer);
      this.NoticeTimer = setTimeout( () => {
        this.NoticeTime --
        if(this.NoticeTime < 0){
          this.NoticeTime = 30
          this.getNotices();
        }
        this.Noticebeat();
      },1000)

    },
    /*
    * 距离开奖时间为0，10秒请求一次开奖接口
    * */
    async startOpenNumber(){
      this.openNumberTime --;
      if(this.openNumberTime < 0){
        this.openNumberTime = 10
        await this.getCurrentInstall(this.currentGame);
        //重新请求赔率
        if(this.$refs.betView.hasOwnProperty('newOdds')){
          this.$refs.betView.newOdds()
        }
      }
    },
    /*
    * 监听浏览器标签是否在应用页面
    * */
    handleVisiable(e){
      if(e.target.visibilityState === 'visible'){
        this.getHeartbeat();
      }
    },
    closenotHistoryDialog(){
      this.notHistoryDialogVisible = false
    },
    closenoticesHistoryDialog(){
      this.noticesDialogVisible = false
      this.noticesIndex = 0
    },
    nextNotices(){
      if(this.noticesIndex + 1 < this.userNotices.length){
        this.noticesIndex ++
      }else{
        this.noticesDialogVisible = false
        this.noticesIndex = 0
      }
    },
    goRule(){
      let game = this.currentGame
      let Mod = ''
      if(game.MoudleName === 'PK10FT3' || game.MoudleName === 'XY5FT2' || game.MoudleName === 'FT5'){
        Mod = 'FT'
      }else{
        Mod = game.MoudleName
      }
      if(Mod){
        this.$router.push({
          path: `/rule/${Mod}`,
          query:{
            game: game.LotteryType
          }
        })
      }
    },
    /*
    * 获取缓存盘口
    * */
    getLocalStoragePK(lotteryType){
      let PKObj = JSON.parse(localStorage.getItem('usPK'))
      if(PKObj !== null){
        if(PKObj.hasOwnProperty(lotteryType)){
          return PKObj[lotteryType]
        }else{
          return null
        }
      }else{
        return null
      }
    },
    upLocalStoragePK(lotteryType, pk){
      let PKObj = JSON.parse(localStorage.getItem('usPK'))
      if(PKObj !== null){
        PKObj[lotteryType] = pk
        localStorage.setItem('usPK', JSON.stringify(PKObj))
      }else{
        let obj = {}
        obj[lotteryType] = pk
        localStorage.setItem('usPK', JSON.stringify(obj))
      }
    },
    mouseleaveMoreGameBox(){
      if(!this.editGameNavStatus){
        this.MoreGameBox = false
      }
    },
    editGameNav(){
      this.editGameNavStatus = !this.editGameNavStatus
      if(this.editGameNavStatus){
        this.OldGameNavList = JSON.parse(JSON.stringify(this.GameNavList))
      }
    },
    cancelEditGameNav(){
      this.editGameNavStatus = false
      this.GameNavList = JSON.parse(JSON.stringify(this.OldGameNavList))
    },
    saveGameNav(){
      let localStorage_gameNavList = JSON.parse(localStorage.getItem('gameNavList'))
      localStorage_gameNavList[this.userInfo.Acc] = this.GameNavList
      localStorage.setItem('gameNavList', JSON.stringify(localStorage_gameNavList))
      this.OldGameNavList = JSON.parse(JSON.stringify(this.GameNavList))
      this.editGameNavStatus = false
    },
    delGameNavItem(game){
      if(this.GameNavList.length > 1){
        let i = this.GameNavList.indexOf(game.LotteryType)
        if(i !== -1){
          this.GameNavList.splice(i,1)
        }
      }else{
        alert('至少保留1个游戏!')
      }
    },
    addGameNavItem(game){
      if(this.GameNavList.length < 9){
        if(!this.GameNavList.includes(game.LotteryType)){
          this.GameNavList.push(game.LotteryType)
        }
      }else{
        alert('最多可以添加9个游戏!')
      }
    },
    async quitLogin(){
      let res = await Logout();
      location.reload()
      window.open( '#/login', '_self')
    },
    goLotteryHome(url){
      window.open( url, '_blank')
    }
  },
  beforeDestroy(){
    clearInterval(this.heartbeatTimer);
    clearInterval(this.NoticeTimer);
    document.removeEventListener('visibilitychange', this.handleVisiable)
  }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#main{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
  #aside{
    width: 220px;
    background: #e6e6e6;
    box-shadow: -2px 0 5px #c3c3c3 inset, 0 -2px #c3c3c3 inset;
    padding: 10px 10px;
    height: 100%;
    box-sizing: border-box;
  }
  #main-view{
    flex: 1;
    padding: 0px 10px 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    position: relative;
    .bet-view{
      flex: 1;
      display: contents;
    }
    .lmlong-box{
      width: 210px;
      border: 1px solid #bbc4ce;
      margin: 10px 0px 0px 10px;
      .long-tit{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(to top, #fce8dc, #fff9f5);
      }
      li{
        list-style: none;
        height: 30px;
        line-height: 30px;
        display: flex;
        border-top: 1px solid #bbc4ce;
      }
      .long-name{
        text-align: left;
        padding: 0px 5px;
        height: 30px;
        width: 130px;
        border-right: 1px solid #bbc4ce;
        background: linear-gradient(to top, #f0f0f0 50%, #ffffff 50%);
      }
      .long-iss{
        flex: 1;
        color: red;
      }
    }
  }

}
.left_menu{
  width: 200px;
  margin: auto;
  height: 100%;
  .acc_box{
    border: 1px solid #2161b3;
    border-radius: 5px;
    background: #fff;
    li{
      list-style: none;
      width: 100%;
      line-height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      text-align: left;
    }
    li + li{
      border-top: 1px solid #a5bfeb;
    }
  }
  .result-site{
    height: 36px;
    margin-top: 5px;
    line-height: 36px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    display: block;
    border: 1px solid #2161b3;
    box-shadow: 0 0 1px #fff inset;
    text-align: center;
    background: linear-gradient(to top, #2161b3 50%, #246bbb 50%);
  }
  .result-site:hover{
    cursor: pointer;
    background: #2161b3;
  }

.left-order{
  border-radius: 3px;
  border: 1px solid #2161b3;
  overflow: hidden;
  max-height: 100%;
  margin-top: 5px;
  .tit{
    color: #fc0;
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
    background: linear-gradient(to top, #2161b3 50%, #246bbb 50%);
  }
    .left-order-content{
      background: #ffffff;
      padding-bottom: 10px;
      overflow: auto;
      max-height: 600px;
      .neworder-box{
        text-align: left;
        padding: 0px 5px;
        p{
          padding: 2px 0px;
        }
      }
      .neworder-box + .neworder-box{
        border-top: 1px dashed #bbc4ce;
      }
      table{
        font-size: 12px;
        td{
          height: 20px;
        }
      }
    }
  }
}
#footer{
  position: relative;
  background: #f7f7f7;
  border-top: 1px solid #c1c1c1;
  line-height: 24px;
  height: 24px;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  .notices-info{
    padding-right: 65px;
  }
  .more_c{
    position: absolute;
    right: 18px;
    top: 0;
    color: #684716;
    cursor: pointer;
  }
}

.spritearrow {
  background: url("~@/assets/img/arrowsprite.png") no-repeat top left;
  width: 38px;
  height: 38px;
  margin: 0 3px;
  cursor: pointer;
  float: left;

}
.arrowup {
  background-position: 0 -38px !important;
}
.not-list{
  thead{
    td{
      height: 28px;
      line-height: 28px;
      font-weight: bold;
    }
  }
  tbody{
    td{
      padding: 5px 5px;

    }
    td:nth-child(2){
      text-align: left;
    }
  }
}
.game-box{
  li{
    position: relative;
  }
  .edit-icon-back{
    width: 100%;
    height: 100%;
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
  }
  .edit-icon {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 18px;

  }

}
.MoreGame-btn{
  position: relative;
  .MoreGame-box{
    width: 460px;
    max-height: 500px;
    border: 1px solid #2161b3;
    border-top: none;
    background: #e6e6e6;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 9;
    padding: 10px;
    overflow: auto;
    .MoreGame-list{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
      background: #ffffff;
      flex-wrap: nowrap;
      padding: 10px 10px 0 10px;
      .list_c{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: nowrap;
      }
      .MoreGame-item{
        float: left;
        width: 32%;
        height: 40px;
        background: #2161b3;
        margin-bottom: 10px;
        color: #ffffff !important;
        position: relative;
        .edit-icon {
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: 18px;
        }
      }
      .MoreGame-item:hover{
        color: #ffee00;
      }
      .MoreGame-item + .MoreGame-item{
        margin-left: 10px;
      }
    }
    .MoreGame-footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      label{
        font-size: 12px;
        color: #3b3b3b;
        font-weight: normal;
      }
    }
  }
}

</style>