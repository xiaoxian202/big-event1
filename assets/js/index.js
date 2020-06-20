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
            url:'my/userinfo',
            // headers:{
            //     // my开头的请求都需要携带请求头，作用：权限验证（只有登录后才能访问）
            //     Authorization:localStorage.getItem('mytoken')
            // },
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
                       $('#welcome-username,#nav-username')
                       .parent()
                       .siblings('div')
                       .remove()
                       //添加新头像
                    //    <img src="http://t.cn/RCzsdCq">
                       $('#welcome-username,#nav-username')
                       .parent()
                       .parent()
                       .find('img')
                       .remove()
                       .end()//退回到上一次选择器选中的内容
                       .prepend('<img src="'+info.user_pic+'">')
                   }else {
                       //显示div
                   }
                }
            }
    
        })
    }
    loadUserInfo();

    // 把加载用户信息的方法添加到$对象上（本质上就是jq插件）
    $.loadUserInfo = loadUserInfo

    //绑定退出事件
    // 1.layui弹框
    // 2.清空数据
    // 3.关闭弹框
    // 4.跳转登录页面
    $('#logout-btn').click(function() {
        layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
            //实现退出的功能：清除token
            localStorage.removeItem('mytoken')

            // 关闭弹窗
            layer.close(index);
            
            //调转登录页面
            location.href = "./login.html"
        });
    })
})