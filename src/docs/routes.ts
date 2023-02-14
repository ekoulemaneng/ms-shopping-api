import { Router } from 'express'
import _routes from './routes/index'

const routes: Router = Router()

routes.use('/v1', _routes)

export default routes