<template>
  <div id="app">
    <template v-if="$route.name === 'Login'">
      <router-view key="login"></router-view>
    </template>
    <template v-else>
      <router-view key="mview"></router-view>
    </template>

  </div>
</template>

<style lang="less">
@import url('./assets/css/app');
@import url('./assets/css/myelement');
@import url('./assets/css/lottery');
@import url('./assets/css/bet');
html, body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-width: 1600px;
}
body{
  font-family: Verdana, "宋体", Arial, Sans;
}

*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  height: 100%;
}



</style>
