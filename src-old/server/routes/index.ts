import { Express } from 'express'
import UserRoutes from './users'

const handleRouters = (app: Express) => {
    app.use("/users", UserRoutes)
}

export default handleRouters