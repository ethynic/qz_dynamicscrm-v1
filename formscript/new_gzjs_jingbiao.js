
var formTabs = ["tab_reference","tab_maininfo","tab_shenpi"];
var statuscodetext = Xrm.Page.getAttribute("statuscode").getText();
var currentNode = Xrm.Page.getAttribute("new_gz_lczd_currentnode").getText();

function hideTabsAndSections(){
    var lixiangRef = Xrm.Page.getAttribute("new_gz_yylxxm").getValue();
    if(lixiangRef == null){
        Xrm.Page.ui.tabs.get(formTabs[1]).setVisible(false);
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(false);
    }else{
        Xrm.Page.ui.tabs.get(formTabs[1]).setVisible(true);
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(true);
    }
    if(statuscodetext === "草稿"){
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(false);
    }else{
        Xrm.Page.ui.tabs.get(formTabs[2]).setVisible(true);
    }
}

function fieldsHandle(){
    if(currentNode === "结束"){
        Xrm.Page.getControl().forEach(function(control,i){
            control.setDisabled(true);
        })
    }
    else if(currentNode === "开始"){
        var shenpiTab = Xrm.Page.ui.tabs.get(formTabs[2]);
        shenpiTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                control.setDisabled(true);
            });
        })

    }else{
        var refTab = Xrm.Page.ui.tabs.get(formTabs[0]);
        var mainTab = Xrm.Page.ui.tabs.get(formTabs[1]);
        refTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                control.setDisabled(true);
            });
        })
        mainTab.sections.forEach(function(section,i){
            section.controls.forEach(function(control,i){
                control.setDisabled(true);
            });
        })
    }
    
}

function tuihuiHandle(){
    if(statuscodetext === '退回'){
        Xrm.Page.getAttribute("new_flag_withdraw").setValue(true);
    }
}