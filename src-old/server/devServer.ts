import path from 'path'
import { Express } from 'express'
import { createServer as createViteServer } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer(app: Express, template: string) {
    const vite = await createViteServer({
        root: path.resolve(__dirname, "../"),
        plugins: [react()],
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares)
    app.get('/', async (req: any, res: any, next: any) => {
        const url = req.originalUrl
        try {
            template = await vite.transformIndexHtml(url, template)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
        } catch (e: any) {
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })
}


export default createServer