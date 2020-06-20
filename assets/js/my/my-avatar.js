$(function() {
    //获取裁剪元素
    var image = $('#image')
    // 配置项
    var option = {
        // 纵横比 
        aspectRatio: 1,//正方形
        // 指定预览区域
        preview: '.img-preview'
    }
    // 创建裁剪区域
    image.cropper(option)
})