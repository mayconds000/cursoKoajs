import Koa from 'koa'
import Router from 'koa-router'

const koa  = new Koa()
const router = new Router()

router.get('/', function *() {
  this.body = 'Hello from here'
})

koa.use(router.routes())
koa.listen(3000, () => {
  console.log('This server was listen the port 3000')
})