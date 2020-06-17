// 判断登录成功的标志是否存在
$(function() {
    //判断token是否存在
    var mytoken = localStorage.getItem('mytoken')
    if(!mytoken) {
        //mytoken不存在，就跳转登录页面
        location.href = './login.html'
    }

    //首页加载时需要调用后台接口获取用户信息
    function loadUserInfo() {
        $.ajax({
            type:'get',
            url:'http://ajax.frontend.itheima.net/my/userinfo',
            headers:{
                // my开头的请求都需要携带请求头，作用：权限验证（只有登录后才能访问）
                Authorization:localStorage.getItem('mytoken')
            },
            success:function(res) {
                // console.log(res)
                //获取成功
                if(res.status === 0) {
                    // 用户信息
                    var info = res.data
                    $('#nav-username').html(info.username)
                    $('#welcome-username').html(info.username)
    
                    //头像
                    // info.user_pic = 'http://t.cn/RCzsdCq'
                   if(info.user_pic) {
                       //删除默认头像
                       $('#welcome-username').siblings('div').remove()
                       //添加新头像
                    //    <img src="http://t.cn/RCzsdCq">
                       $('#welcome-username').parent().prepend('<img src="'+info.user_pic+'">')
                   }else {
                       //显示div
                   }
                }
            }
    
        })
    }
    loadUserInfo();
})