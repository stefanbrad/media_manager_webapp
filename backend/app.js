const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const videoRoutes = require('./routes/videos');

// register routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/videos', videoRoutes);

// fallback: serve index.html for unmatched routes
const frontendPath = path.join(__dirname, '../frontend');
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.url.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    next();
  }
});

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

