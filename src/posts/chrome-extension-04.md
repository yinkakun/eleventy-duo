---
title: 你知道這是什麼嗎？ Chrome extension MV3 With Vite - Day5  Background 背後腳本
description: 在此篇文章中，我們要近一步地介紹 關於Background 背後腳本事件 。
permalink: posts/{{ title | slug }}/index.html
date: "2020-11-27"
tags: [Chrome Extension, Vite]
---

![](https://i.imgur.com/aUvXD9V.jpg)

Hi Dai Gei Ho~ 我是 Winnie ~ 在此篇文章中，我們要近一步地介紹 關於 Background 背後腳本事件。

> 內心戲小劇場:
>
> **讀者:** 咦？前面不是介紹過了嗎? 尼 4 不 4 在填充文章數啊?!
>
> **W:** 不是的不是，聽我解釋下，由於在 Extension 中多數功能的運行都是每個結構相互相扣的，所以在此系列文章的前半段的觀念介紹都會再帶到前面的主題內容(~~瑟瑟發抖~~。

## 關於 Background

Background 為 Extension 中的 背後腳本事件，為長時間執行的背景事件，通常 Extension 的相關的邏輯功能都會此進行定義，而其常見的功能主要為:

- 監聽各項事件的發生
- 與 Browser 或者 Extension UI 進行資料溝通
- 跨域請求 API 資料

### 監聽各項事件的發生

![](https://i.imgur.com/bYZgPeH.png)

由上示意圖我們可以看到，Extension 中的 Background 背後腳本 同時可以監聽多項的 Event 事件。

### 跨域請求 API 資料

![](https://i.imgur.com/0WGyGLC.png)

同時，在新版 Background 腳本中，因為採取 Serviec Worker 運行及 存在於 Extension 端，所以透過 Service Worker 的 攔截代理，可以進行 **跨域的資料請求**

### 與 Browser 或者 Extension UI 進行資料溝通

**Communication With Content Script (Browser)**

![](https://i.imgur.com/OYCyZzZ.png)

由於 Background 無法直接操作 網頁中的 DOM ，所以只能透過與 Content Script 資料的傳遞來將所需內容呈現於 Browser 中。

---

**Communication With Popup (Browser)**

![](https://i.imgur.com/u0wGcmY.png)

相同地，也可以與 Extension 端的 Context 溝通，如 Popup、Option 等...

### MV2 與 MV3 的 差別

> 關於 Service Work 是什麼？請大家在等待下
>
> 我們會在下篇文章透過實作來進行詳細介紹。

相較於過去 Manifest V2 版本主要配置為 background.html 和 background.js 來執行背後事件， Manifest V3 中的 Background.js 主要由 Service Worker 來運行，同時也是 Manifest 3 更新最主要推行的特色之一。

**Manifest V2 版本 :**

過去在使用需配置一個 Background.html 及 Background.js ，如果要讓背後事件可以長期運行 需加上 `persistent: true;` 讓其持續執行

```
// Manifest V2
{
  ...
  "background": {
    "scripts": [
      "backgroundContextMenus.js",
      "backgroundOauth.js"
    ],
    "persistent": false
  },
  ...
}

```

**Manifest V3 版本 :**

在 Manifest 中需註冊一個 Service Worker 檔，如果需在 Background.js 使用`import/Export`方法 ，在下方新增一個 `type:module` 即可使用

```
// Manifest V3
{
  ...
  "background": {
    "service_worker": "background.js",
    "type": "module" //optional
  }
  ...
}
```

> 但這邊需注意:
>
> 同時也因為在 MV3 版本中 Background 改為 Service Worker 運行，原先提供的 Persistent 讓 Background 可以長期執行方法目前也無法使用了。

### 牛刀小試一下

接著，前面說了這麼多觀念，讓我們來玩玩看 Extension 中的 Background 吧。

以 第一天的彩蛋範例 為例:

> 功能需求:
>
> 因為目前 那顆蛋 ~~有點煩~~ 按了關閉，重整之後還是會出現，
>
> 所以此時我們需透過 Extension 中的 Storage 來記住，**那顆蛋最後的狀態是否被關閉**，如果被關閉在下次進入頁面時 就不在出現。

### 在安裝時，設定 Storage 的 初始值

> [chrome.runtime.onInstalled ](https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled)為 Extension 第一次被安裝時，執行事件的觸發

```
    const setStorage = (obj) => {
      chrome.storage.sync.set(obj, () => {})
    }

    chrome.runtime.onInstalled.addListener(async () => {
      console.log('Extension is Installed');
      //初始化資料
      await setStorage({
        'isClear': false,
      });
    });
```

> 此時的[Storage](https://developer.chrome.com/docs/extensions/reference/storage/) 為存在 Extension 端 的 Storage，在後續文章會再詳細介紹。(~~好多東西要說，30 天說不完啦~~)

### 接著在 頁面取得 Storage 中的 狀態，來判斷是否顯示 彩蛋

> [chrome.runtime.onInstalled ](https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled)為 Extension 第一次被安裝時，執行事件的觸發

```
//content.js

const insertEgg = async () => {
   ... 略
  isClear = await getStorage('isClear');
  if(isClear) return ;
  document.body.appendChild(egg);
}

insertEgg();
```

最終如下圖所示(轉檔就變小了)，再次進到我的個人頁面時，就不會再出現啦，~~但再也還打不開惹~~，這個問題留給大家想想 XD
![](https://i.imgur.com/EnQPPtE.gif)

> 這邊是 [今天的範例](https://github.com/wineuwu/2022ITHelp_Extension)，在 practice_background 資料夾中，歡迎有興趣的朋友可以玩玩看。

以上就是關於 Background 內容介紹，而在下篇文章中想針對 Service Worker 簡介來進行介紹。

那今天文章先到這邊了，謝謝願意花時間看此篇文章的你，如果文章有錯誤的地方，再麻煩不吝嗇的給予指教，感謝!!

> 每日有感而發:
>
> 小時候總覺做不到的就一定要做
> 所以 20 歲時，我一個人到韓國
> 拿著相機去遍每個想去的地方
> 一待就是七天
> 現在回想起來~~真的是搞西因仔~~
> 但這是老了想起來都覺得爽的回憶
>
> 今天分享一首 ->[Leave Out All The Rest ](https://www.youtube.com/watch?v=yZIummTz9mM)
