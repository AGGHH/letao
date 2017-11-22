$(function () { 
    var currentPage=1;
    var pageSize=5;

    // 分页渲染数据
    function render() {

        //发送ajax请求，获取数据
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                //把数据渲染到tbody中
                var html = template("tpl", info);
                $("tbody").html(html);

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / pageSize),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });


            }
        });

    }
     render();



     $("tbody").on("click",".btn",function () { 
         $("#usertModal").modal("show");

         var id=$(this).parent().data("id")
         var isDelete=$(this).hasClass("btn-danger")?0:1

         $(".btn_confirm").off().on("click",function () { 
             $.ajax({
                 type:"post",
                 url:"/user/updateUser",
                 data:{
                     id:id,
                     isDelete:isDelete
                 },
                 success:function (info) { 
                     if (info.success) {
                         $("#usertModal").modal("hide");

                         render();
                     }
                  }
             })
          })
      })
 })