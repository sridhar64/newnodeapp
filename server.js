const express = require('express');
const path = require('path');
const randomId = require('random-id');
const fs = require('fs')
const app = express(),
      bodyParser = require("body-parser");
      port = process.env.PORT || 3080;

// place holder for the data
const users = [];
const user2s = [];
const msgs = [];
const datajson = [];
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// app.use(express.static(path.join(__dirname, '../my-app/dist')));
// app.use(bodyParser.json({
//   limit: '50mb'
// }));

// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   parameterLimit: 100000,
//   extended: true 
// }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!!!!')
  const databuffer = fs.readFileSync('notes.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
res.json(dtafil);
  
  console.log(dtafil);
});
app.get('/api/msgs', (req, res) => {
  console.log('api/msgs called!!!!!!!')
  const databuffer = fs.readFileSync('notes1.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
res.json(dtafil);
  
  console.log(dtafil);
});
app.post('/api/user', (req, res) => {

  const user = req.body.user;
  user.id = randomId(10);
  console.log('Adding user-->', user);
  users.push(user); 
  const obj = JSON.stringify(users,null,2);
  fs.writeFileSync('notes.json', obj);
  res.json("user addedd");
});
app.post('/api/msg', (req, res) => {
  const msg = req.body.msg;
  console.log('Adding msg-->', msg);
  msgs.push(msg); 
  const objm = JSON.stringify(msgs,null,2);
  fs.writeFileSync('notes1.json', objm);
  res.json("msg addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  console.log('sending data')
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});