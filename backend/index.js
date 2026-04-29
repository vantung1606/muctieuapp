require('dotenv').config();
const express = require('express');
const cors = require('cors');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
  res.send('Financial Goal Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
