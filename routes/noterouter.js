const notes = require('express').Router();

const { v4: uuid } = require('uuid');

const { read } = require('fs');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title: title,
        text: text,
        id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
});
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);

            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});
module.exports = notes;