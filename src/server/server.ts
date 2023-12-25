import express from 'express'
const PORT = process.env.PORT || 3000

async function createServer() {
  const app = express()

  app.use('*', async (_req, res) => {
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
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
  })

  app.listen(PORT, () => console.log(`server started at localhost:${PORT}`))
}

createServer()