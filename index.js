// ...existing code...

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const MUSIC_FILE = 'music.json';

app.use(bodyParser.json());

// GET /users - list all users
// GET /music - list all music
app.get('/music', async (req, res) => {
  try {
    const music = await fs.readJson(MUSIC_FILE);
    res.json(music);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read music' });
  }
});

// POST /users - add new user
// POST /music - add new music
app.post('/music', async (req, res) => {
  const { url, title, artist, artwork, rating, playlist } = req.body;
  if (!url || !title) {
    return res.status(400).json({ error: 'url and title required' });
  }
  try {
    const music = await fs.readJson(MUSIC_FILE);
    const newMusic = { url, title, artist, artwork, rating, playlist };
    music.push(newMusic);
    await fs.writeJson(MUSIC_FILE, music, { spaces: 2 });
    res.status(201).json(newMusic);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add music' });
  }
});

// GET /users/:id - get user detail
// GET /music/:title - get music detail by title
app.get('/music/:title', async (req, res) => {
  try {
    const music = await fs.readJson(MUSIC_FILE);
    const item = music.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());
    if (!item) return res.status(404).json({ error: 'Music not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read music' });
  }
});

// DELETE /music/:title - hapus lagu berdasarkan judul
app.delete('/music/:title', async (req, res) => {
  try {
    const music = await fs.readJson(MUSIC_FILE);
    const idx = music.findIndex(m => m.title.toLowerCase() === req.params.title.toLowerCase());
    if (idx === -1) return res.status(404).json({ error: 'Music not found' });
    const deleted = music.splice(idx, 1)[0];
    await fs.writeJson(MUSIC_FILE, music, { spaces: 2 });
    res.json({ message: 'Deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete music' });
  }
});


// Default route for GET /
app.get('/', (req, res) => {
  res.json({
    message: 'Music API is running',
    endpoints: ['/music', '/music/:title']
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
