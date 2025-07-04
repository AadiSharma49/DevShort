// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// === Middleware ===
// ✅ Allow Docker service name for frontend (or wildcard for any origin)
app.use(cors({ origin: "*" })); // You can also do: cors({ origin: "http://frontend:3000" })
app.use(express.json());
app.use(morgan('dev'));

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🌐 DevShort backend is up and running!');
});

// === Routes
app.use('/', routes);

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://backend:${PORT}`); // Note: backend is Docker hostname
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
