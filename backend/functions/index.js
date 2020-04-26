const functions = require('firebase-functions');
const app = require('express')();
const { db } = require('./util/admin');

const { register, login } = require('./handlers/users');
const { addItem, getAllItems, getItem, editItem, deleteItem } = require('./handlers/items');

app.post('/register', register);
app.post('/login', login);

app.post('/items', addItem);
app.get('/items', getAllItems);
app.get('/items/:itemId', getItem);
app.put('/items/:itemId', editItem);
app.delete('/items/:itemId', deleteItem);

exports.api = functions.region('europe-west1').https.onRequest(app);
