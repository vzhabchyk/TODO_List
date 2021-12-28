const express = require('express');
const app = express();
const port = 3000;
const data = require('./data.json');
const todolist = require('./todolist.json');

app.get('/todos', function(req, res) {
  for (let i = 0; i < todolist.length; i++) {
    if (!data.statuses.includes(todolist[i].status)) {
      todolist[i].status = 'Not Defined';
    }
    if (!data.priorities.includes(todolist[i].priority)) {
      todolist[i].priority = 'Not Defined';
    }
  }
  res.json(todolist);
})

app.get('/data', function(req, res) {
  res.json(data);
});

app.listen(port, () => {
 console.log('We live on ' + port);
});
