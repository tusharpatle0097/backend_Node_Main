const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require('./routes/userRoutes');

// Initialize environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        // Start server after successful DB connection
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB:", err.message);
    });

// Routes
app.use("/user", userRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the User API!");
});
