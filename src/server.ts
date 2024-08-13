import express, { Express } from 'express';
import itemRoutes from './routes/item-routes';
import orderRoutes from './routes/order-routes';
import { connectToMongoDB } from './configs/mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'http';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
let server: Server;

// json serialize
app.use(express.json());

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Metaroon 2024!' });
  // res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/orders', orderRoutes);

// Start the express app
const mongoUri = process.env.MONGO_URL|| '';

connectToMongoDB(mongoUri)
  .then(() => {
    console.log('✅ Mongodb Connected!');
    server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((ex) => {
    console.log('🔴 Connection failed with MongoDB!', ex);
    connectToMongoDB(mongoUri)
  .then(() => {
    console.log('✅ Mongodb Connected!');
    server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Connection failed with MongoDB!', error);
    process.exit(1); // Exit the process if the connection fails
  });

  });

export { app, server };
