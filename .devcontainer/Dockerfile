# -----------------------------------
# ベースイメージの指定
# -----------------------------------
FROM node:18-bullseye-slim

ENV SHELL /bin/bash

# -----------------------------------
# ディレクトリの設定
# -----------------------------------
# 作業ディレクトリの指定
WORKDIR /app

# `package.json`と`package-lock.json`をコピー
COPY package*.json ./

# 依存関係のインストール（`package-lock.json`を参照してインストールされる）
RUN if [ -f "package.json" ]; then \
        if [ -f "package-lock.json" ]; then \
            npm ci; \
        else \
            npm install; \
        fi \
    fi

# すべてのファイルを作業ディレクトリにコピー
COPY . .


# -----------------------------------
# ユーザーの設定
# -----------------------------------
# ユーザーとグループの追加
RUN addgroup --system --gid 3000 seikei-listing-v1-nodejs
RUN adduser --system --uid 3000 seikei-listing-v1

# ユーザーを変更
USER seikei-listing-v1

# -----------------------------------
# ポートの公開
EXPOSE 3000

# -----------------------------------
# 開発サーバーの起動（コンテナ作成/起動時）
CMD ["npm", "run", "dev"]