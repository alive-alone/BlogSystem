// 监听注册账号事件
document.getElementById("reg-account").onclick = function() {
  let datas = getInfo();
  console.log(datas)
  checkRep(datas,datas.account)
};

initSes()

// 注册信息不规范无法点击注册按钮
function checkRegister() {
  document.getElementById('reg-account').style.pointerEvents= 'none';
  let test = JSON.parse(sessionStorage.getItem("checkname"));
  // console.log('name-----'+test)
  if(test == 0) {
    return 0;
  }else {
    test = JSON.parse(sessionStorage.getItem("checkUser"));
    // console.log('user-----'+test)
    if(test == 0) {
      return 0;
    }else {
      test = JSON.parse(sessionStorage.getItem("checkMobile"));
      // console.log('mobile-----'+test)
      if(test == 0) {
        return 0;
      }else {
        test = JSON.parse(sessionStorage.getItem("checkpass"));
        // console.log('pass-----'+test)
        if(test == 0) {
          return 0;
        }else {
          let passAgain = document.getElementById('passAgain').value;
          // console.log('passagain'+passAgain)
          if(passAgain == ''|| passAgain == null) {
            return 0;
          }else {
            AFailure('reg-account');
            // console.log(1111111)
          }
        }
      }
    }
  }
}

function AFailure(id) {
  document.getElementById(id).style.pointerEvents= 'auto';
  document.getElementById(id).style.opacity= 1;
}

function initSes() {
  sessionStorage.setItem("checkName", 0);
  sessionStorage.setItem("checkAccount", 0);
  sessionStorage.setItem("checkMobile", 0);
  sessionStorage.setItem("checkPass", 0);
}

// regaccoun.addEventListener('click',function() {

// })

// 检测注册信息(账号是否相同，两次输入密码是否一致)
function checkRep(datas,account) {
  let ajax = new XMLHttpRequest();
  ajax.open('get','http://127.0.0.1:3000/check_repet?'+'account='+account);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState==4 &&ajax.status==200) {
      let data = ajax.responseText;
      data = JSON.parse(data);
      console.log(data)
      if(data.length == 0  || data == null) {
        // window.location.href="../../index.html"
        if(datas.pass != datas.passAgain) {
          alert("两次输入密码不一致")
          document.getElementById("passAgain").value = ''
        }else {
          postAcc(datas)
        }
      }else {
        alert("账号已存在")
        document.getElementById("name").value = ''
      }
    }
  }
}

// 将注册信息储存到数据库中
function postAcc(datas) {
  //创建异步对象
  let xhr = new XMLHttpRequest();
  //设置请求的类型及url
  //post请求一定要添加请求头才行不然会报错
  xhr.open('post','http://127.0.0.1:3000/add_account');
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  
  //发送请求
  xhr.send('name='+datas.name+'&account='+datas.account+'&telephone='+datas.telephone+'&birthday='+datas.birthday+'&pass='+datas.pass);
  xhr.onreadystatechange = function () {
      // 这步为判断服务器是否正确响应
    if (xhr.readyState == 4 && xhr.status == 200) {
      // console.log(xhr.responseText);
      // return xhr.responseText
      alert("注册成功,请返回登录！")
      window.history.go(-1)
    } 
  };
}

function splicing(datas) {
  for(let index in datas){
    let url
    url = url + index + '=' + datas[index]
    console.log(index);
    
    console.log(object[index]);
}
}

// 获取注册相关信息
function getInfo() {
  let datas = {}
  datas.name = document.getElementById("name").value;
  datas.account = document.getElementById("account").value;
  datas.telephone = document.getElementById("telephone").value;
  datas.birthday = document.getElementById("birthday").value;
  datas.pass = document.getElementById("pass").value;
  datas.passAgain = document.getElementById("passAgain").value;
  return datas
}

// 使用时间选择控件
laydate.render({
  elem: '#birthday' //指定元素
});

//判断昵称是否合理
// 由字母a～z(不区分大小写)、数字0～9、点、减号或下划线组成
// 只能以字母开头，包含字符 数字 下划线
// 用户名长度为4～12个字符
function checkName(value,span,input){
  let test = 0;
  let re = /[a-zA-Z\u4E00-\u9FA5]{2,9}/;
  span.style.visibility ='hidden';
  if (re.test(value)) {
    span.style.visibility ='hidden';
    test = 1;
  } else {
    test = 0;
    if(input.value == '') {
      span.innerHTML = '4～12个字符'
      span.style.visibility ='visible'; 
    } else {
      span.innerHTML = '昵称无效'
      span.style.visibility ='visible';
    }
  }
  if(value.length > 9) {
    span.style.visibility ='visible';
    test = 0;
  }
  // document.getElementById('reg-account').style.pointerEvents= 'none'
  // if(test == 0) {
  //   AFailure('reg-account')
  // }
  console.log('1---name'+test)
  sessionStorage.setItem("checName", test);
}

//判断账号是否合法
//验证规则：字母、数字、下划线组成，字母开头，4-16位。
function checkAccount(value,span,input){
  let test = 0;
  let re = /^\d{6,10}$/;   
  if (re.test(value)) {
    test = 1;
    span.style.visibility ='hidden';
  } else {
    text = 0;
    if(input.value == '') {
      // span.style.visibility ='hidden';
      span.innerHTML = '数字组成，6-10位'
      span.style.visibility ='visible';
    } else {
      span.innerHTML = '账号无效'
      span.style.visibility ='visible';
    }
  }
  sessionStorage.setItem("checkAccount", test);
  // console.log('1---user'+test)
}

//判断密码是否合法
//验证规则：字母、数字、下划线组成，字母开头，4-16位。
function checkPass(value,span,input){
  let test = 0;
  let re = /^\w{6,10}$/;
  if (re.test(value)) {
    span.style.visibility ='hidden';
    test = 1;
  } else {
    test = 0;
    if(input.value == '') {
      // span.style.visibility ='hidden';
      span.innerHTML = '字母、数字、下划线，6-10位'
      span.style.visibility ='visible';
    } else {
      span.innerHTML = '无效密码'
      span.style.visibility ='visible';
    }
  }
  console.log('1---pass'+test)
  sessionStorage.setItem("checkPass", test);
}

//验证手机号码
//验证规则：11位数字，以1开头。
function checkMobile(value,span,input) {
  let test = 0
  let re = /^1\d{10}$/
  if (re.test(value)) {
    test = 1;
    span.style.visibility ='hidden';
  } else {
    test = 0;
    if(input.value == '') {
      span.innerHTML = '11位数字';
      span.style.visibility ='visible';
    } else {
      span.innerHTML = '手机号码无效'
      span.style.visibility ='visible';
    }
  }
  console.log('1---mobile'+test)
  sessionStorage.setItem("checkMobile", test);
}

// 检测相应输入框的输入信息是否符合规定
function check(value,id) {
  let input = document.getElementById(id);
  let span = input.nextElementSibling.children[0]
  // span.style.visibility ='hidden';
  switch (id) {
    case 'name':
      checkName(value,span,input);
      break;
    case 'account':
      checkAccount(value,span,input);
      break;
    case 'telephone':
      checkMobile(value,span,input);
      break;
    case 'pass':
      checkPass(value,span,input)
      break;
    case 'passAgain':
      checkPass(value,span,input)
      break;
    default:
      break;
  }
  // 当输入框未输入且为空时不提示错误信息
  input.onblur = function() {
    if(input.value == '') {
      span.style.visibility ='hidden';
    } 
  }
  checkRegister();  // 注册信息不规范无法点击注册按钮
}
