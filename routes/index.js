var express = require('express');
var router = express.Router();


const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
connectionString: process.env.CONNECTION_STRING,
ssl: {
rejectUnauthorized: false,
},
});
client.connect()
.then(() => console.log('✅ Connexion réussie à la base de données'))
.catch(err => console.error('❌ Erreur de connexion :', err.stack));



router.get('/tickethack/:departure/:arrival/:date', async (req, res) => {
try {
const result = await client.query('SELECT * FROM tickets WHERE departure = $1 AND arrival = $2 AND date::date =$3', [req.params.departure, req.params.arrival, req.params.date]);
res.json(result);
} catch (error) {
res.status(500).json({ error: 'Database error' });
}
});

 /*router.get('/lastTrip', (req, res) => {
  client.query('SELECT * FROM trips ORDER BY departure DESC LIMIT 1')
    .then(result => {
      if (result.rows.length > 0) {
        res.json({ lastTrip: result.rows[0] });
      } else {
        res.status(404).json({ error: 'No trips found' });
      }
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'Error retrieving trips' });
    });
}); */

/* async = autre maniere de faire une requete base de donnee */

module.exports = router;
