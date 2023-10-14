const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 6000;

// CONFIGURATIONS
connectDB();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Cross Origin Resource Sharing
// const whitelist = [
//     "http://localhost:" + PORT,
//     "https://www.google.com.ua",
//     "http://localhost:3000",
//     "http://192.168.0.100:3000",
// ];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     optionsSuccessStatus: 200,
//     credentials: true,
// };

// app.use(cors(corsOptions));

// ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

// LOGS
console.log(__filename);
console.log(__dirname);

// CONNECT & LISTEN
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
