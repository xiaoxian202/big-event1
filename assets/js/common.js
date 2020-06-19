/**
 通用的接口调用设置
 */
var baseURL = 'http://ajax.frontend.itheima.net/'
// option形参是jQuery请求方法的配置信息
$.ajaxPrefilter(function(option) {
    // 进度条
    option.beforeSend = function() {
        window.NProgress && window.NProgress.start()
    }
    //1.配置通用的URL地址
    option.url = baseURL + option.url
    //2.设置接口的请求头信息
    // 所有包含my的请求路径，都需要进行权限验证（需要先登录）
    if(option.url.lastIndexOf('/my/') !== -1) {
        // headers默认不存在，所以需要设置对象
        option.headers = {
            Authorization:localStorage.getItem('mytoken')
        }
    }
    // 3.处理通常异常情况
    // 服务器响应结束时触发
    option.complete = function(res) {
        window.NProgress && window.NProgress.done()
        // console.log(res);
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //把无效的token清除
            localStorage.removeItem('mytoken')

            //身份认证失败，跳转到登录页
            location.href = 'login.html'
        } 
    }
})