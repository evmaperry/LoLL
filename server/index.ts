import express from 'express';
import path from 'path';

const app = express()
const port = 3000

const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})