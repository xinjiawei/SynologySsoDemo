//SYNOSSO Javascript SDK don't depend on jQuery!
//SSO Server: https://act.jiawei.xin:5001
//SSO Client: https://test.jiawei.xin/demo.html
$(function() {
	SYNOSSO.init({
		oauthserver_url: 'https://act.jiawei.xin:5004',
		app_id: '65d4d57b4597be539b372a3ae8b4d385',
		redirect_uri: 'https://test.jiawei.xin/SynologySsoDemo/demo.html',
		//redirect URI have to be the same as the one registered in SSO server, and should be a plain text html file
		callback: authCallback,
		//domain_name:'https://act.jiawei.xin:5001',
		//ldap_baseDN: 'dc=LDAPadmin'
	})

	function authCallback(response) {
		console.log("client side");
		if ('not_login' === response.status) { //user not login
			console.log(response.status);
		} else if ('login' === response.status) {
			$.ajax({
				url: 'login_backend.php',
				cache: false,
				type: 'GET',
				data: {
					accesstoken: response.access_token
				},
				error: function(xhr) {
					alert("ajax error1");
					//deal with errors
				},
				success: function(response) {
					//alert("登录成功");
					//deal with success
				}
			});
			console.log(response.status);
			console.log(response.access_token);
			$("#login-button").remove();
			alt.style.display = 'block';
			//alert("access token: "+ response.access_token);
			//000000000000000000000000000000000000000000000000000000
			$.ajax({
				url: "https://bird.ioliu.cn/v2",
				type: "GET",
				//send it through get method
				cache: false,
				//async : false,
				data: {
					url: 'https://act.jiawei.xin:5004/webman/sso/SSOAccessToken.cgi?action=exchange',
					access_token: response.access_token,
					app_id: '65d4d57b4597be539b372a3ae8b4d385'
				},
				//dataType : "jsonp",
				//jsonp : "jsonpCallback",
				success: function(data) {
					//Do Something
					var id = null;
					var nickname = null;
					var info = JSON.parse(data);
					var id = info.data.user_id;
					var nickname = info.data.user_name;
					//console.log(data);
					//console.log(info);
					console.log(id);
					console.log(nickname);
					document.getElementById("userid").innerHTML = id;
					document.getElementById("username").innerHTML = nickname;
				},
				error: function(xhr) {
					//Do Something to handle error
					alert("ajax error2");
				}
			});
			//00000000000000000000000000000000000000000000000000000000
		} else {
			alert("加载登录模块失败");
			//deal with errors;
		}
	}
	var login_button = document.getElementById("login-button");
	var out_button = document.getElementById("out-button");
	login_button.addEventListener('click', SYNOSSO.login);
	out_button.addEventListener('click', SYNOSSO.logout);
	out_button.addEventListener('click', reflush);

	function reflush() {
		window.location.reload();
	}
})