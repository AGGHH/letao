// 进度显示功能
// 不显示转圈效果
NProgress.configure({
    showSpinner:false
})

// 注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () { 
    NProgress.start();
 });
 $(document).ajaxStop(function () { 
     setTimeout(function (){
         NProgress.done();
     }, 500);
  })

//   非登录页面就跳转登陆

if (location.href.indexOf("login.html")== -1) {
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) { 
            if(data.error===400){
                location.href="login.html";
            }
         }
    })
}



// 二级菜单分类显示隐藏

$(".child").prev().on("click", function () {
    $(this).next().slideToggle();
});

$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
});



$(".icon_logout").on("click", function () {
    $("#logoutModal").modal("show");


    //给退出按钮注册事件, off:解绑所有的事件
    $(".btn_logout").off().on("click", function () {
        //console.log("Hehe");
        //发送ajax请求，退出系统
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function (data) {
                if (data.success) {
                    //退出成功
                    location.href = "login.html";
                }
            }
        });
    });
});

