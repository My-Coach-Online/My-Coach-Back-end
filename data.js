const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'form-data.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read data file' });
      }
  
      res.json(JSON.parse(data));
    });
  });
  