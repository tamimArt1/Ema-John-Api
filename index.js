import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  const client = new MongoClient(process.env.URI);
  try {
    await client.connect();

    // endpoins
    app.get('/', (req, res) => {
      res.json({ message: 'Ema John Api', allProducts: '/products' });
    });

    app.get('/products', (req, res) => {
      client
        .db('emaJohnStore')
        .collection('products')
        .find()
        .toArray()
        .then((products) => res.json(products))
        .catch((err) => res.send(err.message));
    });

    // listen
    app.listen(process.env.PORT || 8000);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
