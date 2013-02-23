var global = require('/ui/common/environment');
var API = global.BEINTOOAPI;
var TIMEOUT = 10000;

exports.getPlayer = function() {
	try {
		var s = Titanium.App.Properties.getObject("player", null);
		return s;
	} catch (e) {
		alert(JSON.stringify(e))
		return null;
	}
}

exports.setPlayer = function(o) {
	try {
		Titanium.App.Properties.setObject("player", (o));
	} catch (e) {
		alert(JSON.stringify(e))
	}
}

exports.getUser = function() {
	try {
		var s = Titanium.App.Properties.getObject("user", null);
		return s;
	} catch (e) {
		alert(JSON.stringify(e))
		return null;
	}
}

exports.setUser = function(o) {
	try {
		Titanium.App.Properties.setObject("user", (o));
	} catch (e) {
		alert(JSON.stringify(e))
	}
}

exports.getUserId = function() {
	var user = exports.getUser();
	if (!user)
		return null;
	return user.id;
}

exports.beintooREST = function(cmd, url, headers, callbackSuccess, callbackError, postparam) {

	var xhr_task = Ti.Network.createHTTPClient();
	xhr_task.timeout = TIMEOUT;

	xhr_task.open(cmd, url);
	xhr_task.setRequestHeader('apikey', API);
	xhr_task.setRequestHeader('sandbox', "true");
	if (headers) {
		for (var i = 0, j = headers.length; i < j; i++) {
			xhr_task.setRequestHeader(headers[i].key, headers[i].value);
			Titanium.API.info('[BEINTOO][REST] header ' + headers[i].key + " - " + headers[i].value);
		};
	}

	Titanium.API.info('[BEINTOO][REST] headers ' + API);
	Titanium.API.info('[BEINTOO][REST] headers ' + JSON.stringify(headers));

	xhr_task.onload = function() {
		Titanium.API.info('[BEINTOO][REST] onload ' + url + " [" + this.responseText + "]\n");
		if (callbackSuccess) {
			var o = JSON.parse(this.responseText);
			callbackSuccess(o);
		}

	};
	xhr_task.onerror = function(e) {
		Titanium.API.info('[BEINTOO][REST] onerror ' + url + " [" + this.responseText + "]\n");
		if (callbackError) {
			try {
				var o = JSON.parse(this.responseText);
				callbackError(o);
			} catch(err) {
				callbackError(err);
			}
		}
	};

	if (postparam === null) {
		xhr_task.send();
	} else {
		xhr_task.send(postparam);
	}

	return true;
}

exports.getLeaderBoard = function(callbackSuccess, callbackError) {

	var headers = null;
	exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/app/leaderboard?kind=STANDARD', headers, callbackSuccess, callbackError);

}

exports.getAchievement = function(callbackSuccess, callbackError) {

	var headers = null;
	exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/achievement', headers, callbackSuccess, callbackError);

}

exports.getMyAchievements = function(achievementId, callbackSuccess, callbackError) {

	var userId = exports.getUserId();
	var headers = null;
	if (userId) {
		headers = [{
			key : 'userExt',
			value : userId
		}];
	} else {
		alert("User needed");
		return;
	};

	var player = exports.getPlayer();
	var guid = null;

	if (player) {
		guid = player.guid;
		headers = [{
			key : 'guid',
			value : guid
		}];
	}

	var postParam = {
		value : 99, // put here your current score
		guid : guid
	};
	exports.beintooREST('POST', 'https://api.beintoo.com/api/rest/achievement/' + achievementId, headers, callbackSuccess, callbackError, postParam);
}

exports.playerLogin = function(callbackSuccess, callbackError) {
	// before to login, Am I a user?
	var userId = exports.getUserId();
	var headers = null;
	if (userId) {
		headers = [{
			key : 'userExt',
			value : userId
		}];
	} else {

		var player = exports.getPlayer();

		if (player) {
			var guid = player.guid;
			headers = [{
				key : 'guid',
				value : guid
			}];
		}
	}

	exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/player/login', headers, callbackSuccess, callbackError);
}

exports.playerGet = function(callbackSuccess, callbackError) {

	var player = exports.getPlayer();

	if (player) {
		var guid = player.guid;
		exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/player/byguid/' + guid, null, callbackSuccess, callbackError);
	} else {
		alert("You need a player GUID");
		return;
	}

}

exports.userGet = function(email, password, callbackSuccess, callbackError) {

	var headers = null;

	headers = [{
		key : 'email',
		value : email
	}, {
		key : 'password',
		value : password
	}]

	exports.beintooREST('GET', 'http://api.beintoo.com/api/rest/user/byemail', headers, callbackSuccess, callbackError);
}

exports.userSet = function(email, nickname, password, callbackSuccess, callbackError) {

	var player = exports.getPlayer();
	if (player == null) {
		alert("You need to have a player object");
		return;
	}

	var headers = [{
		key : 'guid',
		value : player.guid
	}];

	var postParam = {
		email : email,
		password : password,
		sendGreetingsEmail : "true",
		nickname : nickname
	};
	exports.beintooREST('POST', 'https://api.beintoo.com/api/rest/user/set/', headers, callbackSuccess, callbackError, postParam);
}

exports.submitScore = function(score, contest, callbackSuccess, callbackError) {

	var player = exports.getPlayer();
	if (player == null) {
		alert("You need to have a player object");
		return;
	}

	var headers = [];

	headers.push({
		key : 'guid',
		value : player.guid
	});
	if (contest) {
		headers.push({
			key : 'codeID',
			value : contest
		});

	}

	exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/player/submitscore/?lastScore=' + score, headers, callbackSuccess, callbackError);
}

exports.giveCoupon = function(callbackSuccess, callbackError) {

	var userId = exports.getUserId();
	var headers = null;
	if (userId) {
		headers = [{
			key : 'userExt',
			value : userId
		}];
	} else {
		alert("User needed");
		return;
	}
	exports.beintooREST('GET', 'https://api.beintoo.com/api/rest/vgood/byuser/' + userId, headers, callbackSuccess, callbackError);
}