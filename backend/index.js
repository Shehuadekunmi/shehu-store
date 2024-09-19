// packages
import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

// Utiles
import connectDB from "./config/db.js"
import userRouts from "./routes/userRoutes.js"
import categoryRoute from './routes/categoryRoute.js';
import ProductRoute from './routes/productRoute.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoute from './routes/orderRoute.js'


dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);


const port = process.env.PORT || 5000; 

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());


app.use("/api/users", userRouts); 
app.use("/api/category", categoryRoute);
app.use("/api/products", ProductRoute); 
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoute); 

 

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID }); 
  });


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.listen(port, () => console.log(`Server running on port: ${port}`));