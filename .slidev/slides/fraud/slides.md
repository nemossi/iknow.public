---
title: "Hi, Slidev"
author: "nemossi"
theme: "default"
---

# 风控平台

怎么防范“薅羊毛”？反欺诈技术的学习与整理...

---

# 薅羊毛

```mermaid {scale: 0.6}
mindmap
  root((薅羊毛))
    套利方式
      评分
        刷单
        刷票
      领奖
        拉新
          新用户注册
          首单优惠
        刷任务
      套现
        黄牛抢购
        转卖套利
    个体特征
      信息获知
      规则漏洞
      编程技术
      体力劳动
        出卖个人信息
        出卖注意力
    攻击手段
      技术手段
        自动化
          爬虫
          api请求
          模拟点击
          设备伪装
          云控
        半自动
        全人工
      组织手段
        个体
        群控
          多账号
          多设备
          多IP
        众包
    产业链
      上游
        欺诈者
        自动化工具
        群控平台
        手机卡商
        账户商
      中游
        IP池
        打码平台
        接码平台
        改机工具
      下游
        开发者
        打码工人
        听码工人
```

---

# 产业链

```mermaid {scale: 0.8}
graph TD
  target[目标商家]
  fraud[羊毛党]
  acc[账户商]
  card[手机卡商]
  auto[自动化工具]
  crowd[群控平台]
  cap[打码平台]
  sms[接码平台]  
  ip-pool[IP池]
  mod[改机工具]
  dev[开发者]
  scaner[打码工人]
  recver[听码工人]

  target --> fraud
  fraud <--> card
  fraud --> acc
  fraud --> auto
  fraud --> crowd
  auto <--> cap
  cap --> scaner
  auto <--> sms
  sms --> recver
  auto --> ip-pool
  auto --> dev
  crowd --> mod
  mod --> dev
  crowd --> dev
```

---

# 产业链

- 目标商家：被欺诈者的目标，通常是电商、金融、社交等互联网平台。
- 羊毛党：非法获得平台优惠、奖励、积分等资源的欺诈者。
- 手机卡商：提供大量未实名或临时手机卡，作为接收短信验证码的基本资源。
- 账户商：收集和整合批量注册出来的虚假账号，再将这些账号打包出售给需要虚假流量的买家。
- 自动化工具：模拟键盘或触屏操作，自动执行重复性操作，如批量注册、刷单等任务。
- 群控系统：集中控制大量真机或模拟设备，实现同步自动化操作，极大提升大规模欺诈执行效率。
- 接码平台：通过自动化接口收集手机卡接收到的短信验证码，并将其转发给下游欺诈者。
- 打码平台：利用人工或机器学习技术自动破解各种验证码，帮助绕过网站安全验证。
- IP池：提供大量IP地址，用于伪装欺诈者的真实身份，规避平台风控。
- 改机工具：通过修改设备标识（如IMEI、MAC等）使同一物理设备表现为多个独立设备，规避设备级风控。
- 开发者：负责设计、开发和维护自动化工具、脚本及插件，为整个产业链提供技术支持和持续迭代。
- 听码人员：通过人工监控短信，及时获取验证码补充自动化系统，确保注册流程的顺利完成。
- 打码工人：通过人工识别验证码，为欺诈者提供验证码识别服务，帮助绕过网站安全验证。

---

# 防控步骤

```mermaid {scale: 0.6}
timeline
    title 防控步骤
    事前 : 基础安全设计
         : 业务规则设计
         : 第三方风控集成
         : 安全漏洞测试
         : 白帽众测
    事中 : 正常运营方案
         : 持续监测
         : 应急预案
    事后 : 事故复盘
         : 优化运营规则
         : 完善应急预案
```

--- 

# 防控步骤

![TBD](https://picx.zhimg.com/v2-fd8788c9706ec965b049b34b31515d19_1440w.jpg)


---

# 防控措施

```mermaid {scale: 0.7}
mindmap
  root((防控措施))
    运营防范
      限制用户群体
      限制客户端版本
      参与频率
      参与次数
    风控平台
      数据收集
        用户基础信息
        设备环境信息
        行为信息
        交易数据
        生物识别信息
      规则引擎
        画像服务
        风险评级
        实时匹配
      监控处警
        即时预警
        事故响应
    对抗手段
      验证
        Captcha（HIP）
        授权验证
          第三方授权
          手机短信验证
          邮箱验证
          生物识别验证
      审核
      封禁
        账号封禁
        设备封禁
        IP封禁
      熔断限流
```

---

# 运营防范

```mermaid {scale: 0.8}
mindmap
  root((运营防范))
    限制用户群体
      老用户
        注册账号超过n天
        有实际使用行为
      高活跃用户
        一周内登陆超过n天的用户
        最近一段时间内有超过频次的实际使用行为的用户
        最近一段时间内有购买行为的用户
      实名认证用户
        手机号、支付卡、身份证
        生物识别信息
        关联社交账号
    限制客户端版本
      限手机App用户
      限最新版本的App
    限制参与活动
      频率和总计
      额度和次数
```

---

# 总体流程

```mermaid {scale: 0.5}
flowchart LR

app <--> risk

subgraph app[应用平台]
  client[客户端]
  collector[Fraud事件收集]
  captcha[CAPTCHA验证]
  auth[授权验证]
  service[应用服务]
  client --> captcha
  client --> auth
  client --> service
  client --> collector
  service --> collector
end

subgraph risk[风控引擎]
  analysis[分析]
  model[模型]
  list[名单]
  behavior[行为]
  alert[预警]
  subgraph response[处置]
    direction TB
    熔断
    封禁
    审核
    验证
  end
  list --> analysis
  behavior --> analysis
  model --> analysis
  analysis --> alert
  alert --> response
end
```


---
layout: full
---
![来源：网易云盾风控引擎](https://dun.163.com/_nuxt/img/risk_engine_intro@2x.3e32613.png)

---

# 关联图谱

![关联图谱](https://pic2.zhimg.com/v2-a8e94477cc1d7dd51f5a6c1ab054fe0d_1440w.jpg)

> 触黑社群发现（图聚类、关联分析）
> PageRank分析
> 图嵌入模型（低维表示）

---

# 特征工程

![特征工程](https://pic1.zhimg.com/v2-7b4598626237addccf116aee2f1ec9ee_1440w.jpg)

> - 时序分析
> - 图（网络）分析

---

# 参考资料

- [深渊背后的真相之薅羊毛报告](https://image.3001.net/uploads/pdf/4aa87c46888173995c295a873c2aa682.pdf)
- 人工智能反欺诈三部曲
  - [特征工程](https://www.weiyangx.com/236330.html)
  - [指纹、风险评估模型](https://zhuanlan.zhihu.com/p/27065602)
  - 关联图谱：[上](https://zhuanlan.zhihu.com/p/38078191)、[下](https://zhuanlan.zhihu.com/p/38837595)
- 网易云盾
  - [智能风控引擎业务架构](https://dun.163.com/product/risk-engine)
  - [全链路风控解决方案深度解读](https://zhuanlan.zhihu.com/p/84747637)
- [拒绝羊毛党：运营同学必看的防薅羊毛技术完全解读](https://www.woshipm.com/operate/3150544.html)
