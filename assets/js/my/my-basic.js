$(function() {
    //调用接口，获取用户信息
    function loadUserInfo() {
        var form = layui.form
        $.ajax({
            type:'get',
            url:'my/userinfo',
            success:function(res) {
                // console.log(res);
                // val是layui的方法
                form.val('basicForm',res.data)
            }
        })
    }
    loadUserInfo()
})