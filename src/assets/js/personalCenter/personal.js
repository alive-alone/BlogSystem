// 在个人资料界面显示个人相关信息
showPersonIofo() ;
// 在个人中心页面隐藏其它div，显示所需内容
monitorClick();
// 更新修改后的数据
renewInfo();

// 在个人中心页面隐藏其它div，显示所需内容
function monitorClick() {
  let personIofo = document.getElementsByClassName('container-profile')
  document.getElementById("personalInfo").onclick = function() {
    personIofo[0].style.display = 'block';
    personIofo[1].style.display = 'none';
    personIofo[2].style.display = 'none';
    document.getElementById("personalInfo").classList.add("personala")
    document.getElementById("collection").classList.remove("personala")
    document.getElementById("accountSetting").classList.remove("personala")
  }
  document.getElementById("accountSetting").onclick = function() {
    personIofo[0].style.display = 'none';
    personIofo[1].style.display = 'block';
    personIofo[2].style.display = 'none';
    document.getElementById("personalInfo").classList.remove("personala")
    document.getElementById("collection").classList.remove("personala")
    document.getElementById("accountSetting").classList.add("personala")
  }
  document.getElementById("collection").onclick = function() {
    personIofo[0].style.display = 'none';
    personIofo[1].style.display = 'none';
    personIofo[2].style.display = 'block';
    document.getElementById("personalInfo").classList.remove("personala")
    document.getElementById("collection").classList.add("personala")
    document.getElementById("accountSetting").classList.remove("personala")
  }
}

// 在个人资料界面显示个人相关信息
function showPersonIofo() {
  let datas = JSON.parse(sessionStorage.getItem("user"));
  let account = document.getElementById('per-name')
  let personIofo = document.getElementsByClassName('content-show-r');
  let input = document.getElementsByClassName('el-input__inner');
  for(let j= 0;j< datas.length;j++){
    for(let index in datas[j]) {
      // 相关信息为null显示未填写
      if(datas[j][index] == null || datas[j][index] == '') {
        datas[j][index] = '未填写';
      }
      if(index == 'name') {
        personIofo[0].innerHTML = datas[j][index];
        input[0].value = datas[j][index];
      }else if(index == 'real_name') {
        personIofo[1].innerHTML = datas[j][index];
        if(datas[j][index] != '未填写') {
          input[1].value = datas[j][index];
        }
      }else if(index == 'introduction') {
        personIofo[2].innerHTML = datas[j][index];
        if(datas[j][index] != '未填写') {
          document.getElementById('introduction').value = datas[j][index];
        }
      }else if(index == 'account') {
        account.innerHTML = datas[j][index];
        document.getElementById('account').value = datas[j][index];
      }else if(index == 'area') {
        personIofo[3].innerHTML = datas[j][index];
        let select = datas[j][index].split(' ');
        $('#distpicker').distpicker('destroy');//销毁实例
        $("#distpicker").distpicker({
            province: select[0],
            city: select[1],
            district: select[2],
        })
      }else if(index == 'birthday') {
        personIofo[4].innerHTML = datas[j][index];
        input[2].value = datas[j][index];
      }else if(index == 'sex') {
        if(datas[j][index] == 1) {
          document.getElementById('man').checked = 'checked';
        }else {
          document.getElementById('woman').checked = 'checked';
        }
      }
    }
  }
  editBaseInfo(); // 显示修改个人信息页面
}

// 使用时间选择控件
laydate.render({
  elem: '#birthday' //指定元素
});

// 显示修改个人信息页面
function editBaseInfo() {
  let show = document.getElementById('base-info-content-show');
  let edit = document.getElementById('base-info-content-edit');
  // 点击个人信息进入修改页面
  show.onclick = function() {
    show.style.display = 'none';
    edit.style.display = 'block';
  }
  // 点击取消按钮退回个人页面
  document.getElementById('el-form-botton-cancel').onclick =function() {
    show.style.display = 'block';
    edit.style.display = 'none';
  }
}

// 修改个人信息后更新数据
function renewInfo() {
  document.getElementById('el-form-preser').onclick = function() {
    setTimeout(function() {
      let datas = JSON.parse(sessionStorage.getItem("user"));
      console.log(datas)
      let account = datas[0].account;
      let ajax = new XMLHttpRequest();
      ajax.open('get','http://127.0.0.1:3000/renew_info?'+'account='+account);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState==4 && ajax.status==200) {
          let data = ajax.responseText;
          data = JSON.parse(data);
          sessionStorage.removeItem("user"); 
          sessionStorage.setItem("user", JSON.stringify(data));
          console.log(data.length)
          console.log(data)
          alert('修改成功！');
          setTimeout(function() {
            showPersonIofo();
          },100);
          document.getElementById('base-info-content-show').style.display = 'block';
          document.getElementById('base-info-content-edit').style.display = 'none';
        }
      }
    },500)
  }
}

