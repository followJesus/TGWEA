<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
<title>系统管理员角色列表</title> 
<%@ include file="/admin/common/admin-sc.jsp"%>
<script src="${ctx}/admin/js/layout.js" type="text/javascript"></script>
</head>  
<body>
    <div id="main">
       <div position="top">
        <%@ include file="/admin/top.jsp" %>
        </div>
        <div id="maincontent" position="center" title=" ">
                <div id="beautiful">
                <div id="etitle" style="margin-bottom:3rem;">
               <div id="whereimg"><img src="../images/adminBP/list_roles.webp"/></div>
               <div id="whatfont">角色管理</div>
                <div class="both"></div>
               </div>
            <div id="addrolebar" style="overflow:hidden;width:610px" align="right">
                <a href="${ctx}/admin/wEditRole.action" title="添加角色"><img src="../images/adminBP/add_admin.webp"/></a>
            </div>
            <br/>
            <div id="maingrid">
            </div>
        </div>
        </div>
         <div position="left" title="主菜单">
            <%@ include file="/admin/left.jsp" %>
        </div>
    </div>
    <br />
    <div style="display:none;">
    </div>
</body>
<script type="text/javascript">
    var manager, g;
    $(function() {
        $.expandAccordionMenu("authmenu");
        f_showRolesData();

    })

    function f_showRolesData() {

        g = manager = $("#maingrid").ligerGrid({
            columns: [{
                display: '角色名',
                name: 'roleName',
                isSort: false,
                width: 150
            },
            {
                display: '备注',
                name: 'remark',
                isSort: false,
                align: 'left',
                width: 200
            },
            {
                display: '创建日期',
                name: 'createDate',
                isSort: false,
                width: 150
            },
            {
                display: '操作',
                isSort: false,
                width: 100,
                render: function(rowdata, rowindex, value) {
                    var h = "";
                    h += "<a href='${ctx}/admin/wEditRole.action?roleId=" + rowdata.roleId + "'>修改</a> ";
                    h += "<a href='javascript:f_deleteRole(" + rowindex + ")'>删除</a> ";
                   
                    return h;

                }
            }],
            url: "${ctx}/admin/wListRolesData.action",
            method: "post",
            usePager: false,
            async: false,
            enabledSort: true,
            enabledEdit: true,
            dataAction: "server",
            clickToEdit: false,
            isScroll: false,
            frozen: false,
            showTitle: false,
            width: 610,
            columnWidth: 120,
            allowHideColumn: false

        });

    }

    function f_deleteRole(rowid) {
        var role = manager.getRow(rowid);
        $.ligerDialog.confirm('确定要删除么?',
        function(yes) {
            if (yes) {

                j4tg.ajaxPost("${ctx}/admin/wDelRole.action", "json", false, {
                    "roleId": role.roleId
                },
                function(data) {
                    if (data.status == "S") {
                        $.ligerDialog.success('删除成功');
                        $.reloadGridServerData(g, {});
                    }
                },
                function(data) {

				});

            }
        });


    }
</script>
</html>