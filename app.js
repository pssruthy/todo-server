const express = require('express');
const redis = require('redis');

const Db = require('./Db');
const { getDefaultStatus, getNextStatus } = require('./status');

const REDIS_URL = 6379;
const app = express();
const redisClient = redis.createClient(REDIS_URL);
const db = new Db(redisClient);

app.use(express.json());

db.getTodo().then((todo) => {
  const defaultTodo = { heading: 'Todo', items: [], lastId: 0 };
  app.locals.todo = todo || defaultTodo;
});

app.get('/api/getHeading', (req, res) => {
  res.send(JSON.stringify({ heading: app.locals.todo.heading }));
});

app.get('/api/getAllItems', (req, res) => {
  res.send(JSON.stringify({ items: app.locals.todo.items }));
});

app.post('/api/updateHeading', (req, res) => {
  app.locals.todo.heading = req.body.heading;
  db.setTodo(app.locals.todo);
  res.end();
});

app.post('/api/addItem', (req, res) => {
  const { item } = req.body;
  const { items, lastId } = app.locals.todo;
  items.push({ item, id: lastId + 1, status: getDefaultStatus() });
  app.locals.todo.lastId++;
  db.setTodo(app.locals.todo);
  res.end();
});

app.post('/api/removeItem', (req, res) => {
  const { itemId } = req.body;
  const { todo } = app.locals;
  todo.items = todo.items.filter((item) => item.id !== itemId);
  db.setTodo(app.locals.todo);
  res.end();
});

app.post('/api/removeTodo', (req, res) => {
  app.locals.todo = { heading: 'Todo', items: [], lastId: 0 };
  db.setTodo(app.locals.todo);
  res.end();
});

app.post('/api/toggleItemStatus', (req, res) => {
  const { itemId } = req.body;
  const { todo } = app.locals;
  const itemToToggle = todo.items.find(({ id }) => id === itemId);
  itemToToggle.status = getNextStatus(itemToToggle.status);
  db.setTodo(app.locals.todo);
  res.end();
});

module.exports = app;
