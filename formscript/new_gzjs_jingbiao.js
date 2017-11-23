
var formTabs = ["tab_reference","tab_maininfo","tab_shenpi"];
var statuscodetext = Xrm.Page.getAttribute("statuscode").getText();
var currentNode = Xrm.Page.getAttribute("new_gz_lczd_currentnode").getText();

function hideTabsAndSections(){
    var lixiangRef = Xrm.Page.getAttribute("new_gz_yylxxm").getValue();
    var isZhongbiao = Xrm.Page.getAttribute("new_gzfield_isbiddingsuccess").getText();
    //以下代码判断引用的立项是否为空，从而隐藏其他tab
    if(lixiangRef == null){
        Xrm.Page.ui.tabs.get(formTabs[1]).setVisible(false);
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(false);
    }else{
        Xrm.Page.ui.tabs.get(formTabs[1]).setVisible(true);
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(true);
    }
    //以下代码判断状态，从而用来判断是否隐藏审批tab
    if(statuscodetext === "草稿"){
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(false);
    }else{
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(true);
        //非草稿状态，隐藏引用立项tab
        Xrm.Page.ui.tabs.get(formTabs[0]).setVisible(false);

    }
    //以下代码判断是否中标，从而隐藏合同grid
    if(isZhongbiao != "是"){
        Xrm.Page.ui.tabs.get(formTabs[1]).sections.get("section_grid_hetong").setVisible(false);
    }else{
        Xrm.Page.ui.tabs.get(formTabs[1]).sections.get("section_grid_hetong").setVisible(true);
    }
}

function fieldsHandle(){
    if(currentNode === "结束"){
        Xrm.Page.getControl().forEach(function(control,i){
            var controlType = control.getControlType();
            if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                control.setDisabled(true);
            }
        })
    }
    else if(currentNode === "开始"){
        var shenpiTab = Xrm.Page.ui.tabs.get(formTabs[2]);
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                    control.setDisabled(true);
                }
            });
        })

    }else{
        var refTab = Xrm.Page.ui.tabs.get(formTabs[0]);
        var mainTab = Xrm.Page.ui.tabs.get(formTabs[1]);
        refTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                    control.setDisabled(true);
                }
            });
        })
        mainTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                    control.setDisabled(true);
                }
            });
        })
    }
    
}

function tuihuiHandle(){
    if(statuscodetext === '退回'){
        Xrm.Page.getAttribute("new_flag_withdraw").setValue(true);
    }
}