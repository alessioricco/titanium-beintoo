function ApplicationWindow(title) {
	
	var beintoo = require("ui/common/beintoo");
	var global = require("ui/common/environment");
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	

	var data = [
	{title:"Player Login"},
	{title:"Player Info"},
	{title:"User Registration"},
	{title:"User Login"},
	{title:"Submit Score"},
	{title:"Give Coupon"},
	{title:"Leaderboard"}
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
		
	var currentScore =  Ti.App.Properties.getString('score', 0);	
		
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
				currentScore += 10;
				Ti.App.Properties.setString('score', currentScore);
				beintoo.submitScore(currentScore, null, onDefaultSuccess, onDefaultError);
			break;
			
			case 5:
				beintoo.giveCoupon(onDefaultSuccess, onDefaultError);
			break;
			
			case 6:
				beintoo.getLeaderBoard(onDefaultSuccess, onDefaultError);
			break;
			
			default:
			break;
		}
	});

	return self;
};

module.exports = ApplicationWindow;
