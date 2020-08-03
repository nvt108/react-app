const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');

const appRoot = __dirname;
var model = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});
app.post('/api/getlistemployee', async (req, res) => {
    let users = await  model.getUsers(req.body);
    res.send(users);
});
app.post('/api/updateEmployee', async (req, res) => {
    let response = await model.updateUsers(req.body);
    res.send(response);
});
app.post('/api/addEmployee', async (req, res) => {
    let response = await model.addUsers(req.body);
    res.send(response);
});
app.post('/api/deleteEmployee', async (req, res) => {
    let response = await model.deleteUser(req.body);
    res.send(response);
});
app.listen(port, () => console.log(`Listening on port ${port}`));