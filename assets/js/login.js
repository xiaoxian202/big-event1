$(function () {

  // 控制登录表单的提交
  $('#loginForm').submit(function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 获取表单输入域的用户名和密码
    // username=asdf&password=asdffffff
    var formData = $(this).serialize()
    // 调用后台接口验证是否正确
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/login',
      data: formData,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          localStorage.setItem('mytoken',res.token)
          location.href = './index.html'
        }
      }
    })
  })

  // 控制注册表单提交
  $('#registerForm').submit(function(e) {
    //阻止默认
    e.preventDefault()
    //获取表单数据
    var formData = $(this).serialize()
    //调用接口进行注册
    $.ajax({
      type:'post',
      url:'http://ajax.frontend.itheima.net/api/reguser',
      data: formData,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          //注册成功，调用登录点击事件
          $('#loginForm a').click()
        }else{
          // 注册失败提示
          // layer是一个独立的模块，默认可以独立使用
          layer.msg(res.message)
        }
      }

    })
  })

  //注册表单下面链接
  $('#registerForm a').click(function() {
    $('#registerForm').hide()
    $('#loginForm').show()
  })
  //登录表单下面链接
  $('#loginForm a').click(function() {
    $('#loginForm').hide()
    $('#registerForm').show()
  })
})