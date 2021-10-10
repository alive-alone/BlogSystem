// 加载个人的帖子
loadPosts();
// 加载个人帖子
function loadPosts() {
  let datas = JSON.parse(sessionStorage.getItem("posts"));
  let user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user)
  let name = user[0].name;
  console.log(name);
  for(i=0;i<datas.length;i++) {
    if(datas[i].name == name) {
    let posts = addposts(datas[i])
    let createLi = document.createElement('li');
    createLi.className = 'useli';
    createLi.innerHTML = posts;
    document.getElementById('postsList').appendChild(createLi);
    }
  }
}
// 动态添加li（帖子信息）
function addposts(datas) {
  let posts = '<div>\
        <div class="title">\
          <div style="padding: 0;">\
            <h2>'+datas.title+'</h2>\
          </div>\
          <div>\
            <a>\
              <img src="../../assets/img/叉号.png">\
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
                    <img src="../../assets/img/点赞 (1).png" alt="">\
                  </span>\
                  <span>'+datas.praise+'</span>\
                </a>\
              </dd>\
              <dd>\
                <a>\
                  <span><img src="../../assets/img/浏览.png" alt=""></span>\
                  <span>'+datas.visit+'</span>\
                </a>\
              </dd>\
              <dd>\
                <a>\
                  <span><img src="../../assets/img/评论.png" alt=""></span>\
                  <span>'+datas.comment+'</span>\
                </a>\
              </dd>\
            </div>\
          </dl>\
        </div>\
      </div>'
  return posts
}