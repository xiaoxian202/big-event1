$(function() {
    //1.获取裁剪元素
    var $image = $('.cropper-box img')
    // 配置项
    var options = {
        // 纵横比 
        aspectRatio: 1,//正方形
        // 指定预览区域
        preview: '.img-preview'
    }
    // 创建裁剪区域
    $image.cropper(options)

    //2.点击上传按钮，触发文件上传
    $('#uploadImg').click(function() {
        $('#selectImg').click()
    })
    //3.获取选中的文件信息
    // change事件触发条件：表单输入域内容发生变化时触发
    $('#selectImg').change(function(e) {
        var file = e.target.files[0]
        //把文件转化成url地址
        // URL.createObjectURL的作用：根据选中的文件生成一个预览url地址
        var newImgURL = URL.createObjectURL(file)
        
        // 把地址更新到图片的src属性上即可
        $image.cropper('destroy') //销毁之前的裁剪区域
            .attr('src',newImgURL)  //更新图片路径
            .cropper(options)     //重新生成一份裁剪区域
    })
    // 4.点击确定按钮进行文件上传
    $('#okbtn').click(function() {
        //4.1创建一个Canvas画布
        var dataURL = $image.cropper('getCroppedCanvas',{
            //画布的区域大小
            width:100,
            heigth:100
        })
        //4.2将画布上的内容，转换为base64格式的字符串
        .toDataURL('image/png')
        //4.3调用接口进行图片上传
        $.ajax({
            type:'post',
            url:'my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res) {
                if(res.status===0) {
                    //上传头像成功，提示，更新头像
                    
                    //调用主页中加载用户信息的方法
                    // window:当前页面
                    // parent：表示iframe的父窗口
                    window.parent.$.loadUserInfo()
                    layer.msg(res.message)
                }
            }
            
        })
    })

})