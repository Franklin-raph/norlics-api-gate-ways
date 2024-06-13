const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

// Endpoint to fetch all payment gateways
app.get('/gateways', (req, res) => {
  fs.readFile('gateways.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Unable to read payment gateways data' });
      return;
    }
    const gateways = JSON.parse(data);
    res.json(gateways);
  });
});

// Endpoint to get payment URL
app.post('/payment-url', (req, res) => {
  const requestedGateway = req.body.name;
  console.log(requestedGateway)
  
  if (!requestedGateway) {
    res.status(400).json({ error: 'Gateway name is required' });
    return;
  }

  fs.readFile('gateways.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Unable to read payment gateways data' });
      return;
    }
    const gateways = JSON.parse(data);
    const gateway = gateways.find(g => g.name === requestedGateway);

    if (gateway) {
      res.json({ url: gateway.url });
    } else {
      res.status(404).json({ error: 'Gateway not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
