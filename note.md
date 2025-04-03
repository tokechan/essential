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



