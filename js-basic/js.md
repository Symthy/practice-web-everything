# JS

## HTML + JS

- HTML/CSS/JS
- DOM、要素取得/追加
- イベント、イベントハンドラー
- jQuery
- カスタムイベント

## クラス & prototype

・ES6～

```js
class Bird {
  constructor(name) {
    this.name = name;
  }
  cry() {
    console.log(`${this.name} is cry`);
  };
  static show = (name) => {
    console.log(`${name} is Bird`);
  };
}
class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }
  fly() {
    console.log(`${this.name} is fly`);
  };
}
```

```js
function Bird(name) {
  this.name = name;
}
// method
Bird.prototype.cry = function () {
  console.log(`${this.name} is cry`);
};
// static method
Bird.explain = function (name) {
  console.log(`${name} is Bird`);
};

// 子 class
function FlyableBird(name, size) {
  Bird.call(this, name);
  this.wingSize = size;
}
FlyableBird.prototype.fly = function () {
  console.log(`${this.name} is fly`);
};
// extends
FlyableBird.prototype = new Bird()
FlyableBird.prototype.constructor = FlyableBird
// FlyableBird.prototype.__proto__ = Bird.prototype;  // ?
```

優先度：インスタンスメソッド＞プロトタイプメソッド

```js
// ES6
class Counter {
    constructor() {
        this.count = 0;
        // インスタンスメソッド
        this.increment = () => {
            this.count++;
        };
    }
}

// ES5
var Counter = function() {
  this.count = 0;
  // インスタンスメソッド
  this.increment = () => {
    this.count++;
  };
}

let c = new Counter();
// インスタンスメソッド
c.decrement = function() {
  this.count--;
}

```

プロトタイプチェーンは、最終的には `{}`（空オブジェクト）を経て`null`に到達する

```js
const swallow = new FlyableBird('燕');

> swallow.__proto__
FlyableBird {}
> swallow.__proto__.__proto__
Bird {}
> swallow.__proto__.__proto__.__proto__
{}
> swallow.__proto__.__proto__.__proto__.__proto__
null
```

## this

thisの4パターン

1. new -> 生成されたオブジェクト

2. メソッド実行 -> 所属するオブジェクト

3. 1,2以外の関数［非Strict モード］-> グローバルオブジェクト

4. 1,2以外の関数［Strict モード］-> undefined

strict モードは、グローバルオブジェクトの汚染を防止

- 4のサンプル

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
}
const p = new Person('Jon');
p.greet(); 
// TypeError: Cannot read property 'name' of undefined 
// doIt の this が undefinedのため
```

- 対処方法

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  // 1. 関数にthisを束縛 bind()
  greet1() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    const bindedDoIt = doIt.bind(this); 
    bindedDoIt();
  }
  // 2. this を指定して実行 xxx.call(this)
  greet2() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt.call(this); 
  }
  // 3. 変数にthisを移し替える
  greet3() {
    const self = this; // 3. 変数_this に値を移し替える
    const doIt = function () {
      console.log(`Hi, I'm ${self.name}`);
    };
    doIt();
  }
  // 4. アロー関数式で定義
  greet4() {
    // 2.メソッドなので,ここでのthisは所属するオブジェクトになる
    const doIt = () => { 
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
```

## Promise

### 前提

JavaScriptは非同期言語。実行完了を待たず次の処理が行われる。

```js
console.log("1番目");
setTimeout(() => {
  console.log("2番目(1秒後に実行)");
}, 1000);
console.log("3番目");

// 以下の順で出力
//  1番目
//  3番目
//  2番目(1秒後に実行)
```

### Promise基本形

```js
const promise = new Promise((resolve, reject) => {
  resolve();
  reject();
}).then(() => {
  console.log("resolved");
}).catch(() => {
  console.log("rejected");
}).finally(() => {
  console.log('Completed');
});
```

Promise は 処理順序を約束する。

```js
console.log("1番目");

new Promise((resolve) => {
  setTimeout(() => {
    console.log("2番目(1秒後に実行)");
    resolve();
  }, 1000);
}).then(() => {
  console.log("3番目");
});

// 以下の順で出力
//  1番目
//  2番目(1秒後に実行)
//  3番目
```

### Promise の状態

- pending: 未解決 (処理待ち状態。初期状態)
- resolved: 解決済み (処理成功)
- rejected: 拒否 (処理失敗)

状態に応じて以下の通りに振り分けられる

- resolved -> then()
- rejected -> catch()
