# html5 realtime validater

HTML5の機能を利用したリアルタイムバリデーションを実現するライブラリです。
デザイナフレンドリを考慮しており、javascriptを記述することなくバリデーションをフォームに付与することが可能です。

## 使い方

`bin/html5validater.js`を読み込んで利用します。


```html
<script src="html5validater.js"></script>

<form class="html5-validation-form">
  <!-- 基本的な使い方 -->
  <input type="text" class="html5-validation-input" required>

  <!-- エラーメッセージを独自のものに指定 -->
  <input
    type="text" class="html5-validation-input"
    required data-validate-msg='{"required":"required item."}'>

  <!-- 複数のバリデーションを仕掛けた場合 -->
  <input
    type="number" class="html5-validation-input"
    min="0" max="100"
    data-validate-msg='{
      "min":"inputable in over 0.",
      "max":"inputable in under 100."
    }'>

  <!-- originalのバリデーション -->
  <input
    type="password" class="html5-validation-input" id="pass">
  <input
    type="password" class="html5-validation-input" id="password_confirm"
    same="pass" data-validate-msg='{"same":"not same password."}'></form>
```
