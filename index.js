const express = require('express')
const SmeeClient = require('smee-client')
const app = express()

const PORT = 58000
const channel = process.env.GITHUB_REPOSITORY.replace('/', '-') + '-' + process.env.GITHUB_REF

const smee = new SmeeClient({
  source: `https://smee.io/${channel}`,
  target: `http://localhost:${PORT}/events`,
  logger: console
})

const events = smee.start()

// events.addEventListener('message', evt => {
//   console.log(evt)
// })

app.get('/hello', (req, res) => res.send('Hello!'))
app.post('/events', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(PORT)