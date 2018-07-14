---
title: Spring OAuth2 SSO
date: 2018-07-13
category: Java
tags:
  - SSO
  - Spring
---

# 前记

项目需要用到 Spring OAuth2 SSO，但是还没使用过，记录下来。

项目包括：
UI 站点【常规网站】：admin-ui，admin-ui2
网关【Zuul】：gateway
RESTFulAPI 服务 +　认证中心：uac
服务发现：eureka

问题：
1. UI 站点用到的某些资源是通过 ajax 请求 uac，如果未登录认证，则无法获取，而且因为是 ajax，无法通过后端直接重定向，只能由前端识别到未登录时进行跳转登录。
2. RESTFulAPI 是由网关 gateway 进行统一管理的，所以路由到认证中心 uac 时需要记录下请求的地址，不然无法在登录后重定向回去。
3. admin-ui 登录后，再访问 admin-ui2 时应该能自动登录上，因为实现了 SSO 单点登录。

问题解决：
1. 在请求是 ajax 时，只返回 Json 和未认证的 HttpState，不要返回认证中心的登录页面，之后再由前端自己根据返回的包含认证中心字段的 Json 重定向过去。
2. 认证中心应该放在网关 gateway，这样可以更好管理用户登录认证问题，并且更易从 saveRequest 中获取请求前的地址。
3. 注解内部应该直接实现了，具体还得看运行情况。
