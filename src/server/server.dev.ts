import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

async function createServer() {
  const app = express()
  const vite = await createViteServer({
    root: path.resolve(__dirname, "../"),
    plugins: [react()],
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = `
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Xanos</title>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script type="module" src="client/main.tsx"></script>
                  </body>
                </html>
            `
      template = await vite.transformIndexHtml(url, template)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e: any) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(PORT, () => console.log(`server started at localhost:${PORT}`))
}

createServer()