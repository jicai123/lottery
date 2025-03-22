import {
  get,
  post,
  put,
  urlQueryFn
} from "@/scripts/uils/httpFn";

/*
* 获取系统游戏列表
* */
export const iGetSysGameList = () => get('/Game')

/*
* 获取系统游戏列表
* */
export const iGetHomeUrl = (lotterytype) => get(`/Game/HomeUrl/${lotterytype}`)

/*
* 公告列表
* */
export const iGetNotices = () => get('/Game/notices')

/*
* 获取用户开放游戏列表
* */
export const iGetUserGameList = () => get('/Game/OpenGame', )

/*
* 获取游戏盘口列表
* */
export const iGetGamePk = (obj) => get(`/Game/Pk${urlQueryFn(obj)}`)

/*
* 获取游戏金额
* */
export const iGetGameQuotas = (obj) => get(`/Game/Quotas${urlQueryFn(obj)}`)

/*
* 获取游戏未结金额
* */
export const iGetQueryResult = (obj) => get(`/PlaceBet/QueryResult${urlQueryFn(obj)}`)

/*
* 心跳包
* */
export const iGetHeartbeat = () => get(`/Game/time`)

/*
* 用户信息
* */
export const iGetUserInfo = () => get(`/Member`)

/*
* 用户退水信息
* */
export const iGetUserReturn = (lotterytype) => get(`/Game/ReturnSet?lotterytype=${lotterytype}`)

/*
* 用户修改密码
* */
export const iPutUserpwd = (p) => put(`/Member/changepwd`, p)

/*
* 报表查询
* */
export const iGetBetHistory = (p) => post(`/BettingList/HistoryBetLists`, p)

/*
* 报表底单
* */
export const iGetBetDetail = (obj) => get(`/BettingList/BetDetail${urlQueryFn(obj)}`)

/*
* 获取复试数据
* */
export const iGetBettingDuplexData = (obj) => get(`/BettingList/DuplexDetail${urlQueryFn(obj)}`)

/*
* 获取下注预设金额状态
* */
export const iGetPresetval = () => get(`/Member/presetval`)

/*
* 修改下注预设金额状态
* */
export const iPutPresetval = (p) => put(`/Member/presetval`, p)

/*
* 获取站点信息
* */
export const iGetSiteInfo = (key) => get(`/Game/SiteVal/${key}`)

/*
* 安全退出
* */
export const Logout = () => get(`/Password/logout`)





