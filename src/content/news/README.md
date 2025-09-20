---
title: "News Collection Documentation"
description: "日本語ニュース記事管理ドキュメント"
pubDate: 2025-01-15
author: "System"
tags: ["Documentation", "Astro", "News"]
draft: true
---

# News Collection (ニュースコレクション)

このディレクトリは日本語のMarkdownニュース記事を管理しています。

## ファイル構成

- `*-ja.md`: 日本語ニュース記事
- 英語やアラビア語版は不要（ユーザー要求により日本語のみ）

## 新しい記事の作成方法

```markdown
---
title: "記事タイトル"
description: "記事の簡潔な概要説明"
pubDate: 2025-01-15
author: "著者名"
tags: ["タグ1", "タグ2", "タグ3"]
---

# 記事のメイン内容

ここに記事の本文を書きます。Markdownフォーマットを使用できます。

## セクション見出し

- リスト項目
- コードブロック対応
- **太字**や*斜体*も使用可能
```

## 重要な注意事項

1. ファイル名は必ず `-ja.md` で終わらせる
2. `pubDate` は Date 形式で記述
3. `tags` は配列形式で記述
4. ファイル追加後は開発サーバーの再起動が必要
author: "著者名"
tags: ["Astro", "Web開発"]
---

# 記事の内容

ここにMarkdownでニュース投稿を書きます。
```