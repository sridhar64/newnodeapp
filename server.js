const express = require('express');
const path = require('path');
const randomId = require('random-id');
const fs = require('fs')
const app = express(),
  bodyParser = require("body-parser");
  port = process.env.PORT || 3080;
const databufferstr = fs.readFileSync('notes.json', 'utf8', function () {
  fs.writeFile('notes.json', '')
})
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
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!!!!')
  const databuffer = fs.readFileSync('notes.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
  res.json(dtafil);

  // console.log(dtafil);
});
app.get('/api/msgs/:msg', (req, res) => {
  console.log('api/users called!!!!!!!')
  const databuffer = fs.readFileSync('notes1.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
  id = req.url.split('/')[3]
  findname = req.url.split('/')[2]
  console.log(findname)
  let a = id;
  let h = 0;
  let k = [];
  let pre = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] == "=") h = i;
  }
  for (let j = 1; j < a.length - h; j++) {
    k.push(a[h + j]);
  }
  for (let s = 0; s <= a.length - (k.length + 1); s++) {
    /* console.log(a[s]) */
    pre.push(a[s]);
  }
  var idegenerator = k.join("");
  var idegeneratorlk = pre.join("")
  console.log(idegeneratorlk, idegenerator)
  if (idegeneratorlk == 'email=') {
    const response = dtafil.filter(data => {
      return data.namees === idegenerator;
    })
    res.json(response);
  } else if (idegeneratorlk == 'textbox=') {
    const response = dtafil.filter(data => {
      return data.ctextbox === idegenerator;
    })
    res.json(response);
  } else if (idegeneratorlk == 'email=') {
    const response = dtafil.filter(data => {
      return data.namees === idegenerator;
    })
    res.json(response);
  } else {
    res.json('404 :( ');
  }
});
app.get('/api/users/:id', (req, res) => {
  console.log('api/users called!!!!!!!')
  const databuffer = fs.readFileSync('notes.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
  id = req.url.split('/')[3]
  findname = req.url.split('/')[2]
  console.log(findname)
  let a = id;
  let h = 0;
  let k = [];
  let pre = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] == "=") h = i;
  }
  for (let j = 1; j < a.length - h; j++) {
    k.push(a[h + j]);
  }
  for (let s = 0; s <= a.length - (k.length + 1); s++) {
    /* console.log(a[s]) */
    pre.push(a[s]);
  }
  var idegenerator = k.join("");
  var idegeneratorlk = pre.join("")
  console.log(idegeneratorlk, idegenerator)
  if (idegeneratorlk == 'id=') {
    const user = dtafil.find((i) => i.id === idegenerator)
    res.json(user);
  } else if (idegeneratorlk == 'email=') {
    const user = dtafil.find((i) => i.email === idegenerator)
    res.json(user);
  } else if (idegeneratorlk == 'firstName=') {
    const user = dtafil.find((i) => i.firstName === idegenerator)
    res.json(user);
  } else if (idegeneratorlk == 'lastName=') {
    const user = dtafil.find((i) => i.lastName === idegenerator)
    res.json(user);
  }
  else {
    res.json('404 Not fount');
  }
});
app.get('/api/msgs', (req, res) => {
  console.log('api/msgs called!!!!!!!')
  const databuffer = fs.readFileSync('notes1.json', 'utf8')
  const datajson = databuffer.toString()
  const dtafil = JSON.parse(datajson);
  res.json(dtafil);

  // console.log(dtafil);
});
app.post('/api/user', (req, res) => {

  const user = req.body.user;
  user.id = randomId(10);
  // console.log('Adding user-->', user);
  console.log('Adding user-->');
  users.push(user);
  const obj = JSON.stringify(users, null, 2);
  fs.writeFileSync('notes.json', obj);
  res.json("user addedd");
});
app.delete('/api/user', (req, res) => {
  const user = req.body.user;
  const datajson = databufferstr.toString()
  const dtafil1 = JSON.parse(datajson);
  const index = dtafil1.findIndex(x => x.firstName === user);
  dtafil1.splice(index, 1);
  users.push(dtafil1);
  const obj = JSON.stringify(users, null, 2);
  fs.writeFileSync('needto.json', obj);
  res.json("user nned removed");
});
app.post('/api/msg', (req, res) => {
  const msg = req.body.msg;
  // console.log('Adding msg-->', msg);
  console.log('Adding msg-->');
  // fs.writeFileSync('notes1.json', objm);

  // fs.writeFileSync('./pick/'+msg.filenames, msg.pick);
  msgs.push(msg);
  const objm = JSON.stringify(msgs, null, 2);
  fs.writeFileSync('notes1.json', objm);
  res.json("msg addedd");
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  console.log('sending data')
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
