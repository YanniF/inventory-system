const functions = require('firebase-functions');
const app = require('express')();
const fbAuth = require('./util/fbAuth');

const { register, login } = require('./handlers/users');
const { addItem, getAllItems, getItem, editItem, deleteItem } = require('./handlers/items');

app.post('/register', register);
app.post('/login', login);

app.post('/items', fbAuth, addItem);
app.get('/items', fbAuth, getAllItems);
app.get('/items/:itemId', fbAuth, getItem);
app.put('/items/:itemId', fbAuth, editItem);
app.delete('/items/:itemId', fbAuth, deleteItem);

exports.api = functions.region('europe-west1').https.onRequest(app);
