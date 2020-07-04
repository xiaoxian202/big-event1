$(function() {
    //获取表单对象
    var form = layui.form
    //分页
    var laypage = layui.laypage

    //页码:必须从1开始
    var pagenum = 1
    // 每页显示多少条数据
    var pagesize = 3

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
    function loadTableData(param) {
        $.ajax({
            type:'get',
            url:'my/article/list',
            data:param,
            success:function(res) {
                // console.log(res);
                // 把数据填充到模板
                var tags = template('table-tpl',res)
                $('.layui-table tbody').html(tags)

                //分页
                laypage.render({
                    // 当前页码
                    curr:pagenum,
                    //注意，这里的 test1 是 ID，不用加 # 号
                    elem: 'articlePage', 
                    //数据总数，从服务端得到
                    count: res.total, 
                    //每页显示的条数
                    limit:pagesize,
                    //每页显示条数列表
                    limits:[3, 9, 30, 40, 50],
                    //分页调布局效果
                    layout:['prev', 'page', 'next','skip','count','limit'],
                    //页面切换时触发的动作
                    jump: function(obj, first) {
                        //这里触发时需要修改当前页码
                        pagenum = obj.curr
                        // 切换每页显示的条数时，修改pagesize
                        pagesize = obj.limit
                        if(!first) {
                            //重新加载数据
                            loadTableData({
                                //页码:必须从1开始
                                pagenum:pagenum,
                                // 每页显示多少条数据
                                pagesize:pagesize
                            })
                        }
                    }
                })
            }
        })
    }
    loadTableData({
        //页码:必须从1开始
        pagenum:pagenum,
        // 每页显示多少条数据
        pagesize:pagesize
    })

    //搜索按钮事件绑定
    $('#search-form').submit(function(e) {
        e.preventDefault()
        //获取筛选条件的索引参数
        var fd = $(this).serializeArray()
        // console.log(fd);
        // 综合接口调用参数
        var params = {
            //页码:必须从1开始
            pagenum:pagenum,
            // 每页显示多少条数据
            pagesize:pagesize
        }
        //把筛选条件参数添加到params对象中
        fd.filter(function(item) {
            // console.log(item,123);
            // 动态向params里面添加属性
            params[item.name] = item.value
        })
        //刷新列表数据
        loadTableData(params)

    })

    //删除文章
    $('body').on('click','.del',function(e) {
        //获取删除文章的id
        var id = e.target.dataset.id
        $.ajax({
            type:'get',
            url:'my/article/delete/'+id,
            data:{
                id:id
            },
            success:function(res) {
                console.log(res)
                if(res.status === 0) {
                    layer.confirm('你确定要删除吗?', {icon: 3, title:'提示'}, function(index){
                        // 刷新页面
                        loadTableData({
                            //页码:必须从1开始
                            pagenum:pagenum,
                            // 每页显示多少条数据
                            pagesize:pagesize
                        })
                        
                        layer.close(index);
                    })
                }
            }
        })

    })

    // 编辑
    $('body').on('click','.edit',function(e) {
        location.href = 'publish.html'
        //获取点击的id
        var id = $(this).data('id')
        //调用接口 获取信息
        $.ajax({
            type:'get',
            url:'my/article/'+id,
            data:{
                id:id
            },
            success:function(res) {
                console.log(res);
                if(res.status === 0) {
                    
                }
            }
        })
        })
})