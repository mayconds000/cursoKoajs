import Koa from 'koa'
import Chalk from 'chalk'
import Router from 'koa-router'

const koa  = new Koa()
const router = new Router({
  prefix: '/hello'
})

koa.use(function *(next) {
  yield next

  console.log(Chalk.green(`${this.request.method} - ${this.request.url} - ${this.response.status}`))

})

router
  .get('/', function *() {
    this.body = 'Hello from here'
  })
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