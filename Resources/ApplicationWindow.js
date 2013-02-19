function ApplicationWindow(title) {
	
	var beintoo = require("ui/common/beintoo");
	var global = require("ui/common/environment");
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	

	var data = [
	{id:1, title:"Player Login"},
	{id:3, title:"Player Info"},
	{id:2, title:"User Registration"},
	{id:4, title:"User Login"},
	{id:5, title:"Submit Score"},
	{id:6, title:"Give Coupon"},
	];

	var table = Ti.UI.createTableView({
	  data: data
	});
	self.add(table);

	

	function onDefaultSuccess(o){
		alert(JSON.stringify(o));
	}

	function onDefaultError(o){
		alert(JSON.stringify(o));		
	}

	function onPlayerLoginSuccess(o){
		onDefaultSuccess(o);
		beintoo.setPlayer(o);
	}

	function onUserRegistrationSuccess(o){
		onDefaultSuccess(o);
		beintoo.setUser(o);
	}
		
	//var guid = Ti.App.Properties.getString('userguid', '');
	table.addEventListener("click", function(e){
		switch(e.index) {
			case 0:
				beintoo.playerLogin(onPlayerLoginSuccess,onDefaultError);
			break;
			
			case 1:
				beintoo.playerGet(onDefaultSuccess,onDefaultError);
			break;
			
			case 2:
				beintoo.userSet( global.userEmail, global.userNickname, global.userPassword, onUserRegistrationSuccess,onDefaultError);
			break;
			
			case 3:
				beintoo.userGet(global.userEmail, global.userPassword, onDefaultSuccess, onDefaultError);
			break;

			case 4:
				beintoo.submitScore(100, null, onDefaultSuccess, onDefaultError);
			break;
			
			case 5:
				beintoo.giveCoupon(onDefaultSuccess, onDefaultError);
			break;
			
			default:
			break;
		}
	});

	return self;
};

module.exports = ApplicationWindow;
