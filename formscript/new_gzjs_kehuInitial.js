var status = Xrm.Page.getAttribute("statuscode").getText();
var tabstring = ['tab_shenpi','tab_mainInfo'];

function handleFormLayout(){
    if(status === "草稿"){
        Xrm.Page.ui.tabs.get(tabstring[0]).setVisible(false);
    }
}

function handleFormField(){
    var shenpiTab = Xrm.Page.ui.tabs.get(tabstring[0]);
    var mainTab = Xrm.Page.ui.tabs.get(tabstring[1]);
    if(status === "审核中"){
        var currentLoginUserId = Xrm.Page.context.getUserId();
        var currentLoginUserName = Xrm.Page.context.getUserName();
        var currentShenpiUserId = Xrm.Page.getAttribute('new_gz_shren').getValue()[0].id;
        if(currentShenpiUserId != currentLoginUserId && currentLoginUserName != '全筑'){
            //审批人与当前登陆用户不一致或者不为管理员账号，锁定tab中的所有控件
            mainTab.sections.forEach(function(section,i){
                section.controls.forEach(function(control,i){
                    var controlType = control.getControlType();
                    if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                        control.setDisabled(true);                       
                    }
                })
            })
        }
    }
    else if(status === "审核完成"){
        
        //禁用mainTab中不可修改的属性
        var uneditablefields = ['new_name','new_gz_ssjt','new_gz_sfqdkh','new_gz_qdjs','new_gz_khlyqd'];
        for(var i=0;i<uneditablefields.length;i++){
            Xrm.Page.getControl(uneditablefields[i]).setDisabled(true);
        }
        //禁用shenpiTab中的所有控件
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                    control.setDisabled(true);                       
                }
        })
        })
    }else{
        //禁用shenpiTab中的所有控件
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                    control.setDisabled(true);                       
                }
        })
        })   
    }   
    }
