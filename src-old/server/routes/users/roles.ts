import { Router } from 'express'
const router: Router = Router()

router.get('/', async (_req, _res) => {
    _res.end("adad")
})

router.post("/create", () => {

})

export default router