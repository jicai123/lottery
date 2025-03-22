import {
  get,
  put,
  post
} from "@/scripts/uils/httpFn";

/*
* 获取快选金额
* */
export const iGetQuickAmount = () => get(`/Member/quickamount`);


/*
* 修改快选金额
* */
export const iPutQuickAmount = (p) => put(`/Member/quickamount`, p);