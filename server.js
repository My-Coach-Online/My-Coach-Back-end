const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT

app.use(cors());

app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const formData = req.body;

  const filePath = path.join(__dirname, 'form-data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    const jsonData = data ? JSON.parse(data) : [];
    jsonData.push(formData);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Failed to write data file' });
      }

      // Log the file contents
      console.log('Updated file contents:', JSON.stringify(jsonData, null, 2));

      res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

