$(function() {
    function loadUserInfo() {
        //调用接口获取表格数据
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
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
    
    //编辑弹出层唯一标识
    var editIndex = null

    //添加分类（通过弹出层实现）
    $('#add-btn').click(function() {
        addIndex = layer.open({
            type:1,
            title:'添加文章类别',
            content:$('#tpl-add').html(),
            area:['500px', '250px']
        })
    })
    //添加分类，完成分类功能
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

    //删除事件委派
    $('body').on('click','.del',function(e) {
        //获取要删除分类的id
        var id = $(this).data('id')
        // 调用接口，根据id删除分类
        $.ajax({
            type:'get',
            url:'my/article/deletecate/'+id,
            data:{
                id:id
            },
            success:function(res) {
                if(res.status === 0) {
                    //删除分类成功，刷新列表
                    layer.msg(res.message)
                    loadUserInfo()
                }
            }
        })
        
    })

    //编辑(通过弹出层实现)
    var form = layui.form
    $('body').on('click','.edit',function(e) {
        //获取要编辑分类的id
        // dataset是原生js，获取标准自定义属性
        var id = e.target.dataset.id
        //根据id查询详细分类数据
        $.ajax({
            type:'get',
            url:'my/article/cates/'+id,
            data:{
                id:id
            },
            success:function(res) {
                //显示编辑弹出层，并且填充数据
                editIndex = layer.open({
                    type:1,
                    title:'修改文章分类',
                    content:$('#edit-tpl').html(),
                    area:['500px', '250px']
                })
                //把获取的数据填充到表单
                form.val('editForm',res.data)
            }
        })
        
    })
    //提交表单完成编辑
    $('body').on('submit','#edit-form',function(e) {
        //阻止默认行为
        e.preventDefault()
        //获取表单数据
        var fd = $(this).serialize()
        //调用接口提交数据
        $.ajax({
            type:'post',
            url:'my/article/updatecate',
            data:fd,
            success:function(res) {
                if(res.status === 0) {
                    //获取成功，提示,关闭弹出层,刷新页面
                    layer.msg(res.message)
                    layer.close(editIndex)
                    loadUserInfo()
                }
            }
        })
    })

})