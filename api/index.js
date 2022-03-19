const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getTemperamentsFromAPI = require('./src/controller/getTemperaments');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    //ejecuto el envío de los temperamentos a la DB
    getTemperamentsFromAPI();
  });
});
