$(function () {

  // 控制表单的提交
  $('.layui-form').submit(function (e) {
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
})