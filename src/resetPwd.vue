<template>
  <div class="main-box">
    <div class="bar_tit">
      <ul>
        <li class="active">
          <b>修改密码</b>
        </li>
      </ul>
    </div>
    <table class="ex-table info-t">
      <tbody>
      <tr>
        <td style="width: 200px">原始密码</td>
        <td>
          <input type="password" v-model="pwdData.Oldpasswd.value" @blur="codeData(pwdData.Oldpasswd)" autofocus="autofocus">
          <i :class="[{'el-icon-error' : pwdData.Oldpasswd.code === false,'el-icon-success' : pwdData.Oldpasswd.code === true}]" v-show="pwdData.Oldpasswd.code !== ''"></i>
          <span class="r-c-text" v-show="pwdData.Oldpasswd.code === false">{{pwdData.Oldpasswd.tit}}</span>
        </td>
      </tr>
      <tr>
        <td>新设密码</td>
        <td>
          <input type="password" v-model="pwdData.Newpasswd.value" @blur="codeData(pwdData.Newpasswd)">
          <i :class="[{'el-icon-error' : pwdData.Newpasswd.code === false,'el-icon-success' : pwdData.Newpasswd.code === true}]" v-show="pwdData.Newpasswd.code !== ''"></i>
          <span class="r-c-text" v-show="pwdData.Newpasswd.code === false">{{pwdData.Newpasswd.tit}}</span>
        </td>
      </tr>
      <tr>
        <td>确认密码</td>
        <td>
          <input type="password" v-model="pwdData.Confirmpasswd.value" @blur="codeData(pwdData.Confirmpasswd)">
          <i :class="[{'el-icon-error' : pwdData.Confirmpasswd.code === false,'el-icon-success' : pwdData.Confirmpasswd.code === true}]" v-show="pwdData.Confirmpasswd.code !== ''"></i>
          <span class="r-c-text" v-show="pwdData.Confirmpasswd.code === false">{{pwdData.Confirmpasswd.tit}}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-box">
      <button class="btn4" @click="submitData" :disabled="loading">确定</button>
      <button class="btn4" @click="onReset">重置</button>
    </div>
    <p style="margin-top: 5px" class="r-c-text" v-show="success">密码修改成功</p>
  </div>
</template>

<script>
import {iPutUserpwd} from "@/scripts/api/summary";

export default {
  name: "resetPwd",
  data(){
    return{
      pwdData:{
        Oldpasswd: {
          value:'',
          code:'',
          tit:''
        },
        Newpasswd: {
          value:'',
          code:'',
          tit:''
        },
        Confirmpasswd: {
          value:'',
          code:'',
          tit:''
        }
      },
      loading: false,
      success: false
    }
  },
  methods:{
    onReset(){
      for(let k in this.pwdData){
        for(let k2 in this.pwdData[k]){
          this.pwdData[k][k2] = ''
        }
      }
    },
    codeData(item){
      if(item.value.length > 0){
        if(!item.value.match(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/)){
          item.code = false
          item.tit = '密码必须由字母数字组成（大写+小写+数字） , 6-20位（区分大小写）'
        }else{
          item.code = true
          item.tit = ''
        }
      }else{
        item.code = false
        item.tit = '密码不能为空'
      }

    },
    async submitData(){
      this.loading = true
      try{

        if(this.pwdData.Newpasswd.value !== this.pwdData.Confirmpasswd.value){
          this.pwdData.Confirmpasswd.code = false
          this.pwdData.Confirmpasswd.tit = '两次输入的密码不一致！'
          this.loading = false
          return false
        }
        let code = true
        for(let k in this.pwdData){
          if(this.pwdData[k].code === false || this.pwdData[k].code == ''){
            code = false
            break
          }
        }
        if(code){
          let res = await iPutUserpwd({
            Oldpasswd: this.pwdData.Oldpasswd.value,
            Newpasswd: this.pwdData.Newpasswd.value,
            Confirmpasswd: this.pwdData.Confirmpasswd.value
          });
          if(res.Code === 0){
            alert('密码修改成功，清重新登陆')
            window.open( '#/login', '_self')
            this.success = true
          }else{
            alert(res.Msg)
          }
        }
        this.loading = false
      }catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.info-t{
  tr{
    height: 30px;
    td:first-child {
      text-align: center;
      font-weight: bold;
    }
    i{
      font-size: 16px;
      margin: 0 5px;
    }
  }
}
.el-icon-error{
  color: red;
}
.el-icon-success{
  color: #2161b3;
}
.btn4{
  height: 27px;
  width: 66px;
  margin: 0 0 0 8px;
  border-radius: 3px;
}
</style>