// 判断登录成功的标志是否存在
$(function() {
    //判断token是否存在
    var mytoken = localStorage.getItem('mytoken')
    if(!mytoken) {
        //mytoken不存在，就跳转登录页面
        location.href = './login.html'
    }
})