// document.getElementById('postsTitle').innerHTML = 'title';
//   document.getElementById('postsContent').innerHTML = 'content';

//加载所点击帖子内容
loadArticleData();
//加载所点击帖子内容
function loadArticleData() {
  window.onload = function() {
    let i = JSON.parse(sessionStorage.getItem("checkedLi"));
    let datas = JSON.parse(sessionStorage.getItem("posts"));
    console.log(datas)
    let posts = datas[i];
    document.getElementById('postsTitle').innerHTML = posts.title;
    document.getElementById('postsContent').innerHTML = posts.content;
  }
}
