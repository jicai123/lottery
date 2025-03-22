import {
  get,
  post, urlQueryFn
} from "@/scripts/uils/httpFn";


/*
* 选中游戏的今日输赢
* */
export const iGetGameQueryResult = (Query) => get(`/PlaceBet/QueryResult${urlQueryFn(Query)}`)

/*
* 获取用户被暂停的下注内容玩法
* */
export const iGetBetPause = (lotterytype) => get(`/Game/BetPause/${lotterytype}`)

/*
* 获取玩法下注key
* */
export const iGetPlayBetData = (lotterytype, keyname) => post(`/Game/PlayData?lotterytype=${lotterytype}&keyname=${keyname}`)

/*
* 获取单个玩法赔率
* */
export const iGetOnePlayOdds = (lotterytype, playname, oddtype) => get(`/Game/Odds?lotterytype=${lotterytype}&playname=${playname}&oddtype=${oddtype}`)

/*
* 获取多个玩法赔率
* */
export const iGetManyPlayOdds = (lotterytype, playname, oddtype) => post(`/Game/Odds?lotterytype=${lotterytype}&playname=${playname}&oddtype=${oddtype}`)

/*
* 获取游戏期数
* */
export const iGetCurrentInstall = (LotteryType) => get(`/PlaceBet/GetCurrentInstall${LotteryType ? `?LotteryType=${LotteryType}`:''}`)


/*
* 下注
* */
export const iPostBetData = (Query,p) => post(`/PlaceBet/Confirmbet${urlQueryFn(Query)}`, p)


/*
* 获取两面长龙
* */
export const iGetGameLong = (Query) => get(`/Game/gamelonglong${urlQueryFn(Query)}`)


