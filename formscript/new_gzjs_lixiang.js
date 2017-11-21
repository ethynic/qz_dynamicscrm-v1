var mainTab = Xrm.Page.ui.tabs.get("mainTab");
var currentNode = Xrm.Page.getAttribute("new_gzlczd_currentnode").getText();
var statusCode = Xrm.Page.getAttribute("statuscode").getText();

function hideMainTab(){
    var shidiaoRef = Xrm.Page.getAttribute("new_gz_yysdxm").getValue();
    if(shidiaoRef == null){
        mainTab.setVisible(false);
    }else{
        mainTab.setVisible(true);
    }
}

function hideInLiXiang(){
    var shenpiSection = mainTab.sections.get("section_shenpi");


    //根据流程节点和当前状态,锁定不同的section
    if(currentNode === '结束'){
        //锁定所有字段
        Xrm.Page.getControl().forEach(function(control,i){
            control.setDisabled(true);
        })
    }
    if(currentNode === '开始'){
        shenpiSection.controls.forEach(function(control,i){
            control.setDisabled(true);
        })
        if(statusCode === '草稿'){
            shenpiSection.setVisible(false);
        }else{
            shenpiSection.setVisible(true);
        }

    }
}

function hideDzjzSection(){
    var dzjzSection = mainTab.sections.get("section_dzjzinfo");
    var isDzjz = Xrm.Page.getAttribute("new_gz_kfdzjz").getValue();
    var isDzjz_pre = Xrm.Page.getAttribute("new_gz_kkfdzjz").getValue();
    if(!isDzjz && !isDzjz_pre){
        dzjzSection.setVisible(false);
    }else{
        dzjzSection.setVisible(true);
    }
}


function tuihuiHandle(){
    if(statusCode === '退回'){

        Xrm.Page.getAttribute("new_flag_withdraw").setValue(true);
    }
}
