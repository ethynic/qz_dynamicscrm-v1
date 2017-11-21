var status = Xrm.Page.getAttribute("statuscode").getText();
var tabstring = ['tab_shenpi','tab_mainInfo'];

function handleFormLayout(){
    if(status === "草稿"){
        Xrm.Page.ui.tabs.get(tabstring[0]).setVisible(false);
        //JsCommon.hideTab(tab_shenpi);
    }
}

function handleFormField(){

    if(status === "审核中"){
        var shenpiTab = Xrm.Page.ui.tabs.get(tabstring[0]);
        var mainTab = Xrm.Page.ui.tabs.get(tabstring[1]);
        var currentLoginUserId = Xrm.Page.context.getUserId();
        var currentShenpiUserId = Xrm.Page.getAttribute('new_gz_shren').getValue()[0].id;
        if(currentShenpiUserId != currentLoginUserId){
            //审批人与当前登陆用户不一致，锁定tab中的所有控件
            mainTab.sections.forEach(function(section,i){
                section.controls.forEach(function(control,i){
                    control.setDisable(true);
                })
            })
        }
    }
    else if(status === "审核完成"){
        //禁用mainTab中不可修改的属性
        var uneditablefields = ['new_name','new_gz_ssjt','new_gz_sfqdkh','new_gz_qdjs','new_gz_khlyqd'];
        for(var i=0;i<uneditablefields.length;i++){
            Xrm.Page.getControl(uneditablefields[i]).setDisable(true);
        }
        //禁用shenpiTab中的所有控件
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                control.setDisable(true);
            })
        })
    }else{
        //禁用shenpiTab中的所有控件
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                control.setDisable(true);
            })
        })   
    }   
    }
