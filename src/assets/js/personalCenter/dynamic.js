markSelectionClick(); //显示文章标签

submitForm(); // 获取博客客主并提交form表单数据

// 显示文章标签
function markSelectionClick() {
  e('add_mark').onclick = function(event){
    e('mark_selection_box').style.display='flex';
    changeCheckClass();
    stopBubble(event);
    document.onclick=function(){
    e('mark_selection_box').style.display='none';
  　document.onclick=null;　
    }
  }
    
  e('mark_selection_box').onclick=function(event){
    //只阻止了向上冒泡，而没有阻止向下捕获，所以点击con的内部对象时，仍然可以执行这个函数
    stopBubble(event);
  }
  getTags();  // 获取所选的文章标签
}
// 获取所选的文章标签
function getTags(del_target) {
  // console.log(del_target)
  let tages = document.getElementById('mark_selection_info').getElementsByTagName('span');
  let input = document.getElementById('tages');
  for (let i = 0; i < tages.length; i++) {
    tages[i].onclick = function() {
      // 标签选中后修改背景颜色
      tages[i].style.backgroundColor = 'rgb(171, 218, 250)'; 
      if(input.value.indexOf(tages[i].innerText) == -1) {
        input.value += tages[i].innerText + ' ';
        createSpan(tages[i].innerText); // 填写页面显示所选文章标签
      }
    }
    // 当标签被删除时，修改被删标签状态（未选状态），文章删除对应标签
    if(del_target != undefined) {
      let del = del_target + ' ';
      input.value = input.value.replace(del,"");
      tages[i].style.backgroundColor = 'rgb(228, 247, 247)'; 
      if(input.value.indexOf(tages[i].innerText) != -1) {
        tages[i].style.backgroundColor = 'rgb(171, 218, 250)'; 
      }
    }
  }
}
// 删除选取标签
function deleteTags(id) {
  let tages = document.getElementById(id);
  console.log(id)
  let span = tages.parentNode;
  let data = tages.parentNode.innerText;
  span.parentNode.removeChild(span); 
  getTags(data)
}
// 修改被点击标签的背景色
function changeCheckClass() {
  let list = document.getElementById('mark_selection_ul');
  let markDiv = document.getElementsByClassName('mark_selection_option');
  let a = list.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {
    a[i].onclick = function() {
      for (let j = 0; j < a.length; j++) {  
          a[j].className = ''; 
          markDiv[j].style.display ='none';
      }  
      this.className = 'selection_active';
      markDiv[i].style.display ='block';
    }
  }
}

// 填写显示文章标签
function createSpan(value) {
  let tages = document.getElementById('mark_selection_box_el_tag').getElementsByTagName('span');
  let span_id = tages.length;
  let createSpan = document.createElement('span');
  let span = value + '<img class="tages_delete" id ="'+span_id+'" onclick="deleteTags(id)" src="../../assets/img/叉号.png"></img>'
  createSpan.className = 'mark_selection_box_el_tag';
  createSpan.innerHTML = span;
  document.getElementById('mark_selection_box_el_tag').appendChild(createSpan);
}

// 获取博客客主并提交form表单数据
function submitForm() {
  let data = JSON.parse(sessionStorage.getItem("user"));
  console.log(data);
  let tages = document.getElementById('opt-box').getElementsByTagName('button');
  let name = document.getElementById('name');
  let account = document.getElementById('account');
  let input = document.getElementById('state');

  let form = document.getElementById('el-form');
  for (let i = 0; i < tages.length; i++) {
    tages[i].onclick = function() {
      tages[i].style.opacity = 0.5; 
      tages[i].disabled = true;
      let state = tages[i].value;
      input.value = state;
      name.value = data[0].name;
      account.value = data[0].account;
      form.submit();
    }
  }
}

// 发布博客
document.getElementById('submit_iframe').onload = function() {
  alert('发布成功!')
}


//阻止冒泡函数
function stopBubble(e){ 
  if(e && e.stopPropagation){
    e.stopPropagation();  //w3c
  }else{
    window.event.cancelBubble=true; //IE
  }
}
// 简化获取对象
function e(obj) {
  return document.getElementById(obj)
}