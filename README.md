## 群晖sso 单点登录开发

## 在我的博客里有带图片指导的设置步骤
# https://blog.jiawei.xin/?p=266


>群晖的开发文档有点坑。要想在DSM（群晖操作系统）设置单点登录服务器，必须开启机器的LDAP。这点在开发文档中完全没提到…不过想想，谁会用这垃圾玩意呢？

开始之前，你需要一台群晖，黑的也行。

- 第一步，在套件中心安装SSO服务器


- 第二步，在套件中心安装LDAP


- 第三步，设置LDAP服务器
   作为LDAP主服务器


- 第四步，在LDAP Server配置sso用户账户，密码，以及权限。当然，如果在SSO服务器中开启“允许本地账户登录”就可以忽略这一步，否则SSO用户账户是需要单独设置的。
添加账户
设置账户详情
设置账户分组


- 第五步，在控制面板-域/LDAP，开启LDAP。开启前需要到LDAP SERVER的用户账号先修改admin的密码，要用到。这个admin和控制面板的admin是不一样的。
开启DSM的LADP
设置LADP用户账号（在旧版本群晖中，此账号与DSM分离）


- 第六步，回到SSO服务器，设置登录页面
sso常规设置


- 第七步，站点编写源码
群晖sso登录只能支持JavaScript。

jsDemo
在js中需要修改认证服务器地址（oauthserver_url），app_id，回调地址（redirect_uri）。app_id需要和SSO服务器中的设置保持一致。


ssoServer，设置重定向url和appid