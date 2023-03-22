const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
//const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const memberRouter = require('./routes/api/members');
const members = require('./Members');

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello World</h1>');
//   res.sendFile(path.join(__dirname, 'public', 'index.html' ));
// });

// handlebars middleware
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(express.json());
//handle form submissions
app.use(express.urlencoded({ extended: false }));

//logger middleware
//app.use(logger);

//server rendering
// app.get('/', (req, res) =>
//   res.render('index', {
//     title: 'Members App',
//     members: members
//   })
// );

//members api route
app.use('/api/members', memberRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server runing on ', PORT));
