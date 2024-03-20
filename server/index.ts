import express from 'express';
import path from 'path';
import BlogRoutes from './routes/blog';

// compiled sequelize object with all models
import db from './db/models/index';

const app = express();
const port = 3000;

const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distPath));

app.use('/api/blog', BlogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

db.sequelize.sync({force: false}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
