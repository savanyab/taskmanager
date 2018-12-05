const express = require('express');
const tasks = express();
const models = require('../models');

// index
tasks.get('/', (req, res) => {
  models.Task.findAll().then(tasks => {
    res.json(tasks);
  });
});

// create
tasks.post('/', (req, res) => {
  models.Task.create(req.body).then(task => {
    res.json(task);
  });
});

// show
tasks.get('/:id', (req, res) => {
  models.Task.findById(req.params.id).then(task => {
    res.json(task);
  });
});

// update
tasks.put('/:id', (req, res) => {
  models.Task.update(req.body, { where: { id: req.params.id}}).then(task => {
    res.json(task);
  });
});

// destroy
tasks.delete('/:id', (req, res) => {
  models.Task.destroy({ where: { id: req.params.id}}).then(task => {
    res.json(task);
  });
});



module.exports = tasks;