<?php
session_start();
$accesstoken = $_GET['accesstoken'];
function httpGet ($url)
{
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);//for testing,ignore checking CA
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$output=curl_exec($ch);
curl_close($ch);
return $output;
}
//SSO Server: 10.13.20.254:5000
$url_str =
"http://act.jiawei.xin:5000/webman/sso/SSOAccessToken.cgi?action=exchange&access_token=".$accesstoken
;
$resp = httpGet($url_str);
$json_resp = json_decode($resp, true);
if($json_resp["success"] == true){
$userid = $json_resp["data"]["user_id"];
$_SESSION["user_id"] = $userid;
//login success
} else {
//not login, redirect to frontpage.html
}
?>