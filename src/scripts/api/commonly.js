import {
  get, getAll,
  post,
  urlQueryFn
} from "@/scripts/uils/httpFn";

//获取未结数据
export const iGetUnsettlOrder = (obj) => get(`/BettingList/UnCheckBetting${urlQueryFn(obj)}`)

//获取今日已结数据
export const iGetPrfsettlOrder = (obj) => get(`/BettingList/BetChecked${urlQueryFn(obj)}`)

//获取开奖结果
export const iGetResultHistory = (lotteryType, obj) => get(`/ResultHistory/info/${lotteryType}${urlQueryFn(obj)}`)


/*
* 用户额度、盘口、游戏信息
* */
export const iGetMyInfos = () => getAll(`/Game/myinfos22`)


/*
* 获取下注内容复式详细
* */
export const iGetDuplexDetail = (obj) => get(`/BettingList/DuplexDetail${urlQueryFn(obj)}`)
