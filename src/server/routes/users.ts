import { Router } from 'express'
import User from '../models/User'
export const router: Router = Router()

router.get("/", async (_req, res) => {
    res.status(200).json({
        data: await User.findAll({
            where: {
                id: 1
            }
        })
    })
})

router.post("/", () => {

})

router.put("/", () => {

})

router.delete("/", () => {

})