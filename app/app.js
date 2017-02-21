import Koa from 'koa'
import Chalk from 'chalk'
import Router from 'koa-router'

const koa  = new Koa()
const router = new Router()

koa.use(function *(next) {
  yield next

  console.log(Chalk.green(`${this.request.method} - ${this.request.url} - ${this.response.status}`))

})

router.get('/', function *() {
  this.body = 'Hello from here'
})

koa.use(router.routes())
koa.listen(3000, () => {
  console.log('This server was listen the port 3000')
})