const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./controllers');
const cors = require("cors");

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);




const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Extremely secret secret',
  cookie: {
    maxAge: 600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'client/public')));
  
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});