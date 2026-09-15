# Coaching School SELF! ｜ 販売LP

9キャラ心理学 × セルフコーチングを学ぶ6ヶ月のオンラインスクール「SELF!」の
1ページ完結・レスポンシブLPです。バックエンド不要の静的サイトで、
Cloudflare Pages にそのまま公開できます。

---

## 📁 ファイル構成

```
selflp/
├── index.html            … ページ本体（全12セクション）
├── css/
│   └── style.css         … デザイン（ブランドカラーは冒頭の :root で管理）
├── js/
│   └── main.js           … スクロール時のふわっと表示のみ
└── assets/
    └── images/
        ├── SELF.png      … ★ヒーロー画像（ここを差し替え）
        └── README.txt    … 画像差し替えの案内
```

---

## ✏️ よく差し替える場所

| 変えたいもの | 場所 |
|---|---|
| **ヒーロー画像** | `assets/images/SELF.png` を上書き（同名でOK） |
| **申込みリンク** | `class="apply-link"` のボタン（計3か所）の `href` を変更。現在は Stores の申込みページに設定済み |
| **素材写真** | `assets/images/photo-*.jpg`、校長写真は `principal.png` |
| **ブランドカラー** | `css/style.css` 冒頭の `:root { --color-… }` |
| **本文・日程・金額** | `index.html` の各 `<section>`（コメントで区切ってあります） |

> 申込みリンクの検索キーワード：`#apply`

---

## 🎨 デザインの考え方

- 背景は白70〜80% ＋ 淡いパステル。強い原色・煽り表現は不使用。
- pink → lavender → mint の水彩／オーロラグラデーションをポイント使い。
- 文字色は真っ黒でなくブルーグレー系。「SELF!」は上品なSerif。
- 動きは fade-in・ゆっくりした浮遊・淡い光の移動のみ（`prefers-reduced-motion` 対応）。

---

## 🚀 Cloudflare Pages での公開

このフォルダは**ビルド不要の静的サイト**です。どちらかの方法で公開できます。

### A. ダッシュボードから直接アップロード（最も簡単）
1. Cloudflare ダッシュボード → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. この `selflp` フォルダの中身をまるごとアップロード
3. デプロイ完了 → 発行URLで公開

### B. Git 連携（更新を自動反映したい場合）
1. このフォルダを GitHub 等にpush
2. **Pages** → **Connect to Git** → リポジトリを選択
3. ビルド設定：
   - **Build command**：（空欄でOK）
   - **Build output directory**：`/`（ルート）
4. Save and Deploy

### 独自ドメイン
Pages プロジェクトの **Custom domains** から追加できます。

---

## 🔎 ローカルで確認する

```bash
cd selflp
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

> ※ CSS/画像を絶対パス（`/css/…`）で読み込むため、`index.html` を
> ダブルクリックで開くのではなく、上記のように簡易サーバー経由で確認してください。
