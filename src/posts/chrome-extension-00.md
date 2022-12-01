---
title: 你知道這是什麼嗎？ Chrome Extension MV3 with Vite - 前言&大綱
description: 依照第一篇都是夢想開始的地方... 所以依照慣例在今天的文章內容就先來談談 為什麼選擇『Chrome Extension 為主題 及 30 天預計的內容大綱 吧。
permalink: posts/{{ title | slug }}/index.html
date: "2020-11-26"
tags: [Chrome Extension, Vite]
---

Hi Dai Gei Ho~ 我是 Winnie ~

> 目前是一位前端工程師，目標是可以 持續在做自己喜歡的事。
> 如果對於我還有一絲好奇的捧油可以看看 這篇文章 [在 23 歲的結尾，我實現想了很久的事 (文長..)](https://hackmd.io/a1LoY8vpS9ajP-WbY3cI2g)

依照第一篇都是~~夢想開始的地方~~... 所以依照慣例在今天的文章內容就先來談談 **為什麼選擇『Chrome Extension 為主題 及 30 天預計的內容大綱** 吧。

## 關於 Chrome Extension

![](https://i.imgur.com/way0wB5.jpg)

Chrome Extension 是 **Chrome 所提供的瀏覽器擴充功能**，是基於 瀏覽器 所提供的各種功能權限**進行新功能附加**或是**改變特定網站的外觀、內容，同時又不會直接影響網頁的運行**。

但這樣說好像有點模糊？所以這邊讓我們以 **Vue DevTool Extension** 為例：

![](https://i.imgur.com/SoUeyUf.png)

在平常，想要使用 Chrome 中的 Extension，就需透過 [Chrome Web Store ](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-TW)來進行新增。

![](https://i.imgur.com/Bp1AfL6.png)

接著，從圖上方我們可以觀察到，網頁右上方的 Vue DevTool Extension，在偵測到網頁中有使用到 Vue 時，Vue Icon 會由灰色改為彩色(~~但肝不會 QQ~~)，且在點擊後下方視窗會出現對應訊息。

![](https://i.imgur.com/kRoRPG1.png)

同時打開 devTool 中的 Vue Tab 就可以看見，此時使用到 Vue 框架的網站，就會出現 Vue Component 相關內容。假使 Dom 發生了改變，我們在開發的過程中就可以更清楚地觀察到每一個 Component 資料的變化，超級方便的。

> 這是什麼原理呢？
> 其實就是針對瀏覽器中的 DevTool 做為基礎，透過 Chrome 所提供的方法來**針對 devTool 附加額外的功能擴充**。

而這樣的擴充功能其實不僅限於 Chrome 瀏覽器中，現今其他主流瀏覽器中也都有發展屬於自己的 Extension，像是 FireFox 、 Microsoft Edge 等... 而這樣的擴充功能大家稱之為 **Browser Extension**。

---

既然多數 Browser 都提供 擴充功能服務，**為什麼這次會以 Chrome Extenison 主題呢**？

#### 1.瀏覽器市占率 & 技術的通用

> Chromium 是 Google 為發展瀏覽器 Google Chrome 而釋出的自由開源軟體專案

經過統計顯示，在眾多瀏覽器中，目前還是以 Chrome 擁有 65.87%的使用率，全球瀏覽器中市佔率位居第一，在台灣的市占率也高達 60%左右，同時在 2019 年時，由於 microsoft Edge 的更新採取 **Chromium** 為核心，所以在使用 Edge 中，我也能使用在 Chrome 上架的擴充功能，等於是可以一魚兩吃的概念（~~好吃~~。

#### 2.Manfest 3 採取 Service Worker

> Service Worker 為瀏覽器與網路之間的一種網路請求代理(Proxy)，為 PWA 核心技術之一
> 指路 -> [在第六篇文章中 關於 Service Worker](https://ithelp.ithome.com.tw/articles/10288304)

在近年 Chrome 在 Extension 技術規劃的部分有大幅度的變動， Manifest 版本從 2 上更新到 3，其中 在 Manifest3 最大的變動就是 Background.js 背後事件改為**Service Worker**為核心來運行，同時許多** Chrome 提供的方法** 對於 **Promise 的支援度也更廣泛**了。

#### 3.其他因素

而最後一個原因主要是因工作上的專案需求，所以今年有大部分的時間都在研究 Extension 各項技術，然後實作在專案之中，也因為在開發時遇到了許多問題，所以想紀錄成文字，給未來可能有相同情境的人一點參考。

總結以上原因，這次我選擇了 Chrome Extension 作為主題 。

---

### 誰適合閱讀此文

由於 Chrome Extension 擴充套件主要是基於**HTML、JavaScript 及 CSS 等 Web 技術** 編寫而成的，所以很適合 對於**前端技術**有興趣的朋友可以玩玩看。(~~意思是你會寫前端，套件你也會寫啦!~~)

### 預計 30 天的內容

在這次 30 天的內容中，主要規劃還是會先以 Chrome Extension 的每個結構作為每段篇章的主題，主要介紹其運作方式及相關 API 實作介紹。同時，會搭配使用 Vite & Vue3 & Css 框架 作為開發工具，當然也會針對 所開發工具（框架)可能遇到的問題(坑坑坑）來進行介紹，再請各位期待下。

**所以目前預計會有以下篇章 :**

- 初深 Chrome Extension 篇
- Manifest 相關配置 篇
- Background 與 Service Worker 篇
- Browser 端的 Content Script 篇
- 用 Popup 裝扮你的 Extension 篇
- 使用 Vite 開發可能遇到的問題 篇
- 關於 Vue Dev tool Extnesion 篇
- 發布 你的 Extension 篇

---

### 牛刀小試一下

> [ DEMO 相見禮 ](https://github.com/wineuwu/2022ITHelp_Extension) > ~~可安心服用，不是可怕的東西~~

而在明天正式進入主題之前，我這邊準備了一個 Extension 作為見面禮，大家可以照著以下步驟在**開發人員模式中**模擬感受下

**Step 1 : 進到擴充管理頁，開啟開發人員模式**

![](https://i.imgur.com/3OMCwjy.png)

**Step 2 : 載入 paractice_day1 資料夾，下方就會出現此 Extension**

![](https://i.imgur.com/xPGoVMH.png)

**Step 3:點擊右上方工具列 拼圖，將對應 Extension 釘選**
![](https://i.imgur.com/5o5Brj2.png)

**Step 4: 點擊後黃色按鈕出現 IT HELP 2022 視窗，即為安裝成功**

![](https://i.imgur.com/5hiyXQX.png)

**Step 5: 接著就可以看到在我的個人主頁才會出現的限定彩蛋惹 萬歲!!**
![](https://i.imgur.com/CmgSw0b.png)
(至於點了彩蛋會出現什麼就不劇透了，有興趣想知道的捧油可以玩玩看 XD)

那今天文章先到這邊了，雖然還沒有正式開始，但目前覺得還不賴對嗎？

那下篇文章我們將正式進入 Extension 主題介紹，將會帶大家認識一個 Extension 內主要的基本組成及運作方式，也謝謝願意花時間看此篇文章的你，如果文章有錯誤的地方，再麻煩不吝嗇的給予指教，感謝!!

> 每日有感而發:
> 不知不覺 2022 年又剩 3/4 了，默默地轉職成為前端工程師也差不多一年半了（~~時間啊~~，而今年也是我第二次參賽了，這次除了是抱持著想把學過的東西記錄下來之外，同時也是因為去年參與這個活動後我真的收穫良多，除了對前端技術熟悉度有大幅度的提升之外，透過撰寫文章的過程可以思考更多(~~人森~~。
>
> 而在這期間很幸運的有收到不少捧油的留言跟建議，給了我很大的鼓勵，讓我真實感覺到自己好像也能幫助到人，真的非常感謝，同時也要先說聲抱歉，在去年[前端黑洞計畫 (一) : 讓 Vite 來開啟你的 Vue](https://ithelp.ithome.com.tw/users/20139636/ironman/3890)中，因為當時技術的不純熟發現有很多觀> 念敘述有點含糊、很多地方需要在重新補充改進，希望之後陸續能在修正。
>
> 喔對了，延續去年最後都有個每日小札記分享，所以這次預計也會在每篇文章的最後想紀錄下每日小雜事，然後隨喜推薦一首歌
>
> 分享一首我很喜歡的歌 -> [盧廣仲 大人中 ](https://www.youtube.com/watch?v=GjcpFsBSw2Y)
