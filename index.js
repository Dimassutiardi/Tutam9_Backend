const accountRoute = require('./src/routes/account.route.js');
const noteRoute = require('./src/routes/note.route.js');

const express = require('express');
const cors = require('cors');

const corsSetting = require('./src/configs/cors.config.js');
const dbSetting = require('./src/configs/db.config.js');

require('dotenv').config();

function startServer() {
  dbSetting.connect();
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(cors(corsSetting));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/account', accountRoute);
  app.use('/note', noteRoute);

  app.listen(PORT, () => {
    console.log(`Server berhasil running: ${PORT}!`);
  });

  return app;
}

startServer();