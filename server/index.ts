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

try {
  // db.sequelize.sync({force: false})
} catch (e) {
  console.error('SERVER ERROR: failed to sync to database');
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

try {
  db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
