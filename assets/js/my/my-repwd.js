$(function() {
    //表单验证
    var form = layui.form
    form.verify({
        //原密码必须是6-8位
        oldPwd:[/^[\S]{6,8}$/,'原密码必须是6-8位'],
        //新旧密码不能一样
        newPwd:function(value) {
            //获取旧密码
            var old = $('#form input[name="oldPwd"]').val()
            if(value === old) {
                return '新旧密码不能一样'
            }
        },
        //新密码跟确认密码一样
        same:function(value) {
            var newPwd = $('#form input[name="newPwd"]').val()
            if(value !== newPwd) {
                return '两次输入的密码不一致'
            }
        }
    })
    // 提交事件
    $('#form').submit(function(e) {
        e.preventDefault()
        //获取信息
        var formData = $(this).serialize()

        //调用接口修改密码
        $.ajax({
            type:'post',
            url:'my/updatepwd',
            data:formData,
            success:function(res) {
                // console.log(res);
                if(res.status === 0) {
                    // 成功
                    layer.msg(res.message)
                }else{
                    layer.msg(res.message)
                }
            }
        })

    })
    
})