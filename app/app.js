import Koa from 'koa'
import Chalk from 'chalk'
import Router from 'koa-router'
import Body from 'koa-body'
import Render from 'koa-swig'
import Static from 'koa-static'
import path from 'path'
const koa  = new Koa()
const router = new Router({
  prefix: '/hello'
})

koa.context.render = Render({
  root: path.join(__dirname, 'views'),
  autoescape: true, 
  cache: 'memory',
  ext: 'html'
})

koa.use(Static(path.join(__dirname, 'public')))

koa.use(function *(next) {
  yield next

  console.log(Chalk.green(`${this.request.method} - ${this.request.url} - ${this.response.status}`))

})

router
  .get('/:name', function *() {
    yield this.render('index', {
      name: this.params.name
    })
  })
  // .get('/:name', function *() {
  //   // console.log(this.request) //ctxt koa
  //   // console.log(this.req) // ctxt node
    
  //   console.log(this.params) //ctxt koa
  //   this.body = `Hello ${this.params.name}`
  //   //Observe que o response tem que vir apos ter formado alguma respota com o this.body
  //   console.log(this.response) // ctxt koa
  // })
  .post('main', '/hello', function *(next) {
    this.body = 'This is my main router'
    yield next
  }, function *(next) {
    console.log('my other function')
  })
  .put('main_put', '/put', function *() {
    this.body = 'this is my put router'
  })

koa.use(router.routes())
koa.use(router.allowedMethods())
koa.listen(3000, () => {
  console.log('This server was listen the port 3000')
})