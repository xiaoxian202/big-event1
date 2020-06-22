$(function() {
    $('#add-form').submit(function(e) {
        e.preventDefault()
        // var fd = $(this).serialize()
        //处理文件上传
        var fd = new FormData(this)
        $.ajax({
            type:'post',
            url:'my/article/add',
            data:fd,
            //防止传递参数是转换成字符串
            processData:false,
            //不使用默认的请求参数类型（默认使用JSON）
            contentType:false,
            success:function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
})