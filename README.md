# come-sou-app

コメ送のElectronアプリ

## 詳細

画面上にニコニコ動画風コメントを流すためのデスクトップアプリケーション。
コメ送サーバとWebSocket通信をして、ブロードキャストされたメッセージを表示させる。

## 使い方

- ReleaseからOSに応じたものをDownloadします。 : https://github.com/jakelizzI/come-sou-app/releases/tag/0.1.0-alpha
- zipを解凍します。
- come-sou.exe/come-sou.appを起動します。
  - 画面右下に「終了」「設定」の順でアイコンが表示されます。
  - 設定から、適切な接続先URLを入力して「テスト接続」を行って下さい。
  - 無事接続されたら、設定画面上に接続済みと表示されます。

## 展望

* 起動と同時にLambdaをKickしてコメ送サーバとコメ送画面をコンテナで起動し、アプリケーション終了とともに破棄する仕組みを作成する。

---

# come-sou-app

Electron application for come-sou.

## detail

This is a desktop application for streaming Nico Nico Douga-style comments on your screen.
It communicates with the rice sending server and WebSocket to display the broadcasted message.

## how to use

- Download an OS-specific version from Release. : https://github.com/jakelizzI/come-sou-app/releases/tag/0.1.0-alpha
- Extract the zip.
- Launch the come-sou.exe/come-sou.app.
  - The icon appears in the lower right corner of the screen, followed by "Exit" and then "Settings".
  - Go to settings and enter the appropriate URL to connect to and make a "test connection".
  - If the connection is successfully made, it will be shown on the settings screen as connected.

## outlook

Kick Lambda as soon as it starts up, and create a system that starts a rice delivery server and a rice delivery screen in a container and destroys it when the application ends.
