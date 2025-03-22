const LHC_Color_R = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
const LHC_Color_B = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
const LHC_Color_G = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]

export const rbgBallColor = (namePrefix, num) => {
  num = Number(num)
  if(LHC_Color_R.includes(num))
    return `${namePrefix}R`

  if(LHC_Color_B.includes(num))
    return `${namePrefix}B`

  if(LHC_Color_G.includes(num))
    return `${namePrefix}G`
}

/*
* 生肖年对应号码
* */
export const SXToNum = (sxyear) => {
  let sxNumData = {}
  let SX = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  let SXYearIndex = SX.indexOf(sxyear)
  let SXOrder = []
  if(SXYearIndex !== -1){
    for(let i = SXYearIndex; i >= 0; i--){
      SXOrder.push(SX[i]);
    }
    if(SXYearIndex < 11){
      for(let i = 11; i > SXYearIndex; i--){
        SXOrder.push(SX[i]);
      }
    }
    for(let i = 0; i < 49; i++){
      let sxkey = SXOrder[i % SX.length]
        let si = i + 1
        if(si < 10){
          si = `0${si}`
        }else{
          si = '' + si
        }
        if(sxNumData.hasOwnProperty(sxkey)){
          sxNumData[sxkey].push(si)
        }else{
          sxNumData[sxkey] = [si]
        }
    }
  }
  return sxNumData
}
