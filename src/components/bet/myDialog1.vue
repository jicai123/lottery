<template>
  <div class="my-dialog-wrapper" v-show="isVisible">
    <div class="mdialog1-box" :style="{width: width,height: height}" v-Drag>
      <div class="mdialog-header">
        <slot name="tit"></slot>
        <i class="el-icon-close" @click.self="Close"></i>
      </div>
      <div class="mdialog-content" v-show="!loadStatus">
        <div class="content">
          <slot></slot>
        </div>
        <div class="mdialog-page" v-if="showPage">
          <slot name="page"></slot>
        </div>
      </div>
      <div class="mdialog-content" v-show="loadStatus">
        <div class="load">
          <div class="load-content">
            <i class="el-icon-loading"></i>
            <span>加载中...</span>
          </div>
        </div>
      </div>
      <div class="moialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="modal" v-show="modal"></div>
  </div>
</template>

<script>


export default {
  name: "myDialog1",
  props: {
    width: {
      disabled: '600px'
    },
    height: {
      disabled: '400px'
    },
    isVisible: {
      default: true,
      disabled: false
    },
    showPage: {
      disabled: false
    },
    loadStatus: {
      disabled: true
    },
    modal: {
      default: false
    }
  },
  data() {
    return {
      iniState: false
    }
  },
  watch: {
    isVisible(nval) {
      if (nval && !this.iniState) {
        setTimeout(() => {
          this.iniStyle()
        }, 100)
      }
    },
  },
  methods: {
    iniStyle() {
      let box = document.getElementById('main-view');
      this.$el.firstChild.style.left = box.offsetWidth / 2 - this.$el.firstChild.offsetWidth / 2 + 'px';
      this.$el.firstChild.style.top = box.offsetHeight / 2 - this.$el.firstChild.offsetHeight / 2 + 'px';
      this.iniState = true;
      this.$el.firstChild.style.opacity = 1;
    },
    Close() {
      this.iniState = false;
      this.$emit('closeDialog', false)
      this.$el.firstChild.style.opacity = 0;
    }
  }
}
</script>

<style scoped lang="less">
.my-dialog-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: 10000;
}

.mdialog1-box {
  position: absolute;
  left: 50%;
  top: 50%;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  z-index: 99999;
  opacity: 0;

  .mdialog-header {
    font-weight: 700;
    padding: 0.6em 1em;
    background: #667cce;
    color: #fff;
    cursor: move;
    text-align: center;
    position: relative;

    i {
      font-weight: bold;
      float: right;
      font-size: 16px;
      cursor: pointer !important;
    }
  }

  .mdialog-content {
    padding: 5px 5px;
    position: relative;
    min-height: 50px;
    .content{
      max-height: 500px;
      overflow-y: auto;
    }
  }

  .load {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    background: #cccccc;
    zoom: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .load-content {
      i {
        font-size: 16px;
        color: #004eff;
      }

      width: 70px;
      line-height: 20px;
      background: #ffffff;
      border: 2px solid #6593cf;
      padding: 2px;
    }
  }

  .moialog-footer {
    text-align: center;
    background-color: #f0f2f2;
    border-width: 1px 0 0 0;
    background-image: none;
  }
  .mdialog-page {
    text-align: center;
    margin: 10px auto;
  }
}

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/img/bg_diagonals.png");
  opacity: .5;
}
.bet-content{
  max-height: 300px;
  overflow-y: auto;
}
.bet-list {
  width: 100%;
  text-align: center;
  td {
    height: 28px;
    line-height: 28px;

    input[type=text] {
      width: 60px;
      padding: 1px 4px;
    }
  }
}
</style>