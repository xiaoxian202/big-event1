$(function() {
    // 导入表单对象
    var form = layui.form
    //初始化下拉列表 一个就行
    // form.render('select')

    // //表单提交事件
    // $('#add-form').submit(function(e) {
    //     e.preventDefault()
    //     // var fd = $(this).serialize()
    //     //处理文件上传
    //     var fd = new FormData(this)
    //     $.ajax({
            
    //     })
    // })

    // 动态获取分类列表数据
    function loadListData() {
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                if(res.status === 0) {
                    //基于模板引擎渲染数据
                    var result = template('cate-tpl',res.data)
                    $('#cate-list').html(result)
                    // 处理完数据，使用layui提供的办法，更新下拉框
                    form.render('select')
                }
            }
        })
    }
    loadListData()

    //初始化富文本编译器
    initEditor()

    //处理文章封面的预览效果
    //初始化文件裁剪区
    var $image = $('#image')

    //配置项
    var options = {
        //纵横比
        aspectRatio: 400 / 280,
        //预览区
        preview: '.img-preview'
    }

    // 初始化裁剪区域
    $image.cropper(options)

    //控制图片选择
    $('#select-btn').click(function() {
        $('#cover_img').click()
    })
    //获取选中的文件
    $('#cover_img').change(function(e) {
        var file = e.target.files[0]
        //将文件转化成url地址
        var imgURL = URL.createObjectURL(file)
        //改变url路径即可
        $image.cropper('destroy')  //销毁之前的裁剪区域
            .attr('src',imgURL)    //改变url地址
            .cropper(options)     //创建新的裁剪区域
        
        //处理提交按钮的点击行为
        var state = ''
        $('.layui-btn').click(function() {
            var type = $(this).data('type')
            if(type === 'publish') {
                state = '已发布'
            }else if(type === 'temp') {
                state = '草稿'
            }
        })

        // 绑定提交按钮事件
        $('#add-form').on('submit',function(e) {
            e.preventDefault()
            //将裁剪后的图片作为输出文件
            $image.cropper('getCroppedCanvas',{ //创建一个canvas画布
                width:400,   //裁剪区域的大小
                heigth:280
            })
            // 将 Canvas 画布上的内容，转化为文件对象,生成的是二进制的图片
            //不使用base64，原因是base64的缺点是体积或放大30%，大图不建议使用 
            .toBlob(function(blob) {
                //生成一张图片，用于上传
                // 在这里应该提交表单

                // 先获取表单元素 转原生dom
                var form = $('#add-form').get(0)
                var fd = new FormData(form)
                fd.append('state',state)
                fd.append('cover_img',blob)
                // console.log(fd.get('title'));
                // console.log(fd.get('cate_id'));
                // console.log(fd.get('content'));
                // console.log(fd.get('cover_img'));
                // console.log(fd.get('state'));
                // 调用接口提交表单
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
    })

})