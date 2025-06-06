const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const profileRoutes = require("./routes/profile");


const helpRoutes = require('./routes/helpRequests');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/requests', helpRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/requests", helpRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));


