# wJax

我自己封装的 ajax 库，支持`promise`。支持链式调用。

`./out/index.html`是文档说明。

**tip:** wJax.js && wjax_mini.js 都可以单独引入，不影响，wJax.js 是为了使用 jsdoc 而拆分的

## 语法：

> `tip`:以下是使用`wjax_mini.js`的语法，使用`wjax.js`的语法大致不变，只需要调用全局的wjax对象就行。
>
> ```js
> //使用构造函数的形式创建对象。
> new wJax({
>   methor:methor,
>   url:url,
>   data:data,
>   sync:[sync],
>   timeout:[timeout=100ms]
> }).sucsess(res=>{
>   console.log(res);
> }).catch(err=>{
>   console.log(err);
> });
> //类似jquery的ajax方法
> new wJax({
>   methor:methor,
>   url:url,
>   data:data,
>   sync:[sync],
>   timeout:[timeout=100ms],
>   sucsess(res=>{
>    console.log(res);        
>    }),
>   Catch(err=>{
> 	  console.log(err);
> 	})
> })
> 
> //使用send方法
> let wjax =new wJax();
> wjax. send({
>   methor:methor,
>   url:url,
>   data:data,
>   sync:[sync],
>   timeout:[timeout=100ms]
> }).sucsess(res=>{
>   console.log(res);
> }).catch(err=>{
>   console.log(err);
> });
> 
> //使用类似promise的语法
> let wjax =new wJax();
> wjax. send({
>   methor:methor,
>   url:url,
>   data:data,
>   sync:[sync],
>   timeout:[timeout=100ms]
> }).then(res=>{
>   console.log(res);
> },error=>{
> 	console.log(error);
> }).catch(err=>{
>   console.log(err);
> });
> 
> //使用async/await
> 
> (async ()=>{
>   let res = await new wJax({
>       methor:methor,
>       url:url,
>       data:data,
>       sync:[sync],
>       timeout:[timeout=100ms]
>     });
> })()
> ```
