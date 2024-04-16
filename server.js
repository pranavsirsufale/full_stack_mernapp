import dotenv from 'dotenv'
import cors from 'cors'
import express, { json } from "express";
import authRouter from "./router/auth.router.js";
import contactRouter from './router/contact.router.js'
import serviceRouter from './router/service.router.js'
import adminRouter from './router/admin.route.js'
import { connectDB } from "./db/db.js";
import { errorMiddleware } from './middlewares/error.middleware.js';
dotenv.config()
const app = express();



//todo let's tackt cors

// const corsOptions = {
//   origin:'http://localhost:5173',
//   methods : 'GET,POST,PUT,PATCH,DELETE,HEAD',
//   credential : true
// }

//? CORS CONFIGURATION 
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods:'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
}))




//? this line of code adds Express middleware thta parses incoming request bodies with JSON payloads. It's important to place this before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests, and it should be applied at the beginning of your middlewares stack to ensure it's available for all subsequent route handlers.






app.use(express.json({           
  limit: '16kb',
}))

//? Mount the Router: to use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use('/api',serviceRouter)
app.use(errorMiddleware)
app.use('/api/admin', adminRouter )


const port = process.env.PORT || 3000;
connectDB().then((dbres) => {
  app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT :: ${port}`);
  });
  
});