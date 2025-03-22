import Vue from 'vue'
import VueRouter from 'vue-router'

// const Login = () => import('@/Login.vue');
// const statement = () => import('@/statement.vue');
//
// const Home = () => import('@/components/Home.vue');
//
// const LHCTM = () => import('@/views/gameBet/LHC/TM.vue');
// const LHCLM = () => import('@/views/gameBet/LHC/LM.vue');
// const LHCSB = () => import('@/views/gameBet/LHC/SB.vue');
// const LHCTXTWS = () => import('@/views/gameBet/LHC/TXTWS.vue');
// const LHCHX = () => import('@/views/gameBet/LHC/HX.vue');
// const LHCZM = () => import('@/views/gameBet/LHC/ZM.vue');
// const LHCZMT = () => import('@/views/gameBet/LHC/ZMT.vue');
// const LHCZM16 = () => import('@/views/gameBet/LHC/ZM16.vue');
// const LHCWXQSB = () => import('@/views/gameBet/LHC/WXQSB.vue');
// const LHCYXWS = () => import('@/views/gameBet/LHC/YXWS.vue');
// const LHCZXZOX = () => import('@/views/gameBet/LHC/ZXZOX.vue');
// const LHCZXBZ = () => import('@/views/gameBet/LHC/ZXBZ.vue');
// const LHCLX = () => import('@/views/gameBet/LHC/LX.vue');
// const LHCLW = () => import('@/views/gameBet/LHC/LW.vue');
// const LHCLAM = () => import('@/views/gameBet/LHC/LAM.vue');
// const FT = () => import('@/views/gameBet/FT/FT.vue');
// const TWBG5 = () => import('@/views/gameBet/BG5/TWBG5.vue');
//
//
// const unSettle = () => import('@/views/commonly/unSettle.vue');
// const prfSettle = () => import('@/views/commonly/prfSettle.vue');
// const ownInfo = () => import('@/views/commonly/ownInfo.vue');
// const changePwd = () => import('@/views/commonly/changePwd.vue');
// const LHCHistory = () => import('@/views/resultHistory/LHC.vue');
// const FT5History = () => import('@/views/resultHistory/FT5.vue');
// const BG5History = () => import('@/views/resultHistory/BG5.vue');
// const betHistory = () => import('@/views/commonly/report/betHistory.vue');
// const betDet = () => import('@/views/commonly/report/betDet.vue');
//
// //游戏规则
// const LHCRule = () => import('@/views/commonly/rule/LHC.vue');
// const BG5Rule = () => import('@/views/commonly/rule/BG5.vue');

Vue.use(VueRouter)

//解决重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
    meta: { requiresAuth: true, needLogin: true},
    children: [
      {
        path: '/LHC/TM',
        name: 'LHCTM',
        component: () => import('@/views/gameBet/LHC/TM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true,
        }
      },
      {
        path: '/LHC/LM',
        name: 'LHCLM',
        component: () => import('@/views/gameBet/LHC/LM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/SB',
        name: 'LHCSB',
        component: () => import('@/views/gameBet/LHC/SB.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/TXTWS',
        name: 'LHCTXTWS',
        component: () => import('@/views/gameBet/LHC/TXTWS.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/HX',
        name: 'LHCHX',
        component: () => import('@/views/gameBet/LHC/HX.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/ZM',
        name: 'LHCZM',
        component: () => import('@/views/gameBet/LHC/ZM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/ZMT',
        name: 'LHCZMT',
        component: () => import('@/views/gameBet/LHC/ZMT.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/ZM16',
        name: 'LHCZM16',
        component: () => import('@/views/gameBet/LHC/ZM16.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/WXQSB',
        name: 'LHCWXQSB',
        component: () => import('@/views/gameBet/LHC/WXQSB.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/YXWS',
        name: 'LHCYXWS',
        component: () => import('@/views/gameBet/LHC/YXWS.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/ZXZOX',
        name: 'LHCZXZOX',
        component: () => import('@/views/gameBet/LHC/ZXZOX.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/ZXBZ',
        name: 'LHCZXBZ',
        component: () => import('@/views/gameBet/LHC/ZXBZ.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/LX',
        name: 'LHCLX',
        component: () => import('@/views/gameBet/LHC/LX.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/LW',
        name: 'LHCLW',
        component: () => import('@/views/gameBet/LHC/LW.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/LHC/LAM',
        name: 'LHCLAM',
        component: () => import('@/views/gameBet/LHC/LAM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/FT/FT',
        name: 'FTFT',
        component: () => import('@/views/gameBet/FT/FT.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
					needLogin: true
        }
      },
      {
        path: '/BG5/TWBG5',
        name: 'TWBG5',
        component: () => import('@/views/gameBet/BG5/TWBG5.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/SSC/ZH',
        name: 'SSCZH',
        component:  () => import('@/views/gameBet/SSC/ZH.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/SSC/XT',
        name: 'SSCXT',
        component:  () => import('@/views/gameBet/SSC/XT.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/SSC/LH',
        name: 'SSCLH',
        component:  () => import('@/views/gameBet/SSC/LH.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/PK10/LM',
        name: 'PK10LM',
        component:  () => import('@/views/gameBet/PK10/LM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/PK10/PM',
        name: 'PK10PM',
        component:  () => import('@/views/gameBet/PK10/PM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/PK10/GYZH',
        name: 'PK10GYZH',
        component:  () => import('@/views/gameBet/PK10/GYZH.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/K3/ZOHLM',
        name: 'PK10ZOHLM',
        component:  () => import('@/views/gameBet/K3/ZOHLM.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/K3/ZH2',
        name: 'K3ZH2',
        component:  () => import('@/views/gameBet/K3/ZUH2.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/K3/ZH3',
        name: 'K3ZH3',
        component:  () => import('@/views/gameBet/K3/ZUH3.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      {
        path: '/K3/SJ',
        name: 'K3SJ',
        component:  () => import('@/views/gameBet/K3/SJ.vue'),
        meta:{
          belong: 'betPage',
          showLong: true,
          needLogin: true
        }
      },
      //未结注单
      {
        path: '/unSettle',
        name: 'unSettle',
        component: () => import('@/views/commonly/unSettle.vue'),
				meta:{
					needLogin: true
				}
      },
      //今日已结
      {
        path: '/prfSettle',
        name: 'prfSettle',
        component: () => import('@/views/commonly/prfSettle.vue'),
				meta:{
					needLogin: true
				}
      },
      //六合彩开奖历史
      {
        path: '/History/LHC',
        name: 'LHCHistory',
        component: () => import('@/views/resultHistory/LHC.vue'),
				meta:{
					needLogin: true
				}
      },
      //番摊5开奖历史
      {
        path: '/History/FT5',
        name: 'FT5History',
        component: () => import('@/views/resultHistory/FT5.vue'),
				meta:{
					needLogin: true
				}
      },
      //番摊5开奖历史
      {
        path: '/History/BG5',
        name: 'BG5History',
        component: () => import('@/views/resultHistory/BG5.vue'),
        meta:{
          needLogin: true
        }
      },
      //PK10番摊3开奖历史
      {
        path: '/History/PK10FT3',
        name: 'PK10FT3History',
        component: () => import('@/views/resultHistory/PK10FT3.vue'),
        meta:{
          needLogin: true
        }
      },
      //PK10开奖历史
      {
        path: '/History/PK10',
        name: 'PK10History',
        component: () => import('@/views/resultHistory/PK10.vue'),
        meta:{
          needLogin: true
        }
      },
      //时时彩开奖历史
      {
        path: '/History/SSC',
        name: 'SSCHistory',
        component: () => import('@/views/resultHistory/SSC.vue'),
        meta:{
          needLogin: true
        }
      },
      //时时彩开奖历史
      {
        path: '/History/K3',
        name: 'K3History',
        component: () => import('@/views/resultHistory/K3.vue'),
        meta:{
          needLogin: true
        }
      },
      //幸运5番摊2开奖历史
      {
        path: '/History/XY5FT2',
        name: 'XY5FT2History',
        component: () => import('@/views/resultHistory/XY5FT2.vue'),
        meta:{
          needLogin: true
        }
      },
      //个人资讯
      {
        path: '/ownInfo',
        name: 'ownInfo',
        component: () => import('@/views/commonly/ownInfo.vue'),
				meta:{
					needLogin: true
				}
      },
      //六合彩游戏规则
      {
        path: '/rule/LHC',
        name: 'LHCRule',
        component: () => import('@/views/commonly/rule/LHC.vue'),
				meta:{
					needLogin: true
				}
      },
      //番摊游戏规则
      {
        path: '/rule/FT',
        name: 'FTRule',
        component: () => import('@/views/commonly/rule/FT.vue'),
				meta:{
					needLogin: true
				}
      },
      //PK10游戏规则
      {
        path: '/rule/PK10',
        name: 'PK10Rule',
        component: () => import('@/views/commonly/rule/PK10.vue'),
        meta:{
          needLogin: true
        }
      },
      //时时彩游戏规则
      {
        path: '/rule/SSC',
        name: 'SSCRule',
        component: () => import('@/views/commonly/rule/SSC.vue'),
        meta:{
          needLogin: true
        }
      },
      //台湾宾果游戏规则
      {
        path: '/rule/BG5',
        name: 'BG5Rule',
        component: () => import('@/views/commonly/rule/BG5.vue'),
        meta:{
          needLogin: true
        }
      },
      //台湾宾果游戏规则
      {
        path: '/rule/K3',
        name: 'K3Rule',
        component: () => import('@/views/commonly/rule/K3.vue'),
        meta:{
          needLogin: true
        }
      },
      //修改密码
      {
        path: '/changePwd',
        name: 'changePwd',
        component: () => import('@/views/commonly/changePwd.vue'),
				meta:{
					needLogin: true
				}
      },
      //报表查询
      {
        path: '/betHistory',
        name: 'betHistory',
        component: () => import('@/views/commonly/report/betHistory.vue'),
				meta:{
					needLogin: true
				}
      },
      //底单详细
      {
        path: '/betDet',
        name: 'betDet',
        component: () => import('@/views/commonly/report/betDet.vue'),
				meta:{
					needLogin: true
				}
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/Login.vue'),
    meta: { requiresAuth: false, needLogin: false }
  },
  {
    path: '/statement',
    name: 'statement',
    component: () => import('@/statement.vue'),
    meta: { requiresAuth: true, needLogin: true}
  }
  ,
  {
    path: '/resetPwd',
    name: 'resetPwd',
    component: () => import('@/resetPwd.vue'),
    meta: { requiresAuth: false, needLogin: false}
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   let loginState = sessionStorage.getItem('login') || 0
//   if(loginState == 0 && to.path !== '/login'){
//     next('/login');
//   }else{
//     next();
//   }
// })


export default router
