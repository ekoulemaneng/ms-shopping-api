import { Router } from 'express'
import productRoutes from './features/products/routes'
import brandRoutes from './features/brands/routes'
import categoryRoutes from './features/categories/routes'

const routes: Router = Router()

routes.use('/products', productRoutes)
routes.use('/brands', brandRoutes)
routes.use('/categories', categoryRoutes)

export default routes