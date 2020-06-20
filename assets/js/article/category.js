$(function() {
    function loadUserInfo() {
        //调用接口获取表格数据
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                // console.log(res);
                //调用template
                var result = template('list-tpl',res)
                //渲染到页面
                $('tbody').html(result)
            } 
        })
    }
    loadUserInfo()

    // 添加弹出层唯一标识
    var addIndex = null

    //添加分类（通过弹出层实现）
    $('#add-btn').click(function() {
        addIndex = layer.open({
            type:1,
            title:'添加文章类别',
            content:$('#tpl-add').html(),
            area:['500px', '250px']
        })
    })
    $('body').on('submit','#add-form',function(e) {
        //阻止默认行为
        e.preventDefault()
        //获取表单数据
        var fd = $(this).serialize()
        //调用接口获取表单数据
        $.ajax({
            type:'post',
            url:'my/article/addcates',
            data:fd,
            success:function(res) {
                //添加成功
                if(res.status === 0) {
                    //提示
                    layer.msg(res.message)
                    //关闭弹出层
                    layer.close(addIndex)
                    //刷新页面
                    loadUserInfo()
                }
            }
        })
    })

})