const express = require('express');
const tasks = express();
const models = require('../models');

// index
tasks.get('/', (req, res) => {
  models.Task.findAll({ order: [['id', 'ASC']] }).then(tasks => {
    res.json(tasks);
  });
});

// create
/*
tasks.post('/', (req, res) => {
  models.Task.create(req.body).then(task => {
    res.json(task);
  });
});*/

tasks.post('/', (req, res) => {
  if (!req.body.name || !req.body.message) {
    return res.status(400).send('Name és message kitöltése kötelező');
  } else {
    models.Task.findOne({ where: { name: req.body.name } }).then(result => {
      if (result) {
        return res.status(400).send('Már van ilyen name');
      } else {
        models.Task.create(req.body).then(task => {
          return res.json(task);
        });
      };
    });
  };
});

// show
tasks.get('/:id', (req, res) => {
  models.Task.findById(req.params.id).then(task => {
    if (!task) {
      res.status(400).send('Nincs ilyen id');
    } else {
      res.json(task);
    };
  });
});

// update
/*
tasks.put('/:id', (req, res) => {
  models.Task.update(req.body, { where: { id: req.params.id } }).then(task => {
    res.json(task);
  });
}); */

tasks.put('/:id', (req, res) => {
  models.Task.findById(req.params.id).then(preresult => {
    if (!preresult) {
      return res.status(400).send('Nincs ilyen id');
    } else {       
          models.Task.update(req.body, { where: { id: req.params.id } }).then(task => {
            return res.json(task);
      });
    };
  });
});

// destroy
tasks.delete('/:id', (req, res) => {
  models.Task.destroy({ where: { id: req.params.id } }).then(task => {
    res.json(task);
  });
});



module.exports = tasks;