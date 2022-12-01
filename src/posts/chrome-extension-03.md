---
title: 你知道這是什麼嗎？ Chrome extension MV3 With Vite - Day4  Permission權限聲明
description: 在上篇文章中，我們已初步的了解 Extension 是什麼後，接著再今天內容我們要再深入一步探討關於 **Extension 的 運行環境與組成**。
permalink: posts/{{ title | slug }}/index.html
date: "2020-11-27"
tags: [Chrome Extension, Vite]
---

![https://ithelp.ithome.com.tw/upload/images/20220904/20139636oxnZn8dhjS.jpg](https://ithelp.ithome.com.tw/upload/images/20220904/20139636oxnZn8dhjS.jpg)

Hi Dai Gei Ho~ 我是Winnie ~ 此篇文章中，我們要來介紹 Permission 的相關使用。

在上篇 Manifest 常見配置文章中，我們簡單介紹了 Permission 權限，雖然是被官方文件定義為 optional，但我認爲此部分在 Extension 中非常重要的一個存在（~~所以又佔了一篇~~。

**為什麼呢？**

因為在 Extension 內訪問網站和執行大多數 Chrome API 的能力取決於其聲明的權限，如: Notifiation推播、Cookies、 Storage 等...，所以此時就需要在 manifest 清單的 Permission 欄位中聲明其意圖。


**但在使用時需注意，[官網文件](https://developer.chrome.com/docs/extensions/mv3/permission_warnings/)是這麼說的：**

> 權限應僅限於其功能所需的權限。

因為如果Extension遭受攻擊者破壞，透過限制權限可以建立Extension的功能並減少對數據的可能入侵。通過實施明確的、最小的和可選的權限來保護Extension及其使用者。

---

在 Extension 中 我們可以請求三類權限，分別是 : 

- host_permissions 
- optional_permissions  
- permission 

>  由於 host_permissions 在上篇文章已介紹過了，在這邊就先不在說明了，相關內容 **[請洽](https://ithelp.ithome.com.tw/articles/10287658)**

### permission 

Permission 權限功能內， Chrome 提供了許多當前可以使用的 [**權限清單**](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)，每個權限連結中都有對應的使用方法。

**以 在我的個人頁面 推播通知 功能 為例**:

> **功能需求分析 : 在特定頁面進行推播訊息**
> 
> 所以在 Extension 中需要知道 **目前所在頁面**  及 **進行推播訊息**。

1. 先在 Manifest 中 permission 進行``"tab"``、``"activeTab"`` 、``"notifications"``權限聲明

```
{
 "permissions":[
    "tab", 
    "activeTab", // 取得目前頁面視窗
    "notifications", // 訊息
 ]
 ... 略
}
```


接著透過 [Tab Update](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated) 事件監聽 判斷目前頁面，

```
// Background.js

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    
  if (changeInfo.status === "complete" ){
    
    if(tab.url === "https://ithelp.ithome.com.tw/users/20139636"){
        ...推播方法
    }
  }
  
});

```

接著 [**chrome.notifications API**](https://developer.chrome.com/docs/extensions/reference/notifications/)  創建一個推播訊息 給使用者

```
// Background.js
    //略...
  if (changeInfo.status === "complete" ){
    if(tab.url === "https://ithelp.ithome.com.tw/users/20139636"){
      await chrome.notifications.create(
        {
          type: 'basic',
          iconUrl: 'ithelp_gg.png',
          title: '歡迎光臨',
          message: "我是WINNIE 嘿嘿!",
          // notification 上的按鈕
          buttons: [{ title: '點我！' }],
          priority: 0,
        },(id) => { console.log(id); }
      )
    }
  }
```

最後就像下圖一樣，當進入到我的個人頁時，右上方就會觸發 Notification 的歡迎訊息

![https://ithelp.ithome.com.tw/upload/images/20220905/201396368V7F77wF2S.png](https://ithelp.ithome.com.tw/upload/images/20220905/201396368V7F77wF2S.png)

> 不確定是不是 Chrome 這邊有針對 Notifications出現的次數進行限制，導致一下有一下沒有的
> 所以預計在之後會整理下關於上方 Notification 的程式碼範例，再請各位有興趣的朋友可以玩玩看

![https://ithelp.ithome.com.tw/upload/images/20220904/201396367pkTlJVbus.jpg](https://ithelp.ithome.com.tw/upload/images/20220904/201396367pkTlJVbus.jpg)

### optional_permissions

```
{
 "optional_permissions":[
    "tab", 
    "activeTab", // 取得目前頁面視窗
    "notifications", // 訊息
 ]
 ... 略
}
```
optional_permissions 的主要功能類似於 permissions，兩者差別在於 **使用時機** ， optional_permissions 通常會在 Extension 啟動行時進行權限聲明，而不是提前聲明。

所以如果要 在運行時選用 **optional_permissions** 方式進行權限聲明的話，需透過 ``chrome.permissions``使用。


**以剛剛 通知功能為例 :**

當使用者**通知權限未開啟時**，此時就無法提前在Manifest中宣告 Notification權限，而此時只能夠宣告**optional_permissions**
且在Extension運行時 使用``optional_permissions`` ，向使用者提示詢問權限視窗，以推播功能的實現 。

![](https://developer.chrome.com/docs/extensions/reference/permissions/perms-optional.png)

以下方程式碼範例為例:

```
document.querySelector('#my-button').addEventListener('click', (event) => {
  // Permissions must be requested from inside a user gesture, like a button's

  chrome.permissions.request({
    permissions: [ "notifications"],
    origins: ['https://www.google.com/']
  }, (granted) => {
    if (granted) {
      doSomething();
    } else {
      doSomethingElse();
    }
  });
});

```

當使用者按下 ``'#my-button``Extension端會去請求 ``notifications``權限，接著``chrome.permissions``會回傳一個CallBack 檢查使用者的Extension是否具有特定權限。

以上就是關於Extension中幾個常見權限使用方式，那今天文章先到這邊了，謝謝願意花時間看此篇文章的你，如果文章有錯誤的地方，再麻煩不吝嗇的給予指教，感謝!!

> 每日有感而發: 
> 
> 今天一直有種說不出來的感覺 
> 明天要上班了
> 然後 我的文章每天都壓線快要寫不完 
> 然後 九月還有好多事情 
> 然後 我好想放空
> 但 感覺好踏實 是一種矛盾又興奮的感覺
> 
> 今天分享一首 -> [陳綺貞 - 太多](https://youtu.be/zNbNfIfOH_s)

