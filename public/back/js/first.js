$(function () { 
    var currentPage=1;
    var pageSize=5;
    function render() { 

        // 模板引擎渲染分页
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success:function (info) { 
                console.log(info);
                $("tbody").html(template("tpl",info));


                // 渲染分页
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
        })
     }
     render();

    $(".btn_add").on("click", function () {
        $("#addModal").modal("show")
    })

    var $form=$("form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {

                validators: {
                    notEmpty: {
                        message: "请输入一级分类的名称"
                    }
                }

            }
        }
    })


    // 注册提交

    $form.on("success.form.bv",function (e) { 
        e.preventDefault()

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (info) { 
                if (info.success) {
                    $("#addModal").modal("hide");
                    currentPage=1;
                    render();


                    // 把模态框中的数据重置

                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
             }
        })
     })
 })