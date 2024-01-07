import { Router } from 'express'
import RoleRoutes from './roles'
import User from '../../models/User'

const router: Router = Router()

router.use("/roles", RoleRoutes)

router.get('/', async (_req, res) => {
    const users = await User.findAll()

    res.json({ users })
})

router.post("/create", () => {

})

export default router