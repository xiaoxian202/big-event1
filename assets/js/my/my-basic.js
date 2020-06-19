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

    // 控制表单提交
    $('#form').submit(function(e) {
        e.preventDefault()
        //获取表单数据 是一个数组
        var fd = $(this).serializeArray()
        // 遍历数组，筛选name: "username"之外的数
        fd = fd.filter(function(val) {
            return val.name !== 'username'
        })
        // console.log(fd);
        //调用接口提交用户信息
        $.ajax({
            type:'post',
            url:'my/userinfo',
            data:fd,
            success:function(res) {
                if(res.status === 0) {
                    //成功获取数据
                    layer.msg(res.message)
                }
            }
        })
    })
})