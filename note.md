#Node.js

シングルスレッドサーバーで高速にEventを処理できる
JSが動く
誕生は2009
JAVAが対抗馬でマルチスレッドサーバー
それに対してシングススレッドサーバー
async callbackといった非同期処理を使用して
メインスレッドの処理に負担をかけずに処理できることが人気の理由
たくさんのEventqueueをEventloop（シングルスレッド）が適宜Tread pool（重たい処理をする場所）に送って
その間に別の処理を進めていくとい仕組み　効率がいいイメージ
なので、シングルスレッド部分は高速に大量処理をこなすことができ
マルチスレッドとは異なり、タイミングを合わせる処理の受け渡しの処理のタイムロスがない
これをノンブロキングIOと呼ぶ　これが革命的と人気を得る拍車をかける

npmが便利
node packege maneger
様々な拡張機能を簡単に使える
npmを通してインストールして使う
このnpmのエコシステムがNode.jsを広める要因でもある

## let & const
変数と定数のこと
定数は変えることができない
変数は好きなものに変えることができる


## What is non blocking 
input＆outputの処理をブロックしないってこと
single treadでイベントループを通してTread poolに処理を送るので重い処理を任せている間に他の処理を効率よく高速に処理できる


## モジュールのエクスポート＆インポート概念
外部からモジュールとして呼び出す場合は必ず```module.exports = { name, add };```を末尾に記述する
そして、呼び出す側で```const { name, add } = require("./helper");```というふうに呼び出す記述も必要

複数呼び出す時はJSON形式で書く必要があるので上記はそうしている



## サーバーサイドの全体像
Node.js上でははCRUDのリクエストを受けとり、データを書き込んだり、更新、削除をDBに流す
それは、APIを経由していく
流れてきたリクエストをDBがそれぞれの処理を行い終えるとレスポンスとして返す
この一連の中核にいるのがNode.js


### fs.writeFile
1.データの書き込みをスレッドプールに要求
2.書き込み完了をコールバックで受ける
3.コールバックを受けると中の関数が実行される


### 関数化（メソッド化）
ソースコードを見やすくる
視認性を良くするために関数化を行う
ステップ
1.大元のファイルで関数名を作る（今回はread,write）
2読み込むファイルでmodule.exportsに（read,write）を書いて外から読めるようにする
3.関数の処理をmodule.exportsの上の場所で定義する
4.今回はconst read =function(){}とconst write=function(){}を元々の大元からコピペしてくる
5.read writeはfsが必要な関数なのでconst fs = require("fs");を書くことを忘れないこと　忘れがち。。。
6.同じく、大元の読み方でもどこから読み込むかの指示をconst {read, write } = require("./helper");とすることを忘れないこと
7.これで完成なので、CLIでnode sample.js read & sample.js write を試す　
8.エラーが出なければ完成！エラー出るならエラー文をよく読んで解決しよう

### object & JSON
複数の情報をまとめること＝オブジェクト化する
一つずつ定義した情報
```let name = "Toke"```
```let age = 38```

複数をまとめて定義した　オブジェクト
```let person = {"name": "Toke", "age": 38}````

オブジェクトにすることで、複数の情報を一元管理できる
そして、このオブジェクトを簡単にデータベースとかに保存するために
JSONというフォーマットがある
JaveScript Object Notation
書いて字の如く、JavaScriptの記述方法

###JSONで書き出す方法
1.まず、定数か変数の中に書き出したい情報を書く
```const person = { "name": "Toke", "age" 38}```
2.そして、fs.writeFileのコードを書き換える
```fs.writeFile("hello.json", JSON.stringfy(person), function(){});```
大事なのは拡張をjsonに書き換える、JSON.stringfyを書き加える
このfs.writeFile()function(){};の部分の書き方に関してはDocsに書いてあるので知りたければそこを見る
3.stringfyは渡せされたオブジェクトをテキストに変換する関数（JSの機能）
4.CLI上でnode sample.js writeとコマンドを叩くと新しくJSONフォーマットとして描き出せる

###JSONファイルを読み込む方法（書き出すの反対）
1.fs.readFileのコードを書き換える
```fs.readFile("./hello.json","uft8", function (err, data){console.log(data);})```
大事なのは拡張子をjsonに書き換える
2.このまま、だとテキストとしてCLIで読み込むことはできる。形式はテキストになる{"name":"Mike","age":30}となる
3.console.log(data.name);とするとundefinedとして返ってくる
4.jsonからデータを読み取った時にjsonファイル自体はテキスト形式で読み取られる。それを復元した時にテキストになってしまうのでundefinedになる
5.なので、テキストからオブジェクトに復元するために```JSON.perse()```を使用する
6.perseは渡されたテキストをオブジェクトに変換する関数（JSの機能）
7.```const person = JSON.perse(data) consol.log(person.name);```と記述する
8.CLI上でnode sample.js readとコマンドを叩くとちゃんとオブジェクトから読み込みできる



## web-server構築する
適宜フォルダとファイルを作成するここではweb-serverというフォルダを作成してその中にindex.jsファイルを作成
そして、Node.jsの豊富なパッケージや外部ライブラリを使用するためにinitを行う
これは、新しいプロジェクトを初期化するということ
cd web-serverをしてルートで```npm init```を実行

`npm init`を実行すると、以下のような項目について対話形式で入力を求められます：

- **パッケージ名**（package name）
- **バージョン**（version）
- **説明**（description）
- **エントリーポイント**（entry point）
- **テストコマンド**（test command）
- **Gitリポジトリ**（git repository）
- **キーワード**（keywords）
- **作者**（author）
- **ライセンス**（license）

これらの情報を入力することで、`package.json`が作成され、プロジェクトの設定や依存関係の管理が容易になります。 s

また、`npm init -y`とコマンドに`-y`オプションを付けて実行すると、すべての項目がデフォルト値で自動的に設定され、対話なしで`package.json`が生成されます。

`npm init`を使用してプロジェクトを初期化することで、依存パッケージの管理やプロジェクトの共有がスムーズに行えるようになります。

初期化できたら、次に今回使用するExpressをインストールしていく
```npm i express```を叩くことで自動でnode_modulesが作成されてそこの中にパッケージ本体が入っていく
基本的にはnode_modulesは触ることはない
インストールできたら、index.jsにサーバーとして立ち上げるコードを書いていく
https://www.npmjs.com/package/express　を参照する
コードを記述したら、ルートで```node index.js```とするだけで簡易サーバーが立ち上がる

###イベントドリブン
イベントドリブン＝イベントが来た時に走る
リクエストが来た、イベントが走る

##コールバック関数の動き
まず、node index.jsで簡易サーバを立ち上げた際にCLI上にわかりやすく動いているのを明示する
```
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
```
ここからコールバック関数の動きを確認していく
一番下に
```console.log("最終行");```を書いて再度サーバーを再起動する
するとCLI上には
最終行
Servier is running on port 3000
という順番で出力される

なぜか？
プログラムは上から順番に処理をしていく
まず、app.getとapp.lisetenが処理されるがNode.js側が重たい処理と判断して
コールバックでスレッドプールに送る
そして、一気に下まで処理がないかを確認して最後にconsole.lo("最終行")に出会い
軽い処理なのでその場で実行する
その後に、スレッドプールで処理されたapp.listenが遅れてCLI上に結果として出てくる
app.getの処理はあくまで宣言されている処理が起きた時にのみコールバック関数の中身だけが実行される


## HTMLやJSONを返す方法
 これがres.send('Hello World' + 'Hello hiratsuka!!!');

こうでHTMLで返す```res.send("<h1>Hello World</h1>" + "<h2>Hello hiratsuka!!!</h2>");```

こうでJSONで返す
```res.send({
        name: "hiratsuka",
        age: 20,
        email: "hiratsuka@gmail.com"
    });
```

## Reuest & Response
http通信について
URLにみたいページを入力してrequestされる
そのリクエストはGETメソッド送られ
そのrequestをサーバ側が処理をして何かしらをresponseとして返す
これが一連の通信

console.log(req)を仕込んでURLを更新するとどんなリクエストがあるか見れる

## nodemon
npm i nodemonでもいいがこのプロジェクトでしか使えない
なので、グローバルにインストールすると手元のマシンの中に入れるのでどのプロジェクトでも使えるようになる
```npm install -g nodemon```
を叩くことでマシンにグローバルでインストールされる


## HTMLを読み込めるようにする方法
前提として
フロント側はPublicの中に記述されている
バックエンド側はindex.js
publicの中にあるindex.htmlを読み込ませるようにしたい
index.jsからpublic/index.htmlファイル位置を読ませたいののです
まず、index.jsがどこにいるのか？を判別させるために
```consoel.log(__dirname)```を使用して保存すると
CLI上にどこに位置するかが判明する
これを元にpublicの位置を指定していく
使用するライブラリがあり
```cosnt path = require("path")```を使用する
その後、
```app.use(express.static(patch.join(__dirname, "public")))```
を使用してpublicの中にあるhtmlファイル達を簡単に読み込めるようになる
URLで
localhost:3000がindex.htmlとなり
localhost:3000/about.htmlはabout.htmlが表示される

## フォーム情報をバックエンドに送信する方法
前提として
フロント側はPublicの中に記述されている
バックエンド側はindex.js
index.jsの中に
```app.use(express.static(patch.join(__dirname, "public")))```
があるのでpublicの中のコンテンツを参照できるようになっている

フォーム情報を送信するときはAPIとしてバックエンドと接続が必要
```
app.post("/api/v1/quiz", function (req, res){
    const answer = req.body.answer;
    res.send(answer);
});
```

これはおまじないみたいなものだけど必要
```app.use(express.urlencoded({ extended: false }));```
これを加えることで、req.bodyが使えるようになる

そして、フロント側にバックエンド側でで意義しているURLを設定する
```<form action="/api/v1/quiz" method="POST">```
actionの中にURLを入れ、メソッドを今回はPOSTでリクエストを送る
