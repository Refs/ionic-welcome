# ionic welcome pages



## Course 2 User Authentication Login and Signup

>  关键之处有两点： 

* 用户登陆成功后，从服务器返回的数据，整个APP内部都要去使用，而这部分数据，存到哪里？ 因为当前的组件尤其特有的生命周期，一旦组件销毁，这部分数据也会被销毁； 一般数据是放到 LocalStorage 中

* 用户登出之后，应将 LocalStorage 中的 cache 清楚

* 当LocalStorage 还在 时候，我们打开应用 直接会蹦到tabs 页面，就像我们平时打开支付宝的时候一样；

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





