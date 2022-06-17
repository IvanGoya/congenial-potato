const express = require('express');
const path = require('path');
const sequelize = require('./config/connections');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helper')
const routes = require('./controllers')



const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
    secret: "secret secret secret",
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 15},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

}

//middleware, when posting to server(xml or JSON), accepts only JSON data
app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {

    app.listen(PORT, () => console.log(`Now listening`))
})
