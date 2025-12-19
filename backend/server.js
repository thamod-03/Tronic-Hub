import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import ensureDefaultCategory from './utility/uncategorizedCreate.js';
import cartRouter from './routes/cartRoutes.js';

// Variables
const PORT = 8000;

const app = express();  // Server creation

await connectDB();  // Database connection
await ensureDefaultCategory(); // Uncategorized categort creation

// Middlewares
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
}));
app.use(express.json());

// Home Routed
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server is listen on ${PORT}`);
})