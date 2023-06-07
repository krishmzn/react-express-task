// Loads the required modules
const express = require('express');
const fs = require('fs');

const cors = require('cors');

// Creates an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Defines the path to the JSON file
const filePath = 'data.json';

// Uses the express.json middleware to parse JSON request bodies
app.use(express.json());

// Defines a route that serves the data from the JSON file
app.get('/api/data', (req, res) => {
  // Reads the contents of the JSON file
  const data = JSON.parse(fs.readFileSync(filePath));

  // Sends the data to the client
  res.json(data.tasks);
});

// Defines a route that adds a new item to the data
app.post('/api/data', (req, res) => {
  console.log('post request received')
  // Reads the contents of the JSON file
  const data = JSON.parse(fs.readFileSync(filePath));

  // Generates a new ID for the item
  const newId = Math.max(...data.tasks.map(item => item.id)) + 1;

  // Adds the new item to the data
  data.tasks.push({ ...req.body, id: newId });

  // Writes the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(data));

  // Sends a success response to the client
  res.json({ message: 'Item added successfully' });
});


// Defines a route that updates an existing item in the data
app.put('/api/data/:id', (req, res) => {
  // Reads the contents of the JSON file
  const data = JSON.parse(fs.readFileSync(filePath));

  // Finds the index of the item with the specified ID
  const index = data.tasks.findIndex(item => item.id === parseInt(req.params.id));

  // Updates the item at the specified index
  data.tasks[index] = req.body;

  // Writes the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(data));

  // Sends a success response to the client
  res.json({ message: 'Item updated successfully' });
});

// Defines a route that deletes an item from the data
app.delete('/api/data/:id', (req, res) => {
  // Reads the contents of the JSON file
  const data = JSON.parse(fs.readFileSync(filePath));

  // Finds the index of the item with the specified ID
  const index = data.tasks.findIndex(item => item.id === parseInt(req.params.id));

  // Removes the item at the specified index
  data.tasks.splice(index, 1);

  // Writes the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(data));

  // Sends a success response to the client
  res.json({ message: 'Item deleted successfully' });
});


// Starts the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
