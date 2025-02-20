const express = require("express")
const dotenv = require("dotenv").config()
const dbConnect = require("./config/DBconnection")
const authRouter = require("./routes/authRouter")
const userRoutes = require("./routes/userRoutes")
const app = express();
dbConnect()
//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRoutes)
//Start the server
const PORT = process.env.PORT || 8081
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
