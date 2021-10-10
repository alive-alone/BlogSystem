//监听登录事件
loadings.onclick = function(){
  let account = document.getElementById('account').value
  let pass = document.getElementById('pass').value
  get(account,pass);
  // let data = localStorage.getItem("user");
  // setTimeout(function() {
  //   let data = JSON.parse(sessionStorage.getItem("user"));
  //   // console.log('settimeout-------data'+data)
  //   // console.log(data[0])
  //   if(data.length != 0  && data != null) {
  //     window.location.href="../../index.html"
  //   } else {
  //     alert('登录失败!')
  //   }
  // },50)
}
// 登录账号时发送get请求，匹配信息是否正确
function get(account,pass) {
  let ajax = new XMLHttpRequest();
  ajax.open('get','http://127.0.0.1:3000/account?'+'account='+account+'&'+'pass='+pass);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState==4 && ajax.status==200) {
      let data = ajax.responseText;
      data = JSON.parse(data);
      sessionStorage.removeItem("user"); 
      sessionStorage.setItem("user", JSON.stringify(data));
      console.log(data.length)
      console.log(data)
      if(data.length != 0  &&  data != null) {
        window.location.href="../../index.html"
      }else {
        alert('登录失败!')
      }
    }
  }
}

// 登录信息不规范无法点击登录按钮
function checkRegister() {
  ashingA('loadings')
  document.getElementById('loadBut').style.opacity = 0.5;
  // console.log('check')
  let test = JSON.parse(sessionStorage.getItem("checkAccount"));
  if(test == 0) {
    return 0;
  }else {
    test = JSON.parse(sessionStorage.getItem("checkPass"));
    // console.log('user-----'+test)
    if(test == 0) {
      return 0;
    }else {
      recoverA('loadings');
      document.getElementById('loadBut').style.opacity = 1;
    }
  }
}