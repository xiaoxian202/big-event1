$(function() {
    var form = layui.form
    function loadUserInfo() {
            //获取所有文章分类
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                console.log(res);
                //基于模板引擎渲染分类列表数据
                var tags = template('cate-tpl',res)
                $('#category').html(tags)
                //更新渲染
                form.render('select')
            }
        })
    }
    loadUserInfo()
})