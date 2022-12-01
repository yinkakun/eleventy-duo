---
title: 你知道這是什麼嗎？ Chrome extension MV3 With Vite - Day2 運行環境＆組成
description: 在上篇文章中，我們已初步的了解 Extension 是什麼後，接著再今天內容我們要再深入一步探討關於 **Extension 的 運行環境與組成**。
permalink: posts/{{ title | slug }}/index.html
date: "2020-11-27"
tags: [Chrome Extension, Vite]
---

![https://ithelp.ithome.com.tw/upload/images/20220902/20139636c1tKefMQBu.jpg](https://ithelp.ithome.com.tw/upload/images/20220902/20139636c1tKefMQBu.jpg)

Hi Dai Gei Ho~ 我是 Winnie ~

在上篇文章中，我們已初步的了解 Extension 是什麼後，接著再今天內容我們要再深入一步探討關於 **Extension 的 運行環境與組成**。

### Chrome Extension 執行環境

在一個 Chrome 擴充套件中，運行環境主要可以分為兩個部分，為完全獨立執行環境，執行階段也不相同，簡單來說可以想像成兩個獨立空間，分別是: **擴充套件端 及 瀏覽器端**。

也因為是兩個獨立環境，兩個互不影響，不能直接操作對方的相關方法，唯一溝通的方式只有透過 **事件方法來進行雙方資料溝通**。

![](https://ithelp.ithome.com.tw/upload/images/20220902/20139636ODyhDJsRsC.png)

所以由上方簡單示意圖，我們可看到多數擴充套件 Context 會在獨立環境下執行，假使需要修改網頁中的內容需要
透過 Chrome API 所提供的 Message 方法來進行資料傳遞，不能直接的操作瀏覽器中的內容。

### Chrome Extension 常見組成

![](https://i.imgur.com/kDQnrB1.jpg)
(此圖為第一篇 範例 架構圖)

透過上圖我們可以看到，在每個 擴充套件基礎常見的組成中，會分成四個部分，其中每個 Context 負責的項目都有所不同，分別是 :

- Background
- Action
- Content Script
- Manifest

> 其實還有幾個尚未提到 像是 Options、DevTool 等...但因為 Chrome API 提供的功能真的好多，所以在此篇文章中會先以擴充套件中最常使用的 Context 來進行介紹。

首先我們先來看看 擴充套件中的 背後腳本 Background。

### Background

Background 為擴充套件中的背後執行腳本，在 Manifest3 中改為 **Service Worker** 為主要核心來執行，通常**功能邏輯**、**事件監聽**及與**瀏覽器之間資料溝通** 都會定義於此，唯一不能做的是就是直接操作 網頁中的 DOM。

總結以上，其主要負責:

1. 監聽各項事件的發生
2. 與 Browser 或者 Extension UI 進行資料溝通
3. 跨網域取 API 資料

也 Background 是唯一 可以跟 Browser 進行資料的相互傳遞，也被為 **Extension 與 Browser 之間的橋樑**。

這邊如果要使用 Background，需在 Manifest.json 中註冊一個 Background.js 作為檔案的進入點

```
{
  "background": {
    "service_worker": "background.js",
  },

  //...略
 }
```

### Action

Action 為 Chrome Extension 的 UI 介面，使用的是 HTML+CSS+JS 組成，如果需要客製出屬於自己 UI 內容樣式，就像下圖一樣，左邊為自訂樣式，右邊為預設樣式

![https://ithelp.ithome.com.tw/upload/images/20220902/20139636Ye29TLLak2.jpg](https://ithelp.ithome.com.tw/upload/images/20220902/20139636Ye29TLLak2.jpg)

同樣地，如果需要自訂彈跳視窗樣式，在 Manifest.json 中的 action 欄位 定義你的 Popup 檔案 作為檔案進入點。

```
{

  "action": {
    "default_popup": "/popup/popup.html",
    "default_title": "IT_HELP 2022 DEMO WITH WINNIE",
    "default_icon": {
      "16": "logo_128x128",
      "24": "logo_128x128.png",
      "32": "logo_128x128.png"
    }
  },
  //...略
 }
```

### Content Script

相較於 Background 與 Popup 是執行於 Extension 端， Content Script 是 Extension 中為一個執行於 瀏覽器 的 Context，既然存在於 瀏覽器 中，顧名思義就是在網頁裡嵌入 JavaScript，對 DOM 做事情，甚至可以改變這些內容。

就像昨天範例一樣，我在自己的個人頁 放了一顆彩蛋 XD

![](https://i.imgur.com/U7guFb4.png)

> 文章說到這我猜你可能會想
> 咦？那是不是就可以針對別人網站做壞事惹 嘿嘿
>
> **Way Way Way~ 不對耶**

![](https://i.imgur.com/HxQ0bzw.jpg)

**為什麼？**

因為是 Content Script 是將程式碼注入到別人網站，Chrome 這邊一定會給出限制:

- 不能呼叫 多數 chrome 提供的 API (很多神奇大法都不能用 QQ)
- 不能使用 window 上提供 的 方法

## ~~看似自由的永遠最不自由啊~~

然後同樣地，Content Script 也需要在 Manifest.json 中 進行定義

而在這邊較特別的是 在 content_scripts 欄位中除了宣告相關檔案路徑之外，同時可以在 matches 欄位內加上特定的網址，就可以執行特定程式碼的注入。(這也就是為什麼那顆蛋可以放在我的頁面不會出現在別人頁面的原因)

就像下方範例一樣:

```
  "content_scripts": [
    {
      "matches": [
        "https://ithelp.ithome.com.tw/users/20139636"
      ],
      "js": [
        "/content_script/content.js"
      ],
      "css":[
        "/style/content.css"
      ]
    }
  ],
```

### Manifest.json

![](https://i.imgur.com/VPmSdnj.jpg)

不知道大家有沒有發現，在剛剛介紹的所有功能中，大家的共通點就是 最後 都需在 Manifest 中進行定義，所以在 Extension 中 主要是由一個 manifest.json 組成，而其他的功能需要與否則視 manifest.json 裡頭的設定而定， 就像一個身份證一樣，關於套件名稱、敘述、版本、Icon 及 權限功能 都會在這裡進行定義，是要執行 Extension 所有功能的進入點。

定義方式就像下方一樣，以 key/value 的方式，就可以將 Extension 資訊 寫進去。

```
{
  "name": "IT_HELP GIFT",
  "description": "IT_HELP WELCOME DEMO ",
  "version": "1",
  "manifest_version": 3,

  //...略
 }
```

> 這裡需注意: Manifest.json 是 Extension 中，初始安裝就會去掃的檔案，所以非常很重要，當你在裡面宣告的路徑一有寫錯，整個 Extension 就會 G 掉了

以上就是關於 Extension 的 運行環境 與 組成架構 的介紹，那今天文章先到這邊了，謝謝願意花時間看此篇文章的你，如果文章有錯誤的地方，再麻煩不吝嗇的給予指教，感謝!!

那在明天文章中，我們將從 Manifest 更詳細的介紹 裡面的配置，再請大家期待下。

---

> 今天分享一首 -> [Run With Me](https://youtu.be/i7TpEd_Lj78)
