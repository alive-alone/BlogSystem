// 监听按键是否为回车键
function checkEnter() {
  console.log('check')
  document.onkeydown = function(event){
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode == 13){ 
      return 1;
    }
  };
}
// 动态添加li（博客信息）
function addposts(datas) {
  let posts = '<div>\
        <div class="title">\
          <div style="padding: 0;">\
            <h2>'+datas.title+'</h2>\
          </div>\
          <div>\
            <a>\
              <img src="./assets/img/叉号.png">\
            </a>\
          </div>\
        </div>\
        <div class="userbar">\
          <dl class="userdl">\
            <div>\
              <dt>'+'头像'+'</dt>\
              <dd style="margin-left:10px ;">'+datas.name+'</dd>\
            </div>\
            <div class="brief_intro">'+datas.content+'</div>\
            <div class="com_area">\
              <dd>\
                <a>\
                  <span>\
                    <img src="./assets/img/点赞 (1).png" alt="">\
                  </span>\
                  <span>'+datas.praise+'</span>\
                </a>\
              </dd>\
              <dd>\
                <a>\
                  <span><img src="./assets/img/浏览.png" alt=""></span>\
                  <span>'+datas.visit+'</span>\
                </a>\
              </dd>\
              <dd>\
                <a>\
                  <span><img src="./assets/img/评论.png" alt=""></span>\
                  <span>'+datas.comment+'</span>\
                </a>\
              </dd>\
            </div>\
          </dl>\
        </div>\
      </div>'
  return posts
}