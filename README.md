# ionic welcome pages



## Course 2 User Authentication Login and Signup


>  关键之处逻辑： 

* 用户登陆成功后，从服务器返回的数据，整个APP内部都要去使用，而这部分数据，存到哪里？ 因为当前的组件尤其特有的生命周期，一旦组件销毁，这部分数据也会被销毁； 一般数据是放到 LocalStorage 中

* 用户登出之后，应将 LocalStorage 中的 cache 清楚

* 当LocalStorage 还在 时候，我们打开应用 直接会蹦到tabs 页面，就像我们平时打开支付宝的时候一样；

* 当我们去向服务器发送请求的时候，若token 还在有效期内，我们就可以正常去请求数据，否则若服务器返回token 过期，我们会将localStorage 清理掉，并将用户导向到登陆也 让其重新进行登陆； 这就是重新登陆 的逻辑； Since we are using token based authentication, `it protects if any unauthorized request is made and notices for a new login if required.`

### 使用provider 需要注意的地方

* 使用http 服务 要在app.module.ts中引入 HttpModule 并添加在 imports 配置数组中；

* 使用新建的provider 需要在 在app.module.ts的 provides 容器中 生命，这样就可以在其它组件中去注入

* 学会使用新的书写方式 promise工厂方式：

```js

// 新的使用方式：等于在外面 新套了一层函数，用来生成promise 
postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

```

```js
// 以往的使用方式，
  getUsers(): Observable<[User]> {
     return this.http.get(this.usersUrl)
      .map(
        res => res.json().data
      )
      .map(
        users => {
          return users.map(
            this.toUser
          );
        }
      )
      .catch( this.handleError );

  }

```




### angular form component  vs ionic form

> once the signup process successfully, we are redirectiong to the home page . but the response data we are going to use in the applications every page , so that's why I'm going to store this somewhere , because we need to carry this thing from different pages

> above is the reason we're using LocalStorage this is like application cache 

```js
signup(){
     this.authService.postData(this.userData,'signup').then((result) => {
        this.responseData = result;
        if(this.responseData.userData){
        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
        }
        else{ console.log("User already exists"); }
    }, (err) => {
      // Error log
    });

```

### logout function 

>  clear up localStorage 

```js

backToWelcome(){
   const root = this.app.getRootNav();
   root.popToRoot();
}

logout(){
     localStorage.clear();
     // 因为 清理缓存 需要花费一点时间，所以此处我们要设一个定时器；
     // 将时间到了，将要执行的内容 封装到backToWelcome函数中；
     setTimeout(() => this.backToWelcome(), 1000);
}

```

### 如果用户没有清理 localstorage , 则当welcomePage 初始化的时候，就直接导向 tabPage


```js

export class Welcome {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // if the LocalStorage has not been cleared, so we can straightly redirect to tabPage
    if (localStorage.getItem('userData')) {
      this.navCtrl.setRoot(TabsPage);
    }

  }
}

```

> 上述的几个逻辑 都是基于 localStorage 的


```js
let withRefresh = false;
let packages$: Observable<NpmPackageInfo[]>;
private searchText$ = new Subject<string>();

// 用户点击的时候，考虑到用户可能重复点击多次，造成添加几次重复的请求，这个时候想用Rxjs的debounceTime，switchMap来过滤 请求，只保留用户一次操作。


// Emits a value from the source Observable only after a particular span has passed without another source emission


// This a rate-limiting operator, because 

// Return an Observable that emits all items emitted by the source Observable that are distinct by comparision from the previous item.

public switchMap( project: function(value: T, ?index:number):ObservableInput, resultSelector: function(outerValue:T, innerValue:I, outerIndex: number, innerIndex: number):any ): Observable

switchMap(packageName =>
      this.searchService.search(packageName, this.withRefresh))


```

### ionic storage

> video : https://www.youtube.com/watch?v=E0aTpYTFhDk

when we're working and mobile applications generally we either are going to be storing data in the browser's local storage or we'll use a native SQLite database so there's a few different flavous of localstorage stuff that's stored in the browser itself but the problem with that is that it isn't necessarily stable and it has a memory limit, so browser storage is limited to five megabytes, and It can be cleaned up by operating system . so if the operating system is trying to free up some space on a device it might just wipe that storage completely . so if you're storing data in your application that you want to be there permanently at any time  we should use SQLite database.

SQLite database on the other hand is a native database , so it's outside of the browser. This means when the operating system is trying to clean up some memory and other stuff , it will delete the browser's localStorage which it sees as junk(废弃物) . the operating system is not going to deleted thing which is in a native database . 

But since SQLite database is a native database , it will be not available in the browser and so instead you need to use a plugin to access that which we can do . 

So the whole point of the storage service that ionic provides is that it's just going to automatically use the best storage that is available so if we running our application without that SQLite plugin installed , it's going to fall back to browser-based storage . If we do have the SQLite plugin installed and we have access to that native database , then it is going to use that instead .

so nomatter how your application set up we can just use the union and simple API , which hava set | get | clear method and so on . 

if We want to use the SQLite database , just make sure the related cordova plugin has been installed.

> 其它的内容，看一下官方文档就可以了；


### rxjs update

https://stackoverflow.com/questions/45464852/rxjs-observable-throw-is-not-a-function-angular4


```flow
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: parallel tasks

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1

```

'''flow     
st=>start: 开始
e=>end: 结束
op=>operation: 我的操作
cond=>condition: 确认？

st->op->cond
cond(yes)->e
cond(no)->op

'''

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

