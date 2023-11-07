const path = require('path');
const express = require('express');

const session = require('express-session');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const auth = require('./controllers/api/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  console.log(req.session);
  res.render('homepage', { loggedIn });
});

app.get('/about', (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  res.render('about', { loggedIn: true });
});

app.get('/contact', (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  res.render('contact', { loggedIn: true });
});

app.get('/vehicle-registration', (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  const userId = req.session.userId;
  console.log(userId);
  res.render('vehicle-registration', { loggedIn, userId });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth);

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port 3001'));
});