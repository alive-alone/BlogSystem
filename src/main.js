// 监听登录按钮
getClick();

function getClick() {
  let data = JSON.parse(sessionStorage.getItem("user"));
  // 监听登录按钮
  loading.onclick = function(){
    if(data != null || data !=undefined) {
      getData()
    }else {
      sessionStorage.removeItem("user"); 
      window.location.href="./pages/common/loading.html"
    }
  }
  // 监听动态按钮
  dynamic.onclick = function(){
    if(data != null || data !=undefined) {
      window.location.href="./pages/content/dynamic.html";
    }else {
      alert('请先登录！');
    }
  }

}
// 加载登录后的信息
getData();
// 加载博客帖子信息
getPosts();

// 加载登录后的信息
function getData() {
  let data = JSON.parse(sessionStorage.getItem("user"));
  let loadingli = document.getElementById('loading');
  let ul = loadingli.firstChild;
  if(data != null && data !=undefined) {
    // 使‘登录’转换为用户名
    let name = data[0].name
    loadingli.innerHTML=name + '<ul class="drop"><div><li id="personal">个人中心</li><li id= "personalPosts">动态管理</li><li id="signOut">退出登录</li></div></ul>'
    // 退出登录
    document.getElementById("signOut").onclick = function() {
      sessionStorage.removeItem("user");
      location.reload();
    };
    // 进入个人中心
    document.getElementById("personal").onclick = function() {
      window.location.href="./pages/content/personal.html"
    };
    // 进入动态管理
    document.getElementById("personalPosts").onclick = function() {
      window.location.href="./pages/content/personalPosts.html"
    };
  }
}
// 加载博客帖子信息
function getPosts() {
  let ajax = new XMLHttpRequest();
  ajax.open('get','http://127.0.0.1:3000/get_posts');
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState==4 &&ajax.status==200) {
      let datas = ajax.responseText;
      datas = JSON.parse(datas);
      sessionStorage.removeItem("posts"); 
      sessionStorage.setItem("posts", JSON.stringify(datas));
      for(i=0;i<datas.length;i++) {
        if(datas[i].state == 'publish') {
          let posts = addposts(datas[i])
          let createLi = document.createElement('li');
          createLi.className = 'useli';
          createLi.innerHTML = posts;
          document.getElementById('postsList').appendChild(createLi);
          loadArticle();// 点击帖子加载帖子内容
        }
      }
    }
  }
}

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
// 查看帖子内容
function loadArticle() {
  let posts = document.getElementById('postsList').getElementsByTagName('li');
  for (let i = 0; i < posts.length; i++) {
    posts[i].onclick = function() {
      console.log(i)
      sessionStorage.setItem("checkedLi", JSON.stringify(i));
      window.location.href="./pages/content/viewArticle.html";
    }
  }
}