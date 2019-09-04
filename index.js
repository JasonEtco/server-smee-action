const express = require('express')
const axios = require('axios')
const SmeeClient = require('smee-client')
const app = express()

const PORT = 58000
const channel = process.env.GITHUB_REPOSITORY.replace('/', '-') + '-' + process.env.GITHUB_REF.replace(/\//g, '-')

const smee = new SmeeClient({
  source: `https://smee.io/${channel}`,
  target: `http://localhost:${PORT}/events`,
  logger: console
})

const events = smee.start()

events.addEventListener('message', async evt => {
  const data = JSON.parse(evt.data).body
  await axios.post('https://smee.io/hi-jeff', data)
})

app.get('/hello', (req, res) => res.send('Hello!'))
app.post('/events', async (req, res) => {
  await axios.post('https://smee.io/hi-jeff', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(PORT)