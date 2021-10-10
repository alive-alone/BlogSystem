// 对session初始化
initSes()

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
      // span.style.visibility ='hidden';
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
  console.log('1---name'+test)
  sessionStorage.setItem("checkName", test);
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
  // console.log('1---pass'+test)
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
// 初始化sessionStorage
function initSes() {
  sessionStorage.setItem("checkName", 0);
  sessionStorage.setItem("checkAccount", 0);
  sessionStorage.setItem("checkMobile", 0);
  sessionStorage.setItem("checkPass", 0);
}
// 注册账号时，信息不符合规范无法点击注册，按钮灰化
function ashingA(id) {
  document.getElementById(id).style.pointerEvents= 'none';
  document.getElementById(id).style.opacity= 0.6;
}
// 所有信息填写正确按钮恢复
function recoverA(id) {
  document.getElementById(id).style.pointerEvents= 'auto';
  document.getElementById(id).style.opacity= 1;
}
// 检测当前输入框的信息是否符合要求
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
  input.onblur = function() {
    if(input.value == '') {
      span.style.visibility ='hidden';
    } 
  }
  checkRegister();
}
