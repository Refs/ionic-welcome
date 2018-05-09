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


### 表单一般要处理三件事情

1. http 服务
2. validtor 服务
3. 错误信息 获取与提示 
4. 错误信息展示位置，与展示样式；

* 利用Control status CSS classes 去标记输入框 结合文档通过css 去控制；

```css

.ng-invalid.ng-dirty,.ng-invalid.ng-touched {
  color:  red;
}

.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}

```
* 主要是利用类绑定去控制控件的类样式

```html
  <div ion-item >
      <ion-icon name="leaf" item-start></ion-icon>
      <ion-input  [class.nameInvalid]= 'emailControl.invalid&&emailControl.dirty' type="text" placeholder= " email" formControlName="email" ></ion-input>
  </div>

```
```ts
  get emailControl():FormControl {
    return this.form.get('email') as FormControl;
  }
```

> 但 这样做是行不通的 ionic 已经提供了默认的一套用于验证的样式：Ionic still uses an actual <input type="text"> HTML element within the component, however, with Ionic wrapping the native HTML input element it's better able to handle the user experience and interactivity.
> 即我们想设置自己的样式，首先要将其默认的样式给清理掉；

```css
/* 针对验证 ionic 会提供默认的两种样式，但针对 渲染过的 <div class="item-inner"> </div>, 若我们想去修改其它元素的样式，我们可以去利用上述的class绑定，然后再去css文件中去修改 */ 

/* 验证没有通过的时候 */
.item-md.item-input.ng-invalid.ng-touched:not(.input-has-focus):not(.item-input-has-focus) .item-inner {
    border-bottom:none;
    -webkit-box-shadow: inset 0 -1px 0 0 red;
    box-shadow: inset 0 -1px 0 0 red;
}

/* 验证通过的时候 */
.item-md.item-input.ng-valid.item-input-has-value:not(.input-has-focus):not(.item-input-has-focus) .item-inner, .item-md.item-input.ng-valid.input-has-value:not(.input-has-focus):not(.item-input-has-focus) .item-inner {
    border-bottom-color: #32db64;
    -webkit-box-shadow: inset 0 -1px 0 0 #32db64;
    box-shadow: inset 0 -1px 0 0 #32db64;
}

```


* 利用 *ng-if 去控制dom元素的显示与隐藏； 类似体格tooltip 将元素固定到input的上方，利用*ngif 去控制显示与隐藏；

> 实际上就类似与 jquery 中的增加元素与删除元素，只不过angular  有其自己的书写风格； 

```html
 <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" name="username" required
            formControlName="username">
        <div class='tip'>
          <span class="help-block" *ngIf="formErrors.username">
              {{ formErrors.username }}
          </span>
        </div>
</div>

```

```css
.tip {
  position: absolute;
  top: -30px;
  left: 10px;
  color: red;
}

```

* 利用 Toast 去显示信息的具体内容；

```ts
import { ToastController } from 'ionic-angular';

export class MyPage {
  constructor(public toastCtrl: ToastController) {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
}
```

* 具体显示错误信息的位置

```html
    <ion-list inset>

        <form [formGroup]="form" (ngSubmit)="processForm()">
          <div ion-item >
             <ion-icon name="leaf" item-start [style.color]="formErrors.email ? 'red': 'green'"></ion-icon>
             <ion-input  type="text" placeholder= " email" formControlName="email" >
             </ion-input>
          </div>

          <div ion-item>
              <ion-icon name="rose" item-start [style.color]="formErrors.password ? 'red' : 'green' "></ion-icon>
              <ion-input type="password" placeholder="password" formControlName="password" ></ion-input>
          </div>

          <button ion-button full color="primary" class="margin-top" (click)="login()" > Login </button>
        </form>

        <div *ngIf='formErrors.email' ion-item>
          {{formErrors.email}}
        </div>

        <div *ngIf='formErrors.password' ion-item>
            {{formErrors.password}}
        </div>
    </ion-list>

```

5. 什么时候去验证？是在input 失去焦点  还是再input 的值改变的时候（用户正在输入的时候）
> 答案肯定是在用户边输入，边验证，边提示；

` get valueChanges: Observable<any> : Emits an event every time the value of the control changes, in the UI or programmatically.`

```ts
buildForm() {
    // build our form
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
      username: ['', Validators.minLength(3)],
      addresses: this.fb.array([
        this.createAddress()
      ])
    });

    // watch for changes and validate
    this.form.valueChanges.subscribe(data => this.validateForm());
}

```
* 对与手机 app也可以在点击登陆的时候，进行验证；

6. 验证时针对整个表单进行验证，而不是去针对某一个formControl进行验证，这样省事高效

```ts
 validateForm() {
    for (let field in this.formErrors) {
      // clear that input field errors
      this.formErrors[field] = '';

      // grab an input field by name
      let input = this.form.get(field);

      if (input.invalid && input.dirty) {
        // figure out the type of error
        // loop over the formErrors field names
        for (let error in input.errors) {
          // assign that type of error message to a variable
          this.formErrors[field] = this.validationMessages[field][error];
        }
      }
    }
}

```

```html

<div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" name="name" required
            formControlName="name">

        <span class="help-block" *ngIf="formErrors.name">
            {{ formErrors.name }}
        </span>
    </div>

    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" name="username" required
            formControlName="username">

        <span class="help-block" *ngIf="formErrors.username">
            {{ formErrors.username }}
        </span>
</div>

```


7. 学会去调试表单根据用户输入之后的反应

```html
<p>Form value: {{ heroForm.value | json }}</p>
<p>Form status: {{ heroForm.status | json }}</p>

<p>Street value: {{ heroForm.get('address.street').value}}</p>
```

```ts
// heroForm.get('address.street') 可以再ts 中 利用 get别名进行简化
get street = () => {
  return this.heroForm.get('assdress.street')
}

// <p>Street value: {{ street.value}}</p>

```





```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

