const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const imageRoutes = require('./routes/images')

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/projects', projectRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)





module.exports = app;