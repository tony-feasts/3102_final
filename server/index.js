const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const uri = 'mongodb+srv://spongebob:5Om5unxDmqyRioRj@keeper.viyupku.mongodb.net/Keeper?retryWrites=true&w=majority';
mongoose.connect(uri);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/api', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api', async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.status(201).json(newNote);
});

app.delete('/api/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});