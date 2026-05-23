import express from 'express'
import sales from './routes/salesRoute.js'
import purchase from './routes/purchaseRoute.js'
import supplier from './routes/supplierRoute.js'
import unit from './routes/unitRoute.js'
import category from './routes/catergoryRoutes.js'
import product from './routes/productRoute.js'
import cors from "cors";
import 'dotenv/config'
import adminRouter from './routes/adminRoute.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.json({ msg: "Welcome to MartGuide" });
});

// Cors 
const allowedOrigins = ['http://localhost:5173']
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use('/uploads', express.static('./uploads'));

// API Endpoints
app.use('/auth', adminRouter)
app.use('/sales', sales);
app.use('/purchases', purchase);
app.use('/category', category);
app.use('/product', product);
app.use('/unit', unit);
app.use('/supplier', supplier);
app.listen(3000, () => console.log('Server is online'));
