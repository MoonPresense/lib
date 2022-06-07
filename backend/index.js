require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require('./router/index');
const errMiddleware = require('./middleware/error.middleware');


const PORT = process.env.PORT || 5000;
const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use('/api', router);
app.use(errMiddleware);




const db = require("./models");
// db.sequelize.sync({force: true});
db.sequelize.sync({});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on PORT = ${PORT}`));
        app.get("/", (req, res) => {
            res.json({ message: "Hello World!" });
          });
    } catch (error) {
        console.log(error);
    }
}

start();