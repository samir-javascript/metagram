
import path from "path"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import bodyParser  from 'body-parser'
import { connectToDb } from './config/db.js'
import usersRoutes from './routes/usersRoutes.js'
import postsRoutes from './routes/postsRoutes.js'
import conversationRoutes from "./routes/chatRoutes.js"
import { app, server } from "./socket/server.js"
import { errorHandler, notFound } from './middlewares/errorMiddleWare.js'
const PORT = process.env.PORT || 8000;
// Creating an instance of Express
dotenv.config()

const __dirname = path.resolve()
// Middleware setup
app.use(cors({
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  origin: "*"
}));
app.use(cookieParser());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
}));


// Define a route
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')));
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );

  } else {
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
  }

app.use("/api/posts",postsRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/chat', conversationRoutes)
app.use(notFound)
app.use(errorHandler)
// Start the server

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
// Use the port defined in the environment variables or default to 3000
server.listen(PORT, () => {
  connectToDb()
    console.log(`Server is running on port ${PORT}`);
});
