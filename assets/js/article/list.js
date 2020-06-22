$(function() {
    //获取表单对象
    var form = layui.form

    //补零函数
    function zero(data) {
        return data>=10 ? data : '0'+data
    }

    //处理日期格式化：基于模板引擎的过滤器 
    // 注意：过滤器定义要放到数据模板前面
    template.defaults.imports.formDate = function(data) {
        //实现日期格式化：把参数data日期字符串转换为日期对象
        var d = new Date(data)
        var year = d.getFullYear()
        var month = zero(d.getMonth()+1)
        var day = zero(d.getDate())
        var hour = zero(d.getHours())
        var minute = zero(d.getMinutes())
        var second = zero(d.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    //获取所有文章分类
    function loadCateData() {
        $.ajax({
            type:'get',
            url:'my/article/cates',
            success:function(res) {
                // console.log(res);
                //基于模板引擎渲染分类列表数据
                var tags = template('cate-tpl',res)
                $('#category').html(tags)
                // $('#category').append(tags)
                //更新渲染 是layui规定
                form.render('select')
            }
        })
    }
    loadCateData()

    //获取表格列表数据
    function loadTableData() {
        $.ajax({
            type:'get',
            url:'my/article/list',
            data:{
                //页码:必须从1开始
                pagenum:1,
                // 每页显示多少条数据
                pagesize:10
            },
            success:function(res) {
                console.log(res);
                // 把数据填充到模板
                var tags = template('table-tpl',res)
                $('.layui-table tbody').html(tags)
            }
        })
    }
    loadTableData()
})