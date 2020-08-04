const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
var mv = require('mv');
const appRoot = __dirname;
var model = require('./database');
var cors = require('cors');
app.use(cors());

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
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if(files.file !== undefined && files.file.name != ''){
            let newpath = path.join(__dirname, '../') + 'public/upload/' + files.file.name;
            let oldpath = files.file.path;
            fields['img'] = '/upload/' + files.file.name;
            mv(oldpath, newpath,function (err) {
                if (err) throw err;
            });
        }
        let response = await model.updateUsers(fields);
        res.send(response);
        res.end();
    });


});
app.post('/api/addEmployee', async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if(files.file !== undefined && files.file.name != ''){
            let newpath = path.join(__dirname, '../') + 'public/upload/' + files.file.name;
            let oldpath = files.file.path;
            fields['img'] = '/upload/' + files.file.name;

            await mv(oldpath, newpath,function (err) {
                if (err) throw err;
            });
        }
        let response = await model.addUsers(fields);

        res.send(response);
        res.end();
    });
});
app.post('/api/deleteEmployee', async (req, res) => {
    let response = await model.deleteUser(req.body);
    res.send(response);
});
app.listen(port, () => console.log(`Listening on port ${port}`));