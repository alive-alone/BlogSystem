// function uploadImg(obj){
//   //1. 图片预览
//   //如果浏览器不支持 FileReader 则用文字提示
//   let data = JSON.parse(sessionStorage.getItem("user"));
//   console.log(data)
//   // let account = document.getElementById('account');
//   account.value = 'alive';
//   if(typeof FileReader == 'undefined'){
//       let prevBox = document.getElementById('prev-box')
//       prevBox.innerHTML = "浏览器不支持预览"
//   }else{
//       //获取上传文件，返回 File对象
//       let file = obj.files[0];
//       let reader = new FileReader()
//       //注册读取成功的回调函数
//       reader.onload = function (e) {
//         let img = document.getElementById("img");
//         img.src = e.target.result;
//       }
//       //开始以 DataURL格式读取文件
//       reader.readAsDataURL(file)
//   }

//   //2. 图片上传
//   if(typeof FormData == 'undefined'){
//       alert('浏览器不支持图片上传')
//   }else {
//     let form = document.getElementById('form1')
//     let data = new FormData(form)
//       //添加自定义字段
//       data.append("CustomField", "This is some extra data")
//       //ajax请求
//       let httpRequest = new XMLHttpRequest();
//       httpRequest.open("POST", "http://127.0.0.1:3000/upload_portrait", true);
//       httpRequest.onload = function(oEvent) {
//           if (httpRequest.status == 200) {
//               //服务器返回的保存路径
//               console.log(httpRequest.responseText)
//           } else {
//               document.getElementById('uploadMsg').innerHTML = '图片上传失败，错误码:' + httpRequest.status
//           }
//       };
//       httpRequest.send(data);
//   }

// }
// 上传图片
function uploadImg(obj){
  //1. 图片预览
  //如果浏览器不支持 FileReader 则用文字提示
  // let data = JSON.parse(sessionStorage.getItem("user"));
  // console.log(data)
  let account = document.getElementById('account');
  account.value = 'alive';
  if(typeof FileReader == 'undefined'){
    let prevBox = document.getElementById('prev-box')
    prevBox.innerHTML = "浏览器不支持预览"
  }else{
      //获取上传文件，返回 File对象
      let file = obj.files[0];
      let reader = new FileReader()
      //注册读取成功的回调函数
      reader.onload = function (e) {
        let img = document.getElementById("img");
        img.src = e.target.result;
      }
      //开始以 DataURL格式读取文件
      reader.readAsDataURL(file)
  }

  //2. 图片上传
  if(typeof FormData == 'undefined'){
      alert('浏览器不支持图片上传')
  }else {
    let form = document.getElementById('form1')
    let data = new FormData(form);
    console.log('data----------------------'+data)
      //添加自定义字段
      // data.append("CustomField", "This is some extra data")
      //ajax请求
    // let httpRequest = new XMLHttpRequest();
    // httpRequest.open("POST", "http://127.0.0.1:3000/upload_portrait", true);
    // httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // httpRequest.send(data);
    // httpRequest.onload = function(oEvent) {
    //   if (httpRequest.status == 200) {
    //       //服务器返回的保存路径
    //       console.log(httpRequest.responseText)
    //   } else {
    //       document.getElementById('uploadMsg').innerHTML = '图片上传失败，错误码:' + httpRequest.status
    //   }
    // };   

    let xhr = new XMLHttpRequest();
    //设置请求的类型及url
    //post请求一定要添加请求头才行不然会报错
    xhr.open('post','http://127.0.0.1:3000/upload_portrait');
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    //发送请求
    xhr.send(data);
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        // return xhr.responseText
      }else {
        document.getElementById('uploadMsg').innerHTML = '图片上传失败，错误码:' + xhr.status
     }
    };
  }

}

// let xhr = new XMLHttpRequest();
//   //设置请求的类型及url
//   //post请求一定要添加请求头才行不然会报错
//   xhr.open('post','http://127.0.0.1:3000/add_account');
//   xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  
//   //发送请求
//   xhr.send('name='+datas.name+'&account='+datas.account+'&telephone='+datas.telephone+'&birthday='+datas.birthday+'&pass='+datas.pass);
//   xhr.onreadystatechange = function () {
//       // 这步为判断服务器是否正确响应
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // console.log(xhr.responseText);
//       // return xhr.responseText
//       alert("注册成功,请返回登录！")
//       window.history.go(-1)
//     } 
//   };