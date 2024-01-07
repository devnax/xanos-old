import express from 'express'
const PORT = process.env.PORT || 3000
import ServerAppsProcessing from './ServerAppsProcessing'
import handleRouters from './routes'
const isDev = process.env.NODE_ENV !== 'production'
const app = express()
handleRouters(app)
ServerAppsProcessing()

let template = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Xanos</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="./client/index.tsx"></script>
        </body>
      </html>
  `

async function startServer() {
  if (isDev) {
    const { default: devServer } = await import("./devServer")
    await devServer(app, template)
  }
  app.use('*', async (_req: any, res: any) => {
    res.status(404).end("404 page not found")
  })
  app.listen(PORT, () => console.log(`server started at localhost:${PORT}`))
}

startServer()

