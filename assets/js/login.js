$(function () {
  // layui是全局对象，通过它可以得到form对象
  var form = layui.form
  // 基于LayUI自定义表单验证规则
  form.verify({
    // 必须是6-8位字符,不包括空格
    uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
    // 密码必须是6位数字
    pwd: function (value, item) {
      // 形参value标书对应输入域的值
      // item表示DOM元素
      // 验证6位数字
      var reg = /^\d{6}$/
      // 如果规则不匹配就返回提示
      if (!reg.test(value)) {
        return '密码必须是6位数字'
      }
    },
    same: function(value) {
      //获取原始密码
      var pwd = $('#registerForm input[name=password]').val()
      console.log(pwd,value);
      if(pwd !== value) {
        return '两次输入的密码必须一致'
      }
    }
  })

  // 控制登录表单的提交
  $('#loginForm').submit(function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 获取表单输入域的用户名和密码
    // username=asdf&password=asdffffff
    var formData = $(this).serialize()
    // 提交表单之前需要做表单验证，如果自己实现有点繁琐，所以可以借助LayUI实现
    
    // 调用后台接口验证是否正确
    $.ajax({
      type: 'post',
      url: 'api/login',
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
      url:'api/reguser',
      data: formData,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          //注册成功，调用注册点击事件
          $('#registerForm a').click()
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