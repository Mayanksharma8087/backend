const express = require('express');
const cors= require('cors');
const path= require('path');
const authRouter = require('./routes/auth/auth')
const courseRouter = require('./routes/course/course')
require('./db/db')
const app = express()
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json())

app.use(authRouter)
app.use(courseRouter)


app.listen(8080,()=>{
    console.log(`server is running at 8080 port`);
})