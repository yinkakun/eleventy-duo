---
title: 你知道這是什麼嗎？ Chrome extension MV3 With Vite - Day3 Manifest 配置
description: 在上篇文章中，我們已初步的了解 Extension 是什麼後，接著再今天內容我們要再深入一步探討關於 **Extension 的 運行環境與組成**。
permalink: posts/{{ title | slug }}/index.html
date: "2020-11-27"
tags: [Chrome Extension, Vite]
---

![https://ithelp.ithome.com.tw/upload/images/20220903/20139636q4AEakEokZ.jpg](https://ithelp.ithome.com.tw/upload/images/20220903/20139636q4AEakEokZ.jpg)

Hi Dai Gei Ho~ 我是 Winnie ~

經過上篇文章我們了解到 Manifest 為 Extension 的設定檔，關於 擴充套件的相關訊息，包括名稱、敘述、版本、語言、圖片等等 都會在這進行定義，

而在此篇章節中主要會針對 Manifest.json 中常見配置的項目，來分為三個階段進行介紹 :

1. Required (必填)
2. Recommended (建議)
3. Optional (依照需求配置)

## 必填項目 Required

```
{
  "name": "My Extension",
  "manifest_version": 3,
  "version": "1.0",
}
```

### version

version 簡單來說就是 Extension 的版本，而數字限制範圍需在 0 到 65535 之間，同時非零的數字不可以 0 作為開頭，以下為例：

**正確的寫法:**

- "version": "9527"
- "version": "0.9527"
- "version": "9.52.7"

**錯誤的寫法:**

- "version": "09527"
- "version": "95270"

> ~~多謝你啊! 9527~~
>
> ![](https://i.imgur.com/5IV6kPu.png)

### manifest_version

> 如您的套件目前已經是使用 MV2，這邊提供 [Migrating to Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/)指南

manifest_version 代表 Manifest 清單的版本，雖然目前支援有 2 與 3，但在這邊還是提醒大家，如果是建立新的擴充套件還是直接從 MV3 開始，因為 Chrome 在 2023 年將會不再支援 Manifest V2 版。

![](https://wd.imgix.net/image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/OfabxpaX9YMUoyBWJWMX.png?auto=format&w=845)

## 建議項目 Recommended

```
  "description": "A plain text description",
  "icons": {...},
```

### description

description 為 Extension 的描述，文字最多不能超過 132 字。而這段描述分別會在三個地方出現 [管理擴充功能](chrome://extensions/)、[Chrome 線上應用程式商店首頁](https://chrome.google.com/webstore/category/extensions?hl=zh-TW) 及 商店中的 Extension 內頁 出現。

![](https://i.imgur.com/plpj1ez.png)

> ~~溫腥小提醒:~~
> 會建議 description 盡量不要空白，因為後續在上架商店時，在 Extension 商品頁的介紹區塊 第一格是 放置 description 文字，此時如果為空，在那個區塊不會像設定一樣為空，而是抓取上架時所寫的介紹文案，再複製一次於上方區塊。
> ![](https://i.imgur.com/cUj3AUd.png)

### icons

```
  "icons": {
    "16": "logo_16x16.png",
    "48": "logo_48x48.png",
    "128": "logo_128x128.png"
  }
```

icons 為設定 Extenison 的 logo，限制尺寸分別為 16、48、128 像素。

## Optional 項目

> 文章說到這，想先自首下
>
> 由於官方提供的配置項目真的有點多（LOL，如果只用文字單純敘述好像不會太清楚，所以在此階段，會先選幾個比較常見的項目來進行說明，其他的會再依照後續文章內容所需來進行補充介紹。
>
> 如有興趣 可以到 官方文件中 查看 [ 官方權限列表 ](https://developer.chrome.com/docs/extensions/mv3/manifest/) 。

### host_permissions

```
{
    "host_permissions": ["https://www.google.com/"]
}
```

host_permissions 主要使用時機為需在 Ｅ xtension 中 Cross-origin 請求對應 API 資料時，需在 host_permissions 裡定義 相關網域的網址 ，而常見定義網址格式如下:

1. **指定特定 host 的所有 path，可以在`/`後方加上`＊`**

```
https://ithelp.ithome.com.tw/users/＊
```

2. **指定特定連結**

```
https://ithelp.ithome.com.tw/users/20139636*
```

3. **開大絕，所有網域都可以使用**

```
 <all_urls>
```

> [更多詳細用法詳見此...](https://developer.chrome.com/docs/extensions/mv3/match_patterns/)

### permissions

```
{
    permissions": [
    "storage",
    "activeTab", //目前視窗頁
    "tabs",
    "cookies" // 網站的cookie
  ],
}
```

最後一個 Permission ，而這也是在所有 Manifest.json 清單配置中相當重要的一個項目，當 Extension 需要對瀏覽器 進行附加功能時，有可能會需要使用到 Browser 的功能(像是 Cookie、Storage)協助，此時就需透過在 Permission 中進行使用宣告，才能進行 權限的使用。

> 溫腥提醒: 在 Extension 中沒有使用到的權限記得就不要宣告，要不然之後上架送審會失敗
>
> ![](https://i.imgur.com/BEr0GEX.png)

以上就是關於 Manifest 常見配置的介紹，謝謝願意花時間看此篇文章的你，如果文章有錯誤的地方，再麻煩不吝嗇的給予指教，感謝!!

那在明天文章中，我們將從 Permission 內提供的權限 開始進行介紹，再請大家期待下。

> 每日有感而發: 今天是追星日啊~
>
> 因為此時此刻在看少時線上 Fan Meeting live，心思都在那，有點不知道要分享什麼 XD，
>
> 但我是他們粉絲 15 年了，所以最近看到 15 週年他們又再一起唱歌活動了 真的很快樂
>
> 只是比較遺憾的是『小時候他們常常開演唱會，但因為自己沒能力賺錢不能買票到現場支持，而現在長大有點能力了，要看他們再一起卻很難了』
>
> 所以今天想分享一首 -> [Girls Generation - Complete](https://youtu.be/ah0yqisJtFQ)
