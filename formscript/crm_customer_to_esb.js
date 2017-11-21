// @ Name : Add Client
// @ Event: OnLoad
function Add_Client(){
	// @ SetData : Check_ESB
	var Bol_Check_ESB = Xrm.Page.getAttribute("new_gz_insertesb").getValue();
	// @ SetData : ClientID
	var Bol_Record_Id = Xrm.Page.data.entity.getId();
	// @ Step : Check Status
	if( Bol_Check_ESB != true && Bol_Record_Id != false )
	{	// @ Step : Process ClientID
		var Str_Record_Id = Bol_Record_Id.substring( 1, Bol_Record_Id.indexOf("}") );
		// @ SetData : Client_Name
		var Str_Client_Name = Xrm.Page.getAttribute("new_name").getValue();
		// @ SetData : Client_Adress
		var Str_Client_Adress = Xrm.Page.getAttribute("new_gz_dizhi").getValue();
		// @ SetData : Enterprise_Group
		var Arr_Enterprise_Group = Xrm.Page.getAttribute("new_gz_ssjt").getValue();
		var Str_Enterprise_Group = Arr_Enterprise_Group[0].name;
		var MetaData = {
			"Client_ID" : Str_Record_Id,
			"Client_Name" : Str_Client_Name,
			"Client_Adress" : Str_Client_Adress,
			"Enterprise_Group" : Str_Enterprise_Group,
		};
		var StrMetaData = JSON.stringify( MetaData );
		var ObjData = { "ClientDataPack" : StrMetaData };
		var Uri = 'https://esb2.trendzone.com.cn:8056/crm_test.php';
		jQuery.ajax({
			type : "POST",
			url : Uri,
			data : ObjData,
			dataType : "json",
			success : function( Data ){
				if( Data.Status == 1 ){
					Xrm.Page.getAttribute("new_gz_insertesb").setValue(1);
				}
			}
		});
	}
}
// @ Name : Update Client
// @ Event: OnSave
function Update_Client(){
	// @ SetData : ClientID
	var Bol_Record_Id = Xrm.Page.data.entity.getId();
	var Bol_Staus_Client_Name = Xrm.Page.getAttribute("new_name").getIsDirty();
	var Bol_Staus_Client_Adress = Xrm.Page.getAttribute("new_gz_dizhi").getIsDirty();
	var Bol_Staus_Enterprise_Group = Xrm.Page.getAttribute("new_gz_ssjt").getIsDirty();
	// @ Step : Check Status
	if( Bol_Record_Id != false )
	{	
		if( Bol_Staus_Client_Name == true || Bol_Staus_Client_Adress == true || Bol_Staus_Enterprise_Group == true )
		{	// @ Step : Process ClientID
			var Str_Record_Id = Bol_Record_Id.substring( 1, Bol_Record_Id.indexOf("}") );
			// @ SetData : Client_Name
			var Str_Client_Name = Xrm.Page.getAttribute("new_name").getValue();
			// @ SetData : Client_Adress
			var Str_Client_Adress = Xrm.Page.getAttribute("new_gz_dizhi").getValue();
			// @ SetData : Enterprise_Group
			var Arr_Enterprise_Group = Xrm.Page.getAttribute("new_gz_ssjt").getValue();
			var Str_Enterprise_Group = Arr_Enterprise_Group[0].name;
			var MetaData = {
				"Client_ID" : Str_Record_Id,
				"Client_Name" : Str_Client_Name,
				"Client_Adress" : Str_Client_Adress,
				"Enterprise_Group" : Str_Enterprise_Group,
			};
			var StrMetaData = JSON.stringify( MetaData );
			var ObjData = { "ClientDataPack" : StrMetaData };
			var Uri = 'https://esb2.trendzone.com.cn:8056/crm_test.php';
			jQuery.ajax({
				type : "POST",
				url : Uri,
				data : ObjData,
				dataType : "json",
				success : function( Data ){
					if( Data.Status == 1 ){
						Xrm.Page.getAttribute("new_gz_insertesb").setValue(1);
					}
				}
			});
		}
	}
}
