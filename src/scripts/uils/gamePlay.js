const ModsPlay = {
  LHC:[
    {
      Name: '特码',
      Keyname: 'TM',
      Path:'/LHC/TM'
    },
    {
      Name: '两面',
      Keyname: 'LM',
      Path:'/LHC/LM'
    },
    {
      Name: '色波',
      Keyname: 'SB',
      Path:'/LHC/SB'
    },
    {
      Name: '特肖头尾数',
      Keyname: 'TXTWS',
      Path:'/LHC/TXTWS'
    },
    {
      Name: '合肖',
      Keyname: 'HX',
      Path:'/LHC/HX'
    },
    {
      Name: '正码',
      Keyname: 'ZM',
      Path:'/LHC/ZM'
    },
    {
      Name: '正码特',
      Keyname: 'ZMT',
      Path:'/LHC/ZMT'
    },
    {
      Name: '正码1-6',
      Keyname: 'ZM16',
      Path:'/LHC/ZM16'
    },
    {
      Name: '五行7色波',
      Keyname: 'WXQSB',
      Path:'/LHC/WXQSB'
    },
    {
      Name: '平特一肖尾数',
      Keyname: 'YXWX',
      Path:'/LHC/YXWS'
    },
    {
      Name: '正肖总肖',
      Keyname: 'ZXZOX',
      Path:'/LHC/ZXZOX'
    },
    {
      Name: '自选不中',
      Keyname: 'ZXBZ',
      Path:'/LHC/ZXBZ'
    },
    {
      Name: '连肖',
      Keyname: 'LX',
      Path:'/LHC/LX'
    },
    {
      Name: '连尾',
      Keyname: 'LW',
      Path:'/LHC/LW'
    },
    {
      Name: '连码',
      Keyname: 'LAM',
      Path:'/LHC/LAM'
    },
  ],
  FT5:[
    {
      Name: '番摊',
      Keyname: 'FT',
      Path:'/FT/FT'
    }
  ],
  PK10FT3:[
    {
      Name: '番摊',
      Keyname: 'FT',
      Path:'/FT/FT'
    }
  ],
  XY5FT2:[
    {
      Name: '番摊',
      Keyname: 'FT',
      Path:'/FT/FT'
    }
  ],
  BG5:[
    {
      Name: '总项',
      Keyname: 'TWBG5',
      Path:'/BG5/TWBG5'
    }
  ],
  SSC:[
    {
      Name: '整合',
      Keyname: 'ZH',
      Path:'/SSC/ZH'
    },
    {
      Name: '龙虎',
      Keyname: 'LH',
      Path:'/SSC/LH'
    },
    {
      Name: '形态',
      Keyname: 'XT',
      Path:'/SSC/XT'
    },
  ],
  PK10:[
    {
      Name: '两面',
      Keyname: 'LM',
      Path:'/PK10/LM'
    },
    {
      Name: '排名1~10',
      Keyname: 'PM',
      Path:'/PK10/PM'
    },
    {
      Name: '冠亚组合',
      Keyname: 'GYZH',
      Path:'/PK10/GYZH'
    },
  ],
  K3:[
    {
      Name: '整合',
      Keyname: 'ZOHLM',
      Path:'/K3/ZOHLM'
    },
    {
      Name: '三军',
      Keyname: 'SJ',
      Path:'/K3/SJ'
    },
    {
      Name: '二字组合',
      Keyname: 'ZUH2',
      Path:'/K3/ZH2'
    },
    {
      Name: '三字组合',
      Keyname: 'ZUH3',
      Path:'/K3/ZH3'
    },
  ],
}

const assembleType = {
  2:10,
  3:1,
  4:2,
  5:3,
  6:4
}

const LottryTypeBcakName = {
  HKHK6: '香港六',
  MCHK6: '澳门六',
  NMCHK6: '新澳门六',
}

export const getAssembleType = (play) => {
  return assembleType.hasOwnProperty(play) ? assembleType[play] : ''
}

export const getLottryTypeBcakName = (play) => {
  return LottryTypeBcakName.hasOwnProperty(play) ? LottryTypeBcakName[play] : ''
}

export const getModPlayList = (mod) => {
  return ModsPlay.hasOwnProperty(mod) ? ModsPlay[mod] : []
}