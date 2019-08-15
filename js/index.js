/*
 * @Author: baijuan
 * @Date: 2019-08-15 11:22:15
 * @LastEditors: baijuan
 * @LastEditTime: 2019-08-15 12:16:03
 */

let home = {
  loginIcon: '',
  sideBox: '',
  sideMask: '',

  emailIcon: '',
  emailList: '',

  conTabBox: '',
  toggleBtn: '',
  inFo: '',
  init () {
    this.loginIcon = document.querySelector('.header_l')
    this.sideBox = document.querySelector('.side_box')
    this.sideMask = document.querySelector('.side_mask')
    this.emailIcon = document.querySelector('.header_r_email')
    this.emailList = document.querySelector('.header_r_list')
    this.conTabBox = document.querySelector('.con_tab')
    this.toogleNav = document.querySelector('.con_nav')
    this.toggleBtn = document.querySelector('.toggle-btn')
    this.inFo = document.querySelector('.con_info')

    this.loginIconShow()
    this.emailIconShow()
    this.navFixed()
    this.toggleBtnFn()
    this.tabChange()
  },
  // 1. 点击用户头像显示登录界面
  loginIconShow () {
    let self = this
    this.loginIcon.onclick = function () {
      self.sideBox.setAttribute('data-visibity', 'show')
    }
    // 隐藏
    this.sideMask.onclick = function () {
      self.sideBox.setAttribute('data-visibity', '')
    }
  },
  // 2. 点击邮箱弹出菜单，显示频道切换列表
  emailIconShow () {
    let self = this
    this.emailIcon.onclick = function () {
      self.emailList.setAttribute('data-display', self.emailList.getAttribute('data-display') ? '' : 'block')
    }
    // bind body event
    document.body.addEventListener('click', (e) => {
      if (!contains(this.emailIcon, e.target)) {
        self.emailList.setAttribute('data-display', '')
      }
    }, true)
    var contains = function (parentNode, childNode) {
      if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode)
      } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16)
      }
    }
  },
  // 3. 主导航在页面滚动的时候做吸顶处理
  navFixed () {
    let self = this
    document.addEventListener('scroll', function () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      self.conTabBox.setAttribute('data-fixed', top >= 45 ? 'fixed' : '')
    })
  },
  // 4. 二级导航点击最后的下拉箭头，展示所有的二级导航
  toggleBtnFn () {
    let self = this
    this.toggleBtn.onclick = function () {
      self.toogleNav.setAttribute('data-type', self.toogleNav.getAttribute('data-type') ? '' : 'closed')
    }
  },
  // 5. 完成今日要闻和体育两个模块
  tabChange () {
    let self = this
    self.conTabBox.onclick = function (e) {
      console.dir(e.target)
      e.stopPropagation()
      e.preventDefault()
      let _target = e.target
      if (e.target.nodeName === 'LI') {
        if (_target.className) return
        for (let i = 0; i < this.children[0].children.length; i++) {
          this.children[0].children[i].className = ''
        }
        self.toogleNav.style.display = _target.innerText === '要闻' ? 'block' : 'none'
        e.target.className = 'con_tab_active'
        let tabName = e.target.attributes['data-tab'].textContent
        self.myAjax(tabName)
      }
    }
  },
  myAjax (name) {
    let self = this
    console.log(name)
    let xhr = new XMLHttpRequest()
    fetch('/getData?name=' + name).then(function (response) {
      return response.json()
    }).then(data => {
      let str = ''
      for (let j = 0; j < data.length; j++) {
        for (let m = 0; m < data[j].content.length; m++) {
          let item = data[j].content[m]
          str += `<li>
                      <a href="javascript:void(0)">
                          <h3 class="con_con_title">${item.title}</h3>
                          <div class="con_con_pic"><img src="${item.pic}" alt=""></div>
                          <div class="con_con_detail">
                              <span class="news-source">${item.souce}</span>
                              <span class="pubtime">${item.pubtime}</span>
                              <span class="reply">${item.reply}</span>
                          </div>
                      </a>
                  </li>`
        }
      }
      console.log(str)
      self.inFo.innerHTML = str
    })
    // xhr.open('get', '/getData?name=' + name)
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4) {
    //     console.log(xhr.status)
    //     if (/^(2)\d{2}$/.test(xhr.status) || xhr.status === 304) {
    //       // console.dir(xhr);
    //       let data = xhr.response
    //       console.log(data)
    //       data = JSON.parse(data)
    //       let str = ''
    //       for (let j = 0; j < data.length; j++) {
    //         for (let m = 0; m < data[j].content.length; m++) {
    //           let item = data[j].content[m]
    //           str += `<li>
    //               <a href="javascript:void(0)">
    //                   <h3 class="con_con_title">${item.title}</h3>
    //                   <div class="con_con_pic"><img src="${item.pic}" alt=""></div>
    //                   <div class="con_con_detail">
    //                       <span class="news-source">${item.souce}</span>
    //                       <span class="pubtime">${item.pubtime}</span>
    //                       <span class="reply">${item.reply}</span>
    //                   </div>
    //               </a>
    //           </li>`
    //         }
    //       }
    //       console.log(str)
    //       self.inFo.innerHTML = str
    //     } else {
    //       alert('获取失败')
    //     }
    //   }
    // }
    // xhr.send()
  }

}
home.init()
