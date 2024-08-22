const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'form-data.json');

  // Read existing data, add new entry, and save it
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

      console.log('Updated file contents:', JSON.stringify(jsonData, null, 2));
      res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

// Endpoint to retrieve all submitted data
app.get('/api/data', (req, res) => {
  const filePath = path.join(__dirname, 'form-data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
