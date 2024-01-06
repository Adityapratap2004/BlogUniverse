const express = require('express');
const connectDb = require('./db');
const cloudinary = require("cloudinary");
require('dotenv').config();
const cookie = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL=process.env.FRONTEND_URL


connectDb();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({ credentials: true, origin:FRONTEND_URL  }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Invalid token or credentials' });
    }
    return next(err);
  });
app.use(cookie())
app.use(express.json());

app.use("/auth", require('./Routes/auth'))
app.use("/blogs", require("./Routes/blog"))
app.use("/user", require('./Routes/user'))
app.use("/category", require('./Routes/category'))
app.use("/comments", require('./Routes/comments'))

app.listen(PORT, () => {
    console.log("App listening on port no", PORT);
})