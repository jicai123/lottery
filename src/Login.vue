<template>
  <div class="login_bg">
    <div class="login_wrap header">
      <div class="login_box">
        <div class="login_tips">
          <span class="left">用户登陆</span>
          <span class="right"></span>
        </div>
        <ul>
          <li>
            <i>账&emsp;号:</i>
            <input type="text" v-model="formData.username" placeholder="请输入您的账号"/>
          </li>
          <li>
            <i>密&emsp;码:</i>
            <input type="password" v-model="formData.password" placeholder="请输入您的密码"/>
          </li>
          <li style="display: flex">
            <i>验证码:</i>
            <input type="text" v-model="formData.code" placeholder="请输入验证码"/>
            <img :src="codeBase64" title="看不清？点击更换一张验证图片" @click="codeImg" style="padding: 5px;cursor: pointer">
          </li>
        </ul>
        <input type="button" class="submit_btn" value="登录" @click="userLogin"/>
        <div class="login_tool">
          <a class="ico_login" @click="goApp"></a>
          <a class="ico_aplus"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import {get,postForm} from "@/scripts/uils/httpFn";
import http from "@/scripts/uils/http";
import {iGetUserInfo} from "@/scripts/api/summary";
export default {
  name: "Login",
  data(){
    return{
      codeBase64: 'data:image/jpeg;base64,',
      formData:{
        username: '',
        password: '',
        code:'',
        submitStatus: false
      }
    }
  },
  created() {
    this.inilogin();
    sessionStorage.clear();
    this.codeImg();
    document.addEventListener('keyup', this.hanleKeyUp)
  },
  methods:{
    inilogin(){
      if(this.$route.query.hasOwnProperty('msg') && this.$route.query.msg.length > 0){
        alert(this.$route.query.msg)
        window.open( '#/login', '_self')
      }
    },
    hanleKeyUp(e) {
      let key = window.event ? e.keyCode : e.which;
      if (key === 13) {
        this.userLogin();
      }
    },
    async userLogin(){
      if(!this.submitStatus){
        if(this.formData.username.replace(' ','').length < 1){
          alert('请输入账号');
          return false
        }
        if(this.formData.password.replace(' ','').length < 1){
          alert('请输入密码');
          return false
        }
        if(this.formData.code.replace(' ','').length < 1){
          alert('请输入验证码');
          return false
        }
        let res = await postForm( '/Password',{
          username: this.formData.username,
          password: md5(this.formData.password.trim()).toUpperCase(),
          code: this.formData.code
        });
        try {
          if(res.Code === 0){
            let uinfo = await iGetUserInfo();
            if((uinfo.Task & 2) > 0){
              await this.$router.push({
                path: '/resetPwd',
              })
            }else{
              sessionStorage.setItem('login', '1')
              await this.$router.push({
                path:'/statement'
              })
            }
            this.submitStatus = false;
          }else{
            alert(res.Msg)
            await this.codeImg();
            this.submitStatus = false;
          }
        }catch (e) {
          console.log(e)
          alert('登陆失败，请联系上级');
          this.submitStatus = false;
        }
      }

    },
    async codeImg(){
      let res = new Promise((resolve, reject) => {
        http.get('/Password/LoginCode',{responseType:'blob'}).then(res => {
          if(res.status === 200){
            this.codeBase64 = window.URL.createObjectURL(res.data);
          }else if(res.status === 429){

          }
        }).catch(error => {

        })
      })
    },
    goApp(){
      window.top.location.href = window.top.location.origin + '/app/index.html'
    }
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.hanleKeyUp);
  }
}
</script>

<style scoped lang="less">
.login_bg {
  background: url('~@/assets/img/login_newyear.jpg') #fff no-repeat center;
  background-size: cover;
  height: 100%;
  font-size: 13px;
  color: #363636;

  .login_wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 420px;
    margin-top: -260px;
    margin-left: -210px;
    background: rgba(255, 255, 255, .8);
    box-shadow: 0 0 3px #aaa;
    padding-bottom: 5px;

    .login_box {
      margin: 40px;
      position: relative;

      .login_tips {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        .left {
          // background: url('~@/assets/img/login_l.png') no-repeat left center;
          width: 100px;
          height: 30px;
					color: #517dde;
					font-size: 22px;
        }

        .right {
          background: url('~@/assets/img/login_r.png') no-repeat left center;
          cursor: pointer;
          width: 60px;
          height: 30px;
        }
      }

      ul {
        border: 1px solid #bbb;
        border-radius: 3px;

        li {
          display: block;
          background: none;
          border-bottom: 1px solid #ccc;
          position: relative;

          i {
            width: 50px;
            line-height: 50px;
            height: 78px;
            display: block;
            background: none;
            font-style: normal;
            position: absolute;
            top: 0px;
            left: 8px;
            color: #2161b3;
            font-family: "Microsoft Yahei", Arial, Verdana, Helvetica, sans-serif;
            font-size: 14px;
          }

          input[type="text"],
          input[type="password"] {
            font-family: "Microsoft Yahei", Arial, Verdana, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 50px;
            height: 50px;
            width: 100%;
            border: none;
            text-indent: 65px;
            border-radius: 3px 3px 0 0;
            outline: none;
          }
        }
      }
      .submit_btn {
        cursor: pointer;
        margin-top: 15px;
        display: block;
        width: 100%;
        line-height: 50px;
        height: 50px;
        text-align: center;
        border-radius: 3px;
        background: url('~@/assets/img/login_btn.png') repeat-x top;
        border: none;
        border: 1px solid #2161b3;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }

      .login_tool {
        margin-top: 15px;

        a {
          width: 50%;
          float: left;
          display: block;
          height: 60px;
          color: #2161b3;
          text-decoration: none;
        }

        a:last-child {
          text-align: right;
        }

        .ico_login {
          background: url('~@/assets/img/ico_mobile.png') no-repeat left center;
        }

        .ico_aplus {
          background: url('~@/assets/img/ico_aplus.png') no-repeat right center;
        }
      }
    }
  }
}
</style>