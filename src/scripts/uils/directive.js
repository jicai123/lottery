//自定义指令
import Vue from "vue";
export default () => {
  Vue.directive('Int',{
    inserted: (el) => {
      let inputDom = el.querySelector('input')?el.querySelector('input'):el
      inputDom.oninput = (e) => {
        inputDom.value = inputDom.value.replace(/[^\d.]/g, '')
      }
    }
  })
  Vue.directive('Drag',{
    bind(el, binding, vnode) {
      let odiv = el,   //获取当前元素
        tmod = el.firstChild; //标题
      tmod.onmousedown = (e) => {
        let obj = document.querySelectorAll('.mdialog1-box')
        let max = []
        obj.forEach(item => {
          max.push(Number(window.getComputedStyle(item).zIndex))
        })
        if(max.length > 0){
          console.log(max);
          odiv.style.zIndex = Math.max.apply(null, max) + 2
        }
        //文字可选
        document.body.style['user-select'] = 'none';
        let disX = e.clientX - odiv.offsetLeft,
          disY = e.clientY - odiv.offsetTop,
          //父级高度
          parHeight = odiv.parentElement.offsetHeight,
          //父级宽度
          parWidth = odiv.parentElement.offsetWidth,

          left = '',
          top = '';
        //鼠标进入事件
        document.onmousemove = (e) => {
          if (e.clientX - disX < 0) {
            left = 0
          } else {
            if (e.clientX - disX > parWidth - odiv.offsetWidth) {
              left = parWidth - odiv.offsetWidth
            } else {
              left = e.clientX - disX
            }
          }
          if (e.clientY - disY < 0) {
            top = 0
          } else {
            if (e.clientY - disY > parHeight - odiv.offsetHeight) {
              top = parHeight - odiv.offsetHeight
            } else {
              top = e.clientY - disY
            }
          }
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
        }
        //鼠标离开事件
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          document.body.style['user-select'] = 'auto';
        }
      };
    }

  })
}