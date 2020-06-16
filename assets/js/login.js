$(function () {

  // 控制表单的提交
  $('.layui-form').submit(function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 获取表单输入域的用户名和密码
    // username=asdf&password=asdffffff
    var formData = $(this).serialize()
    // 提交表单之前需要做表单验证，如果自己实现有点繁琐，所以可以借助LayUI实现
    
    // 调用后台接口验证是否正确
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/login',
      data: formData,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          location.href = './index.html'
        }
      }
    })
  })
  
})