const express = require('express');
const morgan = require('morgan'); 
const app = express();

// --- Middlewares ---
app.use(morgan('dev')); 
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
    res.json({ message: 'API Ready' });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Daftarkan product routes
const productRoutes = require('./routes/products.routes');
app.use('/api/products', productRoutes);

// --- Error Handler ---
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
