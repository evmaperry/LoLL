import db from './models/index.js';

// recreates database defined bin models/index
try {
  db.sequelize.sync({ force: true }).then(()=>{
    console.log('Database (re)created and synced')
  });
} catch (e: unknown) {
  console.error('SERVER ERROR: failed to sync database', e);
}
